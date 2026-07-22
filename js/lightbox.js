/* Simple product lightbox with share/download/copy actions */
(function(){
  // create modal DOM
  const tpl = document.createElement('div');
  tpl.innerHTML = `
    <div id="product-lightbox" class="lightbox-overlay" hidden>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">✕</button>
        <div class="lightbox-media"></div>
        <div class="lightbox-controls">
          <button class="lb-prev" aria-label="Previous">◀</button>
          <button class="lb-next" aria-label="Next">▶</button>
          <div class="lb-actions">
            <button class="lb-share">Share</button>
            <a class="lb-download" download>Download</a>
            <button class="lb-copy">Copy URL</button>
          </div>
        </div>
      </div>
    </div>
  `;
  const lightboxEl = tpl.firstElementChild;
  document.body.appendChild(lightboxEl);

  // Use the element reference directly (safer than getElementById) and
  // guard against missing nodes so the script doesn't throw and block page.
  const overlay = lightboxEl;
  const mediaWrap = overlay ? overlay.querySelector('.lightbox-media') : null;
  const closeBtn = overlay ? overlay.querySelector('.lightbox-close') : null;
  const prevBtn = overlay ? overlay.querySelector('.lb-prev') : null;
  const nextBtn = overlay ? overlay.querySelector('.lb-next') : null;
  const shareBtn = overlay ? overlay.querySelector('.lb-share') : null;
  const downloadLink = overlay ? overlay.querySelector('.lb-download') : null;
  const copyBtn = overlay ? overlay.querySelector('.lb-copy') : null;

  let currentProduct = null;
  let currentIndex = 0;
  let currentCatalog = null;
  let currentProductIndex = -1;

  function findCatalog(){
    if(Array.isArray(currentCatalog) && currentCatalog.length) return currentCatalog;
    if(Array.isArray(window.productCatalog) && window.productCatalog.length) return window.productCatalog;
    if(Array.isArray(window.products) && window.products.length) return window.products;
    return null;
  }

  function locateProductIndex(product, catalog){
    if(!catalog || !product) return -1;
    return catalog.findIndex((item)=>{
      if(item === product) return true;
      if(item && product && item.id && product.id && item.id === product.id) return true;
      if(item && product && item.handle && product.handle && item.handle === product.handle) return true;
      if(item && product && item.url && product.url && item.url === product.url) return true;
      return false;
    });
  }

  function setCatalogFor(product){
    const catalog = findCatalog();
    if(!catalog){
      currentCatalog = null;
      currentProductIndex = -1;
      return;
    }
    currentCatalog = catalog;
    currentProductIndex = locateProductIndex(product, catalog);
    if(currentProductIndex === -1){
      currentProductIndex = Math.max(0, catalog.indexOf(product));
    }
    if(currentProductIndex === -1){
      currentProductIndex = 0;
    }
  }

  function getProductImageCount(product){
    if(!product) return 0;
    if(product.images && product.images.length) return product.images.length;
    if(product.image) return 1;
    return 0;
  }

  function showProduct(productIndex, imageIndex = 0){
    const catalog = findCatalog();
    if(!catalog || !catalog.length) return;
    currentProductIndex = (productIndex + catalog.length) % catalog.length;
    currentProduct = catalog[currentProductIndex];
    currentIndex = Math.max(0, imageIndex || 0);
    buildMedia(currentProduct);
  }

  function showToast(message){
    let toast = document.getElementById('lightbox-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'lightbox-toast';
      toast.className = 'lightbox-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(()=>{
      toast.classList.remove('show');
      toast.classList.add('hide');
    }, 2500);
  }

  function buildMedia(product){
    const imgs = (product.images && product.images.length) ? product.images : (product.image ? [product.image] : []);

    function getImageUrl(id){
      try{
        if(typeof cloudinaryUrl === 'function') return cloudinaryUrl(id, { width: 1400 });
      }catch(e){}
      if(window.CLOUDINARY && CLOUDINARY.cloudName) return `https://res.cloudinary.com/${CLOUDINARY.cloudName}/image/upload/f_auto,q_auto,w_1400/${id}`;
      if(typeof id === 'string' && (id.startsWith('http://') || id.startsWith('https://'))) return id;
      return '';
    }

    if(!mediaWrap){
      console.error('Lightbox: .lightbox-media element not found');
      return;
    }

    mediaWrap.innerHTML = imgs.map((id,i)=>{
      const url = getImageUrl(id);
      // add onerror so a failed image doesn't break the layout
      return `<img src="${url}" data-index="${i}" alt="${product.name} ${i+1}" loading="lazy" onerror="this.style.display='none'">`;
    }).join('');
    // show only selected
    const imgEls = Array.from(mediaWrap.querySelectorAll('img'));
    imgEls.forEach((el,i)=> el.style.display = (i===currentIndex)?'block':'none');
    updateDownload();
  }

  function updateDownload(){
    if(!mediaWrap || !downloadLink) return;
    const cur = mediaWrap.querySelector(`img[data-index="${currentIndex}"]`);
    if(cur){
      // Create a data URL for download
      try{
        downloadLink.href = cur.src;
        downloadLink.setAttribute('download', `${currentProduct.name.replace(/[^a-z0-9]+/gi,'_')}_${currentIndex+1}.jpg`);
      }catch(e){}
    }
  }

  function open(product, start=0){
    try{
      currentProduct = product; currentIndex = start || 0;
      setCatalogFor(product);
      buildMedia(product);
    }catch(err){
      console.error('Lightbox buildMedia error', err);
    }
    // always show overlay even if media failed so user can close it
    try{ overlay.hidden = false; }catch(e){}
    try{ overlay.setAttribute('tabindex','-1'); overlay.focus(); }catch(e){}
    try{ document.body.style.overflow = 'hidden'; }catch(e){}
    setTimeout(()=> { try{ overlay.classList.add('is-open'); }catch(e){} }, 10);
  }

  function close(){
    try{ overlay.classList.remove('is-open'); }catch(e){}
    try{ document.body.style.overflow = ''; }catch(e){}
    try{ setTimeout(()=> overlay.hidden = true, 220); }catch(e){}
  }

  function showIndex(i){
    if(!mediaWrap) return;
    const imgEls = Array.from(mediaWrap.querySelectorAll('img'));
    if(!imgEls.length) return;

    if(i < 0){
      const catalog = findCatalog();
      if(catalog && currentProductIndex > -1){
        const prevProductIndex = (currentProductIndex - 1 + catalog.length) % catalog.length;
        const prevProduct = catalog[prevProductIndex];
        if(prevProduct){
          const prevCount = getProductImageCount(prevProduct);
          showProduct(prevProductIndex, Math.max(0, prevCount - 1));
          return;
        }
      }
      currentIndex = (i + imgEls.length) % imgEls.length;
    } else if(i >= imgEls.length){
      const catalog = findCatalog();
      if(catalog && currentProductIndex > -1){
        showProduct((currentProductIndex + 1) % catalog.length, 0);
        return;
      }
      currentIndex = i % imgEls.length;
    } else {
      currentIndex = i;
    }

    imgEls.forEach((el,idx)=> el.style.display = (idx===currentIndex)?'block':'none');
    try{ updateDownload(); }catch(e){ console.error('updateDownload failed', e); }
  }

  // event delegation for all controls; avoids missing-node errors
  if(overlay){
    // helper to find ancestor when `closest` is not available
    function findAncestor(el, selector){
      while(el && el !== overlay){
        try{
          if(el.matches && el.matches(selector)) return el;
        }catch(e){}
        el = el.parentElement;
      }
      return null;
    }

    overlay.addEventListener('click', async (e) => {
      let btn = null;
      try{
        btn = (e.target && e.target.closest) ? e.target.closest('button, a') : findAncestor(e.target, 'button, a');
      }catch(ex){ btn = findAncestor(e.target, 'button, a'); }

      if(!btn) {
        if(e.target === overlay) return close();
        return;
      }

      try{
        if(btn.classList.contains('lightbox-close')) return close();
        if(btn.classList.contains('lb-prev')) return showIndex(currentIndex-1);
        if(btn.classList.contains('lb-next')) return showIndex(currentIndex+1);
        if(btn.classList.contains('lb-share')){
          const cur = mediaWrap ? mediaWrap.querySelector(`img[data-index="${currentIndex}"]`) : null;
          if(navigator.share && cur){ try{ await navigator.share({ title: currentProduct.name, text: currentProduct.name, url: cur.src }); }catch(e){} }
          else if(cur){ try{ await navigator.clipboard.writeText(cur.src); showToast('Image URL copied to clipboard'); }catch(e){ showToast('Copy failed'); } }
          return;
        }
        if(btn.classList.contains('lb-copy')){
          const cur = mediaWrap ? mediaWrap.querySelector(`img[data-index="${currentIndex}"]`) : null;
          if(!cur) return; try{ await navigator.clipboard.writeText(cur.src);
            showToast('Image URL copied to clipboard'); }catch(e){ showToast('Copy failed'); }
          return;
        }
      }catch(err){
        console.error('Lightbox control handler error', err);
      }
      // download anchor handled by browser
    });
  }

  // keyboard navigation
  document.addEventListener('keydown', (e)=>{
    try{
      if(!overlay || overlay.hidden) return;
      if(e.key === 'Escape') return close();
      if(e.key === 'ArrowLeft') return showIndex(currentIndex-1);
      if(e.key === 'ArrowRight') return showIndex(currentIndex+1);
    }catch(err){ console.error('Lightbox key handler error', err); }
  });

  // expose globally
  window.openProductLightbox = open;
})();
