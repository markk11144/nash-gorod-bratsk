import { ArrowUpRight, Quote } from "lucide-react";
import { company } from "@/data/company";
import { reviews } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackableLink } from "@/components/ui/TrackableLink";

export function Reviews() {
  return (
    <section className="section-pad bg-paper" id="reviews">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Отзывы"
            title="Доверие, подтверждённое клиентами"
            description="На сайте приведены краткие пересказы повторяющихся тем. Полные отзывы доступны на независимых площадках."
          />
          <div className="mb-12 flex flex-wrap gap-3 md:mb-16">
            <TrackableLink event="reviews_click" href={company.links.domclick} target="_blank" rel="noreferrer" className="btn-ghost shrink-0">
              Отзывы на Домклик <ArrowUpRight size={18} aria-hidden="true" />
            </TrackableLink>
            <TrackableLink event="reviews_click" href={company.links.twoGisReviews} target="_blank" rel="noreferrer" className="btn-primary shrink-0">
              Отзывы в 2ГИС <ArrowUpRight size={18} aria-hidden="true" />
            </TrackableLink>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.topic} className="panel flex min-h-72 flex-col p-6 md:p-8">
              <span className="grid size-11 place-items-center rounded-full bg-green-soft"><Quote size={22} className="text-green-deep" aria-hidden="true" /></span>
              <h3 className="mt-9 text-xl font-bold tracking-[-0.03em] text-ink">{review.topic}</h3>
              <p className="mt-4 flex-1 leading-7 text-ink-soft">{review.summary}</p>
              <a href={review.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 border-t border-line pt-4 text-xs font-semibold text-ink-soft">
                {review.attribution}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
