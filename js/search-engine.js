/* ==========================================================
   TFabCo -- SMART SEARCH ENGINE
   Shared by home.js (search bar dropdown) and products.js
   (catalog search + filtering).

   Handles three problems at once:
   1. User doesn't know English spelling      -> fuzzy matching (Levenshtein)
   2. User types in Punjabi (Gurmukhi script)  -> alias dictionary, exact lookup
   3. User types Romanized Punjabi/Hindi       -> alias dictionary, fuzzy lookup
      ("phatak", "sirhi", "jangla", etc.)

   Extend ALIASES to grow the vocabulary -- no other code needs to change.
   ========================================================== */

/* ---------- ALIAS DICTIONARY ----------
   key: canonical English term that actually appears in product
        name/type/style/tags in products-data.js
   value: array of alternate spellings, Gurmukhi words, Romanized
        Punjabi/Hindi words, and common misspellings customers might type
*/
const ALIASES = {
  // ---- product types ----
  gate:        ['gate','gaet','gett','geyt','gates','phatak','phattak','ਫਾਟਕ','ਗੇਟ','darwaza','darvaza','ਦਰਵਾਜ਼ਾ','entrance'],
  railing:     ['railing','railling','relling','raling','railng','grill','grille','jangla','jaangla','janglaa','ਜੰਗਲਾ','ਰੇਲਿੰਗ','balustrade','baluster'],
  staircase:   ['staircase','stair','stairs','stairecase','sirhi','seerhi','siri','seedi','ਪੌੜੀ','ਸੀੜ੍ਹੀ','pauri'],
  facade:      ['facade','elevation','elavation','elevetion','fasaad','chajja','chhajja','ਛੱਜਾ','saamna','samna','ਸਾਹਮਣਾ','cladding','cladeing','front','building front'],
  shed:        ['shed','sheds','shad','sed','tappar','tapra','ਟੱਪਰ','ਸ਼ੈੱਡ','canopy','cannopy','parking shed','car shed'],

  // ---- styles ----
  classic:     ['classic','classik','klassic','purana','purani','ਪੁਰਾਣਾ','traditional','old style'],
  modern:      ['modern','modren','naveen','ਨਵਾਂ','adhunik','ਆਧੁਨਿਕ','new style'],

  // ---- colors ----
  black:       ['black','blak','blck','kala','kaala','ਕਾਲਾ'],
  white:       ['white','whyte','wite','safed','safaid','chitta','ਚਿੱਟਾ','ਸਫ਼ੈਦ'],
  gold:        ['gold','golden','sunehri','sunehra','ਸੁਨਹਿਰੀ'],
  silver:      ['silver','silvar','chandi','chaandi','ਚਾਂਦੀ'],
  bronze:      ['bronze','bronz','copper','tamba','taamba','ਤਾਂਬਾ','kaansi','ਕਾਂਸੀ'],

  // ---- materials / general keywords (boost text search, not separate facets) ----
  steel:       ['steel','stel','loha','lohaa','ਲੋਹਾ','iron','ms','stainless'],
  stone:       ['stone','ston','patthar','pathar','ਪੱਥਰ'],
  glass:       ['glass','glas','sheesha','sheesa','ਸ਼ੀਸ਼ਾ'],
  balcony:     ['balcony','balkony','balcny'],
};

// Build a flat reverse lookup: alias string -> array of canonical terms it can mean
const ALIAS_LOOKUP = {};
Object.keys(ALIASES).forEach(canonical => {
  ALIASES[canonical].forEach(alias => {
    const key = alias.toLowerCase();
    if(!ALIAS_LOOKUP[key]) ALIAS_LOOKUP[key] = [];
    if(!ALIAS_LOOKUP[key].includes(canonical)) ALIAS_LOOKUP[key].push(canonical);
  });
  // canonical term should also map to itself
  const key = canonical.toLowerCase();
  if(!ALIAS_LOOKUP[key]) ALIAS_LOOKUP[key] = [];
  if(!ALIAS_LOOKUP[key].includes(canonical)) ALIAS_LOOKUP[key].push(canonical);
});

const ALL_ALIAS_KEYS = Object.keys(ALIAS_LOOKUP);

const CANONICAL_TO_TYPE = {
  gate: 'gates', railing: 'railings', staircase: 'staircases', facade: 'facades', shed: 'sheds',
};

