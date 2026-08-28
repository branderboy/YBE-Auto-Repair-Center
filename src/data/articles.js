/**
 * ELEMENT 3 — TOPICAL RELEVANCE (Advice and Car Care)
 *
 * Every article answers one question a driver actually asks before deciding
 * whether to call a shop. Each one opens with a direct answer, then explains
 * it, then links to the service page that fixes the problem.
 *
 * This is the launch set. Remaining questions from the brief are listed in
 * PLANNED_EXPANSION at the bottom so the next batch is deliberate rather than
 * a flood of thin pages.
 */

const clusters = [
  { slug: 'diagnostics', name: 'Diagnostics', blurb: 'Warning lights, no-starts and strange behavior.' },
  { slug: 'brakes', name: 'Brakes', blurb: 'Noises, vibration and knowing when pads are done.' },
  { slug: 'transmission', name: 'Transmission', blurb: 'Slipping, shifting problems and what repair really costs.' },
  { slug: 'tires-alignment', name: 'Tires and Alignment', blurb: 'Pulling, uneven wear and punctures.' },
  { slug: 'ac-cooling', name: 'A/C and Cooling', blurb: 'Warm air, overheating and coolant leaks.' },
  { slug: 'maintenance', name: 'Maintenance', blurb: 'Oil, tune-ups and keeping an older car going.' },
  { slug: 'roadside', name: 'Roadside Problems', blurb: 'What to do when you are stuck right now.' },
  { slug: 'costs', name: 'Repair Costs', blurb: 'What actually drives the price of a repair, and what you control.' }
];

