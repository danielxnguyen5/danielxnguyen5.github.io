import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Moon, Search, Sun, Wifi } from "lucide-react";
import useWindowStore from "#store/window.js";
import useUiStore from "#store/ui.js";
import { setOrigin } from "#store/origin.js";

const menu = [
    { name: "Projects", type: "finder" },
    { name: "Articles", type: "safari" },
    { name: "Resume", type: "resume" },
    { name: "Contact", type: "contact" },
];

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const { theme, toggleTheme, openSpotlight } = useUiStore();
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const id = setInterval(() => setNow(dayjs()), 15_000);
        return () => clearInterval(id);
    }, []);

    return (
        <nav id="menubar">
            <div className="menubar-left">
                <img src="/images/logo.svg" alt="" className="apple" />
                <button type="button" className="app-name" onClick={() => openWindow("finder")}>Daniel Nguyen</button>
                <ul>
                    {menu.map(({ name, type }) => (
                        <li key={type}>
                            <button type="button" onClick={(e) => { setOrigin(e.currentTarget); openWindow(type); }}>{name}</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="menubar-right">
                <Wifi size={15} aria-hidden="true" />
                <button type="button" onClick={openSpotlight} aria-label="Search">
                    <Search size={15} />
                </button>
                <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <time dateTime={now.toISOString()}>{now.format("ddd D MMM h:mm A")}</time>
            </div>
        </nav>
    );
};

export default Navbar;
