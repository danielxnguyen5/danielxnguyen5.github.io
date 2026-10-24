import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

// Placeholder PDF for work that isn't published yet.
const Preview = () => {
    const { windows } = useWindowStore();
    const data = windows.pdfpreview?.data;
    if (!data) return null;

    return (
        <>
            <div className="window-header">
                <WindowControls target="pdfpreview" />
                <h2>{data.name}</h2>
                <span className="w-16" aria-hidden="true" />
            </div>
            <div className="preview-body">
                <div className="paper">
                    <h3>{data.subtitle}</h3>
                    <p className="paper-author">Daniel Nguyen, Monash University</p>
                    <div className="paper-soon">
                        <p className="soon-title">Coming soon</p>
                        <p>This paper is still being written. Check back later.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

const PreviewWindow = WindowWrapper(Preview, "pdfpreview");
export default PreviewWindow;
