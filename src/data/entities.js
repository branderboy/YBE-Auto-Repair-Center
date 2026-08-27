/**
 * ENTITY REFERENCES
 *
 * Wikipedia URLs used as `sameAs` in structured data, so a search engine or an
 * answer engine can tie a page to a known thing rather than inferring it from
 * the words on the page. This is what lets a service page be understood as
 * being about disc brakes specifically, and the shop as being in Capitol
 * Heights, Maryland rather than any other Capitol Heights.
 *
 * Only long-standing article titles are used. `npm run links:external` checks
 * that each still resolves, so a rename shows up as a redirect or a 404 rather
 * than sitting in the markup unnoticed.
 */

const WIKI = 'https://en.wikipedia.org/wiki/';

/** The trade itself, attached to the business. */
const business = [WIKI + 'Automobile_repair_shop', WIKI + 'Motor_vehicle_service'];

/** Topic per individual service page. */
const services = {
  'check-engine-light-diagnostics': [WIKI + 'On-board_diagnostics', WIKI + 'Engine_control_unit'],
  'engine-repair': [WIKI + 'Internal_combustion_engine'],
  'tune-ups-maintenance': [WIKI + 'Motor_vehicle_service', WIKI + 'Spark_plug'],
  'oil-change': [WIKI + 'Motor_oil', WIKI + 'Oil_filter'],
  'cooling-system-overheating': [WIKI + 'Radiator_(engine_cooling)', WIKI + 'Thermostat'],

  'brake-pad-rotor-replacement': [WIKI + 'Disc_brake', WIKI + 'Brake_pad'],
  'brake-noise-vibration': [WIKI + 'Disc_brake'],
  'brake-fluid-calipers': [WIKI + 'Brake_fluid', WIKI + 'Disc_brake'],

  'transmission-repair': [WIKI + 'Automatic_transmission'],
  'transmission-replacement-rebuild': [WIKI + 'Automatic_transmission'],
  'transmission-fluid-leaks': [WIKI + 'Automatic_transmission_fluid'],

  'battery-alternator-starter': [WIKI + 'Automotive_battery', WIKI + 'Alternator', WIKI + 'Starter_(engine)'],
  'no-start-diagnostics': [WIKI + 'Starter_(engine)', WIKI + 'Automotive_battery'],
  'wiring-sensors-fuses': [WIKI + 'Automotive_electronics', WIKI + 'Fuse_(automotive)'],

  'wheel-alignment': [WIKI + 'Wheel_alignment'],
  'tire-repair-replacement': [WIKI + 'Tire'],
  'shocks-struts-steering': [WIKI + 'Suspension_(vehicle)', WIKI + 'Shock_absorber'],

  'ac-repair': [WIKI + 'Automobile_air_conditioning'],
  'heating-system-repair': [WIKI + 'Automobile_air_conditioning'],

  'collision-body-repair': [WIKI + 'Automobile_repair_shop'],
  'dent-scratch-paint': [WIKI + 'Automotive_paint'],
  'auto-glass': [WIKI + 'Windshield'],

  'jump-start': [WIKI + 'Jump_start_(vehicle)'],
  'flat-tire': [WIKI + 'Flat_tire'],
  'mobile-battery-replacement': [WIKI + 'Automotive_battery'],
  'fuel-delivery': [WIKI + 'Roadside_assistance'],
  'car-lockout': [WIKI + 'Roadside_assistance'],
  'roadside-mobile-diagnostics': [WIKI + 'On-board_diagnostics'],
  'roadside-mobile-repairs': [WIKI + 'Roadside_assistance']
};

/** Topic per category hub. */
const categories = {
  'auto-repair-diagnostics': [WIKI + 'On-board_diagnostics', WIKI + 'Internal_combustion_engine'],
  'brake-repair': [WIKI + 'Brake', WIKI + 'Disc_brake'],
  transmission: [WIKI + 'Transmission_(mechanical_device)', WIKI + 'Automatic_transmission'],
  electrical: [WIKI + 'Automotive_electronics', WIKI + 'Automotive_battery'],
  'tires-alignment-suspension': [WIKI + 'Tire', WIKI + 'Suspension_(vehicle)'],
  'auto-ac-heating': [WIKI + 'Automobile_air_conditioning'],
  'auto-body-glass': [WIKI + 'Automobile_repair_shop', WIKI + 'Windshield'],
  'roadside-assistance': [WIKI + 'Roadside_assistance']
};

/** Place per service area, so locations resolve to real towns. */
const places = {
  'capitol-heights-md': WIKI + 'Capitol_Heights,_Maryland',
  'washington-dc': WIKI + 'Washington,_D.C.',
  'district-heights-md': WIKI + 'District_Heights,_Maryland',
  'landover-md': WIKI + 'Landover,_Maryland',
  'forestville-md': WIKI + 'Forestville,_Maryland',
  'hillcrest-heights-md': WIKI + 'Hillcrest_Heights,_Maryland',
  'hyattsville-md': WIKI + 'Hyattsville,_Maryland',
  'lanham-md': WIKI + 'Lanham,_Maryland',
  'new-carrollton-md': WIKI + 'New_Carrollton,_Maryland',
  'bowie-md': WIKI + 'Bowie,_Maryland',
  'upper-marlboro-md': WIKI + 'Upper_Marlboro,_Maryland'
};

/** The county the shop sits in. */
const county = WIKI + "Prince_George's_County,_Maryland";

/** Every distinct URL, for the external link checker. */
function allUrls() {
  return [...new Set([
    ...business,
    ...Object.values(services).flat(),
    ...Object.values(categories).flat(),
    ...Object.values(places),
    county
  ])];
}

module.exports = { WIKI, business, services, categories, places, county, allUrls };
