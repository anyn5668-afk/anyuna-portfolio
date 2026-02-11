import React from "react";
import "./Thought.css";

export default function Thought({
  number = "(01)",
  title = (
    <>
      I Wanna Be <em>Where</em> the
    </>
  ),
  subtitle = "",
  imageSrc = "/assets/thought01.png",
  imageAlt = "thought image",
  bgColor = "#4EA7FF",
  textColor = "#ffffff",
  text = (
    <>
      팀프로젝트의 발표 과정에서,
      <br />
      좋은 기획은 이해시키는 전달력까지 완성되어야
      <br />
      한다는 걸 배웠어요!
    </>
  ),
}) {
  return (
    <article className="thought-card" style={{ color: textColor }}>
      <header className="thought-top" style={{ backgroundColor: bgColor }}>
        <div className="thought-top-inner">
          <div className="thought-number" style={{ color: "inherit" }}>{number}</div>
          <h3 className="thought-title" style={{ color: "inherit" }}>{title}</h3>
          {subtitle && <p className="thought-subtitle">{subtitle}</p>}
        </div>
      </header>

      <section className="thought-image-section">
        <img src={imageSrc} alt={imageAlt} className="thought-image" />
      </section>

      <footer className="thought-bottom" style={{ backgroundColor: bgColor }}>
        <p className="thought-text" style={{ color: "inherit" }}>{text}</p>
      </footer>
    </article>
  );
}
