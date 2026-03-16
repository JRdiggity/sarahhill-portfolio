(function () {
  'use strict';

  var revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    revealEls.forEach(function (el) {
      el.classList.add('will-reveal');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('will-reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });

    setTimeout(function () {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
        el.classList.remove('will-reveal');
      });
    }, 3000);
  }

  var nav = document.getElementById('nav');
  if (nav) {
    function onScroll() {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      var hash = href.indexOf('#') !== -1 ? href.substring(href.indexOf('#')) : null;
      if (hash && hash.length > 1) {
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
        }
      }
    });
  });
})();
