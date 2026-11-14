/**
 * PAGE RECORDS for pages not in Muse's set (research/meta/meta-output.csv).
 * Same fields as page-records.json; scripts/dynamic-meta.js turns each into a
 * title and description. Nobody writes meta by hand: change a record, rebuild.
 *
 * `trusts` lists the trust signals a record may use; the build takes the
 * first one that lands the description in the 150-160 band with no flags.
 */
const PHONE = '(202) 455-3822';
const TRUSTS = ['Serving the community since 2006', 'Open seven days, walk-ins welcome', 'Open seven days a week', 'Black-owned and open seven days a week'];

const svc = (url, service, fixes) => ({
  url, page: service, page_type: 'service_location', key_question: `Who does ${service.toLowerCase()} in Capitol Heights?`,
  service, service_lower: service.toLowerCase(), city: 'Capitol Heights', state: 'MD',
  fix_1: fixes[0], fix_2: fixes[1], fix_3: fixes[2]
});
const q = (url, key_question) => ({ url, page: key_question, page_type: 'faq', key_question });

const S = '/services/';
const records = [
  {
    url: '/services/', page: 'Auto Repair Services', page_type: 'service',
    key_question: 'What auto repair services does YBE offer in Capitol Heights?',
    service: 'Auto Repair Services in Capitol Heights, MD', service_lower: 'auto repair in Capitol Heights',
    fix_1: 'diagnostics and brakes', fix_2: 'transmissions and A/C', fix_3: 'bodywork'
  },
  {
    url: '/service-areas/capitol-heights-md/', page: 'Capitol Heights', page_type: 'location',
    key_question: 'Where is a good auto repair shop in Capitol Heights?',
    trade_label: 'Auto Repair Shop', city: 'Capitol Heights', state: 'MD', problem: 'a check engine light that will not go off',
    top_service_1: 'Diagnostics', top_service_2: 'brakes', top_service_3: 'bodywork'
  },

  svc(`${S}auto-repair-diagnostics/check-engine-light-diagnostics/`, 'Check Engine Light Diagnostics', ['codes read and confirmed by testing', 'the real cause found', 'no guessing at parts']),
  svc(`${S}auto-repair-diagnostics/state-inspection-repairs/`, 'Maryland Inspection Repairs', ['failed items repaired', 'ready to go back to the station', 'no surprise extras']),
  svc(`${S}auto-repair-diagnostics/engine-repair/`, 'Engine Repair', ['knocking and misfires diagnosed', 'oil leaks fixed', 'lost power traced']),
  svc(`${S}auto-repair-diagnostics/tune-ups-maintenance/`, 'Tune-Ups and Maintenance', ['plugs and filters replaced', 'fluids serviced', 'what is due listed first']),
  svc(`${S}auto-repair-diagnostics/oil-change/`, 'Oil Change', ['oil and filter changed', 'under-car check included', 'walk-ins welcome']),
  svc(`${S}auto-repair-diagnostics/cooling-system-overheating/`, 'Overheating and Cooling Repair', ['leaks found', 'thermostats and hoses replaced', 'radiators repaired']),
  svc(`${S}brake-repair/brake-pad-rotor-replacement/`, 'Brake Pad and Rotor Replacement', ['all four corners measured', 'only worn parts replaced', 'rotors checked']),
  svc(`${S}brake-repair/brake-noise-vibration/`, 'Brake Noise and Vibration Repair', ['squeals and grinding fixed', 'pedal shake traced', 'pulling corrected']),
  svc(`${S}brake-repair/brake-fluid-calipers/`, 'Brake Fluid and Caliper Service', ['fluid tested and flushed', 'sticking calipers fixed', 'warning lights checked']),
  svc(`${S}transmission/transmission-repair/`, 'Transmission Repair', ['slipping diagnosed', 'late shifts traced', 'fluid checked first']),
  svc(`${S}transmission/transmission-replacement-rebuild/`, 'Transmission Replacement', ['rebuild or replace explained', 'cost weighed against the car', 'done in the shop']),
  svc(`${S}transmission/transmission-fluid-leaks/`, 'Transmission Leak Repair', ['leaks found and sealed', 'fluid serviced', 'lines and coolers checked']),
  svc(`${S}electrical/battery-alternator-starter/`, 'Alternator and Starter Repair', ['charging system tested', 'alternators replaced', 'starters and batteries fixed']),
  svc(`${S}electrical/no-start-diagnostics/`, 'No-Start Diagnostics', ['battery and starter tested', 'fuel and spark checked', 'the real fault found']),
  svc(`${S}electrical/wiring-sensors-fuses/`, 'Car Electrical Repair', ['wiring faults traced', 'fuses and relays replaced', 'sensors tested']),
  svc(`${S}tires-alignment-suspension/wheel-alignment/`, 'Wheel Alignment', ['pulling corrected', 'steering wheel centered', 'tire wear checked']),
  svc(`${S}tires-alignment-suspension/tire-repair-replacement/`, 'Tire Repair and Replacement', ['punctures plugged', 'tires replaced', 'rotations done']),
  svc(`${S}tires-alignment-suspension/shocks-struts-steering/`, 'Shocks, Struts and Steering Repair', ['clunks traced', 'shocks and struts replaced', 'steering play fixed']),
  svc(`${S}auto-ac-heating/ac-repair/`, 'Auto AC Repair', ['leaks found', 'compressors replaced', 'cold air back']),
  svc(`${S}auto-ac-heating/heating-system-repair/`, 'Car Heater Repair', ['heater cores checked', 'thermostats replaced', 'defrost fixed']),
  svc(`${S}auto-body-glass/collision-body-repair/`, 'Collision Repair', ['damage behind the panel checked', 'panels repaired', 'paint matched']),
  svc(`${S}auto-body-glass/dent-scratch-paint/`, 'Dent and Scratch Repair', ['dents pulled', 'scratches refinished', 'paint blended to match']),
  svc(`${S}auto-body-glass/auto-glass/`, 'Auto Glass Repair', ['chips repaired', 'windshields replaced', 'windows fixed']),
  svc('/roadside-assistance/roadside-mobile-diagnostics/', 'Mobile Auto Diagnostics', ['codes scanned where you sit', 'a drive-it or not answer', 'fixes on site when possible']),
  svc('/roadside-assistance/roadside-mobile-repairs/', 'Mobile Minor Auto Repairs', ['batteries and cables fixed', 'fuses and belts replaced', 'repairs where you sit']),

  // Cost questions: the FAQ template promises cost factors, time and process, which these pages carry.
  q('/car-care/what-affects-brake-repair-cost/', 'What affects the cost of a brake job in Capitol Heights?'),
  q('/car-care/what-affects-transmission-repair-cost/', 'What affects the cost of transmission repair near me?'),
  q('/car-care/what-affects-ac-repair-cost/', 'What affects the cost of car AC repair in Capitol Heights?'),
  q('/car-care/what-affects-diagnostic-cost/', 'Why do auto repair shops charge for a diagnostic test?'),
  q('/car-care/what-affects-oil-change-cost/', 'What affects the price of an oil change near Capitol Heights?'),
  q('/car-care/what-affects-alignment-cost/', 'What affects the cost of a wheel alignment in Capitol Heights?'),
  q('/car-care/what-affects-battery-alternator-cost/', 'What affects the cost of battery and alternator repair?'),
  q('/car-care/what-affects-body-repair-cost/', 'What affects the cost of auto body repair in Capitol Heights?'),
  q('/car-care/mobile-mechanic-cost/', 'How much does a mobile mechanic cost in Capitol Heights?'),
  q('/car-care/no-start-diagnosis-cost/', 'How much does a no-start diagnosis cost in Capitol Heights?'),
  q('/car-care/jump-start-cost/', 'How much does a jump start cost in Capitol Heights?'),
  q('/car-care/car-battery-replacement-cost/', 'How much does car battery replacement cost near me?'),
  q('/car-care/car-lockout-cost/', 'How much does a car lockout service cost in Capitol Heights?'),
  q('/car-care/flat-tire-help-cost/', 'How much does roadside flat tire help cost near me?'),
  q('/car-care/fuel-delivery-cost/', 'How much does emergency fuel delivery cost near me?'),
  q('/car-care/junk-car-value/', 'How much is my junk car worth in Capitol Heights, MD?'),
  q('/car-care/alternator-replacement-cost/', 'How much does alternator replacement cost near me?'),
  q('/car-care/starter-replacement-cost/', 'How much does starter replacement cost in Capitol Heights?'),
  q('/car-care/brake-pad-replacement-cost/', 'How much does brake pad replacement cost in Capitol Heights?'),

  // Car-care articles
  q('/car-care/why-is-my-check-engine-light-on/', 'Why is my check engine light on, and is it safe to drive?'),
  q('/car-care/why-wont-my-car-start/', "Why won't my car start, and what should I check first?"),
  q('/car-care/signs-brake-pads-need-replacement/', 'What are the signs my brake pads need to be replaced?'),
  q('/car-care/why-do-brakes-squeak-or-grind/', 'Why do my brakes squeak or grind when I stop the car?'),
  q('/car-care/signs-of-a-failing-transmission/', 'What are the warning signs of a failing transmission?'),
  q('/car-care/transmission-repair-rebuild-or-replace/', 'Should I repair, rebuild or replace my transmission?'),
  q('/car-care/why-does-my-car-pull-to-one-side/', 'Why does my car pull to one side when I am driving?'),
  q('/car-care/can-a-punctured-tire-be-repaired/', 'Can a punctured tire be repaired, or does it need replacing?'),
  q('/car-care/why-is-my-car-ac-blowing-warm/', 'Why is my car AC blowing warm air instead of cold air?'),
  q('/car-care/why-is-my-car-overheating/', 'Why is my car overheating, and what should I do first?'),
  q('/car-care/how-often-should-you-change-your-oil/', 'How often should you really change the oil in your car?'),
  q('/car-care/what-is-included-in-a-tune-up/', 'What is included in a car tune-up at a repair shop?'),
  q('/car-care/preventive-maintenance-older-vehicles/', 'What preventive maintenance does an older car need?'),
  q('/car-care/car-maintenance-before-a-long-trip/', 'What car maintenance should I do before a long road trip?'),
  q('/car-care/jump-start-vs-battery-replacement/', 'Do I need a jump start or a new car battery replacement?'),
  q('/car-care/what-to-do-after-a-flat-tire/', 'What should you do right after getting a flat tire?')
];

