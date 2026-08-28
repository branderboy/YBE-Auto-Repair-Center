/**
 * HOMEPAGE — built from the client's original ybe_auto_repair_center.html.
 *
 * The <main> content of that file is used verbatim. The hero keeps its original
 * markup exactly: the background <img>, the original gradient overlays, the
 * headline column and the tilted inset photo card beside it.
 *
 * Only mechanical changes are applied:
 *   1. `<i data-lucide="...">` placeholders become inline SVG, since the site no
 *      longer loads the Lucide runtime from a CDN.
 *   2. The logo path points at the built asset.
 *   3. The placeholder stock photos are swapped for the shop's own photos.
 *   4. On-page anchors point at the real pages where one now exists, so the
 *      homepage feeds the rest of the site.
 *   5. Call / WhatsApp / directions links get conversion-tracking attributes.
 *
 * The shared header and footer supply navigation to the other pages.
 */

const fs = require('fs');
const path = require('path');

const { layout } = require('./layout.js');
const { icon } = require('./icons.js');
const T = require('./templates.js');
const { esc } = require('./blocks.js');
const { articles } = require('../data/articles.js');
const { areas } = require('../data/areas.js');
const { activeOffers } = require('../data/offers.js');
const b = require('../data/business.js');
const { categories, roadsideHub, primaryArea } = require('../data/pillars.js');
const { faqs } = require('../data/trust.js');

const SOURCE = path.join(__dirname, '..', '..', 'ybe_auto_repair_center.html');

/** Pull the original page's <main> block. */
function extractMain(html) {
  const m = html.match(/<main>([\s\S]*?)<\/main>/);
  if (!m) throw new Error('Could not find <main> in the original homepage file');
  return m[1];
}

/** Replace the Lucide placeholders with the same icons, inlined. */
function inlineIcons(html) {
  return html.replace(
    /<i\s+([^>]*?)data-lucide="([\w-]+)"([^>]*?)><\/i>/g,
    (full, pre, name, post) => {
      const attrs = pre + post;
      const w = (attrs.match(/width="(\d+)"/) || [])[1] || 24;
      const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
      try {
        return icon(name, Number(w), cls);
      } catch {
        return '';
      }
    }
  );
}

/** Point the original page's placeholder anchors at the real pages. */
function linkUpSections(html) {
  const bySection = [
    ['Auto Repair & Diagnostics', 'auto-repair-diagnostics'],
    ['Brake Repair', 'brake-repair'],
    ['Transmission Services', 'transmission'],
    ['Electrical & Starting', 'electrical'],
    ['Tires, Alignment & Suspension', 'tires-alignment-suspension'],
    ['A/C and Heating', 'auto-ac-heating'],
    ['Auto Body and Paint', 'auto-body-glass']
  ];

  for (const [heading, slug] of bySection) {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) continue;
    const re = new RegExp(
      `(<h3[^>]*>\\s*${heading.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/&/g, '&amp;')}\\s*</h3>[\\s\\S]*?)<a href="#contact"`,
      'i'
    );
    html = html.replace(re, `$1<a href="${cat.url}"`);
  }

  html = html.replace(/<a href="#roadside"/g, `<a href="${roadsideHub.url}"`);
  html = html.replace(/<a href="#contact"/g, '<a href="/request-appointment/"');

  const problems = [
    ['My check-engine light is on', '/services/auto-repair-diagnostics/check-engine-light-diagnostics/'],
    ['My brakes are making noise', '/services/brake-repair/brake-noise-vibration/'],
    ["My car won't start", '/services/electrical/no-start-diagnostics/'],
    ['My vehicle is overheating', '/services/auto-repair-diagnostics/cooling-system-overheating/'],
    ['My A/C is blowing warm', '/services/auto-ac-heating/ac-repair/'],
    ['My car is pulling or shaking', '/services/tires-alignment-suspension/wheel-alignment/'],
    ['My transmission is slipping', '/services/transmission/transmission-repair/']
  ];
  for (const [label, url] of problems) {
    const escd = label.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/'/g, "['’]");
    const re = new RegExp(`<a href="#services"([^>]*>[\\s\\S]*?${escd})`, 'i');
    html = html.replace(re, `<a href="${url}"$1`);
  }
  html = html.replace(/<a href="#services"/g, '<a href="/services/"');

  return html;
}

