import React, { useEffect, useRef } from "react";
import "./Figma.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import zoom02 from "../assets/zoom02.svg";
import zoom03 from "../assets/zoom03.svg";
import zoom04 from "../assets/zoom04.svg";
import zoom05 from "../assets/zoom05.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Figma() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const commonTitle = "01. Immerse Myself in the Future";
  const commonDesc =
    "제가 배움을 멈추지 않는 이유는 미래를 향해 몰입하기 위해서에요.\n오늘의 배움이 내일의 저를 더욱 성장시켜준다고 믿는답니다.";

  const zoom03Title = "02. Learning Never Ends";
  const zoom03Desc =
    "디자인 툴은 결과가 아니라 더 나은 문제 해결을 위한 언어라고 생각해요.\n" +
    "변화 속에서 끊임없이 배우며 성장하는 디자이너가 되고 싶어요.";

  const zoom04Title = "03. Design with Purpose";
  const zoom04Desc =
    "사용자의 맥락과 감정을 이해하는 것에서 좋은 UX는 시작된다고 믿어요.\n" +
    "복잡함을 덜어내고, 꼭 필요한 경험만 남기고 싶어요";

  const zoom05Title = "04. Stay Curious, Stay Human";
  const zoom05Desc =
    "기술과 툴이 아무리 발전해도, 디자인의 출발점은 늘 사람의 감정과 경험이라고 믿어요.\n" +
    "그래서 저는 새로운 도구보다 먼저, 사용자를 이해하려는 태도를 잃지 않는 디자이너로 성장하고 싶어요";

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // 가로 스크롤 거리 계산
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerWidth * 1.5}`, // 더 줄여서 (1.5배) 스크롤이 더 빨리 끝나도록
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="figma-page">
      <section className="figma-hero" aria-label="My values and beliefs">
        <div className="figma-tag">Think</div>
        <h1 className="figma-title">
          My values and
          <br />
          beliefs
        </h1>
        <p className="figma-subtitle">저의 생각을 들여다보면 아래와 같아요.</p>
      </section>

      <section
        ref={sectionRef}
        className="pinSection"
        aria-label="Zoom section"
      >
        <div className="pinStage">
          <div className="viewport">
            <div ref={trackRef} className="sceneTrack sceneTrack4">
              <SlideScene img={zoom02} title={commonTitle} desc={commonDesc} />
              <SlideScene img={zoom03} title={zoom03Title} desc={zoom03Desc} />
              <SlideScene img={zoom04} title={zoom04Title} desc={zoom04Desc} />
              <SlideScene img={zoom05} title={zoom05Title} desc={zoom05Desc} />
            </div>
          </div>
        </div>
      </section>

      <section className="afterSpace" aria-hidden="true" />
    </main>
  );
}

function SlideScene({ img, title, desc }) {
  return (
    <div className="scene sceneSlide" aria-hidden="true">
      <div className="slideInner">
        <img className="slideImg" src={img} alt="" draggable="false" />
        <div className="slideText">
          <h3 className="slideTitle">{title}</h3>
          <p className="slideDesc">
            {desc.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
