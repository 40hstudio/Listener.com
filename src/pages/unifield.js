import gsap from "gsap";

function unifieldItems() {
    const section = document.querySelector('.metrics_wrap');

    if (!section) {
        return;
    }

    const barDuration = 3;
    const slideSpeed = 0.4;


    const topSteps = document.querySelectorAll(".matrics_item_wrap");
    const bottomLists = document.querySelectorAll(".metrics_bottom_list");
    const images = document.querySelectorAll(".metrics_image");
    const progressBars = document.querySelectorAll(".matrics_item_progress");

    let activeIndex = 0;
    let activeTimeline = null;
    let isAnimating = false;

    gsap.set(progressBars, {
        width: 0,
        transformOrigin: "left",
        width: "100%",
        height: "100%",
        backgroundColor: "currentColor"
    });

    gsap.set(topSteps, {
        opacity: 0.4,
        cursor: "pointer"
    });

    gsap.set(images, {
        opacity: 0,
        // zIndex: 1,
        // position: "absolute",
        // top: 0,
        // left: 0,
        // width: "100%",
        // height: "100%",
        pointerEvents: "none"
    });

    if (images.length > 0) gsap.set(images[0], { position: "relative" });

    gsap.set(bottomLists, {
        display: "none",
        opacity: 0,
        y: 20
    });

    gsap.set("details.metrics_item summary", { cursor: "pointer" });


    function goToMainStep(index) {
        if (isAnimating && index === activeIndex) return;
        if (index >= topSteps.length) index = 0;

        const prevList = bottomLists[activeIndex];
        const nextList = bottomLists[index];
        activeIndex = index;

        gsap.to(topSteps, {
            opacity: 0.4,
            duration: 0.3,
            onStart: () => {
                topSteps.forEach(el => el.classList.remove("is-active"));
            }
        });

        gsap.to(topSteps[index], {
            opacity: 1,
            duration: 0.3,
            overwrite: true,
            onStart: () => topSteps[index].classList.add("is-active")
        });

        gsap.to(images, { opacity: 0, zIndex: 1, duration: 0.5 });
        gsap.to(images[index], { opacity: 1, zIndex: 2, duration: 0.5 });

        if (activeTimeline) activeTimeline.kill();
        gsap.set(progressBars, { width: 0 });
        document.querySelectorAll("details").forEach(d => d.removeAttribute("open"));

        const transitionTl = gsap.timeline({
            onComplete: () => startProgressAnimation(index)
        });

        if (window.getComputedStyle(prevList).display !== "none") {
            transitionTl.to(prevList, {
                y: 20,
                opacity: 0,
                duration: slideSpeed,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(prevList, { display: "none" });
                }
            });
        }

        transitionTl.add(() => {
            gsap.set(nextList, { display: "flex", y: 20, opacity: 0 });
        });

        transitionTl.to(nextList, {
            y: 0,
            opacity: 1,
            duration: slideSpeed,
            ease: "power2.out"
        });
    }

    function startProgressAnimation(index, startIndex = 0) {
        if (activeTimeline) activeTimeline.kill();

        activeTimeline = gsap.timeline({
            onComplete: () => goToMainStep(index + 1)
        });

        const currentBars = topSteps[index].querySelectorAll(".matrics_item_progress");
        const currentAccordions = bottomLists[index].querySelectorAll("details.metrics_item");

        currentBars.forEach((bar, i) => {
            if (i < startIndex) {
                gsap.set(bar, { width: "100%" });
            } else {
                gsap.set(bar, { width: "0%" });
            }
        });

        currentBars.forEach((bar, i) => {
            if (i < startIndex) return;

            activeTimeline.call(() => {
                currentAccordions.forEach(el => el.removeAttribute("open"));
                if (currentAccordions[i]) {
                    currentAccordions[i].setAttribute("open", "true");
                }
            });

            activeTimeline.to(bar, {
                width: "100%",
                duration: barDuration,
                ease: "linear"
            });
        });
    }

    topSteps.forEach((step, i) => {
        step.addEventListener("click", () => goToMainStep(i));
    });

    bottomLists.forEach((list, mainIndex) => {
        list.querySelectorAll("summary").forEach((summary, subIndex) => {
            summary.addEventListener("click", (e) => {
                e.preventDefault();

                if (mainIndex === activeIndex) {
                    startProgressAnimation(mainIndex, subIndex);
                }
                // // SCENARIO B: User clicks a sub-item in a DIFFERENT tab
                // else {
                //     // Switch to that tab first
                //     goToMainStep(mainIndex);
                //     // (Optional) If you want it to jump straight to that sub-item 
                //     // in the NEW tab, you would need to pass subIndex to goToMainStep.
                //     // For now, standard behavior is starting the new tab from 0.
                // }
            });
        });
    });

    gsap.set(bottomLists[0], { display: "flex", opacity: 1, y: 0 });

    goToMainStep(0);

};

export default function initUnifieldAnimation() {
    unifieldItems();
}