/* ==========================================================
   PRODUCTS PAGE -- filtering, smart search, URL sync, rendering
   ========================================================== */

// ---------- PLACEHOLDER VISUAL PATTERNS (fallback if a Cloudinary image fails to load) ----------
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
  facades: (s) => `<g stroke="${s}" stroke-width="1.5" fill="none">
      <rect x="10" y="8" width="45" height="74"/><rect x="65" y="8" width="45" height="34"/><rect x="65" y="50" width="45" height="32"/>
    </g>`,
  sheds: (s) => `<g stroke="${s}" stroke-width="2" fill="none">
      <path d="M8 40 60 12 112 40"/><path d="M18 40 V82 M102 40 V82"/><line x1="8" y1="40" x2="112" y2="40"/>
    </g>`,
};

function patternSVG(pattern){
  const [type, style] = pattern.split('-');
  const typeMap = { gate: 'gates', rail: 'railings', stair: 'staircases', facade: 'facades', shed: 'sheds' };
  const shapeFn = TYPE_SHAPES[typeMap[type]];
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

function getProductStyles(product){
  const rawStyles = Array.isArray(product?.styles)
    ? product.styles
    : Array.isArray(product?.style)
      ? product.style
      : (product?.style ? [product.style] : []);
  return rawStyles.map(v => String(v).toLowerCase()).filter(Boolean);
}

function formatStyleLabel(style){
  const normalized = String(style || '').trim();
  if(!normalized) return '';
  return normalized[0].toUpperCase() + normalized.slice(1);
}

// ---------- PRODUCT TYPE MAPPINGS BY STYLE ----------
const TYPES_BY_STYLE = {
  modern: [
    { id: 'sheds', label: 'Sheds & Canopies' },
    { id: 'gates', label: 'Gates' },
    { id: 'railing', label: 'Railing' },
    { id: 'staircase', label: 'Fabricated Staircase' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'cnc-acp-facade', label: 'CNC/ACP Facade' },
    { id: 'rafters', label: 'Rafters' },
    { id: 'acp-ms-channels', label: 'ACP/MS Channels' },
    { id: 'terracota', label: 'Terracota' },
    { id: 'handles', label: 'Handles' },
    { id: 'aluminium-louvres', label: 'Aluminium Louvres' },
  ],
  classic: [
    { id: 'sheds', label: 'Sheds & Canopies' },
    { id: 'gates', label: 'Gates' },
    { id: 'railing', label: 'Railing' },
    { id: 'staircase', label: 'Fabricated Staircase' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'terracota', label: 'Terracota' },
    { id: 'handles', label: 'Handles' },
    { id: 'shingles', label: 'Shingles' },
    { id: 'cast-iron-degi', label: 'Cast Iron (Degi)' },
    { id: 'mild-steel', label: 'Mild Steel' },
    { id: 'acp-panel', label: 'ACP Panel' },
    { id: 'hpl-clad', label: 'HPL Clad' },
  ],
  all: [
    { id: 'sheds', label: 'Sheds & Canopies' },
    { id: 'gates', label: 'Gates' },
    { id: 'railing', label: 'Railing' },
    { id: 'staircase', label: 'Fabricated Staircase' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'cnc-acp-facade', label: 'CNC/ACP Facade' },
    { id: 'rafters', label: 'Rafters' },
    { id: 'acp-ms-channels', label: 'ACP/MS Channels' },
    { id: 'terracota', label: 'Terracota' },
    { id: 'handles', label: 'Handles' },
    { id: 'aluminium-louvres', label: 'Aluminium Louvres' },
    { id: 'shingles', label: 'Shingles' },
    { id: 'cast-iron-degi', label: 'Cast Iron (Degi)' },
    { id: 'mild-steel', label: 'Mild Steel' },
    { id: 'acp-panel', label: 'ACP Panel' },
    { id: 'hpl-clad', label: 'HPL Clad' },
  ],
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
  updateTypeFilterUI();
  document.querySelectorAll('#type-filter-list input[type="checkbox"]').forEach(input => {
    input.checked = state.types.includes(input.value);
  });
}

function updateTypeFilterUI(){
  const typeList = document.getElementById('type-filter-list');
  if(!typeList) return;

  // Determine which types to show
  let availableTypes = [];
  if(state.styles.length === 0){
    // Show all types when no style is selected
    availableTypes = TYPES_BY_STYLE.all;
  } else if(state.styles.length === 1){
    // Show types for the selected style
    const style = state.styles[0];
    availableTypes = TYPES_BY_STYLE[style] || [];
  } else {
    // Show union of types when multiple styles are selected so the full set remains available
    const typeSets = state.styles.map(s => new Set((TYPES_BY_STYLE[s] || []).map(t => t.id)));
    if(typeSets.length > 0){
      const union = new Set();
      typeSets.forEach(set => set.forEach(id => union.add(id)));
      availableTypes = TYPES_BY_STYLE.all.filter(t => union.has(t.id));
    }
  }

  // Clear and rebuild the type filter list
  typeList.innerHTML = '';
  availableTypes.forEach(type => {
    const label = document.createElement('label');
    label.className = 'check-item';
    label.innerHTML = `<input type="checkbox" value="${type.id}"><span>${type.label}</span>`;
    typeList.appendChild(label);
  });

  // Re-attach event listeners for new checkboxes
  document.querySelectorAll('#type-filter-list input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      const v = input.value;
      state.types = input.checked ? [...state.types, v] : state.types.filter(x=>x!==v);
      applyAndRender();
    });
  });
}

