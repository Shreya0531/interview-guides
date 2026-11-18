/* A small GPath (JSON path) engine used by the demos. */
// Split a path at dots, but not inside { } ( ) [ ] or quotes.
function splitTop(path) {
  const out = []; let depth = 0, q = null, cur = '';
  for (const ch of path) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === "'" || ch === '"') { q = ch; cur += ch; continue; }
    if ('{(['.includes(ch)) depth++;
    if ('})]'.includes(ch)) depth--;
    if (ch === '.' && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur); return out.map(s => s.trim()).filter(s => s.length);
}
// Turn text like 30, true or 'abc' into a real value.
function parseLit(s) {
  s = s.trim();
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if (s === 'true') return true; if (s === 'false') return false; if (s === 'null') return null;
  const m = s.match(/^(['"])(.*)\1$/); if (m) return m[2];
  return s;
}
// Read a dotted field such as address.city.
function getField(o, p) {
  return p.split('.').reduce((a, k) => (a === null || a === undefined) ? undefined : a[k], o);
}
// One condition inside { }, for example it.price > 30.
function cond1(it, c) {
  c = c.trim(); let m;
  if ((m = c.match(/^it\.([\w.]+)\.(startsWith|endsWith|contains)\(\s*(['"])(.*)\3\s*\)$/))) {
    const v = String(getField(it, m[1])); return m[2] === 'startsWith' ? v.startsWith(m[4]) : m[2] === 'endsWith' ? v.endsWith(m[4]) : v.includes(m[4]);
  }
  if ((m = c.match(/^it\.([\w.]+)\s*(==|!=|>=|<=|>|<)\s*(.+)$/))) return cmp(getField(it, m[1]), m[2], parseLit(m[3]));
  if ((m = c.match(/^it\s*(==|!=|>=|<=|>|<)\s*(.+)$/))) return cmp(it, m[1], parseLit(m[2]));
  throw new Error('I cannot read this condition: ' + c);
}
// Compare two values with ==, !=, >, <, >=, <=.
function cmp(a, op, b) {
  switch (op) { case '==': return a === b; case '!=': return a !== b; case '>': return a > b; case '<': return a < b; case '>=': return a >= b; case '<=': return a <= b; }
}
// Allow && and || between conditions.
function cond(it, c) {
  if (c.includes('&&')) return c.split('&&').every(x => cond1(it, x));
  if (c.includes('||')) return c.split('||').some(x => cond1(it, x));
  return cond1(it, c);
}
// Run a path on JSON: fields, [index], size(), sum(), max(), min(), find, findAll, collect.
function gpath(root, path) {
  path = path.trim(); if (path === '' || path === '$') return root;
  let cur = root;
  for (const seg of splitTop(path)) {
    let m;
    if ((m = seg.match(/^(findAll|find|collect|every|any|count)\s*\{([\s\S]*)\}$/))) {
      const kind = m[1], body = m[2].trim();
      if (!Array.isArray(cur)) throw new Error(kind + ' needs a list, but found ' + typeName(cur));
      if (kind === 'findAll') cur = cur.filter(x => cond(x, body));
      else if (kind === 'find') cur = cur.find(x => cond(x, body));
      else if (kind === 'every') cur = cur.every(x => cond(x, body));
      else if (kind === 'any') cur = cur.some(x => cond(x, body));
      else if (kind === 'count') cur = cur.filter(x => cond(x, body)).length;
      else { const f = body.match(/^it\.([\w.]+)$/); if (!f) throw new Error('collect supports only: it.field'); cur = cur.map(x => getField(x, f[1])); }
      continue;
    }
    if (seg === 'size()') { cur = Array.isArray(cur) || typeof cur === 'string' ? cur.length : cur && typeof cur === 'object' ? Object.keys(cur).length : 0; continue; }
    if (seg === 'isEmpty()') { cur = !cur || cur.length === 0; continue; }
    if (['sum()', 'max()', 'min()'].includes(seg)) {
      if (!Array.isArray(cur)) throw new Error(seg + ' needs a list of numbers');
      const f = seg.slice(0, -2);
      cur = f === 'sum' ? Math.round(cur.reduce((a, b) => a + b, 0) * 1e6) / 1e6 : Math[f](...cur); continue;
    }
    if ((m = seg.match(/^([^\[\]]*)((?:\[-?\d+\])*)$/))) {
      let name = m[1].replace(/^(['"])(.*)\1$/, '$2');
      if (name) {
        if (Array.isArray(cur)) cur = cur.map(x => x == null ? null : x[name]);
        else if (cur && typeof cur === 'object') cur = name in cur ? cur[name] : null;
        else cur = null;
      }
      (m[2].match(/-?\d+/g) || []).forEach(ix => {
        if (!Array.isArray(cur)) throw new Error('[' + ix + '] needs a list, but found ' + typeName(cur));
        ix = Number(ix); cur = cur[ix < 0 ? cur.length + ix : ix]; if (cur === undefined) cur = null;
      });
      continue;
    }
    throw new Error('I cannot read: ' + seg);
  }
  return cur;
}
// Say what kind of value this is, in plain words.
function typeName(v) { return v === null || v === undefined ? 'null' : Array.isArray(v) ? `list (${v.length} items)` : typeof v === 'object' ? 'object' : typeof v === 'number' ? (Number.isInteger(v) ? 'whole number' : 'decimal number') : typeof v === 'boolean' ? 'true/false' : 'text'; }
// Write a value as Java code. Decimals get an f, text gets quotes.
function litJava(v) {
  if (v === null) return 'null';
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v + 'f';
  if (typeof v === 'boolean') return String(v);
  return JSON.stringify(String(v));
}
// Deep equal: same JSON means equal.
const deq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
