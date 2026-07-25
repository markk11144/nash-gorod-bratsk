"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { company } from "@/data/company";
import { getTelHref } from "@/lib/contacts";
import { trackEvent } from "@/lib/analytics";
import { Logo } from "@/components/ui/Logo";

const nav = [
  ["Услуги", "/#services"],
  ["Почему мы", "/#benefits"],
  ["О компании", "/#about"],
  ["Отзывы", "/#reviews"],
  ["FAQ", "/#faq"],
  ["Контакты", "/#contacts"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-white/94 backdrop-blur-xl">
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Основная навигация">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="text-[15px] font-bold text-ink-soft no-underline transition-colors hover:text-green-deep">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href={getTelHref()}
            className="inline-flex items-center gap-2 rounded-full border border-green/20 bg-green-soft px-5 py-3 text-[15px] font-extrabold text-ink no-underline shadow-[0_8px_24px_rgba(45,107,45,.08)] transition-colors hover:border-green/40 hover:text-green-deep"
            onClick={() => trackEvent("phone_click", { source: "header" })}
          >
            <Phone size={17} aria-hidden="true" />
            {company.phone.display}
          </a>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="border-t border-ink/10 bg-white px-4 pb-6 pt-3 md:hidden" aria-label="Мобильная навигация">
          <div className="container-page flex flex-col">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="border-b border-ink/10 py-4 text-lg font-semibold text-ink no-underline" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a href={getTelHref()} className="mt-5 flex items-center gap-2 font-bold text-ink" onClick={() => trackEvent("phone_click", { source: "mobile-menu" })}>
              <Phone size={19} aria-hidden="true" /> {company.phone.display}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
