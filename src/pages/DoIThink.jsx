import "./DoIThink.css";
import SectionTitle from "../components/SectionTitle";

import memoBlue from "../assets/memo-blue.svg";
import memoPink from "../assets/memo-pink.svg";
import memoYellow from "../assets/memo-yellow.svg";
import pen from "../assets/pen.svg";
import cloudEnd from "../assets/cloud-end.svg";

import { motion } from "framer-motion";

function DoIThink() {
  return (
    <section className="doi-think">
      <div className="doi-think__top">
        <SectionTitle
          topBadge="Q3"
          question="나는 무엇을 생각할까?"
          highlight="생각"
          titleTop="Immerse"
          titleBottomLeft=""
          titleBottomRight="Future"
          bottomBadge="A3"
          description={
            "제가 추구하는 가치, 저만의 철학 등\n저의 생각을 깊이있게 알려드릴게요."
          }
        />
      </div>

      {/* 데코 레이어 */}
      <div className="doi-think__stage" aria-hidden="true">
        <motion.img
          className="doi-memo doi-memo--pink"
          src={memoPink}
          alt=""
          initial={{ opacity: 0, y: 50, rotate: -20 }}
          whileInView={{ opacity: 1, y: 0, rotate: -12 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        />
        <motion.img
          className="doi-memo doi-memo--blue"
          src={memoBlue}
          alt=""
          initial={{ opacity: 0, y: 60, rotate: 20 }}
          whileInView={{ opacity: 1, y: 0, rotate: 12 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
        />
        <motion.img
          className="doi-memo doi-memo--yellow"
          src={memoYellow}
          alt=""
          initial={{ opacity: 0, y: 100, rotate: -15 }}
          whileInView={{ opacity: 1, y: 0, rotate: -7 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
        />

        <motion.div
          className="doi-illu"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 110, damping: 10, delay: 0.3 }}
        >
          <img className="doi-pen" src={pen} alt="" />
          <img className="doi-cloud" src={cloudEnd} alt="" />
        </motion.div>
      </div>
    </section>
  );
}

export default DoIThink;
