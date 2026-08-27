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
const { faqAccordion, faqSchema, serviceSchema } = T;

const { categories, allServices, roadsideHub, areas, primaryArea, articles, clusters } =
  require('../data/pillars.js');
const { serviceBySlug } = require('../data/services.js');
const { roadsideBySlug } = require('../data/roadside.js');
const { articleBySlug } = require('../data/articles.js');
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
  titleHtml: `Comprehensive <span class="text-ybe-red">Auto Services</span>`,
  sub: 'From minor maintenance to major mechanical and body repairs, our Capitol Heights shop handles it all.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Book Now', href: '/request-appointment/', icon: 'calendar', track: 'appointment' }
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
  titleHtml: esc(cat.title),
  sub: cat.blurb,
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Book Now', href: '/request-appointment/', icon: 'calendar', track: 'appointment' }
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
${K.contactBlock({ heading: `Need ${esc(cat.navLabel)}?` })}`;

  return layout({
    title: cat.metaTitle,
    description: cat.metaDescription,
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
  eyebrow: `${cat.title} · ${primaryArea.label}`,
  titleHtml: esc(svc.title),
  sub: svc.customerVoice ? `“${svc.customerVoice}”` : cat.blurb,
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Book Now', href: '/request-appointment/', icon: 'calendar', track: 'appointment' }
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
        <div class="prose-ybe text-gray-300 text-lg">${paras(svc.whyNotIgnore)}</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${relatedList(svc.related)}
        ${areasServed()}
      </div>
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Get This Handled</h2>
        <p class="text-gray-400 mb-6 text-sm leading-relaxed">
          Call or text the shop and describe what the car is doing. Open ${esc(b.hours.summary.toLowerCase())}.
        </p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="service-sidebar"
             class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">
            ${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="service-sidebar"
             class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">
            Text Us</a>
          <a href="/request-appointment/" data-track="appointment" data-location="service-sidebar"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">
            Request Appointment</a>
        </div>
        <div class="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400 space-y-2">
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
${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: `Need ${esc(svc.navLabel || svc.title)}?` })}`;

  return layout({
    title: svc.metaTitle,
    description: svc.metaDescription,
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
  titleHtml: `Roadside <span class="text-ybe-red">Assistance</span>`,
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

${K.roadsideBand()}
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
  eyebrow: `Roadside Assistance · ${primaryArea.label}`,
  titleHtml: esc(svc.title),
  sub: svc.customerVoice ? `“${svc.customerVoice}”` : '',
  ctaLabel: 'Call For Roadside Help',
  secondary: { label: 'Text Us', href: b.sms.href, icon: 'message-square', track: 'text' }
})}

