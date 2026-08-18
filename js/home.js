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
    title: 'ZigZag Aluminium Gate',
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
    title: 'Alstone Elevation',
    style: 'modern',
    media: [
      {
        src: cloudinaryVideoUrl('v1787071428/SteelHub/Modern/Elevation/alstone_e0bpua.mov', { width: 900 }),
        type: 'video',
      }
    ],
  },
  {
    title: 'Degi Railing',
    style: 'classic',
    media: [
      {
        src: cloudinaryVideoUrl('v1787068985/SteelHub/Classic/Railings/railing_mkdvhs.mov', { width: 900 }),
        type: 'video',
      }
    ],
  },
  {
    title: 'UPVC Shed',
    style: 'sheds',
    media: [
      {
        src: cloudinaryVideoUrl('v1787071535/SteelHub/Shed/shed_erl6vs.mov', { width: 1200 }),
        type: 'video',
      }
    ],
  },
  {
    title: 'Spiral Staircase',
    style: 'modern',
    media: [
      {
        src: cloudinaryVideoUrl('v1787071335/SteelHub/staircase/spiralstairs_zeljt9.mov', { width: 900 }),
        type: 'video',
      }
    ],
  },
];

(function initTeaser() {
  const grid = document.getElementById('teaser-grid');
  if (!grid) return;

  function isVideoUrl(url) {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i.test(url) || /video\/upload/i.test(url);
  }

  function getMediaItems(item) {
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

  function getVideoMimeType(url) {
    return 'video/mp4';
  }

  function getBrowserVideoUrl(url) {
    if (!url) return '';

    try {
      const parsed = new URL(url, window.location.href);

      // Only modify Cloudinary video URLs.
      if (!parsed.hostname.includes('cloudinary.com')) {
        return url;
      }

      const path = parsed.pathname;

      // Only apply video transformations to /video/upload/ URLs.
      if (!path.includes('/video/upload/')) {
        return url;
      }

      // Avoid adding the transformation twice.
      if (
        path.includes('/f_mp4/') ||
        path.includes('/vc_h264/') ||
        path.includes('/ac_aac/')
      ) {
        return url;
      }

      // Add Cloudinary transformations immediately after /video/upload/
      parsed.pathname = path.replace(
        '/video/upload/',
        '/video/upload/f_mp4,vc_h264,ac_aac/'
      );

      return parsed.toString();

    } catch (error) {
      console.warn('Could not convert video URL:', url, error);
      return url;
    }
  }


  function renderMediaMarkup(entry, title) {
    if (!entry) {
      return `<div class="teaser-card__placeholder">No media</div>`;
    }

    if (entry.type === 'video') {
      const videoUrl = getBrowserVideoUrl(entry.src);

      return `
      <video
        muted
        autoplay
        playsinline
        loop
        preload="auto"
        class="teaser-card__video teaser-card__video--loading"
      >
        <source src="${videoUrl}" type="video/mp4">
      </video>
    `;
    }

    return `<img src="${entry.src}" alt="${title}" loading="lazy">`;
  }

  function setupCardVideo(video) {
    if (!video) return;

    const showVideo = () => {
      video.classList.remove('teaser-card__video--loading');
    };

    /*
     * Don't show anything while the video is loading.
     * Reveal it only when the browser has enough data
     * to actually display the video.
     */
    video.addEventListener('canplay', showVideo, { once: true });

    video.addEventListener('error', () => {
      // Keep the video invisible if it fails.
      video.classList.add('teaser-card__video--loading');
    }, { once: true });
  }

  let lightboxOverlay = null;
  let lightboxMedia = [];
  let lightboxCurrentIndex = 0;
  let lightboxItem = null;

  function ensureLightbox() {
    if (lightboxOverlay) return lightboxOverlay;

    lightboxOverlay = document.createElement('div');
    lightboxOverlay.id = 'teaser-lightbox';
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.setAttribute('hidden', 'hidden');

    lightboxOverlay.innerHTML = `
      <div class="lightbox-content">

        <button class="lightbox-close" aria-label="Close" type="button">✕</button>
        <div class="lightbox-media"></div>
        <div class="lightbox-controls">
          <button class="lb-prev" aria-label="Previous" type="button">◀</button>
          <button class="lb-next" aria-label="Next" type="button">▶</button>
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


    /*
     * VIDEO
     */
    if (entry.type === 'video') {

      const video = document.createElement('video');

      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';

      video.setAttribute('controlsList', 'nodownload');
      video.setAttribute('disablePictureInPicture', '');

      const source = document.createElement('source');

      // IMPORTANT:
      // Convert .mov/.mp4 Cloudinary URLs to browser-friendly MP4.
      source.src = getBrowserVideoUrl(entry.src);

      // Always tell the browser this is MP4.
      source.type = 'video/mp4';
      video.appendChild(source);

      // Successful loading
      video.addEventListener('loadedmetadata', () => {
        console.log('Lightbox video loaded:', source.src);
      }, { once: true });


      // Player error handling
      video.addEventListener('error', () => {
        const mediaError = video.error;
        console.warn('Teaser lightbox video failed:', source.src, mediaError);

        // Give the user a useful fallback instead of
        // leaving a completely blank lightbox.
        mediaWrap.innerHTML = `
          <div class="lightbox-video-error">
            <p>This video could not be played in this browser.</p>
            <a href="${source.src}" target="_blank" rel="noopener">Open video</a>
          </div>
        `;

      }, { once: true });


      mediaWrap.appendChild(video);

      // Start loading the converted Cloudinary video.
      video.load();

      // Autoplay is allowed because the video is muted.
      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === 'function') {

        playPromise.catch(() => {
          // Browser blocked autoplay.
          // Controls are still available to the user.
        });
      }
    } else {

      // IMAGE
      const img = document.createElement('img');
      img.src = entry.src;
      img.alt = lightboxItem ? lightboxItem.title : 'Teaser media';
      img.loading = 'eager';
      mediaWrap.appendChild(img);
    }
  }

  function changeLightboxItem(step) {
    if (!lightboxMedia.length) {
      return;
    }

    lightboxCurrentIndex = (
      lightboxCurrentIndex +
      step +
      lightboxMedia.length
    ) % lightboxMedia.length;

    renderLightboxMedia();
  }

  function buildLightbox(item, startIndex = 0) {
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


  function closeLightbox() {
    if (!lightboxOverlay) { return; }

    /*
     * Stop the current video before closing.
     * This prevents audio/video from continuing in
     * the background.
     */
    const video =
      lightboxOverlay.querySelector('video');

    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.querySelectorAll('source')
        .forEach(source => {
          source.removeAttribute('src');
        });
      video.load();
    }


    lightboxOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  function render(filter) {
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

        function renderCardMedia() {
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

          const video = mediaWrap.querySelector('video');
          if (video) { setupCardVideo(video); }
        }

        function startCarousel() {
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
(function initHomeSearch() {
  const input = document.getElementById('home-search');
  const suggestionsEl = document.getElementById('home-search-suggestions');
  if (!input || !suggestionsEl || typeof attachSearchDropdown !== 'function') return;
  attachSearchDropdown(input, suggestionsEl, PRODUCTS);
})();
