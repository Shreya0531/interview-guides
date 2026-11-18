/* Demo: puzzle. */
// Demo - Put the given/when/then lines in order.
LABS.puzzle = function (el) {
  const lines = [
    { t: 'given()', g: 0 }, { t: '    .baseUri("https://demo-library.test")', g: 1 }, { t: '    .queryParam("author", "Joshua Bloch")', g: 1 },
    { t: '.when()', g: 2 }, { t: '    .get("/books")', g: 3 }, { t: '.then()', g: 4 }, { t: '    .statusCode(200)', g: 5 }, { t: '    .body("total", equalTo(1));', g: 6 }
  ];
  const seq = lines.map(l => l.g).sort((a, b) => a - b);
  const b = labShell(el, 'Build the test in the right order', `<p>Click the lines in the order they belong. Wrong clicks shake.</p>
    <div class="puz"><div><label>Lines</label><div class="pile" id="pile"></div></div><div><label>Your test</label><div class="built" id="built"></div></div></div>
    <div class="out" id="pzMsg">Start with the line that sets the scene.</div><div class="chips"><button class="btn ghost sm" type="button" id="pzReset">Shuffle again</button><button class="btn ghost sm" type="button" id="pzShow">Show answer</button></div>`);
  let order, placed;
  const draw = () => {
    $('#pile', b).innerHTML = order.filter(l => !placed.includes(l)).map(l => `<button type="button" class="pl" data-k="${lines.indexOf(l)}">${esc(l.t)}</button>`).join('');
    $('#built', b).innerHTML = placed.map(l => `<div class="bl">${hl(l.t, 'java')}</div>`).join('') || '<div class="bl" style="color:#6f87ab">(empty)</div>';
  };
  const reset = () => { order = shuffle(lines); placed = []; $('#pzMsg', b).textContent = 'Start with the line that sets the scene.'; draw(); };
  $('#pile', b).addEventListener('click', e => {
    const x = e.target.closest('.pl'); if (!x) return;
    const l = lines[+x.dataset.k];
    if (l.g === seq[placed.length]) {
      placed.push(l); draw();
      $('#pzMsg', b).innerHTML = placed.length === lines.length ? '🎉 <b>Perfect.</b> given sets up, when acts, then checks.' : 'Good. What comes next?';
    } else { x.classList.add('shake'); $('#pzMsg', b).textContent = 'Not yet. Think: set up, then action, then checks.'; setTimeout(() => x.classList.remove('shake'), 350); }
  });
  $('#pzReset', b).addEventListener('click', reset);
  $('#pzShow', b).addEventListener('click', () => { placed = lines.slice(); draw(); $('#pzMsg', b).textContent = 'This is the order. given → when → then.'; });
  reset();
};
