import Image from "next/image";
import { BadgeCheck, Building2, MapPin } from "lucide-react";
import { company } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section className="section-pad bg-paper" id="about">
      <div className="container-page">
        <div className="grid items-center gap-9 rounded-[1.8rem] border border-ink/10 bg-cream p-4 shadow-[0_24px_70px_rgba(27,52,42,0.08)] sm:p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:p-10">
          <div className="relative aspect-square overflow-hidden rounded-[1.55rem] border border-white/80 bg-white shadow-[0_22px_55px_rgba(27,52,42,0.16)]">
            <Image
              src="/images/about-company-collage.png"
              alt="Коллаж агентства недвижимости «Наш Город»: Екатерина Попова, фирменный стиль, сертификаты и рабочие материалы"
              fill
              sizes="(max-width: 1023px) 100vw, 44vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
          </div>
          <div>
            <SectionHeading eyebrow="О компании" title="Местная команда для важных решений" />
            <div className="mb-5 inline-flex rounded-full border border-green-deep/15 bg-white px-4 py-2 text-sm font-bold text-green-deep shadow-sm">
              ООО «Агентство недвижимости Наш Город»
            </div>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft">
              Помогаем решать вопросы с покупкой, продажей, арендой и оформлением недвижимости. Офис находится в Центральном районе Братска, а данные компании подтверждаются профильными площадками и юридическим реестром.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="flex gap-3"><Building2 className="shrink-0 text-green-deep" size={20} /><p className="text-sm leading-5 text-ink-soft">ИНН {company.legal.inn}</p></div>
              <div className="flex gap-3"><MapPin className="shrink-0 text-green-deep" size={20} /><p className="text-sm leading-5 text-ink-soft">Мира, 27, офис 205</p></div>
              <div className="flex gap-3"><BadgeCheck className="shrink-0 text-green-deep" size={20} /><p className="text-sm leading-5 text-ink-soft">Профили в 2ГИС и Домклик</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
