# TFabCo — Multi-Page Website

Plain HTML/CSS/JS — two real pages (`index.html`, `products.html`), no build step, no framework, no npm install required. Deploys to Netlify instantly.

## Why not React/a framework?

You need working filters, a separate products page, popovers, and Netlify Forms. All of that is fully achievable — and more robust to hand off — as a static multi-page site: real URLs for each page, filters that update the URL (shareable/bookmarkable), and forms that Netlify auto-detects with zero backend. If down the line you want features that genuinely need a framework (user accounts, a live database of products, a CMS), that's a bigger step up and worth a separate conversation — this build gives you everything on your list today.

## Deploy to Netlify (free)

**Drag and drop (fastest):**
1. Go to https://app.netlify.com/drop
2. Drag the whole project folder in.
3. You get a live URL immediately.

**Git-connected (recommended so you can keep editing):**
1. Push this folder to a GitHub/GitLab repo.
2. Netlify → "Add new site" → "Import an existing project" → pick the repo.
3. Build command: leave blank. Publish directory: `/`.
4. Every `git push` auto-deploys.

## Structure

```
index.html            → Home page (hero, search, services, materials, projects teaser, testimonials, about, contact)
products.html         → Full catalog page — filters, search results, live URL sync
css/
  base.css            → Design tokens (colors, type) + reusable components: buttons, cards, header, footer, modal, form fields
  home.css            → Home-page-only layout
  products.css        → Products-page-only layout (sidebar filters, product grid)
js/
  main.js             → Shared behavior on every page: sticky header, mobile menu, button ripple effect, modal system, Call button device detection, Netlify form AJAX submit
  home.js             → Home page projects teaser + local filter tabs
  products-data.js     → Placeholder product catalog (array) — replace with real products
  products.js         → Filtering, search, URL sync, rendering for the catalog page
```

## What to replace before publishing

- **Business details**: open `js/main.js`, edit the `BUSINESS` object at the top (phone, WhatsApp number, email, address, hours). These auto-populate everywhere via `data-business` attributes — you only need to change them in one place.
- **Company name/logo**: "TFabCo" appears in the `.brand` element in both HTML files — replace text or swap in an `<img>` logo.
- **Real photos**: every image is currently a generated placeholder (hero split panels, product cards, map). Search for `Placeholder photo` / `img-tag` / `product-media` and swap in real `<img>` tags — the CSS classes will keep them fitted correctly.
- **Product catalog**: edit the `PRODUCTS` array in `js/products-data.js`. Each entry needs `type`, `style`, `colors`, `tags` (used by search) — the grid and filters rebuild automatically from this array, no other code changes needed.
- **Google Map**: replace the `.map-placeholder` div in `index.html` with a real Google Maps `<iframe>` embed.

## How the interactive pieces work

- **Search**: the home and products search bars are plain `<form method="GET" action="products.html">` — no JS needed for the redirect itself. `products.js` reads `?search=` from the URL on load and pre-filters.
- **Explore Classic / Explore Modern**: link to `products.html?style=classic` / `?style=modern`.
- **Filters (style, color, type)**: clicking any filter updates `state`, re-renders the grid, and rewrites the URL query string (via `history.replaceState`) — so a filtered view can be bookmarked or shared as a link.
- **Call button**: on mobile (detected via user agent + touch/screen-size check) it's a normal `tel:` link that opens the native dialer. On desktop, JS intercepts the click and opens a contact popover instead. Logic lives in `initCallButtons()` in `main.js`.
- **WhatsApp button**: always opens `https://wa.me/<number>` — works on both mobile (opens the app) and desktop (opens WhatsApp Web).
- **Get an Estimate**: opens a modal with a short form. The form has `data-netlify="true"` and submits via `fetch()` to avoid a page reload (see `initNetlifyForms()` in `main.js`); Netlify picks up submissions automatically once deployed — check your Netlify dashboard under **Forms**. There's also a hidden static copy of the form at the top of `index.html` so Netlify's build-time bot detects it (required once per site — no need to duplicate it further).
- **Sticky header/footer**: header uses `position: sticky; top: 0`, the yellow CTA bar uses `position: fixed; bottom: 0` — both stay visible while scrolling on every page.

## Customizing the look

All colors and fonts are CSS variables at the top of `css/base.css` under `:root` — change them once and they apply everywhere (buttons, header, chips, etc.):

```css
--yellow: #feda15;
--black: #000000;
--charcoal: #383838;
--white: #ffffff;
--mist: #d2dddb;
```

Reusable component classes you can drop in anywhere:
- `.btn .btn-primary` / `.btn-dark` / `.btn-outline` / `.btn-ghost` — buttons (with built-in hover lift + click ripple)
- `.card` / `.card-glass` / `.card-dark-glass` — cards, including the translucent glass variants
- `.modal-overlay` + `.modal` — any popup (duplicate the Estimate modal's HTML structure for a new one)
