/**
 * QUESTION POSTS (Topical Relevance), batch 1, 2026-11-13.
 *
 * Source: "The Steal Batch" in ybe-auto-dynamic-meta-md-2026-11-13.md, the
 * question topics Old Ox Tire ranks on, matched to YBE services. YBE's words
 * and facts only; no prices. Each post feeds one service page.
 *
 * Five topics in the batch already have a page here and are not duplicated
 * (squeal when braking, failing transmission, check engine light, oil change
 * interval, overheating). `keyQuestion` is the page's key question in
 * src/data/page-records.js and becomes its title and H1.
 */

const posts = [
  // ------------------------------------------------------------ ELECTRICAL
  {
    slug: 'how-long-can-you-drive-with-a-bad-alternator',
    cluster: 'diagnostics',
    title: 'How long can you drive with a bad alternator?',
    keyQuestion: 'How long can you drive with a bad alternator in your car?',
    shortAnswer:
      'Usually not far. Once the alternator stops charging, the car runs on the battery alone, and a healthy battery typically gives you somewhere between a few minutes and an hour depending on what is switched on. Head straight for a shop or a safe place to stop.',
    sections: [
      { h2: 'What happens when the alternator quits', paras: [
        'The alternator keeps the battery charged and powers the electrical system while the engine runs. When it fails, the battery takes over everything: ignition, fuel pump, lights, fans and the radio. It was never meant to do that for long.',
        'As the voltage drops, things fail in order. Gauges flicker, lights dim, power windows slow, and finally the engine stalls because the ignition and fuel system no longer have enough power.'
      ] },
      { h2: 'How to stretch the distance', paras: [
        'Turn off everything you can: radio, heat or air, seat heaters, and the headlights if it is daylight and safe. Do not shut the engine off until you have arrived, because it may not restart.'
      ], list: ['A battery warning light on the dash', 'Lights that dim at idle and brighten when you rev', 'A whining or grinding noise from the front of the engine', 'Electrical accessories acting strangely'] }
    ],
    relatedService: 'battery-alternator-starter',
    relatedArticles: ['alternator-replacement-cost', 'battery-or-alternator-how-to-tell']
  },
  {
    slug: 'battery-or-alternator-how-to-tell',
    cluster: 'diagnostics',
    title: 'Battery or alternator? How to tell what is wrong with your car',
    keyQuestion: 'Is it my battery or my alternator, and how can I tell?',
    shortAnswer:
      'Jump-start the car and watch what happens. If it starts and keeps running, the battery is the likely problem. If it starts and dies again soon after the cables come off, the alternator is not charging. A charging-system test settles it in minutes.',
    sections: [
      { h2: 'Signs that point to the battery', paras: [
        'A battery problem shows up at startup: slow cranking, a click, or nothing at all, especially on a cold morning. Once the car is running, everything works normally.'
      ], list: ['Slow cranking that gets worse each morning', 'The car starts fine after a jump and keeps running', 'Corrosion on the terminals or a swollen case', 'A battery more than three to five years old'] },
      { h2: 'Signs that point to the alternator', paras: [
        'An alternator problem shows up while you drive: a battery light, dimming lights, and electrical trouble that gets worse the longer you go. A new battery will not fix it and will be drained too.'
      ], list: ['Battery warning light while driving', 'Headlights dim at idle and brighten with revs', 'The car dies again soon after a jump', 'A whining noise from the front of the engine'] },
      { h2: 'Why testing beats guessing', paras: [
        'Weak batteries and failing alternators wear each other out, so sometimes both need attention. YBE tests the battery and the charging output before replacing anything, at the shop or where your car sits.'
      ] }
    ],
    relatedService: 'battery-alternator-starter',
    relatedArticles: ['how-long-can-you-drive-with-a-bad-alternator', 'signs-your-car-battery-needs-replacing', 'jump-start-vs-battery-replacement']
  },
  {
    slug: 'symptoms-of-a-bad-starter',
    cluster: 'diagnostics',
    title: 'Common symptoms of a bad starter',
    keyQuestion: 'What are the common symptoms of a bad car starter motor?',
    shortAnswer:
      'The classic sign is a single loud click when you turn the key while the dash lights stay bright. Grinding, whirring without the engine turning, and a car that starts only some of the time are the other common signs.',
    sections: [
      { h2: 'What a failing starter sounds like', paras: [
        'The starter is an electric motor that spins the engine to get it going. When it fails, it usually tells you first.'
      ], list: ['One loud click and nothing else, with bright dash lights', 'Grinding when you turn the key', 'Whirring or spinning without the engine turning over', 'Starts sometimes, not others', 'Smoke or a burning smell after repeated tries'] },
      { h2: 'Rule out the battery first', paras: [
        'A weak battery or a loose, corroded cable can sound exactly like a bad starter. Rapid clicking usually points to the battery; a single solid click with strong lights points more toward the starter.',
        'YBE tests the battery, the cables and the starter circuit before recommending a starter, so you do not replace a part that was fine.'
      ] }
    ],
    relatedService: 'battery-alternator-starter',
    relatedArticles: ['starter-replacement-cost', 'why-wont-my-car-start', 'battery-or-alternator-how-to-tell']
  },
  {
    slug: 'signs-your-car-battery-needs-replacing',
    cluster: 'diagnostics',
    title: 'Signs that your car battery needs to be replaced',
    keyQuestion: 'What are the signs that my car battery needs to be replaced?',
    shortAnswer:
      'Slow cranking, needing jump starts, a battery warning light, dim lights at startup and a battery older than three to five years are the main signs. A load test tells you for sure before it leaves you stuck.',
    sections: [
      { h2: 'The signs, from mild to urgent', paras: ['Batteries rarely die without warning. They usually give you a few of these first.'],
        list: ['The engine cranks slower than it used to', 'You have needed a jump start recently', 'Dash and headlights look dim when starting', 'A battery or check-charging light comes on', 'White or green corrosion on the terminals', 'A swollen or cracked battery case', 'A rotten-egg smell near the battery', 'The battery is more than three to five years old'] },
      { h2: 'Test before you replace', paras: [
        'A battery that seems weak can be a charging problem, a bad cable or a drain that kills it overnight. YBE load-tests the battery and checks the charging system, and can replace the battery where your car sits if it has failed.'
      ] }
    ],
    relatedService: 'mobile-battery-replacement',
    relatedArticles: ['car-battery-replacement-cost', 'battery-or-alternator-how-to-tell', 'jump-start-vs-battery-replacement']
  },
  {
    slug: 'car-wont-start-battery-terminals',
    cluster: 'diagnostics',
    title: "Car won't start? Check your battery terminals",
    keyQuestion: "Can dirty battery terminals stop my car from starting?",
    shortAnswer:
      'Yes. Corrosion or a loose clamp can block the current the starter needs, and the car acts exactly like it has a dead battery. Cleaning and tightening the terminals is often the whole fix.',
    sections: [
      { h2: 'What to look for', paras: [
        'Open the hood and look at where the cables clamp onto the battery posts. White, blue or green crust, a clamp you can twist by hand, or a frayed cable end are all enough to stop a car from starting.'
      ] },
      { h2: 'Cleaning them safely', paras: [
        'Disconnect the negative cable first and the positive second. Scrub the posts and clamps with a baking soda and water mix and a wire brush, rinse, dry, then reconnect positive first and negative last, tightened so they do not move.',
        'Wear gloves and eye protection; battery corrosion is acidic. If the corrosion comes back quickly, the battery may be leaking or overcharging, and that needs a test.'
      ] }
    ],
    relatedService: 'no-start-diagnostics',
    relatedArticles: ['why-wont-my-car-start', 'signs-your-car-battery-needs-replacing']
  },
  {
    slug: 'car-wont-start-in-the-cold',
    cluster: 'roadside',
    title: "What to do if your car won't start in the cold",
    keyQuestion: "What should I do if my car won't start in cold weather?",
    shortAnswer:
      'Turn off every accessory, try starting for no more than a few seconds at a time with a short rest in between, and if it only clicks or cranks slowly, the battery is the likely cause. A jump start usually gets you going; a battery test tells you if it will happen again.',
    sections: [
      { h2: 'Why cold weather stops cars', paras: [
        'Cold slows the chemical reaction inside the battery, so it delivers less power at the moment the thickened oil makes the engine harder to turn over. A battery that was borderline in the fall often fails on the first hard freeze.'
      ] },
      { h2: 'What to try', paras: ['Work through these before calling for help.'],
        list: ['Turn off lights, heat, radio and chargers', 'Crank for a few seconds at a time, then rest a minute', 'Check the battery terminals for corrosion or a loose clamp', 'If it clicks or cranks slowly, call for a jump start', 'If it cranks normally but will not catch, the problem is fuel or spark, not the battery'] },
      { h2: 'Stop it happening again', paras: [
        'Have the battery tested before winter. YBE does jump starts and mobile battery replacement around Capitol Heights, and tests the battery and charging system on the spot.'
      ] }
    ],
    relatedService: 'jump-start',
    relatedArticles: ['jump-start-cost', 'signs-your-car-battery-needs-replacing', 'why-wont-my-car-start']
  },

  // ------------------------------------------------------------ BRAKES
  {
    slug: 'when-to-replace-brake-rotors',
    cluster: 'brakes',
    title: 'When is it time to replace your brake rotors?',
    keyQuestion: 'When is it time to replace the brake rotors on my car?',
    shortAnswer:
      'Replace rotors when they are worn below the minimum thickness stamped on them, when they are deeply grooved or cracked, or when they are warped enough to make the pedal or steering wheel shake. Pads worn down to metal almost always take the rotors with them.',
    sections: [
      { h2: 'Signs your rotors are done', paras: ['Rotors wear more slowly than pads, but they do wear out.'],
        list: ['A pulsing brake pedal or a shaking steering wheel when you stop', 'Deep grooves or a lip around the rotor edge', 'Grinding from pads worn to the backing plate', 'Blue or dark heat spots on the rotor face', 'Cracks, which mean replace immediately'] },
      { h2: 'Measured, not guessed', paras: [
        'Every rotor has a minimum safe thickness. Below it, the rotor cannot shed heat properly no matter how new the pads are. YBE measures the rotors at each wheel and replaces only what needs it.'
      ] }
    ],
    relatedService: 'brake-pad-rotor-replacement',
    relatedArticles: ['brake-pads-vs-rotors', 'signs-brake-pads-need-replacement', 'why-do-brakes-squeak-or-grind']
  },
  {
    slug: 'brake-pads-vs-rotors',
    cluster: 'brakes',
    title: 'Brake pads vs brake rotors: what is the difference?',
    keyQuestion: 'What is the difference between brake pads and brake rotors?',
    shortAnswer:
      'The rotor is the metal disc that turns with the wheel; the pads are the friction blocks the caliper squeezes against it. Pads wear out first and are replaced more often. Rotors last longer but need replacing when they are too thin, warped or scored.',
    sections: [
      { h2: 'How they work together', paras: [
        'When you press the pedal, the caliper squeezes the pads against the spinning rotor, and friction slows the wheel. The pads are designed to wear; the rotor is designed to absorb heat and wear slowly.'
      ] },
      { h2: 'Pads only, or pads and rotors?', paras: [
        'Pads caught early can usually be replaced on their own. Once pads wear to metal, they score the rotors, and then both need replacing.'
      ], list: ['Squeal from the wear indicator: usually pads only', 'Grinding: pads gone, rotors likely damaged', 'Pedal pulsing: rotors warped or uneven', 'Rotors below minimum thickness: replace them'] }
    ],
    relatedService: 'brake-pad-rotor-replacement',
    relatedArticles: ['when-to-replace-brake-rotors', 'brake-pad-replacement-cost', 'signs-brake-pads-need-replacement']
  },

  // ------------------------------------------------------------ DIAGNOSTICS
  {
    slug: 'what-does-a-car-diagnostic-test-tell-you',
    cluster: 'diagnostics',
    title: 'What does a car diagnostic test actually tell you?',
    keyQuestion: 'What does a car diagnostic test actually tell a mechanic?',
    shortAnswer:
      'The scan reads trouble codes and live data from the car’s computers, which tells a mechanic which system has a fault and what the engine was doing when it happened. It points to where to look, not which part to replace. The testing after the scan finds the actual cause.',
    sections: [
      { h2: 'What the scan shows', paras: ['A good scan tool reads far more than the code.'],
        list: ['Stored and pending trouble codes', 'Freeze-frame data from the moment the fault happened', 'Live readings from sensors while the engine runs', 'Codes from other modules: transmission, ABS, airbags, body'] },
      { h2: 'What it does not show', paras: [
        'A code names a circuit or a condition, not a broken part. An oxygen sensor code can be the sensor, a wiring fault, a vacuum leak or an exhaust leak. That is why YBE confirms the cause with hands-on testing before quoting a repair.'
      ] }
    ],
    relatedService: 'check-engine-light-diagnostics',
    relatedArticles: ['why-is-my-check-engine-light-on', 'what-affects-diagnostic-cost', 'ignoring-a-dashboard-warning-light']
  },
  {
    slug: 'ignoring-a-dashboard-warning-light',
    cluster: 'diagnostics',
    title: 'What happens if I ignore a dashboard warning light?',
    keyQuestion: 'What happens if I ignore a warning light on my dashboard?',
    shortAnswer:
      'It depends on the light. Red lights, such as oil pressure, temperature and brake, mean stop as soon as it is safe. Amber lights, such as check engine or tire pressure, mean get it checked soon. Ignoring either kind usually turns a small repair into a bigger one.',
    sections: [
      { h2: 'Red means stop', paras: ['These can mean damage within minutes.'],
        list: ['Oil pressure: engine damage if you keep driving', 'Temperature: overheating can warp the engine', 'Brake warning: low fluid or a hydraulic problem', 'Battery or charging: the car may stall soon'] },
      { h2: 'Amber means soon', paras: [
        'Check engine, tire pressure, ABS and traction lights mean a fault is stored. The car may drive normally, but with the check engine light already on, a second fault will not turn on a new warning. A flashing check engine light is the exception: it means a severe misfire, so stop driving.'
      ] }
    ],
    relatedService: 'check-engine-light-diagnostics',
    relatedArticles: ['why-is-my-check-engine-light-on', 'what-does-a-car-diagnostic-test-tell-you', 'why-is-my-car-overheating']
  },
  {
    slug: 'signs-your-car-needs-a-tune-up',
    cluster: 'maintenance',
    title: 'Top signs your car needs a tune-up',
    keyQuestion: 'What are the top signs that my car needs a tune-up?',
    shortAnswer:
      'Rough idle, hesitation when you accelerate, worse gas mileage, hard starting and a check engine light for misfires are the common signs. Most often the cause is worn spark plugs, ignition coils or clogged filters.',
    sections: [
      { h2: 'The signs', paras: ['A tune-up today means replacing the parts that wear in the ignition and air systems.'],
        list: ['Rough or shaky idle', 'Hesitation or stumbling when you accelerate', 'Gas mileage dropping', 'Harder starting', 'Check engine light for misfires', 'It has been a long time since the plugs were changed'] },
      { h2: 'What YBE checks', paras: [
        'YBE checks plugs, coils, filters and fluids against the maintenance schedule and tells you what is due now and what can wait before anything is replaced.'
      ] }
    ],
    relatedService: 'tune-ups-maintenance',
    relatedArticles: ['what-is-included-in-a-tune-up', 'preventive-maintenance-older-vehicles']
  },
  {
    slug: 'whats-included-with-an-oil-change',
    cluster: 'maintenance',
    title: "What's included with an oil change?",
    keyQuestion: 'What is included with an oil change at a repair shop?',
    shortAnswer:
      'At minimum: draining the old oil, replacing the oil filter and refilling with the oil your engine calls for. At YBE the car also gets an under-car look while it is up, for leaks, worn parts and anything else worth knowing.',
    sections: [
      { h2: 'The basics', paras: ['Every oil change should include these.'],
        list: ['Old oil drained', 'New oil filter installed', 'Refilled with the correct oil type and amount', 'Maintenance reminder reset'] },
      { h2: 'Why the inspection matters', paras: [
        'With the car on the lift, a mechanic can see leaks, torn boots, worn brakes and tire wear that you cannot see from the driveway. Catching those early is cheaper than finding them on the road. Walk-ins are welcome seven days a week.'
      ] }
    ],
    relatedService: 'oil-change',
    relatedArticles: ['how-often-should-you-change-your-oil', 'what-affects-oil-change-cost']
  },

  // ------------------------------------------------------------ A/C
  {
    slug: 'when-to-get-your-car-ac-recharged',
    cluster: 'ac-cooling',
    title: 'When is it time to get my A/C recharged?',
    keyQuestion: 'When is it time to get my car AC recharged or repaired?',
    shortAnswer:
      'When the air is no longer cold, but a recharge alone is rarely the answer. A/C is a sealed system, so low refrigerant means a leak. Find and fix the leak first, then recharge, or you will pay for the same refrigerant again.',
    sections: [
      { h2: 'Signs the system needs attention', paras: [], list: ['Air is cool instead of cold, or warm in traffic', 'Cold for a few minutes, then warm', 'The compressor clicks on and off often', 'Oily residue around A/C lines or fittings', 'A hissing noise when the A/C runs'] },
      { h2: 'Recharge versus repair', paras: [
        'A recharge refills refrigerant. If the system leaked, the new charge leaks out too, sometimes within weeks. YBE checks pressures and finds the leak or failed part, then recharges once it is fixed.'
      ] }
    ],
    relatedService: 'ac-repair',
    relatedArticles: ['why-is-my-car-ac-blowing-warm', 'what-affects-ac-repair-cost', 'why-does-my-car-ac-smell-bad']
  },
  {
    slug: 'why-does-my-car-ac-smell-bad',
    cluster: 'ac-cooling',
    title: "Why does my car's A/C smell bad?",
    keyQuestion: "Why does my car's AC smell bad, and how do you fix it?",
    shortAnswer:
      'A musty smell is usually mold or bacteria on the evaporator or a dirty cabin air filter. A sweet smell can mean a coolant leak, and a burning smell can be an electrical or belt problem, both of which need checking soon.',
    sections: [
      { h2: 'What the smell tells you', paras: [], list: ['Musty or sour: moisture and mold on the evaporator, or a clogged cabin filter', 'Sweet, like syrup: coolant leaking from the heater core', 'Burning plastic or rubber: an electrical fault or a slipping belt', 'Exhaust smell inside: an exhaust leak, which needs attention right away'] },
      { h2: 'Fixing a musty smell', paras: [
        'Replace the cabin air filter, have the evaporator cleaned, and make sure the drain line under the car is not blocked. A sweet or burning smell is a repair, not a cleaning: have it checked.'
      ] }
    ],
    relatedService: 'ac-repair',
    relatedArticles: ['when-to-get-your-car-ac-recharged', 'why-is-my-car-ac-blowing-warm']
  },

  // ------------------------------------------------------------ TIRES / SUSPENSION
  {
    slug: 'why-is-my-car-shaking',
    cluster: 'tires-alignment',
    title: 'Why is my car shaking?',
    keyQuestion: 'Why is my car shaking while I drive, and is it serious?',
    shortAnswer:
      'When it shakes tells you most of the story. Shaking at highway speed points to tire balance or a bent wheel. Shaking when braking points to the rotors. Shaking at idle points to the engine, such as a misfire or worn mounts.',
    sections: [
      { h2: 'Match the shake to the cause', paras: [], list: ['At highway speed: wheels out of balance, a damaged tire or a bent wheel', 'When braking: warped or uneven rotors', 'At idle or a stop: engine misfire or worn engine mounts', 'When turning: worn CV joints or steering parts', 'All the time and getting worse: a tire with a separated belt, which is dangerous'] },
      { h2: 'Do not wait on it', paras: [
        'A vibration that gets worse, comes with a noise, or started after hitting a pothole should be checked soon. A failing tire or loose steering part can let go without much more warning.'
      ] }
    ],
    relatedService: 'shocks-struts-steering',
    relatedArticles: ['why-does-my-car-pull-to-one-side', 'what-causes-uneven-tire-wear', 'when-to-replace-brake-rotors']
  },
  {
    slug: 'what-causes-uneven-tire-wear',
    cluster: 'tires-alignment',
    title: 'What causes uneven tire wear?',
    keyQuestion: 'What causes uneven tire wear, and how do you stop it?',
    shortAnswer:
      'Bad alignment, wrong tire pressure, worn suspension parts and skipped rotations. The pattern on the tread tells you which: worn edges, a worn center, or patchy cupping each point to a different cause.',
    sections: [
      { h2: 'Read the tread', paras: [], list: ['Both edges worn: underinflation', 'Center worn: overinflation', 'One edge worn: alignment out', 'Cupping or scalloped patches: worn shocks or struts', 'Feathered tread: toe alignment off'] },
      { h2: 'Stopping it', paras: [
        'Check pressure monthly, rotate the tires on schedule, and have the alignment checked after pothole hits or new tires. Fix the cause before buying new tires, or the new ones will wear the same way.'
      ] }
    ],
    relatedService: 'wheel-alignment',
    relatedArticles: ['wheel-alignment-when-you-need-it', 'why-does-my-car-pull-to-one-side', 'how-to-tell-if-your-shocks-are-bad']
  },
  {
    slug: 'wheel-alignment-when-you-need-it',
    cluster: 'tires-alignment',
    title: 'Wheel alignment: when you need it and why it matters',
    keyQuestion: 'How do I know when my car needs a wheel alignment?',
    shortAnswer:
      'You need an alignment when the car pulls to one side, the steering wheel is off-center while driving straight, or the tires are wearing on one edge. Also after a hard pothole or curb hit, new tires, or suspension work.',
    sections: [
      { h2: 'Signs you are out of alignment', paras: [], list: ['The car drifts or pulls when you loosen your grip', 'The steering wheel is crooked on a straight road', 'Tires wearing faster on one edge', 'Squealing tires on easy turns'] },
      { h2: 'Why it matters', paras: [
        'Misalignment scrubs the tires sideways as you drive, wearing them out early and making the car work harder. It can also hide a worn suspension part, which is why YBE checks the suspension before aligning.'
      ] }
    ],
    relatedService: 'wheel-alignment',
    relatedArticles: ['why-does-my-car-pull-to-one-side', 'what-causes-uneven-tire-wear', 'what-affects-alignment-cost']
  },
  {
    slug: 'how-to-tell-if-your-shocks-are-bad',
    cluster: 'tires-alignment',
    title: 'How to tell if your shocks are bad',
    keyQuestion: 'How can I tell if the shocks or struts on my car are bad?',
    shortAnswer:
      'A bouncy or floaty ride, the nose diving when you brake, leaning in turns, clunks over bumps and fluid leaking from the shock body are the common signs. Cupped tire wear is another clue.',
    sections: [
      { h2: 'The signs', paras: [], list: ['The car keeps bouncing after a bump', 'The front dips hard when braking', 'More body lean in turns', 'Clunking or knocking over bumps', 'Oily fluid on the shock or strut', 'Cupped or scalloped tire wear'] },
      { h2: 'Why it matters', paras: [
        'Shocks and struts keep the tires pressed to the road. Worn ones lengthen stopping distances and reduce grip, especially in the rain. YBE inspects shocks, struts and steering parts together.'
      ] }
    ],
    relatedService: 'shocks-struts-steering',
    relatedArticles: ['why-is-my-car-shaking', 'what-causes-uneven-tire-wear']
  },

  // ------------------------------------------------------------ ENGINE
  {
    slug: 'symptoms-of-a-bad-water-pump',
    cluster: 'ac-cooling',
    title: 'Symptoms of a bad water pump',
    keyQuestion: 'What are the symptoms of a bad water pump in a car?',
    shortAnswer:
      'Coolant leaking from the front of the engine, a temperature gauge that climbs, steam from under the hood, and a whining or grinding noise near the belts are the common signs. A failing water pump leads to overheating, so get it checked quickly.',
    sections: [
      { h2: 'The signs', paras: [], list: ['Green, orange or pink coolant under the front of the engine', 'Temperature gauge running hotter than normal', 'Steam from the radiator area', 'Whining or grinding from the front of the engine', 'A wobbly pump pulley'] },
      { h2: 'Why it cannot wait', paras: [
        'The water pump moves coolant through the engine. When it stops, the engine overheats, and overheating can warp the cylinder head. On many engines the pump is driven by the timing belt, so the two are often replaced together.'
      ] }
    ],
    relatedService: 'cooling-system-overheating',
    relatedArticles: ['why-is-my-car-overheating']
  }
];

module.exports = { posts };
