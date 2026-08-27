/**
 * LAYOUT SHELL
 * Head + schema + header/nav + footer + mobile action bar + scripts.
 * Tailwind config, fonts, colors and JS behavior come from the original
 * ybe_auto_repair_center.html so every page looks and behaves the same.
 */

const T = require('./templates.js');
const { b, esc, icon, abs, localBusinessSchema, breadcrumbSchema } = T;

function headerNav(currentPath) {
  const isActive = (url) => currentPath === url || (url !== '/' && currentPath.startsWith(url));

  const desktop = T.mainNav
    .map((item) => {
      const active = isActive(item.url);
      const children = (item.children || [])
        .map(
          (c) =>
            `<a href="${c.url}" class="block px-4 py-2.5 text-ybe-black hover:bg-gray-50 hover:text-ybe-red font-medium text-sm border-b border-gray-100 last:border-0 transition-colors">${esc(c.label)}</a>`
        )
        .join('');
      return `<div class="relative group">
        <a href="${item.url}" class="flex items-center gap-1 font-heading tracking-wide text-base xl:text-lg font-semibold uppercase transition-colors py-2 whitespace-nowrap ${
          item.highlight ? 'text-ybe-red hover:text-ybe-darkred' : active ? 'text-ybe-red' : 'text-ybe-black hover:text-ybe-red'
        }">${esc(item.label)}${children ? icon('chevron-down', 16) : ''}</a>
        ${
          children
            ? `<div class="absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-xl rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50">
                <div class="border-t-4 border-ybe-red">${children}</div>
              </div>`
            : ''
        }
      </div>`;
    })
    .join('');

  const mobile = T.mainNav
    .map(
      (item) => `<div class="border-b border-gray-100">
      <a href="${item.url}" class="mobile-nav-link block px-3 py-3 font-heading text-xl uppercase tracking-wide ${
        item.highlight ? 'text-ybe-red font-bold' : 'text-ybe-black'
      }">${esc(item.label)}</a>
      ${
        item.children && item.children.length
          ? `<div class="pb-2 pl-6">${item.children
              .map(
                (c) =>
                  `<a href="${c.url}" class="mobile-nav-link block py-1.5 text-sm text-gray-600 hover:text-ybe-red">${esc(c.label)}</a>`
              )
              .join('')}</div>`
          : ''
      }
    </div>`
    )
    .join('');

  return `<header id="main-header" class="fixed w-full z-50 transition-all duration-300 bg-white py-3 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center gap-4">
        <a href="/" class="flex-shrink-0 flex items-center" aria-label="${esc(b.name)} home">
          <img id="header-logo" src="${b.images.logo}" alt="${esc(b.images.logoAlt)}"
               width="240" height="152" class="transition-all duration-300 h-16 sm:h-20 lg:h-24 w-auto" />
        </a>
        <nav class="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main navigation">${desktop}</nav>
        <div class="hidden lg:flex items-center gap-2">
          <a href="${b.sms.href}" data-track="text" data-location="header"
             class="hidden xl:flex bg-white hover:bg-gray-100 text-ybe-black font-heading text-base px-3 py-2 rounded-sm border-2 border-ybe-black transition-all items-center gap-2 uppercase tracking-wide font-bold whitespace-nowrap">
            ${icon('message-square', 18)} Text</a>
          <a href="${b.phone.href}" data-track="call" data-location="header"
             class="bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-base xl:text-lg px-4 py-2 rounded-sm shadow-hard border-2 border-transparent hover:border-ybe-black transition-all flex items-center gap-2 uppercase tracking-wide font-bold whitespace-nowrap">
            ${icon('phone', 18)} ${esc(b.phone.display)}</a>
        </div>
        <div class="lg:hidden flex items-center">
          <button id="mobile-menu-btn" class="text-ybe-black hover:text-ybe-red focus:outline-none focus-visible:ring-2 focus-visible:ring-ybe-red p-1"
                  aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            ${icon('menu', 32, 'menu-open-icon')}${icon('x', 32, 'menu-close-icon hidden')}<span class="sr-only">Menu</span>
          </button>
        </div>
      </div>
    </div>
    <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg max-h-[80vh] overflow-y-auto">
      <div class="px-2 pt-2 pb-4">
        ${mobile}
        <div class="grid grid-cols-2 gap-2 mt-4 px-1">
          <a href="${b.phone.href}" data-track="call" data-location="mobile-menu"
             class="text-center bg-ybe-red text-white font-heading text-lg py-3 rounded-sm uppercase tracking-wide font-bold">Call Now</a>
          <a href="${b.sms.href}" data-track="text" data-location="mobile-menu"
             class="text-center bg-ybe-black text-white font-heading text-lg py-3 rounded-sm uppercase tracking-wide font-bold">Text Us</a>
        </div>
      </div>
    </div>
  </header>`;
}

