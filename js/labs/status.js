/* Demo: status. */
// [code, name, group, meaning, example]. Group sets the colour.
const STATUS = [
  [200, 'OK', 'ok', 'The request worked and here is the data.', 'GET /books'],
  [201, 'Created', 'ok', 'Something new was created.', 'POST /books'],
  [204, 'No Content', 'ok', 'It worked and there is nothing to send back.', 'DELETE /books/7'],
  [301, 'Moved Permanently', 'redirect', 'The address changed for good. Use the new one.', 'Old URL after a site move'],
  [302, 'Found', 'redirect', 'Temporary redirect to another URL.', 'Login page redirect'],
  [304, 'Not Modified', 'redirect', 'Nothing changed, use your saved copy.', 'Cached file'],
  [400, 'Bad Request', 'client', 'The request is broken or missing data.', 'POST with no title'],
  [401, 'Unauthorized', 'client', 'Not logged in, or the login is wrong.', 'Missing or expired token'],
  [403, 'Forbidden', 'client', 'Logged in, but not allowed to do this.', 'A normal user deleting as admin'],
  [404, 'Not Found', 'client', 'That thing does not exist.', 'GET /books/9999'],
  [405, 'Method Not Allowed', 'client', 'The URL exists but not for this method.', 'DELETE on /login'],
  [409, 'Conflict', 'client', 'It clashes with existing data.', 'Creating a user that exists'],
  [415, 'Unsupported Media Type', 'client', 'The server does not accept your body format.', 'Forgot Content-Type'],
  [422, 'Unprocessable Entity', 'client', 'The format is fine but the data is not valid.', 'Email without @'],
  [429, 'Too Many Requests', 'client', 'Slow down. You hit the limit.', 'Calling 100 times a second'],
  [500, 'Internal Server Error', 'server', 'The server crashed. A bug on their side.', 'Unexpected error in the API'],
  [502, 'Bad Gateway', 'server', 'A server in the middle got a bad answer.', 'Proxy cannot reach the API'],
  [503, 'Service Unavailable', 'server', 'The server is down or too busy.', 'Maintenance'],
  [504, 'Gateway Timeout', 'server', 'A server in the middle waited too long.', 'Very slow back end']
];

// Demo - Status code explorer.
LABS.status = function (el) {
  const b = labShell(el, 'Status code explorer', `<p>Tap a code to see what it means and when you will see it.</p><div class="codes" id="codes"></div><div class="out" id="stOut">Tap a code above.</div>`);
  const grp = { ok: 2, redirect: 3, client: 4, server: 5 };
  $('#codes', b).innerHTML = STATUS.map((s, i) => `<button type="button" class="g${grp[s[2]]}" data-i="${i}">${s[0]}</button>`).join('');
  $('#codes', b).addEventListener('click', e => {
    const x = e.target.closest('button'); if (!x) return;
    $$('#codes button', b).forEach(y => y.classList.toggle('on', y === x));
    const s = STATUS[+x.dataset.i];
    const who = { ok: 'Success. Everything is fine.', redirect: 'Redirect. Go somewhere else.', client: 'Client side: your request has a problem.', server: 'Server side: the API has a problem.' }[s[2]];
    $('#stOut', b).innerHTML = `<div class="verdict"><span class="stat s${grp[s[2]]}">${s[0]}</span><span>${s[1]}</span></div><p>${s[3]}</p><p class="mini"><b>Who is at fault?</b> ${who}<br><b>You may see it with:</b> ${s[4]}</p><code>.statusCode(${s[0]})</code>`;
  });
};
