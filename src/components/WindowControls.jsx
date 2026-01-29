// WindowControls.jsx
import React from "react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow, focusWindow } = useWindowStore();

    const getWindowEl = () => document.getElementById(target);

    const getDockButton = (windowKey) => {
        const dock = document.getElementById("dock")?.querySelector(".dock-container");
        if (!dock) return null;
        return dock.querySelector(`[data-windowkey="${windowKey}"]`);
    };

    const getTrayEl = () => document.getElementById("dock-minimized-tray");

    const getAppIconSrc = (windowKey) => {
        const btn = getDockButton(windowKey);
        const img = btn?.querySelector("img");
        return img?.getAttribute("src") || null; // e.g. "/images/safari.png"
    };

    const createTrayIcon = (windowKey) => {
        const tray = getTrayEl();
        if (!tray) return null;

        // Don’t create duplicates
        let existing = tray.querySelector(`[data-minwin="${windowKey}"]`);
        if (existing) return existing;

        const iconSrc = getAppIconSrc(windowKey) || "/images/plain.png";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.id = `tray-${windowKey}`; // ✅ stable id (optional, but useful)
        btn.className = "dock-icon dock-min-icon";
        btn.dataset.minwin = windowKey;

        const img = document.createElement("img");
        img.src = iconSrc;
        img.alt = `${windowKey} minimized`;
        img.loading = "lazy";

        btn.appendChild(img);
        tray.appendChild(btn);

        return btn;
    };

    // ---------- MINIMIZE (to tray next to Trash) ----------
    const handleMinimize = () => {
        const el = getWindowEl();
        if (!el) return;

        const tray = getTrayEl();
        if (!tray) return;

        const trayIcon = createTrayIcon(target);
        if (!trayIcon) return;

        // Animate window towards tray position
        const winRect = el.getBoundingClientRect();
        const trayRect = tray.getBoundingClientRect();

        const winCenterX = winRect.left + winRect.width / 2;
        const winCenterY = winRect.top + winRect.height / 2;

        // Aim near the center of tray (looks like macOS)
        const trayCenterX = trayRect.left + trayRect.width / 2;
        const trayCenterY = trayRect.top + trayRect.height / 2;

        const dx = trayCenterX - winCenterX;
        const dy = trayCenterY - winCenterY;

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
            scale: 0.08,
            duration: 0.42,
            ease: "power2.inOut",
            force3D: true,
            onComplete: () => {
                el.style.display = "none";
                gsap.set(el, { clearProps: "willChange,transition" });

                // tiny pop on the tray icon
                gsap.fromTo(trayIcon, { scale: 0.8 }, { scale: 1, duration: 0.25, ease: "power2.out" });
            },
        });

        // Restore handler (click tray icon)
        trayIcon.onclick = (e) => {
            e.preventDefault();

            el.style.display = "";

            // Start window near tray icon and expand out
            const winRect2 = el.getBoundingClientRect();
            const iconRect = trayIcon.getBoundingClientRect();

            const winCenterX2 = winRect2.left + winRect2.width / 2;
            const winCenterY2 = winRect2.top + winRect2.height / 2;

            const iconCenterX = iconRect.left + iconRect.width / 2;
            const iconCenterY = iconRect.top + iconRect.height / 2;

            const dx2 = iconCenterX - winCenterX2;
            const dy2 = iconCenterY - winCenterY2;

            gsap.set(el, {
                x: dx2,
                y: dy2,
                scale: 0.08,
                transformOrigin: "50% 50%",
                force3D: true,
            });

            gsap.to(el, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.48,
                ease: "expo.out",
                force3D: true,
                onComplete: () => focusWindow(target),
            });

            // remove tray icon after restoring
            gsap.to(trayIcon, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => trayIcon.remove(),
            });
        };
    };

    // ---------- MAXIMIZE ----------
    const handleMaximize = () => {
        const el = getWindowEl();
        if (!el) return;

        if (el.style.display === "none") el.style.display = "";

        gsap.set(el, { x: 0, y: 0, scale: 1, clearProps: "transform" });

        const isMax = el.classList.contains("maximized");
        gsap.killTweensOf(el);

        if (isMax) {
            el.classList.remove("maximized");

            const saved = el.dataset.restoreRect ? JSON.parse(el.dataset.restoreRect) : null;

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
                    onComplete: () => delete el.dataset.restoreRect,
                });
            }
            return;
        }

        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);

        const currentX = gsap.getProperty(el, "x") || 0;
        const currentY = gsap.getProperty(el, "y") || 0;

        const top = computed.top && computed.top !== "auto" ? computed.top : `${rect.top}px`;
        const left = computed.left && computed.left !== "auto" ? computed.left : `${rect.left}px`;

        el.dataset.restoreRect = JSON.stringify({
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            top,
            left,
            x: currentX,
            y: currentY,
        });

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
