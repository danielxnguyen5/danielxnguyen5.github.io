import React from "react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow, focusWindow } = useWindowStore();

    const getWindowEl = () => document.getElementById(target);

    // ---------- Dock Icon ----------
    const ensureDockEmoji = (windowKey) => {
        const dock = document.getElementById("dock")?.querySelector(".dock-container");
        if (!dock) return null;

        let btn = dock.querySelector(`[data-windowkey="${windowKey}"]`);
        if (btn) return btn;

        btn = document.createElement("button");
        btn.className = "dock-icon";
        btn.dataset.windowkey = windowKey;
        btn.textContent = "🖥️";
        btn.style.display = "grid";
        btn.style.placeItems = "center";
        btn.style.fontSize = "28px";

        dock.appendChild(btn);
        return btn;
    };

    // ---------- MINIMIZE ----------
    const handleMinimize = () => {
        const el = getWindowEl();
        if (!el) return;

        const dockIcon = ensureDockEmoji(target);
        if (!dockIcon) return;

        const winRect = el.getBoundingClientRect();
        const iconRect = dockIcon.getBoundingClientRect();

        const winCenterX = winRect.left + winRect.width / 2;
        const winCenterY = winRect.top + winRect.height / 2;
        const iconCenterX = iconRect.left + iconRect.width / 2;
        const iconCenterY = iconRect.top + iconRect.height / 2;

        const dx = iconCenterX - winCenterX;
        const dy = iconCenterY - winCenterY;

        gsap.killTweensOf(el);

        gsap.set(el, {
            transformOrigin: "50% 50%",
            willChange: "transform",
            force3D: true,
            transition: "none",
        });

        // ONE smooth tween
        gsap.to(el, {
            x: dx,
            y: dy,
            scale: 0.05,
            duration: 0.42,
            ease: "power2.inOut",
            force3D: true,
            onComplete: () => {
                el.style.display = "none";
                gsap.set(el, { clearProps: "willChange,transition" });
            },
        });

        // ---------- RESTORE ----------
        if (!dockIcon.dataset.restore) {
            dockIcon.dataset.restore = "1";

            dockIcon.onclick = () => {
                el.style.display = "";

                const winRect2 = el.getBoundingClientRect();
                const iconRect2 = dockIcon.getBoundingClientRect();

                const winCenterX2 = winRect2.left + winRect2.width / 2;
                const winCenterY2 = winRect2.top + winRect2.height / 2;
                const iconCenterX2 = iconRect2.left + iconRect2.width / 2;
                const iconCenterY2 = iconRect2.top + iconRect2.height / 2;

                const dx2 = iconCenterX2 - winCenterX2;
                const dy2 = iconCenterY2 - winCenterY2;

                gsap.set(el, {
                    x: dx2,
                    y: dy2,
                    scale: 0.05,
                    transformOrigin: "50% 50%",
                    force3D: true,
                });

                // Window animation back
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: "expo.out",
                    force3D: true,
                    onComplete: () => {
                        focusWindow(target);
                    },
                });

                // Dock icon merge animation
                gsap.to(dockIcon, {
                    y: -10,
                    scale: 0.2,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        dockIcon.remove();
                    },
                });
            };
        }
    };

    // ---------- MAXIMIZE ----------
    const handleMaximize = () => {
        const el = getWindowEl();
        if (!el) return;

        if (el.style.display === "none") {
            el.style.display = "";
        }

        gsap.set(el, { x: 0, y: 0, scale: 1, clearProps: "transform" });

        const isMax = el.classList.contains("maximized");
        gsap.killTweensOf(el);

        if (isMax) {
            el.classList.remove("maximized");
            gsap.to(el, {
                width: "800px",
                height: "500px",
                top: "100px",
                left: "50%",
                x: "-50%",
                duration: 0.3,
                ease: "power2.out",
                force3D: true,
            });
        } else {
            el.classList.add("maximized");
            gsap.to(el, {
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                x: 0,
                duration: 0.3,
                ease: "power2.out",
                force3D: true,
            });
        }
    };

    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)} />
            <div className="minimize" onClick={handleMinimize} />
            <div className="maximize" onClick={handleMaximize} />
        </div>
    );
};

export default WindowControls;
