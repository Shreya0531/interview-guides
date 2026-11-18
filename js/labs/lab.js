/* Demo: lab. */
// Demo - Request Lab: build a request, run it on the pretend API, see the matching Java.
LABS.lab = function (el) {
  const PRE = {
    'Get all books': { m: 'GET', p: '/books', q: '', h: '', b: '', st: '200', bp: 'total', bv: '3' },
    'Get one book': { m: 'GET', p: '/books/2', q: '', h: '', b: '', st: '200', bp: 'author', bv: 'Joshua Bloch' },
    'Filter by author': { m: 'GET', p: '/books', q: 'author=Joshua Bloch', h: '', b: '', st: '200', bp: 'books.title', bv: '' },
    'Book not found': { m: 'GET', p: '/books/99', q: '', h: '', b: '', st: '404', bp: 'error', bv: 'Book not found' },
    'Create without token': { m: 'POST', p: '/books', q: '', h: 'Content-Type: application/json', b: '{"title":"Refactoring","author":"Martin Fowler","year":2018}', st: '201', bp: '', bv: '' },
    'Create with token': { m: 'POST', p: '/books', q: '', h: 'Content-Type: application/json\nAuthorization: Bearer tok_8f3a', b: '{"title":"Refactoring","author":"Martin Fowler","year":2018}', st: '201', bp: 'title', bv: 'Refactoring' },
    'Create without Content-Type': { m: 'POST', p: '/books', q: '', h: 'Authorization: Bearer tok_8f3a', b: '{"title":"Refactoring","author":"Martin Fowler"}', st: '201', bp: '', bv: '' },
    'Delete a book': { m: 'DELETE', p: '/books/1', q: '', h: 'Authorization: Bearer tok_8f3a', b: '', st: '204', bp: '', bv: '' }
  };
  const b = labShell(el, 'Request Lab: build a request, run the test', `
    <p>This is a <b>pretend library API</b> that runs inside this page. Pick an example, change anything, and press Run. Public: GET. Needs a token: POST, PUT, PATCH, DELETE.</p>
    <div class="chips" id="presets">${Object.keys(PRE).map(k => `<button type="button" class="chip" data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>
    <div class="row r2"><div><label for="lm">Method</label><select id="lm"><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select></div>
      <div><label for="lp">Path</label><input id="lp" value="/books"></div></div>
    <div class="row"><div><label for="lq">Query params (one per line: key=value)</label><textarea id="lq" rows="3"></textarea></div>
      <div><label for="lh">Headers (one per line: Name: value)</label><textarea id="lh" rows="3"></textarea></div></div>
    <div class="row"><div><label for="lb">Body</label><textarea id="lb" rows="3"></textarea></div>
      <div><label for="ls">Expect status code</label><input id="ls" value="200" inputmode="numeric">
      <label for="lbp" style="margin-top:8px">Also check body path / value</label><div class="row r2" style="margin:0"><input id="lbp" placeholder="path e.g. total"><input id="lbv" placeholder="value e.g. 3"></div></div></div>
    <div class="chips"><button type="button" class="btn" id="lrun">▶ Run test</button><button type="button" class="btn ghost" id="lreset">Reset pretend data</button></div>
    <div id="lcode"></div><div id="lout"></div>`);
  const mock = createMock();
  const g = id => $('#' + id, b);
  const parse = () => {
    const headers = {}; g('lh').value.split('\n').forEach(l => { const i = l.indexOf(':'); if (i > 0) headers[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
    const query = {}; const qpairs = []; g('lq').value.split('\n').forEach(l => { const i = l.indexOf('='); if (i > 0) { query[l.slice(0, i).trim()] = l.slice(i + 1).trim(); qpairs.push([l.slice(0, i).trim(), l.slice(i + 1).trim()]); } });
    return { method: g('lm').value, path: g('lp').value.trim() || '/', headers, query, qpairs, body: g('lb').value };
  };
  const pv = s => { s = s.trim(); if (s === '') return ''; try { return JSON.parse(s); } catch (e) { return s; } };
  const genJava = () => {
    const r = parse(), L = ['given()', '    .baseUri("https://demo-library.test")'];
    Object.entries(r.headers).forEach(([k, v]) => L.push(k.toLowerCase() === 'content-type' && v.includes('json') ? '    .contentType(ContentType.JSON)' : `    .header("${k}", "${v}")`));
    r.qpairs.forEach(([k, v]) => L.push(`    .queryParam("${k}", ${/^\d+$/.test(v) ? v : JSON.stringify(v)})`));
    if (r.body.trim()) L.push('    .body(' + JSON.stringify(r.body.trim().replace(/\s*\n\s*/g, ' ')) + ')');
    L.push('.when()', `    .${r.method.toLowerCase()}("${r.path}")`, '.then()');
    const st = g('ls').value.trim(), bp = g('lbp').value.trim(), bv = g('lbv').value.trim();
    L.push('    .statusCode(' + (st || '200') + ')' + (bp ? '' : ';'));
    if (bp) L.push('    .body("' + bp + '", ' + (bv === '' ? 'notNullValue()' : 'equalTo(' + litJava(pv(bv)) + ')') + ');');
    g('lcode').innerHTML = buildFig(L.join('\n'), 'java', 'Same test in REST Assured'); wireCopy(g('lcode'));
  };
  const load = k => {
    const p = PRE[k]; g('lm').value = p.m; g('lp').value = p.p; g('lq').value = p.q; g('lh').value = p.h; g('lb').value = p.b; g('ls').value = p.st; g('lbp').value = p.bp; g('lbv').value = p.bv;
    $$('#presets .chip', b).forEach(c => c.classList.toggle('on', c.dataset.k === k)); genJava(); g('lout').innerHTML = '';
  };
  $('#presets', b).addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) load(c.dataset.k); });
  ['lm', 'lp', 'lq', 'lh', 'lb', 'ls', 'lbp', 'lbv'].forEach(id => g(id).addEventListener('input', genJava));
  g('lreset').addEventListener('click', () => { mock.reset(); g('lout').innerHTML = '<div class="out">Pretend data is back to the start.</div>'; });
  g('lrun').addEventListener('click', async () => {
    const r = parse(); g('lrun').disabled = true; g('lout').innerHTML = '<div class="out">Sending…</div>';
    const res = await mock.send(r); g('lrun').disabled = false;
    const exp = Number(g('ls').value.trim() || 200), bp = g('lbp').value.trim(), bv = g('lbv').value.trim();
    const rows = [`<div class="res"><i class="${res.status === exp ? 'ok' : 'bad'}">${res.status === exp ? '✓' : '✗'}</i><span>Status code is <code>${exp}</code>. Got <code>${res.status}</code>.</span></div>`];
    if (bp) {
      let actual, err = '';
      try { actual = gpath(res.body, bp); } catch (e) { err = e.message; }
      const ok = !err && (bv === '' ? actual !== null && actual !== undefined : deq(actual, pv(bv)));
      rows.push(`<div class="res"><i class="${ok ? 'ok' : 'bad'}">${ok ? '✓' : '✗'}</i><span><code>${esc(bp)}</code> should be <code>${esc(bv === '' ? 'not null' : bv)}</code>. Got <code>${esc(err || JSON.stringify(actual))}</code>.</span></div>`);
    }
    const pass = rows.every(x => x.includes('class="ok"'));
    g('lout').innerHTML = `<div class="out"><div class="verdict"><span class="stat s${String(res.status)[0]}">${res.status}</span><span>${pass ? '<span class="ok">TEST PASSED ✓</span>' : '<span class="bad">TEST FAILED ✗</span>'}</span><span class="mini">${res.ms} ms</span></div>${rows.join('')}
      <p class="mini" style="margin-top:10px">Response headers</p><pre>${esc(Object.entries(res.headers).map(([k, v]) => k + ': ' + v).join('\n') || '(none)')}</pre>
      <p class="mini" style="margin-top:10px">Response body</p><pre>${res.body === null ? '(empty body)' : esc(JSON.stringify(res.body, null, 2))}</pre></div>`;
  });
  load('Get one book');
};
