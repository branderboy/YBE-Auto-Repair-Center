/**
 * FAQ PAGES (Topical Relevance)
 *
 * One page per key question in the owner's meta set (research/meta/
 * meta-output.csv, page type "faq"). Each question comes from a search that
 * already shows the site in Search Console with no clicks. Title, description
 * and H1 come from the generated meta; this file holds the answer.
 *
 * The generated description promises "cost factors, time, and process", so
 * every page answers those three. Rules:
 *  - No YBE price is published. A dollar range appears only where a price
 *    guide on this site already carries a sourced one.
 *  - Times are typical shop ranges, stated as typical; YBE confirms the time
 *    when it quotes.
 */

const faqPages = [
  {
    slug: 'alternator-repair-washington-dc',
    shortAnswer:
      'Published figures put alternator replacement at $747 to $1,088 for most cars, and the part is most of that. DC drivers who come to YBE in Capitol Heights, just over the line, get the charging system tested first and a price before any work starts.',
    costFactors: [
      'The alternator itself, which is most of the bill',
      'New or remanufactured part',
      'How deep in the engine bay the alternator sits',
      'Whether the battery was damaged by running flat and needs replacing too',
      'Whether the belt or tensioner is worn and should be done at the same time'
    ],
    time: [
      'Testing the battery and charging system takes minutes. Replacing an alternator that is easy to reach is typically a one to two hour job; one buried under other parts can take most of a day. YBE tells you which yours is when it quotes.'
    ],
    process: [
      'We test the battery, the alternator output and the belt before replacing anything, because a weak battery or a loose belt can look exactly like a failed alternator.',
      'If the alternator is the problem, we quote the part and labor, replace it, and retest the charging system so you leave with the fault actually fixed. The shop is at 8632 Edgeworth Dr, a short run east of Southern Avenue.'
    ],
    relatedService: 'battery-alternator-starter',
    relatedArticles: ['alternator-replacement-cost', 'what-affects-battery-alternator-cost', 'car-battery-replacement-cost']
  },
  {
    slug: 'tune-up-washington-dc',
    shortAnswer:
      'A tune-up costs what the car needs, which is why the price varies so much: plugs on one engine are a quick job, on another they sit under the intake. YBE checks the car first and quotes before work starts, at the Capitol Heights shop just over the DC line.',
    costFactors: [
      'Spark plug type and how hard the plugs are to reach',
      'Whether ignition coils or wires need replacing',
      'Air and cabin filters',
      'Fluids that are due',
      'Anything the inspection turns up that should not wait'
    ],
    time: [
      'A basic tune-up on an engine with easy plug access is typically one to two hours. Engines that need the intake removed to reach the rear plugs take longer. YBE gives you the time with the quote.'
    ],
    process: [
      'We start with what the car is doing, rough idle, poor mileage or hesitation, and check the plugs, ignition, filters and fluids against the maintenance schedule.',
      'You get a list of what is due now and what can wait, with prices, before anything is replaced.'
    ],
    relatedService: 'tune-ups-maintenance',
    relatedArticles: ['what-is-included-in-a-tune-up', 'preventive-maintenance-older-vehicles']
  },
  {
    slug: 'brake-fluid-flush-washington-dc',
    shortAnswer:
      'A brake fluid flush is one of the smaller brake jobs; the price depends on the fluid your car takes and whether the system needs bleeding for air or a sticking caliper. YBE checks the fluid and the brakes first and quotes before work starts, at the Capitol Heights shop near the DC line.',
    costFactors: [
      'Fluid type: most cars use DOT 3 or DOT 4, some need a specific fluid',
      'Whether air in the lines needs a full bleed',
      'ABS systems that need a scan tool to cycle the pump during the bleed',
      'Calipers or hoses found sticking or leaking during the check'
    ],
    time: [
      'A flush on its own typically takes under an hour. If the check finds a sticking caliper or a leaking hose, that repair is quoted separately before it is done.'
    ],
    process: [
      'Brake fluid absorbs water over time, which lowers its boiling point and corrodes parts from the inside. We test the fluid, inspect the calipers and hoses, then replace the old fluid with new and bleed the system.',
      'If you have a soft pedal or a brake warning light, tell us when you call. Those point to more than old fluid.'
    ],
    relatedService: 'brake-fluid-calipers',
    relatedArticles: ['what-affects-brake-repair-cost', 'brake-pad-replacement-cost']
  },
  {
    slug: 'car-paint-scratch-repair',
    shortAnswer:
      'Scratch repair cost depends on how deep the scratch goes. A scratch in the clear coat can often be polished out; one through the paint to primer or metal needs the panel refinished and blended. YBE looks at the damage and quotes before work starts.',
    costFactors: [
      'Depth: clear coat only, through the paint, or down to metal',
      'Size of the area and how many panels it crosses',
      'Paint type: metallic, pearl and three-stage paints cost more to match',
      'Blending into neighboring panels so the repair does not show',
      'Rust that has started where the metal is exposed'
    ],
    time: [
      'Polishing out a light scratch can be done the same day. Refinishing a panel takes longer because each coat has to cure, so plan on the car staying at least a day or two. YBE gives you the time with the quote.'
    ],
    process: [
      'Run a fingernail across the scratch. If it does not catch, it is usually in the clear coat and may polish out. If it catches, the paint is broken and the panel needs refinishing.',
      'For a refinish we prep the area, match the color to your car as it looks now rather than to the factory code, and blend into the panels beside it.'
    ],
    relatedService: 'dent-scratch-paint',
    relatedArticles: ['what-affects-body-repair-cost']
  },
  {
    slug: 'oil-change-near-me',
    shortAnswer:
      'Oil change price comes down to the oil your engine takes and how much it holds: conventional oil costs less than synthetic, and some engines need a specific oil spec. YBE tells you the price for your car when you call or walk in, seven days a week at 8632 Edgeworth Dr.',
    costFactors: [
      'Conventional, synthetic blend or full synthetic oil',
      'How many quarts the engine holds',
      'The oil filter your engine takes',
      'Engines that require a specific manufacturer oil spec'
    ],
    time: [
      'An oil and filter change is typically done in under an hour. Walk-ins are welcome; calling ahead helps on weekends.'
    ],
    process: [
      'We drain the old oil, replace the filter, refill with the oil your engine calls for, and reset the maintenance reminder.',
      'While the car is up, we look underneath for leaks, worn parts and anything else worth knowing about, and tell you what we see.'
    ],
    relatedService: 'oil-change',
    relatedArticles: ['how-often-should-you-change-your-oil', 'what-affects-oil-change-cost']
  },
  {
    slug: 'auto-ac-repair-near-me',
    shortAnswer:
      'Auto AC repair cost depends on what failed. A leak at a seal or hose is a much smaller job than a compressor. YBE finds the actual fault, not just adds refrigerant, and quotes before work starts at the Capitol Heights shop.',
    costFactors: [
      'Where the leak is: a seal or hose versus the condenser or evaporator',
      'Whether the compressor or its clutch has failed',
      'Refrigerant type: newer cars use R-1234yf, which costs more than R-134a',
      'Electrical faults in the fan, pressure switch or controls',
      'How much of the dash has to come apart to reach the part'
    ],
    time: [
      'Diagnosis and a leak check typically take an hour or two. Most repairs follow within a day; an evaporator behind the dash can take longer. YBE gives you the time with the quote.'
    ],
    process: [
      'We check pressures, look for the leak with dye or a detector, and test the compressor, fan and controls. Recharging without finding the leak means paying again when it leaks out.',
      'Once the fault is fixed, the system is evacuated and recharged to the correct amount and checked for cold air at the vents.'
    ],
    relatedService: 'ac-repair',
    relatedArticles: ['why-is-my-car-ac-blowing-warm', 'what-affects-ac-repair-cost']
  },
  {
    slug: 'transmission-replacement-capitol-heights',
    shortAnswer:
      'Transmission replacement is one of the largest repairs a car gets, and the price depends on the transmission type and whether a used, remanufactured or rebuilt unit goes in. YBE diagnoses first, then gives you a straight answer on cost against what the car is worth.',
    costFactors: [
      'Automatic, manual or CVT, and the specific model',
      'Used, remanufactured or rebuilt unit',
      'All-wheel drive and four-wheel drive layouts',
      'Coolers, lines and mounts that should be replaced at the same time',
      'Programming the transmission computer after installation'
    ],
    time: [
      'Diagnosis comes first and is usually same day. A replacement typically keeps the car for one to three days, depending on parts availability. YBE gives you the time with the quote.'
    ],
    process: [
      'Not every slipping or late-shifting transmission needs replacing. We check fluid, codes and line pressure first, because a sensor, solenoid or fluid problem is a far smaller repair.',
      'If replacement is the right call, we tell you what it costs and whether that makes sense for the car before any work starts.'
    ],
    relatedService: 'transmission-replacement-rebuild',
    relatedArticles: ['transmission-repair-rebuild-or-replace', 'what-affects-transmission-repair-cost', 'signs-of-a-failing-transmission']
  },
  {
    slug: 'engine-repair-capitol-heights',
    shortAnswer:
      'Engine repair cost ranges from a gasket or sensor to a replacement engine, so the diagnosis decides the price. YBE finds the cause first and quotes before work starts, and tells you plainly when a repair costs more than the car is worth.',
    costFactors: [
      'What failed: a sensor, gasket or seal versus internal damage',
      'How much has to come apart to reach it',
      'Parts for your specific engine',
      'Damage from driving it after the warning signs started',
      'Whether a replacement engine is the better choice'
    ],
    time: [
      'Diagnosis is usually same day. Small repairs often finish the same day or the next; head gaskets and internal work take several days. YBE gives you the time with the quote.'
    ],
    process: [
      'We start with what you are noticing, knocking, misfiring, smoke, oil loss or lost power, and test from there: codes, compression, leak-down and a visual check.',
      'You get the cause, the repair, the price and the alternatives before anything is taken apart further.'
    ],
    relatedService: 'engine-repair',
    relatedArticles: ['why-is-my-check-engine-light-on', 'why-is-my-car-overheating', 'what-affects-diagnostic-cost']
  }
];

faqPages.forEach((p) => {
  p.url = `/faq/${p.slug}/`;
  p.isFaqPage = true;
});

module.exports = { faqPages };
