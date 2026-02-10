import { useEffect, useRef } from "react";
import "./InfoCard.css";

function InfoCard({ icon, title, content }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show"); // 👈 다시 숨김
        }
      },
      {
        threshold: 0.2,
      },
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="info-card" ref={cardRef}>
      <div className="card-icon">
        <img src={icon} alt="" className="icon-bg" />
        <span>{title}</span>
      </div>

      <div className="card-content">
        {content.map((text, index) => (
          <p key={index} className={text.indent ? "indent" : ""}>
            {text.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default InfoCard;
