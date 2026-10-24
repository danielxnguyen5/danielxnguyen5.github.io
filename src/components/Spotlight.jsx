import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { articles, locations } from "#constants/index.js";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import useUiStore from "#store/ui.js";

const Spotlight = () => {
    const { spotlightOpen, openSpotlight, closeSpotlight } = useUiStore();

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                spotlightOpen ? closeSpotlight() : openSpotlight();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [spotlightOpen, openSpotlight, closeSpotlight]);

    return spotlightOpen ? <SpotlightPanel /> : null;
};

const SpotlightPanel = () => {
    const { closeSpotlight } = useUiStore();
    const { openWindow } = useWindowStore();
    const { setActiveLocation } = useLocationStore();
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);

    const items = useMemo(() => {
        const inFinder = (loc) => () => { setActiveLocation(loc); openWindow("finder"); };
        return [
            ...locations.work.children.map((p) => ({ group: "Projects", label: p.name, icon: "/images/folder.png", run: inFinder(p) })),
            ...articles.map((a) => ({ group: "Articles", label: a.title, icon: "/images/safari.png", run: () => openWindow("safari", { articleId: a.id }) })),
            { group: "Apps", label: "Resume", icon: "/images/pdf.png", run: () => openWindow("resume") },
            { group: "Apps", label: "About me", icon: "/images/txt.png", run: inFinder(locations.about) },
            { group: "Apps", label: "Skills", icon: "/images/terminal.png", run: () => openWindow("terminal") },
            { group: "Apps", label: "Contact", icon: "/images/contact.png", run: () => openWindow("contact") },
            { group: "Apps", label: "Gallery", icon: "/images/photos.png", run: () => openWindow("photos") },
        ];
    }, [openWindow, setActiveLocation]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? items.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q)) : items;
    }, [items, query]);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const choose = (item) => { closeSpotlight(); item?.run(); };

    const onKeyDown = (e) => {
        if (e.key === "Escape") closeSpotlight();
        else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
        else if (e.key === "Enter") choose(results[active]);
    };

    let lastGroup = null;

    return (
        <div id="spotlight" onMouseDown={(e) => e.target === e.currentTarget && closeSpotlight()}>
            <div className="spotlight-panel" role="dialog" aria-label="Search">
                <div className="spotlight-input">
                    <Search size={20} aria-hidden="true" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                        onKeyDown={onKeyDown}
                        placeholder="Search projects, articles and more"
                        aria-label="Search projects, articles and more"
                    />
                </div>
                {results.length > 0 ? (
                    <ul className="spotlight-results" role="listbox">
                        {results.map((item, i) => {
                            const header = item.group !== lastGroup ? item.group : null;
                            lastGroup = item.group;
                            return (
                                <React.Fragment key={`${item.group}-${item.label}`}>
                                    {header && <li className="spotlight-group" role="presentation">{header}</li>}
                                    <li
                                        role="option"
                                        aria-selected={i === active}
                                        className={i === active ? "selected" : ""}
                                        onMouseEnter={() => setActive(i)}
                                        onClick={() => choose(item)}
                                    >
                                        <img src={item.icon} alt="" />
                                        <span>{item.label}</span>
                                    </li>
                                </React.Fragment>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="spotlight-empty">No matches for “{query}”. Try a project name like AusLink.</p>
                )}
            </div>
        </div>
    );
};

export default Spotlight;
