/**
 * Specials & Events (optional — returns null if `cafe.events` is falsy).
 * Weekly specials, live nights, workshops + a loyalty-programme card.
 */

import { CalendarDays, Gift } from 'lucide-react';
import { Badge, Button, Container, Eyebrow, Section, SectionHeading } from './ui.jsx';
import { waHref } from '../lib/utils.js';

export default function Events({ cafe }) {
  const { events, contact } = cafe;
  if (!events) return null;

  return (
    <Section id="events" labelledBy="events-heading" className="border-y border-line bg-surface/40">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{events.eyebrow}</Eyebrow>
            <SectionHeading id="events-heading" className="mt-5">
              {events.heading}
            </SectionHeading>
          </div>
          <p className="flex items-center gap-2 text-sm text-muted">
            <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand" />
            Seats are limited — message us to hold one
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.items.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-colors hover:border-brand/60"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{item.day}</p>
                {item.badge && <Badge tone="brand">{item.badge}</Badge>}
              </div>
              <h3 className="mt-4 font-display text-xl leading-snug text-ink">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>

        {/* ------------------------------------------------------- loyalty */}
        {events.loyalty && (
          <div className="mt-6 grid items-center gap-6 rounded-card border border-brand/30 bg-brandsoft p-6 sm:p-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
                <Gift aria-hidden="true" className="h-4 w-4" />
                Loyalty
              </p>
              <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                {events.loyalty.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/80">
                {events.loyalty.body}
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Button
                href={waHref(contact.whatsapp, 'Hi! I would like to join the loyalty programme.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Join on WhatsApp
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
