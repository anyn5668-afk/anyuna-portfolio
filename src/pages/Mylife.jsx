import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Mylife.css";

import Top from "../components/Top";

import photo01 from "../assets/photo01.svg";
import photo02 from "../assets/photo02.svg";
import photo03 from "../assets/photo03.svg";
import photo04 from "../assets/photo04.svg";

gsap.registerPlugin(ScrollTrigger);

function Mylife() {
  const sectionRef = useRef(null);
  const photosRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const photos = photosRef.current.filter(Boolean);

    if (!section || photos.length === 0) return;

    let ctx = gsap.context(() => {
      // 1. 초기화: 사진들을 중앙으로 모으기 (x: 0)
      // CSS에 설정된 회전(rotation) 값은 그대로 유지되어 자연스럽게 겹쳐 보입니다.
      gsap.set(photos, { x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${photos.length * 1000}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 2. 가장 위에 있는 사진(DOM상 마지막 요소)부터 순서대로 날아가도록 배열을 뒤집음
      const reversedPhotos = [...photos].reverse();

      reversedPhotos.forEach((photo, index) => {
        // 오른쪽(1), 왼쪽(-1) 번갈아가며 날아가기
        const dir = index % 2 === 0 ? 1 : -1;

        tl.to(photo, {
          x: dir * window.innerWidth * 1.2,
          rotation: dir * 45, // 날아갈 때 회전 효과 추가
          ease: "power2.inOut",
          duration: 1,
          force3D: true,
        });
      });
    }, sectionRef);

    const refreshLater = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    const onImgLoad = () => refreshLater();

    photos.forEach((img) => img.addEventListener("load", onImgLoad));
    window.addEventListener("load", refreshLater);

    refreshLater();

    return () => {
      photos.forEach((img) => img.removeEventListener("load", onImgLoad));
      window.removeEventListener("load", refreshLater);
      ctx.revert();
    };
  }, []);

  return (
    <section className="mylife" ref={sectionRef}>
      <div className="mylife-inner">
        <div className="mylife-top">
          <Top
            caption="Introduce"
            title="My Life"
            text={"저의 일상을 소개해드릴게요.\n일상속 뜻갚은 시간을 담았어요!"}
          />
        </div>

        <div className="background-text">
          <p>
            I Love my life and I Always <br /> Want to be happy
          </p>
        </div>

        <div className="polaroid-stack">
          {[photo04, photo03, photo02, photo01].map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              className="polaroid"
              ref={(el) => (photosRef.current[index] = el)}
              style={{
                width: "33rem",
                maxWidth: "600px",
                willChange: "transform",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mylife;
