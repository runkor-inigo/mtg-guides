# Speaker Elves Guide

Legacy MTG guide for "Speaker Elves" (BG Elves). Current list: 5 Oct 2026 (runkor, MTGO). See README.md for the file structure and ROADMAP.md for pending decisions.

## Decisions

- Static site: plain HTML, CSS and JS (`index.html`, `css/`, `js/`, `assets/`). No Node, no Vite, no npm, no build step.
- Deployed by Vercel from the `main` branch on GitHub (runkor-inigo/mtg-guides). A push to `main` redeploys. Public URL: https://speaker-elves.vercel.app/ (the `*-runkors-projects.vercel.app` deployment URLs sit behind Vercel login).
- All user-facing text is in English. Dark style, green palette; the highlight is mint warming to gold at its right edge.
- GSAP is self-hosted at `js/vendor/gsap.min.js` (no CDN) and loads before `js/menu.js` and the numbered scripts.
- Respect `prefers-reduced-motion`, but the sidebar "Animations" switch can override it (`motion-on` / `motion-off` classes on `<html>`).
- Design skills live in `.claude/skills/` (local only, gitignored): emil-design-eng, impeccable, design-taste-frontend and redesign-existing-projects, installed 8 Oct 2026 from their GitHub repos, plus frontend-design and the GSAP skills. Impeccable's hooks are not enabled (they would download and run its binary after every edit). Use them for design passes; the project rules here still win (no build step, dark green palette).
- Never scrape pages behind bot protection (e.g. MTGGoldfish deck pages behind Cloudflare). Use public listings and mtgo.com.

## State

