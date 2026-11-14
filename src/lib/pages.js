/**
 * PAGE RENDERERS
 *
 * Every secondary page is composed from src/lib/blocks.js — the section
 * patterns taken from the client's original homepage — so the whole site shares
 * one visual vocabulary: the photo hero with the red rule and red CTA, the
 * numbered service cards, the diagonal-stripe roadside band, the red-check
 * list beside the tilted photo, the dark reviews section, the map with area
 * chips, and the dark contact close.
 */

const T = require('./templates.js');
const { layout } = require('./layout.js');
const { icon, esc } = { icon: require('./icons.js').icon, esc: require('./blocks.js').esc };
const K = require('./blocks.js');
const SM = require('./search-meta.js');
/** Keyword H1 (Core 5): generated from Search Console when the page has a query, else the title's search phrase. */
const kwH1 = (path, title) => SM.h1For(path, title);
// Record meta; layout() swaps in the generated row from research/meta/meta-output.csv when there is one.
const kwTitle = (path, rec) => ({ title: rec.metaTitle, description: rec.metaDescription });
const h1Html = (h1) => SM.accentH1(h1, esc);
const { faqAccordion, faqSchema, serviceSchema } = T;

const { categories, allServices, roadsideHub, areas, primaryArea, articles, clusters } =
  require('../data/pillars.js');
const { serviceBySlug } = require('../data/services.js');
const E = require('../data/entities.js');
const { roadsideBySlug } = require('../data/roadside.js');
const { articleBySlug, articles: allArticles } = require('../data/articles.js');
require('../data/area-services.js'); // attaches area.servicePages
const { faqPages } = require('../data/faq-pages.js');
const CO = require('../data/company-pages.js');
const ORG = require('../data/org-pages.js');
const b = require('../data/business.js');
const { reviewThemes, quotes, faqs, about, commonProblems } = require('../data/trust.js');

const HOME = { label: 'Home', url: '/' };
const areaNames = areas.map((a) => `${a.name}, ${a.state}`);
const lookup = (slug) => serviceBySlug[slug] || roadsideBySlug[slug];
const paras = (arr) => arr.map((p) => `<p>${esc(p)}</p>`).join('');

/** Light content section wrapper matching the homepage's rhythm. */
const section = (inner, bg = 'bg-white', extra = '') =>
  `<section class="py-20 ${bg} ${extra}"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${inner}</div></section>`;

/** Related-services list in the homepage's link style. */
function relatedList(slugs, heading = 'Related Services') {
  const items = (slugs || []).map(lookup).filter(Boolean);
  if (!items.length) return '';
  return `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
    <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">${esc(heading)}</h2>
    <ul class="space-y-3">
      ${items
        .map(
          (s) =>
            `<li><a href="${s.url}" class="inline-flex items-center gap-2 py-2 font-heading text-lg font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred transition-colors">
          ${icon('arrow-right', 18)} ${esc(s.title)}</a></li>`
        )
        .join('')}
    </ul>
  </div>`;
}

/**
 * Reference links for an article.
 *
 * An answer engine weighs whether a page cites anything checkable. These are
 * the same entities the page declares in its structured data, surfaced as real
 * links so a reader can follow them too, rather than being metadata only.
 */
function sourcesBlock(article) {
  const urls = E.services[article.relatedService];
  if (!urls || !urls.length) return '';
  const label = (u) => decodeURIComponent(u.replace(E.WIKI, '')).replace(/_/g, ' ');
  return `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200 mt-12">
    <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3 border-b-2 border-ybe-red pb-2">Further Reading</h2>
    <p class="text-gray-600 text-sm mb-4">Background on the parts and systems described above.</p>
    <ul class="space-y-2">
      ${urls
        .map(
          (u) =>
            `<li><a href="${u}" target="_blank" rel="noopener noreferrer nofollow"
          class="inline-flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">
          ${icon('external-link', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(label(u))} &mdash; Wikipedia</span></a></li>`
        )
        .join('')}
    </ul>
  </div>`;
}

/**
 * Price guide blocks. Only articles from src/data/price-guides.js carry
 * `price`, `factors`, `faqs` and named `sources`; every other article renders
 * exactly as before.
 */
function priceGuideTop(a) {
  if (!a.factors || !a.factors.length) return '';
  return `<div class="mb-12">
    <h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">What Moves The Price</h2>
    <div class="bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm">${K.checkList(a.factors)}</div>
    <p class="text-sm text-gray-600 mt-3">YBE quotes the price for your car before work starts: call ${esc(b.phone.display)}.</p>
    ${a.updated ? `<p class="text-sm text-gray-500 mt-4">Updated <time datetime="${a.updated}">${esc(new Date(a.updated + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }))}</time></p>` : ''}
  </div>`;
}

function priceGuideFaqs(a) {
  if (!a.faqs || !a.faqs.length) return '';
  return `<div class="mb-12">
    <h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">Common Questions</h2>
    ${faqAccordion(a.faqs)}
  </div>`;
}

function namedSources(a) {
  if (!a.sources || !a.sources.length) return '';
  return `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200 mt-12">
    <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3 border-b-2 border-ybe-red pb-2">Sources</h2>
    <p class="text-gray-600 text-sm mb-4">Where the information on this page comes from.</p>
    <ul class="space-y-2">
      ${a.sources
        .map((src) =>
          src.url
            ? `<li><a href="${src.url}" target="_blank" rel="noopener noreferrer nofollow" class="inline-flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">${icon('external-link', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(src.name)}</span></a></li>`
            : `<li class="flex items-start gap-2 py-1.5 text-gray-700 font-medium">${icon('file-text', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(src.name)}</span></li>`
        )
        .join('')}
    </ul>
  </div>`;
}

/**
 * Car-care questions that point at a given service.
 *
 * The audit found several articles with only two inbound links. Articles link
 * down to their service, but nothing linked back up, so the cluster only ran
 * one way. This closes the loop and gives each topic a proper hub.
 */
function relatedQuestions(serviceSlug) {
  const matches = [
    ...faqPages.filter((q) => q.relatedService === serviceSlug).map((q) => ({ url: q.url, title: SM.h1For(q.url, '') })),
    ...allArticles.filter((a) => a.relatedService === serviceSlug)
  ];
  if (!matches.length) return '';
  return `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
    <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Common Questions</h2>
    <ul class="space-y-3">
      ${matches
        .map(
          (a) =>
            `<li><a href="${a.url}" class="inline-flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">
          ${icon('help-circle', 18, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(a.title)}</span></a></li>`
        )
        .join('')}
    </ul>
  </div>`;
}

/** Areas-served chips, required on every service page. */
function areasServed() {
  return `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
    <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3 border-b-2 border-ybe-red pb-2">Areas We Serve</h2>
    <p class="text-gray-600 mb-4">Based in ${esc(primaryArea.label)}, serving nearby Maryland and Washington, DC.</p>
    <div class="flex flex-wrap gap-2">
      ${areas
        .map(
          (a) =>
            `<a href="${a.url}" class="bg-white border border-gray-300 hover:border-ybe-red hover:text-ybe-red text-gray-700 px-4 py-2.5 text-sm font-semibold rounded-sm transition-colors inline-block">${esc(a.label)}</a>`
        )
        .join('')}
    </div>
  </div>`;
}

/* ===================================================== SERVICES HUB */
function renderServicesHub() {
  const cards = categories.map((c) => ({ title: c.title, text: c.blurb, href: c.url, cta: 'View Services' }));
  cards.push({
    title: 'Roadside Assistance',
    text: 'Jump starts, flat-tire help, mobile battery replacement, fuel delivery, lockouts, and select minor repairs.',
    href: roadsideHub.url,
    cta: 'Get Emergency Help'
  });

  const body = `
${K.heroBlock({
  eyebrow: `${primaryArea.label} · Open 7 Days`,
  titleHtml: h1Html('Auto Repair Services in Capitol Heights, MD'),
  sub: 'From minor maintenance to major mechanical and body repairs, our Capitol Heights shop handles it all.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}

${section(
  K.heading2(`Service <span class="text-ybe-red">Categories</span>`, 'Each hub covers one area of the vehicle and links to the specific work beneath it.') +
    K.numberedCards(cards)
)}

${section(
  K.heading2Center(`Every Service We Offer`, 'Jump straight to the problem you are dealing with.') +
    `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${categories
        .map(
          (c) => `<div class="bg-white border border-gray-200 rounded-sm p-8">
        <h3 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4 border-b-2 border-ybe-red pb-2">
          <a href="${c.url}" class="hover:text-ybe-red transition-colors">${esc(c.title)}</a></h3>
        <ul class="space-y-2">
          ${c.services
            .map(
              (s) =>
                `<li><a href="${s.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium transition-colors">
            ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
            )
            .join('')}
        </ul></div>`
        )
        .join('')}
      <div class="bg-white border-2 border-ybe-red rounded-sm p-8">
        <h3 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-red mb-4 border-b-2 border-ybe-red pb-2">
          <a href="${roadsideHub.url}" class="hover:text-ybe-darkred transition-colors">Roadside Assistance</a></h3>
        <ul class="space-y-2">
          ${roadsideHub.services
            .map(
              (s) =>
                `<li><a href="${s.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium transition-colors">
            ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
            )
            .join('')}
        </ul></div>
    </div>`,
  'bg-gray-50'
)}

${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Not Sure What You Need?', sub: 'Describe the symptom over the phone and we will tell you what it points at.' })}`;

  return layout({
    title: `Auto Repair Services in ${primaryArea.label} | YBE Auto`,
    description: `Diagnostics, brakes, transmissions, electrical, tires, alignment, A/C, auto body and roadside assistance in ${primaryArea.label}. Open seven days.`,
    path: '/services/',
    crumbs: [HOME, { label: 'Services', url: '/services/' }],
    body
  });
}

/* ===================================================== CATEGORY HUB */
function renderCategoryHub(cat) {
  const crumbs = [HOME, { label: 'Services', url: '/services/' }, { label: cat.navLabel, url: cat.url }];
  const cards = cat.services.map((s) => ({
    title: s.title,
    text: s.customerVoice ? `“${s.customerVoice}”` : '',
    href: s.url,
    cta: 'Read More'
  }));

  const body = `
${K.heroBlock({
  eyebrow: `${cat.title} · ${primaryArea.label}`,
  titleHtml: h1Html(kwH1(cat.url, cat.metaTitle)),
  sub: cat.blurb,
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <div class="lg:w-2/3">
      <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(cat.intro)}</div>
      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-6">What This Covers</h2>
      ${K.checkList(cat.covers)}
    </div>
    <div class="lg:w-1/3 space-y-8">
      ${areasServed()}
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Other Categories</h2>
        <ul class="space-y-3">
          ${categories
            .filter((c) => c.slug !== cat.slug)
            .map(
              (c) =>
                `<li><a href="${c.url}" class="inline-flex items-center gap-2 font-heading text-lg font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
            ${icon('arrow-right', 18)} ${esc(c.title)}</a></li>`
            )
            .join('')}
          <li><a href="${roadsideHub.url}" class="inline-flex items-center gap-2 font-heading text-lg font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
            ${icon('truck', 18)} Roadside Assistance</a></li>
        </ul>
      </div>
    </div>
  </div>`
)}

