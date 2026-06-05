// ===== INTRO LOADER + LANG PICKER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('intro-loader');
  const picker = document.getElementById('lang-picker');
  const nav    = document.getElementById('main-nav');

  setTimeout(() => {
    loader.classList.add('hidden');

    // Highlight the last-used language
    const saved = localStorage.getItem('lang') || 'en';
    picker.querySelectorAll('.lang-opt').forEach(btn => {
      btn.classList.toggle('current', btn.dataset.lang === saved);
    });

    // Always show picker on every page load
    setTimeout(() => picker.classList.add('active'), 400);

    picker.querySelectorAll('.lang-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.dataset.lang;
        const current = localStorage.getItem('lang') || 'en';
        localStorage.setItem('lang', chosen);

        // Switch language only if different from current
        if (chosen !== current) {
          document.getElementById('lang-toggle').click();
        }

        picker.classList.remove('active');
        picker.classList.add('done');
        setTimeout(() => nav.classList.add('visible'), 420);
      }, { once: true });
    });
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
const sections = ['card-about', 'what-i-do', 'card-tiktok', 'job-1', 'card-degrees', 'project-1', 'contact'];
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

// ===== SCROLL REVEAL (CSS fallback — GSAP section below overrides when available) =====
if (typeof gsap === 'undefined') {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), e.target.dataset.d || 0);
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => {
    const idx = Array.from(el.parentElement.children).indexOf(el);
    el.dataset.d = (idx >= 0 ? idx : 0) * 80;
    ro.observe(el);
  });
}

// ===== SKILL BARS (CSS fallback — GSAP section below overrides when available) =====
if (typeof gsap === 'undefined') {
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
}

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

// ===== CARD TILT (VanillaTilt) — desktop only =====
const isTouch = window.matchMedia('(pointer:coarse)').matches;
if (typeof VanillaTilt !== 'undefined' && !isTouch) {
  VanillaTilt.init(document.querySelectorAll(".card, .vf-product-card"), {
      max: 3,
      speed: 700,
      glare: true,
      "max-glare": 0.05,
      perspective: 1200
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
        radius: 130, maxSpeed: 'normal', initSpeed: 'slow', direction: 225, keep: true
    });
}

// ===== PROJECT ACCORDION =====
let _projTimer = null;
window.activateProject = function(el, isClick = false) {
    if (el.classList.contains('active')) return;
    clearTimeout(_projTimer);
    if (isClick) {
        document.querySelectorAll('.proj-acc-item').forEach(item => item.classList.remove('active'));
        el.classList.add('active');
    } else {
        _projTimer = setTimeout(() => {
            document.querySelectorAll('.proj-acc-item').forEach(item => item.classList.remove('active'));
            el.classList.add('active');
        }, 350); // Reduced sensitivity for hover
    }
};
// Cancel pending expand if mouse leaves the whole accordion
document.addEventListener('DOMContentLoaded', () => {
    const acc = document.querySelector('.projects-accordion');
    if (acc) acc.addEventListener('mouseleave', () => clearTimeout(_projTimer));

    // ===== VIDEO SHOWCASE SLIDER =====
    const vsGrid  = document.getElementById('vs-grid');
    const vsPrev  = document.getElementById('vs-prev');
    const vsNext  = document.getElementById('vs-next');
    const vsDots  = document.querySelectorAll('.vs-dot');
    if (vsGrid && vsPrev && vsNext) {
        const SLOT_W = 272; // 260px slot + 12px gap
        const TOTAL  = 4;
        let idx = 0;

        function vsGoTo(i) {
            idx = Math.max(0, Math.min(i, TOTAL - 1));
            vsGrid.scrollTo({ left: idx * SLOT_W, behavior: 'smooth' });
            vsDots.forEach((d, j) => d.classList.toggle('active', j === idx));
            vsPrev.disabled = idx === 0;
            vsNext.disabled = idx === TOTAL - 1;
        }

        vsPrev.addEventListener('click', () => vsGoTo(idx - 1));
        vsNext.addEventListener('click', () => vsGoTo(idx + 1));
        vsDots.forEach(d => d.addEventListener('click', () => vsGoTo(+d.dataset.idx)));

        vsGrid.addEventListener('scroll', () => {
            const i = Math.round(vsGrid.scrollLeft / SLOT_W);
            if (i !== idx) { idx = i; vsDots.forEach((d, j) => d.classList.toggle('active', j === idx)); vsPrev.disabled = idx === 0; vsNext.disabled = idx === TOTAL - 1; }
        }, { passive: true });
    }
    
    // Mobile: auto-activate accordion items on scroll
    const accItems = document.querySelectorAll('.proj-acc-item');
    if (accItems.length) {
        const mobObserver = new IntersectionObserver((entries) => {
            if (window.innerWidth > 900) return; // Only apply on mobile
            entries.forEach(e => {
                if (e.isIntersecting) {
                    activateProject(e.target, true);
                }
            });
        }, { threshold: 0.5, rootMargin: "-15% 0px -15% 0px" });
        accItems.forEach(item => mobObserver.observe(item));
    }
});

