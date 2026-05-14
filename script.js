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



// ===== NAME DECODE EFFECT =====
(function() {
  const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&?!*';
  const ORIG = ['T','H','Ị','N','H'];

  function runDecode(spans) {
    let frame = 0;
    const TOTAL = 22;
    let id = setInterval(() => {
      spans.forEach((s, i) => {
        const resolveAt = TOTAL - (ORIG.length - 1 - i) * 3;
        s.textContent = (frame >= resolveAt)
          ? ORIG[i]
          : POOL[Math.floor(Math.random() * POOL.length)];
      });
      if (++frame > TOTAL + 2) clearInterval(id);
    }, 40);
  }

  document.fonts.ready.then(() => {
    const h1 = document.querySelector('.name-main');
    if (!h1) return;
    const spans = h1.querySelectorAll('.sc-char');
    if (!spans.length) return;

    // Lock each span to its natural rendered width so random chars never shift layout
    spans.forEach(s => {
      const w = s.getBoundingClientRect().width;
      if (w > 0) s.style.width = w + 'px';
    });

    // Decode on initial load (after intro fades at ~1800ms)
    setTimeout(() => runDecode(spans), 2200);

    // Re-trigger on hover
    h1.addEventListener('mouseenter', () => runDecode(spans));
  });
})();

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
