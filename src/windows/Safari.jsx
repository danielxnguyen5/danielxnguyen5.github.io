import React from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { articles } from "#constants/index.js";
import useWindowStore from "#store/window.js";

// "Articles": a small Safari-styled reader for project write-ups.
const Safari = () => {
    const { windows, openWindow } = useWindowStore();
    const index = Math.max(0, articles.findIndex((a) => a.id === windows.safari.data?.articleId));
    const article = articles[index];
    const go = (i) => openWindow("safari", { articleId: articles[i].id });

    return (
        <>
            <div className="window-header">
                <WindowControls target="safari" />
                <div className="safari-nav">
                    <button type="button" className="tool" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous article">
                        <ChevronLeft size={18} />
                    </button>
                    <button type="button" className="tool" onClick={() => go(index + 1)} disabled={index === articles.length - 1} aria-label="Next article">
                        <ChevronRight size={18} />
                    </button>
                </div>
                <div className="address">
                    <Lock size={12} aria-hidden="true" />
                    <span>danielnguyen.dev/articles/{article.id}</span>
                </div>
                <span className="w-16" aria-hidden="true" />
            </div>

            <div className="safari-body">
                <aside className="reading-list">
                    <h3>Articles</h3>
                    <ul>
                        {articles.map((a, i) => (
                            <li key={a.id}>
                                <button type="button" aria-current={i === index} onClick={() => go(i)}>
                                    <span className="rl-title">{a.title}</span>
                                    <span className="rl-meta">{a.project}, {a.readTime}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <article className="reader" key={article.id}>
                    <p className="reader-project">{article.project}</p>
                    <h1>{article.title}</h1>
                    {article.body.map((para, i) => <p key={i}>{para}</p>)}
                </article>
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
