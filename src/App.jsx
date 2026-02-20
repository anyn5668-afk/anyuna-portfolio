import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import "./App.css";

import green from "./assets/green.svg";
import blue from "./assets/blue.svg";
import yellow from "./assets/yellow.svg";
import Introduce from "./pages/Introduce";
import Mylife from "./pages/Mylife";
import WhatCanIDo from "./pages/WhatCanIDo";
import Feel from "./pages/Feel";
import WhyDoYouNeedMe from "./pages/WhyDoYouNeedMe";
import CloneCoding from "./pages/CloneCoding";
import School from "./pages/School";
import DoIThink from "./pages/DoIThink";
import Figma from "./pages/Figma";
import Previous from "./pages/Previous";
import Ending from "./pages/Ending";
import Footer from "./pages/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const appRef = useRef(null);
  const helloRef = useRef(null);
  const whatCanIDoRef = useRef(null);
  const cloneCodingRef = useRef(null);
  const schoolRef = useRef(null);

  // Navigation section refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const valueRef = useRef(null);

  const [navbarDark, setNavbarDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useLayoutEffect(() => {
    // 1. 브라우저 및 GSAP의 스크롤 복구 기능 완전히 끄기
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    ScrollTrigger.clearScrollMemory("manual");

    // 즉시 리셋 + 아주 약간의 지연 후 재리셋 (브라우저 성질 제압용)
    window.scrollTo(0, 0);
    const resetTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 50);

    let ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".hello .bottom .word");

      // Character Scattering & Falling Timeline REMOVED per user request
      // We keep a simple timeline for hero elements fading out as we scroll
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
        },
      });

      // 1. Fade Hero Text
      mainTl.to(
        ".left-content, .right-content",
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
        },
        0,
      );

      // 3. Circular Reveal for Hello Section
      // Expansion from circle(0%) to circle(150%) as it scrolls in
      gsap.fromTo(
        ".hello",
        { clipPath: "circle(0% at 50% 50%)" },
        {
          scrollTrigger: {
            trigger: helloRef.current,
            start: "top 110%", // Earlier reveal
            end: "top -60%", // Longer scroll distance for slower expansion
            scrub: true,
            invalidateOnRefresh: true,
          },
          clipPath: "circle(150% at 50% 50%)",
          ease: "none",
        },
      );

      // 3.5 Snap-to-center "click" stop when Hello arrives
      ScrollTrigger.create({
        trigger: helloRef.current,
        start: "top 70%",
        end: "bottom top",
        onEnter: () => {
          const hello = helloRef.current;
          if (!hello) return;
          const rect = hello.getBoundingClientRect();
          const target =
            window.scrollY +
            rect.top +
            rect.height / 2 -
            window.innerHeight / 2;
          gsap.to(window, {
            scrollTo: target,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });

      // Hello Section Content Animation
      const helloTl = gsap.timeline({
        scrollTrigger: {
          trigger: helloRef.current,
          start: "top 110%",
          end: "bottom 10%",
          scrub: 1.5, // 5에서 1.5로 대폭 조정 (5는 연산 부하가 매우 큼)
          invalidateOnRefresh: true,
        },
      });

      helloTl
        .fromTo(
          words,
          { y: 70, opacity: 0 },
          {
            y: -10,
            opacity: 1,
            duration: 3.2,
            ease: "power2.out",
            stagger: 0.12,
          },
        )
        .to(
          words,
          {
            y: 0,
            duration: 3.0,
            ease: "bounce.out",
            stagger: 0.12,
          },
          "-=0.1",
        );

      // Introduce Section Animation
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".introduce",
          start: "top 75%",
          end: "bottom 35%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      introTl
        .from(".introduce-badge", {
          y: 16,
          opacity: 0,
          duration: 0.28,
          ease: "power3.out",
        })
        .from(
          ".introduce-title",
          {
            y: 18,
            opacity: 0,
            duration: 0.32,
            ease: "power3.out",
          },
          "-=0.18",
        )
        .from(
          ".introduce-subtitle p",
          {
            y: 10,
            opacity: 0,
            duration: 0.24,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.18",
        )
        .from(
          ".growth-text",
          {
            x: -28,
            opacity: 0,
            duration: 0.32,
            ease: "power3.out",
          },
          "-=0.12",
        )
        .from(
          ".introduce-tags .intro-tag:not(.break)",
          {
            y: 14,
            opacity: 0,
            duration: 0.24,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.12",
        )
        .from(
          ".image-wrapper",
          {
            y: 26,
            opacity: 0,
            scale: 0.97,
            duration: 0.36,
            ease: "power3.out",
          },
          "-=0.18",
        )
        .from(
          ".designer-text",
          {
            x: 24,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.18",
        );

      // Subtle label sway (wind-like)
      gsap.to(".label-shape", {
        y: -8,
        rotation: -5.2,
        transformOrigin: "100% 100%",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      ScrollTrigger.refresh();

      // Navbar color change on light background sections
      const lightSections = [
        helloRef.current,
        whatCanIDoRef.current,
        cloneCodingRef.current,
        schoolRef.current,
      ];

      lightSections.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 80px",
            end: "bottom 80px",
            onEnter: () => setNavbarDark(true),
            onLeave: () => setNavbarDark(false),
            onEnterBack: () => setNavbarDark(true),
            onLeaveBack: () => setNavbarDark(false),
          });
        }
      });

      // Active section tracking for navigation
      const navSections = [
        { ref: homeRef, name: 'home' },
        { ref: aboutRef, name: 'about' },
        { ref: workRef, name: 'work' },
        { ref: valueRef, name: 'value' },
      ];

      navSections.forEach(({ ref, name }) => {
        if (ref.current) {
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(name),
            onEnterBack: () => setActiveSection(name),
          });
        }
      });
    });

    return () => {
      clearTimeout(resetTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div className="container" ref={appRef}>
      <nav className={`navbar ${navbarDark ? 'navbar--dark' : ''}`}>
        <a href="#home" className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}>
          <span className="default">Home</span>
          <span className="hover">Home</span>
        </a>
        <a href="#about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}>
          <span className="default">About</span>
          <span className="hover">About</span>
        </a>
        <a href="#work" className={`nav-item ${activeSection === 'work' ? 'active' : ''}`}>
          <span className="default">Work</span>
          <span className="hover">Work</span>
        </a>
        <a href="#value" className={`nav-item ${activeSection === 'value' ? 'active' : ''}`}>
          <span className="default">Value</span>
          <span className="hover">Value</span>
        </a>
      </nav>

      <main ref={homeRef} className="hero" id="home">
        <div className="left-content card" style={{ position: "relative" }}>
          <div className="yuna-title" style={{ position: "relative" }}>
            <h1 className="YUNA-text">
              YUNA'<span>s</span>
            </h1>
            <h1
              className="YUNA-text water"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              YUNA'<span>s</span>
            </h1>
          </div>
        </div>

        <div className="right-group">
          <div className="center-content">
            <div className="image-stack">
              <img src={yellow} alt="yellow shape" className="shape yellow" />
              <img src={blue} alt="blue shape" className="shape blue" />
              <img src={green} alt="green shape" className="shape green" />
            </div>
          </div>

          <div className="right-content">
            <h2 className="portfolio-text">Portfolio</h2>
            <div className="tags">
              <div className="tag-row">
                <span className="tag dark">#질문하고</span>
                <span className="tag light">#성장하고</span>
                <span className="tag light">#배우는</span>
              </div>
              <div className="tag-row">
                <span className="tag light">#경험하는</span>
                <span className="tag dark">#성장하는 디자이너</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="hello" ref={helloRef}>
        <div className="inner">
          <div className="top">
            <p className="caption">배움의 과정을 담았어요</p>
            <div className="top-top">
              <h2>
                Hello <span>,</span> 안녕하세요
              </h2>
            </div>
          </div>
          <div className="bottom">
            <h1>
              <span className="word">Let</span>
              <span className="word em">me</span>
              <span className="word">tell</span>
              <span className="word">you</span>
              <span className="word em">about</span>
              <span className="word em">my</span>
              <span className="word em">learning</span>
              <span className="line-break" aria-hidden="true" />
              <span className="word">process,</span>
              <span className="word">my</span>
              <span className="word">journey!</span>
            </h1>
            <p>배움의 과정과 성장 이야기를 들려드릴게요.</p>
          </div>
        </div>
      </section>

      {/* Introduce Section */}
      <div ref={aboutRef} id="about">
        <Introduce />
      </div>
      <Mylife />
      {/* <Video /> */}
      <WhatCanIDo ref={whatCanIDoRef} />
      <div ref={workRef} id="work">
        <Previous />
      </div>
      <Feel />
      <WhyDoYouNeedMe />
      <div ref={cloneCodingRef}>
        <CloneCoding />
      </div>
      <div ref={schoolRef}>
        <School />
      </div>
      <div ref={valueRef} id="value">
        <DoIThink />
      </div>
      <Figma />
      <Ending />
      <Footer />
    </div>
  );
}

export default App;
