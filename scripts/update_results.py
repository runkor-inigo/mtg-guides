"""Archive of published Speaker Elves results on MTGO.

* Results come from the MTGGoldfish deck search: Legacy decks with Formidable Speaker in the main
  deck, MTGO leagues and challenges only. Every league list MTGO publishes is a 5-0 trophy.
* Challenge placings come from the official standings on mtgo.com.
* Paper results come from the same MTGGoldfish search: every non-MTGO event it lists. It gives no
  placings for them, so they show as published lists. Other MTGO events (Showcase Challenge, RC
  Qualifier, Last Chance) count with the challenges.
* Runs once per Madrid day (the workflow fires twice a night); --force runs it anyway.
* Individual decklists are linked, not copied: MTGGoldfish protects deck pages from automated
  access and mtgo.com no longer publishes league lists, so identical 75s are not grouped.

Writes js/results-archive.js for the Current 75 page. Python standard library only.
Usage: python scripts/update_results.py [--since 2026-01-23]
"""
import argparse
import datetime as dt
import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request

GOLDFISH = 'https://www.mtggoldfish.com'
MTGO = 'https://www.mtgo.com'
UA = 'SpeakerElvesGuide/1.0 (+https://github.com/runkor-inigo/mtg-guides)'
PAUSE = 1.5


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'en'})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode('utf-8', 'replace')


