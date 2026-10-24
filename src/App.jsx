import React, { useState } from "react";
import { Navbar, Welcome, Dock, Home, Wallpaper, Spotlight, MobileHome } from "#components";
import { Finder, Resume, Terminal, Text, Image, Contact, Photos, Safari, Preview } from "#windows";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import BootScreen from "#components/BootScreen.jsx";

gsap.registerPlugin(Draggable);

const shouldBoot = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    try {
        if (sessionStorage.getItem("booted")) return false;
        sessionStorage.setItem("booted", "1");
    } catch { /* storage unavailable */ }
    return true;
};

// Decided once at load (StrictMode would otherwise run the check twice).
const BOOT = shouldBoot();

const App = () => {
    const [booting, setBooting] = useState(BOOT);

    return (
        <main>
            <Wallpaper />
            {booting && <BootScreen onDone={() => setBooting(false)} />}

            {!booting && (
                <>
                    <Navbar />
                    <Welcome />
                    <Home />
                    <MobileHome />
                    <Dock />

                    <Terminal />
                    <Safari />
                    <Resume />
                    <Finder />
                    <Text />
                    <Image />
                    <Contact />
                    <Photos />
                    <Preview />

                    <Spotlight />
                </>
            )}
        </main>
    );
};

export default App;
