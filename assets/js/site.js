/* ATIL local rebuild — interactions */
(function () {
  'use strict';

  // Sticky header shadow
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var iconOpen = document.getElementById('menu-open-icon');
  var iconClose = document.getElementById('menu-close-icon');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden', true);
        iconClose.classList.toggle('hidden', false);
      }
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 13h16M4 19h16"/></svg>';
    });
    // Close when a link inside is clicked
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menuBtn.click();
    });
  }

  // Hero rotating emphasised word
  var words = ['grow online.', 'get more leads.', 'sell more.', 'rank higher.', 'stand out.'];
  var wi = 0;
  var el = document.getElementById('hero-word');
  if (el) {
    setInterval(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(function () {
        wi = (wi + 1) % words.length;
        el.textContent = words[wi];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300);
    }, 3500);
  }

  // FAQ accordion
  document.querySelectorAll('.faq-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Cookie banner (no third-party trackers in this local build)
  var banner = document.getElementById('cookie-banner');
  var KEY = 'atil-cookie-consent';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* storage unavailable */ }
  if (banner && !stored) {
    requestAnimationFrame(function () { banner.classList.add('show'); });
  }
  function hideBanner() { if (banner) banner.classList.remove('show'); }
  var accept = document.getElementById('cookie-accept');
  var reject = document.getElementById('cookie-reject');
  if (accept) accept.addEventListener('click', function () {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) {}
    hideBanner();
  });
  if (reject) reject.addEventListener('click', function () {
    try { localStorage.setItem(KEY, 'rejected'); } catch (e) {}
    hideBanner();
  });
})();
