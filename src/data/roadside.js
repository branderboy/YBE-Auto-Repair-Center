/**
 * ROADSIDE ASSISTANCE
 *
 * Lives at /roadside-assistance/ rather than under /services/ because the
 * intent is different: these visitors are stranded right now. Every page here
 * leads with calling, keeps forms short, and carries the safety notice.
 *
 * IMPORTANT: YBE provides roadside assistance, NOT towing. Nothing in this file
 * may imply otherwise.
 */

const hub = {
  slug: 'roadside-assistance',
  title: 'Roadside Assistance',
  navLabel: 'Roadside Assistance',
  metaTitle: 'Roadside Assistance in Capitol Heights, MD | YBE Auto',
  metaDescription:
    'Stranded? YBE provides mobile roadside assistance for dead batteries, flat tires, lockouts and fuel in Capitol Heights, MD and nearby areas. Call (202) 455-3822.',
  intro: [
    'If you are stuck on the side of the road right now, calling is faster than anything else on this page. We answer the shop phone seven days a week from 8:30 AM to 6:00 PM.',
    'YBE has been sending mobile help to drivers around Capitol Heights, DC and Prince George’s County for years. Dead batteries, flat tires, lockouts, running out of fuel, and vehicles that will not start are the calls we get most, and most of them can be handled where the vehicle sits.',
    'What we cannot do is tow. If the vehicle needs to come off the road entirely, we will tell you that honestly so you can arrange a tow instead of waiting on help that will not solve the problem.'
  ],
  covers: [
    'Jump starts',
    'Flat-tire assistance and spare installation',
    'Mobile battery replacement',
    'Fuel delivery',
    'Vehicle lockouts',
    'Mobile diagnostics',
    'Minor roadside repairs'
  ],
  services: [
    {
      slug: 'jump-start',
      title: 'Jump-Start Service',
      navLabel: 'Jump Start',
      metaTitle: 'Jump Start Service in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Dead battery? YBE provides mobile jump-start service around Capitol Heights, MD. Open seven days a week. Call or text (202) 455-3822 for help now.',
      customerVoice: 'My battery is dead and I need a jump.',
      problem: [
        'You turn the key and get a click, or the dash lights flicker and fade. Maybe the lights were left on, maybe it is cold, or maybe the battery has been getting weaker for a while and today it finally quit.',
        'A jump start gets you moving. What it does not do is tell you whether the battery will hold a charge tomorrow, which is why we check rather than just jumping it and driving away.'
      ],
      whatWeDo: [
        'We come to the vehicle and jump-start it using proper equipment and connection points. Jumping a modern vehicle incorrectly can damage electronics, which is a good reason not to accept a jump from a stranger with an unknown set of cables.',
        'Once it is running, we test the battery and the charging system on the spot. That tells you whether you just had a bad night or whether the battery or alternator is on its way out.',
        'If the battery is done, we can often replace it right there. If the alternator is the problem, we will tell you, because a jump start on a failing alternator only buys you a few miles.'
      ],
      warningSigns: [
        'A single click or rapid clicking when you turn the key',
        'Dash lights dimming or going out while cranking',
        'Slow, labored cranking before it quit',
        'You have needed a jump recently',
        'Interior lights very dim or not coming on',
        'The battery is more than a few years old'
      ],
      includes: [
        'Mobile jump start at your location',
        'Correct connection procedure for modern vehicles',
        'On-the-spot battery test',
        'Charging-system check to see if the alternator is keeping up',
        'Mobile battery replacement if the battery has failed',
        'An honest answer about whether you can drive it or should have it looked at'
      ],
      whyNotIgnore: [
        'A battery that needed a jump once will usually need one again. The second time is rarely somewhere convenient.',
        'If the alternator is the actual problem, the car will run until the battery is drained and then stop, which can happen in traffic rather than in a parking space.'
      ],
      related: ['mobile-battery-replacement', 'roadside-mobile-diagnostics', 'battery-alternator-starter']
    },
    {
      slug: 'flat-tire',
      title: 'Flat-Tire Assistance',
      navLabel: 'Flat Tire',
      metaTitle: 'Flat Tire Help in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Flat tire? YBE provides roadside flat-tire assistance and spare installation around Capitol Heights, MD. Open seven days. Call (202) 455-3822.',
      customerVoice: 'I have a flat tire and I am stuck.',
      problem: [
        'A blowout on the highway or a tire that went flat in a parking lot. Either way you are stopped, and either you do not have the tools, do not have a usable spare, or are somewhere it is not safe to be kneeling beside your car.',
        'If you are on a shoulder with traffic passing close, stay in the vehicle with your seat belt on and call. That situation is worth handling differently than a flat in a driveway.'
      ],
      whatWeDo: [
        'We come out and install your spare so you can get moving, or assess whether the tire itself can be handled on site. Many punctures in the tread can be dealt with; sidewall damage cannot be repaired safely.',
        'If your spare is a compact temporary, we will tell you the speed and distance limits that go with it. Those limits are real, and driving a temporary spare like a full tire is how people end up stranded twice in one day.',
        'If the tire needs replacing, we can take it from there at the shop, including mounting, balancing and checking why it failed.'
      ],
      warningSigns: [
        'A sudden bang followed by the car pulling hard to one side',
        'Thumping or flapping noise from one corner',
        'Tire pressure warning light with the car handling oddly',
        'Visibly flat or shredded tire',
        'A tire that keeps going flat over days',
        'No spare, no jack, or a spare that is also flat'
      ],
      includes: [
        'Roadside spare-tire installation',
        'Assessment of whether the tire is repairable',
        'Guidance on temporary-spare speed and distance limits',
        'Pressure check on the installed spare',
        'Follow-up tire repair or replacement at the shop',
        'Safety guidance if you are stopped in an unsafe location'
      ],
      whyNotIgnore: [
        'Driving on a flat destroys the tire in a short distance and can damage the wheel, turning a tire bill into a tire and wheel bill.',
        'Standing beside a car on a busy shoulder is genuinely dangerous. If the location is not safe, call 911 first and us second.'
      ],
      related: ['tire-repair-replacement', 'roadside-mobile-repairs', 'wheel-alignment']
    },
    {
      slug: 'mobile-battery-replacement',
      title: 'Mobile Battery Replacement',
      navLabel: 'Battery Replacement',
      metaTitle: 'Mobile Battery Replacement in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Battery will not hold a charge? YBE replaces car batteries on location around Capitol Heights, MD. Open seven days. Call or text (202) 455-3822.',
      customerVoice: 'My battery keeps dying and I need it replaced.',
      problem: [
        'The jump start worked, and then two days later you were back where you started. Or the car has been cranking slower every morning for a couple of weeks and this morning it did not crank at all.',
        'A battery that no longer holds a charge does not recover. Once it is at that stage, replacing it where the car sits is usually easier than arranging to get the car to a shop.'
      ],
      whatWeDo: [
        'We test the battery under load first to confirm it has actually failed, and we test the charging system so you are not replacing a battery that a bad alternator will kill again next week.',
        'If the battery is the problem, we replace it on location with the correct group size and specification for your vehicle, and we clean up the terminals and cable ends. Corroded connections cause the same symptoms as a dead battery.',
        'On vehicles that need it, we handle the electrical steps that go with a battery change so the car does not come back with warning lights or lost settings.'
      ],
      warningSigns: [
        'The battery goes dead again within a few days of a jump',
        'Cranking gets slower each morning',
        'Battery warning light on the dash',
        'Visible corrosion or swelling on the battery case',
        'Electrical accessories behaving strangely',
        'The battery is several years old and has been jumped before'
      ],
      includes: [
        'On-site load testing to confirm battery failure',
        'Charging-system test so the real cause is not missed',
        'Battery replacement at your location with the correct specification',
        'Terminal and cable cleaning',
        'Post-installation electrical checks where the vehicle requires them',
        'Disposal of the old battery'
      ],
      whyNotIgnore: [
        'A failing battery makes the starter and alternator work harder, so replacing it late often means replacing more than just the battery.',
        'It also strands you without much warning. Batteries tend to go from "a little slow" to "nothing" over a single cold night.'
      ],
      related: ['jump-start', 'battery-alternator-starter', 'no-start-diagnostics']
    },
    {
      slug: 'fuel-delivery',
      title: 'Emergency Fuel Delivery',
      navLabel: 'Fuel Delivery',
      metaTitle: 'Emergency Fuel Delivery in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Out of gas? YBE brings emergency fuel to drivers around Capitol Heights, MD. Open seven days a week. Call or text (202) 455-3822 for help.',
      customerVoice: 'I ran out of gas.',
      problem: [
        'The gauge was optimistic, traffic was worse than expected, or the low-fuel light had been on longer than you meant it to be. Now you are stopped somewhere you did not plan to stop.',
        'It happens to careful drivers too, particularly when a fuel gauge or sending unit is not reading accurately.'
      ],
      whatWeDo: [
        'We bring enough fuel to get you to a station, and we make sure the vehicle starts and runs before we leave. Running completely dry can occasionally cause a car to need a little more than fuel to restart.',
        'If it will not start after refueling, we can check on the spot whether something else is going on. Running out of fuel sometimes exposes a fuel pump that was already weak.',
        'If your gauge was reading incorrectly, that is worth mentioning to us. A faulty sending unit will put you in the same position again.'
      ],
      warningSigns: [
        'The engine sputtered and lost power before stopping',
        'The fuel gauge reads empty or is not moving at all',
        'The low-fuel light has been on for a while',
        'The car cranks normally but will not start',
        'The gauge has been reading inconsistently',
        'The engine restarts briefly and dies again'
      ],
      includes: [
        'Emergency fuel delivered to your location',
        'Restart confirmation before we leave',
        'A quick check if the vehicle still will not start after fueling',
        'Guidance on fuel-gauge or sending-unit problems',
        'Follow-up fuel-system diagnosis at the shop if needed',
        'Safety guidance if you are stopped in traffic'
      ],
      whyNotIgnore: [
        'Repeatedly running the tank very low is hard on the fuel pump, which relies on fuel to stay cool. Drivers who habitually run on empty tend to replace fuel pumps sooner.',
        'If the gauge is the problem rather than your planning, that is a repair worth doing before it strands you somewhere worse.'
      ],
      related: ['roadside-mobile-diagnostics', 'roadside-mobile-repairs', 'check-engine-light-diagnostics']
    },
    {
      slug: 'car-lockout',
      title: 'Vehicle Lockout Assistance',
      navLabel: 'Car Lockout',
      metaTitle: 'Car Lockout Assistance in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Locked out of your car? YBE provides vehicle lockout assistance around Capitol Heights, MD. Open seven days a week. Call (202) 455-3822.',
      customerVoice: 'I locked my keys in the car.',
      problem: [
        'The keys are on the seat, the doors are locked, and you are standing outside the car. Sometimes it is worse than inconvenient: a running engine, groceries in the back, or a hot day.',
        'If a child or a pet is locked inside the vehicle, call 911 first. That is an emergency and it should not wait on anyone’s arrival time, including ours.'
      ],
      whatWeDo: [
        'We come out and open the vehicle using tools intended for the job, working to avoid damage to the door, weather seals and window mechanisms.',
        'We do ask for proof that the vehicle is yours before opening it. That is not a formality we can skip, and any service that does not ask should concern you.',
        'If the lockout happened because a lock, latch or key fob is failing rather than simple bad luck, we can look at that at the shop.'
      ],
      warningSigns: [
        'Keys visible inside a locked vehicle',
        'A key fob that has stopped unlocking the doors',
        'Door locks that stick or work intermittently',
        'A door that will not unlock from inside or outside',
        'The vehicle locked itself automatically',
        'A broken or worn key that no longer turns'
      ],
      includes: [
        'Mobile lockout assistance at your location',
        'Entry using appropriate tools with care for the door and seals',
        'Verification of vehicle ownership before entry',
        'A check that locks and latches work correctly afterward',
        'Advice on failing fobs, locks or latches',
        'Follow-up lock or latch repair at the shop if needed'
      ],
      whyNotIgnore: [
        'Forcing a door with improvised tools is how bent frames, torn weather seals and damaged window regulators happen. The damage usually costs more than the lockout call.',
        'If the locks themselves are failing, the next lockout may happen with the keys in your hand.'
      ],
      related: ['roadside-mobile-repairs', 'wiring-sensors-fuses', 'roadside-mobile-diagnostics']
    },
    {
      slug: 'roadside-mobile-diagnostics',
      title: 'Mobile Auto Diagnostics',
      navLabel: 'Mobile Diagnostics',
      metaTitle: 'Mobile Auto Diagnostics in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Car broke down and you do not know why? YBE brings diagnostics to your location around Capitol Heights, MD. Call or text (202) 455-3822.',
      customerVoice: 'My car stopped and I do not know what is wrong.',
      problem: [
        'The car quit, or a warning light came on and you are not sure whether it is safe to keep driving. You are somewhere unfamiliar and the decision you need to make is simple: drive it, or do not.',
        'Guessing that one wrong is expensive in both directions. Driving an overheating engine can destroy it; abandoning a car over a minor fault costs you a day and a tow you did not need.'
      ],
      whatWeDo: [
        'We come to the vehicle, scan for stored codes, and check the things most likely to leave someone stranded: battery and charging, starting circuit, cooling system, fuel delivery and obvious leaks.',
        'The goal on the roadside is a decision, not a full teardown. Is this something we can fix here, something you can safely drive to the shop, or something that should not be driven at all?',
        'If it can be repaired on site, we often can. If it needs the shop, you will know that before you have spent money finding out the hard way.'
      ],
      warningSigns: [
        'The car stopped running with no clear explanation',
        'A warning light came on and you are unsure if it is safe to drive',
        'Temperature gauge climbing into the red',
        'New noises, smells or smoke while driving',
        'The vehicle is running but clearly not right',
        'It started, stalled, and now will not restart'
      ],
      includes: [
        'Mobile code scan and live-data check at your location',
        'Battery, charging and starting-circuit testing',
        'Cooling-system and leak inspection',
        'Fuel-delivery basics where the symptom points there',
        'A clear drive-it or do-not-drive-it answer',
        'On-site repair where the fault allows it'
      ],
      whyNotIgnore: [
        'The most expensive roadside mistake is driving a car that should have been shut off, particularly with an overheating engine or a serious oil-pressure warning.',
        'Knowing what is wrong also means you are not paying to move a vehicle that could have been fixed where it sat.'
      ],
      related: ['roadside-mobile-repairs', 'jump-start', 'no-start-diagnostics']
    },
    {
      slug: 'roadside-mobile-repairs',
      title: 'Minor Mobile Auto Repairs',
      navLabel: 'Minor Mobile Repairs',
      metaTitle: 'Mobile Minor Auto Repairs in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Some breakdowns can be fixed where you are. YBE handles minor mobile repairs around Capitol Heights, MD. Open seven days. Call (202) 455-3822.',
      customerVoice: 'Can you fix it here instead of moving the car?',
      problem: [
        'Not every breakdown needs to end with the car going somewhere on a truck. A fair number of the calls we get are for problems that can be repaired in a parking lot or a driveway in under an hour.',
        'Batteries, cables, connections, belts, hoses, fuses and simple electrical faults are all things that strand people and all things that can often be sorted out on location.'
      ],
      whatWeDo: [
        'We diagnose first so the repair addresses the actual fault, then handle what can reasonably and safely be done where the vehicle is.',
        'That typically covers battery and cable replacement, corroded connections and grounds, blown fuses and relays, some belt and hose failures, and minor electrical faults that keep a car from starting or running.',
        'When a repair is not appropriate to do at the roadside, we say so. Some jobs need a lift, proper support or specific equipment, and doing them in a parking lot is not safe for anyone.'
      ],
      warningSigns: [
        'The car quit but the failure seems small and specific',
        'A belt broke or came off',
        'A hose is leaking coolant',
        'An accessory or system stopped working suddenly',
        'A fuse blew and the car will not start',
        'A battery cable or connection is visibly corroded or loose'
      ],
      includes: [
        'On-site diagnosis before any parts are replaced',
        'Battery, cable and connection repair',
        'Fuse and relay replacement',
        'Belt and hose repair where the situation allows',
        'Minor electrical fault repair',
        'A straight answer when a job should not be done at the roadside'
      ],
      whyNotIgnore: [
        'A temporary roadside fix is exactly that. If we patch something to get you home, follow up at the shop rather than treating it as finished.',
        'Problems like a slipping belt or a weeping hose almost always come back, usually further from home than the first time.'
      ],
      related: ['roadside-mobile-diagnostics', 'jump-start', 'flat-tire']
    }
  ]
};

hub.url = `/${hub.slug}/`;
hub.services.forEach((svc) => {
  svc.url = `/${hub.slug}/${svc.slug}/`;
  svc.isRoadside = true;
});

const roadsideBySlug = Object.fromEntries(hub.services.map((s) => [s.slug, s]));

module.exports = { hub, roadsideBySlug };
