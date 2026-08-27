/** PAGE RENDERERS — one function per page type. */

const T = require('./templates.js');
const { layout } = require('./layout.js');
const {
  b, esc, icon, ctaButtons, trustStrip, sectionHeading, linkCard,
  safetyNotice, mapSection, faqAccordion, finalCta, faqSchema, serviceSchema
} = T;

const { pillars, categories, allServices, roadsideHub, areas, primaryArea, articles, clusters } =
  require('../data/pillars.js');
const { serviceBySlug } = require('../data/services.js');
const { roadsideBySlug } = require('../data/roadside.js');
const { articleBySlug } = require('../data/articles.js');
const { reviewThemes, quotes, faqs, about, commonProblems } = require('../data/trust.js');

const HOME = { label: 'Home', url: '/' };
const areaNames = areas.map((a) => `${a.name}, ${a.state}`);

/** Resolve a related slug from either the service or roadside registry. */
const lookup = (slug) => serviceBySlug[slug] || roadsideBySlug[slug];

const paras = (arr) => arr.map((p) => `<p>${esc(p)}</p>`).join('');

const bulletList = (items, { light = false } = {}) =>
  `<ul class="space-y-3">${items
    .map(
      (i) => `<li class="flex items-start gap-3">
      <span class="bg-ybe-red rounded-full p-1 flex-shrink-0 mt-1">${icon('check', 14, 'text-white')}</span>
      <span class="${light ? 'text-gray-300' : 'text-gray-700'} leading-relaxed">${esc(i)}</span></li>`
    )
    .join('')}</ul>`;

/** Areas-served block required on every service page. */
function areasServedBlock() {
  return `<div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
    <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-2">Areas We Serve</h2>
    <p class="text-gray-600 mb-4">Based in ${esc(primaryArea.label)}, serving drivers across nearby Maryland and Washington, DC.</p>
    <div class="flex flex-wrap gap-2">
      ${areas
        .map(
          (a) =>
            `<a href="${a.url}" class="bg-white border border-gray-300 hover:border-ybe-red hover:text-ybe-red text-gray-700 px-3 py-1 text-sm font-semibold rounded-sm transition-colors">${esc(a.label)}</a>`
        )
        .join('')}
    </div>
  </div>`;
}

function relatedBlock(slugs, heading = 'Related Services') {
  const items = (slugs || []).map(lookup).filter(Boolean);
  if (!items.length) return '';
  return `<div>
    <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">${esc(heading)}</h2>
    <ul class="space-y-2">
      ${items
        .map(
          (s) =>
            `<li><a href="${s.url}" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">
            ${icon('arrow-right', 16)} ${esc(s.title)}</a></li>`
        )
        .join('')}
    </ul>
  </div>`;
}

/* ============================================================== HOME */
function renderHome() {
  const body = `
<section class="relative pt-10 pb-14 md:pt-20 md:pb-24 flex items-center">
  <div class="absolute inset-0 z-0">
    <img src="${b.images.hero.src}" alt="${esc(b.images.hero.alt)}" class="w-full h-full object-cover" fetchpriority="high" />
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 hidden md:block"></div>
    <div class="absolute inset-0 bg-black/75 md:hidden"></div>
  </div>
  <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="max-w-3xl">
      <p class="inline-flex items-center gap-2 bg-ybe-red text-white font-heading uppercase tracking-widest text-sm font-bold px-3 py-1 rounded-sm mb-5">
        ${icon('map-pin', 16)} ${esc(primaryArea.label)} · Open 7 Days
      </p>
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-white uppercase leading-tight mb-5 tracking-wide drop-shadow-lg">
        Auto Repair That <span class="text-ybe-red">Gets You Back</span> on the Road
      </h1>
      <p class="text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl border-l-4 border-ybe-red pl-4 mb-8">
        Full-service mechanical repair, diagnostics, bodywork and mobile roadside assistance from a
        ${esc(primaryArea.name)} shop that has served this community since ${b.openedYear}.
      </p>
      ${ctaButtons({ variant: 'home', className: 'max-w-2xl' })}
      <p class="mt-5 text-gray-300 text-sm font-medium">
        ${icon('clock', 16, 'inline text-ybe-red')} ${esc(b.hours.summary)} &nbsp;·&nbsp;
        ${icon('phone', 16, 'inline text-ybe-red')} ${esc(b.phone.display)}
      </p>
    </div>
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-16 bg-gray-100 border-b-4 border-ybe-red">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-5xl font-heading font-bold text-ybe-black uppercase tracking-wide">What's Going On With Your Car?</h2>
      <p class="mt-3 text-lg text-gray-600 font-medium">Pick the problem that sounds like yours.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${commonProblems
        .map(
          (p) => `<a href="${p.url}" class="group p-6 rounded-sm border-2 transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-md ${
            p.urgent
              ? 'bg-ybe-red border-ybe-darkred text-white hover:bg-ybe-darkred'
              : 'bg-white border-gray-200 text-ybe-black hover:border-ybe-red hover:-translate-y-1'
          }">
        <div class="p-4 rounded-full mb-4 transition-colors ${
          p.urgent ? 'bg-white text-ybe-red' : 'bg-gray-100 text-ybe-red group-hover:bg-ybe-red group-hover:text-white'
        }">${icon(p.icon, 32)}</div>
        <h3 class="text-lg md:text-xl font-heading font-bold uppercase tracking-wide">${esc(p.text)}</h3>
        <span class="mt-2 flex items-center text-sm font-semibold uppercase tracking-wider ${p.urgent ? 'text-white' : 'text-ybe-red'}">
          Get Help ${icon('chevron-right', 16)}</span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${sectionHeading(
      `Comprehensive <span class="text-ybe-red">Auto Services</span>`,
      'From routine maintenance to major mechanical and body repairs, handled in one shop.'
    )}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${categories.map((c) => linkCard({ url: c.url, title: c.title, blurb: c.blurb, cta: 'View Services', icon: c.icon })).join('')}
      ${linkCard({
        url: roadsideHub.url,
        title: 'Roadside Assistance',
        blurb: 'Jump starts, flat tires, mobile battery replacement, fuel delivery, lockouts and minor roadside repairs.',
        cta: 'Get Emergency Help',
        icon: 'truck'
      })}
    </div>
  </div>
</section>

<section class="py-14 md:py-20 diagonal-stripe-bg text-white border-y-8 border-ybe-red relative overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <div class="inline-flex items-center justify-center p-4 bg-ybe-red rounded-full mb-5">${icon('truck', 44, 'text-white')}</div>
    <h2 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide mb-5 drop-shadow-md">
      Stranded? Call YBE for <span class="text-ybe-red bg-white px-2 rounded-sm inline-block transform -skew-x-12">Roadside Help</span>
    </h2>
    <p class="text-lg md:text-xl mb-8 font-medium max-w-3xl mx-auto text-gray-300 leading-relaxed">
      Mobile help for dead batteries, flat tires, fuel, lockouts and no-start problems around
      ${esc(primaryArea.name)} and nearby communities. Calling is faster than any form.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-4 mb-10">
      <a href="${b.phone.href}" data-track="call" data-location="home-roadside"
         class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl md:text-3xl px-8 py-4 rounded-sm shadow-hard border-2 border-transparent hover:border-white transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('phone', 28)} Call For Help</a>
      <a href="${roadsideHub.url}"
         class="bg-transparent hover:bg-white text-white hover:text-ybe-black border-2 border-white font-heading text-2xl md:text-3xl px-8 py-4 rounded-sm transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('info', 28)} Roadside Services</a>
    </div>
    <div class="max-w-2xl mx-auto">${safetyNotice()}</div>
  </div>
</section>

