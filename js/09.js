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
 const chips=obj=>Object.entries(obj||{}).sort((a,b)=>b[1]-a[1]).map(([name,n])=>`<span class="mu-chip">${n}× ${esc(name)}</span>`).join('');
 const theirBoard=slug=>{
  const cards=(live?.sideboards?.[slug]||[]).slice(0,5);
  return cards.length?`<p class="mu-watch"><b>Their sideboard</b> ${cards.map(c=>`<span class="mu-chip mu-opp" title="${esc(c.avg)} copies on average">${esc(c.card)} <small>${Math.round(c.pct)}%</small></span>`).join('')}</p>`:'';
 };
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
    ${p?`<div class="mu-plan"><p><b class="mu-in">IN ${p.inCount}</b>${chips(p.ins)}</p><p><b class="mu-out">OUT ${p.outCount}</b>${chips(p.outs)}</p></div>`:''}
    ${theirBoard(slug)}
    ${!live&&watch?`<p class="mu-watch"><b>Watch for</b> ${watch}</p>`:''}
    ${p?`<div class="mu-foot"><span>Wasteland ${esc(p.wasteland||'MIX')}${p.sweep?.length?' · <span class="mu-sweep">Sweepers</span>':''}</span><button type="button" class="mu-open" data-id="${esc(planId)}">Full plan</button></div>`:''}
    ${art?`<p class="mu-credit">Art: ${esc(art.card)} by ${esc(art.artist)}</p>`:''}
   </div></article>`;
 }

 const cards=[];
 top.forEach((t,i)=>{const plans=plansBySlug[t.slug]||[];if(plans.length)plans.forEach(id=>cards.push(card(i+1,t.slug,t.name,id)));else cards.push(card(i+1,t.slug,t.name,null));});
 host.innerHTML=`<p class="mu-source">MTGGoldfish · MTGO · ${live?'updated '+esc(live.updatedLabel):'snapshot '+esc(GOLDFISH_META_DATE)} · top ${TRACKED} archetypes by 14-day share.${live?' “Their sideboard” lists the cards most often found in their published MTGO 75s (share of decks), not what they side in against Elves.':''}</p>
 <div class="mu-grid">${cards.join('')}</div>`;
 host.addEventListener('click',e=>{const b=e.target.closest('.mu-open');if(b)openMatch(b.dataset.id);});
})();
