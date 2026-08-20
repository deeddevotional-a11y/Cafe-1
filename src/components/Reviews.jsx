/**
 * Reviews — snap-scrolling carousel on mobile, static grid on desktop.
 * Uses native scroll (no carousel library): swipe on touch, buttons on
 * pointer devices, and every card is reachable by keyboard/tab order.
 */

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Badge, Container, Eyebrow, Section, SectionHeading, Stars } from './ui.jsx';

function ReviewCard({ review }) {
  return (
    <article className="flex h-full w-[85vw] shrink-0 snap-center flex-col rounded-card border border-line bg-surface p-6 sm:w-auto sm:shrink">
      <Quote aria-hidden="true" className="h-6 w-6 text-brand/50" />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/90">
        “{review.quote}”
      </blockquote>
      <footer className="mt-6 border-t border-line pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-lg text-ink">{review.name}</p>
          <Badge tone="outline">{review.platform}</Badge>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <Stars rating={review.rating} />
          <span className="text-xs text-muted">{review.meta}</span>
        </div>
      </footer>
    </article>
  );
}

export default function Reviews({ cafe }) {
  const { reviews } = cafe;
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * (track.clientWidth * 0.85), behavior: 'smooth' });
  };

  return (
    <Section id="reviews" labelledBy="reviews-heading">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{reviews.eyebrow}</Eyebrow>
            <SectionHeading id="reviews-heading" className="mt-5">
              {reviews.heading}
            </SectionHeading>
          </div>

          <div className="flex items-center gap-5">
            {reviews.summary && (
              <p className="flex items-center gap-3 rounded-full border border-line px-4 py-2">
                <span className="font-display text-2xl text-brand">{reviews.summary.rating}</span>
                <span className="text-xs leading-tight text-muted">
                  <Stars rating={reviews.summary.rating} className="mb-1 block" />
                  {reviews.summary.count.toLocaleString('en-IN')} {reviews.summary.source}
                </span>
              </p>
            )}
            <div className="hidden gap-2 sm:flex xl:hidden">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-brand hover:text-brand"
              >
                <span className="sr-only">Previous reviews</span>
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-brand hover:text-brand"
              >
                <span className="sr-only">Next reviews</span>
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* mobile/tablet: horizontal snap carousel · desktop: 3-col grid */}
        <div
          ref={trackRef}
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 xl:mx-0 xl:grid xl:grid-cols-3 xl:gap-6 xl:overflow-visible xl:px-0"
        >
          {reviews.items.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
