import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './ai-auto-editing.module.scss';

// Section 1: 스마트 대상 인식 및 자동 추적
const SECTION1_FEATURES = [
  {
    num: '01',
    title: '복잡한 배경 속 객체를 정밀 탐지하는 AI 바운딩 박스',
    desc: '시야 가림이나 조명 변화가 심한 CCTV 영상에서도 비식별 대상의 위치와 범위를 픽셀 단위로 정밀 추적합니다.',
  },
  {
    num: '02',
    title: '자동 동선 이력 매핑',
    desc: '대상의 움직임에 맞춰 AI가 스스로 타임라인 상에 가공 좌표(Keyframe)를 생성하여 튀거나 엇갈림 없는 연속 비식별을 구현합니다.',
  },
  {
    num: '03',
    title: '다중 인물·차량 복합 동선 동시 추적',
    desc: '여러 사람이 겹쳐 이동하거나 차량이 번잡하게 얽히는 환경에서도 각 개체의 독립된 이동 경로를 식별하여 놓침 없이 추적합니다.',
  },
];

// Section 2: 영상 구간과 객체 특성에 최적화된 비식별 효과 자동 매핑
const SECTION2_FEATURES = [
  {
    num: '01',
    title: '객체 크기 및 거리 자동 연동 스케일링',
    desc: '카메라와 타깃 간의 거리에 따라 움직이는 비식별 영역의 크기와 비율을 AI가 계산하여 자연스럽고 깔끔한 가공 레이어를 유지합니다.',
  },
  {
    num: '02',
    title: '구간별 렌더링 자동 동기화',
    desc: '개인정보 식별 대상이 영상 내에 실제 나타나고 사라지는 시점(In/Out Point)을 감지하여 필요한 구간에만 효과를 완벽하게 적용합니다.',
  },
];

