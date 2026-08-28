/**
 * SERVICE AREAS
 *
 * Capitol Heights is the primary location page and gets the strongest local
 * signals. The rest are genuine nearby markets.
 *
 * Rules followed here, per the brief:
 *  - No statewide "Maryland" or "Virginia" pages. Real markets only.
 *  - No doorway pages: each entry has its own copy, its own road and landmark
 *    context, and its own service emphasis.
 *  - Relationships to the shop are described directionally and by road rather
 *    than with invented mileage or drive-time figures.
 */

const areas = [
  {
    slug: 'capitol-heights-md',
    name: 'Capitol Heights',
    state: 'MD',
    isPrimary: true,
    metaTitle: 'Mechanic in Capitol Heights, MD | YBE Auto Repair Center',
    metaDescription:
      'YBE Auto Repair Center is at 8632 Edgeworth Dr in Capitol Heights, MD. Repairs, diagnostics, bodywork and roadside help, seven days a week. Call (202) 455-3822.',
    relationship: 'This is where the shop is.',
    intro: [
      'YBE Auto Repair Center has operated out of Capitol Heights since 2006. The shop sits at 8632 Edgeworth Dr, just off the Central Avenue corridor and a short drive from the DC line, in the part of Prince George’s County where most of our customers live and work.',
      'Being the neighborhood shop shapes how we work. A lot of our customers walk in because someone on their street sent them, and a lot of them have been coming back for over a decade. That only happens if the work holds up and the pricing is fair.',
      'Because we handle mechanical repair, diagnostics and bodywork in the same building, a Capitol Heights customer does not get bounced between shops when a repair turns out to involve more than one system.'
    ],
    localContext: [
      'Capitol Heights driving is mostly short trips, stop-and-go traffic on Central Avenue, and rough pavement. That combination is hard on specific things: brakes wear faster than the mileage suggests, alignment gets knocked out by potholes, and batteries never get the long runs they need to fully recharge.',
      'Those are the three complaints we see most from customers right here in the neighborhood, and they are the reason we check brakes, tires and battery condition whenever a car is up on the lift for something else.'
    ],
    roads: ['Central Avenue (MD-214)', 'Southern Avenue', 'East Capitol Street', 'the Capital Beltway (I-495)'],
    landmarkNote:
      'The shop is convenient to the Capitol Heights Metro station on the Blue and Silver lines, which makes dropping a car off and continuing on to work straightforward.',
    priorityServices: [
      'check-engine-light-diagnostics',
      'brake-pad-rotor-replacement',
      'oil-change',
      'wheel-alignment',
      'battery-alternator-starter',
      'collision-body-repair'
    ],
    roadsideNote:
      'Capitol Heights is the center of our roadside coverage. Jump starts, flat tires, lockouts and fuel delivery here typically get the fastest response of anywhere we serve.'
  },
  {
    slug: 'washington-dc',
    name: 'Washington',
    state: 'DC',
    metaTitle: 'Mechanic in Washington, DC | YBE Auto Repair',
    metaDescription:
      'DC drivers use YBE for repairs, diagnostics, brakes, bodywork and roadside help just over the Maryland line in Capitol Heights. Call or text (202) 455-3822.',
    relationship: 'Just across the District line from the shop.',
    intro: [
      'Plenty of our customers live in Washington, DC and cross into Capitol Heights for service, particularly drivers in Ward 7 and Ward 8 for whom we are closer than most shops on their own side of the line.',
      'The draw is usually space and time. Working on a car in the District often means paying for it, waiting for it, and dealing with parking around the shop. Coming a few minutes east means a real service bay, seven-day hours, and somebody who can actually get to your vehicle today.',
      'We are also a straightforward option for DC drivers who need mechanical work and bodywork at the same time, which normally means two separate shops and two separate schedules.'
    ],
    localContext: [
      'DC driving is unusually hard on brakes and suspension. Constant stop-and-go, aggressive speed humps, steep alley entrances and streets that have been patched more than once all add up.',
      'The complaints we hear most from District customers are brake noise, alignment pulling after a pothole, and check-engine lights on cars that spend most of their life idling in traffic. Short city trips also shorten battery life, because the alternator never gets a long enough run to fully recharge.'
    ],
    roads: ['East Capitol Street', 'Benning Road', 'Pennsylvania Avenue SE', 'Southern Avenue', 'DC-295'],
    landmarkNote:
      'For drivers coming out of Southeast and Northeast DC, the shop is a short run east on Central Avenue after crossing Southern Avenue.',
    priorityServices: [
      'brake-pad-rotor-replacement',
      'check-engine-light-diagnostics',
      'shocks-struts-steering',
      'wheel-alignment',
      'battery-alternator-starter',
      'dent-scratch-paint'
    ],
    roadsideNote:
      'We take roadside calls from nearby DC neighborhoods for jump starts, flat tires, lockouts and fuel. Call and tell us exactly where you are, and we will tell you honestly whether we can reach you quickly.'
  },
  {
    slug: 'district-heights-md',
    name: 'District Heights',
    state: 'MD',
    metaTitle: 'Mechanic in District Heights, MD | YBE Auto Repair',
    metaDescription:
      'District Heights drivers trust YBE for brakes, engine diagnostics, transmissions, bodywork and roadside assistance. Open seven days. Call (202) 455-3822.',
    relationship: 'Immediately south of the shop.',
    intro: [
      'District Heights is one of our closest neighboring communities, and a steady share of our regular customers come from there. For most District Heights drivers we are a short run north, which makes us a practical choice for everything from an oil change to a repair that takes a couple of days.',
      'That proximity matters most when something goes wrong unexpectedly. Being close enough to drop a car off before work and pick it up after is the difference between getting a repair done and putting it off another month.'
    ],
    localContext: [
      'A lot of District Heights driving runs along Marlboro Pike and Pennsylvania Avenue, with heavy commuter traffic toward DC in the morning and back in the evening. That is exactly the pattern that wears brakes and strains cooling systems in summer.',
      'We see a steady stream of brake work, A/C complaints and transmission service from this area, along with the alignment work that comes with rough pavement on the side streets.'
    ],
    roads: ['Marlboro Pike', 'Pennsylvania Avenue (MD-4)', 'Silver Hill Road', 'the Capital Beltway (I-495)'],
    landmarkNote:
      'From most of District Heights the shop is a straightforward trip north toward the Central Avenue corridor.',
    priorityServices: [
      'brake-pad-rotor-replacement',
      'ac-repair',
      'transmission-repair',
      'oil-change',
      'wheel-alignment',
      'check-engine-light-diagnostics'
    ],
    roadsideNote:
      'District Heights is well inside our roadside range for jump starts, flat tires, mobile battery replacement, fuel delivery and lockouts.'
  },
  {
    slug: 'landover-md',
    name: 'Landover',
    state: 'MD',
    metaTitle: 'Mechanic in Landover, MD | YBE Auto Repair',
    metaDescription:
      'Landover drivers come to YBE in Capitol Heights for diagnostics, brakes, transmissions, electrical work and bodywork. Open seven days. Call (202) 455-3822.',
    relationship: 'Just north of the shop.',
    intro: [
      'Landover sits north of us along the Landover Road corridor, close enough that we see customers from there regularly. Many of them found us after needing something a quick-service place could not handle, like a real diagnosis on a recurring warning light or a repair involving both mechanical and body damage.',
      'The seven-day schedule matters here. A lot of Landover customers work schedules that make a weekday appointment difficult, and being open Saturday and Sunday is often the only reason a repair happens at all.'
    ],
    localContext: [
      'Landover driving means a lot of Beltway miles, and Beltway miles are hard on different things than city miles. Highway driving surfaces tire wear, alignment problems, cooling-system weaknesses and suspension wear more than stop-and-go does.',
      'We see more overheating complaints and highway-speed vibration from this area than from the neighborhoods immediately around the shop, which usually traces back to tires, alignment or worn suspension.'
    ],
    roads: ['Landover Road (MD-202)', 'Sheriff Road', 'Martin Luther King Jr. Highway (MD-704)', 'the Capital Beltway (I-495)'],
    landmarkNote:
      'From the Landover Road corridor, the shop is a short trip south toward Central Avenue.',
    priorityServices: [
      'cooling-system-overheating',
      'tire-repair-replacement',
      'wheel-alignment',
      'transmission-repair',
      'brake-noise-vibration',
      'collision-body-repair'
    ],
    roadsideNote:
      'We cover Landover for roadside calls including jump starts, flat-tire help, fuel delivery and lockouts.'
  },
  {
    slug: 'largo-md',
    name: 'Largo',
    state: 'MD',
    metaTitle: 'Mechanic in Largo, MD | Auto Repair Near Largo Town Center | YBE Auto',
    metaDescription:
      'Looking for a mechanic in Largo, MD? YBE Auto Repair Center handles diagnostics, brakes, transmissions, A/C and bodywork, minutes from Largo Town Center. Call or text (202) 455-3822.',
    relationship: 'East of the shop, straight out Central Avenue.',
    intro: [
      'Largo sits a short run east of us on Central Avenue, and it is one of the areas our customers come from most often without us ever having advertised there. The shop is close enough that dropping a car off before work and picking it up after is straightforward.',
      'We handle the full range here — diagnostics, brakes, transmissions, electrical, A/C and bodywork in the same building — so a Largo customer with a repair that turns out to involve more than one system does not get sent somewhere else to finish it.'
    ],
    localContext: [
      'Largo driving is Beltway driving. A lot of our Largo customers commute on I-495 and the Central Avenue corridor daily, and highway miles wear a car differently than short trips do: tires and alignment take the brunt, and A/C works hard sitting in slow traffic in summer.',
      'The other pattern we see from Largo is brake wear from stop-and-go around Largo Town Center and the arena traffic. Brakes that would last on open highway get used far harder in that kind of driving, and they wear ahead of what the mileage suggests.'
    ],
    roads: [
      'Central Avenue (MD-214)',
      'Landover Road (MD-202)',
      'Largo Center Drive',
      'the Capital Beltway (I-495)'
    ],
    landmarkNote:
      'We are convenient to Largo Town Center and the Blue and Silver line Metro station there, which makes leaving a car with us and continuing on to work practical.',
    priorityServices: [
      'brake-pad-rotor-replacement',
      'wheel-alignment',
      'check-engine-light-diagnostics',
      'ac-repair',
      'transmission-repair',
      'oil-change'
    ],
    roadsideNote:
      'Largo is within our roadside coverage for jump starts, flat tires, mobile battery replacement, fuel delivery and lockouts. Call or text and we will tell you honestly how soon we can reach you.'
  },
  {
    slug: 'forestville-md',
    name: 'Forestville',
    state: 'MD',
    metaTitle: 'Mechanic in Forestville, MD | YBE Auto Repair',
    metaDescription:
      'Forestville drivers use YBE for engine diagnostics, brake repair, A/C service, transmissions and roadside help. Open seven days. Call (202) 455-3822.',
    relationship: 'A short drive south of the shop.',
    intro: [
      'Forestville is close enough to Capitol Heights that we are a convenient option for routine maintenance as well as bigger repairs. Customers from this area tend to come to us for the same reason as our neighbors closer in: they want the work diagnosed properly instead of guessed at.',
      'Having bodywork and mechanical repair in one place is also a practical advantage for Forestville customers, since it means one drop-off instead of coordinating between two shops.'
    ],
    localContext: [
      'Between Pennsylvania Avenue, Marlboro Pike and the Beltway on-ramps, Forestville drivers get a mix of heavy local traffic and highway running. That mix tends to produce brake wear and transmission complaints at the same time.',
      'Summer brings a wave of A/C work from this area, most of it turning out to be a leak somewhere in the system rather than a car that simply needed topping off.'
    ],
    roads: ['Marlboro Pike', 'Pennsylvania Avenue (MD-4)', 'Donnell Drive', 'the Capital Beltway (I-495)'],
    landmarkNote:
      'From Forestville, the shop is a straightforward run north toward the Central Avenue corridor.',
    priorityServices: [
      'ac-repair',
      'brake-pad-rotor-replacement',
      'transmission-repair',
      'check-engine-light-diagnostics',
      'oil-change',
      'shocks-struts-steering'
    ],
    roadsideNote:
      'Forestville is within our roadside coverage for jump starts, flat tires, mobile battery replacement, fuel and lockouts.'
  },
  {
    slug: 'hillcrest-heights-md',
    name: 'Hillcrest Heights',
    state: 'MD',
    metaTitle: 'Mechanic in Hillcrest Heights, MD | YBE Auto Repair',
    metaDescription:
      'Hillcrest Heights drivers come to YBE for brakes, diagnostics, electrical repair, bodywork and roadside assistance. Open seven days. Call (202) 455-3822.',
    relationship: 'Southwest of the shop, toward the DC line.',
    intro: [
      'Hillcrest Heights sits southwest of us, close to the District boundary. Drivers from this area often end up at YBE because they want a shop that will actually test a problem rather than replace parts until the symptom goes away.',
      'We are also a reasonable option for Hillcrest Heights customers who need weekend service, since a Sunday appointment is not something most shops in the area offer.'
    ],
    localContext: [
      'Driving here runs along Branch Avenue and Suitland Parkway, with steady commuter traffic and the same rough pavement that affects most of the inner county.',
      'Battery and starting complaints come up often from this area, which tracks with short commutes that never let the charging system fully recover. Alignment and suspension work is the other steady category.'
    ],
    roads: ['Branch Avenue (MD-5)', 'Suitland Parkway', 'Silver Hill Road', 'Naylor Road'],
    landmarkNote:
      'From Hillcrest Heights the shop is a short trip northeast toward Capitol Heights.',
    priorityServices: [
      'battery-alternator-starter',
      'no-start-diagnostics',
      'brake-pad-rotor-replacement',
      'wheel-alignment',
      'shocks-struts-steering',
      'oil-change'
    ],
    roadsideNote:
      'We take roadside calls from Hillcrest Heights for dead batteries, flat tires, lockouts and fuel delivery.'
  },
  {
    slug: 'hyattsville-md',
    name: 'Hyattsville',
    state: 'MD',
    metaTitle: 'Mechanic in Hyattsville, MD | YBE Auto Repair',
    metaDescription:
      'Hyattsville drivers choose YBE for engine diagnostics, transmissions, brakes, auto body and glass work. Open seven days a week. Call (202) 455-3822.',
    relationship: 'North of the shop, inside the Beltway.',
    intro: [
      'Hyattsville is a bit further out than our closest neighborhoods, and customers who come from there are usually coming for a specific reason: a diagnosis somewhere else could not pin down, a transmission problem, or body and mechanical damage that they would rather not split between two shops.',
      'For a repair that takes more than a day, the distance stops mattering much. For that kind of work, being able to talk to the person who actually looked at your car counts for more than being around the corner.'
    ],
    localContext: [
      'Hyattsville driving mixes the Route 1 corridor, East-West Highway and Beltway access, which means a wide range of wear patterns depending on the driver.',
      'We see a good share of transmission and engine diagnostic work from this area, along with auto glass, since the highway running that comes with a Hyattsville commute is where most windshield chips happen.'
    ],
    roads: ['Baltimore Avenue (US-1)', 'East-West Highway (MD-410)', 'Queens Chapel Road', 'the Capital Beltway (I-495)'],
    landmarkNote:
      'From Hyattsville, the most direct approach is south toward the Central Avenue corridor in Capitol Heights.',
    priorityServices: [
      'transmission-repair',
      'check-engine-light-diagnostics',
      'auto-glass',
      'brake-pad-rotor-replacement',
      'cooling-system-overheating',
      'collision-body-repair'
    ],
    roadsideNote:
      'Hyattsville is toward the outer edge of our roadside range. Call and tell us where you are, and we will give you a straight answer about whether we can get there promptly.'
  },
  {
    slug: 'lanham-md',
    name: 'Lanham',
    state: 'MD',
    metaTitle: 'Mechanic in Lanham, MD | YBE Auto Repair',
    metaDescription:
      'Lanham drivers use YBE for diagnostics, transmissions, cooling system repair, tires and alignment. Open seven days a week. Call (202) 455-3822.',
    relationship: 'Northeast of the shop.',
    intro: [
      'Lanham sits northeast of us along the Annapolis Road corridor. Customers from this area usually drive more highway miles than our closer-in neighbors, and the work they need reflects that.',
      'We get a lot of Lanham customers on referral, often for diagnostic work where another shop replaced a part and the problem came back.'
    ],
    localContext: [
      'Lanham commuting means real highway mileage on US-50 and the Beltway. Highway miles are easier on brakes than city driving but harder on cooling systems, tires, alignment and suspension.',
      'Overheating complaints in summer and highway-speed vibration are the two categories we see most from this area. Both are worth catching early, since a cooling-system failure at highway speed does more damage than the same failure in traffic.'
    ],
    roads: ['Annapolis Road (MD-450)', 'Martin Luther King Jr. Highway (MD-704)', 'US-50', 'the Capital Beltway (I-495)'],
    landmarkNote:
      'From Lanham, the shop is southwest toward Capitol Heights, inside the Beltway.',
    priorityServices: [
      'cooling-system-overheating',
      'tire-repair-replacement',
      'wheel-alignment',
      'check-engine-light-diagnostics',
      'transmission-repair',
      'auto-glass'
    ],
    roadsideNote:
      'We do take roadside calls toward Lanham. Because it is further out, call first so we can tell you realistically how quickly we can reach you.'
  },
  {
    slug: 'new-carrollton-md',
    name: 'New Carrollton',
    state: 'MD',
    metaTitle: 'Mechanic in New Carrollton, MD | YBE Auto Repair',
    metaDescription:
      'New Carrollton drivers trust YBE for engine diagnostics, brakes, electrical repair and bodywork. Open seven days a week. Call (202) 455-3822.',
    relationship: 'North of the shop, near the Beltway.',
    intro: [
      'New Carrollton customers tend to be commuters, and commuters need two things from a repair shop: an honest diagnosis and a schedule that does not cost them a day of work.',
      'Our seven-day hours cover the second part. The first part is the reason most of our New Carrollton customers came the first time and the reason they come back.'
    ],
    localContext: [
      'With the Metro station, Amtrak and MARC service, plenty of New Carrollton drivers use their car mostly for short hops to the station and back. That is the hardest possible use pattern on a battery, and it is why we test charging systems carefully for customers from this area.',
      'The other steady category is brake work, since short trips mean a high number of stops per mile driven.'
    ],
    roads: ['Annapolis Road (MD-450)', 'Riverdale Road', 'Ardwick Ardmore Road', 'the Capital Beltway (I-495)'],
    landmarkNote:
      'New Carrollton is a straightforward trip south toward Capitol Heights, largely along the Beltway or Route 450.',
    priorityServices: [
      'battery-alternator-starter',
      'no-start-diagnostics',
      'brake-pad-rotor-replacement',
      'oil-change',
      'check-engine-light-diagnostics',
      'dent-scratch-paint'
    ],
    roadsideNote:
      'Roadside help toward New Carrollton is available. Call so we can confirm response time before you are left waiting.'
  },
  {
    slug: 'bowie-md',
    name: 'Bowie',
    state: 'MD',
    metaTitle: 'Mechanic in Bowie, MD | YBE Auto Repair',
    metaDescription:
      'Bowie drivers come to YBE for transmission work, engine diagnostics, cooling system repair and collision work. Open seven days. Call (202) 455-3822.',
    relationship: 'Northeast, the furthest of our regular markets.',
    intro: [
      'Bowie is the furthest out of the areas we regularly serve, and we are straightforward about what that means. Customers who come to us from Bowie are generally coming for larger work: transmission repair, a diagnosis that has defeated another shop, or combined body and mechanical repair after an accident.',
      'For an oil change, a shop closer to home makes more sense, and we will say so. For a transmission or a repair where the diagnosis actually matters, the drive is usually worth it.'
    ],
    localContext: [
      'Bowie drivers put on serious highway mileage on US-50 and Route 301. Cars in this area tend to arrive with high odometer readings and the wear that comes with them: transmissions, cooling systems, suspension and tires.',
      'Highway mileage is also why we see more windshield damage and more high-speed vibration complaints from Bowie than from areas closer to the shop.'
    ],
    roads: ['US-50', 'Crain Highway (US-301)', 'MD-197', 'MD-3'],
    landmarkNote:
      'From Bowie, the most direct route in is US-50 west toward the Beltway, then south toward Capitol Heights.',
    priorityServices: [
      'transmission-repair',
      'transmission-replacement-rebuild',
      'cooling-system-overheating',
      'engine-repair',
      'collision-body-repair',
      'auto-glass'
    ],
    roadsideNote:
      'Bowie is at the outer limit of our roadside coverage. Call before assuming we can get to you quickly, and we will tell you honestly if you would be better served by someone closer.'
  },
  {
    slug: 'upper-marlboro-md',
    name: 'Upper Marlboro',
    state: 'MD',
    metaTitle: 'Mechanic in Upper Marlboro, MD | YBE Auto Repair',
    metaDescription:
      'Upper Marlboro drivers use YBE for engine and transmission work, brakes, suspension and bodywork. Open seven days a week. Call (202) 455-3822.',
    relationship: 'Southeast of the shop, outside the Beltway.',
    intro: [
      'Upper Marlboro customers generally drive further and on more varied roads than our in-close neighbors, and the work tends to reflect that: suspension, tires, cooling systems and transmissions.',
      'As the county seat, it is also an area where people are often driving between appointments all day. Being open seven days makes it easier to fit a repair around that kind of schedule.'
    ],
    localContext: [
      'The mix of Route 4, Route 301 and rural county roads is hard on suspension and tires. Uneven surfaces and shoulder edges do more alignment damage than smooth highway miles.',
      'We see a steady stream of alignment, suspension and tire work from this area, along with the cooling-system and transmission complaints that come with higher-mileage vehicles.'
    ],
    roads: ['Pennsylvania Avenue (MD-4)', 'Crain Highway (US-301)', 'Old Marlboro Pike', 'Water Street'],
    landmarkNote:
      'From Upper Marlboro, the shop is northwest along Route 4 toward Capitol Heights.',
    priorityServices: [
      'shocks-struts-steering',
      'wheel-alignment',
      'tire-repair-replacement',
      'transmission-repair',
      'cooling-system-overheating',
      'brake-pad-rotor-replacement'
    ],
    roadsideNote:
      'Upper Marlboro sits toward the edge of our roadside range. Call and describe your location, and we will tell you straight whether we can reach you promptly.'
  }
];

areas.forEach((a) => {
  a.url = `/service-areas/${a.slug}/`;
  a.label = `${a.name}, ${a.state}`;
  if (!a.title) a.title = `Auto Repair in ${a.label}`;
});

const primaryArea = areas.find((a) => a.isPrimary);

module.exports = { areas, primaryArea };
