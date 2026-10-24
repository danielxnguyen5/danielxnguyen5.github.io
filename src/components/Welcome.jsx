import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) =>
    [...text].map((char, i) => (
        <span key={i} className={className} style={{ fontVariationSettings: `"wght" ${baseWeight}` }}>
            {char === " " ? " " : char}
        </span>
    ));

// Letters swell in weight as the cursor passes over them.
const setupTextHover = (container, type) => {
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];
    const animate = (letter, weight, duration = 0.25) =>
        gsap.to(letter, { duration, ease: "power2.out", fontVariationSettings: `"wght" ${weight}` });

    const move = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            animate(letter, min + (max - min) * Math.exp(-(distance ** 2) / 10000));
        });
    };
    const leave = () => letters.forEach((letter) => animate(letter, base, 0.3));

    container.addEventListener("mousemove", move);
    container.addEventListener("mouseleave", leave);
    return () => {
        container.removeEventListener("mousemove", move);
        container.removeEventListener("mouseleave", leave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const hintRef = useRef(null);

    useGSAP(() => {
        const cleanups = [
            setupTextHover(titleRef.current, "title"),
            setupTextHover(subtitleRef.current, "subtitle"),
            setupTextHover(hintRef.current, "subtitle"),
        ];
        return () => cleanups.forEach((c) => c());
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef} aria-label="Hey, I'm Daniel! Welcome to my">
                {renderText("Hey, I'm Daniel! Welcome to my", "text-3xl font-georama", 100)}
            </p>
            <h1 ref={titleRef} className="mt-7" aria-label="portfolio">
                {renderText("portfolio", "text-9xl italic font-georama", 400)}
            </h1>
            <p ref={hintRef} className="mt-7" aria-label="Click the folders or dock icons to explore">
                {renderText("Click the folders or dock icons to explore", "text-3xl font-georama", 100)}
            </p>
        </section>
    );
};

export default Welcome;
