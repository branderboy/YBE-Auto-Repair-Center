/**
 * YBE SECTION BLOCKS
 *
 * These are the section patterns lifted from the client's original
 * ybe_auto_repair_center.html, turned into reusable functions so every
 * secondary page is built from the same visual vocabulary as the homepage:
 *
 *   heroBlock()      - interior page header: dark panel, H1, red-rule subcopy, red CTA
 *   numberedCards()  - the numbered service cards ("1 Auto Repair & Diagnostics")
 *   problemTiles()   - the "What's going on with your car?" tile grid
 *   roadsideBand()   - the diagonal-stripe roadside call-out
 *   checklistBlock() - the "Why drivers trust YBE" checklist + photo + 2006 badge
 *   reviewsBlock()   - the dark reviews section with star rating
 *   mapAreasBlock()  - the map beside the service-area chips
 *   contactBlock()   - the dark contact section used to close every page
 *
 * Markup, class names and spacing follow the original page.
 */

const b = require('../data/business.js');
const { icon } = require('./icons.js');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const { areas, primaryArea } = require('../data/areas.js');

/* ------------------------------------------------------------------ HERO */
/**
 * The homepage hero, in a compact form for interior pages.
 * `titleHtml` may contain a <span class="text-ybe-red"> for the accent word.
 */
function heroBlock({
  eyebrow,
  titleHtml,
  sub,
  ctaLabel = 'I Need Help Now!',
  ctaHref = b.phone.href,
  ctaTrack = 'call',
  secondary
}) {
  return `
<section class="relative py-14 md:py-20 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="max-w-3xl">
      ${
        eyebrow
          ? `<p class="font-heading uppercase tracking-widest text-ybe-red font-bold mb-3 text-sm md:text-base">${eyebrow}</p>`
          : ''
      }
      <h1 class="text-4xl md:text-6xl font-heading font-extrabold text-white uppercase leading-tight mb-4 tracking-wide">
        ${titleHtml}
      </h1>
      ${
        sub
          ? `<p class="text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl border-l-4 border-ybe-red pl-4">${esc(sub)}</p>`
          : ''
      }
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <a href="${ctaHref}" data-track="${ctaTrack}" data-location="hero"
           class="inline-flex items-center justify-center gap-3 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl md:text-3xl px-8 py-4 rounded-sm shadow-hard border-2 border-transparent hover:border-white transition-all uppercase tracking-widest font-bold">
          ${icon('phone', 28)} ${esc(ctaLabel)}
        </a>
        ${
          secondary
            ? `<a href="${secondary.href}" ${secondary.track ? `data-track="${secondary.track}" data-location="hero"` : ''}
             class="inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white text-white hover:text-ybe-black border-2 border-white font-heading text-2xl md:text-3xl px-8 py-4 rounded-sm transition-all uppercase tracking-widest font-bold">
          ${icon(secondary.icon || 'arrow-right', 26)} ${esc(secondary.label)}</a>`
            : ''
        }
      </div>
      <p class="mt-6 text-gray-300 text-sm font-medium flex flex-wrap items-center gap-x-4 gap-y-2">
        <span class="flex items-center gap-2">${icon('clock', 16, 'text-ybe-red')} ${esc(b.hours.summary)}</span>
        <span class="flex items-center gap-2">${icon('map-pin', 16, 'text-ybe-red')} ${esc(b.address.oneLine)}</span>
      </p>
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------- NUMBERED CARD GRID */
/** The homepage's numbered service cards. */
function numberedCards(items, { cols = 'md:grid-cols-2' } = {}) {
  return `<div class="grid grid-cols-1 ${cols} gap-8">
    ${items
      .map(
        (it, i) => `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200 hover:border-ybe-red transition-colors flex flex-col justify-between group">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-ybe-green text-white flex items-center justify-center font-heading font-bold text-xl rounded-sm flex-shrink-0">${i + 1}</div>
          <h3 class="text-2xl font-heading font-bold text-ybe-black uppercase tracking-wide">${esc(it.title)}</h3>
        </div>
        <p class="text-gray-700 leading-relaxed mb-6">${esc(it.text || '')}</p>
      </div>
      <a href="${it.href}" class="inline-flex items-center py-2 font-heading text-lg font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred transition-colors">
        ${esc(it.cta || 'Request Service')} ${icon('arrow-right', 20, 'ml-1')}
      </a>
    </div>`
      )
      .join('')}
  </div>`;
}

/* ------------------------------------------------------- PROBLEM TILES */
/** The "What's going on with your car?" tiles. */
function problemTiles(items) {
  return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    ${items
      .map(
        (p) => `<a href="${p.url}" class="group p-6 rounded-sm border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer shadow-sm hover:shadow-md ${
          p.urgent
            ? 'bg-ybe-red border-ybe-darkred text-white hover:bg-ybe-darkred'
            : 'bg-white border-gray-200 text-ybe-black hover:border-ybe-red hover:-translate-y-1'
        }">
      <div class="p-4 rounded-full mb-4 transition-colors ${
        p.urgent ? 'bg-white text-ybe-red' : 'bg-gray-100 text-ybe-red group-hover:bg-ybe-red group-hover:text-white'
      }">${icon(p.icon, 32)}</div>
      <h3 class="text-xl font-heading font-bold uppercase tracking-wide">${esc(p.text)}</h3>
      <span class="mt-2 flex items-center text-sm font-semibold uppercase tracking-wider ${p.urgent ? 'text-white' : 'text-ybe-red'}">
        Click Here ${icon('chevron-right', 16)}</span>
    </a>`
      )
      .join('')}
  </div>`;
}

