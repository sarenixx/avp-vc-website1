// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Enhanced navbar scroll effect with smooth shadow
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Pause ticker on hover
document.querySelectorAll('.ticker-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const track = item.closest('.ticker-track');
        track.style.animationPlayState = 'paused';
    });
    item.addEventListener('mouseleave', () => {
        const track = item.closest('.ticker-track');
        track.style.animationPlayState = 'running';
    });
});

// Advanced scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add CSS keyframes dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    
    .slide-in-left {
        animation: slideInLeft 0.8s ease-out forwards;
    }
    
    .slide-in-right {
        animation: slideInRight 0.8s ease-out forwards;
    }
    
    .scale-in {
        animation: scaleIn 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Observe all animated elements with stagger
document.querySelectorAll('.portfolio-card, .program-card, .resource-card, .team-content, .about-content').forEach((card, index) => {
    card.style.opacity = '0';
    card.dataset.delay = index * 80;
    observer.observe(card);
});

// Animate section titles
const sectionTitles = document.querySelectorAll('h2');
sectionTitles.forEach(title => {
    title.style.opacity = '0';
    observer.observe(title);
});

// Parallax effect on hero with smooth easing
const hero = document.querySelector('.hero');
if (hero) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                hero.style.backgroundPosition = `0px ${scrollY * 0.3}px`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Animate portfolio images with stagger
document.querySelectorAll('.portfolio-image img').forEach((img, index) => {
    img.style.opacity = '0';
    const observer2 = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                }, index * 50);
                observer2.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer2.observe(img);
});

// Smooth hover effects with easing
document.querySelectorAll('.secondary-button, .cta-button, .portfolio-card, .program-card, .resource-card').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Throttle scroll events for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

// Animated number counters for stats
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const h3 = entry.target.querySelector('h3');
            if (h3) {
                const finalValue = h3.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const isPercentage = finalValue.includes('%');
                const isPlus = finalValue.includes('+');
                
                if (!isNaN(numericValue)) {
                    let currentValue = 0;
                    const increment = numericValue / 40;
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(counter);
                        }
                        let display = Math.floor(currentValue).toString();
                        if (isPercentage) display += '%';
                        if (isPlus) display += '+';
                        h3.textContent = display;
                    }, 30);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Smooth fade-in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize body
document.body.style.opacity = '0.99';
