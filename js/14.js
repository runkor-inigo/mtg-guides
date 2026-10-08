// Deck Origins as an interactive timeline (8 Oct 2026): a rail of milestones and one open card below.
// The <ol class="timeline"> stays in the HTML as the no-JS version and the single source of the text;
// this script only reads it. The active milestone pulses (mint to gold) unless motion is off.
(function originsTimeline(){
 const pane=document.getElementById('origins'),list=pane?.querySelector('ol.timeline');
 if(!list)return;
 const items=[...list.children].filter(li=>li.querySelector('.when')&&li.querySelector('h4'));
 if(items.length<2)return;
 const ms=items.map(li=>({when:li.querySelector('.when').textContent.trim(),title:li.querySelector('h4').textContent.trim(),body:li.querySelector('.when').nextElementSibling}));
 const box=document.createElement('div');box.className='otl';
 box.innerHTML=`<div class="otl-rail" role="tablist" aria-label="Milestones">${ms.map((m,i)=>`<button type="button" role="tab" class="otl-node" id="otl-t${i}" aria-controls="otl-panel" aria-selected="false" tabindex="-1" data-i="${i}">
   <span class="otl-when">${esc(m.when)}</span><span class="otl-dot" aria-hidden="true"></span><span class="otl-title">${esc(m.title)}</span></button>`).join('')}</div>
  <div class="otl-panel" id="otl-panel" role="tabpanel" aria-live="polite"></div>`;
 list.before(box);pane.classList.add('otl-on');
 const rail=box.querySelector('.otl-rail'),panel=box.querySelector('.otl-panel'),nodes=[...rail.querySelectorAll('.otl-node')];
 const still=()=>{const r=document.documentElement;return r.classList.contains('motion-off')||(matchMedia('(prefers-reduced-motion: reduce)').matches&&!r.classList.contains('motion-on'));};
 let cur=-1;
 // The line runs from the first dot to the last; the lit part ends at the active dot. Measured, because the
 // milestones stretch with the rail.
 function line(){
  const dots=rail.querySelectorAll('.otl-dot'),r=rail.getBoundingClientRect(),x=d=>{const b=d.getBoundingClientRect();return b.left-r.left+rail.scrollLeft+b.width/2;};
  const first=x(dots[0]),last=x(dots[dots.length-1]),y=dots[0].getBoundingClientRect().top-r.top+dots[0].offsetHeight/2;
  rail.style.setProperty('--otl-l',first+'px');rail.style.setProperty('--otl-w',(last-first)+'px');rail.style.setProperty('--otl-y',(y-1)+'px');
  rail.style.setProperty('--otl-f',(cur<0?0:x(dots[cur])-first)+'px');
 }
 // Recalculate when the rail changes size, including when Deck Origins opens after being hidden.
 if(window.ResizeObserver)new ResizeObserver(()=>line()).observe(rail);else addEventListener('resize',()=>line());
 function open(i,focus){
  if(i<0||i>=ms.length)return;
  cur=i;
  nodes.forEach((n,k)=>{n.setAttribute('aria-selected',String(k===i));n.tabIndex=k===i?0:-1;n.classList.toggle('past',k<i);});
  line();
  const m=ms[i],body=m.body.cloneNode(true);body.querySelector('h4')?.remove();
  panel.setAttribute('aria-labelledby','otl-t'+i);
  panel.innerHTML=`<header class="otl-head"><span class="otl-step">${i+1} / ${ms.length}</span><span class="otl-pwhen">${esc(m.when)}</span><h3>${esc(m.title)}</h3></header><div class="otl-body"></div>
   <nav class="otl-nav" aria-label="Milestone navigation">${i>0?`<button type="button" class="otl-step-btn" data-go="${i-1}">← ${esc(ms[i-1].when)} · ${esc(ms[i-1].title)}</button>`:'<span></span>'}${i<ms.length-1?`<button type="button" class="otl-step-btn next" data-go="${i+1}">${esc(ms[i+1].when)} · ${esc(ms[i+1].title)} →</button>`:''}</nav>`;
  panel.querySelector('.otl-body').append(...body.childNodes);
  panel.classList.remove('otl-in');void panel.offsetWidth;panel.classList.add('otl-in');
  // Keep the active milestone in view on narrow screens, where the rail scrolls sideways.
  const n=nodes[i],r=rail.getBoundingClientRect(),b=n.getBoundingClientRect();
  if(b.left<r.left||b.right>r.right)rail.scrollTo({left:rail.scrollLeft+b.left-r.left-(r.width-b.width)/2,behavior:still()?'auto':'smooth'});
  if(focus)n.focus({preventScroll:true});
 }
 rail.addEventListener('click',e=>{const n=e.target.closest('.otl-node');if(n)open(+n.dataset.i);});
 rail.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
  if(k){e.preventDefault();open(Math.min(ms.length-1,Math.max(0,cur+k)),true);}else if(e.key==='Home'){e.preventDefault();open(0,true);}else if(e.key==='End'){e.preventDefault();open(ms.length-1,true);}});
 panel.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)open(+b.dataset.go,true);});
 // Opens on the deck this guide is about; the arrows and the rail walk back through its history.
 open(ms.length-1);
})();
