import React, { useState } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './privacy-engine.module.scss';

const ORIGINAL_FACE_IMG = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80';
const VIRTUAL_FACE_IMG = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';

const FACE_CARDS = [
  {
    type: 'original',
    num: 'ORIGINAL',
    title: '원본',
    desc: '',
    img: ORIGINAL_FACE_IMG,
  },
  {
    type: 'masking',
    num: '01',
    title: 'Masking',
    desc: '영상 분석과 안전성을 극대화한 비식별화 방식',
    img: ORIGINAL_FACE_IMG,
  },
  {
    type: 'mosaic',
    num: '02',
    title: 'Mosaic',
    desc: '가장 널리 사용되는 대중적인 비식별 기법',
    img: ORIGINAL_FACE_IMG,
  },
  {
    type: 'blur',
    num: '03',
    title: 'Gaussian Blur',
    desc: '영상 이질감을 최소화하는 자연스러운 비식별 처리',
    img: ORIGINAL_FACE_IMG,
  },
  {
    type: 'virtualFace',
    num: '04',
    title: 'Virtual Face',
    desc: '완전 비가역적 가상 얼굴을 생성하여 데이터 가치와 보안을 동시 확보',
    img: VIRTUAL_FACE_IMG,
  },
];

const MATRIX_DATA = [
  { target: '얼굴', options: ['Masking', 'Mosaic', 'Blur', 'Virtual Face'] },
  { target: '신체', options: ['Masking', 'Mosaic', 'Blur'] },
  { target: '번호판', options: ['Masking', 'Mosaic', 'Blur'] },
];

const EFFECT_ITEMS = [
  { num: '01', title: 'All-in-One 시스템 아키텍처 지원' },
  { num: '02', title: '다양한 목적별 맞춤 비식별 제공' },
  { num: '03', title: '데이터의 가치와 안전성 동시 구현' },
];

export default function PubSubTechnologyPrivacyEngine() {
  const [maskRadius, setMaskRadius] = useState(40);
  const [blurStrength, setBlurStrength] = useState(75);

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          className={styles.techHero}
          align="left"
          bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
          eyebrow="MULTI-STYLE DE-IDENTIFICATION"
          title={
            <>
              사용 목적과 가이드라인에<br />
              맞춘 최적의 비식별 스타일 제공
            </>
          }
          description={
            <>
              단순 블러 처리를 넘어서 연구 목적, 보안 요구 수준, 법적 기준에 부합하는<br className="desktop-only" />
              {' '}최적의 비식별화 방식을 선택하고 가공 강도를 정밀하게 조절할 수 있습니다.
            </>
          }
        />

        {/* Section 1: 4종 비식별 옵션 (bg="white") */}
        <BasicSection
          className={styles.optionsSection}
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="DETECTION & TRACKING"
          title={
            <>
              객체 크기 무관 일관된 강도,<br />
              적정성을 준수하는 4종 비식별 옵션
            </>
          }
          description="객체 크기나 화각에 상관없이 정밀한 가명·익명처리를 보장하며, 가명정보 가이드라인을 준수하는 4종의 비식별화 기술을 제공합니다."
        >
          <div className={styles.faceCardsGrid}>
            {FACE_CARDS.map((card) => (
              <div key={card.num} className={styles.faceCard}>
                <div 
                  className={styles.cardImgWrap}
                  style={{ backgroundImage: `url(${card.img})` }}
                >
                  {card.type === 'masking' && <div className={styles.maskingOverlay} />}
                  {card.type === 'mosaic' && <div className={styles.mosaicOverlay} />}
                  {card.type === 'blur' && <div className={styles.blurOverlay} />}
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardNum}>{card.num}</span>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  {card.desc && <p className={styles.cardDesc}>{card.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </BasicSection>

        {/* Section 2: ALL-IN-ONE SOLUTION (bg="gray") */}
        <BasicSection
          className={styles.allInOneSection}
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="ALL-IN-ONE SOLUTION"
          title={
            <>
              서드파티 편집 프로그램이나 별도 툴 없이,<br />
              단 하나의 솔루션에서 모든 비식별 가공을 원스톱 해결
            </>
          }
        >
          <div className={styles.solutionGrid}>
            {/* Card 1: 10가지 비식별 옵션 제공 */}
            <div className={styles.solutionCard}>
              <span className={styles.cardNum}>01</span>
              <h3 className={styles.cardTitle}>10가지 비식별 옵션 제공</h3>
              <p className={styles.cardDesc}>
                얼굴, 전신, 번호판 등 다양한 타겟 객체에 마스킹, 모자이크, 블러, 가상 얼굴 등 
                총 10가지 세분화된 비식별 옵션을 제공합니다.
              </p>

              <div className={styles.matrixTableWrap}>
                {MATRIX_DATA.map((row) => (
                  <div key={row.target} className={styles.matrixRow}>
                    <span className={styles.rowTarget}>{row.target}</span>
                    <div className={styles.rowChips}>
                      {row.options.map((opt) => (
                        <span key={opt} className={styles.chip}>{opt}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: 비식별 강도 조절 */}
            <div className={styles.solutionCard}>
              <span className={styles.cardNum}>02</span>
              <h3 className={styles.cardTitle}>비식별 강도 조절</h3>
              <p className={styles.cardDesc}>
                가이드라인 및 연구 목적에 따라 마스킹 반경 및 블러/모자이크 강도를
                슬라이더 컨트롤을 통해 직관적으로 조절할 수 있습니다.
              </p>

              <div className={styles.sliderControlWrap}>
                {/* Slider 1: 마스킹 반경 조절 */}
                <div className={styles.sliderItem}>
                  <div className={styles.sliderHeader}>
                    <span className={styles.sliderLabel}>마스킹 반경 조절</span>
                    <span className={styles.sliderValue}>{maskRadius}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={maskRadius}
                    onChange={(e) => setMaskRadius(Number(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>

                {/* Slider 2: 블러 강도 */}
                <div className={styles.sliderItem}>
                  <div className={styles.sliderHeader}>
                    <span className={styles.sliderLabel}>블러 강도</span>
                    <span className={styles.sliderValue}>{blurStrength}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={blurStrength}
                    onChange={(e) => setBlurStrength(Number(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* Section 3: 도입효과 (bg="white") */}
        <BasicSection
          className={styles.effectsSection}
          bg="white"
          layout="vertical"
          align="left"
          title="도입효과"
        >
          <div className={styles.effectsGrid}>
            {EFFECT_ITEMS.map((item) => (
              <div key={item.num} className={styles.effectItem}>
                <span className={styles.num}>{item.num}</span>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </BasicSection>

        {/* Section 4: Bottom CTA */}
        <ProductCta />

      </div>
    </FrontLayout>
  );
}
