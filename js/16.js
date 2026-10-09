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
  {name:'Fatal Push',copies:2,lists:1,cand:true}];
 const DEFAULT={
  'Thoughtseize':{doomsday:1,tes:1,sneak:.75,aluren:.75,oops:.75,'mono-rean':.75,'ub-rean':.75,'key-ring':.75,'blue-tron':.75,beanstalk:.5,'jeskai-control':.5,stoneblade:.25},
  'Snuff Out':{'boros-energy':1,eldrazi:1,energy:1,initiative:.75,'8moon':.75,'8cast':.75,dnt:.75,'gb-mole':.75,'sewer-cam':.75,'ur-cutter':.5,'uw-stifle':.5,'ub-legends':.5,stoneblade:.25,'bg-gaak':.25},
  'Leyline of the Void':{'bg-gaak':1,'mono-rean':1,'ub-rean':1,oops:1,lands:.75,'sewer-cam':.75,'ub-moon':.5},
  'Choke':{'ub-moon':.75,'ub-legends':.75,'ur-cutter':.75,'uw-stifle':.75,stoneblade:.75,'jeskai-control':.75,beanstalk:.5,sneak:.5,doomsday:.5,aluren:.25},
  "Assassin's Trophy":{aluren:.75,lands:.75,eldrazi:.75,'key-ring':.75,'blue-tron':.5,sneak:.5,doomsday:.5,dnt:.5,'boros-energy':.5,'8moon':.5,initiative:.5,'8cast':.5,'sewer-cam':.5,'ur-cutter':.25,oops:.25,tes:.25,energy:.25},
  'Alpha Deathclaw':{aluren:.5,dnt:.5,lands:.5,'gb-mole':.5,'ub-moon':.25,'ub-legends':.25,'boros-energy':.25},
  'Force of Vigor':{aluren:.75,lands:.75,'key-ring':.75,'8cast':.75,'8moon':.75,sneak:.5,oops:.5,eldrazi:.5,'sewer-cam':.5,dnt:.25,doomsday:.25,tes:.25},
  'Endurance':{oops:.75,doomsday:.75,'mono-rean':.5,'ub-rean':.5,'sewer-cam':.5,'bg-gaak':.25,'ur-cutter':.25,lands:.25},
  // Uncounterable; nonland permanents of mana value 3 or less (not Aluren or Sneak Attack, which cost four).
  'Abrupt Decay':{dnt:.75,'8moon':.75,'ub-moon':.5,'ub-legends':.5,'ur-cutter':.5,'uw-stifle':.5,eldrazi:.5,initiative:.5,energy:.5,'boros-energy':.5,'8cast':.5,'key-ring':.5,stoneblade:.5,'sewer-cam':.25,aluren:.25,sneak:.25,'gb-mole':.25,doomsday:.25},
  'Dismember':{'ur-cutter':.75,'boros-energy':.75,energy:.75,eldrazi:.75,'ub-moon':.5,'ub-legends':.5,initiative:.5,'8moon':.5,dnt:.5,'8cast':.5,'uw-stifle':.25,'sewer-cam':.25,'gb-mole':.25},
  // Names one card: spells cost {3} more and its non-mana abilities stop (Thassa's Oracle, Sneak Attack, Mystic Forge, Thespian's Stage).
  'Disruptor Flute':{doomsday:.5,sneak:.5,lands:.5,'key-ring':.5,aluren:.25,tes:.25,oops:.25,'blue-tron':.25,stoneblade:.25,dnt:.25,'gb-mole':.25,'8cast':.25},
  // A second plan from the sideboard: free to cast with convoke and delve, it beats counters and sorcery-speed removal.
  'Hogaak, Arisen Necropolis':{'ub-moon':.5,'ub-legends':.5,'jeskai-control':.5,beanstalk:.5,stoneblade:.5,'gb-mole':.5,'ur-cutter':.25,'uw-stifle':.25},
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
  'Fatal Push':{'boros-energy':.75,energy:.75,'ub-moon':.5,'ub-legends':.5,'ur-cutter':.5,initiative:.5,eldrazi:.5,'8moon':.5,dnt:.25,'8cast':.25,'uw-stifle':.25}};
 const KEY='sbo-ratings-v1',VIEW='sbo-view-v1';
 const load=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
 const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
 const clone=o=>JSON.parse(JSON.stringify(o));
 let ratings=Object.assign(clone(DEFAULT),load(KEY)||{});
 let view=Object.assign({days:14,cands:true},load(VIEW)||{});
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
 const boardedIn=c=>ids.filter(id=>DETAILS[id].ins?.[c]);
 function score(sh){
  const tot=ids.reduce((a,id)=>a+sh[id],0);
  return CARDS.filter(c=>view.cands||!c.cand).map(c=>{const r=ratings[c.name]||{};let sum=0,used=0;
   ids.forEach(id=>{const v=+r[id]||0;sum+=sh[id]*v;if(v>0)used+=sh[id]});
   return {...c,mc:tot?sum/tot*100:0,ue:used?sum/used*100:0,field:used,plans:boardedIn(c.name)};
  }).sort((a,b)=>b.mc-a.mc);}
 // Suggested 15: one copy at a time, always the copy that adds the most. In each matchup only the best SLOTS copies
 // count, and the value is how close they get to the best answer known (see cover), counted fully up to COVER and at
 // a tenth beyond it: the pick first brings every matchup up to the line, then strengthens the big ones.
 const SLOTS=7;
 // Coverage of one fifteen against one matchup: its best SLOTS copies, each worth its rating, grouped by card,
 // measured against the best SLOTS copies from every card in the pool (the best answer known). A matchup at COVER
 // (75 %) of that best answer or more counts as covered.
 const COVER=.75,PALETTE=['#78de99','#f0d77a','#7cc4f0','#f29b7c','#c49cf0','#5fd4c4','#e8b4d8','#a3c96b','#f0b35a','#9aa8f5','#d7e07a','#e07a8f'];
 function cover(set,id){const v=[];set.forEach(([c,n])=>{const r=+(ratings[c]||{})[id]||0;for(let i=0;i<n;i++)if(r>0)v.push([c,r])});
  v.sort((a,b)=>b[1]-a[1]);const seg=new Map();v.slice(0,SLOTS).forEach(([c,r])=>seg.set(c,(seg.get(c)||0)+r));
  return {seg:[...seg],total:[...seg.values()].reduce((a,b)=>a+b,0)};}
 function coverage(sh,cur,sug){
  const cols=ids.filter(id=>sh[id]>0).sort((a,b)=>sh[b]-sh[a]),field=cols.reduce((a,id)=>a+sh[id],0);
  const pool=CARDS.filter(c=>view.cands||!c.cand).map(c=>[c.name,c.copies]),best=Object.fromEntries(cols.map(id=>[id,cover(pool,id).total]));
  const names=CARDS.map(c=>c.name).filter(n=>cur.some(x=>x[0]===n)||sug.some(x=>x[0]===n)),col=n=>PALETTE[names.indexOf(n)%PALETTE.length];
  const part=(set,id)=>best[id]?cover(set,id).total/best[id]:1;
  const avg=set=>cols.reduce((a,id)=>a+sh[id]*part(set,id),0)/field*100;
  const ok=set=>cols.reduce((a,id)=>a+(part(set,id)>=COVER-1e-9?sh[id]:0),0)/field*100;
  const bar=(set,label,id)=>{const c=cover(set,id),b=best[id]||1,p=part(set,id);return `<div class="sbo-cov-bar" data-ok="${p>=COVER-1e-9}"><i>${label}</i><div class="sbo-cov-track">${c.seg.map(([n,v])=>`<span style="width:${v/b*100}%;background:${col(n)}" title="${esc(n)}: ${v}"></span>`).join('')}<b class="sbo-cov-line"></b></div><em>${Math.round(p*100)}%</em></div>`};
  return `<div class="sbo-cov-sum"><div><b>${ok(cur).toFixed(0)}%</b><span>of the field covered now · average ${avg(cur).toFixed(0)}% of the best answer</span></div><div class="sug"><b>${ok(sug).toFixed(0)}%</b><span>covered by the suggested fifteen · average ${avg(sug).toFixed(0)}%</span></div></div>
  <p class="sbo-cov-key">${names.map(n=>`<span><i style="background:${col(n)}"></i>${esc(n)}</span>`).join('')}</p>
  <div class="sbo-cov">${cols.map(id=>`<div class="sbo-cov-row"><div class="sbo-cov-name" title="${esc(DETAILS[id].name)}">${esc(short(id))}<small>${sh[id].toFixed(1)}% of the field</small></div><div>${bar(cur,'Now',id)}${bar(sug,'Suggested',id)}</div></div>`).join('')}</div>`;}
 function suggest(sh){
  const all=CARDS.filter(c=>view.cands||!c.cand),pick=new Map();
  const best=Object.fromEntries(ids.map(id=>[id,cover(all.map(c=>[c.name,c.copies]),id).total]));
  const val=id=>{if(!best[id])return 0;const v=[];pick.forEach((n,c)=>{const r=+(ratings[c]||{})[id]||0;for(let i=0;i<n;i++)v.push(r)});
   const p=v.sort((a,b)=>b-a).slice(0,SLOTS).reduce((a,b)=>a+b,0)/best[id];return Math.min(p,COVER)+.1*Math.max(0,p-COVER)};
  const total=()=>ids.reduce((a,id)=>a+sh[id]*val(id),0);
  for(let k=0;k<15;k++){let bestCard=null,gain=0;const base=total();
   for(const c of all){const n=pick.get(c.name)||0;if(n>=c.copies)continue;pick.set(c.name,n+1);const g=total()-base;if(n)pick.set(c.name,n);else pick.delete(c.name);if(g>gain+1e-9){gain=g;bestCard=c.name}}
   if(!bestCard)break;pick.set(bestCard,(pick.get(bestCard)||0)+1);}
  return CARDS.filter(c=>pick.has(c.name)).map(c=>[c.name,pick.get(c.name)]).sort((a,b)=>b[1]-a[1]);}
 function render(){
  const sh=shares(view.days),rows=score(sh),max=Math.max(...rows.map(r=>r.mc),1);
  const cols=ids.filter(id=>sh[id]>0).sort((a,b)=>sh[b]-sh[a]);
  const sug=suggest(sh),cur=Object.fromEntries(CARDS.filter(c=>!c.cand).map(c=>[c.name,c.own]));
  const diff=[];new Set([...Object.keys(cur),...sug.map(s=>s[0])]).forEach(n=>{const d=(sug.find(s=>s[0]===n)?.[1]||0)-(cur[n]||0);if(d)diff.push(`<span class="${d>0?'in':'out'}">${d>0?'+':'−'}${Math.abs(d)} ${esc(n)}</span>`)});
  const flag=r=>!r.cand&&r.field>0&&!r.plans.length?'<span class="sbo-flag">Rated, but no plan boards it in</span>':!r.cand&&r.plans.length&&r.mc<5?'<span class="sbo-flag">Little use: check it still earns its slot</span>':'';
  box.innerHTML=`<div class="sbo-bar"><div class="sbo-seg" role="group" aria-label="Field window">${[7,14,30].map(d=>`<button type="button" data-days="${d}" aria-pressed="${view.days===d}">${d} days</button>`).join('')}</div>
   <div class="sbo-seg" role="group" aria-label="Cards shown"><button type="button" data-cands="0" aria-pressed="${!view.cands}">Sideboard</button><button type="button" data-cands="1" aria-pressed="${view.cands}">+ Speaker sideboard cards</button></div></div>
  <h3>Ranking</h3><p class="muted">Field covered by the matchups in the map: ≈${ids.reduce((a,id)=>a+sh[id],0).toFixed(1)}% of the ${view.days}-day MTGO field, ${window.GOLDFISH_LIVE?'updated every night':'snapshot'} (${esc(typeof GOLDFISH_META_DATE!=='undefined'?GOLDFISH_META_DATE:'')}).${unplanned(view.days)}</p>
  <ol class="sbo-rank">${rows.map(r=>`<li class="${r.cand?'':'is-ours'}"><img src="${esc(img(r.name))}" alt="" loading="lazy" width="42" height="58"><div class="sbo-who"><b>${esc(r.name)}</b><small>${r.cand?'Candidate':'<span class="sbo-ours">Ours · '+r.own+'</span>'} · in ${r.lists} of ${SPEAKER_LISTS} Speaker sideboards${r.cand?'':' · boarded in '+r.plans.length+' plan'+(r.plans.length===1?'':'s')}</small>${flag(r)}</div>
   <div class="sbo-num"><span class="sbo-meter" style="--w:${(r.mc/max*100).toFixed(1)}%"></span><span title="Metagame coverage"><b>${r.mc.toFixed(0)}</b> MC</span><span title="Use efficiency"><b>${r.ue.toFixed(0)}</b> UE</span><span title="Share of the field where it comes in"><b>${r.field.toFixed(1)}%</b> field</span></div></li>`).join('')}</ol>
  <h3>Suggested fifteen</h3><p class="muted">Built one copy at a time, always the copy that adds the most covered field: first every matchup up to the coverage line, weighted by its share, then the big ones past it. Each matchup has room for ${SLOTS} sideboard cards, so a card that repeats the job of better ones adds little. A prompt for testing, not a list.</p>
  <p class="sbo-sug">${sug.map(([n,k])=>`<span>${k} ${esc(n)}</span>`).join('')}</p>
  <p class="sbo-diff">${diff.length?'Against the current sideboard: '+diff.join(''):'Same fifteen as the current sideboard.'}</p>
  <h3>Coverage</h3><p class="muted">How close each fifteen gets, in every matchup, to the best answer known: the best ${SLOTS} copies from every card in the table. A full bar is that best answer; the colours show what each card adds. A matchup at ${COVER*100}% or more (the line) counts as covered.</p>
  ${coverage(sh,Object.entries(cur),sug)}
  <h3>Ratings</h3><p class="muted">Click a cell to raise its rating, right-click or Shift+click to lower it. Columns are matchups by field share; a dot marks a changed rating.</p>
  <div class="table-scroll sbo-scroll"><table class="sbo-grid"><thead><tr><th scope="col">Card</th>${cols.map(id=>`<th scope="col" title="${esc(DETAILS[id].name)}"><span>${esc(short(id))}</span><small>${sh[id].toFixed(1)}%</small></th>`).join('')}</tr></thead>
  <tbody>${rows.map(r=>`<tr><th scope="row">${esc(r.name)}</th>${cols.map(id=>{const v=+(ratings[r.name]||{})[id]||0,d=+(DEFAULT[r.name]||{})[id]||0;return `<td><button type="button" data-card="${esc(r.name)}" data-id="${id}" style="--v:${v}" data-v="${v}" class="${v!==d?'changed':''}" aria-label="${esc(r.name)} against ${esc(DETAILS[id].name)}: ${v}">${fmt(v)}</button></td>`}).join('')}</tr>`).join('')}</tbody></table></div>
  <div class="sbo-actions"><button type="button" class="btn" data-act="export">Export ratings (JSON)</button><button type="button" class="btn" data-act="reset">Reset to the guide’s ratings</button><span class="sbo-msg" role="status"></span></div>`;}
 const STEPS=[0,.25,.5,.75,1];
 function step(card,id,dir){const r=ratings[card]||(ratings[card]={});const i=STEPS.indexOf(+r[id]||0);const n=STEPS[Math.max(0,Math.min(4,i+dir))];if(n)r[id]=n;else delete r[id];save(KEY,ratings);render();
  box.querySelector(`button[data-card="${CSS.escape(card)}"][data-id="${id}"]`)?.focus();}
 box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.days){view.days=+b.dataset.days;save(VIEW,view);render();return}
  if(b.dataset.cands){view.cands=b.dataset.cands==='1';save(VIEW,view);render();return}
  if(b.dataset.card){step(b.dataset.card,b.dataset.id,e.shiftKey?-1:1);return}
  if(b.dataset.act==='reset'){ratings=clone(DEFAULT);try{localStorage.removeItem(KEY)}catch(err){}render();box.querySelector('.sbo-msg').textContent='Ratings reset.';return}
  if(b.dataset.act==='export'){const txt=JSON.stringify(ratings,null,1);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'application/json'}));a.download='speaker-elves-sideboard-ratings.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
   navigator.clipboard?.writeText(txt).then(()=>{box.querySelector('.sbo-msg').textContent='Saved and copied to the clipboard.'},()=>{});}});
 box.addEventListener('contextmenu',e=>{const b=e.target.closest('button[data-card]');if(!b)return;e.preventDefault();step(b.dataset.card,b.dataset.id,-1)});
 render();
})();
