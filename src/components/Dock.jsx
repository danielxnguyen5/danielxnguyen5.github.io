// Dock.jsx
import React, { useRef } from "react";
import { dockApps } from "#constants/index.js";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        };

        const resetIcons = () =>
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                })
            );

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        const tray = document.getElementById("dock-minimized-tray");
        const group = document.getElementById("dock-tray-group");

        let observer = null;

        if (tray && group) {
            const syncTrayGroup = () => {
                if (tray.children.length > 0) group.classList.remove("hidden");
                else group.classList.add("hidden");
            };

            syncTrayGroup(); // initial state

            observer = new MutationObserver(syncTrayGroup);
            observer.observe(tray, { childList: true });
        }

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
            if (observer) observer.disconnect();
        };
    }, []);

    const toggleApp = (id, canOpen) => {
        if (!canOpen) return;

        const win = windows[id];
        if (!win) return;

        const trayIcon = document.querySelector(`[data-minwin="${id}"]`);
        const winEl = document.getElementById(id);

        if (winEl && winEl.style.display === "none" && trayIcon) {
            trayIcon.click();
            return;
        }

        if (win.isOpen) closeWindow(id);
        else openWindow(id);
    };

    const TRASH_ID = "trash";

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps
                    .filter((a) => a.id !== TRASH_ID)
                    .map(({ id, name, icon, canOpen }) => (
                        <div key={id} className="relative flex justify-between">
                            <button
                                type="button"
                                className="dock-icon"
                                aria-label={name}
                                data-tooltip-id="dock-tooltip"
                                data-tooltip-content={name}
                                data-tooltip-delay-show={150}
                                disabled={!canOpen}
                                data-windowkey={id}
                                onClick={() => toggleApp(id, canOpen)}
                            >
                                <img
                                    src={`/images/${icon}`}
                                    alt={name}
                                    loading="lazy"
                                    className={canOpen ? "" : "opacity-60"}
                                />
                            </button>
                        </div>
                    ))}

                <div id="dock-tray-group" className="dock-tray-group hidden">
                    <div className="dock-separator" aria-hidden="true" />
                    <div id="dock-minimized-tray" className="dock-minimized-tray" />
                </div>

                {dockApps
                    .filter((a) => a.id === TRASH_ID)
                    .map(({ id, name, icon, canOpen }) => (
                        <div key={id} className="relative flex justify-between">
                            <button
                                type="button"
                                className="dock-icon"
                                aria-label={name}
                                data-tooltip-id="dock-tooltip"
                                data-tooltip-content={name}
                                data-tooltip-delay-show={150}
                                disabled={!canOpen}
                                data-windowkey={id}
                                onClick={() => toggleApp(id, canOpen)}
                            >
                                <img
                                    src={`/images/${icon}`}
                                    alt={name}
                                    loading="lazy"
                                    className={canOpen ? "" : "opacity-60"}
                                />
                            </button>
                        </div>
                    ))}

                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;
