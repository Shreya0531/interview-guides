/* Page structure: section headers, sidebar, progress, theme, mobile menu. */
// List of all sections, filled by mountStructure().
const SECS = [];
// Build section headers and footers, the sidebar menu, part cards, progress and scroll spy from each <section> data attribute.
function mountStructure() {
  const secs = $$('section.sec');
  const done = new Set(store('done') || []);
  const parts = {};
  secs.forEach((s, i) => {
    const part = s.dataset.part, pname = s.dataset.pname;
    SECS.push({ el: s, id: s.id, n: i + 1, part, pname, title: s.dataset.title });
    (parts[part] = parts[part] || { name: pname, items: [] }).items.push(SECS[i]);
    const h = document.createElement('header'); h.className = 'sec-h';
    h.innerHTML = `<div class="num">${i + 1}</div><div><span class="part">Part ${part} · ${esc(pname)}</span><h2>${esc(s.dataset.title)}</h2><p class="goal">${esc(s.dataset.goal || '')}</p></div>`;
    s.prepend(h);
    const next = secs[i + 1];
    const f = document.createElement('div'); f.className = 'sec-f';
    f.innerHTML = `<button type="button" class="btn done" data-done="${s.id}">Mark section ${i + 1} as done</button>` +
      (next ? `<a class="btn" href="#${next.id}" data-go="${next.id}">Next: ${esc(next.dataset.title)} →</a>` : `<span class="pill">You reached the end. Well done!</span>`);
    s.appendChild(f);
  });
  // Sidebar menu, grouped by part.
  const nav = $('#nav');
  let html = '';
  Object.keys(parts).forEach(p => {
    html += `<div class="nav-part p${p}"><i></i>Part ${p} · ${esc(parts[p].name)}</div>`;
    parts[p].items.forEach(it => html += `<a class="p${p}" href="#${it.id}" data-go="${it.id}" data-t="${esc(it.title.toLowerCase())}"><span class="n">${it.n}</span><span>${esc(it.title)}</span></a>`);
  });
  nav.innerHTML = html;
  // Part cards in the hero.
  $('#path').innerHTML = Object.keys(parts).map(p => `<a class="p${p}" href="#${parts[p].items[0].id}" data-go="${parts[p].items[0].id}"><h4><span>Part ${p} · ${esc(parts[p].name)}</span><em>${parts[p].items.length} sections</em></h4><ul>${parts[p].items.map(i => `<li>${esc(i.title)}</li>`).join('')}</ul></a>`).join('');

  // Refresh progress bar, ticks and "done" buttons.
  const upd = () => {
    const n = SECS.length, d = done.size;
    $('#sideProg').textContent = `${d} of ${n} done`;
    $('#sideBar').style.width = (d / n * 100) + '%';
    $('#topProg').textContent = Math.round(d / n * 100) + '%';
    $$('#nav a').forEach(a => a.classList.toggle('done', done.has(a.dataset.go)));
    $$('[data-done]').forEach(b => {
      const on = done.has(b.dataset.done); b.classList.toggle('on', on);
      b.textContent = on ? '✓ Done. Tap to undo' : `Mark section ${SECS.find(x => x.id === b.dataset.done).n} as done`;
    });
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-done]');
    if (b) { const id = b.dataset.done; done.has(id) ? done.delete(id) : done.add(id); store('done', [...done]); upd(); return; }
    const a = e.target.closest('[data-go]');
    if (a) { e.preventDefault(); goTo(a.dataset.go); }
  });
  window.markDone = id => { done.add(id); store('done', [...done]); upd(); };
  upd();
  // Sidebar search hides menu items that do not match.
  $('#navSearch').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    $$('#nav a').forEach(a => a.hidden = q && !a.dataset.t.includes(q));
  });
  // Highlight the menu item for the section on screen.
  const links = Object.fromEntries($$('#nav a').map(a => [a.dataset.go, a]));
  const side = $('#side');
  const io = new IntersectionObserver(es => {
    es.forEach(en => {
      if (!en.isIntersecting) return;
      $$('#nav a.active').forEach(a => a.classList.remove('active'));
      const l = links[en.target.id]; if (!l) return;
      l.classList.add('active');
      const r = l.getBoundingClientRect(), s = side.getBoundingClientRect();
      if (r.top < s.top + 120 || r.bottom > s.bottom - 60) side.scrollTop += r.top - s.top - 200;
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  secs.forEach(s => io.observe(s));
}
// Smooth-scroll to a section and update the address.
function goTo(id) {
  const el = document.getElementById(id); if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  try { history.replaceState(null, '', '#' + id); } catch (e) { }
  closeMenu();
}
// Close the phone menu.
function closeMenu() { $('#side').classList.remove('open'); $('#scrim').classList.remove('show'); $('#menuBtn').setAttribute('aria-expanded', 'false'); }
// Phone menu, theme buttons (Auto, Light, Dark) and back-to-top button.
function mountChrome() {
  $('#menuBtn').addEventListener('click', () => {
    const o = $('#side').classList.toggle('open'); $('#scrim').classList.toggle('show', o); $('#menuBtn').setAttribute('aria-expanded', o);
  });
  $('#scrim').addEventListener('click', closeMenu);
  const setTheme = t => {
    const r = document.documentElement;
    if (t === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', t);
    $$('.theme button').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === t));
    store('theme', t);
  };
  $$('.theme button').forEach(b => b.addEventListener('click', () => setTheme(b.dataset.t)));
  setTheme(store('theme') || 'auto');
  const top = $('#toTop');
  addEventListener('scroll', () => { top.hidden = scrollY < 900; }, { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}
