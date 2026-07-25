import { describe, expect, it } from "vitest";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

describe("analytics", () => {
  it("is a safe no-op on the server", () => {
    expect(() => trackEvent("phone_click")).not.toThrow();
  });

  it("contains all required events", () => {
    expect(analyticsEvents).toContain("consultation_form_submit");
    expect(analyticsEvents).toContain("valuation_form_submit");
    expect(analyticsEvents).toContain("map_click");
  });
});
