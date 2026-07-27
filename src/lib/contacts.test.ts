import { afterEach, describe, expect, it } from "vitest";
import { formatRussianPhoneInput, getSiteUrl, getTelHref, maskPhone, normalizeRussianPhone } from "@/lib/contacts";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

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

  it("uses the production site URL when the environment variable is absent or invalid", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl().origin).toBe("https://nash-gorod-bratsk.vercel.app");

    process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";
    expect(getSiteUrl().origin).toBe("https://nash-gorod-bratsk.vercel.app");
  });
});
