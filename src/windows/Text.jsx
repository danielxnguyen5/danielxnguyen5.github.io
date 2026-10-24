import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;
    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <>
            <div className="window-header">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
                <span className="w-16" aria-hidden="true" />
            </div>

            <div className="text-body">
                {image && <img src={image} alt="" className="text-image" />}
                {subtitle && <h3>{subtitle}</h3>}
                {description?.length > 0
                    ? description.map((para, i) => <p key={i}>{para}</p>)
                    : <p className="muted">This file is empty.</p>}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
