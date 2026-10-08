"""Daily metagame refresh for the Speaker Elves guide.

Reads the public MTGGoldfish Legacy metagame for the 7-, 14- and 30-day windows and,
for every archetype the guide tracks, the most common sideboard cards from its card
breakdown. Then reads the same archetypes on MyMTGO (public archetype pages, 30 days of
reported matches): how often each sideboard card is brought in after game 1, the main deck
of its reference list, and the cards sided in against Elves. The metagame shares come from
MTGGoldfish only; MyMTGO adds what the opponents actually side in.
Writes js/meta-live.js, which the page loads before js/01.js.

Runs with the Python standard library only (no site build step). The GitHub Actions
workflow in .github/workflows/meta.yml calls it every night (scheduled for 00:05 Europe/Madrid; GitHub often starts it hours late).

Usage: python scripts/update_meta.py [--out js/meta-live.js] [--force]
"""
import argparse
import datetime as dt
import html
import http.cookiejar
import json
import re
import sys
import time
import urllib.parse
import urllib.request
try:
    from zoneinfo import ZoneInfo
    MADRID = ZoneInfo('Europe/Madrid')
except Exception:  # no tz database (e.g. Windows without tzdata): use the EU summer-time rule
    MADRID = None

BASE = 'https://www.mtggoldfish.com'
FORMAT = 'legacy'
WINDOWS = (7, 14, 30)
UA = 'SpeakerElvesGuide/1.0 (+https://github.com/runkor-inigo/mtg-guides)'
PAUSE = 2.0  # seconds between requests: be gentle with the site

MYMTGO = 'https://mymtgo.com'
MYMTGO_OURS = 'elves'  # the MyMTGO archetype the "against Elves" figures are read for
# MTGGoldfish archetype -> MyMTGO archetype where the names differ (checked against their key cards,
# 8 Oct 2026). Others are matched when the short slug is the same on both sites; no match = no MyMTGO data.
MYMTGO_SLUGS = {
    'boros-energy': 'energy',
    'death-and-taxes-yorion-black-white': 'death-taxes',
    'sneak-and-show': 'show-and-tell',
    'sewer-cam-combo': 'welder-combo',
    'the-epic-storm': 'tes',
}

# MTGGoldfish archetype slugs the guide maps to its matchups (see GOLDFISH_META in js/01.js).
TRACKED_SLUGS = None  # None = every archetype on the first metagame page


def opener():
    jar = http.cookiejar.CookieJar()
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
    op.addheaders = [('User-Agent', UA), ('Accept-Language', 'en')]
    return op


def fetch(op, url, data=None, headers=None):
    body = urllib.parse.urlencode(data).encode() if data else None
    req = urllib.request.Request(url, body, headers or {})
    with op.open(req, timeout=30) as r:
        return r.read().decode('utf-8', 'replace')


