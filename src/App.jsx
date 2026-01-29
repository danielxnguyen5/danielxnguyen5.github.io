import React, {useState} from 'react';
import {Navbar, Welcome, Dock, Home} from '#components';
import {Finder, Resume, Terminal, Text, Image, Contact, Photos, Safari} from '#windows';
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import BootScreen from "#components/BootScreen.jsx";

gsap.registerPlugin(Draggable);

const App = () => {
    const [booting, setBooting] = useState(true);
    return (
        <main>
            {booting && <BootScreen onDone={() => setBooting(false)} duration={1600} />}

            {!booting && (
                <>
                    <Navbar />
                    <Welcome />
                    <Dock />

                    <Terminal />
                    <Safari />
                    <Resume />
                    <Finder />
                    <Text />
                    <Image />
                    <Contact />
                    <Photos />

                    <Home />
                </>
            )}
        </main>
    )
}
export default App
