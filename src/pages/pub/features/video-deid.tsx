import React, { useState } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './video-deid.module.scss';

// Section 1: AI 초고속 자동 추적
const SECTION1_FEATURES = [
  {
    num: '01',
    title: '실시간급 처리 속도를 구현하는 고성능 AI 엔진',
    desc: '대용량 CCTV 및 긴 분량의 영상을 초당 120프레임 속도로 고속 처리하여 수동 가공 대비 작업 시간을 80% 이상 절감합니다.',
  },
  {
    num: '02',
    title: '연속 프레임 추적',
    desc: '보행자의 가려짐, 빠른 차량 이동, 카메라 앵글 전환 등 복잡한 영상 환경에서도 AI가 동일 객체를 놓치지 않고 안정적으로 추적합니다.',
  },
  {
    num: '03',
    title: '프레임 누락 방지 보안 알고리즘',
    desc: '영상 전 프레임을 전수 조사하여 순간적으로 노출되는 이목구비나 번호판까지 완벽히 탐지해 법적 리스크를 원천 차단합니다.',
  },
];

// Section 2: 비가역적 변환과 다중 식별 객체 정밀 차단
const SECTION2_FEATURES = [
  {
    num: '01',
    title: '원본 복원 불가능한 비가역적 가공',
    desc: '변환 시 원본 식별 정보를 완전히 파기하는 방식을 적용하여 AI 복원 기술이나 픽셀 역산으로도 원본을 되살릴 수 없습니다.',
  },
  {
    num: '02',
    title: '얼굴, 차량 번호판, 신체 특징의 동시 정밀 식별',
    desc: '사람의 얼굴뿐만 아니라 이동 차량의 번호판, 문신, 흉터 등 개인을 특정할 수 있는 모든 객체를 한 번에 자동으로 인식합니다.',
  },
  {
    num: '03',
    title: '주변 배경을 해치지 않는 정밀 영역 타깃팅',
    desc: '타깃 객체의 경계 면만 정확히 비식별 처리하여 주변 행정적 정황이나 증거 능력 데이터의 훼손을 최소화합니다.',
  },
];

// Section 3: 생성형 AI 가상 얼굴 변환
const SECTION3_FEATURES = [
  {
    num: '01',
    title: '표정 및 시선 100% 동기화',
    desc: '원본 인물의 미세한 눈빛, 입모양, 고개의 각도 변화를 실시간으로 추적하여 가상 얼굴에 자연스럽게 동기화합니다.',
  },
  {
    num: '02',
    title: '성별·연령대 맞춤 페르소나 매칭',
    desc: '원본 인물의 성별, 연령, 체형 정보를 분석하여 이질감 없는 최선의 가상 인물 이목구비를 자동으로 생성해 덮어씌웁니다.',
  },
  {
    num: '03',
    title: '한국인 특화 데이터셋 활용',
    desc: '국내 인구통계학적 특성을 반영한 전용 데이터셋 기반으로 생성되어 이질감 없이 공공 홍보 영상의 품질과 몰입도를 극대화합니다.',
  },
];

// Section 4: 등장인물 자동 분류 및 일괄 처리
const SECTION4_FEATURES = [
  {
    num: '01',
    title: '인물별로 자동 분류하는 스마트 UX',
    desc: '영상에 나온 사람들의 얼굴을 AI가 동일인별로 추출 및 그룹화하여 썸네일 리스트 형태로 직관적으로 보여줍니다.',
  },
  {
    num: '02',
    title: '선택적 비식별 및 일괄 제외',
    desc: '클릭 한 번으로 비식별 대상(예: 일반 행인)과 제외 대상(예: 민원 신청 본인)을 지정하여 전체 영상에 일괄 적용합니다.',
  },
  {
    num: '03',
    title: '대용량 인물 데이터 관리',
    desc: '수십 명이 등장하는 공공장소 CCTV 영상에서도 인물별 등장 타임라인을 빠르게 파악하고 제어할 수 있습니다.',
  },
];