// ===== NAME WIDTH LOCK (prevent Syne/Vietnamese fallback from clipping last char) =====
document.fonts.ready.then(() => {
  document.querySelectorAll('.name-main .sc-char').forEach(s => {
    const w = s.getBoundingClientRect().width;
    if (w > 0) s.style.width = w + 'px';
  });
});

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




// ===== PARALLAX ORBS (CSS fallback — GSAP ScrollTrigger scrub overrides when available) =====
if (typeof gsap === 'undefined') {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const orb1 = document.querySelector('.orb1');
    const orb2 = document.querySelector('.orb2');
    const orb3 = document.querySelector('.orb3');
    if (orb1) orb1.style.transform = `translate(0, ${y * 0.12}px)`;
    if (orb2) orb2.style.transform = `translate(0, ${-y * 0.08}px)`;
    if (orb3) orb3.style.transform = `translate(0, ${y * 0.06}px)`;
  }, { passive: true });
}

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
    btn.dataset.tooltip = isEN ? '🇻🇳 Xem bằng Tiếng Việt' : '🇬🇧 View in English';

    // Sync CV download links to current language
    ['nav-download', 'footer-download'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = isEN ? 'letanthinh-cv-en.pdf' : 'letanthinh-cv-vi.pdf';
    });

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

  applyLang();

  btn.addEventListener('click', () => {
    isEN = !isEN;
    localStorage.setItem('lang', isEN ? 'en' : 'vi');
    applyLang();
  });
})();

// ===== BACKEND API HELPERS =====
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? ''   // local dev: relative path (dùng vercel dev)
  : '';  // production: same origin trên Vercel

function getLang() {
  return localStorage.getItem('lang') === 'vi' ? 'vi' : 'en';
}

function apiPost(path, body) {
  return fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json());
}

// ===== CONTACT FORM =====
(function() {
  const form     = document.getElementById('cf-form');
  const statusEl = document.getElementById('cf-status');
  const submitBtn = document.getElementById('cf-submit');
  if (!form) return;

  const MSG = {
    sending: { vi: 'Đang gửi...', en: 'Sending...' },
    success: { vi: '✓ Đã gửi! Thịnh sẽ liên hệ lại sớm.', en: '✓ Sent! Thịnh will get back to you soon.' },
    error:   { vi: '✗ Gửi thất bại, vui lòng thử lại.', en: '✗ Failed to send. Please try again.' },
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = getLang();

    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email) return;

    submitBtn.disabled = true;
    statusEl.className = 'cf-status';
    statusEl.textContent = MSG.sending[lang];

    try {
      const res = await apiPost('/api/contact', { name, email, subject, message, lang });

      if (res.success) {
        statusEl.className = 'cf-status success';
        statusEl.textContent = MSG.success[lang];
        form.reset();
        setTimeout(() => { statusEl.textContent = ''; statusEl.className = 'cf-status'; }, 6000);
      } else {
        throw new Error(res.error || 'unknown');
      }
    } catch {
      statusEl.className = 'cf-status error';
      statusEl.textContent = MSG.error[lang];
    } finally {
      submitBtn.disabled = false;
    }
  });
})();

// ===== CV DOWNLOAD TRACKING =====
(function() {
  document.querySelectorAll('[download], #nav-download, #footer-download').forEach(el => {
    el.addEventListener('click', () => {
      apiPost('/api/download', { lang: getLang() }).catch(() => {});
    });
  });
})();

