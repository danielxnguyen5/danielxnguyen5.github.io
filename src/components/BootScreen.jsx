import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Short boot sequence, shown once per browser session.
const BootScreen = ({ onDone, duration = 1100 }) => {
    const rootRef = useRef(null);
    const fillRef = useRef(null);

    useEffect(() => {
        const el = rootRef.current;
        const fill = fillRef.current;
        if (!el || !fill) return;

        const tl = gsap.timeline({ onComplete: () => onDone?.() });
        tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: duration / 1000, ease: "power2.inOut" })
            .to(el, { opacity: 0, duration: 0.35, ease: "power2.out" });

        return () => tl.kill();
    }, [onDone, duration]);

    return (
        <div ref={rootRef} id="boot" role="status" aria-label="Loading">
            <img src="/images/logo.svg" alt="" className="boot-logo" />
            <div className="boot-bar"><div ref={fillRef} className="boot-fill" /></div>
        </div>
    );
};

export default BootScreen;
