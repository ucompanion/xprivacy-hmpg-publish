import { useState, useRef, useEffect } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import styles from './intro.module.scss';

export default function PubProductIntro() {
  const [activeTab, setActiveTab] = useState(0);
  const [isTabPaused, setIsTabPaused] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 마스킹 워크플로우 탭 01->04 자동 전환 (Figma: Masking Stepper 클릭·자동 전환)
  useEffect(() => {
    if (isTabPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, [isTabPaused]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;
      const offsetX = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      setSliderPosition(percent);
    };

    const handleWindowPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [isDragging]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 2));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 2));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  // 파트너 로고 모바일 가로 슬라이드 드래그 지원
  const partnerLogosRef = useRef<HTMLDivElement>(null);
  const isPartnerDraggingRef = useRef(false);
  const partnerStartXRef = useRef(0);
  const partnerScrollLeftRef = useRef(0);
  const partnerHasMovedRef = useRef(false);

  const handlePartnerMouseDown = (e: React.MouseEvent) => {
    const el = partnerLogosRef.current;
    if (!el) return;
    isPartnerDraggingRef.current = true;
    partnerHasMovedRef.current = false;
    partnerStartXRef.current = e.pageX - el.offsetLeft;
    partnerScrollLeftRef.current = el.scrollLeft;
  };

  const handlePartnerMouseMove = (e: React.MouseEvent) => {
    if (!isPartnerDraggingRef.current) return;
    const el = partnerLogosRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - partnerStartXRef.current;
    if (Math.abs(walk) > 4) {
      partnerHasMovedRef.current = true;
    }
    el.scrollLeft = partnerScrollLeftRef.current - walk;
  };

  const handlePartnerMouseUpOrLeave = () => {
    isPartnerDraggingRef.current = false;
  };

  const handlePartnerLinkClick = (e: React.MouseEvent) => {
    if (partnerHasMovedRef.current) {
      e.preventDefault();
      partnerHasMovedRef.current = false;
    }
  };

  const partnerList = [
    {
      name: '강원 가명정보 활용지원센터',
      img: '/images/product/intro/partner_logo_01.png',
      url: 'https://www.data.gangwon.kr',
    },
    {
      name: '강원대학교',
      img: '/images/product/intro/partner_logo_02.png',
      url: 'https://www.kangwon.ac.kr',
    },
    {
      name: '한라대학교',
      img: '/images/product/intro/partner_logo_03.png',
      url: 'https://www.halla.ac.kr',
    },
    {
      name: '개인정보보호위원회',
      img: '/images/product/intro/partner_logo_04.png',
      url: 'https://www.pipc.go.kr',
    },
    {
      name: '티사이언티픽 (T SCIENTIFIC)',
      img: '/images/product/intro/partner_logo_05.png',
      url: 'http://www.tscientific.co.kr',
    },
    {
      name: '포소드 (POSOD)',
      img: '/images/product/intro/partner_logo_06.png',
      url: 'http://www.posod.co.kr',
    },
    {
      name: '한국인터넷진흥원 (KISA)',
      img: '/images/product/intro/partner_logo_07.png',
      url: 'https://www.kisa.or.kr',
    },
    {
      name: '영신디앤씨 (YoungShine D&C)',
      img: '/images/product/intro/partner_logo_08.png',
      url: 'https://www.youngshine.co.kr',
    },
  ];

  const tabList = [
    {
      num: '01',
      eng: 'PERSON THUMBNAIL',
      title: '인물별 썸네일 자동 생성',
      img: '/images/product/intro/group_photo_01.jpg',
      alt: '01 PERSON THUMBNAIL - 인물별 썸네일 자동 생성',
    },
    {
      num: '02',
      eng: 'SELECT PERSON',
      title: '특정 인물 선택',
      img: '/images/product/intro/group_photo_02.jpg',
      alt: '02 SELECT PERSON - 특정 인물 선택',
    },
    {
      num: '03',
      eng: 'APPLY TO ALL',
      title: '선택 인물 일괄 처리',
      img: '/images/product/intro/group_photo_03.jpg',
      alt: '03 APPLY TO ALL - 선택 인물 일괄 처리',
    },
    {
      num: '04',
      eng: 'AREA SETTING',
      title: '처리 영역 직접 조정',
      img: '/images/product/intro/group_photo_04.jpg',
      alt: '04 AREA SETTING - 처리 영역 직접 조정',
    },
  ];

  return (
    <FrontLayout>
      <div className={styles.introWrap}>
        
        {/* 1. Hero Section (Full 타입) */}
        <HeroSection
          heroVariant="full"
          eyebrow="PRODUCT"
          title={
            <>
              정밀한 탐지부터 <br className={styles.mobileBr} />안전한 비식별까지
            </>
          }
          description={
            <>
              Detection·Tracking·Privacy Processing·Security <br className={styles.mobileBr} />기술을 통해
              <br className={styles.pcBr} /> 영상 속 개인정보를 찾는 <br className={styles.mobileBr} />하나의 프로세스 파이프라인으로 구성합니다.
            </>
          }
          buttons={
            <>
              <Button variant="solid" color="primary" size="xl">기술 문의하기</Button>
              <Button variant="outline" color="neutral" size="xl">도입 문의</Button>
            </>
          }
        >
          <div className={styles.heroVisualWrap}>
            <div className={styles.heroMock} ref={containerRef}>
              {/* 1. Base Layer: Original Image (PC & Mobile via <picture>) */}
              <picture className={styles.imageOriginal}>
                <source media="(max-width: 768px)" srcSet="/images/product/intro/hero_original_bg_mo.jpg" />
                <img
                  src="/images/product/intro/hero_original_bg.jpg"
                  alt="원본 영상"
                  className={styles.visualImg}
                  draggable={false}
                />
              </picture>

              {/* 2. Top Layer: De-identified Compare Image (Clipped dynamically by slider position) */}
              <picture
                className={styles.imageCompare}
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <source media="(max-width: 768px)" srcSet="/images/product/intro/hero_compare_bg_mo.jpg" />
                <img
                  src="/images/product/intro/hero_compare_bg.jpg"
                  alt="비식별 처리 영상"
                  className={styles.visualImg}
                  draggable={false}
                />
              </picture>

              {/* 3. Original & Compare Status Badges */}
              <div className={styles.mockTagLeft}>원본</div>
              <div className={styles.mockTagRight}>비식별 처리</div>

              {/* 4. Center Visual Slider Divider & Direct Drag Button Handle */}
              <div 
                className={styles.mockSlider}
                style={{ left: `${sliderPosition}%` }}
              >
                <div className={styles.mockSliderLine} />
                <button
                  type="button"
                  className={`${styles.mockSliderHandle} ${isDragging ? styles.isDragging : ''}`}
                  onPointerDown={handlePointerDown}
                  onKeyDown={handleKeyDown}
                  role="slider"
                  aria-label="원본과 비식별화 비교 슬라이더 조절 핸들"
                  aria-valuenow={Math.round(sliderPosition)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </HeroSection>

        {/* 1.1 Standalone Client Logos Bar (Figma v2 Trust / Logo Strip - Desktop 2156:29986 / Mobile 2156:30912) */}
        <section className={styles.partnerBar} aria-label="주요 파트너 및 고객사">
          <div className={styles.partnerInner}>
            <div
              ref={partnerLogosRef}
              className={styles.partnerLogos}
              onMouseDown={handlePartnerMouseDown}
              onMouseMove={handlePartnerMouseMove}
              onMouseUp={handlePartnerMouseUpOrLeave}
              onMouseLeave={handlePartnerMouseUpOrLeave}
            >
              {partnerList.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerLink}
                  title={`${partner.name} 공식 홈페이지 (새 창에서 열림)`}
                  aria-label={`${partner.name} (새 창에서 열림)`}
                  onClick={handlePartnerLinkClick}
                >
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className={styles.partnerLogoImg}
                    loading="lazy"
                    draggable={false}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Process Section (Figma v2 Section / Pipeline - Node 2730:31255) */}
        <BasicSection
          bg="white"
          eyebrow="PROCESS"
          title="하나의 프로세스 파이프라인"
          align="left"
          className={styles.processSection}
        >
          <div className={styles.pipelineWrap}>
            <div className={styles.pipelineSteps}>
              {/* Step 01 · DETECTION */}
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <img
                    src="/images/product/intro/icon_pipeline_detection.svg"
                    alt="DETECTION"
                    className={styles.stepIconImg}
                  />
                </div>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>DETECTION</span>
                  <h4 className={styles.stepValue}>High-resolution</h4>
                  <p className={styles.stepDesc}>
                    고해상도 영상에서 멀리 있는<br className={styles.pcBr} /> 작은 <br className={styles.mobileBr} />
                    얼굴까지 찾아냅니다
                  </p>
                </div>
              </div>

              {/* Connector Line 1 */}
              <div className={styles.stepConnector} aria-hidden="true" />

              {/* Step 02 · TRACKING */}
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <img
                    src="/images/product/intro/icon_pipeline_tracking.svg"
                    alt="TRACKING"
                    className={styles.stepIconImg}
                  />
                </div>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>TRACKING</span>
                  <h4 className={styles.stepValue}>Re-ID</h4>
                  <p className={styles.stepDesc}>
                    가려졌다 다시 나타난 인물도<br className={styles.pcBr} /> 같은 <br className={styles.mobileBr} />
                    사람으로 이어서 추적합니다
                  </p>
                </div>
              </div>

              {/* Connector Line 2 */}
              <div className={styles.stepConnector} aria-hidden="true" />

              {/* Step 03 · PRIVACY ENGINE */}
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <img
                    src="/images/product/intro/icon_pipeline_privacy.svg"
                    alt="Privacy Processing"
                    className={styles.stepIconImg}
                  />
                </div>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>Privacy Processing</span>
                  <h4 className={styles.stepValue}>Blur / Mosaic / Mask</h4>
                  <p className={styles.stepDesc}>
                    블러·모자이크·마스킹 중<br className={styles.pcBr} /> 용도에 맞는 <br className={styles.mobileBr} />
                    방식을 선택합니다
                  </p>
                </div>
              </div>

              {/* Connector Line 3 */}
              <div className={styles.stepConnector} aria-hidden="true" />

              {/* Step 04 · SECURITY */}
              <div className={styles.stepCard}>
                <div className={styles.stepIconBox}>
                  <img
                    src="/images/product/intro/icon_pipeline_security.svg"
                    alt="SECURITY"
                    className={styles.stepIconImg}
                  />
                </div>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>SECURITY</span>
                  <h4 className={styles.stepValue}>On-Premise / Audit</h4>
                  <p className={styles.stepDesc}>
                    외부 전송 없이 내부망에서<br className={styles.pcBr} /> 처리하고 <br className={styles.mobileBr} />
                    작업 이력을 남깁니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 3. Masking Workflow Section (Figma PC 2156:30050 / Mobile 2156:30974) */}
        <BasicSection
          bg="gray"
          eyebrow="MASKING"
          title={
            <>
              AI가 먼저 처리하고 <br className={styles.mobileBr} />
              필요한 부분만 직접 조정합니다
            </>
          }
          description="인물별 썸네일을 확인하고 특정 인물을 선택하거나 처리 영역을 직접 조정해 최종 결과를 검수할 수 있습니다."
          align="left"
          className={styles.featureSection}
        >
          <div
            className={styles.featureSplit}
            onMouseEnter={() => setIsTabPaused(true)}
            onMouseLeave={() => setIsTabPaused(false)}
          >
            {/* Steps List (PC: Left, Mobile: Bottom) */}
            <div className={styles.featureTabs} role="tablist" aria-label="마스킹 워크플로우 단계">
              {tabList.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.num}
                    type="button"
                    role="tab"
                    id={`masking-tab-${tab.num}`}
                    aria-selected={isActive}
                    aria-controls={`masking-panel-${tab.num}`}
                    className={isActive ? styles.activeTabCard : styles.inactiveTab}
                    onClick={() => {
                      setActiveTab(idx);
                      setIsTabPaused(true);
                    }}
                  >
                    <span className={styles.tabNumber}>{tab.num}</span>
                    <div className={styles.tabText}>
                      <span className={styles.tabEnglish}>{tab.eng}</span>
                      <h4 className={styles.tabTitle}>{tab.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Workspace Window (PC: Right, Mobile: Top) */}
            <div
              className={styles.featureVisual}
              role="tabpanel"
              id={`masking-panel-${tabList[activeTab].num}`}
              aria-labelledby={`masking-tab-${tabList[activeTab].num}`}
            >
              <div className={styles.workspaceWindow}>
                <div className={styles.canvasArea}>
                  <img
                    key={tabList[activeTab].img}
                    src={tabList[activeTab].img}
                    alt={tabList[activeTab].alt}
                    className={styles.workflowImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 4. Complete Solution Section */}
        <BasicSection
          bg="white"
          eyebrow="SOLUTION"
          title="개인정보를 안전하게 보호하는 AI 비식별 통합 솔루션"
          description="이미지와 영상 속 개인정보를 AI가 자동으로 탐지하고, 목적에 맞는 방식으로 비식별화하여 안전한 데이터 활용을 지원합니다."
          align="left"
          className={styles.solutionSection}
        >
          <div className={styles.solutionFormula}>
            {/* Card 1: 보호 대상 */}
            <div className={styles.targetCard}>
              <h3 className={styles.cardTitle}>보호 대상</h3>
              <div className={styles.targetList}>
                <div className={styles.targetItem}>
                  <span className={styles.targetNum}>01</span>
                  <span className={styles.targetName}>얼굴</span>
                </div>
                <div className={styles.targetItem}>
                  <span className={styles.targetNum}>02</span>
                  <span className={styles.targetName}>신체</span>
                </div>
                <div className={styles.targetItem}>
                  <span className={styles.targetNum}>03</span>
                  <span className={styles.targetName}>번호판</span>
                </div>
              </div>
            </div>

            {/* Card 2: 비식별 방식 */}
            <div className={styles.methodCard}>
              <h3 className={styles.cardTitle}>비식별 방식</h3>
              <div className={styles.methodContent}>
                <div className={styles.avatarItem}>
                  <div className={styles.avatarImgWrap}>
                    <img
                      src="/images/product/intro/avatar_sample_01.png"
                      alt="원본"
                      className={styles.avatarImg}
                    />
                  </div>
                  <span className={styles.avatarLabel}>원본</span>
                </div>

                <div className={styles.methodArrow} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10H16M16 10L10.5 4.5M16 10L10.5 15.5" stroke="#80868b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className={styles.avatarItem}>
                  <div className={styles.avatarImgWrap}>
                    <img
                      src="/images/product/intro/avatar_sample_02.png"
                      alt="모자이크"
                      className={styles.avatarImg}
                    />
                  </div>
                  <span className={styles.avatarLabel}>모자이크</span>
                </div>

                <div className={styles.avatarItem}>
                  <div className={styles.avatarImgWrap}>
                    <img
                      src="/images/product/intro/avatar_sample_03.png"
                      alt="블러"
                      className={styles.avatarImg}
                    />
                  </div>
                  <span className={styles.avatarLabel}>블러</span>
                </div>

                <div className={styles.avatarItem}>
                  <div className={styles.avatarImgWrap}>
                    <img
                      src="/images/product/intro/avatar_sample_04.png"
                      alt="가상 얼굴"
                      className={styles.avatarImg}
                    />
                  </div>
                  <span className={styles.avatarLabel}>가상 얼굴</span>
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 5. Cta Section */}
        <CtaSection
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 서비스를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 직관적인 UI 확인하거나 기술 지원 전문가와 맞춤 도입 방안을 상담할 수 있습니다."
          primaryLabel="도입 문의하기"
          secondaryLabel="데모 체험하기"
        />
      </div>
    </FrontLayout>
  );
}