/* --------------------------------------------------------- ROADSIDE BAND */
/** The diagonal-stripe roadside call-out from the homepage. */
function roadsideBand({ heading, sub } = {}) {
  return `
<section class="py-20 diagonal-stripe-bg text-white border-y-8 border-ybe-red relative overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <div class="inline-flex items-center justify-center p-4 bg-ybe-red rounded-full mb-6">${icon('truck', 48, 'text-white')}</div>
    <h2 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide mb-6 text-white drop-shadow-md">
      ${heading || `Stranded? Call YBE for <span class="text-ybe-red bg-white px-2 rounded-sm inline-block transform -skew-x-12">Roadside Help</span>`}
    </h2>
    <p class="text-xl md:text-2xl mb-10 font-medium max-w-3xl mx-auto text-gray-300 leading-relaxed">
      ${esc(sub || `Mobile assistance for dead batteries, flat tires, fuel delivery, lockouts, no-start conditions and select minor problems in ${primaryArea.name} and nearby communities.`)}
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-6 mb-12">
      <a href="${b.phone.href}" data-track="call" data-location="roadside-band"
         class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-3xl px-10 py-5 rounded-sm shadow-hard border-2 border-transparent hover:border-white transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('phone', 32)} Call For Help</a>
      <a href="${b.sms.href}" data-track="text" data-location="roadside-band"
         class="bg-white hover:bg-gray-100 text-ybe-black font-heading text-3xl px-10 py-5 rounded-sm shadow-hard border-2 border-transparent transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('message-square', 32)} Text Us</a>
    </div>
    <div class="bg-ybe-black/80 border border-gray-700 p-6 rounded-sm max-w-2xl mx-auto">
      <div class="flex items-start gap-4 text-left">
        ${icon('alert-triangle', 32, 'text-yellow-400 flex-shrink-0 mt-1')}
        <div>
          <h3 class="font-heading text-xl font-bold uppercase text-white mb-1">Safety Notice</h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            If you are stopped in an unsafe traffic location or facing an immediate emergency, contact 911 first.
            Stay in your vehicle with your seat belt fastened if it is not safe to stand outside it.
            <em class="block mt-1">Note: YBE provides roadside assistance, not towing.</em>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------- CHECKLIST BLOCK */
/** "Why drivers trust YBE": red-check list beside the tilted photo + 2006 badge. */
function checklistBlock({ heading, intro, items } = {}) {
  return `
<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12 items-center">
      <div class="lg:w-1/2">
        <h2 class="text-4xl md:text-6xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-6">
          ${heading || `Why Drivers Trust <span class="text-ybe-red">YBE</span>`}
        </h2>
        <p class="text-lg text-gray-600 mb-8 font-medium">
          ${esc(intro || 'We are a real neighborhood shop committed to getting you back on the road quickly and safely. No gimmicks, just honest auto repair.')}
        </p>
        <ul class="space-y-4">
          ${(items || defaultTrustItems())
            .map(
              (t) => `<li class="flex items-start gap-3">
            <div class="bg-ybe-red rounded-full p-1 shadow-sm flex-shrink-0 mt-1">${icon('check', 20, 'text-white')}</div>
            <span class="font-heading text-xl uppercase tracking-wide text-ybe-charcoal font-semibold">${esc(t)}</span></li>`
            )
            .join('')}
        </ul>
      </div>
      <div class="lg:w-1/2 w-full">
        <div class="relative p-2 bg-white shadow-xl rounded-sm border-2 border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
          <img src="${b.images.shop.src}" alt="${esc(b.images.shop.alt)}" loading="lazy" class="w-full h-auto object-cover rounded-sm" />
          <div class="absolute bottom-4 right-4 bg-ybe-red text-white font-heading p-4 md:p-6 rounded-sm shadow-hard border-2 border-white text-center z-10">
            <div class="text-4xl md:text-5xl font-extrabold leading-none">${b.openedYear}</div>
            <div class="text-sm md:text-xl uppercase tracking-widest font-semibold mt-1">Established</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function defaultTrustItems() {
  return [
    `Serving the community since ${b.openedYear}`,
    'Open seven days a week',
    'Mechanical and body repairs in one location',
    'Mobile roadside assistance available',
    'Call or text the shop directly',
    `Convenient ${primaryArea.name} location`,
    'We test before replacing parts',
    'Experience with urgent vehicle problems'
  ];
}

/* ------------------------------------------------------------- REVIEWS */
/** The dark reviews section from the homepage. */
function reviewsBlock(cards, { heading, sub } = {}) {
  const stars = (n, size) => Array(5).fill(icon('star', size, 'fill-current')).join('');
  return `
<section class="py-20 bg-white border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="flex justify-center mb-4">
      <div class="flex gap-1 text-yellow-400 bg-gray-50 border border-gray-200 shadow-sm px-4 py-2 rounded-full">${stars(5, 28)}</div>
    </div>
    <h2 class="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wide text-ybe-black mb-4">
      ${heading || `Rated ${b.rating.value} on Google`}
    </h2>
    <p class="text-xl text-gray-600 font-medium mb-12">${esc(sub || `Based on ${b.rating.count} customer reviews.`)}</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      ${cards
        .map(
          (c) => `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-red shadow-sm text-left relative">
        ${icon('quote', 40, 'text-ybe-red absolute top-4 right-4 opacity-15')}
        <div class="flex gap-1 text-yellow-400 mb-4">${stars(5, 16)}</div>
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-2">${esc(c.title)}</h3>
        <p class="text-gray-700 leading-relaxed">${esc(c.text)}</p>
      </div>`
        )
        .join('')}
    </div>
    <a href="${b.rating.profileUrl}" target="_blank" rel="noopener noreferrer" data-track="reviews" data-location="reviews-block"
       class="inline-flex items-center gap-2 bg-ybe-red hover:bg-ybe-darkred text-white border-2 border-transparent font-heading text-xl font-bold uppercase tracking-wide px-8 py-4 transition-all rounded-sm shadow-hard">
      ${icon('external-link', 20)} Read All Google Reviews</a>
  </div>
</section>`;
}

/* ------------------------------------------------------- MAP + AREA CHIPS */
/** The map beside the service-area chips, as on the homepage. */
function mapAreasBlock({ heading, sub, activeSlug } = {}) {
  return `
<section class="py-20 bg-white border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-heading font-bold text-ybe-black uppercase tracking-wide">
        ${heading || `Your Local Shop in <span class="text-ybe-red">${esc(primaryArea.name)}</span>`}
      </h2>
      <p class="mt-4 text-xl text-gray-600 font-medium">${esc(sub || `Located at ${b.address.oneLine}`)}</p>
    </div>
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="lg:w-2/3 h-[400px] bg-gray-200 rounded-sm border border-gray-300 overflow-hidden shadow-inner">
        <iframe src="${b.maps.embedUrl}" width="100%" height="100%" style="border:0;"
          title="Map showing ${esc(b.name)} at ${esc(b.address.oneLine)}"
          allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
      <div class="lg:w-1/3 bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h3 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-6 border-b-2 border-ybe-red pb-2">
          Serving These Areas</h3>
        <div class="flex flex-wrap gap-2">
          ${areas
            .map(
              (a) =>
                `<a href="${a.url}" class="${
                  a.slug === activeSlug
                    ? 'bg-ybe-red border-ybe-red text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-ybe-red hover:text-ybe-red'
                } border px-4 py-2.5 text-sm font-semibold rounded-sm transition-colors inline-block">${esc(a.label)}</a>`
            )
            .join('')}
        </div>
        <div class="mt-8">
          <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="map-block"
             class="w-full bg-ybe-black hover:bg-ybe-charcoal text-white text-center font-heading text-xl px-6 py-4 rounded-sm transition-all uppercase tracking-wide font-bold flex items-center justify-center gap-2">
            ${icon('navigation', 20)} Get Directions</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------- CONTACT */
