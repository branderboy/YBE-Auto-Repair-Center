/**
 * Spanish header, footer and phone action bar for the /es/ pages.
 * Same structure and classes as the English chrome in layout.js.
 */
const b = require('../data/business.js');
const { icon } = require('./icons.js');
const ES = require('../data/es.js');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NAV = [
  { label: 'Inicio', url: '/es/' },
  { label: 'Servicios', url: ES.servicesHub.url, children: ES.categories.map((c) => ({ label: c.title, url: c.url })) },
  { label: 'Asistencia en carretera', url: ES.roadsideHub.url, highlight: true, children: ES.roadside.map((r) => ({ label: r.title, url: r.url })) },
  { label: 'Preguntas', url: ES.faqPage.url },
  { label: 'Contacto', url: ES.contact.url }
];

function header(path) {
  const english = ES.ES_TO_EN[path] || '/';
  const isActive = (url) => path === url || (url !== '/es/' && path.startsWith(url));
  const desktop = NAV.map((item) => {
    const kids = (item.children || [])
      .map((c) => `<a href="${c.url}" class="block px-4 py-2.5 text-ybe-black hover:bg-gray-50 hover:text-ybe-red font-medium text-sm border-b border-gray-100 last:border-0">${esc(c.label)}</a>`)
      .join('');
    return `<div class="relative group">
      <a href="${item.url}" class="flex items-center gap-1 font-heading tracking-wide text-base xl:text-lg font-semibold uppercase py-2 whitespace-nowrap ${
        item.highlight ? 'text-ybe-red hover:text-ybe-darkred' : isActive(item.url) ? 'text-ybe-red' : 'text-ybe-black hover:text-ybe-red'
      }">${esc(item.label)}${kids ? icon('chevron-down', 16) : ''}</a>
      ${kids ? `<div class="absolute left-0 top-full w-72 bg-white border border-gray-200 shadow-xl rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50"><div class="border-t-4 border-ybe-red">${kids}</div></div>` : ''}
    </div>`;
  }).join('');
  const mobile = NAV.map(
    (item) => `<div class="border-b border-gray-100">
      <a href="${item.url}" class="mobile-nav-link block px-3 py-3 font-heading text-xl uppercase tracking-wide ${item.highlight ? 'text-ybe-red font-bold' : 'text-ybe-black'}">${esc(item.label)}</a>
      ${item.children ? `<div class="pb-2 pl-6">${item.children.map((c) => `<a href="${c.url}" class="mobile-nav-link block py-1.5 text-sm text-gray-600 hover:text-ybe-red">${esc(c.label)}</a>`).join('')}</div>` : ''}
    </div>`
  ).join('');

  return `<header id="main-header" class="fixed w-full z-50 transition-all duration-300 bg-white py-3 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex justify-center lg:justify-between items-center gap-4">
        <a href="/es/" class="flex-shrink-0 flex items-center" aria-label="${esc(b.name)}, inicio">
          <img id="header-logo" src="${b.images.logo}" alt="${esc(b.images.logoAlt)}" width="240" height="152" class="transition-all duration-300 h-20 sm:h-24 lg:h-24 w-auto" />
        </a>
        <nav class="hidden lg:flex items-center gap-4 xl:gap-5" aria-label="Navegación principal">${desktop}</nav>
        <div class="hidden lg:flex items-center gap-2">
          <a href="${english}" hreflang="en" lang="en" class="font-heading text-base font-semibold uppercase tracking-wide text-ybe-black hover:text-ybe-red px-2 py-2 whitespace-nowrap">English</a>
          <a href="${b.phone.href}" data-track="call" data-location="header-es"
             class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-base xl:text-lg px-4 py-2 rounded-sm shadow-hard border-2 border-transparent hover:border-ybe-black transition-all flex items-center gap-2 uppercase tracking-wide font-bold whitespace-nowrap">
            ${icon('phone', 18)} ${esc(b.phone.display)}</a>
        </div>
        <div class="lg:hidden flex items-center absolute right-0 top-1/2 -translate-y-1/2">
          <button id="mobile-menu-btn" class="text-ybe-black hover:text-ybe-red focus:outline-none focus-visible:ring-2 focus-visible:ring-ybe-red p-1"
                  aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
            ${icon('menu', 32, 'menu-open-icon')}${icon('x', 32, 'menu-close-icon hidden')}<span class="sr-only">Menú</span>
          </button>
        </div>
      </div>
    </div>
    <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg max-h-[80vh] overflow-y-auto">
      <div class="px-2 pt-2 pb-4">
        ${mobile}
        <div class="border-b border-gray-100"><a href="${english}" hreflang="en" lang="en" class="mobile-nav-link block px-3 py-3 font-heading text-xl uppercase tracking-wide text-ybe-black">English</a></div>
        <div class="grid grid-cols-2 gap-2 mt-4 px-1">
          <a href="${b.phone.href}" data-track="call" data-location="mobile-menu-es" class="text-center bg-ybe-red text-white font-heading text-lg py-3 rounded-sm uppercase tracking-wide font-bold">Llamar</a>
          <a href="${b.sms.href}" data-track="text" data-location="mobile-menu-es" class="text-center bg-ybe-black text-white font-heading text-lg py-3 rounded-sm uppercase tracking-wide font-bold">Mensaje</a>
        </div>
      </div>
    </div>
  </header>`;
}

