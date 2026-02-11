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

import BlueChar from "../assets/blue.svg";
import { motion } from "framer-motion";

export default function WhyDoYouNeedMe() {
  // 꽃들의 "징그르르" 애니메이션 설정
  const flowerAnim = (duration, range) => ({
    animate: {
      rotate: [0, range, -range, 0],
    },
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  return (
    <div className="why-page">
      <section className="why-hero" aria-label="Why do you need me section">
        {/* ✅ 데코: 화면 전체 기준 */}
        <div className="why-deco" aria-hidden="true">
          <div className="why-blue">
            <motion.img
              className="why-blue-img"
              src={BlueChar}
              alt=""
              style={{ width: "100%", height: "auto" }}
              initial={{ opacity: 0, y: 60, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.05 }}
            />
          </div>

          <div className="why-flower why-flower-purple">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
            >
              <motion.img
                src={PurpleFlower}
                alt=""
                style={{ width: "100%", height: "auto" }}
                {...flowerAnim(2.5, 15)}
              />
            </motion.div>
          </div>

          <div className="why-flower why-flower-pink">
            <motion.div
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 130, damping: 9, delay: 0.15 }}
            >
              <motion.img
                src={PinkFlower}
                alt=""
                style={{ width: "100%", height: "auto" }}
                {...flowerAnim(3, -18)}
              />
            </motion.div>
          </div>

          <div className="why-flower why-flower-orange">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 140, damping: 8, delay: 0.1 }}
            >
              <motion.img
                src={OrangeFlower}
                alt=""
                style={{ width: "100%", height: "auto" }}
                {...flowerAnim(2.2, 12)}
              />
            </motion.div>
          </div>

          <motion.img
            className="why-bug"
            src={Bug}
            alt=""
            initial={{ opacity: 0, y: 70, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 150, damping: 7, delay: 0.2 }}
          />

          <img
            className="why-bee-line"
            src={BeeLine}
            alt=""
          />
          <motion.img
            className="why-bee"
            src={Bee}
            alt=""
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              x: [0, 200, 400, 200, 0, -200, -400, -200, 0],
              y: [0, -100, 0, 100, 0, -100, 0, 100, 0],
              rotate: [0, 15, 0, -15, 0, 15, 0, -15, 0],
            }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            }}
          />
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
