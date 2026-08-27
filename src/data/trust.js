/**
 * ELEMENT 5 — TRUST AND DECISION SUPPORT
 *
 * Verified facts only. Per the brief, nothing here invents technician
 * certifications, warranties, financing, pickup, loaners, towing, pricing,
 * turnaround guarantees or insurance relationships.
 */

/**
 * Customer review themes.
 *
 * These are the themes identified in the brief from YBE's real Google reviews.
 * They are presented as themes rather than as attributed quotes.
 *
 * NOTE FOR THE SHOP: the three `quotes` below were carried over from the
 * previous version of the site as paraphrases. Because they are not verbatim
 * and not attributed to named reviewers, the site does NOT emit Review schema
 * for them. To add Review structured data later, replace these with verbatim
 * review text plus the reviewer name and date, then set `verbatim: true`.
 */
const reviewThemes = [
  {
    theme: 'Fair and reasonable pricing',
    detail:
      'The comment that comes up most often is that the price matched what customers were told, without work appearing on the bill that nobody discussed first.'
  },
  {
    theme: 'Fast turnaround',
    detail:
      'Customers regularly mention getting their vehicle back sooner than they expected, particularly on repairs that other shops had quoted several days for.'
  },
  {
    theme: 'Help during urgent situations',
    detail:
      'A recurring theme is being helped when stuck: a breakdown, a dead battery, or a repair needed before work the next morning.'
  },
  {
    theme: 'Open on weekends and Sundays',
    detail:
      'Seven-day hours come up often. For customers who cannot take a weekday off, a Saturday or Sunday appointment is the reason the repair happened at all.'
  },
  {
    theme: 'Strong customer service',
    detail:
      'Reviewers mention having things explained to them clearly, and not being talked down to or rushed into a decision.'
  },
  {
    theme: 'Getting stranded drivers back on the road',
    detail:
      'Roadside calls show up throughout the reviews — jump starts, flat tires and no-start problems handled where the vehicle sat.'
  },
  {
    theme: 'Work completed correctly',
    detail:
      'Customers note that the repair actually solved the problem, including on vehicles that had already been to another shop for the same issue.'
  }
];

const quotes = [
  { text: 'Fast service and reasonable pricing.', source: 'Google review', verbatim: false },
  { text: 'They were so helpful during my emergency on a Sunday.', source: 'Google review', verbatim: false },
  {
    text: 'Strong customer service and they actually fixed the problem correctly.',
    source: 'Google review',
    verbatim: false
  }
];

/**
 * Site-wide FAQs. These render visibly on /faq/ and the homepage, and only the
 * visible ones are included in FAQPage schema.
 */
const faqs = [
  {
    q: 'Does YBE accept walk-ins?',
    a: 'Yes. Walk-ins are welcome, though calling ahead or requesting an appointment helps us get to your vehicle faster, especially on weekends.'
  },
  {
    q: 'Is YBE open on Sundays?',
    a: 'Yes. We are open seven days a week, 8:30 AM to 6:00 PM, including Saturday and Sunday.'
  },
  {
    q: 'Where is the shop located?',
    a: 'We are at 8632 Edgeworth Dr, Capitol Heights, MD 20743, close to the Central Avenue corridor and a short drive from the DC line.'
  },
  {
    q: 'Can I text the shop instead of calling?',
    a: 'Yes. You can text or call us at (202) 455-3822, and you can also reach us on WhatsApp if that is easier for you.'
  },
  {
    q: 'Does YBE provide roadside assistance?',
    a: 'Yes. We offer mobile roadside assistance for jump starts, flat tires, mobile battery replacement, fuel delivery, lockouts, mobile diagnostics and select minor repairs in Capitol Heights and nearby communities.'
  },
  {
    q: 'Does YBE provide towing?',
    a: 'No. YBE provides roadside assistance but does not provide towing. If your vehicle needs to be towed, we will tell you that directly so you can arrange it rather than waiting on help that would not solve the problem.'
  },
  {
    q: 'Does YBE do auto body work as well as mechanical repair?',
    a: 'Yes. We handle collision damage, dents, scratches, panel work and refinishing, along with mechanical repair. Having both under one roof means a repair involving more than one system is handled in one place.'
  },
  {
    q: 'How long has YBE been in business?',
    a: 'YBE Auto Repair Center opened in February 2006 and has served the Capitol Heights area ever since.'
  },
  {
    q: 'Do I need an appointment for roadside assistance?',
    a: 'No. If you are stranded, call us directly at (202) 455-3822. Calling is always faster than filling out a form when you are stuck on the side of the road.'
  },
  {
    q: 'Is there accessible parking at the shop?',
    a: 'Yes, the shop has wheelchair-accessible parking.'
  }
];

