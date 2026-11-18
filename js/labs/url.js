/* Demo: url. */
// Demo - Read a URL: colours each part and shows the REST Assured code.
LABS.url = function (el) {
  const b = labShell(el, 'Read a URL', `<p>Type any URL. Each part gets its own colour.</p>
    <input id="urlIn" value="https://api.demo-shop.com:8080/v1/users/42/orders?status=paid&limit=5" aria-label="URL">
    <div class="urlparts" id="urlParts"></div><div id="urlOut"></div>`);
  const run = () => {
    const v = $('#urlIn', b).value.trim(), P = $('#urlParts', b), O = $('#urlOut', b);
    let u; try { u = new URL(v); } catch (e) { P.innerHTML = ''; O.innerHTML = '<div class="out">That does not look like a full URL. Start with https://</div>'; return; }
    const port = u.port ? ':' + u.port : '';
    P.innerHTML = `<span class="u1">${esc(u.protocol)}//</span><span class="u2">${esc(u.hostname)}</span>${port ? `<span class="u3">${esc(port)}</span>` : ''}<span class="u4">${esc(u.pathname)}</span>${u.search ? `<span class="u5">${esc(u.search)}</span>` : ''}`;
    const q = [...u.searchParams.entries()];
    const segs = u.pathname.split('/').filter(Boolean);
    const ver = /^v\d+$/.test(segs[0] || '');
    const base = u.protocol + '//' + u.hostname + port;
    const rest = '/' + (ver ? segs.slice(1) : segs).join('/');
    let code = 'given()\n    .baseUri("' + base + '")\n' + (ver ? '    .basePath("/' + segs[0] + '")\n' : '') + q.map(([k, x]) => `    .queryParam("${k}", ${/^\d+$/.test(x) ? x : '"' + x + '"'})\n`).join('') + '.when()\n    .get("' + rest + '");';
    O.innerHTML = `<div class="tw"><table>
      <tr><td><span class="pill">Scheme</span></td><td><code>${esc(u.protocol.replace(':', ''))}</code> (https is secure)</td></tr>
      <tr><td><span class="pill">Host</span></td><td><code>${esc(u.hostname)}</code> the server name</td></tr>
      <tr><td><span class="pill">Port</span></td><td>${u.port ? '<code>' + esc(u.port) + '</code>' : 'not written, so the default (443 for https, 80 for http)'}</td></tr>
      <tr><td><span class="pill">Path</span></td><td><code>${esc(u.pathname)}</code> ${segs.length} pieces: ${segs.map(s => '<code>' + esc(s) + '</code>').join(' ')}</td></tr>
      <tr><td><span class="pill">Query</span></td><td>${q.length ? q.map(([k, x]) => '<code>' + esc(k) + '</code> = <code>' + esc(x) + '</code>').join('<br>') : 'none'}</td></tr></table></div>
      <p class="mini">How it looks in REST Assured:</p>${buildFig(code, 'java', 'test')}`;
    wireCopy(O);
  };
  $('#urlIn', b).addEventListener('input', run); run();
};
