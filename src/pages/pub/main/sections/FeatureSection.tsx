import { useEffect, useRef, useState } from 'react';
import { BasicSection } from '../../../../components/domain/Section';
import styles from './FeatureSection.module.scss';

const FEATURES = [
  {
    icon: 'feature_detect',
    title: 'AI 자동 탐지',
    desc: (
      <>
        얼굴·사람·번호판 등 개인정보 대상을 AI가 자동으로 탐지하고,
        <br />
        비식별 처리할 대상을 빠르게 식별합니다.
      </>
    ),
  },
  {
    icon: 'feature_deid',
    title: '비식별 처리',
    desc: (
      <>
        탐지된 얼굴·사람·번호판 등 개인정보 영역에
        <br />
        블러, 모자이크 등 비식별 처리를 적용합니다.
      </>
    ),
  },
  {
    icon: 'feature_review',
    title: '보안가이드 준수 여부 검토',
    desc: (
      <>
        비식별 처리 결과를 사용자가 직접 검수하고,
        <br />
        개인정보 보호 기준에 필요한 처리 여부를 확인할 수 있습니다.
      </>
    ),
  },
];

/* 탐지 박스 (스테이지 기준 · Figma 1928:784~813) — 화면에 들어오면 차례로 표시 */
const DETECTIONS = [
  { id: 'OBJ_1041', className: styles.obj1041 },
  { id: 'OBJ_1042', className: styles.obj1042 },
  { id: 'OBJ_1043', className: styles.obj1043 },
  { id: 'OBJ_1044', className: styles.obj1044 },
  { id: 'OBJ_1045', className: styles.obj1045 },
];

/**
 * 개인정보 보호 요구사항을 고려한 영상 비식별화 (Figma PC 1928:732 · MO 1928:1247)
 */
export const FeatureSection = () => {
  const visualRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <BasicSection
      bg="white"
      className={styles.section}
      descriptionClassName={styles.description}
      title={
        <>
          <span className={styles.titleRegular}>
            개인정보 보호 요구사항을<br className={styles.moBr} /> 고려한{' '}
          </span>
          영상 비식별화
        </>
      }
      description={
        <>
          개인정보가 포함된 영상을 활용할 때 필요한 탐지,
          <br className={styles.moBr} /> 비식별 처리, 사용자 검수 과정을 단계별로 지원합니다.
        </>
      }
    >
      <div className={styles.board}>
        <ul className={styles.list}>
          {FEATURES.map((item) => (
            <li key={item.title} className={styles.item}>
              <h3 className={styles.itemTitle}>
                <img src={`/images/main/icons/${item.icon}.svg`} alt="" width={20} height={20} />
                {item.title}
              </h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </li>
          ))}
        </ul>

        <div ref={visualRef} className={`${styles.visual} ${inView ? styles.inView : ''}`}>
          <div className={styles.stage} aria-hidden="true">
            {DETECTIONS.map((box) => (
              <span key={box.id} className={`${styles.detection} ${box.className}`}>
                <span className={styles.detectionTag}>DETECTED: {box.id}</span>
              </span>
            ))}
          </div>

          <dl className={styles.status}>
            <div className={styles.statusHead}>
              <dt>Detection Status</dt>
              <dd className={styles.statusState}>ANALYZING</dd>
            </div>
            <div className={styles.statusRows}>
              <div className={styles.statusRow}>
                <dt>Confidence</dt>
                <dd>98.5%</dd>
              </div>
              <div className={styles.statusRow}>
                <dt>Found Objects</dt>
                <dd>5 Targets</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </BasicSection>
  );
};
