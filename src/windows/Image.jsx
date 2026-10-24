import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const ImageWindowContent = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;
    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div className="window-header">
                <WindowControls target="imgfile" />
                <h2>{name}</h2>
                <span className="w-16" aria-hidden="true" />
            </div>
            <div className="image-body">
                {imageUrl && <img src={imageUrl} alt={name} />}
            </div>
        </>
    );
};

const ImageWindow = WindowWrapper(ImageWindowContent, "imgfile");
export default ImageWindow;
