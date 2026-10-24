// Remembers where the user clicked to open a window (a dock icon, folder, file…)
// so the window can zoom out of that spot, like macOS.
let origin = null;

export const setOrigin = (el) => {
    origin = el?.getBoundingClientRect?.() ?? null;
};

export const takeOrigin = () => {
    const o = origin;
    origin = null;
    return o;
};
