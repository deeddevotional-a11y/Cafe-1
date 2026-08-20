/**
 * Header / Nav
 * ------------------------------------------------------------------
 * · Transparent over the hero, frosted + bordered once you scroll
 * · Scroll-spy highlights the section you are reading
 * · Mobile: full-screen slide-down panel, Esc to close, scroll locked,
 *   focus moved into (and returned from) the panel
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu as MenuIcon, X, Coffee } from 'lucide-react';
import { Button, Container } from './ui.jsx';
import {
  cx,
  scrollToId,
  useBodyScrollLock,
  useScrolled,
  useScrollSpy,
  telHref,
  getOpenState,
} from '../lib/utils.js';

export default function Header({ cafe }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(32);
  const navIds = useMemo(() => cafe.nav.map((n) => n.id), [cafe.nav]);
  const active = useScrollSpy(navIds);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const openState = getOpenState(cafe.hours);

  useBodyScrollLock(open);

  /* Esc closes the mobile panel and returns focus to the toggle. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector('a, button')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => (event) => {
    event.preventDefault();
    setOpen(false);
    scrollToId(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70'
          : 'border-b border-transparent bg-gradient-to-b from-black/55 to-transparent',
      )}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4">
        {/* ---------------------------------------------------------- logo */}
        <a
          href="#top"
          onClick={go('top')}
          className="group flex items-center gap-2.5 py-2"
          aria-label={`${cafe.brand.name} — back to top`}
        >
          {cafe.brand.logoSrc ? (
            <img src={cafe.brand.logoSrc} alt="" className="h-8 w-auto" />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full border border-brand/50 bg-brandsoft font-display text-sm font-semibold text-brand">
              {cafe.brand.monogram}
            </span>
          )}
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate whitespace-nowrap font-display text-lg tracking-[-0.01em] sm:text-xl">
              {cafe.brand.name}
            </span>
            <span className="mt-1 hidden text-[10px] uppercase tracking-[0.22em] text-muted sm:block">
              {cafe.brand.tagline}
            </span>
          </span>
        </a>

        {/* ----------------------------------------------------- desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {cafe.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cx(
                    'relative flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium transition-colors',
                    active === item.id ? 'text-brand' : 'text-ink/80 hover:text-brand',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute inset-x-4 bottom-2 h-px origin-left bg-brand transition-transform duration-300',
                      active === item.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* --------------------------------------------------- right actions */}
        <div className="flex items-center gap-2">
          <a
            href={telHref(cafe.contact.phone)}
            className="hidden min-h-[44px] items-center rounded-full border border-line px-4 text-sm text-ink/85 transition-colors hover:border-brand hover:text-brand xl:inline-flex"
          >
            {cafe.contact.phoneDisplay}
          </a>
          {/* wrapped in a span so the button's own `inline-flex` never fights
              a `hidden` utility at the same specificity */}
          <span className="hidden sm:block">
            <Button href={cafe.headerCta.href} target="_blank" rel="noopener noreferrer">
              <Coffee aria-hidden="true" className="h-4 w-4" />
              {cafe.headerCta.label}
            </Button>
          </span>

          {/* Hamburger — 44px tap target, announces its state */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <MenuIcon aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      {/* ------------------------------------------------------ mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-bg/98 backdrop-blur-xl lg:hidden"
      >
        <Container className="py-5">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
            {openState.label}
          </p>
          <ul className="flex flex-col divide-y divide-line">
            {cafe.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  className="flex min-h-[56px] items-center justify-between font-display text-2xl text-ink transition-colors hover:text-brand"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-brand/70">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button href={cafe.headerCta.href} target="_blank" rel="noopener noreferrer">
              {cafe.headerCta.label}
            </Button>
            <Button variant="outline" href={telHref(cafe.contact.phone)}>
              Call {cafe.contact.phoneDisplay}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
