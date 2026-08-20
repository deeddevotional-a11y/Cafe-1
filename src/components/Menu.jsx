/**
 * Menu
 * ------------------------------------------------------------------
 * · A "Must Try" rail of signature items pulled automatically from any
 *   item flagged `signature: true` in the config
 * · Mobile  (<md): accordion, one category open at a time — easy to scan
 * · Desktop (≥md): tab list (roving arrow-key navigation) + 2-column list
 */

import { useMemo, useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { Badge, Container, Eyebrow, Section, SectionHeading } from './ui.jsx';
import { cx, formatPrice } from '../lib/utils.js';

/* ------------------------------------------------------------- menu item -- */

function MenuItem({ item, currency }) {
  return (
    <li className="break-inside-avoid border-b border-line/70 py-4 last:border-b-0">
      {/* name ····· price  (classic menu leader line) */}
      <div className="flex items-baseline gap-3">
        <h4 className="font-display text-lg leading-snug text-ink">{item.name}</h4>
        <span
          aria-hidden="true"
          className="h-px min-w-6 flex-1 self-end border-b border-dotted border-line"
        />
        <span className="shrink-0 font-display text-base text-brand tabular-nums">
          {formatPrice(item.price, currency)}
        </span>
      </div>

      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted">{item.description}</p>

      {(item.signature || item.tags?.length) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {item.signature && (
            <Badge tone="brand">
              <Star aria-hidden="true" className="h-3 w-3 fill-brand" />
              Must try
            </Badge>
          )}
          {item.tags?.map((tag) => (
            <Badge key={tag} tone="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </li>
  );
}

/* -------------------------------------------------------------- accordion -- */

function CategoryAccordion({ categories, currency }) {
  const [openId, setOpenId] = useState(categories[0]?.id);

  return (
    <div className="mt-8 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface md:hidden">
      {categories.map((category) => {
        const isOpen = openId === category.id;
        return (
          <div key={category.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : category.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${category.id}`}
                id={`accordion-${category.id}`}
                className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span>
                  <span className="block font-display text-xl text-ink">{category.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {category.items.length} items
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cx(
                    'h-5 w-5 shrink-0 text-brand transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>

            <div
              id={`panel-${category.id}`}
              role="region"
              aria-labelledby={`accordion-${category.id}`}
              hidden={!isOpen}
              className="px-5 pb-5"
            >
              <p className="text-sm italic text-muted">{category.blurb}</p>
              <ul className="mt-1">
                {category.items.map((item) => (
                  <MenuItem key={item.name} item={item} currency={currency} />
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ tabs -- */

function CategoryTabs({ categories, currency }) {
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  /* Arrow-key roving tabs (WAI-ARIA tabs pattern). */
  const onKeyDown = (event) => {
    const i = categories.findIndex((c) => c.id === activeId);
    let next = null;
    if (event.key === 'ArrowRight') next = (i + 1) % categories.length;
    if (event.key === 'ArrowLeft') next = (i - 1 + categories.length) % categories.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = categories.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveId(categories[next].id);
    document.getElementById(`tab-${categories[next].id}`)?.focus();
  };

  return (
    <div className="mt-10 hidden md:block">
      <div
        role="tablist"
        aria-label="Menu categories"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2 border-b border-line pb-4"
      >
        {categories.map((category) => {
          const selected = category.id === activeId;
          return (
            <button
              key={category.id}
              id={`tab-${category.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`tabpanel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(category.id)}
              className={cx(
                'min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors',
                selected
                  ? 'bg-brand text-brandink'
                  : 'border border-line text-muted hover:border-brand hover:text-brand',
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div
        id={`tabpanel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-14"
      >
        {/* category photo — food photography stays the hero of the design */}
        <figure className="lg:col-span-4">
          <div className="overflow-hidden rounded-card border border-line">
            <img
              key={active.image}
              src={active.image}
              alt={`${active.name} — ${active.blurb}`}
              loading="lazy"
              decoding="async"
              className="h-[300px] w-full object-cover lg:h-[440px]"
            />
          </div>
          <figcaption className="mt-4 font-display text-lg italic text-brand">
            {active.blurb}
          </figcaption>
        </figure>

        <ul className="lg:col-span-8 lg:columns-2 lg:gap-x-12">
          {active.items.map((item) => (
            <MenuItem key={item.name} item={item} currency={currency} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ menu -- */

export default function MenuSection({ cafe }) {
  const { menu } = cafe;

  const signatures = useMemo(
    () =>
      menu.categories.flatMap((category) =>
        category.items
          .filter((item) => item.signature)
          .map((item) => ({
            ...item,
            category: category.name,
            image: item.image || category.image, // per-item photo wins
          })),
      ),
    [menu.categories],
  );

  return (
    <Section id="menu" labelledBy="menu-heading" className="border-y border-line bg-surface/40">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{menu.eyebrow}</Eyebrow>
            <SectionHeading id="menu-heading" className="mt-5">
              {menu.heading}
            </SectionHeading>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{menu.note}</p>
        </div>

        {/* ------------------------------------------------- must-try rail */}
        {signatures.length > 0 && (
          <div className="mt-10">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
              Signature pours & plates
            </h3>
            <ul className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
              {signatures.map((item) => (
                <li
                  key={item.name}
                  className="w-[240px] shrink-0 snap-start overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-brand/60 sm:w-[280px]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-brand">
                      {item.category}
                    </p>
                    <p className="mt-1.5 font-display text-lg leading-tight text-ink">
                      {item.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                      {item.description}
                    </p>
                    <p className="mt-3 font-display text-base text-brand">
                      {formatPrice(item.price, menu.currency)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ------------------------------------------------ mobile / desktop */}
        <CategoryAccordion categories={menu.categories} currency={menu.currency} />
        <CategoryTabs categories={menu.categories} currency={menu.currency} />
      </Container>
    </Section>
  );
}
