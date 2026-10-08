// RC50: one guide entry today; the grid can hold additional guides or versions.
(function guideLibrary(){
 const home=document.getElementById('guide-library');
 const entry=document.getElementById('open-speaker-guide');
 const back=document.getElementById('all-guides');
 const art=COMBO_CARD_ART['Formidable Speaker'];
 if(art)document.getElementById('speaker-guide-art').src=art.src;
 function showGuide(open,quiet){
  home.hidden=open;
  document.body.classList.toggle('guide-home',!open);
  document.querySelector('header').setAttribute('aria-hidden',String(!open));
  document.querySelector('main').setAttribute('aria-hidden',String(!open));
  window.scrollTo({top:0,behavior:'instant'});
  window.dispatchEvent(new Event('resize'));
  if(open)syncGuideHash(guideNav.active);
  else history.replaceState(null,'',location.pathname+location.search);
  if(!quiet)(open?back:entry).focus({preventScroll:true});
 }
 // A hash naming a section or an element in one (see guideTarget in js/01.js) opens the guide there.
 function openFromHash(quiet){
  const t=guideTarget(location.hash);
  if(!t)return;
  if(document.body.classList.contains('guide-home'))showGuide(true,quiet);
  guideNav.select(t.section);
  t.el?.scrollIntoView({block:'start'});
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
 addEventListener('hashchange',()=>openFromHash(false));
 openFromHash(true);
})();
