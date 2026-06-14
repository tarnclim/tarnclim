/* ================================================
   TARN CLIM – Main script
   ================================================ */

/* ── Année courante dans le footer ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Sticky header ── */
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile nav ── */
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

/* ── Reveal on scroll ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);
reveals.forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);
statsObserver.observe(statsSection);

/* ── Testimonials slider ── */
const track   = document.getElementById('temoignages-track');
const dotsWrap = document.getElementById('temo-dots');
const cards   = track.querySelectorAll('.temo-card');
let current   = 0;
let isDown    = false;
let startX    = 0;
let scrollLeft = 0;
let autoTimer;

const perView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function buildDots() {
  dotsWrap.innerHTML = '';
  const pages = Math.ceil(cards.length / perView());
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'temo-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Page ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }
}

function goTo(index) {
  const pages = Math.ceil(cards.length / perView());
  current = Math.max(0, Math.min(index, pages - 1));
  const cardW = track.querySelector('.temo-card').offsetWidth + 24;
  track.scrollTo({ left: current * perView() * cardW, behavior: 'smooth' });
  dotsWrap.querySelectorAll('.temo-dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('temo-prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('temo-next').addEventListener('click', () => goTo(current + 1));

function startAuto() {
  autoTimer = setInterval(() => goTo((current + 1) % Math.ceil(cards.length / perView())), 5000);
}
function stopAuto() { clearInterval(autoTimer); }

track.addEventListener('mouseenter', stopAuto);
track.addEventListener('mouseleave', startAuto);
track.addEventListener('touchstart', stopAuto, { passive: true });

track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; track.style.cursor = 'grabbing'; });
track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = 'grab'; });
track.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  track.scrollLeft = scrollLeft - (x - startX) * 1.2;
});

buildDots();
startAuto();
window.addEventListener('resize', buildDots);

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => activeObserver.observe(s));

/* ── Lightbox (galerie photobox) ── */
const galleryItems = [...document.querySelectorAll('.gallery .gallery-item')];
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxCap   = document.getElementById('lightbox-caption');
let lbIndex = 0;

function showLightbox(index) {
  lbIndex = (index + galleryItems.length) % galleryItems.length;
  const img = galleryItems[lbIndex].querySelector('img');
  const cap = galleryItems[lbIndex].querySelector('figcaption');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCap.textContent = cap ? cap.textContent : '';
}

function openLightbox(index) {
  showLightbox(index);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); showLightbox(lbIndex - 1); });
document.getElementById('lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); showLightbox(lbIndex + 1); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showLightbox(lbIndex - 1);
  if (e.key === 'ArrowRight') showLightbox(lbIndex + 1);
});
