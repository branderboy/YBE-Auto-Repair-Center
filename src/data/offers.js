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
    slug: 'free-check-engine-scan',
    headline: 'Free Check-Engine-Light Scan',
    highlight: 'Know the code before you decide',
    icon: 'alert-circle',
    blurb:
      'Light on? We read the stored codes at no charge and tell you what they point at, so you know what you are dealing with before committing to anything.',
    detail: [
      'The scan tells you which system reported a fault. That is genuinely useful and it costs you nothing here.',
      'What it does not do is name the broken part — a code points at a circuit, and several different failures can set the same one. If pinning it down takes testing, we explain what that involves before starting.'
    ],
    cta: 'Get Your Codes Read Free',
    service: '/services/auto-repair-diagnostics/check-engine-light-diagnostics/',
    fineprint: 'Free code scan. Further diagnostic testing is quoted before any work begins.',
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
    highlight: 'Oil, filter and a look underneath',
    icon: 'droplet',
    blurb:
      'Oil and filter changed, fluid levels checked, and a look at tires, brakes and anything visibly wearing while the car is up on the lift.',
    detail: [
      'An oil change is the one time a technician is under your car on a schedule. A shop that only drains and fills wastes the most useful part of the visit.',
      'We check the other fluids, look at tire condition, and tell you about anything that is starting to wear — so nothing surprises you three months from now.'
    ],
    cta: 'Book an Oil Change',
    service: '/services/auto-repair-diagnostics/oil-change/',
    fineprint: 'Call or text with your year, make and model to confirm the oil your vehicle takes.',
    active: true
  }
];

const activeOffers = offers.filter((o) => o.active);

module.exports = { offers, activeOffers };
