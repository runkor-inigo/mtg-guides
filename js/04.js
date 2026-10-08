const GF_BACK='assets/7605997900cd.webp';
// RC50: deterministic, reversible demonstrations. This is not a random game simulator.
const GF_NAMES={land:'Forest',dork:'Llanowar Elves',cradle:"Gaea's Cradle",cub:'Badgermole Cub',speaker:'Formidable Speaker',q:'Quirion Ranger',s1:'Wirewood Symbiote',s2:'Wirewood Symbiote',s3:'Wirewood Symbiote',saber:'Temur Sabertooth',no:'Natural Order',hoof:'Craterhoof Behemoth',land2:'Forest',gsz:"Green Sun's Zenith",arbor:'Dryad Arbor',atraxa:'Atraxa, Grand Unifier',vision:'Elvish Visionary'};
const GF_LANDS=['land','land2'];
// Variants: each mode has switches (cards in the opening hand or on the board) and a catalogue of the
// combinations that make a legal line. Changing one switch jumps to the closest legal line and moves the
// other switches with it; a change with no legal line is refused with the reason.
const GF_VARIANTS={
 no:{switches:[['cradle',"Gaea's Cradle"],['cub','Badgermole Cub'],['dork','Llanowar Elves'],['gsz','GSZ → Dryad Arbor'],['q','Quirion Ranger']],
  pick:{id:'target',label:'Natural Order finds',options:[['atraxa','Atraxa'],['hoof','Craterhoof']]},
  lines:[{cradle:1,cub:1,dork:1},{cradle:1,cub:1,gsz:1},{cradle:1,cub:1,dork:1,q:1},{cradle:1,cub:1,gsz:1,q:1},{cradle:1,dork:1,q:1},{cradle:1,gsz:1,q:1},{cradle:1,cub:1,q:1}],
  refuse:{cradle:'No turn-2 Natural Order without Gaea’s Cradle: Forest, a second land and one dork make 3 mana, and Natural Order needs 4. Quirion Ranger gives back only the mana it costs.'},
  start:{cradle:1,cub:1,dork:1,gsz:0,q:0,target:'atraxa'}},
 // A line with `side` works only on that side; changing play/draw or the switch moves the other one.
 sab:{switches:[['q','Quirion Ranger']],lines:[{q:1},{q:0,side:'draw'}],start:{q:1},
  need:{draw:'Without Quirion Ranger the line needs one more card, and the extra draw gives it.'}},
 loop:{switches:[['vision','Elvish Visionary · draw cards']],lines:[{vision:0},{vision:1}],start:{vision:0}},
 setup:{switches:[],lines:[{}],start:{}}
};
function buildGoldfish(mode,side,v={}){
 const states=[];let st={hand:[],board:[],grave:[],mana:0,turn:1,deck:53,pending:'',title:'Opening hand',text:'',action:'',gain:0};
 const name=id=>GF_NAMES[id]||'Unspecified card';
 // Unspecified cards (card backs) get one-letter ids that are never reused.
 const fillers='abcdefghijklmnop'.split('');const filler=()=>fillers.shift();
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
 const tapCradle=()=>{const cub=st.board.some(c=>c.id==='cub'),anim=card('cradle').animated,k=creatures(),n=k+(cub&&anim?1:0);step('Tap Cradle → '+n+' green','Cradle counts '+k+' creature'+(k===1?'':'s')+(anim?', including itself.':'.')+(cub&&anim?' Cub adds one extra green.':'')+(st.hand.includes('speaker')?' Speaker in hand is not counted.':st.board.some(c=>c.id==='speaker'&&c.tapped)?' Tapped Speaker still counts.':''),()=>{if(card('cradle').tapped)throw Error('Cradle already tapped');card('cradle').tapped=true;st.mana+=n;},'tap');};
 const tutor=(discard,target)=>step('Discard → find '+name(target),'Resolve Speaker’s ETB. Discard '+name(discard)+' and put '+name(target)+' into your hand.',()=>{remove(discard);st.grave.push(discard);st.hand.push(target);st.deck--;st.pending='';},'tutor');
 const sym=(id,elf)=>step('Return '+name(elf)+' → untap Cradle','Activate '+name(id)+'. Returning the Elf is the cost. This Symbiote is now used for the turn.',()=>{if(card(id).used)throw Error('Symbiote used');card(id).used=true;bounce(elf);card('cradle').tapped=false;},'untap');
 const saberBounce=id=>step('Sabertooth → return '+name(id),'Pay {1}{G}. Return the creature to hand. Sabertooth gains indestructible this turn.',()=>{st.mana-=2;bounce(id);},'bounce');
 const speaker=()=>cast('speaker',3,'Speaker ETB on the stack: you may discard to search.');
 const decline=()=>step('Decline the discard','Resolve Speaker’s ETB without discarding or searching. No extra card is needed to keep looping.',()=>st.pending='','resolve');
 const pump=n=>st.board.filter(c=>!GF_LANDS.includes(c.id)).forEach(c=>c.pump=(c.pump||0)+n);
 // Route 1 tail: Sabertooth loop, then the Craterhoof finish. Every number is counted from the board.
 function loopAndFinish(){
  let gain=0;
  for(let cycle=1;cycle<=2;cycle++){const m0=st.mana;saberBounce('s1');cast('s1',1);sym('s1','speaker');tapCradle();speaker();decline();gain=st.mana-m0;step('Cycle '+cycle+' complete','Same board and hand as before the cycle, with '+gain+' more green mana. No discards were consumed.');}
  step('Repeat 50 more cycles','Shortcut 50 identical legal cycles: 50 × '+gain+' = '+50*gain+' additional green. This is a finite demonstration of arbitrarily large mana.',()=>{st.mana+=50*gain;st.cycles=52;},'repeat');
  saberBounce('speaker');speaker();saberBounce('speaker');tutor('speaker','hoof');
  cast('hoof',8,'Hoof ETB: count creatures for +X/+X and trample.');
  const x1=creatures();
  step('Resolve Hoof’s boost',x1+' creatures are present. Each gets +'+x1+'/+'+x1+' and trample. Cradle is still tapped; Cub, Sabertooth and the small creatures played this turn are summoning sick.',()=>{pump(x1);card('hoof').sick=false;st.pending='';},'pump');
  saberBounce('hoof');cast('hoof',8,'Hoof ETB: apply another boost.');
  const x2=creatures(),hoof=5+x2,cradle=1+x1+x2;
  step('Resolve a second Hoof ETB','The '+(x2-1)+' other creatures keep their first +'+x1+'/+'+x1+' and gain another +'+x2+'/+'+x2+'. Recast Hoof is a new object: it gets only this boost, so it is '+hoof+'/'+hoof+', not '+(hoof+x1)+'/'+(hoof+x1)+'.',()=>{pump(x2);card('hoof').sick=false;st.pending='';},'pump');
  saberBounce('s1');cast('s1',1);sym('s1','dork');
  step('Attack with Cradle + Hoof','Cradle has haste from earthbend, is untapped and has both Hoof boosts: '+cradle+'/'+cradle+'. Hoof has haste and is '+hoof+'/'+hoof+'. Attack for '+(cradle+hoof)+' trampling power on an unobstructed board. The returned dork stays in hand.',()=>{card('cradle').tapped=true;card('hoof').tapped=true;st.board.forEach(c=>c.attacking=['cradle','hoof'].includes(c.id));},'attack');return states;
 }
 if(mode==='loop'){
  // The board where the "Turn-2 Sabertooth kill" on the play ends (entry state in #loop and #combo-loop).
  st.turn='Loop';st.deck=49;st.mana=3;
  const ids=['land','dork','cradle','cub','q','s1','s2','speaker','saber'];if(v.vision)ids.push('vision');
  st.board=ids.map(newcard);
  st.board.forEach(c=>{c.tapped=['land','dork','cradle'].includes(c.id);c.sick=!['land','dork'].includes(c.id);c.used=['q','s1','s2'].includes(c.id);});card('cradle').animated=true;
  step(v.vision?'Ready board + Elvish Visionary':'Ready board · three green floating','The end state of the Turn-2 Sabertooth kill on the play: '+creatures()+' creatures including earthbent Cradle'+(v.vision?', Speaker and Elvish Visionary. Visionary is a flex card, not in the 5 Oct main deck.':' and Speaker.')+' Cradle is tapped, Quirion and both Symbiotes are used, and three green are floating. This is scenario setup, not a free casting action.');
  if(v.vision){
   let gain=0;
   for(let i=1;i<=2;i++){const m0=st.mana;saberBounce('s1');cast('s1',1);sym('s1','vision');tapCradle();cast('vision',2,'Visionary ETB: draw a card.');
    step('Draw from Visionary · cycle '+i,'Draw one card. Visionary is back on the battlefield, Cradle is tapped and the new Symbiote is used: the same board as before the cycle.',()=>{st.hand.push(filler());st.deck--;st.pending='';},'draw');gain=st.mana-m0;}
   step('Draw as deep as is safe','Each Visionary cycle nets +'+gain+' green and one card. Repeat only while the library allows it: drawing from an empty library loses the game. Then switch to the Speaker loop for the finish.');
  }
  return loopAndFinish();
 }
 const opening=()=>step('Opening seven · '+(side==='play'?'on the play':'on the draw'),'Empty battlefield, full hand. Face-up cards are required; card backs are unspecified cards. This fixed demonstration assumes no interaction and no mulligan.');
 const fill=()=>{while(st.hand.length<7)st.hand.push(filler());};
 if(mode==='no'){
  // Three routes to four mana on turn two (see #natural-order): Cub + Cradle, dork + Quirion + Cradle without Cub,
  // and turn-one Quirion + Cub with no dork. The accelerant is a dork or Dryad Arbor from GSZ for X = 0.
  const acc=v.gsz?'arbor':v.dork?'dork':null,accName=v.gsz?'Dryad Arbor':'the dork';
  st.hand=['land'];if(v.dork)st.hand.push('dork');if(v.gsz)st.hand.push('gsz');st.hand.push('cradle');if(v.cub)st.hand.push('cub');st.hand.push('no');if(v.q)st.hand.push('q');fill();opening();
  if(side==='draw')draw(filler());
  land('land');step('Tap Forest','Add one green mana.',()=>{card('land').tapped=true;st.mana=1;},'tap');
  if(v.gsz)step('Green Sun’s Zenith for X = 0','Pay {G}. Search for a green creature with mana value 0: Dryad Arbor. It enters as a land creature and does not use the land drop. Zenith shuffles itself back into the library.',()=>{st.mana-=1;remove('gsz');st.board.push(newcard('arbor'));},'tutor');
  else if(v.dork)cast('dork',1);
  else cast('q',1);
  step('Turn 2 · untap','Untap everything. '+(acc?(v.gsz?'Dryad Arbor':'The dork'):'Quirion')+' is no longer summoning sick. The T1 mana pool has emptied.',()=>{st.turn=2;st.mana=0;st.board.forEach(c=>{c.tapped=false;c.sick=false;});},'untap');
  draw(filler());land('cradle');
  const earthbend=()=>{cast('cub',2,'Cub ETB: earthbend 1 targeting Cradle.');step('Earthbend Cradle','Cradle becomes a 1/1 creature with haste and is still a land. It counts itself. Earthbend does not untap it.',()=>{card('cradle').animated=true;card('cradle').sick=false;st.pending='';},'animate');};
  const quirionCradle=()=>step('Quirion → return Forest, untap Cradle','Return the tapped Forest to hand and untap Cradle: it is a creature now, so Quirion can target it. Quirion is used.',()=>{bounce('land');card('q').used=true;card('cradle').tapped=false;},'untap');
  if(v.cub&&acc){
   step('Tap Forest + '+accName,'Add two green to cast Cub. Cub is not on the battlefield yet, so there is no bonus.',()=>{card('land').tapped=true;card(acc).tapped=true;st.mana+=2;},'tap');
   earthbend();tapCradle();
   if(v.q){cast('q',1);quirionCradle();tapCradle();}
  }else if(acc){
   step('Tap Forest + '+accName,'Add two green. Without Cub, Cradle stays a land and gives one green per creature.',()=>{card('land').tapped=true;card(acc).tapped=true;st.mana+=2;},'tap');
   cast('q',1);tapCradle();
   step('Quirion → return Forest, untap '+accName,'Return the tapped Forest to hand and untap '+accName+' for a second activation. Quirion is used.',()=>{bounce('land');card('q').used=true;card(acc).tapped=false;},'untap');
   step('Tap '+accName+' again','Add one more green: four in total.',()=>{card(acc).tapped=true;st.mana+=1;},'tap');
  }else{
   tapCradle();step('Tap Forest','Add one green: two in total, enough for Cub.',()=>{card('land').tapped=true;st.mana+=1;},'tap');
   earthbend();quirionCradle();tapCradle();
  }
  const sac=acc||'q';
  step('Cast Natural Order','Pay {2}{G}{G} and sacrifice '+name(sac)+' as the additional cost (a green creature). Natural Order is on the stack.',()=>{st.mana-=4;st.board=st.board.filter(c=>c.id!==sac);st.grave.push(sac);remove('no');st.pending='Natural Order: search for a green creature.';},'sacrifice');
  const left=st.mana,leftText=left?' '+left+' green are left this turn.':'';
  if(v.target==='hoof'){
   step('Natural Order → Craterhoof','Put Craterhoof Behemoth onto the battlefield and shuffle. Hoof’s ETB is on the stack.',()=>{st.board.push(newcard('hoof'));card('hoof').sick=false;st.deck--;st.grave.push('no');st.pending='Hoof ETB: creatures get +X/+X and trample.';},'tutor');
   const x=creatures(),dmg=5+x,others=st.board.filter(c=>!GF_LANDS.includes(c.id)&&c.id!=='hoof'&&(c.id!=='cradle'||c.animated)).map(c=>c.id==='cradle'?'Cradle is tapped':name(c.id)+(c.sick?' is summoning sick':' is tapped'));
   step('Hoof resolves · '+dmg+' damage, not lethal',x+' creature'+(x===1?'':'s')+': each gets +'+x+'/+'+x+' and trample. Only the hasty Hoof can attack ('+dmg+'/'+dmg+')'+(others.length?': '+others.join(', '):'')+'. On turn two Craterhoof is not a kill; Atraxa refills the hand instead.'+leftText,()=>{st.pending='';pump(x);},'finish');
  }else{
   step('Natural Order → Atraxa','Put Atraxa, Grand Unifier onto the battlefield and shuffle. Its ETB is on the stack.',()=>{st.board.push(newcard('atraxa'));st.deck--;st.grave.push('no');st.pending='Atraxa ETB: reveal the top ten cards.';},'tutor');
   step('Atraxa resolves · refill the hand','Reveal the top ten cards. For each card type among them, you may put one card of that type into your hand; the rest go to the bottom. Example: four card types, four cards. Atraxa is a 7/7 with flying, vigilance, deathtouch and lifelink but no haste: it attacks next turn.'+leftText,()=>{for(let i=0;i<4;i++)st.hand.push(filler());st.deck-=4;st.pending='';},'draw');
  }
  return states;
 }
 if(mode==='setup')st.hand=['land','dork','cradle','cub','speaker','land2'];
 else{st.hand=['land','dork','cradle','cub','speaker'];if(v.q)st.hand.push('q');}
 fill();opening();
 if(side==='draw')draw(filler());
 land('land');step('Tap Forest','Add one green mana.',()=>{card('land').tapped=true;st.mana=1;},'tap');cast('dork',1);
 step('Turn 2 · untap','Untap the first land and dork. The dork is no longer summoning sick. The T1 mana pool has emptied.',()=>{st.turn=2;st.mana=0;st.board.forEach(c=>{c.tapped=false;c.sick=false;});},'untap');
 draw(filler());land('cradle');
 step('Tap Forest + dork','Add two green to cast Cub. Cub is not on the battlefield yet, so the dork gets no bonus.',()=>{card('land').tapped=true;card('dork').tapped=true;st.mana+=2;},'tap');
 cast('cub',2,'Cub ETB: earthbend 1 targeting Cradle.');step('Earthbend Cradle','Cradle becomes a 1/1 creature with haste and is still a land. It counts itself. Earthbend does not untap it.',()=>{card('cradle').animated=true;card('cradle').sick=false;st.pending='';},'animate');tapCradle();
 const spare=()=>st.hand.filter(id=>!GF_NAMES[id]);
 if(mode==='setup'){
  speaker();tutor(spare()[0],'s1');cast('s1',1);
  step('Pass the turn','Five creatures stay on the battlefield: dork, earthbent Cradle, Cub, Speaker and Symbiote. A Forest and the cards you drew stay in hand. The opponent gets one turn: sweepers, removal and Wasteland on Cradle can stop the kill.',()=>{st.pending='';},'pass');
  step('Turn 3 · untap','Untap everything. Speaker and Symbiote are no longer summoning sick, so Speaker’s {1}, {T} ability is ready.',()=>{st.turn=3;st.mana=0;st.board.forEach(c=>{c.tapped=false;c.sick=false;c.used=false;});},'untap');
  draw(filler());land('land2');tapCradle();
  step('Speaker → untap Cradle','Pay {1} and tap Speaker to untap Cradle. Speaker stays on the battlefield and still counts for Cradle.',()=>{const sp=card('speaker');if(sp.sick||sp.tapped)throw Error('Illegal Speaker tap');sp.tapped=true;st.mana-=1;card('cradle').tapped=false;},'untap');
  tapCradle();sym('s1','speaker');tapCradle();speaker();tutor(spare()[0],'hoof');
  cast('hoof',8,'Hoof ETB: count creatures for +X/+X and trample.');
  step('Resolve Hoof’s boost','Six creatures are present: dork, Cradle, Cub, Symbiote, Speaker and Hoof. Each gets +6/+6 and trample. The Forests and the dork are still untapped if you need more mana.',()=>{pump(6);card('hoof').sick=false;st.pending='';},'pump');
  step('Attack for 33 trample','Hoof (haste), Cub, Symbiote and the dork attack. Cradle is tapped and the recast Speaker is summoning sick. Damage = 9 base power + 4 × 6 = 33 trample on an unobstructed board.',()=>{st.board.forEach(c=>c.attacking=['hoof','cub','s1','dork'].includes(c.id));['hoof','cub','s1','dork'].forEach(id=>card(id).tapped=true);},'attack');return states;
 }
 speaker();tutor(spare()[0],'s1');
 if(v.q){
  cast('q',1);step('Quirion → return Forest','Return the tapped Forest to hand and untap the dork. Forest becomes a discard later. Quirion is now used.',()=>{bounce('land');card('q').used=true;card('dork').tapped=false;},'untap');tapDork();
 }
 // Every Speaker search needs a discard: the spare cards, then the Forest that Quirion returned.
 const discards=[...spare(),...(v.q?['land']:[])],count=Math.min(3,discards.length);
 for(let i=1;i<=count;i++){
  cast('s'+i,1);sym('s'+i,'speaker');tapCradle();speaker();
  tutor(discards[i-1],i===count?'saber':'s'+(i+1));
 }
 cast('saber',4);
 if(st.mana<3){
  step('Engine ready · '+st.mana+' green: one step short','Sabertooth is on the battlefield, but the loop needs {1}{G} to return a Symbiote and {G} to recast it. '+(v.q?'':'Without Quirion Ranger there is one discard and one dork untap fewer. ')+'Pass the turn with the engine in play: the opponent gets one turn, and next turn Speaker can untap Cradle (see the Setup turn mode).',()=>{st.pending='';},'pass');
  return states;
 }
 step('Engine ready · '+st.mana+' green left',creatures()+' creatures are in play. Cradle is tapped. Spend 3 to reset one Symbiote and start the loop.');
 return loopAndFinish();
}
(function goldfishUI(){
 const root=document.getElementById('goldfish');let mode='no',side='play',index=0,states=[];
 const variant={};Object.keys(GF_VARIANTS).forEach(m=>variant[m]={...GF_VARIANTS[m].start});
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
 root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===mode));root.querySelectorAll('[data-side]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.side===side));root.querySelector('.gf-side').hidden=!sided();root.querySelector('#gf-context').textContent=mode==='loop'?'Ready board · end of the Turn-2 Sabertooth kill on the play · play/draw does not change this setup':mode==='no'?'Works on the play and on the draw; shown on the play · no mulligan · no opponent':'Fixed '+(side==='play'?'on-the-play':'on-the-draw')+' hand · no mulligan · no opponent'+(mode==='setup'?' · the opponent gets one turn before the kill':'');
 }
 // Variant switches. They move together: a change jumps to the closest legal line (see GF_VARIANTS).
 const varBox=document.createElement('div');varBox.className='gf-variants';varBox.setAttribute('role','group');varBox.setAttribute('aria-label','Variant');
 const varNote=document.createElement('p');varNote.className='gf-variant-note';varNote.setAttribute('aria-live','polite');
 const varNeed=document.createElement('p');varNeed.className='gf-variant-need';
 root.querySelector('#gf-context').before(varBox,varNote,varNeed);
 // Play/draw only matters where the line changes with it.
 const sided=()=>mode==='sab'||mode==='setup';
 const lineOf=()=>{const def=GF_VARIANTS[mode],cur=variant[mode];return def.lines.find(l=>def.switches.every(([k])=>(l[k]||0)===(cur[k]||0)));};
 function drawVariants(flash=[]){
  const def=GF_VARIANTS[mode],cur=variant[mode];
  varBox.hidden=!def.switches.length&&!def.pick;
  varBox.innerHTML=def.switches.map(([id,label])=>'<button type="button" role="switch" class="gf-switch'+(flash.includes(id)?' is-magnet':'')+'" data-var="'+id+'" aria-checked="'+!!cur[id]+'"><span class="gf-switch-track" aria-hidden="true"></span>'+esc(label)+'</button>').join('')+
   '';
  const l=lineOf();varNeed.innerHTML=l&&l.side?'<span class="gf-need-tag">Only on the '+l.side+'</span> '+esc(def.need[l.side]):'';varNeed.hidden=!(l&&l.side);
  varBox.innerHTML+=(def.pick?'<span class="gf-pick" role="radiogroup" aria-label="'+esc(def.pick.label)+'"><span class="gf-pick-label">'+esc(def.pick.label)+'</span>'+def.pick.options.map(([val,label])=>'<button type="button" role="radio" data-pick="'+val+'" aria-checked="'+(cur[def.pick.id]===val)+'">'+esc(label)+'</button>').join('')+'</span>':'');
 }
 function flip(id){
  const def=GF_VARIANTS[mode],cur=variant[mode],want=cur[id]?0:1;
  const keys=def.switches.map(s=>s[0]),dist=l=>keys.filter(k=>(l[k]||0)!==(cur[k]||0)).length;
  const fits=def.lines.filter(l=>(l[id]||0)===want).sort((a,b)=>dist(a)-dist(b));
  const label=k=>def.switches.find(s=>s[0]===k)[1];
  if(!fits.length){varNote.textContent=def.refuse?.[id]||'No legal line '+(want?'with ':'without ')+label(id)+' in this mode.';drawVariants([id]);return;}
  const line=fits[0],moved=keys.filter(k=>k!==id&&(line[k]||0)!==(cur[k]||0));
  keys.forEach(k=>cur[k]=line[k]||0);
  const parts=moved.map(k=>label(k)+(cur[k]?' on':' off'));
  if(line.side&&line.side!==side){side=line.side;moved.push('side');parts.push('switched to on the '+side);}
  varNote.textContent=parts.length?'To keep a legal line: '+parts.join(', ')+'.':'';
  reset(true,moved);
 }
 varBox.addEventListener('click',e=>{const sw=e.target.closest('[data-var]');if(sw)return flip(sw.dataset.var);const pk=e.target.closest('[data-pick]');if(pk){variant[mode][GF_VARIANTS[mode].pick.id]=pk.dataset.pick;varNote.textContent='';drawVariants();reset(true);}});
 // Choosing play or draw keeps the switches only if their line works on that side; otherwise the closest one that does.
 function fitSide(){
  const def=GF_VARIANTS[mode],cur=variant[mode],l=lineOf();
  if(!l||!l.side||l.side===side)return [];
  const keys=def.switches.map(s=>s[0]),dist=x=>keys.filter(k=>(x[k]||0)!==(cur[k]||0)).length;
  const line=def.lines.filter(x=>!x.side||x.side===side).sort((a,b)=>dist(a)-dist(b))[0];
  const moved=keys.filter(k=>(line[k]||0)!==(cur[k]||0));keys.forEach(k=>cur[k]=line[k]||0);
  varNote.textContent='On the '+side+': '+moved.map(k=>def.switches.find(s=>s[0]===k)[1]+(cur[k]?' on':' off')).join(', ')+'.';
  return moved;
 }
 function reset(keepNote,flash=[]){if(!keepNote)varNote.textContent='';const l=lineOf();if(sided()&&l&&l.side&&l.side!==side){side=l.side;flash=[...flash,'side'];}
  drawVariants(flash);states=buildGoldfish(mode,sided()?side:'play',variant[mode]);index=0;render();
  root.querySelectorAll('.gf-side button').forEach(b=>b.classList.toggle('is-magnet',flash.includes('side')&&b.dataset.side===side));}
 root.querySelectorAll('button[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;reset();});root.querySelectorAll('button[data-side]').forEach(b=>b.onclick=()=>{side=b.dataset.side;varNote.textContent='';reset(true,fitSide());});root.querySelector('#gf-restart').onclick=()=>{index=0;render();};root.querySelector('#gf-prev').onclick=()=>{index=Math.max(0,index-1);render();};root.querySelector('#gf-next').onclick=()=>{index=Math.min(states.length-1,index+1);render();};
 root.querySelector('#gf-progress').oninput=e=>{index=Number(e.target.value);render();};reset();
})();

document.getElementById('gf-green-icon').innerHTML=manaSymbols(['G']);
