// ==================== GSAP Animations ====================
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Create background particles
    createParticles();
    
    // Initialize animations once preloader is done (called from script.js)
    window.initAnimations = function() {
        // Home section animations
        animateHomeSection();
        
        // Reveal text animation
        animateRevealText();
        
        // Scroll-triggered animations
        initScrollAnimations();
        
        // Skills animation
        animateSkills();
        
        // Portfolio items animation
        animatePortfolioItems();
    };
});

// Create and animate background particles
function createParticles() {
    const container = document.getElementById('particles-container');
    const colors = [
        'rgba(52, 152, 219, 0.5)',  // Blue
        'rgba(155, 89, 182, 0.5)',   // Purple
        'rgba(46, 204, 113, 0.5)',   // Green
        'rgba(26, 188, 156, 0.5)',   // Teal
        'rgba(241, 196, 15, 0.5)'    // Yellow
    ];
    
    // Create particles
    for (let i = 0; i < 25; i++) {
        // Create particle element
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 10px and 40px
        const size = Math.random() * 30 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random color
        const colorIndex = Math.floor(Math.random() * colors.length);
        particle.style.backgroundColor = colors[colorIndex];
        
        // Random animation duration
        const duration = Math.random() * 20 + 10; // 10-30s
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(particle);
        
        // Add GSAP animation
        gsap.to(particle, {
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            rotation: Math.random() * 360,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Home Section Animations
function animateHomeSection() {
    const homeTimeline = gsap.timeline();
    
    homeTimeline
        .from('.logo', {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('nav ul li', {
            opacity: 0,
            y: -20,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.home-content h1', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.2')
        .from('.home-content h2', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.home-description', {
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.cta-button', {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4');
}

// Reveal Text Animation
function animateRevealText() {
    // Animate the text reveal overlay
    const revealElements = document.querySelectorAll('.reveal-text');
    
    revealElements.forEach(element => {
        const textReveal = gsap.timeline();
        
        textReveal
            .to(element.querySelector(':after'), {
                x: '0%',
                duration: 0.7,
                ease: 'power3.inOut'
            })
            .to(element.querySelector(':after'), {
                x: '100%',
                duration: 0.7,
                ease: 'power3.inOut'
            });
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    // About section animations
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
            end: 'bottom 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
            end: 'bottom 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Education items staggered animation
    gsap.from('.education-item', {
        scrollTrigger: {
            trigger: '.education-item',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Services section header animation
    gsap.from('#services .section-header', {
        scrollTrigger: {
            trigger: '#services',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Service cards staggered animation
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Service icons bounce animation
    gsap.from('.service-icon', {
        scrollTrigger: {
            trigger: '.services-container',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        scale: 0.5,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.4
    });
    
    // Portfolio section header animation
    gsap.from('#portfolio .section-header', {
        scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Filter buttons animation
    gsap.from('.filter-btn', {
        scrollTrigger: {
            trigger: '.filter-buttons',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
    });
    
    // Testimonials section animations
    gsap.from('#testimonials .section-header', {
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials-slider',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.testimonial-controls', {
        scrollTrigger: {
            trigger: '.testimonials-slider',
            start: 'top 50%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Contact section animations
    gsap.from('#contact .section-header', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Info items staggered animation
    gsap.from('.info-item', {
        scrollTrigger: {
            trigger: '.info-item',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.5,
        ease: 'power3.out'
    });
    
    // Social links animation
    gsap.from('.social-link', {
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out'
    });
    
    // Form groups animation
    gsap.from('.form-group', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.5,
        ease: 'power3.out'
    });
}

// Skills Bar Animation
function animateSkills() {
    // Animate skill progress bars when they come into view
    const skillsContainer = document.querySelector('.skills-container');
    
    if (skillsContainer) {
        const progressBars = document.querySelectorAll('.skill-progress');
        
        // Set up a ScrollTrigger for the skills section
        ScrollTrigger.create({
            trigger: skillsContainer,
            start: 'top 80%',
            onEnter: () => {
                // Animate each progress bar to its data-progress value
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress') + '%';
                    gsap.to(bar, {
                        width: progress,
                        duration: 1.5,
                        ease: 'power3.out'
                    });
                });
            },
            once: true // Only trigger once
        });
    }
}

// Portfolio Items Animation
function animatePortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioGrid) {
        // Staggered animation for portfolio items
        gsap.from('.portfolio-item', {
            scrollTrigger: {
                trigger: portfolioGrid,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
}

// Parallax Effect for About Image
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const aboutSection = document.getElementById('about');
        const aboutSectionTop = aboutSection.offsetTop;
        const aboutSectionHeight = aboutSection.offsetHeight;
        
        // Only apply parallax when the about section is in view
        if (scrollPosition > aboutSectionTop - window.innerHeight && 
            scrollPosition < aboutSectionTop + aboutSectionHeight) {
            
            // Calculate parallax value
            const parallaxValue = (scrollPosition - (aboutSectionTop - window.innerHeight)) * 0.1;
            
            // Apply the parallax effect
            aboutImage.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

// Mouse follow animation for cursor on portfolio items
// Using a different variable name to avoid conflicts with script.js
const portfolioItemElements = document.querySelectorAll('.portfolio-item');

portfolioItemElements.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        // Get the bounding rectangle of the item
        const rect = item.getBoundingClientRect();
        
        // Calculate the mouse position relative to the item
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate the percentage of the mouse position relative to the item dimensions
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        // Apply a subtle tilt effect
        gsap.to(item, {
            rotationY: (xPercent - 0.5) * 10, // -5 to 5 degrees
            rotationX: (yPercent - 0.5) * -10, // -5 to 5 degrees
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    // Reset rotation when mouse leaves the item
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Text scramble effect for section titles
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to section headers when they come into view
document.querySelectorAll('.section-header h2').forEach(el => {
    const originalText = el.innerText;
    const fx = new TextScramble(el);
    
    ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
            fx.setText(originalText);
        },
        once: true
    });
});
