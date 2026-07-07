/* ==========================================================
   HOME PAGE -- Projects teaser grid + local filter tabs + smart search
   ========================================================== */

const TEASER_ITEMS = [
  { title: 'Ornamental Entry Gate', category: 'gates' },
  { title: 'Modern Slat Gate', category: 'gates' },
  { title: 'Glass Staircase Railing', category: 'staircases' },
  { title: 'Balcony Glass Railing', category: 'railings' },
  { title: 'HPL Facade Panel', category: 'facades' },
  { title: 'Stone Clad Facade', category: 'facades' },
  { title: 'Car Parking Shed', category: 'sheds' },
  { title: 'Spiral Staircase', category: 'staircases' },
];

(function initTeaser(){
  const grid = document.getElementById('teaser-grid');
  if(!grid) return;

  function render(filter){
    grid.innerHTML = '';
    TEASER_ITEMS
      .filter(item => filter === 'all' || item.category === filter)
      .slice(0, 8)
      .forEach(item => {
        const card = document.createElement('a');
        card.href = 'products.html?type=' + item.category;
        card.className = 'teaser-card';
        card.innerHTML = `<span class="teaser-caption">${item.title}</span>`;
        grid.appendChild(card);
      });
  }

  render('all');

  document.querySelectorAll('.filter-tabs .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tabs .filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      render(btn.dataset.filter);
    });
  });
})();

// ---------- SMART SEARCH DROPDOWN ----------
// Lives in search-engine.js; here we just wire it to the homepage search bar.
(function initHomeSearch(){
  const input = document.getElementById('home-search');
  const suggestionsEl = document.getElementById('home-search-suggestions');
  if(!input || !suggestionsEl || typeof attachSearchDropdown !== 'function') return;
  attachSearchDropdown(input, suggestionsEl, PRODUCTS);
})();
