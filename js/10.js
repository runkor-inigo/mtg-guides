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
 render();
 const metrics=document.getElementById('deck-metrics');
 deck.insertBefore(box,metrics||null);
})();
