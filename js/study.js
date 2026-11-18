/* Interview Q&A cards, coding tasks, error doctor, cheat sheet. */
// Interview flashcards with level filter, search and "I know this" ticks.
function mountQA() {
  const box = $('#qalist'); if (!box) return;
  let known = new Set(store('qaKnown') || []), lv = 'all', q = '';
  const LV = { b: 'Basic', m: 'Medium', a: 'Advanced' };
  const render = () => {
    const items = QA.map((x, i) => ({ ...x, i })).filter(x => (lv === 'all' || x.l === lv) && (!q || (x.q + x.a).toLowerCase().includes(q)));
    box.innerHTML = items.map(x => `<details class="fc ${known.has(x.i) ? 'known' : ''}" data-i="${x.i}"><summary><span>${esc(x.q)}</span><span class="lvl ${x.l}">${LV[x.l]}</span></summary><div class="ans">${x.a}<label class="check know"><input type="checkbox" data-known="${x.i}" ${known.has(x.i) ? 'checked' : ''}> I know this</label></div></details>`).join('') || '<p class="mini">No question matches.</p>';
    $('#qaCount').textContent = `${known.size} of ${QA.length} marked as known`;
  };
  $$('.filters [data-lv]').forEach(b => b.addEventListener('click', () => {
    lv = b.dataset.lv; $$('.filters [data-lv]').forEach(x => x.classList.toggle('on', x === b)); render();
  }));
  $('#qaSearch').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); render(); });
  box.addEventListener('change', e => {
    const c = e.target.closest('[data-known]'); if (!c) return;
    const i = +c.dataset.known; c.checked ? known.add(i) : known.delete(i);
    store('qaKnown', [...known]); c.closest('.fc').classList.toggle('known', c.checked);
    $('#qaCount').textContent = `${known.size} of ${QA.length} marked as known`;
  });
  render();
}
// Coding tasks. The solution is hidden until the card is opened.
function mountCoding() {
  const box = $('#codelist'); if (!box) return;
  box.innerHTML = CODING.map(c => `<details class="fc"><summary><span>${esc(c.t)}</span></summary><div class="ans"><p>${esc(c.d)}</p>${buildFig(c.c, 'java', 'Solution')}</div></details>`).join('');
  wireCopy(box);
}
// Error doctor: message, cause and fix.
function mountErrors() {
  const box = $('#errlist'); if (!box) return;
  box.innerHTML = ERRS.map(e => `<details class="fc"><summary><span style="font:500 13.5px var(--mono);overflow-wrap:anywhere">${e.m}</span></summary><div class="ans"><p><b>Why:</b> ${e.why}</p><p><b>Fix:</b> ${e.fix}</p></div></details>`).join('');
}
// Cheat sheet cards from data/cheat.js.
function mountCheat() {
  const box = $('#cheatgrid'); if (!box) return;
  box.innerHTML = CHEAT.map(c => `<div class="card"><h4>${esc(c.t)}</h4>${buildFig(c.c, 'java', '')}</div>`).join('');
  wireCopy(box);
}
