import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './virtual-face-ai.module.scss';

const ORIGINAL_BEFORE_IMG = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80';
const VIRTUAL_AFTER_IMG = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80';

const DEMO_MALE_ORIGIN = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80';
const DEMO_MALE_SYNTH = 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80';

const DEMO_FEMALE_ORIGIN = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
const DEMO_FEMALE_SYNTH = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

const EFFECT_ITEMS = [
  { num: '01', title: '어색함 없는 고품질 비식별화 달성' },
  { num: '02', title: '법적·초상권 리스크 원천 차단' },
  { num: '03', title: '홍보·방송용 영상의 활용 가치 극대화' },
  { num: '04', title: '시청 몰입감을 방해하지 않는 디자인' },
];

export default function PubSubTechnologyVirtualFaceAi() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          className={styles.techHero}
          align="left"
          bgImage="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80"
          eyebrow="VIRTUAL FACE AI"
          title={
            <>
              초상권 걱정 없이 영상의 몰입감과<br />
              미관을 살리는 생성형 AI 비식별화
            </>
          }
          description={
            <>
              자체 개발 생성 AI 모델을 기반으로 자연스러운 가상 얼굴을 생성해<br className="desktop-only" />
              영상 고유의 맥락을 살리면서 원본 인물의 복원을 원천 차단하여<br className="desktop-only" />
              초상권 침해 리스크를 완벽 차단합니다.
            </>
          }
        />

        {/* Section 1: 신원은 보호하고... (bg="white", Horizontal) */}
        <BasicSection
          className={styles.identitySection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="VIRTUAL FACE AI"
          title={
            <>
              신원은 보호하고<br />
              자연스러운 얼굴 표현은 유지합니다
            </>
          }
          description="단순한 검은 박스나 흐릿한 블러 대신, 고품질 가상 얼굴을 합성하여 원본 영상의 몰입감과 자연스러움을 유지함과 동시에 완벽한 비식별화를 달성합니다."
          headerExtra={
            <div className={styles.featureBlockList}>
              <div className={styles.fBlock}>
                <h4>Natural Expression</h4>
                <p>자연스러운 표정 변화 및 시선 방향 완벽 유지</p>
              </div>
              <div className={styles.fBlock}>
                <h4>Security Guarantee</h4>
                <p>원본 복원 불가한 비가역적 보안성 제공</p>
              </div>
              <div className={styles.fBlock}>
                <h4>High-Quality Synthesis</h4>
                <p>고해상도 영상에서도 이질감 없는 자연스러운 합성</p>
              </div>
            </div>
          }
        >
          {/* Comparison Cards: Before & After */}
          <div className={styles.comparisonVisualWrap}>
            <div className={styles.compareCard}>
              <div 
                className={styles.imgArea} 
                style={{ backgroundImage: `url(${ORIGINAL_BEFORE_IMG})` }} 
              />
              <span className={`${styles.cardBadge} ${styles.before}`}>
                DE-IDENTIFYING (BEFORE)
              </span>
            </div>

            <div className={styles.compareArrow} aria-hidden="true">
              →
            </div>

            <div className={styles.compareCard}>
              <div 
                className={styles.imgArea} 
                style={{ backgroundImage: `url(${VIRTUAL_AFTER_IMG})` }} 
              />
              <span className={`${styles.cardBadge} ${styles.after}`}>
                VIRTUAL FACE (AFTER)
              </span>
            </div>
          </div>
        </BasicSection>

        {/* Section 2: 생성 AI 기술을 활용... (bg="gray", Horizontal Reverse) */}
        <BasicSection
          className={styles.generationSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          eyebrow="DE-IDENTIFICATION & RE-IDENTIFICATION"
          title={
            <>
              생성 AI 기술을 활용<br />
              가상 인물로 교체
            </>
          }
          description="독자적인 생성 AI 기술을 기반으로, 원본 인물의 포즈와 표정, 조명 환경을 그대로 반영하면서도 완전히 새로운 가상 인물의 얼굴로 자연스럽게 실시간 교체합니다."
          headerExtra={
            <div className={styles.featureBlockList}>
              <div className={styles.fBlock}>
                <h4>성별 및 연령 유지</h4>
                <p>원본 인물의 성별과 연령대, 피부 톤을 고려한 맞춤형 가상 얼굴 자동 생성</p>
              </div>
              <div className={styles.fBlock}>
                <h4>일관성 있는 표정 재현</h4>
                <p>말하거나 웃는 등 다양한 표정 변화를 어색함 없이 실시간 동기화</p>
              </div>
              <div className={styles.fBlock}>
                <h4>안정적 트랙 단위 연속성</h4>
                <p>영상 전체 프레임에서 동일 인물에 대해 일관된 가상 얼굴을 안정적으로 유지</p>
              </div>
            </div>
          }
        >
          {/* Demographic Demo Card */}
          <div className={styles.demoCard}>
            {/* Row 1: Male */}
            <div className={styles.demoRow}>
              <span className={`${styles.genderBadge} ${styles.male}`}>남성</span>
              
              <div className={styles.faceItem}>
                <div 
                  className={styles.faceThumb} 
                  style={{ backgroundImage: `url(${DEMO_MALE_ORIGIN})` }} 
                />
                <span className={styles.faceLabel}>원본</span>
              </div>

              <div className={styles.arrowDivider}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className={styles.faceItem}>
                <div 
                  className={styles.faceThumb} 
                  style={{ backgroundImage: `url(${DEMO_MALE_SYNTH})` }} 
                />
                <span className={styles.faceLabel}>가상 인물</span>
              </div>
            </div>

            {/* Row 2: Female */}
            <div className={styles.demoRow}>
              <span className={`${styles.genderBadge} ${styles.female}`}>여성</span>
              
              <div className={styles.faceItem}>
                <div 
                  className={styles.faceThumb} 
                  style={{ backgroundImage: `url(${DEMO_FEMALE_ORIGIN})` }} 
                />
                <span className={styles.faceLabel}>원본</span>
              </div>

              <div className={styles.arrowDivider}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className={styles.faceItem}>
                <div 
                  className={styles.faceThumb} 
                  style={{ backgroundImage: `url(${DEMO_FEMALE_SYNTH})` }} 
                />
                <span className={styles.faceLabel}>가상 인물</span>
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
