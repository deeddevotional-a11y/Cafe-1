/**
 * Location & Hours
 * ------------------------------------------------------------------
 * · Keyless Google Maps embed (no API key, lazy-loaded iframe)
 * · Click-to-call, click-to-WhatsApp and Get Directions deep links
 * · Day-wise hours with today highlighted + holiday note
 * · Ambiance tags so people know what kind of room they are walking into
 */

import { MapPin, Phone, MessageCircle, Car, TrainFront, Clock } from 'lucide-react';
import { Badge, Button, Container, Eyebrow, Section, SectionHeading } from './ui.jsx';
import { cx, getOpenState, mapEmbedSrc, mapsHref, telHref, waHref } from '../lib/utils.js';

export default function Visit({ cafe }) {
  const { location, hours, contact, ambiance } = cafe;
  const openState = getOpenState(hours);
  const todayIndex = new Date().getDay();

  return (
    <Section id="visit" labelledBy="visit-heading">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{location.eyebrow}</Eyebrow>
            <SectionHeading id="visit-heading" className="mt-5">
              {location.heading}
            </SectionHeading>
          </div>
          <p
            className={cx(
              'inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm sm:self-auto',
              openState.isOpen ? 'border-brand/40 text-brand' : 'border-line text-muted',
            )}
          >
            <Clock aria-hidden="true" className="h-4 w-4" />
            {openState.label}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* ---------------------------------------------------------- map */}
          <div className="overflow-hidden rounded-card border border-line bg-surface lg:col-span-7">
            <iframe
              title={`Map showing ${cafe.brand.name} at ${location.addressLines.join(', ')}`}
              src={mapEmbedSrc(location)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[280px] w-full border-0 grayscale-[0.5] brightness-[0.85] contrast-[1.05] sm:h-[360px] lg:h-[420px]"
            />
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <address className="not-italic">
                <p className="flex items-start gap-2 font-display text-lg text-ink">
                  <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    {location.addressLines.map((line) => (
                      <span key={line} className="block leading-snug">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
              </address>
              <Button
                href={mapsHref(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Get Directions
              </Button>
            </div>
          </div>

          {/* -------------------------------------------------------- hours */}
          <div className="rounded-card border border-line bg-surface p-6 lg:col-span-5">
            <h3 className="font-display text-xl text-ink">Hours</h3>
            <dl className="mt-4 divide-y divide-line">
              {hours.schedule.map((row) => {
                const isToday = row.index === todayIndex;
                return (
                  <div key={row.day} className="flex flex-wrap items-baseline gap-x-3 py-2.5">
                    <dt
                      className={cx(
                        'w-28 text-sm',
                        isToday ? 'font-semibold text-brand' : 'text-muted',
                      )}
                    >
                      {row.day}
                      {isToday && <span className="sr-only"> (today)</span>}
                    </dt>
                    <dd
                      className={cx(
                        'text-sm tabular-nums',
                        isToday ? 'font-semibold text-ink' : 'text-ink/80',
                      )}
                    >
                      {row.closed ? 'Closed' : `${row.open} — ${row.close}`}
                    </dd>
                    {row.note && (
                      <dd className="w-full text-xs italic text-muted">{row.note}</dd>
                    )}
                  </div>
                );
              })}
            </dl>

            <p className="mt-4 rounded-xl border border-line bg-surface2 p-3 text-xs leading-relaxed text-muted">
              {hours.holidayNote} {location.notes}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button variant="outline" href={telHref(contact.phone)}>
                <Phone aria-hidden="true" className="h-4 w-4" />
                Call us
              </Button>
              <Button
                variant="soft"
                href={waHref(contact.whatsapp, contact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* ------------------------------------------ parking + transit */}
          <div className="grid gap-4 lg:col-span-12 lg:grid-cols-3">
            <div className="rounded-card border border-line bg-surface p-5">
              <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                <Car aria-hidden="true" className="h-4 w-4 text-brand" />
                Parking
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{location.parking}</p>
            </div>
            <div className="rounded-card border border-line bg-surface p-5">
              <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                <TrainFront aria-hidden="true" className="h-4 w-4 text-brand" />
                Getting here
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{location.transit}</p>
            </div>
            <div className="rounded-card border border-line bg-surface p-5">
              <h3 className="font-display text-lg text-ink">The vibe</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ambiance.map((tag) => (
                  <li key={tag}>
                    <Badge tone="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
