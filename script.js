// ===== INTRO LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('intro-loader').classList.add('hidden');
    document.getElementById('main-nav').classList.add('visible');
  }, 1800);
});

// ===== CURSOR GLOW =====
const cg = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => { cg.style.left = e.clientX + 'px'; cg.style.top = e.clientY + 'px'; });
document.addEventListener('mouseleave', () => cg.style.opacity = '0');
document.addEventListener('mouseenter', () => cg.style.opacity = '1');

// ===== SCROLL PROGRESS =====
const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progress.style.width = pct + '%';
}, { passive: true });

// ===== BACK TO TOP =====
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backTop.classList.add('visible');
  else backTop.classList.remove('visible');
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== NAV ACTIVE LINK =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['card-about', 'what-i-do', 'card-tiktok', 'job-1', 'card-degrees', 'project-1'];
const sectionEls = sections.map(id => document.getElementById(id)).filter(Boolean);
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const id = e.target.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sectionEls.forEach(el => navObs.observe(el));

// ===== SMOOTH NAV SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== SCROLL REVEAL =====
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), e.target.dataset.d || 0);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => { el.dataset.d = (i % 6) * 70; ro.observe(el); });

// ===== SKILL BARS =====
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(b => {
        const w = b.dataset.width + '%';
        b.style.width = '0';
        requestAnimationFrame(() => setTimeout(() => b.style.width = w, 120));
      });
      so.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('#card-skills').forEach(el => so.observe(el));

// ===== STAT COUNTERS =====
function countUp(el, t, s) {
  let c = 0; const st = t / 50;
  const tm = setInterval(() => {
    c += st; if (c >= t) { c = t; clearInterval(tm); }
    el.textContent = Math.floor(c) + s;
  }, 16);
}
const sro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(n => {
        const r = n.textContent; const m = r.match(/(\d+\.?\d*)(.*)/);
        if (m) countUp(n, parseFloat(m[1]), m[2]);
      });
      sro.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stats-grid').forEach(el => sro.observe(el));

// ===== CARD TILT =====
document.querySelectorAll('.card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateZ(4px)`;
  });
  c.addEventListener('mouseleave', () => c.style.transform = '');
});
