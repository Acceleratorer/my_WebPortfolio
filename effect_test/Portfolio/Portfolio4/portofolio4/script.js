// Variabel Global
let isLoading = true;
let mouseX = 0;
let mouseY = 0;
let matrixChars = [];
let labCanvases = [];

// Elemen DOM
const loadingScreen = document.getElementById('loading');
const nav = document.getElementById('nav');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navItems = document.querySelectorAll('.nav-item');
const matrixCanvas = document.getElementById('matrix-canvas');
const contactForm = document.getElementById('contact-form');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    initializeCursor();
    initializeNavigation();
    initializeMatrix();
    initializeLabCanvases();
    initializeScrollEffects();
    initializeFormHandling();
    
    // Handle resize
    window.addEventListener('resize', handleResize);
    handleResize();
});

// Loading Screen
function initializeLoading() {
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 100);
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        isLoading = false;
        
        // Start animations after loading
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    }, 2500);
}

// Custom Cursor
function initializeCursor() {
    if (window.innerWidth <= 768) return;
    
    const cursorTrail = document.querySelector('.cursor-trail');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    function updateCursor() {
        // Smooth trail following
        trailX += (cursorX - trailX) * 0.1;
        trailY += (cursorY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .nav-item, .work-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Smooth scrolling
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Update active state
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Scroll spy
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Nav background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Matrix Effect
function initializeMatrix() {
    const ctx = matrixCanvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    
    function resizeMatrix() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        
        const columns = Math.floor(matrixCanvas.width / 20);
        matrixChars = [];
        
        for (let i = 0; i < columns; i++) {
            matrixChars[i] = {
                y: Math.random() * matrixCanvas.height,
                speed: Math.random() * 3 + 1
            };
        }
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = '15px JetBrains Mono';
        
        matrixChars.forEach((char, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 20;
            
            ctx.fillText(text, x, char.y);
            
            char.y += char.speed;
            
            if (char.y > matrixCanvas.height) {
                char.y = 0;
                char.speed = Math.random() * 3 + 1;
            }
        });
        
        requestAnimationFrame(drawMatrix);
    }
    
    resizeMatrix();
    drawMatrix();
    
    window.addEventListener('resize', resizeMatrix);
}

// Lab Canvases
function initializeLabCanvases() {
    const canvases = document.querySelectorAll('.lab-canvas');
    
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const type = canvas.getAttribute('data-type');
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        switch(type) {
            case 'cube':
                animateCube(ctx, canvas);
                break;
            case 'particles':
                animateParticles(ctx, canvas);
                break;
            case 'audio':
                animateAudio(ctx, canvas);
                break;
            case 'shader':
                animateShader(ctx, canvas);
                break;
        }
    });
}

function animateCube(ctx, canvas) {
    let rotation = 0;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const size = 50;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        
        // Draw cube wireframe
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.strokeRect(-size, -size, size * 2, size * 2);
        
        // Draw inner lines
        ctx.beginPath();
        ctx.moveTo(-size, -size);
        ctx.lineTo(size, size);
        ctx.moveTo(size, -size);
        ctx.lineTo(-size, size);
        ctx.stroke();
        
        ctx.restore();
        
        rotation += 0.02;
        requestAnimationFrame(draw);
    }
    
    draw();
}

function animateParticles(ctx, canvas) {
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff41';
            ctx.fill();
        });
        
        requestAnimationFrame(draw);
    }
    
    draw();
}

function animateAudio(ctx, canvas) {
    const bars = 32;
    const barWidth = canvas.width / bars;
    let time = 0;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < bars; i++) {
            const height = Math.sin(time + i * 0.5) * 50 + 60;
            const x = i * barWidth;
            
            ctx.fillStyle = `hsl(${120 + i * 5}, 100%, 50%)`;
            ctx.fillRect(x, canvas.height - height, barWidth - 2, height);
        }
        
        time += 0.1;
        requestAnimationFrame(draw);
    }
    
    draw();
}

function animateShader(ctx, canvas) {
    let time = 0;
    
    function draw() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const index = (y * canvas.width + x) * 4;
                
                const u = x / canvas.width;
                const v = y / canvas.height;
                
                const r = Math.sin(u * 10 + time) * 127 + 128;
                const g = Math.sin(v * 10 + time + 2) * 127 + 128;
                const b = Math.sin((u + v) * 10 + time + 4) * 127 + 128;
                
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        time += 0.05;
        requestAnimationFrame(draw);
    }
    
    draw();
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger specific animations
                if (entry.target.classList.contains('work-item')) {
                    animateWorkItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.work-item, .lab-item').forEach(item => {
        observer.observe(item);
    });
    
    // Parallax effect for hero elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

function animateWorkItem(item) {
    const number = item.querySelector('.work-number');
    const title = item.querySelector('.work-title');
    const description = item.querySelector('.work-description');
    const tech = item.querySelector('.work-tech');
    
    // Stagger animations
    setTimeout(() => number.style.opacity = '1', 100);
    setTimeout(() => title.style.opacity = '1', 200);
    setTimeout(() => description.style.opacity = '1', 300);
    setTimeout(() => tech.style.opacity = '1', 400);
}

// Form Handling
function initializeFormHandling() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentNode.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentNode.classList.add('filled');
            } else {
                input.parentNode.classList.remove('filled');
            }
        });
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // Show loading state
        submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'MESSAGE SENT!';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Utility Functions
function handleResize() {
    // Reinitialize canvas elements
    const canvases = document.querySelectorAll('.lab-canvas');
    canvases.forEach(canvas => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
    
    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.cursor-trail').style.display = 'none';
        document.querySelector('.cursor-glow').style.display = 'none';
    } else {
        document.querySelector('.cursor-trail').style.display = 'block';
        document.querySelector('.cursor-glow').style.display = 'block';
    }
}

// Add some extra visual effects
document.addEventListener('click', (e) => {
    // Create click ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = 'var(--primary)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    ripple.style.animation = 'rippleEffect 0.6s ease-out forwards';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
    
    .work-item .work-number,
    .work-item .work-title,
    .work-item .work-description,
    .work-item .work-tech {
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);