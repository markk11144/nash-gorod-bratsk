import { describe, expect, it, vi } from "vitest";
import { deliverLead, formatLeadMessage } from "@/lib/lead-delivery";
import type { LeadPayload } from "@/types";

const lead: LeadPayload = {
  formType: "consultation",
  name: "Анна",
  phone: "+7 (902) 765-36-00",
  preferredContact: "whatsapp",
  taskType: "buy",
  comment: "Ищу квартиру",
  submissionId: "5c98d1f7-46d8-49ed-9b2b-d0b70e60cc81",
  startedAt: 1_000,
};

describe("lead delivery", () => {
  it("formats a normalized message", () => {
    const message = formatLeadMessage(lead);
    expect(message).toContain("+79027653600");
    expect(message).toContain("Купить недвижимость");
  });

  it("uses a masked development log without configured channels", async () => {
    const logger = vi.fn();
    const result = await deliverLead(lead, { env: { NODE_ENV: "development" }, logger });
    expect(result.deliveredTo).toEqual(["development-log"]);
    expect(logger).toHaveBeenCalledWith("[lead:development]", expect.objectContaining({ phone: "+790 ••• ••-00" }));
  });

  it("does not imitate delivery in production without channels", async () => {
    const result = await deliverLead(lead, { env: { NODE_ENV: "production" } });
    expect(result.deliveredTo).toEqual([]);
    expect(result.attempts).toEqual([]);
  });

  it("keeps successful channels when another channel fails", async () => {
    const fetchImpl = vi.fn(async (input: string | URL | Request) => {
      return String(input).includes("telegram") ? new Response("ok", { status: 200 }) : new Response("fail", { status: 500 });
    }) as unknown as typeof fetch;
    const result = await deliverLead(lead, {
      env: {
        NODE_ENV: "production",
        TELEGRAM_BOT_TOKEN: "token",
        TELEGRAM_CHAT_ID: "chat",
        CRM_WEBHOOK_URL: "https://crm.example/webhook",
      },
      fetchImpl,
    });
    expect(result.deliveredTo).toEqual(["telegram"]);
    expect(result.attempts.find((item) => item.channel === "crm")?.success).toBe(false);
  });

  it("uses the optional SMTP adapter", async () => {
    const sendMailImpl = vi.fn(async () => ({ accepted: ["owner@example.test"] }));
    const result = await deliverLead(lead, {
      env: {
        NODE_ENV: "production",
        CONTACT_EMAIL: "owner@example.test",
        SMTP_HOST: "smtp.example.test",
        SMTP_FROM: "site@example.test",
        SMTP_PORT: "465",
      },
      sendMailImpl,
    });
    expect(result.deliveredTo).toEqual(["email"]);
    expect(sendMailImpl).toHaveBeenCalledWith(expect.objectContaining({ port: 465, secure: true }), expect.objectContaining({ to: "owner@example.test" }));
  });
});
