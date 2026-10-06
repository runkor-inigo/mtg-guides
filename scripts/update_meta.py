"""Daily metagame refresh for the Speaker Elves guide.

Reads the public MTGGoldfish Legacy metagame for the 7-, 14- and 30-day windows and,
for every archetype the guide tracks, the most common sideboard cards from its card
breakdown. Writes js/meta-live.js, which the page loads before js/01.js.

Runs with the Python standard library only (no site build step). The GitHub Actions
workflow in .github/workflows/meta.yml calls it every night at 00:00 Europe/Madrid.

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
    ap.add_argument('--force', action='store_true', help='run even if it is not midnight in Madrid')
    ap.add_argument('--top', type=int, default=20, help='archetypes (by 14-day share) whose sideboards are read')
    args = ap.parse_args()

    now = madrid_now()
    # The workflow fires at 22:05 and 23:05 UTC, which is just after midnight in Madrid in summer or
    # in winter. Scheduled runs can start late, so accept 00:00-02:59 and refresh at most once a day.
    if not args.force:
        if now.hour > 2:
            print(f'Skipping: it is {now:%H:%M} in Madrid, outside the nightly window.')
            return 0
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

    data = {
        'source': 'MTGGoldfish Legacy metagame',
        'updated': now.strftime('%Y-%m-%d %H:%M %Z'),
        'updatedLabel': now.strftime('%-d %b %Y') if sys.platform != 'win32' else now.strftime('%#d %b %Y'),
        'windows': {d: {t['slug']: {'name': t['name'], 'share': t['share'], 'decks': t['decks'], 'card': t['card']}
                        for t in tiles} for d, tiles in windows.items()},
        'sideboards': boards,
    }
    js = ('// Generated by scripts/update_meta.py. Do not edit by hand.\n'
          'window.GOLDFISH_LIVE=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
    with open(args.out, 'w', encoding='utf-8', newline='\n') as f:
        f.write(js)
    print(f'Wrote {args.out}: {sum(len(v) for v in data["windows"].values())} window rows, {len(boards)} sideboards.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