// Section 5: 직관적 검수 및 수정 인터페이스
const SECTION5_FEATURES = [
  {
    num: '01',
    title: '타임라인 기반 결과 검수',
    desc: '비식별화가 적용된 구간을 타임라인 상의 마커(Marker)로 확인하고, 원하는 시점으로 즉시 이동하여 빠르게 검수합니다.',
  },
  {
    num: '02',
    title: '직관적 수동 수정',
    desc: 'AI 탐지 영역의 크기나 위치가 어색할 경우, 마우스 드래그로 손쉽게 박스 크기를 조정하거나 위치를 바꿀 수 있습니다.',
  },
  {
    num: '03',
    title: '구간별 수동 객체 추가 및 파기',
    desc: '특수 사물이나 가려진 영역 등 추가 가공이 필요한 경우 손쉽게 신규 마스킹 영역을 지정하고 해당 프레임에 고정할 수 있습니다.',
  },
];

export default function PubSubFeaturesVideoDeid() {
  const [selectedMethod, setSelectedMethod] = useState<'mosaic' | 'blur' | 'masking'>('mosaic');

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* ===================================================================
            Hero Section: 대용량 영상 비식별 (White Background, Centered)
        =================================================================== */}
        <BasicSection
          className={styles.heroSection}
          bg="white"
          layout="vertical"
          align="center"
          eyebrow="FEATURES"
          title={
            <>
              대용량 영상 비식별,<br />
              자동 추적부터 검수까지<br />
              단 몇 번의 클릭으로
            </>
          }
          description={
            <>
              고속 AI 엔진의 자동 추적과 인물별 썸네일 분류 기능으로<br />
              복잡한 영상 수동 가공 업무 공수를 80% 이상 획기적으로 절감해 드립니다.
            </>
          }
        >
          {/* Action Button */}
          <div className={styles.heroAction}>
            <a href="/pub/demo" className={styles.btnTrial}>
              무료 체험 시작
            </a>
          </div>

          {/* Privacy Workspace Mockup Box */}
          <div className={styles.workspaceMockup}>
            <div className={styles.mockupHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.statusDot} />
                <span>xPrivacy · Privacy Workspace</span>
              </div>
              <div className={styles.headerRight}>
                PROTECTED · REVIEW READY
              </div>
            </div>

            <div className={styles.mockupBody}>
              {/* Left Video Area */}
              <div className={styles.videoArea}>
                <div className={styles.videoTag}>DETECTION PREVIEW</div>
                
                <div className={styles.centerVisualGuide}>
                  <div className={styles.trackingBox}>
                    <span className={styles.trackLabel}>FACE: BODY</span>
                  </div>
                  <div className={styles.trackingBox2}>
                    <span className={styles.trackLabel}>FACE: BODY</span>
                  </div>
                  <span className={styles.trackCenterText}>REAL-TIME AI TRACKING ENGINE</span>
                </div>

                <div className={styles.videoFooterBadge}>
                  설명용 표현 · 실제 제품 화면 아님
                </div>
              </div>

              {/* Right Sidebar */}
              <div className={styles.controlSidebar}>
                <div className={styles.groupBlock}>
                  <span className={styles.groupTitle}>PROTECTION TARGET</span>
                  <div className={styles.targetRow}>
                    <span>Face</span>
                    <span className={styles.onBadge}>ON</span>
                  </div>
                  <div className={styles.targetRow}>
                    <span>Body</span>
                    <span className={styles.onBadge}>ON</span>
                  </div>
                  <div className={styles.targetRow}>
                    <span>License Plate</span>
                    <span className={styles.onBadge}>ON</span>
                  </div>
                </div>

                <div className={styles.groupBlock}>
                  <span className={styles.groupTitle}>PRIVACY METHOD</span>
                  <div 
                    className={`${styles.radioRow} ${selectedMethod === 'mosaic' ? styles.active : ''}`}
                    onClick={() => setSelectedMethod('mosaic')}
                  >
                    <span className={`${styles.radioDot} ${selectedMethod === 'mosaic' ? styles.checked : ''}`} />
                    <span>Mosaic</span>
                  </div>
                  <div 
                    className={`${styles.radioRow} ${selectedMethod === 'blur' ? styles.active : ''}`}
                    onClick={() => setSelectedMethod('blur')}
                  >
                    <span className={`${styles.radioDot} ${selectedMethod === 'blur' ? styles.checked : ''}`} />
                    <span>Blur</span>
                  </div>
                  <div 
                    className={`${styles.radioRow} ${selectedMethod === 'masking' ? styles.active : ''}`}
                    onClick={() => setSelectedMethod('masking')}
                  >
                    <span className={`${styles.radioDot} ${selectedMethod === 'masking' ? styles.checked : ''}`} />
                    <span>Masking</span>
                  </div>
                </div>

                <div className={styles.groupBlock}>
                  <span className={styles.groupTitle}>REVIEW</span>
                  <div className={styles.reviewRow}>
                    <span>Detected</span>
                    <span className={styles.count}>03</span>
                  </div>
                  <div className={styles.reviewRow}>
                    <span>Needs Review</span>
                    <span className={styles.count}>01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 1: AI 초고속 자동 추적 (Gray Bg, Visual Left, Text Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              장시간 영상의<br />
              1프레임도 놓치지 않는<br />
              AI 초고속 자동 추적
            </>
          }
          description={
            <>
              초당 최대 120fps 고속 엔진을 탑재하여<br />
              대용량 영상 전체 프레임 속 움직이는 대상을<br />
              실시간급 속도로 자동 추적·비식별화합니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION1_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          <div className={`${styles.visualCard} ${styles.visualWhite}`}>
            <span className={styles.visualWatermark}>PRIVACY + DATA VALUE VISUAL</span>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 2: 다중 식별 객체 정밀 차단 (White Bg, Text Left, Visual Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              복원 0% 비가역적 변환과<br />
              다중 식별 객체 정밀 차단
            </>
          }
          description={
            <>
              초상권 걱정 없이 영상의 몰입감과 미관을 살리는<br />
              생성형 AI 비식별화<br />
              모자이크나 블러로 화면을 가리지 않고, 딥러닝 AI가<br />
              원본 인물의 맥락을 그대로 유지하면서<br />
              고품질 가상 얼굴로 자연스럽게 대치합니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION2_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          <div className={`${styles.visualCard} ${styles.visualGray}`}>
            <span className={styles.visualWatermark}>PRIVACY + DATA VALUE VISUAL</span>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 3: 생성형 AI 가상 얼굴 변환 (Gray Bg, Visual Left, Text Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              한국인 맞춤 가상 얼굴 치환<br />
              생성형 AI 가상 얼굴 변환
            </>
          }
          description={
            <>
              답답한 모자이크 대신 한국인 특화 AI가 원본의 표정과 시선을<br />
              유지한 가상 얼굴을 합성하여 홍보 및 행정 영상의 몰입도를 높입니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION3_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          <div className={`${styles.visualCard} ${styles.visualWhite}`}>
            <span className={styles.visualWatermark}>PRIVACY + DATA VALUE VISUAL</span>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 4: 등장인물 자동 분류 (White Bg, Text Left, Visual Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              등장인물 자동 분류를 통한<br />
              선택적 일괄 처리
            </>
          }
          description={
            <>
              영상 내 등장인물의 썸네일을 인물별로 자동 분류하여<br />
              민원인 등 특정 대상만 선택해 비식별화하거나 제외하는<br />
              스마트 편집을 지원합니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION4_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          <div className={`${styles.visualCard} ${styles.visualGray}`}>
            <span className={styles.visualWatermark}>PRIVACY + DATA VALUE VISUAL</span>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 5: 직관적 검수 인터페이스 (Gray Bg, Visual Left, Text Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              직관적 검수 및 즉시 수정<br />
              인터페이스
            </>
          }
          description={
            <>
              가공 결과를 타임라인 상에서 한눈에 확인하고,<br />
              자동 탐지 영역을 손쉽게 마우스 드래그로 수정하거나<br />
              추가·삭제할 수 있습니다.
            </>
          }
          headerExtra={
            <div className={styles.featureList}>
              {SECTION5_FEATURES.map((item) => (
                <div key={item.num} className={styles.featureItem}>
                  <span className={styles.num}>{item.num}</span>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          }
        >
          <div className={`${styles.visualCard} ${styles.visualWhite}`}>
            <span className={styles.visualWatermark}>PRIVACY + DATA VALUE VISUAL</span>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 6: Bottom Product CTA
        =================================================================== */}
        <ProductCta />

      </div>
    </FrontLayout>
  );
}
