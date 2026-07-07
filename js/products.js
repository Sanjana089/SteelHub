/* ==========================================================
   PRODUCTS PAGE — filtering, search, URL sync, rendering
   ========================================================== */

// ---------- PLACEHOLDER VISUAL PATTERNS (per type + style) ----------
const TYPE_SHAPES = {
  gates: (s) => `<g stroke="${s}" stroke-width="2" fill="none">
      <line x1="20" y1="8" x2="20" y2="82"/><line x1="40" y1="8" x2="40" y2="82"/>
      <line x1="60" y1="8" x2="60" y2="82"/><line x1="80" y1="8" x2="80" y2="82"/><line x1="100" y1="8" x2="100" y2="82"/>
      <line x1="14" y1="22" x2="106" y2="22"/><line x1="14" y1="68" x2="106" y2="68"/>
    </g>`,
  railings: (s) => `<g stroke="${s}" stroke-width="2" fill="none">
      <line x1="10" y1="20" x2="110" y2="20"/><line x1="10" y1="70" x2="110" y2="70"/>
      ${Array.from({length:11}).map((_,i)=>`<line x1="${10+i*10}" y1="20" x2="${10+i*10}" y2="70"/>`).join('')}
    </g>`,
  staircases: (s) => `<g stroke="${s}" stroke-width="2" fill="none">
      <path d="M10 82 L10 66 L30 66 L30 50 L50 50 L50 34 L70 34 L70 18 L90 18 L90 8 L110 8"/>
    </g>`,
  elevation: (s) => `<g stroke="${s}" stroke-width="1.5" fill="none">
      <rect x="10" y="8" width="45" height="74"/><rect x="65" y="8" width="45" height="34"/><rect x="65" y="50" width="45" height="32"/>
    </g>`,
  interiors: (s) => `<g stroke="${s}" stroke-width="1.5" fill="none">
      <circle cx="60" cy="45" r="28"/><circle cx="60" cy="45" r="16"/>
      <path d="M60 17 V8 M60 73 V82 M32 45 H10 M110 45 H88"/>
    </g>`,
  sheds: (s) => `<g stroke="${s}" stroke-width="2" fill="none">
      <path d="M8 40 60 12 112 40"/><path d="M18 40 V82 M102 40 V82"/><line x1="8" y1="40" x2="112" y2="40"/>
    </g>`,
};

function patternSVG(pattern){
  const [type, style] = pattern.split('-');
  const shapeFn = TYPE_SHAPES[
    { gate: 'gates', rail: 'railings', stair: 'staircases', elev: 'elevation', int: 'interiors', shed: 'sheds' }[type]
  ];
  const bg = style === 'classic' ? '#2a2620' : '#eef1f0';
  const stroke = style === 'classic' ? '#d8b23a' : '#383838';
  return `<svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="90" fill="${bg}"/>
    ${shapeFn ? shapeFn(stroke) : ''}
  </svg>`;
}

// ---------- STATE ----------
const state = {
  search: '',
  styles: [],   // e.g. ['classic']
  types: [],    // e.g. ['gates']
};

function readStateFromURL(){
  const params = new URLSearchParams(window.location.search);
  state.search = params.get('search') || '';
  state.styles = (params.get('style') || '').split(',').filter(Boolean);
  state.types = (params.get('type') || '').split(',').filter(Boolean);
}

function writeStateToURL(){
  const params = new URLSearchParams();
  if(state.search) params.set('search', state.search);
  if(state.styles.length) params.set('style', state.styles.join(','));
  if(state.types.length) params.set('type', state.types.join(','));
  const qs = params.toString();
  history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
}

function syncControlsFromState(){
  document.getElementById('banner-search').value = state.search;
  document.querySelectorAll('.chip-toggle').forEach(btn => {
    btn.classList.toggle('is-active', state.styles.includes(btn.dataset.value));
  });
  document.querySelectorAll('.check-list input[type="checkbox"]').forEach(input => {
    input.checked = state.types.includes(input.value);
  });
}

