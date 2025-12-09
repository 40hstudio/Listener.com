import Swiper from 'swiper/bundle';

function podcastSwiper() {
    const swiper = new Swiper('.built_bottom.swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        // loop: true,
        pagination: {
            el: '.built_pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button.next',
            prevEl: '.swiper-button.prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: "auto",
                spaceBetween: 24,
                pagination: false,
            },
        },
    });
}

function caseSwiper() {
    const navItems = document.querySelectorAll(".case_list .case_toc_item");
    const sliderElement = document.querySelector(".case_swiper.swiper");

    if (!navItems.length || !sliderElement) return;

    const swiper = new Swiper(sliderElement, {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        init: false,
        pagination: {
            el: '.case_pagination',
            clickable: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: false,
                centeredSlides: true,
            }
        },
    });

    const updateActiveState = (index) => {
        navItems.forEach(el => el.classList.remove("is-active"));

        if (navItems[index]) {
            navItems[index].classList.add("is-active");
        }
    };

    swiper.on("init", () => {
        updateActiveState(swiper.realIndex);
    });

    swiper.on("slideChangeTransitionStart", () => {
        updateActiveState(swiper.realIndex);
    });

    navItems.forEach((item, index) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", (e) => {
            e.preventDefault();
            swiper.slideToLoop(index);
        });
    });

    swiper.init();
}


export default function initializeSwiper() {
    podcastSwiper();
    caseSwiper();
}