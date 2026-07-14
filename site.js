// Júnior Som — vanilla JS
(function () {
  function init() {
    // Mobile menu toggle
    var menuBtn = document.querySelector('.menu-btn');
    var nav = document.querySelector('.nav');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', function () {
        nav.classList.toggle('open');
      });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); });
      });
    }

    // Header shrink on scroll
    var header = document.querySelector('.js-header');
    var topBtn = document.querySelector('.top-btn');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) header && header.classList.add('scrolled');
      else header && header.classList.remove('scrolled');
      if (window.scrollY > 400) topBtn && topBtn.classList.add('visible');
      else topBtn && topBtn.classList.remove('visible');
    });

    // Smooth back-to-top
    if (topBtn) {
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Reveal on scroll
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // Lightbox zoom for products & portfolio
    var lb = document.querySelector('.lightbox');
    var lbImg = lb && lb.querySelector('img');
    var lbClose = lb && lb.querySelector('.close');
    function openLB(src) { if (!lb || !lbImg) return; lbImg.src = src; lb.classList.add('open'); }
    function closeLB() { lb && lb.classList.remove('open'); }
    document.querySelectorAll('[data-zoom]').forEach(function (el) {
      el.addEventListener('click', function () {
        var img = el.querySelector('img');
        if (img) openLB(img.src);
      });
    });
    lbClose && lbClose.addEventListener('click', closeLB);
    lb && lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
