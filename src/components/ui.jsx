/**
 * Shared presentational primitives used across every section.
 * Keeping them here means one place to change rhythm, buttons and headings.
 */

import { cx, scrollToId, useReveal } from '../lib/utils.js';

/* ------------------------------------------------------------------ layout */

export function Container({ className, children }) {
  return (
    <div className={cx('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </div>
  );
}

/** A page section with consistent vertical rhythm + scroll-reveal. */
export function Section({ id, className, children, labelledBy }) {
  const [ref, shown] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={labelledBy}
      className={cx('reveal py-16 sm:py-20 lg:py-28', shown && 'is-visible', className)}
    >
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------- headings */

export function Eyebrow({ children, className }) {
  return (
    <p
      className={cx(
        'flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-brand/60" />
      {children}
    </p>
  );
}

export function SectionHeading({ id, children, className, as: Tag = 'h2' }) {
  return (
    <Tag
      id={id}
      className={cx(
        'font-display text-3xl leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-[2.9rem]',
        'text-balance-tight',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------- buttons */

const BASE_BTN =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold ' +
  'transition-[transform,background-color,color,border-color] duration-200 active:scale-[0.98]';

const VARIANTS = {
  primary: 'bg-brand text-brandink hover:bg-brand/90',
  outline: 'border border-line text-ink hover:border-brand hover:text-brand',
  ghost: 'text-ink/90 hover:text-brand',
  soft: 'bg-brandsoft text-brand hover:bg-brand hover:text-brandink',
};

export function Button({
  as = 'a',
  variant = 'primary',
  className,
  children,
  href,
  onClick,
  ...rest
}) {
  const Tag = as;
  /* In-page links get smooth, header-aware scrolling. */
  const handleClick = (event) => {
    if (typeof href === 'string' && href.startsWith('#')) {
      event.preventDefault();
      scrollToId(href.slice(1));
      window.history.replaceState(null, '', href);
    }
    onClick?.(event);
  };

  return (
    <Tag
      href={href}
      onClick={handleClick}
      className={cx(BASE_BTN, VARIANTS[variant], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ badges */

export function Badge({ children, tone = 'brand', className }) {
  const tones = {
    brand: 'bg-brandsoft text-brand',
    outline: 'border border-line text-muted',
    solid: 'bg-brand text-brandink',
    accent: 'bg-accent/20 text-accent',
  };
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Star rating with an accessible text equivalent. */
export function Stars({ rating = 5, className }) {
  return (
    <span className={cx('inline-flex items-center gap-0.5', className)}>
      <span className="sr-only">{rating} out of 5 stars</span>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={cx('h-3.5 w-3.5', i < Math.round(rating) ? 'fill-brand' : 'fill-muted/30')}
        >
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Instagram glyph as inline SVG.
 * (lucide-react v1 dropped brand marks, so we ship our own — keeps the
 * icon set to one dependency and avoids version pinning.)
 */
export function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
