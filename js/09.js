// Matchups: the most played MTGGoldfish archetypes (14-day share) are the decks this guide tracks.
// Each card shows one pairing: its share, trend, sideboard plan (DETAILS in js/01.js) and, when the
// nightly refresh is present (js/meta-live.js), the opponent's most common sideboard cards on MTGO.
// An archetype in the top list without a written plan still gets a card, marked as such.
(function matchupCards(){
 const host=document.getElementById('matchup-cards');if(!host)return;
 const TRACKED=15; // the whole first MTGGoldfish metagame page (runkor, 9 Oct 2026)
 const live=window.GOLDFISH_LIVE;
 const slugOf=url=>url.replace(/.*archetype\//,'').replace(/#.*/,'');
 const shortSlug=slug=>slug.replace(/^legacy-/,'').replace(/-[0-9a-f]{8}-[0-9a-f-]{27,}$/,'');
 // Key card art (Scryfall art crops, credited on each card): by guide plan, or by archetype.
 const ART={
  'ub-moon':{card:'Moonshadow',artist:'Olivier Bernard',y:35},
  'ub-legends':{card:'Tamiyo, Inquisitive Student',artist:'Jana Schirmer & Johannes Voss',y:24},
  'eldrazi':{card:'Thought-Knot Seer',artist:'Svetlin Velinov',y:42},
  'sewer-cam':{card:'Goblin Welder',artist:'Scott M. Fischer',y:45},
  'doomsday':{card:'Doomsday',artist:'Adrian Smith',y:45},
  'ur-cutter':{card:'Cori-Steel Cutter',artist:'Xabi Gaztelua',y:40},
  'dnt':{card:'Thalia, Guardian of Thraben',artist:'Magali Villeneuve',y:17},
  'beanstalk':{card:'Up the Beanstalk',artist:'Lucas Graciano',y:40},
  'aluren':{card:'Aluren',artist:'April Lee',y:40},
  'blue-tron':{card:"Urza's Tower",artist:'Mark Poole',y:35},
  'energy':{card:'Guide of Souls',artist:'Ryan Valle',y:28},
  'lands':{card:'Dark Depths',artist:'Stephan Martiniere',y:50},
  'sneak':{card:'Show and Tell',artist:'Jeff Laubenstein',y:24},
  'boros-energy':{card:'Ocelot Pride',artist:'Chris Seaman',y:42},
  'jeskai-tempo':{card:'Quantum Riddler',artist:'Izzy',y:40},
  'the-epic-storm':{card:'Burning Wish',artist:'Scott M. Fischer',y:24},
  'omni-tell':{card:'Omniscience',artist:'Jason Chan',y:62},
  'azorius-tempo':{card:'Phelia, Exuberant Shepherd',artist:'Rudy Siswanto',y:36},
  'mirror':{card:'Heritage Druid',artist:'Larry MacDougall',y:18}
 };

 // Guide plans for each MTGGoldfish archetype (two plans can share one archetype).
 const plansBySlug={};
 for(const id of Object.keys(DETAILS))for(const s of (GOLDFISH_META[id]?.['14']?.sources||[])){
  const slug=slugOf(s.url);(plansBySlug[slug]=plansBySlug[slug]||[]).includes(id)||plansBySlug[slug].push(id);}

 // The same matchups as the Sideboard map (runkor, 9 Oct 2026): every plan, which covers the whole MTGGoldfish top 15
 // plus the fixed extras (Cradle Control, the mirror, UB Legends…), from the most played to the least (14-day share,
 // nightly refresh). Two plans that share one archetype both show.
 const shareOf=id=>{const v=parseFloat((GOLDFISH_META[id]?.['14']?.label||'').replace('≈',''));return Number.isFinite(v)?v:-1};
 const top=Object.keys(DETAILS).filter(id=>document.querySelector(`.transposed .matchcol[data-id="${id}"]`)&&GOLDFISH_META[id]?.['14']?.sources?.length)
  .sort((a,b)=>shareOf(b)-shareOf(a)||DETAILS[a].name.localeCompare(DETAILS[b].name))
  .map(id=>{const src=GOLDFISH_META[id]['14'].sources[0],slug=slugOf(src.url);return {id,slug,name:live?.windows?.['14']?.[slug]?.name||src.label}});

 const pct=(slug,w)=>{const r=live?.windows?.[w]?.[slug];return r?r.share.toFixed(1)+'%':'—';};
 const list=obj=>Object.entries(obj||{}).sort((a,b)=>b[1]-a[1]).map(([name,n])=>`<li><b>${n}</b> ${esc(name)}</li>`).join('');
 // Their sideboard: MTGGoldfish says how many published 75s run each card; MyMTGO (30 days of reported
 // matches) says how often it comes in after game 1, against any deck and against Elves.
 const my=slug=>live?.mymtgo?.[slug]||null;
 const VS_MIN=5;// fewer games against Elves than this: the column is not shown
 const cardKey=n=>String(n).split(' // ')[0].toLowerCase();
 function theirSide(slug){
  const gf=live?.sideboards?.[slug]||[],m=my(slug),vs=m?.vsElves?.games>=VS_MIN?m.vsElves:null;
  const sided=new Map((m?.side||[]).map(c=>[cardKey(c.card),c.sidedIn]));
  const vsIn=new Map((vs?.side||[]).map(c=>[cardKey(c.card),c.sidedIn]));
  const rows=gf.slice(0,6).map(c=>({card:c.card,lists:c.pct,avg:c.avg}));
  if(!rows.length&&m)rows.push(...m.side.slice(0,6).map(c=>({card:c.card})));
  // Cards they bring in against Elves that few lists run go after the popular ones.
  for(const c of vs?.side||[])if(c.sidedIn>=50&&rows.length<8&&!rows.some(r=>cardKey(r.card)===cardKey(c.card)))rows.push({card:c.card});
  if(!rows.length)return '';
  const cell=v=>v==null?'<td class="mu-na">—</td>':`<td>${Math.round(v)}%</td>`;
  const cols=[gf.length&&['In lists',r=>r.lists],m&&['Sided in',r=>sided.get(cardKey(r.card))],vs&&['vs Elves',r=>vsIn.get(cardKey(r.card))??0]].filter(Boolean);
  const head=`<tr><th scope="col">Card</th>${cols.map(([h])=>`<th scope="col">${h}</th>`).join('')}</tr>`;
  const body=rows.map(r=>`<tr><th scope="row"${r.avg?` title="${esc(r.avg)} copies on average"`:''}>${esc(r.card)}</th>${cols.map(([,f])=>cell(f(r))).join('')}</tr>`).join('');
  const note=[gf.length?'<b>In lists</b>: MTGGoldfish, share of their published MTGO 75s.':'',
   m?`<b>Sided in</b>: MyMTGO, share of post-board games where it comes in, against any deck (${esc(m.name)}, ${esc(m.matches)} matches, 30 days).`:'MyMTGO has no data for this archetype.',
   vs?`<b>vs Elves</b>: the same, against Elves only (${vs.games} games).`:m?`Against Elves: ${m.vsElves?.games||0} games on MyMTGO, too few to show.`:''].filter(Boolean).join(' ');
  return `<div class="mu-their"><h4 class="mu-opp">Their sideboard</h4><div class="mu-their-scroll"><table><thead>${head}</thead><tbody>${body}</tbody></table></div><p class="mu-their-note">${note}</p></div>`;
 }

 // Traffic-light alarms. red = yes, amber = sometimes / only after sideboarding, green = no, grey = no data.
 const COUNTERS=/Force of Will|Force of Negation|Daze|Counterspell|Mana Drain|Flusterstorm|Spell Pierce|Stern Scolding|Mindbreak Trap|Mystical Dispute|Memory Lapse|Warping Wail|Consign to Memory|Stifle|Spell Snare|Miscalculation|Swan Song|Veil of Summer/i;
 const SWEEPERS=/Massacre|Wrath of the Skies|Toxic Deluge|Fury|Terminus|Supreme Verdict|Engineered Explosives|Pyroclasm|Anger of the Gods|Kozilek's Return|Eldrazi Confluence|Brotherhood's End|Sheoldred's Edict|Hyperfrag|Holy Light|Echoing Truth/i;
 // Decks without a plan: colours from the guild or shard in their MTGGoldfish name.
 const NAME_COLORS={Azorius:'WU',Dimir:'UB',Rakdos:'BR',Gruul:'RG',Selesnya:'GW',Orzhov:'WB',Izzet:'UR',Golgari:'BG',Boros:'RW',Simic:'GU',
  Esper:'WUB',Grixis:'UBR',Jund:'BRG',Naya:'RGW',Bant:'GWU',Abzan:'WBG',Jeskai:'URW',Sultai:'BGU',Mardu:'RWB',Temur:'GUR','Mono-Blue':'U','Mono-Red':'R','Mono-Black':'B','Mono-Green':'G','Mono-White':'W'};
 const nameColors=slug=>{const n=(live?.windows?.['14']?.[slug]?.name||shortSlug(slug)).toLowerCase();const k=Object.keys(NAME_COLORS).find(k=>n.includes(k.toLowerCase()));return k?NAME_COLORS[k]:'';};
 const colorsOf=(planId,slug)=>planId?(MATCH_COLORS[planId]||''):nameColors(slug);
 const textOf=(planId,slug)=>[...(planId?(DETAILS[planId].opp||[]):[]),planId?(DETAILS[planId].notes||''):'',...(live?.sideboards?.[slug]||[]).map(c=>c.card),...(my(slug)?.listSide||[]),...(my(slug)?.side||[]).map(c=>c.card)].join(' | ');
 // MyMTGO's reference list (their most-seen 75) adds main-deck facts; a written plan keeps the last word on Wasteland.
 function alarms(planId,slug){
  const p=planId?DETAILS[planId]:null,m=my(slug),mainCards=m?.main||[],main=mainCards.join(' | ');
  const known=!!p||!!live?.sideboards?.[slug]||!!m,txt=textOf(planId,slug),blue=colorsOf(planId,slug).includes('U');
  const inMain=re=>mainCards.filter(n=>re.test(n)).join(', ');
  const waste=p?(p.wasteland==='YES'?['red','Yes','They play Wasteland']:p.wasteland==='NO'?['green','No','No Wasteland']:['amber','Mixed','Depends on the list'])
   :m?(/\bWasteland\b/.test(main)?['red','Yes','Wasteland in their main deck (MyMTGO reference list)']:/\bWasteland\b/.test(txt)?['amber','Side','Wasteland only in their sideboard']:['green','No','No Wasteland in their MyMTGO reference list'])
   :['grey','?','No data'];
  const counter=!known&&!colorsOf(planId,slug)?['grey','?','No data']:COUNTERS.test(main)?['red','Yes','Counters in their main deck: '+inMain(COUNTERS)]:blue?['red','Yes','Blue deck: expect Force of Will and other counters in the main deck']:COUNTERS.test(txt)?['amber','Side','Counters only after sideboarding']:['green','No','No counter magic recorded'];
  const sweep=p?.sweep?.length?['red','Yes','Sweepers: '+p.sweep.join(', ')]:SWEEPERS.test(main)?['red','Yes','Sweepers in their main deck: '+inMain(SWEEPERS)]:SWEEPERS.test(txt)?['amber','Side','Sweepers in their sideboard']:known?['green','No','No sweepers recorded']:['grey','?','No data'];
  // White hate bears (runkor, 9 Oct 2026): either one stops the whole plan, so the light names which one they play.
  // Clarion Conqueror: no activated abilities on artifacts or creatures (every dork, Quirion, Symbiote, Speaker's untap,
  // Sabertooth): only lands make mana. Containment Priest: creatures that enter without being cast are exiled
  // (Natural Order and Green Sun's Zenith find nothing).
  const bears=[['Clarion Conqueror','Clarion'],['Containment Priest','Priest']];
  const inM=bears.filter(([n])=>main.includes(n)),inS=bears.filter(([n])=>!main.includes(n)&&txt.includes(n));
  const label=l=>l.length===2?'Both':l[0][1];
  const why={Clarion:'Clarion Conqueror shuts off every dork and the loop: only lands make mana',Priest:'Containment Priest exiles what Natural Order and Green Sun’s Zenith put onto the battlefield'};
  const tipOf=(l,where)=>l.map(([,k])=>why[k]).join('. ')+' ('+where+')';
  const bear=inM.length?['red',label(inM.concat(inS)),tipOf(inM.concat(inS),inS.length?'main deck and sideboard':'main deck')]
   :inS.length?['amber',label(inS),tipOf(inS,'after sideboarding')]
   :known?['green','No','No Clarion Conqueror or Containment Priest recorded']:['grey','?','No data'];
  return [['Wasteland',...waste],['Counters',...counter],['Sweepers',...sweep],['White hate bear',...bear]];
 }
 // Full lights inside the open row; four bare dots on the closed row.
 const lights=a=>`<ul class="mu-alarms" aria-label="Alarms">${a.map(([name,tone,val,tip])=>`<li class="mu-alarm ${tone}" title="${esc(tip)}"><span class="mu-dot" aria-hidden="true"></span><span>${name}</span><b>${val}</b></li>`).join('')}</ul>`;
 const dots=a=>`<span class="mu-dots" role="img" aria-label="${esc(a.map(([name,,val])=>name+': '+val).join(', '))}">${a.map(([name,tone,val])=>`<i class="${tone}" title="${esc(name+': '+val)}"></i>`).join('')}</span>`;
 // y: height (%) of the art's focal point (a face, an eye), so the thin strip of each row shows it.
 const artFor=(planId,slug)=>{const key=ART[planId]?planId:shortSlug(slug);const a=ART[key];return a?{...a,src:`assets/matchups/${key}.webp`}:null;};

 // One row per plan: closed, it shows the deck over its art with the 14-day share and four dots;
 // the header button opens the full plan in place.
 // Colour identity in front of the name (official mana symbols; colourless decks show {C}); the rank stays for screen readers.
 function colors(planId,rank){
  const id=planId&&typeof MATCH_COLORS!=='undefined'?(MATCH_COLORS[planId]||''):'';
  const syms=id==='C'?['C']:[...id].filter(c=>'WUBRG'.includes(c));
  const names={W:'white',U:'blue',B:'black',R:'red',G:'green',C:'colourless'};
  return `<span class="mu-colors" title="${syms.map(c=>names[c]).join(', ')||'colours not set'}"><span class="sb-sr">#${rank} </span>${syms.map(c=>`<img src="${MANA_ICONS[c]}" alt="" width="16" height="16">`).join('')}</span>`;
 }
 function row(rank,slug,archName,planId){
  const p=planId?DETAILS[planId]:null,art=artFor(planId,slug),id='mu-'+(planId||shortSlug(slug));
  const meta=planId?GOLDFISH_META[planId]:null;
  const trend=meta?metaTrend(meta):(()=>{const a=live?.windows?.['7']?.[slug]?.share,b=live?.windows?.['30']?.[slug]?.share;if(a==null||b==null)return {state:'unknown',text:'—',title:'No comparable 7-day and 30-day data.'};const d=Math.round((a-b)*10)/10;return {state:d>0?'up':d<0?'down':'flat',text:(d>0?'↑ +':d<0?'↓ ':'→ ')+d.toFixed(1),title:'7d − 30d, percentage points'};})();
  const val=w=>meta?esc(meta[w]?.label||'—'):pct(slug,w);
  const a=alarms(planId,slug);
  return `<article class="mu-row${p?'':' mu-unplanned'}" id="${esc(id)}">
   <h3 class="mu-h"><button type="button" class="mu-bar" aria-expanded="false" aria-controls="${esc(id)}-panel">
    ${art?`<img class="mu-bg" src="${art.src}" alt="" loading="lazy" decoding="async" style="object-position:50% ${art.y??30}%">`:''}
    ${colors(planId,rank)}
    <span class="mu-title"><span class="mu-name">${esc(p?p.name:archName)}</span><span class="mu-sub">${p?esc(archName):'Plan not written yet'}</span></span>
    <span class="mu-share" title="14-day share">${val('14')}</span>
    ${dots(a)}
    <span class="mu-chev" aria-hidden="true"></span>
   </button></h3>
   <div class="mu-panel" id="${esc(id)}-panel"><div class="mu-panel-in"><div class="mu-body">
    <div class="mu-head">${p?`<span class="rolepill ${esc(p.role.toLowerCase())}">${esc(p.role)}</span>`:''}<p class="mu-arch">${esc(archName)}${p?.macro?' · '+esc(p.macro):''}</p></div>
    <dl class="mu-meta"><div><dt>7d</dt><dd>${val('7')}</dd></div><div><dt>14d</dt><dd>${val('14')}</dd></div><div><dt>30d</dt><dd>${val('30')}</dd></div><div title="${esc(trend.title)}"><dt>Trend</dt><dd class="trend-${trend.state}">${esc(trend.text)}</dd></div></dl>
    <div class="mu-cols">
     <div class="mu-col"><h4 class="mu-in">IN${p?' '+p.inCount:''}</h4>${p?`<ul>${list(p.ins)}</ul>`:'<p class="mu-empty">No plan yet</p>'}</div>
     <div class="mu-col"><h4 class="mu-out">OUT${p?' '+p.outCount:''}</h4>${p?`<ul>${list(p.outs)}</ul>`:'<p class="mu-empty">No plan yet</p>'}</div>
    </div>
    ${theirSide(slug)||(p?.opp?.length?`<p class="mu-their-note"><b>Their sideboard</b> (guide notes): ${p.opp.slice(0,4).map(esc).join(' · ')}</p>`:'')}
    ${lights(a)}
    ${p?.notes?`<p class="mu-notes"><b>Plan notes</b> ${esc(p.notes)}</p>`:''}
    <div class="mu-foot">${art?`<p class="mu-credit">Art: ${esc(art.card)} by ${esc(art.artist)}</p>`:''}${p?`<button type="button" class="mu-open" data-id="${esc(planId)}">Full plan</button>`:''}</div>
   </div></div></div></article>`;
 }

 const rows=[];
 top.forEach((t,i)=>rows.push(row(i+1,t.slug,t.name,t.id)));
 host.innerHTML=`<p class="mu-source">MTGGoldfish · MTGO · ${live?'updated '+esc(live.updatedLabel):'snapshot '+esc(GOLDFISH_META_DATE)} · ${top.length} matchups, the same as the Sideboard map (the MTGGoldfish top ${TRACKED} and fixed extras), by 14-day share${live?.mymtgo?'; sideboard use from MyMTGO':''}. Dots: Wasteland · Counters · Sweepers · White hate bear (Clarion Conqueror, Containment Priest).</p>
 <div class="mu-list">${rows.join('')}</div>`;
 host.addEventListener('click',e=>{
  const b=e.target.closest('.mu-open');if(b)return openMatch(b.dataset.id);
  const bar=e.target.closest('.mu-bar');if(!bar)return;
  const open=bar.getAttribute('aria-expanded')!=='true';
  bar.setAttribute('aria-expanded',open);bar.closest('.mu-row').classList.toggle('open',open);
 });
})();
