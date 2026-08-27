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
    ['photo-1632731557008', b.images.shop]  // why-us section background
  ];
  for (const [stockId, img] of photoMap) {
    const re = new RegExp(
      `src="https://images\\.unsplash\\.com/${stockId}[^"]*"([^>]*?)alt="[^"]*"`,
      'g'
    );
    main = main.replace(re, `src="${img.src}"$1alt="${img.alt}"`);
  }

  // Images are used as backgrounds only, never shown as standalone pictures.
  // Remove the tilted inset photo card beside the hero headline and let the
  // headline column use the full width.
  main = main.replace(
    /<div class="hidden md:block md:w-1\/3">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    '</div>'
  );
  main = main.replace('<div class="max-w-3xl md:w-2/3">', '<div class="max-w-3xl">');

  // The "why drivers trust YBE" photo becomes a background on its container so
  // the 2006 badge stays, but no picture is presented on its own.
  main = main.replace(
    /<img src="[^"]*"\s+alt="[^"]*"\s+class="w-full h-auto object-cover rounded-sm[^"]*"\s*\/>/,
    ''
  );
  main = main.replace(
    'class="relative p-2 bg-white shadow-xl rounded-sm border-2 border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden"',
    `class="relative rounded-sm shadow-xl overflow-hidden bg-cover bg-center min-h-[320px] lg:min-h-[420px]" ` +
      `style="background-image:url('${b.images.shop.src}')" role="img" ` +
      `aria-label="${esc(b.images.shop.alt)}"`
  );

  // Hero photo becomes a CSS background on its container rather than an <img>.
  main = main.replace(
    /<div class="h-1\/2 md:h-full md:absolute md:inset-0 md:z-0">\s*<img[^>]*\/?>\s*<\/div>/,
    `<div class="h-1/2 md:h-full md:absolute md:inset-0 md:z-0 bg-cover bg-center" ` +
      `style="background-image:url('${b.images.hero.src}')" ` +
      `role="img" aria-label="${esc(b.images.hero.alt)}"></div>`
  );

  // Hero gradient.
  // The original had a left-to-right gradient on desktop but only a flat black
  // scrim on mobile. Both are now real gradients: the photo stays visible on the
  // right while the headline side goes dark, plus a bottom fade so the CTA and
  // hours line keep their contrast against the lighter pavement in the photo.
  main = main.replace(
    '<div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50 z-10 hidden md:block"></div>',
    '<div class="absolute inset-0 z-10 hidden md:block bg-gradient-to-r from-black via-black/85 to-transparent"></div>' +
      '<div class="absolute inset-0 z-10 hidden md:block bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>'
  );
  main = main.replace(
    '<div class="absolute inset-0 bg-black/70 z-10 md:hidden"></div>',
    '<div class="absolute inset-0 z-10 md:hidden bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>'
  );

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
