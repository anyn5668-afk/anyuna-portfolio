import React from "react";
import "./Feel.css";

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

export default function Feel() {
  return (
    <main className="feel-page">
      <section className="feel-hero">
        {/* 장식 */}
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

        {/* 타이틀 박스 아래로 664px 떨어진 지점 확보 */}
        <div className="feel-spacer" />
      </section>

      {/* ✅ GREEN SECTION + 요청한 레이아웃 추가 */}
      <section className="feel-green">
        {/* bg-green.svg 자체를 "장면"으로 그대로 보여줌 */}
        <img className="feel-green-scene" src={bgGreen} alt="" />

        {/* svg 아래로 초록이 더 이어져야 하면 filler로 연장 */}
        <div className="feel-green-fill" />

        {/* ✅ 오버레이 레이아웃(Scroll + 텍스트 + 카드스택) */}
        <div className="feel-green-overlay">
          {/* Scroll pill */}
          <div className="feel-scroll">
            Scroll <span className="feel-scroll-arrow">↓</span>
          </div>

          {/* 좌측 타이포 */}
          <div className="feel-green-leftText">
            What I
            <br />
            learned
          </div>

          {/* 우측 타이포 */}
          <div className="feel-green-rightText">
            from the
            <br />
            <span className="feel-green-italic">process</span>
          </div>

          {/* 가운데 카드 스택 */}
          <div className="feel-cardStack">
            {/* 뒤에 겹치는 컬러 카드(이미지 없이 div로 구현) */}
            <div className="feel-stack-layer layer-yellow" />
            <div className="feel-stack-layer layer-pink" />
            <div className="feel-stack-layer layer-white" />

            {/* 맨 위 Thought 카드 */}
            <div className="feel-stack-top">
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
      </section>
    </main>
  );
}