function renderHomeOriginal() {
  const original = fs.readFileSync(SOURCE, 'utf8');

  let main = extractMain(original);
  main = inlineIcons(main);
  main = linkUpSections(main);

  /*
   * The source file references its images relatively (images/...) so it also
   * renders correctly when opened straight from disk. Map those to the built
   * asset paths for the generated site.
   */
  const assetMap = [
    ['images/YBE%20Auto%20in%20maryland.png', b.images.hero.src],
    ['images/hero%20photo.jpg', b.images.shop.src],
    ['images/ybe%20auto.png', b.images.logo],
    ['images/meet%20scooter.png', '/assets/img/meet-scooter.png'],
    ['images/hero_yBE.jpg', '/assets/img/hero-scooter.jpg'],
    ['images/the%20shop.jpg', '/assets/img/hero-shop.jpg']
  ];
  for (const [from, to] of assetMap) {
    main = main.split(`src="${from}"`).join(`src="${to}"`);
  }

  /*
   * The offers band goes after the hero as its own section — light ground, its
   * own heading and its own padding. The previous attempt put dark cards
   * immediately below a dark hero, which read as part of the hero rather than
   * as a section of its own.
   */
  if (activeOffers.length) {
    main = main.replace('</section>', '</section>' + offersSection(), 1);
  }

  // Conversion tracking on the original page's call / WhatsApp / map links.
  main = main
    .replace(/<a href="tel:\+12024553822"/g, '<a data-track="call" data-location="homepage" href="tel:+12024553822"')
    .replace(/<a href="https:\/\/wa\.me\/12024553822"/g, '<a data-track="whatsapp" data-location="homepage" href="https://wa.me/12024553822"')
    .replace(/<a href="https:\/\/maps\.google\.com/g, '<a data-track="directions" data-location="homepage" href="https://maps.google.com');

  return layout({
    /*
     * "mechanic near me" is the profile's top search by a factor of two over
     * anything else, and the word appeared in no page title on the site. It
     * leads here now — "auto repair" still follows it, so nothing is traded
     * away for it.
     */
    title: `Mechanic in ${primaryArea.label} | ${b.name} Auto Repair`,
    /*
     * Mirrors how the Google Business Profile positions the shop: Black-owned,
     * open since 2006, seven days. Those are the facts that separate this
     * listing from the other repair shops in the pack, and a description that
     * only lists services throws them away.
     */
    description: `Black-owned auto repair shop in ${primaryArea.label}, open seven days since ${b.openedYear}. Diagnostics, brakes, engines, transmissions, A/C, bodywork and roadside assistance. Call or text ${b.phone.display}.`,
    path: '/',
    crumbs: [{ label: 'Home', url: '/' }],
    // The hero pads for the header itself; see `fullBleed` in layout.js.
    fullBleed: true,
    schema: [T.faqSchema(faqs.slice(0, 6))],
    /*
     * The original template covers services and service categories — elements
     * one and two — and then stops. Geographic relevance and topical relevance
     * are elements four and three of the brief's architecture, and both were
     * reachable only through the nav dropdown and a single footer link, which
     * is not coverage. They are appended here rather than edited into the
     * template markup, so the page above stays exactly as written.
     */
    body: main + areasSection() + carCareSection()
  });
}

/**
 * Element 4 — geographic relevance. The neighbourhoods, on the page itself.
 *
 * List only, no map: the template already embeds one further up, and a second
 * iframe of the same address is weight for nothing.
 */
function areasSection() {
  return `
<section class="py-20 bg-white border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-heading font-bold text-ybe-black uppercase tracking-wide">
        Neighborhoods We <span class="text-ybe-red">Serve</span>
      </h2>
      <p class="mt-4 text-xl text-gray-600 font-medium">${esc(
        `${areas.length} areas across Prince George's County and Washington, DC`
      )}</p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      ${areas
        .map(
          (a) => `<a href="${a.url}" class="flex items-center gap-2 border-2 ${
            a.isPrimary ? 'border-ybe-red bg-ybe-redtint' : 'border-gray-200 bg-white'
          } hover:border-ybe-red px-4 py-3 rounded-sm font-heading uppercase tracking-wide text-sm font-bold text-ybe-black transition-colors">
        ${icon('map-pin', 16, 'text-ybe-red flex-shrink-0')} <span>${esc(a.label)}</span></a>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

/** Element 3 — topical relevance. The questions people actually search. */
function carCareSection() {
  const picks = articles.slice(0, 6);
  return `
<section class="py-20 bg-gray-50 border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-heading font-bold text-ybe-black uppercase tracking-wide">
        Car Care <span class="text-ybe-red">Tips</span>
      </h2>
      <p class="mt-4 text-xl text-gray-600 font-medium">Straight answers to what drivers ask us most</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${picks
        .map(
          (a) => `<a href="${a.url}" class="bg-white border border-gray-200 rounded-sm p-6 hover:border-ybe-red transition-colors group">
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black group-hover:text-ybe-red mb-2">${esc(a.title)}</h3>
        <p class="text-gray-600 text-sm leading-relaxed">${esc(a.shortAnswer.slice(0, 120))}&hellip;</p>
      </a>`
        )
        .join('')}
    </div>
    <div class="text-center mt-10">
      <a href="/car-care/" class="inline-flex items-center gap-2 font-heading text-xl font-bold uppercase tracking-wide text-ybe-red hover:text-ybe-darkred">
        ${icon('arrow-right', 20)} All Car Care Tips</a>
    </div>
  </div>
</section>`;
}

/**
 * Offers band. Four across on desktop, two-up on a phone, each with its
 * illustration from the brand icon sheet.
 */
function offersSection() {
  return `
<section class="py-10 sm:py-14 bg-gray-50 border-b-4 border-ybe-red" aria-labelledby="offers-heading">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-7">
      <h2 id="offers-heading" class="text-3xl md:text-4xl font-heading font-bold text-ybe-black uppercase tracking-wide inline-block relative">
        Our New <span class="text-ybe-red">Offers</span>
        <div class="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-ybe-red"></div>
      </h2>
      <p class="mt-3 text-lg text-gray-600 font-medium">Mention the offer when you call or text</p>
    </div>
    <div class="grid ${
      activeOffers.length >= 4
        ? 'grid-cols-2 lg:grid-cols-4'
        : activeOffers.length === 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : activeOffers.length === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 max-w-sm mx-auto'
    } gap-4 sm:gap-6">
      ${activeOffers
        .map(
          (o) => `<a href="${o.service}" data-track="offer" data-location="homepage-offers"
        class="group flex flex-col items-center text-center">
        <div class="w-full bg-white border-2 border-ybe-green group-hover:border-ybe-darkgreen rounded-sm p-4 sm:p-5 flex items-center justify-center transition-colors">
          ${
            o.art
              ? `<img src="${o.art}" alt="${esc(o.artAlt)}" width="560" height="560" loading="lazy"
                   class="w-24 h-24 sm:w-28 sm:h-28 object-contain">`
              : icon(o.icon, 48, 'text-ybe-red')
          }
        </div>
        <h3 class="mt-4 font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ybe-black leading-none group-hover:text-ybe-red transition-colors">${esc(
          o.headline
        )}</h3>
        <p class="text-ybe-red font-heading font-bold uppercase tracking-wide text-base sm:text-lg leading-tight mt-2">${esc(
          o.highlight
        )}</p>
        ${
          o.regularPrice
            ? `<p class="mt-2 text-base text-gray-500 font-medium">Regularly <span class="line-through">${esc(
                o.regularPrice
              )}</span></p>`
            : ''
        }
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

module.exports = { renderHomeOriginal };
