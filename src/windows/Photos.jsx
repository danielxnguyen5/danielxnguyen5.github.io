import React from "react";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Photos = () => {
    const { openWindow } = useWindowStore();

    const open = (id, img) =>
        openWindow("imgfile", { id, name: `Photo ${id}`, icon: "/images/image.png", kind: "file", fileType: "img", imageUrl: img });

    return (
        <>
            <div className="window-header">
                <WindowControls target="photos" />
                <h2>Gallery</h2>
                <span className="w-16" aria-hidden="true" />
            </div>

            <div className="photos-body">
                <aside className="sidebar">
                    <h3>Photos</h3>
                    <ul>
                        {photosLinks.map(({ id, icon, title }) => (
                            <li key={id}>
                                <button type="button" aria-current={id === 1}>
                                    <img src={icon} alt="" />
                                    <span>{title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <ul className="gallery">
                    {gallery.map(({ id, img }) => (
                        <li key={id}>
                            <button type="button" onClick={() => open(id, img)} aria-label={`Open photo ${id}`}>
                                <img src={img} alt="" loading="lazy" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
