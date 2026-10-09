/* Sideboard Optimizer (9 Oct 2026). Method from runkor's Cradle Sideboard Optimizer
   (github.com/runkor-inigo/MTG-Cradle-Sideboard-Optimizer), rating scale from Newton Hang's card ratings.
   Each card gets a 0–1 rating per matchup; the MTGO field share (GOLDFISH_META) weights it.
   MC (metagame coverage) = Σ share × rating / Σ share over every matchup in the map.
   UE (use efficiency) = the same sum over only the matchups where the rating is above 0.
   Starting ratings: a first pass from the matchup plans and LEGACY.md section 14, for runkor to review.
   A viewer's edits stay in their browser (localStorage) and can be exported as JSON. */
(function sideboardOptimizer(){
 const box=document.getElementById('sbo');if(!box||typeof DETAILS==='undefined')return;
 const SCALE=[[1,'Free game-winning bomb'],[.75,'Flexible, efficient disruption'],[.5,'Situational disruption or slow bomb'],[.25,'Slow, situational disruption'],[0,'Does not come in']];
 // copies: most copies the suggestion may take; own: copies in the current sideboard. lists: sideboards among the 75 mtgtop8 lists with Formidable Speaker in the
 // main deck (25 Jan – 4 Oct 2026, read on 8 Oct 2026; all black-green, none mono-green). Candidates are every card from
 // those sideboards that a black-green deck can cast (Gaddock Teeg and the red or white cards are left out).
 const SPEAKER_LISTS=75;
 const CARDS=[
  {name:'Thoughtseize',copies:4,own:4,lists:52},{name:'Snuff Out',copies:4,own:3,lists:14},{name:'Leyline of the Void',copies:4,own:3,lists:17},
  {name:'Choke',copies:2,own:2,lists:36},{name:"Assassin's Trophy",copies:3,own:2,lists:15},{name:'Alpha Deathclaw',copies:1,own:1,lists:17},
  {name:'Force of Vigor',copies:3,lists:71,cand:true},{name:'Endurance',copies:3,lists:57,cand:true},
  {name:'Abrupt Decay',copies:2,lists:40,cand:true},{name:'Dismember',copies:3,lists:24,cand:true},
  {name:'Disruptor Flute',copies:2,lists:23,cand:true},{name:'Hogaak, Arisen Necropolis',copies:1,lists:17,cand:true},
  {name:'Faerie Macabre',copies:2,lists:12,cand:true},{name:'Chomping Changeling',copies:1,lists:10,cand:true},
  {name:'Grist, the Hunger Tide',copies:1,lists:8,cand:true},{name:'Duress',copies:2,lists:8,cand:true},
  {name:'Mindbreak Trap',copies:2,lists:5,cand:true},{name:'Outland Liberator',copies:1,lists:5,cand:true},
  {name:'Keen-Eyed Curator',copies:1,lists:5,cand:true},{name:'Dryad Militant',copies:1,lists:4,cand:true},
  {name:'Opposition Agent',copies:1,lists:3,cand:true},{name:'Frenzied Baloth',copies:1,lists:2,cand:true},
  {name:'Seeds of Innocence',copies:1,lists:2,cand:true},{name:'Surgical Extraction',copies:1,lists:2,cand:true},
  {name:'Fulminator Mage',copies:1,lists:2,cand:true},{name:'Bojuka Bog',copies:1,lists:2,cand:true},
  {name:'Kraul Harpooner',copies:1,lists:1,cand:true},{name:'Scavenging Ooze',copies:1,lists:1,cand:true},
  {name:'Emperor of Bones',copies:1,lists:1,cand:true},{name:'Pithing Needle',copies:1,lists:1,cand:true},
  {name:'Fatal Push',copies:2,lists:1,cand:true},
  // Not in any Speaker list: tutorable creatures that destroy artifacts and enchantments (Scryfall search, 9 Oct 2026).
  {name:'Masked Vandal',copies:1,lists:0,cand:true},{name:'Acidic Slime',copies:1,lists:0,cand:true},
  // runkor's idea (9 Oct 2026): names Goblin Bombardment, The One Ring, Mystic Forge… (not lands); Speaker finds it.
  {name:'Phyrexian Revoker',copies:2,lists:0,cand:true}];
 const DEFAULT={
  'Thoughtseize':{doomsday:1,tes:1,sneak:.75,aluren:.75,oops:.75,'mono-rean':.75,'ub-rean':.75,'key-ring':.75,'blue-tron':.75,beanstalk:.5,'jeskai-control':.5,stoneblade:.25},
  'Snuff Out':{'boros-energy':1,eldrazi:1,energy:1,initiative:.75,'8moon':.75,'8cast':.75,dnt:.75,'gb-mole':.75,'sewer-cam':.75,'ur-cutter':.5,'uw-stifle':.5,'ub-legends':.5,stoneblade:.25,'bg-gaak':.25},
  'Leyline of the Void':{'bg-gaak':1,'mono-rean':1,'ub-rean':1,oops:1,lands:.75,'sewer-cam':.75,'ub-moon':.5},
  'Choke':{'ub-moon':.75,'ub-legends':.75,'ur-cutter':.75,'uw-stifle':.75,stoneblade:.75,'jeskai-control':.75,beanstalk:.5,sneak:.5,doomsday:.5,aluren:.25},
  "Assassin's Trophy":{aluren:.75,lands:.75,eldrazi:.75,'key-ring':.75,'blue-tron':.5,sneak:.5,doomsday:.5,dnt:.5,'boros-energy':.5,'8moon':.5,initiative:.5,'8cast':.5,'sewer-cam':.5,'ur-cutter':.25,oops:.25,tes:.25,energy:.25},
  // Destroys any permanent (as it enters and again when it becomes monstrous) and stays as a 6/6 with menace and trample:
  // at least as good as Acidic Slime wherever Slime helps, except under Blood Moon or Magus (it needs black mana).
  'Alpha Deathclaw':{aluren:.5,dnt:.5,lands:.5,'gb-mole':.5,'key-ring':.5,'blue-tron':.5,eldrazi:.5,sneak:.25,'sewer-cam':.25,tes:.25,'8cast':.25,'8moon':.25,'ub-moon':.25,'ub-legends':.25,'boros-energy':.25},
  'Force of Vigor':{aluren:.75,lands:.75,'key-ring':.75,'8cast':.75,'8moon':.75,sneak:.5,oops:.5,eldrazi:.5,'sewer-cam':.5,dnt:.25,doomsday:.25,tes:.25},
  'Endurance':{oops:.75,doomsday:.75,'mono-rean':.5,'ub-rean':.5,'sewer-cam':.5,'bg-gaak':.25,'ur-cutter':.25,lands:.25},
  // Uncounterable; nonland permanents of mana value 3 or less (not Aluren or Sneak Attack, which cost four).
  'Abrupt Decay':{dnt:.75,'8moon':.75,'ub-moon':.5,'ub-legends':.5,'ur-cutter':.5,'uw-stifle':.5,eldrazi:.5,initiative:.5,energy:.5,'boros-energy':.5,'8cast':.5,'key-ring':.5,stoneblade:.5,'sewer-cam':.25,aluren:.25,sneak:.25,'gb-mole':.25,doomsday:.25},
  'Dismember':{'ur-cutter':.75,'boros-energy':.75,energy:.75,eldrazi:.75,'ub-moon':.5,'ub-legends':.5,initiative:.5,'8moon':.5,dnt:.5,'8cast':.5,'uw-stifle':.25,'sewer-cam':.25,'gb-mole':.25},
  // Names one card: spells cost {3} more and its non-mana abilities stop (Thassa's Oracle, Sneak Attack, Mystic Forge, Thespian's Stage).
  'Disruptor Flute':{doomsday:.5,sneak:.5,lands:.5,'key-ring':.5,aluren:.25,tes:.25,oops:.25,'blue-tron':.25,stoneblade:.25,dnt:.25,'gb-mole':.25,'8cast':.25},
  // A second plan from the sideboard: free to cast with convoke and delve, it beats counters and sorcery-speed removal.
  // runkor (9 Oct 2026): Speaker + Hogaak is a very good tech against tempo.
  'Hogaak, Arisen Necropolis':{'ub-moon':.75,'ub-legends':.75,'ur-cutter':.5,'uw-stifle':.5,'jeskai-control':.5,beanstalk:.5,stoneblade:.5,'gb-mole':.5},
  'Faerie Macabre':{'mono-rean':.75,'ub-rean':.75,oops:.5,'bg-gaak':.5,'sewer-cam':.5,lands:.25,'ub-moon':.25},
  // Every creature type, so Speaker and Green Sun's Zenith find it; destroys an artifact or enchantment as it enters.
  'Chomping Changeling':{aluren:.5,'8moon':.5,'key-ring':.5,'8cast':.5,eldrazi:.25,'sewer-cam':.25,dnt:.25,lands:.25,sneak:.25,doomsday:.25,tes:.25,initiative:.25,oops:.25},
  'Grist, the Hunger Tide':{'ub-moon':.5,'ub-legends':.5,'ur-cutter':.5,'gb-mole':.5,dnt:.25,sneak:.25,'boros-energy':.25,energy:.25,'jeskai-control':.25},
  'Duress':{sneak:.75,tes:.75,doomsday:.5,aluren:.5,'key-ring':.5,'blue-tron':.5,'jeskai-control':.5,beanstalk:.5,stoneblade:.5,'mono-rean':.5,'ub-rean':.5,oops:.25,'ub-moon':.25},
  // Blue: in a black-green deck only its free cost works (the opponent cast three or more spells this turn).
  'Mindbreak Trap':{tes:1,aluren:.75,oops:.75,'key-ring':.5,doomsday:.25},
  'Outland Liberator':{aluren:.5,'8moon':.5,'key-ring':.5,'8cast':.5,dnt:.25,eldrazi:.25,'sewer-cam':.25,sneak:.25,doomsday:.25,tes:.25,initiative:.25},
  'Keen-Eyed Curator':{'mono-rean':.5,'ub-rean':.5,oops:.5,'bg-gaak':.5,'sewer-cam':.5,'ub-moon':.5,'ur-cutter':.5,'ub-legends':.25,lands:.25,doomsday:.25},
  'Dryad Militant':{oops:.75,tes:.5,doomsday:.25,'ur-cutter':.25,'ub-moon':.25,'sewer-cam':.25,'mono-rean':.25,'ub-rean':.25},
  // Exiles what the opponent finds when searching: fetch lands, Natural Order, Green Sun's Zenith, Imperial Recruiter.
  'Opposition Agent':{lands:.5,'gb-mole':.5,aluren:.5,doomsday:.25,'blue-tron':.25,'key-ring':.25,dnt:.25,'boros-energy':.25,energy:.25},
  'Frenzied Baloth':{'uw-stifle':.5,'jeskai-control':.5,stoneblade:.5,'ub-moon':.25,'ub-legends':.25,'ur-cutter':.25,beanstalk:.25,'blue-tron':.25},
  'Seeds of Innocence':{'8cast':1,'key-ring':.75,'sewer-cam':.5,'8moon':.25,eldrazi:.25,dnt:.25},
  'Surgical Extraction':{'mono-rean':.5,'ub-rean':.5,sneak:.25,doomsday:.25,oops:.25,'bg-gaak':.25,'sewer-cam':.25},
  'Fulminator Mage':{lands:.5,'blue-tron':.5,'key-ring':.5,eldrazi:.5,'gb-mole':.25,'8moon':.25},
  // A land: Vibrance can find it; it enters tapped, so it costs a mana on that turn.
  'Bojuka Bog':{'mono-rean':.5,'ub-rean':.5,oops:.5,'bg-gaak':.5,'sewer-cam':.5,lands:.25},
  'Kraul Harpooner':{'ur-cutter':.75,'ub-moon':.5,'ub-legends':.5,'uw-stifle':.25,stoneblade:.25,initiative:.25,'boros-energy':.25},
  'Scavenging Ooze':{'mono-rean':.5,'ub-rean':.5,'bg-gaak':.5,'sewer-cam':.5,oops:.25,'ub-moon':.25,'ur-cutter':.25,'boros-energy':.25},
  'Emperor of Bones':{'mono-rean':.5,'ub-rean':.5,'bg-gaak':.25,'sewer-cam':.25,oops:.25},
  'Pithing Needle':{lands:.5,'key-ring':.5,'blue-tron':.25,'8cast':.25,dnt:.25,stoneblade:.25,eldrazi:.25,initiative:.25},
  // Changeling (an Elf for Wirewood Symbiote); exiles an artifact or enchantment if it exiles a creature card from our graveyard.
  'Masked Vandal':{aluren:.5,'8moon':.5,'key-ring':.5,'8cast':.5,eldrazi:.25,'sewer-cam':.25,dnt:.25,sneak:.25,doomsday:.25,tes:.25,initiative:.25,oops:.25},
  // Five mana: destroys an artifact, enchantment or land (Dark Depths, Urza's Saga, Tron lands); Green Sun's Zenith for 5.
  'Acidic Slime':{lands:.5,'key-ring':.5,'blue-tron':.5,eldrazi:.5,'8moon':.5,aluren:.5,sneak:.25,dnt:.25,'sewer-cam':.25,'8cast':.25},
  // Stops the activated abilities of one nonland card: Goblin Bombardment, The One Ring, Mystic Forge, Karn, Walking Ballista.
  'Phyrexian Revoker':{'boros-energy':.5,energy:.5,'key-ring':.5,'8moon':.25,initiative:.25,'blue-tron':.25,'sewer-cam':.25,'8cast':.25},
  'Fatal Push':{'boros-energy':.75,energy:.75,'ub-moon':.5,'ub-legends':.5,'ur-cutter':.5,initiative:.5,eldrazi:.5,'8moon':.5,dnt:.25,'8cast':.25,'uw-stifle':.25}};
 // Matchups added on 9 Oct 2026 start with the ratings of the closest plan (the same one their sideboard plan follows).
 const RATE_LIKE={'jeskai-tempo':'ur-cutter','azorius-tempo':'uw-stifle','omni-tell':'sneak','mirror':'gb-mole'};
 for(const r of Object.values(DEFAULT))for(const [to,from] of Object.entries(RATE_LIKE))if(r[from]!=null&&r[to]==null)r[to]=r[from];
 const KEY='sbo-ratings-v1',VIEW='sbo-view-v1';
 const load=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
 const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
 const clone=o=>JSON.parse(JSON.stringify(o));
 let ratings=Object.assign(clone(DEFAULT),load(KEY)||{});
 let view=Object.assign({days:14,prio:'share'},load(VIEW)||{});
 const ids=Object.keys(DETAILS).filter(id=>GOLDFISH_META[id]);
 // Field share per plan: a Goldfish archetype shared by several plans is split between them, so the field adds up once.
 function shares(days){
  const users=new Map();ids.forEach(id=>(GOLDFISH_META[id]?.[days]?.sources||[]).forEach(s=>users.set(s.key,(users.get(s.key)||0)+1)));
  const out={};ids.forEach(id=>{out[id]=(GOLDFISH_META[id]?.[days]?.sources||[]).reduce((a,s)=>a+s.share/users.get(s.key),0)});return out;}
 // Archetypes in the nightly MTGGoldfish data with no plan in the map: the ratings cannot see them.
 function unplanned(days){const live=window.GOLDFISH_LIVE?.windows?.[days];if(!live)return '';
  const mapped=new Set();ids.forEach(id=>(GOLDFISH_META[id]?.[days]?.sources||[]).forEach(s=>mapped.add(s.url.replace(/.*archetype\//,'').replace(/#.*/,''))));
  const miss=Object.entries(live).filter(([slug,r])=>!mapped.has(slug)&&r.share>=1).sort((a,b)=>b[1].share-a[1].share);
  return miss.length?' No plan yet for '+miss.slice(0,4).map(([,r])=>esc(r.name)+' ('+r.share.toFixed(1)+'%)').join(', ')+(miss.length>4?' and '+(miss.length-4)+' more':'')+'.':'';}
 const short=id=>({'ur-cutter':'UR Cutter','sewer-cam':'Sewer Cam','key-ring':'Colorless Tron','beanstalk':'Beanstalk','mono-rean':'Mono-B Rean.','ub-rean':'UB Rean.','bg-gaak':'Hogaak','uw-stifle':'Stiflenought','stoneblade':'Stoneblade','initiative':'Initiative','jeskai-control':'Jeskai Ctrl','energy':'WBR Energy','8moon':'Mono Red','gb-mole':'Cradle Ctrl','dnt':'Yorion Taxes','lands':'GX Lands','oops':'Oops'}[id]||DETAILS[id].name);
 const img=c=>(typeof COMBO_CARD_ART!=='undefined'&&COMBO_CARD_ART[c]?.src)||'assets/thumbs/'+c.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.webp';
 const fmt=v=>v?String(v).replace(/^0/,''):'·';
 // What each card does, to show the mix of a fifteen (and to cap how many copies of one job it may hold).
 const ROLE={'Snuff Out':'Creature removal','Dismember':'Creature removal','Fatal Push':'Creature removal','Kraul Harpooner':'Creature removal','Grist, the Hunger Tide':'Creature removal',
  "Assassin's Trophy":'Any permanent','Abrupt Decay':'Any permanent','Alpha Deathclaw':'Any permanent',
  'Force of Vigor':'Artifacts & enchantments','Chomping Changeling':'Artifacts & enchantments','Outland Liberator':'Artifacts & enchantments','Masked Vandal':'Artifacts & enchantments','Acidic Slime':'Artifacts & enchantments','Seeds of Innocence':'Artifacts & enchantments','Pithing Needle':'Artifacts & enchantments','Disruptor Flute':'Artifacts & enchantments',
  'Thoughtseize':'Discard','Duress':'Discard',
  'Leyline of the Void':'Graveyard','Endurance':'Graveyard','Faerie Macabre':'Graveyard','Keen-Eyed Curator':'Graveyard','Surgical Extraction':'Graveyard','Bojuka Bog':'Graveyard','Scavenging Ooze':'Graveyard','Emperor of Bones':'Graveyard','Dryad Militant':'Graveyard',
  'Choke':'Against blue','Frenzied Baloth':'Against blue','Mindbreak Trap':'Against combo','Opposition Agent':'Against combo','Fulminator Mage':'Land destruction','Phyrexian Revoker':'Artifacts & enchantments','Hogaak, Arisen Necropolis':'Second threat'};
 const ROLE_CAP=6,COVER=.75;
 // Interactions with their cards (runkor, 9 Oct 2026: "how do all the cards of all the decks interact?"). Each matchup
 // reads what the opponent plays from the nightly data: presence is 1 in their MyMTGO reference main deck, otherwise the
 // share of post-board games where it comes in (MyMTGO "Sided in"), otherwise half its share of published sideboards
 // (MTGGoldfish), otherwise 0.3 if the plan's notes on their sideboard name it.
 const slugOf=id=>(GOLDFISH_META[id]?.[14]?.sources?.[0]?.url||'').replace(/.*archetype\//,'').replace(/#.*/,'');
 // Colours of their cards: MyMTGO groups some archetypes into families (its "Energy" mixes Boros, Mardu and blue
 // variants), so a coloured card only counts where the deck can cast it (Boros Energy plays no Consign to Memory).
 // Colourless cards and lands always count.
 const OPP_COLOR={'Veil of Summer':'G','Consign to Memory':'U','Clarion Conqueror':'W','Deafening Silence':'W','Omniscience':'U','Sneak Attack':'R','Aluren':'G','Containment Priest':'W','Magus of the Moon':'R'};
 // MyMTGO's "Energy" family (reference list: Mardu) is not Boros Energy: there only MTGGoldfish is read.
 const GF_ONLY=new Set(['boros-energy']);
 // Main-deck staples the data above cannot show (MTGGoldfish publishes sideboards only).
 const KNOWN_MAIN={'boros-energy':['Goblin Bombardment'],energy:['Goblin Bombardment']};
 function presence(id,card){const need=OPP_COLOR[card],cols=(typeof MATCH_COLORS!=='undefined'&&MATCH_COLORS[id])||'';
  if(need&&cols&&cols!=='C'&&!cols.includes(need))return 0;
  if((KNOWN_MAIN[id]||[]).includes(card))return 1;
  const L=window.GOLDFISH_LIVE||{},slug=slugOf(id),m=GF_ONLY.has(id)?null:L.mymtgo?.[slug];
  if((m?.main||[]).some(c=>c===card))return 1;
  const sd=(m?.side||[]).find(c=>c.card===card);if(sd&&sd.sidedIn>0)return sd.sidedIn/100;
  const g=(L.sideboards?.[slug]||[]).find(c=>c.card===card);if(g)return g.pct/200;
  return (DETAILS[id].opp||[]).some(t=>t.includes(card))?.3:0;}
 // Their hate lowers a rating: rating × (1 − weight × presence) for each card that hits ours (Oracle text checked).
 const HATE=[
  {card:'Veil of Summer',why:'hexproof from black for them and their permanents: a black spell aimed at them fizzles',hits:{'Thoughtseize':.6,'Duress':.6,'Snuff Out':.4,'Dismember':.4,'Fatal Push':.4,'Abrupt Decay':.4,"Assassin's Trophy":.4}},
  {card:'Defense Grid',why:'our spells cost {3} more during their turn',hits:{'Mindbreak Trap':.7,'Force of Vigor':.5,'Snuff Out':.3,'Dismember':.3,'Fatal Push':.3,'Abrupt Decay':.3,"Assassin's Trophy":.3}},
  {card:'Trinisphere',why:'every spell costs at least three, free spells included',hits:{'Snuff Out':.5,'Force of Vigor':.5,'Mindbreak Trap':.5,'Thoughtseize':.4,'Duress':.4,'Fatal Push':.4,'Surgical Extraction':.4,'Dismember':.2,'Abrupt Decay':.2,"Assassin's Trophy":.2}},
  {card:'Chalice of the Void',why:'usually on one: it counters our one-mana spells',hits:{'Thoughtseize':.5,'Duress':.5,'Fatal Push':.5,'Surgical Extraction':.5,'Dryad Militant':.5}},
  {card:'Consign to Memory',why:'counters a triggered ability, such as an enter trigger',hits:{'Alpha Deathclaw':.4,'Acidic Slime':.4,'Chomping Changeling':.4,'Masked Vandal':.4,'Kraul Harpooner':.4}},
  {card:'Torpor Orb',why:'creatures entering trigger nothing',hits:{'Alpha Deathclaw':.6,'Acidic Slime':.8,'Chomping Changeling':.8,'Masked Vandal':.8,'Kraul Harpooner':.8}},
  {card:'Clarion Conqueror',why:'no activated abilities on creatures, artifacts or planeswalkers',hits:{'Grist, the Hunger Tide':.8,'Fulminator Mage':.8,'Keen-Eyed Curator':.6,'Scavenging Ooze':.6,'Outland Liberator':.5,'Emperor of Bones':.3}},
  {card:"Grafdigger's Cage",why:'no casting spells from graveyards',hits:{'Hogaak, Arisen Necropolis':.8}},
  {card:'Karakas',why:'bounces a legendary creature',hits:{'Hogaak, Arisen Necropolis':.6}},
  {card:'Deafening Silence',why:'one noncreature spell per turn',hits:{'Thoughtseize':.15,'Duress':.15}}];
 // Their key permanents raise the cards that answer them: 0.25 × presence for each, as a share of the gap to 1 (Oracle text checked: Abrupt Decay
 // only reaches mana value 3 or less, so not Omniscience, Sneak Attack, Aluren, Mystic Forge or The One Ring).
 const ENCH=["Assassin's Trophy",'Force of Vigor','Chomping Changeling','Outland Liberator','Masked Vandal','Acidic Slime','Alpha Deathclaw'];
 const ARTI=["Assassin's Trophy",'Force of Vigor','Chomping Changeling','Outland Liberator','Masked Vandal','Acidic Slime','Seeds of Innocence','Alpha Deathclaw'];
 const KILL=['Snuff Out','Dismember','Fatal Push','Abrupt Decay',"Assassin's Trophy"];
 const KEYS=[
  {card:'Omniscience',why:'their win condition, an enchantment',by:ENCH},
  {card:'Sneak Attack',why:'an enchantment that wins the game',by:ENCH},
  {card:'Aluren',why:'their combo enchantment',by:ENCH},
  {card:'Mystic Forge',why:'their engine artifact',by:ARTI.concat(['Pithing Needle','Disruptor Flute'])},
  {card:'The One Ring',why:'their card-draw artifact',by:ARTI},
  {card:'Chalice of the Void',why:'a lock artifact',by:ARTI.concat(['Abrupt Decay'])},
  {card:'Ensnaring Bridge',why:'a lock artifact',by:ARTI},
  {card:'Dark Depths',why:'their win condition, a land',by:["Assassin's Trophy",'Fulminator Mage','Acidic Slime','Alpha Deathclaw','Pithing Needle','Disruptor Flute']},
  {card:"Urza's Saga",why:'a land that makes constructs and finds artifacts',by:["Assassin's Trophy",'Fulminator Mage','Acidic Slime','Alpha Deathclaw']},
  {card:'Containment Priest',why:'a white hate bear that stops Natural Order and Green Sun’s Zenith',by:KILL.concat(['Grist, the Hunger Tide'])},
  {card:'Clarion Conqueror',why:'a white hate bear that shuts off the dorks and the loop',by:KILL.concat(['Kraul Harpooner'])},
  {card:'Magus of the Moon',why:'turns our nonbasic lands into Mountains',by:KILL},
  {card:'Goblin Bombardment',why:'their sacrifice outlet that kills our dorks and closes games',by:ENCH.concat(['Abrupt Decay','Phyrexian Revoker','Disruptor Flute','Pithing Needle'])}];
 let EFF={},NOTES={};
 // Effective ratings for every card and matchup, and the interactions that changed them.
 function buildEff(){EFF={};NOTES={};
  ids.forEach(id=>{const seen=[];
   const pres=Object.fromEntries([...HATE,...KEYS].map(h=>[h.card,presence(id,h.card)]));
   CARDS.forEach(c=>{const base=+(ratings[c.name]||{})[id]||0;let bonus=0,mult=1;
    KEYS.forEach(k=>{const pr=pres[k.card];if(pr>.05&&k.by.includes(c.name))bonus+=.25*pr});
    HATE.forEach(h=>{const pr=pres[h.card],w=h.hits[c.name];if(pr>.05&&w)mult*=1-w*pr});
    // The bonus fills part of the gap to 1, so it never erases the order of the ratings (Snuff Out at 1 stays above Fatal Push).
    (EFF[c.name]||(EFF[c.name]={}))[id]=Math.round((base+(1-base)*Math.min(bonus,.5))*mult*100)/100;});
   [...HATE.map(h=>[h,'hate']),...KEYS.map(k=>[k,'key'])].forEach(([h,t])=>{const pr=pres[h.card];if(pr>.05&&!seen.includes(h.card)){seen.push(h.card);(NOTES[id]||(NOTES[id]=[])).push({card:h.card,pr,t,why:h.why})}});
  });}
 const rate=(c,id)=>EFF[c]?.[id]??(+(ratings[c]||{})[id]||0);
 // Room in each matchup: as many cards as our plan for it takes out (runkor: with four slots, six cards make no sense).
 const slotsOf=id=>{const p=DETAILS[id];const n=p.outCount||Object.values(p.outs||{}).reduce((a,b)=>a+b,0)||5;return Math.max(2,Math.min(8,n))};

 const PALETTE=['#78de99','#f0d77a','#7cc4f0','#f29b7c','#c49cf0','#5fd4c4','#e8b4d8','#a3c96b','#f0b35a','#9aa8f5','#d7e07a','#e07a8f'];
 const OURS=Object.fromEntries(CARDS.filter(c=>c.own).map(c=>[c.name,c.own]));
 // One card's own value, ignoring overlap with the rest of the fifteen.
 function score(sh){
  const tot=ids.reduce((a,id)=>a+sh[id],0);
  return CARDS.map(c=>{let sum=0,used=0;
   ids.forEach(id=>{const v=rate(c.name,id);sum+=sh[id]*v;if(v>0)used+=sh[id]});
   return {...c,mc:tot?sum/tot*100:0,ue:used?sum/used*100:0,field:used};
  }).sort((a,b)=>b.mc-a.mc);}
 // Bases (9 Oct 2026, under review with runkor):
 // 1. Worse matchups deserve more slots: each matchup weighs its field share × need, need = how often Elves loses it
 //    (MyMTGO's shrunk match win rate, 30 days) against Elves' overall rate. No row on MyMTGO: their "other" rate.
 // 2. Each matchup has room only for as many cards as our plan takes out there (slotsOf); the best-rated copies come
 //    in, each worth its rating, so a card that repeats a better one adds nothing once the room is full.
 // 3. Tutors: Green Sun's Zenith, Formidable Speaker and Natural Order can find a creature, so the best tutorable
 //    creature brought in counts TUTOR extra copies, once per matchup (the tutors are shared, not one set per card).
 // A model that valued each card by the chance of drawing it was tried and dropped: it rewards spreading single
 // copies (the first copy always adds the most), which is the opposite of what a sideboard needs.
 const TUTOR=1;
 const TUTORABLE=new Set(['Alpha Deathclaw','Chomping Changeling','Outland Liberator','Kraul Harpooner','Keen-Eyed Curator','Frenzied Baloth','Scavenging Ooze','Dryad Militant','Grist, the Hunger Tide','Hogaak, Arisen Necropolis','Masked Vandal','Acidic Slime','Faerie Macabre','Emperor of Bones','Opposition Agent','Fulminator Mage','Phyrexian Revoker']);
 // Value of a set of cards in one matchup; with parts=true it also returns each card's share (for the chart).
 // order: every card with a rating above 0 there, best first.
 function valueIn(order,count,room,parts,used){
  // Copies come in by value: the first copy of a tutorable creature is worth its rating plus the tutor copies, so it
  // is not pushed out of the room by an equal card that cannot be fetched. Only the best tutorable one gets the bonus.
  const items=[];for(const [c,r] of order){const n=count(c);if(!n)continue;const t=TUTORABLE.has(c);for(let k=0;k<n;k++)items.push([c,r,k===0&&t?r*(1+TUTOR):r])}
  items.sort((a,b)=>b[2]-a[2]);
  let total=0,tut=0,tutC=null;const seg=parts?new Map():null,seen=new Set();
  for(let i=0;i<items.length&&i<room;i++){const [c,r]=items[i];total+=r;if(parts)seg.set(c,(seg.get(c)||0)+r);if(used&&!seen.has(c)){seen.add(c);used(c)}
   if(TUTORABLE.has(c)&&r>tut){tut=r;tutC=c}}
  total+=tut*TUTOR;
  if(!parts)return total;
  if(tutC)seg.set(tutC,seg.get(tutC)+tut*TUTOR);
  return {total,seg:[...seg]};}
 const orderCache=new Map();
 function orderOf(id){if(!orderCache.has(id))orderCache.set(id,CARDS.map(c=>[c.name,rate(c.name,id)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]));return orderCache.get(id)}
 const MY_SLUG={'blue-tron':'mono-blue-tron','beanstalk':'white-beanstalk'};
 function winOf(id){const E=window.GOLDFISH_LIVE?.elves;if(!E)return null;
  const ms=MY_SLUG[id]||window.GOLDFISH_LIVE?.mymtgo?.[slugOf(id)]?.slug,row=ms&&E.rows?.[ms];
  return row?{win:row.shrunk,raw:row.win,n:row.matches,own:true}:{win:E.other?.win??E.win,n:E.other?.matches,own:false};}
 // runkor (9 Oct 2026): 15 cards for 100 % of the field is about 6.7 % each, so a card that only serves small matchups
 // must not take a slot; and no more than one slow, very focused card (Alpha Deathclaw, Acidic Slime).
 const MIN_FIELD=100/15,FOCUSED=new Set(['Alpha Deathclaw','Acidic Slime']);
 // Two schools of sideboarding: weigh each matchup by its field share alone (secure the matchups that are played most,
 // leave the bad ones a lottery), or by share × need (spend slots on the matchups Elves loses). The page shows both.
 const weightOf=id=>view.prio==='need'?needOf(id):1;
 function needOf(id){const E=window.GOLDFISH_LIVE?.elves,w=winOf(id);if(!E||!w||w.win==null)return 1;return (100-w.win)/(100-(E.win||60))}
 // One fifteen against one matchup, with each card's part of the value.
 function cover(set,id){const m=new Map(set);return valueIn(orderOf(id),c=>m.get(c)||0,slotsOf(id),true)}
 // The theoretical best fifteen: the one with the highest weighted coverage, Σ share × need × (value ÷ best value
 // known for that matchup). Search: build one copy at a time, then swap single copies while any swap improves it;
 // repeated from five more starts (each bans one of the five most-copied cards of the first answer); the best three different fifteens are kept.
 // No more than ROLE_CAP copies of one job.
 function bestFifteens(sh){
  const cols=ids.filter(id=>sh[id]>0),B=bestOf(sh),W=cols.map(id=>sh[id]*weightOf(id)),S=cols.map(slotsOf);
  const O=cols.map(orderOf);
  // The 7 % rule: a card is only worth a slot if the matchups where it actually comes in add up to MIN_FIELD of the field.
  const fit=pick=>{let f=0;const u=new Map();cols.forEach((id,j)=>{if(!B[id])return;f+=W[j]*Math.min(1,valueIn(O[j],c=>pick.get(c)||0,S[j],false,c=>u.set(c,(u.get(c)||0)+sh[id]))/B[id])});
   pick.forEach((n,c)=>{const got=u.get(c)||0;if(got<MIN_FIELD)f-=10+(MIN_FIELD-got)});return f};
  const roleN=(pick,role)=>{let n=0;pick.forEach((k,c)=>{if(ROLE[c]===role)n+=k});return n};
  const focusedN=pick=>{let n=0;pick.forEach((k,c)=>{if(FOCUSED.has(c))n+=k});return n};
  const canAdd=(pick,c,ban)=>c.name!==ban&&(pick.get(c.name)||0)<c.copies&&roleN(pick,ROLE[c.name])<ROLE_CAP&&!(FOCUSED.has(c.name)&&focusedN(pick)>=1);
  const add=(pick,n,d)=>{const k=(pick.get(n)||0)+d;if(k)pick.set(n,k);else pick.delete(n)};
  function run(ban){const pick=new Map();
   for(let k=0;k<15;k++){let bc=null,bf=-1;for(const c of CARDS){if(!canAdd(pick,c,ban))continue;add(pick,c.name,1);const f=fit(pick);add(pick,c.name,-1);if(f>bf){bf=f;bc=c.name}}if(!bc)break;add(pick,bc,1)}
   let cur=fit(pick);
   for(let it=0;it<40;it++){let move=null,mf=cur;
    for(const out of [...pick.keys()]){add(pick,out,-1);
     for(const c of CARDS){if(c.name===out||!canAdd(pick,c,null))continue;add(pick,c.name,1);const f=fit(pick);if(f>mf+1e-9){mf=f;move=[out,c.name]}add(pick,c.name,-1)}
     add(pick,out,1)}
    if(!move)break;add(pick,move[0],-1);add(pick,move[1],1);cur=mf}
   return {pick,f:cur}}
  const first=run(null),found=[first];[...first.pick].sort((a,b)=>b[1]-a[1]).slice(0,5).forEach(([b])=>found.push(run(b)));
  const key=r=>[...r.pick].sort().map(x=>x.join(':')).join('|'),seen=new Set();
  return found.sort((a,b)=>b.f-a.f).filter(r=>{const k=key(r);if(seen.has(k))return false;seen.add(k);return true}).slice(0,3)
   .map(r=>CARDS.filter(c=>r.pick.has(c.name)).map(c=>[c.name,r.pick.get(c.name)]).sort((a,b)=>b[1]-a[1]));}
 const bestCache=new WeakMap();
 function bestOf(sh){if(!bestCache.has(sh)){const pool=CARDS.map(c=>[c.name,c.copies]);bestCache.set(sh,Object.fromEntries(ids.map(id=>[id,cover(pool,id).total])))}return bestCache.get(sh)}
 // score: the weighted coverage the search maximises (0–100); covered: field share at COVER of the best answer or more.
 function stats(sh,set){
  const cols=ids.filter(id=>sh[id]>0).sort((a,b)=>sh[b]-sh[a]),field=cols.reduce((a,id)=>a+sh[id],0),B=bestOf(sh);
  const per=cols.map(id=>{const b=B[id],c=cover(set,id);return {id,share:sh[id],need:needOf(id),c,best:b,p:b?Math.min(1,c.total/b):1}});
  per.forEach(x=>x.w=weightOf(x.id));const wsum=per.reduce((a,x)=>a+x.share*x.w,0);
  return {per,field,covered:per.reduce((a,x)=>a+(x.p>=COVER-1e-9?x.share:0),0)/field*100,avg:per.reduce((a,x)=>a+x.share*x.p,0)/field*100,
   score:per.reduce((a,x)=>a+x.share*x.w*x.p,0)/wsum*100,
   used:(()=>{const u={};per.forEach(x=>x.c.seg.forEach(([c])=>u[c]=(u[c]||0)+x.share));return u})()};}
 // A card's worth inside the proposed fifteen, overlap included, in points of the score: lost if all its copies leave
 // and the best replacement copies come in; or added by the best single swap if it is out.
 function margins(sh,top){
  const base=stats(sh,top).score,inTop=Object.fromEntries(top),out={};
  const swap=(set,outN,inN)=>{const m=new Map(set);const k=(m.get(outN)||0)-1;if(k>0)m.set(outN,k);else m.delete(outN);m.set(inN,(m.get(inN)||0)+1);return [...m]};
  const ok=(set,n)=>{const c=CARDS.find(x=>x.name===n),have=(new Map(set)).get(n)||0;let r=0,fo=0;set.forEach(([m,k])=>{if(ROLE[m]===ROLE[n])r+=k;if(FOCUSED.has(m))fo+=k});return have<c.copies&&r<ROLE_CAP&&!(FOCUSED.has(n)&&fo>=1)};
  for(const c of CARDS){
   if(inTop[c.name]){let set=top.filter(([n])=>n!==c.name);
    for(let k=0;k<inTop[c.name];k++){let bestSet=null,bf=-1;for(const d of CARDS){if(d.name===c.name||!ok(set,d.name))continue;const t=set.concat([[d.name,1]]).reduce((m,[n,q])=>m.set(n,(m.get(n)||0)+q),new Map());const tt=[...t],f=stats(sh,tt).score;if(f>bf){bf=f;bestSet=tt}}if(bestSet)set=bestSet}
    out[c.name]={inTop:true,d:stats(sh,set).score-base};}
   else{let g=-Infinity;for(const [n] of top){const without=top.map(([m,k])=>[m,m===n?k-1:k]).filter(([,k])=>k>0);if(!ok(without,c.name))continue;g=Math.max(g,stats(sh,swap(top,n,c.name)).score-base)}out[c.name]={inTop:false,d:g===-Infinity?0:g};}}
  return out;}
 // The field as a strip: each matchup as wide as its share, as bright as the card's rating there.
 const strip=(sh,cols,field,name)=>`<span class="sbo-strip" aria-hidden="true">${cols.map(id=>{const v=rate(name,id);return `<i style="flex:${sh[id]/field};--v:${v}" title="${esc(short(id))} ${sh[id].toFixed(1)}%: ${v||'·'}"></i>`}).join('')}</span>`;
 const chip=(n,k,u)=>`<span class="sbo-card${OURS[n]?' is-ours':''}" title="Comes in against ${u?u.toFixed(1):0}% of the field"><img src="${esc(img(n))}" alt="" loading="lazy" width="30" height="42"><b>${k}</b> ${esc(n)}${OURS[n]?'<i class="sbo-ours">Ours</i>':''}<small>${u?u.toFixed(0):0}%</small></span>`;
 const roles=set=>{const m=new Map();set.forEach(([n,k])=>m.set(ROLE[n]||'Other',(m.get(ROLE[n]||'Other')||0)+k));return [...m].sort((a,b)=>b[1]-a[1]).map(([r,k])=>`<span>${esc(r)} <b>${k}</b></span>`).join('')};
 function chart(st,set){
  const names=set.map(x=>x[0]),col=n=>PALETTE[names.indexOf(n)%PALETTE.length];
  return `<p class="sbo-cov-key">${names.map(n=>`<span><i style="background:${col(n)}"></i>${esc(n)}</span>`).join('')}</p>
  <div class="sbo-cov">${st.per.map(x=>`<div class="sbo-cov-row"><div class="sbo-cov-name" title="${esc(DETAILS[x.id].name)}">${esc(short(x.id))}<small>${x.share.toFixed(1)}% · room ${slotsOf(x.id)} · ${(()=>{const w=winOf(x.id);return w&&w.win!=null?(w.own?'Elves wins '+Math.round(w.win)+'%':'no MyMTGO row: '+Math.round(w.win)+'%')+' · weight ×'+x.need.toFixed(2):''})()}</small>${(NOTES[x.id]||[]).length?`<small class="sbo-their" title="${esc(NOTES[x.id].map(n=>n.card+' ('+Math.round(n.pr*100)+'%): '+n.why).join('\n'))}">${NOTES[x.id].map(n=>`<span class="${n.t}">${esc(n.card)}</span>`).join(' ')}</small>`:''}</div>
   <div class="sbo-cov-bar" data-ok="${x.p>=COVER-1e-9}"><div class="sbo-cov-track">${x.c.seg.map(([n,v])=>`<span style="width:${v/Math.max(x.best||1,x.c.total)*100}%;background:${col(n)}" title="${esc(n)}: ${+v.toFixed(2)}"></span>`).join('')}<b class="sbo-cov-line"></b></div><em>${Math.round(x.p*100)}%</em></div></div>`).join('')}</div>`;}
 function render(){
  buildEff();orderCache.clear();
  const sh=shares(view.days),rows=score(sh),max=Math.max(...rows.map(r=>r.mc),1);
  const cols=ids.filter(id=>sh[id]>0).sort((a,b)=>sh[b]-sh[a]);
  const combos=bestFifteens(sh),top=combos[0],st=stats(sh,top);
  const miss=st.per.filter(x=>x.p<COVER-1e-9),mg=margins(sh,top),fieldAll=cols.reduce((a,id)=>a+sh[id],0);
  const topMC=rows[0],topUE=[...rows].filter(r=>r.mc<rows[0].mc*.5).sort((a,b)=>b.ue-a.ue)[0]||rows[0];
  // In the fifteen first (the biggest loss if cut on top), then the rest by what the best swap adds, then by MC.
  const ranked=[...rows].sort((a,b)=>(mg[b.name].inTop-mg[a.name].inTop)||(mg[a.name].inTop?mg[a.name].d-mg[b.name].d:mg[b.name].d-mg[a.name].d)||b.mc-a.mc);
  const delta=set=>{const a=Object.fromEntries(top),b=Object.fromEntries(set),out=[];new Set([...Object.keys(a),...Object.keys(b)]).forEach(n=>{const d=(b[n]||0)-(a[n]||0);if(d)out.push(`<span class="${d>0?'in':'out'}">${d>0?'+':'−'}${Math.abs(d)} ${esc(n)}</span>`)});return out.join('')};
  box.innerHTML=`<div class="sbo-bar"><div class="sbo-seg" role="group" aria-label="Field window">${[7,14,30].map(d=>`<button type="button" data-days="${d}" aria-pressed="${view.days===d}">${d} days</button>`).join('')}</div>
   <div class="sbo-seg" role="group" aria-label="Priority"><button type="button" data-prio="share" aria-pressed="${view.prio!=='need'}">Most played first</button><button type="button" data-prio="need" aria-pressed="${view.prio==='need'}">Worst matchups first</button></div></div>
  <p class="muted">Matchups in the map: ≈${ids.reduce((a,id)=>a+sh[id],0).toFixed(1)}% of the ${view.days}-day MTGO field, ${window.GOLDFISH_LIVE?'updated every night':'snapshot'} (${esc(typeof GOLDFISH_META_DATE!=='undefined'?GOLDFISH_META_DATE:'')}).${unplanned(view.days)}</p>
  <h3>Proposed theoretical best sideboard</h3>
  <p class="muted">The fifteen, among the ${CARDS.length} cards in the table, with the highest score. <b>Priority</b> (the switch above): “Most played first” weighs each matchup by its field share, to secure the matchups that are played most and leave the bad ones a lottery; “Worst matchups first” multiplies it by how often Elves loses that matchup (MyMTGO match win rate, 30 days). <b>Each matchup has room</b> only for as many cards as our plan takes out of the main deck there (3 to 8); the best-rated copies come in, so a card that repeats a better one adds nothing once the room is full, and no job takes more than ${ROLE_CAP} slots. <b>Every card must earn its slot</b>: fifteen cards for the whole field is about ${MIN_FIELD.toFixed(1)}% each, so a card is only kept if the matchups where it comes in add up to that share. <b>At most one slow, focused card</b> (Alpha Deathclaw or Acidic Slime). <b>Tutors count once</b>: the best tutorable creature in each matchup counts as ${TUTOR+1} copies. Ratings are adjusted for what the opponent plays (see Interactions). Change a rating below and the fifteen changes.</p>
  <div class="sbo-best"><div class="sbo-cards">${top.map(([n,k])=>chip(n,k,st.used[n])).join('')}</div>
   <div class="sbo-cov-sum"><div class="sug"><b>${st.score.toFixed(0)}</b><span>score (0–100): ${view.prio==='need'?'field share × need':'field share'} × share of the best answer</span></div><div><b>${st.covered.toFixed(0)}%</b><span>of the field at ${COVER*100}% of the best answer or more</span></div></div>
   <p class="sbo-roles">${roles(top)}</p>
   <p class="muted">${miss.length?'Below the line: '+miss.map(x=>`${esc(short(x.id))} ${Math.round(x.p*100)}% (${x.share.toFixed(1)}% of the field)`).join(' · ')+'.':'Every matchup in the map is covered.'}</p></div>
  ${combos.length>1?`<h3>Other strong combinations</h3><div class="sbo-alt">${combos.slice(1).map(set=>{const s2=stats(sh,set);return `<div><b>${s2.score.toFixed(1)}</b> score · ${s2.covered.toFixed(0)}% covered <span class="sbo-diff">${delta(set)}</span></div>`}).join('')}</div>`:''}
  <h3>Coverage of the proposed fifteen</h3><p class="muted">One bar per matchup, by field share. A full bar is the best answer known with that matchup’s room; the colours show what each card adds; the line is ${COVER*100}%. Under each name: its room, Elves’ win rate there (MyMTGO, shrunk towards the overall rate when there are few matches) and the weight it gets, then the opponent’s cards that change the ratings.</p>
  ${chart(st,top)}
  <h3>Interactions</h3><p class="muted">What the opponents play changes what our cards are worth. Presence comes from the nightly data: their MyMTGO reference main deck counts in full, otherwise the share of post-board games where they bring the card in. Hate lowers the cards it hits; a key permanent raises the cards that can answer it.</p>
  <div class="table-scroll"><table class="sbo-inter"><thead><tr><th scope="col">Their card</th><th scope="col">Effect</th><th scope="col">Our cards</th><th scope="col">Where (presence)</th></tr></thead><tbody>
  ${[...HATE.map(h=>[h,'hate',Object.entries(h.hits).map(([c,w])=>c+' −'+Math.round(w*100)+'%')]),...KEYS.map(k=>[k,'key',k.by.map(c=>c+' +')])].map(([h,t,ours])=>{const where=cols.map(id=>[id,presence(id,h.card)]).filter(([,pr])=>pr>.05);if(!where.length)return '';return `<tr class="${t}"><th scope="row">${esc(h.card)}</th><td>${t==='hate'?'Lowers':'Raises'}: ${esc(h.why)}</td><td>${ours.map(esc).join(', ')}</td><td>${where.map(([id,pr])=>esc(short(id))+' '+Math.round(pr*100)+'%').join(', ')}</td></tr>`}).join('')}
  </tbody></table></div>
  <h3>Card by card</h3><p class="muted">Each strip is the field, one block per matchup as wide as its share and as bright as the card’s rating there. The tag shows what the card is worth inside the proposed fifteen, with overlap, in points of the weighted score: how much is lost if it leaves (and the best replacements come in), or how much the best single swap would add if it came in.</p>
  <details class="sbo-about sbo-mcue"><summary>How to read MC and UE</summary>
   <p><b>MC, metagame coverage</b>: the card’s rating averaged over the whole field, each matchup weighted by its share. It answers “how much of the field does this card help?”. A card rated 1 against everything would score 100.</p>
   <p><b>UE, use efficiency</b>: the same average, but only over the matchups where the card comes in. It answers “when I bring it in, how strong is it?”.</p>
   <p>Read them together. High MC: a generalist that helps against many decks (${esc(topMC.name)}: MC ${topMC.mc.toFixed(0)}, UE ${topMC.ue.toFixed(0)}). Low MC with high UE: a specialist, excellent against a few decks (${esc(topUE.name)}: MC ${topUE.mc.toFixed(0)}, UE ${topUE.ue.toFixed(0)}). Both measure one card alone: two removal spells can each have a high MC and still do the same job, which is why the proposed fifteen and the tags here count overlap.</p></details>
  <ol class="sbo-rank">${ranked.map(r=>{const m=mg[r.name];return `<li class="${OURS[r.name]?'is-ours':''}"><img src="${esc(img(r.name))}" alt="" loading="lazy" width="42" height="58"><div class="sbo-who"><b>${esc(r.name)}</b><small>${OURS[r.name]?'<span class="sbo-ours">Ours · '+OURS[r.name]+'</span> · ':''}${esc(ROLE[r.name]||'')} · in ${r.lists} of ${SPEAKER_LISTS} Speaker sideboards</small>${strip(sh,cols,fieldAll,r.name)}</div>
   <div class="sbo-num"><span class="sbo-tag ${m.inTop?'in':m.d>0.05?'gain':'none'}">${m.inTop?'In the fifteen · '+(m.d<-0.05?m.d.toFixed(1)+' pts if cut':'replaceable'):m.d>0.05?'Best swap +'+m.d.toFixed(1)+' pts':'Adds nothing now'}</span><span title="Metagame coverage"><b>${r.mc.toFixed(0)}</b> MC</span><span title="Use efficiency"><b>${r.ue.toFixed(0)}</b> UE</span><span title="Share of the field where it comes in"><b>${r.field.toFixed(1)}%</b> field</span></div></li>`}).join('')}</ol>
  <h3>Ratings</h3><p class="muted">Click a cell to raise its rating, right-click or Shift+click to lower it. Columns are matchups by field share; a gold dot marks a changed rating; a small arrow shows that the opponent’s cards raise or lower it (hover for the adjusted value).</p>
  <div class="table-scroll sbo-scroll"><table class="sbo-grid"><thead><tr><th scope="col">Card</th>${cols.map(id=>`<th scope="col" title="${esc(DETAILS[id].name)}"><span>${esc(short(id))}</span><small>${sh[id].toFixed(1)}%</small></th>`).join('')}</tr></thead>
  <tbody>${rows.map(r=>`<tr><th scope="row">${esc(r.name)}</th>${cols.map(id=>{const v=+(ratings[r.name]||{})[id]||0,d=+(DEFAULT[r.name]||{})[id]||0,e=rate(r.name,id),adj=e>v+.04?'up':e<v-.04?'down':'';return `<td><button type="button" data-card="${esc(r.name)}" data-id="${id}" style="--v:${v}" data-v="${v}" class="${v!==d?'changed':''}${adj?' adj-'+adj:''}" title="${adj?'After their cards: '+e:''}" aria-label="${esc(r.name)} against ${esc(DETAILS[id].name)}: ${v}${adj?', '+e+' after their cards':''}">${fmt(v)}</button></td>`}).join('')}</tr>`).join('')}</tbody></table></div>
  <div class="sbo-actions"><button type="button" class="btn" data-act="export">Export ratings (JSON)</button><button type="button" class="btn" data-act="reset">Reset to the guide’s ratings</button><span class="sbo-msg" role="status"></span></div>`;}
 const STEPS=[0,.25,.5,.75,1];
 function step(card,id,dir){const r=ratings[card]||(ratings[card]={});const i=STEPS.indexOf(+r[id]||0);const n=STEPS[Math.max(0,Math.min(4,i+dir))];if(n)r[id]=n;else delete r[id];save(KEY,ratings);render();
  box.querySelector(`button[data-card="${CSS.escape(card)}"][data-id="${id}"]`)?.focus();}
 box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.days){view.days=+b.dataset.days;save(VIEW,view);render();return}
  if(b.dataset.prio){view.prio=b.dataset.prio;save(VIEW,view);render();return}
  if(b.dataset.card){step(b.dataset.card,b.dataset.id,e.shiftKey?-1:1);return}
  if(b.dataset.act==='reset'){ratings=clone(DEFAULT);try{localStorage.removeItem(KEY)}catch(err){}render();box.querySelector('.sbo-msg').textContent='Ratings reset.';return}
  if(b.dataset.act==='export'){const txt=JSON.stringify(ratings,null,1);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'application/json'}));a.download='speaker-elves-sideboard-ratings.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
   navigator.clipboard?.writeText(txt).then(()=>{box.querySelector('.sbo-msg').textContent='Saved and copied to the clipboard.'},()=>{});}});
 box.addEventListener('contextmenu',e=>{const b=e.target.closest('button[data-card]');if(!b)return;e.preventDefault();step(b.dataset.card,b.dataset.id,-1)});
 // The search takes a few hundred milliseconds: run it only once the optimizer is on screen, not on every page load.
 const pane=document.getElementById('optimizer');
 if(pane&&pane.offsetParent)render();
 else if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();render()}});io.observe(box)}
 else render();
})();
