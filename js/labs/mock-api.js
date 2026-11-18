/* A pretend library API that runs inside the page. */
// Valid Basic login: admin / secret123.
const BASIC_OK = 'Basic ' + btoa('admin:secret123');
// Pretend library API. GET is public. POST, PUT, PATCH and DELETE need a token (tok_8f3a = admin, tok_reader = read-only) or Basic login. Each lab makes its own copy.
function createMock() {
  const seed = () => [
    { id: 1, title: 'Clean Code', author: 'Robert Martin', year: 2008, price: 32.5, inStock: true },
    { id: 2, title: 'Effective Java', author: 'Joshua Bloch', year: 2018, price: 45, inStock: true },
    { id: 3, title: 'Head First Java', author: 'Kathy Sierra', year: 2005, price: 28.99, inStock: false }
  ];
  let books = seed(), nextId = 4;
  const lower = h => Object.fromEntries(Object.entries(h || {}).map(([k, v]) => [k.toLowerCase(), v]));
  const R = (status, body, headers) => ({ status, body, headers: Object.assign(body === null ? {} : { 'Content-Type': 'application/json' }, headers || {}) });
  // Return an error response if the login is missing or wrong, else null.
  function auth(h) {
    const a = h['authorization'];
    if (!a) return R(401, { error: 'Login needed: token is missing' });
    if (a.startsWith('Bearer ')) {
      const t = a.slice(7).trim();
      if (t === 'tok_8f3a') return null;
      if (t === 'tok_reader') return R(403, { error: 'You are logged in but you are not allowed to do this' });
      return R(401, { error: 'Login needed: token is wrong' });
    }
    if (a === BASIC_OK) return null;
    return R(401, { error: 'Login needed: wrong username or password' });
  }
  // Check Content-Type and parse the body. Gives 415 or 400 on problems.
  function json(h, body) {
    const ct = h['content-type'] || '';
    if (!ct.includes('application/json')) return { err: R(415, { error: 'Content-Type must be application/json' }) };
    try { const o = JSON.parse(body || ''); if (o === null || typeof o !== 'object') throw 0; return { obj: o }; }
    catch (e) { return { err: R(400, { error: 'Body is not valid JSON' }) }; }
  }
  // Route a request to the right answer: status code, headers and body.
  function handle(req) {
    const m = req.method.toUpperCase(), h = lower(req.headers);
    let path = req.path || '/', query = Object.assign({}, req.query);
    if (path.includes('?')) { const [p, qs] = path.split('?'); path = p; new URLSearchParams(qs).forEach((v, k) => query[k] = v); }
    path = path.replace(/\/+$/, '') || '/';
    let mt;
    if (path === '/login') {
      if (m !== 'POST') return R(405, { error: 'Method not allowed' }, { Allow: 'POST' });
      const j = json(h, req.body); if (j.err) return j.err;
      return j.obj.username === 'admin' && j.obj.password === 'secret123' ? R(200, { token: 'tok_8f3a' }) : R(401, { error: 'Wrong username or password' });
    }
    if (path === '/books') {
      if (m === 'GET') {
        let list = books.filter(b => (!query.author || b.author.toLowerCase() === String(query.author).toLowerCase()) && (!query.maxPrice || b.price <= Number(query.maxPrice)));
        return R(200, { total: list.length, books: list });
      }
      if (m === 'POST') {
        const a = auth(h); if (a) return a;
        const j = json(h, req.body); if (j.err) return j.err;
        if (!j.obj.title) return R(400, { error: 'title is required' });
        if (!j.obj.author) return R(400, { error: 'author is required' });
        const b = { id: nextId++, title: j.obj.title, author: j.obj.author, year: j.obj.year ?? null, price: j.obj.price ?? 0, inStock: true };
        books.push(b); return R(201, b, { Location: '/books/' + b.id });
      }
      return R(405, { error: 'Method not allowed' }, { Allow: 'GET, POST' });
    }
    if ((mt = path.match(/^\/books\/(\d+)$/))) {
      const id = Number(mt[1]), b = books.find(x => x.id === id);
      if (m === 'GET') return b ? R(200, b) : R(404, { error: 'Book not found' });
      if (['PUT', 'PATCH', 'DELETE'].includes(m)) {
        const a = auth(h); if (a) return a;
        if (!b) return R(404, { error: 'Book not found' });
        if (m === 'DELETE') { books = books.filter(x => x.id !== id); return R(204, null); }
        const j = json(h, req.body); if (j.err) return j.err;
        if (m === 'PUT') {
          if (!j.obj.title || !j.obj.author) return R(400, { error: 'title and author are required for PUT' });
          Object.keys(b).forEach(k => { if (k !== 'id') delete b[k]; });
          Object.assign(b, { title: j.obj.title, author: j.obj.author, year: j.obj.year ?? null, price: j.obj.price ?? 0, inStock: j.obj.inStock ?? true });
        } else { ['title', 'author', 'year', 'price', 'inStock'].forEach(k => { if (k in j.obj) b[k] = j.obj[k]; }); }
        return R(200, b);
      }
      return R(405, { error: 'Method not allowed' }, { Allow: 'GET, PUT, PATCH, DELETE' });
    }
    return R(404, { error: 'Not found' });
  }
  // Add a short fake delay so it feels like a real call.
  async function send(req) {
    const t = 60 + Math.floor(Math.random() * 150);
    await sleep(t);
    const r = handle(req); r.ms = t; return r;
  }
  return { send, handle, reset() { books = seed(); nextId = 4; } };
}
