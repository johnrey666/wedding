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

 // Scroll Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.couple-names, .parent-card, .sponsors-container, .role-card, .attire-section, .wedding-timeline-section, .timeline-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for decorative leaves
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
            const speed = 0.1 + (index * 0.05);
            leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Add stagger animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100);
                });
                timelineObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const timelineSection = document.querySelector('.wedding-timeline-section');
    if (timelineSection) {
        timelineObserver.observe(timelineSection);
    }

    // Smooth reveal for sponsor names
    const sponsorCard = document.querySelector('.sponsors-card');
    const sponsorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sponsorCard.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    if (sponsorCard) {
        sponsorObserver.observe(sponsorCard);
    }
});

// Add mouse move parallax effect for cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.parent-card, .role-card, .timeline-item');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to card center
        const distanceX = (e.clientX - cardCenterX) / 1000;
        const distanceY = (e.clientY - cardCenterY) / 1000;

        // Only apply effect if hovering
        if (card.matches(':hover')) {
            const currentTransform = window.getComputedStyle(card).transform;
            
            if (card.classList.contains('parent-card')) {
                card.style.transform = `translateY(-15px) scale(1.02) perspective(1000px) rotateY(${distanceX * 10}deg) rotateX(${-distanceY * 10}deg)`;
            } else if (card.classList.contains('role-card')) {
                card.style.transform = `translateY(-20px) scale(1.05) perspective(1000px) rotateY(${distanceX * 10}deg) rotateX(${-distanceY * 10}deg)`;
            }
        } else {
            // Reset transform when not hovering
            card.style.transform = '';
        }
    });
});

// Add tilt effect on mobile touch
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Add subtle parallax effect while scrolling on mobile
    const scrolled = window.pageYOffset;
    const greenSection = document.querySelector('.entourage-green-section');
    const whiteSection = document.querySelector('.entourage-white-section');
    
    if (greenSection) {
        greenSection.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
    if (whiteSection) {
        whiteSection.style.transform = `translateY(${scrolled * 0.03}px)`;
    }
});

// Smooth scroll reveal animation for sections
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe main sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.entourage-green-section, .entourage-white-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 1s ease-out';
        sectionObserver.observe(section);
    });
});

// Add gradient animation to parent cards
document.addEventListener('DOMContentLoaded', () => {
    const parentCards = document.querySelectorAll('.parent-card');
    
    parentCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'rgba(255, 255, 255, 0.18)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255, 255, 255, 0.12)';
        });
    });
});

// Enhanced scroll animations with velocity
let lastScrollTop = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollVelocity = scrollTop - lastScrollTop;
    lastScrollTop = scrollTop;

    // Apply velocity-based parallax to decorative elements
    const decorativeLeaves = document.querySelector('.decorative-leaves');
    if (decorativeLeaves) {
        decorativeLeaves.style.transform = `translateY(${scrollVelocity * 0.5}px)`;
    }
}, { passive: true });

// Add ripple effect on card click (mobile)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.parent-card, .role-card, .timeline-item, .sponsors-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            
            const rect = card.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(15);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Update parallax elements
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach((leaf, index) => {
        const speed = 0.1 + (index * 0.05);
        requestAnimationFrame(() => {
            leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

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

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    audio.volume = 0.3; // 30% volume

    // Resume autoplay after user gesture (handles browser policies)
    document.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().catch(e => console.log('Autoplay prevented:', e));
        }
    }, { once: true });
});

