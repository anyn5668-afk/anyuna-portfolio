import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./School.css";

import beeLine from "../assets/bee-line02.svg";
import bee from "../assets/bee.svg";

import work1 from "../assets/uiux-work1.svg";
import work2 from "../assets/uiux-work2.svg";

import drop1 from "../assets/drop1.svg";
import drop2 from "../assets/drop2.svg";
import drop3 from "../assets/drop3.svg";
import drop4 from "../assets/drop4.svg";
import drop5 from "../assets/drop5.svg";
import drop6 from "../assets/drop6.svg";
import drop7 from "../assets/drop7.svg";
import drop8 from "../assets/drop8.svg";

export default function School() {
  const containerRef = useRef(null);

  const dropsWrapRef = useRef(null);
  const dropRefs = useRef([]);
  const stopSimRef = useRef(null);

  const simRef = useRef({
    running: false,
    phase: "idle", // drop | settle
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

      gsap.set([q(".item-text"), q(".sibling-item")], { y: 0 });
    }, containerRef);

    return () => {
      stopSimRef.current?.();
      stopSimRef.current = null;
      ctx.revert();
    };
  }, []);

  /**
   * 최종 한 줄 정돈 타겟 생성
   * - 현재 x 순서로 정렬 (자연스러움)
   * - 살짝 겹치게(GAP 음수) 가능
   * - baseY로 “어디 라인에 앉힐지” 결정
   */
  const computeTargetsOneLine = (items, W, H) => {
    const sorted = [...items].sort((a, b) => a.x - b.x);

    const GAP = -14; // 더 겹치게: -18 / 덜 겹치게: -8
    const PAD = 18;

    // “글자 위”에 앉는 느낌: H에서 얼마나 올릴지(값 작을수록 아래)
    const baseY = H - 16; // 더 아래: H-20 / 더 위: H-44

    const total =
      sorted.reduce((sum, it) => sum + it.w, 0) + GAP * (sorted.length - 1);

    let cursor = Math.max(PAD, (W - total) / 2);

    sorted.forEach((it, idx) => {
      it.tx = cursor;
      it.ty = baseY + (idx % 2 === 0 ? 2 : -2); // 아주 미세한 자연스러움
      it.tr = Math.max(-10, Math.min(10, it.r * 0.5)); // 회전 정돈
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

    // ========= “자연스러운 물리” 튜닝 =========
    // 낙하를 빠르게(후두둑)
    const GRAVITY = 4200; // 더 빠르게: 4500 / 더 느리게: 3200
    const AIR = 0.996; // 1에 가까울수록 저항 적음(빠름)
    const MAX_VX = 760; // 충돌 밀림이 느리면 올리기(600~900)
    const MAX_VY = 3200;

    // 바닥: 떨림 방지용 스냅
    const FLOOR_FRICTION = 0.82; // 더 미끄럽게: 0.88 / 더 빨리 멈춤: 0.75
    const FLOOR_REST = 0.02; // 튐 거의 없음(0~0.04)
    const EPS = 0.6; // 바닥 판정 여유(떨림 방지)

    // 벽
    const WALL_REST = 0.12;

    // 충돌(떨어질 때만 강하게)
    const COLLISION_ITER_DROP = 5;
    const COLLISION_ITER_SETTLE = 1; // settle 때는 떨림 방지 위해 최소화
    const HITBOX = 0.88; // 충돌 박스 살짝 줄여 “과한 밀림” 완화

    // 충돌 impulse(밀림 속도) — 느리면 이 값 올리면 됨
    const IMPULSE_DROP = 0.95;
    const IMPULSE_SETTLE = 0.3;

    // settle(정돈): 무겁게 “툭 멈추게”
    const SPRING_X = 0.085; // 작을수록 덜 말랑(0.07~0.10)
    const DAMP_X = 0.62; // 낮을수록 에너지 빨리 죽음(0.58~0.72)
    const ROT_SPRING = 0.12;

    // drop -> settle 전환: “시간” + “대부분 착지”
    const DROP_PHASE_MS = 520; // 후두둑 빠르게. 450~650 추천
    const GROUNDED_RATIO_TO_SETTLE = 0.6;

    // 시작점: 카드 아래/텍스트 위
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
        vy: gsap.utils.random(240, 620), // ✅ 처음부터 “쏟아짐”
        r: gsap.utils.random(-16, 16),
        vr: gsap.utils.random(-80, 80),

        // targets
        tx: ORIGIN_X,
        ty: H - h,
        tr: 0,

        grounded: false,
      };
    });

    simRef.current.items = items;
    simRef.current.running = true;

    // show
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

      // drop phase 여부
      const inDrop = elapsed < DROP_PHASE_MS;

      // 착지 비율로 settle 전환(허공 둥둥 방지)
      const groundedCount = items.reduce(
        (acc, it) => acc + (it.grounded ? 1 : 0),
        0
      );
      const groundedEnough =
        groundedCount >= Math.ceil(items.length * GROUNDED_RATIO_TO_SETTLE);

      if (!inDrop || groundedEnough) simRef.current.phase = "settle";
      else simRef.current.phase = "drop";

      // settle 진입 시 타겟 레이아웃 1회 생성
      if (simRef.current.phase === "settle" && !simRef.current.layoutDone) {
        computeTargetsOneLine(items, W, H);
        simRef.current.layoutDone = true;
      }

      // 1) integrate
      for (const it of items) {
        // 중력: drop에서 강하게, settle에서는 약하게(정돈 방해 줄임)
        const g = simRef.current.phase === "drop" ? GRAVITY : GRAVITY * 0.2;
        it.vy += g * dt;

        // drag
        it.vx *= AIR;
        it.vy *= AIR;

        // clamp
        it.vx = Math.max(-MAX_VX, Math.min(MAX_VX, it.vx));
        it.vy = Math.max(-MAX_VY, Math.min(MAX_VY, it.vy));

        it.x += it.vx * dt;
        it.y += it.vy * dt;

        // rotate (과하지 않게)
        it.r += it.vr * dt;
        it.vr *= 0.985;
        it.r = Math.max(-28, Math.min(28, it.r));
      }

      // 2) walls + floor snap
      for (const it of items) {
        // walls
        if (it.x < 0) {
          it.x = 0;
          it.vx = -it.vx * WALL_REST;
        } else if (it.x + it.w > W) {
          it.x = W - it.w;
          it.vx = -it.vx * WALL_REST;
        }

        const floor = H - it.h;

        // ✅ 떨림 방지: >= floor - EPS 로 안정 판정
        if (it.y >= floor - EPS) {
          it.y = floor;
          it.grounded = true;

          // ✅ 바닥에서 “튀지 않게” (부들부들 원인 제거)
          if (it.vy > 0) it.vy = 0;

          // 마찰
          it.vx *= FLOOR_FRICTION;

          // 작은 속도는 바로 0
          if (Math.abs(it.vx) < 25) it.vx = 0;
          if (Math.abs(it.vr) < 12) it.vr = 0;
        } else {
          it.grounded = false;
        }
      }

      // 3) collisions
      const iter =
        simRef.current.phase === "drop"
          ? COLLISION_ITER_DROP
          : COLLISION_ITER_SETTLE;

      for (let k = 0; k < iter; k++) {
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const a = items[i];
            const b = items[j];

            // shrunk hitbox
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
              // 분리: 세로 우선(쌓임)
              if (oy < ox) {
                const push = oy * 0.52;

                if (ay1 < by1) {
                  a.y -= push;
                  b.y += push;
                } else {
                  a.y += push;
                  b.y -= push;
                }

                // ✅ 충돌 impulse(밀림 속도)
                const energy = (Math.abs(a.vy) + Math.abs(b.vy)) * 0.001;
                const imp =
                  ox *
                  energy *
                  (simRef.current.phase === "drop"
                    ? IMPULSE_DROP
                    : IMPULSE_SETTLE);

                a.vx -= imp;
                b.vx += imp;

                // 수직 속도 감쇠(묵직)
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

                // x 속도 교환(툭 밀림)
                const tmp = a.vx;
                a.vx = b.vx * (simRef.current.phase === "drop" ? 0.6 : 0.3);
                b.vx = tmp * (simRef.current.phase === "drop" ? 0.6 : 0.3);
              }

              // bounds clamp
              if (a.x < 0) a.x = 0;
              if (b.x < 0) b.x = 0;
              if (a.x + a.w > W) a.x = W - a.w;
              if (b.x + b.w > W) b.x = W - b.w;
            }
          }
        }
      }

      // 4) settle: 바닥에 닿은 애들만 X 정돈 + Y 고정(허공 둥둥 제거)
      if (simRef.current.phase === "settle") {
        for (const it of items) {
          if (!it.grounded) continue;

          const dx = it.tx - it.x;
          it.vx += dx * SPRING_X;
          it.vx *= DAMP_X;

          // ✅ Y는 목표 라인에 “붙여서” 떠보임 제거
          it.y = it.ty;
          it.vy = 0;

          // 회전 정돈
          it.r += (it.tr - it.r) * ROT_SPRING;
          it.vr *= 0.9;
        }
      }

      // 5) render
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

    gsap.killTweensOf([
      q(".item-text"),
      q(".sibling-item"),
      q(".work-card"),
      q(".drop-tag"),
    ]);

    // ✅ 더 아래로 + 더 빠르게 내려가게 수정
    gsap.to([q(".item-text"), q(".sibling-item")], {
      y: 320,           // 기존 220 -> 더 아래
      duration: 0.45,   // 기존 0.8 -> 더 빠르게
      ease: "power3.out",
      overwrite: true,
    });

    // 카드 등장
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

    // 드랍 시작
    stopSimRef.current?.();
    stopSimRef.current = startDropsSim();
  };

  const handleMouseLeave = () => {
    const q = gsap.utils.selector(containerRef);

    stopSimRef.current?.();
    stopSimRef.current = null;

    gsap.killTweensOf([
      q(".item-text"),
      q(".sibling-item"),
      q(".work-card"),
      q(".drop-tag"),
    ]);

    // 원위치
    gsap.to([q(".item-text"), q(".sibling-item")], {
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });

    // 카드 숨김
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

    // 태그 숨김
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
    <main className="school" ref={containerRef}>
      {/* background line */}
      <img className="school-beeline" src={beeLine} alt="" />
      <img className="school-bee" src={bee} alt="" />

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
        {/* UI/UX Item with Hover Animation */}
        <div
          className="school-item uiux-trigger"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="item-text">UI/UX</span>

          {/* Animated Elements Container */}
          <div className="school-hover-content">
            {/* Cards */}
            <div className="cards-group">
              <img src={work1} className="work-card card1" alt="work1" />
              <img src={work2} className="work-card card2" alt="work2" />
            </div>

            {/* Drops */}
            <div className="drops-group" ref={dropsWrapRef}>
              {[drop1, drop2, drop3, drop4, drop5, drop6, drop7, drop8].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="drop-tag"
                  ref={(el) => (dropRefs.current[i] = el)}
                  alt="tag"
                />
              ))}
            </div>

            {/* ✅ learn more 삭제됨 */}
          </div>
        </div>

        {/* Sibling Items */}
        <p className="school-item-plain sibling-item">BRANDING</p>
        <p className="school-item-plain sibling-item">PACKAGE</p>
        <p className="school-item-plain sibling-item">VIDEO</p>
      </section>
    </main>
  );
}
