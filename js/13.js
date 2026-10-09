// Sideboard map views and the Maybeboard study table (8 Oct 2026).
// The old transposed matrix stays in the DOM (js/01.js builds it; js/03.js and js/06.js read it) but is hidden:
// these views read the same data (DETAILS, GOLDFISH_META and the row order of that table).
(function sideboardViews(){
 const map=document.getElementById('map'),table=document.querySelector('.matrixwrap > .transposed');
 if(!map||!table)return;
 const SHORT={'Temur Sabertooth':'Sabertooth','Collector Ouphe':'Ouphe','Allosaurus Shepherd':'Shepherd','Marwyn, the Preserver':'Marwyn','Formidable Speaker':'Speaker','Wirewood Symbiote':'Symbiote','Quirion Ranger':'Quirion','Once Upon a Time':'OUaT','Primaris Eliminator':'Primaris','Alpha Deathclaw':'Deathclaw','Elvish Visionary':'Visionary',"Assassin's Trophy":'Trophy','Leyline of the Void':'Leyline'};
 const short=n=>SHORT[n]||n;
 const art=n=>COMBO_CARD_ART[n]?.src;
 const sorted=o=>Object.entries(o||{}).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
 const pct=id=>parseFloat((GOLDFISH_META[id]?.[14]?.label||'').replace('≈',''));
 // Rows in the order the matrix shows them: categories by 14-day share, matchups inside by share.
 const groups=[];let cur=null;
 for(const tr of table.tBodies[0].rows){
  if(tr.classList.contains('macroGroup')){cur={name:tr.dataset.category,totals:JSON.parse(tr.dataset.totals||'{}'),rows:[]};groups.push(cur);continue;}
  const id=tr.querySelector('.matchcol')?.dataset.id,p=DETAILS[id];if(!p||!cur)continue;
  cur.rows.push({id,p,share:GOLDFISH_META[id]?.[14]?.label||'—',trend:metaTrend(GOLDFISH_META[id])});
 }
 const rows=groups.flatMap(g=>g.rows);
 // Category share of the MTGO field (shared Goldfish archetypes counted once; see rankMetagame48 in js/01.js).
 const tot=(g,d)=>'≈'+(g.totals[d]||0).toFixed(1)+'%';
 const colours=id=>manaSymbols((MATCH_COLORS[id]||'').split('').filter(Boolean));
 const waste=p=>p.wasteland==='YES'?'<span class="sbv-pill warn">Wasteland</span>':p.wasteland==='MIXED'?'<span class="sbv-pill warn">Wasteland in some lists</span>':'';
 const sweep=p=>p.sweep?.length?'<span class="sbv-pill warn" title="'+esc(p.sweep.join(', '))+'">⚠ Sweepers</span>':'';
 const chip=(n,k,kind)=>`<span class="sbv-sw ${kind}" title="${esc(n)}"><i>${kind==='in'?'+':'−'}${k}</i> ${esc(short(n))}</span>`;
 const trendTag=t=>`<span class="sbv-trend trend-${t.state}" title="${esc(t.title)}">${esc(t.text)}</span>`;
 const nameBtn=r=>`<button type="button" class="sbv-name" data-match="${esc(r.id)}">${colours(r.id)}<span>${esc(r.p.name)}</span></button>`;

 const box=document.createElement('div');box.className='sbv';
 box.innerHTML=`<div class="sbv-bar">
   <div class="sbv-views" role="tablist" aria-label="Sideboard map view">
    <button type="button" role="tab" data-view="rows" aria-selected="true">Plan rows</button>
    <button type="button" role="tab" data-view="matrix" aria-selected="false">Matrix</button>
    <button type="button" role="tab" data-view="presence" aria-selected="false">Presence</button>
   </div>
   <input type="search" class="sbv-search" id="sbv-search" placeholder="Find a matchup or card…" aria-label="Find a matchup or card">
   <button type="button" class="sbv-print-btn">Print / Save as PDF</button>
  </div>
  <div class="sbv-panel" data-panel="rows"></div>
  <div class="sbv-panel" data-panel="matrix" hidden><div class="sbv-mx-scroll"><table class="sbv-mx"></table></div></div>
  <div class="sbv-panel" data-panel="presence" hidden></div>`;
 (map.querySelector('.meta-order48')||table.closest('.matrixwrap')).after(box);
 map.classList.add('sbv-on');document.body.classList.add('sbv-on');

 // Plan rows
 const rowsPanel=box.querySelector('[data-panel="rows"]');
 function drawRows(q=''){
  const hit=r=>!q||(r.p.name+' '+Object.keys(r.p.ins).join(' ')+' '+Object.keys(r.p.outs).join(' ')).toLowerCase().includes(q);
  rowsPanel.innerHTML=groups.map(g=>{const rs=g.rows.filter(hit);if(!rs.length)return '';
   return `<h3 class="sbv-cat">${esc(g.name)}<small>7d ${tot(g,7)} · <b>14d ${tot(g,14)}</b> · 30d ${tot(g,30)}</small></h3>`+rs.map(r=>`<div class="sbv-row">
    <div class="sbv-who">${nameBtn(r)}<span class="sbv-meta"><span class="sbv-share">${esc(r.share)}</span>${trendTag(r.trend)}<span class="sbv-pill">${esc(r.p.role)}</span>${waste(r.p)}${sweep(r.p)}</span></div>
    <div class="sbv-plan"><div class="sbv-line"><span class="sbv-lab">IN</span>${sorted(r.p.ins).map(([n,k])=>chip(n,k,'in')).join('')}</div>
    <div class="sbv-line"><span class="sbv-lab">OUT</span>${sorted(r.p.outs).map(([n,k])=>chip(n,k,'out')).join('')}</div></div></div>`).join('');}).join('')||'<p class="muted">No matchup or card matches that search.</p>';
 }
 drawRows();

 // Matrix: only the cards that move in some plan; sideboard cards first, then main-deck cards.
 const used=key=>{const c={};rows.forEach(r=>Object.keys(r.p[key]||{}).forEach(n=>c[n]=(c[n]||0)+1));return Object.keys(c).sort((a,b)=>c[b]-c[a]||a.localeCompare(b));};
 const inCols=used('ins'),outCols=used('outs');
 const mx=box.querySelector('.sbv-mx');
 const head=(n,first)=>`<th class="sbv-card${first?' sep':''}" title="${esc(n)}">${art(n)?`<img src="${art(n)}" alt="" loading="lazy" width="34" height="47">`:''}<span>${esc(short(n))}</span></th>`;
 mx.innerHTML=`<thead><tr><th class="first grp"></th><th class="grp"></th><th class="grp gin sep" colspan="${inCols.length}">Comes in</th><th class="grp gout sep" colspan="${outCols.length}">Goes out</th></tr>
  <tr><th class="first">Matchup</th><th>14d</th>${inCols.map((n,i)=>head(n,i===0)).join('')}${outCols.map((n,i)=>head(n,i===0)).join('')}</tr></thead><tbody>`+
  groups.map(g=>`<tr class="cat"><td class="first">${esc(g.name)}</td><td class="sbv-share" title="7d ${tot(g,7)} · 30d ${tot(g,30)}">${tot(g,14)}</td><td colspan="${inCols.length+outCols.length}"></td></tr>`+g.rows.map(r=>`<tr data-q="${esc((r.p.name+' '+Object.keys(r.p.ins).join(' ')+' '+Object.keys(r.p.outs).join(' ')).toLowerCase())}"><td class="first">${nameBtn(r)}</td><td class="sbv-share">${esc(r.share)}</td>`+
   inCols.map((n,i)=>`<td data-c="i${i}" class="${r.p.ins[n]?'c-in':'c-none'}${i===0?' sep':''}">${r.p.ins[n]?`<b>+${r.p.ins[n]}</b>`:'·'}</td>`).join('')+
   outCols.map((n,i)=>`<td data-c="o${i}" class="${r.p.outs[n]?'c-out':'c-none'}${i===0?' sep':''}">${r.p.outs[n]?`<b>−${r.p.outs[n]}</b>`:'·'}</td>`).join('')+'</tr>').join('')).join('')+'</tbody>';
 const clearHot=()=>mx.querySelectorAll('.hot,.hotc').forEach(x=>x.classList.remove('hot','hotc'));
 mx.addEventListener('mouseover',e=>{const td=e.target.closest('td');clearHot();if(!td)return;td.parentElement.classList.add('hot');if(td.dataset.c)mx.querySelectorAll(`[data-c="${td.dataset.c}"]`).forEach(x=>x.classList.add('hotc'));});
 mx.addEventListener('mouseleave',clearHot);

 // Presence: share of the field (14 days) where each sideboard card comes in. Shared Goldfish buckets count once.
 const field=new Map();rows.forEach(r=>(GOLDFISH_META[r.id]?.[14]?.sources||[]).forEach(s=>field.set(s.key,s.share)));
 const total=[...field.values()].reduce((a,b)=>a+b,0);
 const cover=list=>{const m=new Map();list.forEach(r=>(GOLDFISH_META[r.id]?.[14]?.sources||[]).forEach(s=>m.set(s.key,s.share)));return [...m.values()].reduce((a,b)=>a+b,0);};
 const pres=inCols.map(n=>{const vs=rows.filter(r=>r.p.ins[n]);return {n,cov:cover(vs),plans:vs.length,avg:vs.reduce((a,r)=>a+r.p.ins[n],0)/vs.length};}).sort((a,b)=>b.cov-a.cov);
 const leave=outCols.map(n=>{const vs=rows.filter(r=>r.p.outs[n]);return {n,cov:cover(vs),plans:vs.length};}).sort((a,b)=>b.cov-a.cov);
 const maxIn=Math.max(...pres.map(x=>x.cov),1),maxOut=Math.max(...leave.map(x=>x.cov),1);
 const bar=(x,max,kind,extra)=>`<div class="sbv-pres"><span class="sbv-pres-art">${art(x.n)?`<img src="${art(x.n)}" alt="" loading="lazy" width="40" height="56">`:''}</span><span class="sbv-pres-name">${esc(x.n)}</span><span class="sbv-pres-bar ${kind}"><span style="width:${x.cov/max*100}%"></span></span><span class="sbv-pres-val">${x.cov.toFixed(1)}% · ${x.plans} plan${x.plans===1?'':'s'}${extra}</span></div>`;
 box.querySelector('[data-panel="presence"]').innerHTML=`<p class="muted">Share of the field where each card moves, over the ${rows.length} matchups in the map (≈${total.toFixed(1)}% of the 14-day MTGO field; matchups that share one MTGGoldfish archetype count once).</p>
  <h3 class="sbv-cat">Sideboard cards that come in</h3>${pres.map(x=>bar(x,maxIn,'in',' · '+x.avg.toFixed(1)+'× on average')).join('')}
  <h3 class="sbv-cat">Main-deck cards that go out</h3>${leave.map(x=>bar(x,maxOut,'out','')).join('')}`;

 // Views, search and the plan drawer
 const KEY='sbv.view';
 function show(view){box.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.view===view)));box.querySelectorAll('.sbv-panel').forEach(p=>p.hidden=p.dataset.panel!==view);box.querySelector('.sbv-search').hidden=view==='presence';try{localStorage.setItem(KEY,view);}catch(e){}}
 box.querySelector('.sbv-views').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)show(b.dataset.view);});
 try{const v=localStorage.getItem(KEY);if(v&&box.querySelector(`[data-view="${v}"]`))show(v);}catch(e){}
 box.querySelector('.sbv-search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();drawRows(q);mx.querySelectorAll('tbody tr:not(.cat)').forEach(tr=>tr.hidden=!!q&&!tr.dataset.q.includes(q));});
 box.addEventListener('click',e=>{const b=e.target.closest('[data-match]');if(b)openMatch(b.dataset.match);});

 // One-page print sheet: black on white, two columns, every plan. Lives at the end of <body> and only shows in print.
 const sheet=document.createElement('section');sheet.className='sbv-sheet';sheet.setAttribute('aria-hidden','true');
 sheet.innerHTML=`<h1>Speaker Elves · Sideboard plans</h1><p class="sbv-sheet-sub"><span>${esc(document.querySelector('.sb-brand-badge')?.textContent||'Current list')} · runkor · ranked by 14-day MTGO share (${esc(GOLDFISH_META_DATE)})</span><span>+N in · −N out · W = Wasteland · ⚠ = sweepers</span></p>
  <div class="sbv-sheet-cols">${groups.map(g=>`<h2>${esc(g.name)} · 14d ${tot(g,14)}</h2>`+g.rows.map(r=>`<div class="sbv-sheet-row"><b>${esc(r.p.name)}</b> <small>${esc(r.share)} · ${esc(r.p.role)}${r.p.wasteland==='YES'?' · W':''}${r.p.sweep?.length?' · ⚠':''}</small>
   <span><i>IN</i> ${sorted(r.p.ins).map(([n,k])=>'+'+k+' '+esc(short(n))).join(', ')}</span><span><i>OUT</i> ${sorted(r.p.outs).map(([n,k])=>'−'+k+' '+esc(short(n))).join(', ')}</span></div>`).join('')).join('')}</div>
  <p class="sbv-sheet-foot"><span>speaker-elves.vercel.app/#sideboard</span><span>Plans are proposals for this exact 75: adjust to the opposing build and to play or draw.</span></p>`;
 document.body.append(sheet);
 box.querySelector('.sbv-print-btn').addEventListener('click',()=>{document.body.classList.add('sbv-printing');window.print();});
 addEventListener('afterprint',()=>document.body.classList.remove('sbv-printing'));
})();

