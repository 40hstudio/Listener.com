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


export default function initializeSwiper() {
    podcastSwiper();
}