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
import zoom01 from "../assets/zoom01.svg";
import mouse from "../assets/mouse.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Figma() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  // ✅ GSAP은 "zoomContent"만 만진다 (중앙정렬은 wrapper가 담당)
  const zoomRef = useRef(null);
  const figma5Ref = useRef(null);
  const cursorRef = useRef(null);

  // 커스텀 커서 제어용 상태
  const [showCursor, setShowCursor] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

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
          onLeave: () => {
            setShowCursor(false);
            document.body.style.cursor = "default";
          },
          onLeaveBack: () => {
            setShowCursor(false);
            document.body.style.cursor = "default";
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

      // 4) 마지막: 줌인 더욱 강화 (4배 확대하여 화면 꽉 채움)
      tl.to(
        zoom,
        {
          scale: 4,
          x: () => targetOffset.x * 4,
          y: () => targetOffset.y * 4,
          duration: 3,
          ease: "power2.inOut",
          onUpdate: function () {
            // 줌이 진행 중일 때는 무조건 커서 숨김
            setShowCursor(false);
            document.body.style.cursor = "default";
          }
        },
        ">"
      );

      // 5) 가로 스크롤 (오른쪽 zoom01 보이기)
      tl.to(
        zoom,
        {
          x: () => (targetOffset.x * 4) - (window.innerWidth * 2.5),
          duration: 4,
          ease: "none",
          onStart: () => {
            setShowCursor(true);
            document.body.style.cursor = "none";
          },
          onComplete: () => {
            setShowCursor(false);
            document.body.style.cursor = "default";
          },
          onReverseComplete: () => {
            setShowCursor(false);
            document.body.style.cursor = "default";
          },
          onReverseStart: () => {
            setShowCursor(true);
            document.body.style.cursor = "none";
          }
        },
        ">"
      );
    }, sectionRef);

    // 마우스 추적
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
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

      {/* 커스텀 커서 (가로 스크롤 영역에서만 활성화) */}
      <div
        ref={cursorRef}
        className={`figma-cursor ${showCursor ? 'is-visible' : ''}`}
        style={{
          left: mousePos.x,
          top: mousePos.y
        }}
      >
        <img src={mouse} alt="" />
      </div>

      {/* full-bleed section */}
      <section ref={sectionRef} className="pinSection" aria-label="Zoom section">
        <div ref={stageRef} className="pinStage">
          <div className="pinCenter">
            {/* ✅ 중앙정렬 담당: GSAP이 transform 덮어써도 안 흔들림 */}
            <div className="zoomWrapper">
              {/* ✅ GSAP이 만지는 대상 */}
              <div ref={zoomRef} className="zoomContent">
                <motion.img
                  className="valueBase"
                  src={valueImg}
                  alt=""
                  draggable="false"
                  initial={{ opacity: 0, y: 100, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />

                {overlays.map((o, idx) =>
                  o.isFigma5 ? (
                    <motion.img
                      key={o.id}
                      ref={figma5Ref}
                      className="overlayItem"
                      data-id={o.id}
                      src={o.src}
                      alt=""
                      draggable="false"
                      initial={{ opacity: 0, y: 80, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ type: "spring", stiffness: 120, damping: 10, delay: idx * 0.05 }}
                    />
                  ) : (
                    <motion.img
                      key={o.id}
                      className="overlayItem"
                      data-id={o.id}
                      src={o.src}
                      alt=""
                      draggable="false"
                      initial={{ opacity: 0, y: 80, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ type: "spring", stiffness: 120, damping: 10, delay: idx * 0.05 }}
                    />
                  )
                )}

                {/* ✅ 가로 스크롤 타겟: figma5 오른쪽에 위치 */}
                <img
                  className="zoom-artboard"
                  src={zoom01}
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="afterSpace" aria-hidden="true" />
    </main>
  );
}
