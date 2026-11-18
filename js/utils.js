/* Small helpers: selectors, escaping, saved progress, shuffle. */
// Shortcuts: $ finds one element, $$ finds all of them.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
// Make text safe to put inside HTML.
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Saved progress. Uses localStorage, or memory if the browser blocks it.
const mem = {};
// store(key) reads, store(key, value) saves.
function store(k, v) {
  try {
    if (v === undefined) { const r = localStorage.getItem('rag:' + k); return r === null ? mem[k] ?? null : JSON.parse(r); }
    mem[k] = v; localStorage.setItem('rag:' + k, JSON.stringify(v));
  } catch (e) { if (v === undefined) return mem[k] ?? null; mem[k] = v; }
  return null;
}
// Wait for a number of milliseconds.
const sleep = ms => new Promise(r => setTimeout(r, ms));
// Return a shuffled copy of a list.
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
