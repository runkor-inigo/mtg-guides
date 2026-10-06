const GF_BACK='assets/7605997900cd.png';
// RC50: deterministic, reversible demonstrations. This is not a random game simulator.
const GF_NAMES={land:'Forest',dork:'Llanowar Elves',cradle:"Gaea's Cradle",cub:'Badgermole Cub',speaker:'Formidable Speaker',q:'Quirion Ranger',s1:'Wirewood Symbiote',s2:'Wirewood Symbiote',s3:'Wirewood Symbiote',saber:'Temur Sabertooth',no:'Natural Order',hoof:'Craterhoof Behemoth',vision:'Elvish Visionary'};
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
 const creatures=()=>st.board.filter(c=>c.id!=='land'&&(c.id!=='cradle'||c.animated)).length;
 const tapCradle=()=>{let n=creatures()+1;step('Tap Cradle → '+n+' green','Cradle counts '+(n-1)+' creatures, including itself. Cub adds one extra green. Speaker in hand is not counted.',()=>{if(card('cradle').tapped)throw Error('Cradle already tapped');card('cradle').tapped=true;st.mana+=n;},'tap');};
 const tutor=(discard,target)=>step('Discard → find '+name(target),'Resolve Speaker’s ETB. Discard '+name(discard)+' and put '+name(target)+' into your hand.',()=>{remove(discard);st.grave.push(discard);st.hand.push(target);st.deck--;st.pending='';},'tutor');
 const sym=(id,elf)=>step('Return '+name(elf)+' → untap Cradle','Activate '+name(id)+'. Returning the Elf is the cost. This Symbiote is now used for the turn.',()=>{if(card(id).used)throw Error('Symbiote used');card(id).used=true;bounce(elf);card('cradle').tapped=false;},'untap');
 const saberBounce=id=>step('Sabertooth → return '+name(id),'Pay {1}{G}. Return the creature to hand. Sabertooth gains indestructible this turn.',()=>{st.mana-=2;bounce(id);},'bounce');
 const speaker=()=>cast('speaker',3,'Speaker ETB on the stack: you may discard to search.');
 const decline=()=>step('Decline the discard','Resolve Speaker’s ETB without discarding or searching. No extra card is needed to keep looping.',()=>st.pending='','resolve');
 if(mode==='loop'){
  st.turn='Setup';st.hand=['cradle','cub','saber','s1','vision','a','b'];
  step('Seven-card setup display','Five face-up cards are required for this established-board engine. The two card backs are unspecified. This mode demonstrates a prepared board, not how to cast it from a T1 opening.');
  step('Load the established board','Place the five required permanents on the battlefield. Cradle is already earthbent and untapped; Symbiote is unused. This is scenario setup, not a free casting action.',()=>{for(const id of ['cradle','cub','saber','s1','vision'])put(id);card('cradle').animated=true;st.board.forEach(c=>c.sick=false);st.turn='Loop';},'setup');
  for(let i=1;i<=2;i++){
   tapCradle();sym('s1','vision');saberBounce('s1');cast('s1',1);cast('vision',2,'Visionary ETB: draw a card.');
   step('Draw from Visionary · cycle '+i,'Draw one card. Compared with the start of this cycle: +1 green and +1 card. Cradle is untapped and the new Symbiote is unused.',()=>{st.hand.push('draw'+i);st.deck--;st.pending='';},'draw');
  }
  step('Loop established','Each cycle produces 6 and spends 5: net +1 green and +1 card. Repeat only while you can draw safely; an empty-library draw loses the game. This reference does not model Endurance recycling.');
  return states;
 }
 st.hand=mode==='no'?['land','dork','cradle','cub','no','a','b']:side==='play'?['land','dork','cradle','cub','speaker','q','a']:['land','dork','cradle','cub','speaker','a','b'];
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
  step('Hoof resolves · spell line complete','Three creatures: Cub, animated Cradle and Hoof. Each gets +3/+3 and trample. Only the hasty Hoof can attack here (8/8); Cradle is tapped and Cub has summoning sickness. This demonstrates T2 Natural Order, not a guaranteed T2 kill.',()=>{st.pending='';st.board.filter(c=>c.id!=='land').forEach(c=>c.pump=3);},'finish');return states;
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
 for(let cycle=1;cycle<=2;cycle++){saberBounce('s1');cast('s1',1);sym('s1','speaker');tapCradle();speaker();decline();step('Cycle '+cycle+' complete','Same board and hand as before the cycle, with two more green mana. No discards were consumed.');}
 step('Repeat 50 more cycles','Shortcut 50 identical legal cycles: 50 × 2 = 100 additional green. This is a finite demonstration of arbitrarily large mana.',()=>{st.mana+=100;st.cycles=52;},'repeat');
 saberBounce('speaker');speaker();saberBounce('speaker');tutor('speaker','hoof');
 cast('hoof',8,'Hoof ETB: count creatures for +X/+X and trample.');
 step('Resolve Hoof’s boost','Eight creatures are present. Each gets +8/+8 and trample. Cradle is still tapped; Cub, Sabertooth and the small creatures played this turn are summoning sick.',()=>{st.board.filter(c=>c.id!=='land').forEach(c=>c.pump=(c.pump||0)+8);card('hoof').sick=false;st.pending='';},'pump');
 saberBounce('hoof');cast('hoof',8,'Hoof ETB: apply another boost.');
 step('Resolve a second Hoof ETB','The seven other creatures keep their first +8/+8 and gain another +8/+8. Recast Hoof is a new object: it gets only this +8/+8, so it is 13/13, not 21/21.',()=>{st.board.filter(c=>c.id!=='land').forEach(c=>c.pump=(c.pump||0)+8);card('hoof').sick=false;st.pending='';},'pump');
 saberBounce('s1');cast('s1',1);sym('s1','dork');
 step('Attack with Cradle + Hoof','Cradle has haste from earthbend, is untapped and has both Hoof boosts: 17/17. Hoof has haste and is 13/13. Attack for 30 trampling power on an unobstructed board. The returned dork stays in hand.',()=>{card('cradle').tapped=true;card('hoof').tapped=true;st.board.forEach(c=>c.attacking=['cradle','hoof'].includes(c.id));},'attack');return states;
}
(function goldfishUI(){
 const root=document.getElementById('goldfish');let mode='no',side='play',index=0,states=[];
 const nodes=new Map();
 const cardName=id=>GF_NAMES[id]||'Unspecified card';
 function cardNode(id){if(nodes.has(id))return nodes.get(id);const n=document.createElement('button');n.type='button';n.className='gf-card';n.dataset.id=id;n.innerHTML='<img class="gf-face" alt=""><span class="gf-card-caption"></span><span class="gf-badges"></span>';n.addEventListener('click',()=>{const name=cardName(id),data=COMBO_CARD_ART[name];if(!data)return;const dlg=document.querySelector('.combo37-dialog');dlg.querySelector('img').src=data.src;dlg.querySelector('img').alt=name;dlg.querySelector('.combo37-credit').textContent=name+' · Art: '+data.artist+' · © Wizards of the Coast';dlg.querySelector('a').href=data.url;dlg.showModal();});nodes.set(id,n);return n;}
 function displayCard(id,c,zone){const n=cardNode(id),known=GF_NAMES[id],img=n.querySelector('img');img.src=known?COMBO_CARD_ART[known].src:GF_BACK;img.alt=known||'Magic card back — unspecified card';n.classList.toggle('tapped',!!c?.tapped);n.classList.toggle('attacking',!!c?.attacking);n.classList.toggle('gf-unknown',!known);n.querySelector('.gf-card-caption').textContent=known||'Any card';const tags=[];if(c?.tapped)tags.push('Tapped');if(c?.animated)tags.push('Earthbent · haste');if(c?.sick&&zone==='board'&&id!=='land'&&id!=='cradle')tags.push('New');if(c?.used)tags.push('Used');if(c?.pump)tags.push('+'+c.pump+'/+'+c.pump);n.querySelector('.gf-badges').textContent=tags.join(' · ');n.setAttribute('aria-label',(known||'Unspecified card')+(tags.length?' · '+tags.join(', '):''));const dest=root.querySelector('[data-zone="'+zone+'"]');if(n.parentElement!==dest)dest.append(n);}
 function render(){const st=states[index];const visible=new Set([...st.hand,...st.board.map(c=>c.id),...st.grave]);nodes.forEach((n,id)=>{if(!visible.has(id))n.remove();});st.board.forEach(c=>displayCard(c.id,c,'board'));st.hand.forEach(id=>displayCard(id,null,'hand'));st.grave.forEach(id=>displayCard(id,null,'grave'));root.querySelector('#gf-empty').hidden=!!st.board.length;root.querySelector('#gf-hand-count').textContent=st.hand.length;root.querySelector('#gf-deck-count').textContent=st.deck;root.querySelector('#gf-gy-count').textContent=st.grave.length;root.querySelector('#gf-turn').textContent=typeof st.turn==='number'?'Turn '+st.turn:st.turn;root.querySelector('#gf-mana').textContent=st.mana;root.querySelector('#gf-delta').textContent=st.gain>0?'+'+st.gain+' this step':st.gain<0?st.gain+' this step':'No mana change';root.querySelector('#gf-title').textContent=st.title;root.querySelector('#gf-text').innerHTML=esc(st.text).replace(/\{([0-9WUBRGX]+)\}/g,(m,k)=>'<img class="gf-inline-mana" alt="'+m+'" src="'+(MANA_ICONS[k]||COMBO_CARD_ART[k]?.src)+'">');root.querySelector('#gf-pending').textContent=st.pending||'Stack empty';root.querySelector('#gf-step').textContent=index+' / '+(states.length-1);root.querySelector('#gf-progress').max=states.length-1;root.querySelector('#gf-progress').value=index;root.querySelector('#gf-prev').disabled=index===0;root.querySelector('#gf-next').disabled=index===states.length-1;root.querySelector('#gf-log').innerHTML=states.slice(Math.max(0,index-3),index+1).map((x,i)=>'<li>'+esc(x.title)+'</li>').join('');root.dataset.step=index;root.dataset.mode=mode;root.dataset.side=side;
 root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===mode));root.querySelectorAll('[data-side]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.side===side));root.querySelector('#gf-context').textContent=mode==='loop'?'Established-board reference · play/draw does not change this setup':'Fixed '+(side==='play'?'on-the-play':'on-the-draw')+' hand · no mulligan · no opponent';
 }
 function reset(){states=buildGoldfish(mode,side);index=0;render();}
 root.querySelectorAll('button[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;reset();});root.querySelectorAll('button[data-side]').forEach(b=>b.onclick=()=>{side=b.dataset.side;reset();});root.querySelector('#gf-restart').onclick=()=>{index=0;render();};root.querySelector('#gf-prev').onclick=()=>{index=Math.max(0,index-1);render();};root.querySelector('#gf-next').onclick=()=>{index=Math.min(states.length-1,index+1);render();};
 root.querySelector('#gf-progress').oninput=e=>{index=Number(e.target.value);render();};reset();
})();

document.getElementById('gf-green-icon').innerHTML=manaSymbols(['G']);
