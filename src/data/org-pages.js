/**
 * FLEET NETWORK AND GOVERNMENT PROFILE PAGES (owner, 2026-11-14)
 *
 * Profile of each organization and how YBE can assist, from the DC-Metro
 * Commercial Opportunities notes (research/).
 */

const ASSIST_FLEET = [
  'Scheduled maintenance: oil and filters, fluids, inspections',
  'Brakes, tires, steering and suspension',
  'Engine, transmission and electrical diagnostics and repair',
  'Collision and body repair in the same shop',
  'Roadside help: jump starts, flat tires, lockouts, fuel',
  'Written estimate and authorization before any work'
];

const ASSIST_GOV = [
  'Light-duty vehicle maintenance and repair',
  'Diagnostics: warning lights, no-starts, electrical faults',
  'Brakes, tires, steering and suspension',
  'Collision, body and paint repair',
  'Roadside help for vehicles stuck in the field',
  'Written estimates and service records for every job'
];

const orgs = [
  // ------------------------------------------------------------ FLEET NETWORKS
  {
    slug: 'merchants-fleet', kind: 'fleet', name: 'Merchants Fleet', short: 'Merchants Fleet',
    profile: [
      'Merchants Fleet is a fleet management company that leases and manages vehicles for businesses. It keeps those vehicles maintained through a network of local maintenance vendors.',
      'Repairs on Merchants Fleet vehicles are authorized before work begins, through Auto Integrate or by phone, and paid through that same workflow.'
    ],
    assist: [
      'YBE maintains and repairs fleet vehicles in Capitol Heights and nearby Maryland and DC, open seven days a week. For a Merchants-managed vehicle, we estimate the work, get it authorized, and only then start.',
      'Drivers and fleet managers get one shop for mechanical and body work, so a vehicle with a brake problem and a dented panel comes off the road once.'
    ],
    assistList: ASSIST_FLEET
  },
  {
    slug: 'element-fleet', kind: 'fleet', name: 'Element Fleet Management', short: 'Element Fleet',
    profile: [
      'Element Fleet Management runs fleet programs for businesses and public agencies, including maintenance through a network of repair shops.',
      'The State of Maryland lists Element as its fleet-maintenance provider, coordinating repair work for state vehicles through its shop network.'
    ],
    assist: [
      'YBE repairs and maintains cars, SUVs, vans and light trucks in Prince George’s County, close to DC. For Element-managed vehicles, we estimate the work and proceed once it is authorized.',
      'Mechanical, diagnostic and body work happen under one roof, seven days a week, which keeps fleet vehicles off the road for less time.'
    ],
    assistList: ASSIST_FLEET
  },
  {
    slug: 'enterprise-fleet-management', kind: 'fleet', name: 'Enterprise Fleet Management', short: 'Enterprise Fleet',
    profile: [
      'Enterprise Fleet Management provides fleet leasing and management for businesses, with regional teams that coordinate maintenance for their clients’ vehicles through approved maintenance providers.'
    ],
    assist: [
      'YBE handles the maintenance and repairs a business fleet needs, from scheduled service to brakes, diagnostics and body work, in Capitol Heights and nearby Maryland and DC.',
      'Work is estimated and approved before it starts, and we are open seven days a week, so vehicles can come in when the business can spare them.'
    ],
    assistList: ASSIST_FLEET
  },

  // ------------------------------------------------------------ GOVERNMENT
  {
    slug: 'wssc-water', kind: 'gov', name: 'WSSC Water', short: 'WSSC Water',
    profile: [
      'WSSC Water provides water and wastewater service in Prince George’s and Montgomery counties and runs a large vehicle fleet to do it.',
      'It procures vehicle body and repair services through its own procurement portal; solicitation 120591 covered vehicle body and repair services. Check the portal for current status and requirements.'
    ],
    assist: [
      'YBE is based in Prince George’s County and handles the body, paint and mechanical repairs work vehicles need, in one shop, seven days a week.'
    ],
    assistList: ASSIST_GOV
  },
  {
    slug: 'state-of-maryland-fleet', kind: 'gov', name: 'State of Maryland Fleet Program', short: 'Maryland State Fleet',
    profile: [
      'The State of Maryland manages its vehicle fleet through the Department of Budget and Management. Maintenance and repair for state vehicles is coordinated through Element Fleet Management and its network of repair shops.'
    ],
    assist: [
      'YBE maintains and repairs light-duty vehicles in Capitol Heights, close to state offices in Prince George’s County and DC, with mechanical and body work in one shop.'
    ],
    assistList: ASSIST_GOV
  },
  {
    slug: 'dc-office-of-contracting-and-procurement', kind: 'gov', name: 'DC Office of Contracting and Procurement', short: 'DC Government',
    profile: [
      'The DC Office of Contracting and Procurement buys goods and services for District agencies, including vehicle-related work, and publishes its solicitations, contracts and purchase orders.'
    ],
    assist: [
      'YBE sits just over the DC line in Capitol Heights, a short drive from Ward 7 and Ward 8, and handles maintenance, diagnostics and body repairs for cars, vans and light trucks.'
    ],
    assistList: ASSIST_GOV
  },
  {
    slug: 'prince-georges-county', kind: 'gov', name: 'Prince George’s County Government', short: 'Prince George’s County',
    profile: [
      'Prince George’s County buys through its own procurement system: vendors register in SAP Ariba, and solicitations and forecasts are posted on the county’s SPEED portal, including fleet-related bids.'
    ],
    assist: [
      'YBE has been a Prince George’s County shop since 2006, in Capitol Heights. We maintain and repair county-area vehicles with mechanical, diagnostic and body work under one roof, open seven days a week.'
    ],
    assistList: ASSIST_GOV
  },
  {
    slug: 'maryland-emma', kind: 'gov', name: 'Maryland eMMA', short: 'Maryland eMMA',
    profile: [
      'eMaryland Marketplace Advantage (eMMA) is the State of Maryland’s procurement portal, where state agencies post solicitations, including vehicle repair and maintenance.'
    ],
    assist: [
      'YBE handles light-duty vehicle maintenance, repair and body work from Capitol Heights, serving agencies with vehicles in Prince George’s County and the DC area.'
    ],
    assistList: ASSIST_GOV
  },
  {
    slug: 'virginia-eva', kind: 'gov', name: 'Virginia eVA', short: 'Virginia eVA',
    profile: [
      'eVA is the Commonwealth of Virginia’s procurement portal for state agencies and many local governments.'
    ],
    assist: [
      'YBE is in Capitol Heights, MD. For Virginia agencies with vehicles based in DC or Prince George’s County, we handle maintenance, diagnostics and body repairs in one shop.'
    ],
    assistList: ASSIST_GOV
  },
  {
    slug: 'federal-sam-gov', kind: 'gov', name: 'Federal Contracting (SAM.gov)', short: 'Federal Agency',
    profile: [
      'Federal agencies post maintenance, repair and fleet contract opportunities on SAM.gov. Vehicle repair work falls under NAICS codes such as 811111 (general automotive repair), 811121 (body, paint and interior repair) and 811198 (other automotive repair).'
    ],
    assist: [
      'YBE provides general automotive repair, body and paint, and roadside help from Capitol Heights, close to federal facilities across DC and Prince George’s County.'
    ],
    assistList: ASSIST_GOV
  }
];

orgs.forEach((o) => {
  o.url = `/fleet-and-government/${o.slug}/`;
  o.label = `${o.short} Vehicle Repair`;
});

const hub = {
  url: '/fleet-and-government/',
  title: 'Fleet and Government Vehicle Repair',
  description:
    'Fleet management networks and government agencies with vehicles in Prince George’s County and DC: how YBE can assist with maintenance, repair and body work.'
};

module.exports = { orgs, hub };
