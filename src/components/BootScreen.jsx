import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const BootScreen = ({ onDone, duration = 1400 }) => {
    const rootRef = useRef(null);
    const barFillRef = useRef(null);

    useEffect(() => {
        const el = rootRef.current;
        const fill = barFillRef.current;
        if (!el || !fill) return;

        gsap.set(el, { opacity: 1 });
        gsap.set(fill, { width: "0%" });

        const tl = gsap.timeline({
            onComplete: () => onDone?.(),
        });

        tl.to(fill, {
            width: "100%",
            duration: Math.max(0.6, duration / 1000 - 0.35),
            ease: "power2.out",
        })
            .to({}, { duration: 0.12 })
            .to(el, { opacity: 0, duration: 0.35, ease: "power2.out" });

        return () => tl.kill();
    }, [onDone, duration]);

    return (
        <div
            ref={rootRef}
            className="
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        bg-black/30 backdrop-blur-[80px]
        select-none
      "
        >
            <div className="text-white text-6xl mb-10"></div>

            <div className="w-44 h-[6px] rounded-full bg-white/20 overflow-hidden">
                <div
                    ref={barFillRef}
                    className="h-full rounded-full bg-white/80"
                    style={{ width: "0%" }}
                />
            </div>

            <p className="mt-8 text-white/60 text-sm font-roboto tracking-wide">
                Welcome to Daniel&apos;s Portfolio
            </p>
        </div>
    );
};

export default BootScreen;
