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
        link: "file:///C:/Users/EZEN/Documents/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%B0%9B%EC%9D%80%20%ED%8C%8C%EC%9D%BC/2026-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%EC%B5%9C%EC%A2%85%EB%AA%A8%EC%9D%8C/1.%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9_%EB%AE%A4%EC%9E%90%EC%9D%B8/index.html",
      },
      {
        bg: "#25B544",
        caption: "Introduce",
        title: "YStudio",
        desc: "클론코딩 학습으로 ‘YStudio’ 사이트를 \n 만들어보았어요.",
        image: img02,
        link: "file:///C:/Users/EZEN/Documents/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%B0%9B%EC%9D%80%20%ED%8C%8C%EC%9D%BC/2026-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%EC%B5%9C%EC%A2%85%EB%AA%A8%EC%9D%8C/2.%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9_%EC%99%80%EC%9D%B4%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4/index.html",
      },
      {
        bg: "#FFC41B",
        caption: "Introduce",
        title: "Crew A La Mode",
        desc: "클론코딩 학습으로 ‘Crew A La Mode’ 사이트를 \n 만들어보았어요.",
        image: img03,
        link: "file:///C:/Users/EZEN/Documents/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%B0%9B%EC%9D%80%20%ED%8C%8C%EC%9D%BC/2026-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%EC%B5%9C%EC%A2%85%EB%AA%A8%EC%9D%8C/4.%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9_%ED%81%AC%EB%A3%A8%EC%96%BC%EB%9D%BC%EB%AA%A8%EB%93%9C/index.html",
      },
      {
        bg: "#FF719E",
        caption: "Introduce",
        title: "Korea Consumer\nAgency",
        desc: "클론코딩 학습으로 ‘Korea ConsumerAgency’ \n 사이트를 만들어보았어요.",
        image: img04,
        link: "file:///C:/Users/EZEN/Documents/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%B0%9B%EC%9D%80%20%ED%8C%8C%EC%9D%BC/2026-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%EC%B5%9C%EC%A2%85%EB%AA%A8%EC%9D%8C/6.%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9_%ED%8F%AC%EB%A9%94%EC%9D%B8/index.html",
      },
      {
        bg: "#FC6E47",
        caption: "Introduce",
        title: "Daebang",
        desc: "클론코딩 학습으로 ‘Daebang ’ 사이트를 \n 만들어보았어요.",
        image: img05,
        link: "file:///C:/Users/EZEN/Documents/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%B0%9B%EC%9D%80%20%ED%8C%8C%EC%9D%BC/2026-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%EC%B5%9C%EC%A2%85%EB%AA%A8%EC%9D%8C/5.%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9_%EB%8C%80%EB%B0%A9/index.html",
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

          {/* ✅ 버튼 누르면 해당 링크로 이동 */}
          <a
            href={current.link}
            className="cc__buttonLink"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className="cc__button"
              label="View site"
              accentColor={current.bg}
              lightAccentColor="#E6F4FF"
            />
          </a>
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