${section(
  K.heading2(`${esc(cat.title)} <span class="text-ybe-red">Services</span>`, 'Pick the specific problem you are dealing with.') +
    K.numberedCards(cards),
  'bg-gray-50'
)}

${K.roadsideBand()}
${K.checklistBlock()}
${K.mapAreasBlock()}
${cat.slug === 'commercial-rideshare' ? commercialCta('commercial-hub') : ''}
${K.contactBlock({ heading: `Need ${esc(cat.navLabel)}?` })}`;

  return layout({
    ...kwTitle(cat.url, cat),
    path: cat.url,
    crumbs,
    schema: [serviceSchema({ name: cat.title, description: cat.metaDescription, url: cat.url, areaNames })],
    body
  });
}

/* ===================================================== SERVICE PAGE */
function renderServicePage(svc, cat) {
  const crumbs = [
    HOME,
    { label: 'Services', url: '/services/' },
    { label: cat.navLabel, url: cat.url },
    { label: svc.navLabel || svc.title, url: svc.url }
  ];

  const body = `
${K.heroBlock({
  eyebrow: `${cat.title} · ${svc.title}`,
  titleHtml: h1Html(kwH1(svc.url, svc.metaTitle)),
  sub: svc.customerVoice ? `“${svc.customerVoice}”` : cat.blurb,
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">What You May Be Noticing</h2>
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(svc.problem)}</div>

      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">What YBE Checks and Repairs</h2>
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(svc.whatWeDo)}</div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-red">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5">Common Warning Signs</h2>
          ${K.checkList(svc.warningSigns)}
        </div>
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-black">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5">What This May Include</h2>
          ${K.checkList(svc.includes)}
        </div>
      </div>

      <div class="bg-ybe-black text-white p-10 rounded-sm border-l-8 border-ybe-red mb-12">
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide mb-5 flex items-center gap-3">
          ${icon('alert-triangle', 30, 'text-ybe-red')} Why This Should Not Wait</h2>
        <div class="prose-ybe text-white text-lg">${paras(svc.whyNotIgnore)}</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${relatedList(svc.related)}
        ${relatedQuestions(svc.slug) || areasServed()}
      </div>
      ${relatedQuestions(svc.slug) ? `<div class="mt-8">${areasServed()}</div>` : ''}
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Get This Handled</h2>
        <p class="text-white mb-6 text-sm leading-relaxed">
          Call or text the shop and describe what the car is doing. Open ${esc(b.hours.summary.toLowerCase())}.
        </p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="service-sidebar"
             class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">
            ${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="service-sidebar"
             class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">
            Text Us</a>
          <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="service-sidebar"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Directions</a>
        </div>
        <div class="mt-6 pt-6 border-t border-gray-700 text-sm text-white space-y-2">
          <p class="flex items-start gap-2">${icon('map-pin', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.address.oneLine)}</p>
          <p class="flex items-start gap-2">${icon('clock', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.hours.summary)}</p>
        </div>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">More in ${esc(cat.navLabel)}</h2>
        <ul class="space-y-2">
          ${cat.services
            .filter((s) => s.slug !== svc.slug)
            .map(
              (s) =>
                `<li><a href="${s.url}" class="flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">
            ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
            )
            .join('')}
        </ul>
      </div>
    </aside>
  </div>`
)}

${K.checklistBlock({ heading: `Why Drivers Choose <span class="text-ybe-red">YBE</span>` })}
${cat.slug === 'commercial-rideshare' ? commercialCta('commercial-service') : ''}
${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: `Need ${esc(svc.navLabel || svc.title)}?` })}`;

  return layout({
    ...kwTitle(svc.url, svc),
    path: svc.url,
    crumbs,
    schema: [serviceSchema({ name: svc.title, description: svc.metaDescription, url: svc.url, areaNames })],
    body
  });
}

/* ===================================================== ROADSIDE HUB */
function renderRoadsideHub() {
  const crumbs = [HOME, { label: 'Roadside Assistance', url: roadsideHub.url }];
  const cards = roadsideHub.services.map((s) => ({
    title: s.title,
    text: s.customerVoice ? `“${s.customerVoice}”` : '',
    href: s.url,
    cta: 'Read More'
  }));

  const body = `
${K.heroBlock({
  eyebrow: `Mobile Help · ${primaryArea.label}`,
  titleHtml: h1Html(kwH1(roadsideHub.url, roadsideHub.metaTitle)),
  sub: 'Stuck right now? Calling is faster than any form on this page.',
  ctaLabel: 'Call For Help',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <div class="lg:w-2/3">
      <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(roadsideHub.intro)}</div>
      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-6">What We Handle Roadside</h2>
      ${K.checkList(roadsideHub.covers)}
      <div class="mt-10 bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-black">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">One Thing We Do Not Do</h2>
        <p class="text-gray-700 leading-relaxed">
          YBE provides roadside assistance, <strong>not towing</strong>. If your vehicle needs to come off the road
          entirely, we will tell you that honestly when you call so you can arrange a tow instead of waiting on
          help that would not solve the problem.
        </p>
      </div>
    </div>
    <div class="lg:w-1/3 space-y-8">${areasServed()}</div>
  </div>`
)}

${section(
  K.heading2(`Roadside <span class="text-ybe-red">Services</span>`, 'Pick what you are dealing with, or just call.') +
    K.numberedCards(cards),
  'bg-gray-50'
)}

${roadsideRequestCta('roadside-hub')}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Need Help On The Road?', sub: 'Call the shop directly. Tell us your location and what the vehicle is doing.' })}`;

  return layout({
    title: roadsideHub.metaTitle,
    description: roadsideHub.metaDescription,
    path: roadsideHub.url,
    crumbs,
    schema: [serviceSchema({ name: 'Roadside Assistance', description: roadsideHub.metaDescription, url: roadsideHub.url, areaNames })],
    body
  });
}

/* ===================================================== ROADSIDE SERVICE */
function renderRoadsidePage(svc) {
  const crumbs = [
    HOME,
    { label: 'Roadside Assistance', url: roadsideHub.url },
    { label: svc.navLabel || svc.title, url: svc.url }
  ];

  const body = `
${K.heroBlock({
  eyebrow: `${svc.calm ? 'Mobile Service' : 'Roadside Assistance'} · ${primaryArea.label}`,
  titleHtml: h1Html(kwH1(svc.url, svc.metaTitle)),
  sub: svc.customerVoice ? `“${svc.customerVoice}”` : '',
  ctaLabel: svc.calm ? 'Call For An Offer' : 'Call For Help',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}

${svc.calm ? '' : K.roadsideBand({
  heading: `Stuck? <span class="text-ybe-red bg-white px-2 rounded-sm inline-block transform -skew-x-12">Call Now</span>`,
  sub: 'Tell us where you are and what the vehicle is doing. Open seven days a week, 8:30 AM to 6:00 PM.'
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">What You May Be Dealing With</h2>
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(svc.problem)}</div>

      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">How YBE Helps</h2>
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(svc.whatWeDo)}</div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-red">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5">Signs You Need This</h2>
          ${K.checkList(svc.warningSigns)}
        </div>
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-black">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5">What This May Include</h2>
          ${K.checkList(svc.includes)}
        </div>
      </div>

      <div class="bg-ybe-black text-white p-10 rounded-sm border-l-8 border-ybe-red mb-12">
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide mb-5 flex items-center gap-3">
          ${icon('alert-triangle', 30, 'text-ybe-red')} Worth Knowing</h2>
        <div class="prose-ybe text-white text-lg">${paras(svc.whyNotIgnore)}</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${relatedList(svc.related)}
        ${relatedQuestions(svc.slug) || areasServed()}
      </div>
      ${relatedQuestions(svc.slug) ? `<div class="mt-8">${areasServed()}</div>` : ''}
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-red text-white p-8 rounded-sm lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">${svc.calm ? 'Call For An Offer' : 'Call For Help'}</h2>
        <p class="mb-6 text-sm leading-relaxed text-white/90">${svc.calm ? 'Tell us the year, make, model and condition.' : 'Tell us where you are and what happened.'}</p>
        <a href="${b.phone.href}" data-track="call" data-location="roadside-sidebar"
           class="block w-full text-center bg-white text-ybe-red font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold mb-3">
          ${esc(b.phone.display)}</a>
        <a href="${b.sms.href}" data-track="text" data-location="roadside-sidebar"
           class="block w-full text-center bg-ybe-black text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">
          Text Us Instead</a>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Other Roadside Services</h2>
        <ul class="space-y-2">
          ${roadsideHub.services
            .filter((s) => s.slug !== svc.slug)
            .map(
              (s) =>
                `<li><a href="${s.url}" class="flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">
            ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
            )
            .join('')}
        </ul>
      </div>
    </aside>
  </div>`
)}

${K.mapAreasBlock()}
${svc.calm ? '' : roadsideRequestCta('roadside-page')}
${K.contactBlock({ heading: svc.calm ? 'Call For An Offer' : 'Stuck? Call The Shop.' })}`;

  return layout({
    ...kwTitle(svc.url, svc),
    path: svc.url,
    crumbs,
    schema: [serviceSchema({ name: svc.title, description: svc.metaDescription, url: svc.url, areaNames })],
    body
  });
}

