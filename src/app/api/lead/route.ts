import { NextResponse } from "next/server";
import { leadDeduper, leadRateLimiter } from "@/lib/dedupe";
import { deliverLead } from "@/lib/lead-delivery";
import { normalizeRussianPhone } from "@/lib/contacts";
import { issuesToFieldErrors, isHoneypotFilled, isSubmissionTooFast, leadSchema } from "@/lib/validation";
import type { LeadErrorResponse, LeadPayload, LeadSuccessResponse } from "@/types";

export const runtime = "nodejs";

function errorResponse(code: string, message: string, status: number, fieldErrors?: Record<string, string[]>) {
  return NextResponse.json<LeadErrorResponse>(
    { ok: false, code, message, fieldErrors },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("INVALID_JSON", "Не удалось прочитать данные формы.", 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(
      "VALIDATION_ERROR",
      "Проверьте заполненные поля.",
      400,
      issuesToFieldErrors(parsed.error),
    );
  }

  const lead = parsed.data;
  if (isHoneypotFilled(lead.website)) {
    return NextResponse.json<LeadSuccessResponse>(
      { ok: true, id: "accepted", deliveredTo: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const now = Date.now();
  if (isSubmissionTooFast(lead.startedAt, now)) {
    return errorResponse("TOO_FAST", "Форма отправлена слишком быстро. Попробуйте ещё раз.", 429);
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (leadRateLimiter.isLimited(forwardedFor, now)) {
    return errorResponse("RATE_LIMITED", "Слишком много попыток. Позвоните нам или повторите позже.", 429);
  }

  const normalizedPhone = normalizeRussianPhone(lead.phone)!;
  if (
    leadDeduper.checkAndRemember(`id:${lead.submissionId}`, now) ||
    leadDeduper.checkAndRemember(`phone:${normalizedPhone}`, now)
  ) {
    return errorResponse("DUPLICATE", "Такая заявка уже отправлена. Мы скоро свяжемся с вами.", 409);
  }

  const normalizedLead: LeadPayload = {
    ...lead,
    phone: normalizedPhone,
    rooms: lead.rooms || undefined,
    addressOrDistrict: lead.addressOrDistrict || undefined,
    comment: lead.comment || undefined,
    website: undefined,
  };

  const delivery = await deliverLead(normalizedLead);
  if (!delivery.deliveredTo.length) {
    const hasConfiguredButFailed = delivery.attempts.length > 0;
    return errorResponse(
      hasConfiguredButFailed ? "DELIVERY_FAILED" : "DELIVERY_NOT_CONFIGURED",
      "Сейчас форма недоступна. Пожалуйста, позвоните по номеру +7 902 765-36-00.",
      hasConfiguredButFailed ? 502 : 503,
    );
  }

  return NextResponse.json<LeadSuccessResponse>(
    { ok: true, id: crypto.randomUUID(), deliveredTo: delivery.deliveredTo },
    { headers: { "Cache-Control": "no-store" } },
  );
}
