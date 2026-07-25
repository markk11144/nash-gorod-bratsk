import { Plus } from "lucide-react";
import { faq } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section className="section-pad" id="faq">
      <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <SectionHeading eyebrow="Частые вопросы" title="Коротко о важном до консультации" />
        <div className="border-t border-ink/20">
          {faq.map((item) => (
            <details key={item.question} className="group border-b border-ink/20 py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-lg font-bold tracking-[-0.02em] text-ink md:text-xl">
                {item.question}
                <Plus className="shrink-0 text-amber-deep transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-7 pr-10 leading-7 text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
