export type NavItem = {
  id: string;
  label: string;
};

export const navItems: NavItem[] = [
  { id: 'start', label: 'Start Here' },
  { id: 'construction', label: 'Construction' },
  { id: 'mulligans', label: 'Mulligans' },
  { id: 'sequencing', label: 'Sequencing' },
  { id: 'sideboard', label: 'Sideboard' },
  { id: 'matchups', label: 'Matchups' },
  { id: 'interaction', label: 'Interaction Windows' },
  { id: 'credits', label: 'Credits' }
];

export const deckFacts = [
  { label: 'Core identity', value: 'Mana output + resilient creature lines' },
  { label: 'Key intention', value: 'Find the right line, not just the fastest one' },
  { label: 'Working ranges', value: '5–6 dorks, 3–4 Natural Order, 3–4 Speakers' },
  { label: 'Structure', value: 'Mono-G / BG / RG comparisons should stay explicit' }
];

export const constructionRows = [
  { packageName: 'Mana base', understanding: '19 lands with Cradle and Arbor as strategic accelerants; exact fetch and Bayou choices vary within the same framework.', status: 'Settled framework' },
  { packageName: 'Turn-one acceleration', understanding: '5–6 one-mana dorks, with Zenith/Arbor lines treated as equivalent in the right opening.', status: 'Working range' },
  { packageName: 'Search & selection', understanding: 'Green Sun’s Zenith, Once Upon a Time and Formidable Speaker turn resources into plan-finding and setup.', status: 'Structural function' },
  { packageName: 'Speakers and untappers', understanding: 'Formidable Speaker, Quirion Ranger and Wirewood Symbiote are grouped by repeated value and loop execution.', status: 'Package confirmed' },
  { packageName: 'Engine package', understanding: 'Badgermole Cub, Cradle, repeatable untap effects and mana creatures drive explosive turns.', status: 'Structural role' },
  { packageName: 'Natural Order package', understanding: '3–4 Order, 1–2 Craterhoof, 1 Atraxa are not sacred counts but valid working ranges.', status: 'Open ranges' },
  { packageName: 'Loop finish', understanding: 'Temur Sabertooth, Speaker, undying-value engines and Hoof are the core finish sequence.', status: 'Requires step-by-step teaching' },
  { packageName: 'Flex slots', understanding: 'Visionary, Eladamri, Ouphe and other grind choices are metagame-dependent slots rather than rigid cards.', status: 'Open choices' }
];

export const mulliganExamples = [
  {
    title: 'Functional mana keeps',
    body: 'A seven that hits a green source, starts a dork or equivalent, and has a plan is often worth keeping even when the payoff is not immediate.'
  },
  {
    title: 'Once Upon a Time risk',
    body: 'The critical question is whether the miss is acceptable, and whether the rest of the hand can still function without the exact missing piece.'
  },
  {
    title: 'Opponent-dependent keep',
    body: 'A hand that survives a counterspell or a graveyard hate piece is different from a hand that folds to the first early pressure.'
  }
];

export const sequenceCards = [
  { title: 'Plan selection', body: 'Choose the best line: Cradle, Speaker, Natural Order or a slower setup, then check if the opponent can punish the first point of failure.' },
  { title: 'Natural Order', body: 'Set up the sacrifice, protect the target and decide whether the board state rewards a direct kill or a more resilient loop.' },
  { title: 'Speaker loop', body: 'Count mana, reset with untap pieces, and know when the line is finished versus when it needs a second engine piece.' },
  { title: 'Goldfish lab', body: 'Practice the exact turns by plan, including draw steps and the interaction that changes the route.' }
];

export const sideboardSlots = [
  { card: 'Thoughtseize', role: 'Early disruption and resource denial', count: 4 },
  { card: 'Snuff Out', role: 'Cheap interaction against key creatures and opposing tempo', count: 3 },
  { card: 'Leyline of the Void', role: 'Mitigate graveyard and recursion strategies', count: 3 },
  { card: 'Choke', role: 'Blue-heavy mana pressure and control disruption', count: 2 },
  { card: 'Marwyn, the Preserver', role: 'Land protection and recursion against Wasteland pressure', count: 1 },
  { card: 'Chomping Changeling', role: 'Flexible answer package with sideboard utility', count: 1 },
  { card: 'Hogaak, Arisen Necropolis', role: 'High-end grind option when the matchup rewards it', count: 1 }
];

export const matchupRows = [
  { matchup: 'Pox', note: 'Mana denial makes a functional opening and reserve resources much more valuable.', priority: 'High' },
  { matchup: 'Lands', note: 'The timing of the first engine and land protection matters more than raw card density.', priority: 'High' },
  { matchup: 'Tempo / disruption', note: 'Redundant creatures and protection matter more than a single perfect curve.', priority: 'Medium' },
  { matchup: 'Control / exile', note: 'Natural Order and parting resources can still convert into a resilient top-end line.', priority: 'Medium' },
  { matchup: 'Combo / graveyard decks', note: 'Countermagic and graveyard hate shape the value of an early keep and later loop timing.', priority: 'High' }
];

export const interactionWindows = [
  'Initial mana source and turn-one accelerator are the first windows to watch.',
  'The key failures are counterspells, graveyard disruption and early removal on the dork or engine piece.',
  'When Natural Order or the Speaker loop is chosen, the opponent needs a tracked answer rather than a generic one-off removal spell.',
  'Goldfish practice helps the pilot spot the real timing of success and fallback lines.'
];

export const credits = [
  'Project brief from the Speaker Elves knowledge doc with deck identity, construction, mulligan logic and matchup framing.',
  'Built as a modular guide structure for a future static-site release and interactive menu work.',
  'This is a working implementation scaffold intended to be extended with actual card data, matchup notes and final article copy.'
];