/* ===================================================== SERVICE AREAS HUB */
function renderAreasHub() {
  const crumbs = [HOME, { label: 'Service Areas', url: '/service-areas/' }];
  const cards = areas
    .filter((a) => !a.isPrimary)
    .map((a) => ({ title: a.label, text: a.relationship, href: a.url, cta: 'View Area' }));

  const body = `
${K.heroBlock({
  eyebrow: `Based in ${primaryArea.label}`,
  titleHtml: h1Html('Auto Repair Service Areas Near Capitol Heights, MD'),
  sub: 'The Maryland and DC communities we genuinely serve — not a list of every city within fifty miles.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}

${section(
  `<div class="bg-gray-50 border-2 border-ybe-red rounded-sm p-10 mb-12">
    <div class="flex flex-col md:flex-row gap-10 items-start">
      <div class="md:w-2/3">
        <span class="inline-block bg-ybe-red text-white font-heading uppercase tracking-widest text-xs font-bold px-3 py-1 rounded-sm mb-4">Home Shop</span>
        <h2 class="font-heading text-4xl font-extrabold uppercase tracking-wide text-ybe-black mb-4 leading-none">
          <a href="${primaryArea.url}" class="hover:text-ybe-red transition-colors">${esc(primaryArea.label)}</a></h2>
        <p class="text-gray-700 leading-relaxed mb-5">${esc(primaryArea.intro[0])}</p>
        <a href="${primaryArea.url}" class="inline-flex items-center gap-2 font-heading text-xl font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
          Visit The Shop Page ${icon('arrow-right', 20)}</a>
      </div>
      <div class="md:w-1/3 w-full bg-white border border-gray-200 rounded-sm p-6">
        <ul class="space-y-3 text-sm text-gray-700">
          <li class="flex items-start gap-2">${icon('map-pin', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.address.oneLine)}</li>
          <li class="flex items-start gap-2">${icon('clock', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.hours.summary)}</li>
          <li class="flex items-start gap-2">${icon('phone', 16, 'text-ybe-red flex-shrink-0 mt-0.5')}
            <a href="${b.phone.href}" data-track="call" data-location="areas-hub" class="hover:text-ybe-red">${esc(b.phone.display)}</a></li>
        </ul>
      </div>
    </div>
  </div>` +
    K.heading2(`Communities We <span class="text-ybe-red">Serve</span>`, 'Each area page covers local roads, the work we see most there, and roadside availability.') +
    K.numberedCards(cards, { cols: 'md:grid-cols-2 lg:grid-cols-3' }) +
    `<div class="mt-12 bg-gray-50 border-l-4 border-ybe-black p-8 rounded-sm">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">Not On The List?</h2>
      <p class="text-gray-700 leading-relaxed">
        Call the shop. If you are close enough that it makes sense, we will tell you. If you would be better
        served by somebody nearer to you, we will tell you that too.
      </p>
    </div>`
)}

${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Bring It To The Shop' })}`;

  return layout({
    title: `Service Areas | YBE Auto Repair, ${primaryArea.label}`,
    description: `YBE serves ${primaryArea.label}, Washington DC, District Heights, Landover, Forestville, Hyattsville, Lanham, Bowie and Upper Marlboro. Call ${b.phone.display}.`,
    path: '/service-areas/',
    crumbs,
    body
  });
}

/* ===================================================== AREA PAGE */
function renderAreaPage(area) {
  const crumbs = [HOME, { label: 'Service Areas', url: '/service-areas/' }, { label: area.label, url: area.url }];
  const svcs = (area.priorityServices || []).map(lookup).filter(Boolean);
  const cards = svcs.map((s) => ({
    title: s.title,
    text: s.customerVoice ? `“${s.customerVoice}”` : '',
    href: s.url,
    cta: 'Read More'
  }));

  const body = `
${K.heroBlock({
  eyebrow: `${area.isPrimary ? 'Our Location' : 'Service Area'} · ${esc(area.relationship)}`,
  titleHtml: (() => {
    const h = area.isPrimary ? `Auto Repair Shop in ${area.label}` : kwH1(area.url, area.metaTitle);
    return h1Html(h);
  })(),
  sub: area.intro[0],
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(area.intro.slice(1))}</div>

      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">
        What We See Most From ${esc(area.name)} Drivers</h2>
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(area.localContext)}</div>

      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">Getting Here</h2>
      <p class="text-gray-700 leading-relaxed mb-4 text-lg">${esc(area.landmarkNote)}</p>
      <p class="text-gray-700 leading-relaxed mb-8 text-lg">
        Main routes in this area include ${esc(area.roads.join(', '))}.
        The shop is at <strong>${esc(b.address.oneLine)}</strong>.
      </p>

      <div class="bg-gray-50 border-l-4 border-ybe-red p-8 rounded-sm">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4 flex items-center gap-2">
          ${icon('truck', 24, 'text-ybe-red')} Roadside Help in ${esc(area.name)}</h2>
        <p class="text-gray-700 leading-relaxed mb-5">${esc(area.roadsideNote)}</p>
        <div class="flex flex-wrap gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="area-roadside"
             class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl px-6 py-3 rounded-sm shadow-hard uppercase tracking-wide font-bold flex items-center gap-2">
            ${icon('phone', 20)} Call For Help</a>
          <a href="${roadsideHub.url}" class="bg-ybe-black hover:bg-ybe-charcoal text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold flex items-center gap-2">
            ${icon('info', 20)} Roadside Services</a>
        </div>
      </div>

      <div class="mt-8 bg-white border border-gray-200 p-8 rounded-sm">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4 border-b-2 border-ybe-red pb-2">${esc(area.name)} Service Pages</h2>
        <ul class="space-y-2">
          ${(area.servicePages || [])
            .map(
              (p) =>
                `<li><a href="${p.url}" class="inline-flex items-center gap-2 py-1.5 font-heading text-lg font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">${icon('arrow-right', 18)} ${esc(p.title)}</a></li>`
            )
            .join('')}
        </ul>
      </div>
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Call From ${esc(area.name)}</h2>
        <p class="text-white mb-6 text-sm leading-relaxed">Call or text the shop, or stop by. Open seven days a week.</p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="area-sidebar"
             class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="area-sidebar"
             class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
          <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="area-sidebar"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Directions</a>
        </div>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Nearby Areas</h2>
        <ul class="space-y-2">
          ${areas
            .filter((a) => a.slug !== area.slug)
            .slice(0, 8)
            .map(
              (a) =>
                `<li><a href="${a.url}" class="flex items-center gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">
            ${icon('map-pin', 14, 'text-ybe-red flex-shrink-0')} ${esc(a.label)}</a></li>`
            )
            .join('')}
        </ul>
      </div>
    </aside>
  </div>`
)}

${section(
  K.heading2(`Services ${esc(area.name)} Drivers <span class="text-ybe-red">Use Most</span>`) + K.numberedCards(cards, { cols: 'md:grid-cols-2 lg:grid-cols-3' }),
  'bg-gray-50'
)}

${K.roadsideBand()}
${K.checklistBlock({ heading: `Why ${esc(area.name)} Drivers Choose <span class="text-ybe-red">YBE</span>` })}
${K.mapAreasBlock({ activeSlug: area.slug })}
${K.contactBlock({ heading: `Serving ${esc(area.label)}` })}`;

  return layout({
    ...kwTitle(area.url, area),
    path: area.url,
    crumbs,
    schema: [
      serviceSchema({ name: `Auto Repair in ${area.label}`, description: area.metaDescription, url: area.url, areaNames: [area.label] })
    ],
    body
  });
}

/* ===================================================== SERVICE x AREA */
/**
 * Roadside assistance, jump start and brake repair for one area. Every
 * paragraph comes from the area's record or the service's record; see
 * src/data/area-services.js.
 */
function renderAreaServicePage(page) {
  const { area } = page;
  const crumbs = [
    HOME,
    { label: 'Service Areas', url: '/service-areas/' },
    { label: area.label, url: area.url },
    { label: page.navLabel, url: page.url }
  ];
  const guide = (slug) => articleBySlug[slug];
  const linkItem = (href, label, sub = '') =>
    `<li><a href="${href}" class="flex items-start gap-2 py-2 text-gray-700 hover:text-ybe-red font-medium">
      ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span><span class="font-semibold">${esc(label)}</span>${sub ? `<span class="block text-sm text-gray-500">${esc(sub)}</span>` : ''}</span></a></li>`;
  const h2 = (t) => `<h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">${t}</h2>`;
  const roadsList = `<p class="text-gray-700 leading-relaxed text-lg mb-12">${
    page.mobile
      ? `We reach drivers along ${esc(area.roads.join(', '))}. Tell us the cross street or a landmark when you call.`
      : `${esc(area.landmarkNote)} The shop is at <strong>${esc(b.address.oneLine)}</strong>, open ${esc(b.hours.summary)}.`
  }</p>`;

  let main = '';
  let guides = [];
  if (page.type === 'roadside-assistance') {
    const svcs = roadsideHub.services.filter((s) => !s.calm);
    guides = ['jump-start-cost', 'flat-tire-help-cost', 'car-lockout-cost', 'fuel-delivery-cost'];
    main = `
      ${h2(`Roadside Help in ${esc(area.name)}`)}
      <div class="prose-ybe text-lg text-gray-700 mb-6"><p>${esc(area.roadsideNote)}</p><p>${esc(area.intro[1] || area.intro[0])}</p></div>
      ${roadsList}
      ${h2('What We Handle Where You Sit')}
      <ul class="bg-gray-50 border-l-4 border-ybe-red rounded-sm p-6 mb-12">${svcs.map((s) => linkItem(s.url, s.title, s.customerVoice ? `“${s.customerVoice}”` : '')).join('')}</ul>
      <div class="bg-ybe-black text-white p-8 rounded-sm border-l-8 border-ybe-red mb-12">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Roadside Assistance, Not Towing</h2>
        <p class="text-white leading-relaxed">If the car needs to come off the road entirely, we tell you that when you call, so you can arrange a tow instead of waiting on help that will not solve the problem.</p>
      </div>`;
  } else if (page.type === 'jump-start') {
    const js = roadsideBySlug['jump-start'];
    guides = ['jump-start-cost', 'car-battery-replacement-cost', 'alternator-replacement-cost'];
    main = `
      ${h2(`Dead Battery in ${esc(area.name)}?`)}
      <div class="prose-ybe text-lg text-gray-700 mb-6">${paras(js.problem.slice(0, 1))}<p>${esc(area.relationship)} ${esc(area.roadsideNote)}</p><p>${esc(area.localContext[area.localContext.length - 1])}</p></div>
      ${roadsList}
      ${h2('What Happens When We Get There')}
      <div class="prose-ybe text-lg text-gray-700 mb-8">${paras(js.whatWeDo)}</div>
      <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm mb-12">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Signs It Is The Battery</h2>
        ${K.checkList(js.warningSigns)}
      </div>`;
  } else {
    const pads = serviceBySlug['brake-pad-rotor-replacement'];
    const brakeSvcs = ['brake-pad-rotor-replacement', 'brake-noise-vibration', 'brake-fluid-calipers'].map((s) => serviceBySlug[s]).filter(Boolean);
    guides = ['brake-pad-replacement-cost', 'what-affects-brake-repair-cost', 'signs-brake-pads-need-replacement'];
    main = `
      ${h2(`What We See From ${esc(area.name)} Drivers`)}
      <div class="prose-ybe text-lg text-gray-700 mb-6">${paras(area.localContext)}</div>
      ${h2(area.isPrimary ? 'Find The Shop' : `From ${esc(area.name)} To The Shop`)}
      ${roadsList}
      ${h2('Brake Work We Do')}
      <ul class="bg-gray-50 border-l-4 border-ybe-red rounded-sm p-6 mb-12">${brakeSvcs.map((s) => linkItem(s.url, s.title, s.customerVoice ? `“${s.customerVoice}”` : '')).join('')}</ul>
      <div class="bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm mb-12">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Signs Your Brakes Need Attention</h2>
        ${K.checkList(pads.warningSigns)}
      </div>`;
  }

  const guideLinks = guides.map(guide).filter(Boolean);
  const siblings = area.servicePages.filter((p) => p.type !== page.type);

  const body = `
${K.heroBlock({
  eyebrow: `${esc(area.label)} · ${page.mobile ? 'We Come To You' : esc(area.relationship)}`,
  titleHtml: h1Html(kwH1(page.url, page.title)),
  sub: (SM.metaFor(page.url) || page).description || page.metaDescription,
  ctaLabel: page.mobile ? 'Call For Help' : 'Call The Shop',
  secondary: page.mobile
    ? { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
    : { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      ${main}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Price Guides</h2>
          <ul>${guideLinks.map((g) => linkItem(g.url, g.title)).join('')}</ul>
        </div>
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">More For ${esc(area.name)}</h2>
          <ul>
            ${linkItem(area.url, `Auto repair for ${area.label}`)}
            ${siblings.map((p) => linkItem(p.url, p.title)).join('')}
          </ul>
        </div>
      </div>
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="${page.mobile ? 'bg-ybe-red' : 'bg-ybe-black border-t-4 border-ybe-red'} text-white p-8 rounded-sm lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">${page.mobile ? 'Call For Help' : `Call From ${esc(area.name)}`}</h2>
        <p class="mb-6 text-sm leading-relaxed text-white/90">${page.mobile ? 'Tell us where you are and what the car is doing.' : 'Call or text the shop, or stop by. Open seven days a week.'}</p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="area-service-sidebar"
             class="w-full text-center ${page.mobile ? 'bg-white text-ybe-red' : 'bg-ybe-red hover:bg-ybe-darkred text-white'} font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="area-service-sidebar"
             class="w-full text-center ${page.mobile ? 'bg-ybe-black text-white' : 'bg-white hover:bg-gray-100 text-ybe-black'} font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
          ${page.mobile ? '' : `<a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="area-service-sidebar"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Directions</a>`}
        </div>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">${esc(page.navLabel)} Nearby</h2>
        <ul class="space-y-1">
          ${areas
            .filter((a) => a.slug !== area.slug)
            .map((a) => a.servicePages.find((p) => p.type === page.type))
            .map((p) => `<li><a href="${p.url}" class="flex items-center gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">${icon('map-pin', 14, 'text-ybe-red flex-shrink-0')} ${esc(p.area.label)}</a></li>`)
            .join('')}
        </ul>
      </div>
    </aside>
  </div>`
)}

