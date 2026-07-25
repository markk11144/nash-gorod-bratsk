import Image from "next/image";
import { ArrowUpRight, Check, UserRound } from "lucide-react";
import { team } from "@/data/team";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Team() {
  const member = team[0];

  return (
    <section className="section-pad" id="specialist">
      <div className="container-page">
        <SectionHeading
          eyebrow="Специалист"
          title="Екатерина Попова"
          description="Руководитель агентства недвижимости и специалист, который ведёт клиента через ключевые этапы сделки."
        />
        <Reveal>
          <article className="grid overflow-hidden rounded-[1.8rem] border border-ink/10 bg-white shadow-soft lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative aspect-[3/4] bg-green-soft lg:aspect-auto lg:min-h-[680px]">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={`${member.name} в офисе агентства недвижимости «Наш Город»`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-contain"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center p-8 text-center">
                  <div>
                    <span className="mx-auto grid size-24 place-items-center rounded-full border border-green/20 bg-white text-green-deep">
                      <UserRound size={42} strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <p className="mt-6 text-sm font-semibold text-ink-soft">Фото будет добавлено позже</p>
                  </div>
                </div>
              )}
              <span className="absolute left-5 top-5 rounded-full bg-amber px-4 py-2 text-xs font-bold text-ink-deep">Подтверждённый профиль</span>
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-green-deep">{member.role}</p>
              <h3 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-ink md:text-5xl">{member.name}</h3>
              <p className="mt-4 text-lg font-bold text-ink">{member.experience}</p>
              <p className="mt-5 max-w-xl leading-7 text-ink-soft">{member.description}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {member.strengths.map((strength) => (
                  <li key={strength} className="flex gap-3 text-sm font-semibold leading-6 text-ink">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-soft text-green-deep"><Check size={14} aria-hidden="true" /></span>
                    {strength}
                  </li>
                ))}
              </ul>
              <a href={member.sourceUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-9 w-fit">
                Профиль Екатерины на Домклик <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
