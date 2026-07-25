import { describe, expect, it } from "vitest";
import { isHoneypotFilled, isSubmissionTooFast, leadSchema, MIN_FILL_TIME_MS } from "@/lib/validation";

const validLead = {
  formType: "consultation" as const,
  name: "Анна",
  phone: "+7 (902) 765-36-00",
  preferredContact: "phone" as const,
  taskType: "buy" as const,
  addressOrDistrict: "",
  rooms: "" as const,
  comment: "Нужна консультация",
  submissionId: "5c98d1f7-46d8-49ed-9b2b-d0b70e60cc81",
  startedAt: 1_000,
  website: "",
};

describe("lead validation", () => {
  it("accepts a valid consultation", () => {
    expect(leadSchema.safeParse(validLead).success).toBe(true);
  });

  it("requires the address for a valuation", () => {
    const result = leadSchema.safeParse({ ...validLead, formType: "valuation", addressOrDistrict: "" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.some((issue) => issue.path[0] === "addressOrDistrict")).toBe(true);
  });

  it("requires a valid mobile phone", () => {
    expect(leadSchema.safeParse({ ...validLead, phone: "27-00-00" }).success).toBe(false);
  });

  it("detects honeypot and too-fast submission", () => {
    expect(isHoneypotFilled("bot.example")).toBe(true);
    expect(isHoneypotFilled(" ")).toBe(false);
    expect(isSubmissionTooFast(10_000, 10_000 + MIN_FILL_TIME_MS - 1)).toBe(true);
    expect(isSubmissionTooFast(10_000, 10_000 + MIN_FILL_TIME_MS)).toBe(false);
  });
});
