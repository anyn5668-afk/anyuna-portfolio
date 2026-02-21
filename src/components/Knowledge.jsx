import React from "react";
import "./Knowledge.css";

export default function Knowledge({
  imgSrc,
  imgAlt = "",
  title,
  text,
  className = "",
}) {
  return (
    <article className={`knowledge ${className}`}>
      <img className="img" src={imgSrc} alt={imgAlt} />
      <h3 className="title">{title}</h3>
      <p className="text">{text}</p>
    </article>
  );
}
