import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/core/Button/Button';
import styles from './HeroSection.module.scss';

interface HeroSlide {
  id: 'detect' | 'workflow' | 'virtual' | 'deploy';
  /** dark: 어두운 사진 위 흰 글자 / light: 밝은 사진 위 검정 글자 + Secondary 테두리 */
  tone: 'dark' | 'light';
  title: React.ReactNode;
  description: React.ReactNode;
}

/* PC 전용 줄바꿈(pcBr) · 모바일 전용 줄바꿈(moBr) — 시안 줄바꿈 위치 그대로 */
const SLIDES: HeroSlide[] = [
  {
    id: 'detect',
    tone: 'dark',
    title: (
      <>
        <span className={styles.titleRegular}>
          복잡한 영상 속<br className={styles.moBr} /> 개인정보
        </span>
        <br />
        AI로 탐지하고<br className={styles.moBr} /> 보호합니다
      </>
    ),
    description: (
      <>
        xPrivacy는 영상과 이미지 속 얼굴, 사람, 차량 번호판 등<br className={styles.pcBr} /> 식별 가능한 대상을 AI로 탐지하고
        비식별화합니다.
      </>
    ),
  },
  {
    id: 'workflow',
    tone: 'light',
    title: (
      <>
        <span className={styles.titleRegular}>영상 비식별 작업</span>
        <br />
        탐지부터 검수까지<br className={styles.moBr} /> 이어집니다
      </>
    ),
    description: (
      <>
        탐지 결과를 확인하고, 처리 구간과 효과를<br className={styles.moBr} /> 조정한 뒤 결과를 검수합니다.
      </>
    ),
  },
  {
    id: 'virtual',
    tone: 'dark',
    title: (
      <>
        <span className={styles.titleRegular}>
          가상얼굴로<br className={styles.moBr} /> 영상 활용의
        </span>
        <br />
        가능성을 넓히세요
      </>
    ),
    description: (
      <>
        가상 얼굴 변환 방식을 살펴보고,
        <br />
        활용 목적에 맞는 처리 방법을 선택하세요.
      </>
    ),
  },
  {
    id: 'deploy',
    tone: 'light',
    title: (
      <>
        <span className={styles.titleRegular}>운영 환경에 맞는</span>
        <br />
        도입 방식을<br className={styles.moBr} /> 선택하세요
      </>
    ),
    description: (
      <>
        조직의 보안 정책과 운영 환경을 고려해
        <br />
        클라우드형 또는 구축형을 검토할 수 있습니다.
      </>
    ),
  },
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;

/** 슬라이드별 사진 위 연출 요소 (탐지 박스 · 블러 영역) */
const SlideDecor = ({ id }: { id: HeroSlide['id'] }) => {
  if (id === 'detect') {
    return (
      <>
        <span className={styles.trackFrame}>
          <i /><i /><i /><i />
        </span>
        <span className={`${styles.glass} ${styles.glassFace}`} />
        <span className={`${styles.glass} ${styles.glassPlate}`} />
      </>
    );
  }
  if (id === 'workflow') {
    return (
      <>
        <span className={`${styles.detectBox} ${styles.detectBoxActive}`} />
        <span className={`${styles.detectBox} ${styles.detectBoxProcessed}`} />
      </>
    );
  }
  return null;
};

/**
 * 메인 비주얼 슬라이더 (Figma 1785:218 · PC 1785:219/441/522/603 · MO 1785:302/495/576/657)
 * 자동 재생(6초) · 마우스 오버/포커스 시 일시정지 · 이전/다음 · 인디케이터 · 터치 스와이프
 */
export const HeroSection = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  /** 직전 슬라이드: 새 슬라이드 아래에 남겨 두어 줌·화면이 끊기지 않게 함 */
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const total = SLIDES.length;
  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      if (next === current) return;
      setLeaving(current);
      setCurrent(next);
    },
    [current, total],
  );
  const goPrev = () => goTo(current - 1);
  const goNext = useCallback(() => goTo(current + 1), [goTo, current]);

  // 자동 재생: 슬라이드가 바뀔 때마다 타이머를 새로 시작 (수동 이동 직후 바로 넘어가지 않도록)
  useEffect(() => {
    if (paused) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const timer = window.setTimeout(goNext, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [current, paused, goNext]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="메인 비주얼"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartX.current = null;
      }}
      onKeyDown={handleKeyDown}
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        const isLeaving = index === leaving && !isActive;
        return (
          <div
            key={slide.id}
            className={`${styles.slide} ${styles[`slide_${slide.id}`]} ${styles[`tone_${slide.tone}`]} ${isActive ? styles.active : ''} ${isLeaving ? styles.leaving : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${total}`}
            aria-hidden={!isActive}
            inert={!isActive}
          >
            <div className={styles.media} aria-hidden="true">
              <div className={styles.photo}>
                <SlideDecor id={slide.id} />
              </div>
            </div>
            <div className={styles.overlay} aria-hidden="true" />

            <div className={styles.content}>
              <div className={styles.heading}>
                {index === 0 ? (
                  <h1 className={styles.title}>{slide.title}</h1>
                ) : (
                  <p className={styles.title}>{slide.title}</p>
                )}
                <p className={styles.description}>{slide.description}</p>
              </div>
              <div className={styles.actions}>
                <Button
                  variant="solid"
                  color="primary"
                  size="xl"
                  className={styles.actionButton}
                  onClick={() => void navigate('/pub/contact/inquiry')}
                >
                  도입 문의하기
                </Button>
                <Button
                  variant="subtle"
                  size="xl"
                  bordered={slide.tone === 'light'}
                  className={styles.actionButton}
                  onClick={() => void navigate('/pub/demo/demo')}
                >
                  데모 체험하기
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={goPrev} aria-label="이전 슬라이드">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 2.5L4.5 8L10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className={styles.dots}>
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
              onClick={() => goTo(index)}
              aria-label={`${index + 1}번 슬라이드`}
              aria-current={index === current}
            />
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={goNext} aria-label="다음 슬라이드">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 2.5L11.5 8L6 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};