<section class="py-14 md:py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-10 items-center">
      <div class="lg:w-1/2">
        ${sectionHeading(`Why Drivers Trust <span class="text-ybe-red">YBE</span>`, 'A real neighborhood shop, not a chain counter.')}
        ${bulletList([
          `Serving the community since ${b.openedYear}`,
          'Open seven days a week, 8:30 AM to 6:00 PM',
          'Black-owned, independent local business',
          'Mechanical repair and auto body work under one roof',
          'Mobile roadside assistance available',
          'We test before replacing parts, so you pay for the actual fix',
          'Call, text or WhatsApp the shop directly',
          `${b.rating.value}-star Google rating from ${b.rating.count} reviews`
        ])}
        <div class="mt-8"><a href="/about/" class="inline-flex items-center gap-2 font-heading text-xl font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
          More About The Shop ${icon('arrow-right', 20)}</a></div>
      </div>
      <div class="lg:w-1/2 w-full">
        <div class="relative p-2 bg-white shadow-xl rounded-sm border-2 border-gray-100 overflow-hidden">
          <img src="${b.images.shop.src}" alt="${esc(b.images.shop.alt)}" loading="lazy" class="w-full h-auto object-cover rounded-sm" />
          <div class="absolute bottom-4 right-4 bg-ybe-red text-white font-heading p-4 md:p-6 rounded-sm shadow-hard border-2 border-white text-center">
            <div class="text-4xl md:text-5xl font-extrabold leading-none">${b.openedYear}</div>
            <div class="text-sm md:text-lg uppercase tracking-widest font-semibold mt-1">Established</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-14 md:py-20 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="flex justify-center mb-4">
      <div class="flex gap-1 text-yellow-400 bg-white/10 px-4 py-2 rounded-full">
        ${Array(5).fill(icon('star', 26, 'fill-current')).join('')}
      </div>
    </div>
    <h2 class="text-3xl md:text-5xl font-heading font-bold uppercase tracking-wide mb-3">Rated ${b.rating.value} on Google</h2>
    <p class="text-lg text-gray-400 font-medium mb-10">Based on ${b.rating.count} customer reviews.</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
      ${reviewThemes
        .slice(0, 3)
        .map(
          (t) => `<div class="bg-ybe-charcoal p-6 rounded-sm border border-gray-700 relative">
        ${icon('quote', 36, 'text-ybe-red absolute top-4 right-4 opacity-20')}
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-white mb-3">${esc(t.theme)}</h3>
        <p class="text-gray-300 leading-relaxed">${esc(t.detail)}</p>
      </div>`
        )
        .join('')}
    </div>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <a href="/reviews/" class="inline-flex items-center justify-center gap-2 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl font-bold uppercase tracking-wide px-8 py-4 transition-all rounded-sm">
        ${icon('star', 20)} What Customers Say</a>
      <a href="${b.rating.profileUrl}" target="_blank" rel="noopener noreferrer" data-track="reviews" data-location="home"
         class="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white text-white hover:text-ybe-black border-2 border-white font-heading text-xl font-bold uppercase tracking-wide px-8 py-4 transition-all rounded-sm">
        ${icon('external-link', 20)} Read Google Reviews</a>
    </div>
  </div>
</section>

<section class="py-14 md:py-20 bg-white border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-5xl font-heading font-bold text-ybe-black uppercase tracking-wide">
        Your Local Shop in <span class="text-ybe-red">${esc(primaryArea.name)}</span></h2>
      <p class="mt-3 text-lg text-gray-600 font-medium">${esc(b.address.oneLine)}</p>
    </div>
    <div class="flex flex-col lg:flex-row gap-8">
      ${mapSection()}
      <div class="lg:w-1/3 bg-gray-50 p-6 rounded-sm border border-gray-200">
        <h3 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4 border-b-2 border-ybe-red pb-2">Serving These Areas</h3>
        <div class="flex flex-wrap gap-2 mb-6">
          ${areas
            .map(
              (a) =>
                `<a href="${a.url}" class="bg-white border border-gray-300 hover:border-ybe-red hover:text-ybe-red text-gray-700 px-3 py-1 text-sm font-semibold rounded-sm transition-colors">${esc(a.label)}</a>`
            )
            .join('')}
        </div>
        <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="home-map"
           class="w-full bg-ybe-black hover:bg-ybe-charcoal text-white text-center font-heading text-xl px-6 py-4 rounded-sm transition-all uppercase tracking-wide font-bold flex items-center justify-center gap-2">
          ${icon('navigation', 20)} Get Directions</a>
      </div>
    </div>
  </div>
</section>

<section class="py-14 md:py-20 bg-gray-100">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-5xl font-heading font-bold text-ybe-black uppercase tracking-wide">Frequently Asked Questions</h2>
    </div>
    ${faqAccordion(faqs.slice(0, 6))}
    <div class="text-center mt-8">
      <a href="/faq/" class="inline-flex items-center gap-2 font-heading text-xl font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
        See All Questions ${icon('arrow-right', 20)}</a>
    </div>
  </div>
</section>