def clean(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()


def parse_metagame(page):
    """Archetype tiles: slug, name, share (%), decks."""
    out = []
    for tile in page.split("<div class='archetype-tile'")[1:]:
        m = re.search(r'href="/archetype/([^"#]+)#online">([^<]+)</a>', tile)
        p = re.search(r"metagame-percentage'>.*?archetype-tile-statistic-value'>\s*([\d.]+)%\s*<span[^>]*>\s*\((\d+)\)", tile, re.S)
        card = re.search(r"aria-label='Image of ([^']+)'", tile)
        if m and p:
            out.append({'slug': m.group(1), 'name': html.unescape(m.group(2)).strip(),
                        'share': float(p.group(1)), 'decks': int(p.group(2)),
                        'card': html.unescape(card.group(1)) if card else None})
    return out


def metagame_window(op, days):
    page = fetch(op, f'{BASE}/metagame/{FORMAT}/full')
    token = re.search(r'name="authenticity_token" value="([^"]+)"', page)
    if not token:
        raise RuntimeError('MTGGoldfish page layout changed: no sort form found')
    csrf = re.search(r'<meta name="csrf-token" content="([^"]+)"', page)
    # Same fields and headers the site's own sort form sends (MTGO results, full list). The reply is a
    # Turbo stream that already contains the archetype tiles for the chosen window.
    page = fetch(op, f'{BASE}/metagame/re_sort',
                 {'authenticity_token': token.group(1), 'period': str(days), 'mformat': FORMAT,
                  'subformat': '', 'page': '', 'type': 'online', 'full': '1'},
                 {'Referer': f'{BASE}/metagame/{FORMAT}/full', 'Origin': BASE,
                  'X-CSRF-Token': csrf.group(1) if csrf else token.group(1),
                  'Accept': 'text/vnd.turbo-stream.html, text/html, application/xhtml+xml'})
    tiles = parse_metagame(page)
    if len(tiles) < 10:
        raise RuntimeError(f'only {len(tiles)} archetypes parsed for {days} days')
    return tiles


def sideboard(op, slug):
    """Most common sideboard cards from an archetype's card breakdown: card, % of decks, average copies."""
    page = fetch(op, f'{BASE}/archetype/{slug}')
    start = page.find('<h3>Sideboard</h3>')
    if start < 0:
        return []
    block = page[start:]
    end = block.find('<h3>', 10)
    block = block[:end if end > 0 else len(block)]
    cards = []
    for part in block.split("<div class='spoiler-card'")[1:]:
        name = re.search(r"price-card-invisible-label'>([^<]+)<", part)
        stat = re.search(r'([\d.]+)\s*in\s*([\d.]+)%\s*of decks', clean(part))
        if name and stat:
            cards.append({'card': html.unescape(name.group(1)).strip(),
                          'avg': float(stat.group(1)), 'pct': float(stat.group(2))})
    return sorted(cards, key=lambda c: -c['pct'])[:12]


def short_slug(slug):
    return re.sub(r'-[0-9a-f]{8}-[0-9a-f-]{27,}$', '', re.sub(r'^legacy-', '', slug))


def mymtgo_page(op, path):
    """The JSON props behind a MyMTGO page (Inertia app). Fails loudly if the layout or access changes."""
    page = fetch(op, MYMTGO + path)
    m = re.search(r'<script data-page="app" type="application/json">(.*?)</script>', page, re.S)
    if not m:
        raise RuntimeError(f'MyMTGO {path}: no page data (layout changed or access blocked)')
    return json.loads(m.group(1))['props']


def mymtgo_index(op):
    """Every Legacy archetype slug MyMTGO lists (30 days)."""
    slugs, page, last = set(), 1, 1
    while page <= last and page <= 5:
        props = mymtgo_page(op, f'/metagame/{FORMAT}?page={page}')
        slugs.update(d['slug'] for d in props.get('decksData') or [])
        last = (props.get('pagination') or {}).get('lastPage', 1)
        page += 1
        time.sleep(PAUSE)
    return slugs


def mymtgo_archetype(op, slug):
    """Sideboard use (all matchups and against Elves) and the 75 of the reference list.
    sidedIn = share of post-board games in which a sideboard card was brought in."""
    props = mymtgo_page(op, f'/metagame/{FORMAT}/{slug}?vs={MYMTGO_OURS}')
    deck = props.get('deck') or {}
    def rows(cards):
        out = [{'card': c['name'], 'sidedIn': c.get('sidedIn') or 0, 'used': c.get('used') or 0}
               for c in cards or [] if c.get('zone') == 'side']
        return sorted(out, key=lambda c: -c['sidedIn'])
    vs = props.get('matchupCards') or {}
    return {
        'slug': slug, 'name': deck.get('name') or slug, 'matches': deck.get('matches'),
        'refreshed': (deck.get('refreshedAt') or '')[:10],
        'side': rows(deck.get('side')),
        # One real 75 (their most-seen list), not the union of every variant: feeds the guide's alarms.
        'main': sorted({c['name'] for c in (deck.get('decklist') or {}).get('main') or []}),
        'listSide': sorted({c['name'] for c in (deck.get('decklist') or {}).get('side') or []}),
        'vsElves': {'games': vs.get('games') or 0,
                    'side': [c for c in rows(vs.get('side')) if c['sidedIn'] > 0]} if vs else None,
    }


def madrid_now():
    if MADRID:
        return dt.datetime.now(MADRID)
    utc = dt.datetime.now(dt.timezone.utc)
    def last_sunday(year, month):
        d = dt.datetime(year, month + 1, 1, 1, tzinfo=dt.timezone.utc) - dt.timedelta(days=1) if month < 12 else None
        return d - dt.timedelta(days=(d.weekday() + 1) % 7)
    summer = last_sunday(utc.year, 3) <= utc < last_sunday(utc.year, 10)
    return utc.astimezone(dt.timezone(dt.timedelta(hours=2 if summer else 1), 'CEST' if summer else 'CET'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default='js/meta-live.js')
    ap.add_argument('--force', action='store_true', help='run even if it already refreshed today')
    ap.add_argument('--top', type=int, default=20, help='archetypes (by 14-day share) whose sideboards are read')
    args = ap.parse_args()

    now = madrid_now()
    # The workflow is scheduled for 22:05 and 23:05 UTC, but GitHub starts scheduled runs hours late
    # (03:25-04:38 Madrid in the first runs). So there is no time window: the first run of each Madrid
    # day refreshes and later runs that day skip.
    if not args.force:
        try:
            with open(args.out, encoding='utf-8') as f:
                if f'"updated":"{now:%Y-%m-%d}' in f.read():
                    print('Skipping: already refreshed today.')
                    return 0
        except FileNotFoundError:
            pass

    op = opener()
    windows = {}
    for days in WINDOWS:
        windows[str(days)] = metagame_window(op, days)
        time.sleep(PAUSE)
    totals = [sum(t['decks'] for t in windows[str(d)]) for d in WINDOWS]
    if not totals[0] < totals[1] < totals[2]:
        raise RuntimeError(f'window sizes look wrong (decks per window: {totals}); refusing to publish')

    by14 = sorted(windows['14'], key=lambda t: -t['share'])[:args.top]
    boards = {}
    for t in by14:
        if TRACKED_SLUGS and t['slug'] not in TRACKED_SLUGS:
            continue
        try:
            boards[t['slug']] = sideboard(op, t['slug'])
        except Exception as e:  # one archetype failing must not lose the whole refresh
            print(f'warning: sideboard for {t["slug"]} failed: {e}', file=sys.stderr)
        time.sleep(PAUSE)

    # MyMTGO: optional. A failure here keeps the MTGGoldfish refresh.
    mymtgo = {}
    try:
        known = mymtgo_index(op)
        for t in by14:
            short = short_slug(t['slug'])
            slug = MYMTGO_SLUGS.get(short) or (short if short in known else None)
            if not slug:
                continue
            try:
                mymtgo[t['slug']] = mymtgo_archetype(op, slug)
            except Exception as e:
                print(f'warning: MyMTGO {slug} failed: {e}', file=sys.stderr)
            time.sleep(PAUSE)
    except Exception as e:
        print(f'warning: MyMTGO skipped: {e}', file=sys.stderr)

    data = {
        'source': 'MTGGoldfish Legacy metagame; sideboard use from MyMTGO',
        'updated': now.strftime('%Y-%m-%d %H:%M %Z'),
        'updatedLabel': now.strftime('%-d %b %Y') if sys.platform != 'win32' else now.strftime('%#d %b %Y'),
        'windows': {d: {t['slug']: {'name': t['name'], 'share': t['share'], 'decks': t['decks'], 'card': t['card']}
                        for t in tiles} for d, tiles in windows.items()},
        'sideboards': boards,
        'mymtgo': mymtgo,
    }
    js = ('// Generated by scripts/update_meta.py. Do not edit by hand.\n'
          'window.GOLDFISH_LIVE=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
    with open(args.out, 'w', encoding='utf-8', newline='\n') as f:
        f.write(js)
    print(f'Wrote {args.out}: {sum(len(v) for v in data["windows"].values())} window rows, {len(boards)} sideboards, {len(mymtgo)} MyMTGO archetypes.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
