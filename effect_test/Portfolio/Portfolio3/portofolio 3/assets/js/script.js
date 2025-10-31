$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }

        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    var coolTyping = new Typed(".typing", {
        strings: ["Front end developer","Fresher","Technician", "Blogger", "Designer", "Freelancer","Manager"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    var chillTyping = new Typed(".typing-3", {
        strings: ["Connect with me on :)"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var vibeTyping = new Typed(".typing-2", {
        strings: ["Front end developer","Fresher" ,"Technician", "Blogger", "Designer", "Freelancer","Manager"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
})
