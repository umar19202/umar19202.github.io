/* =====================================================
   Umar Saeed Portfolio — Main JavaScript
   ===================================================== */

'use strict';

/* ===== MOBILE NAV ===== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

/* Close on link click */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== ACTIVE NAV LINK on scroll ===== */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      /* Stagger siblings slightly */
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx      = siblings.indexOf(entry.target);
      const delay    = Math.min(idx * 60, 300);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ===== BACK TO TOP ===== */
const backBtn = document.getElementById('backToTop');

function onScroll() {
  if (window.scrollY > 400) backBtn.classList.add('visible');
  else                       backBtn.classList.remove('visible');
  updateActiveLink();
}

window.addEventListener('scroll', onScroll, { passive: true });

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== NAVBAR SHADOW on scroll ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

/* ===== CONTACT FORM ===== */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote  = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  /* Basic validation */
  if (!name || !email || !message) {
    formNote.textContent = 'Please fill in all required fields.';
    formNote.className   = 'form-note error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formNote.textContent = 'Please enter a valid email address.';
    formNote.className   = 'form-note error';
    return;
  }

  /* Simulate send — opens mailto as fallback (no backend on GitHub Pages) */
  submitBtn.disabled     = true;
  submitBtn.textContent  = 'Sending…';

  const subject = form.querySelector('#subject').value.trim() || 'Portfolio Inquiry';
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailto  = `mailto:umar.saeed19202@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  setTimeout(() => {
    window.location.href = mailto;
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message →';
    formNote.textContent  = 'Your email client should open now. Thank you!';
    formNote.className    = 'form-note success';
    form.reset();
    setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 8000);
  }, 600);
});

/* ===== KEYBOARD: close nav on Escape ===== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});

/* ===== SMOOTH typing cursor effect on hero name ===== */
/* Optional subtle shimmer — no heavy animation, just a glow pulse on load */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.style.opacity = '0';
  heroName.style.transform = 'translateY(16px)';
  heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  setTimeout(() => {
    heroName.style.opacity   = '1';
    heroName.style.transform = 'none';
  }, 200);
}
