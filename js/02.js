// RC37: independent combo tabs, embedded Scryfall cards, and optional step guides.
const COMBO_CARD_ART={"Natural Order": {"src": "assets/279cd6eac53c.webp", "url": "https://scryfall.com/card/vis/114/natural-order?utm_source=api", "artist": "Terese Nielsen", "cost": "{2}{G}{G}", "edition": "Visions · 114"}, "Gaea's Cradle": {"src": "assets/1a0313d734a4.webp", "url": "https://scryfall.com/card/usg/321/gaeas-cradle?utm_source=api", "artist": "Mark Zug", "cost": ""}, "Badgermole Cub": {"src": "assets/200e3d70ae3c.webp", "url": "https://scryfall.com/card/tla/167/badgermole-cub?utm_source=api", "artist": "Nathaniel Himawan", "cost": "{1}{G}"}, "Formidable Speaker": {"src": "assets/2a79d7c3fc7b.webp", "url": "https://scryfall.com/card/ecl/176/formidable-speaker?utm_source=api", "artist": "Aurore Folny", "cost": "{2}{G}"}, "Wirewood Symbiote": {"src": "assets/96866c087967.webp", "url": "https://scryfall.com/card/scg/133/wirewood-symbiote?utm_source=api", "artist": "Thomas M. Baxa", "cost": "{G}", "edition": "Scourge · 133"}, "Quirion Ranger": {"src": "assets/8acda01b10b9.webp", "url": "https://scryfall.com/card/vis/117/quirion-ranger?utm_source=api", "artist": "Tom Kyffin", "cost": "{G}", "edition": "Visions · 117"}, "Temur Sabertooth": {"src": "assets/temur-sabertooth.webp", "url": "https://scryfall.com/card/frf/141/temur-sabertooth", "artist": "Mike Sass", "cost": "{2}{G}{G}", "edition": "Fate Reforged · 141"}, "Craterhoof Behemoth": {"src": "assets/craterhoof-behemoth.webp", "url": "https://scryfall.com/card/avr/172/craterhoof-behemoth", "artist": "Chris Rahn", "cost": "{5}{G}{G}{G}", "edition": "Avacyn Restored · 172"}, "Elvish Visionary": {"src": "assets/305a7309939f.webp", "url": "https://scryfall.com/card/ala/130/elvish-visionary?utm_source=api", "artist": "D. Alexander Gregory", "cost": "{1}{G}", "edition": "Shards of Alara · 130"}, "Llanowar Elves": {"src": "assets/llanowar-elves.webp", "url": "https://scryfall.com/card/lea/210/llanowar-elves", "artist": "Anson Maddocks", "cost": "{G}", "edition": "Limited Edition Alpha · 210"}, "T": {"src": "assets/3210162fb4ad.svg"}, "Q": {"src": "assets/4db2294dbe37.svg"}, "Dryad Arbor": {"src": "assets/d0627bb0641d.webp", "url": "https://scryfall.com/card/fut/174/dryad-arbor?utm_source=api", "artist": "Eric Fortune", "cost": "", "edition": "Future Sight · 174"}, "Boseiju, Who Endures": {"src": "assets/19461359f081.webp", "url": "https://scryfall.com/card/neo/266/boseiju-who-endures?utm_source=api", "artist": "Chris Ostrowski", "cost": ""}, "Bayou": {"src": "assets/bayou.webp", "url": "https://scryfall.com/card/lea/278/bayou", "artist": "Jesper Myrfors", "cost": "", "edition": "Limited Edition Alpha · 278"}, "Savannah": {"src": "assets/savannah.webp", "url": "https://scryfall.com/card/lea/280/savannah", "artist": "Rob Alexander", "cost": "", "edition": "Limited Edition Alpha · 280"}, "Wooded Foothills": {"src": "assets/4763b3c16509.webp", "url": "https://scryfall.com/card/ons/330/wooded-foothills?utm_source=api", "artist": "Rob Alexander", "cost": "", "edition": "Onslaught · 330"}, "Forest": {"src": "assets/forest.webp", "url": "https://scryfall.com/card/lea/294/forest", "artist": "Christopher Rush", "cost": "", "edition": "Limited Edition Alpha · 294"}, "Misty Rainforest": {"src": "assets/misty-rainforest.webp", "url": "https://scryfall.com/card/zen/220/misty-rainforest", "artist": "Shelly Wan", "cost": "", "edition": "Zendikar · 220"}, "Windswept Heath": {"src": "assets/dd9d9c1587b2.webp", "url": "https://scryfall.com/card/ons/328/windswept-heath?utm_source=api", "artist": "Anthony S. Waters", "cost": "", "edition": "Onslaught · 328"}, "Elvish Mystic": {"src": "assets/elvish-mystic.webp", "url": "https://scryfall.com/card/m14/169/elvish-mystic", "artist": "Wesley Burt", "cost": "{G}", "edition": "Magic 2014 · 169"}, "Allosaurus Shepherd": {"src": "assets/allosaurus-shepherd.webp", "url": "https://scryfall.com/card/jmp/28/allosaurus-shepherd", "artist": "Randy Vargas", "cost": "{G}", "edition": "Jumpstart · 28"}, "Collector Ouphe": {"src": "assets/e111a39ae56a.webp", "url": "https://scryfall.com/card/mh1/158/collector-ouphe?utm_source=api", "artist": "Filip Burburan", "cost": "{1}{G}"}, "Eladamri, Korvecdal": {"src": "assets/b496beebd878.webp", "url": "https://scryfall.com/card/mh3/149/eladamri-korvecdal?utm_source=api", "artist": "Zoltan Boros", "cost": "{1}{G}{G}"}, "Fyndhorn Elves": {"src": "assets/66c98461b805.webp", "url": "https://scryfall.com/card/ice/244/fyndhorn-elves?utm_source=api", "artist": "Justin Hampton", "cost": "{G}", "edition": "Ice Age · 244"}, "Vibrance": {"src": "assets/3eddeb95151e.webp", "url": "https://scryfall.com/card/ecl/249/vibrance?utm_source=api", "artist": "Jakub Kasper", "cost": "{3}{R/G}{R/G}"}, "Once Upon a Time": {"src": "assets/90fc0426e730.webp", "url": "https://scryfall.com/card/eld/169/once-upon-a-time?utm_source=api", "artist": "Matt Stewart", "cost": "{1}{G}"}, "Atraxa, Grand Unifier": {"src": "assets/56a50ed354bd.webp", "url": "https://scryfall.com/card/one/196/atraxa-grand-unifier?utm_source=api", "artist": "Marta Nael", "cost": "{3}{G}{W}{U}{B}"}, "Snuff Out": {"src": "assets/2a7bd1c67169.webp", "url": "https://scryfall.com/card/mmq/162/snuff-out?utm_source=api", "artist": "Mike Ploog", "cost": "{3}{B}", "edition": "Mercadian Masques · 162"}, "Thoughtseize": {"src": "assets/thoughtseize.webp", "url": "https://scryfall.com/card/lrw/145/thoughtseize", "artist": "Aleksi Briclot", "cost": "{B}", "edition": "Lorwyn · 145"}, "Green Sun's Zenith": {"src": "assets/green-suns-zenith.webp", "url": "https://scryfall.com/card/mbs/81/green-suns-zenith", "artist": "David Rapoza", "cost": "{X}{G}", "edition": "Mirrodin Besieged · 81"}, "Leyline of the Void": {"src": "assets/leyline-of-the-void.webp", "url": "https://scryfall.com/card/gpt/52/leyline-of-the-void", "artist": "Adam Rex", "cost": "{2}{B}{B}", "edition": "Guildpact · 52"}, "Endurance": {"src": "assets/endurance.webp", "url": "https://scryfall.com/card/mh2/157/endurance", "artist": "Anastasia Ovchinnikova", "cost": "{1}{G}{G}", "edition": "Modern Horizons 2 · 157"}, "Choke": {"src": "assets/223130c9c821.webp", "url": "https://scryfall.com/card/tmp/219/choke?utm_source=api", "artist": "Terese Nielsen", "cost": "{2}{G}", "edition": "Tempest · 219"}, "Force of Vigor": {"src": "assets/force-of-vigor.webp", "url": "https://scryfall.com/card/mh1/164/force-of-vigor", "artist": "Randy Vargas", "cost": "{2}{G}{G}", "edition": "Modern Horizons · 164"}, "Hogaak, Arisen Necropolis": {"src": "assets/a34cbc81afa3.webp", "url": "https://scryfall.com/card/mh1/202/hogaak-arisen-necropolis?utm_source=api", "artist": "Vincent Proce", "cost": "{5}{B/G}{B/G}"}, "Grist, the Hunger Tide": {"src": "assets/grist-the-hunger-tide.webp", "url": "https://scryfall.com/card/mh2/202/grist-the-hunger-tide", "artist": "Yongjae Choi", "cost": "{1}{B}{G}", "edition": "Modern Horizons 2 · 202"}, "Gaddock Teeg": {"src": "assets/gaddock-teeg.webp", "url": "https://scryfall.com/card/lrw/248/gaddock-teeg", "artist": "Greg Staples", "cost": "{G}{W}", "edition": "Lorwyn · 248"}, "X": {"src": "assets/bd9d61fbf7f5.svg"}, "Verdant Catacombs": {"src": "assets/verdant-catacombs.webp", "url": "https://scryfall.com/card/zen/229/verdant-catacombs", "artist": "Vance Kovacs", "cost": "", "edition": "Zendikar · 229"}};
COMBO_CARD_ART['Marwyn, the Preserver']={src:'assets/marwyn-the-preserver.webp',url:'https://scryfall.com/card/fra/263/marwyn-the-preserver',artist:'Quintin Gleim',cost:'{1}{G}',edition:'Reality Fracture · 263'};
COMBO_CARD_ART['Chomping Changeling']={src:'assets/chomping-changeling.webp',url:'https://scryfall.com/card/ecl/172/chomping-changeling',artist:'Jeff Laubenstein',cost:'{2}{G}',edition:'Lorwyn Eclipsed · 172'};
// 5 Oct 2026 sideboard additions (images saved locally from Scryfall).
COMBO_CARD_ART["Assassin's Trophy"]={src:'assets/assassins-trophy.webp',url:'https://scryfall.com/card/grn/152/assassins-trophy',artist:'Seb McKinnon',cost:'{B}{G}',edition:'Secrets of Strixhaven Commander · 294'};
COMBO_CARD_ART['Primaris Eliminator']={src:'assets/primaris-eliminator.webp',url:'https://scryfall.com/card/40k/50/primaris-eliminator',artist:'Logan Feliciano',cost:'{4}{B}',edition:'Warhammer 40,000 Commander · 50'};
(function enhanceComboGuides(){
 const panes=['combo-no','speaker-t2-kills','combo-loop'].map(id=>document.getElementById(id));
 const symbol=(key,label)=>{const img=document.createElement('img');img.className='combo37-symbol';img.src=key==='G'?MANA_ICONS.G:COMBO_CARD_ART[key].src;img.alt=label;img.title=label;return img;};
 // Replace mana shorthand only in text nodes; leave card names and attributes intact.
 panes.forEach(pane=>{
  const walker=document.createTreeWalker(pane,NodeFilter.SHOW_TEXT);const nodes=[];
  while(walker.nextNode())if(!walker.currentNode.parentElement.closest('script,style,.combo36-mana'))nodes.push(walker.currentNode);
  nodes.forEach(node=>{
   const text=node.textContent;const pattern=/\bG+\b|\b(?:[Uu]ntap|[Tt]ap)\b/g;
   if(!pattern.test(text))return;pattern.lastIndex=0;const frag=document.createDocumentFragment();let last=0;
   for(const m of text.matchAll(pattern)){frag.append(text.slice(last,m.index));
    if(/^G+$/.test(m[0]))for(const x of m[0])frag.append(symbol('G','Green mana'));
    else{frag.append(symbol(m[0].toLowerCase()==='tap'?'T':'Q',m[0]+' action'));frag.append(' '+m[0]);}
    last=m.index+m[0].length;
   }frag.append(text.slice(last));node.replaceWith(frag);
  });
 });
 const dialog=document.createElement('dialog');dialog.className='combo37-dialog';
 dialog.innerHTML='<button type="button" class="combo37-close">Close ×</button><img class="combo37-large" alt=""><p class="combo37-credit"></p><a target="_blank" rel="noopener">View card on Scryfall ↗</a>';
 document.body.append(dialog);
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 let returnFocus=null;dialog.addEventListener('close',()=>returnFocus?.focus());
 function cardButton(name,mini=false){
  const data=COMBO_CARD_ART[name],btn=document.createElement('button');btn.type='button';btn.className='combo37-card'+(mini?' mini':'');btn.title='View '+name;btn.setAttribute('aria-label','View '+name);
  const img=document.createElement('img');img.src=data.src;img.alt=name;img.width=488;img.height=680;img.loading='lazy';img.decoding='async';btn.append(img);
  if(!mini){const label=document.createElement('span');label.textContent=name;btn.append(label);}
  btn.onclick=()=>{returnFocus=btn;dialog.querySelector('img').src=data.src;dialog.querySelector('img').alt=name;dialog.querySelector('a').href=data.url;dialog.querySelector('.combo37-credit').textContent=name+' · Art: '+data.artist+' · © Wizards of the Coast';dialog.showModal();};return btn;
 }

 // RC38: printed costs and card zoom for every Current 75 entry.
 document.querySelectorAll('#deck .deckrow').forEach(row=>{
  const cell=row.children[1],name=cell.textContent.trim(),card=COMBO_CARD_ART[name];
  if(!card)return;
  const button=cardButton(name);button.className='deck38-card';
  button.querySelector(':scope > img')?.remove();
  const label=button.querySelector('span');label.className='deck38-label';label.replaceChildren();
  const costs=document.createElement('span');costs.className='deck38-cost';
  const symbols=[...card.cost.matchAll(/\{([^}]+)\}/g)].map(m=>m[1]);
  symbols.forEach(key=>{const img=document.createElement('img');img.src=MANA_ICONS[key]||COMBO_CARD_ART[key]?.src;img.alt='{'+key+'}';img.title='{'+key+'}';costs.append(img);});
  if(symbols.length)label.append(costs);
  const title=document.createElement('span');title.className='deck38-name';title.textContent=name;label.append(title);
  const zoom=document.createElement('span');zoom.className='deck38-zoom';zoom.textContent='⌕';zoom.setAttribute('aria-hidden','true');button.append(zoom);
  cell.replaceChildren(button);
 });
 const tip=document.createElement('p');tip.className='muted deck38-tip';tip.textContent='Printed mana costs · Click a name to zoom · Lands have no mana cost.';document.querySelector('#deck .deckgrid').before(tip);

 const sets={
  'combo-no':['Natural Order',"Gaea's Cradle",'Badgermole Cub','Quirion Ranger'],
  'speaker-t2-kills':['Formidable Speaker','Wirewood Symbiote','Quirion Ranger','Temur Sabertooth',"Gaea's Cradle",'Badgermole Cub'],
  'combo-loop':['Temur Sabertooth','Wirewood Symbiote','Formidable Speaker',"Gaea's Cradle",'Craterhoof Behemoth','Elvish Visionary']
 };
 panes.forEach(pane=>{
  const strip=document.createElement('div');strip.className='combo37-gallery';sets[pane.id].forEach(n=>strip.append(cardButton(n)));pane.querySelector('h2').after(strip);
  const legend=document.createElement('p');legend.className='muted combo37-legend';legend.append('Click a card to enlarge. ',symbol('T','Tap'),' tap · ',symbol('Q','Untap'),' untap. Action icons illustrate the sequence; they do not add activation costs.');strip.after(legend);
 });
 const aliases=[['Sabertooth','Temur Sabertooth'],['Symbiote','Wirewood Symbiote'],['Speaker','Formidable Speaker'],['Quirion','Quirion Ranger'],['Hoof','Craterhoof Behemoth'],['Cradle',"Gaea's Cradle"]];
 document.querySelectorAll('.combo35-node').forEach(node=>{const title=node.querySelector('h4').textContent;const name=aliases.find(([alias])=>title.includes(alias))?.[1];if(name){const art=cardButton(name,true);node.prepend(art);}});
 document.querySelectorAll('.combo35-flow').forEach((flow,index)=>{
  const steps=[...flow.children];if(!steps.length)return;
  const controls=document.createElement('div');controls.className='combo37-controls';controls.innerHTML='<button type="button">Previous</button><span aria-live="polite"></span><button type="button">Next step</button><button type="button">Show all</button>';
  flow.before(controls);const [prev,next,all]=controls.querySelectorAll('button');const status=controls.querySelector('span');let current=-1;
  function update(){steps.forEach((step,i)=>{step.classList.toggle('combo37-current',i===current);step.classList.toggle('combo37-muted',current>=0&&i!==current);});status.textContent=current<0?'All '+steps.length+' steps':'Step '+(current+1)+' / '+steps.length;prev.disabled=current<=0;next.disabled=current===steps.length-1;}
  prev.onclick=()=>{current=Math.max(0,current-1);update();};next.onclick=()=>{current=Math.min(steps.length-1,current+1);update();};all.onclick=()=>{current=-1;update();};update();
 });
 document.querySelectorAll('a[href="#combo-loop"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showGuideTab('goldfish');document.querySelector('#goldfish button[data-mode="loop"]').click();document.getElementById('goldfish').scrollIntoView?.({block:'start'});}));
})();
