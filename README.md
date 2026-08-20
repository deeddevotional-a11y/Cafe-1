# Cafe Site Template — React + Tailwind

A single, production-ready, fully responsive website template for independent cafes.
Every word, price, photo, link and colour comes from **one config object**, so
re-skinning it for another cafe is a copy-paste job.

Demo brand: **Ash & Amber** — a moody dark-roast espresso bar in Shahpura, Bhopal.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

Stack: React 19 + Vite + Tailwind CSS v4 (`@tailwindcss/vite`) + `lucide-react`.
No UI kit, no carousel/animation libraries. Fonts (Fraunces + Inter) are
self-hosted in `public/fonts` — no Google Fonts request at runtime.

---

## File map

```
src/
├─ cafe.config.js        ← EDIT THIS. All content + theme for one cafe.
├─ themes.js             ← 4 ready-made palettes (dark roast, pastel bakery, bold minimal, garden)
├─ App.jsx               ← wires the config to the sections, writes theme CSS vars
├─ index.css             ← @font-face, theme tokens, focus states, grain, reveal
├─ lib/utils.js          ← tel/WhatsApp/maps helpers, open-now logic, scroll hooks
└─ components/
   ├─ ui.jsx             ← Container, Section, Eyebrow, Button, Badge, Stars
   ├─ Header.jsx         ← sticky nav, scroll-spy, mobile hamburger panel
   ├─ Hero.jsx           ← full-bleed banner, open/closed pill, dual CTA, stats
   ├─ Story.jsx          ← narrative + portrait photo + 3 proof pillars
   ├─ Menu.jsx           ← must-try rail; accordion <md, tabs ≥md
   ├─ Gallery.jsx        ← CSS-columns masonry + keyboard lightbox
   ├─ Events.jsx         ← specials/events cards + loyalty block (optional)
   ├─ Reviews.jsx        ← snap carousel on mobile, 3-col grid on xl
   ├─ Visit.jsx          ← map embed, day-wise hours, parking/transit, vibe tags
   ├─ Footer.jsx         ← quick links, socials, ordering links, newsletter
   └─ MobileOrderBar.jsx ← sticky bottom Order / Directions / Call bar
```

---

## Customising for a new cafe

Open `src/cafe.config.js`. Nothing else needs to change.

### 1. Brand & voice
```js
brand: {
  name: 'Bloom & Batter',
  monogram: 'B&',           // used when logoSrc is null
  logoSrc: '/images/logo.svg',
  tagline: 'Sourdough, sunshine and second cups',
  heroLine: 'One sentence that says what the room feels like.',
  established: 2021,
}
```

### 2. Palette + type (the "does this look AI-generated?" lever)
```js
import { presets } from './themes.js';

theme: {
  ...presets.pastelBakery,   // or darkRoast / boldMinimal / gardenGreen
  grain: false,              // film-grain overlay on/off
  radius: 'round',           // 'sharp' | 'soft' | 'round'
}
```
Or hand-pick colours — every key maps to a CSS variable used site-wide:
`bg, surface, surface2, line, text, muted, brand, brandInk, brandSoft, accent`.
Rule of thumb: `brandInk` must contrast with `brand` (it is the text **on** buttons),
and `muted` should stay ≥ 4.5:1 against `bg`.

For a different type pairing, drop two `.woff2` files into `public/fonts`,
update the two `@font-face` blocks in `src/index.css`, then point
`theme.fonts.display` / `theme.fonts.body` at the new family names.

### 3. Menu
```js
menu.categories = [
  {
    id: 'coffee',                       // unique, used for tab/accordion ids
    name: 'Coffee',
    blurb: 'One line of category flavour.',
    image: '/images/coffee.jpg',        // shown beside the desktop tab panel
    items: [
      {
        name: 'Cortado',
        description: 'Short, sharp, milky.',
        price: 240,                     // number → formatted with menu.currency
        signature: true,                // adds the "Must try" badge + rail card
        tags: ['Vegan'],                // optional pills
        image: '/images/cortado.jpg',   // optional, overrides category image in the rail
      },
    ],
  },
];
```
Signature items are collected automatically into the "Signature pours & plates"
rail — you never list them twice. Add or remove categories freely; the mobile
accordion and desktop tabs both derive from this array.

### 4. Photos
Drop files in `public/images/` and reference them as `/images/name.jpg`.
`gallery.photos` takes `{ src, alt }` — **write real alt text**, it is read by
screen readers and shown as the lightbox caption. The masonry varies aspect
ratios automatically, so a mix of portrait/square shots looks best.

### 5. Hours, location, contact
```js
hours.schedule  // day rows: { index (0=Sun), day, open, close, note?, closed?: true }
hours.holidayNote
location.mapQuery   // free-text — powers the keyless map embed + directions link
location.mapsUrl    // optional: paste a Google Maps place URL to override
contact.phone / whatsapp / instagram / ordering[] / reserve
```
The "Open now / Closed" pill in the header, hero and Visit section is computed
live from `hours.schedule` — no manual updates.

### 6. Optional sections
- `events: null` removes the whole Specials/Events section (nav link too, if you
  also delete it from `nav`).
- `footer.newsletter.enabled: false` removes the signup form.
- To wire the form up, replace the `TODO` in `Footer.jsx` with a POST to
  Mailchimp/Buttondown/your API.

---

## Using it in Next.js (App Router)

1. Copy `src/components`, `src/lib`, `src/cafe.config.js`, `src/themes.js`.
2. Add `'use client'` to the top of `App.jsx` and any component using hooks
   (Header, Hero, Menu, Gallery, Reviews, Footer, MobileOrderBar, Visit).
3. Move the `@font-face` + `@theme` blocks from `index.css` into your global CSS,
   and the font files into `public/fonts`.
4. Render it:
   ```jsx
   import { CafeSite } from '@/components/App';
   import cafe from '@/cafe.config';
   export default function Page() { return <CafeSite cafe={cafe} />; }
   ```
   Use `next/image` in place of `<img>` if you want automatic image optimisation.

---

## Accessibility & responsiveness notes

- Semantic landmarks (`header/main/section/footer/nav/address`), one `h1`, skip link.
- Visible 2px focus ring on every interactive element (`:focus-visible`).
- WAI-ARIA tabs (arrow/Home/End keys) for the desktop menu; `aria-expanded`
  accordion on mobile; lightbox with Esc/←/→ and focus restore.
- All tap targets ≥ 44px; sticky mobile bar respects `env(safe-area-inset-bottom)`.
- `prefers-reduced-motion` disables smooth scrolling, reveals and transitions.
- Breakpoints verified at 375 / 768 / 1024 / 1440px.
- `tel:`, `https://wa.me/…` and Google Maps directions links are generated from
  config by `lib/utils.js`, so they always match the numbers you typed once.
