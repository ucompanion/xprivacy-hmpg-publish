import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './aos.scss';
import { AOS_CONFIG } from './aos.config';

/** 블록 안에서 가로로 나란한 카드 그룹을 찾아 카드 목록을 돌려준다. (깊이 4까지, 그룹 안쪽은 더 내려가지 않음) */
function findCardGroups(block: HTMLElement): HTMLElement[][] {
  const { minWidth, minHeight } = AOS_CONFIG.cards;
  const groups: HTMLElement[][] = [];

  const visit = (node: HTMLElement, depth: number) => {
    if (depth > 4 || node.matches(AOS_CONFIG.skipSelector)) return;
    const kids = [...node.children].filter((c): c is HTMLElement => c instanceof HTMLElement);
    const cs = window.getComputedStyle(node);
    const sideBySide =
      (cs.display === 'grid' && cs.gridTemplateColumns.trim().split(/\s+/).length > 1) ||
      (cs.display === 'flex' && cs.flexDirection.startsWith('row'));
    if (sideBySide && kids.length >= 2 && kids.length <= 6) {
      const isCard = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.width >= minWidth && r.height >= minHeight;
      };
      if (kids.every(isCard)) {
        groups.push(kids);
        return;
      }
    }
    kids.forEach((k) => visit(k, depth + 1));
  };

  visit(block, 0);
  return groups;
}

/**
 * 스크롤 시 섹션 컨텐츠가 올라오는 효과를 부여한다. (설정: aos.config.ts)
 * 섹션 배경은 고정하고 컨텐츠만 움직인다.
 * 공통 Section 컴포넌트는 헤더·본문 래퍼에 속성을 전달하지 않으므로 마운트 후 부여한다.
 */
export function useScrollAos() {
  const { pathname } = useLocation();

  // 첫 페인트 전에 부여해야 컨텐츠가 한 번 보였다가 사라지는 깜빡임이 없다.
  useLayoutEffect(() => {
    if (AOS_CONFIG.excludePaths.some((p) => pathname.startsWith(p))) return;

    const root = document.documentElement.style;
    root.setProperty('--aos-distance', `${AOS_CONFIG.distance}rem`);
    root.setProperty('--hero-distance', `${AOS_CONFIG.hero.distance}rem`);
    root.setProperty('--hero-duration', `${AOS_CONFIG.hero.duration}ms`);
    root.setProperty('--hero-delay', `${AOS_CONFIG.hero.staggerDelay}ms`);

    const staggered = new Set<HTMLElement>();

    // 중첩 섹션은 제외하고, 자체 모션 섹션(data-aos-skip)은 건너뛴다.
    const sections = [...document.querySelectorAll<HTMLElement>(AOS_CONFIG.sectionSelector)].filter(
      (sec) => !sec.parentElement?.closest('section'),
    );
    sections.forEach((sec, idx) => {
      if (sec.matches(AOS_CONFIG.skipSelector)) return;
      // 첫 섹션(히어로)은 스크롤 효과 대신 로드 시 히어로 효과를 적용한다.
      if (idx === 0) {
        sec.querySelectorAll<HTMLElement>(AOS_CONFIG.contentSelector).forEach((el, i) => {
          el.classList.add('hero-fade-up');
          if (i > 0) el.classList.add('hero-fade-up--late');
        });
        return;
      }
      sec.querySelectorAll<HTMLElement>(AOS_CONFIG.contentSelector).forEach((el, i) => {
        el.setAttribute('data-aos', 'fade-up');
        if (AOS_CONFIG.staggerDelay && i % 2 === 1) {
          el.setAttribute('data-aos-delay', String(AOS_CONFIG.staggerDelay));
        }
        // 카드 그룹: 블록이 올라오는 동안 카드가 차례로 나타난다.
        findCardGroups(el).forEach((cards) =>
          cards.forEach((card, ci) => {
            card.setAttribute('data-aos', 'fade');
            const delay = Math.min(ci, AOS_CONFIG.cards.max) * AOS_CONFIG.cards.step;
            if (delay) card.setAttribute('data-aos-delay', String(delay));
            staggered.add(card);
          }),
        );
      });
    });

    // AOS 가 카드에 남기는 transition 규칙이 카드 자체의 hover 전환을 덮지 않도록, 등장이 끝나면 AOS 속성을 걷어낸다.
    const timers: number[] = [];
    const onIn = (e: Event) => {
      const node = (e as CustomEvent<HTMLElement>).detail;
      if (!staggered.has(node)) return;
      const delay = Number(node.getAttribute('data-aos-delay') ?? 0);
      timers.push(
        window.setTimeout(() => {
          node.removeAttribute('data-aos');
          node.removeAttribute('data-aos-delay');
          node.classList.remove('aos-init', 'aos-animate');
        }, AOS_CONFIG.duration + delay + 50),
      );
    };
    document.addEventListener('aos:in', onIn);

    AOS.init({
      duration: AOS_CONFIG.duration,
      easing: AOS_CONFIG.easing,
      offset: AOS_CONFIG.offset,
      once: AOS_CONFIG.once,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });

    return () => {
      document.removeEventListener('aos:in', onIn);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);
}
