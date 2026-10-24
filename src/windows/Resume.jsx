import React, { useEffect, useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const pageWidth = () => Math.min(680, window.innerWidth - 32);

const Resume = () => {
    const [width, setWidth] = useState(pageWidth);

    useEffect(() => {
        const onResize = () => setWidth(pageWidth());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <>
            <div className="window-header">
                <WindowControls target="resume" />
                <h2>DanielNguyen_Resume.pdf</h2>
                <a href="/files/resume.pdf" download="DanielNguyen_Resume.pdf" className="tool" aria-label="Download resume">
                    <Download size={16} />
                </a>
            </div>

            <div className="resume-body">
                <Document file="/files/resume.pdf" loading={<p className="muted p-6">Loading resume…</p>}>
                    <Page pageNumber={1} width={width} renderTextLayer renderAnnotationLayer />
                </Document>
            </div>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
