/* Speaker Elves — animated notch menu.
 *
 * What it does (measured from the reference video, upper treatment):
 *  - The bar is one gradient shape with a notch cut out of its top edge.
 *  - On a change the notch slides rigidly to the new tab in ~0.42 s using a
 *    cubic-bezier(0.80, 0.05, 0.05, 1.00) curve: slow wind-up, fast middle,
 *    long settle.
 *  - Icons are drawn twice: white on the bar (layer A, clipped to the bar) and
 *    coloured inside the notch (layer B, clipped to the notch), so an icon
 *    changes colour exactly where the notch edge crosses it.
 *  - Icons close to the notch grow slightly and lift.
 *
 * Needs GSAP (window.gsap). Plain script, no build step.
 *
 * Usage:
 *   SpeakerNav.create(document.getElementById('guide-nav'), {
 *     tabs: [{ id:'map', label:'Compact SB Map', short:'SB Map', icon:'map' }, ...],
 *     active: 'map',
 *     onChange: function (id, index) { ... }
 *   });
 */
(function (global) {
  'use strict';

  var ICONS = {
    map:   '<rect x="3.5" y="4" width="17" height="16" rx="3"/><path d="M3.5 9.5h17M9.2 9.5V20M14.8 9.5V20"/>',
    deck:  '<rect x="8" y="3.5" width="11" height="14.5" rx="2.2"/><path d="M5 7.2v11a2.3 2.3 0 0 0 2.3 2.3H15"/>',
    bulb:  '<path d="M9 18h6M10.2 21h3.6"/><path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z"/>',
    play:  '<circle cx="12" cy="12" r="8.5"/><path d="M10.3 8.9v6.2l5.1-3.1-5.1-3.1Z"/>',
    calc:  '<rect x="5" y="3.5" width="14" height="17" rx="2.6"/><path d="M8.5 8h7"/><path d="M8.8 12.2h.01M12 12.2h.01M15.2 12.2h.01M8.8 16h.01M12 16h.01M15.2 16h.01" stroke-width="2.3"/>',
    book:  '<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 1 5 17.5V4.5Z"/><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H18"/>',
    shield:'<path d="M12 3.5 5 6v5.6c0 4.2 2.8 7.4 7 8.9 4.2-1.5 7-4.7 7-8.9V6l-7-2.5Z"/><path d="m9.2 12.2 2 2 3.8-4"/>',
    swords:'<path d="m5 5 8 8M5 5v3.5L7.5 11M5 5h3.5"/><path d="m19 5-8 8M19 5v3.5L16.5 11M19 5h-3.5"/><path d="m8 16-3 3m11-3 3 3"/>',
    cards: '<rect x="4" y="6" width="10" height="13" rx="2"/><path d="M8 6V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1"/>'
  };

  /* cubic-bezier(x1,y1,x2,y2) as a GSAP ease function */
  function bezier(x1, y1, x2, y2) {
    function cx(s) { return 3 * (1 - s) * (1 - s) * s * x1 + 3 * (1 - s) * s * s * x2 + s * s * s; }
    function cy(s) { return 3 * (1 - s) * (1 - s) * s * y1 + 3 * (1 - s) * s * s * y2 + s * s * s; }
    function dx(s) { return 3 * (1 - s) * (1 - s) * x1 + 6 * (1 - s) * s * (x2 - x1) + 3 * s * s * (1 - x2); }
    return function (u) {
      if (u <= 0) return 0;
      if (u >= 1) return 1;
      var s = u, i, x, d;
      for (i = 0; i < 8; i++) {                 // Newton
        x = cx(s) - u;
        if (Math.abs(x) < 1e-5) return cy(s);
        d = dx(s);
        if (Math.abs(d) < 1e-6) break;
        s -= x / d;
      }
      var lo = 0, hi = 1; s = u;                // bisection fallback
      for (i = 0; i < 24; i++) {
        x = cx(s);
        if (Math.abs(x - u) < 1e-5) break;
        if (x < u) lo = s; else hi = s;
        s = (lo + hi) / 2;
      }
      return cy(s);
    };
  }
  var EASE = bezier(0.80, 0.05, 0.05, 1.00);

  var SVGNS = 'http://www.w3.org/2000/svg';
  var uid = 0;

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function sv(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }
  function f(n) { return Math.round(n * 100) / 100; }

  function create(host, opts) {
    var tabs = opts.tabs;
    var n = tabs.length;
    var id = 'sn' + (++uid);
    var activeIndex = Math.max(0, tabs.findIndex(function (t) { return t.id === opts.active; }));
    var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---------- DOM ---------- */
    host.innerHTML = '';
    var nav = el('nav', { 'class': 'sn', 'aria-label': opts.label || 'Guide sections' });
    host.appendChild(nav);

    var svg = sv('svg', { 'class': 'sn-bg', 'aria-hidden': 'true', focusable: 'false' });
    var defs = sv('defs');
    var grad = sv('linearGradient', { id: id + '-g', gradientUnits: 'userSpaceOnUse' });
    [['0', '#0a3529'], ['.5', '#0e5c46'], ['1', '#1b8760']].forEach(function (s) {
      grad.appendChild(sv('stop', { offset: s[0], 'stop-color': s[1] }));
    });
    var glow = sv('radialGradient', { id: id + '-r', gradientUnits: 'userSpaceOnUse' });
    glow.appendChild(sv('stop', { offset: '0', 'stop-color': '#d9ffe9', 'stop-opacity': '.28' }));
    glow.appendChild(sv('stop', { offset: '1', 'stop-color': '#d9ffe9', 'stop-opacity': '0' }));
    var shine = sv('linearGradient', { id: id + '-s', gradientUnits: 'userSpaceOnUse', x1: '0', y1: '0', x2: '0' });
    shine.appendChild(sv('stop', { offset: '0', 'stop-color': '#fff', 'stop-opacity': '.5' }));
    shine.appendChild(sv('stop', { offset: '1', 'stop-color': '#fff', 'stop-opacity': '0' }));
    defs.appendChild(grad); defs.appendChild(glow); defs.appendChild(shine);
    var pFill  = sv('path', { fill: 'url(#' + id + '-g)' });
    var pGlow  = sv('path', { fill: 'url(#' + id + '-r)' });
    var pShine = sv('path', { fill: 'none', stroke: 'url(#' + id + '-s)', 'stroke-width': '1.4' });
    svg.appendChild(defs); svg.appendChild(pFill); svg.appendChild(pGlow); svg.appendChild(pShine);
    nav.appendChild(svg);

    function tabHTML(t) {
      return '<span class="sn-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[t.icon] || ICONS.map) + '</svg></span>' +
             '<span class="sn-lb"><span class="sn-lb-full">' + t.label + '</span><span class="sn-lb-short">' + (t.short || t.label) + '</span></span>';
    }
    var listA = el('ul', { 'class': 'sn-layer sn-a', role: 'tablist' });
    var listB = el('ul', { 'class': 'sn-layer sn-b', 'aria-hidden': 'true' });
    var btnsA = [], icB = [];
    tabs.forEach(function (t, i) {
      var li = el('li'), b = el('button', {
        type: 'button', 'class': 'sn-tab', role: 'tab', id: id + '-t' + i,
        'aria-selected': i === activeIndex ? 'true' : 'false',
        tabindex: i === activeIndex ? '0' : '-1'
      }, tabHTML(t));
      b.setAttribute('aria-label', t.label);
      if (t.controls) b.setAttribute('aria-controls', t.controls);
      li.appendChild(b); listA.appendChild(li); btnsA.push(b);
      var li2 = el('li'), s = el('span', { 'class': 'sn-tab' }, tabHTML(t));
      li2.appendChild(s); listB.appendChild(li2); icB.push(s.querySelector('.sn-ic'));
    });
    var ring = el('div', { 'class': 'sn-ring' });
    nav.appendChild(listA); nav.appendChild(listB); nav.appendChild(ring);

    /* ---------- geometry ---------- */
    var G = {};           // W,H,pad,P,notchW,nb ...
    var state = { pos: 0 };

    function cs(name, fallback) {
      var v = parseFloat(getComputedStyle(nav).getPropertyValue(name));
      return isNaN(v) ? fallback : v;
    }
    function centerOf(i) { return G.pad + (i + 0.5) * G.P; }

    function layout() {
      var W = nav.clientWidth, H = nav.clientHeight;
      var pad = Math.max(14, Math.min(40, W * 0.04));
      var P = (W - 2 * pad) / n;
      var strip = cs('--sn-strip', 9);
      G = {
        W: W, H: H, pad: pad, P: P, strip: strip,
        notchW: P + Math.min(18, P * 0.14),
        nb: H - strip,
        Ro: Math.min(28, H * 0.34),      // outer corners of the bar
        rt: Math.min(22, H * 0.27),      // inner top corners (next to the notch)
        rn: Math.min(26, H * 0.31)       // notch bottom corners
      };
      nav.style.setProperty('--sn-n', n);
      nav.style.setProperty('--sn-pad', pad + 'px');
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      grad.setAttribute('x1', 0);  grad.setAttribute('y1', H);
      grad.setAttribute('x2', W);  grad.setAttribute('y2', 0);
      glow.setAttribute('cx', W * 0.34); glow.setAttribute('cy', 0); glow.setAttribute('r', W * 0.34);
      shine.setAttribute('y2', H * 0.42);
      ring.style.height = (G.nb - 10) + 'px';
      ring.style.width = (G.notchW - 6) + 'px';
      state.pos = centerOf(activeIndex);
      draw();
    }

    function shapes(pos) {
      var W = G.W, H = G.H, nb = G.nb, nw = G.notchW;
      var x1 = pos - nw / 2, x2 = pos + nw / 2;
      var rl  = Math.max(0, Math.min(G.Ro, x1 / 2));
      var ri1 = Math.max(0, Math.min(G.rt, x1 - rl));
      var rr  = Math.max(0, Math.min(G.Ro, (W - x2) / 2));
      var ri2 = Math.max(0, Math.min(G.rt, (W - x2) - rr));
      var rn  = Math.min(G.rn, nw / 2, nb - ri1 - 1, nb - ri2 - 1);
      var Rb  = G.Ro;
      var d = 'M' + f(rl) + ',0' +
        'H' + f(x1 - ri1) + 'A' + f(ri1) + ' ' + f(ri1) + ' 0 0 1 ' + f(x1) + ',' + f(ri1) +
        'V' + f(nb - rn) + 'A' + f(rn) + ' ' + f(rn) + ' 0 0 0 ' + f(x1 + rn) + ',' + f(nb) +
        'H' + f(x2 - rn) + 'A' + f(rn) + ' ' + f(rn) + ' 0 0 0 ' + f(x2) + ',' + f(nb - rn) +
        'V' + f(ri2) + 'A' + f(ri2) + ' ' + f(ri2) + ' 0 0 1 ' + f(x2 + ri2) + ',0' +
        'H' + f(W - rr) + 'A' + f(rr) + ' ' + f(rr) + ' 0 0 1 ' + f(W) + ',' + f(rr) +
        'V' + f(H - Rb) + 'A' + f(Rb) + ' ' + f(Rb) + ' 0 0 1 ' + f(W - Rb) + ',' + f(H) +
        'H' + f(Rb) + 'A' + f(Rb) + ' ' + f(Rb) + ' 0 0 1 0,' + f(H - Rb) +
        'V' + f(rl) + 'A' + f(rl) + ' ' + f(rl) + ' 0 0 1 ' + f(rl) + ',0Z';
      var hole = 'M' + f(x1) + ',-30H' + f(x2) + 'V' + f(nb - rn) +
        'A' + f(rn) + ' ' + f(rn) + ' 0 0 1 ' + f(x2 - rn) + ',' + f(nb) +
        'H' + f(x1 + rn) + 'A' + f(rn) + ' ' + f(rn) + ' 0 0 1 ' + f(x1) + ',' + f(nb - rn) + 'Z';
      return { bar: d, hole: hole };
    }

    function draw() {
      var s = shapes(state.pos);
      pFill.setAttribute('d', s.bar);
      pGlow.setAttribute('d', s.bar);
      pShine.setAttribute('d', s.bar);
      var a = "path('" + s.bar + "')", b = "path('" + s.hole + "')";
      listA.style.clipPath = a; listA.style.webkitClipPath = a;
      listB.style.clipPath = b; listB.style.webkitClipPath = b;
      ring.style.transform = 'translate(' + f(state.pos - (G.notchW - 6) / 2) + 'px,5px)';
      for (var i = 0; i < n; i++) {                       // icons near the notch grow and lift
        var near = Math.max(0, 1 - Math.abs(centerOf(i) - state.pos) / G.P);
        var k = near * near * (3 - 2 * near);
        icB[i].style.transform = 'translateY(' + f(-4 * k) + 'px) scale(' + f(1 + 0.2 * k) + ')';
      }
    }

    /* ---------- motion ---------- */
    var tween = null;
    function go(i, opts2) {
      opts2 = opts2 || {};
      var prev = activeIndex;
      activeIndex = i;
      btnsA.forEach(function (b, k) {
        b.setAttribute('aria-selected', k === i ? 'true' : 'false');
        b.tabIndex = k === i ? 0 : -1;
      });
      var target = centerOf(i);
      if (tween) tween.kill();
      if (opts2.instant || !global.gsap || (reduce && reduce.matches)) {
        state.pos = target; draw(); return;
      }
      var steps = Math.max(1, Math.abs(i - prev));
      tween = global.gsap.to(state, {
        pos: target,
        duration: Math.min(0.62, 0.42 + 0.05 * (steps - 1)),
        delay: 0.04,
        ease: EASE,
        onUpdate: draw,
        onComplete: draw
      });
      api.tween = tween;
    }

    function select(i, fromUser) {
      if (i === activeIndex) return;
      go(i);
      if (opts.onChange) opts.onChange(tabs[i].id, i, !!fromUser);
    }

    /* ---------- events ---------- */
    btnsA.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i, true); });
    });
    listA.addEventListener('keydown', function (e) {
      var k = e.key, next = -1;
      if (k === 'ArrowRight') next = (activeIndex + 1) % n;
      else if (k === 'ArrowLeft') next = (activeIndex - 1 + n) % n;
      else if (k === 'Home') next = 0;
      else if (k === 'End') next = n - 1;
      if (next < 0) return;
      e.preventDefault();
      select(next, true);
      btnsA[next].focus();
    });
    nav.addEventListener('focusin', function (e) {
      if (e.target.matches && e.target.matches(':focus-visible')) nav.classList.add('is-kbd');
    });
    nav.addEventListener('focusout', function () { nav.classList.remove('is-kbd'); });

    var ro = global.ResizeObserver ? new ResizeObserver(function () { layout(); }) : null;
    if (ro) ro.observe(nav); else global.addEventListener('resize', layout);
    layout();

    var api = {
      select: function (idOrIndex) {
        var i = typeof idOrIndex === 'number' ? idOrIndex : tabs.findIndex(function (t) { return t.id === idOrIndex; });
        if (i >= 0) select(i, false);
      },
      get active() { return tabs[activeIndex].id; },
      tween: null,
      _draw: draw, _state: state, _centerOf: centerOf
    };
    return api;
  }

  global.SpeakerNav = { create: create, ICONS: ICONS, ease: EASE };
})(window);
