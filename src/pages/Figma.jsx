import React, { useEffect, useMemo, useRef } from "react";
import "./Figma.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import valueImg from "../assets/value.svg";

import figma1 from "../assets/figma1.svg";
import figma2 from "../assets/figma2.svg";
import figma3 from "../assets/figma3.svg";
import figma4 from "../assets/figma4.svg";
import figma5Scroll from "../assets/figma5-scroll.svg";
import figma6 from "../assets/figma6.svg";
import figma7 from "../assets/figma7.svg";
import figma8 from "../assets/figma8.svg";
import figma9 from "../assets/figma9.svg";

import zoom02 from "../assets/zoom02.svg";
import zoom03 from "../assets/zoom03.svg";
import zoom04 from "../assets/zoom04.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Figma() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const zoomRef = useRef(null);
  const figma5Ref = useRef(null);

  const overlays = useMemo(
    () => [
      { id: "figma1", src: figma1 },
      { id: "figma2", src: figma2 },
      { id: "figma3", src: figma3 },
      { id: "figma4", src: figma4 },
      { id: "figma5", src: figma5Scroll, isFigma5: true },
      { id: "figma6", src: figma6 },
      { id: "figma7", src: figma7 },
      { id: "figma8", src: figma8 },
      { id: "figma9", src: figma9 },
    ],
    []
  );

  const commonTitle = "01. Immerse Myself in the Future";
  const commonDesc =
    "제가 배움을 멈추지 않는 이유는 미래를 향해 몰입하기 위해서에요.\n오늘의 배움이 내일의 판단을 더 단단하게 만든다고 믿는답니다.";

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const zoom = zoomRef.current;
    const figma5 = figma5Ref.current;

    if (!section || !track || !zoom || !figma5) return;

    const ctx = gsap.context(() => {
      // 초기값
      gsap.set(track, { xPercent: 0 });
      gsap.set(zoom, {
        transformOrigin: "center center",
        scale: 0.3333,
        x: 0,
        y: 0,
      });

      const getCenterOffset = () => {
        const s = gsap.getProperty(zoom, "scale");
        const x = gsap.getProperty(zoom, "x");
        const y = gsap.getProperty(zoom, "y");
        const t = gsap.getProperty(track, "xPercent");

        gsap.set(track, { xPercent: 0 });
        gsap.set(zoom, { scale: 1, x: 0, y: 0 });

        const zoomRect = zoom.getBoundingClientRect();
        const f5Rect = figma5.getBoundingClientRect();

        const dx = zoomRect.left + zoomRect.width / 2 - (f5Rect.left + f5Rect.width / 2);
        const dy = zoomRect.top + zoomRect.height / 2 - (f5Rect.top + f5Rect.height / 2);

        gsap.set(zoom, { scale: s, x, y });
        gsap.set(track, { xPercent: t });

        return { x: dx, y: dy };
      };

      let targetOffset = getCenterOffset();

      // ✅ end를 “장면 수 기반으로 자동 길게” 계산
      // - 4장(0,1,2,3) 패닝 = 3번 이동
      // - 각 이동당 스크롤 길이를 넉넉히 2400px로 잡음(체감 느리게)
      const PAN_SEGMENT = 2400;
      const ZOOM_SEGMENT = 2600;
      const HOLD_SEGMENT = 800;
      const TOTAL_END = ZOOM_SEGMENT + HOLD_SEGMENT + PAN_SEGMENT * 3;

      const FINAL_SCALE = 2.55;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${TOTAL_END}`,
          pin: true,            // ✅ stage가 아니라 섹션 자체를 핀(안정)
          scrub: 1.0,           // ✅ 부드럽게
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
          onRefresh: () => {
            targetOffset = getCenterOffset();
          },
        },
      });

      // 줌
      tl.to(zoom, { scale: 0.3833, duration: 2.2, ease: "power2.inOut" });
      tl.to(zoom, { scale: 0.8333, duration: 2.0, ease: "power2.inOut" }, ">");
      tl.to(zoom, { scale: 1.2666, duration: 2.0, ease: "power2.inOut" }, ">");
      tl.to(
        zoom,
        {
          scale: FINAL_SCALE,
          x: () => targetOffset.x * FINAL_SCALE,
          y: () => targetOffset.y * FINAL_SCALE,
          duration: 3.0,
          ease: "power2.inOut",
        },
        ">"
      );

      // 홀드(줌 끝나기 전에 내려가는 느낌 방지)
      tl.to({}, { duration: 1.0 });

      // 패닝 3번 (4장)
      tl.to(track, { xPercent: -100, duration: 4.0, ease: "power1.inOut" }, ">");
      tl.to(track, { xPercent: -200, duration: 4.0, ease: "power1.inOut" }, ">");
      tl.to(track, { xPercent: -300, duration: 4.0, ease: "power1.inOut" }, ">");

      // refresh 안정화
      ScrollTrigger.refresh();
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

      {/* ✅ 여기 섹션 자체가 pin 됨 */}
      <section ref={sectionRef} className="pinSection" aria-label="Zoom section">
        <div className="pinStage">
          <div className="viewport">
            <div ref={trackRef} className="sceneTrack sceneTrack4">
              {/* SCENE 0 (줌 보드) */}
              <div className="scene scene1">
                <div className="zoomWrapper">
                  <div ref={zoomRef} className="zoomContent">
                    <motion.img className="valueBase" src={valueImg} alt="" draggable="false" />
                    {overlays.map((o) =>
                      o.isFigma5 ? (
                        <img
                          key={o.id}
                          ref={figma5Ref}
                          className="overlayItem"
                          data-id={o.id}
                          src={o.src}
                          alt=""
                          draggable="false"
                        />
                      ) : (
                        <img
                          key={o.id}
                          className="overlayItem"
                          data-id={o.id}
                          src={o.src}
                          alt=""
                          draggable="false"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* SCENE 1 (zoom02) */}
              <SlideScene img={zoom02} title={commonTitle} desc={commonDesc} />

              {/* SCENE 2 (zoom03) */}
              <SlideScene img={zoom03} title={commonTitle} desc={commonDesc} />

              {/* SCENE 3 (zoom04) */}
              <SlideScene img={zoom04} title={commonTitle} desc={commonDesc} />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ 가로 다 끝난 후에만 아래로 내려오게 됨 */}
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
