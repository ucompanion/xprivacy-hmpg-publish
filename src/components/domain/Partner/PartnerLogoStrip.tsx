import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./PartnerLogoStrip.module.scss";

const IMG = "/images/product/intro";

/** 파트너·고객사 로고 (Figma Trust / Logo Strip 4213:65961) */
const PARTNERS = [
  {
    name: "강원 가명정보 활용지원센터",
    img: `${IMG}/partner_logo_01.png`,
    url: "https://www.data.gangwon.kr",
  },
  {
    name: "강원대학교",
    img: `${IMG}/partner_logo_02.png`,
    url: "https://www.kangwon.ac.kr",
  },
  {
    name: "한라대학교",
    img: `${IMG}/partner_logo_03.png`,
    url: "https://www.halla.ac.kr",
  },
  {
    name: "개인정보보호위원회",
    img: `${IMG}/partner_logo_04.png`,
    url: "https://www.pipc.go.kr",
  },
  {
    name: "티사이언티픽 (T SCIENTIFIC)",
    img: `${IMG}/partner_logo_05.png`,
    url: "http://www.tscientific.co.kr",
  },
  {
    name: "포소드 (POSOD)",
    img: `${IMG}/partner_logo_06.png`,
    url: "http://www.posod.co.kr",
  },
  {
    name: "한국인터넷진흥원 (KISA)",
    img: `${IMG}/partner_logo_07.png`,
    url: "https://www.kisa.or.kr",
  },
  {
    name: "영신디앤씨 (YoungShine D&C)",
    img: `${IMG}/partner_logo_08.png`,
    url: "https://www.youngshine.co.kr",
  },
  {
    name: "쏘카 (SOCAR)",
    img: `${IMG}/partner_logo_09.png`,
    url: "https://www.socar.kr",
    wide: true,
  },
];

/**
 * 파트너 로고 띠. 1024px 이하에서는 한 줄 가로 슬라이드(마우스 드래그 지원).
 * 모바일(768px 이하)은 로고가 끊김 없이 자동으로 흐르고(무한 마키), 손으로 밀어 넘길 수도 있다.
 * 터치·드래그 중에는 멈추고 1.5초 뒤 다시 흐른다. 모션 줄이기 설정에서는 자동으로 흐르지 않는다.
 * 여러 화면에서 같은 로고·문구가 반복되는 서비스 공통 패턴이라 도메인 컴포넌트로 둔다.
 */
const MARQUEE_SPEED = 30; // px/s
const RESUME_DELAY = 1500; // ms

export function PartnerLogoStrip() {
  const [marquee, setMarquee] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setMarquee(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // 로고 목록을 3벌 이어 붙이고 가운데 벌 구간(period) 안에서만 위치를 유지한다.
  useEffect(() => {
    const el = listRef.current;
    if (!marquee || !el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = el.querySelectorAll<HTMLElement>("a");
    const period = items[PARTNERS.length].offsetLeft - items[0].offsetLeft;
    let pos = period;
    let last = performance.now();
    let lastUser = 0;
    let touching = false;
    let raf = 0;
    el.scrollLeft = pos;

    const wrap = () => {
      if (el.scrollLeft >= period * 2) el.scrollLeft -= period;
      else if (el.scrollLeft < period) el.scrollLeft += period;
      pos = el.scrollLeft;
    };

    const onScroll = () => {
      if (Math.abs(el.scrollLeft - pos) > 1.5) {
        lastUser = performance.now();
        wrap();
      }
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      lastUser = performance.now();
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      // 사용자가 밀어서 옮긴 위치(스크롤 이벤트 누락 포함)를 현재 위치로 받아들인다.
      if (Math.abs(el.scrollLeft - pos) > 1.5) {
        lastUser = now;
        wrap();
      }
      if (
        !reduced &&
        !touching &&
        !dragging.current &&
        now - lastUser > RESUME_DELAY
      ) {
        pos += (MARQUEE_SPEED * dt) / 1000;
        if (pos >= period * 2) pos -= period;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [marquee]);

  const onMouseDown = (e: MouseEvent) => {
    const el = listRef.current;
    if (!el) return;
    dragging.current = true;
    moved.current = false;
    startX.current = e.pageX - el.offsetLeft;
    startScroll.current = el.scrollLeft;
  };

  const onMouseMove = (e: MouseEvent) => {
    const el = listRef.current;
    if (!dragging.current || !el) return;
    const walk = e.pageX - el.offsetLeft - startX.current;
    if (Math.abs(walk) > 4) moved.current = true;
    el.scrollLeft = startScroll.current - walk;
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  const onLinkClick = (e: MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      moved.current = false;
    }
  };

  return (
    <section className={styles.strip} aria-label="주요 파트너 및 고객사">
      <div
        ref={listRef}
        className={styles.list}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {(marquee ? [0, 1, 2] : [0]).flatMap((copy) =>
          PARTNERS.map((p) => (
            <a
              key={`${copy}-${p.name}`}
              {...(copy > 0 ? { "aria-hidden": true, tabIndex: -1 } : {})}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${p.wide ? styles.wide : ""}`.trim()}
              title={`${p.name} 공식 홈페이지 (새 창에서 열림)`}
              {...(copy === 0
                ? { "aria-label": `${p.name} (새 창에서 열림)` }
                : {})}
              onClick={onLinkClick}
            >
              <img
                src={p.img}
                alt={p.name}
                className={styles.logo}
                loading="lazy"
                draggable={false}
              />
            </a>
          )),
        )}
      </div>
    </section>
  );
}