// ===== GSAP SCROLL ANIMATIONS =====
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll — desktop only (touch devices use native scroll) ──
  if (typeof Lenis !== 'undefined' && !isTouch) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const HERO_IDS = new Set(['card-identity', 'card-avatar', 'card-stats', 'card-contact']);
  const BATCH_CLASSES = ['.hl-cell', '.service-card', '.timeline-item'];

  function isHandledSpecially(el) {
    if (HERO_IDS.has(el.id)) return true;
    return BATCH_CLASSES.some(sel => el.matches(sel));
  }

  // Kill CSS transitions on .reveal elements so GSAP controls properties cleanly
  document.querySelectorAll('.reveal').forEach(el => { el.style.transition = 'none'; });
  document.querySelectorAll('.skill-fill').forEach(b => { b.style.transition = 'none'; });

  // Pre-set sub-elements that live INSIDE .reveal parents to their "from" state,
  // so they stay invisible when the parent card fades in and only appear on their own trigger.
  gsap.set('.kol-item',      { opacity: 0, x: -18 });
  gsap.set('.edu-item',      { opacity: 0, x: 18 });
  gsap.set('.tech-ball-wrap',{ opacity: 0, scale: 0.3 });
  gsap.set('.cs-gallery-item', { clipPath: 'inset(0% 100% 0% 0%)' });

  // ── 1. Hero bento entrance — fires after intro loader (~1800ms) ──
  gsap.set('#card-identity', { opacity: 0, x: -32 });
  gsap.set('#card-avatar',   { opacity: 0, scale: 0.86 });
  gsap.set('#card-stats',    { opacity: 0, y: 28 });
  gsap.set('#card-contact',  { opacity: 0, x: 32 });

  setTimeout(() => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('#card-identity', { opacity: 1, x: 0, duration: 0.75 })
      .to('#card-avatar',   { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)' }, '-=0.5')
      .to('#card-stats',    { opacity: 1, y: 0, duration: 0.65 }, '-=0.45')
      .to('#card-contact',  { opacity: 1, x: 0, duration: 0.65 }, '-=0.5');
  }, 2050);

  // ── Hero parallax — subtle depth on scroll ──
  const heroParallax = [
    { sel: '#card-identity', y: -28 },
    { sel: '#card-avatar',   y: -16 },
    { sel: '#card-stats',    y: -10 },
    { sel: '#card-contact',  y: -8  },
  ];
  heroParallax.forEach(({ sel, y }) => {
    gsap.to(sel, {
      y, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 },
    });
  });

  // ── 2. General reveal: every .reveal not handled by a specific animation ──
  gsap.utils.toArray('.reveal').forEach(el => {
    if (isHandledSpecially(el)) return;
    gsap.fromTo(el,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  // ── 3. Career highlights: scale + stagger pop-in ──
  ScrollTrigger.batch('.hl-cell', {
    onEnter: batch => gsap.fromTo(batch,
      { opacity: 0, y: 26, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.5, ease: 'power2.out' }
    ),
    start: 'top 88%',
    once: true,
  });

  // ── 4. Service cards: stagger slide-up ──
  ScrollTrigger.batch('.service-card', {
    onEnter: batch => gsap.fromTo(batch,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, stagger: 0.14, duration: 0.7, ease: 'power2.out' }
    ),
    start: 'top 88%',
    once: true,
  });

  // ── 5. Timeline items: slide from left ──
  gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.fromTo(item,
      { opacity: 0, x: -36 },
      {
        opacity: 1, x: 0, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 86%', once: true },
      }
    );
  });

  // ── 6. Skill bars: smooth GSAP width animation ──
  ScrollTrigger.create({
    trigger: '#card-skills',
    start: 'top 80%',
    once: true,
    onEnter() {
      document.querySelectorAll('#card-skills .skill-fill').forEach((bar, i) => {
        gsap.fromTo(bar,
          { width: 0 },
          { width: bar.dataset.width + '%', duration: 1.3, delay: 0.1 + i * 0.1, ease: 'power2.out' }
        );
      });
    },
  });

  // ── 7. Tech balls: scale pop-in with stagger ──
  ScrollTrigger.create({
    trigger: '.tech-section-bg',
    start: 'top 82%',
    once: true,
    onEnter() {
      gsap.fromTo('.tech-ball-wrap',
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, stagger: { amount: 0.85, from: 'start' }, duration: 0.45, ease: 'back.out(1.8)' }
      );
    },
  });

  // ── 8. KOL items: slide from left ──
  ScrollTrigger.batch('.kol-item', {
    onEnter: batch => gsap.fromTo(batch,
      { opacity: 0, x: -18 },
      { opacity: 1, x: 0, stagger: 0.09, duration: 0.4, ease: 'power2.out' }
    ),
    start: 'top 88%',
    once: true,
  });

  // ── 9. Education items: slide from right ──
  ScrollTrigger.batch('.edu-item', {
    onEnter: batch => gsap.fromTo(batch,
      { opacity: 0, x: 18 },
      { opacity: 1, x: 0, stagger: 0.09, duration: 0.4, ease: 'power2.out' }
    ),
    start: 'top 88%',
    once: true,
  });

  // ── 10. Clip-path reveal — gallery images sweep from right ──
  gsap.utils.toArray('.cs-gallery-item').forEach((item, i) => {
    gsap.to(item, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.8,
      ease: 'power3.out',
      delay: (i % 2) * 0.14,
      scrollTrigger: { trigger: item, start: 'top 84%', once: true },
    });
  });

  // ── Video slots: stagger fade-up entrance ──
  ScrollTrigger.batch('.video-slot', {
    onEnter: batch => gsap.from(batch, {
      opacity: 0, y: 24, stagger: 0.1, duration: 0.6, ease: 'power2.out', clearProps: 'all'
    }),
    start: 'top 86%',
    once: true,
  });

  // ── Horizontal video drag-scroll (CSS-based, no pin) ──
  const videoGrid = document.querySelector('.video-showcase-grid');
  if (videoGrid) {
    let isDragging = false, startX = 0, scrollStart = 0;
    videoGrid.addEventListener('mousedown', e => {
      isDragging = true; startX = e.pageX; scrollStart = videoGrid.scrollLeft;
      videoGrid.style.cursor = 'grabbing'; videoGrid.style.userSelect = 'none';
    });
    document.addEventListener('mouseup', () => {
      isDragging = false; videoGrid.style.cursor = 'grab'; videoGrid.style.userSelect = '';
    });
    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      videoGrid.scrollLeft = scrollStart - dx * 1.4;
    });
  }

  // ── 10. Parallax orbs: ScrollTrigger scrub (replaces scroll listener) ──
  if (document.querySelector('.orb1')) {
    gsap.to('.orb1', { y: 120, ease: 'none', scrollTrigger: { scrub: 1.2 } });
    gsap.to('.orb2', { y: -80, ease: 'none', scrollTrigger: { scrub: 1.5 } });
    gsap.to('.orb3', { y: 60,  ease: 'none', scrollTrigger: { scrub: 1.0 } });
  }

  // ── Reduced motion: skip all GSAP ──
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.globalTimeline.clear();
    document.querySelectorAll('.reveal').forEach(el => {
      gsap.set(el, { clearProps: 'all' });
      el.style.transition = '';
    });
    HERO_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) gsap.set(el, { clearProps: 'all' });
    });
    gsap.set('.cs-gallery-item', { clearProps: 'clipPath' });
  }
})();

