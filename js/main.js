/* =====================================================
   Umar Saeed Portfolio — Main JavaScript v4
   ===================================================== */

'use strict';

/* ===== MOBILE NAV ===== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});

/* ===== ACTIVE NAV LINK + NAVBAR ELEVATION ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navbar   = document.getElementById('navbar');

function updateActiveLinkAndNavbarTheme() {
  let current = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });

  navbar.classList.toggle('scrolled', window.scrollY > 20);
}

/* ===== SCROLL PROGRESS RAIL ===== */
const progressFill = document.getElementById('progressFill');

function updateProgress() {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = `${pct}%`;
}

/* ===== TIMELINE SCROLL-LINKED GOLD THREAD ===== */
const timelineEl     = document.getElementById('timeline');
const timelineThread  = document.getElementById('timelineThread');
const timelineItems   = document.querySelectorAll('.timeline-item');

function updateTimelineThread() {
  if (!timelineEl || !timelineThread) return;
  const rect      = timelineEl.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const start     = viewportH * 0.75;          /* thread starts filling once timeline top hits 75% down viewport */
  const total     = rect.height + viewportH * 0.4;
  const progressed = start - rect.top;
  const pct = Math.max(0, Math.min(1, progressed / total));
  timelineThread.style.height = `${pct * 100}%`;

  timelineItems.forEach(item => {
    const itemRect = item.getBoundingClientRect();
    if (itemRect.top < viewportH * 0.8) {
      item.classList.add('in-view');
    }
  });
}

/* ===== BACK TO TOP ===== */
const backBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  backBtn.classList.toggle('visible', window.scrollY > 400);
}

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== COMBINED SCROLL HANDLER (perf: single rAF loop) ===== */
let scrollTicking = false;
function onScroll() {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      updateActiveLinkAndNavbarTheme();
      updateProgress();
      toggleBackToTop();
      updateTimelineThread();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // initialize on load

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx       = siblings.indexOf(entry.target);
      const delay      = Math.min(idx * 70, 350);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ===== COUNT-UP STATS (hero) ===== */
const statNums = document.querySelectorAll('.stat-num');

function animateCount(el) {
  const target  = parseInt(el.getAttribute('data-count'), 10) || 0;
  const suffix  = el.getAttribute('data-suffix') || '';
  const duration = 1400;
  const start    = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    const value    = Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

/* ===== CURSOR DOT (desktop, decorative) ===== */
const cursorDot = document.getElementById('cursorDot');
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isFinePointer && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.classList.add('active');
  });

  document.addEventListener('mouseleave', () => cursorDot.classList.remove('active'));

  function followCursor() {
    dotX += (mouseX - dotX) * 0.22;
    dotY += (mouseY - dotY) * 0.22;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top  = `${dotY}px`;
    requestAnimationFrame(followCursor);
  }
  followCursor();

  /* Grow on interactive elements */
  const growTargets = document.querySelectorAll('a, button, .skill-card, .project, .timeline-item, .edu-card, .contact-item');
  growTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('grow'));
  });
}

/* =====================================================
   PROJECT MEDIA LIGHTBOX
   Works automatically for any .media-frame.has-image
   containing an <img data-lightbox="..."> — no markup
   changes needed elsewhere when real screenshots are added.
   ===================================================== */
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg      = document.getElementById('lightboxImg');
const lightboxClose    = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  if (!lightboxOverlay || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxOverlay) return;
  lightboxOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.media-frame.has-image img[data-lightbox]').forEach(img => {
  img.closest('.media-frame').addEventListener('click', () => {
    openLightbox(img.getAttribute('data-lightbox'), img.alt);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('open')) closeLightbox();
});

/* ===== CONTACT FORM ===== */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote  = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

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

  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';

  const subject = form.querySelector('#subject').value.trim() || 'Portfolio Inquiry';
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailto  = `mailto:umar.saeed19202@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  setTimeout(() => {
    window.location.href   = mailto;
    submitBtn.disabled     = false;
    submitBtn.textContent  = 'Send Message →';
    formNote.textContent   = 'Your email client should open now. Thank you!';
    formNote.className     = 'form-note success';
    form.reset();
    setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 8000);
  }, 600);
});
