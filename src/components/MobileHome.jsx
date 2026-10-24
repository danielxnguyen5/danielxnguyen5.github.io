import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import { locations } from "#constants/index.js";
import { setOrigin } from "#store/origin.js";

// Phone layout: an iOS-style home screen whose apps open the same windows full-screen.
const MobileHome = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocation } = useLocationStore();
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const id = setInterval(() => setNow(dayjs()), 15_000);
        return () => clearInterval(id);
    }, []);

    const apps = [
        { label: "Projects", icon: "/images/finder.png", run: () => { setActiveLocation(locations.work); openWindow("finder"); } },
        { label: "Articles", icon: "/images/safari.png", run: () => openWindow("safari") },
        { label: "Resume", icon: "/images/pdf.png", run: () => openWindow("resume") },
        { label: "About me", icon: "/images/txt.png", run: () => { setActiveLocation(locations.about); openWindow("finder"); } },
        { label: "Skills", icon: "/images/terminal.png", run: () => openWindow("terminal") },
        { label: "Gallery", icon: "/images/photos.png", run: () => openWindow("photos") },
        { label: "Contact", icon: "/images/contact.png", run: () => openWindow("contact") },
    ];

    return (
        <section id="mobile-home">
            <header className="mobile-status">
                <time>{now.format("h:mm")}</time>
            </header>

            <div className="mobile-hero">
                <p>Hey, I'm Daniel! Welcome to my</p>
                <h1>portfolio</h1>
            </div>

            <ul className="mobile-apps">
                {apps.map((a) => (
                    <li key={a.label}>
                        <button type="button" onClick={(e) => { setOrigin(e.currentTarget.querySelector("img")); a.run(); }}>
                            <img src={a.icon} alt="" />
                            <span>{a.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MobileHome;