// Commercial and rideshare (owner, 2026-11-14)
records.push(
  { url: '/services/commercial-rideshare/', page: 'Commercial and Rideshare', page_type: 'service_location',
    key_question: 'Who repairs rideshare and commercial vehicles in Capitol Heights?',
    service: 'Commercial and Rideshare Repair', service_lower: 'commercial or rideshare vehicle repair', city: 'Capitol Heights', state: 'MD',
    fix_1: 'mechanical repairs', fix_2: 'condition checks', fix_3: 'vehicle prep' },
  svc('/services/commercial-rideshare/rideshare-vehicle-repair/', 'Rideshare Car Repair', ['brakes and tires', 'diagnostics and repairs', 'high-mileage maintenance']),
  svc('/services/commercial-rideshare/rental-car-share-vehicle-prep/', 'Rental and Car-Share Prep', ['checks between bookings', 'damage repaired', 'maintenance kept current']),
  svc('/services/commercial-rideshare/commercial-fleet-maintenance/', 'Commercial Fleet Repair', ['scheduled maintenance', 'mechanical work', 'body repairs']),
  svc('/services/commercial-rideshare/used-car-dealer-reconditioning/', 'Dealer Reconditioning', ['written estimates', 'approved repairs', 'overflow work']),
  svc('/services/commercial-rideshare/auction-vehicle-repair/', 'Auction Car Repair', ['post-purchase diagnostics', 'no-starts', 'roadworthiness checks'])
);
// Used and auction car repair pages (owner, 2026-11-14)
records.push(svc('/used-car-repair/', 'Used and Auction Car Repairs', ['post-purchase checks', 'warning lights and brakes', 'repairs after you buy']));
require('./company-pages.js').companies.forEach((c) => records.push({
  ...svc(c.url, c.label, c.kind === 'dealer'
    ? ['post-purchase checks', 'warning lights and brakes', 'repairs after you buy']
    : ['post-sale diagnostics', 'no-starts', 'roadworthiness checks']),
  service_lower: `${c.short} ${c.kind === 'dealer' ? 'used car repairs' : 'car repairs'}`,
  key_question: `Who can repair a car I bought ${c.kind === 'dealer' ? 'from' : 'at'} ${c.name}?`
}));
// Fleet network and government profile pages (owner, 2026-11-14)
records.push(svc('/fleet-and-government/', 'Fleet and Government Vehicle Repair', ['scheduled maintenance', 'mechanical and body repairs', 'roadside help']));
require('./org-pages.js').orgs.forEach((o) => records.push({
  ...svc(o.url, o.label, o.kind === 'fleet'
    ? ['scheduled maintenance', 'mechanical and body repairs', 'authorized before work']
    : ['vehicle maintenance', 'mechanical and body repairs', 'roadside help']),
  service_lower: `${o.short} vehicle repair`,
  key_question: `How can YBE help ${o.name} with vehicle repair?`
}));
// Question posts, batch 1: the key question is the page's title and H1.
require('./question-posts.js').posts.forEach((p) => records.push(q(`/car-care/${p.slug}/`, p.keyQuestion)));

records.forEach((r) => { r.slug = r.url; r.phone = PHONE; });

module.exports = { records, TRUSTS };
