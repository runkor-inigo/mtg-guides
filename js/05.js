// Home (9 Oct 2026): four cards, one per menu part; each opens the guide at that part's first section.
(function guideLibrary(){
 const home=document.getElementById('guide-library');
 const firstCard=()=>home.querySelector('[data-open]');
 function showGuide(open,quiet){
  home.hidden=open;
  document.body.classList.toggle('guide-home',!open);
  document.querySelector('main').setAttribute('aria-hidden',String(!open));
  window.scrollTo({top:0,behavior:'instant'});
  window.dispatchEvent(new Event('resize'));
  if(open)syncGuideHash(guideNav.active);
  else history.replaceState(null,'',location.pathname+location.search);
  // Opening lands on the skip link (shown only to keyboard users); the back button is the next stop.
  if(!quiet)(open?(document.querySelector('[data-skip]')||guideNav.backButton):firstCard())?.focus({preventScroll:true});
  // js/15.js starts or pauses the home videos.
  document.dispatchEvent(new CustomEvent('guide:home',{detail:{visible:!open}}));
 }
 // A hash naming a section or an element in one (see guideTarget in js/01.js) opens the guide there.
 function openFromHash(quiet){
  const t=guideTarget(location.hash);
  if(!t)return;
  if(document.body.classList.contains('guide-home'))showGuide(true,quiet);
  guideNav.select(t.section);
  t.el?.scrollIntoView({block:'start'});
 }
 document.querySelector('main').setAttribute('aria-hidden','true');
 home.addEventListener('click',e=>{
  const card=e.target.closest('[data-open]');
  if(!card)return;
  guideNav.select(card.dataset.open);
  showGuide(true);
 });
 // The back buttons live in the menu (js/menu.js, brand option).
 document.addEventListener('click',e=>{if(e.target.closest('[data-all-guides]'))showGuide(false);});
 addEventListener('hashchange',()=>openFromHash(false));
 openFromHash(true);
})();
