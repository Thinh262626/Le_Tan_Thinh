// ===== INTRO LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('intro-loader').classList.add('hidden');
    document.getElementById('main-nav').classList.add('visible');
  }, 1800);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileClose = document.getElementById('mobile-close');
function openMenu() { hamburger.classList.add('open'); mobileMenu.classList.add('open'); mobileOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); mobileOverlay.classList.remove('open'); document.body.style.overflow = ''; }
hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));

// ===== CURSOR GLOW (ambient) =====
const cg = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => { cg.style.left = e.clientX + 'px'; cg.style.top = e.clientY + 'px'; });
document.addEventListener('mouseleave', () => cg.style.opacity = '0');
document.addEventListener('mouseenter', () => cg.style.opacity = '1');

// ===== CUSTOM CURSOR (dot + ring) =====
(function() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring || window.matchMedia('(pointer:coarse)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Smooth ring follows with lerp
  (function lerpRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerpRing);
  })();

  // Hover expand
  const targets = 'a,button,[onclick],.card,.tech-ball-wrap,.video-slot,.proj-acc-item,.service-card,.stat-cell,.hl-cell';
  document.querySelectorAll(targets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
  });

  // Click pulse
  document.addEventListener('mousedown', () => document.body.classList.add('cur-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cur-click'));

  // Hide when leaving window
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

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
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => { 
  // Stagger effect based on index in parent
  const idx = Array.from(el.parentElement.children).indexOf(el);
  el.dataset.d = (idx >= 0 ? idx : 0) * 80; 
  ro.observe(el); 
});

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

// ===== CARD TILT (VanillaTilt) =====
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      perspective: 1000
  });
}

// ===== 3D TECH SPHERE (TagCloud) =====
const skillsContainer = document.getElementById('skills-sphere');
if (skillsContainer && typeof TagCloud !== 'undefined') {
    const mySkills = [
        'Marketing', 'Branding', 'TikTok',
        'Sales', 'AIGC', 'AI · n8n',
        'Leadership', 'KOL Mgmt', 'ISO 9001',
        'Luxury', 'Analytics', 'MBA', 'Strategy', 'Content'
    ];
    TagCloud(skillsContainer, mySkills, {
        radius: 130, maxSpeed: 'fast', initSpeed: 'normal', direction: 225, keep: true
    });
}

// ===== PROJECT ACCORDION =====
window.activateProject = function(el) {
    document.querySelectorAll('.proj-acc-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
};

// ===== MAGNETIC EFFECT (service cards) =====
document.querySelectorAll('.service-card .svc-icon, .nav-cta, .footer-btn').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px) scale(1.08)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform .4s cubic-bezier(.22,1,.36,1)';
    setTimeout(() => el.style.transition = '', 400);
  });
});



// ===== PARALLAX ORBS =====
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const orb1 = document.querySelector('.orb1');
  const orb2 = document.querySelector('.orb2');
  const orb3 = document.querySelector('.orb3');
  if (orb1) orb1.style.transform = `translate(0, ${y * 0.12}px)`;
  if (orb2) orb2.style.transform = `translate(0, ${-y * 0.08}px)`;
  if (orb3) orb3.style.transform = `translate(0, ${y * 0.06}px)`;
}, { passive: true });

// ===== FLOATING CONTACT =====
const floatContact = document.getElementById('float-contact');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) floatContact.classList.add('visible');
  else floatContact.classList.remove('visible');
}, { passive: true });

// ===== TYPEWRITER =====
(function() {
  const roles = [
    'Marketing & Brand Strategist',
    'TikTok Content Ecosystem Builder',
    'AI Automation Consultant',
    'Luxury Brand Specialist',
    'Sales · 6B VND Revenue',
    'Content Creator · 200M+ Views',
  ];
  const el = document.getElementById('typewriter-role');
  if (!el) return;
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    if (!deleting && ci > word.length) {
      deleting = true;
      setTimeout(tick, 2200);
    } else if (deleting && ci < 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
      setTimeout(tick, 420);
    } else {
      setTimeout(tick, deleting ? 36 : 68);
    }
  }
  // Bắt đầu sau khi intro loader biến mất
  setTimeout(tick, 2000);
})();

// ===== LANGUAGE TOGGLE =====
(function() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  // Default to EN if no preference is saved
  let savedLang = localStorage.getItem('lang');
  let isEN = savedLang === null ? true : (savedLang === 'en');

  function applyLang() {
    document.documentElement.lang = isEN ? 'en' : 'vi';
    btn.textContent = isEN ? 'VI' : 'EN';

    // Plain text swaps
    document.querySelectorAll('[data-en]').forEach(el => {
      if (isEN) {
        if (!el.dataset.vi) el.dataset.vi = el.textContent.trim();
        el.textContent = el.dataset.en;
      } else {
        if (el.dataset.vi) el.textContent = el.dataset.vi;
      }
    });

    // HTML content swaps (elements with bold/em/br inside)
    document.querySelectorAll('[data-en-html]').forEach(el => {
      if (isEN) {
        if (!el.dataset.viHtml) el.dataset.viHtml = el.innerHTML;
        el.innerHTML = el.dataset.enHtml;
      } else {
        if (el.dataset.viHtml) el.innerHTML = el.dataset.viHtml;
      }
    });

    // Placeholder swaps
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      if (isEN) {
        if (!el.dataset.viPlaceholder) el.dataset.viPlaceholder = el.placeholder;
        el.placeholder = el.dataset.enPlaceholder;
      } else {
        if (el.dataset.viPlaceholder) el.placeholder = el.dataset.viPlaceholder;
      }
    });
  }

  if (isEN) applyLang();

  btn.addEventListener('click', () => {
    isEN = !isEN;
    localStorage.setItem('lang', isEN ? 'en' : 'vi');
    applyLang();
  });
})();
