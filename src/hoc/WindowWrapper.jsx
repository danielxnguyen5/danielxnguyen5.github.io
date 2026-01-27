import React, { useLayoutEffect, useRef } from 'react'
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = 'block';
            gsap.fromTo(el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 1.3, ease: 'power3.out' }
            );
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey)
            });

            return () => instance.kill();
        }, []);

        // Show/hide window
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? 'block' : 'none';
        }, [isOpen]);

        // 🔥 RESET WINDOW FRAME WHEN DATA CHANGES
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            const win = windows[windowKey];
            if (win?.data) {
                el.classList.remove("maximized");
                delete el.dataset.restoreRect;

                el.style.width = "";
                el.style.height = "";
                el.style.top = "";
                el.style.left = "";
                el.style.transform = "";
            }
        }, [windows[windowKey]?.data]);

        return (
            <section id={windowKey} ref={ref} style={{ zIndex }} className='absolute'>
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default WindowWrapper;
