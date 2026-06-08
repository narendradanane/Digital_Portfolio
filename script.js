/* ═══════════════════════════════════════════
   NARENDRA DANANE — COLORFUL PORTFOLIO
   script.js
   ═══════════════════════════════════════════ */
'use strict';

/* ── NAV ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNav();
}, { passive: true });

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

function highlightNav() {
  const secs = document.querySelectorAll('section[id]');
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}
highlightNav();

/* ── TYPED ────────────────────────────────── */
(function typed() {
  const el = document.getElementById('heroTyped');
  if (!el) return;
  const lines = ['DevOps Engineer', 'Site Reliability Engineer', 'IAM Specialist', 'Infrastructure Automation'];
  let i = 0, c = 0, del = false;
  function tick() {
    const t = lines[i];
    if (!del) { el.textContent = t.slice(0, ++c); if (c === t.length) { del = true; setTimeout(tick, 2000); return; } }
    else       { el.textContent = t.slice(0, --c); if (c === 0) { del = false; i = (i + 1) % lines.length; } }
    setTimeout(tick, del ? 45 : 85);
  }
  setTimeout(tick, 1000);
})();

/* ── OBSERVER HELPER ─────────────────────── */
function onVisible(sel, cb, thr = 0.12) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { cb(e.target); obs.unobserve(e.target); } });
  }, { threshold: thr });
  document.querySelectorAll(sel).forEach(el => io.observe(el));
}

/* ── HERO COUNTERS ───────────────────────── */
onVisible('.hs-num', el => {
  const target = +el.dataset.v;
  let n = 0;
  const step = Math.ceil(target / 40);
  const id = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n;
    if (n >= target) clearInterval(id);
  }, 40);
}, 0.3);

/* ── SKILLS TABS ─────────────────────────── */
const tabs = document.querySelectorAll('.stab');
const panels = document.querySelectorAll('.skills-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) {
      panel.classList.add('active');
      // animate bars inside newly shown panel
      animateBarsIn(panel);
      animateCardsIn(panel);
    }
  });
});

function animateBarsIn(panel) {
  panel.querySelectorAll('.skc-fill').forEach((fill, i) => {
    const w = fill.dataset.w;
    fill.style.width = '0%';
    setTimeout(() => { fill.style.width = w + '%'; }, i * 60 + 80);
  });
}
function animateCardsIn(panel) {
  panel.querySelectorAll('.skcard').forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    setTimeout(() => {
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, i * 70);
  });
}

// initial animation for first tab
onVisible('#tab-devops', panel => {
  animateBarsIn(panel);
  panel.querySelectorAll('.skcard').forEach((c, i) => {
    c.style.transitionDelay = (i * 0.06) + 's';
    c.classList.add('visible');
  });
}, 0.1);

/* ── ALL OTHER SKILL CARDS VISIBLE ──────── */
onVisible('.skcard', el => el.classList.add('visible'), 0.05);

/* ── EXPERIENCE BUBBLES ──────────────────── */
onVisible('.exp-bubble', el => {
  el.classList.add('visible');
}, 0.15);

/* ── PROJECT CARDS ───────────────────────── */
document.querySelectorAll('.proj-card').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.1) + 's';
});
onVisible('.proj-card', el => el.classList.add('visible'), 0.1);

/* ── CERT CARDS ──────────────────────────── */
document.querySelectorAll('.cert-card').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.05) + 's';
});
onVisible('.cert-card', el => el.classList.add('visible'), 0.05);

/* ── EDUCATION CARDS ─────────────────────── */
document.querySelectorAll('.edu-card').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.12) + 's';
});
onVisible('.edu-card', el => {
  el.classList.add('visible');
  const fill = el.querySelector('.edu-cgpa-fill');
  if (fill) {
    const w = fill.dataset.w;
    setTimeout(() => { fill.style.width = w + '%'; }, 200);
  }
}, 0.1);

/* ── CSR CARDS ───────────────────────────── */
document.querySelectorAll('.csr-card').forEach((c, i) => {
  c.style.transitionDelay = (i * 0.08) + 's';
});
onVisible('.csr-card', el => el.classList.add('visible'), 0.08);

