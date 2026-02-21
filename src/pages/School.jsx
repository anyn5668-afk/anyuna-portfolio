import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import "./School.css";

import beeLine from "../assets/bee-line.svg";
import bee from "../assets/bee.svg";

import work1 from "../assets/uiux-work1.svg";
import work2 from "../assets/uiux-work2.svg";
import work3 from "../assets/uiux-work3.svg";
import work4 from "../assets/uiux-work4.svg";
import work5 from "../assets/uiux-work5.svg";
import work6 from "../assets/uiux-work6.svg";
import work7 from "../assets/uiux-work7.svg";
import work8 from "../assets/uiux-work8.svg";

import drop1 from "../assets/drop1.svg";
import drop2 from "../assets/drop2.svg";
import drop3 from "../assets/drop3.svg";
import drop4 from "../assets/drop4.svg";
import drop5 from "../assets/drop5.svg";
import drop6 from "../assets/drop6.svg";
import drop7 from "../assets/drop7.svg";
import drop8 from "../assets/drop8.svg";

export default function School() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const targets = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const projects = [
    { title: "UI/UX", img1: work1, img2: work2 },
    { title: "BRANDING", img1: work7, img2: work8 },
    { title: "PACKAGE", img1: work5, img2: work6 }, // uiux-work5, 6 파일이 없어 폴백 적용
    { title: "EDITING", img1: work3, img2: work4 },
  ];

  return (
    <main className="school" ref={sectionRef}>
      {/* background line */}
      <img
        className="school-beeline"
        src={beeLine}
        alt=""
      />
      <img className="school-bee reveal reveal--char" src={bee} alt="" />

      <section className="school-top">
        <div className="school-pill">School work</div>

        <h1 className="school-title">
          My school work
          <br />
          record
        </h1>

        <p className="school-desc">
          제가 시각디자인과를 재학하며 만들었던 작품을 소개합니다.
          <br />
          지금과는 실력의 차이가 있지만 계속 노력한 결과, 보다 나은 실력을
          갖추게 되었습니다.
        </p>
      </section>

      <section className="school-stack">
        {projects.map((proj, idx) => (
          <SchoolProjectItem
            key={proj.title}
            title={proj.title}
            img1={proj.img1}
            img2={proj.img2}
            index={idx}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </section>
    </main>
  );
}

/**
 * 프로젝트별 개별 아이템 컴포넌트
 */
function SchoolProjectItem({
  title,
  img1,
  img2,
  index,
  hoveredIndex,
  setHoveredIndex,
}) {
  const containerRef = useRef(null);
  const dropsWrapRef = useRef(null);
  const dropRefs = useRef([]);
  const stopSimRef = useRef(null);

  const simRef = useRef({
    running: false,
    phase: "idle",
    items: [],
    W: 560,
    H: 140,
    startTime: 0,
    layoutDone: false,
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      gsap.set(q(".work-card"), { scale: 0.86, opacity: 0, y: 30 });
      gsap.set(q(".drop-tag"), {
        opacity: 0,
        x: 0,
        y: -40,
        rotate: 0,
        scale: 0.98,
      });
      gsap.set(q(".item-text"), { y: 0 });
      gsap.set(containerRef.current, { y: 0 });
    }, containerRef);

    return () => {
      stopSimRef.current?.();
      stopSimRef.current = null;
      ctx.revert();
    };
  }, []);

  // ✅ Sibling 이동 동기화
  useLayoutEffect(() => {
    if (hoveredIndex === null) {
      // 아무도 호버 안됨 -> 원위치
      gsap.to(containerRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
      return;
    }

    if (hoveredIndex === index) {
      // 내가 호버됨 -> 살짝 내려가서 카드 자리 확보 (필요 시)
      // 이미 handleMouseEnter에서 text이동을 하므로 여기선 0 유지하거나 미세조정
      gsap.to(containerRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    } else if (index < hoveredIndex) {
      // 나보다 아래 항목이 호버됨 -> 난 위로 비켜줌
      gsap.to(containerRef.current, {
        y: -50, // 기존 -150 -> 좁힘
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      // 나보다 위 항목이 호버됨 -> 난 아래로 비켜줌
      gsap.to(containerRef.current, {
        y: 320, // 기존 600 -> 좁힘
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    }
  }, [hoveredIndex, index]);

  const computeTargetsOneLine = (items, W, H) => {
    const sorted = [...items].sort((a, b) => a.x - b.x);
    const GAP = -14;
    const PAD = 18;
    const baseY = H - 16;
    const total =
      sorted.reduce((sum, it) => sum + it.w, 0) + GAP * (sorted.length - 1);
    let cursor = Math.max(PAD, (W - total) / 2);

    sorted.forEach((it, idx) => {
      it.tx = cursor;
      it.ty = baseY + (idx % 2 === 0 ? 2 : -2);
      it.tr = Math.max(-10, Math.min(10, it.r * 0.5));
      cursor += it.w + GAP;
    });
  };

  const startDropsSim = () => {
    const wrap = dropsWrapRef.current;
    if (!wrap) return null;
    const rect = wrap.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    simRef.current.W = W;
    simRef.current.H = H;
    simRef.current.startTime = performance.now();
    simRef.current.phase = "drop";
    simRef.current.layoutDone = false;

    const GRAVITY = 4200;
    const AIR = 0.996;
    const MAX_VX = 760;
    const MAX_VY = 3200;
    const FLOOR_FRICTION = 0.82;
    const FLOOR_REST = 0.02;
    const EPS = 0.6;
    const WALL_REST = 0.12;
    const COLLISION_ITER_DROP = 5;
    const COLLISION_ITER_SETTLE = 1;
    const HITBOX = 0.88;
    const IMPULSE_DROP = 0.95;
    const IMPULSE_SETTLE = 0.3;
    const SPRING_X = 0.085;
    const DAMP_X = 0.62;
    const ROT_SPRING = 0.12;
    const DROP_PHASE_MS = 520;
    const GROUNDED_RATIO_TO_SETTLE = 0.6;
    const ORIGIN_X = W * 0.5;
    const ORIGIN_Y = -60;

    const sources = [drop1, drop2, drop3, drop4, drop5, drop6, drop7, drop8];
    const items = sources.map((_, i) => {
      const el = dropRefs.current[i];
      const b = el?.getBoundingClientRect();
      const w = Math.max(90, b?.width || 120);
      const h = Math.max(36, b?.height || 48);

      return {
        el,
        w,
        h,
        x: ORIGIN_X + gsap.utils.random(-30, 30),
        y: ORIGIN_Y + gsap.utils.random(-30, 10),
        vx: gsap.utils.random(-180, 180),
        vy: gsap.utils.random(240, 620),
        r: gsap.utils.random(-16, 16),
        vr: gsap.utils.random(-80, 80),
        tx: ORIGIN_X,
        ty: H - h,
        tr: 0,
        grounded: false,
      };
    });

    simRef.current.items = items;
    simRef.current.running = true;

    items.forEach((it) => {
      if (!it.el) return;
      gsap.set(it.el, { opacity: 1, x: it.x, y: it.y, rotate: it.r, scale: 1 });
    });

    let last = performance.now();
    const tick = () => {
      if (!simRef.current.running) return;
      const now = performance.now();
      const dt = Math.min(0.02, (now - last) / 1000);
      last = now;
      const elapsed = now - simRef.current.startTime;

      if (elapsed < DROP_PHASE_MS) simRef.current.phase = "drop";
      else simRef.current.phase = "settle";

      const groundedCount = items.reduce(
        (acc, it) => acc + (it.grounded ? 1 : 0),
        0,
      );
      if (groundedCount >= Math.ceil(items.length * GROUNDED_RATIO_TO_SETTLE)) {
        simRef.current.phase = "settle";
      }

      if (simRef.current.phase === "settle" && !simRef.current.layoutDone) {
        computeTargetsOneLine(items, W, H);
        simRef.current.layoutDone = true;
      }

      for (const it of items) {
        const g = simRef.current.phase === "drop" ? GRAVITY : GRAVITY * 0.2;
        it.vy += g * dt;
        it.vx *= AIR;
        it.vy *= AIR;
        it.vx = Math.max(-MAX_VX, Math.min(MAX_VX, it.vx));
        it.vy = Math.max(-MAX_VY, Math.min(MAX_VY, it.vy));
        it.x += it.vx * dt;
        it.y += it.vy * dt;
        it.r += it.vr * dt;
        it.vr *= 0.985;
        it.r = Math.max(-28, Math.min(28, it.r));
      }

      for (const it of items) {
        if (it.x < 0) {
          it.x = 0;
          it.vx = -it.vx * WALL_REST;
        } else if (it.x + it.w > W) {
          it.x = W - it.w;
          it.vx = -it.vx * WALL_REST;
        }
        const floor = H - it.h;
        if (it.y >= floor - EPS) {
          it.y = floor;
          it.grounded = true;
          if (it.vy > 0) it.vy = 0;
          it.vx *= FLOOR_FRICTION;
          if (Math.abs(it.vx) < 25) it.vx = 0;
          if (Math.abs(it.vr) < 12) it.vr = 0;
        } else it.grounded = false;
      }

      const iter =
        simRef.current.phase === "drop"
          ? COLLISION_ITER_DROP
          : COLLISION_ITER_SETTLE;
      for (let k = 0; k < iter; k++) {
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const a = items[i];
            const b = items[j];
            const aw = a.w * HITBOX;
            const ah = a.h * HITBOX;
            const bw = b.w * HITBOX;
            const bh = b.h * HITBOX;
            const ax1 = a.x + (a.w - aw) / 2;
            const ay1 = a.y + (a.h - ah) / 2;
            const ax2 = ax1 + aw;
            const ay2 = ay1 + ah;
            const bx1 = b.x + (b.w - bw) / 2;
            const by1 = b.y + (b.h - bh) / 2;
            const bx2 = bx1 + bw;
            const by2 = by1 + bh;
            const ox = Math.min(ax2, bx2) - Math.max(ax1, bx1);
            const oy = Math.min(ay2, by2) - Math.max(ay1, by1);

            if (ox > 0 && oy > 0) {
              if (oy < ox) {
                const push = oy * 0.52;
                if (ay1 < by1) {
                  a.y -= push;
                  b.y += push;
                } else {
                  a.y += push;
                  b.y -= push;
                }
                const energy = (Math.abs(a.vy) + Math.abs(b.vy)) * 0.001;
                const imp =
                  ox *
                  energy *
                  (simRef.current.phase === "drop"
                    ? IMPULSE_DROP
                    : IMPULSE_SETTLE);
                a.vx -= imp;
                b.vx += imp;
                a.vy *= simRef.current.phase === "drop" ? 0.45 : 0.85;
                b.vy *= simRef.current.phase === "drop" ? 0.45 : 0.85;
              } else {
                const push = ox * 0.52;
                if (ax1 < bx1) {
                  a.x -= push;
                  b.x += push;
                } else {
                  a.x += push;
                  b.x -= push;
                }
                const tmp = a.vx;
                a.vx = b.vx * (simRef.current.phase === "drop" ? 0.6 : 0.3);
                b.vx = tmp * (simRef.current.phase === "drop" ? 0.6 : 0.3);
              }
              if (a.x < 0) a.x = 0;
              if (b.x < 0) b.x = 0;
              if (a.x + a.w > W) a.x = W - a.w;
              if (b.x + b.w > W) b.x = W - b.w;
            }
          }
        }
      }

      if (simRef.current.phase === "settle") {
        for (const it of items) {
          if (!it.grounded) continue;
          const dx = it.tx - it.x;
          it.vx += dx * SPRING_X;
          it.vx *= DAMP_X;
          it.y = it.ty;
          it.vy = 0;
          it.r += (it.tr - it.r) * ROT_SPRING;
          it.vr *= 0.9;
        }
      }

      for (const it of items) {
        if (!it.el) continue;
        gsap.set(it.el, { x: it.x, y: it.y, rotate: it.r });
      }
    };

    gsap.ticker.remove(tick);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      simRef.current.running = false;
    };
  };

  const handleMouseEnter = () => {
    const q = gsap.utils.selector(containerRef);
    gsap.killTweensOf([q(".item-text"), q(".work-card"), q(".drop-tag")]);

    gsap.to(q(".item-text"), {
      y: 220, // 기존 350 -> 좁힘
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });

    setHoveredIndex(index);

    gsap.to(q(".work-card.card1"), {
      y: -60,
      x: -60,
      rotation: -6,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(q(".work-card.card2"), {
      y: -40,
      x: 60,
      rotation: 6,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay: 0.08,
      ease: "power2.out",
      overwrite: true,
    });

    stopSimRef.current?.();
    stopSimRef.current = startDropsSim();
  };

  const handleMouseLeave = () => {
    const q = gsap.utils.selector(containerRef);
    stopSimRef.current?.();
    stopSimRef.current = null;
    gsap.killTweensOf([q(".item-text"), q(".work-card"), q(".drop-tag")]);

    gsap.to(q(".item-text"), {
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });

    setHoveredIndex(null);

    gsap.to(q(".work-card"), {
      y: 50,
      x: 0,
      rotation: 0,
      opacity: 0,
      scale: 0.86,
      duration: 0.35,
      ease: "power2.in",
      overwrite: true,
    });

    gsap.to(q(".drop-tag"), {
      opacity: 0,
      duration: 0.25,
      ease: "power1.out",
      overwrite: true,
      onComplete: () => {
        gsap.set(q(".drop-tag"), {
          opacity: 0,
          x: 0,
          y: -40,
          rotate: 0,
          scale: 0.98,
        });
      },
    });
  };

  return (
    <div
      className="school-item-container"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="item-text">{title}</span>

      <div className="school-hover-content">
        <div className="cards-group">
          <img src={img1} className="work-card card1" alt="work1" />
          <img src={img2} className="work-card card2" alt="work2" />
        </div>

        <div className="drops-group" ref={dropsWrapRef}>
          {[drop1, drop2, drop3, drop4, drop5, drop6, drop7, drop8].map(
            (src, i) => (
              <img
                key={i}
                src={src}
                className="drop-tag"
                ref={(el) => (dropRefs.current[i] = el)}
                alt="tag"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
