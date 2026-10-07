import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './processing-engine.module.scss';

const SPEED_STEPS = [
  { num: '01', text: '초당 처리 속도 극대화 (고화질 영상 기준 4배속)' },
  { num: '02', text: '대용량 영상 연속 처리 시 지연 최소화' },
  { num: '03', text: '멀티스레드 기반 병렬 처리 파이프라인 (CPU+GPU 하이브리드 연산)' },
  { num: '04', text: '다중 스트림 동시 처리 지원 (확장형 구조)' },
];

const GPU_STEPS = [
  { num: '01', text: 'INPUT (영상 입력 스트림)' },
  { num: '02', text: 'DECODE (하드웨어 디코딩)' },
  { num: '03', text: 'DETECTION & TRACKING' },
  { num: '04', text: 'DE-IDENTIFY & ENCODE (비식별화 및 인코딩)' },
];

const BENCHMARK_DATA = [
  {
    group: 'FHD (1080p) [1920x1080]',
    rows: [
      { name: '10분 영상 (18,000 프레임)', fps: '120 fps', time: '2분 30초', speed: '4.0 배' },
      { name: '30분 영상 (54,000 프레임)', fps: '120 fps', time: '7분 30초', speed: '4.0 배' },
      { name: '60분 영상 (108,000 프레임)', fps: '120 fps', time: '15분', speed: '4.0 배' },
    ],
  },
  {
    group: '4K (UHD) [3840x2160]',
    rows: [
      { name: '10분 영상 (18,000 프레임)', fps: '60 fps', time: '5분', speed: '2.0 배' },
      { name: '30분 영상 (54,000 프레임)', fps: '60 fps', time: '15분', speed: '2.0 배' },
      { name: '60분 영상 (108,000 프레임)', fps: '60 fps', time: '30분', speed: '2.0 배' },
    ],
  },
];

const EFFECT_ITEMS = [
  { num: '01', title: '처리 소요 시간 단축' },
  { num: '02', title: '영상 데이터 보관 비용 및 서버 부하 감축' },
  { num: '03', title: '고연산 작업의 프로세스 병목 최소화' },
  { num: '04', title: '대용량 영상 가공 효율 극대화' },
];

