var swiper = new Swiper(".swiper", {
    effect: "cube",
    allowTouchMove: false,
    grabCursor: false,
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    mousewheel: true
});
swiper.on('slideChange', function () {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[swiper.activeIndex].classList.add("activeLink")

});
function Navigate(indx) {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[indx].classList.add("activeLink")
    swiper.slideTo(indx, 1000, true)
}

// Typing animation for professions
const professions = ["Web Developer", "UI/UX Designer", "Full-Stack Developer", "Frontend Engineer"];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timeoutId = null;
const professionElement = document.querySelector('.home-slide .professions');
let cursorElement = null;

function typeWriter() {
    if (swiper.activeIndex !== 0) return; // Only animate on home slide
    const currentProfession = professions[professionIndex];
    if (!cursorElement) {
        professionElement.innerHTML = '<span class="text"></span><span class="cursor">|</span>';
        cursorElement = professionElement.querySelector('.cursor');
        const textElement = professionElement.querySelector('.text');
    }
    const textElement = professionElement.querySelector('.text');
    cursorElement.classList.remove('blink'); // Blink only when paused
    if (isDeleting) {
        if (charIndex > 0) {
            charIndex--;
            textElement.textContent = currentProfession.substring(0, charIndex);
            timeoutId = setTimeout(typeWriter, 100); // Balanced deletion speed
        } else {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            charIndex = 0;
            cursorElement.classList.add('blink');
            timeoutId = setTimeout(typeWriter, 500);
        }
    } else {
        if (charIndex < currentProfession.length) {
            textElement.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
            timeoutId = setTimeout(typeWriter, 150);
        } else {
            isDeleting = true;
            cursorElement.classList.add('blink');
            timeoutId = setTimeout(typeWriter, 2000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (swiper.activeIndex === 0) {
        typeWriter();
    }
});

swiper.on('slideChange', function () {
    if (swiper.activeIndex === 0) {
        if (!timeoutId) {
            typeWriter();
        }
    } else {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (cursorElement) {
            cursorElement.classList.remove('blink');
        }
    }
});
