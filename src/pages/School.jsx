import React from "react";
import "./School.css";

import beeLine from "../assets/bee-line02.svg";
import bee from "../assets/bee.svg";

export default function School() {
  return (
    <main className="school">
      {/* background line */}
      <img className="school-beeline" src={beeLine} alt="" />
      <img className="school-bee" src={bee} alt="" />

      <section className="school-top">
        <div className="school-pill">School work</div>

        <h1 className="school-title">
          My school work
          <br />
          record
        </h1>

        <p className="school-desc">
          제가 시각디자인과를 재학하며 만들었던 작품을 소개합니다.
          <br />
          지금과는 실력의 차이가 있지만 계속 노력한 결과, 보다 나은 실력을
          갖추게 되었습니다.
        </p>
      </section>

      <section className="school-stack">
        <p>UI/UX</p>
        <p>BRANDING</p>
        <p>PACKAGE</p>
        <p>VIDEO</p>
      </section>
    </main>
  );
}