function footer() {
  const links = T.footerServiceLinks
    .map(
      (l) =>
        `<li><a href="${l.url}" class="${
          l.highlight ? 'text-ybe-red hover:text-white font-bold' : 'hover:text-ybe-red'
        } transition-colors">${esc(l.label)}</a></li>`
    )
    .join('');

  const explore = [
    { label: 'All Services', url: '/services/' },
    { label: 'Service Areas', url: '/service-areas/' },
    { label: 'Car Care Advice', url: '/car-care/' },
    { label: 'About YBE', url: '/about/' },
    { label: 'Reviews', url: '/reviews/' },
    { label: 'FAQ', url: '/faq/' },
    { label: 'Contact & Directions', url: '/contact/' }
  ]
    .map((l) => `<li><a href="${l.url}" class="hover:text-ybe-red transition-colors">${esc(l.label)}</a></li>`)
    .join('');

  return `<footer class="bg-black text-gray-400 pt-14 pb-24 md:pb-8 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <img src="${b.images.logo}" alt="${esc(b.images.logoAlt)}" width="240" height="152" loading="lazy"
               class="h-16 w-auto bg-white p-1 rounded-sm mb-5" />
          <p class="mb-4 text-sm leading-relaxed">
            Auto repair, diagnostics, maintenance, bodywork and roadside assistance serving
            ${esc(b.address.city)} and nearby Maryland and DC communities since ${b.openedYear}.
          </p>
          <div class="flex gap-4">
            <a href="${b.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="YBE Auto Repair Center on Facebook" class="text-gray-500 hover:text-white transition-colors">${icon('facebook', 24)}</a>
            <a href="${b.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="YBE Auto Repair Center on Instagram" class="text-gray-500 hover:text-white transition-colors">${icon('instagram', 24)}</a>
            <a href="${b.rating.profileUrl}" target="_blank" rel="noopener noreferrer" aria-label="YBE Auto Repair Center reviews on Google" class="text-gray-500 hover:text-white transition-colors">${icon('star', 24)}</a>
          </div>
        </div>
        <div>
          <h2 class="font-heading text-xl font-bold uppercase text-white mb-5 border-b border-gray-800 pb-2">Contact</h2>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-3">${icon('map-pin', 18, 'text-ybe-red flex-shrink-0 mt-0.5')}
              <span>${esc(b.address.oneLine)}</span></li>
            <li class="flex items-center gap-3">${icon('phone', 18, 'text-ybe-red flex-shrink-0')}
              <a href="${b.phone.href}" data-track="call" data-location="footer" class="hover:text-white transition-colors">${esc(b.phone.display)}</a></li>
            <li class="flex items-center gap-3">${icon('message-square', 18, 'text-ybe-red flex-shrink-0')}
              <a href="${b.sms.href}" data-track="text" data-location="footer" class="hover:text-white transition-colors">${esc(b.sms.display)}</a></li>
            <li class="flex items-center gap-3">${icon('message-circle', 18, 'text-[#25D366] flex-shrink-0')}
              <a href="${b.whatsapp.href}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location="footer" class="hover:text-white transition-colors">${esc(b.whatsapp.display)}</a></li>
            <li class="flex items-start gap-3">${icon('clock', 18, 'text-ybe-red flex-shrink-0 mt-0.5')}
              <span>${esc(b.hours.summary)}</span></li>
          </ul>
        </div>
        <div>
          <h2 class="font-heading text-xl font-bold uppercase text-white mb-5 border-b border-gray-800 pb-2">Services</h2>
          <ul class="space-y-2 text-sm font-medium">${links}</ul>
        </div>
        <div>
          <h2 class="font-heading text-xl font-bold uppercase text-white mb-5 border-b border-gray-800 pb-2">Explore</h2>
          <ul class="space-y-2 text-sm font-medium mb-5">${explore}</ul>
          <a href="/request-appointment/" data-track="appointment" data-location="footer"
             class="block w-full text-center bg-ybe-red hover:bg-ybe-darkred text-white font-heading text-lg px-4 py-2.5 rounded-sm transition-all uppercase tracking-wide font-bold">
            Request Appointment</a>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
        <p>&copy; <span id="year">${new Date().getFullYear()}</span> ${esc(b.name)}. All rights reserved.</p>
        <div class="flex flex-wrap justify-center gap-3">
          <span>${esc(b.address.city)}, ${esc(b.address.state)}</span><span>|</span>
          <span>Black-Owned</span><span>|</span>
          <span>Serving Drivers Since ${b.openedYear}</span>
        </div>
      </div>
    </div>
  </footer>`;
}

