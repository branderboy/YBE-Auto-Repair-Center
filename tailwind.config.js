/**
 * Same theme as the original ybe_auto_repair_center.html inline config —
 * now compiled at build time into a real stylesheet instead of shipping the
 * Tailwind compiler to the browser via CDN.
 */
module.exports = {
  content: ['./docs/**/*.html'],
  /**
   * These classes are applied at runtime by src/lib/layout.js (header shrink,
   * mobile menu, FAQ accordion), so they never appear in the scanned HTML.
   */
  safelist: [
    'hidden', 'rotate-180', 'text-ybe-redlight',
    'shadow-lg', 'py-1', 'py-3',
    'h-12', 'sm:h-14', 'lg:h-16', 'h-16', 'sm:h-20', 'lg:h-24',
    'max-h-0', 'max-h-96', 'py-4', 'border-t', 'border-gray-100'
  ],
  theme: {
    extend: {
      colors: {
        ybe: {
          /* Sampled from the logo artwork: #FC0101 is the letter fill,
             #C50100 the shading behind it. */
          red: '#FC0101',
          /* Lighter red for text sitting on dark surfaces — #FC0101 on near-black
             only reaches ~3.4:1, below the WCAG AA 4.5:1 minimum for body text. */
          redlight: '#FF5C5C',
          /* Green used for the numbered service labels, so the page is not
             wall-to-wall red. Passes AA against white text. */
          green: '#15803D',
          darkgreen: '#166534',
          darkred: '#C50100',
          black: '#1A1A1A',
          charcoal: '#222222',
          gray: '#F3F4F6',
          metal: '#CCCCCC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Barlow Condensed"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        /* Handwriting face, used only for the hero signature. */
        signature: ['Caveat', '"Segoe Script"', '"Bradley Hand"', 'cursive']
      },
      boxShadow: {
        funnel: '0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.2)',
        hard: '4px 4px 0px 0px rgba(0,0,0,1)'
      }
    }
  },
  plugins: []
};
