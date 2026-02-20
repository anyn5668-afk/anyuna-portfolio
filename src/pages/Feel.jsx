import React, { useRef, useLayoutEffect } from "react";
import "./Feel.css";
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

import Thought from "../components/Thought";
import thought01 from "../assets/thought01.png";
import feel02 from "../assets/feel02.png";
import feel03 from "../assets/feel03.svg";
import feel04 from "../assets/feel04.svg";

export default function Feel() {
  const greenStageRef = useRef(null);

  // GSAP Pinning & Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: greenStageRef.current,
          start: "top top", // 섹션 상단이 화면 상단에 닿을 때
          end: "+=3000", // 스크롤 길이 (애니메이션 지속 시간)
          pin: true, // 트리거 요소 자체를 고정 (더 안정적)
          scrub: 1, // 스크롤과 동기화 (부드럽게)
          pinSpacing: true, // 고정된 동안 공간 차지
          invalidateOnRefresh: true,
        },
      });

      // 카드 애니메이션 시퀀스 (하나씩 위로 날아가기)
      // card-1 (Top) -> card-2 -> card-3 -> card-4 (Bottom)
      tl.to(".card-1", {
        y: -1000,
        rotation: -20,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      })
        .to(
          ".card-2",
          {
            y: -1000,
            rotation: 10,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          "-=0.2", // 살짝 겹쳐서 시작
        )
        .to(
          ".card-3",
          {
            y: -1000,
            rotation: -15,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          "-=0.2",
        )
        .to(
          ".card-4",
          {
            y: -1000,
            rotation: 5,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          "-=0.2",
        );
    }, greenStageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="feel-page">
      {/* ================= HERO ================= */}
      <section className="feel-hero">
        {/* 장식 : 애니메이션 전부 제거 */}
        <img className="feel-deco blue-ver2" src={blueVer2} alt="" />
        <img
          className="feel-deco white-cloud-small"
          src={whiteCloudSmall}
          alt=""
        />
        <img className="feel-deco star" src={star} alt="" />
        <img
          className="feel-deco blue-small-cloud"
          src={blueSmallCloud}
          alt=""
        />
        <img className="feel-deco yellow" src={yellow} alt="" />
        <img className="feel-deco white-cloud" src={whiteCloud} alt="" />
        <img className="feel-deco big-cloud" src={bigCloud} alt="" />

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

      {/* ================= GREEN ================= */}
      <section className="feel-green">
        <div className="feel-green-stage" ref={greenStageRef}>
          <div className="feel-green-sticky">
            {/* 배경 이미지 제거됨, CSS bg-color로 대체 */}
            <div className="feel-green-fill" />

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

              {/* 카드 스택 (애니메이션 제거, 정적인 배치) */}
              <div className="feel-cardStack">
                <div className="feel-stack-layer card-4">
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
                        <br />걸 느꼈어요!
                      </>
                    }
                  />
                </div>

                <div className="feel-stack-layer card-3">
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
                </div>

                <div className="feel-stack-layer card-2">
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
                </div>

                <div className="feel-stack-top card-1">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