function mobileActionBar() {
  return `<div class="lg:hidden fixed bottom-0 left-0 w-full bg-ybe-black border-t-4 border-ybe-red z-50 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
    <a href="${b.phone.href}" data-track="call" data-location="mobile-bar"
       class="flex-1 flex flex-col items-center justify-center py-2.5 text-white active:bg-ybe-charcoal transition-colors border-r border-gray-700">
      ${icon('phone-call', 22, 'mb-1 text-ybe-red')}
      <span class="font-heading uppercase text-sm tracking-wider font-semibold">Call Now</span></a>
    <a href="${b.sms.href}" data-track="text" data-location="mobile-bar"
       class="flex-1 flex flex-col items-center justify-center py-2.5 text-white active:bg-ybe-charcoal transition-colors border-r border-gray-700">
      ${icon('message-square', 22, 'mb-1 text-white')}
      <span class="font-heading uppercase text-sm tracking-wider font-semibold">Text Us</span></a>
    <a href="${b.maps.directionsUrl}" target="_blank" rel="noopener noreferrer" data-track="directions" data-location="mobile-bar"
       class="flex-1 flex flex-col items-center justify-center py-2.5 text-white active:bg-ybe-charcoal transition-colors">
      ${icon('map-pin', 22, 'mb-1 text-ybe-red')}
      <span class="font-heading uppercase text-sm tracking-wider font-semibold">Directions</span></a>
  </div>`;
}

