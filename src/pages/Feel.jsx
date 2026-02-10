import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Feel.css";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import bigCloud from "../assets/big-cloud.svg";
import blueVer2 from "../assets/blue-ver2.svg";
import yellow from "../assets/yellow.svg";
import whiteCloudSmall from "../assets/white-cloud-small.svg";
import blueSmallCloud from "../assets/blue-small-cloud.svg";
import star from "../assets/star.svg";
import whiteCloud from "../assets/white-cloud.svg";
import bgGreen from "../assets/bg-green.svg";

import Thought from "../components/Thought";
import thought01 from "../assets/thought01.png";
// import thought02 from "../assets/thought02.png";
// import thought03 from "../assets/thought03.png";

function ScrollFlipCard({
  progress,
  index,
  total,
  behindPose,
  springOpt,
  children,
}) {
  const step = 1 / total;

  const segStart = index * step;
  const segIn = segStart + step * 0.22;
  const segHold = segStart + step * 0.62;
  const segToss = segStart + step * 0.82;
  const segEnd = (index + 1) * step;

  const startY = index === 0 ? 0 : behindPose.y;
  const startR = index === 0 ? 0 : behindPose.rotate;
  const startS = index === 0 ? 1 : behindPose.scale;

  // 중앙 -> 위로 넘어가기(삐뚤)
  const yRaw = useTransform(
    progress,
    [segStart, segIn, segHold, segToss, segEnd],
    [startY, 0, 0, -520, -740],
  );
  const xRaw = useTransform(
    progress,
    [segStart, segHold, segToss, segEnd],
    [0, 0, -180, -240],
  );
  const rRaw = useTransform(
    progress,
    [segStart, segIn, segHold, segToss, segEnd],
    [startR, 0, 0, -18, -28],
  );
  const sRaw = useTransform(
    progress,
    [segStart, segIn, segHold, segToss, segEnd],
    [startS, 1, 1, 0.98, 0.94],
  );
  const oRaw = useTransform(progress, [segHold, segToss, segEnd], [1, 0.22, 0]);

  const x = useSpring(xRaw, springOpt);
  const y = useSpring(yRaw, springOpt);
  const rotate = useSpring(rRaw, springOpt);
  const scale = useSpring(sRaw, springOpt);
  const opacity = useSpring(oRaw, springOpt);

  const zIndex = total - index + 40;

  return (
    <motion.div
      className="feel-thoughtCard"
      style={{ x, y, rotate, scale, opacity, zIndex }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ✅ 스티키 대신 "핀" 구현
 * pinned 상태는 Portal로 body에 붙여서
 * 어떤 부모 transform/overflow에도 안 잘리게 함.
 */
function usePin(stageRef) {
  const [mode, setMode] = useState("before"); // before | pinned | after
  const [afterTop, setAfterTop] = useState(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const start = rect.top;
      const end = rect.bottom - window.innerHeight;

      if (start > 0) {
        setMode("before");
        setAfterTop(0);
        return;
      }

      if (end < 0) {
        setMode("after");
        const top = el.offsetHeight - window.innerHeight;
        setAfterTop(top < 0 ? 0 : top);
        return;
      }

      setMode("pinned");
      setAfterTop(0);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stageRef]);

  return { mode, afterTop };
}

function GreenPinnedScene({ greenProg, cards, behindPoses, springOpt }) {
  const total = Math.max(1, cards.length);

  return (
    <div className="feel-green-pinInner">
      {/* 배경 */}
      <img className="feel-green-scene" src={bgGreen} alt="" />
      <div className="feel-green-fill" />

      {/* overlay */}
      <div className="feel-green-overlay">
        <div className="feel-scroll">
          Scroll <span className="feel-scroll-arrow">↓</span>
        </div>

        <div className="feel-green-leftText">
          What I
          <br />
          learned
        </div>

        <div className="feel-green-rightText">
          from the
          <br />
          <span className="feel-green-italic">process</span>
        </div>

        <div className="feel-cardStack">
          {/* 뒤 컬러 카드 (모양 유지) */}
          <div className="feel-stack-layer layer-yellow" />
          <div className="feel-stack-layer layer-pink" />
          <div className="feel-stack-layer layer-white" />

          {/* 카드 넘김 */}
          {cards.map((c, idx) => (
            <ScrollFlipCard
              key={c.number}
              progress={greenProg}
              index={idx}
              total={total}
              behindPose={behindPoses[idx]}
              springOpt={springOpt}
            >
              <Thought
                number={c.number}
                bgColor={c.bgColor}
                imageSrc={c.imageSrc}
                title={c.title}
                text={c.text}
              />
            </ScrollFlipCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Feel() {
  const heroRef = useRef(null);
  const greenStageRef = useRef(null);

  const { mode, afterTop } = usePin(greenStageRef);

  // HERO
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start 85%", "end 35%"],
  });

  // GREEN 진행도
  const { scrollYProgress: greenProg } = useScroll({
    target: greenStageRef,
    offset: ["start start", "end end"],
  });

  const springOpt = { stiffness: 280, damping: 18, mass: 0.7 };

  // HERO deco
  const decoOpacity = useSpring(
    useTransform(heroProg, [0.05, 0.25], [0, 1]),
    springOpt,
  );
  const decoScale = useSpring(
    useTransform(heroProg, [0.05, 0.25], [0.88, 1]),
    springOpt,
  );
  const starOpacity = useSpring(
    useTransform(heroProg, [0.0, 0.16], [0, 1]),
    springOpt,
  );
  const starScale = useSpring(
    useTransform(heroProg, [0.0, 0.16], [0.6, 1]),
    springOpt,
  );
  const starRot = useSpring(
    useTransform(heroProg, [0.0, 0.22], [-14, 0]),
    springOpt,
  );

  // 카드 데이터
  const cards = [
    {
      number: "(01)",
      bgColor: "#4EA7FF",
      imageSrc: thought01,
      title: (
        <>
          I Wanna Be <em>Where</em> the
        </>
      ),
      text: (
        <>
          팀프로젝트의 발표 과정에서,
          <br />
          좋은 기획은 이해시키는 전달력까지 완성되어야
          <br />
          한다는 걸 배웠어요!
        </>
      ),
    },
    // (02)(03) 추가해도 자동으로 됨
  ];

  const total = Math.max(1, cards.length);

  // “살짝씩 틀어진 모양” (뒤에 대기할 때)
  const behindPoses = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      if (i === 0) return { y: 0, rotate: 0, scale: 1 };
      const depth = i / Math.max(1, total - 1);
      const wobble = (i % 2 === 0 ? -1 : 1) * (6 - depth * 2);
      return {
        y: 36 + depth * 16,
        rotate: wobble,
        scale: 0.985 - depth * 0.02,
      };
    });
  }, [total]);

  // stage 길이
  const stageStyle = { ["--cards"]: total };

  // ✅ pinned일 때는 body에 포탈로 붙임(무조건 viewport 고정)
  const pinnedPortal =
    mode === "pinned"
      ? ReactDOM.createPortal(
          <div className="feel-green-pinPortal">
            <GreenPinnedScene
              greenProg={greenProg}
              cards={cards}
              behindPoses={behindPoses}
              springOpt={springOpt}
            />
          </div>,
          document.body,
        )
      : null;

  return (
    <main className="feel-page">
      <section className="feel-hero" ref={heroRef}>
        <motion.img
          className="feel-deco blue-ver2"
          src={blueVer2}
          alt=""
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco white-cloud-small"
          src={whiteCloudSmall}
          alt=""
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco star"
          src={star}
          alt=""
          style={{ opacity: starOpacity, scale: starScale, rotate: starRot }}
        />
        <motion.img
          className="feel-deco blue-small-cloud"
          src={blueSmallCloud}
          alt=""
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco yellow"
          src={yellow}
          alt=""
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco white-cloud"
          src={whiteCloud}
          alt=""
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco big-cloud"
          src={bigCloud}
          alt=""
          style={{ opacity: decoOpacity, scale: decoScale }}
        />

        <div className="feel-content">
          <div className="feel-caption">Thoughts</div>
          <h1 className="feel-title">
            What I felt <em>during</em>
            <br />
            the process!
          </h1>
          <p className="feel-subtext">
            프로젝트 과정에서 <em>느낀점</em>이 있어요!
          </p>
        </div>

        <div className="feel-spacer" />
      </section>

      <section className="feel-green">
        <div
          className="feel-green-stage"
          ref={greenStageRef}
          style={stageStyle}
        >
          {/* before/after일 때는 stage 안에 렌더(absolute) */}
          {mode !== "pinned" && (
            <div
              className="feel-green-pinLocal"
              style={mode === "after" ? { top: `${afterTop}px` } : undefined}
            >
              <GreenPinnedScene
                greenProg={greenProg}
                cards={cards}
                behindPoses={behindPoses}
                springOpt={springOpt}
              />
            </div>
          )}

          {/* pinned일 때는 body portal로 렌더 */}
          {pinnedPortal}
        </div>
      </section>
    </main>
  );
}
