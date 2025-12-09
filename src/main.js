// libs
import Lenis from "lenis";
import Swiper from "swiper";

import initHomePage from "./pages/home";
import initializeSwiper from "./utils/swiper.js";
import initHomePageV2 from "./pages/home-v2.js";
import initUnifieldAnimation from "./pages/unifield.js"
import initBlog from "./pages/blog.js";

// --- Utils ---
import initRiveAnimation from "./utils/rive.js";

let lenis = new Lenis({
	lerp: 0.1,
	wheelMultiplier: 0.7,
	gestureOrientation: "vertical",
	normalizeWheel: false,
	smoothTouch: false,
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function footerAnimation() {
	const footer = document.querySelector(".footer-main_wrap");
	if (!footer) return;

	const wrappers = footer.querySelectorAll(".footer-main_decoration");

	wrappers.forEach((wrapper, index) => {
		const items = wrapper.querySelectorAll(".footer-main_decoration_item");

		const startPosition = index = 0 ? 100 : -100;

		gsap.set(items, { xPercent: startPosition });

		const tl = gsap.timeline({ paused: true });

		tl.to(items, {
			xPercent: 0,
			ease: "power2.out",
			stagger: 0.2,
			duration: 0.8
		});

		ScrollTrigger.create({
			trigger: wrapper,
			start: "top 80%",
			end: "bottom center",
			once: true,
			animation: tl,
		});
	});
}

let clientInstance = null;

function clientSwiper() {
	const swiperEl = document.querySelector(".client_image_wrap");

	if (!swiperEl) return;

	const isTablet = window.innerWidth <= 767;

	if (isTablet && !clientInstance) {
		clientInstance = new Swiper(swiperEl, {
			slideClass: "client_image",
			slidesPerView: 2.5,
			spaceBetween: 24,
			centeredSlides: true,
			loop: true,
		});
	} else if (!isTablet && clientInstance) {
		clientInstance.destroy(true, true);
		clientInstance = null;
	}
}

function initAnimation() {
	clientSwiper();
	footerAnimation();

	// Pages
	initHomePage();
	initHomePageV2();
	initBlog();
	initUnifieldAnimation();

	// Utils
	initializeSwiper();
	initRiveAnimation();
}

document.addEventListener('DOMContentLoaded', initAnimation);