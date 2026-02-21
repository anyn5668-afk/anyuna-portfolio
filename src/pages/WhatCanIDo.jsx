import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./WhatCanIDo.css";

import SectionTitle from "../components/SectionTitle";
import Top from "../components/Top";
import Skill from "../components/Skill";
import Knowledge from "../components/Knowledge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

import sun from "../assets/sun.svg";
import cloudGreen from "../assets/cloud-green.svg";
import blueChar from "../assets/blue.svg";
import greenChar from "../assets/green.svg";

/* ✅ 카드별 아이콘 자리(파일명은 실제 assets에 맞게 바꿔줘) */
import photoshopIcon from "../assets/photoshop.svg";
import javaIcon from "../assets/java.svg";
import aftereffectIcon from "../assets/afftereffect.svg";
import illustratorIcon from "../assets/illustrator.svg";
import figmaIcon from "../assets/fi.svg";
import indesignIcon from "../assets/indesign.svg";
import reactIcon from "../assets/react.svg";
import jqueryIcon from "../assets/jQuery.svg";

import target from "../assets/target.svg";
import brain from "../assets/brain.svg";
import paper from "../assets/paper.svg";
import smile from "../assets/smile.svg";
import connect from "../assets/connect.svg";

const WhatCanIDo = React.forwardRef((props, skillSectionRef) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const targets = root.querySelectorAll(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // 화면에서 벗어나면 클래스 제거하여 다음 진입 시 재실행
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-20px 0px", // 경계에서 20px 안쪽으로 들어와야 트리거
      },
    );

    targets.forEach((el, idx) => {
      // ✅ 순차 딜레이 (원하면 숫자 조절)
      el.style.animationDelay = `${idx * 70}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const horizontalSectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = horizontalSectionRef.current;
      if (!track || !section) return;

      const totalWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const travelDistance = totalWidth - windowWidth + 200; // 마지막 카드 뒤 200px 여유 공간

      gsap.to(track, {
        x: () => `-${travelDistance}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth - windowWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, horizontalSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="wcWrap"
      aria-label="What Can I Do Section"
    >
      {/* 좌측 하단 햇님 */}
      <img
        className="wcSun reveal reveal--char"
        src={sun}
        alt=""
        aria-hidden="true"
      />

      {/* 우측 상단 구름+초록 캐릭터 */}
      <img
        className="wcCloudGreen reveal reveal--char"
        src={cloudGreen}
        alt=""
        aria-hidden="true"
      />

      {/* 중앙 타이틀 컴포넌트 */}
      <div className="wcCenter">
        <SectionTitle
          topBadge="Q1"
          question="나는 무엇을 할 수 있을까?"
          highlight="무엇"
          titleTop="Introduction to"
          titleBottomLeft="my"
          titleBottomRight="abilities"
          bottomBadge="A1"
          description={
            "UI/UX 디자이너가 되기 위해 UX의 대한 지식을 익히고\n다양한 툴을 익히며 저의 능력을 키워가고 있어요!"
          }
        />
      </div>

      {/* skill & knowledge 섹션 */}
      <section
        ref={skillSectionRef}
        className="skSection"
        aria-label="Skill & knowledge"
      >
        <div className="skill-top">
          <Top
            caption="Study"
            title="skill"
            text={
              "UI/UX를 이해하기 위해 공부하고 적용해온\n 내용을 정리했습니다."
            }
          />
        </div>

        <div className="skBoard">
          <div className="skGrid">
            {/* 1행 */}
            {/* ✅ 캐릭터도 애니메이션 먹게 */}
            <div
              className="skBlueCell skAreaBlue reveal reveal--char"
              aria-hidden="true"
            >
              <img className="skBlue" src={blueChar} alt="" />
            </div>

            <div className="skCell skAreaPs reveal">
              <Skill
                title="Photoshop"
                percent="70%"
                img={photoshopIcon}
                percentColor="#2093FF"
              />
            </div>

            <div className="skCell skAreaJs reveal">
              <Skill
                title="Javascript"
                percent="40%"
                img={javaIcon}
                percentColor="#FFCC3B"
              />
            </div>

            <div className="skCell skAreaAe reveal">
              <Skill
                title="After Effect"
                percent="60%"
                img={aftereffectIcon}
                percentColor="#BD68EE"
              />
            </div>

            {/* 2행 */}
            <div className="skCell skAreaAi reveal">
              <Skill
                title="Illustrator"
                percent="100%"
                img={illustratorIcon}
                percentColor="#FF719E"
              />
            </div>

            <div
              className="skCenterText skAreaCenter reveal"
              aria-label="My skill Program"
            >
              <div className="skCenterTextInner">
                My <span className="skSkill">skill</span>.<br />
                Tools.
              </div>
            </div>

            <div className="skCell skAreaFi reveal">
              <Skill
                title="Figma"
                percent="100%"
                img={figmaIcon}
                percentColor="#ffffff"
              />
            </div>

            {/* 3행 */}
            <div className="skCell skAreaId reveal">
              <Skill
                title="Indesign"
                percent="80%"
                img={indesignIcon}
                percentColor="#FF4040"
              />
            </div>

            <div className="skCell skAreaRa reveal">
              <Skill
                title="React"
                percent="40%"
                img={reactIcon}
                percentColor="#60D0C7"
              />
            </div>

            <div className="skCell skAreaJq reveal">
              <Skill
                title="jQuery"
                percent="40%"
                img={jqueryIcon}
                percentColor="#25B544"
              />
            </div>

            {/* ✅ 캐릭터도 애니메이션 먹게 */}
            <div
              className="skGreenCell skAreaGreen reveal reveal--char"
              aria-hidden="true"
            >
              <img className="skGreen" src={greenChar} alt="" />
            </div>
          </div>
        </div>

        {/* ✅ 가로 스크롤 섹션 */}
        <div className="sk-horizontal-section" ref={horizontalSectionRef}>
          <div className="sk-horizontal-track" ref={trackRef}>
            <div className="knowledge-title">
              <h2>
                My <em>knowledge</em> <br />
                Of UI/UX.
              </h2>
            </div>

            <div className="card-box">
              <Knowledge
                imgSrc={target}
                title="핵심은 문제 정의부터"
                text="UX는 기능을 추가하는 일이 아닌, 사용자가 겪는 문제를 정확히 정의하는 것에서 시작됩니다."
              />
              <Knowledge
                imgSrc={brain}
                title="생각하게 하지마!"
                text="좋은 UI는 설명하지 않습니다. 사용자가 생각하지 않아도 행동할 수 있게 만듭니다."
              />
              <Knowledge
                imgSrc={paper}
                title="우선순위가 뭘까?"
                text="사용자에게  중요한 것부터 보이도록 구조를 설계하는 것이 UX입니다."
              />
              <Knowledge
                imgSrc={smile}
                title="사용자를 위한 공감왕!"
                text="사용자의 행동보다 그 행동이 나온 감정과 상황에 집중합니다."
              />
              <Knowledge
                imgSrc={connect}
                title="흐름은 부드럽게"
                text="좋은 인터랙션은 사용자의 흐름을 방해하지 않고 자연스럽게 이어줍니다."
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
});

export default WhatCanIDo;
