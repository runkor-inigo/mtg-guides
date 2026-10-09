// Home (css/15.css): forest video, Durin's door and the card effects. Runs after js/05.js.
(function home(){
 const root=document.getElementById('guide-library');
 if(!root)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const html=document.documentElement;
 // Motion follows the menu's Animations switch (js/menu.js), then the system setting.
 const moving=()=>!html.classList.contains('motion-off')&&(html.classList.contains('motion-on')||!reduce.matches);
 const saveData=!!(navigator.connection&&navigator.connection.saveData);
 const visible=()=>document.body.classList.contains('guide-home')&&!document.hidden;

 /* ---- Videos: loaded only while the home is on screen and motion is welcome; a deep link (/#matchups) never fetches them ---- */
 const forest=root.querySelector('.home-forest'),door=root.querySelector('.home-door');
 const RATE=18/16;   // the door clip lasts 18 s; at this rate it lasts 16 s, one forest loop
 function load(v){if(!v.src&&v.dataset.src){v.src=v.dataset.src;v.load();}}
 function sync(){
  const still=!moving()||saveData;
  root.classList.toggle('is-still',still);
  if(still||!visible()){forest.pause();door.pause();return;}
  load(forest);load(door);
  door.playbackRate=RATE;
  forest.play().catch(()=>{});door.play().catch(()=>{});
 }
 // The door restarts with every forest loop, so the two stay in step.
 let last=0;
 forest.addEventListener('timeupdate',()=>{
  const t=forest.currentTime;
  if(t<last-1){door.currentTime=0;door.playbackRate=RATE;}
  last=t;
 });
 forest.addEventListener('playing',()=>{door.currentTime=forest.currentTime*RATE;});
 document.addEventListener('guide:home',sync);
 document.addEventListener('visibilitychange',sync);
 if(reduce.addEventListener)reduce.addEventListener('change',sync);
 new MutationObserver(sync).observe(html,{attributes:true,attributeFilter:['class']});
 sync();

 /* ---- Card art on hover: parallax towards the focal point, plus each card's own effect ---- */
 // Particles in 0–1 coordinates of the art box.
 const FX={
  leaves:{n:16,make:()=>({x:Math.random()*1.1-.05,y:-.1-Math.random()*.6,vx:.0015+Math.random()*.002,vy:.003+Math.random()*.003,r:Math.random()*6.3,vr:(Math.random()-.5)*.08,s:4+Math.random()*4,c:['#d9672e','#c4442b','#e39a3b','#b8552a'][Math.random()*4|0],ph:Math.random()*6}),
   step:(p,t)=>{p.x+=p.vx+Math.sin(t/600+p.ph)*.0015;p.y+=p.vy;p.r+=p.vr;return p.y<1.1;},
   draw:(g,p,W,H)=>{g.save();g.translate(p.x*W,p.y*H);g.rotate(p.r);g.fillStyle=p.c;g.globalAlpha=.9;g.beginPath();g.ellipse(0,0,p.s,p.s*.45,0,0,6.3);g.fill();g.restore();}},
  thoughts:{n:26,make:()=>({x:.5+Math.random()*.3,y:.62+Math.random()*.2,vx:(Math.random()-.5)*.0015,vy:-(.002+Math.random()*.004),a:1,s:1+Math.random()*2.2,ph:Math.random()*6}),
   step:(p,t)=>{p.x+=p.vx+Math.sin(t/300+p.ph)*.0008;p.y+=p.vy;p.a-=.008;return p.a>0&&p.y>-.05;},
   draw:(g,p,W,H)=>{const x=p.x*W,y=p.y*H,r=p.s*3.2,gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(255,236,246,'+p.a+')');gr.addColorStop(.4,'rgba(255,150,200,'+p.a*.6+')');gr.addColorStop(1,'rgba(255,120,190,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,6.3);g.fill();}},
  fairy:{n:1,make:()=>({t0:performance.now(),trail:[]}),
   step:(p,t)=>{const k=(t-p.t0)/1000,x=.5+Math.sin(k*1.3)*.22,y=.5+Math.sin(k*2.6)*.12-Math.cos(k*.7)*.05;p.trail.unshift({x,y,a:1});if(p.trail.length>26)p.trail.pop();p.trail.forEach((d,i)=>{d.a=1-i/26;d.y+=.0012;});return true;},
   draw:(g,p,W,H)=>{p.trail.forEach((d,i)=>{const x=d.x*W,y=d.y*H,r=i?2.2*d.a+.6:7,gr=g.createRadialGradient(x,y,0,x,y,r*2.4);gr.addColorStop(0,'rgba(255,248,214,'+d.a+')');gr.addColorStop(.5,'rgba(240,215,122,'+d.a*.55+')');gr.addColorStop(1,'rgba(240,215,122,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,r*2.4,0,6.3);g.fill();});}}
 };
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 root.querySelectorAll('.home-card').forEach(card=>{
  const art=card.querySelector('.home-art'),img=art.querySelector('.home-art-img'),cv=art.querySelector('.home-fx'),g=cv.getContext('2d');
  const kinds=(art.dataset.fx||'').split(' ').filter(k=>FX[k]),gaze=kinds.length===0&&/gaze/.test(art.dataset.fx);
  let parts={},raf=0;
  function frame(){
   const W=cv.width,H=cv.height,t=performance.now();
   g.clearRect(0,0,W,H);
   kinds.forEach(k=>{const f=FX[k],list=parts[k]||(parts[k]=[]);
    while(list.length<f.n)list.push(f.make());
    for(let i=list.length-1;i>=0;i--){if(!f.step(list[i],t))list[i]=f.make();f.draw(g,list[i],W,H);}
   });
   raf=requestAnimationFrame(frame);
  }
  function stop(){cancelAnimationFrame(raf);raf=0;parts={};g.clearRect(0,0,cv.width,cv.height);card.classList.remove('is-live');['--s','--px','--py'].forEach(p=>img.style.removeProperty(p));}
  card.addEventListener('pointerenter',()=>{
   if(!fine.matches||!moving())return;
   const r=cv.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);
   cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);
   card.classList.add('is-live');
   if(gaze)img.style.setProperty('--s','1.16');   // Natural Order: closer to the leopard's eyes
   if(kinds.length&&!raf)frame();
  });
  card.addEventListener('pointermove',e=>{
   if(!card.classList.contains('is-live'))return;
   const r=art.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width-.5,my=(e.clientY-r.top)/Math.max(1,r.height)-.5;
   img.style.setProperty('--px',(-mx*26).toFixed(1)+'px');img.style.setProperty('--py',(-my*16).toFixed(1)+'px');
  });
  card.addEventListener('pointerleave',stop);
  document.addEventListener('guide:home',e=>{if(!e.detail.visible)stop();});
 });
})();
