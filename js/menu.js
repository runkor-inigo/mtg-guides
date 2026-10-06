/* Speaker Elves — guide menu (two-level rail).
 *
 * Top level: a recessed rail of guide parts (Learn, Play, ...). Its mint
 * highlight moves like an inchworm (the leading edge reaches the new part
 * first, the trailing edge follows), breathes with a soft green glow and sends
 * out one ring of light when it lands (css/menu.css).
 * Second level: the sections of the active part, with a glowing line that
 * slides to the chosen section. Sections still being written show a cone.
 *
 * Needs GSAP (window.gsap); without it, or with reduced motion, everything
 * jumps. Plain script, no build step.
 *
 * Usage:
 *   SpeakerNav.create(document.getElementById('guide-nav'), {
 *     groups: [{ id:'learn', label:'Learn', icon:'bulb', sections: [
 *       { id:'start', label:'Start Here', short:'Start', controls:'start', wip:true }, ...] }, ...],
 *     active: 'sideboard',
 *     onChange: function (sectionId, index, fromUser) { ... }
 *   });
 */
(function (global) {
  'use strict';

  var ICONS = {
    map:    '<rect x="3.5" y="4" width="17" height="16" rx="3"/><path d="M3.5 9.5h17M9.2 9.5V20M14.8 9.5V20"/>',
    deck:   '<rect x="8" y="3.5" width="11" height="14.5" rx="2.2"/><path d="M5 7.2v11a2.3 2.3 0 0 0 2.3 2.3H15"/>',
    bulb:   '<path d="M9 18h6M10.2 21h3.6"/><path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z"/>',
    play:   '<circle cx="12" cy="12" r="8.5"/><path d="M10.3 8.9v6.2l5.1-3.1-5.1-3.1Z"/>',
    calc:   '<rect x="5" y="3.5" width="14" height="17" rx="2.6"/><path d="M8.5 8h7"/><path d="M8.8 12.2h.01M12 12.2h.01M15.2 12.2h.01M8.8 16h.01M12 16h.01M15.2 16h.01" stroke-width="2.3"/>',
    book:   '<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 1 5 17.5V4.5Z"/><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H18"/>',
    shield: '<path d="M12 3.5 5 6v5.6c0 4.2 2.8 7.4 7 8.9 4.2-1.5 7-4.7 7-8.9V6l-7-2.5Z"/><path d="m9.2 12.2 2 2 3.8-4"/>'
  };
  var CONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 7.2 19h9.6L12 3.5Z"/><path d="M4.5 19.5h15M9.6 11.2h4.8M8.4 15.2h7.2"/></svg>';
  var uid = 0;

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function labelHTML(cls, full, short) {
    return '<span class="' + cls + '"><span class="gr-lb-full" data-text="' + full + '">' + full + '</span>' +
           '<span class="gr-lb-short" data-text="' + short + '">' + short + '</span></span>';
  }

  function create(host, opts) {
    var groups = opts.groups, id = 'gr' + (++uid);
    var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)');
    var animated = function () { return !!global.gsap && !(reduce && reduce.matches); };

    var sections = [];
    groups.forEach(function (g, gi) {
      g.sections.forEach(function (s) { sections.push({ def: s, group: gi }); });
    });
    var cur = Math.max(0, sections.findIndex(function (s) { return s.def.id === opts.active; }));
    var lastInGroup = groups.map(function (g, gi) {
      return sections.findIndex(function (s) { return s.group === gi; });
    });
    lastInGroup[sections[cur].group] = cur;
    var curGroup = sections[cur].group;

    /* ---------- DOM ---------- */
    host.innerHTML = '';
    var nav = el('nav', { 'class': 'gr', 'aria-label': opts.label || 'Guide sections' });
    var rail = el('div', { 'class': 'gr-rail', role: 'tablist', 'aria-label': 'Guide parts' });
    rail.style.setProperty('--gr-n', groups.length);
    var ind = el('span', { 'class': 'gr-ind', 'aria-hidden': 'true' });
    rail.appendChild(ind);
    var subsWrap = el('div', { 'class': 'gr-subs' });

    var groupBtns = [], subRows = [], subInds = [];
    groups.forEach(function (g, gi) {
      var row = el('div', { 'class': 'gr-sub', role: 'tablist', id: id + '-g' + gi, 'aria-label': g.label + ' sections' });
      var sind = el('span', { 'class': 'gr-sub-ind', 'aria-hidden': 'true' });
      row.appendChild(sind);
      row.hidden = gi !== curGroup;
      subRows.push(row); subInds.push(sind); subsWrap.appendChild(row);

      var b = el('button', {
        type: 'button', 'class': 'gr-tab', role: 'tab', id: id + '-p' + gi,
        'aria-controls': row.id,
        'aria-selected': gi === curGroup ? 'true' : 'false',
        tabindex: gi === curGroup ? '0' : '-1'
      }, '<span class="gr-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[g.icon] || ICONS.map) + '</svg></span>' +
         labelHTML('gr-lb', g.label, g.short || g.label));
      rail.appendChild(b); groupBtns.push(b);
    });

    var subBtns = sections.map(function (s, i) {
      var d = s.def;
      var b = el('button', {
        type: 'button', 'class': 'gr-subtab', role: 'tab', id: id + '-s' + i,
        'aria-selected': i === cur ? 'true' : 'false',
        tabindex: i === cur ? '0' : '-1'
      }, labelHTML('gr-sublb', d.label, d.short || d.label) +
         (d.wip ? '<span class="gr-wip" title="Under construction">' + CONE + '</span><span class="gr-sr"> (under construction)</span>' : ''));
      if (d.controls) b.setAttribute('aria-controls', d.controls);
      subRows[s.group].appendChild(b);
      return b;
    });

    nav.appendChild(rail);
    nav.appendChild(subsWrap);
    host.appendChild(nav);

    /* ---------- top rail motion ---------- */
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
    function goGroup(gi, instant) {
      var b = groupBtns[gi], l = b.offsetLeft, r = l + b.offsetWidth;
      if (tween) tween.kill();
      if (instant || !animated() || !edge.r) { edge.l = l; edge.r = r; draw(); return; }
      var right = l > edge.l, lead = right ? { r: r } : { l: l }, tail = right ? { l: l } : { r: r };
      lead.duration = 0.26; lead.ease = 'power3.in';
      tail.duration = 0.34; tail.ease = 'power3.out';
      tween = global.gsap.timeline({ onUpdate: draw, onComplete: function () { goGroup(curGroup, true); ping(); } })
        .to(edge, lead, 0)
        .to(edge, tail, 0.16);
    }

    /* ---------- second row ---------- */
    function placeSub(gi, instant) {
      var row = subRows[gi], sind = subInds[gi], b = subBtns[lastInGroup[gi]];
      if (!b || row.hidden) return;
      sind.classList.toggle('no-anim', !!instant || !animated());
      sind.style.transform = 'translateX(' + b.offsetLeft + 'px)';
      sind.style.width = b.offsetWidth + 'px';
      // Keep the chosen section visible when the row scrolls (phones).
      var target = b.offsetLeft - (row.clientWidth - b.offsetWidth) / 2;
      if (row.scrollWidth > row.clientWidth) row.scrollTo({ left: Math.max(0, target), behavior: instant || !animated() ? 'auto' : 'smooth' });
    }
    function showRow(gi) {
      subRows.forEach(function (row, k) { row.hidden = k !== gi; });
      placeSub(gi, true);
      if (animated()) {
        global.gsap.fromTo(subRows[gi].querySelectorAll('.gr-subtab'),
          { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.035, ease: 'power2.out', clearProps: 'opacity,transform' });
      }
    }

    /* ---------- selection ---------- */
    function select(i, fromUser) {
      if (i === cur || i < 0) return;
      var g = sections[i].group, groupChanged = g !== curGroup;
      cur = i; curGroup = g; lastInGroup[g] = i;
      subBtns.forEach(function (b, k) {
        b.setAttribute('aria-selected', k === i ? 'true' : 'false');
        b.tabIndex = k === i ? 0 : -1;
      });
      groupBtns.forEach(function (b, k) {
        b.setAttribute('aria-selected', k === g ? 'true' : 'false');
        b.tabIndex = k === g ? 0 : -1;
      });
      if (groupChanged) { goGroup(g); showRow(g); }
      else placeSub(g);
      if (opts.onChange) opts.onChange(sections[i].def.id, i, !!fromUser);
    }

    /* ---------- events ---------- */
    groupBtns.forEach(function (b, gi) {
      b.addEventListener('click', function () { select(lastInGroup[gi], true); });
    });
    subBtns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i, true); });
    });
    function arrows(e, count, at) {
      var k = e.key;
      if (k === 'ArrowRight') return (at + 1) % count;
      if (k === 'ArrowLeft') return (at - 1 + count) % count;
      if (k === 'Home') return 0;
      if (k === 'End') return count - 1;
      return -1;
    }
    rail.addEventListener('keydown', function (e) {
      var next = arrows(e, groups.length, curGroup);
      if (next < 0) return;
      e.preventDefault();
      select(lastInGroup[next], true);
      groupBtns[next].focus();
    });
    subsWrap.addEventListener('keydown', function (e) {
      var inGroup = sections.map(function (s, k) { return k; }).filter(function (k) { return sections[k].group === curGroup; });
      var next = arrows(e, inGroup.length, inGroup.indexOf(cur));
      if (next < 0) return;
      e.preventDefault();
      select(inGroup[next], true);
      subBtns[inGroup[next]].focus();
    });

    // Re-measure when the menu resizes (fonts, viewport, header shown from display:none).
    // A running move is left alone; it snaps to the final geometry when it lands.
    function remeasure() {
      if (!(tween && tween.isActive())) goGroup(curGroup, true);
      placeSub(curGroup, true);
    }
    var ro = global.ResizeObserver ? new ResizeObserver(remeasure) : null;
    if (ro) { ro.observe(rail); ro.observe(subsWrap); } else global.addEventListener('resize', remeasure);
    goGroup(curGroup, true);
    placeSub(curGroup, true);

    return {
      select: function (idOrIndex) {
        var i = typeof idOrIndex === 'number' ? idOrIndex : sections.findIndex(function (s) { return s.def.id === idOrIndex; });
        select(i, false);
      },
      get active() { return sections[cur].def.id; },
      get group() { return groups[curGroup].id; },
      tabFor: function (sectionId) {
        return subBtns[sections.findIndex(function (s) { return s.def.id === sectionId; })];
      },
      groupTabs: groupBtns,
      tabs: subBtns
    };
  }

  global.SpeakerNav = { create: create, ICONS: ICONS };
})(window);
