import React, { useMemo, useState, useRef, useEffect } from "react";
import "./Previous.css";

// assets
import previous01 from "../assets/previous01.svg";
import previous02 from "../assets/previous02.svg";
import previous03 from "../assets/previous03.svg";

import tool01 from "../assets/tool01.svg";
import tool02 from "../assets/tool02.svg";
import tool03 from "../assets/tool03.svg";

import rightIcon from "../assets/right.svg";
import clockIcon from "../assets/clock.svg";

import Button from "../components/Button";

const Previous = () => {
  const items = useMemo(
    () => [
      {
        id: 0,
        num: "(01)",
        title: "1Million Renewal Project",
        image: previous01,
        tool: tool01,
      },
      {
        id: 1,
        num: "(02)",
        title: "NOVA Branding Project",
        image: previous02,
        tool: tool02,
      },
      {
        id: 2,
        num: "(03)",
        title: "Klip Branding Project",
        image: previous03,
        tool: tool03,
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  const handleSelect = (idx) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  // ✅ 스크롤 올렸다/내렸다 반복해도 전환 반복되게
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 보이면 true, 안 보이면 false로 계속 갱신 → 반복 가능
        setIsVisible(entry.isIntersecting);
      },
      {
        // 20% 보이면 트리거 (원하면 0.01로 낮춰도 됨)
        threshold: 0.2,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`previous ${isVisible ? "is-visible" : ""}`}
    >
      <div className="previous__inner">
        {/* LEFT */}
        <div className="previous__left">
          <div className="previous__leftHead">
            <div className="previous__label">Artwork</div>
            <div className="previous__sub">저의 아트워크를 소개할게요!</div>
          </div>

          <div className="previous__list">
            {items.map((it, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={it.id}
                  type="button"
                  className={`previous__item ${isActive ? "is-active" : ""}`}
                  onClick={() => handleSelect(idx)}
                >
                  <div className="previous__itemRow">
                    <div className="previous__itemText">
                      <span className="previous__num">{it.num}</span>
                      <span className="previous__title">{it.title}</span>
                    </div>

                    {isActive && (
                      <span className="previous__goBtn" aria-hidden="true">
                        <img src={rightIcon} alt="" />
                      </span>
                    )}
                  </div>

                  {isActive && <div className="previous__underline" />}
                </button>
              );
            })}
          </div>

          <div className="previous__seeMore">
            <Button
              label="See more"
              accentColor="#18C15F"
              lightAccentColor="#18C15F"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="previous__right">
          <h1 className="previous__hero">
            My previous <span className="previous__heroGreen">Work</span>
          </h1>

          <div className="previous__box">
            <div key={active.id} className="previous__boxInner">
              <div className="previous__boxContent">
                <img
                  className="previous__toolIcon"
                  src={active.tool}
                  alt="tool icon"
                />

                <p className="previous__desc">
                  K-brand 리뉴얼 프로젝트에서 댄스 스튜디오 브랜드
                  <br />
                  “1Million”을 맡아 k-pop dance에 트렌디함을 더
                  <br />해 리뉴얼하였습니다.
                </p>

                <div className="previous__tools">
                  <span>• Figma</span>
                  <span>• Photoshop</span>
                  <span>• Vscode</span>
                  <span>• Github</span>
                  <span>• Javascript</span>
                </div>

                <div className="previous__time">
                  <img src={clockIcon} alt="clock" />
                  <span>3-4week</span>
                </div>
              </div>

              <div className="previous__boxImageWrap">
                <img
                  className="previous__boxImage"
                  src={active.image}
                  alt={active.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Previous;
