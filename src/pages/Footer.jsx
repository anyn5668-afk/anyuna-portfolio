import React from "react";
import "./Footer.css";

import shadow1 from "../assets/shadow1.svg";
import shadow2 from "../assets/shadow2.svg";
import shadow3 from "../assets/shadow3.svg";

import clockIcon from "../assets/footer-clock.svg";
import mailIcon from "../assets/mail.svg";
import callIcon from "../assets/call.svg";

import instaArrow from "../assets/insta.svg";

export default function Footer() {
    return (
        <footer className="footer" aria-label="Footer">
            {/* Top 오른쪽 영역 */}
            <div className="footer__top">
                <div className="footer__info" aria-label="Contact info">
                    <div className="footer__infoRow">
                        <img className="footer__infoIcon" src={callIcon} alt="" />
                        <span className="footer__infoText">010-4942-4231</span>
                    </div>
                    <div className="footer__infoRow">
                        <img className="footer__infoIcon" src={mailIcon} alt="" />
                        <span className="footer__infoText">anyn5668@naver.com</span>
                    </div>
                    <div className="footer__infoRow">
                        <img className="footer__infoIcon" src={clockIcon} alt="" />
                        <span className="footer__infoText">9:00~24:00</span>
                    </div>
                </div>

                <a
                    className="footer__instagram"
                    href="https://www.instagram.com/yourorbitt?igsh=cHZmNnZhazdodzQ0&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="footer__instagramText">INSTAGRAM</span>
                    <img className="footer__instaArrow" src={instaArrow} alt="" />
                </a>
            </div>

            {/* Background big text */}
            <div className="footer__bgText" aria-hidden="true">
                CONTACT
            </div>

            {/* Bottom caption */}
            <div className="footer__bottom">
                2026 personal branding website
            </div>

            {/* Bottom SVG shadows */}
            <div className="footer__shadows" aria-hidden="true">
                <img className="footer__shadow footer__shadow--1" src={shadow1} alt="" />
                <img className="footer__shadow footer__shadow--2" src={shadow2} alt="" />
                <img className="footer__shadow footer__shadow--3" src={shadow3} alt="" />
            </div>
        </footer>
    );
}
