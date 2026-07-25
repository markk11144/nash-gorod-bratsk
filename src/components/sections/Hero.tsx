import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Building2, MapPin, Phone, Star } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "@/components/ui/Reveal";
import { getTelHref } from "@/lib/contacts";

const facts = [
  { value: "Более 11 лет", label: "опыт специалиста", icon: BadgeCheck },
  { value: "4+ года", label: "Екатерина на Домклик", icon: Building2 },
  { value: "Братск", label: "Работа по всей РФ", icon: MapPin },
  { value: "5,0", label: "рейтинг на площадках", icon: Star },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="absolute -left-28 top-6 size-80 rounded-full bg-amber/16 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-0 size-[34rem] rounded-full bg-green/8 blur-3xl" aria-hidden="true" />

      <div className="container-page relative py-5 lg:py-6">
        <div className="grid overflow-hidden rounded-[2rem] border border-green/10 bg-white shadow-[0_24px_80px_rgba(29,53,34,.10)] lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex items-center">
            <div className="p-6 sm:p-8 lg:p-9 xl:p-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-green/15 bg-green-soft/55 px-4 py-2.5">
                <span className="size-2.5 shrink-0 rounded-full bg-amber ring-4 ring-amber/20" aria-hidden="true" />
                <p className="text-sm font-extrabold uppercase leading-none tracking-[0.1em] text-green-deep">
                  Агентство недвижимости в Братске
                </p>
              </div>

              <h1 className="sr-only">Наш Город — агентство недвижимости в Братске</h1>
              <div className="relative mt-5 aspect-[1.45/1] w-full max-w-[500px] overflow-hidden rounded-[1.75rem] bg-amber shadow-[0_18px_42px_rgba(71,113,30,.16)]">
                <Image
                  src="/images/logo-hero-wide.png"
                  alt="Наш Город — агентство недвижимости"
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 43vw"
                  className="object-cover object-center"
                />
              </div>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Помощь в купле-продаже, аренде, аренде квартир, работе с коммерческими, жилыми и нежилыми помещениями, услуги по приватизации, юридические консультации, консультации по вопросам недвижимости, сопровождение сделок любой сложности. Помощь клиентам на каждом этапе сделки.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-amber px-7 text-[15px] font-extrabold text-ink no-underline shadow-[0_12px_28px_rgba(254,237,1,.24)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(254,237,1,.32)]" href={getTelHref()}>
                  <Phone size={19} strokeWidth={2.25} aria-hidden="true" />
                  Позвонить нам
                </a>
                <a className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border-2 border-green-deep bg-white px-6 text-sm font-extrabold text-green-deep no-underline shadow-[0_10px_24px_rgba(45,107,45,.10)] transition hover:-translate-y-0.5 hover:bg-green-deep hover:text-white" href={company.links.domclick} target="_blank" rel="noreferrer">
                  <Building2 size={18} aria-hidden="true" />
                  Смотреть объекты на Домклик <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative m-2 min-h-[470px] overflow-hidden rounded-[1.75rem] bg-green-deep lg:min-h-full">
            <Image
              src="/images/bratsk-city-aerial.png"
              alt="Панорамный вид жилых районов Братска"
              fill
              priority
              quality={86}
              sizes="(max-width: 1023px) 100vw, 57vw"
              className="scale-[1.08] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/5 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-deep/12 to-transparent" aria-hidden="true" />

            <div className="absolute inset-x-6 bottom-6 text-white md:inset-x-8 md:bottom-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-amber text-green-deep">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber">Братск · Иркутская область</p>
                  <p className="mt-1 text-sm text-white/80">Город среди леса и воды</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-[0_14px_42px_rgba(29,53,34,.06)] sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <div key={fact.label} className={`flex items-center gap-4 p-4 lg:p-5 ${index ? "border-t border-ink/10 sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber/22 text-green-deep">
                <fact.icon size={21} strokeWidth={2} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[1.35rem] font-extrabold leading-none tracking-[-0.04em] text-ink">{fact.value}</p>
                <p className="mt-1.5 text-xs leading-tight text-ink-soft">{fact.label}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="px-1 py-2 text-[11px] leading-4 text-ink-soft/65">
          Показатели опыта относятся к Екатерине Поповой и основаны на её подтверждённом профиле Домклик.
        </p>
      </div>
    </section>
  );
}
