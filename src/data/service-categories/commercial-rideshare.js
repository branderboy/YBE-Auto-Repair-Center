/**
 * COMMERCIAL AND RIDESHARE VEHICLES (owner, 2026-11-14)
 *
 * Segments and services from the owner's list:
 *   Rideshare: preventive maintenance, tires, brakes, repairs, diagnostics
 *   Rental and car-share: maintenance, damage repairs, vehicle preparation
 *   Commercial fleets: scheduled maintenance, mechanical work, body repairs
 *
 * Kept to what the site already states as fact: YBE is not a Maryland state
 * inspection station and issues no certificates, and no fleet contract,
 * billing or priority terms are promised.
 */
module.exports = {
  slug: 'commercial-rideshare',
  navLabel: 'Commercial & Rideshare',
  title: 'Commercial and Rideshare Vehicles',
  icon: 'truck',
  metaTitle: 'Commercial and Rideshare Vehicle Repair in Capitol Heights, MD',
  metaDescription:
    'Rideshare cars, rental and car-share vehicles and commercial fleets: mechanical repairs, condition checks, body work and vehicle prep. Call (202) 455-3822.',
  blurb:
    'Mechanical repairs, condition inspections and vehicle preparation for rideshare drivers, rental and car-share hosts, and commercial fleets.',
  intro: [
    'When a car earns money, every day it sits in a shop costs you. Rideshare drivers, rental and car-share hosts, and businesses running vans and cars need the same thing: the problem found quickly, fixed properly, and the vehicle back on the road.',
    'YBE handles mechanical repair, diagnostics, maintenance and body work under one roof, open seven days a week from 8:30 AM to 6:00 PM. A working vehicle with a brake problem and a dented door does not have to visit two shops.',
    'We are not a Maryland state inspection station and cannot issue a state certificate. We can check a vehicle over, tell you what would hold it up, and fix it.'
  ],
  covers: [
    'Rideshare vehicle maintenance and repair',
    'Rental and car-share vehicle preparation',
    'Commercial fleet maintenance',
    'Condition inspections between trips or rentals',
    'Mechanical and body repairs in one shop',
    'Open seven days a week'
  ],
  services: [
    {
      slug: 'rideshare-vehicle-repair',
      navLabel: 'Rideshare Cars',
      title: 'Rideshare Vehicle Maintenance and Repair',
      metaTitle: 'Rideshare Car Repair in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Drive for Uber or Lyft? YBE keeps rideshare cars on the road: maintenance, tires, brakes, diagnostics and repairs, seven days a week. Call (202) 455-3822.',
      customerVoice: 'I drive for a living and cannot afford to have my car down.',
      problem: [
        'A rideshare car does in a year what most cars do in three. The miles are city miles, stop-and-go, with long idling and constant door-to-door trips, which is exactly the driving that wears brakes, tires and batteries fastest.',
        'When something fails, the bill is only part of the cost. Every day the car is down is a day without fares.'
      ],
      whatWeDo: [
        'We keep the high-mileage items ahead of schedule: oil and filters, brakes, tires and alignment, batteries, and the cooling system that takes the most strain from idling in traffic.',
        'When a warning light comes on or something feels wrong, we diagnose it before replacing parts, tell you what has to be done now and what can wait, and quote before any work starts.',
        'If your platform requires a vehicle inspection, check which inspectors it accepts. We can check the car over beforehand and fix anything that would hold it up.'
      ],
      warningSigns: [
        'Brakes squealing, grinding or pulling',
        'Tires wearing unevenly or down near the wear bars',
        'A check engine or other warning light',
        'Slow starts or needing a jump',
        'A/C not keeping up with passengers in the car',
        'Overdue oil changes from the extra mileage'
      ],
      includes: [
        'Preventive maintenance on a high-mileage schedule',
        'Brake inspection and repair',
        'Tire repair, replacement, rotation and alignment',
        'Check engine and warning light diagnostics',
        'Battery, alternator and starter testing and repair',
        'A quote before work starts, and walk-ins welcome'
      ],
      whyNotIgnore: [
        'Small problems on a high-mileage car turn into big ones fast. Pads become rotors, a slow leak becomes a flat on the road, and a weak battery strands you mid-shift.',
        'Riders notice noises, smells and warning lights, and a car that feels unsafe costs you ratings as well as repairs.'
      ],
      related: ['brake-pad-rotor-replacement', 'tire-repair-replacement', 'check-engine-light-diagnostics']
    },
    {
      slug: 'rental-car-share-vehicle-prep',
      navLabel: 'Rental & Car-Share',
      title: 'Rental and Car-Share Vehicle Preparation',
      metaTitle: 'Rental and Car-Share Vehicle Prep in Capitol Heights, MD',
      metaDescription:
        'Host on a car-share app or run rental cars? YBE handles maintenance, damage repair and vehicle prep between bookings in Capitol Heights, MD. Call (202) 455-3822.',
      customerVoice: 'I need this car ready before the next booking.',
      problem: [
        'Rental and car-share vehicles go out with strangers and come back with surprises: a new scrape, a tire low on air, a warning light, a cabin that needs attention, and a next booking already on the calendar.',
        'A car that goes out with a problem comes back with a complaint, or does not come back at all.'
      ],
      whatWeDo: [
        'We check the vehicle over between bookings: tires, brakes, fluids, lights, warning lights and anything the last driver left behind.',
        'We handle the mechanical side and the body side in the same shop: scrapes, dents and scratches repaired, and the mechanical problems found during the check fixed before the next guest.',
        'Tell us when the next booking starts. We will tell you honestly what can be done before then.'
      ],
      warningSigns: [
        'New dents, scrapes or scratches after a trip',
        'A warning light that came on during a rental',
        'Tires low, worn or damaged',
        'Guest reports of noises, pulling or vibration',
        'Maintenance coming due between bookings',
        'A vehicle that has sat unused and needs checking before it goes out'
      ],
      includes: [
        'Condition inspection between bookings',
        'Routine maintenance: oil, filters, fluids',
        'Dent, scratch and paint repair',
        'Tire and brake checks and repairs',
        'Warning light diagnostics',
        'An honest answer on what can be done before the next booking'
      ],
      whyNotIgnore: [
        'A damaged or unsafe car handed to the next guest risks a bad review, a cancelled booking or worse.',
        'Damage photographed and repaired promptly is easier to deal with than damage nobody can date.'
      ],
      related: ['dent-scratch-paint', 'collision-body-repair', 'oil-change']
    },
    {
      slug: 'commercial-fleet-maintenance',
      navLabel: 'Commercial Fleets',
      title: 'Commercial Fleet Maintenance and Repair',
      metaTitle: 'Commercial Fleet Repair in Capitol Heights, MD | YBE Auto',
      metaDescription:
        'Business vans and cars: YBE handles scheduled maintenance, mechanical work and body repairs for commercial vehicles in Capitol Heights, MD. Call (202) 455-3822.',
      customerVoice: 'We run work vehicles and need one shop that handles all of it.',
      problem: [
        'A business vehicle that breaks down takes a crew, a delivery or a service call with it. Most fleet problems come from maintenance that slipped while the vehicle was busy earning.',
        'Sending the same van to one shop for mechanical work and another for body damage doubles the time it is off the road.'
      ],
      whatWeDo: [
        'We keep scheduled maintenance on track: oil and filters, brakes, tires, fluids and inspections of the parts that wear fastest on work vehicles.',
        'We handle mechanical repairs and body repairs in the same building, so one visit covers the van with a brake problem and a dented panel.',
        'Every job is quoted before work starts. Call to talk about your vehicles, how they are used and how often they need to come in.'
      ],
      warningSigns: [
        'Maintenance overdue on vehicles that are always in use',
        'Brake, tire or steering complaints from drivers',
        'Warning lights left on because the vehicle could not be spared',
        'Body damage from loading, parking or minor collisions',
        'Vehicles overheating or struggling under load',
        'Repairs split across several shops'
      ],
      includes: [
        'Scheduled maintenance: oil, filters, fluids, inspections',
        'Brake, tire, steering and suspension work',
        'Engine, transmission and electrical diagnostics and repair',
        'Collision and body repair',
        'One shop for mechanical and body work',
        'Open seven days a week, and a quote before any work'
      ],
      whyNotIgnore: [
        'Maintenance skipped on a busy vehicle comes back as a breakdown at the worst time, usually with a bigger repair attached.',
        'Drivers stop reporting problems that never get fixed. Catching wear early keeps vehicles working and drivers safe.'
      ],
      related: ['tune-ups-maintenance', 'collision-body-repair', 'engine-repair']
    }
  ]
};
