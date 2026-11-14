/**
 * SPANISH PAGES (/es/). Content: src/data/es.js. Chrome: src/lib/es-chrome.js.
 * Each page mirrors an English page and links to it; hreflang pairs them.
 */
const b = require('../data/business.js');
const ES = require('../data/es.js');
const { layout } = require('./layout.js');
const { icon } = require('./icons.js');
const T = require('./templates.js');
const K = require('./blocks.js');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const paras = (arr) => arr.map((p) => `<p>${esc(p)}</p>`).join('');
const section = (inner, bg = 'bg-white') =>
  `<section class="py-16 md:py-20 ${bg}"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${inner}</div></section>`;
const h2 = (t) => `<h2 class="text-3xl md:text-4xl font-heading font-extrabold text-ybe-black uppercase tracking-wide leading-none mb-5">${t}</h2>`;
const INICIO = { label: 'Inicio', url: '/es/' };

/** Accent the place: "Reparación de frenos <span>en Capitol Heights, MD</span>". */
function h1Html(t) {
  const m = t.match(/^(.*?)( en .+)$/);
  return m ? `${esc(m[1])}<span class="text-ybe-red">${esc(m[2])}</span>` : esc(t);
}

function hero({ eyebrow, title, sub, roadside = false }) {
  return `<section class="relative bg-surface text-white py-16 md:py-20 border-b-4 border-ybe-red">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="font-heading text-sm md:text-base font-bold uppercase tracking-widest text-white mb-3">${esc(eyebrow)}</p>
    <h1 class="text-4xl md:text-6xl font-heading font-extrabold text-white uppercase leading-tight mb-4 tracking-wide">${h1Html(title)}</h1>
    ${sub ? `<p class="text-lg md:text-xl text-gray-700 max-w-3xl border-l-4 border-ybe-red pl-4 mb-8">${esc(sub)}</p>` : ''}
    <div class="flex flex-col sm:flex-row gap-4">
      <a href="${b.phone.href}" data-track="call" data-location="hero-es"
         class="inline-flex items-center justify-center gap-2 bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-2xl px-8 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold">
        ${icon('phone', 26)} ${roadside ? 'Llame para ayuda' : 'Llamar al taller'}</a>
      <a href="${b.sms.href}" data-track="text" data-location="hero-es"
         class="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white hover:text-ybe-black text-white border-2 border-white font-heading text-2xl px-8 py-4 rounded-sm uppercase tracking-wide font-bold">
        ${icon('message-square', 24)} Enviar mensaje</a>
    </div>
    <div class="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-white">
      <span class="flex items-center gap-2">${icon('clock', 16, 'text-ybe-red')} De 8:30 AM a 6:00 PM, los siete días</span>
      <span class="flex items-center gap-2">${icon('map-pin', 16, 'text-ybe-red')} ${esc(b.address.oneLine)}</span>
    </div>
  </div>
</section>`;
}

/** The language note, on every Spanish page: staff answer in English. */
const langNote = () => `<div class="bg-ybe-redtint border-l-4 border-ybe-red p-5 rounded-sm flex gap-3 items-start">
  ${icon('message-circle', 22, 'text-ybe-red flex-shrink-0 mt-0.5')}
  <p class="text-gray-800 leading-relaxed">${esc(ES.LANG_NOTE)}</p></div>`;

const linkList = (items) =>
  `<ul class="space-y-1">${items
    .map((i) => `<li><a href="${i.url}" class="flex items-start gap-2 py-2 text-gray-700 hover:text-ybe-red font-medium">${icon('chevron-right', 16, 'text-ybe-red flex-shrink-0 mt-1')} <span>${esc(i.label)}</span></a></li>`)
    .join('')}</ul>`;

const englishLink = (en) =>
  `<p class="text-sm text-gray-600 mt-6">Más detalles en inglés: <a href="${en}" hreflang="en" lang="en" class="text-ybe-red underline">English version</a>.</p>`;

