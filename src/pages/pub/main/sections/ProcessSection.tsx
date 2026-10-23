import React, { useEffect, useRef, useState } from 'react';
import { BasicSection } from '../../../../components/domain/Section';
import styles from './ProcessSection.module.scss';

const POINTS = [
  { icon: 'process_point_detect', text: '개인정보를 자동으로 찾습니다.' },
  { icon: 'process_point_protect', text: '선택한 방식으로 보호합니다.' },
  { icon: 'process_point_result', text: '처리 결과를 한눈에 보여줍니다.' },
  { icon: 'process_point_manage', text: '작업 내역을 이어서 관리합니다.' },
];

const STEPS = [
  { icon: 'process_upload', title: '업로드', desc: '영상·이미지 작업 대상 등록' },
  { icon: 'process_detect', title: 'AI 탐지', desc: '얼굴·사람·번호판 등 개인정보 대상 탐지' },
  { icon: 'process_deid', title: '비식별 처리', desc: '대상과 정책에 맞는 보호 방식 적용' },
  { icon: 'process_review', title: '검수', desc: '필요한 대상만 확인·조정' },
  { icon: 'process_manage', title: '결과 관리', desc: '처리 결과와 이력을 확인·관리' },
];

const STEP_MS = 2200;

/**
 * AI 탐지 → 사용자 검수 흐름 (Figma PC 1928:611 · MO 1928:1127)
 * 화면에 들어오면 단계가 차례로 진행되고(연결선 채움), 단계에 마우스를 올리거나 누르면 그 단계로 이동합니다.
 */
export const ProcessSection = () => {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const cardRef = useRef<HTMLOListElement>(null);

  // 카드가 화면에 보일 때만 진행
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setTimeout(() => setActive((prev) => (prev + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, running]);

  return (
    <BasicSection
      bg="white"
      layout="horizontal"
      className={styles.section}
      contentClassName={styles.layout}
      headerClassName={styles.header}
      descriptionClassName={styles.description}
      title={
        <>
          <span className={styles.titleRegular}>AI가 먼저 탐지하고</span>
          <br />
          사용자가 최종 검수합니다
        </>
      }
      description={
        <>
          반복적인 대상 탐지는 AI가 먼저 수행합니다.
          <br className={styles.pcBr} /> 탐지 결과를 확인하고 필요한 영역을 검수 및 조정하세요.
        </>
      }
      headerExtra={
        <ul className={styles.points}>
          {POINTS.map((point) => (
            <li key={point.text} className={styles.point}>
              <span className={styles.pointIcon}>
                <img src={`/images/main/icons/${point.icon}.svg`} alt="" width={20} height={20} />
              </span>
              {point.text}
            </li>
          ))}
        </ul>
      }
    >
      <ol
        ref={cardRef}
        className={`${styles.card} ${running ? styles.running : ''}`}
        style={{ '--step-ms': `${STEP_MS}ms` } as React.CSSProperties}
        aria-label="처리 단계"
      >
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className={`${styles.step} ${index === active ? styles.stepActive : ''} ${index < active ? styles.stepDone : ''}`}
          >
            <button
              type="button"
              className={styles.stepButton}
              aria-current={index === active ? 'step' : undefined}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className={styles.stepIcon}>
                <img src={`/images/main/icons/${step.icon}.svg`} alt="" width={20} height={20} />
              </span>
              <span className={styles.stepText}>
                <strong className={styles.stepTitle}>{step.title}</strong>
                <span className={styles.stepDesc}>{step.desc}</span>
              </span>
            </button>
            {index < STEPS.length - 1 && (
              <span className={styles.connector} aria-hidden="true">
                <span className={styles.connectorFill} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </BasicSection>
  );
};
