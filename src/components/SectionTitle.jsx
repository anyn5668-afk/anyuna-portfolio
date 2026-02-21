import React from "react";
import "./SectionTitle.css";

import bounceBlue from "../assets/bounce-blue.mp4";

export default function SectionTitle({
  topBadge = "Q1",
  question = "나는 무엇을 할 수 있을까?",
  highlight = "무엇",
  titleTop = "Introduction to",
  titleBottomLeft = "my",
  titleBottomRight = "abilities",
  bottomBadge = "A1",
  description = "UI/UX 디자이너가 되기 위해 UX의 대한 지식을 익히고\n다양한 툴을 익히며 저의 능력을 키워가고 있어요!",
  leftDecor = null,
  rightDecor = null,
}) {
  const parts = splitWithHighlight(question, highlight);

  return (
    <section className="stWrap">
      {leftDecor && <div className="stDecor stDecorLeft">{leftDecor}</div>}
      {rightDecor && <div className="stDecor stDecorRight">{rightDecor}</div>}

      <div className="stInner">
        {/* 상단 */}
        <div className="stTop">
          <div className="stBadge">{topBadge}</div>

          <p className="stQuestion">
            {parts.map((p, i) =>
              p.isHighlight ? (
                <span key={i} className="stHighlight">
                  {p.text}
                </span>
              ) : (
                <span key={i}>{p.text}</span>
              ),
            )}
          </p>
        </div>

        {/* 타이틀 */}
        <div className="stTitle">
          <div className="stTitleLine">{titleTop}</div>

          <div className="stTitleLine2">
            <span className="stTitleWord">{titleBottomLeft}</span>

            {/* ✅ 파란 캐릭터 영상 */}
            <span className="stCenterIcon" aria-hidden="true">
              <video
                className="stCenterVideo"
                src={bounceBlue}
                autoPlay
                loop
                muted
                playsInline
              />
            </span>

            <span className="stTitleWord stItalic">{titleBottomRight}</span>
          </div>
        </div>

        {/* 하단 */}
        <div className="stBottom">
          <div className="stBadge stBadgeSmall">{bottomBadge}</div>
          <p className="stDesc">{description}</p>
        </div>
      </div>
    </section>
  );
}

function splitWithHighlight(text, highlight) {
  if (!highlight) return [{ text, isHighlight: false }];

  const idx = text.indexOf(highlight);
  if (idx === -1) return [{ text, isHighlight: false }];

  const before = text.slice(0, idx);
  const mid = text.slice(idx, idx + highlight.length);
  const after = text.slice(idx + highlight.length);

  return [
    ...(before ? [{ text: before, isHighlight: false }] : []),
    { text: mid, isHighlight: true },
    ...(after ? [{ text: after, isHighlight: false }] : []),
  ];
}
