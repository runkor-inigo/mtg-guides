/* Speaker Elves — guide menu (rail).
 *
 * A recessed rail of tabs with a mint highlight:
 *  - On a change the highlight moves like an inchworm: the leading edge reaches
 *    the new tab first, then the trailing edge follows.
 *  - The highlight breathes with a soft green glow (css/menu.css) and sends out
 *    one ring of light when it lands.
 *
 * Needs GSAP (window.gsap); without it, or with reduced motion, the highlight
 * jumps. Plain script, no build step.
 *
 * Usage (unchanged from the previous notch menu):
 *   SpeakerNav.create(document.getElementById('guide-nav'), {
 *     tabs: [{ id:'map', label:'Compact SB Map', short:'SB Map', icon:'map', controls:'map' }, ...],
 *     active: 'map',
 *     onChange: function (id, index, fromUser) { ... }
 *   });
 */
(function (global) {
  'use strict';

  var ICONS = {
    map:  '<rect x="3.5" y="4" width="17" height="16" rx="3"/><path d="M3.5 9.5h17M9.2 9.5V20M14.8 9.5V20"/>',
    deck: '<rect x="8" y="3.5" width="11" height="14.5" rx="2.2"/><path d="M5 7.2v11a2.3 2.3 0 0 0 2.3 2.3H15"/>',
    bulb: '<path d="M9 18h6M10.2 21h3.6"/><path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z"/>',
    play: '<circle cx="12" cy="12" r="8.5"/><path d="M10.3 8.9v6.2l5.1-3.1-5.1-3.1Z"/>',
    calc: '<rect x="5" y="3.5" width="14" height="17" rx="2.6"/><path d="M8.5 8h7"/><path d="M8.8 12.2h.01M12 12.2h.01M15.2 12.2h.01M8.8 16h.01M12 16h.01M15.2 16h.01" stroke-width="2.3"/>',
    book: '<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 1 5 17.5V4.5Z"/><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H18"/>'
  };
  var uid = 0;

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function create(host, opts) {
    var tabs = opts.tabs, n = tabs.length, id = 'gr' + (++uid);
    var activeIndex = Math.max(0, tabs.findIndex(function (t) { return t.id === opts.active; }));
    var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---------- DOM ---------- */
    host.innerHTML = '';
    var nav = el('nav', { 'class': 'gr', 'aria-label': opts.label || 'Guide sections' });
    var rail = el('div', { 'class': 'gr-rail', role: 'tablist' });
    var ind = el('span', { 'class': 'gr-ind', 'aria-hidden': 'true' });
    rail.appendChild(ind);
    var btns = tabs.map(function (t, i) {
      var b = el('button', {
        type: 'button', 'class': 'gr-tab', role: 'tab', id: id + '-t' + i,
        'aria-selected': i === activeIndex ? 'true' : 'false',
        tabindex: i === activeIndex ? '0' : '-1'
      }, '<span class="gr-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[t.icon] || ICONS.map) + '</svg></span>' +
         '<span class="gr-lb"><span class="gr-lb-full" data-text="' + t.label + '">' + t.label + '</span><span class="gr-lb-short" data-text="' + (t.short || t.label) + '">' + (t.short || t.label) + '</span></span>');
      if (t.controls) b.setAttribute('aria-controls', t.controls);
      rail.appendChild(b);
      return b;
    });
    nav.appendChild(rail);
    host.appendChild(nav);

    /* ---------- motion ---------- */
    var edge = { l: 0, r: 0 }, tween = null;
    function draw() {
      ind.style.transform = 'translateX(' + edge.l + 'px)';
      ind.style.width = Math.max(0, edge.r - edge.l) + 'px';
    }
    function ping() {
      ind.classList.remove('is-ping');
      void ind.offsetWidth;            // restart the ring animation
      ind.classList.add('is-ping');
    }
    function go(i, instant) {
      var b = btns[i], l = b.offsetLeft, r = l + b.offsetWidth;
      if (tween) tween.kill();
      if (instant || !global.gsap || (reduce && reduce.matches) || !edge.r) {
        edge.l = l; edge.r = r; draw(); return;
      }
      var right = l > edge.l, lead = right ? { r: r } : { l: l }, tail = right ? { l: l } : { r: r };
      lead.duration = 0.26; lead.ease = 'power3.in';
      tail.duration = 0.34; tail.ease = 'power3.out';
      tween = global.gsap.timeline({ onUpdate: draw, onComplete: function () { go(activeIndex, true); ping(); } })
        .to(edge, lead, 0)
        .to(edge, tail, 0.16);
      api.tween = tween;
    }

    function select(i, fromUser) {
      if (i === activeIndex) return;
      activeIndex = i;
      btns.forEach(function (b, k) {
        b.setAttribute('aria-selected', k === i ? 'true' : 'false');
        b.tabIndex = k === i ? 0 : -1;
      });
      go(i);
      if (opts.onChange) opts.onChange(tabs[i].id, i, !!fromUser);
    }

    /* ---------- events ---------- */
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i, true); });
    });
    rail.addEventListener('keydown', function (e) {
      var k = e.key, next = -1;
      if (k === 'ArrowRight') next = (activeIndex + 1) % n;
      else if (k === 'ArrowLeft') next = (activeIndex - 1 + n) % n;
      else if (k === 'Home') next = 0;
      else if (k === 'End') next = n - 1;
      if (next < 0) return;
      e.preventDefault();
      select(next, true);
      btns[next].focus();
    });

    // Re-measure when the rail resizes (fonts, viewport, header shown from display:none).
    // A running move is left alone; it snaps to the final geometry when it lands.
    function remeasure() { if (!(tween && tween.isActive())) go(activeIndex, true); }
    var ro = global.ResizeObserver ? new ResizeObserver(remeasure) : null;
    if (ro) ro.observe(rail); else global.addEventListener('resize', remeasure);
    go(activeIndex, true);

    var api = {
      select: function (idOrIndex) {
        var i = typeof idOrIndex === 'number' ? idOrIndex : tabs.findIndex(function (t) { return t.id === idOrIndex; });
        if (i >= 0) select(i, false);
      },
      get active() { return tabs[activeIndex].id; },
      tabs: btns,
      tween: null
    };
    return api;
  }

  global.SpeakerNav = { create: create, ICONS: ICONS };
})(window);
