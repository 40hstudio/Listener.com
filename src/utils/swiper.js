import Swiper from 'swiper/bundle';

function podcastSwiper() {
    const swiper = new Swiper('.built_bottom.swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        // loop: true,
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        // },
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
            },
        },
    });
}

function caseSwiper() {
    const navItems = document.querySelectorAll(".case_list .case_toc_item");

    const swiper = new Swiper(".case_swiper.swiper", {
        slidesPerView: 1.001,
        spaceBetween: 16,
        loop: true,
        on: {
            init: function () {
                if (navItems[0]) navItems[0].classList.add("is-active");
            }
        }
    });

    const updateActiveState = (index) => {
        navItems.forEach(el => el.classList.remove("is-active"));
        if (navItems[index]) {
            navItems[index].classList.add("is-active");
        }
    };

    swiper.on("slideChange", () => {
        updateActiveState(swiper.realIndex);
    });

    navItems.forEach((item, index) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            swiper.slideToLoop(index);
        });
    });
}


export default function initializeSwiper() {
    podcastSwiper();
    caseSwiper();
}