/**
 * ELEMENT 3: TOPICAL RELEVANCE, PRICE GUIDES
 *
 * Source: "Price Guides To Create" and "Top Questions In His Field" tabs of
 * ybe-auto-seo-and-gmb-research-2026-11-13.xlsx (supplied by the owner).
 *
 * Rules:
 *  - Every dollar figure is a published market range from the sources named on
 *    the guide. None of them is presented as YBE's own price. YBE quotes its
 *    price for the specific car before work starts.
 *  - Every FAQ is a question from the research sheet, answered in the first
 *    sentence, and rendered visibly with FAQPage markup for exactly those
 *    questions.
 *  - Guides render through the same article template as /car-care/, in their
 *    own cluster, so they share navigation, schema and internal linking.
 */

const UPDATED = '2026-11-13';

const S = {
  airtasker: { name: 'Airtasker US, mobile mechanic cost guide', url: 'https://www.airtasker.com/us/costs/mobile-mechanic/how-much-does-a-mobile-mechanic-cost/' },
  zarla: { name: 'Zarla, how much mobile mechanics charge', url: 'https://www.zarla.com/guides/how-much-do-mobile-mechanics-charge' },
  thepricerBattery: { name: 'ThePricer, car battery replacement cost (RepairPal figures)', url: 'https://thepricer.org/car-battery-replacement-cost/' },
  thepricerStarter: { name: 'ThePricer, starter replacement cost (RepairPal and KBB figures)', url: 'https://thepricer.org/starter-replacement-cost/' },
  costflock: { name: 'CostFlock, brake replacement cost', url: 'https://costflock.com/auto/brake-replacement-cost/' },
  towpal: { name: 'Towpal, tire change pricing', url: 'https://towpal.com/tire-change' },
  flatTireAustin: { name: 'Flat Tire Austin, gas delivery pricing', url: 'https://flattireaustin.com/gas-delivery/' },
  goclaver: { name: 'GoClaver, 2026 locksmith cost guide', url: 'https://goclaver.com/guides/locksmith-cost' },
  insurify: { name: 'Insurify, locked keys in car', url: 'https://insurify.com/car-insurance/knowledge/locked-keys-in-car/' },
  cltmobile: { name: 'CLT Mobile, alternator replacement cost (KBB and RepairPal figures)', url: 'https://cltmobile.com' },
  consumerAuto: { name: 'Consumer Auto, 2026 junk car value guide', url: 'https://consumerauto.us' },
  repairpalGas: { name: 'RepairPal, does running out of gas damage your car', url: 'https://repairpal.com/blog/running-out-of-gas-damage-car' },
  kbbJump: { name: 'Kelley Blue Book, how to jump start a battery', url: 'https://www.kbb.com/car-advice/how-to-jump-start-battery/' },
  mavis: { name: 'Mavis, when to replace your brake pads', url: 'https://www.mavis.com/learning-center/when-to-replace-your-brake-pads/' },
  oha: { name: 'OHA Roadside, how far can you drive on a spare', url: 'https://oha-roadside.com/guides/how-far-can-you-drive-on-a-spare/' }
};
const named = (name) => ({ name });

