/**
 * Our Story — narrative text beside a tall portrait photo,
 * with three short "pillars" (sourcing / roasting / baking) underneath.
 */

import { Container, Eyebrow, Section, SectionHeading } from './ui.jsx';

export default function Story({ cafe }) {
  const { story } = cafe;

  return (
    <Section id="story" labelledBy="story-heading" className="relative">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------- text */}
          <div className="lg:col-span-7 lg:pt-6">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <SectionHeading id="story-heading" className="mt-5 max-w-2xl">
              {story.heading}
            </SectionHeading>

            <div className="mt-6 space-y-5 text-[15px] leading-[1.75] text-muted sm:text-base">
              {story.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-ink/90' : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <p className="mt-7 font-display text-lg italic text-brand">— {story.signature}</p>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
              {story.pillars.map((pillar) => (
                <li key={pillar.title} className="bg-surface p-5">
                  <h3 className="font-display text-lg text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------ image */}
          <figure className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-card border border-line">
              <img
                src={story.image}
                alt={story.imageAlt}
                loading="lazy"
                decoding="async"
                className="h-[380px] w-full object-cover sm:h-[520px] lg:h-[640px]"
              />
            </div>
            {/* organic accent shape — purposeful, not clutter */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-accent/25 blur-2xl"
            />
            <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">
              Est. {cafe.brand.established} · Roastery & cafe
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
