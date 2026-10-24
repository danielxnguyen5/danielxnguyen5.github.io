import React from "react";
import { WindowControls } from "#components/index.js";
import { ChevronLeft, Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";
import useUiStore from "#store/ui.js";
import { setOrigin } from "#store/origin.js";

// Find the folder that contains `target`, so the back button knows where to go.
const findParent = (target, node = { children: Object.values(locations) }) => {
    for (const child of node.children ?? []) {
        if (child === target) return node.name ? node : null;
        const hit = findParent(target, child);
        if (hit) return hit;
    }
    return null;
};

const Finder = () => {
    const { openWindow } = useWindowStore();
    const { openSpotlight } = useUiStore();
    const { activeLocation, setActiveLocation } = useLocationStore();
    const parent = findParent(activeLocation);

    const openItem = (item, el) => {
        if (item.kind === "folder") return setActiveLocation(item);
        setOrigin(el?.querySelector("img"));
        if (item.comingSoon) return openWindow("pdfpreview", item);
        if (item.fileType === "pdf") return openWindow("resume");
        if (["fig", "url"].includes(item.fileType) && item.href) return window.open(item.href, "_blank", "noopener");
        openWindow(`${item.fileType}${item.kind}`, item);
    };

    const sidebarList = (title, items) => (
        <div>
            <h3>{title}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            aria-current={item.id === activeLocation.id && item.name === activeLocation.name}
                            onClick={() => setActiveLocation(item)}
                        >
                            <img src={item.icon} alt="" />
                            <span>{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <div className="window-header">
                <WindowControls target="finder" />
                <div className="finder-title">
                    <button type="button" className="tool" onClick={() => parent && setActiveLocation(parent)} disabled={!parent} aria-label="Back">
                        <ChevronLeft size={18} />
                    </button>
                    <h2>{activeLocation.name}</h2>
                </div>
                <button type="button" className="tool" onClick={openSpotlight} aria-label="Search">
                    <Search size={16} />
                </button>
            </div>

            <div className="finder-body">
                <aside className="sidebar">
                    {sidebarList("Favourites", Object.values(locations))}
                    {sidebarList("Projects", locations.work.children)}
                </aside>

                <ul className="finder-grid" key={`${activeLocation.type ?? ""}-${activeLocation.id}-${activeLocation.name}`}>
                    {activeLocation?.children.map((item) => (
                        <li key={item.id}>
                            <button type="button" onClick={(e) => openItem(item, e.currentTarget)}>
                                <img src={item.icon} alt="" />
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                    {activeLocation?.children.length === 0 && <li className="finder-empty">This folder is empty.</li>}
                </ul>
            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