/** The dark contact section that closes the homepage; used to close every page. */
function contactBlock({ heading, sub } = {}) {
  return `
<section id="contact" class="py-20 bg-gray-100 text-ybe-black relative border-t border-gray-200">
  <div class="absolute top-0 left-0 w-full h-2 bg-ybe-red"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12 items-center">
      <div class="lg:w-1/2">
        <h2 class="text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-wide text-ybe-black mb-6">
          ${heading || 'Request Service'}
        </h2>
        <p class="text-gray-600 mb-8 font-medium">
          ${esc(sub || 'Call or text the shop, request an appointment online, or stop by. We are open seven days a week.')}
        </p>
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            ${icon('map-pin', 24, 'text-ybe-red mt-1 flex-shrink-0')}
            <div><h3 class="font-heading text-xl font-bold uppercase text-ybe-black">Location</h3>
              <p class="text-gray-700">${esc(b.address.oneLine)}</p>
              <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="contact-block"
                 class="text-ybe-red hover:text-ybe-darkred font-semibold text-sm">Get directions</a></div>
          </div>
          <div class="flex items-start gap-4">
            ${icon('clock', 24, 'text-ybe-red mt-1 flex-shrink-0')}
            <div><h3 class="font-heading text-xl font-bold uppercase text-ybe-black">Hours</h3>
              <p class="text-gray-700">${esc(b.hours.summary)}</p></div>
          </div>
          <div class="flex items-start gap-4">
            ${icon('phone', 24, 'text-ybe-red mt-1 flex-shrink-0')}
            <div><h3 class="font-heading text-xl font-bold uppercase text-ybe-black">Contact</h3>
              <a href="${b.phone.href}" data-track="call" data-location="contact-block" class="block py-2 text-gray-700 hover:text-ybe-red transition-colors">${esc(b.phone.display)} (call)</a>
              <a href="${b.sms.href}" data-track="text" data-location="contact-block" class="block py-2 text-gray-700 hover:text-ybe-red transition-colors">${esc(b.phone.display)} (text)</a>
              <a href="${b.whatsapp.href}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location="contact-block" class="block py-2 text-gray-700 hover:text-ybe-red transition-colors">${esc(b.whatsapp.display)}</a></div>
          </div>
          <div class="flex items-start gap-4">
            ${icon('share-2', 24, 'text-ybe-red mt-1 flex-shrink-0')}
            <div class="w-full">
              <h3 class="font-heading text-xl font-bold uppercase text-ybe-black mb-3">Follow &amp; Share</h3>
              <div class="flex flex-wrap items-center gap-3">
                <a href="${b.social.facebook}" target="_blank" rel="noopener noreferrer" data-track="facebook" data-location="contact-block"
                   class="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#0f5fd0] text-white font-heading text-lg px-5 py-2.5 rounded-sm uppercase tracking-wide font-bold transition-colors">
                  ${icon('facebook', 20)} Facebook</a>
                <a href="${b.social.instagram}" target="_blank" rel="noopener noreferrer" data-track="instagram" data-location="contact-block"
                   style="background-image:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)"
                   class="inline-flex items-center gap-2 hover:opacity-90 text-white font-heading text-lg px-5 py-2.5 rounded-sm uppercase tracking-wide font-bold transition-opacity">
                  ${icon('instagram', 20)} Instagram</a>
                <button type="button" id="share-btn" data-track="share" data-location="contact-block"
                   class="inline-flex items-center gap-2 bg-ybe-black hover:bg-ybe-charcoal text-white font-heading text-lg px-5 py-2.5 rounded-sm uppercase tracking-wide font-bold transition-colors">
                  ${icon('share-2', 20)} <span id="share-label">Share</span></button>
              </div>
              <p id="share-status" role="status" aria-live="polite" class="text-sm text-gray-600 mt-2 h-5"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 w-full">
        <div class="bg-white p-10 rounded-sm border border-gray-200 border-t-4 border-t-ybe-red shadow-xl text-center">
          ${icon('calendar', 64, 'text-ybe-red mx-auto mb-6')}
          <h3 class="font-heading text-3xl font-bold uppercase tracking-wide mb-4 text-ybe-black">Book Your Visit</h3>
          <p class="text-gray-600 mb-8 font-medium">Request an appointment and we will get back to you to confirm a time.</p>
          <div class="flex flex-col gap-4">
            <a href="/request-appointment/" data-track="appointment" data-location="contact-block"
               class="w-full bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard border-2 border-transparent hover:border-white transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-2">
              Request Appointment ${icon('arrow-right', 20)}</a>
            <div class="text-gray-500 font-medium">OR</div>
            <a href="${b.booking.href}" target="_blank" rel="noopener noreferrer" data-track="appointment" data-location="square-booking"
               class="w-full bg-white hover:bg-gray-50 text-ybe-black font-heading text-2xl px-6 py-4 rounded-sm shadow-hard border-2 border-ybe-black transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-2">
              ${esc(b.booking.label)} ${icon('external-link', 20)}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------- HELPERS */
/** Section heading in the homepage's style. */
function heading2(html, sub) {
  return `<div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
    <div class="max-w-2xl">
      <h2 class="text-4xl md:text-6xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-4">${html}</h2>
      ${sub ? `<p class="text-lg text-gray-600 font-medium border-l-4 border-ybe-red pl-4">${esc(sub)}</p>` : ''}
    </div>
  </div>`;
}

/** Centered heading variant, as used above the tile grid and FAQ. */
function heading2Center(html, sub) {
  return `<div class="text-center mb-12">
    <h2 class="text-4xl md:text-5xl font-heading font-bold text-ybe-black uppercase tracking-wide">${html}</h2>
    ${sub ? `<p class="mt-4 text-xl text-gray-600 font-medium">${esc(sub)}</p>` : ''}
  </div>`;
}

/** Red-check list used inside light sections. */
function checkList(items) {
  return `<ul class="space-y-4">
    ${items
      .map(
        (t) => `<li class="flex items-start gap-3">
      <div class="bg-ybe-red rounded-full p-1 shadow-sm flex-shrink-0 mt-1">${icon('check', 16, 'text-white')}</div>
      <span class="text-gray-700 leading-relaxed">${esc(t)}</span></li>`
      )
      .join('')}
  </ul>`;
}

module.exports = {
  esc,
  heroBlock,
  numberedCards,
  problemTiles,
  roadsideBand,
  checklistBlock,
  reviewsBlock,
  mapAreasBlock,
  contactBlock,
  heading2,
  heading2Center,
  checkList
};