// ---------- FILTERING (facets first, then smart search ranking) ----------
function getFilteredProducts(){
  // Map new type IDs to product types for filtering
  const productTypesToFilter = state.types.map(typeId => mapTypeIdToProductType(typeId)).filter(Boolean);

  let candidates = PRODUCTS.filter(p => {
    const productStyles = getProductStyles(p);
    if(state.styles.length && !state.styles.some(style => productStyles.includes(style))) return false;
    if(productTypesToFilter.length && !productTypesToFilter.includes(p.type)) return false;
    return true;
  });

  if(state.search.trim()){
    // searchProducts() lives in search-engine.js -- handles fuzzy matching
    // and Punjabi/Romanized alias translation automatically.
    candidates = searchProducts(state.search, candidates).map(r => r.product);
  }

  return candidates;
}

function mapTypeIdToProductType(typeId){
  // Map new type IDs to old product type system
  const mapping = {
    'gates': 'gates',
    'railing': 'railings',
    'staircase': 'staircases',
    'cnc-acp-facade': 'facades',
    'shingles': 'shingles',
    'balcony': 'balconies',
    'cast-iron-degi': 'cast-iron-degi',
    'mild-steel': 'mild-steel',
    'acp-panel': 'acp-panel',
    'hpl-clad': 'hpl-clad',
    'rafters': 'rafters',
    'acp-ms-channels': 'acp-ms-channels',
    'terracota': 'terracota',
    'handles': 'handles',
    'aluminium-louvres': 'aluminium-louvres',
    'sheds': 'sheds',
  };
  return mapping[typeId] || null;
}

// ---------- RENDER ----------

// carousel timers (cleared on each render)
let _carouselTimers = [];
function renderChips(){
  const wrap = document.getElementById('active-chips');
  wrap.innerHTML = '';
  const chips = [];

  if(state.search) chips.push({ label: `"${state.search}"`, clear: () => { state.search = ''; } });
  state.styles.forEach(v => chips.push({ label: v[0].toUpperCase()+v.slice(1), clear: () => { state.styles = state.styles.filter(x=>x!==v); } }));
  state.types.forEach(v => {
    const label = getTypeLabel(v);
    chips.push({ label, clear: () => { state.types = state.types.filter(x=>x!==v); } });
  });

  chips.forEach(chip => {
    const el = document.createElement('span');
    el.className = 'active-chip';
    el.innerHTML = `${chip.label} <button aria-label="Remove filter">X</button>`;
    el.querySelector('button').addEventListener('click', () => {
      chip.clear();
      applyAndRender();
    });
    wrap.appendChild(el);
  });
}

function getTypeLabel(typeId){
  // Search through all type mappings to find the label
  for(const styleTypes of Object.values(TYPES_BY_STYLE)){
    const found = styleTypes.find(t => t.id === typeId);
    if(found) return found.label;
  }
  return TYPE_LABELS[typeId] || typeId;
}

