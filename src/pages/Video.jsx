import React from "react";
import "./Video.css";

// ✅ 영상 파일 경로는 프로젝트 구조에 맞게 바꿔줘!
// 예1) src/assets/video.mp4  =>  import video from "../assets/video.mp4";
// 예2) public/video.mp4      =>  const videoSrc = "/video.mp4";

import video from "../assets/video.mp4";

export default function Video() {
  return (
    <section className="videoSection">
      <video className="bgVideo" src={video} autoPlay muted loop playsInline />

      <div className="videoOverlay">
        <h1 className="videoTitle">Just another day in my life</h1>

        <p className="videoSubTitle">
          <span className="canela">Just another day of </span>
          <span className="pretendard">learning</span>,{" "}
          <span className="canelaItalic">working</span>, <br />
          <span className="canela">and </span>
          <span className="canelaItalic">spending time </span>
          <span className="pretendard">together</span>
        </p>

        <p className="videoDesc">
          A simple day of work, study, and everyday thoughts
        </p>
      </div>
    </section>
  );
}
