/* Start-up: load the content files, then switch every part of the page on. */
(async function () {
  // Load the lesson files listed in index.html, then start every part of the page.
  const host = $('#sections');
  try {
    const parts = await Promise.all(host.dataset.src.split(',').map(f =>
      fetch(f.trim()).then(r => { if (!r.ok) throw new Error(f + ' ' + r.status); return r.text(); })));
    host.innerHTML = parts.join('\n');
  } catch (e) {
    console.error(e);
    host.innerHTML = '<div class="callout warn"><b>Could not load the sections</b><p>Open this page from a web server (for example <code>python3 -m http.server</code>), not by double-clicking the file.</p></div>';
    return;
  }
  // Order matters: code boxes first, then structure, then the parts that need the sections.
  const steps = [mountCode, mountExplain, mountStructure, mountChrome, mountQuizzes, mountQA, mountCoding, mountErrors, mountCheat, mountLabs];
  steps.forEach(f => { try { f(); } catch (e) { console.error('init failed:', f.name, e); } });
  try {
    const nq = Object.values(QUIZ).reduce((a, b) => a + b.length, 0);
    $('#stats').innerHTML = `<span><b>${SECS.length}</b> sections</span><span><b>${$$('.lab').length}</b> live demos</span><span><b>${nq}</b> practice questions</span><span><b>${QA.length}</b> interview Q&amp;A</span>`;
  } catch (e) { console.error(e); }
  const h = location.hash.slice(1);
  if (h && document.getElementById(h)) setTimeout(() => document.getElementById(h).scrollIntoView(), 100);
})();
