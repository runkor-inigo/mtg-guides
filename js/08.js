// Desktop header compacts after scrolling; styles live in css/09.css.
(function compactHeader(){
 const header=document.querySelector('body > header');
 const desktop=matchMedia('(min-width:761px)');
 let compact=false,settling=0,ticking=false;
 // Reserve only the expanded height; skip while compact or mid-transition.
 function measure(){if(!compact&&!settling&&header.offsetHeight)document.body.style.setProperty('--header-h',header.offsetHeight+'px');}
 function setCompact(on){
  if(on===compact)return;
  compact=on;header.classList.toggle('is-compact',on);
  clearTimeout(settling);
  settling=setTimeout(()=>{settling=0;measure();window.dispatchEvent(new Event('scroll'));},350);
 }
 function update(){
  ticking=false;
  if(!desktop.matches||document.body.classList.contains('guide-home'))return setCompact(false);
  if(scrollY>80)setCompact(true);else if(scrollY<40)setCompact(false);
 }
 const request=()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}};
 addEventListener('scroll',request,{passive:true});
 addEventListener('resize',request);
 desktop.addEventListener('change',request);
 if('ResizeObserver' in window)new ResizeObserver(measure).observe(header);
 measure();update();
})();