def clean(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()


def search_page(since, until, page):
    q = [('deck_search[name]', ''), ('deck_search[format]', 'legacy'), ('deck_search[types][]', ''),
         ('deck_search[types][]', 'tournament'), ('deck_search[player]', ''),
         ('deck_search[date_range]', f'{since:%m/%d/%Y} - {until:%m/%d/%Y}'),
         ('deck_search[deck_search_card_filters_attributes][0][card]', 'Formidable Speaker'),
         ('deck_search[deck_search_card_filters_attributes][0][quantity]', '1'),
         ('deck_search[deck_search_card_filters_attributes][0][type]', 'maindeck'),
         ('counter', '1'), ('page', str(page))]
    body = get(GOLDFISH + '/deck_searches/create?' + urllib.parse.urlencode(q))
    rows = []
    for tr in re.findall(r'<tr>(.*?)</tr>', body, re.S):
        cells = [clean(c) for c in re.findall(r'<td[^>]*>(.*?)</td>', tr, re.S)]
        link = re.search(r'href="(/deck/\d+)', tr)
        if len(cells) >= 5 and link:
            rows.append({'date': cells[0], 'archetype': cells[1], 'event': cells[2], 'player': cells[4],
                         'deck': GOLDFISH + link.group(1)})
    return rows


def mtgo_standings(date, size, nth):
    """Final ranks of the nth Legacy Challenge of that size on that date, keyed by player name."""
    index = get(f'{MTGO}/decklists/{date[:4]}/{date[5:7]}')
    slug = f'legacy-challenge-{size}-{date}'
    links = sorted(set(re.findall(r'href="(/decklist/' + re.escape(slug) + r'\d+)"', index)))
    if len(links) < nth:
        return {}
    page = get(MTGO + links[nth - 1])
    m = re.search(r'window\.MTGO\.decklists\.data\s*=\s*(\{.*?\});\s*\n', page, re.S)
    if not m:
        return {}
    d = json.loads(m.group(1))
    by_login = {row.get('loginid'): int(row.get('rank') or 0) for row in d.get('final_rank') or [] if isinstance(row, dict)}
    for row in d.get('standings') or []:
        by_login.setdefault(row.get('loginid'), int(row.get('rank') or 0))
    names = {deck.get('loginid'): deck.get('player') for deck in d.get('decklists') or []}
    for row in d.get('standings') or []:
        names.setdefault(row.get('loginid'), row.get('login_name'))
    count = d.get('player_count')
    players = int(count.get('players') or 0) if isinstance(count, dict) else (int(count) if count else None)
    return {names[k]: v for k, v in by_login.items() if k in names}, players, MTGO + links[nth - 1]


def madrid_today():
    try:
        from zoneinfo import ZoneInfo
        return dt.datetime.now(ZoneInfo('Europe/Madrid')).date()
    except Exception:
        return dt.date.today()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--since', default='2026-01-23', help='Formidable Speaker release date by default')
    ap.add_argument('--out', default='js/results-archive.js')
    ap.add_argument('--force', action='store_true', help='run even if the archive was already refreshed today')
    args = ap.parse_args()
    since, until = dt.date.fromisoformat(args.since), madrid_today()
    if not args.force:
        try:
            with open(args.out, encoding='utf-8') as f:
                if f'"updated":"{until.isoformat()}"' in f.read():
                    print('Skipping: results already refreshed today.', file=sys.stderr)
                    return
        except FileNotFoundError:
            pass

    rows, page = [], 1
    while True:
        batch = search_page(since, until, page)
        rows += batch
        print(f'search page {page}: {len(batch)} decks', file=sys.stderr)
        if len(batch) < 30:
            break
        page += 1
        time.sleep(PAUSE)

    results, standings = [], {}
    for r in rows:
        ev = r['event']
        if 'elves' not in r['archetype'].lower():
            continue                      # other decks that happen to play Speaker
        if ev.startswith('Legacy League'):
            results.append({**r, 'kind': 'Trophy', 'finish': '5-0', 'source': None})
            continue
        m = re.match(r'Legacy Challenge (\d+) (\d{4}-\d{2}-\d{2})(?: \((\d+)\))?', ev)
        if not m:
            # Other MTGO events (Showcase Challenge, RC Qualifier, Last Chance) and paper events.
            # MTGGoldfish gives no placings for them; MTGO events count with the challenges.
            mtgo = re.match(r'Legacy (Showcase Challenge|RC (?:Super )?Qualifier|Super Qualifier|Qualifier|Last Chance)', ev)
            results.append({**r, 'kind': 'MTGO event' if mtgo else 'Paper', 'finish': None, 'source': None})
            continue
        size, date, nth = m.group(1), m.group(2), int(m.group(3) or 0) + 1
        key = (date, size, nth)
        if key not in standings:
            try:
                standings[key] = mtgo_standings(date, size, nth)
            except Exception as e:
                print(f'warning: standings {key} failed: {e}', file=sys.stderr)
                standings[key] = {}
            time.sleep(PAUSE)
        st = standings[key]
        ranks, players, url = st if st else ({}, None, None)
        results.append({**r, 'kind': f'Challenge {size}', 'finish': ranks.get(r['player']), 'players': players, 'source': url})

    # MTGGoldfish sometimes lists the same deck twice for one event.
    seen, unique = set(), []
    for r in results:
        # League trophies are separate runs (a player can 5-0 twice in a day); other events: one finish per player.
        key = (r['date'], r['event'], r['player'], r['deck'] if r['kind'] == 'Trophy' else '')
        if key not in seen:
            seen.add(key); unique.append(r)
    results = unique
    results.sort(key=lambda x: (x['date'], x['kind'] != 'Trophy'), reverse=True)
    data = {'source': 'MTGGoldfish deck search (MTGO and paper) and mtgo.com standings (challenge placings)',
            'updated': until.isoformat(), 'since': args.since, 'results': results}
    with open(args.out, 'w', encoding='utf-8', newline='\n') as f:
        f.write('// Generated by scripts/update_results.py. Do not edit by hand.\n')
        f.write('window.SPEAKER_RESULTS=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print(f'Wrote {args.out}: {len(results)} results '
          f'({sum(r["kind"] == "Trophy" for r in results)} trophies, '
          f'{sum(r["kind"] == "Paper" for r in results)} paper).', file=sys.stderr)


if __name__ == '__main__':
    main()
