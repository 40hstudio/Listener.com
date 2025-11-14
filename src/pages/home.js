import { gsap } from "gsap";

function stepAnimation() {
    const wrap = document.querySelector('.step_layout');

    if (!wrap) {
        console.error('Elemen .step_layout tidak ditemukan.');
        return;
    }

    const steps = wrap.querySelectorAll('.step_item_wrap');
    const images = wrap.querySelectorAll('.step_image');

    if (steps.length === 0 || images.length === 0) {
        console.warn('Steps atau images tidak ditemukan di dalam .step_layout.');
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

    steps.forEach((step, index) => {
        step.addEventListener('click', () => {

            if (step.classList.contains('is-active')) {
                return;
            }

            const currentActiveStep = wrap.querySelector('.step_item_wrap.is-active');
            const currentActiveImage = wrap.querySelector('.step_image.is-active');

            if (currentActiveImage) {
                gsap.to(currentActiveImage, {
                    xPercent: 100,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.inOut'
                });
            }

            const newImage = images[index];
            if (newImage) {
                gsap.fromTo(newImage,
                    { xPercent: -100, opacity: 0 },
                    {
                        xPercent: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power2.inOut'
                    }
                );
            }

            if (currentActiveStep) currentActiveStep.classList.remove('is-active');
            if (currentActiveImage) currentActiveImage.classList.remove('is-active');


            step.classList.add('is-active');
            if (newImage) newImage.classList.add('is-active');

            startProgress(step, index);
        });
    });
}

export default function initHomePage() {
    stepAnimation();
}