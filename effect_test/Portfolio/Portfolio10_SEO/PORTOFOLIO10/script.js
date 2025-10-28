// Typing Animation
        const roles = ['Developer', 'Designer', 'Content Creator'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.querySelector('.typing');
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            setTimeout(type, speed);
        }

        // Start typing animation
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(type, 500);

            // Circular progress animation
            const circles = document.querySelectorAll('.progress');
            circles.forEach(circle => {
                const percentageText = circle.parentElement.nextElementSibling.querySelector('span');
                const percentage = parseInt(percentageText.textContent.replace('%', ''));
                const circumference = 2 * Math.PI * 50;
                const offset = circumference - (percentage / 100) * circumference;

                // Start from full circle
                circle.style.strokeDashoffset = circumference;

                // Animate to the target offset
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 1000); // Delay to start after page load
            });
        });

        // Active menu on scroll
        const navLinks = document.querySelectorAll('.nav-menu a');
        const sections = document.querySelectorAll('section');

        function updateActiveLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Projects carousel
        const carousel = document.getElementById('projectsCarousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        const totalSlides = 4;

        function updateCarousel() {
            const translateX = -currentIndex * 25; // 100% / 4
            carousel.style.transform = `translateX(${translateX}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });



        // Contact form handling
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Harap isi semua field!');
                return;
            }

            alert(`Terima kasih ${name}! Pesan Anda telah dikirim.`);

            contactForm.reset();
        });

        // Certificate Carousel
        const certCarouselWrapper = document.querySelector('.carousel-wrapper');
        const certPrevBtn = document.querySelector('.carousel-btn.prev');
        const certNextBtn = document.querySelector('.carousel-btn.next');

        let certCurrentIndex = 0;
        let certSlidesToShow = window.innerWidth > 768 ? 3 : 1;
        const certTotalSlides = document.querySelectorAll('.certificate-card').length;
        let certMaxIndex = certTotalSlides - certSlidesToShow;

        function updateCertCarousel() {
            const translateX = -certCurrentIndex * (100 / certSlidesToShow);
            certCarouselWrapper.style.transform = `translateX(${translateX}%)`;
        }

        certPrevBtn.addEventListener('click', () => {
            if (certCurrentIndex > 0) {
                certCurrentIndex--;
                updateCertCarousel();
            }
        });

        certNextBtn.addEventListener('click', () => {
            if (certCurrentIndex < certMaxIndex) {
                certCurrentIndex++;
                updateCertCarousel();
            }
        });

        window.addEventListener('resize', () => {
            const newSlidesToShow = window.innerWidth > 768 ? 3 : 1;
            if (newSlidesToShow !== certSlidesToShow) {
                certSlidesToShow = newSlidesToShow;
                certMaxIndex = certTotalSlides - certSlidesToShow;
                certCurrentIndex = Math.min(certCurrentIndex, certMaxIndex);
                updateCertCarousel();
            }
        });
