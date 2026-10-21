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
