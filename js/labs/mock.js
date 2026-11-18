/* Demo: mock. */
// Demo - Mock interview: 20 random questions from every quiz.
LABS.mock = function (el) {
  const bank = []; Object.keys(QUIZ).forEach(k => QUIZ[k].forEach(q => bank.push({ ...q, s: k })));
  const NAME = Object.fromEntries($$('section.sec').map(s => [s.id, s.dataset.title]));
  const b = labShell(el, 'Mock interview: 20 random questions', `<div id="mk"></div>`);
  const root = $('#mk', b);
  const start = () => {
    const qs = shuffle(bank).slice(0, 20).map(q => {
      const idx = shuffle(q.o.map((_, i) => i)); return { ...q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a) };
    });
    let i = 0; const got = [];
    const ask = () => {
      const q = qs[i];
      root.innerHTML = `<div class="bar" style="display:block;background:var(--line);margin-bottom:14px"><i style="width:${i / qs.length * 100}%"></i></div><p class="mini">Question ${i + 1} of ${qs.length}</p><p class="qt" style="font-weight:600;font-size:17px">${esc(q.q)}</p>
        <div class="opts">${q.o.map((o, oi) => `<button type="button" class="opt" data-o="${oi}"><b>${LETTERS[oi]}</b><span>${esc(o)}</span></button>`).join('')}</div><div id="mx"></div>`;
    };
    root.onclick = e => {
      const o = e.target.closest('.opt'); const nx = e.target.closest('#mnext');
      if (o && !o.disabled) {
        const q = qs[i], pick = +o.dataset.o; got[i] = pick;
        $$('.opt', root).forEach((x, xi) => { x.disabled = true; x.classList.toggle('right', xi === q.a); x.classList.toggle('wrong', xi === pick && pick !== q.a); });
        $('#mx', root).innerHTML = `<div class="exp"><b class="${pick === q.a ? 'r' : 'w'}">${pick === q.a ? 'Correct.' : 'Not quite.'}</b> ${esc(q.e)}</div><div class="chips"><button type="button" class="btn" id="mnext">${i + 1 === qs.length ? 'See my score' : 'Next question →'}</button></div>`;
      } else if (nx) { i++; i < qs.length ? ask() : finish(); }
    };
    const finish = () => {
      const score = qs.filter((q, k) => got[k] === q.a).length, pct = Math.round(score / qs.length * 100);
      const best = Math.max(pct, store('mockBest') || 0); store('mockBest', best);
      const wrong = qs.map((q, k) => ({ q, k })).filter(x => got[x.k] !== x.q.a);
      const weak = {}; wrong.forEach(x => weak[x.q.s] = (weak[x.q.s] || 0) + 1);
      if (pct >= 80) window.markDone && window.markDone('mock');
      root.onclick = e => { if (e.target.closest('#mretry')) start(); };
      root.innerHTML = `<div class="mockbox"><div class="bigscore">${pct}%</div><p><b>${score} of ${qs.length}</b> correct. ${pct >= 80 ? 'You are interview-ready. 🎉' : pct >= 60 ? 'Close. Review the topics below and try again.' : 'Keep going. Read the sections below, then try again.'}</p><p class="mini">Best score so far: ${best}%</p>
        ${Object.keys(weak).length ? '<p class="mini">Read these sections again:</p><div class="chips" style="justify-content:center">' + Object.keys(weak).map(k => `<a class="chip" href="#${k}" data-go="${k}">${esc(NAME[k] || k)} (${weak[k]})</a>`).join('') + '</div>' : ''}
        <button type="button" class="btn" id="mretry">Take another mock</button></div>
        ${wrong.length ? '<div class="review"><h4 style="margin:10px 0">What you missed</h4>' + wrong.map(x => `<div class="exp" style="margin-top:8px"><b>${esc(x.q.q)}</b><br>Correct answer: <b class="r">${esc(x.q.o[x.q.a])}</b>. ${esc(x.q.e)}</div>`).join('') + '</div>' : ''}`;
    };
    ask();
  };
  const best = store('mockBest');
  root.innerHTML = `<div class="mockbox"><p style="font-size:17px">You will get 20 random questions from every section. Aim for <b>80% or more</b>, then try again with a fresh set.</p>${best ? `<p class="mini">Your best score: ${best}%</p>` : ''}<button type="button" class="btn" id="mstart">Start the mock interview</button></div>`;
  root.onclick = e => { if (e.target.closest('#mstart')) start(); };
};