function renderProducts(){
  const grid = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-state');
  const countEl = document.getElementById('results-count');
  const results = getFilteredProducts();

  countEl.textContent = results.length
    ? `Showing ${results.length} product${results.length === 1 ? '' : 's'}`
    : 'No products found';

  // clear any running carousel timers before re-rendering
  _carouselTimers.forEach(t => clearInterval(t));
  _carouselTimers = [];
  grid.innerHTML = '';
  emptyState.hidden = results.length > 0;

  results.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card card';
    // support multiple images per product (fallback to single image)
    const imgs = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : [PLACEHOLDER_IMAGE]);
    const fallbackSvg = patternSVG(p.pattern).replace(/"/g, '&quot;');
    const mediaInner = imgs.map((id, i) => {
      const url = cloudinaryUrl(id, { width: 500 });
      return `<img src="${url}" alt="${p.name} ${i+1}" loading="lazy" data-index="${i}" onerror="this.style.display='none'">`;
    }).join('');
    const dotsInner = imgs.map((_, i) => `<button class="carousel-dot" data-index="${i}" aria-label="Show image ${i+1}"></button>`).join('');

    const productStyles = getProductStyles(p);
    const badgesHtml = productStyles.length
      ? `<div class="product-badges">${productStyles.map(style => `<span class="product-badge">${formatStyleLabel(style)}</span>`).join('')}</div>`
      : '';

    card.innerHTML = `
      <div class="product-media" data-images="${imgs.length}" data-product-id="${p.id}">
        ${mediaInner}
        <div class="carousel-dots">${dotsInner}</div>
        ${badgesHtml}
      </div>
      <div class="product-body">
        <span class="product-type">${TYPE_LABELS[p.type]}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-colors">${p.colors.map(c=>`<span style="background:${getColorHex(c)}"></span>`).join('')}</div>
        <div class="product-actions">
          <button class="btn btn-outline btn-sm btn-block" data-open-modal="estimate-modal">Enquire</button>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // if multiple images, mark first as active and set up carousel
    const mediaEl = card.querySelector('.product-media');
    const imgEls = Array.from(mediaEl.querySelectorAll('img'));
    if(imgEls.length > 1){
      imgEls.forEach((img,i)=> img.classList.toggle('active', i===0));
      // dots
      const dotsWrap = mediaEl.querySelector('.carousel-dots');
      const dotEls = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));
      dotEls.forEach((d,i)=> d.classList.toggle('active', i===0));

      // auto-rotate
      const timer = setInterval(() => {
        const cur = mediaEl.querySelector('img.active');
        const idx = imgEls.indexOf(cur);
        const nextIdx = (idx+1) % imgEls.length;
        const next = imgEls[nextIdx];
        if(cur) cur.classList.remove('active');
        if(next) next.classList.add('active');
        dotEls.forEach((d,i)=> d.classList.toggle('active', i===nextIdx));
      }, 3000);
      _carouselTimers.push(timer);

      // dot click handlers
      dotEls.forEach((d,i)=> d.addEventListener('click', (ev)=>{
        // stop auto-rotation briefly
        _carouselTimers.forEach(t=> clearInterval(t)); _carouselTimers = [];
        imgEls.forEach(img=> img.classList.remove('active'));
        imgEls[i].classList.add('active');
        dotEls.forEach(x=> x.classList.remove('active'));
        d.classList.add('active');
      }));

    } else if(imgEls.length === 1){
      imgEls[0].classList.add('active');
    }

    // open lightbox when clicking the media area
    mediaEl.addEventListener('click', () => {
      const startIndex = parseInt(mediaEl.querySelector('img.active')?.dataset.index || '0', 10);
      if(window.openProductLightbox){
        window.openProductLightbox(p, startIndex);
      }
    });
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
      // Clear types when style changes since available types depend on style
      state.types = [];
      applyAndRender();
    });
  });

  // Type checkboxes are now dynamically created, so listeners are attached in updateTypeFilterUI()

  const bannerInput = document.getElementById('banner-search');
  bannerInput.closest('form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.search = bannerInput.value;
    applyAndRender();
  });

  // smart live-suggestions dropdown -- updates on every keystroke
  const suggestionsEl = document.getElementById('search-suggestions');
  if(suggestionsEl){
    attachSearchDropdown(bannerInput, suggestionsEl, PRODUCTS, (suggestion) => {
      // apply directly instead of a full page navigation when possible
      const url = new URL(suggestion.href, window.location.origin);
      const params = url.searchParams;
      state.search = params.get('search') || '';
      state.types = (params.get('type') || '').split(',').filter(Boolean);
      applyAndRender();
      bannerInput.blur();
    });
  }

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