const contactBand = () => section(
  `<div class="flex flex-col lg:flex-row gap-10">
    <div class="lg:w-1/2">
      ${h2('Visítenos o llámenos')}
      <p class="text-lg text-gray-700 mb-2"><strong>${esc(b.address.oneLine)}</strong></p>
      <p class="text-lg text-gray-700 mb-6">Abierto de 8:30 AM a 6:00 PM, los siete días de la semana. Se aceptan clientes sin cita.</p>
      <div class="flex flex-wrap gap-3 mb-6">
        <a href="${b.phone.href}" data-track="call" data-location="contact-es" class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-xl px-6 py-3 rounded-sm shadow-hard uppercase tracking-wide font-bold inline-flex items-center gap-2">${icon('phone', 20)} ${esc(b.phone.display)}</a>
        <a href="${b.whatsapp.href}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location="contact-es" class="bg-surface text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold inline-flex items-center gap-2">${icon('message-circle', 20)} WhatsApp</a>
        <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="contact-es" class="bg-white border-2 border-ybe-black text-ybe-black font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold inline-flex items-center gap-2">${icon('navigation', 20)} Cómo llegar</a>
      </div>
      ${langNote()}
    </div>
    <div class="lg:w-1/2 h-[360px] bg-gray-200 rounded-sm border border-gray-300 overflow-hidden">
      <iframe src="${b.maps.embedUrl}" width="100%" height="100%" style="border:0;" title="Mapa de ${esc(b.name)} en ${esc(b.address.oneLine)}" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
  </div>`,
  'bg-gray-50'
);

function page({ url, title, description, crumbs, body, schema = [] }) {
  return layout({ title, description, path: url, crumbs, body, schema, lang: 'es' });
}

function renderEsHome() {
  const h = ES.home;
  const body = `
${hero({ eyebrow: h.slogan, title: h.title, sub: h.intro })}
${section(`${langNote()}`, 'bg-white')}
${section(
  `${h2('Nuestros servicios')}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    ${ES.categories
      .map((c) => `<a href="${c.url}" class="block bg-white border border-gray-200 border-l-4 border-l-ybe-red p-6 rounded-sm hover:shadow-lg transition-shadow">
        <h3 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-2">${esc(c.title)}</h3>
        <p class="text-gray-600 text-sm leading-relaxed">${esc(c.services.map((s) => s.name).join(', '))}.</p></a>`)
      .join('')}
    <a href="${ES.roadsideHub.url}" class="block bg-surface text-white border-l-4 border-ybe-red p-6 rounded-sm hover:shadow-lg transition-shadow">
      <h3 class="font-heading text-xl font-bold uppercase tracking-wide mb-2">Asistencia en carretera</h3>
      <p class="text-white text-sm leading-relaxed">${esc(ES.roadside.map((r) => r.title).join(', '))}.</p></a>
  </div>`,
  'bg-gray-50'
)}
${section(`${h2('Preguntas frecuentes')}${T.faqAccordion(ES.faqs.slice(0, 6))}<p class="mt-6"><a href="${ES.faqPage.url}" class="text-ybe-red font-semibold underline">Ver todas las preguntas</a></p>`)}
${contactBand()}`;
  return page({
    url: h.url, title: h.metaTitle, description: h.metaDescription, crumbs: [INICIO], body,
    schema: [T.faqSchema(ES.faqs.slice(0, 6))]
  });
}

