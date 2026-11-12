import { Button } from '../../core/Button/Button';
import { IconSurface } from '../../core/Icon/IconSurface';
import styles from './DeploymentPlans.module.scss';

const IMG = '/images/product/pricing';

const PLANS = [
  {
    title: '온프레미스 구축형',
    tag: '관제센터 권장, 망분리 환경',
    glyph: 'glyph_onpremise.svg',
    features: [
      '기관 서버 직접 설치 · 완전 폐쇄망 운용',
      '영상 · 이력 전량 기관 내부 잔류',
      '외부 통신 없는 오프라인 라이선스',
      '연간 라이선스 + 유지보수 또는 영구 라이선스',
    ],
    cta: '도입 상담',
    featured: true,
  },
  {
    title: '클라우드 Enterprise',
    tag: '인터넷 환경',
    glyph: 'glyph_cloud.svg',
    features: [
      '기관 전용 공간 · 구축비 없이 개통',
      '처리량 기반 과금 · 실행 전 승인 절차',
      'Block Public Access · presigned URL(15분)',
      '월 단위 계약 · 온프레미스 전환 가능',
    ],
    cta: '도입 상담',
    featured: false,
  },
  {
    title: 'API 시스템 연동',
    tag: '기존 시스템 연동',
    glyph: 'glyph_api.svg',
    features: [
      '표준 REST API 제공',
      '기존 업무 시스템에 비식별 기능 연동',
      '정기적인 처리 작업 자동화',
      '연동 범위는 시스템 환경 확인 후 안내',
    ],
    cta: '기술 · API 문의',
    featured: false,
  },
];

const POC_FEATURES = [
  '기관 실제 영상으로 탐지율 · 품질 검증',
  '2~3주 · 비용 없음',
  '검증 결과 리포트 제공 (탐지율 · 처리 시간)',
  '종료 후 PoC 환경 완전 파기',
];

function CheckItem({ text }: { text: string }) {
  return (
    <li className={styles.checkItem}>
      <span className={styles.checkMark} aria-hidden="true">✓</span>
      <span>{text}</span>
    </li>
  );
}

/**
 * 도입 방식 카드 4종 (구축형 · 클라우드 · API 연동 + PoC 무상 검증)
 * Figma PC 2156:30157 · MO 2156:31242 — 제품 가격 페이지와 메인에서 공통으로 사용하는 서비스 공통 패턴
 */
export const DeploymentPlans = () => (
  <div className={styles.deployWrap}>
    <div className={styles.planCards}>
      {PLANS.map((plan) => (
        <div key={plan.title} className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}>
          <div className={styles.planHead}>
            <IconSurface src={`${IMG}/${plan.glyph}`} size={48} sizeMo={40} tone="soft" glyphFit="fill" />
            <div className={styles.planTitleGroup}>
              <h3 className={styles.planTitle}>{plan.title}</h3>
              <span className={styles.planTag}>{plan.tag}</span>
            </div>
          </div>
          <p className={styles.planPrice}>별도 견적</p>
          <ul className={styles.checkList}>
            {plan.features.map((feature) => <CheckItem key={feature} text={feature} />)}
          </ul>
          <Button
            variant={plan.featured ? 'solid' : 'subtle'}
            bordered={!plan.featured}
            size="xl"
            className={styles.fullButton}
          >
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>

    {/* PoC · 도입 전 사전 검증 (Figma 2156:30254) */}
    <div className={styles.pocCard}>
      <div className={styles.planHead}>
        <IconSurface src={`${IMG}/glyph_poc.svg`} size={48} sizeMo={40} tone="soft" glyphFit="fill" />
        <div className={styles.planTitleGroup}>
          <h3 className={styles.planTitle}>PoC 무상 검증</h3>
          <span className={styles.planTag}>도입 전 사전 검증 · 무상</span>
        </div>
      </div>
      <ul className={`${styles.checkList} ${styles.pocList}`}>
        {POC_FEATURES.map((feature) => <CheckItem key={feature} text={feature} />)}
      </ul>
      <Button variant="subtle" bordered size="xl" className={styles.pocButton}>
        PoC 신청
      </Button>
    </div>
  </div>
);