- Modular files load in numeric order; later scripts use globals from earlier ones (`js/01.js` holds DETAILS, GOLDFISH_META, SB_COSTS).
- Menu: collapsible sidebar (`js/menu.js`, `css/menu.css`): parts Deck Foundations / Game Theory / Gameplay / About (internal ids `foundations` / `theory` / `gameplay` / `about`; icons `cards` / `tree` / `swords` / `book` in js/menu.js), 14 sections, opens on Start Here; the URL hash keeps the open section (`/#matchups` opens the guide there, skipping the guide library), mint pill with inchworm move and gold-edged glow. Phones get a sticky chapter bar.
- No page header since 8 Oct 2026: the sidebar opens with "← All guides" and the guide's name ("Speaker Elves" + "5 Oct 2026 list" badge; `brand` option of SpeakerNav, set in js/01.js); folded, only the arrow stays. Phones get the same back arrow left of the chapter bar. Every back button carries `[data-all-guides]` (handled in js/05.js). A visually hidden h1 (`.sb-sr`) opens `main`. Phone fixes from tasks R and S live in one "Phones" block at the end of `css/12.css`; wrap any new wide table in `.table-scroll`.
- Sections are defined in `GUIDE_GROUPS` (js/01.js); a section can show several `.pane` elements.
- Written sections (Start Here, Deck Origins, Deck Construction, Mulligans, First Turns, Game Plans) are first drafts from the project notes, with evidence labels. Natural Order and Speaker Loop are "Reviewed" (task N part 2, 8 Oct 2026): card rules checked against Scryfall Oracle text. Speaker Loop explains why Symbiote returns Speaker (another search grows the board), an unused Quirion (always untap Cradle, needs Cub's earthbend; the returned Forest becomes a discard) and "Build the board, or just make mana?" (once the kill is in hand, loop a one-mana Elf: +4 per cycle instead of +2). The guide and the Goldfish Lab show general lines plus their modifiers, never every possible line. Interaction Windows is a full first draft, no longer `wip`: part 1 is the deck's own windows (task H, response tables with `.sev` tags) and part 2 (`#windows-opponent`, task I) the opponent's view by type of interaction plus the fallback plan (`.win-sum`, `.part-head`, css/11.css). Credits (task K) is written, no longer `wip`: pioneers (Shimoizumi Ryoichi @ryo_sll and Takagi Yuki @taka87z3, confirmed by the user, with dated Hareruya results from metagame.info; MTGO pilots dated 7 Oct 2026; every mention of a player links to their X profile), Cradle Control lineage, writers, data and tools, Fan Content Policy notice, and thanks to the #elves channel on runkor's Discord. Since the deploy after ede2026: real names, MTGO usernames and X links for the players in Credits and Deck Origins (Shimoizumi, Takagi, Beñat, Newton Hang, Jörg Heinrich, Curran Delahanty, David Schittinger, author Iñigo Villamor; never list players' alternate accounts) and the dated Hareruya results in Origins. Mulligans has an opening-hand odds box (`.odds`, css/11.css; `js/12.js`), context only, not a keep rule. It reads its baseline from the Current 75 decklist on every load and has temporary "Try other counts" sliders; a new card name must be added to the sets at the top of js/12.js to be counted.
- 5 Oct list applied through a documented conversion layer in js/01.js ("5 Oct 2026 list"); plans still need the user's review.
- Matchups (js/09.js, css/11.css): top 10 MTGGoldfish archetypes by 14-day share, from the nightly refresh. One expandable row per plan: closed, the deck name over its art at 50 % opacity, 14-day share and three dots (Wasteland / Counters / Sweepers); open, shares, IN / OUT, a "Their sideboard" table, the three lights, plan notes and "Full plan". The table combines MTGGoldfish ("In lists": share of published 75s) and MyMTGO ("Sided in": share of post-board games; "vs Elves" from 5 games up). The lights also read MyMTGO's reference 75. Boros Energy has a plan since 8 Oct 2026 (`addBorosEnergy()` in js/01.js, 3 Snuff Out + Primaris for 3 Shepherd + Ouphe).
- Results archive under Current 75 (js/10.js). Official mana symbols in text via `{G}`, `{T}`, `{Q}` codes (js/11.js).
- Goldfish Lab (js/04.js): card movement (FLIP), creature and land rows, keyword icons, glow on cards that act. Four modes: Turn-2 Natural Order, Turn-2 Sabertooth, Setup turn (T3 kill) and Speaker loop from a ready board. Since 8 Oct 2026 each mode has linked card switches (`GF_VARIANTS` in js/04.js): a catalogue of legal lines per mode; changing a switch jumps to the closest legal line and flashes the switches it moved, and a change with no legal line is refused with the reason (e.g. no turn-2 Natural Order without Cradle: 3 mana, it needs 4). Natural Order: 7 routes (Cub + Cradle with dork or GSZ → Dryad Arbor, with or without Quirion; no Cub: dork/Arbor + Quirion; no dork: turn-one Quirion + Cub), target Atraxa (default) or Craterhoof (7–9 damage, not lethal). Turn-2 Sabertooth: with or without Quirion (without, on the play, it ends one step short). Ready board: mana only or drawing with Elvish Visionary (flex card). Every new line must pass the Node check: build every variant on play and draw with no exception (negative mana or duplicate card). Speaker Loop has a "When the last piece is missing" block (hate piece or Vibrance → Boseiju, or the most damage).
- Generated data, never edit by hand: `js/meta-live.js` (scripts/update_meta.py; since 8 Oct 2026 it also reads public MyMTGO archetype pages, `?vs=elves`, with the Goldfish→MyMTGO name map `MYMTGO_SLUGS`; a MyMTGO failure keeps the Goldfish refresh) and `js/results-archive.js` (scripts/update_results.py). The nightly GitHub Actions workflow runs, but GitHub starts it hours late, so `update_meta.py` has no time window: it refreshes on the first run of each Madrid day. The bot pushes to `main`, so `git pull` before starting work.
- Live since 8 Oct 2026 (commits dbc7cc9, 1b23972 and 9d52a02): Deck Origins eras, Speaker Loop routes (turn-two kill and setup turn), matchup card v2, Goldfish icons, the nightly refresh fix and the chat plan.
- Live since 8 Oct 2026 (commit 55ac39b): task B ("Metagame" label), task F (mulligan odds box, js/12.js), tasks H and I (Interaction Windows parts 1 and 2) and task E (Goldfish modes, "When the last piece is missing"). Verified live: 0 console errors on desktop and at 390 px.
- Live since 8 Oct 2026 (commit 83c5f2c): Matchups rows with the MyMTGO "Their sideboard" table and the Boros Energy plan, update_meta.py reading MyMTGO, task K (Credits), N part 2, P (WebP images), R and S (phone fixes, "Speaker Elves" title) and the new menu part names. Verified live: 0 console errors on desktop and at 390 px, ROADMAP.md 404.
- `.vercelignore` keeps ROADMAP.md, CLAUDE.md, README.md, `scripts/`, `.github/`, `.claude/` and temporary test pages (`/_*.html`) off the public site. Any new internal file must be added there. Still, never commit `_*.html` test pages.
- Weight: index.html is ~160 KB. Images are WebP since task P (8 Oct 2026): the referenced `assets/` files total ~4 MB (cards 488×680 at q82, ~50–100 KB each). 72 unused files (the old `.jpg`/`.png` originals and 16 replaced card WebPs) stay in `assets/` until task U `repo-cleanup`.
- README.md still describes the old "RC51 test list", css layers 02–08 and a refresh "at 00:00 Europe/Madrid"; it needs a refresh (task O).

## Rules

- Never commit or push unless the user explicitly asks.
- Do not change card data, the sideboard plan, decklist or list logic (matchup data, IN/OUT counts, combo lines, probabilities) without telling the user first.
- Before calling any change done, serve the site locally (`py -m http.server 8765`), open it in a browser and confirm it loads with no console errors. Run one server only. Headless check that works on this machine: `chrome.exe --headless=new --enable-logging=stderr --v=0 --virtual-time-budget=8000 --dump-dom http://localhost:8765/` and look for `CONSOLE` lines in stderr. Headless Chrome lays out at least 500 px wide, so for phone width load the site in a 390 px `<iframe>` from a temporary page.
- Pushing to `main` deploys production: push only when the user explicitly asks, then check the live site (https://speaker-elves.vercel.app/) loads the change with no console errors.
- `.claude/` is gitignored and must never be committed (Vercel would serve it).
- Claims without a verifiable source are marked "Unverified" on the page and in ROADMAP.md.
- Never delete files on your own; list them under task U `repo-cleanup` in ROADMAP.md for the user.

## Card art

Applies to card images (`COMBO_CARD_ART` in js/02.js) and matchup art (`ART` in js/09.js, `assets/matchups/<key>.webp`).

- Always the first printing: the earliest paper printing on Scryfall, excluding promo, token, memorabilia and digital-only sets. Find it with `https://api.scryfall.com/cards/search?q=oracleid:<id> game:paper&unique=prints&order=released&dir=asc`.
- Never borderless, showcase, extended-art or full-art versions. If the first printing is one of these, take the earliest printing that is not.
- When a first printing has several arts (Alpha basics), use the lowest collector number.
- Source: Scryfall only, through its public API (`User-Agent` and `Accept` headers, ~100 ms between requests). Cards use the `normal` image (488×680); matchup art uses `art_crop`.
- Self-host every image: save it as `.webp` (Pillow, `quality` 82 for cards, 78 for matchup art, `method=6`) under `assets/<card-name>.webp` or `assets/matchups/<key>.webp`. Never hotlink Scryfall.
- Keep the data in step: `src`, `url` (the printing's Scryfall page), `artist` and `edition` ("Set name · number") for cards; `card` and `artist` for matchups.
- Audited on 8 Oct 2026 (task P): every card and matchup image followed these rules after the update.

## Next steps

The work is split into independent chats in ROADMAP.md, section "Plan de chats" (task names, files, dependencies, recommended order, and a "Estado" summary). Start each chat with `/rename <task>` and "Lee CLAUDE.md y ROADMAP.md; haz la tarea <task>".

- Done and live: A, B, E, F, H, I (commit 55ac39b); K, N part 2 (`revision-gameplay-2`), P, R, S, the Matchups rows with MyMTGO and the Boros Energy plan (commit 83c5f2c); menu ids, Start Here as the opening section, the URL hash and real names in Credits and Origins (the deploy after ede2026). N part 1 (`revision-gameplay-1`, First Turns and Game Plans) waits for J.
- When committing, never add the 16 replaced WebPs (task U) or `_*.html` test pages: `git add -u` plus only new files that are in use.
- Ready now (recommended order in ROADMAP.md): C `revision-sideboard` (blocks D, M), G `estudios-mulligan`, J `pivotes-interaccion`, L `fuente-testacular`, O `readme-docs`, Q `rendimiento-carga`, U `repo-cleanup` (when the user decides). D is optional now: Azorius Tempo and Rakdos Reanimator left the top 10.
- A chat reads CLAUDE.md only when it starts: after changing a rule here, chats already open will not see it unless they re-read this file.
- On 9 Oct 2026, confirm a "Nightly metagame refresh" bot commit on `main` (its `js/meta-live.js` should now include `mymtgo`), then `git pull`.
- Task P is live. For task D: any new matchup or card art follows "Card art" above and goes in as `.webp`; `js/09.js` already builds `assets/matchups/<key>.webp`, so a new matchup key needs that file.
- Task U `repo-cleanup` holds every pending deletion; run it only when the user decides.
- Parallel chats share `index.html`: edit only your own pane with targeted edits, never rewrite the file, check other panes are intact, and do not push (the user asks for the push from one chat).
