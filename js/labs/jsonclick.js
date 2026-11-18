/* Demo: jsonclick. */
// Demo - Click a JSON value to get its path.
LABS.jsonclick = function (el) {
  const data = { shop: 'Book Corner', open: true, owner: { name: 'Meera', city: 'Pune' }, books: [{ id: 1, title: 'Clean Code', price: 32.5 }, { id: 2, title: 'Effective Java', price: 45 }], discount: null };
  const b = labShell(el, 'Click a value, get its path', `<p>Click any <b>value</b> (or a key that holds an object or list).</p><div class="jt" id="jt"></div><div class="out" id="jOut">Click something in the JSON above.</div>`);
  const pad = n => '  '.repeat(n);
  const leaf = (v, path) => {
    const cls = typeof v === 'number' ? 'num' : typeof v === 'boolean' || v === null ? 'bool' : '';
    return `<button type="button" class="jv ${cls}" data-path="${esc(path)}" data-val='${esc(JSON.stringify(v))}'>${esc(JSON.stringify(v))}</button>`;
  };
  const r = (v, path, d) => {
    if (Array.isArray(v)) return '[\n' + v.map((x, i) => pad(d + 1) + (x && typeof x === 'object' ? r(x, path + '[' + i + ']', d + 1) : leaf(x, path + '[' + i + ']'))).join(',\n') + '\n' + pad(d) + ']';
    if (v && typeof v === 'object') return '{\n' + Object.keys(v).map(k => {
      const p = path ? path + '.' + k : k, x = v[k];
      const key = x && typeof x === 'object' ? `<button type="button" class="jv jk" data-path="${esc(p)}" data-kind="${Array.isArray(x) ? 'list' : 'object'}" data-n="${Array.isArray(x) ? x.length : Object.keys(x).length}">"${esc(k)}"</button>` : `<span class="jk">"${esc(k)}"</span>`;
      return pad(d + 1) + key + ': ' + (x && typeof x === 'object' ? r(x, p, d + 1) : leaf(x, p));
    }).join(',\n') + '\n' + pad(d) + '}';
    return leaf(v, path);
  };
  $('#jt', b).innerHTML = r(data, '', 0);
  $('#jt', b).addEventListener('click', e => {
    const x = e.target.closest('.jv'); if (!x) return;
    $$('.jv.on', b).forEach(y => y.classList.remove('on')); x.classList.add('on');
    const p = x.dataset.path;
    if (x.dataset.kind) {
      $('#jOut', b).innerHTML = `<p>Path: <code>${esc(p)}</code>. This is ${x.dataset.kind === 'list' ? 'a <b>list</b> with ' + x.dataset.n + ' items. Count it with <code>' + esc(p) + '.size()</code> or <code>hasSize(' + x.dataset.n + ')</code>' : 'an <b>object</b>. Go deeper with a dot, like <code>' + esc(p) + '.name</code>'}.</p>`;
      return;
    }
    const v = JSON.parse(x.dataset.val);
    const m = v === null ? 'nullValue()' : 'equalTo(' + litJava(v) + ')';
    $('#jOut', b).innerHTML = `<p>Path: <code>${esc(p)}</code></p>${buildFig('.body("' + p + '", ' + m + ')', 'java', 'in your test')}${typeof v === 'number' && !Number.isInteger(v) ? '<p class="mini">Decimals need the <b>f</b> at the end.</p>' : ''}`;
    wireCopy($('#jOut', b));
  });
};
