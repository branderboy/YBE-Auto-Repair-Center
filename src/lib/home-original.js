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

  // Conversion tracking on the original page's call / WhatsApp / map links.
  main = main
    .replace(/<a href="tel:\+12024553822"/g, '<a data-track="call" data-location="homepage" href="tel:+12024553822"')
    .replace(/<a href="https:\/\/wa\.me\/12024553822"/g, '<a data-track="whatsapp" data-location="homepage" href="https://wa.me/12024553822"')
    .replace(/<a href="https:\/\/maps\.google\.com/g, '<a data-track="directions" data-location="homepage" href="https://maps.google.com');

  return layout({
    title: `${b.name} | Auto Repair in ${primaryArea.label}`,
    description: `Diagnostics, brakes, engines, transmissions, A/C, bodywork and roadside assistance in ${primaryArea.label}. Open seven days. Call or text ${b.phone.display}.`,
    path: '/',
    crumbs: [{ label: 'Home', url: '/' }],
    schema: [T.faqSchema(faqs.slice(0, 6))],
    body: main
  });
}

module.exports = { renderHomeOriginal };