${K.roadsideBand({
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
        <div class="prose-ybe text-gray-300 text-lg">${paras(svc.whyNotIgnore)}</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${relatedList(svc.related)}
        ${areasServed()}
      </div>
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-red text-white p-8 rounded-sm lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Call For Roadside Help</h2>
        <p class="mb-6 text-sm leading-relaxed text-white/90">Tell us where you are and what happened.</p>
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
${K.contactBlock({ heading: 'Stuck? Call The Shop.' })}`;

  return layout({
    title: svc.metaTitle,
    description: svc.metaDescription,
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
  titleHtml: `Service <span class="text-ybe-red">Areas</span>`,
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
  titleHtml: area.isPrimary
    ? `Auto Repair Shop in <span class="text-ybe-red">${esc(area.name)}, ${esc(area.state)}</span>`
    : `Auto Repair for <span class="text-ybe-red">${esc(area.name)}, ${esc(area.state)}</span>`,
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
    </article>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Book From ${esc(area.name)}</h2>
        <p class="text-gray-400 mb-6 text-sm leading-relaxed">Call or text the shop, or request an appointment online.</p>
        <div class="flex flex-col gap-3">
          <a href="${b.phone.href}" data-track="call" data-location="area-sidebar"
             class="w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="area-sidebar"
             class="w-full text-center bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
          <a href="/request-appointment/" data-track="appointment" data-location="area-sidebar"
             class="w-full text-center bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Request Appointment</a>
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
    title: area.metaTitle,
    description: area.metaDescription,
    path: area.url,
    crumbs,
    schema: [
      serviceSchema({ name: `Auto Repair in ${area.label}`, description: area.metaDescription, url: area.url, areaNames: [area.label] })
    ],
    body
  });
}

/* ===================================================== CAR CARE HUB */
function renderCarCareHub() {
  const crumbs = [HOME, { label: 'Car Care', url: '/car-care/' }];
  const body = `
${K.heroBlock({
  eyebrow: `${primaryArea.label} · Open 7 Days`,
  titleHtml: `Advice and <span class="text-ybe-red">Car Care</span>`,
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
    title: `Car Care Advice & Common Questions | YBE Auto`,
    description: `Answers to what drivers ask most: check-engine lights, brake noise, overheating, transmission trouble and roadside problems. YBE, ${primaryArea.label}.`,
    path: '/car-care/',
    crumbs,
    body
  });
}

/* ===================================================== ARTICLE */
function renderArticle(a) {
  const cluster = clusters.find((c) => c.slug === a.cluster);
  const crumbs = [HOME, { label: 'Car Care', url: '/car-care/' }, { label: a.title, url: a.url }];
  const svc = lookup(a.relatedService);
  const related = (a.relatedArticles || []).map((s) => articleBySlug[s]).filter(Boolean);

  const body = `
${K.heroBlock({
  eyebrow: esc(cluster.name),
  titleHtml: esc(a.title),
  sub: a.shortAnswer,
  ctaLabel: 'Call The Shop',
  secondary: svc ? { label: 'The Fix', href: svc.url, icon: 'wrench' } : undefined
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
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
        <p class="text-gray-300 leading-relaxed mb-6 text-lg">
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

      ${
        related.length
          ? `<div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
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
        <p class="text-gray-400 mb-6 text-sm leading-relaxed">Open ${esc(b.hours.summary.toLowerCase())} in ${esc(primaryArea.label)}.</p>
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
        mainEntityOfPage: T.abs(a.url)
      }
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
  titleHtml: `About <span class="text-ybe-red">YBE Auto Repair</span>`,
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
  eyebrow: `${b.rating.count} Google Reviews`,
  titleHtml: `Rated <span class="text-ybe-red">${b.rating.value}</span> on Google`,
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
        <div class="flex gap-1 text-yellow-400 mb-4">${Array(5).fill(icon('star', 16, 'fill-current')).join('')}</div>
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-3">${esc(t.theme)}</h3>
        <p class="text-gray-700 leading-relaxed">${esc(t.detail)}</p>
      </div>`
        )
        .join('')}
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
    description: `${b.name} is rated ${b.rating.value} on Google from ${b.rating.count} reviews. Customers mention fair pricing, fast turnaround, weekend hours and help in urgent situations.`,
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
  titleHtml: `Contact and <span class="text-ybe-red">Directions</span>`,
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
          <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Accessibility</strong>Wheelchair-accessible parking</div></li>
      </ul>
    </div>
    <div class="bg-ybe-black text-white p-8 rounded-sm border-t-4 border-ybe-red">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-5">Weekly Hours</h2>
      <ul class="space-y-1 text-gray-300">
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

/* ===================================================== REQUEST APPOINTMENT */
function renderAppointment() {
  const crumbs = [HOME, { label: 'Request an Appointment', url: '/request-appointment/' }];
  const field = (id, label, type = 'text', opts = {}) => `
    <div class="${opts.full ? 'md:col-span-2' : ''}">
      <label for="${id}" class="block font-heading uppercase tracking-wide text-sm font-bold text-ybe-black mb-1">
        ${esc(label)}${opts.required ? ' <span class="text-ybe-red">*</span>' : ''}</label>
      ${
        type === 'textarea'
          ? `<textarea id="${id}" name="${id}" rows="4" ${opts.required ? 'required' : ''}
              class="w-full border border-gray-300 rounded-sm px-3 py-2.5 focus:outline-none focus:border-ybe-red focus:ring-1 focus:ring-ybe-red"
              placeholder="${esc(opts.placeholder || '')}"></textarea>`
          : type === 'select'
          ? `<select id="${id}" name="${id}" ${opts.required ? 'required' : ''}
              class="w-full border border-gray-300 rounded-sm px-3 py-2.5 bg-white focus:outline-none focus:border-ybe-red focus:ring-1 focus:ring-ybe-red">
              ${opts.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select>`
          : `<input type="${type}" id="${id}" name="${id}" ${opts.required ? 'required' : ''}
              ${opts.autocomplete ? `autocomplete="${opts.autocomplete}"` : ''}
              class="w-full border border-gray-300 rounded-sm px-3 py-2.5 focus:outline-none focus:border-ybe-red focus:ring-1 focus:ring-ybe-red"
              placeholder="${esc(opts.placeholder || '')}">`
      }
    </div>`;

  const serviceOptions = [
    'Select a service…',
    ...categories.flatMap((c) => c.services.map((s) => s.title)),
    ...roadsideHub.services.map((s) => s.title),
    'Not sure — please advise'
  ];

  const body = `
${K.heroBlock({
  eyebrow: `${primaryArea.label} · Open 7 Days`,
  titleHtml: `Request an <span class="text-ybe-red">Appointment</span>`,
  sub: 'Tell us about your vehicle and what it is doing. We will get back to you to confirm a time.',
  ctaLabel: 'Call Instead',
  secondary: { label: 'Book on Square', href: b.booking.href, icon: 'external-link', track: 'appointment' }
})}

${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <div class="lg:w-2/3">
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-sm mb-10">
        <p class="text-gray-800 leading-relaxed">
          <strong class="font-heading uppercase tracking-wide">This is a request, not a confirmed booking.</strong>
          Your appointment is not scheduled until someone from YBE contacts you to confirm the time.
          If you need help today, calling is faster.
        </p>
      </div>

      <form id="appointment-form" class="bg-gray-50 border border-gray-200 rounded-sm p-8" novalidate>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${field('name', 'Your Name', 'text', { required: true, autocomplete: 'name' })}
          ${field('phone', 'Phone Number', 'tel', { required: true, autocomplete: 'tel', placeholder: '(202) 555-0123' })}
          ${field('email', 'Email', 'email', { autocomplete: 'email' })}
          ${field('preferred_contact', 'Preferred Contact Method', 'select', { options: ['Phone call', 'Text message', 'Email', 'WhatsApp'] })}
          ${field('vehicle_year', 'Vehicle Year', 'text', { required: true, placeholder: '2015' })}
          ${field('vehicle_make', 'Vehicle Make', 'text', { required: true, placeholder: 'Honda' })}
          ${field('vehicle_model', 'Vehicle Model', 'text', { required: true, placeholder: 'Accord' })}
          ${field('preferred_date', 'Preferred Date', 'date')}
          ${field('service', 'Service Needed', 'select', { full: true, required: true, options: serviceOptions })}
          ${field('problem', 'Describe the Problem', 'textarea', {
            full: true,
            required: true,
            placeholder: 'What are you noticing? Any noises, warning lights, or when it happens.'
          })}
        </div>
        <div class="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button type="submit" data-track="appointment" data-location="appointment-form"
            class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-8 py-4 rounded-sm shadow-hard border-2 border-transparent hover:border-ybe-black transition-all uppercase tracking-widest font-bold flex items-center gap-2">
            ${icon('calendar-check', 24)} Send Request</button>
          <p class="text-sm text-gray-600">Or call <a href="${b.phone.href}" data-track="call" data-location="appointment-form" class="text-ybe-red font-semibold hover:underline">${esc(b.phone.display)}</a> to speak with us now.</p>
        </div>
        <div id="form-status" role="status" aria-live="polite" class="mt-6"></div>
      </form>
    </div>

    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-red text-white p-8 rounded-sm lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Need Help Today?</h2>
        <p class="mb-6 text-sm leading-relaxed text-white/90">Calling gets a faster answer than any form, especially for urgent problems.</p>
        <a href="${b.phone.href}" data-track="call" data-location="appointment-sidebar"
           class="block w-full text-center bg-white text-ybe-red font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold mb-3">${esc(b.phone.display)}</a>
        <a href="${b.sms.href}" data-track="text" data-location="appointment-sidebar"
           class="block w-full text-center bg-ybe-black text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us Instead</a>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Good To Know</h2>
        ${K.checkList([
          'Walk-ins are welcome, but calling ahead helps us get to you faster',
          'Open seven days a week, 8:30 AM to 6:00 PM',
          'Wheelchair-accessible parking on site',
          'Roadside assistance available — call, do not fill out a form',
          'We will confirm your appointment before it is scheduled'
        ])}
      </div>
    </aside>
  </div>`
)}

${K.roadsideBand()}
${K.mapAreasBlock()}
${K.contactBlock({ heading: 'Questions Before Booking?' })}`;

  return layout({
    title: `Request an Appointment | YBE Auto, ${primaryArea.label}`,
    description: `Request a service appointment at YBE in ${primaryArea.label}. Tell us about your vehicle and the problem and we will confirm a time. Call ${b.phone.display}.`,
    path: '/request-appointment/',
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
  titleHtml: `Frequently Asked <span class="text-ybe-red">Questions</span>`,
  sub: 'Hours, walk-ins, roadside assistance, towing, and what we do and do not offer.',
  ctaLabel: 'Call The Shop',
  secondary: { label: 'Contact Us', href: '/contact/', icon: 'map-pin' }
})}

<section class="py-20 bg-gray-100">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    ${K.heading2Center('Frequently Asked Questions')}
    ${faqAccordion(faqs)}
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
      { label: 'Car Care Advice', url: '/car-care/', icon: 'help-circle' },
      { label: 'Contact & Directions', url: '/contact/', icon: 'navigation' },
      { label: 'Request an Appointment', url: '/request-appointment/', icon: 'calendar' }
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
  renderServicesHub, renderCategoryHub, renderServicePage,
  renderRoadsideHub, renderRoadsidePage, renderAreasHub, renderAreaPage,
  renderCarCareHub, renderArticle, renderAbout, renderReviews,
  renderContact, renderAppointment, renderFaq, render404
};
