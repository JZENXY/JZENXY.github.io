// Page transition elements - Add these to your HTML
// <div class="page-transition"></div>
// <div class="section-transition"></div>

// Page load transition
document.addEventListener('DOMContentLoaded', function() {
    // Create transition elements if they don't exist
    if (!document.querySelector('.page-transition')) {
        const pageTransition = document.createElement('div');
        pageTransition.className = 'page-transition';
        pageTransition.style.position = 'fixed';
        pageTransition.style.top = '0';
        pageTransition.style.right = '-100%';
        pageTransition.style.width = '100%';
        pageTransition.style.height = '100%';
        pageTransition.style.backgroundColor = '#121212';
        pageTransition.style.zIndex = '999';
        pageTransition.style.opacity = '0.9';
        pageTransition.style.transition = 'right 0.8s cubic-bezier(0.65, 0.05, 0.36, 1), opacity 0.8s ease';
        pageTransition.style.pointerEvents = 'none';
        document.body.appendChild(pageTransition);
    }
    
    if (!document.querySelector('.section-transition')) {
        const sectionTransition = document.createElement('div');
        sectionTransition.className = 'section-transition';
        sectionTransition.style.position = 'fixed';
        sectionTransition.style.top = '0';
        sectionTransition.style.right = '-100%';
        sectionTransition.style.width = '100%';
        sectionTransition.style.height = '100%';
        sectionTransition.style.backgroundColor = '#121212';
        sectionTransition.style.zIndex = '99';
        sectionTransition.style.opacity = '0';
        sectionTransition.style.transition = 'right 0.8s cubic-bezier(0.65, 0.05, 0.36, 1), opacity 0.8s ease';
        sectionTransition.style.pointerEvents = 'none';
        document.body.appendChild(sectionTransition);
    }
    
    // Get the page transition overlay
    const pageTransition = document.querySelector('.page-transition');
    
    // Trigger initial transition animation
    setTimeout(() => {
        // Move overlay from right to left
        pageTransition.style.right = '0%';
        
        // After a short delay, slide out to the left
        setTimeout(() => {
            pageTransition.style.right = '100%';
            
            // Fade out as it exits
            setTimeout(() => {
                pageTransition.style.opacity = '0';
            }, 500);
            
            // Reset for future use
            setTimeout(() => {
                pageTransition.style.right = '-100%';
            }, 1000);
        }, 500);
    }, 100);
});

// Enhanced Smooth Scrolling with transition effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get the section transition overlay
            const sectionTransition = document.querySelector('.section-transition');
            
            // Trigger section transition animation
            sectionTransition.style.opacity = '0.7';
            sectionTransition.style.right = '0%';
            
            // After a short delay, complete the navigation and finish the transition
            setTimeout(() => {
                // Get the offset position of the navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                // Calculate the position to scroll to with an offset for the navbar
                const offsetPosition = targetElement.offsetTop - navbarHeight - 10;
                
                // Using custom smooth scrolling with easing
                smoothScrollTo(offsetPosition, 1000);
                
                // Slide out transition to the left
                sectionTransition.style.right = '100%';
                
                // Fade out as it exits
                setTimeout(() => {
                    sectionTransition.style.opacity = '0';
                }, 300);
                
                // Reset for next transition
                setTimeout(() => {
                    sectionTransition.style.right = '-100%';
                }, 800);
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.querySelector('.burger').classList.remove('active');
                }
            }, 400);
        }
    });
});

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Easing function - easeInOutQuad
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Reveal animations on scroll with section transitions
const sections = document.querySelectorAll('section, .cards-container, .hero');
const revealElements = document.querySelectorAll('.reveal');

// Intersection observer for section transitions
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            // Play subtle transition when scrolling to a new section
            playSubtleTransition();
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of the section is visible
    rootMargin: '-100px 0px' // Adjust based on navbar height
});

// Observe all sections for transition effects
sections.forEach(section => {
    sectionObserver.observe(section);
});


// Function to play a subtle transition when scrolling between sections
function playSubtleTransition() {
    // Get the section transition overlay
    const sectionTransition = document.querySelector('.section-transition');
    
    // Only play if not already transitioning
    if (sectionTransition && sectionTransition.style.right === '-100%') {
        // Quick flash transition from right to left with reduced opacity
        sectionTransition.style.opacity = '0.3';
        sectionTransition.style.right = '0%';
        
        // Move out quickly
        setTimeout(() => {
            sectionTransition.style.right = '100%';
            
            // Fade out as it exits
            setTimeout(() => {
                sectionTransition.style.opacity = '0';
            }, 200);
            
            // Reset for next transition
            setTimeout(() => {
                sectionTransition.style.right = '-100%';
            }, 600);
        }, 150);
    }
}

