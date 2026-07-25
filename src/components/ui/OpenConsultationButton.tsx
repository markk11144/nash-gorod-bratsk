"use client";

import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function OpenConsultationButton({
  label = "Обсудить задачу",
  className = "btn-primary",
  source = "section",
}: {
  label?: string;
  className?: string;
  source?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (source === "hero") trackEvent("hero_cta_click", { source });
        window.dispatchEvent(new CustomEvent("open-consultation"));
      }}
    >
      {label}
      <ArrowUpRight size={18} aria-hidden="true" />
    </button>
  );
}
