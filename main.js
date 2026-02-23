// ═══════════════════════════════════════════
// We Love Fixit — Interactive JavaScript
// ═══════════════════════════════════════════

// ── Mobile Navigation ──
const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  mainNav.classList.toggle('open');
  document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
});

// Close nav on link click
mainNav.querySelectorAll('.header__link').forEach(link => {
  link.addEventListener('click', () => {
    burgerBtn.classList.remove('active');
    mainNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Header Scroll Effect ──
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  lastScroll = currentScroll;
}, { passive: true });

// ── Scroll Animations ──
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ── Stats Counter Animation ──
const statNumbers = document.querySelectorAll('.stat__number');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsCounted) {
      statsCounted = true;
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

function animateCounters() {
  statNumbers.forEach(num => {
    const target = parseInt(num.dataset.target);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      num.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// ── Smooth Scroll for Anchor Links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ── Parallax Effect on Hero Orbs ──
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero__orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 10;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
}, { passive: true });
