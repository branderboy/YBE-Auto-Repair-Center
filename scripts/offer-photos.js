#!/usr/bin/env node
/**
 * Report which offer photos are still missing.
 *
 * Offers fall back to an icon when no photo exists, so a missing one is
 * invisible in the build output — the page looks finished either way. This
 * says out loud what has not been shot yet.
 *
 *   npm run offers:photos
 */

const path = require('path');
const { offers, missingPhotos, PHOTO_DIR } = require('../src/data/offers.js');

const rel = path.relative(path.join(__dirname, '..'), PHOTO_DIR);

console.log(`\nOffer photos — ${rel}/\n`);
for (const o of offers.filter((x) => x.active)) {
  console.log(`  ${o.photo ? '✓' : '·'}  ${o.slug}.jpg   ${o.photo ? '' : '(using icon fallback)'}`);
}

if (missingPhotos.length) {
  console.log(
    `\n${missingPhotos.length} still to shoot. Drop them in as landscape JPGs,\n` +
      `at least 800px wide, named exactly as above.\n`
  );
} else {
  console.log('\nAll offer photos present.\n');
}