/** About-page content. Facts only. */
const about = {
  story: [
    'YBE Auto Repair Center opened in February 2006 on Edgeworth Drive in Capitol Heights, and we have been at it ever since. Two decades in the same community means most of our work comes from people who were sent by someone they know.',
    'We are a Black-owned shop, and we are open seven days a week. That second part matters more than it sounds like it should. A lot of our customers cannot take a weekday off to sit in a waiting room, and a Saturday or Sunday appointment is the difference between a repair getting done and getting postponed until it becomes an emergency.',
    'What we do covers most of what a car needs: diagnostics, engine and transmission work, brakes, electrical, tires and alignment, A/C and heating, plus auto body and paint. We also run mobile roadside assistance for drivers who are stuck and need help where they are.'
  ],
  approach: [
    'Our approach to diagnosis is simple: test before replacing. A stored trouble code points at a circuit, not at a broken part, and the difference between those two things is what separates a repair that works from a bill for parts you did not need.',
    'That takes longer up front than reading a code and swapping a component. It is also the reason customers come to us after another shop has already replaced something and the problem came back.',
    'We tell people what we found, what it will take, and what can wait. When a repair is not worth what the vehicle is worth, we say so. It costs us the job and it keeps the customer.'
  ],
  facts: [
    { label: 'Opened', value: 'February 2006' },
    { label: 'Location', value: '8632 Edgeworth Dr, Capitol Heights, MD 20743' },
    { label: 'Hours', value: '8:30 AM–6:00 PM, seven days a week' },
    { label: 'Ownership', value: 'Black-owned business' },
    { label: 'Google rating', value: '4.8 stars' },
    { label: 'Services', value: 'Onsite repair and mobile roadside assistance' },
    { label: 'Accessibility', value: 'Wheelchair-accessible parking' },
    { label: 'Appointments', value: 'Available — walk-ins also welcome' }
  ]
};

/** Homepage "common problems" grid. Each links to the page that solves it. */
const commonProblems = [
  { text: 'My check-engine light is on', icon: 'alert-triangle', url: '/services/auto-repair-diagnostics/check-engine-light-diagnostics/' },
  { text: 'My brakes are making noise', icon: 'disc', url: '/services/brake-repair/brake-noise-vibration/' },
  { text: 'My car won’t start', icon: 'battery-charging', url: '/services/electrical/no-start-diagnostics/' },
  { text: 'My vehicle is overheating', icon: 'thermometer', url: '/services/auto-repair-diagnostics/cooling-system-overheating/' },
  { text: 'My A/C is blowing warm', icon: 'wind', url: '/services/auto-ac-heating/ac-repair/' },
  { text: 'My car is pulling to one side', icon: 'move', url: '/services/tires-alignment-suspension/wheel-alignment/' },
  { text: 'My transmission is slipping', icon: 'settings', url: '/services/transmission/transmission-repair/' },
  { text: 'I’m stranded and need help', icon: 'car', url: '/roadside-assistance/', urgent: true }
];

module.exports = { reviewThemes, quotes, faqs, about, commonProblems };
