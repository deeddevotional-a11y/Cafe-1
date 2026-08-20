/**
 * ============================================================================
 *  App — assembles the cafe site from one config object.
 * ============================================================================
 *  Drop-in usage:
 *    Vite     → render <App /> (or <CafeSite cafe={myCafe} />) from main.jsx
 *    Next.js  → add "use client" at the top of this file and the components
 *               that use hooks, then render <CafeSite cafe={myCafe} /> in a page
 * ============================================================================
 */

import { useEffect, useMemo } from 'react';
import defaultCafe from './cafe.config.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import MenuSection from './components/Menu.jsx';
import Gallery from './components/Gallery.jsx';
import Events from './components/Events.jsx';
import Reviews from './components/Reviews.jsx';
import Visit from './components/Visit.jsx';
import Footer from './components/Footer.jsx';
import MobileOrderBar from './components/MobileOrderBar.jsx';

/** config.theme → CSS custom properties consumed by index.css / Tailwind. */
function themeVars(theme) {
  const radii = { sharp: '2px', soft: '14px', round: '26px' };
  return {
    '--c-bg': theme.colors.bg,
    '--c-surface': theme.colors.surface,
    '--c-surface2': theme.colors.surface2,
    '--c-line': theme.colors.line,
    '--c-text': theme.colors.text,
    '--c-muted': theme.colors.muted,
    '--c-brand': theme.colors.brand,
    '--c-brand-ink': theme.colors.brandInk,
    '--c-brand-soft': theme.colors.brandSoft,
    '--c-accent': theme.colors.accent,
    '--c-font-display': theme.fonts.display,
    '--c-font-body': theme.fonts.body,
    '--c-radius': radii[theme.radius] ?? radii.soft,
  };
}

export function CafeSite({ cafe = defaultCafe }) {
  const vars = useMemo(() => themeVars(cafe.theme), [cafe.theme]);

  /* Mirror the palette onto <body>/<html> so the page (and overscroll area)
     matches even outside this wrapper. */
  useEffect(() => {
    Object.entries(vars).forEach(([key, value]) =>
      document.documentElement.style.setProperty(key, value),
    );
    document.title = `${cafe.brand.name} — ${cafe.brand.tagline}`;
  }, [vars, cafe.brand]);

  return (
    <div className={cafe.theme.grain ? 'grain relative' : 'relative'} style={vars}>
      {/* Skip link — first tab stop for keyboard and screen-reader users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-brandink"
      >
        Skip to content
      </a>

      <Header cafe={cafe} />

      <main id="main">
        <Hero cafe={cafe} />
        <Story cafe={cafe} />
        <MenuSection cafe={cafe} />
        <Gallery cafe={cafe} />
        <Events cafe={cafe} />
        <Reviews cafe={cafe} />
        <Visit cafe={cafe} />
      </main>

      <Footer cafe={cafe} />
      <MobileOrderBar cafe={cafe} />

      {/* Room for the sticky mobile bar so it never covers footer content */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </div>
  );
}

export default function App() {
  return <CafeSite cafe={defaultCafe} />;
}
