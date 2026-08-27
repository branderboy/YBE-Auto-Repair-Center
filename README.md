# YBE Auto Repair Center — Website

Multi-page local-business website for **YBE Auto Repair Center**, 8632 Edgeworth Dr, Capitol Heights, MD 20743.

Built from the original `ybe_auto_repair_center.html` design — same brand colors, same
Barlow Condensed / Inter type, same header, footer and mobile action bar — expanded into a
real multi-page site with per-page metadata, schema and internal linking.

---

## Quick start

```bash
npm install     # one time (Tailwind CLI + Lucide icon source)
npm run build   # render the site into docs/
npm run serve   # preview at http://localhost:4173
npm run verify  # build, then run all checks
```

## The five core elements, as actual site structure

The brief's five elements are the site's architecture, encoded in `src/data/pillars.js`.
Navigation, the homepage, breadcrumbs and the sitemap are all generated from it, so the
structure cannot drift away from the plan.

| # | Element | Where it lives | Pages |
|---|---------|----------------|-------|
| 1 | Services | `/services/<category>/<service>/` | 22 + 7 roadside |
| 2 | Service categories | `/services/<category>/`, `/roadside-assistance/` | 8 hubs |
| 3 | Topical relevance | `/car-care/<article>/` | 16 articles |
| 4 | Geographic relevance | `/service-areas/<city>/` | 11 areas |
| 5 | Trust & decision support | `/about/` `/reviews/` `/contact/` `/request-appointment/` `/faq/` | 5 |

**74 pages total.**

---

## Editing content

### Business facts — change them in ONE place

Everything (address, phone, hours, rating, socials, booking link) lives in
**`src/data/business.js`**. Nothing is hard-coded in templates.

```js
rating: { value: '4.8', count: 29 }   // update these two numbers, rebuild, done
```

That rating flows to the homepage, the reviews page, every trust strip, and the
`aggregateRating` in schema on all 74 pages.

### Where each kind of content lives

| Content | File |
|---------|------|
| Business facts, NAP, hours, rating | `src/data/business.js` |
| Service categories & service pages | `src/data/services.js`, `src/data/service-categories/*.js` |
| Roadside services | `src/data/roadside.js` |
| Service areas | `src/data/areas.js` |
| Car-care articles | `src/data/articles.js` |
| FAQs, review themes, About copy | `src/data/trust.js` |
| Site structure & navigation | `src/data/pillars.js` |

### Swapping in real photos

The hero uses a self-hosted branded SVG (`src/assets/img/hero-garage.svg`) rather than a
hotlinked stock photo, so it cannot break. To use a real photo of the shop:

1. Put the image in `src/assets/img/`
2. Point `images.hero.src` in `src/data/business.js` at it
3. Rewrite `images.hero.alt` to describe what the photo actually shows
4. `npm run build`

---

## Checks

`npm run verify` builds and then validates every page:

- every internal link resolves (7,900+ links)
- unique title and meta description per page, within length limits
- exactly one `<h1>` per page, correct canonical, full Open Graph
- valid JSON-LD with `AutoRepair` + `BreadcrumbList`; `FAQPage` only where FAQs are visible
- every image has alt text; every `target="_blank"` has `rel="noopener"`
- call / text / directions links and conversion tracking present on every page
- consistent NAP on every page
- sitemap matches the pages actually built

`node scripts/check-js.js` additionally parses the inline script on all 74 pages so a
syntax error can't ship.

---

## Deploying

The build outputs to `docs/`, ready for GitHub Pages
(**Settings → Pages → Source: `main` / `docs`**).

**Before launch:** set `siteUrl` in `src/data/business.js` to the real domain. It drives
canonical URLs, Open Graph URLs and the sitemap.

### Conversion tracking

Every call, text, directions, appointment and roadside link carries
`data-track` and `data-location`. On click the site pushes a `conversion_click` event to
`dataLayer` and `gtag` if either exists. Install GA4 or GTM and the events flow with no
code changes.

### The appointment form

Static hosting has no backend, so the form validates and then hands the details to the
shop's text line rather than silently failing. To post to a real endpoint (Formspree,
Netlify Forms, Square), set the form's `action`/`method` and remove the handler in
`src/lib/layout.js`.

---

## Deliberate accuracy constraints

Per the brief, the site does not invent facts. These are intentionally empty in
`business.js` until the shop confirms them — the related sections simply do not render:

```js
paymentMethods: [],   warranty: '',   financing: ''
```

Also deliberate:

- **No towing claims anywhere.** YBE provides roadside assistance, not towing. A check
  fails the build if a page starts advertising towing.
- **No `Review` schema.** Only the verified 4.8/29 `aggregateRating` is emitted. The three
  quotes on `/reviews/` are client-supplied paraphrases, not verbatim attributed reviews.
  To add `Review` markup later, replace them with verbatim text plus reviewer name and
  date, then set `verbatim: true` in `src/data/trust.js`.
- **No statewide pages.** Real nearby markets only, no "Maryland" or "Virginia" pages.
- **12 more car-care articles are planned but unpublished** — listed in
  `PLANNED_EXPANSION` in `src/data/articles.js`, held back so each gets real content
  instead of becoming a thin keyword page.

## Accessibility notes

- Brand red `#E31818` on near-black only reaches ~3.4:1, below the WCAG AA 4.5:1 minimum
  for body text. On dark sections red text lifts to `#FF5C5C` (~5.6:1). Backgrounds and
  buttons keep the exact brand red.
- Skip link, keyboard-accessible nav and accordion, `aria-expanded`/`aria-controls`,
  visible focus rings, and `prefers-reduced-motion` support.

## Performance

The original page loaded Tailwind and Lucide from CDNs at runtime. Tailwind's CDN ships a
compiler to the browser and is explicitly not for production, which conflicted with the
brief's mobile-performance requirement. Now:

- Tailwind compiles at build time to a **25 KB minified** stylesheet
- Lucide icons are **inlined as SVG at build time** — no third-party request, no icon pop-in
- The hero image is self-hosted

No third-party runtime dependencies remain.
