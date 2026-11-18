/* Code blocks: syntax colours, copy button, tabs, click-to-explain lines. */
/* ---------- syntax highlighting ---------- */
// Wrap each matched piece of code in a coloured <span>. Everything else is escaped.
function tokenize(code, re, cls) {
  let out = '', last = 0, m;
  re.lastIndex = 0;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const c = cls(m);
    out += c ? `<span class="${c}">${esc(m[0])}</span>` : esc(m[0]);
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  return out + esc(code.slice(last));
}
// One regex per language. Each group is one colour: comment, string, annotation, number, keyword, method.
const JAVA_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("""[\s\S]*?"""|"(?:\\.|[^"\\\n])*")|(@[A-Za-z_]\w*)|\b(\d+(?:\.\d+)?[LlFfDd]?)\b|\b(public|private|protected|static|final|class|void|new|return|import|package|extends|implements|if|else|for|while|try|catch|throws|throw|int|long|double|float|boolean|String|var|this|true|false|null|interface|enum|byte)\b|\b([A-Za-z_]\w*)(?=\()/g;
const XML_RE = /(<!--[\s\S]*?-->)|(<\/?[A-Za-z][\w:.-]*)|(\/?>)|("[^"]*")/g;
const JSON_RE = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;
// Colour code for java, xml or json. Other languages stay plain.
function hl(code, lang) {
  if (lang === 'java') return tokenize(code, JAVA_RE, m => m[1] ? 'c' : m[2] ? 's' : m[3] ? 'a' : m[4] ? 'nn' : m[5] ? 'k' : m[6] ? 'f' : '');
  if (lang === 'xml') return tokenize(code, XML_RE, m => m[1] ? 'c' : m[2] ? 'k' : m[3] ? 'k' : m[4] ? 's' : '');
  if (lang === 'json') return tokenize(code, JSON_RE, m => m[1] ? (m[2] ? 'f' : 's') : m[3] ? 'k' : m[4] ? 'nn' : '');
  return esc(code);
}
// Build the dark code box with a title bar and a Copy button.
function buildFig(code, lang, title) {
  return `<figure class="code"><figcaption><span>${esc(title || lang || 'code')}</span><button type="button" data-copy>Copy</button></figcaption><pre><code>${hl(code, lang)}</code></pre></figure>`;
}
// Make Copy buttons work. Falls back to selecting the text if the clipboard is blocked.
function wireCopy(root) {
  $$('[data-copy]', root).forEach(b => {
    if (b._w) return; b._w = 1;
    b.addEventListener('click', async () => {
      const text = b.closest('figure').querySelector('code').textContent;
      try { await navigator.clipboard.writeText(text); b.textContent = 'Copied ✓'; }
      catch (e) {
        const r = document.createRange(); r.selectNodeContents(b.closest('figure').querySelector('code'));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected';
      }
      setTimeout(() => b.textContent = 'Copy', 1400);
    });
  });
}
// Turn <script type="text/x-code"> blocks into code boxes. Blocks inside .tabs become tabs.
function mountCode() {
  // tabs first
  $$('.tabs').forEach(t => {
    const items = $$('script[type="text/x-code"]', t);
    const bar = document.createElement('div'); bar.className = 'tabbar'; bar.setAttribute('role', 'tablist');
    const panels = document.createElement('div');
    items.forEach((s, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = s.dataset.tab; b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0);
      const code = s.textContent.replace(/^\n/, '').replace(/\s+$/, '');
      const holder = document.createElement('div'); holder.innerHTML = buildFig(code, s.dataset.lang, s.dataset.tab);
      holder.hidden = i !== 0; panels.appendChild(holder);
      b.addEventListener('click', () => {
        $$('button', bar).forEach(x => x.setAttribute('aria-selected', x === b));
        [...panels.children].forEach((p, j) => p.hidden = j !== i);
      });
      bar.appendChild(b); s.remove();
    });
    t.append(bar, panels);
  });
  $$('script[type="text/x-code"]').forEach(s => {
    const code = s.textContent.replace(/^\n/, '').replace(/\s+$/, '');
    const d = document.createElement('div'); d.innerHTML = buildFig(code, s.dataset.lang, s.dataset.title);
    s.replaceWith(d.firstChild);
  });
  wireCopy(document);
}
// Click-a-line component. Notes come from XL in data/explain.js.
function mountExplain() {
  $$('.xl[data-xl]').forEach(el => {
    const lines = XL[el.dataset.xl];
    el.innerHTML = lines.map((l, i) => `<button type="button" class="xline" data-i="${i}">${l[0] ? hl(l[0], 'java') : '&nbsp;'}</button>`).join('') +
      '<div class="xnote">👆 Click any line of code to see what it does.</div>';
    const note = $('.xnote', el);
    el.addEventListener('click', e => {
      const b = e.target.closest('.xline'); if (!b) return;
      $$('.xline', el).forEach(x => x.classList.toggle('on', x === b));
      const n = lines[+b.dataset.i][1];
      note.innerHTML = n || 'Nothing special on this line.';
    });
  });
}