function levenshtein(a, b){
  if(a === b) return 0;
  if(!a.length) return b.length;
  if(!b.length) return a.length;
  const prev = new Array(b.length + 1);
  for(let j = 0; j <= b.length; j++) prev[j] = j;
  for(let i = 1; i <= a.length; i++){
    let curr = [i];
    for(let j = 1; j <= b.length; j++){
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j-1] + 1, prev[j-1] + cost);
    }
    prev.splice(0, prev.length, ...curr);
  }
  return prev[b.length];
}

// Allowed typo distance scales with word length (short words get less leeway)
function fuzzyThreshold(len){
  if(len <= 3) return 0;
  if(len <= 5) return 1;
  if(len <= 8) return 2;
  return 3;
}

/* ---------- NORMALIZE ---------- */
function normalize(str){
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ');
}

/* ---------- EXPAND A RAW QUERY INTO CANONICAL TERMS ----------
   Returns { tokens: [...raw tokens], canonical: Set of matched canonical terms,
             translations: [{from, to}] for showing "phatak → Gate" hints }
*/
function expandQuery(rawQuery){
  const cleaned = normalize(rawQuery);
  const tokens = cleaned.split(' ').filter(Boolean);
  const canonical = new Set();
  const translations = [];

  tokens.forEach(token => {
    // 1. exact alias match (handles Gurmukhi directly — no fuzzy matching needed/possible there)
    if(ALIAS_LOOKUP[token]){
      ALIAS_LOOKUP[token].forEach(c => canonical.add(c));
      if(token !== ALIAS_LOOKUP[token][0]){
        translations.push({ from: token, to: ALIAS_LOOKUP[token][0] });
      }
      return;
    }
    // 2. fuzzy match against Romanized alias keys (skip very short/Gurmukhi tokens)
    const isLatin = /^[a-z0-9]+$/i.test(token);
    if(isLatin && token.length >= 3){
      let best = null;
      let bestDist = Infinity;
      for(const key of ALL_ALIAS_KEYS){
        if(!/^[a-z0-9]+$/i.test(key)) continue;
        if(Math.abs(key.length - token.length) > 3) continue;
        const dist = levenshtein(token, key);
        if(dist < bestDist){ bestDist = dist; best = key; }
      }
      if(best && bestDist <= fuzzyThreshold(token.length)){
        ALIAS_LOOKUP[best].forEach(c => canonical.add(c));
        translations.push({ from: token, to: ALIAS_LOOKUP[best][0] });
      }
    }
  });

  return { tokens, canonical, translations };
}

/* ---------- SCORE A PRODUCT AGAINST AN EXPANDED QUERY ---------- */
function productSearchText(product){
  return normalize([
    product.name, product.type, product.style,
    ...(product.colors || []), ...(product.tags || [])
  ].join(' '));
}

function scoreProduct(product, expanded, rawCleaned){
  if(!rawCleaned) return 1;
  const text = productSearchText(product);
  let score = 0;

  // whole-phrase substring match is the strongest signal
  if(text.includes(rawCleaned)) score += 5;

  expanded.tokens.forEach(token => {
    if(text.includes(token)) score += 3;
  });

  expanded.canonical.forEach(term => {
    if(text.includes(term)) score += 4;
    if(product.type === CANONICAL_TO_TYPE[term] || product.style === term) score += 3;
    if((product.colors || []).includes(term)) score += 3;
  });

  return score;
}

