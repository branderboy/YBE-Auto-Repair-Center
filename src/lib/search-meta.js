/**
 * META AND KEYWORD H1s
 *
 * Titles and descriptions come from the owner's generated meta set:
 * research/meta/meta-output.csv, produced by scripts/dynamic-meta.js (the
 * Trades Meta Rule: key question in, title and description out). Nothing
 * here writes meta; this file only reads that output and maps each row to
 * the page it describes.
 *
 * The CSV's slugs describe pages by name; several differ from this site's
 * URLs, which are already indexed and are kept. SLUG_TO_URL maps the
 * difference. A page with no row keeps the meta on its own record.
 *
 * Core 5 hero rule: the H1 is the page's search phrase. For statement pages
 * that is the generated title; for FAQ pages it is the key question; for a
 * page with no row it is the search phrase of its own title (before " | ").
 */

const fs = require('fs');
const path = require('path');

const CSV = path.join(__dirname, '..', '..', 'research', 'meta', 'meta-output.csv');

/** Minimal RFC 4180 parser: quoted cells, doubled quotes, commas inside quotes. */
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); if (row.some((x) => x !== '')) rows.push(row); }
  return rows;
}

const AREA = (city) => (city === 'washington' ? 'washington-dc' : `${city}-md`);

/** CSV slug -> this site's URL, where they differ. */
function toUrl(slug) {
  let s = slug.trim().replace(/\s+/g, '-');
  const fixed = {
    '/services/auto-repair-and-diagnostics/': '/services/auto-repair-diagnostics/',
    '/services/transmission-service/': '/services/transmission/',
    '/services/electrical-and-starting/': '/services/electrical/',
    '/services/ac-and-heating/': '/services/auto-ac-heating/',
    '/services/auto-body-and-paint/': '/services/auto-body-glass/',
    '/services/roadside-assistance/': '/roadside-assistance/',
    '/services/junk-car-pickup/': '/roadside-assistance/junk-car-pickup/',
    '/services/jump-start-service/': '/roadside-assistance/jump-start/',
    '/services/mobile-battery-replacement/': '/roadside-assistance/mobile-battery-replacement/',
    '/services/car-lockout-service/': '/roadside-assistance/car-lockout/',
    '/services/flat-tire-help/': '/roadside-assistance/flat-tire/',
    '/services/fuel-delivery/': '/roadside-assistance/fuel-delivery/'
  };
  if (fixed[s]) return fixed[s];
  let m = s.match(/^\/services\/(roadside-assistance|brake-repair|jump-start-service)\/([a-z-]+)\/$/);
  if (m) {
    const type = m[1] === 'jump-start-service' ? 'jump-start' : m[1];
    return `/service-areas/${AREA(m[2])}/${type}/`;
  }
  return s;
}

const META = {};
const rows = parseCsv(fs.readFileSync(CSV, 'utf8'));
const head = rows.shift();
const col = (name) => head.indexOf(name);
for (const r of rows) {
  const url = toUrl(r[col('Slug')]);
  META[url] = {
    page: r[col('Page')],
    csvSlug: r[col('Slug')],
    type: r[col('Page Type')],
    keyQuestion: r[col('Key Question')],
    title: r[col('Title')],
    description: r[col('Description')],
    flags: r[col('Flags')]
  };
}

const metaFor = (url) => META[url] || null;

/** Keyword H1 for a page: generated title (statement) or key question (FAQ), else its own title's phrase. */
function h1For(url, fallbackTitle) {
  const m = META[url];
  if (m) return m.type === 'faq' ? m.keyQuestion : m.title;
  return fallbackTitle.split(' | ')[0].trim();
}

/** Accent the place in the site's hero style: "Brake Repair <span>in Bowie, MD</span>". */
function accentH1(h1, esc) {
  if (/\?$/.test(h1)) return esc(h1);
  const m = h1.match(/^(.*?)( (?:in|Near|for) .+)$/);
  if (!m) return esc(h1);
  return `${esc(m[1])}<span class="text-ybe-red">${esc(m[2])}</span>`;
}

module.exports = { META, metaFor, h1For, accentH1, toUrl };
