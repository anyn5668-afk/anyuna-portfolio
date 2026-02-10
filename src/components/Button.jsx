import React from "react";
import "./Button.css";
import rightIcon from "../assets/right.svg";

export default function Button({
  label = "Visit site",
  onClick,
  bgColor = "#3D3D3D",
  textColor = "#FFFFFF",
  accentColor = "#41B0FF",
  accentHoverColor, // 없으면 accentColor를 살짝 어둡게 처리한 값으로 fallback
  className = "",
  lightAccentColor = "#A9DBFF",
  ...props
}) {
  const computedAccentHover = accentHoverColor || "rgba(255, 255, 255, 0.18)"; // "색이 차오르는" 느낌용 오버레이

  return (
    <button
      type="button"
      className={`c-button ${className}`}
      onClick={onClick}
      style={{
        "--btn-bg": bgColor,
        "--btn-text": textColor,
        "--btn-accent": accentColor,
        "--btn-accent-hover": lightAccentColor,
      }}
      {...props}
    >
      <span className="c-button__label">{label}</span>

      <span className="c-button__iconWrap" aria-hidden="true">
        <img className="c-button__icon" src={rightIcon} alt="" />
      </span>
    </button>
  );
}
