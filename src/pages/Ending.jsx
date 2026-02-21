import React from "react";
import "./Ending.css";

export default function Ending() {
    return (
        <section className="ending">
            <div className="ending__inner">
                <h1 className="ending__title" aria-label="Immerse myself in the Future">
                    <span className="ending__blue">Immerse</span>{" "}
                    <span className="ending__black">myself</span>
                    <br />
                    <span className="ending__black">in the </span>
                    <em className="ending__italic">Future</em>
                </h1>
            </div>
        </section>
    );
}
