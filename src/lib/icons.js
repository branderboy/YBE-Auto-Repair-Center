/**
 * Build-time icon inlining.
 *
 * The original page loaded Lucide from a CDN and rendered icons in the browser.
 * We now inline the same Lucide SVGs at build time, so there is no third-party
 * request, no layout shift while icons pop in, and the icons still render if
 * JavaScript is blocked.
 *
 * Icons are Lucide (ISC licensed).
 */

const fs = require('fs');
const path = require('path');

const ICON_DIR = path.join(__dirname, '..', '..', 'node_modules', 'lucide-static', 'icons');
const cache = new Map();

/** Lucide renamed some icons; keep the original page's names working. */
const ALIASES = {
  'alert-triangle': 'triangle-alert',
  'help-circle': 'circle-help',
  'alert-circle': 'circle-alert',
  'check-circle': 'circle-check'
};

/** Read an icon's inner SVG markup once and reuse it. */
function inner(rawName) {
  const name = ALIASES[rawName] || rawName;
  if (cache.has(name)) return cache.get(name);
  const file = path.join(ICON_DIR, `${name}.svg`);
  if (!fs.existsSync(file)) {
    throw new Error(`Unknown icon "${name}" — no ${name}.svg in lucide-static`);
  }
  const svg = fs.readFileSync(file, 'utf8');
  const body = svg
    .replace(/[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  cache.set(name, body);
  return body;
}

/**
 * Render an inline SVG icon.
 * Decorative by default (aria-hidden) since every icon here sits next to text.
 */
function icon(name, size = 24, cls = '') {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" ` +
    `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ` +
    `${cls ? `class="${cls}" ` : ''}aria-hidden="true" focusable="false">${inner(name)}</svg>`
  );
}

module.exports = { icon };