// Maybeboard: our archive of every card considered for the deck, from our own lists and from the lists of other
// Speaker Elves pilots, Cradle Control and combo Elves. What matters most is why a card was chosen and where it was
// played, in case it comes back; why it is out now is secondary (often just space).
// An index (role filter and search; the shelves already group cards by origin) on the left; the chosen card sits in a sticky panel on the right
// (on top on phones). The articles in index.html stay the single source of the text and the no-JS version.
(function maybeStudy(){
 const pane=document.getElementById('maybeboard');if(!pane)return;
 const arts=[...pane.querySelectorAll('article[data-card]')];if(!arts.length)return;
 const text=(a,label)=>{const p=[...a.querySelectorAll('p')].find(x=>x.querySelector('b')?.textContent.trim().startsWith(label));if(!p)return '';const c=p.cloneNode(true);c.querySelector('b').remove();c.querySelector('.ev')?.remove();return c.textContent.trim();};
 const json=(s,d)=>{try{return JSON.parse(s||'');}catch(e){return d;}};
 const totals=json(pane.querySelector('.maybe-source')?.dataset.totals,{});
 const SHELVES={ours:'From our own lists',speaker:'From other Speaker Elves lists',cc:'From Cradle Control',elves:'From combo Elves'};
 const cards=arts.map(a=>{const ev=a.querySelector('p:last-of-type .ev');return{name:a.querySelector('h4').textContent.trim(),key:a.dataset.card,meta:a.querySelector('.maybe-meta')?.textContent.trim()||'',
  shelf:a.dataset.shelf||'ours',role:a.dataset.role||'',job:text(a,'Job:'),played:text(a,'Where it was played:'),
  why:text(a,'Why it left:')||text(a,'Why it is not in this list:'),left:!!text(a,'Why it left:'),
  tag:ev?{cls:ev.className,label:ev.textContent.trim()}:null,served:json(a.dataset.served,[]),st:json(a.dataset.stats,null)};});
 const ORIGINS=[['all','All',()=>true],['ours','Our lists',c=>c.shelf==='ours'],['speaker','Speaker Elves',c=>c.shelf==='speaker'||(c.st?.sp||0)>=2],
  ['cc','Cradle Control',c=>(c.st?.cc||0)>=10],['elves','Combo Elves',c=>c.shelf==='elves'||(c.st?.el||0)>=5]];
 const ROLES=[['all','Any role'],['mana','Mana'],['lands','Lands'],['engine','Engine'],['threat','Threats'],['removal','Removal'],['hate','Hate']];
 const art=c=>COMBO_CARD_ART[c.key]||{};
 const thumb=c=>art(c).src?art(c).src.replace(/^assets\//,'assets/thumbs/'):'';
 const face=(c,cls,src,lazy)=>src?`<img class="${cls}" src="${src}" alt="${esc(c.name)}"${lazy?' loading="lazy" decoding="async"':''} width="244" height="340">`:`<span class="${cls} mbs-text">${esc(c.name)}</span>`;
 const badge=c=>c.shelf==='ours'||!c.st?'':`<span class="mbs-n" title="Published lists that played it">${c.st.l}</span>`;
 const study=document.createElement('div');study.className='mbs';
 const seg=(cls,label,list)=>`<div class="mbs-seg ${cls}" role="group" aria-label="${label}">${list.map(([k,l],i)=>`<button type="button" data-k="${k}" aria-pressed="${i===0}">${l}<span class="mbs-segn"></span></button>`).join('')}</div>`;
 study.innerHTML=`<div class="mbs-bar">${seg('mbs-role','Card role',ROLES)}
   <div class="mbs-find"><input type="search" class="sbv-search mbs-search" placeholder="Find a card…" aria-label="Find a card"><p class="mbs-count" aria-live="polite"></p></div></div>
  <div class="mbs-layout"><div class="mbs-tray">${Object.entries(SHELVES).map(([sh,name])=>`<section class="mbs-shelfgroup" data-shelf="${sh}"><h3 class="mbs-shelfname">${name}</h3><div class="mbs-grid">${cards.map((c,i)=>c.shelf!==sh?'':`<button type="button" class="mbs-card" data-i="${i}" aria-pressed="false"><span class="mbs-cardimg">${face(c,'mbs-face',thumb(c),true)}${badge(c)}</span><span class="mbs-cardname">${esc(c.name)}</span></button>`).join('')}</div></section>`).join('')}
   <p class="mbs-empty" hidden>No card matches. Clear the search or pick another filter.</p></div>
  <aside class="mbs-table" aria-live="polite"></aside></div>`;
 pane.querySelector('.article>.muted')?.after(study);
 pane.classList.add('mbs-on');
 const tableEl=study.querySelector('.mbs-table');
 const pct=(n,d)=>d?Math.round(100*n/d):0;
 function years(c){
  const ys=Object.keys(totals.years||{});if(!c.st||!ys.length)return '';
  const rows=ys.map(y=>{const n=c.st.y?.[y]||0,d=totals.years[y],p=pct(n,d);return `<div class="mbs-yr"><span>${y}</span><span class="mbs-yrbar"><i style="width:${p}%"></i></span><b>${p}%</b><small>${n} of ${d}</small></div>`;}).join('');
  const g=[['Cradle Control',c.st.cc,totals.cc],['Speaker Elves',c.st.sp,totals.sp],['Combo Elves',c.st.el,totals.el]].map(([n,v,d])=>`<span class="mbs-chip">${n} <b>${pct(v,d)}%</b></span>`).join(' ');
  return `<div class="mbs-years" role="img" aria-label="Share of each year’s published lists that played it">${rows}</div><p class="mbs-groups">Share of each deck’s lists: ${g}</p>`;
 }
 function put(i){
  const c=cards[i],a=art(c);
  study.querySelectorAll('.mbs-card').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.i===i)));
  const tag=c.tag?` <span class="${esc(c.tag.cls)}">${esc(c.tag.label)}</span>`:'';
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  tableEl.innerHTML=`<div class="mbs-big">${face(c,'mbs-bigface',a.src,true)}</div><div class="mbs-info mbs-head"><p class="mbs-shelf">${esc(SHELVES[c.shelf]||'')}</p><h3>${esc(c.name)}</h3><p class="mbs-meta">${esc(c.meta)}</p>
   ${a.url?`<p class="mbs-credit"><a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.edition||'Scryfall')}</a>${a.artist?' · '+esc(a.artist):''}</p>`:''}</div>
   <div class="mbs-info mbs-body"><dl><dt>Why it was chosen</dt><dd>${esc(cap(c.job))}</dd>
   <dt class="mbs-why">${c.left?'Why it left our list':'Why it is not in this list'}</dt><dd class="mbs-why">${esc(cap(c.why))}${tag}</dd>
   ${c.served.length?`<dt>Where it helped</dt><dd>Our sideboard plans brought it in against: ${c.served.map(m=>`<span class="mbs-chip">${esc(m)}</span>`).join(' ')}</dd>`:''}
   ${c.played?`<dt>Where it was played</dt><dd>${esc(c.played)}${years(c)}</dd>`:''}</dl></div>`;
  tableEl.classList.remove('mbs-flip');void tableEl.offsetWidth;tableEl.classList.add('mbs-flip');
 }
 const state={origin:'all',role:'all',q:''};
 const match=(c,o=state.origin,r=state.role)=>ORIGINS.find(x=>x[0]===o)[2](c)&&(r==='all'||c.role===r)&&(!state.q||(c.name+' '+c.job).toLowerCase().includes(state.q));
 function filter(){
  let shown=0;
  study.querySelectorAll('.mbs-card').forEach(b=>{const ok=match(cards[+b.dataset.i]);b.hidden=!ok;shown+=ok;});
  study.querySelectorAll('.mbs-shelfgroup').forEach(g=>g.hidden=!g.querySelector('.mbs-card:not([hidden])'));
  study.querySelector('.mbs-empty').hidden=!!shown;
  study.querySelector('.mbs-count').textContent=`${shown} of ${cards.length} cards`;
  // The count on each option is what picking it would leave, given the other filter and the search.
  study.querySelectorAll('.mbs-role button').forEach(b=>b.querySelector('.mbs-segn').textContent=cards.filter(c=>match(c,state.origin,b.dataset.k)).length);
 }
 const still=()=>{const r=document.documentElement;return r.classList.contains('motion-off')||(matchMedia('(prefers-reduced-motion: reduce)').matches&&!r.classList.contains('motion-on'));};
 study.querySelector('.mbs-bar').addEventListener('click',e=>{const b=e.target.closest('.mbs-seg button');if(!b)return;const g=b.closest('.mbs-seg');
  g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));state[g.classList.contains('mbs-origin')?'origin':'role']=b.dataset.k;filter();});
 study.querySelector('.mbs-search').addEventListener('input',e=>{state.q=e.target.value.trim().toLowerCase();filter();});
 study.querySelector('.mbs-tray').addEventListener('click',e=>{const b=e.target.closest('.mbs-card');if(!b)return;put(+b.dataset.i);
  // On phones the panel sits above the index: bring it back into view.
  const r=tableEl.getBoundingClientRect();if(r.top<0||r.top>innerHeight*.6)tableEl.scrollIntoView({behavior:still()?'auto':'smooth',block:'start'});});
 filter();
 put(Math.max(0,cards.findIndex(c=>c.key==='Force of Vigor')));
})();
