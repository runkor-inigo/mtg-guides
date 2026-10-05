export type NavItem = {
  id: string;
  label: string;
};

export const navItems: NavItem[] = [
  { id: 'map', label: 'Compact SB Map' },
  { id: 'deck', label: 'Current 75' },
  { id: 'heur', label: 'Heuristics' },
  { id: 'goldfish', label: 'Goldfish' },
  { id: 'mana', label: 'Mana Math' },
  { id: 'sources', label: 'Sources' }
];

export const deckFacts = [
  { label: 'Core identity', value: 'Precision mana + resilient creature lines' },
  { label: 'Key intention', value: 'Find the correct plan before speed becomes a liability' },
  { label: 'Working range', value: '5–6 dorks, 3–4 Natural Order, 3–4 Speakers' },
  { label: 'Guide status', value: 'RC51-inspired structure with living project notes' }
];

export const deckRows = [
  { qty: '4', name: 'Formidable Speaker', tag: 'core' },
  { qty: '4', name: 'Wirewood Symbiote', tag: 'core' },
  { qty: '4', name: 'Quirion Ranger', tag: 'core' },
  { qty: '4', name: 'Badgermole Cub', tag: 'engine' },
  { qty: '3', name: 'Allosaurus Shepherd', tag: 'core' },
  { qty: '3', name: 'Natural Order', tag: 'combo' },
  { qty: '2', name: 'Craterhoof Behemoth', tag: 'combo' },
  { qty: '1', name: 'Atraxa, Grand Unifier', tag: 'combo' },
  { qty: '3', name: 'Once Upon a Time', tag: 'selection' },
  { qty: '4', name: 'Green Sun\'s Zenith', tag: 'search' },
  { qty: '6', name: 'One-mana dorks', tag: 'mana' },
  { qty: '19', name: 'Lands', tag: 'mana' }
];

export const sideboardRows = [
  { qty: '4', name: 'Thoughtseize', tag: 'turbo' },
  { qty: '3', name: 'Snuff Out', tag: 'slow' },
  { qty: '3', name: 'Leyline of the Void', tag: 'control' },
  { qty: '2', name: 'Choke', tag: 'control' },
  { qty: '1', name: 'Marwyn, the Preserver', tag: 'slow' },
  { qty: '1', name: 'Chomping Changeling', tag: 'control' },
  { qty: '1', name: 'Hogaak, Arisen Necropolis', tag: 'turbo' }
];

export const heuristics = [
  {
    title: 'Mulligan around functional mana',
    body: 'Keep hands that make green early and have a credible plan. The deck can turn a mana-rich hand into a keep if topdecks carry a real payoff.'
  },
  {
    title: 'Once Upon a Time is a risk tool',
    body: 'Do not treat every miss as a reason to fold the hand. Missing the first green source is usually worse than missing Cradle.'
  },
  {
    title: 'Identify the first vulnerable point',
    body: 'Ask whether the deck can still function if the dork dies, Natural Order is answered, or the loop is interrupted.'
  }
];

export const goldfishSteps = [
  'Turn 1: accelerate into mana or repetitive value with a dork and a land drop.',
  'Turn 2: deploy Cradle or the engine and begin matching the hand to the best line.',
  'Turn 3: choose whether to force Treasure, Speaker value, or a combo line.',
  'End step: identify the player’s exact fail state and the fallback plan if interaction arrives.'
];

export const matrixRows = [
  { category: 'Main deck / core', pox: '−1', lands: '−1', tempo: '0', control: '+1', prison: '+2', reanimator: '0' },
  { category: 'Pre-game selection', pox: '+1', lands: '+1', tempo: '0', control: '+1', prison: '−1', reanimator: '+1' },
  { category: 'Engine count', pox: '+1', lands: '+2', tempo: '+1', control: '0', prison: '+1', reanimator: '+1' },
  { category: 'Combo protection', pox: '+2', lands: '0', tempo: '+1', control: '+2', prison: '+1', reanimator: '+2' },
  { category: 'Sideboard density', pox: '+1', lands: '+1', tempo: '0', control: '+1', prison: '+1', reanimator: '0' }
];

export const sources = [
  'Project brief: Speaker Elves deck identity, construction ranges and matchup rationale.',
  'Legacy HTML RC51 snapshot for land counts, sideboard logic and practical examples.',
  'Guide architecture informed by existing deck treatment and interactive menu structure.'
];