const articles = [
  // ---------------------------------------------------------------- DIAGNOSTICS
  {
    slug: 'why-is-my-check-engine-light-on',
    cluster: 'diagnostics',
    title: 'Why is my check-engine light on?',
    metaTitle: 'Why Is My Check Engine Light On? | YBE Auto',
    metaDescription:
      'What a check-engine light actually means, when it is urgent, and what a shop does to find the cause. From YBE Auto Repair Center in Capitol Heights, MD.',
    shortAnswer:
      'A check-engine light means the engine computer detected something outside its expected range and stored a code. A steady light means get it checked soon. A flashing light means stop driving and call today, because a misfire that severe can destroy the catalytic converter within minutes.',
    sections: [
      {
        h2: 'Steady light versus flashing light',
        paras: [
          'This is the only distinction that matters in the first five minutes. A steady amber light is the computer saying it found a fault worth looking at. The car may drive completely normally, and often does.',
          'A flashing light is different. It means raw fuel is being dumped into the exhaust because a cylinder is misfiring badly. The catalytic converter can be damaged quickly, and a converter costs far more than the misfire repair would have. If your light is flashing, drive as little as possible and call.'
        ]
      },
      {
        h2: 'The gas cap really is on the list',
        paras: [
          'It sounds like a joke, but a loose or failed gas cap is one of the most common causes of a check-engine light. The fuel system is sealed and monitored for leaks, and a cap that is not sealing registers as one.',
          'Tighten it until it clicks and drive for a day or two. If the light clears itself, that was it. If it comes back, the fault is real and something else is going on.'
        ]
      },
      {
        h2: 'What the code does and does not tell you',
        paras: [
          'A code identifies a circuit or a symptom, not a broken part. A code pointing at an oxygen sensor means the readings from that sensor are out of range. That can be the sensor, or a vacuum leak, or an exhaust leak, or a wiring fault, or an engine actually running rich.',
          'This is why free code readings at a parts counter so often lead to replacing a part that was fine. The code is the starting point of a diagnosis, not the conclusion of one.'
        ],
        list: [
          'Codes tell you where to look, not what failed',
          'Freeze-frame data shows what the engine was doing when the fault occurred',
          'Pending codes catch problems before the light even comes on',
          'Multiple codes often share one root cause'
        ]
      },
      {
        h2: 'Can you keep driving?',
        paras: [
          'With a steady light and a car that drives normally, usually yes, for a short time. Get it read soon, because with the light on the computer has stopped monitoring some systems, so a second and more serious fault will not produce a new warning.',
          'Stop driving if the light is flashing, if the car is running rough or losing power, if the temperature gauge is climbing, or if you hear or smell something new. And remember that Maryland emissions testing will fail a vehicle with the light on.'
        ]
      }
    ],
    relatedService: 'check-engine-light-diagnostics',
    relatedArticles: ['why-wont-my-car-start', 'why-is-my-car-overheating']
  },
  {
    slug: 'why-wont-my-car-start',
    cluster: 'diagnostics',
    title: 'Why won’t my car start?',
    metaTitle: 'Why Won’t My Car Start? | YBE Auto',
    metaDescription:
      'Clicking, cranking but not starting, or total silence — what each one means and what to check. From YBE Auto Repair Center in Capitol Heights, MD.',
    shortAnswer:
      'Listen to what the car does when you turn the key. If it cranks but never fires, it is missing spark, fuel or compression. If it clicks or does nothing, the problem is almost always electrical: battery, connections, or starter.',
    sections: [
      {
        h2: 'Start by identifying which no-start you have',
        paras: [
          'This single question saves more diagnostic time than anything else, and you can answer it yourself before calling anyone.',
          'Does the engine turn over — that rhythmic churning sound — but never catch and run? Or do you get a click, rapid clicking, or complete silence with no churning at all? Those are two different problems with almost no overlap in causes.'
        ]
      },
      {
        h2: 'It clicks or does nothing',
        paras: [
          'This points at the electrical side. A single loud click is often the starter solenoid engaging while the battery lacks the current to spin the motor. Rapid machine-gun clicking is a classic low-battery signature.',
          'Before assuming the battery, check the terminals. Corrosion or a loose clamp will produce identical symptoms to a dead battery, and cleaning and tightening a connection is free.'
        ],
        list: [
          'Rapid clicking: usually a discharged or failing battery',
          'One solid click: battery or starter, needs testing to tell which',
          'Complete silence: could be battery, ignition switch, neutral safety switch or immobilizer',
          'Dash lights bright but no crank: leans toward the starter rather than the battery'
        ]
      },
      {
        h2: 'It cranks but will not start',
        paras: [
          'The battery and starter are doing their jobs, so the problem is one of the three things combustion requires: spark, fuel or compression.',
          'Fuel problems are common. If you hear no brief hum from the fuel pump when the key first goes to on, that is worth mentioning. Spark problems often come with a stored crank or cam sensor code. Compression problems are less common but more serious, and usually announce themselves with a change in cranking sound.',
          'One more thing worth checking: if a security or immobilizer light is flashing, the car may be blocking the start deliberately because it does not recognize the key.'
        ]
      },
      {
        h2: 'If it started and quit, or only fails sometimes',
        paras: [
          'An intermittent no-start is the most useful kind to diagnose, because the fault is still coming and going. Waiting until it fails permanently often makes it easier to find but leaves you stranded first.',
          'Note the pattern and tell the shop: only when hot, only when cold, only after sitting overnight, only with a full tank. Those patterns point directly at specific components.'
        ]
      }
    ],
    relatedService: 'no-start-diagnostics',
    relatedArticles: ['jump-start-vs-battery-replacement', 'why-is-my-check-engine-light-on']
  },

  // ---------------------------------------------------------------- BRAKES
  {
    slug: 'signs-brake-pads-need-replacement',
    cluster: 'brakes',
    title: 'Signs your brake pads need replacement',
    metaTitle: 'Signs Your Brake Pads Need Replacement | YBE Auto',
    metaDescription:
      'How to tell when brake pads are worn out, what the squeal actually is, and why waiting turns a pad job into a rotor job. YBE Auto Repair, Capitol Heights, MD.',
    shortAnswer:
      'A high-pitched squeal when braking is the built-in wear indicator telling you pads are near the end. Grinding means the friction material is already gone and you are damaging rotors with every stop.',
    sections: [
      {
        h2: 'The squeal is a feature, not a failure',
        paras: [
          'Most brake pads have a small metal tab that contacts the rotor once the friction material wears down to a set thickness. The resulting squeal is deliberate: an audible reminder built in by the manufacturer.',
          'It usually shows up before you brake hard and sometimes disappears under firm pedal pressure. That is normal and does not mean the problem went away.'
        ]
      },
      {
        h2: 'Grinding is a different message',
        paras: [
          'Grinding, scraping or a metal-on-metal sound means the friction material is gone and the metal backing plate is cutting into the rotor.',
          'At this stage a routine pad replacement has already become a pad and rotor job, and sometimes a caliper job as well if the heat has damaged it. Every additional stop makes it worse.'
        ]
      },
      {
        h2: 'What else to watch and feel for',
        paras: [
          'Brakes give several warnings besides noise. Any one of these is worth an inspection.'
        ],
        list: [
          'The pedal travels farther toward the floor than it used to',
          'The car pulls to one side when you brake',
          'A shudder through the steering wheel when slowing from highway speed',
          'Visible deep grooves or scoring on the rotor face',
          'One wheel producing far more brake dust than the others',
          'A burning smell after heavy braking or a long downhill'
        ]
      },
      {
        h2: 'How long do pads actually last?',
        paras: [
          'There is no single number, and mileage is a poor guide. What wears brakes is the number of stops and how hard each one is, not the distance travelled.',
          'A car doing stop-and-go driving around Capitol Heights and DC will go through pads considerably faster than the same car doing highway miles. Front pads also normally wear faster than rear ones, since the front brakes do most of the work.',
          'The reliable approach is measurement. Having pad thickness checked during an oil change costs nothing extra and tells you exactly where you stand.'
        ]
      }
    ],
    relatedService: 'brake-pad-rotor-replacement',
    relatedArticles: ['why-do-brakes-squeak-or-grind', 'why-does-my-car-pull-to-one-side']
  },
  {
    slug: 'why-do-brakes-squeak-or-grind',
    cluster: 'brakes',
    title: 'Why do brakes squeak or grind?',
    metaTitle: 'Why Do Brakes Squeak or Grind? | YBE Auto',
    metaDescription:
      'Squeaking, grinding and squealing brakes each mean something different. Here is how to tell them apart. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Squealing is usually the wear indicator or surface glazing. Grinding is metal on metal and means the pads are finished. A morning-only squeak after rain is usually harmless surface rust that clears within a few stops.',
    sections: [
      {
        h2: 'The harmless one: morning rust squeak',
        paras: [
          'If your brakes squeak on the first few stops of the day, especially after rain or heavy humidity, and then go quiet, that is almost always a thin film of surface rust on the rotors.',
          'It forms overnight and gets scrubbed off within a few stops. This is normal and needs no repair. What matters is whether the noise goes away and stays away.'
        ]
      },
      {
        h2: 'The warning: persistent squeal',
        paras: [
          'A squeal that shows up on most stops and does not clear is usually the wear indicator doing its job.',
          'It can also be glazing, where pads have been overheated until the surface hardens, or cheap pads with a hard compound. Either way it needs eyes on it, because you cannot tell glazing from a wear indicator by sound alone.'
        ]
      },
      {
        h2: 'The urgent one: grinding',
        paras: [
          'Grinding is not ambiguous. It means the friction material has worn through and metal is contacting metal.',
          'This one should not wait. Beyond the rising repair cost, worn-through brakes have significantly less stopping power, and they fade faster when they get hot.'
        ],
        list: [
          'Grinding that gets louder as you slow: pads worn through',
          'Grinding with a pull to one side: possibly a seized caliper',
          'Grinding plus a wobble: check wheel bearings too',
          'A rhythmic scrape that matches wheel rotation: something contacting the rotor'
        ]
      },
      {
        h2: 'When the noise is not the brakes',
        paras: [
          'Some noises that appear during braking come from elsewhere. A worn wheel bearing changes pitch when the car shifts weight in a turn or under braking. Loose heat shields rattle in ways that seem brake-related but are not.',
          'This is why a proper inspection includes the wheel bearings and suspension, not just the pads and rotors. Replacing brakes will not quiet a bearing.'
        ]
      }
    ],
    relatedService: 'brake-noise-vibration',
    relatedArticles: ['signs-brake-pads-need-replacement', 'why-does-my-car-pull-to-one-side']
  },

  // ---------------------------------------------------------------- TRANSMISSION
  {
    slug: 'signs-of-a-failing-transmission',
    cluster: 'transmission',
    title: 'Signs of a failing transmission',
    metaTitle: 'Signs of a Failing Transmission | YBE Auto',
    metaDescription:
      'Slipping, delayed shifts, shuddering and burnt fluid — what transmission warning signs mean and which are urgent. YBE Auto Repair, Capitol Heights, MD.',
    shortAnswer:
      'The clearest sign is slipping: the engine revs climb but the car does not accelerate with them. Delayed engagement, hard or jerky shifts, shuddering and burnt-smelling fluid are the other main warnings, and all of them get worse the longer you drive on them.',
    sections: [
      {
        h2: 'Slipping is the one that matters most',
        paras: [
          'You press the accelerator, the engine gets louder and the tachometer climbs, but the car does not speed up the way the engine sound suggests it should.',
          'That is the transmission failing to hold a gear, and it generates heat. Heat is what destroys the clutches and seals inside, so slipping is a problem that accelerates its own damage. This is not a symptom to monitor for a few months.'
        ]
      },
      {
        h2: 'Delayed engagement',
        paras: [
          'You shift into drive or reverse and there is a pause — one second, two seconds — before the car actually engages and moves.',
          'This often points at low fluid or fluid that has lost its properties, and it is one of the more recoverable symptoms if caught early. It is also one of the easiest to dismiss, because once the car is moving everything feels normal.'
        ]
      },
      {
        h2: 'What the fluid tells you',
        paras: [
          'Transmission fluid is one of the most informative things on a car. Healthy fluid is red or pink and does not smell like much.',
          'Dark brown or black fluid that smells burnt means the unit has been running hot. If you see metallic glitter or dark flecks, that is material from inside the transmission, and it changes the conversation from service to repair.'
        ],
        list: [
          'Bright red, no strong odor: normal',
          'Darker red or light brown: due for service',
          'Dark brown or black with a burnt smell: it has been overheating',
          'Metallic particles or glitter: internal wear',
          'Milky or foamy: coolant contamination, needs immediate attention'
        ]
      },
      {
        h2: 'Symptoms that are not always the transmission',
        paras: [
          'Not every shifting complaint is a failing transmission, and that is genuinely good news. A misfiring engine can make shifts feel wrong. A failing speed sensor can cause erratic shifting. A throttle position fault can produce late or harsh shifts.',
          'Those are far less expensive repairs than a rebuild, which is exactly why a real diagnosis should come before any quote for major transmission work.'
        ]
      }
    ],
    relatedService: 'transmission-repair',
    relatedArticles: ['transmission-repair-rebuild-or-replace', 'why-is-my-check-engine-light-on']
  },
  {
    slug: 'transmission-repair-rebuild-or-replace',
    cluster: 'transmission',
    title: 'Transmission repair, rebuild, or replacement?',
    metaTitle: 'Transmission Repair vs Rebuild | YBE Auto',
    metaDescription:
      'What the difference actually is between repairing, rebuilding and replacing a transmission, and how to decide. YBE Auto Repair, Capitol Heights, MD.',
    shortAnswer:
      'Repair fixes one failed component and leaves the rest alone. A rebuild takes your transmission apart and replaces the worn internals. Replacement installs a different unit entirely. Which one you need depends on what actually failed, and that requires a diagnosis first.',
    sections: [
      {
        h2: 'Repair: the outcome worth hoping for',
        paras: [
          'A significant share of transmission complaints come from components that can be replaced without opening up the unit: solenoids, sensors, the valve body, external leaks, or wiring.',
          'These are ordinary repairs at ordinary prices. They are also the reason it is worth having a shop diagnose the problem rather than accepting a rebuild quote based on symptoms alone.'
        ]
      },
      {
        h2: 'Rebuild: your unit, new internals',
        paras: [
          'A rebuild means removing the transmission, disassembling it, and replacing the clutches, bands, seals and any damaged hard parts, then reassembling and reinstalling it.',
          'This is the path when the internal wear is real but the case and major components are still sound. It keeps the transmission that was matched to your vehicle from the factory.'
        ]
      },
      {
        h2: 'Replacement: a different unit',
        paras: [
          'Replacement means installing another transmission in place of yours. This makes sense when the original is damaged beyond practical repair, or when a suitable replacement unit is a better value than rebuilding what you have.',
          'Which route is better varies by vehicle and by what failed. There is no universal answer, and any shop that gives you one without looking at your car is guessing.'
        ],
        list: [
          'What exactly failed, and is it internal or external?',
          'What is the vehicle worth, and what else does it need soon?',
          'How is the engine, the body and the rest of the car?',
          'How long do you plan to keep it?',
          'Is there a known cause, like a cooler restriction, that will repeat?'
        ]
      },
      {
        h2: 'The question worth asking out loud',
        paras: [
          'Sometimes the right answer is not to do the work at all. If a vehicle has a failing engine, serious rust or other major needs, putting a transmission in it is rarely a good use of money.',
          'We would rather tell you that than take the job. A customer who trusts the advice comes back for the next car; one who spent a rebuild on a car that died anyway does not.'
        ]
      }
    ],
    relatedService: 'transmission-replacement-rebuild',
    relatedArticles: ['signs-of-a-failing-transmission', 'preventive-maintenance-older-vehicles']
  },
  // ---------------------------------------------------------------- TIRES & ALIGNMENT
  {
    slug: 'why-does-my-car-pull-to-one-side',
    cluster: 'tires-alignment',
    title: 'Why does my car pull to one side?',
    metaTitle: 'Why Does My Car Pull to One Side? | YBE Auto',
    metaDescription:
      'Pulling while driving or only while braking means different things. Here is how to tell what is causing it. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'If the car pulls while driving normally, start with tire pressure and alignment. If it only pulls when you brake, the cause is in the brakes — usually a sticking caliper or a collapsed brake hose. That distinction narrows it down immediately.',
    sections: [
      {
        h2: 'Does it pull all the time, or only when braking?',
        paras: [
          'Answer this before anything else. A car that drifts steadily on a flat road has a tire, alignment or suspension issue. A car that tracks straight until you touch the brakes has a brake issue.',
          'Test it where it is safe and legal: a flat, empty stretch with no crown in the road. Roads are built with a slight slope for drainage, so a mild drift to the right on a normal street is not necessarily a fault.'
        ]
      },
      {
        h2: 'Check tire pressure first — it is free',
        paras: [
          'An underinflated tire has more rolling resistance, and the car will steer toward that side. This is the single most common cause of a mild pull and it costs nothing to rule out.',
          'Set all four to the pressure listed on the sticker in the driver door jamb, not the number molded into the tire sidewall. That sidewall number is a maximum, not a recommendation.'
        ]
      },
      {
        h2: 'Alignment and what knocks it out',
        paras: [
          'If pressures are correct and the pull remains, alignment is the likely cause. It does not take a dramatic impact — potholes and curb strikes on local roads are enough, and the change happens gradually enough that most drivers adapt without noticing.',
          'The telltale sign is tire wear. Alignment problems wear one edge of a tire noticeably faster than the rest, and a feathered edge you can feel by running a hand across the tread is a strong indicator.'
        ],
        list: [
          'Steering wheel off-center while driving straight',
          'Uneven wear on the inside or outside edge of a tire',
          'A recent pothole strike or curb impact',
          'The car wandering or feeling loose at highway speed',
          'New tires wearing out unusually fast'
        ]
      },
      {
        h2: 'Pulling only under braking',
        paras: [
          'This is a brake problem, and it is worth treating seriously. Usually it is a caliper that is not releasing properly on one side, or a brake hose that has degraded internally and is restricting flow.',
          'A car that pulls under braking behaves unpredictably in an emergency stop, which is exactly when you need it most predictable. Have it looked at rather than steering around it.'
        ]
      }
    ],
    relatedService: 'wheel-alignment',
    relatedArticles: ['can-a-punctured-tire-be-repaired', 'why-do-brakes-squeak-or-grind']
  },
  {
    slug: 'can-a-punctured-tire-be-repaired',
    cluster: 'tires-alignment',
    title: 'Can a punctured tire be repaired?',
    metaTitle: 'Can a Punctured Tire Be Repaired? | YBE Auto',
    metaDescription:
      'Which tire punctures can be safely repaired and which cannot, and why plug kits are not a real fix. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Usually yes, if the puncture is in the tread area, is not too large, and the tire was not driven flat. Punctures in the sidewall or shoulder cannot be repaired safely, regardless of size.',
    sections: [
      {
        h2: 'Location decides almost everything',
        paras: [
          'The tread is the flat part that contacts the road. The sidewall is the vertical face. Between them is the shoulder, where the tire curves.',
          'Tread punctures are generally repairable because that area is reinforced with steel belts and does not flex dramatically. Sidewalls flex constantly with every rotation, and no patch holds reliably against that. A sidewall puncture means a new tire, and any shop that tells you otherwise is taking a risk with your safety.'
        ]
      },
      {
        h2: 'What a proper repair involves',
        paras: [
          'A correct repair means dismounting the tire from the wheel and inspecting the inside. This matters because driving on a flat or low tire can damage the inner liner in ways that are invisible from the outside.',
          'The industry-accepted repair fills the puncture channel and patches the inner liner, sealing from the inside. A plug pushed in from the outside without dismounting is a temporary measure to get you to a shop, not a finished repair.'
        ],
        list: [
          'Puncture in the tread area, not the sidewall or shoulder',
          'Damage no larger than about a quarter inch',
          'The tire was not driven on while flat',
          'No previous repair overlapping the same spot',
          'Tread depth still adequate to be worth repairing'
        ]
      },
      {
        h2: 'Why driving on it changes the answer',
        paras: [
          'A tire run flat, even for a short distance, gets damaged by its own sidewall folding and generating heat. That damage happens inside where you cannot see it.',
          'This is the most common reason a tire that looks repairable turns out not to be. If you get a flat, stopping promptly is what keeps the repair option open.'
        ]
      },
      {
        h2: 'If you are stuck right now',
        paras: [
          'If you have a flat and cannot change it, or you are somewhere unsafe, call rather than working beside traffic. Our roadside service handles spare installation and flat-tire help.',
          'And if you are on a highway shoulder with traffic passing close, stay in the vehicle with your seat belt fastened and call 911 first. No tire is worth standing in a live traffic lane.'
        ]
      }
    ],
    relatedService: 'tire-repair-replacement',
    relatedArticles: ['what-to-do-after-a-flat-tire', 'why-does-my-car-pull-to-one-side']
  },

  // ---------------------------------------------------------------- A/C & COOLING
  {
    slug: 'why-is-my-car-ac-blowing-warm',
    cluster: 'ac-cooling',
    title: 'Why is my car A/C blowing warm air?',
    metaTitle: 'Why Is My Car A/C Blowing Warm Air? | YBE Auto',
    metaDescription:
      'Why car air conditioning stops blowing cold, why a recharge is rarely the whole fix, and what to check. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Most warm-air complaints come down to low refrigerant, and refrigerant only gets low because it leaked out. A/C is a sealed system, so recharging without finding the leak means paying again in a few months.',
    sections: [
      {
        h2: 'Why "it just needs a recharge" is misleading',
        paras: [
          'Air conditioning does not consume refrigerant the way an engine consumes oil. In a healthy system, the same refrigerant circulates indefinitely.',
          'So if yours is low, it escaped somewhere. Adding more without addressing that means the leak keeps going, and there is a second cost: refrigerant carries the oil that lubricates the compressor, so running low is hard on the most expensive part of the system.'
        ]
      },
      {
        h2: 'What the pattern of failure tells you',
        paras: [
          'How your A/C fails is diagnostic information, and it is worth paying attention to before you call.'
        ],
        list: [
          'Cold on the highway, warm at idle: often a cooling fan not running',
          'Cold for ten minutes then warm: possible icing or a cycling problem',
          'Never cold, air blows strongly: likely low refrigerant or compressor',
          'Cold air but weak airflow: usually a clogged cabin air filter or blower motor',
          'Musty smell when it starts: moisture in the evaporator case',
          'Water on the passenger floor: a blocked evaporator drain'
        ]
      },
      {
        h2: 'The cheap causes worth ruling out',
        paras: [
          'Not every A/C complaint is refrigerant. A cabin air filter clogged with debris will make even a perfectly functioning system feel weak, and it is an inexpensive part.',
          'Cooling fans matter too. At highway speed, air moves through the condenser on its own. In traffic it depends entirely on the fans, which is why a failed fan produces A/C that works when you are moving and quits when you stop.'
        ]
      },
      {
        h2: 'Finding the leak',
        paras: [
          'Leaks are found by looking for the oily residue refrigerant leaves behind, by adding a UV dye and checking with a black light, or with an electronic detector.',
          'Common leak points are the condenser at the front of the car where road debris hits it, rubber hoses that harden with age, O-ring seals at connections, and the compressor shaft seal. Once the leak is repaired, the system is evacuated and recharged to the exact specified capacity — a system overfilled with refrigerant cools worse, not better.'
        ]
      }
    ],
    relatedService: 'ac-repair',
    relatedArticles: ['why-is-my-car-overheating', 'how-often-should-you-change-your-oil']
  },
  {
    slug: 'why-is-my-car-overheating',
    cluster: 'ac-cooling',
    title: 'Why is my car overheating?',
    metaTitle: 'Why Is My Car Overheating? | YBE Auto',
    metaDescription:
      'What to do the moment your temperature gauge climbs, what causes overheating, and why it cannot wait. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Most overheating traces back to low coolant from a leak, a thermostat stuck closed, a failed water pump, or cooling fans that are not running. Whatever the cause, an engine that keeps running while overheating can be permanently damaged in minutes.',
    sections: [
      {
        h2: 'What to do right now if the gauge is climbing',
        paras: [
          'This part matters more than the diagnosis. If the temperature gauge is heading into the red, turn off the air conditioning and turn the heater on full. The heater core acts as a second radiator and pulls real heat out of the engine, however unpleasant that is in July.',
          'Then pull over safely and shut the engine off. Do not open the radiator cap on a hot engine — the system is pressurized and the coolant is well above boiling point. Let it cool, and call.'
        ]
      },
      {
        h2: 'The usual causes',
        paras: [
          'Overheating means the cooling system has lost either coolant or the ability to move heat. A handful of failures account for most cases.'
        ],
        list: [
          'A coolant leak: hoses, radiator, water pump, thermostat housing or heater core',
          'A thermostat stuck closed, blocking flow to the radiator',
          'A failed water pump no longer circulating coolant',
          'Cooling fans not running, which shows up in traffic but not at highway speed',
          'A radiator clogged internally or blocked externally with debris',
          'A failed head gasket pushing exhaust gas into the cooling system'
        ]
      },
      {
        h2: 'When it overheats tells you where to look',
        paras: [
          'Overheating in stop-and-go traffic but staying normal on the highway is a strong indicator of a cooling fan problem, because at speed the airflow happens without them.',
          'Overheating at highway speed but staying normal in town points more toward coolant flow: a thermostat, water pump or a restricted radiator that cannot keep up with the higher heat load.'
        ]
      },
      {
        h2: 'Why this one cannot wait',
        paras: [
          'Heat is what destroys engines. Aluminum cylinder heads warp, head gaskets fail, and severe overheating can damage pistons and bearings. A single bad overheat can cause damage that was not there the day before.',
          'That is why a cooling-system repair is one of the cheapest things you can do relative to what it prevents. A hose or thermostat is a small job. A head gasket is not, and a replacement engine is in another category entirely.'
        ]
      }
    ],
    relatedService: 'cooling-system-overheating',
    relatedArticles: ['why-is-my-car-ac-blowing-warm', 'car-maintenance-before-a-long-trip']
  },

  // ---------------------------------------------------------------- MAINTENANCE
  {
    slug: 'how-often-should-you-change-your-oil',
    cluster: 'maintenance',
    title: 'How often should you change your oil?',
    metaTitle: 'How Often Should You Change Your Oil? | YBE Auto',
    metaDescription:
      'Why the old 3,000-mile rule no longer applies, what severe service really means, and how to set your real interval. YBE Auto Repair, Capitol Heights, MD.',
    shortAnswer:
      'Follow the interval in your owner’s manual, not the sticker on your windshield. Most modern vehicles run considerably longer than 3,000 miles. But if you do mostly short city trips, you are in the severe-service category and should use the shorter interval listed.',
    sections: [
      {
        h2: 'The 3,000-mile rule is outdated',
        paras: [
          'That number comes from an era of different oils and different engines. Modern synthetic oils and tighter manufacturing tolerances have extended intervals substantially, and many manufacturers now specify well beyond it.',
          'Your owner’s manual is the authority here, and many vehicles have an oil-life monitoring system that calculates the interval based on how the car is actually being driven rather than on mileage alone.'
        ]
      },
      {
        h2: 'Severe service is more common than the name suggests',
        paras: [
          'Most manuals list two intervals: normal and severe. "Severe" sounds like racing or towing through mountains, but the actual definition catches a large share of ordinary drivers.',
          'If your driving is mostly short trips around Capitol Heights and DC, you are almost certainly in the severe category. Short trips never let the engine fully warm up, so moisture and fuel dilution stay in the oil instead of evaporating off.'
        ],
        list: [
          'Mostly trips under about 10 miles',
          'Extended idling or heavy stop-and-go traffic',
          'Very hot or very cold weather driving',
          'Towing or carrying heavy loads',
          'Dusty conditions'
        ]
      },
      {
        h2: 'The grade matters as much as the interval',
        paras: [
          'Modern engines specify a particular oil viscosity for a reason. Variable valve timing systems, in particular, use oil pressure through narrow passages, and the wrong viscosity affects how they work.',
          'Using a heavier oil than specified does not provide extra protection. It usually just makes the engine work harder, especially at startup when most wear occurs.'
        ]
      },
      {
        h2: 'Time counts, even without miles',
        paras: [
          'Oil degrades sitting still. It absorbs moisture, and additives break down. A car driven only a few thousand miles a year still needs an annual change.',
          'And if you find yourself adding oil between changes, that is a separate issue worth investigating. An engine losing oil is either leaking it or burning it, and both are better addressed early.'
        ]
      }
    ],
    relatedService: 'oil-change',
    relatedArticles: ['what-is-included-in-a-tune-up', 'preventive-maintenance-older-vehicles']
  },
  {
    slug: 'what-is-included-in-a-tune-up',
    cluster: 'maintenance',
    title: 'What is included in a tune-up?',
    metaTitle: 'What Is Included in a Tune-Up? | YBE Auto',
    metaDescription:
      'What a tune-up actually means on a modern car, what it includes, and when your vehicle needs one. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'On a modern vehicle a tune-up generally means spark plugs, ignition components, filters, and inspection of the systems that affect how the engine runs. The old adjustments — points, timing, carburetor — no longer exist on current engines.',
    sections: [
      {
        h2: 'The term is a holdover',
        paras: [
          'A tune-up once meant physically adjusting things: ignition points, timing, idle mixture and the carburetor. Those parts are gone. Engine timing and fuel mixture are managed by the computer and adjust themselves continuously.',
          'What remains is replacing the parts that genuinely wear out, and inspecting the systems where wear shows up as poor running.'
        ]
      },
      {
        h2: 'What is actually included',
        paras: [
          'A worthwhile tune-up covers the maintenance items that affect combustion and airflow, plus a real inspection.'
        ],
        list: [
          'Spark plugs replaced at the specified interval',
          'Ignition coils or wires inspected and replaced if failing',
          'Engine air filter and cabin air filter',
          'Fluid levels and condition checked',
          'Belts and hoses inspected for cracking and wear',
          'Battery and charging system tested',
          'Scan for stored and pending codes'
        ]
      },
      {
        h2: 'Why spark plugs matter more than they seem',
        paras: [
          'Worn plugs need more voltage to fire. That extra demand falls on the ignition coils, which are considerably more expensive than plugs.',
          'This is the clearest example of maintenance protecting more expensive parts. Replacing plugs on schedule is one of the cheapest ways to avoid replacing coils and, in a bad case, dealing with misfire damage to a catalytic converter.'
        ]
      },
      {
        h2: 'Signs your vehicle is due',
        paras: [
          'Rough idle at a stoplight, hesitation when you accelerate, harder starting, or fuel economy that has quietly slipped over several months are all common indicators.',
          'If a check-engine light is on as well, that gets diagnosed rather than assumed. A tune-up is maintenance, not a fix for a stored fault, and any shop that sells one as a cure for a warning light is skipping the diagnosis.'
        ]
      }
    ],
    relatedService: 'tune-ups-maintenance',
    relatedArticles: ['how-often-should-you-change-your-oil', 'preventive-maintenance-older-vehicles']
  },
  {
    slug: 'preventive-maintenance-older-vehicles',
    cluster: 'maintenance',
    title: 'Preventive maintenance for older vehicles',
    metaTitle: 'Maintenance for Older Vehicles | YBE Auto',
    metaDescription:
      'How to keep a high-mileage car running reliably, what to prioritize, and when to stop spending. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Older cars can run a long time, but only if the things that strand you are addressed before they fail. Prioritize the cooling system, belts and hoses, the battery and charging system, brakes and tires — in that order.',
    sections: [
      {
        h2: 'Focus on what leaves you stranded',
        paras: [
          'On a high-mileage vehicle, the goal shifts from keeping everything perfect to keeping the car reliable. Those are different objectives with different budgets.',
          'Cosmetic issues and minor annoyances can wait. What cannot wait are the systems whose failure stops the car entirely or makes it unsafe to drive.'
        ],
        list: [
          'Cooling system: hoses, belts, thermostat, water pump, coolant condition',
          'Battery and charging system, tested rather than guessed at',
          'Brakes, including fluid condition, not just pads',
          'Tires, including age and not only tread depth',
          'Timing belt if your engine uses one and it is near its interval',
          'Leaks of any fluid, tracked rather than topped off'
        ]
      },
      {
        h2: 'Rubber ages even when the car does not move',
        paras: [
          'Belts and hoses degrade with time and heat cycles, not just mileage. A hose on a fifteen-year-old car with low miles can still be at the end of its life.',
          'The same applies to tires. A tire with plenty of tread can still be too old to be safe, because the rubber compound hardens and loses grip as it ages.'
        ]
      },
      {
        h2: 'Track small leaks instead of topping off',
        paras: [
          'On an older vehicle, some seepage is common. The important thing is knowing which leaks are minor and which are growing.',
          'A slow oil seep is one thing. Coolant loss is another, because low coolant leads to overheating and overheating is what ends engines. If you are adding any fluid regularly, that deserves a diagnosis.'
        ]
      },
      {
        h2: 'Knowing when to stop',
        paras: [
          'There is a point where a vehicle stops being worth further investment, and an honest shop will tell you when you are approaching it.',
          'The useful question is not what this repair costs, but what it buys. A reliable car that needs a water pump is worth fixing. A car that needs a transmission, has a failing engine and serious rust generally is not, and we would rather say so than take the work.'
        ]
      }
    ],
    relatedService: 'tune-ups-maintenance',
    relatedArticles: ['car-maintenance-before-a-long-trip', 'how-often-should-you-change-your-oil']
  },
  {
    slug: 'car-maintenance-before-a-long-trip',
    cluster: 'maintenance',
    title: 'Car maintenance before a long trip',
    metaTitle: 'Car Maintenance Before a Long Trip | YBE Auto',
    metaDescription:
      'What to check before a road trip so a small problem does not become a breakdown far from home. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Check tires including the spare, the cooling system, brakes, battery, fluids, and wipers. Highway driving stresses different things than city driving, so a car that feels fine around town can still be unprepared for six hours at speed.',
    sections: [
      {
        h2: 'Highway miles are a different kind of work',
        paras: [
          'A car that only does short local trips has never been asked to run at sustained speed for hours. That is when weaknesses in the cooling system, tires and suspension show up.',
          'This is why cars break down on road trips more often than the mileage would suggest. The trip is not harder on the car overall, it is just a different kind of demand, applied for longer.'
        ]
      },
      {
        h2: 'Tires first, and check the spare',
        paras: [
          'Tires are the single most common road-trip failure. Heat plus sustained speed plus a heavily loaded vehicle is exactly the combination that finds a weak tire.',
          'Check pressure when the tires are cold, look at tread depth and check for sidewall cracking or bulges. Then check the spare, which is the step almost everyone skips. A spare that has been sitting for five years is often flat when you finally need it.'
        ]
      },
      {
        h2: 'The pre-trip list',
        paras: [
          'None of this takes long, and any of it can save a trip.'
        ],
        list: [
          'Tire pressure and tread, including the spare',
          'Coolant level and condition, plus hoses and belts',
          'Engine oil level, and an oil change if you are near the interval',
          'Brake pad thickness and brake fluid condition',
          'Battery tested under load',
          'Wiper blades and washer fluid',
          'All exterior lights',
          'Jack and lug wrench actually present in the vehicle'
        ]
      },
      {
        h2: 'Give yourself time to fix what you find',
        paras: [
          'Have the inspection done a week or two before you leave, not the day before. If something needs a part ordered, you want the room to handle it calmly.',
          'And if a warning light is on, deal with it before the trip rather than hoping it holds. A fault that is manageable near home is a much bigger problem three hundred miles away on a Sunday.'
        ]
      }
    ],
    relatedService: 'tune-ups-maintenance',
    relatedArticles: ['preventive-maintenance-older-vehicles', 'why-is-my-car-overheating']
  },

  // ---------------------------------------------------------------- ROADSIDE
  {
    slug: 'jump-start-vs-battery-replacement',
    cluster: 'roadside',
    title: 'Jump start or battery replacement?',
    metaTitle: 'Jump Start vs Battery Replacement | YBE Auto',
    metaDescription:
      'When a jump start is enough, when the battery needs replacing, and how to tell if the alternator is the real problem. YBE Auto, Capitol Heights, MD.',
    shortAnswer:
      'A jump start is enough if the battery was drained by something you can identify, like lights left on. If the battery went dead on its own, or has needed a jump before, it is failing and should be replaced. And if the car dies again shortly after being jumped, suspect the alternator.',
    sections: [
      {
        h2: 'Why was it dead? That is the whole question',
        paras: [
          'A battery drained by an obvious cause — headlights left on, a door not fully closed, a car that sat for weeks — is often fine after a jump and a decent drive to recharge.',
          'A battery that went dead with no explanation is telling you it can no longer hold a charge. Jumping it works today and probably will not next week.'
        ]
      },
      {
        h2: 'When it is the alternator instead',
        paras: [
          'The alternator recharges the battery while the engine runs. If it has failed, the car runs on battery power alone and will die once that is used up — often within a few miles.',
          'The clue is what happens after the jump. If the car dies again shortly after the cables come off, the alternator is the likely culprit, and replacing the battery alone will not fix it. A charging-system test settles this in minutes.'
        ],
        list: [
          'Battery light on while driving',
          'Headlights dimming at idle and brightening when you rev',
          'The car dies shortly after a successful jump start',
          'Electrical accessories behaving erratically',
          'A new battery that went dead within weeks'
        ]
      },
      {
        h2: 'Jump-starting safely',
        paras: [
          'Modern vehicles have sensitive electronics, and a reversed connection can cause expensive damage. Connect positive to positive first, then the negative on the good battery, then the final negative clamp to an unpainted metal ground point on the dead vehicle — not directly to its negative terminal.',
          'That last detail exists for a reason: it keeps any spark away from the battery itself, which vents hydrogen gas.'
        ]
      },
      {
        h2: 'After a jump, drive or charge properly',
        paras: [
          'A jump start gets the engine running but leaves the battery still largely depleted. Short trips will not recharge it, so if you shut the car off after ten minutes you may be stuck again.',
          'Either drive for a decent stretch or have the battery properly charged and tested. A test tells you whether you had a bad night or need a battery, which beats guessing.'
        ]
      }
    ],
    relatedService: 'jump-start',
    relatedArticles: ['why-wont-my-car-start', 'what-to-do-after-a-flat-tire']
  },
  {
    slug: 'what-to-do-after-a-flat-tire',
    cluster: 'roadside',
    title: 'What should you do after getting a flat tire?',
    metaTitle: 'What to Do After a Flat Tire | YBE Auto',
    metaDescription:
      'How to handle a flat tire safely, when to change it yourself, and when to stay in the car and call. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Slow down gradually, keep a firm grip on the wheel, and get well off the road before stopping. If you are on a highway shoulder with traffic passing close, stay in the vehicle with your seat belt on and call for help rather than changing it yourself.',
    sections: [
      {
        h2: 'The first ten seconds',
        paras: [
          'If a tire blows at speed, the car will pull hard toward that side. Hold the wheel firmly, ease off the accelerator and let the car slow gradually. Do not brake hard and do not jerk the wheel — both make it much harder to keep the car straight.',
          'Signal, and move toward the shoulder or an exit as smoothly as you can. Getting completely off the road matters more than stopping quickly.'
        ]
      },
      {
        h2: 'Deciding whether to change it yourself',
        paras: [
          'This decision is about location, not ability. A flat in a parking lot or a quiet residential street is a reasonable thing to handle yourself if you have a usable spare and the tools.',
          'A flat on a highway shoulder with traffic passing a few feet away is not. Being struck while changing a tire is a real danger, and no tire is worth it. In that situation, hazard lights on, seat belt fastened, stay in the vehicle and call.'
        ],
        list: [
          'Are you completely clear of traffic lanes?',
          'Is the ground firm and level enough for a jack?',
          'Do you have a usable spare, jack and lug wrench?',
          'Is visibility good, or is it dark or raining?',
          'Is the flat on the traffic side of the car?'
        ]
      },
      {
        h2: 'If you install a compact spare',
        paras: [
          'Temporary spares have real limits, usually around 50 mph and a restricted distance. Those limits are printed on the tire and they are not conservative suggestions.',
          'A compact spare is also a different diameter than your regular tires, which affects handling and, on some vehicles, drivetrain components. Get the proper tire dealt with promptly rather than running on the spare for weeks.'
        ]
      },
      {
        h2: 'Do not keep driving on a flat',
        paras: [
          'Driving on a flat tire destroys it within a very short distance and can damage the wheel itself. What might have been a repairable puncture becomes a new tire, and possibly a new wheel.',
          'If you cannot stop immediately, get to the nearest safe spot and stop there. A few hundred feet at low speed is survivable for the tire; a mile is not.'
        ]
      }
    ],
    relatedService: 'flat-tire',
    relatedArticles: ['can-a-punctured-tire-be-repaired', 'jump-start-vs-battery-replacement']
  },
// --------------------------------------------------------------------- COSTS
  {
    slug: 'what-affects-brake-repair-cost',
    cluster: 'costs',
    title: 'What affects the cost of a brake job?',
    metaTitle: 'What Affects Brake Repair Cost? | YBE Auto',
    metaDescription:
      'What actually drives the price of a brake job: pads only versus pads and rotors, calipers, and vehicle type. From YBE Auto Repair Center in Capitol Heights, MD.',
    shortAnswer:
      'The single biggest factor is how far the wear went before you came in. Pads alone is the cheapest brake job there is. Pads plus rotors costs more. Once a caliper seizes or a rotor scores badly, you are paying for parts that would still have been fine a few thousand miles earlier.',
    sections: [
      {
        h2: 'What you are actually paying for',
        paras: [
          'A brake job is not one price because it is not one repair. Front and rear are separate jobs, and each axle can need anything from pads only to pads, rotors, hardware and a caliper.',
          'Ask any shop to tell you which of those you are getting. A quote for "brakes" that does not say what is included cannot be compared against another quote for "brakes."'
        ],
        list: [
          'Pads only — the cheapest outcome, possible when rotors are still within spec',
          'Pads and rotors — the most common brake job on a car that waited',
          'Calipers — added when one seizes, sticks or leaks',
          'Hardware and fluid — small parts that stop noise and uneven wear coming back'
        ]
      },
      {
        h2: 'Why waiting costs more',
        paras: [
          'Brake pads have friction material on a steel backing plate. When the material wears away, the backing plate contacts the rotor directly. That is the grinding sound, and by the time you hear it the rotor is usually being cut.',
          'A pad set is the cheap part of the system. A rotor is not. Coming in when you first hear a squeal rather than a grind is often the difference between the two jobs, and it is entirely under your control.'
        ]
      },
      {
        h2: 'Vehicle differences are real',
        paras: [
          'A large SUV has bigger, heavier brake components than a compact sedan, and the parts cost more. Some vehicles need the electronic parking brake retracted with a scan tool before the rear pads can come out, which adds time.',
          'Performance and some European models use different rotor materials and wear sensors that have to be replaced along with the pads. None of this is upselling — it is what the vehicle requires.'
        ]
      },
      {
        h2: 'How to compare quotes honestly',
        paras: [
          'Get the quote broken into front and rear, and into parts and labor. Ask whether rotors are included or resurfaced. Ask whether the price covers one axle or both. Those three questions make two quotes comparable.',
          'A price that seems far lower than everyone else is usually quoting less work, not the same work cheaper.'
        ]
      }
    ],
    relatedService: 'brake-pad-rotor-replacement',
    relatedArticles: ['signs-brake-pads-need-replacement', 'what-affects-alignment-cost']
  },
  {
    slug: 'what-affects-transmission-repair-cost',
    cluster: 'costs',
    title: 'What affects the cost of transmission repair?',
    metaTitle: 'What Affects Transmission Repair Cost? | YBE Auto',
    metaDescription:
      'Why transmission prices vary so much: fluid service versus repair versus rebuild versus replacement, and what diagnosis decides. YBE Auto, Capitol Heights, MD.',
    shortAnswer:
      'Transmission work spans a wider price range than any other repair on a car, because "transmission problem" covers everything from a fluid service to replacing the whole unit. Which one you need is decided by diagnosis, not by the symptom, and the same symptom can point to either end of that range.',
    sections: [
      {
        h2: 'Four very different jobs',
        paras: [
          'People hear "transmission" and assume the worst. Often it is not the worst. The four outcomes differ by an order of magnitude, and diagnosis exists to tell them apart before anyone spends money.'
        ],
        list: [
          'Fluid and filter service — the cheapest outcome, and sometimes the whole fix',
          'External repair — solenoids, sensors, wiring or a leaking seal, done without opening the case',
          'Rebuild — the unit comes apart and worn internals are replaced',
          'Replacement — a remanufactured or used unit goes in'
        ]
      },
      {
        h2: 'Why diagnosis comes first and is worth paying for',
        paras: [
          'Slipping can be low fluid. It can also be worn clutch packs. Those two have nothing in common in cost, and no one can tell which by hearing the symptom described over the phone.',
          'A shop that quotes a rebuild before diagnosing is guessing, and the guess is always expensive. Paying for diagnosis is how you avoid paying for a rebuild you did not need.'
        ]
      },
      {
        h2: 'Rebuild or replace',
        paras: [
          'When internals are worn, the choice is rebuilding your unit or fitting a remanufactured one. Rebuilding keeps your original unit and can cost less on common vehicles. A remanufactured unit is often faster and comes with a parts warranty from the remanufacturer.',
          'The right answer depends on the vehicle, its mileage and how long you plan to keep it. A car with a tired engine and rust is a different decision from a clean car you intend to drive for another five years.'
        ]
      },
      {
        h2: 'The part you control',
        paras: [
          'Transmission fluid is not lifetime fluid, whatever the marketing says. Heat breaks it down, and stop-and-go driving in traffic is the hardest kind on it.',
          'Servicing fluid on schedule is the cheapest transmission work there is, and it is the only stage where you are choosing the price rather than being handed it.'
        ]
      }
    ],
    relatedService: 'transmission-repair',
    relatedArticles: ['signs-of-a-failing-transmission', 'transmission-repair-rebuild-or-replace']
  },
  {
    slug: 'what-affects-ac-repair-cost',
    cluster: 'costs',
    title: 'What affects the cost of car A/C repair?',
    metaTitle: 'What Affects Car A/C Repair Cost? | YBE Auto',
    metaDescription:
      'Why A/C repair prices vary: a recharge versus finding the leak, compressor replacement, and refrigerant type. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'A/C is a sealed system, so if it is low on refrigerant there is a leak somewhere. The cost depends almost entirely on where that leak is. A leaking O-ring is a small job. A leaking evaporator sits behind the dashboard and is one of the most labor-intensive repairs on the car.',
    sections: [
      {
        h2: 'A recharge is not a repair',
        paras: [
          'A can of refrigerant from a parts store will blow cold for a while. It is not a fix, because the refrigerant that leaked out will leak out again, and the additives in those cans can contaminate the system and complicate the real repair later.',
          'The question worth paying to answer is where the refrigerant is going. That is what leak detection does, and it is what turns an unknown bill into a known one.'
        ]
      },
      {
        h2: 'Location decides the price',
        paras: [
          'Everything in an A/C system carries the same refrigerant, but the parts are not equally easy to reach. This is the whole reason two cars with identical symptoms get very different quotes.'
        ],
        list: [
          'O-rings and hose fittings — accessible, and the least expensive leaks to fix',
          'Condenser — in front of the radiator, exposed to road debris, moderate labor',
          'Compressor — driven by the belt, more parts and more labor',
          'Evaporator — behind the dash, often requiring dash removal, the most expensive by far'
        ]
      },
      {
        h2: 'Refrigerant type matters more than it used to',
        paras: [
          'Older vehicles use R-134a. Most newer vehicles use R-1234yf, which costs substantially more per pound and needs separate equipment.',
          'This is why the same repair on a newer car can cost noticeably more than on an older one, even when the labor is identical. It is worth knowing which your vehicle takes before comparing prices.'
        ]
      },
      {
        h2: 'When a compressor fails, it is rarely alone',
        paras: [
          'A compressor that fails internally sends metal debris through the system. Replacing only the compressor puts a new part into a contaminated system, and it will fail again.',
          'A correct job replaces the compressor along with the receiver-drier or accumulator and flushes the lines. A quote that covers only the compressor is cheaper because it is doing less, not because it is a better deal.'
        ]
      }
    ],
    relatedService: 'ac-repair',
    relatedArticles: ['why-is-my-car-ac-blowing-warm', 'what-affects-diagnostic-cost']
  },
  {
    slug: 'what-affects-diagnostic-cost',
    cluster: 'costs',
    title: 'Why do shops charge for diagnostics?',
    metaTitle: 'Why Do Shops Charge For Diagnostics? | YBE Auto',
    metaDescription:
      'What a paid diagnosis buys that a free code read does not, and why it usually saves money. YBE Auto Repair Center in Capitol Heights, MD.',
    shortAnswer:
      'A free code read at a parts counter tells you which circuit reported a fault. A paid diagnosis tells you which part actually failed. Those are different answers, and the gap between them is the reason people replace sensors that were working fine.',
    sections: [
      {
        h2: 'What the free scan actually gives you',
        paras: [
          'A parts store scan pulls the stored code and hands you the description. That description names a circuit or a symptom — not a broken component.',
          'A code pointing at an oxygen sensor means readings from that circuit are out of range. That can be the sensor, a vacuum leak, an exhaust leak, wiring, or an engine genuinely running rich. Five causes, one code, wildly different repairs.'
        ]
      },
      {
        h2: 'What you are paying a technician to do',
        paras: [
          'Diagnostic time is testing, not reading. It is the difference between a guess and a decision, and it is the only part of the process that prevents you buying parts you did not need.'
        ],
        list: [
          'Reading freeze-frame data to see what the engine was doing when the fault set',
          'Testing the circuit itself — voltage, ground, signal — rather than assuming',
          'Checking for related faults that share one root cause',
          'Confirming the diagnosis before any part is ordered'
        ]
      },
      {
        h2: 'The arithmetic',
        paras: [
          'Replacing a sensor on a guess costs the part plus the labor to fit it. If the guess is wrong, that money is gone and the fault is still there — and the next guess starts from the same place.',
          'Paying once to know is almost always cheaper than paying twice to guess. On an intermittent fault, it is not close.'
        ]
      },
      {
        h2: 'Ask what happens to the fee',
        paras: [
          'Practice varies between shops, so ask directly: is the diagnostic fee applied toward the repair if you go ahead? Is there a set amount of time included, and what happens if the fault turns out to be deeper than that?',
          'Those are fair questions and any shop should answer them plainly before starting work.'
        ]
      }
    ],
    relatedService: 'check-engine-light-diagnostics',
    relatedArticles: ['why-is-my-check-engine-light-on', 'what-affects-transmission-repair-cost']
  },
  {
    slug: 'what-affects-oil-change-cost',
    cluster: 'costs',
    title: 'What affects the cost of an oil change?',
    metaTitle: 'What Affects Oil Change Cost? | YBE Auto',
    metaDescription:
      'Why oil change prices differ: conventional versus synthetic, capacity, filter type and what the vehicle actually requires. YBE Auto, Capitol Heights, MD.',
    shortAnswer:
      'Oil type and capacity account for most of the difference. Full synthetic costs more than conventional, and an engine holding eight quarts costs more to fill than one holding four. Neither is optional — the manufacturer specifies both, and using the cheaper oil in an engine that requires synthetic is a false economy.',
    sections: [
      {
        h2: 'The oil itself is most of the difference',
        paras: [
          'Conventional, synthetic blend and full synthetic differ in price per quart, and many modern engines require full synthetic. That is not a preference, it is a specification — turbocharged engines in particular run hot enough that conventional oil breaks down.',
          'Using the wrong grade to save money risks the engine, which makes it the most expensive way to save on an oil change.'
        ]
      },
      {
        h2: 'Capacity and filter',
        paras: [
          'A four-cylinder sedan might hold four and a half quarts. A V8 truck can hold eight or more. That difference alone is most of the price gap between two otherwise identical services.',
          'Filters vary too. Some are simple spin-on canisters; others are cartridge filters in housings that take longer to reach.'
        ]
      },
      {
        h2: 'What should be included',
        paras: [
          'An oil change is the one time a technician is under your car on a schedule. A shop that only drains and fills is wasting the most useful part of the visit.'
        ],
        list: [
          'A new filter every time, not every other time',
          'A check of the other fluid levels',
          'A look at tire condition and pressure',
          'A note of anything visibly wearing, so nothing surprises you later'
        ]
      },
      {
        h2: 'Interval matters more than price',
        paras: [
          'Chasing the cheapest possible oil change while stretching the interval is the wrong trade. Oil that has broken down does not protect the engine regardless of what you paid for it.',
          'Short trips and stop-and-go traffic are harder on oil than highway miles, which is exactly the driving most people do around Capitol Heights.'
        ]
      }
    ],
    relatedService: 'oil-change',
    relatedArticles: ['how-often-should-you-change-your-oil', 'what-affects-alignment-cost']
  },
  {
    slug: 'what-affects-alignment-cost',
    cluster: 'costs',
    title: 'What affects the cost of a wheel alignment?',
    metaTitle: 'What Affects Wheel Alignment Cost? | YBE Auto',
    metaDescription:
      'Two-wheel versus four-wheel alignment, worn parts that must be replaced first, and why alignment saves tire money. YBE Auto, Capitol Heights, MD.',
    shortAnswer:
      'A straightforward alignment is a set procedure at a set price. It goes up when the suspension has worn parts that must be replaced first, because you cannot hold an alignment on worn ball joints or tie rods — the adjustment will not stay where it was set.',
    sections: [
      {
        h2: 'Two-wheel or four-wheel',
        paras: [
          'A front-end alignment adjusts the front wheels only. A four-wheel alignment squares all four to the vehicle centerline and is what most modern cars with independent rear suspension need.',
          'The four-wheel version costs more because it is more work. On a vehicle that requires it, the two-wheel version is not a cheaper alternative — it is an incomplete job.'
        ]
      },
      {
        h2: 'Worn parts have to come first',
        paras: [
          'Alignment sets angles. If a tie rod end or ball joint is worn, those angles move as you drive and the alignment will not hold.',
          'A shop that finds worn steering or suspension parts should tell you before aligning, not after. Aligning a car with a worn tie rod means charging for work that will not last, and any honest shop will say so up front.'
        ]
      },
      {
        h2: 'What it saves you',
        paras: [
          'A car out of alignment scrubs tread off the tires every mile. A set of tires ruined early costs far more than the alignment that would have prevented it.',
          'The roads around Capitol Heights and the Beltway are hard on alignment — potholes and rough pavement knock it out, and the first sign is usually uneven wear on one edge of a front tire.'
        ],
        list: [
          'Pulling to one side on a flat road',
          'Steering wheel off-center when driving straight',
          'Wear on only the inner or outer edge of a tire',
          'A new set of tires — always align when fitting them'
        ]
      }
    ],
    relatedService: 'wheel-alignment',
    relatedArticles: ['why-does-my-car-pull-to-one-side', 'what-affects-brake-repair-cost']
  },
  {
    slug: 'what-affects-battery-alternator-cost',
    cluster: 'costs',
    title: 'What affects the cost of battery and alternator work?',
    metaTitle: 'What Affects Battery And Alternator Cost? | YBE Auto',
    metaDescription:
      'Why battery and charging prices vary: battery type, registration on newer cars, and telling a battery fault from an alternator. YBE Auto, Capitol Heights, MD.',
    shortAnswer:
      'Testing first is what controls the cost. A battery and an alternator produce nearly identical symptoms, and replacing the wrong one means paying twice and still being stranded. Battery prices themselves vary by type, and many newer cars require the new battery to be registered to the charging system.',
    sections: [
      {
        h2: 'Same symptom, two very different parts',
        paras: [
          'A weak crank, dim lights and a no-start can come from a dying battery or a failing alternator. Guessing between them is a coin flip on a bill.',
          'A charging-system test settles it in minutes: it checks whether the battery holds a charge and whether the alternator is actually producing one. That test is the cheapest step in the whole process.'
        ]
      },
      {
        h2: 'Not all batteries are the same price',
        paras: [
          'Conventional flooded batteries cost the least. Vehicles with engine stop-start systems usually require AGM batteries, which cost more and are not optional — a standard battery in a stop-start car fails early.',
          'Group size, cold-cranking amps and where the battery physically sits all vary. Some are under a seat or in the trunk, which adds labor.'
        ]
      },
      {
        h2: 'Battery registration on newer cars',
        paras: [
          'Many recent vehicles monitor battery age and adjust charging to suit. Fitting a new battery without registering it to the system means the car keeps charging as if the battery were old, which shortens the new one’s life.',
          'It is a quick step with the right scan tool, and skipping it is a common reason a new battery does not last as long as it should.'
        ]
      },
      {
        h2: 'When the alternator is the answer',
        paras: [
          'An alternator that is not charging will kill a brand-new battery within days. If your battery was replaced recently and the car is dead again, the charging system is the place to look.',
          'Warning signs include a battery light on the dash, headlights that dim at idle and brighten when you rev, and electrical accessories behaving strangely.'
        ]
      }
    ],
    relatedService: 'battery-alternator-starter',
    relatedArticles: ['jump-start-vs-battery-replacement', 'what-affects-diagnostic-cost']
  },
  {
    slug: 'what-affects-body-repair-cost',
    cluster: 'costs',
    title: 'What affects the cost of auto body repair?',
    metaTitle: 'What Affects Auto Body Repair Cost? | YBE Auto',
    metaDescription:
      'What drives collision and dent repair pricing: panel damage, paint blending, and repair versus replace. YBE Auto Repair Center, Capitol Heights, MD.',
    shortAnswer:
      'Two things drive body repair pricing: whether the panel can be repaired or has to be replaced, and how much paint work the color match requires. A dent in the middle of a door panel is a very different job from the same dent on a body line or an edge.',
    sections: [
      {
        h2: 'Repair or replace the panel',
        paras: [
          'A shallow dent in flat sheet metal with the paint intact can often be worked out. Once the metal is stretched, creased along a body line, or the paint is broken, the calculation changes.',
          'Sometimes replacing a panel is genuinely cheaper than the hours it would take to bring the original back correctly. A shop should tell you which it is and why.'
        ]
      },
      {
        h2: 'Paint is usually the bigger half',
        paras: [
          'Matching automotive paint is not simply ordering your color code. Paint fades with sun exposure, so a factory-code match on a ten-year-old car will not match the panels beside it.',
          'This is why painters blend into adjacent panels — so the eye never catches an edge. Blending costs more than spraying one panel, and it is the difference between a repair you cannot see and one you can spot from across a parking lot.'
        ],
        list: [
          'Metallic and pearl finishes are harder to match than solid colors',
          'Three-stage paints add a step and cost more',
          'Sun-faded paint means blending into neighbouring panels',
          'Edge-to-edge spraying is cheaper and shows'
        ]
      },
      {
        h2: 'What is behind the panel',
        paras: [
          'Visible damage is only the estimate’s starting point. Impacts push into what sits behind the panel — brackets, mounts, sensors and wiring — and none of that shows in a photo.',
          'Modern bumpers in particular carry parking sensors and cameras that may need replacing and recalibrating. A quote given from a photograph is a guess until the panel comes off.'
        ]
      },
      {
        h2: 'Questions worth asking',
        paras: [
          'Ask whether the quote assumes repair or replacement, whether paint will be blended into adjacent panels, and what happens if hidden damage turns up once the panel is off.',
          'A shop that has already thought about the third question will tell you how they handle it rather than being surprised by it.'
        ]
      }
    ],
    relatedService: 'collision-body-repair',
    relatedArticles: ['what-affects-brake-repair-cost', 'what-affects-ac-repair-cost']
  }
];

/**
 * Remaining questions from the brief, held back deliberately.
 * Publish these in controlled batches rather than all at once, so each one gets
 * real content instead of becoming a thin keyword page.
 */
const PLANNED_EXPANSION = [
  'Can I drive with a flashing check-engine light?',
  'Why does my car shake while idling?',
  'Why does the steering wheel shake while braking?',
  'Brake pads versus pads and rotors',
  'Why is my transmission slipping?',
  'What causes delayed shifting?',
  'What causes uneven tire wear?',
  'How often should tires be rotated?',
  'Signs of a coolant leak',
  'A/C recharge versus actual A/C repair',
  'What should you do when your car will not start?',
  'When can a mobile mechanic fix the problem roadside?'
];

articles.forEach((a) => {
  a.url = `/car-care/${a.slug}/`;
  if (!a.h1) a.h1 = a.title;
});

clusters.forEach((c) => {
  c.articles = articles.filter((a) => a.cluster === c.slug);
});

const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

module.exports = { articles, clusters, articleBySlug, PLANNED_EXPANSION };
