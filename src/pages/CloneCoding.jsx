import React, { useMemo, useState } from "react";
import "./CloneCoding.css";

import leftIcon from "../assets/left.svg";
import rightIcon from "../assets/right.svg";

import img01 from "../assets/clone-coding01.svg";
import img02 from "../assets/clone-coding02.png";
import img03 from "../assets/clone-coding03.png";
import img04 from "../assets/clone-coding04.png";
import img05 from "../assets/clone-coding05.png";

import Button from "../components/Button";

export default function CloneCoding() {
  const slides = useMemo(
    () => [
      {
        bg: "#48ADFF",
        caption: "Clone coding",
        title: "Musign",
        desc: "클론코딩 학습으로 ‘musign’ 사이트를 \n 만들어보았어요.",
        image: img01,
      },
      {
        bg: "#25B544",
        caption: "Introduce",
        title: "YStudio",
        desc: "클론코딩 학습으로 ‘musign’ 사이트를 \n 만들어보았어요.",
        image: img02,
      },
      {
        bg: "#FFC41B",
        caption: "Introduce",
        title: "Crew A La Mode",
        desc: "클론코딩 학습으로 ‘musign’ 사이트를 \n 만들어보았어요.",
        image: img03,
      },
      {
        bg: "#FF719E",
        caption: "Introduce",
        title: "Korea Consumer\nAgency",
        desc: "클론코딩 학습으로 ‘musign’ 사이트를 \n 만들어보았어요.",
        image: img04,
      },
      {
        bg: "#FC6E47",
        caption: "Introduce",
        title: "Daebang",
        desc: "클론코딩 학습으로 ‘musign’ 사이트를 \n 만들어보았어요.",
        image: img05,
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const total = slides.length;

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  const current = slides[index];

  return (
    <section className="cc" style={{ "--cc-bg": current.bg }}>
      <div className="cc__grid">
        {/* LEFT */}
        <div className="cc__left">
          <div className="cc__caption">{current.caption}</div>

          <h1 className="cc__title">
            {current.title.split("\n").map((line, i) => (
              <span key={i} className="cc__titleLine">
                {line}
              </span>
            ))}
          </h1>

          <p className="cc__desc">
            {current.desc.split("\n").map((line, i) => (
              <span key={i} className="cc__descLine">
                {line}
              </span>
            ))}
          </p>

          {/* ✅ 버튼 */}
          <Button
            className="cc__button"
            label="View site"
            accentColor={current.bg}
            lightAccentColor="#E6F4FF"
          />
        </div>

        {/* RIGHT */}
        <div className="cc__right">
          <div className="cc__stage">
            <div
              className="cc__track"
              style={{ transform: `translateX(${-index * 100}%)` }}
            >
              {slides.map((s, i) => (
                <div className="cc__slide" key={i}>
                  <img className="cc__img" src={s.image} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom center controls */}
      <div className="cc__controls" aria-label="carousel controls">
        <button
          className="cc__nav cc__nav--left"
          onClick={goPrev}
          type="button"
        >
          <img src={leftIcon} alt="previous" />
        </button>

        <button
          className="cc__nav cc__nav--right"
          onClick={goNext}
          type="button"
        >
          <img src={rightIcon} alt="next" />
        </button>
      </div>
    </section>
  );
}
