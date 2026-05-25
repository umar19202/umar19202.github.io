// =============================================
//  NAV SCROLL STATE
// =============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// =============================================
//  MOBILE MENU
// =============================================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// =============================================
//  SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same grid/parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 320);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// =============================================
//  HERO STAGGER ON LOAD
// =============================================
const heroItems = document.querySelectorAll('.hero-content .reveal');
heroItems.forEach((el, i) => {
  setTimeout(() => {
    el.classList.add('visible');
  }, 200 + i * 150);
});

// =============================================
//  ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--ink)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// =============================================
//  CONTACT FORM
// =============================================
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const form = document.getElementById('contact-form');

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoLink = `mailto:umar.saeed19202@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

  btn.textContent = 'Opening email client...';
  btn.style.background = 'var(--accent)';

  setTimeout(() => {
    window.location.href = mailtoLink;
    btn.textContent = 'Send Message →';
    btn.style.background = '';
  }, 800);
}

// =============================================
//  SMOOTH HOVER ON PROJECT CARDS
// =============================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    card.style.transform = `translateY(-4px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