${finalCta({
  heading: 'Get Your Car Looked At',
  sub: `Call or text the shop, request an appointment online, or stop by ${b.address.street}. Open seven days a week.`,
  variant: 'home'
})}`;

  return layout({
    title: `${b.name} | Auto Repair in ${primaryArea.label}`,
    description: `Diagnostics, brakes, engines, transmissions, A/C, bodywork and roadside assistance in ${primaryArea.label}. Open seven days. Call or text ${b.phone.display}.`,
    path: '/',
    crumbs: [HOME],
    schema: [faqSchema(faqs.slice(0, 6))],
    body
  });
}

/* ============================================== SERVICES HUB (/services/) */
function renderServicesHub() {
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      Auto Repair <span class="text-ybe-red">Services</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      Everything we handle at the ${esc(primaryArea.name)} shop, grouped the way the work actually breaks down.
      Mechanical repair, diagnostics, bodywork and mobile roadside assistance.
    </p>
    ${ctaButtons({ variant: 'services' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${sectionHeading('Service Categories', 'Each hub covers one area of the vehicle and links to the specific work beneath it.')}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      ${categories.map((c) => linkCard({ url: c.url, title: c.title, blurb: c.blurb, cta: 'View Services', icon: c.icon })).join('')}
      ${linkCard({
        url: roadsideHub.url,
        title: 'Roadside Assistance',
        blurb: 'Mobile help for drivers who are stuck: jump starts, flat tires, batteries, fuel, lockouts and minor repairs.',
        cta: 'Get Emergency Help',
        icon: 'truck'
      })}
    </div>
  </div>
</section>

<section class="py-14 md:py-20 bg-gray-50 border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${sectionHeading('Every Service We Offer', 'Jump straight to the specific problem you are dealing with.')}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${categories
        .map(
          (c) => `<div class="bg-white border border-gray-200 rounded-sm p-6">
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-3 border-b-2 border-ybe-red pb-2">
          <a href="${c.url}" class="hover:text-ybe-red transition-colors">${esc(c.title)}</a></h3>
        <ul class="space-y-2">
          ${c.services
            .map(
              (s) =>
                `<li><a href="${s.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium transition-colors">
              ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
            )
            .join('')}
        </ul>
      </div>`
        )
        .join('')}
      <div class="bg-white border-2 border-ybe-red rounded-sm p-6">
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-red mb-3 border-b-2 border-ybe-red pb-2">
          <a href="${roadsideHub.url}" class="hover:text-ybe-darkred transition-colors">Roadside Assistance</a></h3>
        <ul class="space-y-2">
          ${roadsideHub.services
            .map(
              (s) =>
                `<li><a href="${s.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium transition-colors">
              ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
            )
            .join('')}
        </ul>
      </div>
    </div>
  </div>
</section>

${finalCta({ heading: 'Not Sure What You Need?', sub: 'Describe the symptom and we will tell you what it points at. Call or text the shop directly.' })}`;

  return layout({
    title: `Auto Repair Services in ${primaryArea.label} | YBE Auto`,
    description: `Diagnostics, brakes, transmissions, electrical, tires, alignment, A/C, auto body and roadside assistance in ${primaryArea.label}. Open seven days.`,
    path: '/services/',
    crumbs: [HOME, { label: 'Services', url: '/services/' }],
    body
  });
}

/* ============================================ CATEGORY HUB */
function renderCategoryHub(cat) {
  const crumbs = [HOME, { label: 'Services', url: '/services/' }, { label: cat.navLabel, url: cat.url }];
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center gap-3 mb-4">
      <div class="bg-ybe-red p-3 rounded-sm">${icon(cat.icon, 30, 'text-white')}</div>
      <span class="font-heading uppercase tracking-widest text-ybe-red font-bold">${esc(primaryArea.label)}</span>
    </div>
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">${esc(cat.title)}</h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">${esc(cat.blurb)}</p>
    ${ctaButtons({ variant: 'category' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <div class="lg:w-2/3">
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(cat.intro)}</div>
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-5">What This Covers</h2>
        <div class="mb-12">${bulletList(cat.covers)}</div>
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-5">${esc(cat.title)} Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          ${cat.services
            .map((s) =>
              linkCard({
                url: s.url,
                title: s.title,
                blurb: s.customerVoice ? `“${s.customerVoice}”` : '',
                cta: 'Read More'
              })
            )
            .join('')}
        </div>
      </div>
      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-ybe-black text-white p-6 rounded-sm border-t-4 border-ybe-red">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-4">Talk To The Shop</h2>
          <p class="text-gray-400 mb-5 text-sm leading-relaxed">Describe what the car is doing and we will tell you what it points at. Open seven days.</p>
          ${ctaButtons({ variant: 'sidebar' })}
        </div>
        ${areasServedBlock()}
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Other Categories</h2>
          <ul class="space-y-2">
            ${categories
              .filter((c) => c.slug !== cat.slug)
              .map(
                (c) =>
                  `<li><a href="${c.url}" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">
                ${icon('arrow-right', 16)} ${esc(c.title)}</a></li>`
              )
              .join('')}
            <li><a href="${roadsideHub.url}" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">
              ${icon('truck', 16)} Roadside Assistance</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: `Need ${esc(cat.navLabel)}?`, sub: `Call or text ${b.phone.display}, or request an appointment online. We are open seven days a week.` })}`;

  return layout({
    title: cat.metaTitle,
    description: cat.metaDescription,
    path: cat.url,
    crumbs,
    schema: [
      serviceSchema({
        name: cat.title,
        description: cat.metaDescription,
        url: cat.url,
        areaNames
      })
    ],
    body
  });
}

/* ============================================ SERVICE PAGE */
function renderServicePage(svc, cat) {
  const crumbs = [
    HOME,
    { label: 'Services', url: '/services/' },
    { label: cat.navLabel, url: cat.url },
    { label: svc.navLabel || svc.title, url: svc.url }
  ];

  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="font-heading uppercase tracking-widest text-ybe-red font-bold mb-3">
      <a href="${cat.url}" class="hover:text-white transition-colors">${esc(cat.title)}</a> · ${esc(primaryArea.label)}</p>
    <h1 class="text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-tight mb-5">${esc(svc.title)}</h1>
    ${
      svc.customerVoice
        ? `<p class="text-xl md:text-2xl text-gray-200 font-medium italic border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">“${esc(svc.customerVoice)}”</p>`
        : ''
    }
    ${ctaButtons({ variant: 'service' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <article class="lg:w-2/3">
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">What You May Be Noticing</h2>
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(svc.problem)}</div>

        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">What YBE Checks and Repairs</h2>
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(svc.whatWeDo)}</div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm">
            <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Common Warning Signs</h2>
            ${bulletList(svc.warningSigns)}
          </div>
          <div class="bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm">
            <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">What This Service May Include</h2>
            ${bulletList(svc.includes)}
          </div>
        </div>

        <div class="bg-ybe-black text-white p-8 rounded-sm border-l-8 border-ybe-red mb-10">
          <h2 class="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
            ${icon('alert-triangle', 26, 'inline text-ybe-red')} Why This Should Not Wait</h2>
          <div class="prose-ybe text-gray-300">${paras(svc.whyNotIgnore)}</div>
        </div>

        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">Why Drivers Choose YBE</h2>
        <div class="mb-10">${bulletList([
          `A ${esc(primaryArea.name)} shop since ${b.openedYear}, not a chain counter`,
          'Open seven days a week, 8:30 AM to 6:00 PM',
          'We test before replacing parts, so you pay for the actual repair',
          'Mechanical work and auto body under one roof',
          'Mobile roadside assistance when you cannot get the car in',
          `${b.rating.value}-star Google rating from ${b.rating.count} reviews`
        ])}</div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${relatedBlock(svc.related)}
          ${areasServedBlock()}
        </div>
      </article>

      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-ybe-black text-white p-6 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-24">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-2">Get This Handled</h2>
          <p class="text-gray-400 mb-5 text-sm leading-relaxed">
            Call or text the shop and describe what the car is doing. Open ${esc(b.hours.summary.toLowerCase())}.
          </p>
          ${ctaButtons({ variant: 'sidebar' })}
          <div class="mt-5 pt-5 border-t border-gray-700 text-sm text-gray-400 space-y-2">
            <p class="flex items-start gap-2">${icon('map-pin', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.address.oneLine)}</p>
            <p class="flex items-start gap-2">${icon('clock', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.hours.summary)}</p>
          </div>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">More in ${esc(cat.navLabel)}</h2>
          <ul class="space-y-2">
            ${cat.services
              .filter((s) => s.slug !== svc.slug)
              .map(
                (s) =>
                  `<li><a href="${s.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium">
                ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
              )
              .join('')}
          </ul>
          <a href="${cat.url}" class="mt-4 inline-flex items-center gap-2 font-heading font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
            All ${esc(cat.navLabel)} ${icon('arrow-right', 16)}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: `Need ${esc(svc.navLabel || svc.title)}?`, sub: `Call or text ${b.phone.display}, or request an appointment. We are open seven days a week in ${primaryArea.label}.` })}`;

  return layout({
    title: svc.metaTitle,
    description: svc.metaDescription,
    path: svc.url,
    crumbs,
    schema: [serviceSchema({ name: svc.title, description: svc.metaDescription, url: svc.url, areaNames })],
    body
  });
}

/* ============================================ ROADSIDE HUB */
function renderRoadsideHub() {
  const crumbs = [HOME, { label: 'Roadside Assistance', url: roadsideHub.url }];
  const body = `
