import { Rive } from "@rive-app/webgl2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function loadRiveAnimation() {
    const visual = document.querySelector("[data-rive='future']");

    if (!visual) {
        console.log("canvas element [data-rive='future'] not found.");
        return;
    }

    const RIVEURL = "https://cdn.prod.website-files.com/691688333ba7c006297bb49f/69174d0ae3e994d5590dbcbe_40h_listener.com.riv";

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


            ScrollTrigger.create({
                trigger: ".future_card",
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
}