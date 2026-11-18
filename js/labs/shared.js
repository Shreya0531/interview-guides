/* Shared sample data and the lab wrapper. */
// Sample response used by the matcher and GPath demos.
const SAMPLE = {
  shop: 'Book Corner', open: true,
  owner: { name: 'Meera', city: 'Pune' },
  books: [
    { id: 1, title: 'Clean Code', author: 'Robert Martin', year: 2008, price: 32.5, inStock: true },
    { id: 2, title: 'Effective Java', author: 'Joshua Bloch', year: 2018, price: 45, inStock: true },
    { id: 3, title: 'Head First Java', author: 'Kathy Sierra', year: 2005, price: 28.99, inStock: false },
    { id: 4, title: 'Java Concurrency in Practice', author: 'Brian Goetz', year: 2006, price: 50, inStock: true }
  ]
};
// Draw the demo frame (title bar and body) and return the body element.
function labShell(el, title, body) {
  el.innerHTML = `<div class="lab-h"><span class="tag">Live demo</span><span>${esc(title)}</span></div><div class="lab-b">${body}</div>`;
  return $('.lab-b', el);
}
// All demos register here as LABS.name. The name matches data-lab in the content files.
const LABS = {};
