/* Demo: schema. */
// Demo - Small JSON schema validator.
LABS.schema = function (el) {
  const S0 = { type: 'object', required: ['id', 'title', 'price'], properties: { id: { type: 'integer' }, title: { type: 'string' }, price: { type: 'number', minimum: 0 }, inStock: { type: 'boolean' } } };
  const R0 = { id: 2, title: 'Effective Java', price: 45, inStock: true };
  const b = labShell(el, 'Schema validator', `<p>Supported words: <code>type</code>, <code>required</code>, <code>properties</code>, <code>items</code>, <code>minimum</code>, <code>maximum</code>, <code>enum</code>, <code>additionalProperties</code>.</p>
    <div class="row"><div><label for="sc">Schema</label><textarea id="sc" rows="12">${esc(JSON.stringify(S0, null, 2))}</textarea></div>
    <div><label for="sr">Response from the API</label><textarea id="sr" rows="12">${esc(JSON.stringify(R0, null, 2))}</textarea></div></div>
    <div class="chips"><button type="button" class="btn" id="sv">Validate</button><button type="button" class="chip" id="s1">Remove title</button><button type="button" class="chip" id="s2">Price as text</button><button type="button" class="chip" id="s3">Add extra field + strict schema</button></div><div id="so"></div>`);
  const tp = d => d === null ? 'null' : Array.isArray(d) ? 'array' : typeof d === 'number' ? (Number.isInteger(d) ? 'integer' : 'number') : typeof d;
  const val = (s, d, p) => {
    const e = [], t = tp(d);
    if (s.type) {
      const ok = [].concat(s.type).some(x => x === t || (x === 'number' && t === 'integer'));
      if (!ok) return [`${p}: should be ${[].concat(s.type).join(' or ')}, but it is ${t}`];
    }
    if (s.enum && !s.enum.some(v => deq(v, d))) e.push(`${p}: must be one of ${JSON.stringify(s.enum)}`);
    if (typeof d === 'number') { if (s.minimum !== undefined && d < s.minimum) e.push(`${p}: ${d} is below the minimum ${s.minimum}`); if (s.maximum !== undefined && d > s.maximum) e.push(`${p}: ${d} is above the maximum ${s.maximum}`); }
    if (t === 'object') {
      (s.required || []).forEach(k => { if (!(k in d)) e.push(`${p}: the field "${k}" is missing`); });
      Object.keys(s.properties || {}).forEach(k => { if (k in d) e.push(...val(s.properties[k], d[k], p + '.' + k)); });
      if (s.additionalProperties === false) Object.keys(d).forEach(k => { if (!(s.properties || {})[k]) e.push(`${p}: the field "${k}" is not allowed`); });
    }
    if (t === 'array' && s.items) d.forEach((x, i) => e.push(...val(s.items, x, `${p}[${i}]`)));
    return e;
  };
  const run = () => {
    let s, d;
    try { s = JSON.parse($('#sc', b).value); } catch (e) { $('#so', b).innerHTML = '<div class="out"><span class="bad">The schema is not valid JSON.</span></div>'; return; }
    try { d = JSON.parse($('#sr', b).value); } catch (e) { $('#so', b).innerHTML = '<div class="out"><span class="bad">The response is not valid JSON.</span></div>'; return; }
    const errs = val(s, d, '$');
    $('#so', b).innerHTML = `<div class="out"><div class="verdict">${errs.length ? '<span class="bad">SCHEMA CHECK FAILED ✗</span>' : '<span class="ok">SCHEMA CHECK PASSED ✓</span>'}</div>${errs.map(x => `<div class="res"><i class="bad">✗</i><span>${esc(x)}</span></div>`).join('')}</div>`;
  };
  $('#sv', b).addEventListener('click', run);
  $('#s1', b).addEventListener('click', () => { $('#sr', b).value = JSON.stringify({ id: 2, price: 45, inStock: true }, null, 2); run(); });
  $('#s2', b).addEventListener('click', () => { $('#sr', b).value = JSON.stringify({ id: 2, title: 'Effective Java', price: '45', inStock: true }, null, 2); run(); });
  $('#s3', b).addEventListener('click', () => { $('#sc', b).value = JSON.stringify({ ...S0, additionalProperties: false }, null, 2); $('#sr', b).value = JSON.stringify({ ...R0, secretNote: 'oops' }, null, 2); run(); });
  run();
};
