import React from "react";
import useUiStore from "#store/ui.js";

// macOS Catalina wallpaper: Day in light mode, Night in dark mode.
// Both layers stay mounted so switching themes crossfades instead of flashing.
const Wallpaper = () => {
    const theme = useUiStore((s) => s.theme);

    return (
        <div className="wallpaper" aria-hidden="true">
            <div className="wallpaper-layer wallpaper-day" />
            <div className="wallpaper-layer wallpaper-night" style={{ opacity: theme === "dark" ? 1 : 0 }} />
        </div>
    );
};

export default Wallpaper;
