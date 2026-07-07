/* ==========================================================
   HOME PAGE — Projects teaser grid + local filter tabs.
   Uses a small fixed preview set (full catalog lives in products.js).
   ========================================================== */

const TEASER_ITEMS = [
  { title: 'Ornamental Entry Gate', category: 'gates' },
  { title: 'Modern Slat Gate', category: 'gates' },
  { title: 'Glass Staircase Railing', category: 'staircases' },
  { title: 'Balcony Glass Railing', category: 'railings' },
  { title: 'HPL Facade Panel', category: 'elevation' },
  { title: 'Carved Wooden Door Frame', category: 'interiors' },
  { title: 'Stone Clad Elevation', category: 'elevation' },
  { title: 'Brass Jali Screen', category: 'interiors' },
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