${page.mobile ? roadsideRequestCta('area-roadside') : K.roadsideBand()}
${K.contactBlock({ heading: `Serving ${esc(area.label)}` })}`;

  return layout({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.url,
    crumbs,
    schema: [serviceSchema({ name: page.title, description: page.metaDescription, url: page.url, areaNames: [area.label] })],
    body
  });
}

/* ===================================================== CAR CARE HUB */
function renderCarCareHub() {
  const crumbs = [HOME, { label: 'Car Care Tips', url: '/car-care/' }];
  const body = `
${K.heroBlock({
  eyebrow: `${primaryArea.label} · Open 7 Days`,
  titleHtml: `Car Care <span class="text-ybe-red">Tips</span>`,
  sub: 'Straight answers to the questions drivers ask before deciding whether to call a shop.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'All Services', href: '/services/', icon: 'wrench' }
})}

${section(
  clusters
    .map(
      (c) => `<div id="${c.slug}" class="scroll-mt-32 mb-16 last:mb-0">
    <div class="border-b-2 border-ybe-red pb-3 mb-8">
      <h2 class="font-heading text-4xl font-extrabold uppercase tracking-wide text-ybe-black leading-none">${esc(c.name)}</h2>
      <p class="text-gray-600 font-medium mt-2">${esc(c.blurb)}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${c.articles
        .map(
          (a) => `<a href="${a.url}" class="bg-gray-50 p-8 rounded-sm border border-gray-200 hover:border-ybe-red transition-colors flex flex-col justify-between group">
        <div>
          <h3 class="text-xl font-heading font-bold text-ybe-black uppercase tracking-wide mb-4">${esc(a.title)}</h3>
          <p class="text-gray-700 leading-relaxed mb-6">${esc(a.shortAnswer.slice(0, 140))}…</p>
        </div>
        <span class="inline-flex items-center font-heading text-lg font-bold text-ybe-red uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300">
          Read Answer ${icon('arrow-right', 20, 'ml-1')}</span>
      </a>`
        )
        .join('')}
    </div>
  </div>`
    )
    .join('')
)}

${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Still Not Sure?', sub: 'Describe the symptom over the phone and we will tell you what it points at.' })}`;

  return layout({
    title: `Common Car Problems and What They Mean | YBE Auto`,
    description: `Answers to what drivers ask most: check-engine lights, brake noise, overheating, transmission trouble and roadside problems. YBE, ${primaryArea.label}.`,
    path: '/car-care/',
    crumbs,
    body
  });
}

/* ===================================================== ARTICLE */
function renderArticle(a) {
  const cluster = clusters.find((c) => c.slug === a.cluster);
  const crumbs = [HOME, { label: 'Car Care Tips', url: '/car-care/' }, { label: a.title, url: a.url }];
  const svc = lookup(a.relatedService);
  const related = (a.relatedArticles || []).map((s) => articleBySlug[s]).filter(Boolean);

  const body = `
${K.heroBlock({
  eyebrow: esc(cluster.name),
  titleHtml: esc(SM.h1For(a.url, a.title)),
  sub: a.shortAnswer,
  ctaLabel: 'Call The Shop',
  secondary: svc ? { label: 'The Fix', href: svc.url, icon: 'wrench' } : undefined
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      ${priceGuideTop(a)}
      ${a.sections
        .map(
          (s) => `<div class="mb-12">
        <h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">${esc(s.h2)}</h2>
        <div class="prose-ybe text-lg text-gray-700">${paras(s.paras)}</div>
        ${s.list ? `<div class="mt-6 bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm">${K.checkList(s.list)}</div>` : ''}
      </div>`
        )
        .join('')}

      ${
        svc
          ? `<div class="bg-ybe-black text-white p-10 rounded-sm border-l-8 border-ybe-red mb-12">
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Need This Fixed?</h2>
        <p class="text-white leading-relaxed mb-6 text-lg">
          YBE handles this at the ${esc(primaryArea.name)} shop, seven days a week. Read about
          <a href="${svc.url}" class="text-ybe-red hover:text-white font-semibold underline">${esc(svc.title)}</a>,
          or call and describe what your car is doing.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="${b.phone.href}" data-track="call" data-location="article"
             class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-8 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold flex items-center gap-2">
            ${icon('phone', 24)} ${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="article"
             class="bg-white hover:bg-gray-100 text-ybe-black font-heading text-2xl px-8 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold flex items-center gap-2">
            ${icon('message-square', 24)} Text Us</a>
        </div>
      </div>`
          : ''
      }

      ${priceGuideFaqs(a)}
      ${namedSources(a)}
      ${sourcesBlock(a)}

      ${
        related.length
          ? `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200 mt-12">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Related Questions</h2>
        <ul class="space-y-3">
          ${related
            .map(
              (r) =>
                `<li><a href="${r.url}" class="inline-flex items-start gap-2 font-heading text-lg font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
            ${icon('arrow-right', 18, 'flex-shrink-0 mt-1')} <span>${esc(r.title)}</span></a></li>`
            )
            .join('')}
        </ul></div>`
          : ''
      }
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Talk To A Mechanic</h2>
        <p class="text-white mb-6 text-sm leading-relaxed">Open ${esc(b.hours.summary.toLowerCase())} in ${esc(primaryArea.label)}.</p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="article-sidebar"
             class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="article-sidebar"
             class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
          <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="article-sidebar"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Directions</a>
        </div>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">More in ${esc(cluster.name)}</h2>
        <ul class="space-y-2">
          ${cluster.articles
            .filter((x) => x.slug !== a.slug)
            .map(
              (x) =>
                `<li><a href="${x.url}" class="flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">
            ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(x.title)}</span></a></li>`
            )
            .join('')}
        </ul>
      </div>
    </aside>
  </div>`
)}

${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Get It Looked At' })}`;

  return layout({
    title: a.metaTitle,
    description: a.metaDescription,
    path: a.url,
    crumbs,
    ogType: 'article',
    schema: [
      {
        '@type': 'Article',
        headline: a.title,
        description: a.metaDescription,
        url: T.abs(a.url),
        author: { '@id': `${b.siteUrl}/#business` },
        publisher: { '@id': `${b.siteUrl}/#business` },
        mainEntityOfPage: T.abs(a.url),
        ...(a.updated ? { datePublished: a.updated, dateModified: a.updated } : {})
      },
      ...(a.faqs && a.faqs.length ? [faqSchema(a.faqs)] : [])
    ],
    body
  });
}

