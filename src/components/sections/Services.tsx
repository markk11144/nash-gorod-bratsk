import {
  Building2,
  FileCheck2,
  FileText,
  HandCoins,
  Home,
  KeyRound,
  Landmark,
  ScrollText,
} from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = [
  Home,
  KeyRound,
  Landmark,
  FileCheck2,
  ScrollText,
  HandCoins,
  Building2,
  FileText,
];

export function Services() {
  return (
    <section className="section-pad relative overflow-hidden bg-paper" id="services">
      <span
        className="pointer-events-none absolute -left-32 top-32 size-72 rounded-full border border-green/8"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-20 bottom-24 size-64 rounded-full bg-amber/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Услуги"
          title="Всё необходимое для сделки с недвижимостью"
          description="Берем на себя проверку документов и организацию ведения всего процесса сделки."
        />

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[index];
            const number = String(index + 1).padStart(2, "0");

            return (
              <Reveal
                key={service.id}
                className="h-full min-w-0"
                delay={(index % 2) * 0.06}
              >
                <article className="group relative flex h-full min-h-[19rem] min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-green/12 bg-white p-6 shadow-[0_16px_48px_rgba(32,55,34,.055)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-green/30 hover:shadow-[0_24px_64px_rgba(32,55,34,.12)] sm:p-8 md:min-h-[21rem]">
                  <span
                    className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full border border-amber/65 transition-transform duration-300 ease-out group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute right-8 top-8 size-3 rotate-45 rounded-[0.2rem] bg-amber/65 transition-transform duration-300 ease-out group-hover:rotate-[55deg]"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 bg-[linear-gradient(135deg,transparent_49%,rgba(238,246,229,.75)_50%)]"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid size-14 shrink-0 place-items-center rounded-[1.1rem] border border-green/10 bg-green-soft text-green-deep shadow-[0_8px_22px_rgba(63,121,13,.08)] transition-[transform,background-color,color,border-color] duration-300 ease-out group-hover:scale-105 group-hover:border-green-deep group-hover:bg-green-deep group-hover:text-white">
                      <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="pr-3 text-sm font-extrabold tracking-[0.12em] text-green-deep/45 transition-colors duration-300 group-hover:text-green-deep">
                      {number}
                    </span>
                  </div>

                  <h3 className="relative mt-7 break-words text-xl font-bold leading-[1.18] tracking-[-0.035em] text-ink [overflow-wrap:anywhere] sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="relative mt-4 max-w-xl leading-7 text-ink-soft">
                    {service.description}
                  </p>

                  <div className="relative mt-auto pt-7">
                    <div className="mb-4 h-px w-full bg-line">
                      <span className="block h-px w-12 bg-amber transition-[width] duration-300 ease-out group-hover:w-20" />
                    </div>
                    <p className="max-w-[90%] text-xs font-semibold leading-5 text-green-deep">
                      {service.proof}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
