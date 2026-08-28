/**
 * CURRENT OFFERS
 * ==============
 * Confirmed by the business. This is the only place the terms and the numbers
 * live — the homepage, the offers page and the structured data all read from
 * here, so changing a price or pulling an offer is a one-line edit and cannot
 * leave a stale number somewhere else on the site.
 *
 * `fineprint` exists because an advertised price is a promise. Where the
 * business has not specified a condition, the field says to call and confirm
 * rather than inventing an exclusion it never agreed to.
 *
 * To retire an offer, set `active: false` — every surface drops it.
 */

const offers = [
  {
    slug: 'free-brake-inspection',
    headline: 'Free Brake Inspection',
    highlight: '+ $25 Off Brake Repairs',
    icon: 'disc',
    blurb:
      'We pull the wheels and measure what is left — pads, rotors, calipers and fluid — and tell you what we find. If the work goes ahead, $25 comes off the repair.',
    detail: [
      'A brake inspection is not a glance through the wheel spokes. Pads wear unevenly, a caliper can be sticking on one corner only, and rotor thickness is a measurement, not an opinion.',
      'You get told what is actually left and how long it has. If nothing needs doing yet, we say that too — an inspection that always finds work is not an inspection.'
    ],
    cta: 'Book a Brake Inspection',
    service: '/services/brake-repair/',
    fineprint: 'Call or text to confirm the discount applies to your repair.',
    active: true
  },
  {
    slug: 'diagnostic-80',
    headline: '$80 Diagnostic',
    highlight: 'Codes read and tested',
    icon: 'alert-circle',
    blurb:
      'Get the codes read and tested before your next Maryland inspection. A check-engine light is one of the things that will hold you up, and knowing the cause first means you decide what to fix instead of finding out on a failure sheet.',
    detail: [
      'A code names a circuit, not a broken part. The same code can come from a failed sensor, a vacuum leak, an exhaust leak, corroded wiring or an engine genuinely running rich — five causes, five different repairs, one light on the dash.',
      'The $80 covers the testing that separates them, so you go into an inspection knowing what you are dealing with rather than guessing. We are not an inspection station and cannot issue the certificate, but we can tell you what would hold you up and fix it.',
      'You leave knowing which part failed and what it costs to fix, and you decide from there.'
    ],
    regularPrice: '$125',
    cta: 'Book a Diagnostic',
    service: '/services/auto-repair-diagnostics/state-inspection-repairs/',
    fineprint: 'Covers the diagnostic testing. Any repair is quoted separately before work begins.',
    active: true
  },
  {
    slug: 'oil-change-99',
    headline: '$99 Oil Change',
    highlight: 'Includes oil and filter',
    icon: 'droplet',
    blurb:
      'Oil and filter are both included in the $99. We also check your fluid levels and look over tires, brakes and anything visibly wearing while the car is up on the lift.',
    detail: [
      'An oil change is the one time a technician is under your car on a schedule. A shop that only drains and fills wastes the most useful part of the visit.',
      'We check the other fluids, look at tire condition, and tell you about anything that is starting to wear — so nothing surprises you three months from now.'
    ],
    regularPrice: '$117',
    cta: 'Book an Oil Change',
    service: '/services/auto-repair-diagnostics/oil-change/',
    fineprint: 'Includes oil and filter. Call or text with your year, make and model when you book so we have the right oil and filter on hand.',
    active: true
  }
];

/*
 * Regular price, shown struck through beside the offer price.
 *
 * Left null until the business supplies real figures. An invented "was" price
 * is the oldest trick in retail and it is not one this site will run — a
 * discount measured against a number nobody ever charged is a lie, and in
 * advertising it is an actionable one.
 *
 * Fill in regularPrice on each offer and the comparison renders itself.
 */

/*
 * Offer artwork.
 *
 * Sliced from the brand icon sheet (images/ybe icons.jpg): the rotor and
 * magnifier, the scan tool and dashboard, the diagnostic tablet, the oil can
 * and filter. Each offer looks for the file named after its slug, so a missing
 * file falls back to a line icon and degrades instead of breaking.
 */
const fs = require('fs');
const path = require('path');
const ART_DIR = path.join(__dirname, '..', 'assets', 'img', 'offers');

for (const o of offers) {
  const file = `${o.slug}.png`;
  o.art = fs.existsSync(path.join(ART_DIR, file)) ? `/assets/img/offers/${file}` : null;
  o.artAlt = `${o.headline} illustration`;
  o.regularPrice = o.regularPrice || null;
}

const activeOffers = offers.filter((o) => o.active);
const missingArt = offers.filter((o) => o.active && !o.art).map((o) => `${o.slug}.png`);

module.exports = { offers, activeOffers, missingArt, ART_DIR };
