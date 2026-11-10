/* Section-rail anchors on the public-company pricing pages.

   Webflow's own smooth scroll claims these clicks (it preventDefaults and
   then animates via jQuery), which is why the rail could set the hash and
   move nothing. This handler runs in the CAPTURE phase so it settles the
   click before Webflow's document-level handler ever sees it, and scrolls
   natively instead: no jQuery timer to stall, and prefers-reduced-motion
   is honoured by the browser for free.

   The offset is measured from the fixed navbar rather than hardcoded, so a
   change to the bar's height or to the promo strip above it cannot leave
   section headings parked underneath the chrome. */
(function () {
  'use strict';

  function chromeOffset() {
    var bar = document.querySelector('.elw-nb-header');
    if (!bar) return 100;
    var r = bar.getBoundingClientRect();
    return Math.max(0, r.top) + r.height + 16;
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('.ppc-page-nav-link');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    if (href.charAt(0) !== '#' || href.length < 2) return;

    var target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    e.stopPropagation();

    var top = target.getBoundingClientRect().top + window.pageYOffset - chromeOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    if (window.history && history.replaceState) history.replaceState(null, '', href);
  }, true);
})();