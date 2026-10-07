// Official mana, tap and untap symbols in written text: {G}, {2}, {B/G}, {T} (tap) and {Q} (untap)
// become the same icons the guide uses for card costs.
(function manaText(){
 const ICONS={...MANA_ICONS,T:COMBO_CARD_ART.T&&COMBO_CARD_ART.T.src,Q:COMBO_CARD_ART.Q&&COMBO_CARD_ART.Q.src};
 const SPOKEN={T:'tap',Q:'untap',W:'white mana',U:'blue mana',B:'black mana',R:'red mana',G:'green mana',C:'colorless mana'};
 const find=/\{([0-9]|[WUBRGCTQ]|[WUBRG]\/[WUBRG])\}/g,has=/\{([0-9]|[WUBRGCTQ]|[WUBRG]\/[WUBRG])\}/;
 for(const root of document.querySelectorAll('.article, #heur')){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
  while(walker.nextNode())if(has.test(walker.currentNode.nodeValue))nodes.push(walker.currentNode);
  for(const node of nodes){
   const text=node.nodeValue,frag=document.createDocumentFragment();let last=0;
   text.replace(find,(match,sym,at)=>{
    if(!ICONS[sym])return match;
    frag.append(text.slice(last,at));
    const img=document.createElement('img');img.src=ICONS[sym];img.className='sym';img.alt=match;
    img.title=SPOKEN[sym]||(sym.includes('/')?'hybrid '+sym+' mana':sym+' generic mana');
    frag.append(img);last=at+match.length;return match;
   });
   frag.append(text.slice(last));node.replaceWith(frag);
  }
 }
})();
