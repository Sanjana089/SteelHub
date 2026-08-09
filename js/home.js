/* ==========================================================
   HOME PAGE -- Projects teaser grid + local filter tabs + smart search
   ========================================================== */

const TEASER_ITEMS = [
  {
    title: 'Jaipur Style Gate',
    style: 'classic',
    media: [
      {
        src: cloudinaryUrl('v1783702258/SteelHub/Classic/Gates/66_pbvkxf', { width: 900 }),
        type: 'image',
      },
      {
        src: cloudinaryVideoUrl('v1784744306/SteelHub/Classic/Gates/IMG_7902_lygn3k.mov', { width: 1200 }),
        type: 'video',
      },
      {
        src: cloudinaryUrl('v1786087325/SteelHub/Classic/Gates/c1_mkfpwi', { width: 900 }),
        type: 'image',
      }
    ],
  },
  {
    title: 'Degi Gate',
    style: 'classic',
    media: [
      {
        src: cloudinaryUrl('v1786087704/SteelHub/Classic/Gates/c2_lpjwlm', { width: 900 }),
        type: 'image',
      },
      {
        src: cloudinaryVideoUrl('v1786087638/SteelHub/Classic/Gates/c2_uxoxgy.mov', { width: 900 }),
        type: 'video',
      },
    ],
  },
  {
    title: 'Triangular Comb Design',
    style: 'modern',
    media: [
      {
        src: cloudinaryUrl('v1783609314/SteelHub/Modern/Gates/36_hrzrwb', { width: 900 }),
        type: 'image',
      },
      {
        src: cloudinaryVideoUrl('v1786088426/SteelHub/Modern/Gates/m1_zo4it5.mov', { width: 900 }),
        type: 'video',
      }
    ],
  },
  {
    title: 'Black Shingles',
    style: 'classic',
    media: [
      {
        src: cloudinaryUrl('v1786089565/SteelHub/Classic/Rooftop/c4_ha1y2i', { width: 900 }),
        type: 'image',
      },
      {
        src: cloudinaryVideoUrl('v1786089563/SteelHub/Classic/Rooftop/c4_jeuejc.mp4', { width: 900 }),
        type: 'video',
      }
    ],
  },
  {
    title: 'HPL Facade Panel',
    style: 'modern',
    media: [
      'https://res.cloudinary.com/dvcrmkuca/image/upload/f_auto,q_auto,w_900/v1783702258/SteelHub/Modern/Facade/facade-hpl-1',
    ],
  },
  {
    title: 'Stone Clad Facade',
    style: 'classic',
    media: [
      'https://res.cloudinary.com/dvcrmkuca/image/upload/f_auto,q_auto,w_900/v1783702258/SteelHub/Classic/Facade/stone-facade-1',
      'https://res.cloudinary.com/dvcrmkuca/image/upload/f_auto,q_auto,w_900/v1783702258/SteelHub/Classic/Facade/stone-facade-2',
    ],
  },
  {
    title: 'Car Parking Shed',
    style: 'sheds',
    media: [
      'https://res.cloudinary.com/dvcrmkuca/image/upload/f_auto,q_auto,w_900/v1783702258/SteelHub/Sheds/parking-1',
      'https://res.cloudinary.com/dvcrmkuca/video/upload/f_auto,q_auto,w_1200/v1783702258/SteelHub/Sheds/parking-clip',
    ],
  },
  {
    title: 'Spiral Staircase',
    style: 'classic',
    media: [
      'https://res.cloudinary.com/dvcrmkuca/image/upload/f_auto,q_auto,w_900/v1783702258/SteelHub/Classic/Stairs/spiral-1',
      'https://res.cloudinary.com/dvcrmkuca/image/upload/f_auto,q_auto,w_900/v1783702258/SteelHub/Classic/Stairs/spiral-2',
    ],
  },
];

