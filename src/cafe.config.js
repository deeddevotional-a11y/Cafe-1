/**
 * ============================================================================
 *  CAFE SITE CONFIG  —  the ONLY file you need to edit to re-skin this site
 * ============================================================================
 *  Everything the template renders (copy, colours, fonts, menu, hours, links)
 *  comes from this object. Swap it out and you have a brand-new cafe site.
 *
 *  Demo concept: "Ash & Amber" — a moody, dark-roast specialty espresso bar
 *  in Bhopal. Dark charcoal + ember-amber palette, characterful serif display
 *  face (Fraunces) paired with a clean UI sans (Inter).
 * ============================================================================
 */

const cafe = {
  /* ---------------------------------------------------------------- brand */
  brand: {
    name: 'Ash & Amber',
    /** Short mark used in the header/footer when no logo image is supplied. */
    monogram: 'A&',
    /** Optional: path to an SVG/PNG logo. Set to null to use the monogram. */
    logoSrc: null,
    tagline: 'Third-wave coffee & slow mornings',
    /** One-liner used in <title> and the hero sub-copy. */
    heroLine: 'Dark-roast espresso, single-origin filter and warm bread — served slow in a room built for lingering.',
    established: 2019,
  },

  /**
   * ------------------------------------------------------------------ theme
   * These become CSS custom properties on the page root, so every component
   * inherits the palette. Pick a mood that matches the cafe's actual concept:
   *  · specialty espresso bar → near-black + ember (this demo)
   *  · bakery cafe            → warm ivory, blush, cocoa
   *  · modern minimalist      → paper white, ink black, one loud accent
   */
  theme: {
    colors: {
      bg: '#0B0D0C',          // page background
      surface: '#131715',     // cards
      surface2: '#1B211E',    // raised cards / hovers
      line: 'rgba(244, 241, 233, 0.12)',
      text: '#F4F1E9',        // primary text (bone)
      muted: '#A9B0A8',       // secondary text  (9:1 on bg)
      brand: '#E8A13A',       // primary accent  (ember amber)
      brandInk: '#160F05',    // text ON the brand colour
      brandSoft: 'rgba(232, 161, 58, 0.14)',
      accent: '#3E7A66',      // secondary accent (deep pine)
    },
    fonts: {
      display: "'Fraunces', ui-serif, Georgia, serif",
      body: "'Inter', ui-sans-serif, system-ui, sans-serif",
    },
    /** Subtle film-grain overlay. Set to false for a crisp, flat look. */
    grain: true,
    /** Rounding used across cards/buttons: 'sharp' | 'soft' | 'round' */
    radius: 'soft',
  },

  /* ------------------------------------------------------------ navigation */
  nav: [
    { id: 'story', label: 'Story' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'events', label: 'Specials' },
    { id: 'visit', label: 'Visit' },
  ],
  /** Header CTA. type: 'link' — points anywhere (Zomato, Dineout, tel:, etc.) */
  headerCta: { label: 'Order Online', href: 'https://www.zomato.com' },

  /* ----------------------------------------------------------------- hero */
  hero: {
    image: '/images/hero.jpg',
    alt: 'Warm light over the brass espresso machine at the Ash & Amber bar',
    eyebrow: 'Bhopal · Since 2019',
    primaryCta: { label: 'View the Menu', href: '#menu' },
    secondaryCta: { label: 'Get Directions', href: 'MAPS' }, // 'MAPS' = auto-build from location
    /** Small trust strip under the CTAs. */
    stats: [
      { value: '4.8★', label: '900+ Google reviews' },
      { value: '7am', label: 'Open early, every day' },
      { value: '100%', label: 'Indian single-origin beans' },
    ],
  },

  /* ---------------------------------------------------------------- story */
  story: {
    eyebrow: 'Our Story',
    heading: 'We roast dark, pour slow, and refuse to rush you out.',
    paragraphs: [
      'Ash & Amber started in 2019 as a two-kilo roaster in a Shahpura garage, run by a chef who could not find a cup in the city that tasted like the ones she grew up drinking in Chikmagalur. Word got out. The garage got small.',
      'Today we buy every bean directly from four estates across Karnataka and Kerala — Attikan, Ratnagiri, Halli Berri and a tiny Wayanad washing station — paying above commodity price and printing what we paid on every bag. We roast in-house on Tuesdays, so nothing on the bar is more than eleven days off the drum.',
      'The room is deliberately dim, the playlist is deliberately quiet, and the tables have plug points because good ideas take longer than one flat white.',
    ],
    image: '/images/barista.jpg',
    imageAlt: 'A barista tamping a fresh dose of espresso behind the bar',
    /** Small proof points shown beside the story photo. */
    pillars: [
      { title: 'Direct trade', body: 'Four estates, no middlemen, prices printed on the bag.' },
      { title: 'Roasted Tuesdays', body: 'Small 12kg batches, rested three days, never older than 11.' },
      { title: 'Baked at 5am', body: 'Laminated dough folded the night before, in the oven at dawn.' },
    ],
    signature: 'Meera Rajan, Founder & Head Roaster',
  },

  /**
   * ----------------------------------------------------------------- menu
   * Categories render as an accordion on mobile and as tabs on desktop.
   * Flag any item with `signature: true` to give it a "Must Try" badge.
   * `tags` are tiny labels — 'Vegan', 'GF', 'Contains nuts', 'Seasonal'…
   */
  menu: {
    eyebrow: 'The Menu',
    heading: 'Small list. Nothing on it by accident.',
    note: 'Oat, almond and A2 milk available on any drink (+₹40). GST included. Kitchen closes 30 minutes before the cafe.',
    currency: '₹',
    categories: [
      {
        id: 'espresso',
        name: 'Espresso Bar',
        blurb: 'Pulled on a Ratnagiri-led house blend — cocoa, date, burnt orange.',
        image: '/images/latte.jpg',
        items: [
          { name: 'Piccolo', description: 'Single ristretto, 60ml of steamed milk. Our bar staple.', price: 180 },
          { name: 'Ember Cortado', description: 'Double shot cut with milk and a whisper of jaggery caramel.', price: 240, signature: true, image: '/images/latte.jpg' },
          { name: 'Flat White', description: '150ml, silky microfoam, two ristretto shots.', price: 260 },
          { name: 'Iced Filter Tonic', description: 'Wayanad filter over tonic, dehydrated orange, rosemary.', price: 290, tags: ['Vegan'] },
          { name: 'Salted Date Latte', description: 'Date syrup we cook in-house, sea salt, double shot.', price: 300, signature: true, image: '/images/barista.jpg' },
          { name: 'Affogato', description: 'Malabar vanilla bean gelato drowned in a hot double.', price: 280 },
        ],
      },
      {
        id: 'slowbrew',
        name: 'Slow Brew',
        blurb: 'Rotating single origins, brewed to order. Ask for a taste first.',
        image: '/images/pourover.jpg',
        items: [
          { name: 'V60 — Attikan Estate', description: 'Washed, 1400m. Green apple, brown sugar, black tea finish.', price: 320, signature: true, image: '/images/pourover.jpg' },
          { name: 'Aeropress — Halli Berri', description: 'Natural anaerobic. Jackfruit, cacao nib, heavy body.', price: 340 },
          { name: 'Cold Brew (18hr)', description: 'Steeped overnight, served over one big clear cube.', price: 260, tags: ['Vegan'] },
          { name: 'South Indian Filter Kaapi', description: 'Davara-set, chicory 20%, boiled milk. The way it should be.', price: 150 },
          { name: 'Cupping Flight', description: 'Three origins, three brew methods, tasting notes card included.', price: 480 },
        ],
      },
      {
        id: 'notcoffee',
        name: 'Not Coffee',
        blurb: 'For the friend who was dragged here.',
        image: '/images/seating.jpg',
        items: [
          { name: 'Kadak Masala Chai', description: 'Assam CTC, hand-pounded ginger and green cardamom.', price: 130 },
          { name: 'Ceremonial Matcha Latte', description: 'Uji first-harvest, whisked, oat milk as standard.', price: 320, tags: ['Vegan'] },
          { name: 'Hibiscus & Kokum Cooler', description: 'Cold-steeped hibiscus, kokum, lime, soda.', price: 220, tags: ['Vegan'] },
          { name: 'Dark Drinking Chocolate', description: '68% Idukki chocolate melted into whole milk. Thick.', price: 290, signature: true, image: '/images/seating.jpg' },
          { name: 'Turmeric & Black Pepper Latte', description: 'Fresh root, jaggery, whole milk or oat.', price: 240 },
        ],
      },
      {
        id: 'bakery',
        name: 'Bakery',
        blurb: 'Folded at midnight, baked at five, gone by two.',
        image: '/images/bakery.jpg',
        items: [
          { name: 'Almond Croissant', description: 'Day-old croissant, frangipane, toasted flakes, snow sugar.', price: 260, signature: true, tags: ['Contains nuts'], image: '/images/bakery.jpg' },
          { name: 'Cardamom Knot', description: 'Laminated brioche, cardamom butter, pearl sugar.', price: 210 },
          { name: 'Miso Banana Bread', description: 'Toasted thick, cultured butter, flaky salt.', price: 230 },
          { name: 'Basque Burnt Cheesecake', description: 'Scorched top, molten centre. One tray a day.', price: 320 },
          { name: 'Ragi Chocolate Cookie', description: 'Chewy middle, 68% chunks, sea salt.', price: 140 },
          { name: 'Sourdough Loaf (whole)', description: '24-hour cold ferment. Pre-order Fridays.', price: 320, tags: ['Vegan'] },
        ],
      },
      {
        id: 'kitchen',
        name: 'All-Day Breakfast',
        blurb: 'Served 7am to 6pm, because brunch is a state of mind.',
        image: '/images/toast.jpg',
        items: [
          { name: 'Chilli Avocado Toast', description: 'Sourdough, smashed avo, kashmiri chilli oil, poached egg.', price: 420, signature: true, image: '/images/toast.jpg' },
          { name: 'Masala Scramble', description: 'Soft eggs, tomato, curry leaf, buttered pav.', price: 360 },
          { name: 'Podi Butter Croissant Sandwich', description: 'Idli podi butter, omelette, cheddar, coriander chutney.', price: 390 },
          { name: 'Beetroot & Feta Salad', description: 'Roast beet, whipped feta, orange, dukkah, leaves.', price: 380, tags: ['GF'] },
          { name: 'Mushroom Toast', description: 'Garlicky mushrooms, thyme cream, sourdough, chives.', price: 400, tags: ['Vegetarian'] },
          { name: 'Big Ash Plate', description: 'Eggs your way, sausage or mushrooms, greens, toast, hash.', price: 520 },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- gallery */
  gallery: {
    eyebrow: 'The Room',
    heading: 'Dim light, loud coffee.',
    /** Tip: mix orientations — the masonry layout thrives on variety. */
    photos: [
      { src: '/images/interior.jpg', alt: 'Communal reclaimed-wood table under warm pendant lights' },
      { src: '/images/latte.jpg', alt: 'Flat white with a rosetta poured in a charcoal ceramic cup' },
      { src: '/images/seating.jpg', alt: 'Leather armchair corner with a cortado and an open book' },
      { src: '/images/bakery.jpg', alt: 'Almond croissants and a cardamom knot on a slate board' },
      { src: '/images/pourover.jpg', alt: 'Gooseneck kettle pouring over a V60 brewer, steam backlit' },
      { src: '/images/storefront.jpg', alt: 'The dark green shopfront glowing on a wet evening street' },
      { src: '/images/beans.jpg', alt: 'Freshly roasted beans spilling from a paper bag' },
      { src: '/images/toast.jpg', alt: 'Chilli avocado toast and masala scramble from above' },
    ],
  },

  /* ---------------------------------------- ambiance tags (used in Visit) */
  ambiance: [
    'Work-friendly',
    'Plug points at every table',
    'Pet-friendly patio',
    'Quiet playlist',
    'Solo-diner seating',
    'Free Wi-Fi',
    'Outdoor seating',
    'Wheelchair accessible',
  ],

  /* ----------------------------------------------- specials & events (optional)
     Set `events: null` to remove the whole section.                        */
  events: {
    eyebrow: 'Specials & Events',
    heading: 'Something on most nights.',
    items: [
      {
        day: 'Every Saturday',
        title: 'Public Cupping, 10am',
        body: 'Slurp through four origins with the roasting team. Free, 12 seats, first come.',
        badge: 'Free',
      },
      {
        day: 'Fridays',
        title: 'Amber Sessions — Live Acoustic',
        body: '7:30pm. Local musicians, no cover charge, filter coffee on the house for performers.',
        badge: 'Live music',
      },
      {
        day: 'Monthly · Last Sunday',
        title: 'Home Brewing Workshop',
        body: 'Two hours on grind, ratio and water. ₹1,200 including a 250g bag to take home.',
        badge: 'Ticketed',
      },
      {
        day: 'This season',
        title: 'Kokum Cold Brew Tonic',
        body: 'Our summer special is back until the rains — kokum, lime, 18-hour cold brew.',
        badge: 'Seasonal',
      },
    ],
    loyalty: {
      title: 'The Amber Card',
      body: 'Buy nine drinks, the tenth is on us — and members get first pick of every micro-lot we roast. Ask at the counter, no app required.',
    },
  },

  /* -------------------------------------------------------------- reviews */
  reviews: {
    eyebrow: 'Kind Words',
    heading: 'What regulars say.',
    items: [
      {
        name: 'Ananya Deshpande',
        quote: 'The cortado here ruined every other coffee in Bhopal for me. Staff remember your order by the third visit, and nobody hovers if you sit with a laptop for three hours.',
        rating: 5,
        platform: 'Google',
        meta: 'Local Guide · 2 weeks ago',
      },
      {
        name: 'Rohit Verma',
        quote: 'Came for the croissant, stayed for the cupping session. They handed me four cups and explained each one without a hint of snobbery. Rare thing.',
        rating: 5,
        platform: 'Zomato',
        meta: 'Reviewed last month',
      },
      {
        name: 'Fatima Sheikh',
        quote: 'Best work cafe in the city — actual plug points, actual Wi-Fi, and the playlist never fights you. The salted date latte is dangerous.',
        rating: 5,
        platform: 'Google',
        meta: '3 weeks ago',
      },
      {
        name: 'Karan & Nisha',
        quote: 'We bring our dog every Sunday. The patio is shaded, they bring out a water bowl unprompted, and the banana bread is worth the drive from Kolar.',
        rating: 4,
        platform: 'Instagram',
        meta: 'Tagged @ashandamber',
      },
      {
        name: 'Devika Menon',
        quote: 'Finally a filter kaapi that respects the chicory ratio. Also the only place in town where I can buy beans roasted the same week.',
        rating: 5,
        platform: 'Google',
        meta: '1 month ago',
      },
      {
        name: 'Sameer Qureshi',
        quote: 'Friday live sets are lovely — small crowd, good sound, no cover. Get there by seven if you want a seat near the window.',
        rating: 5,
        platform: 'Zomato',
        meta: 'Reviewed 2 months ago',
      },
    ],
    summary: { rating: 4.8, count: 912, source: 'Google Reviews' },
  },

  /* ------------------------------------------------------------- location */
  location: {
    eyebrow: 'Find Us',
    heading: 'Corner shop, green door, smells like a roastery.',
    addressLines: ['12 Shahpura Lake Road', 'Shahpura, Bhopal', 'Madhya Pradesh 462039'],
    /** Used for the map embed + Get Directions links. */
    mapQuery: 'Shahpura Lake, Bhopal, Madhya Pradesh',
    /** Optional: paste a Google Maps place URL to override the auto link. */
    mapsUrl: null,
    parking: 'Free street parking along the lake side after 10am; paid basement lot at Mansarovar Complex, 200m away.',
    transit: 'Five minutes on foot from Shahpura BRTS stop. Auto drivers know it as "the green cafe near the lake gate".',
    notes: 'Kitchen closes at 9:30pm. Last coffee order 15 minutes before closing.',
  },

  /* ---------------------------------------------------------------- hours */
  hours: {
    /** `day` matches JS Date order via the `index` field (0 = Sunday). */
    schedule: [
      { index: 1, day: 'Monday', open: '7:00 AM', close: '10:00 PM' },
      { index: 2, day: 'Tuesday', open: '7:00 AM', close: '10:00 PM', note: 'Roasting day — expect noise until noon' },
      { index: 3, day: 'Wednesday', open: '7:00 AM', close: '10:00 PM' },
      { index: 4, day: 'Thursday', open: '7:00 AM', close: '10:00 PM' },
      { index: 5, day: 'Friday', open: '7:00 AM', close: '11:30 PM', note: 'Live music from 7:30 PM' },
      { index: 6, day: 'Saturday', open: '8:00 AM', close: '11:30 PM', note: 'Public cupping at 10 AM' },
      { index: 0, day: 'Sunday', open: '8:00 AM', close: '9:00 PM' },
    ],
    holidayNote: 'Closed on Holi and Diwali day. Extended hours (till 1 AM) on New Year\'s Eve.',
  },

  /* -------------------------------------------------------------- contact */
  contact: {
    phone: '+919876543210',
    phoneDisplay: '+91 98765 43210',
    whatsapp: '919876543210',
    whatsappMessage: 'Hi Ash & Amber! I\'d like to place an order for pickup.',
    email: 'hello@ashandamber.coffee',
    instagram: 'https://instagram.com',
    instagramHandle: '@ashandamber',
    facebook: null,
    /** Delivery / reservation partners — remove any that do not apply. */
    ordering: [
      { label: 'Order on Zomato', href: 'https://www.zomato.com' },
      { label: 'Order on Swiggy', href: 'https://www.swiggy.com' },
    ],
    reserve: { label: 'Reserve a Table', href: 'https://wa.me/919876543210' },
  },

  /* --------------------------------------------------------------- footer */
  footer: {
    blurb: 'A small roastery-cafe by the lake. Direct-trade Indian coffee, bread baked at dawn, and a room that lets you stay a while.',
    newsletter: {
      enabled: true,
      title: 'Micro-lot alerts',
      body: 'One email a month: what we roasted, what is on the bar, what is sold out.',
      placeholder: 'you@example.com',
      cta: 'Subscribe',
      success: 'Thanks — check your inbox to confirm.',
    },
    legalLinks: [
      { label: 'Privacy', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    credit: 'Built with care in Bhopal.',
  },
};

export default cafe;
