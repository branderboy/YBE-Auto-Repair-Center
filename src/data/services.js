/**
 * SERVICE CATEGORIES + INDIVIDUAL SERVICE PAGES
 *
 * Structure: /services/<category>/ is a hub, /services/<category>/<service>/ is
 * a specific job or symptom. Hubs are written to answer "what does this shop do
 * in this area of the car"; service pages answer one specific customer problem,
 * so the two never compete for the same search.
 *
 * Every service page carries the nine required blocks: the problem a driver
 * notices, what YBE checks, warning signs, what the work may include, why it
 * should not wait, and its own related-service links.
 */

const categories = [
  // =====================================================================
  {
    slug: 'auto-repair-diagnostics',
    navLabel: 'Auto Repair & Diagnostics',
    title: 'Auto Repair and Diagnostics',
    icon: 'wrench',
    metaTitle: 'Auto Repair & Diagnostics in Capitol Heights, MD | YBE Auto',
    metaDescription:
      'Engine trouble, warning lights, overheating and general repairs, diagnosed and fixed at our Capitol Heights shop. Open seven days. Call or text (202) 455-3822.',
    blurb:
      'Check-engine lights, engine problems, tune-ups, overheating, leaks, and general mechanical repairs.',
    intro: [
      'Most cars give you a warning before they leave you stranded. A light on the dash, a new noise, a rough idle, a smell that was not there last week. The hard part is knowing which of those means "get it looked at soon" and which means "stop driving today."',
      'That is what this side of the shop is for. We connect to your vehicle, read what the computer has stored, and then confirm it with hands-on testing before we recommend any repair. A stored code tells us where to look. It does not tell us what failed, and we do not treat it like it does.',
      'We have been doing this work in Capitol Heights since 2006, on daily drivers, work vehicles and high-mileage cars that people need running tomorrow morning.'
    ],
    covers: [
      'Check-engine-light diagnostics',
      'Engine repair',
      'Tune-ups and scheduled maintenance',
      'Cooling-system and overheating repair',
      'Oil changes and fluid service',
      'General mechanical repairs',
      'Repairs for failed Maryland state inspections'
    ],
    services: [
      {
        slug: 'check-engine-light-diagnostics',
        navLabel: 'Check Engine Light',
        title: 'Check Engine Light Diagnostics',
        metaTitle: 'Check Engine Light Repair in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Check-engine light on? YBE reads the codes and tests the actual cause at our Capitol Heights shop. Open seven days a week. Call or text (202) 455-3822.',
        customerVoice: 'The check-engine light came on.',
        problem: [
          'The light came on and nothing obvious changed. The car drives the same, sounds the same, and now there is an amber engine symbol staring at you every time you start it. Or the opposite happened: the light came on at the same moment the engine started running rough.',
          'Both situations are worth checking, but they are not equally urgent. A steady light means the computer stored a fault and wants it looked at. A flashing light means the engine is misfiring badly enough to damage the catalytic converter, and that is a same-day problem.'
        ],
        whatWeDo: [
          'We start by pulling every stored and pending code from the engine computer, along with the freeze-frame data that shows what the vehicle was doing the moment the fault was recorded. That context matters. A misfire logged at cold start points somewhere different than one logged under load on the highway.',
          'From there we test the parts the code implicates rather than replacing them on a guess. That might mean checking fuel trims, testing for vacuum leaks, comparing sensor readings against what the engine is actually doing, or checking wiring and connectors that have corroded.',
          'When we know what failed, we explain what we found, what it takes to fix it, and whether anything else is likely to follow.'
        ],
        warningSigns: [
          'A steady check-engine light with no change in how the car drives',
          'A flashing check-engine light, especially with shaking or loss of power',
          'Rough idle, hesitation, or stumbling when you accelerate',
          'Noticeably worse fuel economy than usual',
          'A rotten-egg or fuel smell from the exhaust',
          'The car failed emissions testing'
        ],
        includes: [
          'Full scan of stored, pending and history codes',
          'Freeze-frame and live-data review',
          'Hands-on testing of the suspected components and circuits',
          'Inspection of related vacuum lines, wiring and connectors',
          'A plain-language explanation of what failed and what it takes to repair',
          'Clearing codes and verifying the repair after the work is done'
        ],
        whyNotIgnore: [
          'A check-engine light is the engine asking for attention while the problem is still small. Ignored long enough, a failing oxygen sensor becomes a ruined catalytic converter, and a small misfire becomes damage inside the engine.',
          'There is also a practical reason not to wait: with the light on, the computer has already given up monitoring some systems. If a second, more serious fault develops, you will not get a new warning. It is already on.'
        ],
        related: ['engine-repair', 'tune-ups-maintenance', 'cooling-system-overheating']
      },
      {
        slug: 'state-inspection-repairs',
        navLabel: 'Inspection Repairs',
        title: 'Maryland State Inspection Repairs',
        metaTitle: 'Inspection Repairs in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Failed a Maryland inspection? YBE repairs what fails it — brakes, tires, steering, lights, exhaust — in Capitol Heights, MD. Call (202) 455-3822.',
        customerVoice: 'My car failed its Maryland inspection.',
        problem: [
          'Start with the part most shops bury: we are not a Maryland state inspection station. We do not perform the inspection and we cannot issue the certificate. Only stations licensed by the Maryland State Police can do that, and if a shop tells you otherwise, walk.',
          'What we do is the work on either side of it. We fix the items that failed so the vehicle can pass reinspection, and we go over a car before you take it in so you find out what needs attention on your terms instead of on a failure sheet.',
          'Maryland requires a safety inspection when a used vehicle is being titled and registered in the state, so this usually lands on someone who has just bought a car and needs it road-legal. That is a bad moment to be handed a list you do not understand.'
        ],
        whatWeDo: [
          'If you already failed, bring the sheet. It lists exactly what the inspector rejected, and we go through it with you line by line — what each item means, what it takes to correct, and which ones are safety issues you would want fixed regardless of any certificate.',
          'If you have not gone yet, we put the vehicle on the lift and check the same systems an inspector will: brakes, tires, steering and suspension, lights, glass and wipers, exhaust, and leaks. You get told what would fail before you spend the inspection fee finding out.',
          'Either way you decide what gets repaired. We do the work, and you take the vehicle back to the station that inspected it for reinspection.'
        ],
        warningSigns: [
          'You just bought a used car and need it titled in Maryland',
          'You have a failure sheet and do not know what half of it means',
          'Brake, tire or suspension wear you already suspect will fail',
          'A check-engine light on before an inspection',
          'Exhaust noise, a cracked windshield, or lights that are out',
          'A car that has sat unused for a long stretch'
        ],
        includes: [
          'A walk through the failure sheet in plain language',
          'Pre-inspection check of the systems an inspector examines',
          'Repair of the failed items — brakes, tires, steering, suspension, lights, glass, exhaust',
          'Diagnostics where the cause is not obvious from the symptom',
          'A clear account of what we found and what it takes to fix',
          'Honesty about anything we cannot correct here'
        ],
        whyNotIgnore: [
          'An inspection failure is not paperwork. The items on that sheet are the ones that stop a car, steer it and let other drivers see it, and they failed against a minimum standard rather than a strict one.',
          'Reinspection rules are set by the station and the state, and they generally allow a limited window and mileage before a full re-inspection is required. Ask the station that failed you what their window is, and get the repairs done inside it rather than paying for the whole inspection twice.',
          'If you have just bought the car, every day it sits unregistered is a day you cannot legally drive it. That tends to be the real cost.'
        ],
        related: ['brake-pad-rotor-replacement', 'shocks-struts-steering', 'check-engine-light-diagnostics']
      },
      {
        slug: 'engine-repair',
        navLabel: 'Engine Repair',
        title: 'Engine Repair',
        metaTitle: 'Engine Repair in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Knocking, misfiring, oil leaks or loss of power? YBE diagnoses and repairs engine problems in Capitol Heights, MD. Open seven days. Call (202) 455-3822.',
        customerVoice: 'My engine is making a noise it never made before.',
        problem: [
          'Engine problems rarely start dramatically. It is usually a tick that shows up on cold mornings, a spot on the driveway, a little less power going up a hill, or having to add oil more often than you used to.',
          'By the time an engine is loud enough that you cannot ignore it, the repair is usually bigger than it would have been a few months earlier. Getting it looked at while the symptom is still small is what keeps the bill down.'
        ],
        whatWeDo: [
          'We narrow it down before we open anything up. Where is the noise coming from, does it change with engine speed or with road speed, does it get better or worse as the engine warms up. Those answers separate a top-end noise from a bottom-end noise from something that is not the engine at all.',
          'Depending on the symptom we test compression and cylinder leak-down, check oil pressure, look for external and internal leaks, examine spark and fuel delivery on a misfiring cylinder, and inspect belts, mounts and accessories that can imitate an engine noise.',
          'Some engine problems are straightforward repairs: gaskets, seals, sensors, timing components, cooling-related damage. Others are serious enough that we will tell you honestly what the vehicle is worth putting into.'
        ],
        warningSigns: [
          'Knocking, ticking or tapping that changes with engine speed',
          'Blue, white or black smoke from the exhaust',
          'Losing oil without an obvious leak, or oil spots under the car',
          'Noticeable loss of power, especially under load',
          'Rough running or a cylinder that is clearly not firing',
          'Overheating that keeps coming back after a repair'
        ],
        includes: [
          'Diagnosis of the specific noise, leak or performance complaint',
          'Compression and leak-down testing where the symptom calls for it',
          'Oil-pressure and cooling-system checks',
          'Gasket, seal and timing-component repair',
          'Repair of misfire causes including ignition and fuel-delivery faults',
          'An honest assessment when a repair is not worth what the vehicle is worth'
        ],
        whyNotIgnore: [
          'Engines fail progressively. A leaking gasket lowers the oil level, low oil raises wear, and wear turns into the noise you are hearing now. Each stage costs more than the one before it.',
          'Overheating is the fastest version of this. An engine that has been driven hot even once can develop problems that were not there the day before, which is why we treat a repeating overheat as urgent rather than routine.'
        ],
        related: ['check-engine-light-diagnostics', 'cooling-system-overheating', 'tune-ups-maintenance']
      },
      {
        slug: 'tune-ups-maintenance',
        navLabel: 'Tune-Ups & Maintenance',
        title: 'Tune-Ups and Preventive Maintenance',
        metaTitle: 'Tune-Ups & Car Maintenance in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Tune-ups, filters, fluids and scheduled maintenance for daily drivers and high-mileage vehicles in Capitol Heights, MD. Open seven days. Call (202) 455-3822.',
        customerVoice: 'My car runs fine, but it is due for something.',
        problem: [
          'Maintenance is the one thing at a repair shop that is easy to put off, because nothing is wrong yet. The car starts, it drives, and the appointment can wait another month.',
          'The catch is that most of the expensive repairs we see started as maintenance somebody skipped. Worn plugs strain the ignition coils. Old fluid stops protecting what it was there to protect. A clogged filter makes the engine work harder for the same result.'
        ],
        whatWeDo: [
          'We look at what your specific vehicle needs based on its mileage, its age and how it is actually being driven. A car doing short city trips around Capitol Heights and DC wears differently than one running highway miles every day, and the service interval should reflect that.',
          'A tune-up on a modern vehicle is not what it was decades ago. It generally means spark plugs, ignition components, filters, and inspection of the systems that affect how the engine runs, rather than adjusting parts that no longer exist on current engines.',
          'We will also tell you what does not need doing yet. Selling maintenance you do not need is an easy way to lose a customer for good.'
        ],
        warningSigns: [
          'Slower starts or a slight hesitation on acceleration',
          'Fuel economy quietly getting worse over several months',
          'Rough idle at a stoplight',
          'You cannot remember the last time the plugs or filters were changed',
          'Maintenance-reminder light or message on the dash',
          'The vehicle is over 100,000 miles and has never had major service'
        ],
        includes: [
          'Spark plug and ignition-component replacement',
          'Engine and cabin air filter replacement',
          'Fluid level and condition checks',
          'Belt and hose inspection',
          'Battery and charging-system check',
          'Inspection of brakes, tires and suspension while the vehicle is up',
          'A prioritized list of what needs attention now versus later'
        ],
        whyNotIgnore: [
          'Maintenance is the cheapest work a shop does, and skipping it is what turns a car into a series of expensive surprises. Plugs cost a fraction of the coils they protect.',
          'For older and higher-mileage vehicles it matters even more. Those cars can run a long time, but only if the basics stay current.'
        ],
        related: ['oil-change', 'check-engine-light-diagnostics', 'battery-alternator-starter']
      },
      {
        slug: 'oil-change',
        navLabel: 'Oil Changes',
        title: 'Oil Changes and Fluid Service',
        metaTitle: 'Oil Change Service in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Oil and filter changes with a full under-vehicle inspection, seven days a week in Capitol Heights, MD. Call or text YBE at (202) 455-3822.',
        customerVoice: 'I am overdue for an oil change.',
        problem: [
          'Oil does more than lubricate. It carries heat away from the parts that are moving fastest and holds contaminants in suspension so they do not grind against bearings and cylinder walls. When it gets old, it stops doing both jobs well.',
          'Most drivers know they are due. What is easy to miss is that the interval on the sticker may not match how you actually drive, especially with a lot of short trips and stop-and-go traffic.'
        ],
        whatWeDo: [
          'We drain the old oil, replace the filter, and refill with the grade and specification your engine requires. Using the wrong viscosity is not a small detail on modern engines with tight tolerances and variable valve timing.',
          'Because the vehicle is already up and we are already underneath it, we use the time to look. Leaks, worn belts, cracked hoses, brake and tire condition, suspension play. Finding a leaking hose during an oil change is a much better outcome than finding it on the side of the road.',
          'You get told what we saw, including the things that are fine.'
        ],
        warningSigns: [
          'Oil-life indicator or maintenance light on',
          'Oil on the dipstick that is dark and thin',
          'The engine sounds louder or noisier than usual at startup',
          'You have added oil between changes',
          'It has been more than a year regardless of mileage',
          'Oil spots showing up where you park'
        ],
        includes: [
          'Drain, filter replacement and refill to manufacturer specification',
          'Correct oil grade for your engine',
          'Fluid top-off and level check',
          'Under-vehicle inspection for leaks and wear',
          'Tire, brake and belt visual check',
          'Notes on anything that needs attention soon'
        ],
        whyNotIgnore: [
          'Old oil turns into sludge, and sludge blocks the narrow passages that feed oil to the top of the engine. That is how a routine service becomes an engine repair.',
          'Running low is worse than running old. If you are adding oil regularly, something is leaking or burning it, and that is worth finding now.'
        ],
        related: ['tune-ups-maintenance', 'engine-repair', 'cooling-system-overheating']
      },
      {
        slug: 'cooling-system-overheating',
        navLabel: 'Overheating & Cooling',
        title: 'Cooling System and Overheating Repair',
        metaTitle: 'Car Overheating Repair in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Car overheating or losing coolant? YBE finds and repairs radiator, water pump, thermostat and hose failures in Capitol Heights, MD. Call (202) 455-3822.',
        customerVoice: 'My car is overheating.',
        problem: [
          'The temperature gauge climbs where it normally does not, or a warning appears telling you the engine is hot. Sometimes there is steam, a sweet smell, or a puddle of green, orange or pink fluid under the car.',
          'Overheating is one of the few car problems where continuing to drive can turn a moderate repair into an engine replacement in a matter of minutes. If the gauge is in the red, the right move is to stop, shut it off, and call.'
        ],
        whatWeDo: [
          'We pressure-test the system to find where it is losing coolant, because most overheating starts as a leak. Radiators, hoses, water pumps, thermostat housings and heater cores all fail in ways that look similar from the driver seat.',
          'We also check the parts that move heat rather than hold coolant: thermostat operation, cooling-fan operation, and whether the radiator is actually passing air and fluid the way it should. A fan that stopped working only shows up as overheating in traffic, not on the highway.',
          'And we check for the serious version. If exhaust gases are getting into the cooling system, that points at a head gasket, and you want to know that before spending money on a radiator.'
        ],
        warningSigns: [
          'Temperature gauge reading higher than normal, or in the red',
          'Steam or a sweet syrupy smell from under the hood',
          'Colored fluid puddles where you park',
          'Heater blowing cold when the engine is warm',
          'Having to add coolant repeatedly',
          'Overheating in traffic but not at highway speed'
        ],
        includes: [
          'Cooling-system pressure test to locate leaks',
          'Radiator, hose, water pump and thermostat inspection',
          'Cooling-fan and fan-clutch operation check',
          'Coolant condition check and correct-type refill',
          'Combustion-gas test when a head gasket is suspected',
          'Repair or replacement of the failed component and verification under load'
        ],
        whyNotIgnore: [
          'Heat is what destroys engines. Aluminum heads warp, gaskets fail, and the damage from one bad overheat can be permanent and expensive.',
          'A cooling leak also tends to fail suddenly rather than gradually. A hose that has been seeping for weeks can split all at once, and it usually does it in traffic rather than in your driveway.'
        ],
        related: ['engine-repair', 'auto-ac-heating', 'check-engine-light-diagnostics']
      }
    ]
  },

  // =====================================================================
  {
    slug: 'brake-repair',
    navLabel: 'Brake Services',
    title: 'Brake Services',
    icon: 'disc',
    metaTitle: 'Brake Repair in Capitol Heights, MD | YBE Auto',
    metaDescription:
      'Brake pads, rotors, calipers, fluid and warning lights repaired at our Capitol Heights shop. Open seven days a week. Call or text (202) 455-3822.',
    blurb:
      'Brake pads, rotors, calipers, brake fluid, warning lights, grinding, squeaking, and vibration.',
    intro: [
      'Brakes are the one system on your car where waiting is never the cheaper option. Pads are a routine, predictable expense. Pads that were driven down to metal are a rotor job, and sometimes a caliper job on top of it.',
      'The good news is that brakes almost always warn you first, and the warnings are easy to recognize once you know what they mean. A squeal is usually the wear indicator doing its job. A grind means the friction material is gone. A pulse in the pedal points at the rotors. A pull to one side points at a caliper or a hose.',
      'We inspect all four corners, measure what is left, and tell you what actually needs replacing.'
    ],
    covers: [
      'Brake inspections',
      'Brake pads and rotors',
      'Calipers and hardware',
      'Brake fluid service',
      'Brake warning lights',
      'Brake noise, vibration and pulling'
    ],
    services: [
      {
        slug: 'brake-pad-rotor-replacement',
        navLabel: 'Pads & Rotors',
        title: 'Brake Pad and Rotor Replacement',
        metaTitle: 'Brake Pads & Rotors in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Worn brake pads or scored rotors? YBE measures all four corners and replaces only what needs it. Capitol Heights, MD. Open seven days. Call (202) 455-3822.',
        customerVoice: 'I think I need brakes.',
        problem: [
          'Brake pads wear down every time you use them, and in stop-and-go driving around Capitol Heights and DC they wear faster than the mileage on the odometer suggests.',
          'The question is almost never "do I need pads." It is whether the rotors can be reused, and whether the hardware and caliper slides are still moving freely. Those answers change the job, and they are the reason we measure instead of quoting over the phone.'
        ],
        whatWeDo: [
          'We pull the wheels and measure remaining pad thickness at each corner, along with rotor thickness and runout. Rotors have a minimum safe thickness stamped on them, and a rotor below that spec cannot shed heat properly no matter how new the pads are.',
          'We also check the parts that make brakes wear evenly: caliper slide pins, mounting hardware, and whether the piston is retracting. A seized slide pin is why one pad wears out while the one across from it looks new.',
          'When we put it back together, the hardware gets replaced and lubricated, and we bed the brakes in so they stop the way they should from the first drive.'
        ],
        warningSigns: [
          'A high-pitched squeal when you brake, or sometimes when you do not',
          'Grinding or a metal-on-metal scrape',
          'Brake pedal travelling farther than it used to',
          'The car pulling to one side when you brake',
          'Visible deep grooving on the rotor face',
          'Brake dust heavier on one wheel than the others'
        ],
        includes: [
          'Four-corner inspection with pad and rotor measurement',
          'Pad replacement with correct-fit hardware',
          'Rotor replacement or resurfacing based on measured thickness',
          'Caliper slide and piston operation check',
          'Cleaning and lubrication of contact points',
          'Road test and brake bed-in before the vehicle goes back to you'
        ],
        whyNotIgnore: [
          'Once the friction material is gone, the metal backing plate cuts into the rotor. That takes a pad-and-rotor job and adds rotors you did not need to buy, and sometimes a caliper damaged by the heat.',
          'The safety side is simpler. Worn brakes lengthen your stopping distance exactly when you need it shortest, and they fade faster under repeated hard stops.'
        ],
        related: ['brake-noise-vibration', 'brake-fluid-calipers', 'wheel-alignment']
      },
      {
        slug: 'brake-noise-vibration',
        navLabel: 'Brake Noise & Shaking',
        title: 'Brake Noise, Vibration and Pulling',
        metaTitle: 'Brake Noise & Vibration in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Squeaking, grinding or a steering wheel that shakes when you brake? YBE diagnoses the cause in Capitol Heights, MD. Open seven days. Call (202) 455-3822.',
        customerVoice: 'My brakes are grinding and the wheel shakes when I stop.',
        problem: [
          'Brake symptoms are specific, and each one points somewhere different. That is useful, because it means the noise your car is making is already telling us most of the story.',
          'A squeal is usually the wear indicator. A grind is usually metal on metal. A shudder through the steering wheel when you brake from speed is usually rotor thickness variation. A pull to one side is usually a caliper or a collapsed brake hose, not the pads.'
        ],
        whatWeDo: [
          'We road test the vehicle first when it is safe to do so, because the conditions that produce the symptom matter. Shaking only at highway speed points somewhere different than shaking on every stop.',
          'Then we inspect all four corners: pad and rotor condition, rotor runout and thickness variation, caliper and slide-pin movement, brake hose condition, and wheel bearing play. Some of what gets blamed on brakes turns out to be a bearing or a suspension component.',
          'We tell you which part is producing the symptom, rather than replacing brakes and hoping the noise goes away.'
        ],
        warningSigns: [
          'Steering wheel shaking or pulsing when braking from speed',
          'Pedal pulsing under your foot during a normal stop',
          'Grinding or scraping that gets louder as you slow down',
          'Squealing that stops when you press the pedal harder',
          'The car steering itself to one side under braking',
          'A burning smell after a long downhill or heavy traffic'
        ],
        includes: [
          'Road test to reproduce the exact symptom where safe',
          'Rotor runout and thickness-variation measurement',
          'Caliper, slide-pin and brake-hose inspection',
          'Wheel-bearing and suspension play check',
          'Identification of the specific component causing the noise or vibration',
          'Repair of the confirmed cause and verification on a second road test'
        ],
        whyNotIgnore: [
          'A pull under braking is a stability problem, not just a comfort one. A caliper that grabs on one side changes how the car behaves in exactly the situation where you need it predictable.',
          'Grinding is already past the warning stage. At that point every stop is doing damage to parts that were fine a few weeks ago.'
        ],
        related: ['brake-pad-rotor-replacement', 'wheel-alignment', 'shocks-struts-steering']
      },
      {
        slug: 'brake-fluid-calipers',
        navLabel: 'Fluid & Calipers',
        title: 'Brake Fluid Service, Calipers and Brake Warning Lights',
        metaTitle: 'Brake Fluid & Calipers in Capitol Heights, MD | YBE Auto',
        metaDescription:
          'Soft pedal, brake warning light or a sticking caliper? YBE services brake fluid, calipers and hydraulics in Capitol Heights, MD. Call (202) 455-3822.',
        customerVoice: 'My brake light is on and the pedal feels soft.',
        problem: [
          'Everything between your foot and the brake pads is hydraulic, and hydraulics fail differently than pads do. Instead of noise, you get feel: a pedal that sinks, a pedal that goes soft when the brakes are hot, or a pedal that feels fine but the car still pulls.',
          'A brake warning light can mean low fluid, a pressure difference between circuits, or simply the parking brake. It is worth knowing which, because two of those are urgent.'
        ],
        whatWeDo: [
          'We check fluid level and condition first. Brake fluid absorbs moisture over time, and moisture lowers its boiling point, which is what produces a pedal that feels fine cold and soft after heavy braking.',
          'Then we look for where fluid is going if the level is low: caliper piston seals, wheel cylinders, hard lines, flexible hoses and the master cylinder. Low fluid with no visible leak usually just means the pads are worn and the pistons have extended, which is a different conversation.',
          'For calipers, we check that the piston retracts and the slides move. A caliper that stays partly applied cooks the pad, warps the rotor and drags fuel economy down.'
        ],
        warningSigns: [
          'Brake pedal that slowly sinks toward the floor while you hold it',
          'Pedal that feels soft or spongy, especially when hot',
          'Brake warning light on the dash',
          'Fluid level dropping without an obvious puddle',
          'One wheel noticeably hotter than the others after driving',
          'A burning smell and reduced fuel economy'
        ],
        includes: [
          'Brake fluid level and moisture-content check',
          'Full hydraulic inspection: lines, hoses, calipers, wheel cylinders, master cylinder',
          'Brake fluid flush and bleed with the correct specification fluid',
          'Caliper piston and slide operation testing',
          'Diagnosis of the brake warning light',
          'Pedal-feel verification and road test'
        ],
        whyNotIgnore: [
          'Hydraulic brake faults are the ones that fail without much warning. A hose that has been weeping can rupture, and a pedal that has been slowly sinking can reach the floor.',
          'A dragging caliper is also quietly expensive. It destroys a new set of pads and rotors in a fraction of their normal life.'
        ],
        related: ['brake-pad-rotor-replacement', 'brake-noise-vibration', 'check-engine-light-diagnostics']
      }
    ]
  }
];

// Remaining category hubs live in their own modules to keep this file readable.
categories.push(
  require('./service-categories/transmission.js'),
  require('./service-categories/electrical.js'),
  require('./service-categories/tires-alignment-suspension.js'),
  require('./service-categories/auto-ac-heating.js'),
  require('./service-categories/auto-body-glass.js')
);

/**
 * Assign urls onto the service objects themselves (not copies) so templates that
 * walk `cat.services` get the same objects the lookup table returns.
 */
categories.forEach((cat) => {
  cat.services.forEach((svc) => {
    svc.category = cat;
    svc.url = `/services/${cat.slug}/${svc.slug}/`;
  });
});

/** Flat list of every individual service. */
const allServices = categories.flatMap((cat) => cat.services);

/** Look up any service page by slug, used for related-service links. */
const serviceBySlug = Object.fromEntries(allServices.map((s) => [s.slug, s]));

categories.forEach((cat) => {
  cat.url = `/services/${cat.slug}/`;
});

module.exports = { categories, allServices, serviceBySlug };
