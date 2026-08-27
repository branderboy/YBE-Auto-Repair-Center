/**
 * GOOGLE BUSINESS PROFILE — SERVICE LIST
 * ======================================
 * The services exactly as they appear on the profile, with Google's own
 * descriptions, and the page on this site that covers each one.
 *
 * Why mirror the names rather than just the work: the profile and the site are
 * two descriptions of one business, and an engine reconciling them should find
 * them agreeing item for item. The site's own URLs and headings stay as they
 * are — this maps the profile's vocabulary onto them instead of renaming
 * pages and breaking links.
 *
 * `page` is the site page covering the service, or null where the profile
 * lists something the site folds into a broader page. A null still gets
 * emitted in the offer catalog; it just does not link anywhere.
 *
 * Source: the business's Google Business Profile services list.
 */

const S = (slug) => `/services/${slug}`;

/** Primary category: Auto repair shop. */
const services = [
  {
    name: 'Air conditioning',
    description:
      'Diagnose and repair vehicle A/C systems that blow warm air, have weak airflow, leak refrigerant, make unusual noises, or fail to cool properly.',
    page: '/services/auto-ac-heating/ac-repair/'
  },
  {
    name: 'Auto engine diagnostic',
    description:
      'Use diagnostic testing to identify check-engine lights, sensor failures, misfires, electrical faults, and drivability problems.',
    page: '/services/auto-repair-diagnostics/check-engine-light-diagnostics/'
  },
  {
    name: 'Brakes',
    description:
      'Inspect and repair brake-system components, including pads, rotors, calipers, fluid, warning lights, and brake-related electrical concerns.',
    page: '/services/brake-repair/'
  },
  {
    name: 'Electrical',
    description:
      'Diagnose and repair automotive electrical systems, including batteries, alternators, starters, wiring, fuses, relays, lights, sensors, switches, and power accessories.',
    page: '/services/electrical/'
  },
  {
    name: 'A/C installation & repair',
    description:
      'Install, diagnose, and repair vehicle A/C components including compressors, condensers, hoses, blower motors, pressure switches, and refrigerant leaks.',
    page: '/services/auto-ac-heating/ac-repair/'
  },
  {
    name: 'Auto A/C replacement',
    description:
      'Replace failed or damaged A/C components, including compressors, condensers, evaporators, hoses, blower motors, and related parts.',
    page: '/services/auto-ac-heating/ac-repair/'
  },
  {
    name: 'Auto engine tuning',
    description:
      'Tune-up service for rough idling, misfires, poor fuel economy, hesitation, spark plugs, ignition components, filters, and engine-performance concerns.',
    page: '/services/auto-repair-diagnostics/tune-ups-maintenance/'
  },
  {
    name: 'Auto glass repair',
    description:
      'Repair eligible windshield chips, small cracks, window leaks, and minor auto-glass damage when replacement is not necessary.',
    page: '/services/auto-body-glass/auto-glass/'
  },
  {
    name: 'Auto glass replacement',
    description:
      'Replace damaged windshields, side windows, rear windows, quarter glass, and other vehicle glass.',
    page: '/services/auto-body-glass/auto-glass/'
  },
  {
    name: 'Auto tire replacement',
    description:
      'Replace, mount, balance, and inspect tires to support safe traction, smoother driving, and even tire wear.',
    page: '/services/tires-alignment-suspension/tire-repair-replacement/'
  },
  {
    name: 'General repairs & maintenance',
    description:
      'General automotive repair and routine maintenance for mechanical, electrical, fluid, safety, and performance-related vehicle needs.',
    page: '/services/auto-repair-diagnostics/'
  },
  {
    name: 'Steering & suspension replacement',
    description:
      'Replace worn steering and suspension parts, including shocks, struts, control arms, ball joints, tie rods, sway-bar links, and related components.',
    page: '/services/tires-alignment-suspension/shocks-struts-steering/'
  },
  {
    name: 'Tire rotations',
    description:
      'Rotate tires to promote even tread wear, improve handling, and help extend tire life.',
    page: '/services/tires-alignment-suspension/tire-repair-replacement/'
  },
  {
    name: 'Transmission repair',
    description:
      'Diagnose and repair transmission problems including slipping, hard shifting, delayed engagement, fluid leaks, warning lights, vibrations, and unusual noises.',
    page: '/services/transmission/transmission-repair/'
  },
  {
    name: 'Transmission replacement',
    description:
      'Remove and replace failed transmissions after diagnosing shifting, slipping, leaking, no-engagement, or internal transmission problems.',
    page: '/services/transmission/transmission-replacement-rebuild/'
  },
  {
    name: 'Wheel alignment',
    description:
      'Adjust wheel angles to correct pulling, uneven tire wear, steering-wheel vibration, off-center steering, and handling issues.',
    page: '/services/tires-alignment-suspension/wheel-alignment/'
  },
  {
    name: 'Tire Repair',
    description:
      'Inspect and repair eligible tire punctures, slow leaks, valve-stem problems, and minor tire damage when safe to repair.',
    page: '/services/tires-alignment-suspension/tire-repair-replacement/'
  },
  {
    name: 'Ac Service',
    description:
      'Complete A/C system inspection, diagnosis, refrigerant service, and repair to restore cold, dependable airflow in your vehicle.',
    page: '/services/auto-ac-heating/ac-repair/'
  },
  {
    name: 'Body Repair',
    description:
      'Repair damaged bumpers, fenders, doors, panels, dents, and collision-related exterior damage.',
    page: '/services/auto-body-glass/collision-body-repair/'
  },
  {
    name: 'Body Repair & Paint',
    description:
      'Repair collision and cosmetic damage, including dents, panels, bumpers, scratches, paint preparation, color matching, and refinishing.',
    page: '/services/auto-body-glass/dent-scratch-paint/'
  },
  {
    name: 'Brake Service',
    description:
      'Complete brake service including inspections, pads, rotors, calipers, brake-fluid service, and repairs for noise, vibration, or stopping concerns.',
    page: '/services/brake-repair/brake-pad-rotor-replacement/'
  },
  {
    name: 'Electrical Services',
    description:
      'Diagnose and repair electrical faults involving charging systems, no-start problems, batteries, alternators, starters, wiring, fuses, sensors, and accessories.',
    page: '/services/electrical/battery-alternator-starter/'
  },
  {
    name: 'Engine Services',
    description:
      'Diagnose, maintain, and repair engine issues including check-engine lights, misfires, overheating, leaks, rough idling, power loss, and performance problems.',
    page: '/services/auto-repair-diagnostics/engine-repair/'
  },
  {
    name: 'General Maintenance',
    description:
      'Routine maintenance including oil changes, filters, fluid checks, inspections, belts, wipers, tire service, and manufacturer-recommended vehicle care.',
    page: '/services/auto-repair-diagnostics/tune-ups-maintenance/'
  },
  {
    name: 'Glass Services',
    description:
      'Repair and replace damaged windshields, side windows, rear glass, chips, cracks, and broken vehicle glass.',
    page: '/services/auto-body-glass/auto-glass/'
  },
  {
    name: 'Oil Change',
    description:
      'Replace engine oil and filter using the correct oil type for your vehicle, with a basic check of essential fluids and maintenance items.',
    page: '/services/auto-repair-diagnostics/oil-change/'
  },
  {
    name: 'Suspension Work',
    description:
      'Inspect and repair suspension components—including shocks, struts, ball joints, control arms, and sway-bar links to improve ride quality, handling, and tire wear.',
    page: '/services/tires-alignment-suspension/shocks-struts-steering/'
  },
  {
    name: 'Transmission Rebuild',
    description:
      'Inspect, disassemble, repair, and rebuild qualifying transmissions for slipping, delayed shifting, internal damage, leaks, and transmission failure.',
    page: '/services/transmission/transmission-replacement-rebuild/'
  }
];

