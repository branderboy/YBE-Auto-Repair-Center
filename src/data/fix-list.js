/**
 * FIX LIST, 2026-11-16 (owner): the H2 each core page was missing, from the
 * Search Console 7-to-20 cut (August to November 2026). Titles for the same
 * pages are set in the page records (title_override).
 *
 * Core services only: Paint And Dent is a side service and gets no fix.
 *
 * Copy is drawn from what the site already states (car-care articles, price
 * guides, offers.js). No new prices or claims. `offer` names an offers.js slug;
 * it prints only while that offer is active.
 */
const S = '/services/';

const fixList = {
  // Auto Repair, General: 60 queries, 384 impressions, best position 7
  '/': {
    h2: 'Auto Repair Services We Run Every Day',
    paras: [
      'These are the jobs that come through the bays every day. Each one starts the same way: we find the cause, tell you what it costs, and only then start the work.'
    ],
    links: [
      { url: `${S}auto-repair-diagnostics/check-engine-light-diagnostics/`, label: 'Check engine light diagnostics' },
      { url: `${S}brake-repair/`, label: 'Brake repair' },
      { url: `${S}auto-repair-diagnostics/oil-change/`, label: 'Oil change' },
      { url: `${S}auto-repair-diagnostics/engine-repair/`, label: 'Engine repair' },
      { url: `${S}electrical/battery-alternator-starter/`, label: 'Battery, alternator and starter' },
      { url: `${S}transmission/`, label: 'Transmission service' },
      { url: `${S}auto-ac-heating/`, label: 'Auto A/C and heating' },
      { url: `${S}tires-alignment-suspension/`, label: 'Tires, alignment and suspension' }
    ]
  },

  // Battery And Starting: 7 queries, 206 impressions, best position 9.16
  [`${S}electrical/battery-alternator-starter/`]: {
    h2: 'Signs Your Battery Is Dying',
    paras: ['Batteries rarely die without warning. They usually give you a few of these first.'],
    list: [
      'The engine cranks slower than it used to',
      'You have needed a jump start recently',
      'Dash and headlights look dim when starting',
      'A battery or check-charging light comes on',
      'White or green corrosion on the terminals',
      'A swollen or cracked battery case',
      'The battery is more than three to five years old'
    ],
    after: [
      'A battery that seems weak can be a charging problem, a bad cable or a drain that kills it overnight. YBE load-tests the battery and checks the charging system before replacing anything.'
    ],
    more: { url: '/car-care/signs-your-car-battery-needs-replacing/', label: 'Signs your car battery needs to be replaced' }
  },

  // Brake Repair: 13 queries, 190 impressions, best position 7
  [`${S}brake-repair/`]: {
    h2: 'How Much Does Brake Repair Cost',
    paras: [
      'A brake job is not one price because it is not one repair. Front and rear are separate jobs, and each axle can need anything from pads only to pads, rotors, hardware and a caliper.',
      'The biggest factor is how far the wear went before you came in. Pads caught early can often be replaced on their own. Pads worn to metal score the rotors, and then the rotors have to be replaced too.'
    ],
    list: [
      'Pads only, or pads and rotors',
      'Front and rear are priced as separate jobs',
      'Calipers, when one seizes, sticks or leaks',
      'Vehicle class: bigger vehicles use bigger, costlier parts'
    ],
    after: ['YBE measures pads and rotors first and quotes before any work starts.'],
    offer: 'brake-inspection',
    more: { url: '/car-care/brake-pad-replacement-cost/', label: 'How much does brake pad replacement cost?' }
  },

  // Oil Change: 9 queries, 80 impressions, best position 7.98
  [`${S}auto-repair-diagnostics/oil-change/`]: {
    h2: 'What Is Included In An Oil Change',
    paras: ['Every oil change should include these, and at YBE the car also gets an under-car look while it is up.'],
    list: [
      'Old oil drained',
      'New oil filter installed',
      'Refilled with the correct oil type and amount',
      'Maintenance reminder reset',
      'An under-car look for leaks, worn parts and tire wear while the car is up'
    ],
    after: ['Walk-ins are welcome seven days a week.'],
    offer: 'oil-change-99',
    more: { url: '/car-care/whats-included-with-an-oil-change/', label: "What's included with an oil change?" }
  },

  // Engine Repair And Diagnostics: 17 queries, 55 impressions, best position 7
  [`${S}auto-repair-diagnostics/engine-repair/`]: {
    h2: 'Check Engine Light: What It Means And What To Do',
    paras: [
      'A check engine light means the engine computer detected something outside its expected range and stored a code. A steady light means get it checked soon. A flashing light means stop driving and call today, because a misfire that severe can damage the catalytic converter within minutes.',
      'A code names a circuit or a symptom, not a broken part, so the code is where the diagnosis starts. YBE tests to find the real cause before replacing anything.'
    ],
    list: [
      'Steady light, car drives normally: get it read soon',
      'Flashing light: drive as little as possible and call',
      'Running rough, losing power or overheating: stop driving',
      'Loose gas cap: tighten it until it clicks and watch for a day or two'
    ],
    offer: 'diagnostic-80',
    more: { url: '/car-care/why-is-my-check-engine-light-on/', label: 'Why is my check engine light on?' }
  }
};

module.exports = { fixList };