/* ===================================================== ABOUT */
function renderAbout() {
  const crumbs = [HOME, { label: 'About', url: '/about/' }];
  const body = `
${K.heroBlock({
  eyebrow: `Since ${b.openedYear} · ${primaryArea.label}`,
  titleHtml: h1Html('About YBE Auto Repair Center in Capitol Heights, MD'),
  sub: `A Black-owned, independent auto repair shop in ${primaryArea.label}, open seven days a week since ${b.openedYear}.`,
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <div class="lg:w-2/3">
      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">Two Decades on Edgeworth Drive</h2>
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(about.story)}</div>
      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">How We Work</h2>
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(about.approach)}</div>

      <!--
        Element 5 — trust. Every line below is a fact the Google Business
        Profile confirms, or a description of the process itself. Nothing here
        asserts a certification, warranty or turnaround time, because none of
        those are verified. Telling someone what will actually happen is worth
        more than a badge they cannot check.
      -->
      <h2 class="text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">What To Expect</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        ${[
          {
            icon: 'calendar',
            title: 'Call or text first',
            body: `We work by appointment, so call or text ${b.phone.display} before coming in and we will tell you when to bring it.`
          },
          {
            icon: 'search',
            title: 'Diagnosis before parts',
            body: 'We find out what failed before anything gets replaced. A code points at a circuit, not a broken part, and guessing is how people pay twice.'
          },
          {
            icon: 'message-square',
            title: 'You hear it before we do it',
            body: 'We tell you what we found and what it takes to fix before the work starts. No repair happens that you did not agree to.'
          },
          {
            icon: 'wrench',
            title: 'One shop, most jobs',
            body: 'Mechanical repair, diagnostics, electrical and bodywork happen in the same building, so a repair that crosses systems does not bounce you between shops.'
          },
          {
            icon: 'clock',
            title: 'Open seven days',
            body: `${b.hours.summary}, including weekends, so getting the car looked at does not have to cost you a work day.`
          },
          {
            icon: 'credit-card',
            title: 'Pay how you like',
            body: `We take cards, debit and tap-to-pay${b.cashOnly ? '' : ' — we are not a cash-only shop'}.`
          }
        ]
          .map(
            (t) => `<div class="bg-white border border-gray-200 rounded-sm p-6">
          <div class="flex items-center gap-3 mb-2">${icon(t.icon, 22, 'text-ybe-red flex-shrink-0')}
            <h3 class="font-heading text-lg font-bold uppercase tracking-wide text-ybe-black">${esc(t.title)}</h3></div>
          <p class="text-gray-600 leading-relaxed">${esc(t.body)}</p></div>`
          )
          .join('')}
      </div>
      <div class="bg-gray-50 border-l-4 border-ybe-black p-8 rounded-sm">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">What We Do Not Claim</h2>
        <p class="text-gray-700 leading-relaxed">
          We do not provide towing. We would rather tell you that up front than have you waiting on the
          shoulder for help that cannot solve your problem.
        </p>
      </div>
    </div>
    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-6 border-b-2 border-ybe-red pb-2">The Facts</h2>
        <dl class="space-y-4">
          ${about.facts
            .map(
              (f) => `<div>
          <dt class="font-heading text-sm uppercase tracking-widest text-ybe-red font-bold">${esc(f.label)}</dt>
          <dd class="text-gray-800 font-medium">${esc(f.value)}</dd></div>`
            )
            .join('')}
        </dl>
      </div>
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-5">Come See Us</h2>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="about-sidebar"
             class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="about-sidebar"
             class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
          <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="about-sidebar"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Directions</a>
        </div>
      </div>
    </aside>
  </div>`
)}

${section(
  K.heading2(`What We <span class="text-ybe-red">Handle</span>`) +
    K.numberedCards([
      ...categories.map((c) => ({ title: c.title, text: c.blurb, href: c.url, cta: 'View Services' })),
      { title: 'Roadside Assistance', text: 'Jump starts, flat tires, batteries, fuel, lockouts and minor mobile repairs.', href: roadsideHub.url, cta: 'Get Help' }
    ]),
  'bg-gray-50'
)}

${K.checklistBlock()}
${K.reviewsBlock(reviewThemes.slice(0, 3).map((t) => ({ title: t.theme, text: t.detail })))}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Bring Us Your Car' })}`;

  return layout({
    title: `About YBE Auto Repair Center | ${primaryArea.label}`,
    description: `A Black-owned auto repair shop in ${primaryArea.label}, open seven days a week since ${b.openedYear}. Mechanical repair, bodywork and roadside assistance.`,
    path: '/about/',
    crumbs,
    body
  });
}

/* ===================================================== REVIEWS */
function renderReviews() {
  const crumbs = [HOME, { label: 'Reviews', url: '/reviews/' }];
  const body = `
${K.heroBlock({
  eyebrow: 'Google Reviews',
  titleHtml: `YBE Auto Repair Center <span class="text-ybe-red">Reviews</span>`,
  sub: 'What customers mention most, drawn from our Google reviews.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Read on Google', href: b.rating.profileUrl, icon: 'external-link', track: 'reviews' }
})}

${section(
  K.heading2(`What Customers <span class="text-ybe-red">Mention Most</span>`, 'Themes that come up repeatedly across our reviews.') +
    `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${reviewThemes
        .map(
          (t) => `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-red">
        <div class="flex gap-0.5 mb-4">${Array(5).fill(icon('star', 28, 'fill-white stroke-ybe-darkred')).join('')}</div>
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-3">${esc(t.theme)}</h3>
        <p class="text-gray-700 leading-relaxed">${esc(t.detail)}</p>
      </div>`
        )
        .join('')}
    </div>`
)}

${section(
  `<div class="bg-ybe-black text-white p-10 rounded-sm border-l-8 border-ybe-red flex flex-col md:flex-row md:items-center gap-6 justify-between">
    <div>
      <h2 class="font-heading text-3xl font-bold uppercase tracking-wide mb-2">Been To YBE? Leave A Review</h2>
      <p class="text-white leading-relaxed max-w-2xl">A sentence or two about the repair helps the next driver in Capitol Heights decide. Open our Google listing and tap Reviews.</p>
    </div>
    <a href="${b.rating.listingUrl}" target="_blank" rel="noopener noreferrer" data-track="review" data-location="reviews-page"
       class="flex-shrink-0 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-8 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold inline-flex items-center gap-2">
      ${icon('star', 24)} Review On Google</a>
  </div>`
)}

${K.reviewsBlock(quotes.map((q) => ({ title: 'Google Review', text: q.text })), {
  heading: `In Customers' Words`,
  sub: 'Summarized from customer feedback. Read the full, unedited reviews on our Google Business Profile.'
})}

${K.checklistBlock()}
${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'See For Yourself' })}`;

  return layout({
    title: `Reviews | YBE Auto Repair, ${primaryArea.label}`,
    description: `What customers say about ${b.name} in Capitol Heights, MD: fair pricing, fast turnaround and weekend hours. Call ${b.phone.display}.`,
    path: '/reviews/',
    crumbs,
    body
  });
}

/* ===================================================== CONTACT */
function renderContact() {
  const crumbs = [HOME, { label: 'Contact', url: '/contact/' }];
  const tiles = [
    { href: b.phone.href, track: 'call', icon: 'phone', title: 'Call', sub: b.phone.display, cls: 'bg-ybe-red text-white hover:bg-ybe-darkred' },
    { href: b.sms.href, track: 'text', icon: 'message-square', title: 'Text', sub: b.phone.display, cls: 'bg-ybe-black text-white hover:bg-ybe-charcoal' },
    { href: b.whatsapp.href, track: 'whatsapp', icon: 'message-circle', title: 'WhatsApp', sub: 'Message us', cls: 'bg-[#25D366] text-white hover:bg-[#128C7E]', ext: true },
    { href: b.maps.directionsUrl, track: 'directions', icon: 'navigation', title: 'Directions', sub: 'Open in Maps', cls: 'bg-gray-100 text-ybe-black border-2 border-ybe-black hover:bg-white', ext: true }
  ];

  const body = `
