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

        // Active nav highlight
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });

            // Skill bar animation
            const skills = document.querySelectorAll('.skill-fill');
            skills.forEach(fill => {
                const rect = fill.getBoundingClientRect();
                if (rect.top < window.innerHeight - 50 && !fill.classList.contains('animated')) {
                    fill.style.width = fill.dataset.width;
                    fill.classList.add('animated');
                }
            });
        });

        // Typing animation
        const roles = ["Creative Developer", "UI/UX Designer", "Web Developer"];
        let roleIndex = 0;
        let i = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const delay = 2000;

        function typeWriter() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                i--;
            } else {
                i++;
            }

            document.getElementById('hero-text').textContent = currentRole.substring(0, i);

            if (!isDeleting && i === currentRole.length) {
                isDeleting = true;
                setTimeout(typeWriter, delay);
            } else if (isDeleting && i === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeWriter, 500);
            } else {
                setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
            }
        }

        // Scroll animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.about-container, .services-grid, .projects-grid, .contact-container').forEach(el => {
            observer.observe(el);
        });

        // Initial load animations
        window.addEventListener('load', () => {
            document.querySelector('nav').classList.add('show');
            setTimeout(() => {
                document.querySelector('.hero-content').classList.add('show');
                typeWriter();
            }, 600);
        });

        // Hamburger menu toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                hamburger.classList.remove('open');
            });
        });