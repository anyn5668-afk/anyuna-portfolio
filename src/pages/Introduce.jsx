import "./Introduce.css";
import profile from "../assets/profile.svg";
import ellipseGreen from "../assets/Ellipse-green.svg";
import ellipsePink from "../assets/Ellipse-pink.svg";
import ellipseYellow from "../assets/Ellipse-yellow.svg";
import ellipseBlue from "../assets/Ellipse-blue.svg";
import label from "../assets/label.svg";
import InfoCard from "../components/InfoCard";
import Top from "../components/Top";
import { useEffect } from "react";

function Introduce() {
  const cardData = [
    {
      icon: ellipseGreen,
      title: "School",
      content: [
        { text: "2021 화수고등학교 졸업" },
        { text: "2025 숭의여자대학교 시각디자인과 졸업" },
        { text: "2026 이젠아카데미 UI/UX 교육과정 진행중" },
      ],
    },
    {
      icon: ellipseBlue,
      title: "Hobby",
      content: [{ text: "글쓰기, 뜨개질, 퍼즐" }],
    },
    {
      icon: ellipseYellow,
      title: "Award",
      content: [
        { text: "2021 제 41회 전국 만해백일장 장려상 수상" },
        { text: "2023 제 59회 경기 디자인대전" },
        { text: "포스터 디자인 부문 입선", indent: true },
      ],
    },
  ];

  return (
    <section className="introduce">
      <div className="introduce-inner">
        {/* Header Section */}

        <div className="top">
          <Top
            caption="Introduce"
            title="Who Am I"
            text={`제가 누구인지 소개할게요.\n 저의 대한 정보와 어떤 디자이너인지 담았어요!`}
          />
        </div>

        {/* Main Content */}
        <div className="introduce-content">
          {/* Left Side - Text Content */}
          <div className="introduce-left">
            <div className="growth-text">
              <img src={ellipsePink} alt="" className="growth-circle" />
              <h3 className="growth-main">
                과정 속에서
                <br />
                <span className="growth-highlight">성장하는</span>
              </h3>
            </div>

            <div className="introduce-tags">
              <span className="intro-tag">#성실한</span>
              <span className="intro-tag">#자라나는</span>
              <span className="intro-tag break" aria-hidden="true" />
              <span className="intro-tag">#배우는</span>
              <span className="intro-tag">#트렌디한</span>
              <span className="intro-tag">#감각적인</span>
            </div>
          </div>

          {/* Center - Image */}
          <div className="introduce-center">
            <div className="image-wrapper">
              <img src={label} alt="" className="label-shape" />
              <div className="profile-image">
                <img src={profile} alt="Profile" className="profile-img" />
              </div>
            </div>
          </div>

          {/* Right Side - Designer Text */}
          <div className="introduce-right">
            <h3 className="designer-text">
              디자이너
              <br />
              <span className="name-highlight">안유나</span>입니다
            </h3>
          </div>
        </div>

        {/* Bottom Section - Info Cards */}
        <div className="introduce-bottom">
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              content={card.content}
              className="info-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Introduce;
