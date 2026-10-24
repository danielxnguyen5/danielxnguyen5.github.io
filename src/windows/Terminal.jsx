import React from "react";
import dayjs from "dayjs";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants/index.js";
import { WindowControls } from "#components/index.js";

const Terminal = () => {
    const lastLogin = dayjs().format("ddd MMM DD HH:mm:ss");

    return (
        <>
            <div className="window-header">
                <WindowControls target="terminal" />
                <h2>daniel — zsh — 84×26</h2>
                <span className="w-16" aria-hidden="true" />
            </div>

            <div className="terminal-body">
                <p className="muted">Last login: {lastLogin} on ttys001</p>
                <p><span className="prompt">daniel@monash ~ %</span> skills --all</p>

                <dl>
                    {techStack.map(({ category, items }) => (
                        <div key={category}>
                            <dt>{category}</dt>
                            <dd>{items.join(" ")}</dd>
                        </div>
                    ))}
                </dl>

                <p><span className="prompt">daniel@monash ~ %</span> <span className="cursor" aria-hidden="true" /></p>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
