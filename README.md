# TFabCo — Multi-Page Website

Plain HTML/CSS/JS — real pages (`index.html`, `products.html`), no build step, no framework, no npm install required. Deploys to Netlify instantly.

## Folder structure

```
tfabco-site/
├── index.html                 Home page
├── products.html               Full catalog page (filters + smart search)
├── public/
│   └── images/
│       └── logo.svg            <- YOUR LOGO GOES HERE (placeholder provided)
├── css/
│   ├── base.css                 Design tokens + shared components (buttons, cards,
│   │                            header, footer, modal, search dropdown)
│   ├── home.css                 Home-page-only layout
│   └── products.css             Products-page-only layout (sidebar, product grid)
├── js/
│   ├── main.js                  Shared: sticky header, mobile menu, ripple effect,
│   │                            modal system, Call button device detection,
│   │                            Netlify form AJAX submit
│   ├── products-data.js         Placeholder product catalog + Cloudinary URL builder
│   ├── search-engine.js         Smart search: Punjabi/English alias dictionary,
│   │                            fuzzy typo matching, suggestion builder, dropdown UI
│   ├── home.js                  Home page: projects teaser, wires the search dropdown
│   └── products.js              Catalog page: filtering, rendering, wires the search dropdown
└── README.md
```

Everything is loaded via plain `<script src="...">` tags in this order (already set up in both HTML files): `main.js` → `products-data.js` → `search-engine.js` → `home.js` / `products.js`. Keep that order if you add more scripts — later files depend on globals (`PRODUCTS`, `TYPE_LABELS`, `searchProducts`, etc.) defined in earlier ones.

## Deploy to Netlify (free)

**Drag and drop (fastest):** go to https://app.netlify.com/drop and drag the whole folder in.

**Git-connected (recommended):** push to GitHub/GitLab → Netlify → "Add new site" → "Import an existing project" → build command blank, publish directory `/`.

---

## Smart search (Punjabi + English + typo-tolerant)

Your customers can type almost anything and still land on the right products — in the live dropdown *and* in the actual filtered results:

- **English, misspelled**: "raling", "gaet", "moddern" → still matches Railings / Gates / Modern
- **Romanized Punjabi**: "phatak", "sirhi", "jangla", "chajja", "tappar" → matches Gate / Staircase / Railing / Facade / Shed
- **Gurmukhi script**: ਫਾਟਕ, ਪੌੜੀ, ਛੱਜਾ, ਟੱਪਰ → matched directly
- **Combinations**: "jangla kala" (railing + black), "gaet moddern" (gate + modern typo)

As the user types, the dropdown shows (in order): a translation hint if we understood a non-English/misspelled word ("phatak → Gates"), matching categories, matching individual products, and a "Search for '...'" fallback. Selecting any option jumps to (or, on the products page, directly filters) the catalog.

**How it works** (all in `js/search-engine.js`, no external API or backend):
1. `ALIASES` — a dictionary mapping canonical English terms (gate, railing, staircase, facade, shed, classic, modern, colors, materials) to every alternate spelling, Romanized Punjabi word, and Gurmukhi word you want recognized.
2. Exact lookups handle Gurmukhi instantly. For Latin-script input, a Levenshtein-distance fuzzy match catches typos and unlisted spellings.
3. `searchProducts()` scores and ranks the catalog; `getSuggestions()` builds the dropdown list; `attachSearchDropdown()` wires any `<input>` + empty container into a fully keyboard-navigable live dropdown.

**To teach it new words**: open `js/search-engine.js` and add entries to the `ALIASES` object — e.g. add more Gurmukhi spellings, regional terms, or a brand name customers use. No other file needs to change.

---

## Cloudinary image integration

Product and hero images are served from Cloudinary rather than bundled with the site.

- **Config**: `js/products-data.js` → `CLOUDINARY.cloudName` (currently `'dvcrmkuca'` from your sample URL — replace with your own).
- **Per-product images**: each entry in the `PRODUCTS` array has an `image` field holding a Cloudinary **public ID** (e.g. `'v1721586155/tech-rev_ybejet'`), not a full URL. Upload your photo to Cloudinary, copy its public ID, and paste it into that product's `image` field.
- **Helper function**: `cloudinaryUrl(publicId, { width })` builds the actual delivery URL with `f_auto,q_auto` (automatic format + quality) so images stay optimized without any manual resizing. Used in `js/products.js` when rendering each product card.
- **Fallback**: if a Cloudinary image 404s (e.g. a public ID hasn't been set yet), the product card automatically falls back to a generated line-pattern graphic so the layout never breaks.
- **Hero images** on the home page are hardcoded `<img>` tags built the same way — search `index.html` for `res.cloudinary.com` and swap the public ID after `/upload/f_auto,q_auto,w_900,c_fill/`.

## Logo

A placeholder logo (`public/images/logo.svg`) sits in the **top right of the header** on every page. Replace that file with your real logo — keep the filename `logo.svg`, or update the `<img src="public/images/logo.svg">` line in the header of both `index.html` and `products.html` if you rename it.

## Hero section fix

The earlier version put a solid white box behind the headline text, which looked out of place over a photo. It's now a full-width dark gradient overlay (`.hero-overlay` in `css/home.css`) sitting between the photos and the text, with white text and a soft shadow — the headline reads clearly against any photo without a jarring white block.

## What changed from the previous version

- **Facades replaces Interiors** — "Interiors" is removed everywhere (nav, filters, search, product data); "Elevation Cladding" is renamed to **Facades** throughout (type value `facades`).
- **Color filter removed** — the sidebar Color swatches and the `?color=` URL parameter are gone. Products still store a `colors` array (used lightly by search, e.g. "black gate"), but there's no dedicated color filter UI anymore.
- **Cloudinary wired in** — see above.
- **Logo added** — top right of the sticky header.
- **Hero fixed** — no more white text box.
- **Smart search** — full rewrite of search from plain substring matching to fuzzy + Punjabi-aware matching with a live dropdown.

## What to replace before publishing

- **Business details**: `js/main.js` → the `BUSINESS` object at the top (phone, WhatsApp, email, address, hours) — auto-populates everywhere.
- **Logo**: `public/images/logo.svg`.
- **Cloudinary cloud name + product images**: `js/products-data.js`.
- **Hero photos**: two `<img>` tags in `index.html`'s hero section.
- **Product catalog**: the `PRODUCTS` array in `js/products-data.js` — add/remove/edit freely; filters and search rebuild automatically.
- **Search vocabulary**: `js/search-engine.js` → `ALIASES`, if you want more regional terms recognized.

## Reusable components

- `.btn` / `.btn-primary` / `.btn-dark` / `.btn-outline` / `.btn-ghost` — buttons with hover lift + click ripple
- `.card` / `.card-glass` / `.card-dark-glass` — cards, incl. translucent variants
- `.modal-overlay` + `.modal` — any popup (duplicate the Estimate modal's structure for a new one)
- `.search-wrap` + `.search-suggestions` + `attachSearchDropdown()` — drop this trio anywhere you want a smart search box
