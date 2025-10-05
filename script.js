// ===============================
// Mobile Navigation Toggle
// ===============================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===============================
// Animate elements on scroll
// ===============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.invitation-content, .carousel-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===============================
// Countdown Timer
// ===============================
function updateCountdown() {
    const weddingDate = new Date('2025-12-06T16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = `
            <div class="wedding-day-message">
                <h3>🎉 Today is the day! 🎉</h3>
                <p>Mac & Theresa are getting married!</p>
            </div>`;
    }
}
setInterval(updateCountdown, 1000);

// ===============================
// Carousel (Timeline Section)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        if (slides[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }

    function changeSlide(direction) {
        currentSlideIndex += direction;
        if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
        showSlide(currentSlideIndex);
    }

    if (prevBtn) prevBtn.addEventListener('click', e => { e.preventDefault(); changeSlide(-1); });
    if (nextBtn) nextBtn.addEventListener('click', e => { e.preventDefault(); changeSlide(1); });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', e => {
            e.preventDefault();
            currentSlideIndex = idx;
            showSlide(currentSlideIndex);
        });
    });

    // Swipe support for mobile
    let startX = 0;
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', e => startX = e.touches[0].clientX);
        carouselContainer.addEventListener('touchend', e => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) changeSlide(1);
            if (endX - startX > 50) changeSlide(-1);
        });
    }


});

// ===============================
// OUR MEMORIES Lightbox Gallery
// ===============================
let currentGalleryIndex = 0;
const gallerySection = document.querySelector('#gallery');
const galleryImages = Array.from(gallerySection.querySelectorAll('.carousel__face img'));
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImage = document.getElementById('lightbox-image');

function openGallery(index) {
    currentGalleryIndex = index;
    lightboxImage.src = galleryImages[currentGalleryIndex].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeGalleryImage(direction) {
    currentGalleryIndex += direction;
    if (currentGalleryIndex >= galleryImages.length) currentGalleryIndex = 0;
    if (currentGalleryIndex < 0) currentGalleryIndex = galleryImages.length - 1;
    lightboxImage.src = galleryImages[currentGalleryIndex].src;
}

lightbox.addEventListener('click', (e) => {
    if (e.target.id === 'gallery-lightbox') closeGallery();
});

// ===============================
// Map Modal
// ===============================
function openMapModal() {
    document.getElementById('map-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMapModal() {
    document.getElementById('map-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

const mapModal = document.getElementById('map-modal');
mapModal.addEventListener('click', (e) => {
    if (e.target.id === 'map-modal') closeMapModal();
});

// ===============================
// Parallax Effect for Hero Image
// ===============================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===============================
// Page Fade-In Animation
// ===============================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===============================
// Add CSS for animations dynamically
// ===============================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .hamburger.active .bar:nth-child(2) { opacity: 0; }
    .hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
`;
document.head.appendChild(style);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGallery();
        closeMapModal();
    }
});