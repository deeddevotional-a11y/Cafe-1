/**
 * Hero — full-bleed atmospheric banner.
 * The image sits behind a two-stop gradient so headline contrast stays
 * well above 4.5:1 no matter which photo the cafe drops in.
 */

import { ArrowDown, MapPin } from 'lucide-react';
import { Button, Container } from './ui.jsx';
import { getOpenState, mapsHref } from '../lib/utils.js';

export default function Hero({ cafe }) {
  const { hero, brand } = cafe;
  const openState = getOpenState(cafe.hours);
  const secondaryHref =
    hero.secondaryCta.href === 'MAPS' ? mapsHref(cafe.location) : hero.secondaryCta.href;

  return (
    <section id="top" className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      {/* ------------------------------------------------------- background */}
      <img
        src={hero.image}
        alt={hero.alt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,13,12,0.72)_0%,rgba(11,13,12,0.35)_38%,rgba(11,13,12,0.93)_100%)]"
      />
      {/* slow ambient drift keeps a still photo feeling filmic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-[100px]"
      />

      <Container className="relative pb-14 pt-32 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
            {hero.eyebrow}
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-black/40 px-3 py-1 tracking-[0.14em] text-ink/90 backdrop-blur"
            >
              <span
                aria-hidden="true"
                className={
                  openState.isOpen
                    ? 'h-1.5 w-1.5 rounded-full bg-emerald-400'
                    : 'h-1.5 w-1.5 rounded-full bg-muted'
                }
              />
              {openState.label}
            </span>
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.75rem,10vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
            {brand.name}
          </h1>

          <p className="mt-4 font-display text-xl italic text-brand sm:text-2xl">
            {brand.tagline}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/85 sm:text-lg">
            {brand.heroLine}
          </p>

          {/* ------------------------------------------------------- CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
            <Button
              variant="outline"
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black/30 backdrop-blur sm:w-auto"
            >
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* ------------------------------------------------ trust strip */}
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl text-ink">{stat.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <span
        aria-hidden="true"
        className="absolute bottom-6 right-6 hidden animate-bounce text-muted lg:block"
      >
        <ArrowDown className="h-5 w-5" />
      </span>
    </section>
  );
}
