import { describe, expect, it } from "vitest";
import { SubmissionDeduper, WindowRateLimiter } from "@/lib/dedupe";

describe("SubmissionDeduper", () => {
  it("rejects a duplicate inside TTL and accepts it after expiry", () => {
    const deduper = new SubmissionDeduper(1_000);
    expect(deduper.checkAndRemember("lead", 10_000)).toBe(false);
    expect(deduper.checkAndRemember("lead", 10_500)).toBe(true);
    expect(deduper.checkAndRemember("lead", 11_001)).toBe(false);
  });
});

describe("WindowRateLimiter", () => {
  it("limits requests inside the window", () => {
    const limiter = new WindowRateLimiter(2, 1_000);
    expect(limiter.isLimited("ip", 10_000)).toBe(false);
    expect(limiter.isLimited("ip", 10_100)).toBe(false);
    expect(limiter.isLimited("ip", 10_200)).toBe(true);
    expect(limiter.isLimited("ip", 11_101)).toBe(false);
  });
});
