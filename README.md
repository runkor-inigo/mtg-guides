# Speaker Elves Guide

Legacy (Magic: The Gathering) guide for BG Speaker Elves, built on runkor's 5 Oct 2026 MTGO list: current 75 and published results, sideboard map, matchups from the live metagame, mulligans and opening-hand odds, an interactive goldfish lab, the Speaker loop, interaction windows, deck origins and credits.

Public site: https://speaker-elves.vercel.app/

It is a static website in plain HTML, CSS and JavaScript. There is no Node, no npm, no build step and no bundler.

## Structure

```
index.html     Page markup and most of the guide text (one .pane per section)
css/           Stylesheets, linked in order: 01–08, menu.css, 10–16
js/            Scripts, linked in order (see below); js/vendor/gsap.min.js is self-hosted GSAP
assets/        Card images (WebP), mana symbols, logos; matchup art in assets/matchups/;
               home videos, poster and card art in assets/home/; art crops for section headers in assets/art/;
               the Tengwar font in assets/fonts/
scripts/       update_meta.py and update_results.py (Python standard library only)
.github/       workflows/meta.yml: the nightly data refresh
```

Load order matters: later scripts use globals defined in earlier ones. `index.html` loads:

| File | Role |
|---|---|
| `js/vendor/gsap.min.js` | GSAP, self-hosted (no CDN) |
| `js/meta-live.js` | Generated metagame data (optional; see below) |
| `js/menu.js` | Sidebar (always open on desktop; a sheet on phones), sections and URL hash (`SpeakerNav`) |
| `js/01.js` | Core data: `DETAILS` (sideboard plans), `GOLDFISH_META`, `SB_COSTS`, `GUIDE_GROUPS`, the 5 Oct list conversion layer |
| `js/02.js`–`js/07.js` | Card art (`COMBO_CARD_ART`) and combo tabs, source audit, Goldfish Lab (`04.js`), home cards and Home buttons (`05.js`), phone sideboard list, Current 75 view |
| `js/09.js` | Matchups rows (top 10 MTGGoldfish archetypes) |
| `js/results-archive.js` | Generated results data (optional; see below) |
| `js/10.js` | Published results and Prominent decklists under Current 75 |
| `js/11.js` | Official mana symbols in text (`{G}`, `{T}`, `{Q}`) |
| `js/12.js` | Opening-hand odds box in Mulligans |
| `js/13.js` | Sideboard map (plan rows, matrix, presence, print sheet) and Maybeboard |
| `js/14.js` | Deck Origins timeline (built from the `<ol class="timeline">` in the HTML) |
| `js/15.js` | Home: forest video and Durin's door (loaded only on the home, with motion allowed) and the cards' cursor parallax |

Each numbered script has a matching stylesheet where it needs one (`css/11.css` to `css/15.css`); `css/12.css` ends with the phone fixes; `css/16.css` styles the art headers of Game Plans, Natural Order and Speaker Loop (no script).

## Generated data

Never edit these by hand.

- `js/meta-live.js`, written by `scripts/update_meta.py`: 7/14/30-day shares and the most common sideboard cards per archetype from MTGGoldfish, plus MyMTGO's public archetype pages (cards sided in after game 1, the reference 75, cards sided in against Elves). A MyMTGO failure keeps the MTGGoldfish refresh. Delete the file to fall back to the dated snapshot inside `js/01.js`.
- `js/results-archive.js`, written by `scripts/update_results.py`: every published Speaker Elves result from the MTGGoldfish deck search (Legacy, Formidable Speaker in the main deck). MTGO league lists are 5-0 trophies; challenge places come from the official mtgo.com standings; other MTGO events (Showcase Challenge, Qualifiers, Last Chance) count with the challenges; non-MTGO events are paper. MTGGoldfish gives no place for those last two, so they show as published lists. Lists are linked, never copied.

The GitHub Actions workflow runs both scripts every night (cron at 22:05 and 23:05 UTC). GitHub usually starts scheduled runs hours late, so each script refreshes on the first run of each Madrid day, whenever it arrives. The bot commits and pushes to `main`, which redeploys the site: run `git pull` before starting work.

To refresh by hand:

```bash
python scripts/update_meta.py --force
python scripts/update_results.py --force
```

## Run locally

```bash
py -m http.server 8765
```

Then open http://localhost:8765/. A local server matches production behaviour; opening `index.html` from disk mostly works.

## Images

Card and matchup images are self-hosted WebP files downloaded from the Scryfall API: always the first paper printing (no borderless, showcase, extended-art or full-art versions), cards at 488×680 (quality 82), matchup art from `art_crop` (quality 78). Art used as a header (the home cards) is the illustration only (`art_crop`), framed by its focal point. Never hotlink Scryfall.

## Home video and font

The home's videos were converted once by hand with ffmpeg (no build step): the forest loop to a 1280 px H.264 MP4 (2.6 MB) with a WebP poster, and Durin's door to an 8 s clip of its moving parts (drawing in, fading out). The 1080p originals stay out of git. The Quenya line is set in Alcarin Tengwar by Toshi Omagari (SIL Open Font License, licence file beside the font in `assets/fonts/`).

## Deploy

Vercel deploys the `main` branch of runkor-inigo/mtg-guides as a static site (no build command, no output directory). A push to `main` redeploys production.

`.vercelignore` keeps internal files off the public site: this README, `CLAUDE.md` (project rules), `ROADMAP.md` (pending tasks), `LEGACY.md` (the Legacy heuristics the guide follows), `scripts/`, `.github/`, `.claude/` and temporary test pages (`/_*.html`). Add any new internal file there.
