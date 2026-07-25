export const analyticsEvents = [
  "hero_cta_click",
  "phone_click",
  "whatsapp_click",
  "telegram_click",
  "vk_click",
  "map_click",
  "reviews_click",
  "consultation_form_open",
  "consultation_form_submit",
  "valuation_form_open",
  "valuation_form_submit",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

declare global {
  interface Window {
    ym?: (counterId: number, method: "reachGoal", event: string, payload?: Record<string, unknown>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const rawId = process.env.NEXT_PUBLIC_METRIKA_ID;
  if (!rawId || !window.ym) return;

  const counterId = Number(rawId);
  if (!Number.isFinite(counterId)) return;
  window.ym(counterId, "reachGoal", event, payload);
}
