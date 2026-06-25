const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero .kicker, .hero h1, .hero-copy, .hero-links a', {
    y: 24,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out'
  });

  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelectorAll('.section-number, h2, .entry, .coursework, .timeline article, .section-body > p'), {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%'
      }
    });
  });
}
