/**
 * ELEMENT 4: GEO RELEVANCE, SERVICE x AREA PAGES
 *
 * Source: "Website SEO Gaps Analysis" tab of the owner's research workbook
 * (2026-11-13): "Cut the money services by area: roadside assistance, brake
 * repair, and jump start pages inside each area."
 *
 * Each page is assembled from the area's own record in areas.js (relationship,
 * roads, local driving context, roadside reach) plus the service's record, so
 * no copy is invented for any town. Wording follows what YBE actually does:
 *  - Roadside and jump starts come to the driver, so those pages say "in".
 *  - Brake work happens at the shop, so outside Capitol Heights it says "near".
 */

const { areas } = require('./areas.js');

const TYPES = [
  {
    key: 'roadside-assistance',
    navLabel: 'Roadside Assistance',
    mobile: true,
    title: (a) => `Roadside Assistance in ${a.label}`,
    metaTitle: (a) => `Roadside Assistance in ${a.label} | YBE Auto`,
    metaDescription: (a) =>
      `Stuck in ${a.name}? YBE sends mobile help for dead batteries, flat tires, lockouts and fuel. Roadside assistance, not towing. Call (202) 455-3822.`,
    service: 'roadside-assistance'
  },
  {
    key: 'jump-start',
    navLabel: 'Jump Start',
    mobile: true,
    title: (a) => `Jump Start Service in ${a.label}`,
    metaTitle: (a) => `Jump Start Service in ${a.label} | YBE Auto`,
    metaDescription: (a) =>
      `Dead battery in ${a.name}? YBE comes to you, jump-starts the car and tests the battery and alternator on the spot. Call or text (202) 455-3822.`,
    service: 'jump-start'
  },
  {
    key: 'brake-repair',
    navLabel: 'Brake Repair',
    mobile: false,
    title: (a) => (a.isPrimary ? `Brake Repair in ${a.label}` : `Brake Repair Near ${a.label}`),
    metaTitle: (a) => (a.isPrimary ? `Brake Repair in ${a.label} | YBE Auto` : `Brake Repair Near ${a.label} | YBE Auto`),
    metaDescription: (a) =>
      `Brake noise, grinding or a soft pedal? ${a.name} drivers bring brakes to YBE ${a.isPrimary ? 'at 8632 Edgeworth Dr' : 'in Capitol Heights'}. Pads, rotors, calipers. Call (202) 455-3822.`,
    service: 'brake-repair'
  }
];

/*
 * Capitol Heights is the shop's own town: the main roadside, jump start and
 * brake pages already target it, so it links to those instead of getting a
 * second copy that would compete with them.
 */
const PRIMARY_URLS = {
  'roadside-assistance': '/roadside-assistance/',
  'jump-start': '/roadside-assistance/jump-start/',
  'brake-repair': '/services/brake-repair/'
};

const areaServicePages = [];
areas.forEach((area) => {
  if (area.isPrimary) {
    area.servicePages = TYPES.map((t) => ({
      area, type: t.key, navLabel: t.navLabel, title: t.title(area), url: PRIMARY_URLS[t.key], existing: true
    }));
    return;
  }
  area.servicePages = TYPES.map((t) => {
    const page = {
      area,
      type: t.key,
      mobile: t.mobile,
      navLabel: t.navLabel,
      title: t.title(area),
      metaTitle: t.metaTitle(area),
      metaDescription: t.metaDescription(area),
      service: t.service,
      url: `${area.url}${t.key}/`
    };
    areaServicePages.push(page);
    return page;
  });
});

module.exports = { areaServicePages, AREA_SERVICE_TYPES: TYPES };
