# Speaker Elves Guide

Legacy MTG guide for "Speaker Elves" (BG Elves). Current list: 5 Oct 2026 (runkor, MTGO). See README.md for the file structure and ROADMAP.md for pending decisions.

## Decisions

- Static site: plain HTML, CSS and JS (`index.html`, `css/`, `js/`, `assets/`). No Node, no Vite, no npm, no build step.
- Deployed by Vercel from the `main` branch on GitHub (runkor-inigo/mtg-guides). A push to `main` redeploys.
- All user-facing text is in English. Dark style, green palette; the highlight is mint warming to gold at its right edge.
- GSAP is self-hosted at `js/vendor/gsap.min.js` (no CDN) and loads before `js/menu.js` and the numbered scripts.
- Respect `prefers-reduced-motion`, but the sidebar "Animations" switch can override it (`motion-on` / `motion-off` classes on `<html>`).
- Never scrape pages behind bot protection (e.g. MTGGoldfish deck pages behind Cloudflare). Use public listings and mtgo.com.

## State

- Modular files load in numeric order; later scripts use globals from earlier ones (`js/01.js` holds DETAILS, GOLDFISH_META, SB_COSTS).
- Menu: collapsible sidebar (`js/menu.js`, `css/menu.css`): parts Learn / Gameplay / Prepare / About, 14 sections, mint pill with inchworm move and gold-edged glow. Phones get a sticky chapter bar. The old compact header (09.css, 08.js) was removed; the header now scrolls normally.
- Sections are defined in `GUIDE_GROUPS` (js/01.js); a section can show several `.pane` elements.
- Written sections (Start Here, Deck Origins, Deck Construction, Mulligans, First Turns, Game Plans, Natural Order, Speaker Loop) are first drafts from the project notes, with evidence labels. Interaction Windows and Credits are still placeholders.
- 5 Oct list applied through a documented conversion layer in js/01.js ("5 Oct 2026 list"); plans still need the user's review.
- Matchups (js/09.js): top 13 MTGGoldfish archetypes, cards with IN / OUT / their sideboard and Wasteland / Counters / Sweepers lights.
- Results archive under Current 75 (js/10.js). Official mana symbols in text via `{G}`, `{T}`, `{Q}` codes (js/11.js).
- Goldfish Lab (js/04.js): card movement (FLIP), creature and land rows, keyword icons, glow on cards that act.
- Generated data, never edit by hand: `js/meta-live.js` (scripts/update_meta.py) and `js/results-archive.js` (scripts/update_results.py). The nightly GitHub Actions workflow is committed but has never run.
- Local uncommitted work at the time of writing: Deck Origins eras, Speaker Loop routes, matchup card v2, Goldfish icons, credits, Symbiote 3–4.

## Rules

- Never commit or push unless the user explicitly asks.
- Do not change card data, the sideboard plan, decklist or list logic (matchup data, IN/OUT counts, combo lines, probabilities) without telling the user first.
- Before calling any change done, serve the site locally (`py -m http.server 8765`), open it in a browser and confirm it loads with no console errors. Run one server only.
- Claims without a verifiable source are marked "Unverified" on the page and in ROADMAP.md.

## Next steps

1. Activate the nightly workflow on GitHub (ROADMAP.md, pending decision 1).
2. User review of the converted 5 Oct sideboard plans.
3. Plans for Boros Energy, Azorius Tempo and Rakdos Reanimator.
4. Interaction Windows and Credits content.
5. Open points from the project notes: keep-or-mull studies, pivot sequences after interaction.