// The standard reveal on scroll functionality
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Enhanced parallax effect for hero section with opacity transitions
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const scrollValue = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrollValue <= heroHeight) {
        const heroImage = document.querySelector('.hero-image');
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-title');
        const heroText = document.querySelector('.hero-text');
        const heroBtn = document.querySelector('.hero-btn');
        
        // Scale factor based on scroll position
        const scale = 1 + scrollValue * 0.0005;
        // Opacity factor based on scroll position (fade out as user scrolls down)
        const opacityFactor = 1 - (scrollValue / heroHeight) * 1.5;
        
        // Apply parallax effect to hero image with scale
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollValue * 0.2}px) scale(${scale})`;
            heroImage.style.opacity = Math.max(0, opacityFactor);
        }
        
        // Apply parallax effect to hero content with differential movement
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollValue * 0.1}px)`;
        }
        
        // Apply different opacity transitions to create depth
        if (heroTitle) {
            heroTitle.style.opacity = Math.max(0, opacityFactor + 0.2);
        }
        
        if (heroText) {
            heroText.style.opacity = Math.max(0, opacityFactor + 0.1);
        }
        
        if (heroBtn) {
            heroBtn.style.opacity = Math.max(0, opacityFactor + 0.3);
        }
    }
});

// Animated scroll indicator
// Animated scroll indicator with enhanced shadow
// Animated scroll indicator
// Animated scroll indicator with enhanced shadow
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    
    // Position it at the top center
    indicator.style.position = 'absolute';
    indicator.style.top = '450px';
    indicator.style.left = '50%';
    indicator.style.transform = 'translateX(-50%)'; // Center horizontally
    indicator.style.width = '50px';
    indicator.style.height = '50px';
    indicator.style.borderRadius = '50%';
    indicator.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    indicator.style.backdropFilter = 'blur(5px)';
    indicator.style.border = '2px solid rgba(255, 255, 255, 0.4)';
    indicator.style.zIndex = '100';
    indicator.style.cursor = 'pointer';
    
    // Add enhanced shadow for visibility against both dark and light backgrounds
    indicator.style.boxShadow = '0 0 15px 5px rgba(255, 255, 255, 0.3), 0 0 30px 10px rgba(0, 0, 0, 0.2)';
    
    // Create dot inside indicator
    const dot = document.createElement('div');
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.background = 'white';
    dot.style.borderRadius = '50%';
    dot.style.position = 'absolute';
    dot.style.top = '50%';
    dot.style.left = '50%';
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.boxShadow = '0 0 5px 2px rgba(255, 255, 255, 0.5)';
    
    // Create style for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulseGlow {
            0% {
                box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3), 0 0 30px 10px rgba(0, 0, 0, 0.2);
            }
            50% {
                box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.4), 0 0 40px 15px rgba(0, 0, 0, 0.3);
            }
            100% {
                box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3), 0 0 30px 10px rgba(0, 0, 0, 0.2);
            }
        }
        
        @keyframes scrollIndicate {
            0% { transform: translate(-50%, -80%); opacity: 0; }
            30% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(-50%, 80%); opacity: 0; }
        }
        
        .scroll-indicator {
            animation: pulseGlow 2s infinite ease-in-out;
        }
        
        .scroll-indicator::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 2px;
            height: 12px;
            background-color: white;
            animation: scrollIndicate 1.5s infinite;
            box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
        }
        
        .scroll-indicator::after {
            content: '';
            position: absolute;
            bottom: 12px;
            left: 50%;
            width: 10px;
            height: 10px;
            border-right: 2px solid white;
            border-bottom: 2px solid white;
            transform: translateX(-50%) rotate(45deg);
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }
    `;
    
    document.head.appendChild(style);
    indicator.appendChild(dot);
    
    // Add click functionality
    indicator.addEventListener('click', function() {
        // Scroll to the next section smoothly
        const heroHeight = document.querySelector('.hero').offsetHeight;
        window.scrollTo({
            top: heroHeight,
            behavior: 'smooth'
        });
    });
    
    // Only show on hero section
    window.addEventListener('scroll', () => {
        indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        indicator.style.transition = 'opacity 0.5s ease';
    });
    
    return indicator;
}

// Tilt Effect for Project Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = mouseY / -75;
            const rotateY = mouseX / 75;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(0.9, 0.9 , 0.9)`;
            card.style.transition = 'transform 0.1s ease';
            
            // Add a subtle light reflection effect
            if (card.querySelector('img')) {
                const image = card.querySelector('img');
                const brightness = 100 + (mouseX / cardWidth) * 20;
                image.style.filter = `brightness(${brightness}%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
            
            if (card.querySelector('img')) {
                const image = card.querySelector('img');
                image.style.filter = '';
            }
        });
    });
}

// Smooth progress bar for page scroll
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = '#6c5ce7';
    progressBar.style.zIndex = '1000';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = `${scrollProgress}%`;
    });
}

// Form validation and submission
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const formElements = contactForm.elements;
        
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            
            if (element.type !== 'submit' && element.hasAttribute('required') && !element.value.trim()) {
                isValid = false;
                element.classList.add('error');
                
                // Add error styles if not already added
                if (!element.style.border) {
                    element.style.border = '1px solid rgba(255, 100, 100, 0.5)';
                    element.style.backgroundColor = 'rgba(255, 100, 100, 0.1)';
                }
            } else {
                element.classList.remove('error');
                element.style.border = '';
                element.style.backgroundColor = '';
            }
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
            successMessage.style.padding = '10px';
            successMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            successMessage.style.borderRadius = '5px';
            successMessage.style.marginTop = '10px';
            
            // Add with a fade-in effect
            successMessage.style.opacity = '0';
            contactForm.insertAdjacentElement('afterend', successMessage);
            
            setTimeout(() => {
                successMessage.style.transition = 'opacity 0.5s ease';
                successMessage.style.opacity = '1';
            }, 10);
            
            contactForm.reset();
            
            // Remove message after 5 seconds with fade-out
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 500);
            }, 5000);
        }
    });
}

// Enhanced image hover effect
function enhanceImageHoverEffects() {
    const projectImages = document.querySelectorAll('.card img, .gallery-item img');
    
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('#navbar');
    if (nav) {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    // Also apply to regular navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.transition = 'box-shadow 0.3s ease';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

// Text Typing Animation
const typedTextElements = document.querySelectorAll('.typed-text');

typedTextElements.forEach(element => {
    const text = element.dataset.text || '';
    const typingSpeed = parseInt(element.dataset.speed) || 100;
    
    let charIndex = 0;
    element.textContent = '';
    
    function typeText() {
        if (charIndex < text.length) {
            element.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Reset for loop effect (optional)
            setTimeout(() => {
                element.textContent = '';
                charIndex = 0;
                typeText();
            }, 3000);
        }
    }
    
    // Start typing when element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText();
                observer.unobserve(element);
            }
        });
    });
    
    observer.observe(element);
});

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const percentage = bar.dataset.percentage || '0';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 500);
    });
};

// Animate skills when they come into view
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(skillsSection);
            }
        });
    });
    
    observer.observe(skillsSection);
}

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.dataset.filter;
        
        projects.forEach(project => {
            if (filterValue === 'all' || project.classList.contains(filterValue)) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 200);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Dark mode toggle functionality
const darkModeToggle = document.querySelector('#dark-mode-toggle');
if (darkModeToggle) {
    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    
    // Set initial state
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }
    
    darkModeToggle.addEventListener('click', () => {
        // Toggle dark mode
        document.body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        
        // Save user preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', null);
        }
    });
}

// Prevent screenshot and right-click
document.addEventListener("keyup", (event) => {
    if (event.key === "PrintScreen") {
        alert("Screenshots are disabled on this website.");
        event.preventDefault();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && (event.key === "u" || event.key === "s" || event.key === "i")) {
        event.preventDefault();
        alert("This action is disabled to protect content.");
    }
});

document.addEventListener("dragstart", (event) => event.preventDefault());
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Initialize all effects on document ready
document.addEventListener('DOMContentLoaded', function() {
    // Create and append scroll indicator to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollIndicator = createScrollIndicator();
        heroSection.appendChild(scrollIndicator);
    }
    
    // Create scroll progress indicator
    createScrollProgressIndicator();
    
    // Initialize tilt effect
    initTiltEffect();
    
    // Enhance image hover effects
    enhanceImageHoverEffects();
    
    // Add right-to-left transition to hero section
    if (heroSection && !heroSection.classList.contains('transition-added')) {
        heroSection.classList.add('transition-added');
        
        // Create and add the CSS for the right-to-left transition
        const style = document.createElement('style');
        style.textContent = `
            .hero::before {
                content: '';
                position: absolute;
                top: 0;
                right: -100%;
                width: 100%;
                height: 100%;
                background-color: #121212;
                z-index: 5;
                animation: slideInRightToLeft 1.2s forwards cubic-bezier(0.65, 0.05, 0.36, 1);
            }
            
            @keyframes slideInRightToLeft {
                0% {
                    right: -100%;
                    opacity: 0.9;
                }
                50% {
                    right: 0%;
                    opacity: 0.7;
                }
                100% {
                    right: 100%;
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Trigger scroll once to initialize scroll-based animations
    revealOnScroll();
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

// 3D Effect for Hero Section using Three.js
function initThreeJS() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        // Load Three.js dynamically if not available
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = setupThreeScene;
        document.head.appendChild(script);
    } else {
        setupThreeScene();
    }
}

function setupThreeScene() {
    const heroSection = document.querySelector('#hero') || document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create container for Three.js scene
    const container = document.createElement('div');
    container.classList.add('hero-background');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1';
    heroSection.insertBefore(container, heroSection.firstChild);
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x4a6cf7,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Mouse effect for particles
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Mouse interaction
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize Three.js if Hero section exists
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('load', initThreeJS);
}

// GSAP Integration for advanced animations (if GSAP is available)
function initGSAP() {
    if (typeof gsap === 'undefined') {
        // Load GSAP dynamically if not available
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js';
        script.onload = setupGSAPAnimations;
        document.head.appendChild(script);
        
        // Load ScrollTrigger plugin
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js';
        document.head.appendChild(scrollTriggerScript);
    } else {
        setupGSAPAnimations();
    }
}

function setupGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger plugin if available
    if (gsap.plugins && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Hero section animations
    gsap.from('.hero .hero-content h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 1.2, // Delay to start after the right-to-left transition
        ease: 'power4.out'
    });
    
    gsap.from('.hero .hero-content p', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.5, // Staggered delay
        ease: 'power4.out'
    });
    
    gsap.from('.hero .hero-btn', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.8, // Staggered delay
        ease: 'power4.out'
    });
    
    // Section animations with ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        // Cards section animation
        gsap.from('.cards-container .section-title', {
            scrollTrigger: {
                trigger: '.cards-container',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        });
        
       gsap.from('.cards-container .card', {
            scrollTrigger: {
                trigger: '.cards-container',
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power4.out'
        });
        
        // Skills section animation
        gsap.from('.features-section .feature-card', {
            scrollTrigger: {
                trigger: '.features-section',
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });
        
        // Work section animation
        gsap.from('.gallery-section .gallery-item', {
            scrollTrigger: {
                trigger: '.gallery-section',
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });
        
        // Testimonials section animation
        gsap.from('.testimonials-section .testimonial', {
            scrollTrigger: {
                trigger: '.testimonials-section',
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });
        
        // About section animation
        gsap.from('#about .section-title', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        });
        
        // Contact section animation
        gsap.from('#contact form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
}

// Initialize GSAP animations when page loads
window.addEventListener('load', initGSAP);

// Add CSS styles for transition overlays if not already present
function addTransitionStyles() {
    if (!document.getElementById('transition-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'transition-styles';
        styleElement.textContent = `
            /* Page transition overlay */
            .page-transition {
                position: fixed;
                top: 0;
                right: -100%; /* Start off-screen to the right */
                width: 100%;
                height: 100%;
                background-color: #121212;
                z-index: 999;
                opacity: 0.9;
                transition: right 0.8s cubic-bezier(0.65, 0.05, 0.36, 1), opacity 0.8s ease;
                pointer-events: none; /* Allow clicking through the overlay */
            }
            
            /* Section transition overlay */
            .section-transition {
                position: fixed;
                top: 0;
                right: -100%; /* Start off-screen to the right */
                width: 100%;
                height: 100%;
                background-color: #121212;
                z-index: 99;
                opacity: 0;
                transition: right 0.8s cubic-bezier(0.65, 0.05, 0.36, 1), opacity 0.8s ease;
                pointer-events: none; /* Allow clicking through the overlay */
            }
            
            /* Hero transition effect */
            .hero::before {
                content: '';
                position: absolute;
                top: 0;
                right: -100%;
                width: 100%;
                height: 100%;
                background-color: #121212;
                z-index: 5;
                animation: slideInRightToLeft 1.2s forwards cubic-bezier(0.65, 0.05, 0.36, 1);
            }
            
            @keyframes slideInRightToLeft {
                0% {
                    right: -100%;
                    opacity: 0.9;
                }
                50% {
                    right: 0%;
                    opacity: 0.7;
                }
                100% {
                    right: 100%;
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', addTransitionStyles);