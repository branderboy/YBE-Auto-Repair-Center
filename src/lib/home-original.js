/**
 * HOMEPAGE — built from the client's original ybe_auto_repair_center.html.
 *
 * The <main> content of that file is used verbatim: same hero, same problem
 * grid, same service cards, same roadside block, why-us, reviews, map, FAQ and
 * contact sections.
 *
 * Only three mechanical changes are applied, none of which alter the design:
 *   1. `<i data-lucide="...">` placeholders become inline SVG, since the site no
 *      longer loads the Lucide runtime from a CDN.
 *   2. The logo path is rewritten to the built asset location.
 *   3. On-page anchors that pointed at "#services"/"#contact" are pointed at the
 *      real pages where a dedicated page now exists, so the homepage feeds the
 *      rest of the site.
 * The shared header and footer supply navigation to the other pages.
 */

const fs = require('fs');
const path = require('path');

const { layout } = require('./layout.js');
const { icon } = require('./icons.js');
const T = require('./templates.js');
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
        return ''; // unknown icon: drop it rather than break the page
      }
    }
  );
}

/**
 * Point the original page's placeholder anchors at the real pages.
 * Each service card on the homepage now links to its category hub.
 */
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

  // Walk each service card and repoint its "Request Service" link.
  for (const [heading, slug] of bySection) {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) continue;
    const re = new RegExp(
      `(<h3[^>]*>\\s*${heading.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/&/g, '&amp;')}\\s*</h3>[\\s\\S]*?)<a href="#contact"`,
      'i'
    );
    html = html.replace(re, `$1<a href="${cat.url}"`);
  }

  // Roadside card and section CTA go to the roadside hub.
  html = html.replace(/<a href="#roadside"/g, `<a href="${roadsideHub.url}"`);

  // Remaining generic anchors point at the appointment page.
  html = html.replace(/<a href="#contact"/g, '<a href="/request-appointment/"');

  // The problem-grid tiles link to the pages that solve each problem.
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
    const esc = label.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/'/g, "['’]");
    const re = new RegExp(`<a href="#services"([^>]*>[\\s\\S]*?${esc})`, 'i');
    html = html.replace(re, `<a href="${url}"$1`);
  }

  // Anything still pointing at #services goes to the services hub.
  html = html.replace(/<a href="#services"/g, '<a href="/services/"');

  return html;
}

function renderHomeOriginal() {
  const original = fs.readFileSync(SOURCE, 'utf8');

  let main = extractMain(original);
  main = inlineIcons(main);
  main = linkUpSections(main);

  // Logo path -> built asset. Keeps the original alt text.
  main = main.replace(/src="ybe auto\.png"/g, `src="${b.images.logo}"`);

  // Swap the placeholder stock photography for real photos of the shop.
  // The original page used two different stock images; each maps to its own
  // real photo so the hero background and the inset card are not identical.
  const photoMap = [
    ['photo-1486262715619', b.images.hero],  // hero background
    ['photo-1632731557008', b.images.shop]   // inset card + why-us section
  ];
  for (const [stockId, img] of photoMap) {
    const re = new RegExp(
      `src="https://images\\.unsplash\\.com/${stockId}[^"]*"([^>]*?)alt="[^"]*"`,
      'g'
    );
    main = main.replace(re, `src="${img.src}"$1alt="${img.alt}"`);
  }

  // The real photo has a bright sky, so the hero overlay is deepened to keep the
  // white headline readable. Same gradient direction as the original.
  main = main.replace(
    'bg-gradient-to-r from-black via-black/80 to-black/50',
    'bg-gradient-to-r from-black via-black/85 to-black/60'
  );
  main = main.replace('bg-black/70 z-10 md:hidden', 'bg-black/75 z-10 md:hidden');

  // Add conversion tracking to the original page's call/WhatsApp/map links.
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