/* ── TESTIMONIAL CAROUSEL ─────────────────── */
(function carousel() {
  const track = document.getElementById('tcTrack');
  const prev  = document.getElementById('tcPrev');
  const next  = document.getElementById('tcNext');
  const dotsW = document.getElementById('tcDots');
  if (!track) return;
  const slides = track.querySelectorAll('.tc-slide');
  const total  = slides.length;
  let cur = 0, timer;

  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'tc-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => go(i);
    dotsW.appendChild(d);
  });

  function go(n) {
    cur = (n + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dotsW.querySelectorAll('.tc-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    reset();
  }
  function reset() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5500); }

  prev.onclick = () => go(cur - 1);
  next.onclick = () => go(cur + 1);
  reset();

  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 45) go(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();

/* ── TESTIMONIAL READ MORE MODAL ─────────── */
(function testiModal() {
  const overlay = document.getElementById('testiModal');
  const closeBtn = document.getElementById('testiModalClose');
  if (!overlay || !closeBtn) return;

  function openModal(slide) {
    document.getElementById('testiModalText').textContent = slide.dataset.full || '';
    document.getElementById('testiModalName').textContent = slide.dataset.name || '';
    document.getElementById('testiModalRole').textContent = slide.dataset.role || '';
    document.getElementById('testiModalCompany').textContent = slide.dataset.company || '';
    const img = document.getElementById('testiModalImg');
    img.src = slide.dataset.img || '';
    img.alt = slide.dataset.name || '';
    const li = document.getElementById('testiModalLi');
    li.href = slide.dataset.li || '#';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.tc-read-more').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.closest('.tc-slide'));
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ── PIPELINE PULSE ──────────────────────── */
(function pipelinePulse() {
  const nodes = document.querySelectorAll('.hlp-ico');
  if (!nodes.length) return;
  let idx = 0;
  const colors = ['rgba(240,80,50,.25)', 'rgba(211,56,51,.25)', 'rgba(123,66,188,.25)', 'rgba(50,108,229,.25)', 'rgba(244,104,0,.25)'];
  setInterval(() => {
    nodes.forEach((n, i) => n.style.boxShadow = '');
    nodes[idx].style.boxShadow = `0 0 0 6px ${colors[idx]}`;
    idx = (idx + 1) % nodes.length;
  }, 900);
})();

/* ── FLOATING TECH LABELS (hero) ──────────── */
(function hoverTech() {
  document.querySelectorAll('.hf').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-4px) scale(1.05)';
      el.style.boxShadow = '0 12px 32px rgba(0,0,0,.18)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });
})();

/* ── SMOOTH REVEAL ON SCROLL ─────────────── */
(function revealSections() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.about-img-wrap, .about-text-side, .homelab-card, .infosys-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    io.observe(el);
  });
})();

/* ── ACTIVE NAV INIT ─────────────────────── */
window.dispatchEvent(new Event('scroll'));
/* ── ANALYTICS EVENT TRACKING ───────────── */
(function () {
  function gaEvent(name, params) {
    if (typeof gtag === 'function') gtag('event', name, params || {});
  }

  // CV / Resume download tracking
  document.querySelectorAll('a[download]').forEach(function (el) {
    el.addEventListener('click', function () {
      gaEvent('cv_download', { file_name: el.getAttribute('href') });
    });
  });

  // Social & contact link tracking
  var socialMap = [
    { selector: 'a[href*="linkedin.com/in/narendra"]', event: 'linkedin_click' },
    { selector: 'a[href*="github.com/narendradanane"]', event: 'github_click' },
    { selector: 'a[href*="mailto:"]', event: 'email_click' },
    { selector: 'a[href*="wa.me/"]', event: 'whatsapp_click' },
    { selector: 'a[href="#contact"]', event: 'contact_click' },
  ];

  socialMap.forEach(function (item) {
    document.querySelectorAll(item.selector).forEach(function (el) {
      el.addEventListener('click', function () {
        gaEvent(item.event, { link_url: el.getAttribute('href') });
      });
    });
  });
})();
