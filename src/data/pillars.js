/**
 * THE FIVE CORE ELEMENTS — SITE INFRASTRUCTURE
 * ============================================
 * This file is the spine of the website. The five elements from the project
 * brief are not a content theme here; they are the actual top-level structure.
 * Navigation, the homepage, breadcrumbs, internal linking and the XML sitemap
 * are all generated from this object, so the architecture cannot drift away
 * from the brief.
 *
 *   1. Services              -> /services/<category>/<service>/
 *   2. Service Categories    -> /services/<category>/ + /roadside-assistance/
 *   3. Topical Relevance     -> /car-care/<article>/
 *   4. Geographic Relevance  -> /service-areas/<city>/
 *   5. Trust & Decision      -> /about/, /reviews/, /contact/, /request-appointment/, /faq/
 */

const { categories, allServices } = require('./services.js');
const { hub: roadsideHub } = require('./roadside.js');
const { areas, primaryArea } = require('./areas.js');
const { articles, clusters } = require('./articles.js');

const pillars = [
  {
    id: 'services',
    number: 1,
    name: 'Services',
    url: '/services/',
    navLabel: 'Services',
    summary:
      'A page for each specific problem drivers actually search for, from a check-engine light to a transmission rebuild.',
    description:
      'Individual service pages explain the symptom you notice, what we check, what the work includes and why it should not wait.',
    get count() {
      return allServices.length + roadsideHub.services.length;
    }
  },
  {
    id: 'categories',
    number: 2,
    name: 'Service Categories',
    url: '/services/',
    navLabel: 'Service Categories',
    summary:
      'Hubs that group related work the way the shop is actually organized, matching our Google Business Profile categories.',
    description:
      'Each hub covers one area of the vehicle and links to the specific services beneath it.',
    get count() {
      return categories.length + 1; // + roadside assistance hub
    }
  },
  {
    id: 'topical',
    number: 3,
    name: 'Advice and Car Care',
    url: '/car-care/',
    navLabel: 'Car Care Tips',
    summary:
      'Straight answers to the questions drivers ask before deciding whether to call a mechanic.',
    description:
      'Written for everyday drivers, not mechanics, and linked to the service that fixes the problem.',
    get count() {
      return articles.length;
    }
  },
  {
    id: 'geographic',
    number: 4,
    name: 'Service Areas',
    url: '/service-areas/',
    navLabel: 'Service Areas',
    summary:
      'Capitol Heights is the home shop. Around it, the Maryland and DC communities we genuinely serve.',
    description:
      'Each area page carries its own local context, road references, service emphasis and roadside availability.',
    get count() {
      return areas.length;
    }
  },
  {
    id: 'trust',
    number: 5,
    name: 'Trust and Decision Support',
    url: '/about/',
    navLabel: 'About',
    summary:
      'Who we are, what customers say, where to find us, and how to book — the facts you need before handing over your keys.',
    description:
      'Verified facts only: since 2006, Black-owned, open seven days, and a 4.8 Google rating.',
    count: 5
  }
];

/** Primary site navigation, generated from the pillars above. */
const mainNav = [
  { label: 'Home', url: '/' },
  {
    label: 'Repair Services',
    url: '/services/',
    children: categories.map((c) => ({ label: c.navLabel, url: c.url }))
  },
  {
    label: 'Service Areas',
    url: '/service-areas/',
    children: areas.map((a) => ({ label: a.label, url: a.url }))
  },
  {
    label: 'Car Care Tips',
    url: '/car-care/',
    children: clusters.map((c) => ({ label: c.name, url: `/car-care/#${c.slug}` }))
  },
  { label: 'FAQ', url: '/faq/' },
  {
    label: 'Roadside Help',
    url: roadsideHub.url,
    highlight: true,
    children: roadsideHub.services.map((s) => ({ label: s.navLabel, url: s.url }))
  }
];

/** Footer service links, kept short and pointing at the hubs. */
const footerServiceLinks = [
  ...categories.map((c) => ({ label: c.navLabel, url: c.url })),
  { label: 'Roadside Assistance', url: roadsideHub.url, highlight: true }
];

module.exports = {
  pillars,
  mainNav,
  footerServiceLinks,
  categories,
  allServices,
  roadsideHub,
  areas,
  primaryArea,
  articles,
  clusters
};
