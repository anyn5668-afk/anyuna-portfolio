import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import "./App.css";

import green from "./assets/green.svg";
import blue from "./assets/blue.svg";
import yellow from "./assets/yellow.svg";
import Introduce from "./pages/Introduce";
import Mylife from "./pages/Mylife";
import Video from "./pages/Video";
import WhatCanIDo from "./pages/WhatCanIDo";
import Feel from "./pages/Feel";
import WhyDoYouNeedMe from "./pages/WhyDoYouNeedMe";
import CloneCoding from "./pages/CloneCoding";
import School from "./pages/School";
import DoIThink from "./pages/DoIThink";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const appRef = useRef(null);
  const helloRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    let ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".hello .bottom .word");

      // Character Scattering & Falling Timeline
      // Attached to .hero pin with "4 scrolls" duration as requested
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=400%", // Exactly 4 scroll turns
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
          refreshPriority: 1,
          onLeaveBack: () => {
            document
              .querySelectorAll(".shape")
              .forEach((s) => s.classList.remove("is-scattering"));
          },
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

      // Utility for "Jelly" Mid-air bounce
      const midAirBounce = (baseX, baseY, baseRot, peakYShift) => ({
        keyframes: [
          {
            x: baseX,
            y: baseY + peakYShift,
            rotation: baseRot,
            scaleX: 0.92,
            scaleY: 1.08,
            duration: 1,
          },
          {
            x: baseX,
            y: baseY,
            rotation: baseRot,
            scaleX: 1.15,
            scaleY: 0.85,
            duration: 1,
          },
        ],
      });

      // 2. Staggered Launch & 4-Scroll Falling Phase
      const prepPos = {
        yellow: { x: "-40vw", y: "130vh", rotation: -15 },
        blue: { x: "26vw", y: "120vh", rotation: 15 },
        green: { x: "20vw", y: "140vh", rotation: 7 },
      };

      // YELLOW
      mainTl
        .to(
          ".shape.yellow",
          {
            onStart: () =>
              document
                .querySelector(".shape.yellow")
                .classList.add("is-scattering"),
            ...midAirBounce("-15vw", "-10vh", 45, -8),
            xPercent: -50,
            yPercent: -50,
            duration: 1.8,
          },
          0.2,
        )
        .to(
          ".shape.yellow",
          {
            keyframes: [
              {
                x: "-22vw",
                y: "40vh",
                rotation: -60,
                scaleX: 0.85,
                scaleY: 1.2,
                duration: 1.5,
              },
              { ...prepPos.yellow, scaleX: 1.05, scaleY: 0.95, duration: 1.5 },
            ],
            xPercent: -50,
            yPercent: -50,
            duration: 5.0,
            ease: "none",
          },
          2.0,
        );

      // BLUE
      mainTl
        .to(
          ".shape.blue",
          {
            onStart: () =>
              document
                .querySelector(".shape.blue")
                .classList.add("is-scattering"),
            ...midAirBounce("12vw", "-5vh", -60, -10),
            xPercent: -50,
            yPercent: -50,
            duration: 1.8,
          },
          1.0,
        )
        .to(
          ".shape.blue",
          {
            keyframes: [
              {
                x: "22vw",
                y: "35vh",
                rotation: -240,
                scaleX: 0.88,
                scaleY: 1.15,
                duration: 1.5,
              },
              { ...prepPos.blue, scaleX: 1.04, scaleY: 0.96, duration: 1.5 },
            ],
            xPercent: -50,
            yPercent: -50,
            duration: 4.5,
            ease: "none",
          },
          2.8,
        );

      // GREEN: Special "Diver" Motion
      mainTl
        .to(
          ".shape.green",
          {
            onStart: () =>
              document
                .querySelector(".shape.green")
                .classList.add("is-scattering"),
            x: "5vw",
            y: "-35vh",
            rotation: -15,
            scaleX: 0.8,
            scaleY: 1.3,
            xPercent: -50,
            yPercent: -50,
            duration: 1.8,
            ease: "power2.out",
          },
          2.6,
        )
        .to(
          ".shape.green",
          {
            keyframes: [
              {
                x: "12vw",
                y: "-42vh",
                rotation: 10,
                scaleX: 1.1,
                scaleY: 0.9,
                duration: 0.8,
              },
              {
                x: "8vw",
                y: "45vh",
                rotation: 45,
                scaleX: 0.85,
                scaleY: 1.25,
                duration: 1.6,
              },
              { ...prepPos.green, scaleX: 1.06, scaleY: 0.94, duration: 1.6 },
            ],
            xPercent: -50,
            yPercent: -50,
            duration: 4.0,
            ease: "none",
          },
          3.2,
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

      // 4. Simultaneous Landing Bounce
      // Triggered at the exact peak of expansion (when fully visible)
      const landingTl = gsap.timeline({ paused: true });
      const landingBounce = (selector, squash, lift) => {
        landingTl.to(
          selector,
          {
            transformOrigin: "50% 100%",
            keyframes: [
              {
                y: "+=12",
                scaleX: squash.x,
                scaleY: squash.y,
                duration: 0.1,
                ease: "power2.in",
              },
              {
                y: `-=${lift}`,
                scaleX: 0.88,
                scaleY: 1.15,
                duration: 0.18,
                ease: "power3.out",
              },
              {
                y: "+=15",
                scaleX: 1.25,
                scaleY: 0.75,
                duration: 0.18,
                ease: "power2.in",
              },
              {
                y: `-=${lift / 2}`,
                scaleX: 0.95,
                scaleY: 1.05,
                duration: 0.15,
              },
              { y: "+=5", scaleX: 1.08, scaleY: 0.92, duration: 0.15 },
              { scaleX: 1, scaleY: 1, duration: 0.3 },
            ],
          },
          0,
        );
      };

      landingBounce(".shape.yellow", { x: 1.45, y: 0.1 }, 24);
      landingBounce(".shape.blue", { x: 1.35, y: 0.3 }, 20);
      landingBounce(".shape.green", { x: 1.5, y: 0.1 }, 18);

      ScrollTrigger.create({
        trigger: helloRef.current,
        start: "top top",
        onEnter: () => landingTl.restart(true),
        onEnterBack: () => landingTl.restart(true),
        onLeaveBack: () => landingTl.pause(0),
      });

      // Hello Section Content Animation
      const helloTl = gsap.timeline({
        scrollTrigger: {
          trigger: helloRef.current,
          start: "top 110%",
          end: "bottom 10%",
          scrub: 5,
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="container" ref={appRef}>
      <nav className="navbar">
        <a href="#home" className="nav-item active">
          <span className="default">Home</span>
          <span className="hover">Home</span>
        </a>
        <a href="#about" className="nav-item">
          <span className="default">About</span>
          <span className="hover">About</span>
        </a>
        <a href="#work" className="nav-item">
          <span className="default">Work</span>
          <span className="hover">Work</span>
        </a>
        <a href="#value" className="nav-item">
          <span className="default">Value</span>
          <span className="hover">Value</span>
        </a>
      </nav>

      <main className="hero">
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
                <span className="tag light">#경험</span>
                <span className="tag dark">#성장하는 디자이너</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="hello" ref={helloRef}>
        <div className="inner">
          <div className="top">
            <p className="caption">배움의 과정과 이야기를 담았어요</p>
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
      <Introduce />
      <Mylife />
      <Video />
      <WhatCanIDo />
      <Feel />
      <WhyDoYouNeedMe />
      <CloneCoding />
      <School />
      <DoIThink />
    </div>
  );
}

export default App;
