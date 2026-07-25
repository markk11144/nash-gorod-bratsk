"use client";

import { Building2, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { company } from "@/data/company";
import { getTelHref } from "@/lib/contacts";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink/10 bg-white/96 p-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(32,36,31,.08)] backdrop-blur-xl md:hidden">
      <a href={getTelHref()} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink/12 bg-white text-sm font-bold text-ink no-underline" onClick={() => trackEvent("phone_click", { source: "mobile-bar" })}>
        <Phone size={18} aria-hidden="true" /> Позвонить
      </a>
      <a href={company.links.domclick} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber text-sm font-bold text-ink-deep no-underline">
        <Building2 size={18} aria-hidden="true" /> Домклик
      </a>
    </div>
  );
}