function renderEsServicesHub() {
  const p = ES.servicesHub;
  const body = `
${hero({ eyebrow: 'YBE Auto Repair Center', title: `${p.title} en ${ES.PLACE}`, sub: 'Mecánica y carrocería bajo el mismo techo, abierto los siete días.' })}
${section(
  `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    ${ES.categories
      .map((c) => `<div class="bg-gray-50 border border-gray-200 border-l-4 border-l-ybe-red p-8 rounded-sm">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-3"><a href="${c.url}" class="hover:text-ybe-red">${esc(c.title)}</a></h2>
        <p class="text-gray-700 leading-relaxed mb-4">${esc(c.intro)}</p>
        ${linkList(c.services.map((s) => ({ label: s.name, url: c.url })))}
      </div>`)
      .join('')}
  </div>
  <div class="mt-10">${langNote()}</div>`
)}
${contactBand()}`;
  return page({ url: p.url, title: p.metaTitle, description: p.metaDescription, crumbs: [INICIO, { label: 'Servicios', url: p.url }], body });
}

function renderEsCategory(c) {
  const body = `
${hero({ eyebrow: 'Servicios', title: `${c.title} en ${ES.PLACE}`, sub: c.intro })}
${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <div class="lg:w-2/3 space-y-6">
      ${c.services
        .map((s) => `<div class="bg-gray-50 border-l-4 border-ybe-red p-6 rounded-sm">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-2">${esc(s.name)}</h2>
          <p class="text-gray-700 leading-relaxed mb-2">${esc(s.text)}</p>
          <a href="${s.en}" hreflang="en" lang="en" class="text-sm text-ybe-red underline">Más detalles en inglés</a>
        </div>`)
        .join('')}
      ${langNote()}
    </div>
    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Otros servicios</h2>
        ${linkList([...ES.categories.filter((x) => x.slug !== c.slug).map((x) => ({ label: x.title, url: x.url })), { label: 'Asistencia en carretera', url: ES.roadsideHub.url }])}
      </div>
    </aside>
  </div>
  ${englishLink(c.en)}`
)}
${contactBand()}`;
  return page({
    url: c.url, title: c.metaTitle, description: c.metaDescription,
    crumbs: [INICIO, { label: 'Servicios', url: ES.servicesHub.url }, { label: c.title, url: c.url }], body,
    schema: [T.serviceSchema({ name: c.title, description: c.metaDescription, url: c.url, areaNames: [ES.PLACE] })]
  });
}

function renderEsRoadsideHub() {
  const r = ES.roadsideHub;
  const body = `
${hero({ eyebrow: 'Ayuda donde está su auto', title: `${r.title} en ${ES.PLACE}`, sub: r.intro[0], roadside: true })}
${section(
  `<div class="prose-ybe text-lg text-gray-700 max-w-3xl mb-10">${paras(r.intro.slice(1))}</div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    ${ES.roadside
      .map((s) => `<a href="${s.url}" class="block bg-gray-50 border border-gray-200 border-l-4 border-l-ybe-red p-6 rounded-sm hover:shadow-lg transition-shadow">
        <h2 class="font-heading text-xl font-bold uppercase tracking-wide text-ybe-black mb-2">${esc(s.title)}</h2>
        <p class="text-gray-600 text-sm">“${esc(s.voice)}”</p></a>`)
      .join('')}
  </div>
  ${langNote()}
  ${englishLink(r.en)}`
)}
${contactBand()}`;
  return page({ url: r.url, title: r.metaTitle, description: r.metaDescription, crumbs: [INICIO, { label: 'Asistencia en carretera', url: r.url }], body });
}

function renderEsRoadside(s) {
  const list = (items) => K.checkList(items);
  const body = `
