/**
 * DYNAMIC META AND KEYWORD H1s (owner's Core 5 rule)
 *
 * Core 5, hero headline rule: the H1 is the in-demand search phrase for the
 * page, picked from real Search Console data when it exists; otherwise the
 * standard search form, service then place. A slogan may sit above or below
 * it, never in its place.
 *
 * Pages listed in src/data/search-queries.json get their title, description
 * and H1 generated from their own query, one query per page. Every other page
 * keeps its hand-set meta, and its H1 is the search phrase from its title
 * (the part before " | ").
 */

const b = require('../data/business.js');
const DATA = require('../data/search-queries.json');

const TITLE_MAX = 60;
const DESC_MAX = 165;
const PLACE = `${b.address.city}, ${b.address.state}`; // Capitol Heights, MD

const titleCase = (s) =>
  s.replace(/\b([a-z])([a-z]*)/g, (m, f, r) => (['and', 'or', 'in', 'of', 'to'].includes(m) ? m : f.toUpperCase() + r))
    .replace(/\bAc\b/g, 'AC')
    .replace(/\bUp\b/g, 'Up');

/**
 * Split a query into the service phrase and the place it names.
 *   "oil change near me"                -> Oil Change           in Capitol Heights, MD
 *   "alternator repair washington dc"   -> Alternator Repair    Near Washington, DC
 *   "engine repair capitol heights md"  -> Engine Repair        in Capitol Heights, MD
 * The shop is in Capitol Heights, so a DC search reads "Near", never "in".
 */
function parseQuery(q) {
  let phrase = q.toLowerCase().trim();
  let place = `in ${PLACE}`;
  if (/ near me$/.test(phrase)) phrase = phrase.replace(/ near me$/, '');
  else if (/ washington dc$/.test(phrase)) { phrase = phrase.replace(/ washington dc$/, ''); place = 'Near Washington, DC'; }
  else if (/ capitol heights md$/.test(phrase)) phrase = phrase.replace(/ capitol heights md$/, '');
  phrase = phrase.replace(/^tune up$/, 'tune-up');
  return { phrase: titleCase(phrase), place };
}

function fit(parts, max) {
  // parts: ordered list of candidate strings, longest first; take the first that fits
  return parts.find((p) => p.length <= max) || parts[parts.length - 1];
}

function article(phrase) {
  return /^[aeiou]/i.test(phrase) ? 'an' : 'a';
}

/** Statement page (home, service): service and place first, call line last. */
function statementMeta(row) {
  let { phrase, place } = parseQuery(row.query);
  const first = phrase;
  // A second query for the same place joins the headline: "Mechanic & Auto Repair".
  if (row.also) {
    const also = parseQuery(row.also);
    if (also.place === place) phrase = `${phrase} & ${also.phrase}`;
  }
  const h1 = `${phrase} ${place}`;
  const title = fit([`${h1} | YBE Auto`, `${h1} | YBE`, h1], TITLE_MAX);
  // Lower-case for the question, keeping acronyms such as AC.
  const lower = first.replace(/\b(?!AC\b)\w+/g, (w) => w.toLowerCase());
  const countable = /^(mechanic|tune-up|oil change|brake fluid flush)$/.test(lower);
  const ask = countable ? `Need ${article(lower)} ${lower}` : `Need ${lower}`;
  const where = place.startsWith('Near') ? ' near DC' : ' in Capitol Heights';
  const tails = where === ' in Capitol Heights'
    ? [` Open 7 days at 8632 Edgeworth Dr. Call ${b.phone.display}.`, ` Open 7 days. Call ${b.phone.display}.`, ` Call ${b.phone.display}.`]
    : [` Open 7 days at 8632 Edgeworth Dr, Capitol Heights. Call ${b.phone.display}.`, ` Open 7 days in Capitol Heights. Call ${b.phone.display}.`, ` Call ${b.phone.display}.`];
  const description = fit(tails.map((t) => `${ask}${where}? ${row.fixes}.${t}`), DESC_MAX);
  return { title, description, h1 };
}

/** Area page: "<Town>, MD Mechanic & Auto Repair", the form the town's searches take. */
function areaMeta(row, area) {
  const h1 = `${area.label} Mechanic & Auto Repair`;
  const title = fit([`${h1} | YBE Auto`, `${h1} | YBE`, h1], TITLE_MAX);
  const names = area.priorityServiceNames || [];
  const list = (n) => {
    const xs = names.slice(0, n);
    return xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs.join('');
  };
  const description = fit(
    [4, 3, 2, 1].flatMap((n) => [
      `Need a mechanic in ${area.name}? YBE handles ${list(n)}, plus roadside help. Open 7 days in Capitol Heights. Call ${b.phone.display}.`,
      `Need a mechanic in ${area.name}? YBE handles ${list(n)}. Open 7 days in Capitol Heights. Call ${b.phone.display}.`
    ]),
    DESC_MAX
  );
  return { title, description, h1 };
}

/** Generated meta for a path, or null when the page has no query entry. */
function metaFor(path, ctx = {}) {
  const row = DATA.pages[path];
  if (!row) return null;
  if (ctx.area) return areaMeta(row, ctx.area);
  return statementMeta(row);
}

/** The keyword H1 for any page: generated, else the search phrase of its title. */
function h1For(path, title) {
  return title.split(' | ')[0].trim();
}

/**
 * Wrap the place in the brand-red accent span, matching the site's hero style:
 * "Oil Change <span>in Capitol Heights, MD</span>".
 */
function accentH1(h1, esc) {
  const m = h1.match(/^(.*?)( (?:in|Near|for) .+)$/);
  if (!m) return esc(h1);
  return `${esc(m[1])}<span class="text-ybe-red">${esc(m[2])}</span>`;
}

module.exports = { metaFor, h1For, accentH1, parseQuery, DATA };
