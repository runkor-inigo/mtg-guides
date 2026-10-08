const GF_BACK='assets/7605997900cd.webp';
// RC50: deterministic, reversible demonstrations. This is not a random game simulator.
const GF_NAMES={land:'Forest',dork:'Llanowar Elves',cradle:"Gaea's Cradle",cub:'Badgermole Cub',speaker:'Formidable Speaker',q:'Quirion Ranger',s1:'Wirewood Symbiote',s2:'Wirewood Symbiote',s3:'Wirewood Symbiote',saber:'Temur Sabertooth',no:'Natural Order',hoof:'Craterhoof Behemoth',land2:'Forest'};
const GF_LANDS=['land','land2'];
function buildGoldfish(mode,side){
 const states=[];let st={hand:[],board:[],grave:[],mana:0,turn:1,deck:53,pending:'',title:'Opening hand',text:'',action:'',gain:0};
 const name=id=>GF_NAMES[id]||'Unspecified card';
 const newcard=id=>({id,name:name(id),tapped:false,sick:true,used:false,animated:false});
 const card=id=>{const c=st.board.find(c=>c.id===id);if(!c)throw Error('Missing board card '+id);return c;};
 function step(title,text,fn=()=>{},action=''){const before=st.mana;fn();st.title=title;st.text=text;st.action=action;st.gain=st.mana-before;if(st.mana<0)throw Error('Negative mana: '+title);const ids=[...st.hand,...st.board.map(c=>c.id),...st.grave];if(new Set(ids).size!==ids.length)throw Error('Duplicate card at '+title);states.push(JSON.parse(JSON.stringify(st)));}
 const remove=id=>{const i=st.hand.indexOf(id);if(i<0)throw Error('Missing hand card '+id);st.hand.splice(i,1);};
 const put=id=>{remove(id);st.board.push(newcard(id));};
 const bounce=id=>{card(id);st.board=st.board.filter(c=>c.id!==id);st.hand.push(id);};
 const cast=(id,cost,pending='')=>step('Cast '+name(id),'Pay '+cost+' mana. '+(pending||'The spell resolves.'),()=>{st.mana-=cost;put(id);st.pending=pending;},'cast');
 const draw=id=>step('Draw for turn','Draw one unspecified card. Its identity does not matter for this line.',()=>{st.hand.push(id);st.deck--;},'draw');
 const land=id=>step('Play '+name(id),'Use this turn’s land drop.',()=>put(id),'land');
 const tapDork=()=>step('Tap the dork','Cub adds one extra green: the dork produces 2 green.',()=>{if(card('dork').sick||card('dork').tapped)throw Error('Illegal dork tap');card('dork').tapped=true;st.mana+=2;},'tap');
 const creatures=()=>st.board.filter(c=>!GF_LANDS.includes(c.id)&&(c.id!=='cradle'||c.animated)).length;
 const tapCradle=()=>{let n=creatures()+1;step('Tap Cradle → '+n+' green','Cradle counts '+(n-1)+' creatures, including itself. Cub adds one extra green.'+(st.hand.includes('speaker')?' Speaker in hand is not counted.':st.board.some(c=>c.id==='speaker'&&c.tapped)?' Tapped Speaker still counts.':''),()=>{if(card('cradle').tapped)throw Error('Cradle already tapped');card('cradle').tapped=true;st.mana+=n;},'tap');};
 const tutor=(discard,target)=>step('Discard → find '+name(target),'Resolve Speaker’s ETB. Discard '+name(discard)+' and put '+name(target)+' into your hand.',()=>{remove(discard);st.grave.push(discard);st.hand.push(target);st.deck--;st.pending='';},'tutor');
 const sym=(id,elf)=>step('Return '+name(elf)+' → untap Cradle','Activate '+name(id)+'. Returning the Elf is the cost. This Symbiote is now used for the turn.',()=>{if(card(id).used)throw Error('Symbiote used');card(id).used=true;bounce(elf);card('cradle').tapped=false;},'untap');
 const saberBounce=id=>step('Sabertooth → return '+name(id),'Pay {1}{G}. Return the creature to hand. Sabertooth gains indestructible this turn.',()=>{st.mana-=2;bounce(id);},'bounce');
 const speaker=()=>cast('speaker',3,'Speaker ETB on the stack: you may discard to search.');
 const decline=()=>step('Decline the discard','Resolve Speaker’s ETB without discarding or searching. No extra card is needed to keep looping.',()=>st.pending='','resolve');
 // Route 1 tail: Sabertooth loop (+2 green per cycle), then the Craterhoof finish.
 function loopAndFinish(){
  for(let cycle=1;cycle<=2;cycle++){saberBounce('s1');cast('s1',1);sym('s1','speaker');tapCradle();speaker();decline();step('Cycle '+cycle+' complete','Same board and hand as before the cycle, with two more green mana. No discards were consumed.');}
  step('Repeat 50 more cycles','Shortcut 50 identical legal cycles: 50 × 2 = 100 additional green. This is a finite demonstration of arbitrarily large mana.',()=>{st.mana+=100;st.cycles=52;},'repeat');
  saberBounce('speaker');speaker();saberBounce('speaker');tutor('speaker','hoof');
  cast('hoof',8,'Hoof ETB: count creatures for +X/+X and trample.');
  step('Resolve Hoof’s boost','Eight creatures are present. Each gets +8/+8 and trample. Cradle is still tapped; Cub, Sabertooth and the small creatures played this turn are summoning sick.',()=>{st.board.filter(c=>!GF_LANDS.includes(c.id)).forEach(c=>c.pump=(c.pump||0)+8);card('hoof').sick=false;st.pending='';},'pump');
  saberBounce('hoof');cast('hoof',8,'Hoof ETB: apply another boost.');
  step('Resolve a second Hoof ETB','The seven other creatures keep their first +8/+8 and gain another +8/+8. Recast Hoof is a new object: it gets only this +8/+8, so it is 13/13, not 21/21.',()=>{st.board.filter(c=>!GF_LANDS.includes(c.id)).forEach(c=>c.pump=(c.pump||0)+8);card('hoof').sick=false;st.pending='';},'pump');
  saberBounce('s1');cast('s1',1);sym('s1','dork');
  step('Attack with Cradle + Hoof','Cradle has haste from earthbend, is untapped and has both Hoof boosts: 17/17. Hoof has haste and is 13/13. Attack for 30 trampling power on an unobstructed board. The returned dork stays in hand.',()=>{card('cradle').tapped=true;card('hoof').tapped=true;st.board.forEach(c=>c.attacking=['cradle','hoof'].includes(c.id));},'attack');return states;
 }
 if(mode==='loop'){
  // The board where "Turn-2 Sabertooth" on the play ends (entry state in #loop and #combo-loop).
  st.turn='Loop';st.deck=49;st.mana=3;
  st.board=['land','dork','cradle','cub','q','s1','s2','speaker','saber'].map(newcard);
  st.board.forEach(c=>{c.tapped=['land','dork','cradle'].includes(c.id);c.sick=!['land','dork'].includes(c.id);c.used=['q','s1','s2'].includes(c.id);});card('cradle').animated=true;
  step('Ready board · three green floating','The end state of the Turn-2 Sabertooth line on the play: eight creatures including earthbent Cradle and Speaker. Cradle is tapped, Quirion and both Symbiotes are used, and three green are floating. This is scenario setup, not a free casting action.');
  return loopAndFinish();
 }
 st.hand=mode==='no'?['land','dork','cradle','cub','no','a','b']:mode==='setup'?['land','dork','cradle','cub','speaker','land2','a']:side==='play'?['land','dork','cradle','cub','speaker','q','a']:['land','dork','cradle','cub','speaker','a','b'];
 step('Opening seven · '+(side==='play'?'on the play':'on the draw'),'Empty battlefield, full hand. Face-up cards are required; card backs are unspecified cards. This fixed demonstration assumes no interaction and no mulligan.');
 if(side==='draw')draw('c');
 land('land');step('Tap Forest','Add one green mana.',()=>{card('land').tapped=true;st.mana=1;},'tap');cast('dork',1);
 step('Turn 2 · untap','Untap the first land and dork. The dork is no longer summoning sick. The T1 mana pool has emptied.',()=>{st.turn=2;st.mana=0;st.board.forEach(c=>{c.tapped=false;c.sick=false;});},'untap');
 draw(mode==='sab'&&side==='play'?'b':side==='draw'?'d':'c');land('cradle');
 step('Tap Forest + dork','Add two green to cast Cub. Cub is not on the battlefield yet, so the dork gets no bonus.',()=>{card('land').tapped=true;card('dork').tapped=true;st.mana+=2;},'tap');
 cast('cub',2,'Cub ETB: earthbend 1 targeting Cradle.');step('Earthbend Cradle','Cradle becomes a 1/1 creature with haste and is still a land. It counts itself. Earthbend does not untap it.',()=>{card('cradle').animated=true;card('cradle').sick=false;st.pending='';},'animate');tapCradle();
 if(mode==='no'){
  step('Cast Natural Order','Pay {2}{G}{G} and sacrifice Llanowar Elves as an additional cost. Natural Order is on the stack.',()=>{st.mana-=4;st.board=st.board.filter(c=>c.id!=='dork');st.grave.push('dork');remove('no');st.pending='Natural Order: search for a green creature.';},'sacrifice');
  step('Natural Order → Hoof','Put Craterhoof Behemoth onto the battlefield and shuffle. Natural Order goes to the graveyard. Hoof’s ETB is now on the stack.',()=>{st.board.push(newcard('hoof'));card('hoof').sick=false;st.deck--;st.grave.push('no');st.pending='Hoof ETB: creatures get +X/+X and trample.';},'tutor');
  step('Hoof resolves · spell line complete','Three creatures: Cub, animated Cradle and Hoof. Each gets +3/+3 and trample. Only the hasty Hoof can attack here (8/8); Cradle is tapped and Cub has summoning sickness. This demonstrates T2 Natural Order, not a guaranteed T2 kill.',()=>{st.pending='';st.board.filter(c=>!GF_LANDS.includes(c.id)).forEach(c=>c.pump=3);},'finish');return states;
 }
 if(mode==='setup'){
  speaker();tutor('a','s1');cast('s1',1);
  step('Pass the turn','Five creatures stay on the battlefield: dork, earthbent Cradle, Cub, Speaker and Symbiote. A Forest and the cards you drew stay in hand. The opponent gets one turn: sweepers, removal and Wasteland on Cradle can stop the kill.',()=>{st.pending='';},'pass');
  step('Turn 3 · untap','Untap everything. Speaker and Symbiote are no longer summoning sick, so Speaker’s {1}, {T} ability is ready.',()=>{st.turn=3;st.mana=0;st.board.forEach(c=>{c.tapped=false;c.sick=false;c.used=false;});},'untap');
  draw(side==='play'?'d':'e');land('land2');tapCradle();
  step('Speaker → untap Cradle','Pay {1} and tap Speaker to untap Cradle. Speaker stays on the battlefield and still counts for Cradle.',()=>{const sp=card('speaker');if(sp.sick||sp.tapped)throw Error('Illegal Speaker tap');sp.tapped=true;st.mana-=1;card('cradle').tapped=false;},'untap');
  tapCradle();sym('s1','speaker');tapCradle();speaker();tutor('c','hoof');
  cast('hoof',8,'Hoof ETB: count creatures for +X/+X and trample.');
  step('Resolve Hoof’s boost','Six creatures are present: dork, Cradle, Cub, Symbiote, Speaker and Hoof. Each gets +6/+6 and trample. The Forests and the dork are still untapped if you need more mana.',()=>{st.board.filter(c=>!GF_LANDS.includes(c.id)).forEach(c=>c.pump=6);card('hoof').sick=false;st.pending='';},'pump');
  step('Attack for 33 trample','Hoof (haste), Cub, Symbiote and the dork attack. Cradle is tapped and the recast Speaker is summoning sick. Damage = 9 base power + 4 × 6 = 33 trample on an unobstructed board.',()=>{st.board.forEach(c=>c.attacking=['hoof','cub','s1','dork'].includes(c.id));['hoof','cub','s1','dork'].forEach(id=>card(id).tapped=true);},'attack');return states;
 }
 speaker();tutor('a','s1');
 if(side==='play'){
  cast('q',1);step('Quirion → return Forest','Return the tapped Forest to hand and untap the dork. Forest becomes your third discard later. Quirion is now used.',()=>{bounce('land');card('q').used=true;card('dork').tapped=false;},'untap');tapDork();
 }
 const count=side==='play'?2:3;
 for(let i=1;i<=count;i++){
  cast('s'+i,1);sym('s'+i,'speaker');tapCradle();speaker();
  const discard=side==='play'?(i===1?'b':'land'):['b','c','d'][i-1];tutor(discard,i===count?'saber':'s'+(i+1));
 }
 cast('saber',4);step('Engine ready · 3 green left','Eight creatures are in play. Cradle is tapped. Spend 3 to reset one Symbiote and start the +2 green loop.');
 return loopAndFinish();
}
(function goldfishUI(){
 const root=document.getElementById('goldfish');let mode='no',side='play',index=0,states=[];
 const nodes=new Map();
 const cardName=id=>GF_NAMES[id]||'Unspecified card';
 function cardNode(id){if(nodes.has(id))return nodes.get(id);const n=document.createElement('button');n.type='button';n.className='gf-card';n.dataset.id=id;n.innerHTML='<img class="gf-face" alt=""><span class="gf-card-caption"></span><span class="gf-badges"></span>';n.addEventListener('click',()=>{const name=cardName(id),data=COMBO_CARD_ART[name];if(!data)return;const dlg=document.querySelector('.combo37-dialog');dlg.querySelector('img').src=data.src;dlg.querySelector('img').alt=name;dlg.querySelector('.combo37-credit').textContent=name+' · Art: '+data.artist+' · © Wizards of the Coast';dlg.querySelector('a').href=data.url;dlg.showModal();});nodes.set(id,n);return n;}
 // Keyword and state icons on a card (title text explains each one).
 const ICON_SVG={
  haste:'<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
  trample:'<svg viewBox="0 0 24 24"><path d="M4 6l7 6-7 6M12 6l7 6-7 6"/></svg>',
  sick:'<svg viewBox="0 0 24 24"><path d="M5 7h6l-6 7h6M13 12h5l-5 6h5"/></svg>'
 };
 const icon=(kind,title,html)=>'<span class="gf-ico gf-ico-'+kind+'" title="'+title+'" aria-hidden="true">'+html+'</span>';
 function badgesFor(id,c,zone){
  const out=[],creature=zone==='creatures';
  if(!c||zone==='hand'||zone==='grave')return {html:'',words:[]};
  const haste=id==='hoof'||c.animated,words=[];
  if(c.tapped){out.push(icon('tap','Tapped','<img src="'+COMBO_CARD_ART.T.src+'" alt="">'));words.push('tapped');}
  if(creature&&haste){out.push(icon('haste','Haste: can attack and tap the turn it arrives',ICON_SVG.haste));words.push('haste');}
  if(creature&&c.sick&&!haste){out.push(icon('sick','Summoning sickness: cannot attack or use {T} abilities this turn',ICON_SVG.sick));words.push('summoning sick');}
  if(c.used){out.push(icon('used','Used: its once-per-turn untap is spent','<img src="'+COMBO_CARD_ART.Q.src+'" alt="">'));words.push('ability used this turn');}
  if(c.pump){out.push(icon('trample','Trample (Craterhoof)',ICON_SVG.trample));out.push('<span class="gf-pump" title="Craterhoof bonus">+'+c.pump+'/+'+c.pump+'</span>');words.push('trample','+'+c.pump+'/+'+c.pump);}
  if(c.animated&&id==='cradle'){words.push('earthbent: a creature that is still a land');}
  return {html:out.join(''),words};
 }
 function displayCard(id,c,zone){const n=cardNode(id),known=GF_NAMES[id],img=n.querySelector('img');img.src=known?COMBO_CARD_ART[known].src:GF_BACK;img.alt=known||'Magic card back — unspecified card';n.classList.toggle('tapped',!!c?.tapped);n.classList.toggle('attacking',!!c?.attacking);n.classList.toggle('used',!!c?.used);n.classList.toggle('gf-unknown',!known);n.querySelector('.gf-card-caption').textContent=known||'Any card';const b=badgesFor(id,c,zone);n.querySelector('.gf-badges').innerHTML=b.html;n.setAttribute('aria-label',(known||'Unspecified card')+(b.words.length?' · '+b.words.join(', '):''));const dest=root.querySelector('[data-zone="'+zone+'"]');if(n.parentElement!==dest)dest.append(n);}
 // Motion follows the guide's Animations switch (js/menu.js) and the system setting.
 const moving=()=>{const r=document.documentElement;if(!window.gsap||r.classList.contains('motion-off'))return false;return r.classList.contains('motion-on')||!matchMedia('(prefers-reduced-motion: reduce)').matches;};
 let shownMana=0;
 // FLIP: remember where every card was, let render move it, then animate it from the old place.
 let shownIndex=-1;
 // Cards whose zone or state changed between the previous step and this one.
 function actedIds(prev,cur){
  const where=st=>{const m=new Map();st.hand.forEach(id=>m.set(id,'hand:'));st.grave.forEach(id=>m.set(id,'grave:'));st.board.forEach(c=>m.set(c.id,'board:'+[c.tapped,c.animated,c.used,c.pump||0,c.attacking].join(',')));return m;};
  const a=where(prev),b=where(cur),ids=[];b.forEach((v,id)=>{if(a.get(id)!==v)ids.push(id);});return ids;
 }
 function markActed(){
  const forward=index===shownIndex+1&&index>0;shownIndex=index;
  nodes.forEach(n=>n.classList.remove('gf-acted'));
  if(!forward)return;
  for(const id of actedIds(states[index-1],states[index])){const n=nodes.get(id);if(n&&n.isConnected){void n.offsetWidth;n.classList.add('gf-acted');}}
 }
 function render(){const before=new Map();if(moving())nodes.forEach((n,id)=>{if(n.isConnected)before.set(id,n.getBoundingClientRect());});renderNow();markActed();if(!moving()){shownMana=states[index].mana;return;}
  nodes.forEach((n,id)=>{if(!n.isConnected)return;const a=before.get(id),b=n.getBoundingClientRect();
   if(a){const dx=a.left-b.left,dy=a.top-b.top;if(Math.abs(dx)>1||Math.abs(dy)>1)gsap.fromTo(n,{x:dx,y:dy},{x:0,y:0,duration:.5,ease:'power3.out',clearProps:'transform'});}
   else gsap.fromTo(n,{opacity:0,y:-10,scale:.92},{opacity:1,y:0,scale:1,duration:.35,ease:'power2.out',clearProps:'opacity,transform'});});
  const manaEl=root.querySelector('#gf-mana'),target=states[index].mana,counter={v:shownMana};shownMana=target;
  manaEl.textContent=counter.v;
  if(counter.v!==target)gsap.to(counter,{v:target,duration:.45,ease:'power2.out',onUpdate:()=>{manaEl.textContent=Math.round(counter.v);}});
  gsap.fromTo(root.querySelector('.gf-action'),{opacity:.35},{opacity:1,duration:.3,ease:'power1.out',clearProps:'opacity'});
 }
 function renderNow(){const st=states[index];const visible=new Set([...st.hand,...st.board.map(c=>c.id),...st.grave]);nodes.forEach((n,id)=>{if(!visible.has(id))n.remove();});st.board.forEach(c=>displayCard(c.id,c,(GF_LANDS.includes(c.id)||(c.id==='cradle'&&!c.animated))?'lands':'creatures'));st.hand.forEach(id=>displayCard(id,null,'hand'));st.grave.forEach(id=>displayCard(id,null,'grave'));root.querySelector('#gf-empty').hidden=!!st.board.length;root.querySelector('#gf-hand-count').textContent=st.hand.length;root.querySelector('#gf-deck-count').textContent=st.deck;root.querySelector('#gf-gy-count').textContent=st.grave.length;root.querySelector('#gf-turn').textContent=typeof st.turn==='number'?'Turn '+st.turn:st.turn;root.querySelector('#gf-mana').textContent=st.mana;root.querySelector('#gf-delta').textContent=st.gain>0?'+'+st.gain+' this step':st.gain<0?st.gain+' this step':'No mana change';root.querySelector('#gf-title').textContent=st.title;root.querySelector('#gf-text').innerHTML=esc(st.text).replace(/\{([0-9WUBRGX]+)\}/g,(m,k)=>'<img class="gf-inline-mana" alt="'+m+'" src="'+(MANA_ICONS[k]||COMBO_CARD_ART[k]?.src)+'">');root.querySelector('#gf-pending').textContent=st.pending||'Stack empty';root.querySelector('#gf-step').textContent=index+' / '+(states.length-1);root.querySelector('#gf-progress').max=states.length-1;root.querySelector('#gf-progress').value=index;root.querySelector('#gf-prev').disabled=index===0;root.querySelector('#gf-next').disabled=index===states.length-1;root.querySelector('#gf-log').innerHTML=states.slice(Math.max(0,index-3),index+1).map((x,i)=>'<li>'+esc(x.title)+'</li>').join('');root.dataset.step=index;root.dataset.mode=mode;root.dataset.side=side;
 root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===mode));root.querySelectorAll('[data-side]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.side===side));root.querySelector('#gf-context').textContent=mode==='loop'?'Ready board · end of Turn-2 Sabertooth on the play · play/draw does not change this setup':'Fixed '+(side==='play'?'on-the-play':'on-the-draw')+' hand · no mulligan · no opponent'+(mode==='setup'?' · the opponent gets one turn before the kill':'');
 }
 function reset(){states=buildGoldfish(mode,side);index=0;render();}
 root.querySelectorAll('button[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;reset();});root.querySelectorAll('button[data-side]').forEach(b=>b.onclick=()=>{side=b.dataset.side;reset();});root.querySelector('#gf-restart').onclick=()=>{index=0;render();};root.querySelector('#gf-prev').onclick=()=>{index=Math.max(0,index-1);render();};root.querySelector('#gf-next').onclick=()=>{index=Math.min(states.length-1,index+1);render();};
 root.querySelector('#gf-progress').oninput=e=>{index=Number(e.target.value);render();};reset();
})();

document.getElementById('gf-green-icon').innerHTML=manaSymbols(['G']);
