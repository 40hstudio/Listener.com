import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function stepAnimation() {
    const wrap = document.querySelector('.step_layout');

    const stepContents = [
        {
            title: "Plan Live Shows Where Demand Already Exists",
            desc: `Use Listener.com's audience geography and Eventbrite’s attendee data to see exactly where your most passionate listeners live. Identify high-demand markets, route tours intelligently, and plan live podcast events with confidence.`
        },
        {
            title: "Turn Engaged Listeners Into Real-World Attendees",
            desc: `Connect listener behavior with Eventbrite ticketing insights to understand what drives in-person engagement. Track which episodes, formats, and regions convert best so you can launch live shows, meetups, and tours that sell out.`
        },
        {
            title: "Show Sponsors the Full Value of Your Audience",
            desc: `Combine listener analytics with Eventbrite’s revenue and attendance data to create polished, sponsor-ready reports. Demonstrate who listens, who shows up, and how your audience converts — unlocking new revenue opportunities for your show.`
        }
    ];

    if (!wrap) {
        return;
    }

    const steps = wrap.querySelectorAll('.step_item_wrap');
    const images = wrap.querySelectorAll('.step_image');

    if (steps.length === 0 || images.length === 0) {
        return;
    }

    let progressTween;

    function startProgress(activeStep, index) {
        if (progressTween) {
            progressTween.kill();
        }

        document.querySelectorAll('.step_item_progress').forEach(bar => {
            gsap.set(bar, { width: '0%' });
        });

        const progressBar = activeStep.querySelector('.step_item_progress');

        if (progressBar) {
            progressTween = gsap.fromTo(progressBar,
                { width: '0%' },
                {
                    width: '100%',
                    duration: 5,
                    ease: 'none',
                    onComplete: () => {
                        const nextIndex = (index + 1) % steps.length;

                        steps[nextIndex].click();
                    }
                }
            );
        }
    }

    gsap.set(images, { xPercent: -100, opacity: 0 });
    gsap.set(images[0], { xPercent: 0, opacity: 1 });

    steps[0].classList.add('is-active');
    images[0].classList.add('is-active');

    startProgress(steps[0], 0);

    // steps.forEach((step, index) => {
    //     step.addEventListener('click', () => {

    //         if (step.classList.contains('is-active')) {
    //             return;
    //         }

    //         const currentActiveStep = wrap.querySelector('.step_item_wrap.is-active');
    //         const currentActiveImage = wrap.querySelector('.step_image.is-active');

    //         const heading = step.querySelector('.step_heading');
    //         const description = step.querySelector('.step_desc');

    //         if (currentActiveImage) {
    //             gsap.to(currentActiveImage, {
    //                 xPercent: 100,
    //                 opacity: 0,
    //                 duration: 0.6,
    //                 ease: 'power2.inOut'
    //             });
    //         }

    //         const newImage = images[index];
    //         if (newImage) {
    //             gsap.fromTo(newImage,
    //                 { xPercent: 100, opacity: 0 },
    //                 {
    //                     xPercent: 0,
    //                     opacity: 1,
    //                     duration: 0.6,
    //                     ease: 'power2.inOut'
    //                 }
    //             );
    //         }

    //         if (currentActiveStep) currentActiveStep.classList.remove('is-active');
    //         if (currentActiveImage) currentActiveImage.classList.remove('is-active');


    //         step.classList.add('is-active');
    //         if (newImage) newImage.classList.add('is-active');

    //         startProgress(step, index);

    //         gsap.to([heading, description], {
    //             y: -10,
    //             opacity: 0,
    //             duration: 0.3,
    //             ease: 'power2.in',
    //             onComplete: () => {
    //                 heading.innerHTML = stepContents[index].title;
    //                 description.innerHTML = stepContents[index].desc;

    //                 gsap.to([heading, description], {
    //                     y: 0,
    //                     opacity: 1,
    //                     duration: 0.3,
    //                     ease: 'power2.out'
    //                 });
    //             }
    //         });
    //     });
    // });

    const textHeading = document.querySelector('.step_heading');
    const textDesc = document.querySelector('.step_desc');

    steps.forEach((step, index) => {
        step.addEventListener('click', () => {

            if (step.classList.contains('is-active')) {
                return;
            }

            const currentActiveStep = wrap.querySelector('.step_item_wrap.is-active');
            const currentActiveImage = wrap.querySelector('.step_image.is-active');
            const newImage = images[index];

            if (currentActiveImage) {
                gsap.to(currentActiveImage, {
                    xPercent: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power2.inOut'
                });
            }

            if (newImage) {
                gsap.fromTo(newImage,
                    { xPercent: 100, opacity: 0 },
                    { xPercent: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' }
                );
            }

            if (currentActiveStep) currentActiveStep.classList.remove('is-active');
            if (currentActiveImage) currentActiveImage.classList.remove('is-active');

            step.classList.add('is-active');
            if (newImage) newImage.classList.add('is-active');

            gsap.to([textHeading, textDesc], {
                y: -10,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    textHeading.innerHTML = stepContents[index].title;
                    textDesc.innerHTML = stepContents[index].desc;

                    gsap.to([textHeading, textDesc], {
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            startProgress(step, index);
        });
    });
}

function bennefitAnimation() {
    const items = document.querySelectorAll('.benefit_item_wrap');

    if (items.length === 0) {
        return;
    }

    items.forEach((item) => {
        const left = item.querySelector('.benefit_item_left');
        const right = item.querySelector('.benefit_item_right');
        const icon = item.querySelector('.benefit_item_icon .u-svg');

        const tl_text = gsap.timeline({ paused: true });

        tl_text.to([left, right], {
            opacity: 1,
            ease: 'power2.out',
        });

        ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            end: 'bottom center',
            scrub: true,
            animation: tl_text,
            // markers: true,
        });

        if (window.innerHeight < 991) {
            return;
        }

        const tl_icon = gsap.timeline({ paused: true });

        tl_icon.to(icon, {
            opacity: 1,
            ease: 'back.out(1.7)',
        });

        ScrollTrigger.create({
            trigger: icon,
            start: 'top center',
            end: 'bottom 40%',
            scrub: true,
            animation: tl_icon,
            // markers: true,
        });
    });
}

function imageStackAnimation() {
    const items = document.querySelectorAll('.client_image');
    if (items.length === 0) {
        return;
    }

    gsap.set(items, { opacity: 0, scale: 0.8 });

    const tl = gsap.to(items, {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        stagger: 0.1,
        onComplete: () => {
            gsap.set(items, { clearProps: 'all' });

            items.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        scale: 1.2,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                });
            });
        }
    });

    ScrollTrigger.create({
        trigger: ".client_image",
        start: 'top 80%',
        end: 'bottom 20%',
        once: true,
        animation: tl,
        // markers: true,
    });
}

