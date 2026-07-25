import nodemailer from "nodemailer";
import { maskPhone, normalizeRussianPhone } from "@/lib/contacts";
import type { LeadPayload } from "@/types";

export type DeliveryChannel = "telegram" | "crm" | "email" | "development-log";
export type DeliveryAttempt = { channel: DeliveryChannel; success: boolean; error?: string };
export type DeliverySummary = { attempts: DeliveryAttempt[]; deliveredTo: DeliveryChannel[] };

type DeliveryEnv = Record<string, string | undefined>;
type FetchImplementation = typeof fetch;
type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth?: { user: string; pass: string };
};
type MailMessage = { from: string; to: string; subject: string; text: string };
type SendMailImplementation = (config: SmtpConfig, message: MailMessage) => Promise<unknown>;

type DeliveryDependencies = {
  env?: DeliveryEnv;
  fetchImpl?: FetchImplementation;
  sendMailImpl?: SendMailImplementation;
  logger?: (label: string, payload: unknown) => void;
};

const taskLabels: Record<LeadPayload["taskType"], string> = {
  sell: "Продать недвижимость",
  buy: "Купить недвижимость",
  "rent-out": "Сдать объект",
  rent: "Снять объект",
  mortgage: "Ипотека",
  documents: "Документы / сложная ситуация",
  remote: "Дистанционная сделка",
  other: "Другая задача",
};

const contactLabels: Record<LeadPayload["preferredContact"], string> = {
  phone: "Телефон",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] ?? char);
}

export function formatLeadMessage(lead: LeadPayload): string {
  const normalizedPhone = normalizeRussianPhone(lead.phone) ?? lead.phone;
  return [
    `Новая заявка: ${lead.formType === "valuation" ? "оценка недвижимости" : "консультация"}`,
    `Имя: ${lead.name}`,
    `Телефон: ${normalizedPhone}`,
    `Связаться: ${contactLabels[lead.preferredContact]}`,
    `Задача: ${taskLabels[lead.taskType]}`,
    lead.addressOrDistrict ? `Адрес / район: ${lead.addressOrDistrict}` : "",
    lead.rooms ? `Комнат: ${lead.rooms}` : "",
    lead.comment ? `Комментарий: ${lead.comment}` : "",
    `ID: ${lead.submissionId}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function toTelegramHtml(message: string): string {
  const [title, ...lines] = message.split("\n");
  return [`<b>${escapeHtml(title)}</b>`, ...lines.map(escapeHtml)].join("\n");
}

async function defaultSendMail(config: SmtpConfig, message: MailMessage): Promise<unknown> {
  const transporter = nodemailer.createTransport(config);
  return transporter.sendMail(message);
}

async function attempt(channel: DeliveryChannel, operation: () => Promise<unknown>): Promise<DeliveryAttempt> {
  try {
    await operation();
    return { channel, success: true };
  } catch (error) {
    return {
      channel,
      success: false,
      error: error instanceof Error ? error.message : "Неизвестная ошибка доставки",
    };
  }
}

export async function deliverLead(lead: LeadPayload, dependencies: DeliveryDependencies = {}): Promise<DeliverySummary> {
  const env = dependencies.env ?? process.env;
  const fetchImpl = dependencies.fetchImpl ?? fetch;
  const sendMailImpl = dependencies.sendMailImpl ?? defaultSendMail;
  const logger = dependencies.logger ?? console.info;
  const message = formatLeadMessage(lead);
  const operations: Promise<DeliveryAttempt>[] = [];

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    operations.push(
      attempt("telegram", async () => {
        const response = await fetchImpl(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: toTelegramHtml(message),
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(8_000),
        });
        if (!response.ok) throw new Error(`Telegram ответил ${response.status}`);
      }),
    );
  }

  if (env.CRM_WEBHOOK_URL) {
    operations.push(
      attempt("crm", async () => {
        const response = await fetchImpl(env.CRM_WEBHOOK_URL!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, phone: normalizeRussianPhone(lead.phone) ?? lead.phone }),
          signal: AbortSignal.timeout(8_000),
        });
        if (!response.ok) throw new Error(`CRM ответила ${response.status}`);
      }),
    );
  }

  if (env.CONTACT_EMAIL && env.SMTP_HOST && env.SMTP_FROM) {
    operations.push(
      attempt("email", async () => {
        const port = Number(env.SMTP_PORT || 587);
        const auth = env.SMTP_USER && env.SMTP_PASSWORD ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } : undefined;
        await sendMailImpl(
          { host: env.SMTP_HOST!, port, secure: port === 465, auth },
          {
            from: env.SMTP_FROM!,
            to: env.CONTACT_EMAIL!,
            subject: lead.formType === "valuation" ? "Заявка на оценку — Наш Город" : "Заявка на консультацию — Наш Город",
            text: message,
          },
        );
      }),
    );
  }

  if (!operations.length) {
    if (env.NODE_ENV !== "production") {
      logger("[lead:development]", {
        ...lead,
        phone: maskPhone(lead.phone),
        comment: lead.comment ? `${lead.comment.slice(0, 80)}${lead.comment.length > 80 ? "…" : ""}` : undefined,
      });
      return {
        attempts: [{ channel: "development-log", success: true }],
        deliveredTo: ["development-log"],
      };
    }
    return { attempts: [], deliveredTo: [] };
  }

  const attempts = await Promise.all(operations);
  return {
    attempts,
    deliveredTo: attempts.filter((item) => item.success).map((item) => item.channel),
  };
}
