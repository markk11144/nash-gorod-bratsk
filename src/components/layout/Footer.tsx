import { company } from "@/data/company";
import { getTelHref } from "@/lib/contacts";
import { Logo } from "@/components/ui/Logo";
import { TrackableLink } from "@/components/ui/TrackableLink";

export function Footer() {
  return (
    <footer className="bg-ink-deep pb-10 pt-14 text-white">
      <div className="container-page grid gap-10 md:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/58">Агентство недвижимости в Братске. Покупка, продажа, аренда и сопровождение сделок.</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-amber">Связаться</h2>
          <TrackableLink event="phone_click" href={getTelHref()} className="mt-4 block text-lg font-bold text-white">{company.phone.display}</TrackableLink>
          <p className="mt-2 text-sm text-white/58">{company.office.streetAddress}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-amber">Информация</h2>
          <a href={company.links.twoGis} target="_blank" rel="noreferrer" className="mt-3 block text-sm text-white/72">Карточка в 2ГИС</a>
          <a href={company.links.domclick} target="_blank" rel="noreferrer" className="mt-3 block text-sm text-white/72">Профиль на Домклик</a>
        </div>
      </div>
      <div className="container-page mt-12 border-t border-white/10 pt-6 text-xs leading-5 text-white/42">
        <p>© {new Date().getFullYear()} {company.legalName}</p>
        <p className="mt-1">ИНН {company.legal.inn} · ОГРН {company.legal.ogrn}</p>
      </div>
    </footer>
  );
}
