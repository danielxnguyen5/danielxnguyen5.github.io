import { create } from "zustand";

const readTheme = () => {
    try {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
    } catch { /* storage unavailable */ }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
};

const initialTheme = readTheme();
applyTheme(initialTheme);

const useUiStore = create((set, get) => ({
    theme: initialTheme,
    toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyTheme(next);
        set({ theme: next });
    },

    spotlightOpen: false,
    openSpotlight: () => set({ spotlightOpen: true }),
    closeSpotlight: () => set({ spotlightOpen: false }),
}));

export default useUiStore;
