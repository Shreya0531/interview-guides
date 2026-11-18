/* Demo: authlab. */
// Demo - Try different logins on DELETE and see 204, 401 or 403.
LABS.authlab = function (el) {
  const OPT = [
    { k: 'none', n: 'No login', j: 'given()\n.when().delete("/books/2")', h: {} },
    { k: 'badbasic', n: 'Basic, wrong password', j: 'given().auth().preemptive().basic("admin", "wrong")\n.when().delete("/books/2")', h: { Authorization: 'Basic ' + btoa('admin:wrong') } },
    { k: 'basic', n: 'Basic, correct', j: 'given().auth().preemptive().basic("admin", "secret123")\n.when().delete("/books/2")', h: { Authorization: BASIC_OK } },
    { k: 'fake', n: 'Bearer, made-up token', j: 'given().auth().oauth2("abc-not-real")\n.when().delete("/books/2")', h: { Authorization: 'Bearer abc-not-real' } },
    { k: 'reader', n: 'Bearer, read-only user', j: 'given().auth().oauth2("tok_reader")\n.when().delete("/books/2")', h: { Authorization: 'Bearer tok_reader' } },
    { k: 'admin', n: 'Bearer, admin token', j: 'given().auth().oauth2("tok_8f3a")\n.when().delete("/books/2")', h: { Authorization: 'Bearer tok_8f3a' } }
  ];
  const b = labShell(el, 'Auth lab: who can delete a book?', `<p>Choose how the test proves who it is, then press Send. The request is <code>DELETE /books/2</code>.</p>
    <div class="chips" id="ao">${OPT.map((o, i) => `<button type="button" class="chip ${i === 0 ? 'on' : ''}" data-i="${i}">${o.n}</button>`).join('')}</div>
    <div id="ac"></div><div class="chips"><button type="button" class="btn" id="as">▶ Send DELETE /books/2</button></div><div id="ar"></div>`);
  let cur = 0;
  const show = () => { $('#ac', b).innerHTML = buildFig(OPT[cur].j + '\n.then()\n    .statusCode(204);', 'java', 'Java'); wireCopy($('#ac', b)); $('#ar', b).innerHTML = ''; $$('#ao .chip', b).forEach((c, i) => c.classList.toggle('on', i === cur)); };
  $('#ao', b).addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) { cur = +c.dataset.i; show(); } });
  $('#as', b).addEventListener('click', async () => {
    const m = createMock(); const res = await m.send({ method: 'DELETE', path: '/books/2', headers: OPT[cur].h });
    const why = { 204: 'Allowed. The book was deleted.', 401: '<b>401</b>: the server does not know who you are.', 403: '<b>403</b>: the server knows who you are, but you may not delete.' }[res.status];
    $('#ar', b).innerHTML = `<div class="out"><div class="verdict"><span class="stat s${String(res.status)[0]}">${res.status}</span><span>${why}</span></div>${res.body ? '<pre>' + esc(JSON.stringify(res.body)) + '</pre>' : ''}</div>`;
  });
  show();
};
