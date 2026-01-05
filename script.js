// script.js

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------
     Smooth scrolling
  ----------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* -----------------------------
     Navbar + Logo logic
  ----------------------------- */
  const navbar = document.querySelector('.navbar');
  const logo   = document.querySelector('.logo');

  let lastScrollY = window.scrollY;

  // Intro animation (desktop only)
  if (window.innerWidth >= 768) {
    logo.classList.add('intro');
    setTimeout(() => logo.classList.remove('intro'), 1500);
  }

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const isMobile = window.innerWidth < 768;

    /* Navbar background */
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    /* Logo text behavior */
    if (currentScrollY > 40) {
      logo.classList.add('show-text');
    } else {
      logo.classList.remove('show-text');
    }

    /* Mobile: hide on scroll down, show on scroll up */
    if (isMobile) {
      if (currentScrollY < 10) {
        navbar.classList.remove('hidden');
      } else if (currentScrollY > lastScrollY) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
    }

    lastScrollY = currentScrollY;
  });

  /* -----------------------------
     Intersection Observer
  ----------------------------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.service-card, .about-content, .contact-container, .work-card, .testimonial-card, .faq-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  /* -----------------------------
     Forms (unchanged logic)
  ----------------------------- */
  // Keep your existing form handlers here as-is
});

/* -----------------------------
   Modal Logic
----------------------------- */
function openModal() {
  document.getElementById('lead-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('lead-modal').classList.remove('active');
}

document.getElementById('lead-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('lead-modal')) {
    closeModal();
  }
});

/* -----------------------------
   Logo click → scroll or home
----------------------------- */
document.querySelector('.logo').addEventListener('click', e => {
  e.preventDefault();
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.location.href = 'index.html';
  }
});