<section class="py-12 md:py-16 diagonal-stripe-bg text-white border-b-8 border-ybe-red">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center gap-3 mb-4">
      <div class="bg-ybe-red p-3 rounded-sm">${icon('truck', 30, 'text-white')}</div>
      <span class="font-heading uppercase tracking-widest text-ybe-red font-bold">Mobile Help · ${esc(primaryArea.label)}</span>
    </div>
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      Roadside <span class="text-ybe-red">Assistance</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      Stuck right now? Calling is faster than any form on this page.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 max-w-2xl mb-8">
      <a href="${b.phone.href}" data-track="call" data-location="roadside-hero"
         class="flex-1 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl md:text-3xl px-8 py-5 rounded-sm shadow-hard border-2 border-transparent hover:border-white transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('phone', 30)} Call For Help</a>
      <a href="${b.sms.href}" data-track="text" data-location="roadside-hero"
         class="flex-1 bg-white hover:bg-gray-100 text-ybe-black font-heading text-2xl md:text-3xl px-8 py-5 rounded-sm shadow-hard border-2 border-transparent transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('message-square', 30)} Text Us</a>
    </div>
    <div class="max-w-3xl">${safetyNotice()}</div>
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <div class="lg:w-2/3">
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(roadsideHub.intro)}</div>
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-5">What We Handle Roadside</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          ${roadsideHub.services
            .map((s) => linkCard({ url: s.url, title: s.title, blurb: s.customerVoice ? `“${s.customerVoice}”` : '', cta: 'Read More' }))
            .join('')}
        </div>
        <div class="bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm mb-10">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">One Thing We Do Not Do</h2>
          <p class="text-gray-700 leading-relaxed">
            YBE provides roadside assistance, <strong>not towing</strong>. If your vehicle needs to come off the road
            entirely, we will tell you that honestly when you call so you can arrange a tow instead of waiting on
            help that would not solve the problem.
          </p>
        </div>
        ${areasServedBlock()}
      </div>
      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-ybe-red text-white p-6 rounded-sm lg:sticky lg:top-24">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-2">Stranded Right Now?</h2>
          <p class="mb-5 text-sm leading-relaxed text-white/90">
            Call the shop and tell us where you are and what the vehicle is doing. Open ${esc(b.hours.summary.toLowerCase())}.
          </p>
          <a href="${b.phone.href}" data-track="call" data-location="roadside-sidebar"
             class="block w-full text-center bg-white text-ybe-red font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold mb-3">
            ${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="roadside-sidebar"
             class="block w-full text-center bg-ybe-black text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">
            Text Us Instead</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Roadside Services</h2>
          <ul class="space-y-2">
            ${roadsideHub.services
              .map(
                (s) =>
                  `<li><a href="${s.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium">
                ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
              )
              .join('')}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: 'Need Help On The Road?', sub: 'Call the shop directly. Tell us your location and what the vehicle is doing.', variant: 'roadside' })}`;

  return layout({
    title: roadsideHub.metaTitle,
    description: roadsideHub.metaDescription,
    path: roadsideHub.url,
    crumbs,
    schema: [serviceSchema({ name: 'Roadside Assistance', description: roadsideHub.metaDescription, url: roadsideHub.url, areaNames })],
    body
  });
}

/* ============================================ ROADSIDE SERVICE PAGE */
function renderRoadsidePage(svc) {
  const crumbs = [
    HOME,
    { label: 'Roadside Assistance', url: roadsideHub.url },
    { label: svc.navLabel || svc.title, url: svc.url }
  ];

  const body = `
<section class="py-12 md:py-16 diagonal-stripe-bg text-white border-b-8 border-ybe-red">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="font-heading uppercase tracking-widest text-ybe-red font-bold mb-3">
      <a href="${roadsideHub.url}" class="hover:text-white transition-colors">Roadside Assistance</a> · ${esc(primaryArea.label)}</p>
    <h1 class="text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-tight mb-5">${esc(svc.title)}</h1>
    ${svc.customerVoice ? `<p class="text-xl md:text-2xl text-gray-200 font-medium italic border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">“${esc(svc.customerVoice)}”</p>` : ''}
    <div class="flex flex-col sm:flex-row gap-4 max-w-2xl mb-8">
      <a href="${b.phone.href}" data-track="call" data-location="roadside-service-hero"
         class="flex-1 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl md:text-3xl px-8 py-5 rounded-sm shadow-hard border-2 border-transparent hover:border-white transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('phone', 30)} Call For Roadside Help</a>
      <a href="${b.sms.href}" data-track="text" data-location="roadside-service-hero"
         class="flex-1 sm:flex-none bg-white hover:bg-gray-100 text-ybe-black font-heading text-2xl px-8 py-5 rounded-sm shadow-hard transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-3">
        ${icon('message-square', 26)} Text</a>
    </div>
    <div class="max-w-3xl">${safetyNotice()}</div>
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <article class="lg:w-2/3">
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">What You May Be Dealing With</h2>
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(svc.problem)}</div>

        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">How YBE Helps</h2>
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(svc.whatWeDo)}</div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm">
            <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Signs You Need This</h2>
            ${bulletList(svc.warningSigns)}
          </div>
          <div class="bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm">
            <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">What This Service May Include</h2>
            ${bulletList(svc.includes)}
          </div>
        </div>

        <div class="bg-ybe-black text-white p-8 rounded-sm border-l-8 border-ybe-red mb-10">
          <h2 class="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4">
            ${icon('alert-triangle', 26, 'inline text-ybe-red')} Worth Knowing</h2>
          <div class="prose-ybe text-gray-300">${paras(svc.whyNotIgnore)}</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${relatedBlock(svc.related)}
          ${areasServedBlock()}
        </div>
      </article>

      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-ybe-red text-white p-6 rounded-sm lg:sticky lg:top-24">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-2">Call For Roadside Help</h2>
          <p class="mb-5 text-sm leading-relaxed text-white/90">Tell us where you are and what happened. Open ${esc(b.hours.summary.toLowerCase())}.</p>
          <a href="${b.phone.href}" data-track="call" data-location="roadside-service-sidebar"
             class="block w-full text-center bg-white text-ybe-red font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold mb-3">
            ${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="roadside-service-sidebar"
             class="block w-full text-center bg-ybe-black text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">
            Text Us Instead</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Other Roadside Services</h2>
          <ul class="space-y-2">
            ${roadsideHub.services
              .filter((s) => s.slug !== svc.slug)
              .map(
                (s) =>
                  `<li><a href="${s.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium">
                ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(s.title)}</span></a></li>`
              )
              .join('')}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: 'Stuck? Call The Shop.', sub: `Call or text ${b.phone.display}. We are open seven days a week.`, variant: 'roadside' })}`;

  return layout({
    title: svc.metaTitle,
    description: svc.metaDescription,
    path: svc.url,
    crumbs,
    schema: [serviceSchema({ name: svc.title, description: svc.metaDescription, url: svc.url, areaNames })],
    body
  });
}

/* ============================================ SERVICE AREAS HUB */
function renderAreasHub() {
  const crumbs = [HOME, { label: 'Service Areas', url: '/service-areas/' }];
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      Service <span class="text-ybe-red">Areas</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      The shop is in ${esc(primaryArea.label)}. These are the Maryland and DC communities we genuinely serve —
      not a list of every city within fifty miles.
    </p>
    ${ctaButtons({ variant: 'areas' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gray-50 border-2 border-ybe-red rounded-sm p-8 mb-12">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="md:w-2/3">
          <span class="inline-block bg-ybe-red text-white font-heading uppercase tracking-widest text-xs font-bold px-3 py-1 rounded-sm mb-3">Home Shop</span>
          <h2 class="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wide text-ybe-black mb-3">
            <a href="${primaryArea.url}" class="hover:text-ybe-red transition-colors">${esc(primaryArea.label)}</a></h2>
          <p class="text-gray-700 leading-relaxed mb-4">${esc(primaryArea.intro[0])}</p>
          <a href="${primaryArea.url}" class="inline-flex items-center gap-2 font-heading text-xl font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
            Visit The Shop Page ${icon('arrow-right', 20)}</a>
        </div>
        <div class="md:w-1/3 w-full bg-white border border-gray-200 rounded-sm p-5">
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start gap-2">${icon('map-pin', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.address.oneLine)}</li>
            <li class="flex items-start gap-2">${icon('clock', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.hours.summary)}</li>
            <li class="flex items-start gap-2">${icon('phone', 16, 'text-ybe-red flex-shrink-0 mt-0.5')}
              <a href="${b.phone.href}" data-track="call" data-location="areas-hub" class="hover:text-ybe-red">${esc(b.phone.display)}</a></li>
          </ul>
        </div>
      </div>
    </div>

    ${sectionHeading('Communities We Serve', 'Each area page covers the local roads, the work we see most there, and roadside availability.')}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${areas
        .filter((a) => !a.isPrimary)
        .map((a) => linkCard({ url: a.url, title: a.label, blurb: a.relationship, cta: 'View Area', icon: 'map-pin' }))
        .join('')}
    </div>

    <div class="mt-12 bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">Not On The List?</h2>
      <p class="text-gray-700 leading-relaxed">
        Call the shop. If you are close enough that it makes sense, we will tell you. If you would be better
        served by somebody nearer to you, we will tell you that too. For roadside calls especially, distance
        matters, and we would rather be straight with you than leave you waiting.
      </p>
    </div>
  </div>
</section>

${finalCta({ heading: 'Bring It To The Shop', sub: `${b.address.oneLine}. Open seven days a week, 8:30 AM to 6:00 PM.` })}`;

  return layout({
    title: `Service Areas | YBE Auto Repair, ${primaryArea.label}`,
    description: `YBE serves ${primaryArea.label}, Washington DC, District Heights, Landover, Forestville, Hyattsville, Lanham, Bowie and Upper Marlboro. Call ${b.phone.display}.`,
    path: '/service-areas/',
    crumbs,
    body
  });
}

/* ============================================ AREA PAGE */
function renderAreaPage(area) {
  const crumbs = [HOME, { label: 'Service Areas', url: '/service-areas/' }, { label: area.label, url: area.url }];
  const svcs = (area.priorityServices || []).map(lookup).filter(Boolean);

  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="font-heading uppercase tracking-widest text-ybe-red font-bold mb-3">
      ${area.isPrimary ? 'Our Location' : 'Service Area'} · ${esc(area.relationship)}</p>
    <h1 class="text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-tight mb-5">
      ${area.isPrimary ? `Auto Repair Shop in <span class="text-ybe-red">${esc(area.name)}, ${esc(area.state)}</span>` : `Auto Repair for <span class="text-ybe-red">${esc(area.name)}, ${esc(area.state)}</span>`}
    </h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">${esc(area.intro[0])}</p>
    ${ctaButtons({ variant: 'area' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <article class="lg:w-2/3">
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(area.intro.slice(1))}</div>

        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">
          What We See Most From ${esc(area.name)} Drivers</h2>
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(area.localContext)}</div>

        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-5">
          Services ${esc(area.name)} Drivers Use Most</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          ${svcs.map((s) => linkCard({ url: s.url, title: s.title, blurb: s.customerVoice ? `“${s.customerVoice}”` : '', cta: 'Read More' })).join('')}
        </div>

        <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm mb-10">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">
            ${icon('truck', 24, 'inline text-ybe-red')} Roadside Help in ${esc(area.name)}</h2>
          <p class="text-gray-700 leading-relaxed mb-4">${esc(area.roadsideNote)}</p>
          <div class="flex flex-wrap gap-3">
            <a href="${b.phone.href}" data-track="call" data-location="area-roadside"
               class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl px-6 py-3 rounded-sm shadow-hard uppercase tracking-wide font-bold flex items-center gap-2">
              ${icon('phone', 20)} Call For Help</a>
            <a href="${roadsideHub.url}" class="bg-ybe-black hover:bg-ybe-charcoal text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold flex items-center gap-2">
              ${icon('info', 20)} Roadside Services</a>
          </div>
        </div>

        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">Getting Here</h2>
        <p class="text-gray-700 leading-relaxed mb-4">${esc(area.landmarkNote)}</p>
        <p class="text-gray-700 leading-relaxed mb-4">
          Main routes in this area include ${esc(area.roads.join(', '))}.
          The shop is at <strong>${esc(b.address.oneLine)}</strong>.
        </p>
        ${
          area.isPrimary
            ? `<p class="text-gray-700 leading-relaxed mb-6">${esc(area.landmarkNote)}</p>`
            : ''
        }
        <div class="flex flex-col lg:flex-row gap-6 mb-10">${mapSection()}
          <div class="lg:w-1/3 bg-gray-50 border border-gray-200 rounded-sm p-6">
            <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-4 border-b-2 border-ybe-red pb-2">Shop Details</h3>
            <ul class="space-y-3 text-sm text-gray-700 mb-5">
              <li class="flex items-start gap-2">${icon('map-pin', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.address.oneLine)}</li>
              <li class="flex items-start gap-2">${icon('clock', 16, 'text-ybe-red flex-shrink-0 mt-0.5')} ${esc(b.hours.summary)}</li>
              <li class="flex items-start gap-2">${icon('phone', 16, 'text-ybe-red flex-shrink-0 mt-0.5')}
                <a href="${b.phone.href}" data-track="call" data-location="area-details" class="hover:text-ybe-red">${esc(b.phone.display)}</a></li>
              <li class="flex items-start gap-2">${icon('message-square', 16, 'text-ybe-red flex-shrink-0 mt-0.5')}
                <a href="${b.sms.href}" data-track="text" data-location="area-details" class="hover:text-ybe-red">${esc(b.sms.display)}</a></li>
            </ul>
            <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="area-details"
               class="block w-full text-center bg-ybe-black hover:bg-ybe-charcoal text-white font-heading text-lg px-4 py-3 rounded-sm uppercase tracking-wide font-bold">
              Get Directions</a>
          </div>
        </div>

        <div class="bg-ybe-black text-white p-6 rounded-sm">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-4">Why ${esc(area.name)} Drivers Choose YBE</h2>
          ${bulletList([
            `Independent ${esc(primaryArea.name)} shop since ${b.openedYear}`,
            'Open seven days a week, including Sunday',
            'Mechanical repair and auto body work in one place',
            'Mobile roadside assistance available',
            `${b.rating.value}-star Google rating from ${b.rating.count} reviews`,
            'Black-owned local business'
          ], { light: true })}
        </div>
      </article>

      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-ybe-black text-white p-6 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-24">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-2">Book From ${esc(area.name)}</h2>
          <p class="text-gray-400 mb-5 text-sm leading-relaxed">Call or text the shop, or request an appointment online.</p>
          ${ctaButtons({ variant: 'sidebar' })}
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Nearby Areas</h2>
          <ul class="space-y-2">
            ${areas
              .filter((a) => a.slug !== area.slug)
              .slice(0, 8)
              .map(
                (a) =>
                  `<li><a href="${a.url}" class="flex items-center gap-2 text-gray-700 hover:text-ybe-red font-medium">
                ${icon('map-pin', 14, 'text-ybe-red flex-shrink-0')} ${esc(a.label)}</a></li>`
              )
              .join('')}
          </ul>
          <a href="/service-areas/" class="mt-4 inline-flex items-center gap-2 font-heading font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
            All Service Areas ${icon('arrow-right', 16)}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: `Serving ${esc(area.label)}`, sub: `Call or text ${b.phone.display}, or request an appointment. Open seven days a week.` })}`;

  return layout({
    title: area.metaTitle,
    description: area.metaDescription,
    path: area.url,
    crumbs,
    schema: [
      serviceSchema({
        name: `Auto Repair in ${area.label}`,
        description: area.metaDescription,
        url: area.url,
        areaNames: [area.label]
      })
    ],
    body
  });
}

/* ============================================ CAR CARE HUB */
function renderCarCareHub() {
  const crumbs = [HOME, { label: 'Car Care', url: '/car-care/' }];
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      Advice and <span class="text-ybe-red">Car Care</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      Straight answers to the questions drivers ask before deciding whether to call a shop.
      Written for everyday drivers, not mechanics.
    </p>
    ${ctaButtons({ variant: 'carcare' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
    ${clusters
      .map(
        (c) => `<div id="${c.slug}" class="scroll-mt-24">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 border-b-2 border-ybe-red pb-3">
        <div>
          <h2 class="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wide text-ybe-black">${esc(c.name)}</h2>
          <p class="text-gray-600 font-medium mt-1">${esc(c.blurb)}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${c.articles
          .map(
            (a) => `<a href="${a.url}" class="bg-gray-50 border border-gray-200 hover:border-ybe-red rounded-sm p-6 flex flex-col justify-between group transition-colors">
          <div>
            <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-3">${esc(a.title)}</h3>
            <p class="text-gray-700 leading-relaxed text-sm mb-4">${esc(a.shortAnswer.slice(0, 150))}…</p>
          </div>
          <span class="inline-flex items-center font-heading font-bold text-ybe-red uppercase tracking-wide group-hover:translate-x-2 transition-transform">
            Read Answer ${icon('arrow-right', 18, 'ml-1')}</span>
        </a>`
          )
          .join('')}
      </div>
    </div>`
      )
      .join('')}
  </div>
</section>

${finalCta({ heading: 'Still Not Sure?', sub: 'Describe the symptom over the phone and we will tell you what it points at. No charge for a conversation.' })}`;

  return layout({
    title: `Car Care Advice & Common Questions | YBE Auto`,
    description: `Answers to what drivers ask most: check-engine lights, brake noise, overheating, transmission trouble and roadside problems. YBE, ${primaryArea.label}.`,
    path: '/car-care/',
    crumbs,
    body
  });
}

/* ============================================ ARTICLE PAGE */
function renderArticle(a) {
  const cluster = clusters.find((c) => c.slug === a.cluster);
  const crumbs = [HOME, { label: 'Car Care', url: '/car-care/' }, { label: a.title, url: a.url }];
  const svc = lookup(a.relatedService);
  const related = (a.relatedArticles || []).map((s) => articleBySlug[s]).filter(Boolean);

  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="font-heading uppercase tracking-widest text-ybe-red font-bold mb-3">
      <a href="/car-care/#${cluster.slug}" class="hover:text-white transition-colors">${esc(cluster.name)}</a></p>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-wide leading-tight mb-6">${esc(a.title)}</h1>
    <div class="bg-ybe-charcoal border-l-4 border-ybe-red p-6 rounded-sm">
      <p class="font-heading uppercase tracking-widest text-ybe-red text-sm font-bold mb-2">Short Answer</p>
      <p class="text-lg text-gray-200 leading-relaxed">${esc(a.shortAnswer)}</p>
    </div>
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <article class="lg:w-2/3">
        ${a.sections
          .map(
            (s) => `<div class="mb-10">
          <h2 class="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">${esc(s.h2)}</h2>
          <div class="prose-ybe text-lg text-gray-700">${paras(s.paras)}</div>
          ${s.list ? `<div class="mt-5 bg-gray-50 border-l-4 border-ybe-red p-5 rounded-sm">${bulletList(s.list)}</div>` : ''}
        </div>`
          )
          .join('')}

        ${
          svc
            ? `<div class="bg-ybe-black text-white p-8 rounded-sm border-l-8 border-ybe-red mb-10">
          <h2 class="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide mb-3">Need This Fixed?</h2>
          <p class="text-gray-300 leading-relaxed mb-6">
            YBE handles this at the ${esc(primaryArea.name)} shop, seven days a week.
            Read more about <a href="${svc.url}" class="text-ybe-red hover:text-white font-semibold underline">${esc(svc.title)}</a>,
            or call and describe what your car is doing.
          </p>
          ${ctaButtons({ variant: 'article' })}
        </div>`
            : ''
        }

        ${
          related.length
            ? `<div>
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Related Questions</h2>
          <ul class="space-y-2">
            ${related
              .map(
                (r) =>
                  `<li><a href="${r.url}" class="flex items-start gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">
                ${icon('arrow-right', 16, 'flex-shrink-0 mt-1')} <span>${esc(r.title)}</span></a></li>`
              )
              .join('')}
          </ul>
        </div>`
            : ''
        }
      </article>

      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-ybe-black text-white p-6 rounded-sm border-t-4 border-ybe-red lg:sticky lg:top-24">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-2">Talk To A Mechanic</h2>
          <p class="text-gray-400 mb-5 text-sm leading-relaxed">
            Open ${esc(b.hours.summary.toLowerCase())} in ${esc(primaryArea.label)}.
          </p>
          ${ctaButtons({ variant: 'sidebar' })}
        </div>
        ${svc ? `<div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">The Service That Fixes It</h2>
          <a href="${svc.url}" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-bold font-heading text-xl uppercase tracking-wide">
            ${icon('wrench', 20)} ${esc(svc.title)}</a>
        </div>` : ''}
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">More in ${esc(cluster.name)}</h2>
          <ul class="space-y-2">
            ${cluster.articles
              .filter((x) => x.slug !== a.slug)
              .map(
                (x) =>
                  `<li><a href="${x.url}" class="flex items-start gap-2 text-gray-700 hover:text-ybe-red font-medium">
                ${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(x.title)}</span></a></li>`
              )
              .join('')}
          </ul>
          <a href="/car-care/" class="mt-4 inline-flex items-center gap-2 font-heading font-bold text-ybe-red uppercase tracking-wide hover:text-ybe-darkred">
            All Car Care ${icon('arrow-right', 16)}</a>
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: 'Get It Looked At', sub: `Call or text ${b.phone.display}, or request an appointment online.` })}`;

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

/* ============================================ ABOUT */
function renderAbout() {
  const crumbs = [HOME, { label: 'About', url: '/about/' }];
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      About <span class="text-ybe-red">YBE Auto Repair Center</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      A Black-owned, independent auto repair shop in ${esc(primaryArea.label)}, open seven days a week since ${b.openedYear}.
    </p>
    ${ctaButtons({ variant: 'about' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <div class="lg:w-2/3">
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">Two Decades on Edgeworth Drive</h2>
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(about.story)}</div>
        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-4">How We Work</h2>
        <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(about.approach)}</div>

        <h2 class="font-heading text-3xl font-bold uppercase tracking-wide text-ybe-black mb-5">What We Handle</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          ${categories
            .map(
              (c) => `<a href="${c.url}" class="flex items-center gap-3 bg-gray-50 border border-gray-200 hover:border-ybe-red p-4 rounded-sm transition-colors">
            <div class="bg-ybe-red text-white p-2 rounded-sm flex-shrink-0">${icon(c.icon, 20)}</div>
            <span class="font-heading text-lg font-bold uppercase tracking-wide text-ybe-black">${esc(c.title)}</span></a>`
            )
            .join('')}
          <a href="${roadsideHub.url}" class="flex items-center gap-3 bg-ybe-red text-white border-2 border-ybe-darkred p-4 rounded-sm">
            <div class="bg-white text-ybe-red p-2 rounded-sm flex-shrink-0">${icon('truck', 20)}</div>
            <span class="font-heading text-lg font-bold uppercase tracking-wide">Roadside Assistance</span></a>
        </div>

        <div class="bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">What We Do Not Claim</h2>
          <p class="text-gray-700 leading-relaxed">
            We do not provide towing. We would rather tell you that up front than have you waiting on the
            shoulder for help that cannot solve your problem. If you need a tow, call the shop and we will
            tell you straight so you can arrange one.
          </p>
        </div>
      </div>

      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">The Facts</h2>
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
        <div class="bg-ybe-black text-white p-6 rounded-sm border-t-4 border-ybe-red">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-4">Come See Us</h2>
          ${ctaButtons({ variant: 'sidebar' })}
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Also Worth Reading</h2>
          <ul class="space-y-2">
            <li><a href="/reviews/" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">${icon('star', 16)} What Customers Say</a></li>
            <li><a href="/faq/" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">${icon('help-circle', 16)} Frequently Asked Questions</a></li>
            <li><a href="/contact/" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">${icon('map-pin', 16)} Contact & Directions</a></li>
            <li><a href="/service-areas/" class="flex items-center gap-2 text-ybe-red hover:text-ybe-darkred font-semibold">${icon('map', 16)} Service Areas</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: 'Bring Us Your Car', sub: `${b.address.oneLine}. Open seven days a week, 8:30 AM to 6:00 PM.` })}`;

  return layout({
    title: `About YBE Auto Repair Center | ${primaryArea.label}`,
    description: `A Black-owned auto repair shop in ${primaryArea.label}, open seven days a week since ${b.openedYear}. Mechanical repair, bodywork and roadside assistance.`,
    path: '/about/',
    crumbs,
    body
  });
}

/* ============================================ REVIEWS */
function renderReviews() {
  const crumbs = [HOME, { label: 'Reviews', url: '/reviews/' }];
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="flex justify-center mb-5">
      <div class="flex gap-1 text-yellow-400 bg-white/10 px-5 py-3 rounded-full">
        ${Array(5).fill(icon('star', 28, 'fill-current')).join('')}
      </div>
    </div>
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-4">
      Rated <span class="text-ybe-red">${b.rating.value}</span> on Google</h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium mb-8">Based on ${b.rating.count} customer reviews.</p>
    <div class="flex justify-center"><div class="max-w-2xl w-full">${ctaButtons({ variant: 'reviews' })}</div></div>
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${sectionHeading('What Customers Mention Most', 'These are the themes that come up repeatedly across our Google reviews.')}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      ${reviewThemes
        .map(
          (t) => `<div class="bg-gray-50 border border-gray-200 rounded-sm p-6 border-l-4 border-l-ybe-red">
        <div class="flex gap-1 text-yellow-400 mb-3">${Array(5).fill(icon('star', 14, 'fill-current')).join('')}</div>
        <h2 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-3">${esc(t.theme)}</h2>
        <p class="text-gray-700 leading-relaxed">${esc(t.detail)}</p>
      </div>`
        )
        .join('')}
    </div>

    <div class="bg-ybe-black text-white p-8 rounded-sm mb-12">
      <h2 class="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide mb-6">In Customers' Words</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${quotes
          .map(
            (q) => `<blockquote class="bg-ybe-charcoal p-6 rounded-sm border border-gray-700 relative">
          ${icon('quote', 34, 'text-ybe-red absolute top-4 right-4 opacity-20')}
          <div class="flex gap-1 text-yellow-400 mb-3">${Array(5).fill(icon('star', 14, 'fill-current')).join('')}</div>
          <p class="text-gray-200 italic leading-relaxed mb-4">“${esc(q.text)}”</p>
          <footer class="font-heading text-sm font-bold uppercase text-gray-500 tracking-wide">— ${esc(q.source)}</footer>
        </blockquote>`
          )
          .join('')}
      </div>
      <p class="text-gray-500 text-sm mt-6">
        Summarized from customer feedback. Read the full, unedited reviews on our Google Business Profile.
      </p>
    </div>

    <div class="text-center">
      <a href="${b.rating.profileUrl}" target="_blank" rel="noopener noreferrer" data-track="reviews" data-location="reviews-page"
         class="inline-flex items-center gap-2 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl md:text-2xl font-bold uppercase tracking-wide px-8 py-4 rounded-sm shadow-hard transition-all">
        ${icon('external-link', 22)} Read All Google Reviews</a>
    </div>
  </div>
</section>

${finalCta({ heading: 'See For Yourself', sub: `Call or text ${b.phone.display}, or request an appointment online. Open seven days a week.` })}`;

  return layout({
    title: `Reviews | YBE Auto Repair, ${primaryArea.label}`,
    description: `${b.name} is rated ${b.rating.value} on Google from ${b.rating.count} reviews. Customers mention fair pricing, fast turnaround, weekend hours and help in urgent situations.`,
    path: '/reviews/',
    crumbs,
    body
  });
}

/* ============================================ CONTACT */
function renderContact() {
  const crumbs = [HOME, { label: 'Contact', url: '/contact/' }];
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      Contact and <span class="text-ybe-red">Directions</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      ${esc(b.address.oneLine)} · Open ${esc(b.hours.summary.toLowerCase())}
    </p>
    ${ctaButtons({ variant: 'contact' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
      <a href="${b.phone.href}" data-track="call" data-location="contact-tiles" class="bg-ybe-red text-white p-6 rounded-sm text-center hover:bg-ybe-darkred transition-colors">
        ${icon('phone', 34, 'mx-auto mb-3')}
        <h2 class="font-heading text-xl font-bold uppercase tracking-wide mb-1">Call</h2>
        <p class="font-medium">${esc(b.phone.display)}</p></a>
      <a href="${b.sms.href}" data-track="text" data-location="contact-tiles" class="bg-ybe-black text-white p-6 rounded-sm text-center hover:bg-ybe-charcoal transition-colors">
        ${icon('message-square', 34, 'mx-auto mb-3')}
        <h2 class="font-heading text-xl font-bold uppercase tracking-wide mb-1">Text</h2>
        <p class="font-medium">${esc(b.phone.display)}</p></a>
      <a href="${b.whatsapp.href}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location="contact-tiles" class="bg-[#25D366] text-white p-6 rounded-sm text-center hover:bg-[#128C7E] transition-colors">
        ${icon('message-circle', 34, 'mx-auto mb-3')}
        <h2 class="font-heading text-xl font-bold uppercase tracking-wide mb-1">WhatsApp</h2>
        <p class="font-medium">Message us</p></a>
      <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="contact-tiles" class="bg-gray-100 text-ybe-black border-2 border-ybe-black p-6 rounded-sm text-center hover:bg-white transition-colors">
        ${icon('navigation', 34, 'mx-auto mb-3 text-ybe-red')}
        <h2 class="font-heading text-xl font-bold uppercase tracking-wide mb-1">Directions</h2>
        <p class="font-medium">Open in Maps</p></a>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 mb-12">
      ${mapSection()}
      <div class="lg:w-1/3 space-y-6">
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4 border-b-2 border-ybe-red pb-2">Shop Information</h2>
          <ul class="space-y-4 text-gray-700">
            <li class="flex items-start gap-3">${icon('map-pin', 20, 'text-ybe-red flex-shrink-0 mt-0.5')}
              <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Address</strong>${esc(b.address.oneLine)}</div></li>
            <li class="flex items-start gap-3">${icon('clock', 20, 'text-ybe-red flex-shrink-0 mt-0.5')}
              <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Hours</strong>${esc(b.hours.summary)}</div></li>
            <li class="flex items-start gap-3">${icon('phone', 20, 'text-ybe-red flex-shrink-0 mt-0.5')}
              <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Phone &amp; Text</strong>
                <a href="${b.phone.href}" data-track="call" data-location="contact-info" class="hover:text-ybe-red">${esc(b.phone.display)}</a></div></li>
            <li class="flex items-start gap-3">${icon('accessibility', 20, 'text-ybe-red flex-shrink-0 mt-0.5')}
              <div><strong class="block font-heading uppercase text-sm tracking-wide text-ybe-black">Accessibility</strong>Wheelchair-accessible parking</div></li>
          </ul>
        </div>
        <div class="bg-ybe-black text-white p-6 rounded-sm border-t-4 border-ybe-red">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Weekly Hours</h2>
          <ul class="space-y-1 text-gray-300 text-sm">
            ${b.hours.days
              .map(
                (d) =>
                  `<li class="flex justify-between border-b border-gray-800 py-1.5"><span>${esc(d)}</span><span class="font-semibold text-white">8:30 AM – 6:00 PM</span></li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">Need An Appointment?</h2>
        <p class="text-gray-700 leading-relaxed mb-4">Tell us about the vehicle and what it is doing, and we will get back to you to confirm a time.</p>
        <a href="/request-appointment/" data-track="appointment" data-location="contact-page"
           class="inline-flex items-center gap-2 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl px-6 py-3 rounded-sm shadow-hard uppercase tracking-wide font-bold">
          ${icon('calendar', 20)} Request Appointment</a>
      </div>
      <div class="bg-gray-50 border-l-4 border-ybe-black p-6 rounded-sm">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">Stranded Right Now?</h2>
        <p class="text-gray-700 leading-relaxed mb-4">Do not fill out a form. Call the shop and tell us where you are.</p>
        <a href="${b.phone.href}" data-track="call" data-location="contact-roadside"
           class="inline-flex items-center gap-2 bg-ybe-black hover:bg-ybe-charcoal text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">
          ${icon('phone', 20)} ${esc(b.phone.display)}</a>
      </div>
    </div>
  </div>
</section>

${finalCta({ heading: 'We Are Open Today', sub: `${b.hours.summary}. Call, text, or stop by ${b.address.street}.` })}`;

  return layout({
    title: `Contact & Directions | YBE Auto, ${primaryArea.label}`,
    description: `Find ${b.name} at ${b.address.oneLine}. Open ${b.hours.summary.toLowerCase()}. Call or text ${b.phone.display}, or get directions.`,
    path: '/contact/',
    crumbs,
    body
  });
}

/* ============================================ REQUEST APPOINTMENT */
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
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      Request an <span class="text-ybe-red">Appointment</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      Tell us about your vehicle and what it is doing. We will get back to you to confirm a time.
    </p>
    ${ctaButtons({ variant: 'appointment' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row gap-12">
      <div class="lg:w-2/3">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-sm mb-8">
          <p class="text-gray-800 leading-relaxed">
            <strong class="font-heading uppercase tracking-wide">This is a request, not a confirmed booking.</strong>
            Your appointment is not scheduled until someone from YBE contacts you to confirm the time.
            If you need help today, calling is faster.
          </p>
        </div>

        <form id="appointment-form" class="bg-gray-50 border border-gray-200 rounded-sm p-6 md:p-8" novalidate>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          <div class="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button type="submit" data-track="appointment" data-location="appointment-form"
              class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-8 py-4 rounded-sm shadow-hard border-2 border-transparent hover:border-ybe-black transition-all uppercase tracking-wide font-bold flex items-center gap-2">
              ${icon('calendar-check', 24)} Send Request</button>
            <p class="text-sm text-gray-600">Or call <a href="${b.phone.href}" data-track="call" data-location="appointment-form" class="text-ybe-red font-semibold hover:underline">${esc(b.phone.display)}</a> to speak with us now.</p>
          </div>
          <div id="form-status" role="status" aria-live="polite" class="mt-5"></div>
        </form>

        <div class="mt-8 bg-ybe-black text-white p-6 rounded-sm border-l-8 border-ybe-red">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">Prefer To Book Online?</h2>
          <p class="text-gray-300 leading-relaxed mb-5">You can also schedule directly through our Square booking site.</p>
          <a href="${b.booking.href}" target="_blank" rel="noopener noreferrer" data-track="appointment" data-location="square-booking"
             class="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-ybe-black font-heading text-xl px-6 py-3 rounded-sm shadow-hard uppercase tracking-wide font-bold">
            ${esc(b.booking.label)} ${icon('external-link', 20)}</a>
        </div>
      </div>

      <aside class="lg:w-1/3 space-y-8">
        <div class="bg-ybe-red text-white p-6 rounded-sm">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-2">Need Help Today?</h2>
          <p class="mb-5 text-sm leading-relaxed text-white/90">Calling gets a faster answer than any form, especially for urgent problems.</p>
          <a href="${b.phone.href}" data-track="call" data-location="appointment-sidebar"
             class="block w-full text-center bg-white text-ybe-red font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold mb-3">${esc(b.phone.display)}</a>
          <a href="${b.sms.href}" data-track="text" data-location="appointment-sidebar"
             class="block w-full text-center bg-ybe-black text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Text Us Instead</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-sm p-6">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-4">Good To Know</h2>
          ${bulletList([
            'Walk-ins are welcome, but calling ahead helps us get to you faster',
            'Open seven days a week, 8:30 AM to 6:00 PM',
            'Wheelchair-accessible parking on site',
            'Roadside assistance available — call, do not fill out a form',
            'We will confirm your appointment before it is scheduled'
          ])}
        </div>
      </aside>
    </div>
  </div>
</section>

${finalCta({ heading: 'Questions Before Booking?', sub: `Call or text ${b.phone.display}. We are happy to talk through what your car is doing.` })}`;

  return layout({
    title: `Request an Appointment | YBE Auto, ${primaryArea.label}`,
    description: `Request a service appointment at YBE in ${primaryArea.label}. Tell us about your vehicle and the problem and we will confirm a time. Call ${b.phone.display}.`,
    path: '/request-appointment/',
    crumbs,
    body
  });
}

/* ============================================ FAQ */
function renderFaq() {
  const crumbs = [HOME, { label: 'FAQ', url: '/faq/' }];
  const body = `
<section class="py-12 md:py-16 bg-ybe-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-wide leading-none mb-5">
      Frequently Asked <span class="text-ybe-red">Questions</span></h1>
    <p class="text-lg md:text-xl text-gray-300 font-medium border-l-4 border-ybe-red pl-4 max-w-3xl mb-8">
      Hours, walk-ins, roadside assistance, towing, and what we do and do not offer.
    </p>
    ${ctaButtons({ variant: 'faq' })}
  </div>
</section>

${trustStrip()}

<section class="py-14 md:py-20 bg-gray-100">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    ${faqAccordion(faqs)}
    <div class="mt-10 bg-white border-l-4 border-ybe-red p-6 rounded-sm">
      <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3">Question Not Answered?</h2>
      <p class="text-gray-700 leading-relaxed mb-5">Call or text the shop. We would rather answer a question than have you guessing.</p>
      <div class="max-w-xl">${ctaButtons({ variant: 'faq-bottom' })}</div>
    </div>
  </div>
</section>

${finalCta({ heading: 'Still Have Questions?', sub: `Call or text ${b.phone.display}. Open seven days a week, 8:30 AM to 6:00 PM.` })}`;

  return layout({
    title: `Frequently Asked Questions | YBE Auto`,
    description: `Answers about hours, walk-ins, texting, roadside assistance, towing and auto body work at ${b.name} in ${primaryArea.label}.`,
    path: '/faq/',
    crumbs,
    schema: [faqSchema(faqs)],
    body
  });
}

/* ============================================ 404 */
function render404() {
  const body = `
<section class="py-20 md:py-28 bg-ybe-black text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <div class="inline-flex items-center justify-center p-4 bg-ybe-red rounded-full mb-6">${icon('alert-triangle', 44, 'text-white')}</div>
    <h1 class="text-5xl md:text-7xl font-heading font-extrabold uppercase tracking-wide mb-4">Page Not Found</h1>
    <p class="text-lg text-gray-300 mb-8">That page does not exist. Here is where to go instead.</p>
    <div class="max-w-xl mx-auto mb-10">${ctaButtons({ variant: '404' })}</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
      ${[
        { label: 'All Services', url: '/services/' },
        { label: 'Roadside Assistance', url: roadsideHub.url },
        { label: 'Service Areas', url: '/service-areas/' },
        { label: 'Car Care Advice', url: '/car-care/' },
        { label: 'Contact & Directions', url: '/contact/' },
        { label: 'Request an Appointment', url: '/request-appointment/' }
      ]
        .map(
          (l) =>
            `<a href="${l.url}" class="flex items-center gap-2 bg-ybe-charcoal hover:bg-ybe-red border border-gray-700 p-4 rounded-sm font-heading text-xl uppercase tracking-wide transition-colors">
          ${icon('arrow-right', 20, 'text-ybe-red')} ${esc(l.label)}</a>`
        )
        .join('')}
    </div>
  </div>
</section>`;

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
  renderHome, renderServicesHub, renderCategoryHub, renderServicePage,
  renderRoadsideHub, renderRoadsidePage, renderAreasHub, renderAreaPage,
  renderCarCareHub, renderArticle, renderAbout, renderReviews,
  renderContact, renderAppointment, renderFaq, render404
};
