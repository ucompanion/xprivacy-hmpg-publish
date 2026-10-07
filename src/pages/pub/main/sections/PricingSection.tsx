import { useState } from 'react';
import styles from './PricingSection.module.scss';

export const PricingSection = () => {
  const [activePlan, setActivePlan] = useState<'cloud' | 'onpremise'>('cloud');

  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>운영 환경에 맞는<br />도입 방식을 선택하세요</h2>
          <p className={styles.subtitle}>
            고객의 IT 인프라와 보안 정책에 최적화된 두 가지 솔루션 모델을 제공합니다.
          </p>
        </div>

        <div className={styles.cards}>
          {/* 클라우드형 카드 */}
          <div 
            className={`${styles.card} ${activePlan === 'cloud' ? styles.active : ''}`}
            onClick={() => setActivePlan('cloud')}
          >
            <div className={styles.card_header}>
              <div className={styles.icon_wrapper_cloud}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.card_title_area}>
                <h3 className={styles.card_title}>클라우드형</h3>
                <p className={styles.card_desc}>초기 비용 없이 간편하게 시작</p>
              </div>
              <div className={styles.radio_circle}>
                {activePlan === 'cloud' && <div className={styles.radio_inner}></div>}
              </div>
            </div>
            
            <ul className={styles.feature_list}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)"><path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                초기 인프라 구축 비용 최소화
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)"><path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                항상 최신 AI 모델 자동 업데이트
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)"><path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                사용한 만큼 과금되는 합리적 요금
              </li>
            </ul>
          </div>

          {/* 구축형 카드 */}
          <div 
            className={`${styles.card} ${activePlan === 'onpremise' ? styles.active : ''}`}
            onClick={() => setActivePlan('onpremise')}
          >
            <div className={styles.card_header}>
              <div className={styles.icon_wrapper_onpremise}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.card_title_area}>
                <h3 className={styles.card_title}>구축형</h3>
                <p className={styles.card_desc}>강력한 내부 보안 정책 준수</p>
              </div>
              <div className={styles.radio_circle}>
                {activePlan === 'onpremise' && <div className={styles.radio_inner}></div>}
              </div>
            </div>
            
            <ul className={styles.feature_list}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280"><path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                완벽한 내부 망 분리 환경 지원
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280"><path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                기존 시스템 연동 및 맞춤 커스터마이징
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280"><path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                고정 비용으로 무제한 영상 처리
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
