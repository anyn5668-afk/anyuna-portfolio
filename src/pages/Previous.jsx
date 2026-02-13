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

        // ▶ 오른쪽 화살표용 링크
        link: "https://yunjioh.github.io/1million/",

        // ▶ See more 버튼용 링크
        seeMoreLink:
          "https://www.figma.com/proto/wJYRbWCCr2pch59UEaUFMu/2025-K-Brand-1MILLION-Team-Project?page-id=0%3A1&node-id=1-868&viewport=-29042%2C9970%2C1.08&t=c2rJ9nGrYDpG2OA0-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A6023",

        desc: `K-brand 리뉴얼 프로젝트에서 댄스 스튜디오 브랜드
“1Million”을 맡아 k-pop dance에 트렌디함을 더
해 리뉴얼하였습니다.`,
        tools: ["Figma", "Photoshop", "Vscode", "Github", "Javascript"],
        duration: "4week",
      },
      {
        id: 1,
        num: "(02)",
        title: "NOVA Branding Project",
        image: previous02,
        tool: tool02,

        // ▶ 오른쪽 화살표용 링크
        link: "https://tubi-nova.vercel.app/",

        // ▶ See more 버튼용 링크
        seeMoreLink:
          "https://www.figma.com/proto/Xpaobtemst4HdOezZcz3gC/Untitled?page-id=0%3A1&node-id=0-4162&viewport=397%2C259%2C0.04&t=e6XpLZjeGXUKIqzd-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=0%3A12544",

        desc: `최근 하나의 컨텐츠로 자리잡게된 버츄얼 문화
흐름에 따라 버츄얼 아이돌 팬덤 어플을 제작하였습니다.`,
        tools: [
          "Photoshop",
          "Midjourney",
          "React",
          "Figma",
          "Github",
          "Illerstrator",
        ],
        duration: "3-4week",
      },
      {
        id: 2,
        num: "(03)",
        title: "Klip Branding Project",
        image: previous03,
        tool: tool03,

        // ▶ 오른쪽 화살표용 링크
        link: "https://www.figma.com/proto/hsLWVi8BayKW1Xc58dBsQ6/13.%EC%95%88%EC%9C%A0%EB%82%98?page-id=2246%3A6494&node-id=2246-6495&viewport=397%2C132%2C0.13&t=4wAHcuZJDrkuGxsF-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2246%3A6495",

        // ▶ See more 버튼용 링크
        seeMoreLink:
          "https://www.figma.com/proto/Ws9J6l56jd04jmGbgW6jwv/%EC%A0%95%EA%B8%B0%EA%B5%AC%EB%8F%85-%EC%A7%80%EC%B6%9C%EA%B4%80%EB%A6%AC-%EC%95%B1-Personal-Project-Klip?page-id=0%3A1&node-id=0-1294&viewport=346%2C465%2C0.04&t=6wi33N6sA3xbQTDo-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=0%3A10826",

        desc: `정기구독 지출을 관리해주는
나만의 지갑지킴이 "Clip"을 제작하였습니다.`,
        tools: ["Figma", "Illerstrator", "Photoshop"],
        duration: "6-7week",
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

  const openLink = (link) => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // ▶ See more 전용
  const handleSeeMore = () => {
    openLink(active?.seeMoreLink);
  };

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
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
                      <span
                        className="previous__goBtn"
                        role="button"
                        tabIndex={0}
                        aria-label={`${it.title} 링크 열기`}
                        onClick={() => openLink(it.link)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            openLink(it.link);
                          }
                        }}
                      >
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
              label="View plan"
              accentColor="#18C15F"
              lightAccentColor="#18C15F"
              onClick={handleSeeMore}
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
                  {active.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>

                <div className="previous__tools">
                  {active.tools.map((tool, i) => (
                    <span key={i}>• {tool}</span>
                  ))}
                </div>

                <div className="previous__time">
                  <img src={clockIcon} alt="clock" />
                  <span>{active.duration}</span>
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