export default function PubSubTechnologyProcessingEngine() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          className={styles.techHero}
          align="left"
          bgImage="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1600&q=80"
          eyebrow="AI-DRIVEN DE-IDENTIFICATION ACCELERATION ENGINE"
          title={
            <>
              검출-후-추적(MOT) 엔진으로<br />
              멈춤 없는 일관된 트랙 비식별
            </>
          }
          description={
            <>
              딥러닝 기반의 Re-ID 기술로 프레임이 바뀌거나<br className="mobile-only" />
              {' '}가림이 발생해도 동일 인물의 ID를 끝까지 유지합니다.
            </>
          }
        />

        {/* Section 1: HIGH-EFFICIENCY PROCESSING ENGINE (bg="white") */}
        <BasicSection
          className={styles.engineSpeedSection}
          bg="white"
          layout="vertical"
          align="center"
          eyebrow="HIGH-EFFICIENCY PROCESSING ENGINE"
          title={
            <>
              약 4배 빠른 초고속처리와<br />
              고연산 안정성으로 완성하는 압도적 가공 효율
            </>
          }
          description={
            <>
              실시간(1배속) 대비 4배 빠른 속도로 영상을 신속하게 처리하여 대기시간을 혁신적으로 단축합니다.<br className="desktop-only" />
              자체 개발 멀티 스레드 파이프라인 구조로 연산 부하를 분산하여, 고해상도 대용량 영상에서도 프레임 누락 없이<br className="desktop-only" />
              안정적인 가공 성능을 지속적으로 유지합니다.
            </>
          }
        >
          {/* 2-Column Processing Cards */}
          <div className={styles.engineCardsGrid}>
            {/* Card 1: Hyper-Fast Processing Speed */}
            <div className={styles.engineCard}>
              <span className={styles.cardEyebrow}>ULTRA-FAST PROCESSING</span>
              <h3 className={styles.cardTitle}>Hyper-Fast Processing Speed</h3>
              <p className={styles.cardDesc}>
                실시간(1배속) 대비 4배 빠른 속도로 영상을 신속하게 처리하여 대기시간을 단축합니다.
                고화질 영상도 지연 없이 처리하여 작업 처리 속도를 극대화합니다.
              </p>
              
              <div className={styles.stepList}>
                {SPEED_STEPS.map((step) => (
                  <div key={step.num} className={styles.stepItem}>
                    <span className={styles.stepNum}>{step.num}</span>
                    <span className={styles.stepText}>{step.text}</span>
                  </div>
                ))}
              </div>

              <p className={styles.cardFootnote}>
                * 1080p 30fps 영상 기준 / GPU(RTX 4090) 환경 기준 / 실시간 대비 최대 4배 처리 속도
              </p>
            </div>

            {/* Card 2: GPU Processing Pipeline */}
            <div className={styles.engineCard}>
              <span className={styles.cardEyebrow}>GPU ACCELERATION PIPELINE</span>
              <h3 className={styles.cardTitle}>GPU Processing Pipeline</h3>
              <p className={styles.cardDesc}>
                독립된 하드웨어 가속 구조를 적용하여 다중 스트림 환경에서도 안정적인 프레임을 유지합니다.
                최적화된 아키텍처를 통해 GPU 자원을 효율적으로 분배하여 시스템 성능을 극대화합니다.
              </p>

              <div className={styles.stepList}>
                {GPU_STEPS.map((step) => (
                  <div key={step.num} className={styles.stepItem}>
                    <span className={styles.stepNum}>{step.num}</span>
                    <span className={styles.stepText}>{step.text}</span>
                  </div>
                ))}
              </div>

              <p className={styles.cardFootnote}>
                * GPU 메모리 사용률 최적화 / 병목 현상 방지 아키텍처 적용
              </p>
            </div>
          </div>

          {/* Speed Compare Visual Banner */}
          <div className={styles.speedCompareBanner}>
            <div className={styles.imageSplitWrap}>
              <div className={styles.splitImgLeft}>
                <div className={styles.playOverlayIcon} aria-label="재생">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className={styles.splitImgRight} />
            </div>

            {/* Central Highlight Badge */}
            <div className={styles.compareBadge}>
              <span className={styles.badgeMain}>30초 영상을 8초 만에 처리</span>
              <span className={styles.badgeSub}>실시간 대비 4배 빠른 처리 시간</span>
            </div>
          </div>
        </BasicSection>

        {/* Section 2: RESTRICTION & ATTENUATION (bg="white") */}
        <BasicSection
          className={styles.benchmarkSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="RESTRICTION & ATTENUATION"
          title={
            <>
              절대적 시간을 효과적으로<br />
              단축, 배포 주기 가속화
            </>
          }
          description="초고속 영상 비식별 엔진은 영상 전처리 및 검출·추적 파이프라인을 효율적으로 최적화하여 대용량 영상도 실시간 대비 4배 이상 빠르게 처리함으로써 영상 데이터 배포 주기를 비약적으로 단축시킵니다."
        >
          <div className={styles.tableCard}>
            <div className={styles.tableResponsive}>
              <table className={styles.benchmarkTable}>
                <thead>
                  <tr>
                    <th>영상 해상도</th>
                    <th>처리 속도</th>
                    <th>소요 시간</th>
                    <th>처리 배속</th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARK_DATA.map((group) => (
                    <React.Fragment key={group.group}>
                      <tr className={styles.groupHeaderRow}>
                        <td colSpan={4}>{group.group}</td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={row.name}>
                          <td>{row.name}</td>
                          <td>{row.fps}</td>
                          <td>{row.time}</td>
                          <td className={styles.speedHighlight}>{row.speed}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.tableFootnote}>
              * 자체 테스트 기준 (NVIDIA RTX 4090 환경). 영상 복잡도 및 객체 수에 따라 실제 결과는 달라질 수 있습니다.
            </p>
          </div>
        </BasicSection>

        {/* Section 3: 도입효과 (bg="gray") */}
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
