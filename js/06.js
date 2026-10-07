// Mobile plans are derived from the current table and validated sideboard data.
(function mobilePlans(){
 const map=document.getElementById('map'),host=document.createElement('div');host.className='mobile-map45';
 host.innerHTML='<div class="mobile-map-toolbar45"><input type="search" placeholder="Find a matchup…" aria-label="Find a matchup"><button type="button" aria-pressed="false">Show table</button></div><div class="mobile-plans45"></div><p class="mobile-empty45" hidden>No matching matchups.</p>';
 map.querySelector('.matrixwrap').before(host);const list=host.querySelector('.mobile-plans45');
 const groups=[['Mana',['Mana dork','Quirion Ranger']],['Loop engine',['Wirewood Symbiote','Temur Sabertooth','Formidable Speaker','Badgermole Cub']],['Core',['Allosaurus Shepherd','Once Upon a Time','Natural Order']],['Bullets',['Collector Ouphe','Marwyn, the Preserver','Vibrance','Atraxa, Grand Unifier']]];
 const rows=[];let category=null;
 const renderCards=cards=>'<ul>'+cards.map(([name,n])=>'<li><b>'+n+'</b><span class="mobile-card-name45">'+esc(name)+'</span><span>'+manaSymbols(CARD_COSTS[name]||[])+'</span></li>').join('')+'</ul>';
 map.querySelectorAll('.matrixwrap tbody tr').forEach(row=>{
  if(row.classList.contains('macroGroup')){category=document.createElement('h3');category.className='mobile-category45';category.innerHTML=row.cells[0].innerHTML;list.append(category);return;}
  const match=row.querySelector('.matchcol[data-id]');if(!match)return;const p=DETAILS[match.dataset.id];if(!p)return;
  const card=document.createElement('details');card.className='mobile-plan45';card.dataset.id=match.dataset.id;
  const total=obj=>Object.values(obj).reduce((a,b)=>a+b,0);
  const trend=metaTrend(GOLDFISH_META[match.dataset.id]);
  const meta=[...row.querySelectorAll('.metaPercent')].map((cell,i)=>'<div><small>'+[7,14,30][i]+' days</small>'+cell.innerHTML+'</div>').join('');
  let outs='',seen=new Set();for(const [name,cards] of groups){const chosen=cards.filter(c=>p.outs[c]).map(c=>{seen.add(c);return [c,p.outs[c]];});if(chosen.length)outs+='<div class="mobile-out-group45">'+name+'</div>'+renderCards(chosen);}
  const extra=Object.entries(p.outs).filter(([c])=>!seen.has(c));if(extra.length)outs+=renderCards(extra);
  card.innerHTML='<summary>'+match.innerHTML+'</summary><div class="mobile-plan-body45"><div class="mobile-meta45">'+meta+'</div><p class="mobile-role45">'+esc(p.role)+' · '+esc(trend.text)+' (7d − 30d)</p><h4>IN · '+total(p.ins)+'</h4>'+renderCards(Object.entries(p.ins))+'<h4 class="mobile-outs45">OUT · '+total(p.outs)+'</h4>'+outs+'<button type="button">Full matchup notes →</button></div>';
  card.querySelector('button').addEventListener('click',()=>match.click());list.append(card);rows.push({card,category,name:p.name.toLowerCase()});
 });
 host.querySelector('input').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();rows.forEach(r=>r.card.hidden=!r.name.includes(q));for(const h of list.querySelectorAll('h3'))h.hidden=!rows.some(r=>r.category===h&&!r.card.hidden);host.querySelector('.mobile-empty45').hidden=rows.some(r=>!r.card.hidden);});
 host.querySelector('.mobile-map-toolbar45 button').addEventListener('click',e=>{const show=map.classList.toggle('show-matrix45');e.currentTarget.textContent=show?'Show cards':'Show table';e.currentTarget.setAttribute('aria-pressed',String(show));host.querySelector('input').hidden=show;window.dispatchEvent(new Event('resize'));});
})();