// ===== ANALYTICS — PAGE VIEW + SECTION TRACKING =====
(function() {
  // Page view on load
  apiPost('/api/analytics', {
    event_type: 'page_view',
    payload: { lang: getLang(), path: location.pathname },
  }).catch(() => {});

  // Section views (dùng lại IntersectionObserver riêng)
  const tracked = new Set();
  const sectionMap = {
    'what-i-do': 'services',
    'card-tiktok': 'tiktok',
    'job-1': 'experience',
    'card-degrees': 'education',
    'project-1': 'projects',
    'contact': 'contact',
  };

  const svo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !tracked.has(e.target.id)) {
        tracked.add(e.target.id);
        apiPost('/api/analytics', {
          event_type: 'section_view',
          payload: { section: sectionMap[e.target.id], lang: getLang() },
        }).catch(() => {});
      }
    });
  }, { threshold: 0.4 });

  Object.keys(sectionMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) svo.observe(el);
  });

  // Book call clicks
  document.querySelectorAll('.hero-book-btn, .booking-cta').forEach(el => {
    el.addEventListener('click', () => {
      apiPost('/api/analytics', {
        event_type: 'book_call_click',
        payload: { lang: getLang() },
      }).catch(() => {});
    });
  });
})();

// ===== VIDEO MODAL LOGIC =====
window.openVideoModal = function(videoUrl) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  if(modal && iframe) {
    // Add autoplay param safely
    const separator = videoUrl.includes('?') ? '&' : '?';
    iframe.src = videoUrl + separator + 'autoplay=1';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeVideoModal = function() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  if(modal && iframe) {
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

document.addEventListener('click', (e) => {
  const modal = document.getElementById('video-modal');
  if(modal && modal.classList.contains('active')) {
    if(e.target === modal) {
      closeVideoModal();
    }
  }
});
