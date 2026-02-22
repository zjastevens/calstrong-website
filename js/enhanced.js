/**
 * California Strong Athletics - Enhanced Interactive Features
 * Advanced animations, interactions, and performance optimizations
 */

(function() {
    'use strict';

    // ==========================================
    // Performance Optimization: RequestAnimationFrame
    // ==========================================
    const RAF = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) { setTimeout(callback, 1000 / 60); };

    // ==========================================
    // Smooth Scroll with Easing
    // ==========================================
    function smoothScrollTo(target, duration = 800) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) RAF(animation);
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        RAF(animation);
    }

    // Enhanced anchor link scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    smoothScrollTo(target);
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });

    // ==========================================
    // Advanced Intersection Observer with Animations
    // ==========================================
    const animateOnScroll = () => {
        const observers = new Map();

        // Fade in animation
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });

        // Scale in animation
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    scaleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Slide in from left
        const slideLeftObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    slideLeftObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Slide in from right
        const slideRightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    slideRightObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Apply animations
        document.querySelectorAll('.feature-card, .program-card, .testimonial-card').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(el);
        });

        document.querySelectorAll('.benefit-item').forEach((el, index) => {
            if (index % 2 === 0) {
                el.style.opacity = '0';
                el.style.transform = 'translateX(-30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                slideLeftObserver.observe(el);
            } else {
                el.style.opacity = '0';
                el.style.transform = 'translateX(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                slideRightObserver.observe(el);
            }
        });

        document.querySelectorAll('.stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            scaleObserver.observe(el);
        });
    };

    // ==========================================
    // Parallax Scrolling Effect
    // ==========================================
    const parallaxEffect = () => {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }

        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                RAF(updateParallax);
            });
        }
    };

    // ==========================================
    // Advanced Button Interactions
    // ==========================================
    const enhanceButtons = () => {
        document.querySelectorAll('.btn').forEach(button => {
            // Add ripple effect container
            if (!button.classList.contains('btn-ripple')) {
                button.classList.add('btn-ripple');
            }

            // Magnetic button effect (desktop only)
            if (window.innerWidth > 768) {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                });

                button.addEventListener('mouseleave', () => {
                    button.style.transform = '';
                });
            }

            // Add click animation
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation if not exists
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==========================================
    // Enhanced Card Hover Effects
    // ==========================================
    const enhanceCards = () => {
        document.querySelectorAll('.feature-card, .program-card, .testimonial-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth <= 768) return; // Disable on mobile
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    // ==========================================
    // Typing Effect for Headlines
    // ==========================================
    const typingEffect = (element, text, speed = 50) => {
        let index = 0;
        element.textContent = '';
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        type();
    };

    // ==========================================
    // Lazy Loading Images with Blur Effect
    // ==========================================
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src || img.src;
                    
                    // Create a low-res placeholder effect
                    img.style.filter = 'blur(10px)';
                    img.style.transition = 'filter 0.5s ease';
                    
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        img.src = src;
                        img.style.filter = 'blur(0)';
                    };
                    tempImg.src = src;
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    };

    // ==========================================
    // Scroll Progress Indicator
    // ==========================================
    const addScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-green), var(--accent-yellow));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        function updateProgress() {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }

        window.addEventListener('scroll', updateProgress);
    };

    // ==========================================
    // Toast Notifications
    // ==========================================
    const showToast = (message, type = 'success', duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'var(--primary-green)' : '#ff4444'};
            color: ${type === 'success' ? 'var(--black)' : 'white'};
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInUp 0.3s ease, slideOut 0.3s ease ${duration - 300}ms;
            font-weight: 600;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, duration);
    };

    // Add toast animation styles
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideInUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // Copy to Clipboard with Feedback
    // ==========================================
    const enableCopyElements = () => {
        document.querySelectorAll('[data-copy]').forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', async function() {
                const text = this.dataset.copy || this.textContent;
                try {
                    await navigator.clipboard.writeText(text);
                    showToast('Copied to clipboard!', 'success', 2000);
                } catch (err) {
                    showToast('Failed to copy', 'error', 2000);
                }
            });
        });
    };

    // ==========================================
    // Reading Progress Bar (for blog posts)
    // ==========================================
    const addReadingProgress = () => {
        if (!document.querySelector('article')) return;

        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: var(--primary-green);
            z-index: 9999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);

        const article = document.querySelector('article');
        
        function updateReadingProgress() {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const progress = ((scrollTop - articleTop) / (articleHeight - windowHeight)) * 100;
            progressBar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
        }

        window.addEventListener('scroll', updateReadingProgress);
    };

    // ==========================================
    // Form Enhancement
    // ==========================================
    const enhanceForms = () => {
        document.querySelectorAll('input, textarea, select').forEach(field => {
            // Floating labels
            if (field.placeholder) {
                const wrapper = field.parentElement;
                wrapper.style.position = 'relative';
                
                field.addEventListener('focus', () => {
                    field.parentElement.classList.add('focused');
                });
                
                field.addEventListener('blur', () => {
                    if (!field.value) {
                        field.parentElement.classList.remove('focused');
                    }
                });
            }

            // Real-time validation feedback
            field.addEventListener('input', () => {
                if (field.validity.valid) {
                    field.style.borderColor = 'var(--primary-green)';
                } else if (field.value) {
                    field.style.borderColor = '#ff4444';
                }
            });
        });

        // Form submission with loading state
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
                    
                    // Re-enable after 3 seconds (adjust based on actual submission)
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = submitBtn.dataset.originalText || 'Submit';
                    }, 3000);
                }
            });
        });
    };

    // ==========================================
    // Testimonial Carousel Enhancement
    // ==========================================
    const enhanceTestimonials = () => {
        const testimonialGrid = document.querySelector('.testimonials-grid');
        if (!testimonialGrid || window.innerWidth > 768) return;

        // Make testimonials swipeable on mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        testimonialGrid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        testimonialGrid.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            testimonialGrid.style.transform = `translateX(${diff}px)`;
        });

        testimonialGrid.addEventListener('touchend', () => {
            isDragging = false;
            testimonialGrid.style.transform = '';
        });
    };

    // ==========================================
    // Easter Egg: Konami Code
    // ==========================================
    const konamiCode = () => {
        const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let current = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === pattern[current]) {
                current++;
                if (current === pattern.length) {
                    // Easter egg activated!
                    document.body.style.animation = 'rainbow 2s linear infinite';
                    showToast('🎉 Konami Code Activated! You found the secret!', 'success', 5000);
                    current = 0;
                    
                    // Add rainbow animation
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);

                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 5000);
                }
            } else {
                current = 0;
            }
        });
    };

    // ==========================================
    // Performance: Debounce & Throttle
    // ==========================================
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ==========================================
    // Initialize All Enhancements
    // ==========================================
    const init = () => {
        console.log('🚀 Initializing enhanced features...');
        
        // Run on DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runEnhancements);
        } else {
            runEnhancements();
        }
    };

    const runEnhancements = () => {
        animateOnScroll();
        parallaxEffect();
        enhanceButtons();
        enhanceCards();
        lazyLoadImages();
        addScrollProgress();
        enableCopyElements();
        addReadingProgress();
        enhanceForms();
        enhanceTestimonials();
        konamiCode();
        
        console.log('✅ All enhancements loaded successfully!');
    };

    // Auto-initialize
    init();

    // Export functions for external use
    window.CalStrongEnhanced = {
        showToast,
        smoothScrollTo,
        typingEffect
    };

})();
