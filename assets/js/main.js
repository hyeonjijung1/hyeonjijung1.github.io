/* DianaJung — minimal main.js for single-page portfolio */
(() => {
  "use strict";

  /* ============ Helpers ============ */
  const $  = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

  /* ============ Sticky header shadow on scroll ============ */
  const header = $('#header');
  function toggleScrolled() {
    if (!header) return;
    (window.scrollY > 100)
      ? document.body.classList.add('scrolled')
      : document.body.classList.remove('scrolled');
  }

  /* ============ Scroll Top button ============ */
  const scrollTopBtn = $('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    (window.scrollY > 100)
      ? scrollTopBtn.classList.add('active')
      : scrollTopBtn.classList.remove('active');
  }
  scrollTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, { passive: false });

  /* ============ Nav Scrollspy ============ */
  const navLinks = $$('.navmenu a');
  const sections = navLinks
    .map(l => l.hash && document.querySelector(l.hash))
    .filter(Boolean);

  function scrollspy() {
    const pos = window.scrollY + 200;
    let active = null;

    for (const sec of sections) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (pos >= top && pos < bottom) { active = sec; break; }
    }
    // fallback: bottom of page -> last section
    if (!active && window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      active = sections.at(-1);
    }

    if (!active) return;
    $$('.navmenu a.active').forEach(l => l.classList.remove('active'));
    const link = navLinks.find(l => l.hash === ('#' + active.id));
    link?.classList.add('active');
  }

  /* ============ Smooth internal anchor scrolling ============ */
  navLinks.forEach(link => {
    if (!link.hash) return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', link.hash);
    }, { passive: false });
  });

  /* ============ Mobile nav toggle (optional button) ============ */
  const mobileBtn = $('.mobile-nav-toggle');
  function toggleMobileNav() {
    document.body.classList.toggle('mobile-nav-active');
    mobileBtn?.classList.toggle('bi-list');
    mobileBtn?.classList.toggle('bi-x');
  }
  mobileBtn?.addEventListener('click', toggleMobileNav);
  // Close mobile nav on same-page anchor click
  $$('#navmenu a').forEach(a => {
    a.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) toggleMobileNav();
    }, { passive: true });
  });

  /* ============ Preloader (optional div#preloader) ============ */
  const preloader = $('#preloader');
  if (preloader) window.addEventListener('load', () => preloader.remove(), { once: true });

  /* ============ AOS + GLightbox init ============ */
  window.addEventListener('load', () => {
    if (window.AOS) AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 });
    if (window.GLightbox) GLightbox({ selector: '.glightbox' });
  }, { once: true });

  /* ============ Title glow on view (keep only THIS observer) ============ */
  document.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll(".section-title h2");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible", "pulse");
        setTimeout(() => entry.target.classList.remove("pulse"), 1200);
        io.unobserve(entry.target); // run once per title
      });
    }, { threshold: 0.4 });
    titles.forEach(t => io.observe(t));
  });

  /* ============ Smooth jump to initial hash on load ============ */
  window.addEventListener('load', () => {
    if (!window.location.hash) return;
    const section = document.querySelector(window.location.hash);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, { once: true });

  /* ============ rAF-throttled scroll work (perf) ============ */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      toggleScrolled();
      toggleScrollTop();
      scrollspy();
      ticking = false;
    });
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ============ Initial state ============ */
  document.addEventListener('DOMContentLoaded', () => {
    toggleScrolled();
    toggleScrollTop();
    scrollspy();
  });
})();
