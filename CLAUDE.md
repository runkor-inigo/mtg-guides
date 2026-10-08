# Speaker Elves Guide

Legacy MTG guide for "Speaker Elves" (BG Elves). Current list: 5 Oct 2026 (runkor, MTGO). See README.md for the file structure and ROADMAP.md for pending decisions.

## Decisions

- Static site: plain HTML, CSS and JS (`index.html`, `css/`, `js/`, `assets/`). No Node, no Vite, no npm, no build step.
- Deployed by Vercel from the `main` branch on GitHub (runkor-inigo/mtg-guides). A push to `main` redeploys. Public URL: https://speaker-elves.vercel.app/ (the `*-runkors-projects.vercel.app` deployment URLs sit behind Vercel login).
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
- Generated data, never edit by hand: `js/meta-live.js` (scripts/update_meta.py) and `js/results-archive.js` (scripts/update_results.py). The nightly GitHub Actions workflow runs, but GitHub starts it hours late, so `update_meta.py` has no time window: it refreshes on the first run of each Madrid day. The bot pushes to `main`, so `git pull` before starting work.
- Live since 8 Oct 2026 (commits dbc7cc9 and 1b23972): Deck Origins eras, Speaker Loop routes (turn-two kill and setup turn), matchup card v2, Goldfish icons, the nightly refresh fix and the chat plan.
- `.vercelignore` keeps ROADMAP.md, CLAUDE.md, README.md, `scripts/`, `.github/` and `.claude/` off the public site. Any new internal file must be added there.
- Weight: index.html is ~124 KB; the site is ~7.5 MB, of which `assets/` is ~6.8 MB (one 1.1 MB PNG, many 130–170 KB card JPGs, no lazy loading or srcset).
- README.md still describes the old "RC51 test list", css layers 02–08 and a refresh "at 00:00 Europe/Madrid"; it needs a refresh (task O).

## Rules

- Never commit or push unless the user explicitly asks.
- Do not change card data, the sideboard plan, decklist or list logic (matchup data, IN/OUT counts, combo lines, probabilities) without telling the user first.
- Before calling any change done, serve the site locally (`py -m http.server 8765`), open it in a browser and confirm it loads with no console errors. Run one server only. Headless check that works on this machine: `chrome.exe --headless=new --enable-logging=stderr --v=0 --virtual-time-budget=8000 --dump-dom http://localhost:8765/` and look for `CONSOLE` lines in stderr. Headless Chrome lays out at least 500 px wide, so for phone width load the site in a 390 px `<iframe>` from a temporary page.
- Pushing to `main` deploys production: push only when the user explicitly asks, then check the live site (https://speaker-elves.vercel.app/) loads the change with no console errors.
- `.claude/` is gitignored and must never be committed (Vercel would serve it).
- Claims without a verifiable source are marked "Unverified" on the page and in ROADMAP.md.

## Next steps

The work is split into independent chats in ROADMAP.md, section "Plan de chats" (task names, files, dependencies, recommended order). Start each chat by naming its task. First steps:

1. On 9 Oct 2026, confirm a "Nightly metagame refresh" bot commit on `main`, then `git pull`.
2. After pushing `.vercelignore`, confirm ROADMAP.md, CLAUDE.md, `scripts/` and `.github/` return 404 on the live site.
3. Next task: C `revision-sideboard` (user review of the converted 5 Oct sideboard plans).
