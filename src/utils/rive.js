import { Rive } from "@rive-app/webgl2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function loadRiveAnimation() {
    const visual = document.querySelector("[data-rive='future']");

    if (!visual) {
        console.log("canvas element [data-rive='future'] not found.");
        return;
    }

    const RIVEURL = "https://cdn.prod.website-files.com/691688333ba7c006297bb49f/69174d0ae3e994d5590dbcbe_5b6428cac679f33c321a9dea63f1e281_40h_listener.com.riv";

    const artboard = "cta_glow";
    const sm = "State Machine 1";

    // if (window.innerWidth < 991) {
    //     return;
    // }

    const r = new Rive({
        src: RIVEURL,
        canvas: visual,
        stateMachines: sm,
        artboard: artboard,
        autoplay: true,
        isTouchScrollEnabled: true,
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
            const inputs = r.stateMachineInputs(sm);
            const playTrigger = inputs.find((i) => i.name === "play");

            const triggerElement = visual.parentElement;

            if (!triggerElement) {
                console.error("Rive canvas tidak memiliki parent element untuk ScrollTrigger.");
                return;
            }

            if (playTrigger) {
                playTrigger.fire();
            }
            // ScrollTrigger.create({
            //     trigger: ".future_card",
            //     start: "top 60%",
            //     once: true,
            //     onEnter: () => {
            //         if (playTrigger) {
            //             playTrigger.fire();
            //         }
            //     },
            //     // markers: true,
            // });
        },
        onLoadError: (err) => {
            console.error("Rive loading error:", err);
        },
    });
}

function unifiedRive() {
    const RIVEURL = "https://cdn.prod.website-files.com/691688333ba7c006297bb49f/6929b4e11f4c08bbd2a405bf_6b35522baf07457b4da4d1cfe1db61b6_listener_homepage_all.riv";
    const sm = "State Machine 1";

    const targets = [
        { artboard: "cluster_reports_desktop", selector: "[data-rive='cluster-reports-desktop']" },
        { artboard: "cluster_reports_mobile", selector: "[data-rive='cluster-reports-mobile']" },
        { artboard: "listener-data", selector: "[data-rive='listener-data']" },
        { artboard: "smart-integrations", selector: "[data-rive='smart-integrations']" },
    ];

    // if (window.innerWidth < 991) {
    //     return;
    // }
    targets.forEach((item) => {
        console.log(item[2]);

        const visual = document.querySelector(item.selector);

        if (!visual) return;

        const r = new Rive({
            src: RIVEURL,
            canvas: visual,
            stateMachines: sm,
            artboard: item.artboard,
            autoplay: true,
            isTouchScrollEnabled: true,
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
                const inputs = r.stateMachineInputs(sm);
                const playTrigger = inputs.find((i) => i.name === "play");

                const triggerElement = visual.parentElement;

                if (!triggerElement) {
                    console.error("Rive canvas tidak memiliki parent element untuk ScrollTrigger.");
                    return;
                }

                if (playTrigger) {
                    playTrigger.fire();
                }

                ScrollTrigger.create({
                    trigger: visual,
                    start: "top 60%",
                    once: true,
                    onEnter: () => {
                        if (playTrigger) {
                            playTrigger.fire();
                        }
                    },
                    // markers: true,
                });
            },
            onLoadError: (err) => {
                console.error("Rive loading error:", err);
            },
        });
    });
}

export default function initRiveAnimation() {
    loadRiveAnimation();
    unifiedRive();
}
