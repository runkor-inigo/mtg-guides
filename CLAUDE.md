# Speaker Elves Guide

Legacy MTG guide for "Speaker Elves" (BG Elves, RC51 test list). See README.md for structure.

## Content and style

- All user-facing text is in English.
- Dark visual style with a green palette; keep new UI consistent with the existing CSS tokens and colors.

## Stack

- Static HTML, CSS and JS only: `index.html`, `css/`, `js/`, `assets/`.
- No Node, no Vite, no npm packages, no build step.
- GSAP is self-hosted at `js/vendor/gsap.min.js` (no CDN) and loads before `js/menu.js` and the numbered scripts.

## Rules

- Never commit or push unless the user explicitly asks.
- Do not change card data, the sideboard plan, decklist or RC51 logic (matchup data, IN/OUT counts, combo lines, probabilities) without telling the user first.
- Before calling any change done, serve the site locally (e.g. `python -m http.server 8000`), open it and confirm it loads with no errors in the browser console.
