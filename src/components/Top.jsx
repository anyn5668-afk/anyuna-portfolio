import "./Top.css";
import { useEffect, useRef, useState } from "react";

function Top({ caption, title, text }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        } else {
          // 화면에서 사라지면 초기화
          setAnimate(false);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="top-title-wrapper" style={{ width: "100%" }}>
      <div className={`top-title ${animate ? "animate" : ""}`}>
        <div className="top-caption">
          <p>{caption}</p>
          <h2>{title}</h2>
        </div>
        <div className="top-text">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Top;
