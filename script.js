document.body.classList.add('loading');

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuButton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
let menuOpen = false;

function toggleMenu(force) {
  menuOpen = typeof force === 'boolean' ? force : !menuOpen;
  menuButton.setAttribute('aria-expanded', menuOpen);
  menu.setAttribute('aria-hidden', !menuOpen);
  gsap.to(menu, { y: menuOpen ? '0%' : '-105%', duration: 0.75, ease: 'power4.inOut' });
  gsap.to('.menu-btn span', { rotate: menuOpen ? 45 : 0, duration: 0.35 });
}

menuButton.addEventListener('click', () => toggleMenu());
document.querySelectorAll('.menu a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

if (prefersReduced || typeof gsap === 'undefined') {
  document.body.classList.remove('loading');
  document.querySelector('.loader')?.remove();
} else {
  gsap.registerPlugin(ScrollTrigger);

  const count = { value: 0 };
  gsap.timeline({ onComplete: () => document.body.classList.remove('loading') })
    .to('.loader-track span', { width: '100%', duration: 1.05, ease: 'power3.inOut' })
    .to(count, {
      value: 100,
      duration: 1.05,
      ease: 'power2.inOut',
      onUpdate: () => {
        document.querySelector('.loader strong').textContent = String(Math.round(count.value)).padStart(2, '0');
      }
    }, 0)
    .to('.loader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
    .from('.hero-line > span', { yPercent: 112, duration: 1.05, stagger: 0.11, ease: 'power4.out' }, '-=0.2')
    .from('.hero .reveal', { opacity: 0, y: 26, duration: 0.7, stagger: 0.08 }, '-=0.62');

  gsap.to('.ticker-track', {
    xPercent: -45,
    ease: 'none',
    scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  document.querySelectorAll('.section-head h2, .profile-panel, .research-card, .contact h2').forEach(el => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%' }
    });
  });

  document.querySelectorAll('.course-grid article, .system-card').forEach(el => {
    gsap.from(el, {
      y: 52,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });

  gsap.from('.metrics div:first-child strong', {
    textContent: 0,
    duration: 1.15,
    snap: { textContent: 0.01 },
    stagger: 0.12,
    scrollTrigger: { trigger: '.metrics', start: 'top 86%' }
  });

  gsap.from('.timeline article', {
    x: -42,
    opacity: 0,
    stagger: 0.1,
    duration: 0.75,
    scrollTrigger: { trigger: '.timeline', start: 'top 78%' }
  });

  gsap.from('.tool-cloud span', {
    scale: 0.92,
    opacity: 0,
    stagger: 0.035,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.tool-cloud', start: 'top 84%' }
  });

  gsap.to('.data-lines i', {
    x: () => gsap.utils.random(-18, 18),
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    stagger: 0.18,
    ease: 'sine.inOut'
  });

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  window.addEventListener('pointermove', e => {
    gsap.set(dot, { x: e.clientX - 2.5, y: e.clientY - 2.5 });
    gsap.to(ring, { x: e.clientX - 17, y: e.clientY - 17, duration: 0.42, ease: 'power3.out' });
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(ring, { scale: 1.55, duration: 0.22 }));
    el.addEventListener('mouseleave', () => gsap.to(ring, { scale: 1, duration: 0.22 }));
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.14, y: (e.clientY - r.top - r.height / 2) * 0.14, duration: 0.28 });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,.35)' }));
  });
}
