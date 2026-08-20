/**
 * Sticky mobile action bar — appears once the hero is scrolled past.
 * Two thumb-sized targets: order online + directions, with a call shortcut.
 * Hidden from ≥lg where the header CTA is always visible.
 */

import { MapPin, Phone, ShoppingBag } from 'lucide-react';
import { cx, mapsHref, telHref, useScrolled } from '../lib/utils.js';

export default function MobileOrderBar({ cafe }) {
  const past = useScrolled(520);

  return (
    <div
      className={cx(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-md transition-transform duration-300 lg:hidden',
        past ? 'translate-y-0' : 'translate-y-full',
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2 px-4 py-3">
        <a
          href={cafe.headerCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brandink active:scale-[0.98]"
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          {cafe.headerCta.label}
        </a>
        <a
          href={mapsHref(cafe.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-ink"
        >
          <span className="sr-only">Get directions</span>
          <MapPin aria-hidden="true" className="h-5 w-5" />
        </a>
        <a
          href={telHref(cafe.contact.phone)}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-ink"
        >
          <span className="sr-only">Call {cafe.contact.phoneDisplay}</span>
          <Phone aria-hidden="true" className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
