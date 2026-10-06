/* Speaker Elves — guide menu (collapsible sidebar).
 *
 * Desktop: a sidebar beside the content. Each part (Learn, Gameplay, ...)
 * unfolds its sections. The current section carries the mint pill, which
 * moves like an inchworm (the edge facing the move leads, the other follows),
 * breathes with a soft green glow and rings once when it lands. The current
 * part lights up its own text and icon instead of getting a pill. The arrows
 * at the top fold the sidebar down to icons; an icon then opens its sections
 * in a small panel beside it.
 * Phones: a sticky mint bar names the current section and opens the same menu.
 *
 * Needs GSAP (window.gsap); without it, or with reduced motion, everything
 * jumps and the glow stays steady. Plain script, no build step.
 *
 * Usage:
 *   SpeakerNav.create(document.getElementById('guide-nav'), {
 *     groups: [{ id:'learn', label:'Learn', icon:'bulb', sections: [
 *       { id:'start', label:'Start Here', controls:'start', wip:true }, ...] }, ...],
 *     active: 'sideboard',
 *     onChange: function (sectionId, index, fromUser) { ... }
 *   });
 */
(function (global) {
  'use strict';

  var ICONS = {
    bulb:   '<path d="M9 18h6M10.2 21h3.6"/><path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z"/>',
    play:   '<circle cx="12" cy="12" r="8.5"/><path d="M10.3 8.9v6.2l5.1-3.1-5.1-3.1Z"/>',
    shield: '<path d="M12 3.5 5 6v5.6c0 4.2 2.8 7.4 7 8.9 4.2-1.5 7-4.7 7-8.9V6l-7-2.5Z"/><path d="m9.2 12.2 2 2 3.8-4"/>',
    book:   '<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 1 5 17.5V4.5Z"/><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H18"/>'
  };
  var CONE = '<span class="sb-cone" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3.5 7.2 19h9.6L12 3.5Z"/><path d="M4.5 19.5h15M9.6 11.2h4.8M8.4 15.2h7.2"/></svg></span><span class="sb-sr"> (under construction)</span>';
  var CHEV = '<svg class="sb-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  var FOLD = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/></svg>';
  var STORE = 'speakerNav.collapsed';
  var uid = 0;

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function create(host, opts) {
    var groups = opts.groups;
    var gsap = global.gsap;
    var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)');
    var still = function () { return !gsap || (reduce && reduce.matches); };

    var sections = [];
    groups.forEach(function (g, gi) {
      g.sections.forEach(function (s) { sections.push({ def: s, g: gi }); });
    });
    var cur = Math.max(0, sections.findIndex(function (s) { return s.def.id === opts.active; }));
    var instances = [];

    function itemHTML(i) {
      var d = sections[i].def;
      return '<button type="button" class="sb-item" data-i="' + i + '"' + (d.controls ? ' aria-controls="' + d.controls + '"' : '') + '>' +
        '<span class="sb-lb" data-text="' + d.label + '">' + d.label + '</span>' + (d.wip ? CONE : '') + '</button>';
    }
    function sidebarHTML(withTop) {
      var id = 'sb' + (++uid);
      return (withTop ? '<div class="sb-top"><span class="sb-title">Contents</span><button type="button" class="sb-toggle" aria-label="Collapse sidebar" aria-expanded="true">' + FOLD + '</button></div>' : '') +
        '<div class="sb-body"><span class="sb-pill is-hidden" aria-hidden="true"></span>' +
        groups.map(function (g, gi) {
          return '<div class="sb-group"><button type="button" class="sb-head" data-g="' + gi + '" aria-expanded="false" aria-controls="' + id + '-g' + gi + '">' +
            '<span class="sb-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[g.icon] || ICONS.book) + '</svg></span><span class="sb-label">' + g.label + '</span>' + CHEV + '</button>' +
            '<div class="sb-items" id="' + id + '-g' + gi + '"><div class="sb-items-inner">' +
            sections.map(function (s, i) { return s.g === gi ? itemHTML(i) : ''; }).join('') + '</div></div></div>';
        }).join('') + '</div>';
    }

    /* ---------- DOM ---------- */
    host.innerHTML = '';
    var side = el('div', { 'class': 'gn-side' });
    var sideNav = el('nav', { 'class': 'sb', 'aria-label': opts.label || 'Guide sections' }, sidebarHTML(true));
    var fly = el('div', { 'class': 'sb-fly', hidden: '' }, '<p class="sb-fly-title"></p><div class="sb-fly-items"></div>');
    side.appendChild(sideNav); side.appendChild(fly);

    var mobile = el('div', { 'class': 'gn-mobile' });
    var chapter = el('button', { type: 'button', 'class': 'gn-chapter', 'aria-expanded': 'false', 'aria-controls': 'gn-sheet' },
      '<span class="gn-chapter-name"></span><small class="gn-chapter-part"></small><svg class="gn-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>');
    var sheet = el('div', { 'class': 'gn-sheet', id: 'gn-sheet' });
    var sheetNav = el('nav', { 'class': 'sb', 'aria-label': opts.label || 'Guide sections' }, sidebarHTML(false));
    sheet.appendChild(sheetNav);
    mobile.appendChild(chapter); mobile.appendChild(sheet);
    host.appendChild(side); host.appendChild(mobile);

    /* ---------- one sidebar ---------- */
    function Sidebar(nav, flyout) {
      var body = nav.querySelector('.sb-body'), pill = nav.querySelector('.sb-pill'), toggle = nav.querySelector('.sb-toggle');
      var heads = [].slice.call(nav.querySelectorAll('.sb-head')), wraps = [].slice.call(nav.querySelectorAll('.sb-items'));
      var items = [].slice.call(nav.querySelectorAll('.sb-item'));
      var open = groups.map(function (g, gi) { return gi === sections[cur].g; });
      var collapsed = false, tw = null, flyG = -1;
      var st = { t: 0, b: 0, l: 0, r: 0 };
      wraps.forEach(function (w, g) { w.style.height = open[g] ? 'auto' : '0px'; heads[g].setAttribute('aria-expanded', String(open[g])); });

      function visible() { return nav.offsetParent !== null && body.getBoundingClientRect().width > 0; }
      // The pill sits on the current section; the current part lights its own text.
      function target() {
        var g = sections[cur].g;
        if (collapsed || !open[g]) return null;
        return items.filter(function (b) { return +b.dataset.i === cur; })[0];
      }
      function rel(n) {
        var r = n.getBoundingClientRect(), o = body.getBoundingClientRect();
        return { t: r.top - o.top, b: r.bottom - o.top, l: r.left - o.left, r: r.right - o.left };
      }
      function draw() {
        pill.style.transform = 'translate(' + st.l + 'px,' + st.t + 'px)';
        pill.style.width = Math.max(0, st.r - st.l) + 'px';
        pill.style.height = Math.max(0, st.b - st.t) + 'px';
      }
      function ping() { pill.classList.remove('is-ping'); void pill.offsetWidth; pill.classList.add('is-ping'); }
      function place(instant) {
        var g = sections[cur].g;
        heads.forEach(function (h, k) { h.classList.toggle('is-current', k === g); });
        items.forEach(function (b) { b.setAttribute('aria-current', +b.dataset.i === cur ? 'page' : 'false'); });
        if (!visible()) return;
        var n = target();
        if (tw) tw.kill();
        if (!n) { pill.classList.add('is-hidden'); return; }
        var T = rel(n), wasHidden = pill.classList.contains('is-hidden');
        if (instant || still() || wasHidden) {
          st.t = T.t; st.b = T.b; st.l = T.l; st.r = T.r; draw();
          if (wasHidden) { pill.classList.remove('is-hidden'); if (!instant && !still()) ping(); }
          return;
        }
        var down = T.t > st.t, far = Math.min(1.6, 1 + Math.abs(T.t - st.t) / 400);
        var lead = down ? { b: T.b } : { t: T.t }, tail = down ? { t: T.t } : { b: T.b };
        lead.duration = 0.26 * far; lead.ease = 'power3.in';
        tail.l = T.l; tail.r = T.r; tail.duration = 0.34 * far; tail.ease = 'power3.out';
        tw = gsap.timeline({ onUpdate: draw, onComplete: ping }).to(st, lead, 0).to(st, tail, 0.16 * far);
      }
      function follow() { if (!(tw && tw.isActive())) place(true); }

      function setGroup(g, want) {
        if (open[g] === want) return;
        open[g] = want; heads[g].setAttribute('aria-expanded', String(want));
        var w = wraps[g], inner = w.firstElementChild, mine = sections[cur].g === g;
        if (still()) { w.style.height = want ? 'auto' : '0px'; place(true); return; }
        gsap.killTweensOf(w);
        if (mine && !want) place(false);             // the pill fades as its part folds away
        gsap.fromTo(w, { height: w.getBoundingClientRect().height }, {
          height: want ? inner.offsetHeight : 0, duration: 0.38, ease: 'power3.inOut',
          onUpdate: function () { if (!mine) follow(); },
          onComplete: function () { if (want) w.style.height = 'auto'; if (mine && want) place(false); else follow(); }
        });
      }
      function setCollapsed(c, instant) {
        collapsed = c; closeFly();
        if (toggle) { toggle.setAttribute('aria-expanded', String(!c)); toggle.setAttribute('aria-label', c ? 'Expand sidebar' : 'Collapse sidebar'); }
        nav.classList.toggle('is-collapsed', c);
        try { global.localStorage.setItem(STORE, c ? '1' : '0'); } catch (e) {}
        if (instant || still()) { nav.style.width = c ? '70px' : ''; place(true); global.dispatchEvent(new Event('resize')); return; }
        gsap.to(nav, { width: c ? 70 : 252, duration: 0.42, ease: 'power3.inOut', onUpdate: function () { place(true); },
          onComplete: function () { if (!c) nav.style.width = ''; place(false); global.dispatchEvent(new Event('resize')); } });
      }
      // Folded to icons: a part's sections open in a small panel beside its icon.
      function openFly(g) {
        flyG = g; flyout.hidden = false;
        flyout.querySelector('.sb-fly-title').textContent = groups[g].label;
        flyout.querySelector('.sb-fly-items').innerHTML = sections.map(function (s, i) { return s.g === g ? itemHTML(i) : ''; }).join('');
        [].forEach.call(flyout.querySelectorAll('.sb-item'), function (b) { b.setAttribute('aria-current', +b.dataset.i === cur ? 'page' : 'false'); });
        var h = heads[g].getBoundingClientRect(), o = flyout.parentElement.getBoundingClientRect();
        flyout.style.top = Math.max(0, h.top - o.top - 8) + 'px';
        if (!still()) gsap.fromTo(flyout, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.28, ease: 'power3.out', clearProps: 'opacity,transform' });
      }
      function closeFly() { if (flyout && !flyout.hidden) { flyout.hidden = true; flyG = -1; } }

      nav.addEventListener('click', function (e) {
        var head = e.target.closest('.sb-head');
        if (head) { var g = +head.dataset.g; if (collapsed) { if (flyG === g) closeFly(); else openFly(g); } else setGroup(g, !open[g]); return; }
        var item = e.target.closest('.sb-item');
        if (item) { select(+item.dataset.i, true); return; }
        if (e.target.closest('.sb-toggle')) setCollapsed(!collapsed);
      });
      if (flyout) {
        flyout.addEventListener('click', function (e) {
          var item = e.target.closest('.sb-item');
          if (item) { select(+item.dataset.i, true); closeFly(); }
        });
        document.addEventListener('click', function (e) {
          if (!flyout.hidden && !flyout.contains(e.target) && !nav.contains(e.target)) closeFly();
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeFly(); });
      }

      return {
        nav: nav, items: items, place: place, follow: follow, setCollapsed: setCollapsed,
        update: function () {
          var g = sections[cur].g;
          if (!collapsed && !open[g]) setGroup(g, true); else place(false);
        }
      };
    }

    var sideBar = Sidebar(sideNav, fly), sheetBar = Sidebar(sheetNav, null);
    instances.push(sideBar, sheetBar);
    try { if (global.localStorage.getItem(STORE) === '1') sideBar.setCollapsed(true, true); } catch (e) {}

    /* ---------- phone sheet ---------- */
    var sheetOpen = false;
    function setSheet(open) {
      sheetOpen = open; chapter.setAttribute('aria-expanded', String(open));
      if (gsap) gsap.killTweensOf(sheet);
      if (still()) { sheet.style.height = open ? 'auto' : '0px'; if (open) sheetBar.place(true); return; }
      gsap.fromTo(sheet, { height: sheet.getBoundingClientRect().height }, {
        height: open ? sheetNav.offsetHeight : 0, duration: open ? 0.42 : 0.3, ease: open ? 'power3.out' : 'power3.in',
        onUpdate: function () { if (open) sheetBar.follow(); },
        onComplete: function () { if (open) { sheet.style.height = 'auto'; sheetBar.place(true); } }
      });
    }
    chapter.addEventListener('click', function () { setSheet(!sheetOpen); });
    function updateChapter() {
      chapter.querySelector('.gn-chapter-name').textContent = sections[cur].def.label;
      chapter.querySelector('.gn-chapter-part').textContent = groups[sections[cur].g].label;
    }

    /* ---------- selection ---------- */
    function select(i, fromUser) {
      if (i < 0 || i >= sections.length) return;
      var same = i === cur;
      cur = i;
      instances.forEach(function (b) { b.update(); });
      updateChapter();
      if (sheetOpen && fromUser) global.setTimeout(function () { setSheet(false); }, still() ? 0 : 380);
      if (!same && opts.onChange) opts.onChange(sections[i].def.id, i, !!fromUser);
    }

    if (global.ResizeObserver) {
      var ro = new ResizeObserver(function () { instances.forEach(function (b) { b.follow(); }); });
      ro.observe(sideNav); ro.observe(sheetNav);
    } else {
      global.addEventListener('resize', function () { instances.forEach(function (b) { b.follow(); }); });
    }
    instances.forEach(function (b) { b.place(true); });
    updateChapter();

    return {
      select: function (idOrIndex, fromUser) {
        var i = typeof idOrIndex === 'number' ? idOrIndex : sections.findIndex(function (s) { return s.def.id === idOrIndex; });
        select(i, !!fromUser);
      },
      get active() { return sections[cur].def.id; },
      get group() { return groups[sections[cur].g].id; },
      tabFor: function (sectionId) {
        var i = sections.findIndex(function (s) { return s.def.id === sectionId; });
        var b = sideBar.items.filter(function (n) { return +n.dataset.i === i; })[0];
        if (b && !b.id) b.id = 'gn-s' + i;
        return b;
      }
    };
  }

  global.SpeakerNav = { create: create, ICONS: ICONS };
})(window);
