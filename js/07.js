(function visualDeck(){
 const root=document.getElementById('deck'),compact=root.querySelector('.deckgrid'),tip=root.querySelector('.deck38-tip');
 const toolbar=document.createElement('div');toolbar.className='deck-view47';toolbar.innerHTML='<div><h2>Current 75</h2><p>5 Oct 2026 list · 60 main · 15 sideboard</p></div><div role="group" aria-label="Deck display"><button type="button" data-view="compact" aria-pressed="true">Compact</button><button type="button" data-view="visual" aria-pressed="false">Visual</button></div>';
 compact.before(toolbar);const gallery=document.createElement('div');gallery.className='deck-gallery47';gallery.hidden=true;
 for(const box of compact.querySelectorAll(':scope > .box')){
  const section=document.createElement('section'),heading=document.createElement('h3'),grid=document.createElement('div');grid.className='deck-gallery-grid47';let total=0;
  for(const row of box.querySelectorAll('.deckrow')){
   const name=row.querySelector('.deck38-name')?.textContent||row.children[1].textContent.trim(),qty=Number(row.querySelector('.q').textContent),art=COMBO_CARD_ART[name];total+=qty;
   const button=document.createElement('button');button.type='button';button.className='deck-art47';button.dataset.name=name;button.dataset.quantity=qty;if(art?.edition)button.title=art.edition;button.setAttribute('aria-label',qty+' × '+name+' — zoom');
   if(art){const img=document.createElement('img');img.src=art.src;img.alt=name;img.loading='lazy';img.decoding='async';button.append(img);}
   const badge=document.createElement('span');badge.className='deck-qty47';badge.textContent='×'+qty;button.append(badge);
   const label=document.createElement('span');label.className='deck-name47';label.textContent=name;button.append(label);
   button.addEventListener('click',()=>{row.querySelector('.deck38-card')?.click();const modal=document.querySelector('.combo37-dialog');if(modal?.open)modal.addEventListener('close',()=>button.focus(),{once:true});});grid.append(button);
  }
  heading.textContent=box.querySelector('h3').textContent.replace(/\s*\(\d+\)/,'').replace(/ — 15$/,'');const count=document.createElement('small');count.textContent=total+' cards';heading.append(count);section.append(heading,grid);gallery.append(section);
 }
 const note=document.createElement('p');note.className='gallery-note47';note.textContent='One image per unique card · Badges show copies · Tap a card to zoom · Card images: Scryfall / © Wizards of the Coast';gallery.prepend(note);compact.after(gallery);
 toolbar.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{const visual=button.dataset.view==='visual';gallery.hidden=!visual;compact.hidden=visual;if(tip)tip.hidden=visual;toolbar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
 toolbar.querySelector('[data-view=visual]').click();
})();