(function initTeaser(){
  const grid = document.getElementById('teaser-grid');
  if(!grid) return;

  function isVideoUrl(url){
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i.test(url) || /video\/upload/i.test(url);
  }

  function getMediaItems(item){
    const raw = Array.isArray(item.media) && item.media.length ? item.media : (item.images || []);
    const list = (raw || []).map((entry) => {
      if (typeof entry === 'string') return { src: entry, type: isVideoUrl(entry) ? 'video' : 'image' };
      if (entry && typeof entry === 'object') {
        const src = entry.src || entry.url || entry.image || entry.video || '';
        if (!src) return null;
        return {
          src,
          type: (entry.type || (isVideoUrl(src) ? 'video' : 'image')).toLowerCase(),
        };
      }
      return null;
    }).filter(Boolean);

    return list;
  }

  function getVideoMimeType(url){
    if (!url) return 'video/mp4';
    const path = String(url).split('?')[0];
    if (/\.mov(?:$|\?)/i.test(path) || /\.qt(?:$|\?)/i.test(path)) return 'video/quicktime';
    if (/\.mp4(?:$|\?)/i.test(path)) return 'video/mp4';
    if (/\.webm(?:$|\?)/i.test(path)) return 'video/webm';
    if (/\.ogg(?:$|\?)/i.test(path) || /\.ogv(?:$|\?)/i.test(path)) return 'video/ogg';
    return 'video/mp4';
  }

  function renderMediaMarkup(entry, title){
    if (!entry) {
      return `<div class="teaser-card__placeholder">No media</div>`;
    }

    if (entry.type === 'video') {
      return `
        <video
          muted
          autoplay
          playsinline
          loop
          preload="metadata"
          crossorigin="anonymous"
        >
          <source src="${entry.src}" type="${getVideoMimeType(entry.src)}">
        </video>
      `;
    }

    return `<img src="${entry.src}" alt="${title}" loading="lazy">`;
  }

  let lightboxOverlay = null;
  let lightboxMedia = [];
  let lightboxCurrentIndex = 0;
  let lightboxItem = null;

  function ensureLightbox(){
    if (lightboxOverlay) return lightboxOverlay;

    lightboxOverlay = document.createElement('div');
    lightboxOverlay.id = 'teaser-lightbox';
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.setAttribute('hidden', 'hidden');
    lightboxOverlay.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">✕</button>
        <div class="lightbox-media"></div>
        <div class="lightbox-controls">
          <button class="lb-prev" aria-label="Previous">◀</button>
          <button class="lb-next" aria-label="Next">▶</button>
        </div>
      </div>
    `;

    document.body.appendChild(lightboxOverlay);

    lightboxOverlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (event) => {
      if (event.target === lightboxOverlay) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightboxOverlay || lightboxOverlay.hidden) return;
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        changeLightboxItem(1);
      } else if (event.key === 'ArrowLeft') {
        changeLightboxItem(-1);
      }
    });

    return lightboxOverlay;
  }

  function renderLightboxMedia(){
    const mediaWrap = lightboxOverlay.querySelector('.lightbox-media');
    if (!mediaWrap) return;

    if (!lightboxMedia.length) {
      mediaWrap.innerHTML = '<div class="lightbox-empty">No media available</div>';
      return;
    }

    const entry = lightboxMedia[lightboxCurrentIndex];
    mediaWrap.innerHTML = '';

    if (entry.type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.crossOrigin = 'anonymous';
      video.setAttribute('controlsList', 'nodownload');

      const source = document.createElement('source');
      source.src = entry.src;
      source.type = getVideoMimeType(entry.src);
      video.appendChild(source);

      video.addEventListener('error', () => {
        console.warn('Teaser lightbox video failed to load:', entry.src);
      }, { once: true });

      mediaWrap.appendChild(video);
      video.load();
    } else {
      const img = document.createElement('img');
      img.src = entry.src;
      img.alt = lightboxItem ? lightboxItem.title : 'Teaser media';
      img.loading = 'eager';
      mediaWrap.appendChild(img);
    }
  }

  function changeLightboxItem(step){
    if (!lightboxMedia.length) return;
    lightboxCurrentIndex = (lightboxCurrentIndex + step + lightboxMedia.length) % lightboxMedia.length;
    renderLightboxMedia();
  }

  function buildLightbox(item, startIndex = 0){
    ensureLightbox();

    lightboxItem = item;
    lightboxMedia = getMediaItems(item);
    lightboxCurrentIndex = Math.max(0, Math.min(startIndex || 0, lightboxMedia.length - 1));

    const prevBtn = lightboxOverlay.querySelector('.lb-prev');
    const nextBtn = lightboxOverlay.querySelector('.lb-next');

    prevBtn.onclick = () => changeLightboxItem(-1);
    nextBtn.onclick = () => changeLightboxItem(1);

    renderLightboxMedia();
    lightboxOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    if (!lightboxOverlay) return;
    lightboxOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  function render(filter){
    grid.innerHTML = '';

    TEASER_ITEMS
      .filter(item => filter === 'all' || item.style === filter)
      .slice(0, 8)
      .forEach((item) => {
        const media = getMediaItems(item);

        const card = document.createElement('a');
        card.href = '#';
        card.className = 'teaser-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Open ${item.title} media`);

        card.innerHTML = `
          <div class="teaser-card__media"></div>
          <span class="teaser-caption">${item.title}</span>
        `;

        let currentIndex = 0;
        let carouselInterval = null;

        function renderCardMedia(){
          const mediaWrap = card.querySelector('.teaser-card__media');
          if (!mediaWrap) return;

          const entry = media[currentIndex] || media[0];
          const dotsMarkup = media.length > 1
            ? `<div class="teaser-card__dots" aria-label="Media carousel">${media.map((_, idx) => `
                <span class="teaser-card__dot ${idx === currentIndex ? 'is-active' : ''}"></span>
              `).join('')}</div>`
            : '';

          mediaWrap.innerHTML = `
            <div class="teaser-card__media-stage">
              ${renderMediaMarkup(entry, item.title)}
            </div>
            ${dotsMarkup}
          `;
        }

        function startCarousel(){
          if (media.length <= 1) return;
          clearInterval(carouselInterval);
          carouselInterval = window.setInterval(() => {
            currentIndex = (currentIndex + 1) % media.length;
            renderCardMedia();
          }, 4000);
        }

        renderCardMedia();
        startCarousel();

        card.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        card.addEventListener('mouseleave', startCarousel);

        card.addEventListener('click', (event) => {
          event.preventDefault();
          buildLightbox(item, currentIndex);
        });

        card.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            buildLightbox(item, currentIndex);
          }
        });

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
