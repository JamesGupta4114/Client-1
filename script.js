// ---- Navbar shrink + mobile toggle ----
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.navbar nav');
const toggleBtn = document.querySelector('.nav-toggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // parallax hero
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const offset = window.scrollY * 0.35;
    heroBg.style.transform = `scale(1.15) translateY(${offset}px)`;
  }
});

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---- 3D tilt on cards ----
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ---- Menu photo subtle tilt ----
document.querySelectorAll('.menu-photo').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
  });
});

// ---- Active nav link highlighting by current page ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