/* ---------- PUBLIC: SEARCH PRODUCTS ---------- */
function searchProducts(rawQuery, productList){
  const cleaned = normalize(rawQuery);
  const expanded = expandQuery(rawQuery);
  if(!cleaned) return productList.map(p => ({ product: p, score: 1 }));

  return productList
    .map(p => ({ product: p, score: scoreProduct(p, expanded, cleaned) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/* ---------- PUBLIC: LIVE SUGGESTIONS (for the dropdown) ----------
   Returns an ordered list of suggestion objects:
   { kind: 'translation' | 'category' | 'product' | 'raw', label, sublabel, href }
*/
function getSuggestions(rawQuery, productList, limit){
  limit = limit || 7;
  const cleaned = normalize(rawQuery);
  const suggestions = [];
  if(!cleaned) return suggestions;

  const expanded = expandQuery(rawQuery);

  // 1. translation hints — show what we understood the query as
  expanded.translations.slice(0, 2).forEach(t => {
    const label = TYPE_LABELS[CANONICAL_TO_TYPE[t.to]] || (t.to[0].toUpperCase() + t.to.slice(1));
    suggestions.push({
      kind: 'translation',
      label: `${rawQuery.trim()} -> ${label}`,
      sublabel: 'Did you mean this?',
      href: `products.html?search=${encodeURIComponent(t.to)}`,
    });
  });

  // 2. category matches (type facets specifically)
  const matchedTypes = new Set();
  expanded.canonical.forEach(term => {
    if(CANONICAL_TO_TYPE[term]) matchedTypes.add(CANONICAL_TO_TYPE[term]);
  });
  matchedTypes.forEach(typeKey => {
    const count = productList.filter(p => p.type === typeKey).length;
    if(count > 0){
      suggestions.push({
        kind: 'category',
        label: TYPE_LABELS[typeKey],
        sublabel: `${count} product${count === 1 ? '' : 's'}`,
        href: `products.html?type=${typeKey}`,
      });
    }
  });

  // 3. top matching products
  const results = searchProducts(rawQuery, productList).slice(0, limit);
  results.forEach(r => {
    suggestions.push({
      kind: 'product',
      label: r.product.name,
      sublabel: TYPE_LABELS[r.product.type],
      href: `products.html?search=${encodeURIComponent(r.product.name)}`,
    });
  });

  // 4. always offer a raw "search for everything" fallback
  suggestions.push({
    kind: 'raw',
    label: `Search for "${rawQuery.trim()}"`,
    sublabel: `${results.length} result${results.length === 1 ? '' : 's'}`,
    href: `products.html?search=${encodeURIComponent(rawQuery.trim())}`,
  });

  // de-duplicate by label, keep first occurrence, cap to limit
  const seen = new Set();
  return suggestions.filter(s => {
    if(seen.has(s.label)) return false;
    seen.add(s.label);
    return true;
  }).slice(0, limit);
}

function attachSearchDropdown(inputEl, listEl, productList, onSelect){
  let activeIndex = -1;
  let currentSuggestions = [];

  function iconFor(kind){
    if(kind === 'translation') return 'TR';
    if(kind === 'category') return 'CAT';
    if(kind === 'raw') return 'GO';
    return '-';
  }

  function render(suggestions){
    currentSuggestions = suggestions;
    activeIndex = -1;
    listEl.innerHTML = '';
    if(!suggestions.length){
      listEl.classList.remove('is-open');
      return;
    }
    suggestions.forEach((s, i) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'search-suggestion suggestion-' + s.kind;
      item.setAttribute('role', 'option');
      item.dataset.index = i;
      item.innerHTML = `
        <span class="ss-icon" aria-hidden="true">${iconFor(s.kind)}</span>
        <span class="ss-text"><span class="ss-label">${s.label}</span><span class="ss-sublabel">${s.sublabel || ''}</span></span>
      `;
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        select(s);
      });
      listEl.appendChild(item);
    });
    listEl.classList.add('is-open');
  }

  function select(suggestion){
    listEl.classList.remove('is-open');
    if(onSelect){ onSelect(suggestion); }
    else if(suggestion.href){ window.location.href = suggestion.href; }
  }

  function setActive(idx){
    const items = listEl.querySelectorAll('.search-suggestion');
    items.forEach(el => el.classList.remove('is-active'));
    if(idx >= 0 && items[idx]){
      items[idx].classList.add('is-active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
    activeIndex = idx;
  }

  inputEl.addEventListener('input', () => {
    render(getSuggestions(inputEl.value, productList));
  });

  inputEl.addEventListener('keydown', (e) => {
    if(!listEl.classList.contains('is-open')) return;
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      setActive(Math.min(activeIndex + 1, currentSuggestions.length - 1));
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if(e.key === 'Enter'){
      if(activeIndex >= 0 && currentSuggestions[activeIndex]){
        e.preventDefault();
        select(currentSuggestions[activeIndex]);
      }
    } else if(e.key === 'Escape'){
      listEl.classList.remove('is-open');
    }
  });

  inputEl.addEventListener('blur', () => {
    setTimeout(() => listEl.classList.remove('is-open'), 120);
  });
  inputEl.addEventListener('focus', () => {
    if(inputEl.value.trim()) render(getSuggestions(inputEl.value, productList));
  });
}
