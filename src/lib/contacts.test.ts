import { describe, expect, it } from "vitest";
import { formatRussianPhoneInput, getTelHref, maskPhone, normalizeRussianPhone } from "@/lib/contacts";

describe("phone helpers", () => {
  it.each([
    ["+7 (902) 765-36-00", "+79027653600"],
    ["8 902 765 36 00", "+79027653600"],
    ["9027653600", "+79027653600"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizeRussianPhone(input)).toBe(expected);
  });

  it("rejects a non-mobile or incomplete number", () => {
    expect(normalizeRussianPhone("+7 3953 27-00-00")).toBeNull();
    expect(normalizeRussianPhone("+7 902 12")).toBeNull();
  });

  it("formats a value for Russian phone input", () => {
    expect(formatRussianPhoneInput("89027653600")).toBe("+7 (902) 765-36-00");
  });

  it("builds safe display helpers", () => {
    expect(getTelHref()).toBe("tel:+79027653600");
    expect(maskPhone("+79027653600")).toBe("+790 ••• ••-00");
  });
});
