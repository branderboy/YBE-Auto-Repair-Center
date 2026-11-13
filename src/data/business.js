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
  /*
   * Updated 2026-11-13 to the owner's Google profile plan
   * (ybe-auto-google-profile-optimization-2026-11-13.md, "paste in full").
   */
  gmbDescription:
    'YBE Auto Repair Center is a Black-owned auto repair shop in Capitol Heights, MD, serving the community since 2006. Bring your car to the shop at 8632 Edgeworth Dr, or get roadside help where you sit. ' +
    'Shop services: auto repair and diagnostics, check engine light diagnosis, brake repair, transmission service, electrical and starting problems, batteries, alternators and starters, tires, wheel alignment and suspension, AC and heating, auto body and paint, oil changes and tune-ups. ' +
    'Roadside assistance in Capitol Heights and nearby communities: jump starts, mobile battery replacement, car lockouts, flat tire help, and fuel delivery. YBE provides roadside assistance, not towing. ' +
    'Open seven days a week, 8:30 AM to 6:00 PM. Walk-ins welcome. Call or text (202) 455-3822, or message us on WhatsApp.',

  vehiclesServed: 'Domestic vehicles and select luxury brands',

  /** Statewide service areas on the profile. Mirrored in schema; no pages. */
  serviceAreaRegions: ['Maryland', 'Virginia'],
  openedYear: 2006,
  openedDate: '2006-02-09',

  // --- Google Business Profile categories ---
  primaryCategory: 'Auto repair shop',
  // Owner's Google profile plan, 2026-11-13: the categories to carry on the profile.
  additionalCategories: [
    'Brake shop',
    'Transmission shop',
    'Auto electrical service',
    'Tire shop',
    'Auto body shop',
    'Oil change service',
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
  /*
   * Google Analytics 4. Paste the Measurement ID (looks like G-XXXXXXXXXX,
   * from GA4 -> Admin -> Data streams -> Web) and rebuild. Empty means no tag
   * is loaded. The GA4_ID environment variable overrides it at build time.
   */
  analytics: {
    ga4Id: process.env.GA4_ID || ''
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
    /*
     * The Google listing itself, where a customer can leave a review. The CID
     * is the listing ID inside maps.embedUrl below (0x2b9c4391cd42e4e4).
     * The profile plan (2026-11-13) puts reviews as the biggest gap: 29 against
     * 538 at the roadside competitor in the same town.
     */
    listingUrl: 'https://maps.google.com/?cid=3142460933490795748',
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
  /*
   * Things the shop does NOT do. Copy is checked against this so no page can
   * quietly start advertising them. State inspection is here because YBE
   * repairs what fails one but is not a licensed Maryland inspection station
   * and cannot issue the certificate — a distinction worth never blurring.
   */
  notOffered: ['towing', 'Maryland state inspection certificates'],

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
