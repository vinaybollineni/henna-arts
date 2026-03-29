/* ============================================
   MEGHNA'S HENNA ART — JavaScript
   ============================================ */

// === NAVIGATION ===
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Transparent nav on hero, solid when scrolled
function updateNav() {
    if (window.scrollY < 60) {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
    } else {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolled');
    }
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });
});

// === SCROLL TO TOP ===
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// === GALLERY FILTER ===
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
            const show = filter === 'all' || item.dataset.category === filter;
            item.classList.toggle('hidden', !show);
        });
    });
});

// === GALLERY LIGHTBOX ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let visibleItems = [];
let currentLightboxIndex = 0;

function openLightbox(index) {
    visibleItems = Array.from(galleryItems).filter(el => !el.classList.contains('hidden'));
    currentLightboxIndex = index;
    showLightboxImage(currentLightboxIndex);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function showLightboxImage(index) {
    const item = visibleItems[index];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.querySelector('.gallery-overlay span')?.textContent || '';
    lightboxImg.style.opacity = '0';
    setTimeout(() => { lightboxImg.style.opacity = '1'; lightboxImg.style.transition = 'opacity 0.3s'; }, 10);
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        visibleItems = Array.from(galleryItems).filter(el => !el.classList.contains('hidden'));
        const visibleIndex = visibleItems.indexOf(item);
        if (visibleIndex !== -1) openLightbox(visibleIndex);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

lightboxPrev.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
    showLightboxImage(currentLightboxIndex);
});
lightboxNext.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
    showLightboxImage(currentLightboxIndex);
});

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// === TESTIMONIALS CAROUSEL ===
const track = document.getElementById('testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');

let currentSlide = 0;
let autoplayTimer;

function getSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
}

function buildDots() {
    dotsContainer.innerHTML = '';
    const count = Math.ceil(testimonialCards.length / getSlidesPerView());
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    const perView = getSlidesPerView();
    const maxSlide = Math.ceil(testimonialCards.length / perView) - 1;
    currentSlide = Math.max(0, Math.min(index, maxSlide));

    // Card width including gap
    const cardWidth = track.parentElement.offsetWidth / perView;
    track.style.transform = `translateX(-${currentSlide * cardWidth * perView}px)`;

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });

    resetAutoplay();
}

function nextSlide() {
    const perView = getSlidesPerView();
    const maxSlide = Math.ceil(testimonialCards.length / perView) - 1;
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
}
function prevSlide() {
    const perView = getSlidesPerView();
    const maxSlide = Math.ceil(testimonialCards.length / perView) - 1;
    goToSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1);
}

function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 5000);
}

// Set card widths dynamically
function initCarousel() {
    const perView = getSlidesPerView();
    const trackWrap = track.parentElement;
    const gap = 24;
    const cardWidth = (trackWrap.offsetWidth - gap * (perView - 1)) / perView;

    testimonialCards.forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
    });
    track.style.gap = `${gap}px`;
    currentSlide = 0;
    track.style.transform = 'translateX(0)';
    buildDots();
    resetAutoplay();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Touch/swipe support
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
});

window.addEventListener('resize', initCarousel);
initCarousel();

// === CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', e => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !service || !message) {
        e.preventDefault();
        showMsg('Please fill in all fields.', 'error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        e.preventDefault();
        showMsg('Please enter a valid email address.', 'error');
        return;
    }
    showMsg('Sending your message...', 'info');
});

function showMsg(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
}

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Staggered reveal for cards
const staggerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const parent = entry.target;
            parent.querySelectorAll('.service-card, .highlight-item, .benefit-item').forEach((child, i) => {
                child.style.transitionDelay = `${i * 80}ms`;
                child.setAttribute('data-reveal', '');
                setTimeout(() => child.classList.add('revealed'), i * 80);
            });
            staggerObserver.unobserve(parent);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.services-grid, .about-highlights, .benefits-list').forEach(el => staggerObserver.observe(el));

// General fade-in for sections
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.about, .services, .organic-section, .gallery, .testimonials').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(el);
});

// Gallery and stats always visible
document.querySelectorAll('.stats-strip, .contact, .site-footer, section#home').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
});
