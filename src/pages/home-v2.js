import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function detailsOpen() {
    const wrapper = document.querySelector(".unified_wrap");
    if (!wrapper) return;

    const details = wrapper.querySelectorAll("details");
    const summaries = wrapper.querySelectorAll("summary");
    const images = wrapper.querySelectorAll(".unified_right .u-image");

    summaries.forEach((summary) => {
        summary.addEventListener("click", (e) => {
            const isDesktop = window.innerWidth > 768;
            const parentDetail = summary.parentElement;

            if (isDesktop) {
                if (!parentDetail.hasAttribute("open")) {
                    details.forEach((el) => {
                        if (el !== parentDetail) {
                            el.removeAttribute("open");
                        }
                    });
                }
            } else {
                if (parentDetail.hasAttribute("open")) {
                    e.preventDefault();
                }
            }
        });
    });

    if (images.length > 0) {
        if (window.innerWidth >= 992) {
            details.forEach((detail, index) => {
                if (detail.hasAttribute("open")) {
                    gsap.set(images[index], { xPercent: 0, zIndex: 2 });
                } else {
                    gsap.set(images[index], { xPercent: 101, zIndex: 1 });
                }
            });
        }

        details.forEach((targetDetail, index) => {
            targetDetail.addEventListener("toggle", () => {
                if (targetDetail.open) {
                    gsap.fromTo(images[index],
                        { xPercent: 100, zIndex: 2 },
                        { xPercent: 0, duration: 0.6, ease: "power3.out" }
                    );

                    images.forEach((img, i) => {
                        if (i !== index) {
                            gsap.to(img, {
                                xPercent: 100,
                                zIndex: 1,
                                duration: 0.6,
                                ease: "power3.out"
                            });
                        }
                    });
                }
            });
        });
    }

    if (window.innerWidth <= 768) {
        details.forEach(el => el.setAttribute("open", ""));
    }
}

function circlePathAnimation() {

    const items = document.querySelectorAll('.excess_item_wrap');

    items.forEach((item) => {
        const numberEl = item.querySelector('[data-path-number]');
        const unitEl = item.querySelector('[data-path-decor]');
        const activePath = item.querySelector('path[data-path]');

        if (!numberEl || !activePath) return;

        // Retrieve values from attributes
        const targetVal = parseFloat(numberEl.getAttribute('data-path-number'));
        const unit = unitEl ? unitEl.getAttribute('data-path-decor').trim().toLowerCase() : '';

        console.log(unit);
        console.log(unit.includes('%'))

        let progress = unit.includes('%') ? targetVal / 100 : targetVal / 4;
        if (progress > 1) progress = 1;

        const length = activePath.getTotalLength();

        gsap.set(activePath, {
            strokeDasharray: length,
            strokeDashoffset: length,
            strokeLinecap: "round"
        });

        const tl = gsap.timeline({});

        tl.to(activePath, {
            strokeDashoffset: length * (1 - progress),
            duration: 1.5,
            ease: "power2.out"
        });

        tl.from(numberEl, {
            textContent: 0,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 }
        }, "<");

        ScrollTrigger.create({
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
            animation: tl
        })
    });
}

export default function initHomePageV2() {
    detailsOpen();
    circlePathAnimation();
}