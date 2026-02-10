import React from "react";
import "./WhyDoYouNeedMe.css";

import Button from "../components/Button";

import BounceBlue from "../assets/bounce-blue.mp4";
import PinkFlower from "../assets/pink-flower.svg";
import PurpleFlower from "../assets/purple-flower.svg";
import OrangeFlower from "../assets/orange-flower.svg";
import Bug from "../assets/bug.svg";
import Bee from "../assets/bee.svg";
import BeeLine from "../assets/bee-line.svg";

export default function WhyDoYouNeedMe() {
  return (
    <div className="why-page">
      <section className="why-hero" aria-label="Why do you need me section">
        {/* ✅ 데코: 화면 전체 기준 */}
        <div className="why-deco" aria-hidden="true">
          <div className="why-blue">
            <video
              className="why-blue-video"
              src={BounceBlue}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <img
            className="why-flower why-flower-purple"
            src={PurpleFlower}
            alt=""
          />
          <img className="why-flower why-flower-pink" src={PinkFlower} alt="" />
          <img
            className="why-flower why-flower-orange"
            src={OrangeFlower}
            alt=""
          />

          <img className="why-bug" src={Bug} alt="" />

          <img className="why-bee-line" src={BeeLine} alt="" />
          <img className="why-bee" src={Bee} alt="" />
        </div>

        {/* ✅ 텍스트: 가운데 컨텐츠 폭 유지 */}
        <div className="why-hero-inner">
          <div className="why-hero-content">
            <div className="why-q-badge" aria-hidden="true">
              Q2
            </div>

            <p className="why-kor-title">
              기업은 내가 왜 <span className="why-highlight">필요</span>할까?
            </p>

            <h1 className="why-title">
              <span className="why-title-line">
                I <em className="why-em">don't</em>
                <span className="why-space">hesitate</span>
              </span>
              <span className="why-title-line">
                to <span className="why-grow">Grow</span>
              </span>
            </h1>

            <div className="why-a-row">
              <div className="why-a-badge" aria-hidden="true">
                A2
              </div>
              <p className="why-desc">
                늘 배우는 태도를 바탕으로, 팀이 필요로 하는 방향으로
                <br />
                빠르게 성장할 수 있는 디자이너예요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
