/**
 * Small shared helpers. Deliberately dependency-free.
 */

import { useEffect, useRef, useState } from 'react';

/* --------------------------------------------------------------- links --- */

export const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`;

export const waHref = (number, message = '') =>
  `https://wa.me/${String(number).replace(/\D/g, '')}${
    message ? `?text=${encodeURIComponent(message)}` : ''
  }`;

/** Deep link that opens the native maps app on mobile, Google Maps on desktop. */
export const mapsHref = (location) =>
  location?.mapsUrl ||
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    location?.mapQuery || location?.addressLines?.join(', ') || '',
  )}`;

/** Keyless Google Maps embed — no API key, no tracking script. */
export const mapEmbedSrc = (location) =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    location?.mapQuery || location?.addressLines?.join(', ') || '',
  )}&output=embed`;

export const formatPrice = (value, currency = '₹') =>
  typeof value === 'number' ? `${currency}${value.toLocaleString('en-IN')}` : `${currency}${value}`;

export const cx = (...parts) => parts.filter(Boolean).join(' ');

/* ---------------------------------------------------------------- hours --- */

/** Returns { isOpen, today, label } for the "Open now" pill. */
export function getOpenState(hours, now = new Date()) {
  const today = hours?.schedule?.find((d) => d.index === now.getDay());
  if (!today) return { isOpen: false, today: null, label: 'Closed today' };
  if (today.closed) return { isOpen: false, today, label: 'Closed today' };

  const toMinutes = (t) => {
    const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t);
    if (!m) return null;
    let h = Number(m[1]) % 12;
    if (/PM/i.test(m[3])) h += 12;
    return h * 60 + Number(m[2]);
  };

  const start = toMinutes(today.open);
  const end = toMinutes(today.close);
  const mins = now.getHours() * 60 + now.getMinutes();
  const isOpen = start !== null && end !== null && mins >= start && mins < end;

  return {
    isOpen,
    today,
    label: isOpen ? `Open now · until ${today.close}` : `Closed · opens ${today.open}`,
  };
}

/* ----------------------------------------------------------------- hooks --- */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Smooth-scrolls to an in-page anchor while compensating for the sticky header.
 * Falls back to an instant jump when the user prefers reduced motion.
 */
export function scrollToId(id, { offset = 72 } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  // Keep keyboard focus in sync with the visual jump.
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

/** Tracks whether the page has scrolled past a threshold (for the header). */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** Highlights the nav link for whichever section is currently in view. */
export function useScrollSpy(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin, threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);
  return active;
}

/**
 * Adds a gentle fade/rise the first time an element scrolls into view.
 * Returns a ref + the class name to apply.
 */
export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion()) {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, shown];
}

/** Locks body scroll while a modal / mobile menu is open. */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
