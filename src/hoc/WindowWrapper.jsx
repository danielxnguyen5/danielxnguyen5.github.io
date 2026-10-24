import React, { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window.js";
import { takeOrigin } from "#store/origin.js";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

const isPhone = () => window.matchMedia("(max-width: 767px)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Zoom the window out of whatever was clicked to open it (dock icon, folder, file).
const animateOpen = (el) => {
    const origin = takeOrigin();
    gsap.killTweensOf(el);
    const x = gsap.getProperty(el, "x");
    const y = gsap.getProperty(el, "y");
    gsap.set(el, { scale: 1, opacity: 1, transformOrigin: "50% 50%" });
    if (reducedMotion()) return;

    if (origin) {
        const r = el.getBoundingClientRect();
        const dx = origin.left + origin.width / 2 - (r.left + r.width / 2);
        const dy = origin.top + origin.height / 2 - (r.top + r.height / 2);
        const s = Math.max(Math.min(origin.width / r.width, origin.height / r.height), 0.04);
        gsap.fromTo(
            el,
            { x: x + dx, y: y + dy, scale: s, opacity: 0.4 },
            { x, y, scale: 1, opacity: 1, duration: isPhone() ? 0.42 : 0.5, ease: "expo.out", force3D: true }
        );
    } else {
        gsap.fromTo(el, { scale: 0.94, opacity: 0, y: y + 10 }, { scale: 1, opacity: 1, y, duration: 0.3, ease: "power3.out" });
    }
};

const animateClose = (el) => {
    gsap.killTweensOf(el);
    if (reducedMotion()) {
        el.style.display = "none";
        return;
    }
    gsap.to(el, {
        scale: isPhone() ? 0.9 : 0.94,
        opacity: 0,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
            el.style.display = "none";
            gsap.set(el, { scale: 1, opacity: 1 });
        },
    });
};

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);
        const wasOpen = useRef(false);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            if (isOpen && !wasOpen.current) {
                el.style.display = "flex";
                animateOpen(el);
            } else if (!isOpen && wasOpen.current) {
                animateClose(el);
            } else if (!isOpen) {
                el.style.display = "none";
            }
            wasOpen.current = isOpen;
        }, [isOpen]);

        // Drag by the title bar only, so text inside stays selectable.
        useGSAP(() => {
            const el = ref.current;
            if (!el || isPhone()) return;
            const [instance] = Draggable.create(el, {
                trigger: el.querySelector(".window-header"),
                dragClickables: false,
                onPress: () => focusWindow(windowKey),
            });
            return () => instance.kill();
        }, []);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex, display: "none" }}
                className="window"
                onMouseDown={() => focusWindow(windowKey)}
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;
