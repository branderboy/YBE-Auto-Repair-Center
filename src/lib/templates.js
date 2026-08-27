/**
 * PAGE TEMPLATES
 *
 * The design system here is lifted directly from the original
 * ybe_auto_repair_center.html: same Tailwind config and brand tokens, same
 * Barlow Condensed / Inter pairing, same shadow-hard buttons, same header
 * scroll behavior, same mobile action bar, same FAQ accordion.
 *
 * What changed is that it is now multi-page: real nav with dropdowns,
 * breadcrumbs, per-page metadata and schema, and SMS added alongside the
 * existing WhatsApp and Square booking integrations.
 */

const b = require('../data/business.js');
const E = require('../data/entities.js');
const { mainNav, footerServiceLinks } = require('../data/pillars.js');

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const { icon } = require('./icons.js');

const abs = (path) => `${b.siteUrl}${path}`;

/* ------------------------------------------------------------------ SCHEMA */

/** Reused by every page so NAP stays identical site-wide. */
function localBusinessSchema() {
  return {
    '@type': 'AutoRepair',
    '@id': `${b.siteUrl}/#business`,
    name: b.name,
    url: b.siteUrl,
    image: abs(b.images.logo),
    logo: abs(b.images.logo),
    telephone: b.phone.e164,
    foundingDate: b.openedDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressRegion: b.address.state,
      postalCode: b.address.zip,
      addressCountry: b.address.country
    },
    geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: b.hours.days,
        opens: b.hours.opens,
        closes: b.hours.closes
      }
    ],
    sameAs: [b.social.facebook, b.social.instagram],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: b.rating.value,
      reviewCount: String(b.rating.count)
    },
    areaServed: require('../data/areas.js').areas.map((a) => ({
      '@type': 'City',
      name: `${a.name}, ${a.state}`
    })),
    /*
     * knowsAbout as Thing objects rather than bare strings. Paired with
     * additionalType below, this lets an engine resolve what the shop does
     * against known entities instead of parsing the category names.
     */
    knowsAbout: [b.primaryCategory, ...b.additionalCategories].map((name) => ({
      '@type': 'Thing',
      name
    })),
    additionalType: E.business,
    hasMap: b.maps.directionsUrl,
    currenciesAccepted: 'USD',
    /* Verified attributes only. See business.js for what is deliberately unset. */
    /*
     * Attributes straight off the Google Business Profile. Emitting the same
     * facts the listing carries is the point: an engine comparing the two
     * should find them saying the same thing, not merely not contradicting.
     */
    paymentAccepted: b.paymentMethods.join(', '),
    availableLanguage: b.languages.map((name) => ({ '@type': 'Language', name })),
    amenityFeature: [...b.accessibility, ...b.amenities].map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true
    })),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Identifies as Black-owned', value: b.blackOwned },
      { '@type': 'PropertyValue', name: 'Appointment required', value: b.appointmentRequired },
      { '@type': 'PropertyValue', name: 'Onsite services available', value: b.onsiteServices },
      { '@type': 'PropertyValue', name: 'Cash only', value: b.cashOnly }
    ],
    employee: {
      '@type': 'Person',
      name: 'Scooter',
      jobTitle: 'Mechanic',
      worksFor: { '@id': `${b.siteUrl}/#business` }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Auto repair services',
      itemListElement: require('../data/services.js').categories.map((cat) => ({
        '@type': 'OfferCatalog',
        name: cat.title,
        itemListElement: cat.services.map((svc) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: svc.title, url: abs(svc.url) }
        }))
      }))
    }
  };
}

/** The site itself, so each page can declare what it belongs to. */
function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${b.siteUrl}/#website`,
    url: b.siteUrl,
    name: b.name,
    publisher: { '@id': `${b.siteUrl}/#business` },
    inLanguage: 'en-US'
  };
}

/**
 * The page. `speakable` marks which parts a voice assistant should read out,
 * which is what answer engines look for when a question is asked hands-free.
 */
