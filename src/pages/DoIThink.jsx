import "./DoIThink.css";
import SectionTitle from "../components/SectionTitle";

import memoBlue from "../assets/memo-blue.svg";
import memoPink from "../assets/memo-pink.svg";
import memoYellow from "../assets/memo-yellow.svg";
import pen from "../assets/pen.svg";
import cloudEnd from "../assets/cloud-end.svg";


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
        <img
          className="doi-memo doi-memo--pink"
          src={memoPink}
          alt=""
        />
        <img
          className="doi-memo doi-memo--blue"
          src={memoBlue}
          alt=""
        />
        <img
          className="doi-memo doi-memo--yellow"
          src={memoYellow}
          alt=""
        />

        <div className="doi-illu">
          <img className="doi-pen" src={pen} alt="" />
          <img className="doi-cloud" src={cloudEnd} alt="" />
        </div>
      </div>
    </section>
  );
}

export default DoIThink;
