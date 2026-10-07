// RC37: independent combo tabs, embedded Scryfall cards, and optional step guides.
const COMBO_CARD_ART={"Natural Order": {"src": "assets/279cd6eac53c.jpg", "url": "https://scryfall.com/card/vis/114/natural-order?utm_source=api", "artist": "Terese Nielsen", "cost": "{2}{G}{G}", "edition": "Visions · 114"}, "Gaea's Cradle": {"src": "assets/1a0313d734a4.jpg", "url": "https://scryfall.com/card/usg/321/gaeas-cradle?utm_source=api", "artist": "Mark Zug", "cost": ""}, "Badgermole Cub": {"src": "assets/200e3d70ae3c.jpg", "url": "https://scryfall.com/card/tla/167/badgermole-cub?utm_source=api", "artist": "Nathaniel Himawan", "cost": "{1}{G}"}, "Formidable Speaker": {"src": "assets/2a79d7c3fc7b.jpg", "url": "https://scryfall.com/card/ecl/176/formidable-speaker?utm_source=api", "artist": "Aurore Folny", "cost": "{2}{G}"}, "Wirewood Symbiote": {"src": "assets/96866c087967.jpg", "url": "https://scryfall.com/card/scg/133/wirewood-symbiote?utm_source=api", "artist": "Thomas M. Baxa", "cost": "{G}", "edition": "Scourge · 133"}, "Quirion Ranger": {"src": "assets/8acda01b10b9.jpg", "url": "https://scryfall.com/card/vis/117/quirion-ranger?utm_source=api", "artist": "Tom Kyffin", "cost": "{G}", "edition": "Visions · 117"}, "Temur Sabertooth": {"src": "assets/c1b0dcd4609f.jpg", "url": "https://scryfall.com/card/ncc/315/temur-sabertooth?utm_source=api", "artist": "Mike Sass", "cost": "{2}{G}{G}"}, "Craterhoof Behemoth": {"src": "assets/142ea736fb2f.jpg", "url": "https://scryfall.com/card/inr/480/craterhoof-behemoth?utm_source=api", "artist": "Chris Rahn", "cost": "{5}{G}{G}{G}", "edition": "Innistrad Remastered · 480"}, "Elvish Visionary": {"src": "assets/305a7309939f.jpg", "url": "https://scryfall.com/card/ala/130/elvish-visionary?utm_source=api", "artist": "D. Alexander Gregory", "cost": "{1}{G}", "edition": "Shards of Alara · 130"}, "Llanowar Elves": {"src": "assets/35324aed5b6c.jpg", "url": "https://scryfall.com/card/7ed/253%E2%98%85/llanowar-elves?utm_source=api", "artist": "Jerry Tiritilli", "cost": "{G}", "edition": "Seventh Edition · 253★"}, "T": {"src": "assets/3210162fb4ad.svg"}, "Q": {"src": "assets/4db2294dbe37.svg"}, "Dryad Arbor": {"src": "assets/d0627bb0641d.jpg", "url": "https://scryfall.com/card/fut/174/dryad-arbor?utm_source=api", "artist": "Eric Fortune", "cost": "", "edition": "Future Sight · 174"}, "Boseiju, Who Endures": {"src": "assets/19461359f081.jpg", "url": "https://scryfall.com/card/neo/266/boseiju-who-endures?utm_source=api", "artist": "Chris Ostrowski", "cost": ""}, "Bayou": {"src": "assets/dc517e6bff93.jpg", "url": "https://scryfall.com/card/leb/279/bayou?utm_source=api", "artist": "Jesper Myrfors", "cost": "", "edition": "Limited Edition Beta · 279"}, "Wooded Foothills": {"src": "assets/4763b3c16509.jpg", "url": "https://scryfall.com/card/ons/330/wooded-foothills?utm_source=api", "artist": "Rob Alexander", "cost": "", "edition": "Onslaught · 330"}, "Forest": {"src": "assets/455b595478f4.jpg", "url": "https://scryfall.com/card/pgru/5/forest?utm_source=api", "artist": "Terese Nielsen", "cost": "", "edition": "Guru · 5"}, "Misty Rainforest": {"src": "assets/0a3af96e0e96.jpg", "url": "https://scryfall.com/card/mh2/438/misty-rainforest?utm_source=api", "artist": "Shelly Wan", "cost": "", "edition": "Modern Horizons 2 · 438"}, "Windswept Heath": {"src": "assets/dd9d9c1587b2.jpg", "url": "https://scryfall.com/card/ons/328/windswept-heath?utm_source=api", "artist": "Anthony S. Waters", "cost": "", "edition": "Onslaught · 328"}, "Elvish Mystic": {"src": "assets/c02d208b40d9.jpg", "url": "https://scryfall.com/card/tsr/360/elvish-mystic?utm_source=api", "artist": "Wesley Burt", "cost": "{G}", "edition": "Time Spiral Remastered · 360"}, "Allosaurus Shepherd": {"src": "assets/f71a42d5b74e.jpg", "url": "https://scryfall.com/card/2x2/132/allosaurus-shepherd?utm_source=api", "artist": "Randy Vargas", "cost": "{G}"}, "Collector Ouphe": {"src": "assets/e111a39ae56a.jpg", "url": "https://scryfall.com/card/mh1/158/collector-ouphe?utm_source=api", "artist": "Filip Burburan", "cost": "{1}{G}"}, "Eladamri, Korvecdal": {"src": "assets/b496beebd878.jpg", "url": "https://scryfall.com/card/mh3/149/eladamri-korvecdal?utm_source=api", "artist": "Zoltan Boros", "cost": "{1}{G}{G}"}, "Fyndhorn Elves": {"src": "assets/66c98461b805.jpg", "url": "https://scryfall.com/card/ice/244/fyndhorn-elves?utm_source=api", "artist": "Justin Hampton", "cost": "{G}", "edition": "Ice Age · 244"}, "Vibrance": {"src": "assets/3eddeb95151e.jpg", "url": "https://scryfall.com/card/ecl/249/vibrance?utm_source=api", "artist": "Jakub Kasper", "cost": "{3}{R/G}{R/G}"}, "Once Upon a Time": {"src": "assets/90fc0426e730.jpg", "url": "https://scryfall.com/card/eld/169/once-upon-a-time?utm_source=api", "artist": "Matt Stewart", "cost": "{1}{G}"}, "Atraxa, Grand Unifier": {"src": "assets/56a50ed354bd.jpg", "url": "https://scryfall.com/card/one/196/atraxa-grand-unifier?utm_source=api", "artist": "Marta Nael", "cost": "{3}{G}{W}{U}{B}"}, "Snuff Out": {"src": "assets/2a7bd1c67169.jpg", "url": "https://scryfall.com/card/mmq/162/snuff-out?utm_source=api", "artist": "Mike Ploog", "cost": "{3}{B}", "edition": "Mercadian Masques · 162"}, "Thoughtseize": {"src": "assets/8f1bf3fff348.jpg", "url": "https://scryfall.com/card/tsr/334/thoughtseize?utm_source=api", "artist": "Aleksi Briclot", "cost": "{B}", "edition": "Time Spiral Remastered · 334"}, "Green Sun's Zenith": {"src": "assets/8236cd1731fc.jpg", "url": "https://scryfall.com/card/prm/99683/green-suns-zenith?utm_source=api", "artist": "David Rapoza", "cost": "{X}{G}", "edition": "Magic Online Promos · 99683"}, "Leyline of the Void": {"src": "assets/92a2c362d3dd.jpg", "url": "https://scryfall.com/card/tsr/326/leyline-of-the-void?utm_source=api", "artist": "Adam Rex", "cost": "{2}{B}{B}", "edition": "Time Spiral Remastered · 326"}, "Endurance": {"src": "assets/12eb99d7975d.jpg", "url": "https://scryfall.com/card/h2r/14/endurance?utm_source=api", "artist": "Anastasia Ovchinnikova", "cost": "{1}{G}{G}", "edition": "Modern Horizons 2 Timeshifts · 14"}, "Choke": {"src": "assets/223130c9c821.jpg", "url": "https://scryfall.com/card/tmp/219/choke?utm_source=api", "artist": "Terese Nielsen", "cost": "{2}{G}", "edition": "Tempest · 219"}, "Force of Vigor": {"src": "assets/2cbc225e4a65.jpg", "url": "https://scryfall.com/card/h1r/21/force-of-vigor?utm_source=api", "artist": "Randy Vargas", "cost": "{2}{G}{G}", "edition": "Modern Horizons 1 Timeshifts · 21"}, "Hogaak, Arisen Necropolis": {"src": "assets/a34cbc81afa3.jpg", "url": "https://scryfall.com/card/mh1/202/hogaak-arisen-necropolis?utm_source=api", "artist": "Vincent Proce", "cost": "{5}{B/G}{B/G}"}, "Grist, the Hunger Tide": {"src": "assets/c6425e1e7f19.jpg", "url": "https://scryfall.com/card/dsc/220/grist-the-hunger-tide?utm_source=api", "artist": "Yongjae Choi", "cost": "{1}{B}{G}"}, "Gaddock Teeg": {"src": "assets/0564f10b44e8.jpg", "url": "https://scryfall.com/card/uma/199/gaddock-teeg?utm_source=api", "artist": "Greg Staples", "cost": "{G}{W}"}, "X": {"src": "assets/bd9d61fbf7f5.svg"}, "Verdant Catacombs": {"src": "assets/0277e61efd39.jpg", "url": "https://scryfall.com/card/mh2/440/verdant-catacombs?utm_source=api", "artist": "Vance Kovacs", "cost": "", "edition": "Modern Horizons 2 · 440"}};
COMBO_CARD_ART['Marwyn, the Preserver']={src:'https://api.scryfall.com/cards/fra/263?format=image&version=normal',url:'https://scryfall.com/card/fra/263/marwyn-the-preserver',cost:'{1}{G}',edition:'Reality Fracture · 263'};
COMBO_CARD_ART['Chomping Changeling']={src:'https://api.scryfall.com/cards/ecl/172?format=image&version=normal',url:'https://scryfall.com/card/ecl/172/chomping-changeling',cost:'{2}{G}',edition:'Lorwyn Eclipsed · 172'};
// 5 Oct 2026 sideboard additions (images saved locally from Scryfall).
COMBO_CARD_ART["Assassin's Trophy"]={src:'assets/assassins-trophy.jpg',url:'https://scryfall.com/card/soc/294/assassins-trophy',artist:'Dmitry Burmak',cost:'{B}{G}',edition:'Secrets of Strixhaven Commander · 294'};
COMBO_CARD_ART['Primaris Eliminator']={src:'assets/primaris-eliminator.jpg',url:'https://scryfall.com/card/40k/50/primaris-eliminator',artist:'Logan Feliciano',cost:'{4}{B}',edition:'Warhammer 40,000 Commander · 50'};
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
  const img=document.createElement('img');img.src=data.src;img.alt=name;img.loading='lazy';btn.append(img);
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
