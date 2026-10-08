// Matchups: the most played MTGGoldfish archetypes (14-day share) are the decks this guide tracks.
// Each card shows one pairing: its share, trend, sideboard plan (DETAILS in js/01.js) and, when the
// nightly refresh is present (js/meta-live.js), the opponent's most common sideboard cards on MTGO.
// An archetype in the top list without a written plan still gets a card, marked as such.
(function matchupCards(){
 const host=document.getElementById('matchup-cards');if(!host)return;
 const TRACKED=13;
 const live=window.GOLDFISH_LIVE;
 const slugOf=url=>url.replace(/.*archetype\//,'').replace(/#.*/,'');
 const shortSlug=slug=>slug.replace(/^legacy-/,'').replace(/-[0-9a-f]{8}-[0-9a-f-]{27,}$/,'');
 // Key card art (Scryfall art crops, credited on each card): by guide plan, or by archetype.
 const ART={
  'ub-moon':{card:'Moonshadow',artist:'Mizugoromaru'},
  'ub-legends':{card:'Tamiyo, Inquisitive Student',artist:'Evyn Fong'},
  'eldrazi':{card:'Thought-Knot Seer',artist:'Svetlin Velinov'},
  'sewer-cam':{card:'Goblin Welder',artist:'Scott M. Fischer'},
  'doomsday':{card:'Doomsday',artist:'Noah Bradley'},
  'ur-cutter':{card:'Cori-Steel Cutter',artist:'Tomas Duchek'},
  'dnt':{card:'Thalia, Guardian of Thraben',artist:'Magali Villeneuve'},
  'beanstalk':{card:'Up the Beanstalk',artist:'Lucas Graciano'},
  'aluren':{card:'Aluren',artist:'April Lee'},
  'blue-tron':{card:"Urza's Tower",artist:'Mark Tedin'},
  'energy':{card:'Guide of Souls',artist:'Ryan Valle'},
  'lands':{card:'Dark Depths',artist:'Rob Alexander'},
  'sneak':{card:'Show and Tell',artist:'Jeff Laubenstein'},
  'boros-energy':{card:'Ocelot Pride',artist:'Chris Seaman'},
  'jeskai-tempo':{card:'Quantum Riddler',artist:'Cacho Rubione'},
  'the-epic-storm':{card:'Burning Wish',artist:'Scott M. Fischer'}
 };

 // Guide plans for each MTGGoldfish archetype (two plans can share one archetype).
 const plansBySlug={};
 for(const id of Object.keys(DETAILS))for(const s of (GOLDFISH_META[id]?.['14']?.sources||[])){
  const slug=slugOf(s.url);(plansBySlug[slug]=plansBySlug[slug]||[]).includes(id)||plansBySlug[slug].push(id);}

 // The tracked archetypes: from the nightly refresh when present, otherwise from the dated snapshot.
 let top;
 if(live?.windows?.['14']){
  top=Object.entries(live.windows['14']).sort((a,b)=>b[1].share-a[1].share).slice(0,TRACKED).map(([slug,row])=>({slug,name:row.name,card:row.card}));
 }else{
  const seen=new Map();
  for(const id of Object.keys(DETAILS))for(const s of (GOLDFISH_META[id]?.['14']?.sources||[])){
   const slug=slugOf(s.url);if(!seen.has(slug))seen.set(slug,{slug,name:s.label,share:s.share||0});}
  top=[...seen.values()].filter(x=>x.share>0).sort((a,b)=>b.share-a.share).slice(0,TRACKED);
 }

 const pct=(slug,w)=>{const r=live?.windows?.[w]?.[slug];return r?r.share.toFixed(1)+'%':'—';};
 const list=obj=>Object.entries(obj||{}).sort((a,b)=>b[1]-a[1]).map(([name,n])=>`<li><b>${n}</b> ${esc(name)}</li>`).join('');
 const theirList=slug=>(live?.sideboards?.[slug]||[]).slice(0,6).map(c=>`<li title="${esc(c.avg)} copies on average"><b>${Math.round(c.pct)}%</b> ${esc(c.card)}</li>`).join('');

 // Traffic-light alarms. red = yes, amber = sometimes / only after sideboarding, green = no, grey = no data.
 const COUNTERS=/Force of Will|Force of Negation|Daze|Counterspell|Mana Drain|Flusterstorm|Spell Pierce|Stern Scolding|Mindbreak Trap|Mystical Dispute|Memory Lapse|Warping Wail|Consign to Memory|Stifle|Spell Snare|Miscalculation|Swan Song|Veil of Summer/i;
 const SWEEPERS=/Massacre|Wrath of the Skies|Toxic Deluge|Fury|Terminus|Supreme Verdict|Engineered Explosives|Pyroclasm|Anger of the Gods|Kozilek's Return|Eldrazi Confluence|Brotherhood's End|Sheoldred's Edict|Hyperfrag|Holy Light|Echoing Truth/i;
 // Decks without a plan: colours from the guild or shard in their MTGGoldfish name.
 const NAME_COLORS={Azorius:'WU',Dimir:'UB',Rakdos:'BR',Gruul:'RG',Selesnya:'GW',Orzhov:'WB',Izzet:'UR',Golgari:'BG',Boros:'RW',Simic:'GU',
  Esper:'WUB',Grixis:'UBR',Jund:'BRG',Naya:'RGW',Bant:'GWU',Abzan:'WBG',Jeskai:'URW',Sultai:'BGU',Mardu:'RWB',Temur:'GUR','Mono-Blue':'U','Mono-Red':'R','Mono-Black':'B','Mono-Green':'G','Mono-White':'W'};
 const nameColors=slug=>{const n=(live?.windows?.['14']?.[slug]?.name||shortSlug(slug)).toLowerCase();const k=Object.keys(NAME_COLORS).find(k=>n.includes(k.toLowerCase()));return k?NAME_COLORS[k]:'';};
 const colorsOf=(planId,slug)=>planId?(MATCH_COLORS[planId]||''):nameColors(slug);
 const textOf=(planId,slug)=>[...(planId?(DETAILS[planId].opp||[]):[]),planId?(DETAILS[planId].notes||''):'',...(live?.sideboards?.[slug]||[]).map(c=>c.card)].join(' | ');
 function alarms(planId,slug){
  const p=planId?DETAILS[planId]:null,known=!!p||!!live?.sideboards?.[slug],txt=textOf(planId,slug),blue=colorsOf(planId,slug).includes('U');
  const waste=!p?['grey','?','No plan yet']:p.wasteland==='YES'?['red','Yes','They play Wasteland']:p.wasteland==='NO'?['green','No','No Wasteland']:['amber','Mixed','Depends on the list'];
  const counter=!known&&!colorsOf(planId,slug)?['grey','?','No data']:blue?['red','Yes','Blue deck: expect Force of Will and other counters in the main deck']:COUNTERS.test(txt)?['amber','Side','Counters only after sideboarding']:['green','No','No counter magic recorded'];
  const sweep=p?.sweep?.length?['red','Yes','Sweepers: '+p.sweep.join(', ')]:SWEEPERS.test(txt)?['amber','Side','Sweepers in their sideboard']:known?['green','No','No sweepers recorded']:['grey','?','No data'];
  const light=(name,[tone,val,tip])=>`<li class="mu-alarm ${tone}" title="${esc(tip)}"><span class="mu-dot" aria-hidden="true"></span><span>${name}</span><b>${val}</b></li>`;
  return `<ul class="mu-alarms" aria-label="Alarms">${light('Wasteland',waste)}${light('Counters',counter)}${light('Sweepers',sweep)}</ul>`;
 }
 const artFor=(planId,slug)=>{const key=ART[planId]?planId:shortSlug(slug);const a=ART[key];return a?{...a,src:`assets/matchups/${key}.jpg`}:null;};

 function card(rank,slug,archName,planId){
  const p=planId?DETAILS[planId]:null,art=artFor(planId,slug);
  const meta=planId?GOLDFISH_META[planId]:null;
  const trend=meta?metaTrend(meta):(()=>{const a=live?.windows?.['7']?.[slug]?.share,b=live?.windows?.['30']?.[slug]?.share;if(a==null||b==null)return {state:'unknown',text:'—',title:'No comparable 7-day and 30-day data.'};const d=Math.round((a-b)*10)/10;return {state:d>0?'up':d<0?'down':'flat',text:(d>0?'↑ +':d<0?'↓ ':'→ ')+d.toFixed(1),title:'7d − 30d, percentage points'};})();
  const val=w=>meta?esc(meta[w]?.label||'—'):pct(slug,w);
  const watch=p?(p.opp||[]).slice(0,3).map(esc).join(' · '):'';
  return `<article class="mu-card${p?'':' mu-unplanned'}">
   <div class="mu-art">${art?`<img src="${art.src}" alt="" loading="lazy" decoding="async">`:''}<span class="mu-rank">#${rank}</span></div>
   <div class="mu-body">
    <div class="mu-head"><h3>${esc(p?p.name:archName)}</h3>${p?`<span class="rolepill ${esc(p.role.toLowerCase())}">${esc(p.role)}</span>`:'<span class="mu-noplan">Plan not written yet</span>'}</div>
    <p class="mu-arch">${esc(archName)}${p?.macro?' · '+esc(p.macro):''}</p>
    <dl class="mu-meta"><div><dt>7d</dt><dd>${val('7')}</dd></div><div><dt>14d</dt><dd>${val('14')}</dd></div><div><dt>30d</dt><dd>${val('30')}</dd></div><div title="${esc(trend.title)}"><dt>Trend</dt><dd class="trend-${trend.state}">${esc(trend.text)}</dd></div></dl>
    <div class="mu-cols">
     <div class="mu-col"><h4 class="mu-in">IN${p?' '+p.inCount:''}</h4>${p?`<ul>${list(p.ins)}</ul>`:'<p class="mu-empty">No plan yet</p>'}</div>
     <div class="mu-col"><h4 class="mu-out">OUT${p?' '+p.outCount:''}</h4>${p?`<ul>${list(p.outs)}</ul>`:'<p class="mu-empty">No plan yet</p>'}</div>
     <div class="mu-col"><h4 class="mu-opp">Their SB</h4>${live?.sideboards?.[slug]?.length?`<ul>${theirList(slug)}</ul>`:(!live&&watch?`<p class="mu-empty">${watch}</p>`:'<p class="mu-empty">No data</p>')}</div>
    </div>
    ${alarms(planId,slug)}
    ${p?`<div class="mu-foot"><button type="button" class="mu-open" data-id="${esc(planId)}">Full plan</button></div>`:''}
    ${art?`<p class="mu-credit">Art: ${esc(art.card)} by ${esc(art.artist)}</p>`:''}
   </div></article>`;
 }

 const cards=[];
 top.forEach((t,i)=>{const plans=plansBySlug[t.slug]||[];if(plans.length)plans.forEach(id=>cards.push(card(i+1,t.slug,t.name,id)));else cards.push(card(i+1,t.slug,t.name,null));});
 host.innerHTML=`<p class="mu-source">MTGGoldfish · MTGO · ${live?'updated '+esc(live.updatedLabel):'snapshot '+esc(GOLDFISH_META_DATE)} · top ${TRACKED} archetypes by 14-day share.${live?' “Their SB” lists the cards most often found in their published MTGO 75s (share of decks), not what they side in against Elves.':''}</p>
 <div class="mu-grid">${cards.join('')}</div>`;
 host.addEventListener('click',e=>{const b=e.target.closest('.mu-open');if(b)openMatch(b.dataset.id);});
})();