const priceGuides = [
  // ------------------------------------------------------------ MOBILE MECHANIC
  {
    slug: 'mobile-mechanic-cost',
    title: 'How much does a mobile mechanic cost?',
    metaTitle: 'How Much Does a Mobile Mechanic Cost? | YBE Auto',
    metaDescription:
      'Mobile mechanic prices run about $80 to $1,000+, with most jobs at $150 to $200. What moves the price, and when the shop is cheaper. Call (202) 455-3822.',
    shortAnswer:
      'Most mobile mechanic jobs cost $150 to $200, with labor at $75 to $100 an hour. Small jobs start around $80, and bigger repairs with expensive parts can pass $1,000. The job, the parts and the distance set the price.',
    price: {
      low: '$80',
      typical: '$150 to $200 per job; labor $75 to $100 an hour',
      high: '$1,000+'
    },
    factors: [
      'The job itself: a battery swap and a starter replacement are very different amounts of work',
      'Parts choice: a part you supply, an OEM part, or a premium part',
      'Vehicle class: trucks, SUVs and European cars usually cost more',
      'Travel distance to where the car sits',
      'After-hours calls'
    ],
    sections: [
      {
        h2: 'What you are paying for',
        paras: [
          'A mobile visit bundles three things: the mechanic’s time, the parts, and getting to you. The time and parts are the same as at a shop. The trip is the added piece, which is why small jobs feel expensive on a mobile call and bigger ones often do not.',
          'Some mobile mechanics charge a flat call-out fee, others build travel into the hourly rate. Ask which before they come out.'
        ]
      },
      {
        h2: 'Mobile or the shop',
        paras: [
          'Mobile service makes sense when the car will not move or when time matters more than the last few dollars: a dead battery in a work parking lot, a starter that quit in a driveway.',
          'When the car still drives, bringing it to the shop is usually the cheaper route, and anything that needs a lift is a shop job anyway. YBE does both: roadside help around Capitol Heights, and the full shop at 8632 Edgeworth Dr.'
        ]
      }
    ],
    faqs: [
      { q: 'How much do mobile mechanics charge per hour?', a: 'Published guides put mobile mechanic labor at about $75 to $100 an hour. Parts, travel and any call-out fee are added on top.' },
      { q: 'Do mobile mechanics charge more than garages for the same job?', a: 'Often a little more, because travel is part of the bill. On small jobs that difference is noticeable; on larger repairs it is a small share of the total.' },
      { q: 'Are there jobs mobile mechanics can’t do at your location?', a: 'Yes. Work that needs a lift, heavy equipment or a controlled space, such as transmission replacement, major engine work or alignment, has to be done at a shop. A good mobile mechanic tells you that before coming out.' },
      { q: 'When is it not worth hiring a mobile mechanic?', a: 'When the car drives safely to a shop, when the job needs a lift, or when the diagnosis is unclear and may lead to a larger repair. In those cases you often pay for the trip and still end up at a shop.' }
    ],
    sources: [S.airtasker, S.zarla, named('ThePricer'), named('AutoNation Mobile Service')],
    relatedService: 'roadside-mobile-repairs',
    relatedArticles: ['no-start-diagnosis-cost', 'jump-start-cost', 'what-affects-diagnostic-cost']
  },

  // ------------------------------------------------------------ NO-START DIAGNOSIS
  {
    slug: 'no-start-diagnosis-cost',
    title: 'How much does a no-start diagnosis cost?',
    metaTitle: 'How Much Does a No-Start Diagnosis Cost? | YBE Auto',
    metaDescription:
      'A no-start diagnosis typically costs $80 to $150. What the test covers, why it is worth paying for, and the signs to watch for. Call (202) 455-3822.',
    shortAnswer:
      'A no-start diagnosis usually costs $80 to $150, with $75 at the low end. The price depends on whether it is done at the shop or where the car sits, whether the fee is credited toward the repair, and how much electrical testing the fault takes.',
    price: { low: '$75', typical: '$80 to $150', high: '$150' },
    factors: [
      'Mobile visit or shop visit',
      'Whether the diagnostic fee is credited toward the repair',
      'How much electrical testing it takes to find the fault'
    ],
    sections: [
      {
        h2: 'Why the test is worth paying for',
        paras: [
          'A car that will not start has a short list of likely causes: battery, connections, starter, alternator, fuel delivery or the security system. Guessing among them is how people buy a battery they did not need.',
          'A proper test checks the battery’s condition, the charging output and the starter circuit, and reads any stored codes. That usually points at one part, and you pay for one part.'
        ]
      }
    ],
    faqs: [
      { q: 'Why won’t my car start but the lights and radio come on?', a: 'Lights and radio need very little current; the starter needs a lot. A battery that is weak, or a corroded or loose cable, can run the lights and still fail to crank the engine. A clicking sound with bright lights points more toward the starter or its connection.' },
      { q: 'How do I know if my car starter is going bad?', a: 'Common signs are a single click when you turn the key, grinding or whirring without the engine turning, slow cranking with a healthy battery, and a car that starts only some of the time. A starter test confirms it.' },
      { q: 'How do I know if my alternator or battery is bad?', a: 'If the car starts after a jump and then dies again soon after, the alternator is the likely cause. If it starts fine after a jump and keeps running, the battery is more likely the problem. A battery and charging-system test settles it in minutes.' }
    ],
    sources: [S.zarla, S.airtasker, named('YourMechanic via ThePricer')],
    relatedService: 'no-start-diagnostics',
    relatedArticles: ['why-wont-my-car-start', 'car-battery-replacement-cost', 'starter-replacement-cost']
  },

  // ------------------------------------------------------------ JUMP START
  {
    slug: 'jump-start-cost',
    title: 'How much does a jump start cost?',
    metaTitle: 'How Much Does a Jump Start Cost? | YBE Auto',
    metaDescription:
      'Roadside jump starts are posted at about $59 to $125, most often $69 to $89. What changes the price and how long to drive after. Call (202) 455-3822.',
    shortAnswer:
      'Roadside providers post jump-start prices from about $59 to $125, with $69 to $89 most common. There is no national price guide for jump starts, so these are published flat rates from individual providers, mostly in Texas markets.',
    price: {
      low: '$59 to $60',
      typical: '$69 to $89',
      high: '$125',
      note: 'Published provider flat rates. No national guide range exists for jump starts.'
    },
    factors: [
      'Time of day: after-hours fees',
      'Vehicle size, and diesel or dual-battery vehicles',
      'Distance to the car',
      'Some providers waive the fee when you buy a battery on the same visit'
    ],
    sections: [
      {
        h2: 'A jump is not a fix',
        paras: [
          'A jump start gets the engine running. It does not tell you whether the battery will hold a charge tomorrow, or whether the alternator is charging at all.',
          'That is why YBE tests the battery and charging system once the car is running. If the battery has failed, it can often be replaced on the spot.'
        ]
      }
    ],
    faqs: [
      { q: 'How do you jump start a car?', a: 'With both cars off, connect red to the dead battery’s positive terminal, red to the good battery’s positive, black to the good battery’s negative, and the last black clamp to bare metal on the dead car away from the battery. Start the good car, wait a few minutes, then start the dead one. Remove the clamps in reverse order. Check the owner’s manual first, since some cars have specific jump points.' },
      { q: 'How long should you drive after a jump start?', a: 'Plan on at least 30 minutes of steady driving so the alternator can put charge back into the battery. Short stop-and-go trips may not be enough, and a battery that needed a jump should be tested.' },
      { q: 'How long should you leave jumper cables connected?', a: 'Let the running car charge the dead battery for a few minutes before trying to start it. Once the dead car starts, remove the cables in reverse order right away. If it will not start after a few tries, stop: the problem may not be the battery.' }
    ],
    sources: [named('Haulnado'), named('David’s Tire and Battery'), named('RapidFix AutoHub'), named('J’s Roadside'), S.kbbJump],
    relatedService: 'jump-start',
    relatedArticles: ['jump-start-vs-battery-replacement', 'car-battery-replacement-cost', 'no-start-diagnosis-cost']
  },

  // ------------------------------------------------------------ BATTERY
  {
    slug: 'car-battery-replacement-cost',
    title: 'How much does car battery replacement cost?',
    metaTitle: 'How Much Does Car Battery Replacement Cost? | YBE Auto',
    metaDescription:
      'Car battery replacement runs about $110 to $595. Why sources disagree, what moves the price, and how long a battery lasts. Call (202) 455-3822.',
    shortAnswer:
      'Car battery replacement costs about $110 at the low end and up to $595. Sources disagree on the middle: RepairPal puts it at $449 to $486, while posted shop prices run $150 to $390 with a median of $150. The battery type and the vehicle make most of the difference.',
    price: {
      low: '$110 to $120',
      typical: 'RepairPal $449 to $486; posted shop prices $150 to $390, median $150',
      high: '$595'
    },
    factors: [
      'Battery type: standard flooded or AGM',
      'Vehicle class',
      'Battery registration, required on many European cars',
      'Core charge of $10 to $25 if the old battery is not returned',
      'How hard the battery is to reach'
    ],
    sections: [
      {
        h2: 'Check the alternator before you buy',
        paras: [
          'A new battery will not survive an alternator that is not charging. If the car died again soon after a jump or a recent battery, test the charging system first.',
          'YBE’s mobile battery service tests the battery and charging system where the car sits, fits the right battery on site and takes the old one away.'
        ]
      }
    ],
    faqs: [
      { q: 'How long does a car battery last?', a: 'Most car batteries last about three to five years. Heat, short trips and cars that sit for long periods shorten that.' },
      { q: 'How do I know if my car battery is going bad?', a: 'Slow cranking, dim lights at startup, a battery warning light, needing jumps, and a battery older than three years are the usual signs. Corrosion on the terminals or a swollen case are also warnings.' },
      { q: 'Can I replace my car battery myself?', a: 'On many older cars, yes, with basic tools and care: disconnect negative first and reconnect it last. Newer cars may need the battery registered with a scan tool or have the battery under a seat or in the trunk, which makes a shop or mobile service the easier route.' },
      { q: 'When should I replace my car battery?', a: 'Replace it when a test shows it can no longer hold enough charge, or when it is past three to five years and showing signs of weakness. Testing before winter catches most failures before they strand you.' }
    ],
    sources: [S.thepricerBattery, named('MechanicRank posted prices'), S.airtasker],
    relatedService: 'mobile-battery-replacement',
    relatedArticles: ['what-affects-battery-alternator-cost', 'jump-start-cost', 'alternator-replacement-cost']
  },

  // ------------------------------------------------------------ LOCKOUT
  {
    slug: 'car-lockout-cost',
    title: 'How much does a car lockout cost?',
    metaTitle: 'How Much Does a Car Lockout Service Cost? | YBE Auto',
    metaDescription:
      'Car lockout service costs about $50 to $250, most often $80 to $150. What adds to the bill and what to do first. Call (202) 455-3822.',
    shortAnswer:
      'A car lockout usually costs $80 to $150, with a low of about $50 and a high near $250. After-hours calls add $25 to $75, and some providers add a service call fee of $30 to $150 on top. Making a new key is a separate job.',
    price: { low: '$50', typical: '$80 to $150', high: '$250' },
    factors: [
      'Time of day: after hours adds $25 to $75',
      'Vehicle security level',
      'A service call fee of $30 to $150 on top, with some providers',
      'Making a key is a separate job and priced separately'
    ],
    sections: [
      {
        h2: 'Before you call anyone',
        paras: [
          'Check every door and the trunk, and check whether someone has a spare. Many car insurance policies and new-car warranties include lockout help, so look there too.',
          'If you call YBE, the door is opened without damage when the keys are locked in the seat, trunk or ignition.'
        ]
      }
    ],
    faqs: [
      { q: 'What should I do if I locked my keys in my car?', a: 'Stay calm and check every door and the trunk. Look for a spare key, then check whether your insurance or roadside plan covers lockouts. If not, call a lockout service. Forcing the door or window usually costs more than the call.' },
      { q: 'How do you unlock a car door without a key?', a: 'Professionals use wedges and long-reach tools that open the door without harming the paint, glass or weather seals. Coat hangers and screwdrivers on modern cars often damage wiring, airbags or the door, so leave it to someone with the right tools.' },
      { q: 'How much does a locksmith cost to unlock a car?', a: 'Published 2026 guides put a car lockout at about $80 to $150 in most cases, with $50 at the low end and up to $250 for after-hours or high-security vehicles.' },
      { q: 'What do you do if a child is locked in the car?', a: 'Call 911 first. Do not wait for a locksmith or roadside service. A child in a closed car can overheat very quickly, even on a mild day.' }
    ],
    sources: [named('Low Rate Locksmith'), S.insurify, S.goclaver],
    relatedService: 'car-lockout',
    relatedArticles: ['jump-start-cost', 'flat-tire-help-cost']
  },

  // ------------------------------------------------------------ FLAT TIRE
  {
    slug: 'flat-tire-help-cost',
    title: 'How much does flat tire help cost?',
    metaTitle: 'How Much Does Flat Tire Help Cost? | YBE Auto',
    metaDescription:
      'Roadside flat tire help costs about $50 to $200, most often $65 to $125. Spare tire limits and what changes the price. Call (202) 455-3822.',
    shortAnswer:
      'Roadside flat tire help usually costs $65 to $125, with a low around $50 and a high near $200. If your spare is usable, you pay for the labor. If a tire has to be supplied, expect $129 to $189 fitted.',
    price: { low: '$50', typical: '$65 to $125', high: '$200' },
    factors: [
      'A usable spare, or a tire supplied ($129 to $189 fitted)',
      'Time of day',
      'Vehicle size',
      'Remote locations'
    ],
    sections: [
      {
        h2: 'Spare or repair',
        paras: [
          'Many punctures in the tread can be plugged and patched. Damage to the sidewall cannot, and a tire driven flat for any distance is often ruined inside even if it looks fine.',
          'YBE fits your spare where you sit or checks whether the flat can be plugged, then tells you what the tire needs next.'
        ]
      }
    ],
    faqs: [
      { q: 'How far can you drive on a spare tire?', a: 'A compact “donut” spare is meant for short distances, usually around 50 to 70 miles, enough to reach a shop. A full-size spare can be driven normally if it is in good condition and properly inflated. Check the sidewall and owner’s manual for your spare’s limits.' },
      { q: 'How fast can you drive on a spare tire?', a: 'Most compact spares are rated for 50 mph. The limit is printed on the tire’s sidewall.' },
      { q: 'Is it safe to drive on a donut spare tire?', a: 'Yes, for a short distance at reduced speed, with correct air pressure. It has less grip and a smaller footprint, so braking and handling are worse. Replace or repair the regular tire as soon as you can.' },
      { q: 'How long does it take for roadside assistance to change a flat tire?', a: 'Once help arrives, fitting a usable spare typically takes 15 to 30 minutes. Locking lug nuts without the key, a missing jack point or a flat spare add time.' }
    ],
    sources: [S.towpal, named('J’s Roadside'), named('David’s Tire and Battery'), S.oha],
    relatedService: 'flat-tire',
    relatedArticles: ['what-to-do-after-a-flat-tire', 'can-a-punctured-tire-be-repaired']
  },

  // ------------------------------------------------------------ FUEL DELIVERY
  {
    slug: 'fuel-delivery-cost',
    title: 'How much does fuel delivery cost?',
    metaTitle: 'How Much Does Emergency Fuel Delivery Cost? | YBE Auto',
    metaDescription:
      'Emergency fuel delivery costs about $40 to $109 plus the fuel, most often $49 to $79. What running out of gas does to a car. Call (202) 455-3822.',
    shortAnswer:
      'Emergency fuel delivery usually costs $49 to $79 for 2 to 3 gallons delivered, with a low of $40 and a high around $109. Every source bills the fuel itself at pump price on top of the delivery fee.',
    price: {
      low: '$40',
      typical: '$49 to $79 for 2 to 3 gallons delivered',
      high: '$109',
      note: 'The fuel is billed at pump price on top in every source.'
    },
    factors: [
      'Fuel type: diesel and premium cost more',
      'Time of day',
      'Distance to the car'
    ],
    sections: [
      {
        h2: 'Enough to reach the station',
        paras: [
          'Fuel delivery is meant to get you to a gas station, not to fill the tank. YBE brings enough fuel to reach the next station.',
          'If the car will not restart after fuel is added, give it a few tries so the fuel system can refill. If it still will not run, the problem may not have been fuel at all.'
        ]
      }
    ],
    faqs: [
      { q: 'What happens when your car runs out of gas?', a: 'The engine sputters, loses power and stops. Power steering and power brakes get much harder to use once the engine is off, so steer to the shoulder while the car is still moving.' },
      { q: 'Does running out of gas damage your car?', a: 'Once is rarely a problem. Doing it often can shorten the fuel pump’s life, because the pump relies on fuel to keep it cool, and it can pull sediment from the bottom of the tank.' },
      { q: 'What should you do when your car runs out of gas?', a: 'Get off the road as safely as you can, turn on your hazard lights, and stay with the car if it is safe. Then call for fuel delivery or roadside help.' },
      { q: 'Will running out of gas damage my car’s engine?', a: 'The engine itself is not usually harmed. The fuel pump and filter carry the risk, especially when it happens repeatedly.' }
    ],
    sources: [S.flatTireAustin, named('BatteryRealm'), named('David’s Tire and Battery'), named('RoadSide GA'), S.repairpalGas],
    relatedService: 'fuel-delivery',
    relatedArticles: ['jump-start-cost', 'flat-tire-help-cost']
  },

  // ------------------------------------------------------------ JUNK CAR
  {
    slug: 'junk-car-value',
    title: 'How much is my junk car worth?',
    metaTitle: 'How Much Is My Junk Car Worth? | YBE Auto',
    metaDescription:
      'Most junk cars bring $300 to $750; cars that still run can bring $2,200+. What sets the price, plus title questions. Call (202) 455-3822.',
    shortAnswer:
      'Most junk cars sell for $300 to $750. Published averages are about $375 for a compact, $450 for a midsize and $675 for a pickup. The low end is about $150, and cars that still run and drive can bring $2,200 or more.',
    price: {
      low: '$150',
      typical: '$300 to $750; averages: compact $375, midsize $450, pickup $675',
      high: '$2,200+ for cars that run and drive'
    },
    factors: [
      'Vehicle weight',
      'Whether it runs',
      'Catalytic converter still on the car, which adds about $150 to $900',
      'Current scrap metal prices',
      'Title status: no title pays 10 to 30 percent less',
      'Whether pickup is free or deducted from the offer'
    ],
    sections: [
      {
        h2: 'Get the number before the pickup',
        paras: [
          'Ask for the offer in dollars before anyone comes out, and ask whether pickup is included or taken out of it. A price that drops once the truck arrives is a common complaint.',
          'YBE pays cash for junk cars and picks them up running or not. Call with the year, make, model and condition for an offer.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you sell a car without a title?', a: 'Sometimes, but it is harder and usually pays 10 to 30 percent less. Most buyers want the title or other proof of ownership. If yours is lost, a duplicate title from the Maryland MVA is usually the simplest fix and often raises the offer.' },
      { q: 'Can you scrap a car that still runs?', a: 'Yes. A car that runs and drives is usually worth more than scrap weight, so get an offer that reflects it, or consider selling it as a used car instead.' },
      { q: 'How do I sell a car that’s been sitting for years?', a: 'Find the title, note what works and what does not, and get offers from junk car buyers who pick up non-running vehicles. Expect flat tires and a dead battery; they do not need to be fixed before a junk sale.' }
    ],
    sources: [named('Clunqr, September 2026 buyer rates'), S.consumerAuto, named('Reap My Ride')],
    relatedService: 'junk-car-pickup',
    relatedArticles: ['preventive-maintenance-older-vehicles', 'mobile-mechanic-cost']
  },

  // ------------------------------------------------------------ ALTERNATOR
  {
    slug: 'alternator-replacement-cost',
    title: 'How much does alternator replacement cost?',
    metaTitle: 'How Much Does Alternator Replacement Cost? | YBE Auto',
    metaDescription:
      'Alternator replacement runs about $300 to $1,088, most often $747 to $1,088. The part is most of the bill. Signs of a bad alternator. Call (202) 455-3822.',
    shortAnswer:
      'Alternator replacement usually costs $747 to $1,088. Kelley Blue Book puts it at $747 to $842 and RepairPal at $809 to $1,088. Mobile low-end quotes start around $300. The part is most of the bill, with RepairPal listing parts at $613 to $800.',
    price: {
      low: '$300 (mobile low end)',
      typical: '$747 to $1,088 (KBB $747 to $842; RepairPal $809 to $1,088)',
      high: '$1,088'
    },
    factors: [
      'The part, which is most of the bill (RepairPal parts $613 to $800)',
      'How buried the alternator sits in the engine bay',
      'Vehicle class'
    ],
    sections: [
      {
        h2: 'Test before replacing',
        paras: [
          'Dim lights and a dead battery can be the battery, a loose belt, a corroded cable or the alternator. A charging-system test shows which before you pay for an alternator.',
          'YBE tests the battery and charging output first, then quotes the repair.'
        ]
      }
    ],
    faqs: [
      { q: 'How long does an alternator last?', a: 'Commonly about 7 to 10 years, or roughly 80,000 to 150,000 miles. Heavy electrical loads, heat and a failing battery can shorten that.' },
      { q: 'What are the signs of a bad alternator?', a: 'A battery warning light, headlights that dim at idle and brighten when you rev, electrical accessories acting up, a whining noise, and a battery that keeps going dead are the common signs.' },
      { q: 'What happens when your alternator stops working while driving?', a: 'The car runs on battery power alone until the battery drains. Lights and accessories fade, and then the engine stops, sometimes within minutes. Turn off what you can and get somewhere safe.' }
    ],
    sources: [S.cltmobile, S.airtasker, named('AAA via dealershipwarranties.com')],
    relatedService: 'battery-alternator-starter',
    relatedArticles: ['what-affects-battery-alternator-cost', 'car-battery-replacement-cost', 'starter-replacement-cost']
  },

  // ------------------------------------------------------------ STARTER
  {
    slug: 'starter-replacement-cost',
    title: 'How much does starter replacement cost?',
    metaTitle: 'How Much Does Starter Replacement Cost? | YBE Auto',
    metaDescription:
      'Starter replacement runs about $250 to $1,100, most often $566 to $820. Access and part choice move the price most. Call (202) 455-3822.',
    shortAnswer:
      'Starter replacement usually costs $566 to $787 by RepairPal’s figures, and Kelley Blue Book averages $728 to $820. Mobile low-end quotes start around $250, and hard-to-reach starters can reach $1,100.',
    price: {
      low: '$250 (mobile low end)',
      typical: '$566 to $787 (RepairPal); KBB average $728 to $820',
      high: '$1,100'
    },
    factors: [
      'Starter access: some cars need the intake manifold removed',
      'New or remanufactured part: remanufactured runs 30 to 50 percent less',
      'OEM parts add 40 to 100 percent'
    ],
    sections: [
      {
        h2: 'Make sure it is the starter',
        paras: [
          'A weak battery or a corroded cable can sound exactly like a bad starter. Testing the battery and the starter circuit first avoids replacing a starter that was fine.'
        ]
      }
    ],
    faqs: [
      { q: 'How long does a car starter last?', a: 'Commonly about 100,000 to 150,000 miles. Cars that make many short trips use the starter more and can wear it out sooner.' },
      { q: 'Does a bad battery affect your starter or alternator?', a: 'Yes. A weak battery makes the starter draw more current and work harder, and it makes the alternator run hard trying to recharge it. Replacing a failing battery protects both.' }
    ],
    sources: [S.thepricerStarter, S.airtasker, named('AAA')],
    relatedService: 'battery-alternator-starter',
    relatedArticles: ['no-start-diagnosis-cost', 'alternator-replacement-cost', 'why-wont-my-car-start']
  },

  // ------------------------------------------------------------ BRAKE PADS
  {
    slug: 'brake-pad-replacement-cost',
    title: 'How much does brake pad replacement cost?',
    metaTitle: 'How Much Does Brake Pad Replacement Cost? | YBE Auto',
    metaDescription:
      'Brake pad replacement runs about $150 to $394 per axle; pads and rotors $500 to $1,400. How long pads last and when to replace. Call (202) 455-3822.',
    shortAnswer:
      'Brake pad replacement usually costs $239 to $394 per axle, with a low of about $150. Adding rotors raises it: pads and rotors together run $500 to $1,400 per axle, and rotor jobs start around $698.',
    price: {
      low: '$150',
      typical: '$239 to $394 per axle',
      high: '$698+ with rotors; $500 to $1,400 pads and rotors per axle'
    },
    factors: [
      'Pads only, or pads and rotors',
      'Front and rear are priced as separate jobs',
      'Pad material',
      'Vehicle class'
    ],
    sections: [
      {
        h2: 'Pads only or pads and rotors',
        paras: [
          'Pads caught early can often be replaced on their own. Pads worn to metal score the rotors, and then the rotors have to be replaced too, which is where the bill doubles.',
          'YBE inspects pads and rotors and tells you which you need before the work starts.'
        ]
      }
    ],
    faqs: [
      { q: 'How long do brake pads last?', a: 'Commonly 30,000 to 70,000 miles. Stop-and-go city driving wears them faster than highway miles.' },
      { q: 'How do I know when my brake pads need replacing?', a: 'Squealing when you brake, grinding, a longer stopping distance, vibration in the pedal, or a brake warning light. Many pads have a wear indicator that squeals when they are thin.' },
      { q: 'When should you replace your brake pads?', a: 'When the friction material is down to about 3 to 4 millimeters, or as soon as you hear grinding. Replacing them before they reach metal usually saves the rotors.' }
    ],
    sources: [named('AAA via WeBrakes'), named('RepairPal'), S.airtasker, S.costflock, S.mavis],
    relatedService: 'brake-pad-rotor-replacement',
    relatedArticles: ['what-affects-brake-repair-cost', 'signs-brake-pads-need-replacement', 'why-do-brakes-squeak-or-grind']
  }
];

priceGuides.forEach((g) => {
  g.cluster = 'price-guides';
  g.updated = UPDATED;
});

module.exports = { priceGuides };
