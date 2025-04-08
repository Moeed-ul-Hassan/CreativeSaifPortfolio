// ============ Global Variables ============
const body = document.body;
const cursor = document.querySelector('.cursor');
const preloader = document.querySelector('.preloader');
const counter = document.querySelector('.counter');
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollIndicator = document.querySelector('.scroll-indicator');
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const chatIcon = document.querySelector('.chat-icon');
const chatBot = document.querySelector('.chat-bot');
const closeChat = document.querySelector('.close-chat');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialPrev = document.querySelector('.arrow.prev');
const testimonialNext = document.querySelector('.arrow.next');

// ============ Preloader ============
function startCounterAnimation() {
    let count = 0;
    const interval = setInterval(() => {
        counter.textContent = count;
        count++;
        
        if (count > 100) {
            clearInterval(interval);
            // Hide preloader with GSAP
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    preloader.style.display = 'none';
                    // Initialize animations after preloader
                    initAnimations();
                }
            });
        }
    }, 20);
}

// Start the counter animation when the page has loaded
window.addEventListener('load', startCounterAnimation);

// ============ Custom Cursor ============
function updateCursor(e) {
    // Update cursor position
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    // Check if hovering over a link or button
    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
        target.classList.contains('hamburger') || 
        target.closest('.hamburger') ||
        target.classList.contains('close-chat') || 
        target.classList.contains('chat-icon')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.mixBlendMode = 'normal';
        cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
    } else {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.mixBlendMode = 'difference';
        cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
    }
}

// Apply cursor update on mouse move
document.addEventListener('mousemove', updateCursor);

// ============ Header Scroll Effect ============
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

window.addEventListener('scroll', handleScroll);

// ============ Mobile Navigation Toggle ============
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Disable/enable body scroll
    if (mobileNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMobileNav);

// Close mobile nav when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileNav();
    });
});

// ============ Smooth Scrolling ============
function scrollToSection(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 70, // Adjust for header height
            behavior: 'smooth'
        });
    }
}

// Apply smooth scroll to nav links
navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        window.scrollTo({
            top: aboutSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
}

// ============ Active Nav Link Update ============
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150; // Adjusted offset
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to the current section's link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ============ Portfolio Filter ============
function filterPortfolio() {
    const filter = this.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    this.classList.add('active');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
            item.style.display = 'block';
            
            // Use GSAP for a nice animation
            gsap.fromTo(item, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        } else {
            // Fade out and hide
            gsap.to(item, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    item.style.display = 'none';
                }
            });
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', filterPortfolio);
});

// ============ Contact Form Submission ============
function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Basic form validation
    if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        alert('Please fill out all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Normally here we would submit the form to a server
    // For this example, we'll just show a success message
    alert('Message sent successfully!');
    
    // Reset the form
    contactForm.reset();
}

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// ============ Chat Bot Toggle ============
function toggleChat() {
    chatBot.classList.toggle('active');
}

chatIcon.addEventListener('click', toggleChat);
closeChat.addEventListener('click', toggleChat);

// ============ Form Label Animation ============
// This ensures labels move when inputs or textareas are focused or have content
function handleFormInputFocus() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input already has a value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Call form input focus handler
handleFormInputFocus();

// ============ Testimonial Slider ============
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Set initial state
if (testimonialCards.length > 0) {
    testimonialCards.forEach((card, index) => {
        if (index !== 0) {
            gsap.set(card, { opacity: 0, display: 'none' });
        }
    });
}

// Show a specific testimonial
function showTestimonial(index) {
    // Hide current testimonial
    gsap.to(testimonialCards[currentTestimonial], {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            testimonialCards[currentTestimonial].style.display = 'none';
            
            // Show new testimonial
            testimonialCards[index].style.display = 'block';
            gsap.to(testimonialCards[index], {
                opacity: 1,
                duration: 0.5
            });
            
            // Update current testimonial index
            currentTestimonial = index;
            
            // Update dots
            testimonialDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    });
}

// Next testimonial
function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
}

// Previous testimonial
function prevTestimonial() {
    const prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIndex);
}

// Set up event listeners
if (testimonialNext && testimonialPrev) {
    testimonialNext.addEventListener('click', nextTestimonial);
    testimonialPrev.addEventListener('click', prevTestimonial);
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentTestimonial) {
                showTestimonial(index);
            }
        });
    });
    
    // Auto-play testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
}

// Initialize function for animations and other effects
function initAnimations() {
    // Initial animations will be in animations.js
}
