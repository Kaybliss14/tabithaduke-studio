/**
 * Tabithaduke Studio — main.js
 * Shared across every page (index.html, portfolio.html, services.html,
 * pricing.html, about.html, faq.html, contact.html).
 *
 * Handles: mobile navigation toggle, FAQ accordion, contact form submission.
 * Each init function checks for its own elements first, so it's safe to
 * include this same file on pages that don't have every feature.
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initFaqAccordion();
  initContactForm();
});

/**
 * Mobile navigation toggle.
 * Shows/hides the primary nav as a stacked list on small screens.
 * Present on every page (shared header).
 */
function initMobileNav() {
  var menuToggle = document.getElementById('menuToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (!menuToggle || !primaryNav) return;

  menuToggle.addEventListener('click', function () {
    var isOpen = primaryNav.classList.contains('nav-open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  primaryNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 960) {
        closeMobileNav();
      }
    });
  });

  function openMobileNav() {
    primaryNav.classList.add('nav-open');
    primaryNav.style.display = 'flex';
    primaryNav.style.flexDirection = 'column';
    primaryNav.style.position = 'absolute';
    primaryNav.style.top = '64px';
    primaryNav.style.left = '0';
    primaryNav.style.right = '0';
    primaryNav.style.background = 'rgba(5, 8, 22, 0.97)';
    primaryNav.style.borderBottom = '1px solid var(--card-brd)';
    primaryNav.style.padding = '10px 20px 18px';
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    primaryNav.classList.remove('nav-open');
    primaryNav.style.display = 'none';
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

/**
 * FAQ accordion.
 * Only present on faq.html (and optionally other pages with a mini-FAQ).
 * Only one item is open at a time.
 */
function initFaqAccordion() {
  var faqButtons = document.querySelectorAll('.faq-q');
  if (!faqButtons.length) return;

  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.parentElement;
      var wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var q = i.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Contact form submission handler.
 * Only present on contact.html.
 * Currently front-end only: shows a confirmation message and resets the form.
 * Replace the TODO block below with a real fetch() call to your backend,
 * form service (e.g. Formspree, Getform), or email API once one is ready.
 */
function initContactForm() {
  var form = document.getElementById('contactForm');
  var note = document.getElementById('contactNote');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var honeypot = form.elements['company'];
    if (honeypot && honeypot.value) {
      return; // silently drop likely spam
    }

    // TODO: replace with a real submission, e.g.:
    // fetch('https://your-form-endpoint.example/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(Object.fromEntries(new FormData(form)))
    // })
    //   .then(function (res) { if (res.ok) showNote(); })
    //   .catch(function (err) { console.error('Form submission failed:', err); });

    showNote();
    form.reset();
  });

  function showNote() {
    if (note) note.classList.add('show');
  }
}
