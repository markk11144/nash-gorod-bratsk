"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { LeadForm } from "@/components/forms/LeadForm";

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    document.body.classList.remove("modal-open");
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const show = () => {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
      document.body.classList.add("modal-open");
      trackEvent("consultation_form_open", { source: "modal" });
      window.requestAnimationFrame(() => titleRef.current?.focus());
    };
    window.addEventListener("open-consultation", show);
    return () => window.removeEventListener("open-consultation", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-ink-deep/80 p-3 backdrop-blur-sm md:p-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div ref={dialogRef} className="relative my-auto w-full max-w-2xl rounded-[1.5rem] bg-cream p-5 shadow-2xl md:p-9" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
        <button type="button" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-ink/15 text-ink" aria-label="Закрыть окно" onClick={close}>
          <X aria-hidden="true" />
        </button>
        <span className="eyebrow">Консультация</span>
        <h2 id="consultation-title" ref={titleRef} tabIndex={-1} className="max-w-xl pr-12 text-3xl font-bold tracking-[-0.04em] text-ink md:text-5xl">
          Расскажите, что нужно решить
        </h2>
        <p className="mb-7 mt-4 max-w-xl leading-7 text-ink-soft">Оставьте контакты и коротко опишите задачу. Специалист уточнит детали и предложит следующий шаг.</p>
        <LeadForm formType="consultation" compact />
      </div>
    </div>
  );
}
