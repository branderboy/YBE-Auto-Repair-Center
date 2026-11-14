/**
 * COMPANY PAGES (owner, 2026-11-14)
 *
 * One page per dealer group and auction in the DC-Metro Commercial
 * Opportunities notes (research/), for people who bought a car there and want
 * it checked or repaired. Locations are the verified ones in those notes.
 *
 * Every page says YBE is independent and not affiliated with the company:
 * none of them is a client or partner. No prices, no turnaround promises.
 * Fleet-management networks (Merchants, Element, Enterprise Fleet) have no
 * page: a page about their vehicles would imply YBE is in their network.
 */

const dealers = [
  { slug: 'easterns-automotive', name: 'Easterns Automotive', short: 'Easterns', locations: ['Laurel, MD', 'Hyattsville, MD', 'Temple Hills, MD', 'Millersville, MD', 'Woodbridge, VA'] },
  { slug: 'iad-auto', name: 'IAD Auto', short: 'IAD Auto', locations: ['Beltsville, MD', 'Landover, MD'] },
  { slug: 'drivetime', name: 'DriveTime', short: 'DriveTime', locations: ['Laurel, MD'] },
  { slug: 'carmax', name: 'CarMax', short: 'CarMax', locations: ['Laurel, MD', 'Brandywine, MD', 'Gaithersburg, MD'] },
  { slug: 'sheehy-auto-stores', name: 'Sheehy Auto Stores', short: 'Sheehy', locations: ['Laurel, MD', 'Gaithersburg, MD', 'Alexandria, VA'] },
  { slug: 'enterprise-car-sales', name: 'Enterprise Car Sales', short: 'Enterprise Car Sales', locations: ['Lanham, MD', 'Suitland, MD', 'Rockville, MD'] }
].map((d) => ({ ...d, kind: 'dealer' }));

const auctions = [
  { slug: 'premier-public-auto-auction', name: 'Premier Public Auto Auction', short: 'Premier Public Auto Auction', locations: ['9595 Lynn Buff Ct, Laurel, MD'] },
  { slug: 'manheim-baltimore-washington', name: 'Manheim Baltimore-Washington', short: 'Manheim', locations: ['7120 Dorsey Run Rd, Elkridge, MD'] },
  { slug: 'capital-auto-auction', name: 'Capital Auto Auction', short: 'Capital Auto Auction', locations: ['1905 Brentwood Rd NE, Washington, DC', '5001 Beech Rd, Marlow Heights, MD'] },
  { slug: 'adesa-washington-dc', name: 'ADESA Washington, DC', short: 'ADESA', locations: ['43375 Old Ox Rd, Dulles, VA'] },
  { slug: 'woodbridge-public-auto-auction', name: 'Woodbridge Public Auto Auction', short: 'Woodbridge Auction', locations: ['1108 Horner Rd, Woodbridge, VA'] },
  { slug: 'carmax-laurel-auction', name: 'CarMax Laurel Auction', short: 'CarMax Auction', locations: ['8800 Freestate Dr, Laurel, MD'] }
].map((a) => ({ ...a, kind: 'auction' }));

const companies = [...dealers, ...auctions];
companies.forEach((c) => {
  c.url = `/used-car-repair/${c.slug}/`;
  c.label = c.kind === 'dealer' ? `${c.short} Used Car Repairs` : `${c.short} Car Repairs`;
});

const hub = {
  url: '/used-car-repair/',
  title: 'Repairs After You Buy a Used or Auction Car',
  metaTitle: 'Used and Auction Car Repairs in Capitol Heights, MD',
  metaDescription:
    'Bought a used car from a dealer or at auction? YBE checks it over and repairs what it needs, independent and open seven days. Call (202) 455-3822.'
};

module.exports = { companies, dealers, auctions, hub };
