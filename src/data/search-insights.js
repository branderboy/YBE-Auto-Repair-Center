/**
 * YBE Search Console analysis, 2026-11-14 (Muse): the searches people use
 * for each service, and the town those searches name. Used for the page's
 * focus H2 and paragraph, and for the Service schema (alternateName,
 * areaServed). Figures are from the report: impressions and average position,
 * August 28 to November 11, 2026.
 */
const S = '/services/';

const insights = {
  // alternator repair Washington DC: 137 impressions, position 20.7
  // battery service Landover: 70 impressions, position 15.3
  [`${S}electrical/battery-alternator-starter/`]: {
    terms: ['alternator repair', 'starter repair', 'battery service'],
    areas: ['Washington, DC', 'Landover, MD'],
    h2: 'Alternator Repair and Battery Service for Washington, DC and Landover'
  },
  // tune up Washington DC: 106 impressions, position 27.2
  [`${S}auto-repair-diagnostics/tune-ups-maintenance/`]: {
    terms: ['tune up', 'car tune-up'],
    areas: ['Washington, DC'],
    h2: 'Car Tune-Ups for Washington, DC Drivers'
  },
  // brake fluid flush Washington DC: 74 impressions, position 21.9
  [`${S}brake-repair/brake-fluid-calipers/`]: {
    terms: ['brake fluid flush', 'brake caliper repair'],
    areas: ['Washington, DC'],
    h2: 'Brake Fluid Flush for Washington, DC Drivers'
  },
  // engine repair Capitol Heights MD: 74 impressions, position 31.5
  [`${S}auto-repair-diagnostics/engine-repair/`]: {
    terms: ['engine repair'],
    areas: ['Capitol Heights, MD'],
    h2: 'Engine Repair in Capitol Heights, MD'
  },
  // transmission replacement Capitol Heights MD: 73 impressions, position 22.0
  [`${S}transmission/transmission-replacement-rebuild/`]: {
    terms: ['transmission replacement', 'transmission rebuild'],
    areas: ['Capitol Heights, MD'],
    h2: 'Transmission Replacement in Capitol Heights, MD'
  },
  // oil change near me: 169 impressions, position 25.7
  [`${S}auto-repair-diagnostics/oil-change/`]: {
    terms: ['oil change near me', 'oil change'],
    areas: ['Capitol Heights, MD'],
    h2: 'Oil Change Near You in Capitol Heights'
  },
  // auto AC repair near me: 164 impressions, position 29.5
  [`${S}auto-ac-heating/ac-repair/`]: {
    terms: ['auto AC repair', 'car AC repair'],
    areas: ['Capitol Heights, MD'],
    h2: 'Auto AC Repair Near You in Capitol Heights'
  },
  // car paint scratch repair near me: 173 impressions, position 10.3
  [`${S}auto-body-glass/dent-scratch-paint/`]: {
    terms: ['car paint scratch repair', 'dent repair', 'scratch repair'],
    areas: ['Capitol Heights, MD'],
    h2: 'Car Paint Scratch Repair Near You in Capitol Heights'
  },
  // brake repair Landover: position 11.3
  [`${S}brake-repair/brake-pad-rotor-replacement/`]: {
    terms: ['brake repair', 'brake pad replacement'],
    areas: ['Landover, MD'],
    h2: 'Brake Repair for Landover Drivers'
  },
  // tire service Landover: 69 impressions, position 20.8
  [`${S}tires-alignment-suspension/tire-repair-replacement/`]: {
    terms: ['tire service', 'tire repair'],
    areas: ['Landover, MD'],
    h2: 'Tire Service for Landover Drivers'
  },
  // Area pages. Upper Marlboro mechanic: 80 impressions, position 20.2.
  '/service-areas/upper-marlboro-md/': {
    terms: ['Upper Marlboro mechanic', 'Upper Marlboro auto repair'],
    areas: ['Upper Marlboro, MD']
  },
  // brake repair Landover 11.3, battery service Landover 15.3, tire service Landover 20.8
  '/service-areas/landover-md/': {
    terms: ['Landover brake repair', 'Landover battery service', 'Landover tire service'],
    areas: ['Landover, MD']
  }
};

module.exports = { insights };
