/* Mulligans: opening-hand odds. The baseline is read from the decklist in Current 75 (#deck) every
   time the page loads, so a new list updates the table without touching this file. Only a card name
   that is new to the deck needs adding to one of the sets below. The sliders change a temporary copy;
   nothing is stored. */
(function mulliganOdds(){
 const box=document.getElementById('mull-odds');if(!box)return;
 const FETCHES=new Set(['Misty Rainforest','Verdant Catacombs','Windswept Heath','Wooded Foothills','Marsh Flats','Bloodstained Mire','Polluted Delta','Prismatic Vista']);
 // Lands that give green mana on turn one (fetches find Forest or Bayou).
 const T1_GREEN=new Set([...FETCHES,'Forest','Snow-Covered Forest','Bayou','Savannah','Taiga','Tropical Island','Boseiju, Who Endures']);
 // One-mana creatures that tap for mana on turn two.
 const DORKS=new Set(['Llanowar Elves','Elvish Mystic','Fyndhorn Elves','Elves of Deep Shadow','Boreal Druid','Arbor Elf','Birds of Paradise','Noble Hierarch','Delighted Halfling']);
 const GSZ="Green Sun's Zenith",ARBOR='Dryad Arbor',OUAT='Once Upon a Time';
 const plain=s=>s.replace(/[’‘]/g,"'").trim();

 // Read the current main deck.
 const main=[];
 for(const part of document.querySelectorAll('#deck .deckgrid > .box')){
  if(!/^Main/i.test(part.querySelector('h3')?.textContent||''))continue;
  for(const row of part.querySelectorAll('.deckrow')){
   const name=plain(row.querySelector('.deck38-name')?.textContent||row.children[1]?.textContent||'');
   const qty=Number(row.querySelector('.q')?.textContent)||0;if(name&&qty)main.push({name,qty});
  }
 }
 if(!main.length)return;
 const count=test=>main.filter(c=>test(c.name)).reduce((a,c)=>a+c.qty,0);
 const hasArbor=count(n=>n===ARBOR)>0;
 const BASE={deck:count(()=>true),source:count(n=>T1_GREEN.has(n)),dork:count(n=>DORKS.has(n)),gsz:hasArbor?count(n=>n===GSZ):0,ouat:count(n=>n===OUAT)};
 const listName=(document.querySelector('#deck .note b')?.textContent.match(/Current list · ([^(.]+)/)||[])[1]?.trim();
 const listLabel=listName?listName+' list':'Current list';

 // Method text, built from the same counts.
 const parts=[];const fetchN=count(n=>FETCHES.has(n));if(fetchN)parts.push(fetchN+(fetchN>1?' fetches':' fetch'));
 for(const c of main)if(T1_GREEN.has(c.name)&&!FETCHES.has(c.name))parts.push(c.qty+' '+c.name.replace(/, Who Endures$/,''));
 document.getElementById('odds-method').innerHTML=`${BASE.deck}-card main deck (${esc(listLabel)}), cards seen by turn one (seven on the play, eight on the draw), before any mulligan and with no opposing interaction. <b>Green source</b>: one of the ${BASE.source} lands that give green on turn one (${esc(parts.join(', '))}); Gaea’s Cradle and Dryad Arbor do not count. <b>Accelerator</b>: one of the ${BASE.dork} one-mana dorks`+(BASE.gsz?`, or one of the ${BASE.gsz} Green Sun’s Zenith for Dryad Arbor.`:'.');

 // Exact odds. Categories: S sources, A accelerators (D dorks + G Zeniths), O Once Upon a Time, X the rest.
 const C=(n,k)=>{if(k<0||k>n)return 0;k=Math.min(k,n-k);let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r;};
 function odds(v,seen){
  const N=v.deck,S=v.source,D=v.dork,A=D+v.gsz,O=v.ouat,X=N-S-A-O,R=N-seen,total=C(N,seen);
  const hitTop5=k=>1-C(R-k,5)/C(R,5);
  let source=0,accel=0,extra=0;
  for(let s=0;s<=seen;s++)for(let a=0;a<=seen-s;a++)for(let o=0;o<=seen-s-a;o++){
   const p=C(S,s)*C(A,a)*C(O,o)*C(X,seen-s-a-o)/total;if(!p)continue;
   if(s)source+=p;
   if(s&&a)accel+=p;
   else if(o&&s)extra+=p*hitTop5(D);   // has a source, OUAT looks for a dork
   else if(o&&a)extra+=p*hitTop5(S);   // has an accelerator, OUAT looks for a source
  }
  return {source,accel,ouat:accel+extra};
 }
 const pct=x=>(100*x).toFixed(1)+'%';
 const baseOdds=[odds(BASE,7),odds(BASE,8)];

 // Controls.
 const FIELDS=[['deck','Cards in the main deck',60,80],['source','Green sources for turn one',0,30],['dork','One-mana dorks',0,16],['gsz','Green Sun’s Zenith (for Dryad Arbor)',0,4],['ouat','Once Upon a Time',0,4]];
 const wrap=document.getElementById('odds-inputs'),reset=document.getElementById('odds-reset'),basis=document.getElementById('odds-basis');
 const val={...BASE},inputs={};
 for(const [key,label,min,max] of FIELDS){
  const id='odds-'+key,row=document.createElement('div');row.className='odds-field';
  row.innerHTML=`<label for="${id}">${label}</label><input type="range" id="${id}" min="${Math.min(min,BASE[key])}" max="${Math.max(max,BASE[key])}" step="1" value="${BASE[key]}"><output for="${id}">${BASE[key]}</output><span class="odds-was">list ${BASE[key]}</span>`;
  wrap.append(row);inputs[key]=row.querySelector('input');
  inputs[key].addEventListener('input',()=>{val[key]=Number(inputs[key].value);fit(key);render();});
 }
 // Keep the named cards inside the deck: grow the deck, or trim the card just moved.
 function fit(moved){
  const named=val.source+val.dork+val.gsz+val.ouat;
  if(named<=val.deck)return;
  if(moved==='deck'){val.deck=Math.min(Number(inputs.deck.max),named);}
  else{val.deck=Math.min(Number(inputs.deck.max),named);const over=val.source+val.dork+val.gsz+val.ouat-val.deck;if(over>0)val[moved]-=over;}
 }
 function render(){
  for(const k in inputs){inputs[k].value=val[k];inputs[k].nextElementSibling.textContent=val[k];inputs[k].closest('.odds-field').classList.toggle('changed',val[k]!==BASE[k]);}
  const changed=Object.keys(BASE).some(k=>val[k]!==BASE[k]);
  const now=changed?[odds(val,7),odds(val,8)]:baseOdds;
  for(const row of box.querySelectorAll('tr[data-odds]')){
   const key=row.dataset.odds;
   row.querySelectorAll('td').forEach((td,i)=>{
    const diff=100*(now[i][key]-baseOdds[i][key]);
    td.innerHTML=pct(now[i][key])+(changed&&Math.abs(diff)>=.05?` <small class="${diff>0?'up':'down'}">${diff>0?'+':'−'}${Math.abs(diff).toFixed(1)}</small>`:'');
   });
  }
  basis.textContent=changed?'Your counts · not the current list':listLabel+' · '+BASE.deck+' cards';
  basis.classList.toggle('changed',changed);reset.disabled=!changed;
 }
 reset.addEventListener('click',()=>{Object.assign(val,BASE);render();});
 render();
})();
