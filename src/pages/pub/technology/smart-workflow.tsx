import React, { useState } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './smart-workflow.module.scss';

type MediaTab = 'IMAGE' | 'VIDEO';
type ModeTab = 'ORIGINAL' | 'DETECTION' | 'PROTECTED' | 'ALL FILTER';

const TECH_CARDS = [
  {
    tag: '01 SMART IMPORT',
    title: '스마트 오류 및 중복 필터링',
    desc: '영상 내 결함(손상 프레임, 암전 구간)을 자동으로 감지하고 정상 프레임만 선별하여 가공함으로써 전체적인 가공 시간을 단축하고 비식별 누락 리스크를 원천 차단합니다.',
  },
  {
    tag: '02 OBJECT DETECTION & TRACKING',
    title: '트래킹 오류 자동 감지 및 재추적',
    desc: '가림이나 교차 등으로 인해 트래킹이 끊기더라도 딥러닝 기반 Re-ID 엔진이 동일 인물 여부를 다시 추적하여 프레임 전반에 걸쳐 일관된 비식별 처리를 유지합니다.',
  },
  {
    tag: '03 QUALITY INSPECTION',
    title: '비식별 적정성 정밀 검증 및 품질 검수',
    desc: '비식별 조치된 영상 내 개인정보 잔존 여부를 AI가 2차 교차 검증하여, 미처리 영역이나 과도한 가공을 감지하고 이상 발생 시 즉각 알림 및 자동 재가공 프로세스를 지원합니다.',
  },
  {
    tag: '04 SECURE EXPORT & COMPLIANCE',
    title: '안전한 반출 및 자동 감사 기록 생성',
    desc: '비식별 가공이 완료된 영상은 변조 방지 해시코드와 함께 안전하게 암호화 반출되며, 작업자 정보와 처리 일시, 가공 파라미터가 포함된 공인 감사 로그를 자동 생성하여 컴플라이언스를 완벽히 충족합니다.',
  },
];

const EFFECT_ITEMS = [
  { num: '01', title: '수동 작업 리소스 단축' },
  { num: '02', title: '비전문가도 가능한 직관적 GUI' },
  { num: '03', title: '미처리/누락 없는 완벽한 보안성' },
  { num: '04', title: '단일 솔루션으로 반출까지 전 과정 해결' },
];

