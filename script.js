document.body.classList.add('loading');

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuButton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
let menuOpen = false;

function toggleMenu(force) {
  menuOpen = typeof force === 'boolean' ? force : !menuOpen;
  menuButton.setAttribute('aria-expanded', menuOpen);
  menu.setAttribute('aria-hidden', !menuOpen);
  gsap.to(menu, { y: menuOpen ? '0%' : '-105%', duration: .8, ease: 'power4.inOut' });
  gsap.to('.menu-btn span', { rotate: menuOpen ? 135 : 0, duration: .4 });
}
menuButton.addEventListener('click', () => toggleMenu());
document.querySelectorAll('.menu a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

if (prefersReduced || typeof gsap === 'undefined') {
  document.body.classList.remove('loading');
  document.querySelector('.loader').remove();
} else {
  gsap.registerPlugin(ScrollTrigger);

  const count = { value: 0 };
  gsap.timeline({ onComplete: () => document.body.classList.remove('loading') })
    .to('.loader-track span', { width: '100%', duration: 1.15, ease: 'power3.inOut' })
    .to(count, { value: 100, duration: 1.15, ease: 'power2.inOut', onUpdate: () => document.querySelector('.loader strong').textContent = String(Math.round(count.value)).padStart(2, '0') }, 0)
    .to('.loader', { yPercent: -100, duration: .85, ease: 'power4.inOut' })
    .from('.hero-line > span', { yPercent: 115, duration: 1.15, stagger: .12, ease: 'power4.out' }, '-=.25')
    .from('.hero .reveal, .hero-sticker', { opacity: 0, y: 30, duration: .7, stagger: .1 }, '-=.65');

  gsap.to('.spin', { rotate: 360, duration: 18, repeat: -1, ease: 'none' });
  gsap.to('.orb-a', { xPercent: -35, yPercent: 25, scrollTrigger: { trigger: '.hero', scrub: 1 } });
  gsap.to('.orb-b', { xPercent: 45, yPercent: -20, scrollTrigger: { trigger: '.hero', scrub: 1 } });
  gsap.to('.marquee-track', { xPercent: -50, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  document.querySelectorAll('.section-head h2, .manifesto, .contact h2').forEach(el => {
    gsap.from(el, { y: 90, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
  });
  document.querySelectorAll('.project').forEach(project => {
    const visual = project.querySelector('.project-visual');
    gsap.from(visual, { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: project, start: 'top 78%' } });
    gsap.from(project.querySelectorAll('.project-copy > *'), { y: 45, opacity: 0, stagger: .08, duration: .7, scrollTrigger: { trigger: project, start: 'top 70%' } });
  });
  gsap.to('.scanner', { top: '80%', duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.produce-a', { y: -35, rotate: -8, scrollTrigger: { trigger: '.project-lime', scrub: 1 } });
  gsap.to('.produce-b', { y: 30, rotate: 6, scrollTrigger: { trigger: '.project-lime', scrub: 1 } });
  gsap.from('.stats strong', { textContent: 0, duration: 1.3, snap: { textContent: .01 }, stagger: .15, scrollTrigger: { trigger: '.stats', start: 'top 85%' } });
  gsap.from('.timeline article', { x: -60, opacity: 0, stagger: .12, duration: .8, scrollTrigger: { trigger: '.timeline', start: 'top 75%' } });
  gsap.from('.tool-cloud span', { scale: 0, rotate: () => gsap.utils.random(-15, 15), stagger: .05, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.tool-cloud', start: 'top 80%' } });
  gsap.from('.giant-name', { xPercent: 30, scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  window.addEventListener('pointermove', e => {
    gsap.set(dot, { x: e.clientX - 3, y: e.clientY - 3 });
    gsap.to(ring, { x: e.clientX - 20, y: e.clientY - 20, duration: .45, ease: 'power3.out' });
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(ring, { scale: 1.7, duration: .25 }));
    el.addEventListener('mouseleave', () => gsap.to(ring, { scale: 1, duration: .25 }));
  });
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX-r.left-r.width/2)*.18, y: (e.clientY-r.top-r.height/2)*.18, duration: .3 });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.35)' }));
  });
}
