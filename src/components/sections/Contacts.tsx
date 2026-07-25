import Image from "next/image";
import { ArrowUpRight, Building2, Clock3, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { company } from "@/data/company";
import { getTelHref } from "@/lib/contacts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackableLink } from "@/components/ui/TrackableLink";

export function Contacts() {
  return (
    <section className="section-pad bg-paper" id="contacts">
      <div className="container-page">
        <SectionHeading eyebrow="Контакты" title="Свяжитесь удобным способом" description="Встреча в офисе проходит по предварительной записи — согласуйте время визита по телефону." />
        <div className="grid overflow-hidden rounded-[1.7rem] border border-ink/10 bg-cream lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-6 md:p-10">
            <div className="space-y-7">
              <div className="flex gap-4"><Phone className="mt-1 shrink-0 text-green-deep" aria-hidden="true" /><div><p className="text-sm text-ink-soft">Телефон</p><TrackableLink event="phone_click" href={getTelHref()} className="mt-1 block text-2xl font-bold tracking-[-0.03em] text-ink">{company.phone.display}</TrackableLink></div></div>
              <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-green-deep" aria-hidden="true" /><div><p className="text-sm text-ink-soft">Адрес</p><p className="mt-1 text-lg font-bold text-ink">{company.office.full}</p></div></div>
              <div className="flex gap-4"><Clock3 className="mt-1 shrink-0 text-green-deep" aria-hidden="true" /><div><p className="text-sm text-ink-soft">Приём</p><p className="mt-1 text-lg font-bold text-ink">{company.schedule.label}</p></div></div>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <TrackableLink event="vk_click" href={company.links.vk} target="_blank" rel="noreferrer" className="btn-ghost !rounded-xl">VK <ArrowUpRight size={16} /></TrackableLink>
              {company.links.max ? (
                <a href={company.links.max} target="_blank" rel="noreferrer" className="btn-ghost !rounded-xl"><MessageCircle size={17} /> MAX</a>
              ) : (
                <span className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-dashed border-ink/20 px-3 text-sm font-semibold text-ink-soft" aria-disabled="true"><MessageCircle size={17} /> MAX · уточняется</span>
              )}
              <TrackableLink event="map_click" href={company.links.twoGis} target="_blank" rel="noreferrer" className="btn-ghost !rounded-xl">2ГИС <ArrowUpRight size={16} /></TrackableLink>
              <a href={company.links.domclick} target="_blank" rel="noreferrer" className="btn-ghost !rounded-xl"><Building2 size={17} /> Домклик</a>
            </div>
          </div>

          <div className="relative min-h-[460px] overflow-hidden bg-green-deep p-6 text-white md:p-10">
            <Image
              src="/images/office-mira-27.png"
              alt="Табличка офиса агентства недвижимости «Наш Город»"
              fill
              quality={88}
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="scale-[1.06] object-cover object-[50%_32%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/68 to-ink/28" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/18" aria-hidden="true" />
            <div className="relative flex h-full min-h-[380px] flex-col justify-between">
              <div>
                <span className="grid size-14 place-items-center rounded-2xl bg-amber text-ink-deep shadow-lg"><MapPin size={27} aria-hidden="true" /></span>
                <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-white/72">Офис в Центральном районе</p>
                <p className="mt-3 max-w-md text-3xl font-bold leading-tight tracking-[-0.04em] text-white drop-shadow-sm">ул. Мира, 27<br />кабинет 205</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <TrackableLink event="map_click" href={company.links.twoGis} target="_blank" rel="noreferrer" className="btn-secondary">Открыть карту <ArrowUpRight size={18} /></TrackableLink>
                <TrackableLink event="map_click" href={company.links.directions} target="_blank" rel="noreferrer" className="btn-primary"><Navigation size={18} /> Построить маршрут</TrackableLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
