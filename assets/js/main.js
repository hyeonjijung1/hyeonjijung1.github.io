/* DianaJung — minimal main.js for single-page portfolio */
(() => {
  "use strict";

  /* ============ Helpers ============ */
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

  /* ============ Sticky header shadow on scroll ============ */
  function toggleScrolled() {
    const body = document.body;
    const header = $('#header');
    if (!header) return;
    (window.scrollY > 100) ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* ============ Mobile nav toggle ============ */
  const mobileBtn = $('.mobile-nav-toggle');
  function toggleMobileNav() {
    document.body.classList.toggle('mobile-nav-active');
    mobileBtn?.classList.toggle('bi-list');
    mobileBtn?.classList.toggle('bi-x');
  }
  mobileBtn?.addEventListener('click', toggleMobileNav);

  /* Close mobile nav on same-page anchor click */
  $$('#navmenu a').forEach(a => {
    a.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) toggleMobileNav();
    });
  });

  /* ============ Preloader (optional div#preloader) ============ */
  const preloader = $('#preloader');
  if (preloader) window.addEventListener('load', () => preloader.remove());

  /* ============ Scroll Top button ============ */
  const scrollTop = $('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTop) return;
    (window.scrollY > 100) ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
  scrollTop?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* ============ Smooth load to hash ============ */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        const mt = parseInt(getComputedStyle(section).scrollMarginTop || '0', 10);
        setTimeout(() => window.scrollTo({ top: section.offsetTop - mt, behavior: 'smooth' }), 100);
      }
    }
  });

  /* ============ Nav Scrollspy ============ */
  const navLinks = $$('.navmenu a');
  function scrollspy() {
    const pos = window.scrollY + 200;
    navLinks.forEach(link => {
      if (!link.hash) return;
      const sec = document.querySelector(link.hash);
      if (!sec) return;
      if (pos >= sec.offsetTop && pos <= sec.offsetTop + sec.offsetHeight) {
        $$('.navmenu a.active').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('load', scrollspy);
  document.addEventListener('scroll', scrollspy);

  /* ============ AOS + GLightbox init ============ */
  window.addEventListener('load', () => {
    if (window.AOS) AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 });
    if (window.GLightbox) GLightbox({ selector: '.glightbox' });
  });

  /* NOTE: Removed typed.js, isotope, imagesLoaded, swiper, faq, counters, skills bars */
})();
