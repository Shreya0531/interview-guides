/* Demo: body. */
// Demo - Same JSON body as String, Map and POJO.
LABS.body = function (el) {
  const b = labShell(el, 'Same body, three ways', `<p>Change the values. The three styles always make the same JSON.</p>
    <div class="row"><div><label for="bt">Title</label><input id="bt" value="Clean Code"></div><div><label for="ba">Author</label><input id="ba" value="Robert Martin"></div><div><label for="by">Year</label><input id="by" value="2008" inputmode="numeric"></div></div>
    <div class="chips" id="btabs"><button type="button" class="chip on" data-k="s">String</button><button type="button" class="chip" data-k="m">Map</button><button type="button" class="chip" data-k="p">POJO</button></div>
    <div id="bc"></div><p class="mini">The JSON that goes over the network:</p><div id="bj"></div>`);
  let k = 's';
  const run = () => {
    const t = $('#bt', b).value, a = $('#ba', b).value, y = parseInt($('#by', b).value) || 0;
    const q = s => JSON.stringify(s);
    const code = {
      s: `String body = ${q(JSON.stringify({ title: t, author: a, year: y }))};\n\ngiven().contentType(ContentType.JSON).body(body)\n.when().post("/books");`,
      m: `Map<String, Object> body = new LinkedHashMap<>();\nbody.put("title", ${q(t)});\nbody.put("author", ${q(a)});\nbody.put("year", ${y});\n\ngiven().contentType(ContentType.JSON).body(body)\n.when().post("/books");`,
      p: `Book body = new Book(${q(t)}, ${q(a)}, ${y});\n\ngiven().contentType(ContentType.JSON).body(body)\n.when().post("/books");`
    }[k];
    $('#bc', b).innerHTML = buildFig(code, 'java', { s: 'String', m: 'Map', p: 'POJO' }[k]);
    $('#bj', b).innerHTML = buildFig(JSON.stringify({ title: t, author: a, year: y }, null, 2), 'json', 'JSON'); wireCopy(b);
  };
  ['bt', 'ba', 'by'].forEach(id => $('#' + id, b).addEventListener('input', run));
  $('#btabs', b).addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; k = c.dataset.k; $$('#btabs .chip', b).forEach(x => x.classList.toggle('on', x === c)); run(); });
  run();
};
