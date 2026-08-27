#!/usr/bin/env node
/**
 * Regenerate the social share card at src/assets/img/og-card.jpg.
 *
 * Social platforms expect 1200x630 (1.91:1). The logo was previously used for
 * this and, being 1.5:1, got letterboxed with grey bars in every preview.
 *
 * Run after changing the hero photo, the phone number or the hours:
 *   npm run og && npm run build
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const b = require('../src/data/business.js');

const W = 1200;
const H = 630;
const OUT = path.join(__dirname, '..', 'src', 'assets', 'img', 'og-card.jpg');

(async () => {
  const base = await sharp(path.join(__dirname, '..', 'src', 'assets', 'img', 'hero-shop.jpg'))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.5 })
    .toBuffer();

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const overlay = Buffer.from(`
  <svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0%' stop-color='#0A0A0B' stop-opacity='0.95'/>
        <stop offset='58%' stop-color='#0A0A0B' stop-opacity='0.80'/>
        <stop offset='100%' stop-color='#0A0A0B' stop-opacity='0.30'/>
      </linearGradient>
    </defs>
    <rect width='${W}' height='${H}' fill='url(#g)'/>
    <rect x='0' y='${H - 14}' width='${W}' height='14' fill='#D60A0A'/>
    <text x='72' y='320' font-family='sans-serif' font-size='64' font-weight='bold' fill='#FFFFFF'>AUTO REPAIR THAT GETS</text>
    <text x='72' y='388' font-family='sans-serif' font-size='64' font-weight='bold' fill='#FFFFFF'>YOU BACK ON THE ROAD</text>
    <rect x='72' y='420' width='110' height='7' fill='#D60A0A'/>
    <text x='72' y='478' font-family='sans-serif' font-size='31' fill='#E4E4E4'>${esc(b.address.city)}, ${esc(b.address.state)}  &#183;  Open 7 days, 8:30am&#8211;6pm</text>
    <text x='72' y='534' font-family='sans-serif' font-size='42' font-weight='bold' fill='#FFFFFF'>Call or text ${esc(b.phone.display)}</text>
    <text x='72' y='580' font-family='sans-serif' font-size='26' fill='#BFBFBF'>Repair &#183; Body &#183; Roadside &#183; Serving drivers since ${b.openedYear}</text>
  </svg>`);

  const logo = await sharp(path.join(__dirname, '..', 'images', 'ybe auto.png'))
    .resize({ width: 260 })
    .toBuffer();

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }, { input: logo, top: 44, left: 72 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(OUT);

  console.log(`og-card.jpg  ${W}x${H}  ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
})();
