import { z } from "zod";
import { normalizeRussianPhone } from "@/lib/contacts";

export const MIN_FILL_TIME_MS = 1_800;

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const leadSchema = z
  .object({
    formType: z.enum(["consultation", "valuation"]),
    name: z.string().trim().min(2, "Укажите имя").max(80, "Имя слишком длинное"),
    phone: z.string().refine((value) => normalizeRussianPhone(value) !== null, "Введите российский мобильный номер"),
    preferredContact: z.enum(["phone", "whatsapp", "telegram"]),
    taskType: z.enum(["sell", "buy", "rent-out", "rent", "mortgage", "documents", "remote", "other"]),
    addressOrDistrict: optionalText(160),
    rooms: z.enum(["studio", "1", "2", "3", "4+"]).optional().or(z.literal("")),
    comment: optionalText(1_000),
    submissionId: z.string().uuid("Некорректный идентификатор отправки"),
    startedAt: z.number().int().positive(),
    website: optionalText(120),
  })
  .superRefine((value, context) => {
    if (value.formType === "valuation" && !value.addressOrDistrict?.trim()) {
      context.addIssue({
        code: "custom",
        path: ["addressOrDistrict"],
        message: "Укажите адрес или район объекта",
      });
    }
  });

export type LeadFormValues = z.input<typeof leadSchema>;

export function isHoneypotFilled(value?: string): boolean {
  return Boolean(value?.trim());
}

export function isSubmissionTooFast(startedAt: number, now = Date.now()): boolean {
  return now - startedAt < MIN_FILL_TIME_MS;
}

export function issuesToFieldErrors(error: z.ZodError): Record<string, string[]> {
  return error.issues.reduce<Record<string, string[]>>((result, issue) => {
    const key = String(issue.path[0] ?? "form");
    result[key] = [...(result[key] ?? []), issue.message];
    return result;
  }, {});
}