/** Roadside services, as listed on the profile. */
const roadsideServices = [
  {
    name: 'Roadside Assistance',
    description:
      'Mobile roadside assistance for drivers in Capitol Heights and nearby areas. We provide jump starts, flat tire assistance, spare tire changes, battery-related help, fuel delivery, lockout assistance, and select minor on-site auto repairs. Call or text YBE Auto Repair Center for fast, dependable help.',
    page: '/roadside-assistance/'
  },
  {
    name: 'Jump Start Service',
    description:
      'Mobile jump-start service for vehicles with weak or dead batteries. We can test the battery and charging system and recommend the next step when needed.',
    page: '/roadside-assistance/jump-start/'
  },
  {
    name: 'Flat Tire Assistance',
    description:
      'Roadside help for flat tires, including tire changes, spare-tire installation, tire inspection, and minor repair when safe and possible.',
    page: '/roadside-assistance/flat-tire/'
  },
  {
    name: 'Car Battery Replacement',
    description:
      'Mobile battery testing and replacement for vehicles with no-start, weak-start, or battery-related issues.',
    page: '/roadside-assistance/mobile-battery-replacement/'
  },
  {
    name: 'Fuel Delivery',
    description:
      'Emergency fuel delivery for drivers who run out of gas in Capitol Heights and nearby service areas.',
    page: '/roadside-assistance/fuel-delivery/'
  },
  {
    name: 'Car Lockout Service',
    description:
      'Roadside vehicle lockout assistance for drivers who are locked out of their car.',
    page: '/roadside-assistance/car-lockout/'
  },
  {
    name: 'Mobile Auto Diagnostics',
    description:
      'On-site diagnostic service for check-engine lights, no-start conditions, battery/charging issues, and select vehicle problems.',
    page: '/roadside-assistance/roadside-mobile-diagnostics/'
  },
  {
    name: 'Mobile Minor Repairs',
    description:
      'Select roadside automotive repairs for minor mechanical or electrical issues that can safely be completed on-site.',
    page: '/roadside-assistance/roadside-mobile-repairs/'
  }
];

const allGmbServices = [...services, ...roadsideServices];

module.exports = { services, roadsideServices, allGmbServices, S };