function webPageSchema({ title, description, path, primaryImage }) {
  return {
    '@type': 'WebPage',
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    isPartOf: { '@id': `${b.siteUrl}/#website` },
    about: { '@id': `${b.siteUrl}/#business` },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(primaryImage || b.images.ogImage) },
    inLanguage: 'en-US',
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.speakable'] }
  };
}

function breadcrumbSchema(crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.url)
    }))
  };
}

function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function serviceSchema({ name, description, url, areaNames, sameAs, placeSameAs }) {
  const node = {
    '@type': 'Service',
    '@id': `${abs(url)}#service`,
    name,
    description,
    url: abs(url),
    serviceType: name,
    provider: { '@id': `${b.siteUrl}/#business` },
    areaServed: (areaNames || []).map((n, i) => {
      const city = { '@type': 'City', name: n };
      // Tie the primary area to its Wikipedia article where one is mapped.
      if (placeSameAs && i === 0) city.sameAs = placeSameAs;
      return city;
    })
  };
  if (sameAs && sameAs.length) {
    node.about = { '@type': 'Thing', name, sameAs };
  }
  return node;
}

/* ------------------------------------------------- CONVERSION COMPONENTS */

/**
 * The five conversion actions from the brief. `variant` controls emphasis:
 * 'roadside' puts Call first and loudest.
 */
function ctaButtons({ variant = 'default', className = '' } = {}) {
  // Buttons size to their own content and wrap naturally. Fixed-width grid
  // columns caused long labels to overflow their box, so widths are intrinsic.
  const base =
    'inline-flex items-center justify-center gap-2 font-heading text-lg sm:text-xl px-5 py-3 ' +
    'rounded-sm border-2 transition-all uppercase tracking-wide font-bold whitespace-nowrap';

  const btn = (href, label, ic, classes, track, extra = '') =>
    `<a href="${href}" data-track="${track}" data-location="${variant}" ${extra}
      class="${base} ${classes}">${icon(ic, 20, 'flex-shrink-0')} ${label}</a>`;

  const call = btn(b.phone.href, 'Call Now', 'phone',
    'bg-ybe-red hover:bg-ybe-darkred text-white shadow-hard border-transparent hover:border-white', 'call');

  const text = btn(b.sms.href, 'Text Us', 'message-square',
    'bg-white hover:bg-gray-100 text-ybe-black shadow-hard border-ybe-black', 'text');

  const directions = btn(b.maps.directionsUrl, 'Directions', 'navigation',
    'bg-ybe-charcoal hover:bg-ybe-black text-white border-gray-500 hover:border-white', 'directions',
    'target="_blank" rel="noopener noreferrer"');

  const appt = btn('/request-appointment/', 'Book', 'calendar',
    'bg-transparent hover:bg-white text-white hover:text-ybe-black border-white', 'appointment');

  const roadside = btn('/roadside-assistance/', 'Roadside', 'truck',
    'bg-yellow-400 hover:bg-yellow-300 text-ybe-black shadow-hard border-transparent', 'roadside');

  let items;
  if (variant === 'roadside') items = [call, text, directions];
  else if (variant === 'home') items = [call, text, directions, appt, roadside];
  else items = [call, text, directions, appt];

  // In a narrow sidebar the buttons stack full width instead of wrapping.
  const layout =
    variant === 'sidebar'
      ? 'flex flex-col gap-3 [&>a]:w-full'
      : 'flex flex-wrap gap-3';

  return `<div class="${layout} ${className}">${items.join('')}</div>`;
}

