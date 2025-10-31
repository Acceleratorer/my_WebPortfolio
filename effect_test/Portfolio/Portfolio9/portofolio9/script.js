// Typing Effect
const professions = ['Web Developer', 'Designer', 'Freelancer'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const currentProfession = professions[professionIndex];
    const typingElement = document.getElementById('typing-text');

    if (isDeleting) {
        typingElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeedVar = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentProfession.length) {
        typeSpeedVar = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typeSpeedVar = 500;
    }

    setTimeout(type, typeSpeedVar);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 1000);
});

// Active navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections except hero
document.querySelectorAll('.section:not(.hero)').forEach(section => {
    observer.observe(section);
});

// Observe portfolio grid
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.portfolio-item').forEach((item, index) => {
                    item.style.setProperty('--delay', index);
                    item.classList.add('animate');
                });
            }
        });
    }, observerOptions);
    portfolioObserver.observe(portfolioGrid);
}

// Observe blog grid
const blogGrid = document.querySelector('.blog-grid');
if (blogGrid) {
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.blog-post').forEach((post, index) => {
                    post.style.setProperty('--delay', index);
                    post.classList.add('animate');
                });
            }
        });
    }, observerOptions);
    blogObserver.observe(blogGrid);
}

// Animate skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.setProperty('--delay', index);
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});
