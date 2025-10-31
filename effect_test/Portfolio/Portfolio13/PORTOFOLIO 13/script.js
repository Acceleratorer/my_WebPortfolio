 // Typing Animation
        const texts = ['Asep Gustiawan', 'Web Developer', 'Designer', 'Freelancer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.querySelector('.typing-text');

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Active Navigation
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
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Project Modal
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const closeModal = document.querySelector('.close-modal');
        const watchBtns = document.querySelectorAll('.watch-btn');

        watchBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const videoUrl = this.closest('.project-card').getAttribute('data-video');
                videoFrame.src = videoUrl;
                modal.style.display = 'flex';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            videoFrame.src = '';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                videoFrame.src = '';
            }
        });

        // Testimonial Carousel
        const wrapper = document.querySelector('.testimonial-wrapper');
        const testimonialContainer = document.querySelector('.testimonial-container');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentSlide = 0;
        const totalSlides = document.querySelectorAll('.testimonial-card').length;
        let autoSlide;
        let isPaused = false;

        function moveSlide(direction) {
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            if (currentSlide >= totalSlides) currentSlide = 0;
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function startAutoSlide() {
            autoSlide = setInterval(() => {
                if (!isPaused) {
                    moveSlide(1);
                }
            }, 3000);
        }

        prevBtn.addEventListener('click', () => {
            moveSlide(-1);
            clearInterval(autoSlide);
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            moveSlide(1);
            clearInterval(autoSlide);
            startAutoSlide();
        });

        testimonialContainer.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        testimonialContainer.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        startAutoSlide();

        // Form Submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent successfully!');
            this.reset();
        });

        // Portfolio Showcase Functionality
        const viewDemoBtns = document.querySelectorAll('.view-demo-btn');
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        const postCards = document.querySelectorAll('.post-card');

        viewDemoBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                alert('Demo button clicked! This is a simple demo action.');
            });
        });

        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.post-card');
                const imageSrc = card.getAttribute('data-image');
                const caption = card.getAttribute('data-caption');

                postModalImage.src = imageSrc;
                postModalCaption.textContent = caption;
                postModal.style.display = 'flex';
            });
        });

        // Post Modal
        const postModal = document.createElement('div');
        postModal.className = 'modal';
        postModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img id="postModalImage" src="" alt="Project" style="width: 100%; border-radius: 10px;">
                <div id="postModalCaption" style="padding: 1rem; color: #ffffff;"></div>
            </div>
        `;
        document.body.appendChild(postModal);

        const postModalImage = document.getElementById('postModalImage');
        const postModalCaption = document.getElementById('postModalCaption');
        const closePostModal = postModal.querySelector('.close-modal');

        postCards.forEach(card => {
            card.addEventListener('click', function() {
                const imageSrc = this.getAttribute('data-image');
                const caption = this.getAttribute('data-caption');

                postModalImage.src = imageSrc;
                postModalCaption.textContent = caption;
                postModal.style.display = 'flex';
            });
        });

        closePostModal.addEventListener('click', () => {
            postModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === postModal) {
                postModal.style.display = 'none';
            }
        });