export default function PubSubFeaturesAiAutoEditing() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* ===================================================================
            Hero Section: 스마트한 추적과 구간 자동 매핑으로 가장 빠른 비식별 워크플로우
        =================================================================== */}
        <BasicSection
          className={styles.heroSection}
          bg="white"
          layout="vertical"
          align="center"
          eyebrow="FEATURES"
          title={
            <>
              스마트한 추적과 구간 자동 매핑으로<br />
              가장 빠른 비식별 워크플로우
            </>
          }
          description={
            <>
              타깃 인식부터 컷 편집 최적화까지 연결된 AI 편집 파이프라인으로 관공서 대용량 영상도 단 몇 번의 클릭으로 신속하게 가공합니다.
            </>
          }
        >
          {/* Action Button */}
          <div className={styles.heroAction}>
            <a href="/pub/demo" className={styles.btnTrial}>
              무료 체험 시작
            </a>
          </div>

          {/* Timeline Dark Mockup */}
          <div className={styles.timelineMockup}>
            <div className={styles.mockupHeader}>
              <span className={styles.headerTitle}>TRACKING TIMELINE</span>
              <span className={styles.disclaimerBadge}>설명용 표현 · 실제 제품 화면 아님</span>
            </div>

            <div className={styles.timelineScrollWrapper}>
              <div className={styles.timelineContainer}>
                {/* Timeline Ruler */}
                <div className={styles.rulerRow}>
                  <span className={styles.timeTick}>00:00</span>
                  <span className={styles.timeTick}>00:10</span>
                  <span className={styles.timeTick}>00:20</span>
                  <span className={styles.timeTick}>00:30</span>
                  <span className={styles.timeTick}>00:40</span>
                  <span className={styles.timeTick}>00:50</span>
                  <span className={styles.timeTick}>01:00</span>
                </div>

                {/* Track 1: Person 01 */}
                <div className={styles.trackRow}>
                  <div className={styles.rowLabel}>
                    <span>Person 01</span>
                    <span className={`${styles.badgeEffect} ${styles.mosaic}`}>Mosaic</span>
                  </div>
                  <div className={styles.trackBarArea}>
                    <div className={styles.spanBar} style={{ left: '6%', width: '58%' }}>
                      <span className={styles.spanPoint}>IN 00:04</span>
                      <span className={styles.keyframeDiamond}>◆</span>
                      <span className={styles.keyframeDiamond}>◆</span>
                      <span className={styles.keyframeDiamond}>◆</span>
                      <span className={styles.spanPoint}>OUT 00:38</span>
                    </div>
                  </div>
                </div>

                {/* Track 2: Person 02 */}
                <div className={styles.trackRow}>
                  <div className={styles.rowLabel}>
                    <span>Person 02</span>
                    <span className={`${styles.badgeEffect} ${styles.blur}`}>Blur</span>
                  </div>
                  <div className={styles.trackBarArea}>
                    <div className={styles.spanBar} style={{ left: '36%', width: '55%' }}>
                      <span className={styles.spanPoint}>IN 00:22</span>
                      <span className={styles.keyframeDiamond}>◆</span>
                      <span className={styles.keyframeDiamond}>◆</span>
                      <span className={styles.keyframeDiamond}>◆</span>
                      <span className={styles.spanPoint}>OUT 00:55</span>
                    </div>
                  </div>
                </div>

                {/* Track 3: Plate 01 */}
                <div className={styles.trackRow}>
                  <div className={styles.rowLabel}>
                    <span>Plate 01</span>
                    <span className={`${styles.badgeEffect} ${styles.mosaic}`}>Mosaic</span>
                  </div>
                  <div className={styles.trackBarArea}>
                    <div className={styles.spanBar} style={{ left: '16%', width: '28%' }}>
                      <span className={styles.spanPoint}>IN 00:10</span>
                      <span className={styles.keyframeDiamond}>◆</span>
                      <span className={styles.spanPoint}>OUT 00:27</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.timelineFooter}>
              <div className={styles.legendItem}>
                <span className={styles.diamond}>◆</span>
                <span>Keyframe</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.barSample} />
                <span>적용 구간 (In → Out)</span>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 1: 스마트 대상 인식 및 자동 추적 (Gray Bg, Mockup Left, Text Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              스마트 대상 인식 및<br />
              자동 추적
            </>
          }
          description={
            <>
              영상에 등장하는 얼굴, 번호판, 신체 특징 등 비식별 대상의<br />
              등장 시점부터 퇴장 시점까지 동선을 AI가 스스로 인식하여<br />
              끊김 없이 자동 추적합니다.
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
          {/* TRACKING PREVIEW Mockup */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <span className={styles.headerTitle}>TRACKING PREVIEW</span>
              <span className={styles.disclaimerBadge}>설명용 표현 · 실제 제품 화면 아님</span>
            </div>

            <div className={styles.trackingCanvas}>
              {/* Trail Boxes */}
              <div className={styles.trailBox1} />
              <div className={styles.trailBox2} />
              <div className={styles.trailBox3} />

              {/* Active Tracking: Person 01 */}
              <div className={styles.activeTrackPerson1}>
                <span className={styles.trackTag}>Person 01 · Track</span>
              </div>

              {/* Active Tracking: Person 02 */}
              <div className={styles.activeTrackPerson2}>
                <span className={styles.trackTag}>Person 02</span>
              </div>

              {/* Active Tracking: Plate 01 */}
              <div className={styles.activeTrackPlate}>
                <span className={styles.trackTag}>Plate 01</span>
              </div>

              <div className={styles.trailInfo}>
                <span>Person 01 00:04 → 00:38</span>
                <span>동선 추적 표시 (Trail)</span>
              </div>
            </div>

            <div className={styles.mockupFooter}>
              <span>Tracks 03</span>
              <span>Person 02</span>
              <span>Plate 01</span>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 2: 영상 구간과 객체 특성에 최적화된 비식별 효과 자동 매핑 (White Bg, Text Left, Mockup Right)
        =================================================================== */}
        <BasicSection
          className={styles.featureSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              영상 구간과 객체 특성에<br />
              최적화된 비식별 효과<br />
              자동 매핑
            </>
          }
          description={
            <>
              수동 타임라인 작업 없이, AI가 비식별 영역의 이동 경로나<br />
              배경 변화에 따라 모자이크, 블러, 가상 얼굴 등 지정된 보안 효과와<br />
              가공 구간을 자동으로 매칭·적용합니다.
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
          {/* EFFECT MAPPING Mockup */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <span className={styles.headerTitle}>EFFECT MAPPING</span>
              <span className={styles.disclaimerBadge}>설명용 표현 · 실제 제품 화면 아님</span>
            </div>

            <div className={styles.mappingBody}>
              {/* Row 1: Person 01 */}
              <div className={styles.mappingRow}>
                <div className={styles.thumbBox} />
                <div className={styles.infoTrackArea}>
                  <div className={styles.metaLine}>
                    <span className={styles.name}>Person 01</span>
                    <span className={`${styles.effectTag} ${styles.mosaic}`}>Mosaic</span>
                    <span className={styles.desc}>거리 Near · 영역 크기 상대적 큼</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.filledSpan} style={{ left: '0%', width: '48%' }} />
                  </div>
                </div>
                <div className={styles.timeInOut}>
                  <span>IN 00:04</span>
                  OUT 00:38
                </div>
              </div>

              {/* Row 2: Person 02 */}
              <div className={styles.mappingRow}>
                <div className={`${styles.thumbBox} ${styles.thumbMedium}`} />
                <div className={styles.infoTrackArea}>
                  <div className={styles.metaLine}>
                    <span className={styles.name}>Person 02</span>
                    <span className={`${styles.effectTag} ${styles.blur}`}>Blur</span>
                    <span className={styles.desc}>거리 Mid · 영역 크기 상대적 중간</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.filledSpan} style={{ left: '32%', width: '45%' }} />
                  </div>
                </div>
                <div className={styles.timeInOut}>
                  <span>IN 00:22</span>
                  OUT 00:55
                </div>
              </div>

              {/* Row 3: Plate 01 */}
              <div className={styles.mappingRow}>
                <div className={`${styles.thumbBox} ${styles.thumbSmall}`} />
                <div className={styles.infoTrackArea}>
                  <div className={styles.metaLine}>
                    <span className={styles.name}>Plate 01</span>
                    <span className={`${styles.effectTag} ${styles.mosaic}`}>Mosaic</span>
                    <span className={styles.desc}>거리 Far · 영역 크기 상대적 작음</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.filledSpan} style={{ left: '16%', width: '26%' }} />
                  </div>
                </div>
                <div className={styles.timeInOut}>
                  <span>IN 00:10</span>
                  OUT 00:27
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 3: Bottom Product CTA
        =================================================================== */}
        <ProductCta />

      </div>
    </FrontLayout>
  );
}