function countAnimation() {
    const items = document.querySelectorAll('[data-scroll-animation="count"]');

    items.forEach(element => {

        const targetCount = parseInt(element.dataset.count, 10);

        let counter = { value: 0 };

        ScrollTrigger.create({
            trigger: element,
            start: "top 90%",
            onEnter: () => {
                gsap.to(counter, {
                    value: targetCount,
                    duration: 1.5,
                    ease: "expo.out",
                    onUpdate: () => {
                        element.textContent = Math.round(counter.value);
                    },
                });
            },
            once: true,
        });
    });
}

function followingCursor() {
    const clientImages = document.querySelectorAll('.client_image');
    const cursorTag = document.querySelector('[data-cursor="following"]');

    if (!cursorTag) {
        return;
    }

    const clientNames = [
        "Liam Smith",
        "Ethan Chen",
        "Ava Davis",
        "Noah Brown",
        "Olivia Green",
        "Mia White",
        "Sophie Hind"
    ];

    clientImages.forEach((imageElement, index) => {
        const clientName = imageElement.querySelector('img').getAttribute('alt').split(' ')[0] + " " + imageElement.querySelector('img').getAttribute('alt').split(' ')[1] || clientNames[index];


        imageElement.addEventListener('mouseenter', () => {
            cursorTag.textContent = clientName;
            cursorTag.style.opacity = '1';
        });

        imageElement.addEventListener('mouseleave', () => {
            cursorTag.style.opacity = '0';
        });

        // imageElement.addEventListener('mousemove', (e) => {
        //     const offsetX = 20;
        //     const offsetY = -160;
        //     cursorTag.style.left = `${e.clientX + offsetX}px`;
        //     cursorTag.style.top = `${e.clientY + offsetY}px`;
        // });
        const xTo = gsap.quickTo(cursorTag, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorTag, "y", { duration: 0.1, ease: "power3" });

        window.addEventListener('mousemove', (e) => {
            const offsetX = 10;
            const offsetY = 10;
            cursorTag.style.left = `${e.clientX + offsetX}px`;
            cursorTag.style.top = `${e.clientY + offsetY}px`;
        });
    });
}

export default function initHomePage() {
    stepAnimation();
    bennefitAnimation();
    imageStackAnimation();
    countAnimation();
    // followingCursor();
}