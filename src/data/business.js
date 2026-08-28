/**
 * CENTRAL BUSINESS DATA
 * ---------------------
 * Every NAP fact, hour, rating and link used anywhere on the site comes from
 * this file. Nothing below is hard-coded into page templates, so updating the
 * Google Business Profile means editing this file and re-running `npm run build`.
 *
 * Rule for this file: only verified facts. If something is not confirmed by the
 * business, leave it empty and the site will simply not render that block.
 */

const business = {
  name: 'YBE Auto Repair Center',
  shortName: 'YBE',

  /*
   * Live location of the site. Used for canonicals, Open Graph tags and the
   * sitemap.
   *
   * GitHub Pages serves a project site from a subfolder, so `basePath` is
   * prefixed onto every internal link and asset at the end of the build.
   * When you move to a real domain, set siteUrl to it and basePath to ''.
   */
  /*
   * Both are overridable at build time so one codebase can target either host.
   *
   *   GitHub Pages  serves from a subfolder, so every link needs the prefix.
   *   Hostinger     serves from the domain root, where that same prefix would
   *                 404 every link and asset on the site.
   *
   *   SITE_URL=https://example.com BASE_PATH= npm run build
   *
   * BASE_PATH is checked with `in` rather than a truthiness test: an empty
   * string is the meaningful value for a root-served host, and `||` would
   * silently discard it and put the GitHub prefix back.
   */
  siteUrl: process.env.SITE_URL || 'https://branderboy.github.io/YBE-Auto-Repair-Center',
  basePath: 'BASE_PATH' in process.env ? process.env.BASE_PATH : '/YBE-Auto-Repair-Center',

  tagline: 'Repair • Body • Roadside',

  /**
   * The description as it appears on the Google Business Profile. Used for the
   * schema `description` so the listing and the site say the same thing rather
   * than two paraphrases of it.
   */
  gmbDescription:
    'YBE Auto Repair Center is a Black-owned auto repair shop serving Capitol Heights, MD, and nearby communities including Washington, DC, Bowie, Hyattsville, Landover, and Upper Marlboro. Since 2006, our experienced mechanics have provided reliable automotive repair and maintenance for domestic vehicles and select luxury brands. Our services include check-engine-light diagnostics, engine repair, brake repair, oil changes, transmission service, suspension and steering repair, wheel alignments, tire services, A/C and heating repair, electrical diagnostics, battery replacement, cooling-system repair, exhaust repair, and timing belt or timing chain service. We also offer auto bodywork services. Call, text, or request an appointment with YBE Auto.',

  vehiclesServed: 'Domestic vehicles and select luxury brands',

  /** Statewide service areas on the profile. Mirrored in schema; no pages. */
  serviceAreaRegions: ['Maryland', 'Virginia'],
  openedYear: 2006,
  openedDate: '2006-02-09',

  // --- Google Business Profile categories ---
  primaryCategory: 'Auto repair shop',
  additionalCategories: [
    'Brake shop',
    'Auto body shop',
    'Transmission shop',
    'Oil change service',
    'Auto electrical service',
    'Wheel alignment service',
    'Auto air conditioning service'
  ],

  // --- NAP ---
  address: {
    street: '8632 Edgeworth Dr',
    city: 'Capitol Heights',
    state: 'MD',
    zip: '20743',
    country: 'US'
  },
  geo: { lat: 38.8809343, lng: -76.856519 },

  phone: {
    display: '(202) 455-3822',
    href: 'tel:+12024553822',
    e164: '+12024553822'
  },
  sms: {
    display: 'Text (202) 455-3822',
    href: 'sms:+12024553822'
  },

  // Existing, working integrations carried over from the original site.
  whatsapp: {
    display: 'WhatsApp Us',
    href: 'https://wa.me/12024553822'
  },
  booking: {
    label: 'Book Appointment',
    href: 'https://ybe-auto-repair-shop.square.site/'
  },

  hours: {
    summary: '8:30 AM–6:00 PM, seven days a week',
    short: 'Open 7 days · 8:30 AM–6:00 PM',
    opens: '08:30',
    closes: '18:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },

  // --- Ratings: single source of truth. Update these two numbers only. ---
  rating: {
    value: '4.8',
    count: 29,
    profileUrl:
      'https://www.google.com/search?q=YBE+Auto+Repair+Center+8632+Edgeworth+Dr,+Capitol+Heights,+MD+20743'
  },

  maps: {
    directionsUrl:
      'https://maps.google.com/?q=8632+Edgeworth+Dr,+Capitol+Heights,+MD+20743',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.882314214507!2d-76.85651899999999!3d38.8809343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7f100000001%3A0x2b9c4391cd42e4e4!2sYBE%20Auto%20Repair%20Center!5e0!3m2!1sen!2sus!4v1787844125343!5m2!1sen!2sus'
  },

  social: {
    instagram: 'https://www.instagram.com/yberepairshop/',
    facebook: 'https://www.facebook.com/ybeauto'
  },

  // --- Verified attributes (shown in trust strips / about page) ---
  attributes: [
    'Black-owned business',
    'Open seven days a week',
    'Serving the community since 2006',
    'Onsite repairs and mobile roadside assistance',
    'Wheelchair-accessible parking',
    'Appointment required',
    'Call or text the shop directly'
  ],

  /**
   * VERIFIED FROM THE GOOGLE BUSINESS PROFILE
   * These were held empty until the profile confirmed them. They now come
   * straight off the listing's attributes, so the site and the profile agree.
   * Warranty and financing stay empty because the profile asserts neither.
   */
  paymentMethods: [
    'Credit cards',
    'Debit cards',
    'NFC mobile payments',
    'Visa',
    'Mastercard',
    'American Express',
    'Discover',
    'Diners Club'
  ],
  cashOnly: false,

  // Planning attribute on the profile. Not a suggestion — the profile says required.
  appointmentRequired: true,

  amenities: ['Mechanic on site', 'Restroom', 'Gender-neutral restroom'],
  accessibility: ['Wheelchair-accessible parking lot'],
  languages: ['English'],
  onsiteServices: true,
  blackOwned: true,

  warranty: '',         // profile asserts none — leave empty
  financing: '',        // profile asserts none — leave empty

  // Services YBE explicitly does NOT provide. Used to keep copy honest.
  notOffered: ['towing'],

  /**
   * Placeholder photography carried over from the original page.
   * Replace `src` with real photos of the Capitol Heights shop when available,
   * and update `alt` to describe what the new photo actually shows.
   */
  images: {
    logo: '/assets/img/ybe-auto-logo.png',
    /*
     * Social share card, 1200x630 (the 1.91:1 ratio Facebook, LinkedIn, X and
     * iMessage expect). The logo was being used here, but at 1.5:1 it gets
     * letterboxed with grey bars and reads as a placeholder.
     * Regenerate with: npm run og
     */
    ogImage: '/assets/img/og-card.jpg',
    ogImageAlt:
      'YBE Auto Repair Center in Capitol Heights, MD. Auto repair that gets you back on the road. Open seven days, call or text (202) 455-3822.',
    logoAlt: 'YBE Auto Repair Center logo with a speedometer, tire tread and the words Repair, Body, Roadside',
    /**
     * Hero image. To switch, point `src` at one of the images in
     * src/assets/img/ and update `alt` to describe that photo.
     *   /assets/img/hero-bays.png   - the open service bays, wide crop (current)
     *   /assets/img/hero-photo.jpg  - the building and parking lot
     *   /assets/img/hero-model.jpg  - lifestyle ad shot
     */
    hero: {
      src: '/assets/img/hero-bays.png',
      alt: 'The open service bays at YBE Auto Repair Center with vehicles inside and customer cars parked outside',
      placeholder: false
    },
    shop: {
      src: '/assets/img/hero-photo.jpg',
      alt: 'The YBE Auto Repair Center building and parking lot with customer vehicles waiting for service',
      placeholder: false
    }
  }
};

business.address.oneLine =
  `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`;

business.yearsInBusiness = new Date().getFullYear() - business.openedYear;

module.exports = business;
