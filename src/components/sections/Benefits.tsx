import Image from "next/image";
import { FileSearch, Handshake, MapPinned, ShieldCheck } from "lucide-react";
import { benefits } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = [MapPinned, FileSearch, ShieldCheck, Handshake];

export function Benefits() {
  return (
    <section className="section-pad relative isolate overflow-hidden bg-green-deep" id="benefits">
      <Image
        src="/images/benefits-home-keys.png"
        alt=""
        fill
        quality={86}
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,67,34,.97)_0%,rgba(28,67,34,.90)_38%,rgba(28,67,34,.67)_67%,rgba(20,31,23,.42)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(21,39,24,.15)_0%,rgba(21,39,24,.08)_45%,rgba(21,39,24,.48)_100%)]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="[&_.eyebrow]:rounded-full [&_.eyebrow]:border [&_.eyebrow]:border-white/70 [&_.eyebrow]:bg-white/95 [&_.eyebrow]:px-4 [&_.eyebrow]:py-2.5 [&_.eyebrow]:text-green-deep [&_.eyebrow]:shadow-[0_10px_28px_rgba(12,31,16,.18)] [&_.eyebrow]:backdrop-blur-sm">
          <SectionHeading
            eyebrow="Почему выбирают нас"
            title="Надёжность складывается из внимания к деталям"
            description="Сильная сторона агентства — не громкие обещания, а знание города, проверка документов и сопровождение конкретной ситуации."
            light
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={benefit.title} className="h-full" delay={index * 0.04}>
                <article className="group h-full rounded-[1.4rem] border border-white/45 bg-white/90 p-6 shadow-[0_18px_50px_rgba(11,27,14,.18)] backdrop-blur-md transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-amber/75 hover:bg-white/95 hover:shadow-[0_24px_60px_rgba(11,27,14,.26)] md:p-7">
                  <span className="grid size-11 place-items-center rounded-full bg-amber text-ink-deep shadow-[0_8px_20px_rgba(254,237,1,.2)] transition-transform duration-300 ease-out group-hover:scale-105">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 text-xl font-bold tracking-[-0.03em] text-ink">{benefit.title}</h3>
                  <p className="mt-4 leading-7 text-ink-soft">{benefit.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
