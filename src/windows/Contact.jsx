import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { socials } from "#constants/index.js";
import { WindowControls } from "#components";

export const Contact = () => (
    <>
        <div className="window-header">
            <WindowControls target="contact" />
            <h2>Contact</h2>
            <span className="w-16" aria-hidden="true" />
        </div>

        <div className="contact-body">
            <div className="contact-card">
                <img src="/images/daniel.jpg" alt="Daniel Nguyen" />
                <div>
                    <h3>Daniel Nguyen</h3>
                    <p>Computer Science, Monash University</p>
                    <p>Melbourne, Australia</p>
                </div>
            </div>

            <ul className="contact-rows">
                {socials.map(({ id, link, icon, text, value }) => (
                    <li key={id}>
                        <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                            <span className="contact-label">{text}</span>
                            <span className="contact-value">
                                <img src={icon} alt="" />
                                {value}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </>
);

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