export default function PubTechnologySmartWorkflow() {
  const [mediaTab, setMediaTab] = useState<MediaTab>('VIDEO');
  const [modeTab, setModeTab] = useState<ModeTab>('PROTECTED');

  // Interactive Target Toggles
  const [targetFace, setTargetFace] = useState(true);
  const [targetBody, setTargetBody] = useState(true);
  const [targetPlate, setTargetPlate] = useState(true);

  // Interactive Privacy Method
  const [privacyMethod, setPrivacyMethod] = useState<'mosaic' | 'masking' | 'blur' | 'virtualFace'>('mosaic');
  const [strengthVal, setStrengthVal] = useState(65);

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          className={styles.techHero}
          align="left"
          bgImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80"
          eyebrow="SMART WORKFLOW"
          title={
            <>
              반입 한 번으로, 탐지부터 안전 반출까지<br />
              자동화된 대용량 파이프라인
            </>
          }
          description={
            <>
              대용량 영상도 반입 한 번으로 전처리, AI 정밀 객체 탐지, 비식별 가공,<br className="desktop-only" />
              품질 검수, 안전 반출까지 전 과정을 사람의 개입 없이 원스톱으로<br className="desktop-only" />
              자동 수행하는 올인원 워크플로우를 제공합니다.
            </>
          }
        />

        {/* Section 1: 하나의 화면에서... (bg="white", Vertical Center) */}
        <BasicSection
          className={styles.studioSection}
          bg="white"
          layout="vertical"
          align="center"
          eyebrow="INTERACTIVE STUDIO"
          title={
            <>
              하나의 화면에서 xPrivacy의<br />
              원스톱 스마트 비식별 워크플로우
            </>
          }
          description="복잡한 툴이나 추가 프로그램 설치 없이, 웹 브라우저 단 하나의 화면에서 직관적인 조작으로 원스톱 비식별 프로세스를 손쉽게 수행할 수 있습니다."
        >
          {/* Interactive Web Studio Editor Mockup */}
          <div className={styles.editorMockup}>
            {/* Top Toolbar */}
            <div className={styles.mockHeader}>
              <div className={styles.mediaTabs}>
                <button
                  type="button"
                  className={`${styles.mediaTabBtn} ${mediaTab === 'IMAGE' ? styles.active : ''}`}
                  onClick={() => setMediaTab('IMAGE')}
                >
                  IMAGE
                </button>
                <button
                  type="button"
                  className={`${styles.mediaTabBtn} ${mediaTab === 'VIDEO' ? styles.active : ''}`}
                  onClick={() => setMediaTab('VIDEO')}
                >
                  VIDEO
                </button>
              </div>

              <div className={styles.modeTabs}>
                {(['ORIGINAL', 'DETECTION', 'PROTECTED', 'ALL FILTER'] as ModeTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`${styles.modeTabBtn} ${modeTab === tab ? styles.active : ''}`}
                    onClick={() => setModeTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Body */}
            <div className={styles.mockBody}>
              {/* Left Viewer */}
              <div className={styles.viewerArea}>
                {modeTab !== 'ORIGINAL' && (
                  <>
                    {/* Person Bounding Box */}
                    {targetBody && (
                      <div className={styles.personBox}>
                        <span className={styles.tag}>Person 98%</span>
                        {modeTab === 'PROTECTED' && <div className={styles.protectedFilter} />}
                      </div>
                    )}

                    {/* Plate Bounding Box */}
                    {targetPlate && (
                      <div className={styles.plateBox}>
                        <span className={styles.tag}>Plate 99%</span>
                        {modeTab === 'PROTECTED' && <div className={styles.protectedFilter} />}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right Control Panel */}
              <div className={styles.panelArea}>
                {/* Group 1: Protection Target */}
                <div className={styles.controlGroup}>
                  <h5>Protection Target</h5>
                  <div className={styles.optList}>
                    <div 
                      className={`${styles.optRow} ${targetFace ? styles.active : ''}`}
                      onClick={() => setTargetFace(!targetFace)}
                    >
                      <span>Face</span>
                      <span className={`${styles.checkSquare} ${targetFace ? styles.checked : ''}`} />
                    </div>
                    <div 
                      className={`${styles.optRow} ${targetBody ? styles.active : ''}`}
                      onClick={() => setTargetBody(!targetBody)}
                    >
                      <span>Body</span>
                      <span className={`${styles.checkSquare} ${targetBody ? styles.checked : ''}`} />
                    </div>
                    <div 
                      className={`${styles.optRow} ${targetPlate ? styles.active : ''}`}
                      onClick={() => setTargetPlate(!targetPlate)}
                    >
                      <span>License Plate</span>
                      <span className={`${styles.checkSquare} ${targetPlate ? styles.checked : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Group 2: Privacy Method */}
                <div className={styles.controlGroup}>
                  <h5>Privacy Method</h5>
                  <div className={styles.optList}>
                    <div 
                      className={`${styles.optRow} ${privacyMethod === 'mosaic' ? styles.active : ''}`}
                      onClick={() => setPrivacyMethod('mosaic')}
                    >
                      <span>Mosaic</span>
                      <span className={`${styles.radioDot} ${privacyMethod === 'mosaic' ? styles.selected : ''}`} />
                    </div>
                    <div 
                      className={`${styles.optRow} ${privacyMethod === 'masking' ? styles.active : ''}`}
                      onClick={() => setPrivacyMethod('masking')}
                    >
                      <span>Masking</span>
                      <span className={`${styles.radioDot} ${privacyMethod === 'masking' ? styles.selected : ''}`} />
                    </div>
                    <div 
                      className={`${styles.optRow} ${privacyMethod === 'blur' ? styles.active : ''}`}
                      onClick={() => setPrivacyMethod('blur')}
                    >
                      <span>Blur</span>
                      <span className={`${styles.radioDot} ${privacyMethod === 'blur' ? styles.selected : ''}`} />
                    </div>
                    <div 
                      className={`${styles.optRow} ${privacyMethod === 'virtualFace' ? styles.active : ''}`}
                      onClick={() => setPrivacyMethod('virtualFace')}
                    >
                      <span>Virtual Face</span>
                      <span className={`${styles.radioDot} ${privacyMethod === 'virtualFace' ? styles.selected : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Group 3: Strength */}
                <div className={styles.controlGroup}>
                  <h5>Strength</h5>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={strengthVal}
                    onChange={(e) => setStrengthVal(Number(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>

                {/* Bottom Action */}
                <button type="button" className={styles.applyBtn}>
                  비식별화 즉시 적용 (Apply)
                </button>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* Section 2: AI가 영상 내 개인정보를... (bg="gray", 2x2 Grid) */}
        <BasicSection
          className={styles.coreTechSection}
          bg="gray"
          layout="vertical"
          align="center"
          eyebrow="CORE TECHNOLOGY"
          title={
            <>
              AI가 영상 내 개인정보를 정밀 탐지·분석하여<br />
              수동 개입을 최소화하고 비식별 가공
            </>
          }
        >
          <div className={styles.techCardsGrid}>
            {TECH_CARDS.map((card) => (
              <div key={card.tag} className={styles.techCard}>
                <span className={styles.tag}>{card.tag}</span>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.desc}>{card.desc}</p>
              </div>
            ))}
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
