import React, { useEffect, useMemo, useRef } from "react";
import "./Figma.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

export default function Figma() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  // ✅ GSAP은 "zoomContent"만 만진다 (중앙정렬은 wrapper가 담당)
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

  useEffect(() => {
    const section = sectionRef.current;

    let ctx = gsap.context(() => {
      const stage = stageRef.current;
      const zoom = zoomRef.current;
      const figma5 = figma5Ref.current;

      if (!stage || !zoom || !figma5 || !section) return;

      // ✅ 초기 상태: 3배 캔버스이므로 1/3로 축소해서 원래 보이는 크기 유지
      gsap.set(zoom, {
        transformOrigin: "center center",
        x: 0,
        y: 0,
        scale: 0.3333, // 1/3
      });

      // ✅ 중심 오프셋 계산 함수
      const getCenterOffset = () => {
        const currentScale = gsap.getProperty(zoom, "scale");
        const currentX = gsap.getProperty(zoom, "x");
        const currentY = gsap.getProperty(zoom, "y");

        // 계산용 리셋 (scale 1 = 3x resolution 상태)
        gsap.set(zoom, { scale: 1, x: 0, y: 0 });

        const zoomRect = zoom.getBoundingClientRect();
        const f5Rect = figma5.getBoundingClientRect();

        const zoomCenter = {
          x: zoomRect.left + zoomRect.width / 2,
          y: zoomRect.top + zoomRect.height / 2,
        };
        const f5Center = {
          x: f5Rect.left + f5Rect.width / 2,
          y: f5Rect.top + f5Rect.height / 2,
        };

        const dx = zoomCenter.x - f5Center.x;
        const dy = zoomCenter.y - f5Center.y;

        // 상태 복구
        gsap.set(zoom, { scale: currentScale, x: currentX, y: currentY });

        return { x: dx, y: dy };
      };

      let targetOffset = getCenterOffset();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3000",
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            targetOffset = getCenterOffset();
          },
        },
      });

      // Scale Factor Q = 3 (기존 scale 값 나누기 3)
      // 1) 첫 스크롤: 1.15 -> 0.3833
      tl.to(zoom, {
        scale: 0.3833,
        duration: 2,
        ease: "power2.inOut",
      });

      // 2) 중간: 2.5 -> 0.8333
      tl.to(
        zoom,
        {
          scale: 0.8333,
          duration: 1.5,
          ease: "power2.in",
        },
        ">"
      );

      // 3) 더 확대: 3.8 -> 1.2666
      tl.to(
        zoom,
        {
          scale: 1.2666,
          duration: 1.5,
          ease: "power2.in",
        },
        ">"
      );

      // 4) 마지막: 5.5 -> 1.8333 (figma5로 줌인 + 이동)
      tl.to(
        zoom,
        {
          scale: 1.8333,
          x: () => targetOffset.x * 1.8333,
          y: () => targetOffset.y * 1.8333,
          duration: 3,
          ease: "power2.out",
        },
        ">"
      );
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

      {/* full-bleed section */}
      <section ref={sectionRef} className="pinSection" aria-label="Zoom section">
        <div ref={stageRef} className="pinStage">
          <div className="pinCenter">
            {/* ✅ 중앙정렬 담당: GSAP이 transform 덮어써도 안 흔들림 */}
            <div className="zoomWrapper">
              {/* ✅ GSAP이 만지는 대상 */}
              <div ref={zoomRef} className="zoomContent">
                <img className="valueBase" src={valueImg} alt="" draggable="false" />

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
        </div>
      </section>

      <section className="afterSpace" aria-hidden="true" />
    </main>
  );
}