function footer() {
  const list = (items) => items.map((l) => `<li><a href="${l.url}" class="inline-block py-2.5 hover:text-ybe-red transition-colors">${esc(l.label)}</a></li>`).join('');
  return `<footer class="diagonal-stripe-bg text-white pt-14 pb-24 md:pb-8 border-t-8 border-ybe-red">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <img src="${b.images.logo}" alt="${esc(b.images.logoAlt)}" width="240" height="152" loading="lazy" class="h-16 w-auto mb-5" />
          <p class="mb-4 text-sm leading-relaxed">Reparación, diagnóstico, mantenimiento, carrocería y asistencia en carretera en ${esc(b.address.city)} y comunidades cercanas de Maryland y DC desde ${b.openedYear}.</p>
          <p class="text-sm leading-relaxed text-white">${esc(ES.LANG_NOTE)}</p>
        </div>
        <div>
          <h2 class="font-heading text-xl font-bold uppercase text-white mb-5 border-b border-gray-800 pb-2">Contacto</h2>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-3">${icon('map-pin', 18, 'text-ybe-red flex-shrink-0 mt-0.5')}<span>${esc(b.address.oneLine)}</span></li>
            <li class="flex items-center gap-3">${icon('phone', 18, 'text-ybe-red flex-shrink-0')}<a href="${b.phone.href}" data-track="call" data-location="footer-es" class="inline-block py-2.5 hover:text-white">${esc(b.phone.display)}</a></li>
            <li class="flex items-center gap-3">${icon('message-square', 18, 'text-ybe-red flex-shrink-0')}<a href="${b.sms.href}" data-track="text" data-location="footer-es" class="inline-block py-2.5 hover:text-white">Mensaje de texto</a></li>
            <li class="flex items-center gap-3">${icon('message-circle', 18, 'text-[#25D366] flex-shrink-0')}<a href="${b.whatsapp.href}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location="footer-es" class="inline-block py-2.5 hover:text-white">WhatsApp</a></li>
            <li class="flex items-start gap-3">${icon('clock', 18, 'text-ybe-red flex-shrink-0 mt-0.5')}<span>De 8:30 AM a 6:00 PM, los siete días de la semana</span></li>
          </ul>
        </div>
        <div>
          <h2 class="font-heading text-xl font-bold uppercase text-white mb-5 border-b border-gray-800 pb-2">Servicios</h2>
          <ul class="space-y-2 text-sm font-medium">${list(ES.categories.map((c) => ({ label: c.title, url: c.url })))}
            <li><a href="${ES.roadsideHub.url}" class="inline-block py-2.5 text-ybe-red hover:text-white font-bold">Asistencia en carretera</a></li></ul>
        </div>
        <div>
          <h2 class="font-heading text-xl font-bold uppercase text-white mb-5 border-b border-gray-800 pb-2">Más</h2>
          <ul class="space-y-2 text-sm font-medium">${list([
            { label: 'Inicio', url: '/es/' },
            { label: 'Todos los servicios', url: ES.servicesHub.url },
            { label: 'Preguntas frecuentes', url: ES.faqPage.url },
            { label: 'Contacto y cómo llegar', url: ES.contact.url },
            { label: 'English', url: '/' }
          ])}</ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white">
        <p>&copy; ${new Date().getFullYear()} ${esc(b.name)}. Todos los derechos reservados.</p>
        <div class="flex flex-wrap justify-center gap-3"><span>${esc(b.address.city)}, ${esc(b.address.state)}</span><span>|</span><span>Desde ${b.openedYear}</span></div>
      </div>
    </div>
  </footer>`;
}

function mobileBar() {
  const item = (href, track, ic, color, label, extra = '') =>
    `<a href="${href}" ${extra} data-track="${track}" data-location="mobile-bar-es" class="flex-1 flex flex-col items-center justify-center py-2.5 text-white active:bg-ybe-charcoal transition-colors border-r border-gray-700 last:border-r-0">
      ${icon(ic, 22, `mb-1 ${color}`)}<span class="font-heading uppercase text-sm tracking-wider font-semibold">${label}</span></a>`;
  return `<div class="lg:hidden fixed bottom-0 left-0 w-full bg-ybe-black border-t-4 border-ybe-red z-50 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] safe-bottom">
    ${item(b.phone.href, 'call', 'phone-call', 'text-ybe-red', esc(b.phone.display))}
    ${item(b.sms.href, 'text', 'message-square', 'text-white', 'Mensaje')}
    ${item(b.maps.directionsUrl, 'directions', 'map-pin', 'text-ybe-red', 'Cómo llegar', 'target="_blank" rel="noopener noreferrer"')}
  </div>`;
}

module.exports = { header, footer, mobileBar };
