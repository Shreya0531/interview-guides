/* Demo: matcher. */
// Demo - Try Hamcrest matchers on a sample response.
LABS.matcher = function (el) {
  const M = [
    { n: 'equalTo', a: 1, ph: 'value', f: (v, a) => deq(v, a[0]), j: a => `equalTo(${litJava(a[0])})` },
    { n: 'not(equalTo)', a: 1, ph: 'value', f: (v, a) => !deq(v, a[0]), j: a => `not(equalTo(${litJava(a[0])}))` },
    { n: 'containsString', a: 1, ph: 'text', f: (v, a) => String(v).includes(String(a[0])), j: a => `containsString(${litJava(String(a[0]))})` },
    { n: 'startsWith', a: 1, ph: 'text', f: (v, a) => String(v).startsWith(String(a[0])), j: a => `startsWith(${litJava(String(a[0]))})` },
    { n: 'endsWith', a: 1, ph: 'text', f: (v, a) => String(v).endsWith(String(a[0])), j: a => `endsWith(${litJava(String(a[0]))})` },
    { n: 'greaterThan', a: 1, ph: 'number', f: (v, a) => v > a[0], j: a => `greaterThan(${litJava(Number(a[0]))})` },
    { n: 'lessThan', a: 1, ph: 'number', f: (v, a) => v < a[0], j: a => `lessThan(${litJava(Number(a[0]))})` },
    { n: 'hasSize', a: 1, ph: 'number', f: (v, a) => Array.isArray(v) && v.length === a[0], j: a => `hasSize(${a[0]})` },
    { n: 'hasItem', a: 1, ph: 'value', f: (v, a) => Array.isArray(v) && v.some(x => deq(x, a[0])), j: a => `hasItem(${litJava(a[0])})` },
    { n: 'hasItems', a: 2, ph: 'a, b, c', f: (v, a) => Array.isArray(v) && a.every(y => v.some(x => deq(x, y))), j: a => `hasItems(${a.map(litJava).join(', ')})` },
    { n: 'contains', a: 2, ph: 'a, b, c', f: (v, a) => Array.isArray(v) && v.length === a.length && v.every((x, i) => deq(x, a[i])), j: a => `contains(${a.map(litJava).join(', ')})` },
    { n: 'containsInAnyOrder', a: 2, ph: 'a, b, c', f: (v, a) => Array.isArray(v) && v.length === a.length && a.every(y => v.some(x => deq(x, y))), j: a => `containsInAnyOrder(${a.map(litJava).join(', ')})` },
    { n: 'everyItem(greaterThan)', a: 1, ph: 'number', f: (v, a) => Array.isArray(v) && v.every(x => x > a[0]), j: a => `everyItem(greaterThan(${litJava(Number(a[0]))}))` },
    { n: 'notNullValue', a: 0, f: v => v !== null && v !== undefined, j: () => 'notNullValue()' },
    { n: 'nullValue', a: 0, f: v => v === null || v === undefined, j: () => 'nullValue()' },
    { n: 'empty', a: 0, f: v => Array.isArray(v) ? v.length === 0 : v === '' , j: () => 'empty()' }
  ];
  const b = labShell(el, 'Matcher playground', `<p>Pick a path, a matcher and a value. See if the check would pass on this response.</p>
    ${buildFig(JSON.stringify(SAMPLE, null, 2), 'json', 'sample response')}
    <div class="chips">${['books.title', 'books[0].price', 'books.size()', 'books.price', 'owner.city', 'books.year'].map(x => `<button type="button" class="chip mono" data-p="${x}">${x}</button>`).join('')}</div>
    <div class="row"><div><label for="mp">Path</label><input id="mp" value="books.title"></div>
    <div><label for="mm">Matcher</label><select id="mm">${M.map((m, i) => `<option value="${i}">${m.n}</option>`).join('')}</select></div>
    <div><label for="ma">Value(s)</label><input id="ma" value="Effective Java"></div></div><div id="mout"></div>`);
  wireCopy(b);
  const run = () => {
    const m = M[+$('#mm', b).value]; $('#ma', b).disabled = !m.a; $('#ma', b).placeholder = m.ph || 'no value needed';
    const raw = $('#ma', b).value, args = raw.split(',').map(s => parseLit(s.trim()));
    if (m.a === 1) { args.length = 0; args.push(parseLit(raw.trim())); }
    let actual, err = '';
    try { actual = gpath(SAMPLE, $('#mp', b).value); } catch (e) { err = e.message; }
    if (err) { $('#mout', b).innerHTML = `<div class="out"><span class="bad">Path problem:</span> ${esc(err)}</div>`; return; }
    let ok; try { ok = !!m.f(actual, args); } catch (e) { ok = false; }
    const hint = [];
    if (Array.isArray(actual) && ['equalTo', 'containsString', 'startsWith', 'endsWith'].includes(m.n)) hint.push('This path gives a <b>list</b>. Use hasItem, hasItems or contains.');
    if (typeof actual === 'number' && !Number.isInteger(actual) && m.n === 'equalTo') hint.push('Decimals are floats in REST Assured, so Java needs the <b>f</b>.');
    $('#mout', b).innerHTML = `<div class="out"><div class="verdict"><span class="${ok ? 'ok' : 'bad'}">${ok ? 'PASS ✓' : 'FAIL ✗'}</span></div><p class="mini">Value found at the path</p><pre>${esc(JSON.stringify(actual))}</pre>${buildFig('.body("' + $('#mp', b).value + '", ' + m.j(args) + ')', 'java', 'Java')}${hint.map(h => `<p class="mini">💡 ${h}</p>`).join('')}</div>`;
    wireCopy($('#mout', b));
  };
  ['mp', 'mm', 'ma'].forEach(id => $('#' + id, b).addEventListener('input', run));
  $$('[data-p]', b).forEach(c => c.addEventListener('click', () => { $('#mp', b).value = c.dataset.p; run(); }));
  run();
};
