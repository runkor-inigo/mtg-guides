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
 // The door clip is 8 s (drawing in, then fading out; the still stretch of the original was cut),
 // half a forest loop, so it plays twice per loop and restarts with it.
 const DOOR=8;
 function load(v){if(!v.src&&v.dataset.src){v.src=v.dataset.src;v.load();}}
 function sync(){
  const still=!moving()||saveData;
  root.classList.toggle('is-still',still);
  if(still||!visible()){forest.pause();door.pause();return;}
  load(forest);load(door);
  forest.play().catch(()=>{});door.play().catch(()=>{});
 }
 // The door restarts with every forest loop, so the two stay in step.
 let last=0;
 forest.addEventListener('timeupdate',()=>{
  const t=forest.currentTime;
  if(t<last-1)door.currentTime=0;
  last=t;
 });
 forest.addEventListener('playing',()=>{door.currentTime=forest.currentTime%DOOR;});
 document.addEventListener('guide:home',sync);
 document.addEventListener('visibilitychange',sync);
 if(reduce.addEventListener)reduce.addEventListener('change',sync);
 new MutationObserver(sync).observe(html,{attributes:true,attributeFilter:['class']});
 sync();

 /* ---- Card art on hover: depth parallax (shift and a slight 3D tilt) plus each card's own effect.
    Effects start from real points of the illustration (data-anchor, as % of the image), mapped into the card. ---- */
 const TAU=Math.PI*2,rnd=(a,b)=>a+Math.random()*(b-a);
 // Leaf: pointed at both ends, with a midrib, in the reds and oranges of Formidable Speaker's leaves.
 function leaf(g,x,y,s,rot,flip,col){
  g.save();g.translate(x,y);g.rotate(rot);g.scale(flip,1);
  g.fillStyle=col;g.beginPath();g.moveTo(-s,0);g.quadraticCurveTo(0,-s*.55,s,0);g.quadraticCurveTo(0,s*.55,-s,0);g.fill();
  g.strokeStyle='rgba(60,18,8,.55)';g.lineWidth=Math.max(.6,s*.08);g.beginPath();g.moveTo(-s*.9,0);g.lineTo(s*.95,0);g.stroke();
  g.restore();
 }
 // Four-point star, like the specks in Thoughtseize's art.
 function star(g,x,y,r,a){
  g.save();g.globalAlpha=a;g.fillStyle='#fff7fb';g.beginPath();
  for(let k=0;k<8;k++){const rr=k%2?r*.22:r,an=k*Math.PI/4-Math.PI/2;g.lineTo(x+Math.cos(an)*rr,y+Math.sin(an)*rr);}
  g.closePath();g.fill();
  const gr=g.createRadialGradient(x,y,0,x,y,r*1.6);gr.addColorStop(0,'rgba(255,214,236,.55)');gr.addColorStop(1,'rgba(255,214,236,0)');
  g.fillStyle=gr;g.beginPath();g.arc(x,y,r*1.8,0,TAU);g.fill();g.restore();
 }
 function glow(g,x,y,r,col,a){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,col.replace('A',a));gr.addColorStop(1,col.replace('A',0));g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();}
 const LEAF=['#c4472a','#d8622e','#b23a24','#e08a3a','#a83322'];
 // Each effect gets the anchors in canvas pixels (A) and the canvas size; it returns a particle and steps/draws it.
 const FX={
  leaves:{n:14,make:(A,W,H)=>{const h=A[Math.random()*A.length|0];return{x:h.x+rnd(-8,8),y:h.y+rnd(-6,6),vx:rnd(-.5,.5)+(h.x<W/2?-.25:.25),vy:rnd(-.9,-.3),g:.012,s:rnd(4,7),r:rnd(0,TAU),vr:rnd(-.05,.05),f:rnd(0,TAU),c:LEAF[Math.random()*LEAF.length|0],life:0};},
   step:(p,t,W,H)=>{p.vy+=p.g;p.x+=p.vx+Math.sin(t/500+p.f)*.35;p.y+=p.vy;p.r+=p.vr;p.life++;return p.y<H+12&&p.x>-12&&p.x<W+12;},
   draw:(g,p,t)=>leaf(g,p.x,p.y,p.s,p.r,Math.cos(t/260+p.f),p.c)},
  stars:{n:22,make:(A)=>{const h=A[Math.random()*A.length|0];return{x:h.x+rnd(-45,45),y:h.y+rnd(-25,25),ph:rnd(0,TAU),sp:rnd(.6,1.4),amp:rnd(6,14),r:rnd(4,7.5),life:0,max:rnd(90,170)};},
   step:p=>++p.life<p.max,
   draw:(g,p,t)=>{const a=Math.sin(Math.PI*p.life/p.max),y=p.y+Math.sin(t/700*p.sp+p.ph)*p.amp;star(g,p.x,y,p.r*(.7+.3*Math.sin(t/180+p.ph)),a);}},
  seeds:{n:12,make:(A,W,H)=>{const h=A[1]||A[0];return{x:h.x+rnd(-50,50),y:h.y+rnd(-5,10),vy:rnd(-.45,-.2),ph:rnd(0,TAU),s:rnd(2.5,4)};},
   step:(p,t)=>{p.y+=p.vy;p.x+=Math.sin(t/900+p.ph)*.3;return p.y>-10;},
   draw:(g,p)=>{g.save();g.strokeStyle='rgba(255,255,250,.75)';g.lineWidth=.7;for(let k=0;k<7;k++){const an=-Math.PI/2+(k-3)*.32;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x+Math.cos(an)*p.s*1.6,p.y+Math.sin(an)*p.s*1.6);g.stroke();}glow(g,p.x,p.y,p.s,'rgba(255,255,240,A)',.8);g.restore();}},
  fairy:{n:1,make:()=>({t0:performance.now(),trail:[]}),
   step:(p,t,W,H,A)=>{const h=A[0],k=(t-p.t0)/1000,x=h.x+Math.sin(k*1.7)*W*.12,y=h.y+Math.sin(k*3.1)*H*.08-Math.abs(Math.sin(k*.9))*H*.06;p.trail.unshift({x,y});if(p.trail.length>22)p.trail.pop();return true;},
   draw:(g,p)=>p.trail.forEach((d,i)=>{const a=1-i/22;glow(g,d.x,d.y,i?3.5*a+1:9,'rgba(255,240,190,A)',a*(i?.6:1));})},
  gaze:{n:1,make:()=>({t0:performance.now()}),
   step:()=>true,
   // A glint in each eye once the push-in has arrived, as if it looked up at you.
   draw:(g,p,t,A)=>{const k=Math.min(1,Math.max(0,(t-p.t0-500)/600)),a=k*(.55+.45*Math.sin((t-p.t0)/380));A.forEach(e=>{glow(g,e.x,e.y,12,'rgba(225,255,150,A)',a*.85);g.save();g.globalAlpha=a;g.fillStyle='#fffbe0';g.beginPath();g.arc(e.x+1.5,e.y-1.5,2.2,0,TAU);g.fill();g.restore();});}}
 };
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 root.querySelectorAll('.home-card').forEach(card=>{
  const art=card.querySelector('.home-art'),img=art.querySelector('.home-art-img'),cv=art.querySelector('.home-fx'),g=cv.getContext('2d');
  const kinds=(art.dataset.fx||'').split(' ').filter(k=>FX[k]);
  const anchors=(art.dataset.anchor||'50% 50%').split(';').map(a=>a.trim().split(/\s+/).map(v=>parseFloat(v)/100));
  const src=(getComputedStyle(art).getPropertyValue('--img').match(/url\(["']?([^"')]+)/)||[])[1];
  const pic=new Image();if(src)pic.src=src;
  let parts={},raf=0,A=[],dpr=1;
  // Image point (0–1) → canvas pixels, through background-size:cover, background-position and the layer's transform.
  function mapAnchors(){
   const iw=pic.naturalWidth,ih=pic.naturalHeight;if(!iw)return [];
   const cs=getComputedStyle(img),W=img.offsetWidth,H=img.offsetHeight,sc=Math.max(W/iw,H/ih);
   const pos=cs.backgroundPosition.split(' ').map(v=>parseFloat(v)/100);
   const ox=(W-iw*sc)*pos[0],oy=(H-ih*sc)*(pos[1]??.5);
   const ir=img.getBoundingClientRect(),cr=cv.getBoundingClientRect(),k=ir.width/W;
   return anchors.map(([u,v])=>({x:ir.left-cr.left+(ox+u*iw*sc)*k,y:ir.top-cr.top+(oy+v*ih*sc)*k}));
  }
  function frame(){
   // Drawn in CSS pixels; the canvas itself is sharper on high-density screens.
   const W=cv.width/dpr,H=cv.height/dpr,t=performance.now();
   A=mapAnchors();
   g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
   if(A.length)kinds.forEach(k=>{const f=FX[k],list=parts[k]||(parts[k]=[]);
    while(list.length<f.n)list.push(f.make(A,W,H));
    for(let i=list.length-1;i>=0;i--){if(!f.step(list[i],t,W,H,A))list[i]=f.make(A,W,H);f.draw(g,list[i],t,A);}
   });
   raf=requestAnimationFrame(frame);
  }
  function stop(){cancelAnimationFrame(raf);raf=0;parts={};g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cv.width,cv.height);card.classList.remove('is-live');['--s','--px','--py','--rx','--ry'].forEach(p=>img.style.removeProperty(p));}
  card.addEventListener('pointerenter',()=>{
   if(!fine.matches||!moving())return;
   const r=cv.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);
   cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr);
   card.classList.add('is-live');
   img.style.setProperty('--s',kinds.includes('gaze')?'1.35':'1.06');   // Natural Order: a clear push-in to the leopard's eyes
   if(kinds.length&&!raf)frame();
  });
  card.addEventListener('pointermove',e=>{
   if(!card.classList.contains('is-live'))return;
   const r=art.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width-.5,my=(e.clientY-r.top)/Math.max(1,r.height)-.5;
   img.style.setProperty('--px',(-mx*22).toFixed(1)+'px');img.style.setProperty('--py',(-my*14).toFixed(1)+'px');
   img.style.setProperty('--ry',(mx*7).toFixed(2)+'deg');img.style.setProperty('--rx',(-my*6).toFixed(2)+'deg');
  });
  card.addEventListener('pointerleave',stop);
  document.addEventListener('guide:home',e=>{if(!e.detail.visible)stop();});
 });
})();
