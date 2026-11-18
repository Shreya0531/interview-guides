/* Demo: gpath. */
// Demo - Type a GPath and see the result.
LABS.gpath = function (el) {
  const b = labShell(el, 'GPath explorer', `<p>Type a path and see the result at once. Tap an idea to start.</p>
    ${buildFig(JSON.stringify(SAMPLE, null, 2), 'json', 'sample response')}
    <div class="chips">${['owner.city', 'books[0].title', 'books[-1].title', 'books.title', 'books.size()', "books.findAll { it.price > 30 }.title", "books.find { it.id == 2 }.author", "books.findAll { it.inStock == true }.size()", 'books.price.sum()', 'books.price.max()', "books.findAll { it.title.startsWith('Java') }.year"].map(x => `<button type="button" class="chip mono" data-p="${esc(x)}">${esc(x)}</button>`).join('')}</div>
    <label for="gp">Path</label><input id="gp" value="books.findAll { it.price > 30 }.title"><div id="gout"></div>`);
  wireCopy(b);
  const run = () => {
    const p = $('#gp', b).value; let r, err = '';
    try { r = gpath(SAMPLE, p); } catch (e) { err = e.message; }
    $('#gout', b).innerHTML = err ? `<div class="out"><span class="bad">Cannot read this path.</span> ${esc(err)}</div>` :
      `<div class="out"><div class="verdict"><span>Result</span><span class="pill">${esc(typeName(r))}</span></div><pre>${esc(JSON.stringify(r, null, 2))}</pre></div>`;
  };
  $('#gp', b).addEventListener('input', run);
  $$('[data-p]', b).forEach(c => c.addEventListener('click', () => { $('#gp', b).value = c.dataset.p; run(); }));
  run();
};