${K.heroBlock({
  eyebrow: `Open ${esc(b.hours.summary)}`,
  titleHtml: h1Html('Contact and Directions in Capitol Heights, MD'),
  sub: b.address.oneLine,
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}

${section(
  `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    ${tiles
      .map(
        (t) => `<a href="${t.href}" ${t.ext ? 'target="_blank" rel="noopener noreferrer"' : ''} data-track="${t.track}" data-location="contact-tiles"
      class="${t.cls} p-8 rounded-sm text-center transition-colors">
      ${icon(t.icon, 36, 'mx-auto mb-4')}
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-1">${esc(t.title)}</h2>
      <p class="font-medium">${esc(t.sub)}</p></a>`
      )
      .join('')}
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-6 border-b-2 border-ybe-red pb-2">Shop Information</h2>
      <ul class="space-y-5 text-gray-700">
        <li class="flex items-start gap-3">${icon('map-pin', 22, 'text-ybe-red flex-shrink-0 mt-0.5')}
          <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Address</strong>${esc(b.address.oneLine)}</div></li>
        <li class="flex items-start gap-3">${icon('clock', 22, 'text-ybe-red flex-shrink-0 mt-0.5')}
          <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Hours</strong>${esc(b.hours.summary)}</div></li>
        <li class="flex items-start gap-3">${icon('phone', 22, 'text-ybe-red flex-shrink-0 mt-0.5')}
          <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Phone &amp; Text</strong>
            <a href="${b.phone.href}" data-track="call" data-location="contact-info" class="hover:text-ybe-red">${esc(b.phone.display)}</a></div></li>
        <li class="flex items-start gap-3">${icon('accessibility', 22, 'text-ybe-red flex-shrink-0 mt-0.5')}
          <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Accessibility</strong>${esc(b.accessibility.join(', '))}</div></li>
        <li class="flex items-start gap-3">${icon('calendar', 22, 'text-ybe-red flex-shrink-0 mt-0.5')}
          <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Appointments</strong>${
            b.appointmentRequired ? 'Appointment required — call or text before coming in' : 'Walk-ins welcome'
          }</div></li>
      </ul>
    </div>
    <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-5">Weekly Hours</h2>
      <ul class="space-y-1 text-white">
        ${b.hours.days
          .map(
            (d) =>
              `<li class="flex justify-between border-b border-gray-800 py-2"><span>${esc(d)}</span><span class="font-semibold text-white">8:30 AM – 6:00 PM</span></li>`
          )
          .join('')}
      </ul>
    </div>
  </div>`
)}

${
  b.paymentMethods.length
    ? section(
        `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-2 border-b-2 border-ybe-red pb-2">How You Can Pay</h2>
        <p class="text-gray-600 text-sm mb-5">${b.cashOnly ? 'Cash only.' : 'We are not a cash-only shop.'}</p>
        <ul class="flex flex-wrap gap-2">
          ${b.paymentMethods
            .map(
              (m) =>
                `<li class="border border-gray-300 bg-white px-3 py-1.5 rounded-sm text-sm font-medium text-ybe-black">${esc(m)}</li>`
            )
            .join('')}
        </ul>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">At The Shop</h2>
        <ul class="space-y-3 text-gray-700">
          ${[...b.accessibility, ...b.amenities]
            .map(
              (a) =>
                `<li class="flex items-start gap-2">${icon('check', 18, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(a)}</span></li>`
            )
            .join('')}
        </ul>
      </div>
    </div>`,
        { bg: 'bg-white' }
      )
    : ''
}

${K.roadsideBand()}
${K.mapAreasBlock({ heading: `Find Us in <span class="text-ybe-red">${esc(primaryArea.name)}</span>` })}
${K.contactBlock({ heading: 'We Are Open Today' })}`;

  return layout({
    title: `Contact & Directions | YBE Auto, ${primaryArea.label}`,
    description: `Find ${b.name} at ${b.address.oneLine}. Open ${b.hours.summary.toLowerCase()}. Call or text ${b.phone.display}, or get directions.`,
    path: '/contact/',
    crumbs,
    body
  });
}

/* ===================================================== FAQ */
function renderFaq() {
  const crumbs = [HOME, { label: 'FAQ', url: '/faq/' }];
  const body = `
${K.heroBlock({
  eyebrow: `${primaryArea.label} · Open 7 Days`,
  titleHtml: h1Html('Auto Repair Questions for Capitol Heights, MD'),
  sub: 'Hours, walk-ins, roadside assistance, towing, and what we do and do not offer.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Contact Us', href: '/contact/', icon: 'map-pin' }
})}

<section class="py-20 bg-gray-100">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    ${K.heading2Center('Frequently Asked Questions')}
    ${faqAccordion(faqs)}
    <div class="mt-10 bg-white p-8 rounded-sm border border-gray-200">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Cost And Repair Questions</h2>
      <ul class="space-y-2">
        ${faqPages
          .map(
            (q) =>
              `<li><a href="${q.url}" class="inline-flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">${icon('help-circle', 18, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(SM.h1For(q.url, ''))}</span></a></li>`
          )
          .join('')}
      </ul>
    </div>
    <div class="mt-10 bg-white border-l-4 border-ybe-red p-8 rounded-sm">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">Question Not Answered?</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Call or text the shop. We would rather answer a question than have you guessing.</p>
      <div class="flex flex-wrap gap-4">
        <a href="${b.phone.href}" data-track="call" data-location="faq"
           class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl px-6 py-3 rounded-sm shadow-hard uppercase tracking-wide font-bold flex items-center gap-2">
          ${icon('phone', 20)} ${esc(b.phone.display)}</a>
        <a href="${b.sms.href}" data-track="text" data-location="faq"
           class="bg-ybe-black hover:bg-ybe-charcoal text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold flex items-center gap-2">
          ${icon('message-square', 20)} Text Us</a>
      </div>
    </div>
  </div>
</section>

${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Still Have Questions?' })}`;

  return layout({
    title: `Frequently Asked Questions | YBE Auto`,
    description: `Answers about hours, walk-ins, texting, roadside assistance, towing and auto body work at ${b.name} in ${primaryArea.label}.`,
    path: '/faq/',
    crumbs,
    schema: [faqSchema(faqs)],
    body
  });
}

/* ===================================================== FAQ QUESTION PAGE */
/** One key question from the generated meta set, answered: cost factors, time, process. */
function renderFaqQuestionPage(q) {
  const question = SM.h1For(q.url, '');
  const crumbs = [HOME, { label: 'FAQ', url: '/faq/' }, { label: question, url: q.url }];
  const svc = lookup(q.relatedService);
  const related = (q.relatedArticles || []).map((s) => articleBySlug[s]).filter(Boolean);
  const h2 = (t) => `<h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">${t}</h2>`;
  const link = (href, label) => `<li><a href="${href}" class="inline-flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(label)}</span></a></li>`;

  const body = `
${K.heroBlock({
  eyebrow: `Common Question · ${esc(primaryArea.label)}`,
  titleHtml: esc(question),
  sub: q.shortAnswer,
  ctaLabel: 'Call For A Quote',
  secondary: svc ? { label: 'The Service', href: svc.url, icon: 'wrench' } : undefined
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      ${h2('What Sets The Cost')}
      <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm mb-4">${K.checkList(q.costFactors)}</div>
      <p class="text-sm text-gray-600 mb-12">YBE quotes the price for your car before work starts: call ${esc(b.phone.display)}.</p>
      ${h2('How Long It Takes')}
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(q.time)}</div>
      ${h2('How YBE Handles It')}
      <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(q.process)}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${svc ? `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">The Service</h2>
          <ul>${link(svc.url, svc.title)}</ul></div>` : ''}
        ${related.length ? `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Related Reading</h2>
          <ul>${related.map((r) => link(r.url, r.title)).join('')}</ul></div>` : ''}
      </div>
    </article>
    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Get A Price</h2>
        <p class="text-white mb-6 text-sm leading-relaxed">Open ${esc(b.hours.summary)} at ${esc(b.address.oneLine)}.</p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="faq-question" class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="faq-question" class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
          <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="faq-question" class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Directions</a>
        </div>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">More Questions</h2>
        <ul class="space-y-1">${faqPages.filter((x) => x.slug !== q.slug).map((x) => link(x.url, SM.h1For(x.url, ''))).join('')}</ul>
      </div>
    </aside>
  </div>`
)}

${K.contactBlock({ heading: 'Get It Priced' })}`;

  return layout({
    title: question,
    description: q.shortAnswer,
    path: q.url,
    crumbs,
    ogType: 'article',
    schema: [
      {
        '@type': 'Article',
        headline: question,
        description: q.shortAnswer,
        url: T.abs(q.url),
        author: { '@id': `${b.siteUrl}/#business` },
        publisher: { '@id': `${b.siteUrl}/#business` },
        mainEntityOfPage: T.abs(q.url),
        datePublished: '2026-11-13',
        dateModified: '2026-11-13'
      }
    ],
    body
  });
}

/* ===================================================== COMMERCIAL FORM */
const COMMERCIAL_FORM_URL = '/commercial-service-request/';

/** Link to the commercial service request form, used on every commercial page. */
function commercialCta(where) {
  return `<section class="py-12 bg-ybe-black text-white border-y-4 border-ybe-red">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
    <div>
      <h2 class="font-heading text-3xl font-bold uppercase tracking-wide mb-2">Commercial Service Request</h2>
      <p class="text-white leading-relaxed">Fleets, dealers, auction buyers, rideshare and rental vehicles, and agencies: tell us about your vehicles and what they need.</p>
    </div>
    <a href="${COMMERCIAL_FORM_URL}" data-track="commercial-form" data-location="${esc(where)}"
       class="flex-shrink-0 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-8 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold inline-flex items-center justify-center gap-2">
      ${icon('clipboard-list', 24)} Request Service</a>
  </div>
</section>`;
}