function trustStrip() {
  const items = [
    { icon: 'star', label: `${b.rating.value} on Google`, sub: `${b.rating.count} reviews` },
    { icon: 'calendar-check', label: `Since ${b.openedYear}`, sub: `${b.yearsInBusiness} years serving the area` },
    { icon: 'clock', label: 'Open 7 Days', sub: '8:30 AM–6:00 PM' },
    { icon: 'award', label: 'Black-Owned', sub: 'Local, independent shop' }
  ];
  return `<section class="bg-ybe-black text-white border-y-4 border-ybe-red">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        ${items
          .map(
            (i) => `<div class="flex items-center gap-3">
          <div class="bg-ybe-red rounded-sm p-2 flex-shrink-0">${icon(i.icon, 24, 'text-white')}</div>
          <div>
            <div class="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide leading-none">${esc(i.label)}</div>
            <div class="text-xs md:text-sm text-gray-400 font-medium mt-1">${esc(i.sub)}</div>
          </div>
        </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

function breadcrumbs(crumbs) {
  if (!crumbs || crumbs.length < 2) return '';
  const parts = crumbs.map((c, i) =>
    i === crumbs.length - 1
      ? `<span class="text-gray-500" aria-current="page">${esc(c.label)}</span>`
      : `<a href="${c.url}" class="inline-block py-2 text-ybe-red hover:text-ybe-darkred font-semibold">${esc(c.label)}</a>`
  );
  return `<nav aria-label="Breadcrumb" class="bg-gray-100 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex flex-wrap items-center gap-2 text-sm">
        ${parts.join(`<span class="text-gray-400">/</span>`)}
      </div>
    </div>
  </nav>`;
}

function sectionHeading(title, sub, { light = false } = {}) {
  return `<div class="mb-10">
    <h2 class="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-wide leading-none ${
      light ? 'text-white' : 'text-ybe-black'
    }">${title}</h2>
    ${
      sub
        ? `<p class="mt-4 text-lg ${
            light ? 'text-gray-300' : 'text-gray-600'
          } font-medium border-l-4 border-ybe-red pl-4 max-w-3xl">${esc(sub)}</p>`
        : ''
    }
  </div>`;
}

function linkCard({ url, title, blurb, cta = 'Learn More', icon: ic }) {
  return `<a href="${url}" class="bg-gray-50 p-6 rounded-sm border border-gray-200 hover:border-ybe-red transition-colors flex flex-col justify-between group">
    <div>
      <div class="flex items-center gap-3 mb-3">
        ${ic ? `<div class="bg-ybe-red text-white p-2 rounded-sm flex-shrink-0">${icon(ic, 22)}</div>` : ''}
        <h3 class="text-xl md:text-2xl font-heading font-bold text-ybe-black uppercase tracking-wide">${esc(title)}</h3>
      </div>
      ${blurb ? `<p class="text-gray-700 leading-relaxed mb-5">${esc(blurb)}</p>` : ''}
    </div>
    <span class="inline-flex items-center font-heading text-lg font-bold text-ybe-red uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300">
      ${esc(cta)} ${icon('arrow-right', 20, 'ml-1')}
    </span>
  </a>`;
}

function safetyNotice() {
  return `<div class="bg-ybe-black/90 border-l-4 border-yellow-400 p-6 rounded-sm">
    <div class="flex items-start gap-4 text-left">
      ${icon('alert-triangle', 32, 'text-yellow-400 flex-shrink-0 mt-1')}
      <div>
        <h3 class="font-heading text-xl font-bold uppercase text-white mb-1">Safety First</h3>
        <p class="text-gray-300 text-sm leading-relaxed">
          If you are stopped in a traffic lane, on a narrow shoulder, or facing any immediate emergency,
          call <strong class="text-white">911 first</strong>. Stay in your vehicle with your seat belt fastened
          if it is not safe to stand outside it.
          <br class="hidden sm:block">
          <em class="text-gray-400">Please note: YBE provides roadside assistance, not towing.</em>
        </p>
      </div>
    </div>
  </div>`;
}

function mapSection() {
  return `<div class="lg:w-2/3 h-[400px] bg-gray-200 rounded-sm border border-gray-300 overflow-hidden shadow-inner">
    <iframe src="${b.maps.embedUrl}" width="100%" height="100%" style="border:0;"
      title="Map showing YBE Auto Repair Center at ${esc(b.address.oneLine)}"
      allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>`;
}

function faqAccordion(faqs) {
  return `<div class="space-y-4">
    ${faqs
      .map(
        (f, i) => `<div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
      <button class="faq-btn w-full px-6 py-4 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ybe-red bg-white hover:bg-gray-50 transition-colors"
              aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="faq-panel-${i}" id="faq-btn-${i}">
        <span class="font-heading text-lg md:text-xl font-bold uppercase tracking-wide text-ybe-black">${esc(f.q)}</span>
        ${icon('chevron-down', 24, `faq-icon text-ybe-red flex-shrink-0 transition-transform duration-300${i === 0 ? ' rotate-180' : ''}`)}
      </button>
      <div id="faq-panel-${i}" role="region" aria-labelledby="faq-btn-${i}"
           class="faq-content px-6 overflow-hidden transition-all duration-300 ease-in-out ${
             i === 0 ? 'max-h-96 py-4 border-t border-gray-100' : 'max-h-0'
           }">
        <p class="text-gray-700 leading-relaxed">${esc(f.a)}</p>
      </div>
    </div>`
      )
      .join('')}
  </div>`;
}

/** Closing conversion block used at the bottom of every page. */
function finalCta({ heading, sub, variant = 'default' } = {}) {
  return `<section class="py-16 md:py-20 bg-ybe-black text-white relative">
    <div class="absolute top-0 left-0 w-full h-2 bg-ybe-red"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-10 lg:items-center">
        <div class="lg:w-1/2">
          <h2 class="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-wide mb-4">
            ${heading || 'Ready When You Are'}
          </h2>
          <p class="text-gray-400 mb-8 font-medium text-lg leading-relaxed">
            ${esc(sub || 'Call or text the shop, request an appointment, or stop by. We are open seven days a week.')}
          </p>
          ${ctaButtons({ variant })}
        </div>
        <div class="lg:w-1/2 w-full">
          <div class="bg-ybe-charcoal p-8 rounded-sm border border-gray-700 shadow-xl">
            <h3 class="font-heading text-2xl font-bold uppercase tracking-wide mb-6 text-white border-b-2 border-ybe-red pb-2">
              ${esc(b.name)}
            </h3>
            <ul class="space-y-4 text-gray-300">
              <li class="flex items-start gap-3">${icon('map-pin', 20, 'text-ybe-red flex-shrink-0 mt-1')}
                <span>${esc(b.address.oneLine)}</span></li>
              <li class="flex items-start gap-3">${icon('clock', 20, 'text-ybe-red flex-shrink-0 mt-1')}
                <span>${esc(b.hours.summary)}</span></li>
              <li class="flex items-start gap-3">${icon('phone', 20, 'text-ybe-red flex-shrink-0 mt-1')}
                <a href="${b.phone.href}" data-track="call" data-location="final-cta" class="hover:text-white transition-colors">${esc(b.phone.display)}</a></li>
              <li class="flex items-start gap-3">${icon('message-square', 20, 'text-ybe-red flex-shrink-0 mt-1')}
                <a href="${b.sms.href}" data-track="text" data-location="final-cta" class="hover:text-white transition-colors">${esc(b.sms.display)}</a></li>
              <li class="flex items-start gap-3">${icon('message-circle', 20, 'text-[#25D366] flex-shrink-0 mt-1')}
                <a href="${b.whatsapp.href}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location="final-cta" class="hover:text-white transition-colors">${esc(b.whatsapp.display)}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

module.exports = {
  b,
  E,
  esc,
  icon,
  abs,
  localBusinessSchema,
  webSiteSchema,
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  ctaButtons,
  trustStrip,
  breadcrumbs,
  sectionHeading,
  linkCard,
  safetyNotice,
  mapSection,
  faqAccordion,
  finalCta,
  mainNav,
  footerServiceLinks
};
