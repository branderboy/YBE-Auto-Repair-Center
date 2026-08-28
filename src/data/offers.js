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
    highlight: 'Check-engine light and drivability faults',
    icon: 'alert-circle',
    blurb:
      'We read the stored codes and then test what they point at, so you learn which part actually failed rather than which circuit reported a problem.',
    detail: [
      'A code names a circuit, not a broken part. The same code can be set by a failed sensor, a vacuum leak, an exhaust leak, corroded wiring or an engine genuinely running rich — five causes, five different repairs.',
      'That is what the $80 covers: the testing that separates them. It is the step that stops you buying parts you did not need, and if you go ahead with the repair it comes off the bill.'
    ],
    cta: 'Book a Diagnostic',
    service: '/services/auto-repair-diagnostics/check-engine-light-diagnostics/',
    fineprint: 'Applied toward the cost of the repair when you go ahead with it.',
    active: true
  },
  {
    slug: 'free-diagnostic-with-repair',
    headline: 'Diagnostic Fee Waived',
    highlight: 'With approved repair',
    icon: 'search',
    blurb:
      'When a fault needs real diagnostic time and you go ahead with the repair, the diagnostic fee comes off the bill. You pay for the fix, not for finding it.',
    detail: [
      'Some faults are not readable from a code — intermittent electrical problems, a no-start that only happens cold, a leak that shows up under load. Those take a technician and time.',
      'That time is worth paying for, because it is what stops you buying parts you did not need. If we do the repair, you are not paying for it twice.'
    ],
    cta: 'Talk To Us About Your Fault',
    service: '/services/auto-repair-diagnostics/',
    fineprint: 'Diagnostic fee applied toward the cost of the approved repair.',
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
    cta: 'Book an Oil Change',
    service: '/services/auto-repair-diagnostics/oil-change/',
    fineprint: 'Includes oil and filter. Call or text with your year, make and model when you book so we have the right oil and filter on hand.',
    active: true
  }
];

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
}

const activeOffers = offers.filter((o) => o.active);
const missingArt = offers.filter((o) => o.active && !o.art).map((o) => `${o.slug}.png`);

module.exports = { offers, activeOffers, missingArt, ART_DIR };
