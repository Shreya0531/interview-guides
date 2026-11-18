/* Demo: checklist. */
// Demo - Framework checklist with saved ticks.
LABS.checklist = function (el) {
  const items = ['Tests are split into tests, services (API calls) and specs', 'URLs and passwords are in config files, not in the code', 'The environment can change with one setting (-Denv=qa)', 'Bodies are built with POJOs or a data factory', 'Common checks live in a ResponseSpecification', 'Failing tests print the request and response', 'Every test creates and cleans up its own data', 'There is a report (Allure or Extent)', 'The tests run in a pipeline on every change', 'There are negative tests (401, 403, 404, 400)'];
  const saved = new Set(store('check') || []);
  const b = labShell(el, 'Is your framework interview-ready?', `<p>Tick what your project already does. Use the gaps as things to learn or build.</p><div id="cl">${items.map((t, i) => `<label class="check"><input type="checkbox" data-i="${i}" ${saved.has(i) ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div><div class="out" id="cs2"></div>`);
  const upd = () => {
    const n = $$('input:checked', b).length;
    $('#cs2', b).innerHTML = `<b>${n} of ${items.length}</b> ${n >= 8 ? 'Excellent. You can talk about a real framework with confidence.' : n >= 5 ? 'Good start. Add the missing pieces to your own practice project.' : 'No problem. Build a small project and add one item at a time.'}`;
  };
  b.addEventListener('change', () => { store('check', $$('input:checked', b).map(x => +x.dataset.i)); upd(); });
  upd();
};
