import React, { useRef, useLayoutEffect } from "react";
import "./Feel.css";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
import feel02 from "../assets/feel02.png";
import feel03 from "../assets/feel03.svg";
import feel04 from "../assets/feel04.svg";

export default function Feel() {
  const heroRef = useRef(null);
  const greenStageRef = useRef(null);

  // HERO: 장식 등장(원위치 유지 + opacity/scale만)
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start 85%", "end 35%"],
  });

  // GREEN: sticky 구간 스크롤 진행도
  const { scrollYProgress: greenProg } = useScroll({
    target: greenStageRef,
    offset: ["start start", "end end"],
  });

  const springOpt = { stiffness: 260, damping: 16, mass: 0.7 };

  // ===== HERO deco (자리 고정) =====
  const decoOpacity = useSpring(
    useTransform(heroProg, [0.05, 0.25], [0, 1]),
    springOpt
  );
  const decoScale = useSpring(
    useTransform(heroProg, [0.05, 0.25], [0.88, 1]),
    springOpt
  );

  const starOpacity = useSpring(
    useTransform(heroProg, [0.0, 0.16], [0, 1]),
    springOpt
  );
  const starScale = useSpring(
    useTransform(heroProg, [0.0, 0.16], [0.6, 1]),
    springOpt
  );
  const starRot = useSpring(
    useTransform(heroProg, [0.0, 0.22], [-14, 0]),
    springOpt
  );

  // ===== GREEN 카드 (순차 애니메이션 로직) =====

  // 1. 초기 펼쳐짐 (0.0 - 0.2)
  // 2. 최상단 카드부터 위로 날아감 (0.2 - 0.45, 0.45 - 0.7, 0.7 - 0.95)

  // 최상단 카드 (Thought 01)
  const topCardY = useSpring(
    useTransform(greenProg, [0, 0.2, 0.25, 0.5], [110, 70, 70, -1000]),
    springOpt
  );
  const topCardRot = useSpring(
    useTransform(greenProg, [0.25, 0.5], [0, -15]),
    springOpt
  );

  // 세 번째 레이어 (White)
  const whiteY = useSpring(
    useTransform(greenProg, [0, 0.2, 0.5, 0.75], [95, 35, 35, -1000]),
    springOpt
  );
  const whiteRot = useSpring(
    useTransform(greenProg, [0, 0.2, 0.5, 0.75], [-4, 0, 0, 12]),
    springOpt
  );

  // 두 번째 레이어 (Pink)
  const pinkY = useSpring(
    useTransform(greenProg, [0, 0.2, 0.75, 1.0], [85, 0, 0, -1000]),
    springOpt
  );
  const pinkRot = useSpring(
    useTransform(greenProg, [0, 0.2, 0.75, 1.0], [8, 2, 2, -10]),
    springOpt
  );

  // 첫 번째 레이어 (Yellow) - 마지막에 남거나 약간만 틀어짐
  const yellowY = useSpring(
    useTransform(greenProg, [0, 0.2, 0.9, 1.0], [70, -30, -30, -1000]),
    springOpt
  );
  const yellowRot = useSpring(
    useTransform(greenProg, [0.9, 1.0], [-3, 10]),
    springOpt
  );

  const stackOpacity = useSpring(
    useTransform(greenProg, [0.0, 0.1], [0, 1]),
    springOpt
  );


  // GSAP Pinning: 배경 고정
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: greenStageRef.current,
        start: "top -250px", // 700px(top) - 250px(offset) = 450px(중앙) 시점에 고정
        end: "bottom bottom",
        pin: ".feel-green-sticky",
        pinSpacing: true,
        invalidateOnRefresh: true,
      });
    }, greenStageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="feel-page">
      <section className="feel-hero" ref={heroRef}>
        {/* 장식 (원래 좌표 유지하되 서서히 등장) */}
        <motion.img
          className="feel-deco blue-ver2"
          src={blueVer2}
          alt=""
          initial={{ opacity: 0, y: 70, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco white-cloud-small"
          src={whiteCloudSmall}
          alt=""
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco star"
          src={star}
          alt=""
          initial={{ opacity: 0, scale: 0.4, rotate: -30, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 150, damping: 8, delay: 0.3 }}
          style={{ opacity: starOpacity, scale: starScale, rotate: starRot }}
        />
        <motion.img
          className="feel-deco blue-small-cloud"
          src={blueSmallCloud}
          alt=""
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 90, damping: 11, delay: 0.4 }}
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco yellow"
          src={yellow}
          alt=""
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 130, damping: 9, delay: 0.5 }}
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco white-cloud"
          src={whiteCloud}
          alt=""
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.6 }}
          style={{ opacity: decoOpacity, scale: decoScale }}
        />
        <motion.img
          className="feel-deco big-cloud"
          src={bigCloud}
          alt=""
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.7 }}
          style={{ opacity: decoOpacity, scale: decoScale }}
        />

        {/* 중앙 콘텐츠 */}
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

      {/* GREEN */}
      <section className="feel-green">
        {/* stage: 스크롤 길이 */}
        <div className="feel-green-stage" ref={greenStageRef}>
          {/* sticky: 배경(곡선 포함) + overlay 고정 */}
          <div className="feel-green-sticky">
            {/* ✅ bgGreen.svg를 흐름대로 보여줘서 투명(파인) 영역이 살아남음 */}
            <img className="feel-green-scene" src={bgGreen} alt="" />
            {/* ✅ 화면 아래 남는 영역을 초록으로 채워서 “하얀 잘림” 방지 */}
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

              {/* 카드 스택 */}
              <motion.div className="feel-cardStack" style={{ opacity: stackOpacity }}>
                <motion.div
                  className="feel-stack-layer"
                  style={{ y: yellowY, rotate: yellowRot }}
                >
                  <Thought
                    number="(03)"
                    bgColor="#FFC92F"
                    imageSrc={feel03}
                    title="Beyond the Class"
                    subtitle="스스로 질문하며 확장한 UX 공부"
                    text={
                      <>
                        수업에서 생긴 궁금증을 책으로 파고들며,
                        <br />
                        UI/UX는 감각이 아니라 근거를 쌓아가는 사고 과정이라는
                        <br />
                        걸 느꼈어요!
                      </>
                    }
                  />
                </motion.div>
                <motion.div
                  className="feel-stack-layer"
                  style={{ y: pinkY, rotate: pinkRot }}
                >
                  <Thought
                    number="(02)"
                    bgColor="#FF719E"
                    imageSrc={feel02}
                    title="Growing as a Team"
                    subtitle="함께 만들고, 함께 웃었던 과정"
                    text={
                      <>
                        의견이 달라도 존중하며 맞춰가는 과정 속에서,
                        <br />
                        좋은 결과는 사람 사이의 신뢰에서 나온다는 걸 배웠어요!
                      </>
                    }
                  />
                </motion.div>
                <motion.div
                  className="feel-stack-layer"
                  style={{ y: whiteY, rotate: whiteRot }}
                >
                  <Thought
                    number="(02)"
                    bgColor="#FFFFFF"
                    textColor="#111111"
                    imageSrc={feel04}
                    title="Putting Heads Together"
                    subtitle="과정 속에서 완성된 협업"
                    text={
                      <>
                        각자의 생각이 부딪히고 정리되는 과정을 반복하며,
                        <br />
                        UX는 아이디어보다 조율의 시간에서 만들어진다는 걸
                        <br />
                        체감했어요!
                      </>
                    }
                  />
                </motion.div>

                <motion.div className="feel-stack-top" style={{ y: topCardY, rotate: topCardRot }}>
                  <Thought
                    number="(01)"
                    bgColor="#4EA7FF"
                    imageSrc={thought01}
                    title={
                      <>
                        I Wanna Be <em>Where</em> the
                      </>
                    }
                    text={
                      <>
                        팀프로젝트의 발표 과정에서,
                        <br />
                        좋은 기획은 이해시키는 전달력까지 완성되어야
                        <br />
                        한다는 걸 배웠어요!
                      </>
                    }
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
