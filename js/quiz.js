/* Practice questions at the end of each section. */
/* ---------- quizzes ---------- */
// Labels for answer buttons.
const LETTERS = 'ABCD';
// Draw each .practice box from QUIZ (data/quiz.js). Answers are saved so progress stays after a reload.
function mountQuizzes() {
  $$('.practice[data-quiz]').forEach(el => {
    const id = el.dataset.quiz, qs = QUIZ[id]; if (!qs) return;
    let ans = store('quiz:' + id);
    if (!Array.isArray(ans) || ans.length !== qs.length) ans = qs.map(() => null);
    const render = () => {
      const got = ans.filter((a, i) => a === qs[i].a).length, answered = ans.filter(a => a !== null).length;
      let msg = `${got} / ${qs.length} correct`;
      if (answered === qs.length) msg += got === qs.length ? ' · Perfect!' : got >= qs.length * 0.7 ? ' · Good job' : ' · Read the section again, then retry';
      el.innerHTML = `<div class="practice-h"><span>Practice questions</span><span class="score">${msg} ${answered ? '<button type="button" class="btn ghost sm" data-reset>Try again</button>' : ''}</span></div>` +
        qs.map((q, qi) => {
          const a = ans[qi];
          return `<div class="q"><p class="qt">${qi + 1}. ${esc(q.q)}</p><div class="opts">${q.o.map((o, oi) =>
            `<button type="button" class="opt ${a !== null ? (oi === q.a ? 'right' : oi === a ? 'wrong' : '') : ''}" data-q="${qi}" data-o="${oi}" ${a !== null ? 'disabled' : ''}><b>${LETTERS[oi]}</b><span>${esc(o)}</span></button>`).join('')}</div>` +
            (a !== null ? `<div class="exp"><b class="${a === q.a ? 'r' : 'w'}">${a === q.a ? 'Correct.' : 'Not quite.'}</b> ${esc(q.e)}</div>` : '') + '</div>';
        }).join('');
    };
    el.addEventListener('click', e => {
      const o = e.target.closest('.opt');
      if (o) { ans[+o.dataset.q] = +o.dataset.o; store('quiz:' + id, ans); render(); return; }
      if (e.target.closest('[data-reset]')) { ans = qs.map(() => null); store('quiz:' + id, ans); render(); }
    });
    render();
  });
}
