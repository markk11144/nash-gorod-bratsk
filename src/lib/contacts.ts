import { company } from "@/data/company";

export function normalizeRussianPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  let national = digits;

  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    national = digits.slice(1);
  } else if (digits.length === 10) {
    national = digits;
  } else {
    return null;
  }

  if (!national.startsWith("9")) return null;
  return `+7${national}`;
}

export function formatRussianPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  const national = (digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits).slice(0, 10);

  if (!national.length) return "+7";

  const groups = [national.slice(0, 3), national.slice(3, 6), national.slice(6, 8), national.slice(8, 10)];
  let result = `+7 (${groups[0]}`;
  if (groups[0].length === 3) result += ")";
  if (groups[1]) result += ` ${groups[1]}`;
  if (groups[2]) result += `-${groups[2]}`;
  if (groups[3]) result += `-${groups[3]}`;
  return result;
}

export function getTelHref(phone = company.phone.e164): string {
  return `tel:${phone}`;
}

export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const productionUrl = "https://nash-gorod-bratsk.vercel.app";
  try {
    return new URL(configured || productionUrl);
  } catch {
    return new URL(productionUrl);
  }
}

export function maskPhone(value: string): string {
  const normalized = normalizeRussianPhone(value);
  if (!normalized) return "неверный номер";
  return `${normalized.slice(0, 4)} ••• ••-${normalized.slice(-2)}`;
}
