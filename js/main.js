/* ==========================================================
   TFabCo — SHARED SITE BEHAVIOR
   Loaded on every page. Anything here is a reusable "component
   behavior" — the same modal system powers the Call popover AND
   the Estimate form, for example.
   ========================================================== */

// ---------- CONFIG: replace with real business details ----------
const BUSINESS = {
  phone: '+91 7973581010',
  phoneHref: '+917973581010',
  whatsapp: '917973581010',
  email: 'ritviksingla1304@gmail.com',
  address: 'Steel Hub, Model Tent House wali Gali, Birla Road Malout',
};

// ---------- DEVICE DETECTION ----------
function isMobileDevice(){
  const uaMobile = /Android|iPhone|iPad|iPod|IEMobile|BlackBerry/i.test(navigator.userAgent);
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth <= 768;
  return uaMobile || (coarsePointer && narrow);
}

// ---------- STICKY HEADER SHADOW ON SCROLL ----------
(function initHeaderScroll(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ---------- MOBILE NAV TOGGLE ----------
(function initMobileNav(){
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

// ---------- BUTTON RIPPLE CLICK EFFECT ----------
(function initRipples(){
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
})();

// ---------- GENERIC MODAL SYSTEM ----------
function openModal(id){
  const overlay = document.getElementById(id);
  if(!overlay) return;
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  const closeBtn = overlay.querySelector('.modal-close');
  if(closeBtn) closeBtn.focus();
}
function closeModal(overlay){
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}
(function initModals(){
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) closeModal(overlay);
    });
    const closeBtn = overlay.querySelector('.modal-close');
    if(closeBtn) closeBtn.addEventListener('click', () => closeModal(overlay));
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal-overlay.is-open').forEach(closeModal);
    }
  });
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(trigger.dataset.openModal);
    });
  });
})();

// ---------- CALL BUTTON: dialer on mobile, popover on desktop ----------
(function initCallButtons(){
  document.querySelectorAll('[data-call-button]').forEach(btn => {
    btn.setAttribute('href', 'tel:' + BUSINESS.phoneHref);
    btn.addEventListener('click', (e) => {
      if(!isMobileDevice()){
        e.preventDefault();
        openModal('call-popover');
      }
      // on mobile: let the tel: link fire natively, opening the dialer
    });
  });
})();

// ---------- POPULATE BUSINESS DETAILS WHEREVER USED ----------
(function populateBusinessDetails(){
  document.querySelectorAll('[data-business="phone"]').forEach(el => {
    el.textContent = BUSINESS.phone;
    if(el.tagName === 'A') el.href = 'tel:' + BUSINESS.phoneHref;
  });
  document.querySelectorAll('[data-business="email"]').forEach(el => {
    el.textContent = BUSINESS.email;
    if(el.tagName === 'A') el.href = 'mailto:' + BUSINESS.email;
  });
  document.querySelectorAll('[data-business="address"]').forEach(el => { el.textContent = BUSINESS.address; });
  document.querySelectorAll('[data-business="hours"]').forEach(el => { el.textContent = BUSINESS.hours; });
  document.querySelectorAll('[data-whatsapp-link]').forEach(el => {
    el.href = 'https://wa.me/' + BUSINESS.whatsapp;
  });
})();

// ---------- NETLIFY FORM SUBMISSION HELPER (used by estimate modal) ----------
// Plain HTML forms with data-netlify="true" work automatically once
// deployed on Netlify — this just adds a friendly inline success state
// without a full page reload.
(function initNetlifyForms(){
  document.querySelectorAll('form[data-ajax-form]').forEach(form => {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const body = new URLSearchParams(data).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
        .then(() => {
          const successEl = form.parentElement.querySelector('.form-success');
          form.style.display = 'none';
          if(successEl) successEl.style.display = 'block';
        })
        .catch(() => {
          alert('Something went wrong sending your request. Please call or WhatsApp us directly.');
        });
    });
  });
})();
