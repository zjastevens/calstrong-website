/**
 * California Strong Athletics - Main JavaScript
 * High-End Interactive Features
 */

// ==========================================
// Mobile Menu Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Mobile dropdown toggle
        const dropdownParents = navMenu.querySelectorAll('.dropdown > a');
        dropdownParents.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    
                    // Toggle visibility
                    if (dropdown.classList.contains('active')) {
                        dropdownMenu.style.display = 'block';
                    } else {
                        dropdownMenu.style.display = 'none';
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a dropdown link (but not the parent)
        const navLinks = navMenu.querySelectorAll('.dropdown-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
});

// ==========================================
// Sticky Navigation with Scroll
// ==========================================
let lastScroll = 0;
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class and shadow when scrolled
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Hide nav on scroll down, show on scroll up (optional, you can remove this if you want nav always visible)
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for sticky nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// Intersection Observer for Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe ALL elements with .reveal class for fade-in animation
document.querySelectorAll('.reveal').forEach(el => {
    fadeInObserver.observe(el);
});

// ==========================================
// FAQ Toggle Functionality
// ==========================================
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
}

// Make toggleFaq available globally
window.toggleFaq = toggleFaq;

// ==========================================
// Stats Counter Animation
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.dataset.count);
            
            if (!isNaN(count)) {
                animateCounter(target, count);
            }
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    statsObserver.observe(el);
});

// ==========================================
// Form Validation (for Contact & Trial pages)
// ==========================================
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        // Remove previous error states
        input.classList.remove('error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        
        // Validate
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'Please enter a valid email');
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'Please enter a valid phone number');
        }
    });
    
    return isValid;
}

function showError(input, message) {
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#ff4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
    input.parentElement.appendChild(error);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Attach validation to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(form)) {
            e.preventDefault();
            
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // Real-time validation on blur
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', function() {
            if (input.value.trim()) {
                validateForm(form);
            }
        });
    });
});

// ==========================================
// Image Lazy Loading Enhancement
// ==========================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Performance: Debounce Function
// ==========================================
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ==========================================
// Back to Top Button
// ==========================================
function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-green, #00FF00);
        color: var(--black, #000);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide on scroll
    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    }));
    
    // Click handler
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    });
}

// Initialize back to top button
createBackToTop();

// ==========================================
// Preload Critical Images
// ==========================================
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload hero image and key visuals
preloadImages([
    'images/hero-bg.jpg',
    'images/logo.png'
]);

// ==========================================
// Accessibility: Focus Management
// ==========================================
document.addEventListener('keydown', function(e) {
    // Add visible focus for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add CSS for keyboard navigation focus
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid var(--primary-green, #00FF00);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ==========================================
// Cookie Consent (Optional)
// ==========================================
function showCookieConsent() {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        return;
    }
    
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <div class="cookie-actions">
                <button class="btn-accept">Accept</button>
                <button class="btn-decline">Decline</button>
            </div>
        </div>
    `;
    
    banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--black, #000);
        color: var(--white, #fff);
        padding: 1.5rem;
        z-index: 9999;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(banner);
    
    banner.querySelector('.btn-accept').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.remove();
    });
    
    banner.querySelector('.btn-decline').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        banner.remove();
    });
}

// Uncomment to enable cookie consent
// showCookieConsent();

// ==========================================
// Print Styles Enhancement
// ==========================================
window.addEventListener('beforeprint', function() {
    // Hide unnecessary elements before printing
    document.querySelectorAll('nav, .back-to-top, .cookie-banner').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    document.querySelectorAll('nav, .back-to-top, .cookie-banner').forEach(el => {
        el.style.display = '';
    });
});

// ==========================================
// Console Welcome Message (Fun Easter Egg)
// ==========================================
console.log('%c🤸 Welcome to California Strong Athletics! 🤸', 'color: #00FF00; font-size: 20px; font-weight: bold;');
console.log('%cLooking to join our team? Email us at info@californiastrongathletics.com', 'color: #666; font-size: 14px;');
console.log('%cWebsite built with ❤️ for Cal Strong', 'color: #999; font-size: 12px;');

// ==========================================
// Performance Monitoring (Optional)
// ==========================================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
                console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
            }
        });
    });
    
    perfObserver.observe({ entryTypes: ['navigation'] });
}

// ==========================================
// Initialize Everything
// ==========================================
console.log('✅ Cal Strong Athletics website initialized successfully!');