function renderCommercialForm() {
  const crumbs = [HOME, { label: 'Commercial Service Request', url: COMMERCIAL_FORM_URL }];
  const field = (id, label, type = 'text', opts = {}) => `
    <div class="${opts.full ? 'md:col-span-2' : ''}">
      <label for="${id}" class="block font-heading uppercase tracking-wide text-sm font-bold text-ybe-black mb-1">
        ${esc(label)}${opts.required ? ' <span class="text-ybe-red">*</span>' : ''}</label>
      ${
        type === 'textarea'
          ? `<textarea id="${id}" name="${id}" rows="4" ${opts.required ? 'required' : ''} class="w-full border border-gray-300 rounded-sm px-3 py-2.5 focus:outline-none focus:border-ybe-red focus:ring-1 focus:ring-ybe-red" placeholder="${esc(opts.placeholder || '')}"></textarea>`
          : type === 'select'
          ? `<select id="${id}" name="${id}" ${opts.required ? 'required' : ''} class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-white focus:outline-none focus:border-ybe-red focus:ring-1 focus:ring-ybe-red">
              ${opts.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select>`
          : `<input type="${type}" id="${id}" name="${id}" ${opts.required ? 'required' : ''} ${opts.autocomplete ? `autocomplete="${opts.autocomplete}"` : ''} class="w-full border border-gray-300 rounded-sm px-3 py-2.5 focus:outline-none focus:border-ybe-red focus:ring-1 focus:ring-ybe-red" placeholder="${esc(opts.placeholder || '')}">`
      }
    </div>`;
  const body = `
${K.heroBlock({
  eyebrow: `Commercial · ${esc(primaryArea.label)} · Open 7 Days`,
  titleHtml: h1Html(SM.h1For(COMMERCIAL_FORM_URL, 'Commercial Service Request')),
  sub: 'Fleets, dealers, auction buyers, rideshare and rental vehicles, and public agencies: tell us about your vehicles and what they need, and we will get back to you.',
  ctaLabel: 'Call Instead',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}
${section(
  `<div class="max-w-4xl mx-auto">
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-sm mb-10">
      <p class="text-gray-800 leading-relaxed"><strong class="font-heading uppercase tracking-wide">This is a request.</strong> Someone from YBE will contact you about your vehicles. For a vehicle that needs help today, call.</p>
    </div>
    <form id="commercial-form" class="bg-gray-50 border border-gray-200 rounded-sm p-8" novalidate>
      <div class="lead-trap" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${field('company', 'Company or Organization', 'text', { required: true, autocomplete: 'organization' })}
        ${field('contact_name', 'Your Name', 'text', { required: true, autocomplete: 'name' })}
        ${field('phone', 'Phone Number', 'tel', { required: true, autocomplete: 'tel', placeholder: '(202) 555-0123' })}
        ${field('email', 'Email', 'email', { autocomplete: 'email' })}
        ${field('business_type', 'Type of Business', 'select', { required: true, options: ['Select one…', 'Commercial fleet', 'Fleet management company', 'Rideshare driver', 'Rental or car-share host', 'Used-car dealer', 'Auction buyer or wholesaler', 'Government agency', 'Other'] })}
        ${field('vehicle_count', 'Number of Vehicles', 'text', { placeholder: 'e.g. 1, 5, 20+' })}
        ${field('vehicle_types', 'Vehicle Types', 'text', { full: true, placeholder: 'Cars, SUVs, vans, light trucks' })}
        ${field('services', 'Services Needed', 'select', { full: true, required: true, options: ['Select one…', 'Scheduled maintenance', 'Mechanical repairs', 'Diagnostics', 'Body and collision repair', 'Reconditioning or vehicle prep', 'Roadside help', 'Several of these', 'Not sure, please advise'] })}
        ${field('message', 'Tell Us More', 'textarea', { full: true, required: true, placeholder: 'How your vehicles are used, how often they need service, or the job you need done.' })}
      </div>
      <div class="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <button type="submit" data-track="commercial-form" data-location="commercial-form" class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-8 py-4 rounded-sm shadow-hard border-2 border-transparent hover:border-ybe-black transition-all uppercase tracking-widest font-bold flex items-center gap-2">${icon('send', 24)} Send Request</button>
        <p class="text-sm text-gray-600">Sends to <a href="mailto:${b.commercialEmail}" class="text-ybe-red font-semibold hover:underline">${esc(b.commercialEmail)}</a>. Or call <a href="${b.phone.href}" data-track="call" data-location="commercial-form" class="text-ybe-red font-semibold hover:underline">${esc(b.phone.display)}</a>.</p>
      </div>
      <div id="form-status" role="status" aria-live="polite" class="mt-6"></div>
    </form>
  </div>`
)}
${K.contactBlock({ heading: 'Talk To The Shop' })}`;
  return layout({ title: 'Commercial Service Request', description: CO.hub.metaDescription, path: COMMERCIAL_FORM_URL, crumbs, body });
}

/* ===================================================== BOOK APPOINTMENT (owner, 2026-11-14) */
// Booking is done on the shop's Square site; this page sends customers there.
const BOOKING_URL = '/book-appointment/';
function renderBooking() {
  const crumbs = [HOME, { label: 'Book Appointment', url: BOOKING_URL }];
  const step = (n, title, text) => `
      <div class="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
        <div class="font-heading text-4xl font-bold text-ybe-red mb-2">${n}</div>
        <h3 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-2">${esc(title)}</h3>
        <p class="text-gray-700 leading-relaxed">${esc(text)}</p>
      </div>`;
  const body = `
${K.heroBlock({
  eyebrow: `Book Online · ${esc(primaryArea.label)} · Open 7 Days`,
  titleHtml: h1Html(SM.h1For(BOOKING_URL, 'Book Appointment')),
  sub: 'Book your visit online through our Square booking site. Pick the service and a time that works for you.',
  ctaLabel: b.booking.label,
  ctaHref: b.booking.href,
  ctaTrack: 'appointment',
  ctaIcon: 'calendar',
  ctaNewTab: true,
  secondary: { label: 'Call Now', href: b.phone.href, icon: 'phone', track: 'call' }
})}
${section(
  `<div class="max-w-4xl mx-auto text-center">
    <a href="${b.booking.href}" target="_blank" rel="noopener noreferrer" data-track="appointment" data-location="booking-page"
       class="inline-flex items-center justify-center gap-3 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl sm:text-3xl px-8 sm:px-10 py-5 rounded-sm shadow-hard border-2 border-transparent hover:border-ybe-black transition-all uppercase tracking-widest font-bold">
      ${icon('calendar', 28)} ${esc(b.booking.label)}</a>
    <p class="text-gray-600 mt-4">Opens our Square booking site in a new tab.</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
      ${step(1, 'Open Square', 'Tap Book Online to open our Square booking site.')}
      ${step(2, 'Pick A Service And Time', 'Choose the service you need and a time that works for you.')}
      ${step(3, 'Bring The Car In', `Come to ${b.address.street}, ${b.address.city}. We are open seven days a week, 8:30 AM to 6:00 PM.`)}
    </div>
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-sm mt-12 text-left">
      <p class="text-gray-800 leading-relaxed"><strong class="font-heading uppercase tracking-wide">Don't see your job on Square, or need help today?</strong> Call or text <a href="${b.phone.href}" data-track="call" data-location="booking-page" class="text-ybe-red font-semibold hover:underline">${esc(b.phone.display)}</a> and tell us what the car is doing.</p>
    </div>
  </div>`
)}
${K.contactBlock({ heading: 'Talk To The Shop' })}`;
  return layout({ title: 'Book Appointment', description: `Book your visit to ${b.name} online through our Square booking site. Open seven days a week in ${primaryArea.label}. Call ${b.phone.display}.`, path: BOOKING_URL, crumbs, body });
}

/* ===================================================== EMERGENCY ROADSIDE HELP */
const ROADSIDE_FORM_URL = '/emergency-roadside-help/';

/** Link to the emergency roadside help page, used on every roadside page. */
function roadsideRequestCta(where) {
  return `<section class="py-12 bg-ybe-red text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
    <div>
      <h2 class="font-heading text-3xl font-bold uppercase tracking-wide mb-2">Emergency Roadside Help</h2>
      <p class="text-white/90 leading-relaxed">Stuck and cannot talk? Send your location and what happened by text or email.</p>
    </div>
    <a href="${ROADSIDE_FORM_URL}" data-track="roadside-form" data-location="${esc(where)}"
       class="flex-shrink-0 bg-white text-ybe-red font-heading text-2xl px-8 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold inline-flex items-center justify-center gap-2">
      ${icon('siren', 24)} Request Help</a>
  </div>
</section>`;
}

/** One emergency form. `send` is 'sms' (shop phone) or 'email' (owner's email); `p` prefixes field ids. */
function emergencyForm(p, send) {
  const inputCls = 'w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-white focus:outline-none focus:border-ybe-red focus:ring-1 focus:ring-ybe-red';
  const lab = (id, text, req) => `<label for="${p}${id}" class="block font-heading uppercase tracking-wide text-sm font-bold text-ybe-black mb-1">${esc(text)}${req ? ' <span class="text-ybe-red">*</span>' : ''}</label>`;
  const toSms = send === 'sms';
  return `<form id="${p}form" data-send="${send}" data-subject="Emergency roadside request" class="emergency-form bg-gray-50 border border-gray-200 border-t-4 ${toSms ? 'border-t-ybe-red' : 'border-t-ybe-black'} rounded-sm p-6 md:p-8" novalidate>
    <div class="lead-trap" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <h2 class="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-ybe-black mb-1 flex items-center gap-2">${icon(toSms ? 'message-square' : 'mail', 26, 'text-ybe-red')} ${toSms ? 'Text The Shop' : 'Email The Owner'}</h2>
    <p class="text-gray-600 mb-6">Sends to <strong>${esc(toSms ? b.phone.display : b.commercialEmail)}</strong>${toSms ? ' by text' : ''}.</p>
    <div class="grid grid-cols-1 gap-5">
      <div>${lab('name', 'Your Name', true)}<input type="text" id="${p}name" required autocomplete="name" class="${inputCls}"></div>
      <div>${lab('phone', 'Phone Number', true)}<input type="tel" id="${p}phone" required autocomplete="tel" class="${inputCls}" placeholder="(202) 555-0123"></div>
      <div>${lab('location', 'Where Are You?', true)}
        <div class="relative">
          <input type="text" id="${p}location" required autocomplete="off" data-address-lookup class="${inputCls}" placeholder="Start typing a street address or landmark" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${p}location-list">
          <ul id="${p}location-list" role="listbox" class="address-list hidden absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-64 overflow-y-auto"></ul>
        </div>
        <p class="text-xs text-gray-600 mt-1">Address suggestions from OpenStreetMap.</p></div>
      <div>${lab('problem', 'What Happened?', true)}<select id="${p}problem" required class="${inputCls}">
        ${['Select one…', 'Dead battery, need a jump', 'Flat tire', 'Locked out', 'Out of fuel', 'Car will not start', 'Something else'].map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select></div>
      <div>${lab('vehicle', 'Vehicle', false)}<input type="text" id="${p}vehicle" class="${inputCls}" placeholder="Year, make, model, color"></div>
      <div>${lab('notes', 'Anything Else?', false)}<textarea id="${p}notes" rows="3" class="${inputCls}" placeholder="Which side of the road, which direction, anything we should know."></textarea></div>
    </div>
    <button type="submit" data-track="${toSms ? 'roadside-form-text' : 'roadside-form-email'}" data-location="emergency-page" class="mt-6 w-full bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-widest font-bold flex items-center justify-center gap-2">${icon(toSms ? 'send' : 'mail', 24)} ${toSms ? 'Send By Text' : 'Send By Email'}</button>
    <div data-form-status role="status" aria-live="polite" class="mt-5"></div>
  </form>`;
}

function renderRoadsideForm() {
  const crumbs = [HOME, { label: 'Roadside Assistance', url: roadsideHub.url }, { label: 'Emergency Roadside Help', url: ROADSIDE_FORM_URL }];
  const h2 = (t) => `<h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">${t}</h2>`;
  const help = roadsideHub.services.filter((x) => !x.calm);
  const body = `
${K.heroBlock({
  eyebrow: `Roadside Assistance · ${esc(primaryArea.label)}`,
  titleHtml: h1Html(SM.h1For(ROADSIDE_FORM_URL, 'Emergency Roadside Help')),
  sub: 'Dead battery, flat tire, locked out or out of gas? Call for the fastest help. If you cannot talk, send your location and what happened by text or email below.',
  ctaLabel: 'Call For Help',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}
${section(
  `<div class="max-w-5xl mx-auto">
    <div class="bg-ybe-black text-white border-l-8 border-ybe-red p-6 md:p-8 rounded-sm mb-12">
      <p class="font-heading text-2xl uppercase tracking-wide font-bold mb-3 flex items-center gap-2">${icon('alert-triangle', 26, 'text-ybe-red')} Safety First</p>
      <ul class="space-y-3">${[
        'In danger, injured or blocking traffic: call 911 first',
        'A child or pet locked in the car: call 911 now',
        'On a busy shoulder: stay in the car with your seat belt on and your hazards flashing',
        'If you can, move the car fully off the road before calling'
      ].map((t) => `<li class="flex items-start gap-3 text-white text-lg leading-snug">${icon('alert-circle', 22, 'text-ybe-red flex-shrink-0 mt-0.5')} <span>${esc(t)}</span></li>`).join('')}</ul>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
      <div>
        ${h2('What We Help With')}
        <ul class="space-y-1">${help.map((x) => `<li><a href="${x.url}" class="inline-flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(x.title)}</span></a></li>`).join('')}</ul>
      </div>
      <div>
        ${h2('While You Wait')}
        ${K.checkList([
          'Keep your hazard lights on',
          'Stay with the vehicle if it is safe',
          'Have your keys, ID and registration ready',
          'Note the cross street, exit or a landmark',
          'Keep your phone on so we can call you back'
        ])}
      </div>
    </div>

    <div class="bg-gray-100 border border-gray-200 p-5 rounded-sm text-gray-700 mb-12">
      Our phone is answered ${esc(b.hours.summary)}. YBE provides roadside assistance, not towing. If the vehicle needs a tow, we will tell you so you can arrange one.
    </div>

    ${h2('Send Your Request')}
    <p class="text-gray-700 text-lg mb-8">Fill in either form. Calling <a href="${b.phone.href}" data-track="call" data-location="emergency-page" class="text-ybe-red font-semibold hover:underline">${esc(b.phone.display)}</a> is still the fastest way.</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      ${emergencyForm('es_sms_', 'sms')}
      ${emergencyForm('es_mail_', 'email')}
    </div>
  </div>`
)}
${K.contactBlock({ heading: 'Stuck? Call The Shop.' })}`;
  return layout({ title: 'Emergency Roadside Help', description: roadsideHub.metaDescription, path: ROADSIDE_FORM_URL, crumbs, body });
}

/* ===================================================== COMPANY PAGES */
/** One dealer group or auction from src/data/company-pages.js. */
function renderCompanyPage(c) {
  const isDealer = c.kind === 'dealer';
  const h1 = SM.h1For(c.url, c.label);
  const crumbs = [HOME, { label: 'Used & Auction Car Repairs', url: CO.hub.url }, { label: c.name, url: c.url }];
  const where = c.locations.length === 1 ? c.locations[0] : `${c.locations.slice(0, -1).join('; ')} and ${c.locations[c.locations.length - 1]}`;
  const h2 = (t) => `<h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">${t}</h2>`;
  const link = (href, label) => `<li><a href="${href}" class="inline-flex items-start gap-2 py-1.5 text-gray-700 hover:text-ybe-red font-medium">${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(label)}</span></a></li>`;

  const intro = isDealer
    ? [`${c.name} sells used cars from ${c.locations.length > 1 ? 'locations in' : ''} ${where}. If you bought a car there and want it checked over, or something needs fixing, YBE Auto Repair Center is an independent repair shop at ${b.address.oneLine}, open seven days a week.`,
       'An independent check gives you a second set of eyes on what you bought: warning lights, brakes, tires, fluids, leaks and anything that feels or sounds wrong.']
    : [`${c.name} sells vehicles at ${where}. Auction cars are sold as they are, and many need work before they are ready for the road or the lot. YBE Auto Repair Center is an independent repair shop at ${b.address.oneLine}, open seven days a week.`,
       'Bring the car in after the sale and we will tell you what you have: what it needs to be roadworthy, what is optional, and what it will take.'];
  const checks = isDealer
    ? ['Check engine and other warning lights', 'Brakes, tires and steering', 'Fluids, leaks and belts', 'Battery and charging system', 'Suspension noises and alignment', 'Anything the car is doing that worries you']
    : ['Post-purchase diagnostic and code scan', 'No-start diagnosis', 'Roadworthiness check: brakes, tires, steering, lights', 'Fluids and leaks', 'Written estimate: needed now versus optional', 'Body and mechanical work in one shop'];
  const related = isDealer
    ? [lookup('check-engine-light-diagnostics'), lookup('brake-pad-rotor-replacement'), lookup('tire-repair-replacement')]
    : [lookup('auction-vehicle-repair'), lookup('no-start-diagnostics'), lookup('used-car-dealer-reconditioning')];
  const others = CO.companies.filter((x) => x.kind === c.kind && x.slug !== c.slug);

  const body = `
${K.heroBlock({
  eyebrow: `${isDealer ? 'Bought From' : 'Bought At'} ${esc(c.name)}`,
  titleHtml: h1Html(h1),
  sub: intro[0],
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      <div class="prose-ybe text-lg text-gray-700 mb-10"><p>${esc(intro[1])}</p></div>
      ${h2('What We Check')}
      <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm mb-4">${K.checkList(checks)}</div>
      <p class="text-sm text-gray-600 mb-10">You get a quote before any work starts.</p>
      ${isDealer ? `${h2('Under Warranty?')}
      <div class="prose-ybe text-lg text-gray-700 mb-10"><p>If your purchase came with a warranty or service contract, read its terms before any repair. Some require the work to be done or approved by a specific shop. Bring the paperwork and we will look at it with you.</p></div>` : ''}
      <div class="bg-gray-100 border border-gray-200 p-5 rounded-sm text-sm text-gray-600 mb-10">
        YBE Auto Repair Center is an independent repair shop. We are not affiliated with, endorsed by or a partner of ${esc(c.name)}. ${esc(c.name)} is named only to describe where you bought the vehicle.
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Related Services</h2>
          <ul>${related.filter(Boolean).map((r) => link(r.url, r.title)).join('')}</ul>
        </div>
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">${isDealer ? 'Other Dealers' : 'Other Auctions'}</h2>
          <ul>${others.map((x) => link(x.url, x.name)).join('')}</ul>
        </div>
      </div>
    </article>
    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Get It Checked</h2>
        <p class="text-white mb-6 text-sm leading-relaxed">Open ${esc(b.hours.summary)} at ${esc(b.address.oneLine)}. Walk-ins welcome.</p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="company-page" class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="company-page" class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
          <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="company-page"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Directions</a>
        </div>
      </div>
    </aside>
  </div>`
)}

