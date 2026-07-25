export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={`section-title ${light ? "text-cream" : "text-ink"}`}>{title}</h2>
      {description ? (
        <p className={`mt-6 max-w-2xl text-base leading-7 md:text-lg ${light ? "text-cream/70" : "text-ink-soft"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
