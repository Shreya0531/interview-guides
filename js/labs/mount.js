/* Starts every demo found on the page. */
// Start every .lab[data-lab] found on the page. One broken demo cannot stop the others.
function mountLabs() {
  $$('.lab[data-lab]').forEach(el => { const f = LABS[el.dataset.lab]; if (f) { try { f(el); } catch (e) { console.error('lab failed', el.dataset.lab, e); } } });
}