${commercialCta('company-page')}
${K.contactBlock({ heading: 'Bring It In' })}`;

  return layout({
    title: c.label,
    description: CO.hub.metaDescription,
    path: c.url,
    crumbs,
    schema: [serviceSchema({ name: h1, description: intro[0], url: c.url, areaNames })],
    body
  });
}

function renderCompanyHub() {
  const crumbs = [HOME, { label: 'Used & Auction Car Repairs', url: CO.hub.url }];
  const card = (c) => `<a href="${c.url}" class="block bg-gray-50 border border-gray-200 border-l-4 border-l-ybe-red p-6 rounded-sm hover:shadow-lg transition-shadow">
      <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-1">${esc(c.name)}</h3>
      <p class="text-gray-600 text-sm">${esc(c.locations.join(' · '))}</p></a>`;
  const body = `
${K.heroBlock({
  eyebrow: `Independent Repair Shop · ${esc(primaryArea.label)}`,
  titleHtml: h1Html(SM.h1For(CO.hub.url, CO.hub.title)),
  sub: 'Bought a used car from a dealer or at auction? We check it over and repair what it needs. Independent, open seven days, and a quote before any work.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}
${section(`${K.heading2('Bought From A <span class="text-ybe-red">Dealer</span>')}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${CO.dealers.map(card).join('')}</div>`)}
${section(`${K.heading2('Bought At <span class="text-ybe-red">Auction</span>')}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${CO.auctions.map(card).join('')}</div>
  <p class="text-sm text-gray-600 mt-8">YBE Auto Repair Center is an independent repair shop and is not affiliated with any company listed here.</p>`, 'bg-gray-50')}
${commercialCta('company-hub')}
${K.contactBlock({ heading: 'Bring It In' })}`;
  return layout({ title: CO.hub.metaTitle, description: CO.hub.metaDescription, path: CO.hub.url, crumbs, body });
}

/* ===================================================== FLEET & GOVERNMENT PROFILES */
function renderOrgPage(o) {
  const h1 = SM.h1For(o.url, o.label);
  const crumbs = [HOME, { label: 'Fleet & Government', url: ORG.hub.url }, { label: o.name, url: o.url }];
  const h2 = (t) => `<h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">${t}</h2>`;
  // Profile, then how we can help. Nothing else.
  const body = `
<section class="bg-ybe-black text-white py-14 md:py-16 border-b-4 border-ybe-red">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="font-heading text-sm font-bold uppercase tracking-widest text-white mb-3">${o.kind === 'fleet' ? 'Fleet Network Profile' : 'Government Profile'}</p>
    <h1 class="text-4xl md:text-5xl font-heading font-extrabold uppercase leading-tight tracking-wide">${h1Html(h1)}</h1>
  </div>
</section>
<section class="py-14 md:py-16 bg-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    ${h2(esc(o.name))}
    <div class="prose-ybe text-lg text-gray-700 mb-12">${paras(o.profile)}</div>
    ${h2('How We Can Help')}
    <div class="prose-ybe text-lg text-gray-700 mb-6">${paras(o.assist)}</div>
    <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm mb-8">${K.checkList(o.assistList)}</div>
    <a href="${COMMERCIAL_FORM_URL}" data-track="commercial-form" data-location="org-page" class="inline-flex items-center gap-2 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl px-6 py-3 rounded-sm shadow-hard uppercase tracking-wide font-bold">${icon('clipboard-list', 20)} Commercial Service Request</a>
  </div>
</section>`;

  return layout({
    title: o.label,
    description: ORG.hub.description,
    path: o.url,
    crumbs,
    schema: [serviceSchema({ name: h1, description: o.profile[0], url: o.url, areaNames })],
    body
  });
}

function renderOrgHub() {
  const crumbs = [HOME, { label: 'Fleet & Government', url: ORG.hub.url }];
  const card = (o) => `<a href="${o.url}" class="block bg-gray-50 border border-gray-200 border-l-4 border-l-ybe-red p-6 rounded-sm hover:shadow-lg transition-shadow">
      <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black">${esc(o.name)}</h3></a>`;
  const body = `
${K.heroBlock({
  eyebrow: `Prince George’s County · Since ${b.openedYear}`,
  titleHtml: h1Html(SM.h1For(ORG.hub.url, ORG.hub.title)),
  sub: ORG.hub.description,
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Directions', href: b.maps.directionsUrl, icon: 'navigation', track: 'directions' }
})}
${section(`${K.heading2('Fleet <span class="text-ybe-red">Networks</span>')}<div class="grid grid-cols-1 md:grid-cols-3 gap-6">${ORG.orgs.filter((o) => o.kind === 'fleet').map(card).join('')}</div>`)}
${section(`${K.heading2('Government <span class="text-ybe-red">Buyers</span>')}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${ORG.orgs.filter((o) => o.kind === 'gov').map(card).join('')}</div>`, 'bg-gray-50')}
${commercialCta('org-hub')}
${K.contactBlock({ heading: 'Talk To The Shop' })}`;
  return layout({ title: ORG.hub.title, description: ORG.hub.description, path: ORG.hub.url, crumbs, body });
}

/* ===================================================== 404 */
function render404() {
  const body = `
${K.heroBlock({
  eyebrow: 'Page Not Found',
  titleHtml: `That Page <span class="text-ybe-red">Doesn't Exist</span>`,
  sub: 'The link may be old or mistyped. Here is where to go instead.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'All Services', href: '/services/', icon: 'wrench' }
})}

${section(
  K.heading2Center('Where To Go Instead') +
    `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    ${[
      { label: 'All Services', url: '/services/', icon: 'wrench' },
      { label: 'Roadside Assistance', url: roadsideHub.url, icon: 'truck' },
      { label: 'Service Areas', url: '/service-areas/', icon: 'map-pin' },
      { label: 'Car Care', url: '/car-care/', icon: 'help-circle' },
      { label: 'Contact & Directions', url: '/contact/', icon: 'navigation' },
      { label: 'Request A Call Back', url: '/#call-back', icon: 'phone-incoming' }
    ]
      .map(
        (l) => `<a href="${l.url}" class="flex items-center gap-3 bg-gray-50 hover:border-ybe-red border border-gray-200 p-6 rounded-sm transition-colors group">
      <div class="bg-ybe-red text-white p-3 rounded-sm flex-shrink-0">${icon(l.icon, 22)}</div>
      <span class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black group-hover:text-ybe-red transition-colors">${esc(l.label)}</span></a>`
      )
      .join('')}
  </div>`
)}

${K.contactBlock({ heading: 'Need Help Now?' })}`;

  return layout({
    title: `Page Not Found | YBE Auto Repair Center`,
    description: 'That page does not exist. Find auto repair services, roadside assistance, service areas and contact details for YBE Auto Repair Center.',
    path: '/404.html',
    crumbs: [HOME],
    noIndex: true,
    body
  });
}


module.exports = {
  renderBooking,
  renderAreaServicePage,
  renderRoadsideForm,
  renderCommercialForm,
  renderOrgPage,
  renderOrgHub,
  renderCompanyPage,
  renderCompanyHub,
  renderFaqQuestionPage,
  renderServicesHub, renderCategoryHub, renderServicePage,
  renderRoadsideHub, renderRoadsidePage, renderAreasHub, renderAreaPage,
  renderCarCareHub, renderArticle, renderAbout, renderReviews,
  renderContact, renderFaq, render404
};
