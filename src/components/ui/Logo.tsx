import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 no-underline" aria-label="Наш Город — на главную">
      <Image
        src="/images/logo-nash-gorod.png"
        alt="Логотип агентства недвижимости Наш Город"
        width={56}
        height={56}
        sizes="56px"
        className="size-12 shrink-0 rounded-[0.8rem] object-contain shadow-sm md:size-14"
      />
      <span className="flex flex-col leading-none">
        <span className={`text-base font-bold tracking-[-0.03em] ${light ? "text-white" : "text-ink"}`}>Наш Город</span>
        <span className={`mt-1 text-[0.67rem] ${light ? "text-white/60" : "text-ink-soft"}`}>недвижимость · Братск</span>
      </span>
    </Link>
  );
}
