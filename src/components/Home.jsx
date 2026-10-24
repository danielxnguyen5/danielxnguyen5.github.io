import React from "react";
import { locations } from "#constants/index.js";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import { setOrigin } from "#store/origin.js";

const projects = locations.work?.children ?? [];

// Desktop icons, stacked down the right edge like macOS.
const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const open = (project, el) => {
        setOrigin(el.querySelector("img"));
        setActiveLocation(project);
        openWindow("finder");
    };

    return (
        <section id="home" aria-label="Desktop">
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <button type="button" className="desktop-icon" onClick={(e) => open(project, e.currentTarget)}>
                            <img src="/images/folder.png" alt="" />
                            <span>{project.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
