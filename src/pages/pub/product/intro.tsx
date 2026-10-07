import React, { useState } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from './sections/ProductCta';
import { Button } from '../../../components/core/Button/Button';
import styles from './intro.module.scss';

export default function PubProductIntro() {
  const [activeTab, setActiveTab] = useState(0);

  const tabList = [
    {
      sub: '완벽한 자동화 / 정밀한 탐지',
      title: '정밀한 탐지와 자동 비식별',
    },
    {
      sub: '직관적인 환경 / 쉬운 수동 조작',
      title: '편리한 작업과 쉬운 수정',
    },
    {
      sub: '효율적인 관리 / 다중 영상 처리',
      title: '다중 작업 일괄 처리',
    },
    {
      sub: '안전한 데이터 / 영구 파기 보장',
      title: '영구 파기 및 복원 불가',
    },
  ];

  return (
    <FrontLayout>
      <div className={styles.introWrap}>
        
        {/* 1. Hero Section */}
        <HeroSection
          align="center"
          eyebrow="— INTRO —"
          title={
            <>
              정밀한 탐지부터 안전한 비식별까지,<br/>
              xPrivacy의 기술
            </>
          }
          description="xPrivacy는 최신 AI와 딥러닝 기술을 활용하여, 비정형 데이터(영상/이미지) 속 개인정보를 완벽하게 탐지하고 비식별 처리합니다. 세계 최고 수준의 AI 기술력으로 안전한 데이터 활용을 지원합니다."
        >
          <div className={styles.heroActions}>
            <Button variant="solid" color="primary" size="lg" className={styles.btnSolid}>무료 체험하기</Button>
            <Button variant="outline" color="neutral" size="lg" className={styles.btnOutline}>도입 문의</Button>
          </div>
          
          <div className={styles.heroVisualWrap}>
            <div className={styles.heroMock}>
              <div className={styles.mockTagLeft}>원본</div>
              <div className={styles.mockTagRight}>비식별</div>
              
              {/* Face detection boxes on right side */}
              <div className={styles.detectBoxCenter}>
                <span className={styles.detectTag}>Face 99%</span>
              </div>
              <div className={styles.detectBoxRight}>
                <span className={styles.detectTag}>Face 98%</span>
              </div>
              <div className={styles.detectBoxTopRight}>
                <span className={styles.detectTag}>Person</span>
              </div>

              {/* Center Slider */}
              <div className={styles.mockSlider}>
                <div className={styles.mockSliderLine}></div>
                <div className={styles.mockSliderHandle}>
                  <span className={styles.handleDots}>••</span>
                </div>
              </div>
            </div>
          </div>
        </HeroSection>

        {/* 1.1 Standalone Client Logos Bar (Full-width White Strip) */}
        <div className={styles.partnerBar}>
          <div className={styles.partnerInner}>
            <span className={styles.partnerLabel}>신뢰받는 파트너십</span>
            <span className={styles.partnerDivider}></span>
            <div className={styles.partnerLogos}>
              <div className={styles.logoItem}>한화비전</div>
              <div className={styles.logoItem}>SAMSUNG</div>
              <div className={styles.logoItem}>SK텔레콤</div>
              <div className={styles.logoItem}>POSCO</div>
              <div className={styles.logoItem}>현대자동차</div>
              <div className={styles.logoItem}>국방과학연구소</div>
            </div>
          </div>
        </div>

        {/* 2. Process Section */}
        <BasicSection
          eyebrow="PROCESS"
          title="하나의 프로세스 파이프라인"
          align="left"
          className={styles.processSection}
        >
          <div className={styles.pipelineWrap}>
            <div className={styles.pipelineLine}></div>
            
            <div className={styles.pipelineSteps}>
              {/* Step 1 */}
              <div className={styles.pipeStep}>
                <div className={styles.stepBadge}>01</div>
                <div className={styles.stepCard}>
                  <div className={styles.stepIconBox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 8V6a2 2 0 0 1 2-2h2" />
                      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                      <path d="M16 20h2a2 2 0 0 0 2-2v-2" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <div className={styles.stepText}>
                    <span className={styles.stepCategory}>DETECTION</span>
                    <h4 className={styles.stepTitle}>High-resolution</h4>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className={styles.pipeStep}>
                <div className={styles.stepBadge}>02</div>
                <div className={styles.stepCard}>
                  <div className={styles.stepIconBox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="6" r="3" />
                      <path d="M8.5 15.5l7-7" />
                      <path d="M13 6h5v5" />
                    </svg>
                  </div>
                  <div className={styles.stepText}>
                    <span className={styles.stepCategory}>TRACKING</span>
                    <h4 className={styles.stepTitle}>Re-ID</h4>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className={styles.pipeStep}>
                <div className={styles.stepBadge}>03</div>
                <div className={styles.stepCard}>
                  <div className={styles.stepIconBox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <div className={styles.stepText}>
                    <span className={styles.stepCategory}>PROCESSING</span>
                    <h4 className={styles.stepTitle}>Blur / Mosaic / Mask</h4>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className={styles.pipeStep}>
                <div className={styles.stepBadge}>04</div>
                <div className={styles.stepCard}>
                  <div className={styles.stepIconBox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                  </div>
                  <div className={styles.stepText}>
                    <span className={styles.stepCategory}>SECURITY</span>
                    <h4 className={styles.stepTitle}>On-Premise / Audit</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 3. Features Section */}
        <BasicSection
          theme="light"
          eyebrow="KEY FEATURES"
          title="AI가 먼저 처리하고 필요한 부분만 직접 조정합니다"
          description="수작업에 의존하던 비식별 처리를 AI가 자동으로 1차 처리하여 작업 시간을 획기적으로 단축시킵니다."
          align="left"
          className={styles.featureSection}
        >
          <div className={styles.featureSplit}>
            {/* Tabs List */}
            <div className={styles.featureTabs}>
              {tabList.map((tab, idx) => {
                const isActive = activeTab === idx;
                if (isActive) {
                  return (
                    <button
                      key={idx}
                      className={styles.activeTabCard}
                      onClick={() => setActiveTab(idx)}
                    >
                      <span className={styles.tabSub}>
                        <span className={styles.chevron}>›</span> {tab.sub}
                      </span>
                      <h4 className={styles.tabTitle}>{tab.title}</h4>
                    </button>
                  );
                }
                return (
                  <button
                    key={idx}
                    className={styles.inactiveTab}
                    onClick={() => setActiveTab(idx)}
                  >
                    <span className={styles.inactiveSub}>{tab.sub}</span>
                    <h4 className={styles.inactiveTitle}>{tab.title}</h4>
                  </button>
                );
              })}
            </div>
            
            {/* UI Mockup Window */}
            <div className={styles.featureVisual}>
              <div className={styles.uiMock}>
                <div className={styles.uiMockHeader}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.uiMockContent}>
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
                    alt="AI Detection Demonstration"
                  />

                  {/* Detection Tags on Friends */}
                  <div className={`${styles.featTag} ${styles.featTag1}`}>자동탐지 (99%)</div>
                  <div className={`${styles.featTag} ${styles.featTag2}`}>자동탐지 (98%)</div>
                  <div className={`${styles.featTag} ${styles.featTag3}`}>수동설정 (100%)</div>
                  <div className={`${styles.featTag} ${styles.featTag4}`}>자동탐지 (97%)</div>

                  {/* Floating Thumbnails Panel (Bottom Right) */}
                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>탐지 목록 (4)</div>
                    <div className={styles.panelThumbGrid}>
                      <div className={styles.panelThumb}>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Person 1" />
                        <span className={styles.thumbDot}></span>
                      </div>
                      <div className={styles.panelThumb}>
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Person 2" />
                        <span className={styles.thumbDot}></span>
                      </div>
                      <div className={styles.panelThumb}>
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Person 3" />
                        <span className={styles.thumbDot}></span>
                      </div>
                      <div className={styles.panelThumb}>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Person 4" />
                        <span className={styles.thumbDot}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 4. Integration Section */}
        <BasicSection
          eyebrow="INTEGRATION"
          title={
            <>
              이미지·영상 속 개인정보를 안전하게 보호하는<br/>
              AI 비식별 통합 솔루션
            </>
          }
          description="xPrivacy는 최신 AI 비전 기술을 통해, 영상이나 이미지에 포함된 사람의 얼굴, 차량 번호판 등 민감한 개인정보를 빠르고 정확하게 찾아내어 비식별화합니다."
          align="center"
          className={styles.integrationSection}
        >
          <div className={styles.integSteps}>
            {/* Card 1: 보호 대상 */}
            <div className={styles.integCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>비식별 원천 탐지 (입력)</span>
                <h4>보호 대상</h4>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.targetList}>
                  <div className={styles.targetItem}>
                    <span className={styles.chk}>✓</span> 얼굴
                  </div>
                  <div className={styles.targetItem}>
                    <span className={styles.chk}>✓</span> 신체
                  </div>
                  <div className={styles.targetItem}>
                    <span className={styles.chk}>✓</span> 차량 번호판
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.arrowIcon}>×</div>
            
            {/* Card 2: 비식별 처리 */}
            <div className={`${styles.integCard} ${styles.integCardCenter}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>비식별 처리 시스템 (처리)</span>
                <h4>비식별 처리</h4>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.compareFaces}>
                  <div className={styles.face}>
                    <div className={styles.faceImg}></div>
                    <span>원본</span>
                  </div>
                  <div className={styles.face}>
                    <div className={`${styles.faceImg} ${styles.mosaic}`}></div>
                    <span>블라인드(모자이크)</span>
                  </div>
                  <div className={styles.face}>
                    <div className={`${styles.faceImg} ${styles.blur}`}></div>
                    <span>블러</span>
                  </div>
                  <div className={styles.face}>
                    <div className={`${styles.faceImg} ${styles.virtual}`}></div>
                    <span>가상얼굴</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.arrowIcon}>×</div>
            
            {/* Card 3: 결과 처리 */}
            <div className={styles.integCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardStep}>비가역적 영구 파기 (출력)</span>
                <h4>결과 처리</h4>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.resultList}>
                  <div className={styles.resultItem}>
                    <span className={styles.chk}>✓</span>
                    <div className={styles.resultText}>
                      <strong>영구 삭제 (보안)</strong>
                      <span className={styles.resultSub}>Safe-guard</span>
                    </div>
                  </div>
                  <div className={styles.resultItem}>
                    <span className={styles.chk}>✓</span>
                    <div className={styles.resultText}>
                      <strong>비가역적 (복원불가)</strong>
                      <span className={styles.resultSub}>Non-Reversible</span>
                    </div>
                  </div>
                  <div className={styles.resultItem}>
                    <span className={styles.chk}>✓</span>
                    <div className={styles.resultText}>
                      <strong>다양한 포맷 (Export)</strong>
                      <span className={styles.resultSub}>MP4, AVI, JPG 지원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.bottomBanner}>
            <span className={styles.bannerText}>
              <span className={styles.dash}>-</span> 개인정보는 <strong className={styles.off}>OFF</strong>, 데이터 가치는 <strong className={styles.on}>ON</strong>
            </span>
          </div>
        </BasicSection>

        {/* 5. Cta Section */}
        <ProductCta />
      </div>
    </FrontLayout>
  );
}
