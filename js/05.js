// RC50: one guide entry today; the grid can hold additional guides or versions.
(function guideLibrary(){
 const home=document.getElementById('guide-library');
 const entry=document.getElementById('open-speaker-guide');
 const back=document.getElementById('all-guides');
 const art=COMBO_CARD_ART['Formidable Speaker'];
 if(art)document.getElementById('speaker-guide-art').src=art.src;
 function showGuide(open){
  home.hidden=open;
  document.body.classList.toggle('guide-home',!open);
  document.querySelector('header').setAttribute('aria-hidden',String(!open));
  document.querySelector('main').setAttribute('aria-hidden',String(!open));
  window.scrollTo({top:0,behavior:'instant'});
  window.dispatchEvent(new Event('resize'));
  (open?back:entry).focus({preventScroll:true});
 }
 document.querySelector('header').setAttribute('aria-hidden','true');
 document.querySelector('main').setAttribute('aria-hidden','true');
 // Light the card up and let its ring play before the guide opens (instant without motion).
 entry.addEventListener('click',()=>{
  const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const still=root.classList.contains('motion-off')||(reduce&&!root.classList.contains('motion-on'));
  if(still)return showGuide(true);
  entry.classList.add('is-pressed');
  setTimeout(()=>{entry.classList.remove('is-pressed');showGuide(true);},280);
 });
 back.addEventListener('click',()=>showGuide(false));
})();