${hero({ eyebrow: s.calm ? 'Servicio móvil' : 'Asistencia en carretera', title: `${s.title} en ${ES.PLACE}`, sub: `“${s.voice}”`, roadside: !s.calm })}
${section(
  `<div class="flex flex-col lg:flex-row gap-12">
    <article class="lg:w-2/3">
      ${h2('Lo que puede estar pasando')}
      <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(s.problem)}</div>
      ${h2('Cómo le ayuda YBE')}
      <div class="prose-ybe text-lg text-gray-700 mb-10">${paras(s.whatWeDo)}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-red">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5">Señales</h2>${list(s.signs)}</div>
        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200 border-l-4 border-l-ybe-black">
          <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5">Lo que incluye</h2>${list(s.includes)}</div>
      </div>
      <div class="bg-surface text-white p-8 rounded-sm border-l-8 border-ybe-red mb-10">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-4">Bueno saberlo</h2>
        <div class="prose-ybe text-white text-lg">${paras(s.note)}</div>
      </div>
      ${langNote()}
      ${englishLink(s.en)}
    </article>
    <aside class="lg:w-1/3 space-y-8">
      <div class="bg-ybe-red text-white p-8 rounded-sm lg:sticky lg:top-32">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide mb-3">${s.calm ? 'Pida una oferta' : 'Llame para ayuda'}</h2>
        <a href="${b.phone.href}" data-track="call" data-location="roadside-sidebar-es" class="block w-full text-center bg-white text-ybe-red font-heading text-2xl px-6 py-4 rounded-sm shadow-hard uppercase tracking-wide font-bold mb-3">${esc(b.phone.display)}</a>
        <a href="${b.sms.href}" data-track="text" data-location="roadside-sidebar-es" class="block w-full text-center bg-surface text-white font-heading text-xl px-6 py-3 rounded-sm uppercase tracking-wide font-bold">Enviar mensaje</a>
      </div>
      <div class="bg-gray-50 p-8 rounded-sm border border-gray-200">
        <h2 class="font-heading text-2xl font-bold uppercase tracking-wide text-ybe-black mb-5 border-b-2 border-ybe-red pb-2">Otros servicios</h2>
        ${linkList(ES.roadside.filter((x) => x.slug !== s.slug).map((x) => ({ label: x.title, url: x.url })))}
      </div>
    </aside>
  </div>`
)}
${contactBand()}`;
  return page({
    url: s.url, title: s.metaTitle, description: s.metaDescription,
    crumbs: [INICIO, { label: 'Asistencia en carretera', url: ES.roadsideHub.url }, { label: s.title, url: s.url }], body,
    schema: [T.serviceSchema({ name: s.title, description: s.metaDescription, url: s.url, areaNames: [ES.PLACE] })]
  });
}

function renderEsContact() {
  const c = ES.contact;
  const body = `
${hero({ eyebrow: 'YBE Auto Repair Center', title: `${c.title} en ${ES.PLACE}`, sub: 'Estamos cerca del corredor de Central Avenue y a poca distancia de la línea de DC.' })}
${contactBand()}`;
  return page({ url: c.url, title: c.metaTitle, description: c.metaDescription, crumbs: [INICIO, { label: 'Contacto', url: c.url }], body });
}

function renderEsFaq() {
  const f = ES.faqPage;
  const body = `
${hero({ eyebrow: 'YBE Auto Repair Center', title: `${f.title} en ${ES.PLACE}`, sub: 'Horario, citas, mensajes, asistencia en carretera, grúa y carrocería.' })}
<section class="py-16 md:py-20 bg-gray-100"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  ${T.faqAccordion(ES.faqs)}
  <div class="mt-10">${langNote()}</div>
</div></section>
${contactBand()}`;
  return page({ url: f.url, title: f.metaTitle, description: f.metaDescription, crumbs: [INICIO, { label: 'Preguntas frecuentes', url: f.url }], body, schema: [T.faqSchema(ES.faqs)] });
}

/** Every Spanish page as [url, html]. */
function renderAllEs() {
  return [
    [ES.home.url, renderEsHome()],
    [ES.servicesHub.url, renderEsServicesHub()],
    ...ES.categories.map((c) => [c.url, renderEsCategory(c)]),
    [ES.roadsideHub.url, renderEsRoadsideHub()],
    ...ES.roadside.map((s) => [s.url, renderEsRoadside(s)]),
    [ES.contact.url, renderEsContact()],
    [ES.faqPage.url, renderEsFaq()]
  ];
}

module.exports = { renderAllEs };
