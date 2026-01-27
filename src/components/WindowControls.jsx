import React from "react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow, focusWindow } = useWindowStore();

    const getWindowEl = () => document.getElementById(target);

    // ---------- Dock Icon ----------
    const ensureDockEmoji = (windowKey) => {
        const dock = document
            .getElementById("dock")
            ?.querySelector(".dock-container");
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

        if (el.style.display === "none") el.style.display = "";

        // Always clear transform so size/position math is consistent
        gsap.set(el, { x: 0, y: 0, scale: 1, clearProps: "transform" });

        const isMax = el.classList.contains("maximized");
        gsap.killTweensOf(el);

        if (isMax) {
            // Restore saved geometry
            el.classList.remove("maximized");

            const saved = el.dataset.restoreRect
                ? JSON.parse(el.dataset.restoreRect)
                : null;

            if (saved) {
                gsap.to(el, {
                    width: saved.width,
                    height: saved.height,
                    top: saved.top,
                    left: saved.left,
                    x: saved.x,
                    y: saved.y,
                    duration: 0.3,
                    ease: "power2.out",
                    force3D: true,
                    onComplete: () => {
                        // cleanup so next maximize stores fresh values
                        delete el.dataset.restoreRect;
                    },
                });
            }
            return;
        }

        // Save current geometry BEFORE maximizing
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);

        const currentX = gsap.getProperty(el, "x") || 0;
        const currentY = gsap.getProperty(el, "y") || 0;

        // Use computed top/left if available; fallback to rect in px
        const top =
            computed.top && computed.top !== "auto" ? computed.top : `${rect.top}px`;
        const left =
            computed.left && computed.left !== "auto"
                ? computed.left
                : `${rect.left}px`;

        el.dataset.restoreRect = JSON.stringify({
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            top,
            left,
            x: currentX,
            y: currentY,
        });

        // Maximize
        el.classList.add("maximized");
        gsap.to(el, {
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            force3D: true,
        });
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
