"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { trackEvent } from "@/lib/analytics";
import { formatRussianPhoneInput } from "@/lib/contacts";
import { leadSchema, type LeadFormValues } from "@/lib/validation";
import type { LeadResponse, LeadFormType } from "@/types";

const taskOptions = [
  ["sell", "Продать недвижимость"],
  ["buy", "Купить недвижимость"],
  ["rent-out", "Сдать объект"],
  ["rent", "Снять объект"],
  ["mortgage", "Помощь с ипотекой"],
  ["documents", "Документы или сложная ситуация"],
  ["remote", "Дистанционная сделка"],
  ["other", "Другая задача"],
] as const;

const contactOptions = [
  ["phone", "Телефон"],
  ["whatsapp", "WhatsApp"],
  ["telegram", "Telegram"],
] as const;

function newSubmissionId(): string {
  return crypto.randomUUID();
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error" role="alert">
      {message}
    </p>
  );
}

export function LeadForm({ formType, compact = false, onSuccess }: { formType: LeadFormType; compact?: boolean; onSuccess?: () => void }) {
  const [success, setSuccess] = useState(false);
  const defaults = useMemo<LeadFormValues>(
    () => ({
      formType,
      name: "",
      phone: "+7",
      preferredContact: "phone",
      taskType: formType === "valuation" ? "sell" : "buy",
      addressOrDistrict: "",
      rooms: "",
      comment: "",
      submissionId: newSubmissionId(),
      startedAt: Date.now(),
      website: "",
    }),
    [formType],
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: defaults,
    shouldFocusError: true,
  });

  useEffect(() => {
    if (formType === "valuation") trackEvent("valuation_form_open", { source: "valuation-section" });
  }, [formType]);

  const phoneField = register("phone");

  const submit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as LeadResponse;

      if (!response.ok || !result.ok) {
        setError("root.server", {
          type: "server",
          message: result.ok ? "Не удалось отправить заявку." : result.message,
        });
        return;
      }

      setSuccess(true);
      trackEvent(formType === "valuation" ? "valuation_form_submit" : "consultation_form_submit", {
        taskType: values.taskType,
      });
      onSuccess?.();
    } catch {
      setError("root.server", {
        type: "network",
        message: "Не удалось связаться с сервером. Позвоните нам или попробуйте позже.",
      });
    }
  });

  if (success) {
    return (
      <div className="grid min-h-72 place-items-center rounded-2xl border border-river/20 bg-paper p-8 text-center" role="status" aria-live="polite">
        <div>
          <CheckCircle2 className="mx-auto text-river" size={44} aria-hidden="true" />
          <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-ink">Заявка принята</h3>
          <p className="mx-auto mt-3 max-w-md leading-7 text-ink-soft">Спасибо. Специалист свяжется с вами выбранным способом. Если вопрос срочный, позвоните по номеру в шапке сайта.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={submit} noValidate aria-label={formType === "valuation" ? "Форма предварительной оценки" : "Форма консультации"}>
      <input type="hidden" {...register("formType")} />
      <input type="hidden" {...register("submissionId")} />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <div className="absolute -left-[9999px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formType}-website`}>Ваш сайт</label>
        <input id={`${formType}-website`} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className={compact ? "grid gap-5" : "grid gap-5 md:grid-cols-2"}>
        <div>
          <label className="mb-2 block text-sm font-bold text-ink" htmlFor={`${formType}-name`}>
            Имя
          </label>
          <input id={`${formType}-name`} className="field" autoComplete="name" placeholder="Как к вам обращаться" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${formType}-name-error` : undefined} {...register("name")} />
          <ErrorText id={`${formType}-name-error`} message={errors.name?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-ink" htmlFor={`${formType}-phone`}>
            Телефон
          </label>
          <input
            id={`${formType}-phone`}
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formType}-phone-error` : undefined}
            {...phoneField}
            onChange={(event) => {
              event.target.value = formatRussianPhoneInput(event.target.value);
              phoneField.onChange(event);
            }}
          />
          <ErrorText id={`${formType}-phone-error`} message={errors.phone?.message} />
        </div>
      </div>

      <div className={compact ? "grid gap-5" : "grid gap-5 md:grid-cols-2"}>
        <div>
          <label className="mb-2 block text-sm font-bold text-ink" htmlFor={`${formType}-task`}>
            Что нужно сделать
          </label>
          <select id={`${formType}-task`} className="field" {...register("taskType")}>
            {taskOptions.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-bold text-ink">Как связаться</legend>
          <div className="flex min-h-[3.25rem] flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-ink/20 bg-paper px-3 py-2">
            {contactOptions.map(([value, label]) => (
              <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                <input type="radio" value={value} className="size-4 accent-ink" {...register("preferredContact")} />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {formType === "valuation" ? (
        <div className="grid gap-5 md:grid-cols-[1fr_180px]">
          <div>
            <label className="mb-2 block text-sm font-bold text-ink" htmlFor="valuation-address">
              Адрес или район объекта
            </label>
            <input id="valuation-address" className="field" placeholder="Например, Центральный район" aria-invalid={Boolean(errors.addressOrDistrict)} aria-describedby={errors.addressOrDistrict ? "valuation-address-error" : undefined} {...register("addressOrDistrict")} />
            <ErrorText id="valuation-address-error" message={errors.addressOrDistrict?.message} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-ink" htmlFor="valuation-rooms">
              Комнат
            </label>
            <select id="valuation-rooms" className="field" {...register("rooms")}>
              <option value="">Не указано</option>
              <option value="studio">Студия</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>
        </div>
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-bold text-ink" htmlFor={`${formType}-comment`}>
          Комментарий <span className="font-normal text-ink-soft">— необязательно</span>
        </label>
        <textarea id={`${formType}-comment`} className="field min-h-28 resize-y" placeholder="Расскажите о сроках или важных обстоятельствах" {...register("comment")} />
        <ErrorText id={`${formType}-comment-error`} message={errors.comment?.message} />
      </div>

      <div aria-live="polite">
        {errors.root?.server?.message ? <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-800" role="alert">{errors.root.server.message}</p> : null}
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" size={18} aria-hidden="true" /> Отправляем…
            </>
          ) : (
            <>
              {formType === "valuation" ? "Получить предварительный ориентир" : "Отправить заявку"}
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {formType === "valuation" ? (
        <p className="text-xs leading-5 text-ink-soft">Предварительный ориентир не является отчётом об оценке и не заменяет осмотр объекта и проверку документов.</p>
      ) : null}
    </form>
  );
}
