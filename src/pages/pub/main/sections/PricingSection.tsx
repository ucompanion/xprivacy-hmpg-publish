import { useState } from 'react';
import { BasicSection } from '../../../../components/domain/Section';
import styles from './PricingSection.module.scss';

type PlanId = 'cloud' | 'onpremise';

const PLANS: { id: PlanId; title: string; summary: string; desc: string; points: string[] }[] = [
  {
    id: 'cloud',
    title: '클라우드형',
    summary: '빠른 도입 · 유연한 운영',
    desc: '별도의 구축 부담을 줄이고 빠르게 xPrivacy를 시작할 수 있습니다.',
    points: ['별도 인프라 구축 부담을 줄인 빠른 도입', '서비스 업데이트를 통한 지속적인 기능 개선', '사용 환경에 따라 유연한 운영'],
  },
  {
    id: 'onpremise',
    title: '구축형',
    summary: '전용 환경 · 조직 정책에 맞춘 구성',
    desc: '조직의 인프라와 보안 정책에 맞춰 전용 환경으로 구축할 수 있습니다.',
    points: ['내부 인프라 및 보안 정책에 맞춘 구축', '사내 시스템과의 연동 구성 지원', '조직의 운영 정책에 맞춘 데이터 관리'],
  },
];

/**
 * 도입 방식 선택 (Figma PC 1928:879 · MO 1928:1387)
 * 라디오 카드: 카드 어디를 눌러도 선택되며 키보드 방향키로도 전환됩니다.
 */
export const PricingSection = () => {
  const [plan, setPlan] = useState<PlanId>('cloud');

  return (
    <BasicSection
      bg="white"
      align="center"
      className={styles.section}
      headerClassName={styles.header}
      titleClassName={styles.title}
      descriptionClassName={styles.description}
      title={
        <>
          <span className={styles.titleRegular}>운영 환경에 맞는</span>
          <br className={styles.moBr} /> 도입 방식을 선택하세요
        </>
      }
      description={
        <>
          조직의 인프라와 보안 정책에 따라 클라우드형<br className={styles.moBr} /> 또는 구축형 방식으로 도입할 수
          있습니다.
        </>
      }
    >
      <fieldset className={styles.cards}>
        <legend className={styles.legend}>도입 방식</legend>
        {PLANS.map((item) => {
          const checked = plan === item.id;
          return (
            <label key={item.id} className={`${styles.card} ${checked ? styles.cardChecked : ''}`}>
              <input
                type="radio"
                name="main-plan"
                value={item.id}
                checked={checked}
                onChange={() => setPlan(item.id)}
                className={styles.input}
              />
              <span className={styles.radio} aria-hidden="true" />
              <span className={styles.head}>
                <span className={`${styles.icon} ${styles[`icon_${item.id}`]}`} aria-hidden="true" />
                <span className={styles.headText}>
                  <strong className={styles.cardTitle}>{item.title}</strong>
                  <span className={styles.cardSummary}>{item.summary}</span>
                </span>
              </span>
              <span className={styles.cardDesc}>{item.desc}</span>
              <span className={styles.points}>
                {item.points.map((point) => (
                  <span key={point} className={styles.point}>
                    <span className={styles.check} aria-hidden="true" />
                    {point}
                  </span>
                ))}
              </span>
            </label>
          );
        })}
      </fieldset>
    </BasicSection>
  );
};
