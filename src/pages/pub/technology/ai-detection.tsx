import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './ai-detection.module.scss';

const RECOGNITION_ITEMS = [
  {
    num: '01',
    title: '얼굴 및 이목구비 정밀 인식',
    description: '각도 회전, 안면 부분 가림, 마스크 등에 관계없이 높은 인식률 유지',
  },
  {
    num: '02',
    title: '신체 특징 및 윤곽 식별',
    description: '체형, 헤어스타일, 착장 스타일 등 전신 특징 식별(옵션)',
  },
  {
    num: '03',
    title: '차량 번호판 및 상표 차단',
    description: '이동 수단(차량/오토바이) 번호판 및 브랜드 상표 로고 자동 검출',
  },
];

const EFFECT_ITEMS = [
  {
    num: '01',
    title: '원본 증거 능력 보존',
    sub: 'Police & Investigation',
  },
  {
    num: '02',
    title: '고품질 연구 데이터 확보',
    sub: 'Medical & R&D',
  },
  {
    num: '03',
    title: '4K 고화질 미감 보존',
    sub: 'Public & Media',
  },
  {
    num: '04',
    title: '법적 리스크 최소화',
    sub: 'Compliance & Security',
  },
];

export default function PubSubTechnologyAiDetection() {
  const featureList = (
    <div className={styles.featureList}>
      <div className={styles.featureItem}>
        <h5>객체 타겟팅</h5>
        <p>
          얼굴은 직사각형/타원의 형태로 신체는 실루엣을 따라가는 전신 세그멘테이션으로 정밀하게 마스킹을 진행합니다.
        </p>
      </div>
      <div className={styles.featureItem}>
        <h5>화면손실 최소화</h5>
        <p>
          자사만의 정밀한 객체 검출기술을 통해 마스킹 영역의 확장을 최소화하여 영상의 전체 맥락과 원본성을 최대한 보존합니다.
        </p>
      </div>
    </div>
  );

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          className={styles.techHero}
          align="left"
          bgImage="/images/pub/technology/hero_ai_detection_clean.jpg"
          eyebrow="AI DETECTION"
          title={
            <>
              AI가 사소한 식별 요소까지<br />
              알아서 찾고, 정밀하게 가립니다
            </>
          }
          description={
            <>
              개인정보보호 지침을 이식한 AI가 이목구비부터 미세한 신체 특징, 번호판, 상표까지<br className="desktop-only" />
              {' '}마스킹 처리하여 안전하게 보호합니다.
            </>
          }
        />

        {/* Section 1: AI DATA (Horizontal layout: Left Text / Right Visual) */}
        <BasicSection
          className={styles.aiDataSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="AI DATA"
          title={
            <>
              객체의 위치와 형태를<br className="mobile-only" />
              {' '}픽셀 단위로 정밀하게 분석
            </>
          }
          description="개인정보보호 지침을 이식한 AI가 이목구비부터 미세한 신체 특징, 번호판, 상표까지 특정 부위로 정밀하게 매핑하여 안전하게 보호합니다."
          headerExtra={featureList}
        >
          <div className={styles.visualPanel}>
            <img
              src="/images/pub/technology/detection_compare_panel.png"
              alt="객체 위치 및 형태 정밀 분석 비교"
            />
          </div>
        </BasicSection>

        {/* 3 Recognition Cards */}
        <div className={styles.cardsSection}>
          <div className={styles.cardsContainer}>
            {RECOGNITION_ITEMS.map((item) => (
              <div key={item.num} className={styles.recCard}>
                <span className={styles.num}>{item.num}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 도입효과 (Vertical layout) */}
        <BasicSection
          className={styles.effectsSection}
          bg="gray"
          layout="vertical"
          align="left"
          title="도입효과"
        >
          <div className={styles.effectsGrid}>
            {EFFECT_ITEMS.map((item) => (
              <div key={item.num} className={styles.effectItem}>
                <span className={styles.num}>{item.num}</span>
                <h4>{item.title}</h4>
                <p className={styles.subText}>{item.sub}</p>
              </div>
            ))}
          </div>
        </BasicSection>

        {/* Bottom CTA Section */}
        <ProductCta
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 xPrivacy를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
          solidButtonText="무료 체험 시작"
          outlineButtonText="도입 문의"
        />

      </div>
    </FrontLayout>
  );
}
