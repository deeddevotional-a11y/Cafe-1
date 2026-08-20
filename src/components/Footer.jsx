/**
 * Footer — quick links, Instagram-forward socials, ordering links,
 * optional newsletter (client-side only; wire `onSubmit` to your ESP).
 */

import { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Button, Container, InstagramIcon } from './ui.jsx';
import { mapsHref, scrollToId, telHref, waHref } from '../lib/utils.js';

export default function Footer({ cafe }) {
  const { brand, footer, contact, nav, location } = cafe;
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    // TODO: POST `email` to Mailchimp / Buttondown / your backend.
    setSent(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-line bg-surface/60">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* --------------------------------------------------- identity */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              {brand.logoSrc ? (
                <img src={brand.logoSrc} alt="" className="h-9 w-auto" />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-full border border-brand/50 bg-brandsoft font-display text-sm text-brand">
                  {brand.monogram}
                </span>
              )}
              <span className="font-display text-2xl">{brand.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{footer.blurb}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <InstagramIcon className="h-4 w-4" />
                {contact.instagramHandle}
              </a>
              <a
                href={waHref(contact.whatsapp, contact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <span className="sr-only">Message us on WhatsApp</span>
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <span className="sr-only">Email {contact.email}</span>
                <Mail aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ------------------------------------------------ quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
              Explore
            </h2>
            <ul className="mt-4 space-y-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                    className="inline-flex min-h-[40px] items-center text-sm text-ink/85 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* --------------------------------------------------- ordering */}
          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
              Order & visit
            </h2>
            <ul className="mt-4 space-y-1">
              {contact.ordering.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center text-sm text-ink/85 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={telHref(contact.phone)}
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm text-ink/85 transition-colors hover:text-brand"
                >
                  <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mapsHref(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm text-ink/85 transition-colors hover:text-brand"
                >
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {location.addressLines[0]}
                </a>
              </li>
            </ul>
          </div>

          {/* ------------------------------------------------- newsletter */}
          {footer.newsletter?.enabled && (
            <div className="lg:col-span-3">
              <h2 className="font-display text-xl text-ink">{footer.newsletter.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{footer.newsletter.body}</p>
              <form onSubmit={onSubmit} className="mt-4">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footer.newsletter.placeholder}
                    className="min-h-[44px] flex-1 rounded-full border border-line bg-bg px-4 text-sm text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none"
                  />
                  <Button as="button" type="submit" className="shrink-0">
                    {footer.newsletter.cta}
                  </Button>
                </div>
                <p aria-live="polite" className="mt-2 min-h-[1.25rem] text-xs text-brand">
                  {sent ? footer.newsletter.success : ''}
                </p>
              </form>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------- legal */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved. {footer.credit}
          </p>
          <ul className="flex gap-5">
            {footer.legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-brand">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