// ---------- FILTERING ----------
function getFilteredProducts(){
  const q = state.search.trim().toLowerCase();
  return PRODUCTS.filter(p => {
    if(state.styles.length && !state.styles.includes(p.style)) return false;
    if(state.types.length && !state.types.includes(p.type)) return false;
    if(q){
      const haystack = [p.name, p.type, p.style, ...p.tags].join(' ').toLowerCase();
      if(!haystack.includes(q)) return false;
    }
    return true;
  });
}

// ---------- RENDER ----------
function renderChips(){
  const wrap = document.getElementById('active-chips');
  wrap.innerHTML = '';
  const chips = [];

  if(state.search) chips.push({ label: `“${state.search}”`, clear: () => { state.search = ''; } });
  state.styles.forEach(v => chips.push({ label: v[0].toUpperCase()+v.slice(1), clear: () => { state.styles = state.styles.filter(x=>x!==v); } }));
  state.types.forEach(v => chips.push({ label: TYPE_LABELS[v] || v, clear: () => { state.types = state.types.filter(x=>x!==v); } }));

  chips.forEach(chip => {
    const el = document.createElement('span');
    el.className = 'active-chip';
    el.innerHTML = `${chip.label} <button aria-label="Remove filter">✕</button>`;
    el.querySelector('button').addEventListener('click', () => {
      chip.clear();
      applyAndRender();
    });
    wrap.appendChild(el);
  });
}

function renderProducts(){
  const grid = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-state');
  const countEl = document.getElementById('results-count');
  const results = getFilteredProducts();

  countEl.textContent = results.length
    ? `Showing ${results.length} product${results.length === 1 ? '' : 's'}`
    : 'No products found';

  grid.innerHTML = '';
  emptyState.hidden = results.length > 0;

  results.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card card';
    card.innerHTML = `
      <div class="product-media">${patternSVG(p.pattern)}
        <span class="product-badge">${p.style[0].toUpperCase()+p.style.slice(1)}</span>
      </div>
      <div class="product-body">
        <span class="product-type">${TYPE_LABELS[p.type]}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-colors">${p.colors.map(c=>`<span style="background:${COLOR_HEX[c]}"></span>`).join('')}</div>
        <div class="product-actions">
          <button class="btn btn-outline btn-sm btn-block" data-open-modal="estimate-modal">Enquire</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyAndRender(){
  writeStateToURL();
  syncControlsFromState();
  renderChips();
  renderProducts();
}

// ---------- EVENT WIRING ----------
(function init(){
  readStateFromURL();
  syncControlsFromState();
  renderChips();
  renderProducts();

  document.querySelectorAll('.chip-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.value;
      state.styles = state.styles.includes(v) ? state.styles.filter(x=>x!==v) : [...state.styles, v];
      applyAndRender();
    });
  });

  document.querySelectorAll('.check-list input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      const v = input.value;
      state.types = input.checked ? [...state.types, v] : state.types.filter(x=>x!==v);
      applyAndRender();
    });
  });

  document.getElementById('banner-search').closest('form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.search = document.getElementById('banner-search').value;
    applyAndRender();
  });

  document.getElementById('clear-filters').addEventListener('click', () => {
    state.search = ''; state.styles = []; state.types = [];
    applyAndRender();
  });
  document.getElementById('empty-clear').addEventListener('click', () => {
    state.search = ''; state.styles = []; state.types = [];
    applyAndRender();
  });

  // mobile filter drawer
  const filters = document.getElementById('filters');
  const toggle = document.getElementById('mobile-filter-toggle');
  if(toggle){
    toggle.addEventListener('click', () => filters.classList.add('is-open'));
    document.addEventListener('click', (e) => {
      if(filters.classList.contains('is-open') && !filters.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)){
        filters.classList.remove('is-open');
      }
    });
  }
})();
