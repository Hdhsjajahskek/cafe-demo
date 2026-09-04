// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect on hero background
    if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== MENU TABS =====
const tabs = document.querySelectorAll('.tab');
const menuCards = document.querySelectorAll('.menu-card');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.tab;

        menuCards.forEach((card, index) => {
            if (card.dataset.category === category) {
                card.classList.remove('hidden');
                card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== TESTIMONIAL SLIDER =====
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('sliderDots');
const slides = track.querySelectorAll('.testimonial-card');
let currentSlide = 0;
let autoplayInterval;

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

startAutoplay();

const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseenter', stopAutoplay);
slider.addEventListener('mouseleave', startAutoplay);

// ===== GALLERY LIGHTBOX =====
const galleryImages = document.querySelectorAll('.gallery-item img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        setTimeout(() => lightbox.classList.add('active'), 10);

        const close = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        };

        lightbox.querySelector('.lightbox-close').addEventListener('click', close);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) close();
        });
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = '✓';
    btn.style.background = '#5a8a5a';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        newsletterForm.reset();
    }, 2000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== INJECT EXTRA STYLES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Lightbox */
    .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    }
    .lightbox.active { opacity: 1; }
    .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    .lightbox.active .lightbox-content { transform: scale(1); }
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: var(--terracotta);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s;
    }
    .lightbox-close:hover {
        background: var(--terracotta-dark);
        transform: rotate(90deg);
    }
`;
document.head.appendChild(style);