const SITE_JS = `
document.addEventListener('DOMContentLoaded', function () {
  // Header shrink on scroll (from the original site)
  var header = document.getElementById('main-header');
  var logo = document.getElementById('header-logo');
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('shadow-lg', 'py-1');
      header.classList.remove('py-3');
      logo.classList.add('h-12', 'sm:h-14', 'lg:h-16');
      logo.classList.remove('h-16', 'sm:h-20', 'lg:h-24');
    } else {
      header.classList.remove('shadow-lg', 'py-1');
      header.classList.add('py-3');
      logo.classList.remove('h-12', 'sm:h-14', 'lg:h-16');
      logo.classList.add('h-16', 'sm:h-20', 'lg:h-24');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var open = false;
  function toggleMenu() {
    open = !open;
    mobileMenu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelectorAll('svg').forEach(function (svg, idx) { svg.classList.toggle('hidden', idx === (open ? 0 : 1)); });
  }
  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
  document.querySelectorAll('.mobile-nav-link').forEach(function (l) {
    l.addEventListener('click', function () { if (open) toggleMenu(); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) toggleMenu(); });

  // FAQ accordion (accessible version of the original)
  document.querySelectorAll('.faq-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var content = button.nextElementSibling;
      var isOpen = !content.classList.contains('max-h-0');
      document.querySelectorAll('.faq-content').forEach(function (c) {
        c.classList.add('max-h-0');
        c.classList.remove('max-h-96', 'py-4', 'border-t', 'border-gray-100');
      });
      document.querySelectorAll('.faq-btn').forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
        var ic = btn.querySelector('.faq-icon');
        if (ic) ic.classList.remove('rotate-180');
      });
      if (!isOpen) {
        content.classList.remove('max-h-0');
        content.classList.add('max-h-96', 'py-4', 'border-t', 'border-gray-100');
        button.setAttribute('aria-expanded', 'true');
        var icn = button.querySelector('.faq-icon');
        if (icn) icn.classList.add('rotate-180');
      }
    });
  });

  // Appointment form.
  // This is a static site with no backend, so rather than silently failing the
  // form validates, then hands the details to the shop's text line (a verified
  // contact channel). To post to a real endpoint instead, set the form's
  // action/method and remove this handler.
  var form = document.getElementById('appointment-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var missing = [];
      form.querySelectorAll('[required]').forEach(function (el) {
        var empty = !el.value.trim() || el.value.indexOf('Select a service') === 0;
        el.classList.toggle('border-ybe-red', empty);
        el.classList.toggle('border-2', empty);
        if (empty) {
          var lab = form.querySelector('label[for="' + el.id + '"]');
          missing.push(lab ? lab.textContent.replace('*', '').trim() : el.id);
        }
      });
      if (missing.length) {
        status.innerHTML = '<p class="bg-red-50 border-l-4 border-ybe-red text-gray-800 p-4 rounded-sm">' +
          'Please fill in: <strong>' + missing.join(', ') + '</strong></p>';
        var firstBad = form.querySelector('.border-ybe-red');
        if (firstBad) firstBad.focus();
        return;
      }
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var lines = [
        'Appointment request from the website',
        'Name: ' + g('name'),
        'Phone: ' + g('phone'),
        g('email') ? 'Email: ' + g('email') : '',
        'Vehicle: ' + g('vehicle_year') + ' ' + g('vehicle_make') + ' ' + g('vehicle_model'),
        'Service: ' + g('service'),
        g('preferred_date') ? 'Preferred date: ' + g('preferred_date') : '',
        'Preferred contact: ' + g('preferred_contact'),
        'Problem: ' + g('problem')
      ].filter(Boolean);
      var body = encodeURIComponent(lines.join('\\n'));
      status.innerHTML = '<div class="bg-green-50 border-l-4 border-green-600 p-4 rounded-sm">' +
        '<p class="text-gray-800 font-semibold mb-2">Your details are ready to send.</p>' +
        '<p class="text-gray-700 text-sm mb-3">Your messaging app should open with everything filled in. ' +
        'If it does not, call the shop and we will take the details over the phone.</p>' +
        '<a href="SMSHREF" class="inline-block bg-ybe-red text-white font-heading text-lg px-5 py-2 rounded-sm uppercase tracking-wide font-bold">Send Text</a> ' +
        '<a href="TELHREF" class="inline-block bg-ybe-black text-white font-heading text-lg px-5 py-2 rounded-sm uppercase tracking-wide font-bold">Call Instead</a></div>';
      var smsHref = '${b.sms.href}' + (navigator.userAgent.indexOf('iPhone') > -1 ? '&' : '?') + 'body=' + body;
      status.innerHTML = status.innerHTML.replace('SMSHREF', smsHref).replace('TELHREF', '${b.phone.href}');
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      window.location.href = smsHref;
    });
  }

  // Share button: device share sheet, falling back to copying the link.
  var shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    var shareStatus = document.getElementById('share-status');
    var shareLabel = document.getElementById('share-label');
    shareBtn.addEventListener('click', function () {
      var data = {
        title: document.title,
        text: 'Auto repair, bodywork and roadside assistance in Capitol Heights, MD.',
        url: window.location.href
      };
      var done = function () {
        if (shareLabel) shareLabel.textContent = 'Copied!';
        if (shareStatus) shareStatus.textContent = 'Link copied to your clipboard.';
        setTimeout(function () {
          if (shareLabel) shareLabel.textContent = 'Share';
          if (shareStatus) shareStatus.textContent = '';
        }, 2500);
      };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(data.url).then(done, function () {
          if (shareStatus) shareStatus.textContent = data.url;
        });
      } else if (shareStatus) {
        shareStatus.textContent = data.url;
      }
    });
  }

  // Conversion tracking: click-to-call, click-to-text, directions, appointment.
  // Sends to dataLayer / gtag when an analytics tool is installed; harmless otherwise.
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      var action = el.getAttribute('data-track');
      var location = el.getAttribute('data-location') || 'unknown';
      var payload = { event: 'conversion_click', conversion_type: action, click_location: location, page_path: window.location.pathname };
      if (window.dataLayer && window.dataLayer.push) window.dataLayer.push(payload);
      if (typeof window.gtag === 'function') window.gtag('event', 'conversion_click', payload);
    });
  });
});`;

/**
 * Render a complete page.
 */
function layout({
  title,
  description,
  path,
  crumbs = [],
  schema = [],
  body,
  ogType = 'website',
  noIndex = false
}) {
  const graph = [localBusinessSchema(), ...schema];
  if (crumbs.length > 1) graph.push(breadcrumbSchema(crumbs));

  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
${noIndex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}

<meta property="og:site_name" content="${esc(b.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${abs(b.images.logo)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(b.images.logo)}">

<meta name="geo.region" content="US-MD">
<meta name="geo.placename" content="${esc(b.address.city)}">
<meta name="geo.position" content="${b.geo.lat};${b.geo.lng}">
<meta name="ICBM" content="${b.geo.lat}, ${b.geo.lng}">
<meta name="theme-color" content="#E31818">

<link rel="icon" href="${b.images.logo}">
<link rel="apple-touch-icon" href="${b.images.logo}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/assets/css/site.css">

<script type="application/ld+json">
${jsonLd}
</script>

</head>
<body class="font-sans text-gray-900 bg-white antialiased relative pb-16 lg:pb-0">
<a href="#main" class="skip-link">Skip to main content</a>
${headerNav(path)}
<main id="main" class="pt-[88px] sm:pt-[104px] lg:pt-[120px]">
${T.breadcrumbs(crumbs)}
${body}
</main>
${footer()}
${mobileActionBar()}
<script>${SITE_JS}</script>
</body>
</html>`;
}

module.exports = { layout };
