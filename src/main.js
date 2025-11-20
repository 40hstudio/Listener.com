// libs
import Lenis from "lenis";

import initHomePage from "./pages/home";
import initializeSwiper from "./utils/swiper.js";

// --- Utils ---
import { loadRiveAnimation } from "./utils/rive.js";

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

function initAnimation() {
	initHomePage();
	loadRiveAnimation();
	footerAnimation();
	initializeSwiper();
}

document.addEventListener('DOMContentLoaded', initAnimation);