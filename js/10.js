// Current 75: published Speaker Elves results on MTGO (js/results-archive.js, written by
// scripts/update_results.py). League lists are 5-0 trophies; challenges show their final place.
(function resultsArchive(){
 const data=window.SPEAKER_RESULTS;const deck=document.getElementById('deck');
 if(!data||!deck||!data.results?.length)return;
 const SHOWN=12;
 const ord=n=>n+(['th','st','nd','rd'][(n%100-20)%10]||['th','st','nd','rd'][n%100]||'th');
 const fmtDate=d=>new Date(d+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
 const finish=r=>r.kind==='Trophy'
  ?'<span class="res-finish trophy">5-0 trophy</span>'
  :`<span class="res-finish ${r.finish&&r.finish<=8?'top8':''}">${r.finish?ord(r.finish):'—'}${r.players?` <small>of ${r.players}</small>`:''}</span>`;
 const trophies=data.results.filter(r=>r.kind==='Trophy').length,challenges=data.results.length-trophies;
 const best=data.results.filter(r=>r.kind!=='Trophy'&&r.finish).sort((a,b)=>a.finish-b.finish)[0];

 const box=document.createElement('section');box.className='res-archive';box.setAttribute('aria-labelledby','res-title');
 box.innerHTML=`<div class="res-head"><div><h2 id="res-title">Published results</h2>
  <p>${data.results.length} Speaker Elves finishes on MTGO since ${fmtDate(data.since)}: ${trophies} league 5-0 trophies and ${challenges} challenge finishes${best?`, best ${ord(best.finish)} of ${best.players||'?'}`:''}. Updated ${fmtDate(data.updated)}.</p></div>
  <div class="res-filter" role="group" aria-label="Show results"><button type="button" data-f="all" aria-pressed="true">All</button><button type="button" data-f="Trophy" aria-pressed="false">Trophies</button><button type="button" data-f="Challenge" aria-pressed="false">Challenges</button></div></div>
  <div class="table-scroll"><table class="data res-table"><thead><tr><th>Date</th><th>Finish</th><th>Event</th><th>Pilot</th><th>List</th></tr></thead><tbody></tbody></table></div>
  <button type="button" class="res-more" hidden></button>
  <p class="res-note">Results from the MTGGoldfish deck search (Legacy, Formidable Speaker in the main deck, MTGO leagues and challenges; other archetypes that play Speaker are left out). Challenge places come from the official mtgo.com standings. Each list opens on MTGGoldfish.</p>`;
 const tbody=box.querySelector('tbody'),more=box.querySelector('.res-more');
 let filter='all',expanded=false;
 function render(){
  const rows=data.results.filter(r=>filter==='all'||(filter==='Trophy'?r.kind==='Trophy':r.kind!=='Trophy'));
  const shown=expanded?rows:rows.slice(0,SHOWN);
  tbody.innerHTML=shown.map(r=>`<tr class="${r.player==='runkor'?'res-own':''}"><td>${esc(fmtDate(r.date))}</td><td>${finish(r)}</td><td>${esc(r.kind==='Trophy'?'Legacy League':r.kind.replace('Challenge','Legacy Challenge'))}${r.source?` <a href="${esc(r.source)}" target="_blank" rel="noopener" title="Official standings">standings</a>`:''}</td><td>${esc(r.player)}</td><td><a href="${esc(r.deck)}" target="_blank" rel="noopener">Open list</a></td></tr>`).join('');
  more.hidden=rows.length<=SHOWN;
  more.textContent=expanded?'Show fewer':`Show all ${rows.length}`;
 }
 box.querySelector('.res-filter').addEventListener('click',e=>{const b=e.target.closest('button[data-f]');if(!b)return;filter=b.dataset.f;expanded=false;
  box.querySelectorAll('.res-filter button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});
 more.addEventListener('click',()=>{expanded=!expanded;render();});
 // Prominent decklists, at the top of Current 75: runkor's list (the 75 on this page) and the current best
 // performer, recomputed from the nightly data on every load. Criterion: the most published finishes in the
 // 14 days up to the last update; ties go to the best challenge place, then to the most recent finish.
 // Lists are linked, not copied (MTGGoldfish deck pages are protected from automated reading).
 (function prominent(){
  const NAMES={Benat:'Beñat Garay',deimus:'David Melchor',SamwiseGeeGee:'Jarvis Yu',runkor:'Iñigo Villamor',Testacular:'Curran Delahanty',hellonewton:'Newton Hang',EronRelentless:'Jörg Heinrich',dssit:'David Schittinger',Julian23:'Julian Knab',reiderrabbit:'Reid Duke'};
  const who=p=>NAMES[p]?`${esc(NAMES[p])} <small>(MTGO: ${esc(p)})</small>`:esc(p);
  const end=new Date(data.updated+'T12:00:00Z'),start=new Date(end.getTime()-13*864e5),day=r=>new Date(r.date+'T12:00:00Z');
  const by=new Map();
  data.results.filter(r=>day(r)>=start&&day(r)<=end).forEach(r=>{
   const p=by.get(r.player)||{player:r.player,n:0,trophies:0,place:Infinity,last:null};
   p.n++;if(r.kind==='Trophy')p.trophies++;else if(r.finish)p.place=Math.min(p.place,r.finish);
   if(!p.last||r.date>p.last.date)p.last=r;by.set(r.player,p);});
  const ranked=[...by.values()].sort((a,b)=>b.n-a.n||a.place-b.place||(a.last.date<b.last.date?1:a.last.date>b.last.date?-1:0));
  const top=ranked[0],own=data.results.find(r=>r.player==='runkor');
  const summary=p=>`${p.n} published finish${p.n===1?'':'es'} in 14 days: ${p.trophies} league 5-0${p.trophies===1?'':'s'}${p.n>p.trophies?`, ${p.n-p.trophies} challenge${p.n-p.trophies===1?'':'s'}${p.place<Infinity?` (best ${ord(p.place)})`:''}`:''}`;
  const latest=r=>`Latest: ${esc(fmtDate(r.date))}, ${r.kind==='Trophy'?'5-0 league trophy':(r.finish?ord(r.finish):'—')+' in a '+esc(r.kind.replace('Challenge','Legacy Challenge'))} · <a href="${esc(r.deck)}" target="_blank" rel="noopener">Open list</a>`;
  const card=(tag,title,body,cls)=>`<article class="prom-card ${cls}"><span class="prom-tag">${tag}</span><h3>${title}</h3>${body}</article>`;
  const box=document.createElement('section');box.className='prominent';box.setAttribute('aria-labelledby','prom-title');
  box.innerHTML=`<h2 id="prom-title">Prominent decklists</h2>
   <p class="prom-intro">runkor’s list is the 75 on this page. The best performer is recalculated from the published results every time the page loads: most finishes in the last 14 days (${esc(fmtDate(start.toISOString().slice(0,10)))} to ${esc(fmtDate(data.updated))}), then the best challenge place, then the most recent finish.</p>
   <div class="prom-grid">
   ${card('runkor’s list','5 Oct 2026 · '+who('runkor'),`<p>The 75 shown below.${own?' '+latest(own):''}</p>`,'own')}
   ${top?card(top.player==='runkor'?'Best performing now · runkor’s own list':'Best performing now',who(top.player),`<p>${summary(top)}.</p><p>${latest(top.last)}</p>`,'best'):card('Best performing now','No finishes in the last 14 days','<p>The nightly data has no published Speaker Elves finish in this window.</p>','best')}
   </div>
   ${ranked.length>1?`<p class="prom-rank"><b>Last 14 days:</b> ${ranked.slice(0,6).map(p=>`${esc(NAMES[p.player]||p.player)} ${p.n}`).join(' · ')}</p>`:''}`;
  deck.prepend(box);
 })();
 render();
 const metrics=document.getElementById('deck-metrics');
 deck.insertBefore(box,metrics||null);
})();
