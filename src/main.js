// libs
import Lenis from "lenis";
import Swiper from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Pages ---
import initHomePage from "./pages/home";
import initializeSwiper from "./utils/swiper.js";
import initHomePageV2 from "./pages/home-v2.js";
import initUnifieldAnimation from "./pages/unifield.js"
import initBlog from "./pages/blog.js";

// --- Utils ---
import initRiveAnimation from "./utils/rive.js";

gsap.registerPlugin(ScrollTrigger);

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

function handleNavTheme() {
	const nav = document.querySelector('.nav_component');
	const darkSections = gsap.utils.toArray('section.u-theme-dark, .footer-main_wrap, .future_card');

	if (!nav || darkSections.length === 0) return;

	let activeDarkSections = 0;

	const updateNav = () => {
		if (activeDarkSections > 0) {
			nav.classList.add('is-light');
		} else {
			nav.classList.remove('is-light');
		}
	};

	darkSections.forEach(section => {
		ScrollTrigger.create({
			trigger: section,
			start: "top top",
			end: "bottom top",

			onEnter: () => {
				activeDarkSections++;
				updateNav();
			},
			onEnterBack: () => {
				activeDarkSections++;
				updateNav();
			},

			onLeave: () => {
				activeDarkSections--;
				updateNav();
			},
			onLeaveBack: () => {
				activeDarkSections--;
				updateNav();
			}
		});
	});
}

function initAnimation() {
	clientSwiper();
	footerAnimation();
	handleNavTheme();

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