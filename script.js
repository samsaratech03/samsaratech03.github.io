const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(el);
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelectorAll('.service-card, .project, .article-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const box = card.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width - 0.5) * 4;
    const y = ((event.clientY - box.top) / box.height - 0.5) * -4;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

const mobileMenu = document.querySelector('.mobile-menu-panel');
const menuButton = document.querySelector('.header-actions .icon-button:last-child');
const closeMenuButton = document.querySelector('.mobile-menu-close');
const closeMobileMenu = () => {
  mobileMenu?.classList.remove('is-open');
  document.documentElement.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  mobileMenu?.classList.add('is-open');
  document.documentElement.classList.add('menu-open');
  document.body.classList.add('menu-open');
});
closeMenuButton?.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-nav-links a, .mobile-menu-footer a').forEach((link) => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMobileMenu();
});

const parallaxTargets = [
  { element: document.querySelector('.orb-one'), speed: 0.18 },
  { element: document.querySelector('.orb-two'), speed: -0.12 },
  { element: document.querySelector('.abstract-lines'), speed: 0.22 },
  { element: document.querySelector('.hero-card'), speed: -0.12 },
  { element: document.querySelector('.cta-orbit'), speed: -0.14 }
].filter((item) => item.element);

let parallaxFrame = null;
const updateParallax = () => {
  parallaxFrame = null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const viewportCenter = window.innerHeight / 2;
  parallaxTargets.forEach(({ element, speed }) => {
    const box = element.getBoundingClientRect();
    if (box.bottom < -120 || box.top > window.innerHeight + 120) return;
    const offset = (box.top + box.height / 2 - viewportCenter) * speed;
    element.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
  });
};

window.addEventListener('scroll', () => {
  if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateParallax);
}, { passive: true });
window.addEventListener('resize', updateParallax, { passive: true });
updateParallax();

const heroArt = document.querySelector('.hero-art');
heroArt?.addEventListener('pointermove', (event) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = heroArt.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
  heroArt.style.setProperty('--hero-x', `${x.toFixed(2)}px`);
  heroArt.style.setProperty('--hero-y', `${y.toFixed(2)}px`);
});
heroArt?.addEventListener('pointerleave', () => {
  heroArt.style.setProperty('--hero-x', '0px');
  heroArt.style.setProperty('--hero-y', '0px');
});
