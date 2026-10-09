// Home (css/15.css): forest video, Durin's door and the cards' cursor parallax. Runs after js/05.js.
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
 // The door clip (12.7 s) loops on its own: it draws in, stays lit, fades out and rests in black
 // for about 2.5 s. Its two abrupt frames in the original reveal were smoothed when it was cut.
 function load(v){if(!v.src&&v.dataset.src){v.src=v.dataset.src;v.load();}}
 function sync(){
  const still=!moving()||saveData;
  root.classList.toggle('is-still',still);
  if(still||!visible()){forest.pause();door.pause();return;}
  load(forest);load(door);
  forest.play().catch(()=>{});door.play().catch(()=>{});
 }
 document.addEventListener('guide:home',sync);
 document.addEventListener('visibilitychange',sync);
 if(reduce.addEventListener)reduce.addEventListener('change',sync);
 new MutationObserver(sync).observe(html,{attributes:true,attributeFilter:['class']});
 sync();

 /* ---- Card art on hover: depth parallax (a shift and a slight 3D tilt that follow the cursor).
    Natural Order (data-zoom="eyes") also pushes in towards the leopard's eyes. ---- */
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 root.querySelectorAll('.home-card').forEach(card=>{
  const art=card.querySelector('.home-art'),img=art.querySelector('.home-art-img');
  let live=false;
  function stop(){live=false;['--s','--px','--py','--rx','--ry'].forEach(p=>img.style.removeProperty(p));}
  card.addEventListener('pointerenter',()=>{
   if(!fine.matches||!moving())return;
   live=true;
   img.style.setProperty('--s',art.dataset.zoom==='eyes'?'1.35':'1.06');
  });
  card.addEventListener('pointermove',e=>{
   if(!live)return;
   const r=art.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width-.5,my=(e.clientY-r.top)/Math.max(1,r.height)-.5;
   img.style.setProperty('--px',(-mx*22).toFixed(1)+'px');img.style.setProperty('--py',(-my*14).toFixed(1)+'px');
   img.style.setProperty('--ry',(mx*7).toFixed(2)+'deg');img.style.setProperty('--rx',(-my*6).toFixed(2)+'deg');
  });
  card.addEventListener('pointerleave',stop);
  document.addEventListener('guide:home',e=>{if(!e.detail.visible)stop();});
 });
})();
