/* ==========================================================
   HOME PAGE -- Projects teaser grid + local filter tabs + smart search
   ========================================================== */

const TEASER_ITEMS = [
  { title: 'Ornamental Entry Gate', style: 'classic' },
  { title: 'Modern Slat Gate', style: 'modern' },
  { title: 'Glass Staircase Railing', style: 'modern' },
  { title: 'Balcony Glass Railing', style: 'modern' },
  { title: 'HPL Facade Panel', style: 'modern' },
  { title: 'Stone Clad Facade', style: 'classic' },
  { title: 'Car Parking Shed', style: 'sheds' },
  { title: 'Spiral Staircase', style: 'classic' },
];

(function initTeaser(){
  const grid = document.getElementById('teaser-grid');
  if(!grid) return;

  function render(filter){
    grid.innerHTML = '';
    TEASER_ITEMS
      .filter(item => filter === 'all' || item.style === filter)
      .slice(0, 8)
      .forEach(item => {
        const card = document.createElement('a');
        const styleParam = item.style === 'sheds' ? 'type=sheds' : 'style=' + item.style;
        card.href = 'products.html?' + styleParam;
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
