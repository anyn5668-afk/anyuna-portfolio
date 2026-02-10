import React from "react";
import "./Skill.css";

export default function Skill({
  title = "Photoshop",
  percent = "70%",
  img, // ✅ 카드마다 다른 이미지 넣을 자리
  imgAlt = "", // ✅ 필요하면 접근성용 alt도 넘길 수 있게
  percentColor,
}) {
  return (
    <div className="skill-card" role="group" aria-label={`${title} skill card`}>
      <div className="skill-imgWrap" aria-hidden={imgAlt ? "false" : "true"}>
        {/* ✅ img가 들어오면 이미지 표시, 안 들어오면 빈 자리 */}
        {img ? (
          <img className="skill-img" src={img} alt={imgAlt} />
        ) : (
          <div className="skill-imgPlaceholder" aria-hidden="true" />
        )}
      </div>

      <div className="title">{title}</div>
      <div
        className="percent"
        style={{ color: percentColor }}
      >
        {percent}
      </div>

    </div>
  );
}
