/* Demo: chain. */
// Demo - Step-by-step login, create, read, update, delete.
LABS.chain = function (el) {
  const b = labShell(el, 'Chaining: log in → create → read → update → delete', `<p>Press <b>Run next step</b>. Each step uses a value saved from an earlier step.</p>
    <div class="chips"><button type="button" class="btn" id="cn">▶ Run next step</button><button type="button" class="btn ghost" id="cr">Start again</button></div><div class="stepper" id="cs"></div>`);
  let mock, ctx, i;
  const J = { 'Content-Type': 'application/json' };
  const steps = [
    { t: '1. Log in and keep the token', j: `String token = given().contentType(ContentType.JSON)\n    .body("{\\"username\\":\\"admin\\",\\"password\\":\\"secret123\\"}")\n.when().post("/login")\n.then().statusCode(200)\n    .extract().path("token");`,
      r: () => ({ method: 'POST', path: '/login', headers: J, body: '{"username":"admin","password":"secret123"}' }), after: (res) => { ctx.token = res.body.token; return `Saved <code>token</code> = <code>${ctx.token}</code>`; } },
    { t: '2. Create a book with the token, keep the id', j: `int id = given().header("Authorization", "Bearer " + token)\n    .contentType(ContentType.JSON)\n    .body("{\\"title\\":\\"Refactoring\\",\\"author\\":\\"Martin Fowler\\",\\"price\\":39}")\n.when().post("/books")\n.then().statusCode(201)\n    .extract().path("id");`,
      r: () => ({ method: 'POST', path: '/books', headers: { ...J, Authorization: 'Bearer ' + ctx.token }, body: '{"title":"Refactoring","author":"Martin Fowler","price":39}' }), after: res => { ctx.id = res.body.id; return `Saved <code>id</code> = <code>${ctx.id}</code>`; } },
    { t: '3. Read it back with the id', j: `given().when().get("/books/{id}", id)\n.then().statusCode(200)\n    .body("title", equalTo("Refactoring"));`,
      r: () => ({ method: 'GET', path: '/books/' + ctx.id }), after: () => 'Check passed: title is Refactoring' },
    { t: '4. Change only the price (PATCH)', j: `given().header("Authorization", "Bearer " + token)\n    .contentType(ContentType.JSON).body("{\\"price\\": 25}")\n.when().patch("/books/{id}", id)\n.then().statusCode(200).body("price", equalTo(25));`,
      r: () => ({ method: 'PATCH', path: '/books/' + ctx.id, headers: { ...J, Authorization: 'Bearer ' + ctx.token }, body: '{"price":25}' }), after: () => 'Price changed. The title stayed the same because PATCH only changes what you send.' },
    { t: '5. Delete the book', j: `given().header("Authorization", "Bearer " + token)\n.when().delete("/books/{id}", id)\n.then().statusCode(204);`,
      r: () => ({ method: 'DELETE', path: '/books/' + ctx.id, headers: { Authorization: 'Bearer ' + ctx.token } }), after: () => 'Deleted. 204 means success with no body.' },
    { t: '6. Read it again: it must be gone', j: `given().when().get("/books/{id}", id)\n.then().statusCode(404);`,
      r: () => ({ method: 'GET', path: '/books/' + ctx.id }), after: () => 'A good test cleans up and proves it.' }
  ];
  const reset = () => { mock = createMock(); ctx = {}; i = 0; $('#cs', b).innerHTML = ''; $('#cn', b).disabled = false; $('#cn', b).textContent = '▶ Run next step'; };
  $('#cr', b).addEventListener('click', reset);
  $('#cn', b).addEventListener('click', async () => {
    if (i >= steps.length) return;
    const s = steps[i]; $('#cn', b).disabled = true;
    const res = await mock.send(s.r()); const note = s.after(res);
    const d = document.createElement('div'); d.className = 'step';
    d.innerHTML = `<h4>${esc(s.t)}</h4>${buildFig(s.j, 'java', 'Java')}<div class="verdict"><span class="stat s${String(res.status)[0]}">${res.status}</span><span class="mini">${res.ms} ms</span></div><pre class="out" style="margin:6px 0;font:12.5px var(--mono);white-space:pre-wrap">${res.body === null ? '(empty body)' : esc(JSON.stringify(res.body, null, 2))}</pre><p class="mini" style="margin:0">➜ ${note}</p>`;
    $('#cs', b).appendChild(d); wireCopy(d); i++;
    $('#cn', b).disabled = i >= steps.length; $('#cn', b).textContent = i >= steps.length ? 'All steps done ✓' : '▶ Run next step';
    d.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  reset();
};
