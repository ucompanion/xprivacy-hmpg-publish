import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import { IconSurface } from '../../../components/core/Icon/IconSurface';
import { BenefitCardGroup } from '../../../components/domain/Benefit/BenefitCards';
import styles from './processing-engine.module.scss';

const IMG = '/images/technology/processing-engine';

// Privacy & Processing Engine (Figma PC 2165:7515 / Mobile 2165:7740)
const ENGINES = [
  {
    tag: 'PRIVACY ENGINE',
    title: 'Hyper-Fast Processing Speed',
    desc: [
      '가장 대중적인 얼굴 모자이크 방식은 실시간보다 빠른 속도로 작업을 완료합니다.',
      '대용량 영상도 신속하게 처리할 수 있어 프로젝트 운영 효율을 높입니다.',
    ],
    steps: ['OBJECT SIZE / TARGET AREA', 'INTENSITY CONTROL', 'BLUR / MOSAIC / MASK / VIRTUAL FACE', 'IRREVERSIBLE RESULT'],
    note: '객체 크기를 기준으로 가림 강도를 조정해 프레임마다 처리 결과를 일정하게 유지합니다.',
  },
  {
    tag: 'PROCESSING ENGINE',
    title: 'GPU Processing Pipeline',
    desc: [
      '가상 얼굴 변환이나 전신 블러/모자이크와 같이 연산량이 많은 고차원 작업에서도',
      '지연을 최소화한 안정적인 효율을 보여줍니다.',
    ],
    steps: ['APPLICATION', 'WORKER / QUEUE', 'DETECTION / TRACKING', 'RENDERING / MODEL SERVING'],
    note: '처리 성능 수치는 환경에 따라 달라질 수 있습니다.',
  },
];

// 테스트 환경 (Figma PC 2165:7584 / Mobile 2165:7872)
const TEST_ENV = [
  { glyph: 'glyph_resolution.svg', label: '해상도', value: 'FHD(30fps)' },
  { glyph: 'glyph_duration.svg', label: '영상 길이', value: '30초' },
  { glyph: 'glyph_people.svg', label: '등장 인원', value: '4인 · 1인' },
];

// 처리 속도 표 (자사 테스트)
const BENCHMARK_GROUPS = [
  {
    info: ['FHD(30fps)', '30초, 4인'],
    rows: [
      { method: '(얼굴) 모자이크', fps: '120 fps', time: '8초' },
      { method: '(얼굴) 마스킹', fps: '110 fps', time: '8초' },
      { method: '(얼굴) 블러', fps: '52 fps', time: '17초' },
    ],
  },
  {
    info: ['FHD(30fps)', '30초, 1인'],
    rows: [
      { method: '(얼굴) 가상 얼굴', fps: '36 fps', time: '25초' },
      { method: '(신체) 모자이크', fps: '21 fps', time: '42초' },
      { method: '(신체) 마스킹', fps: '21 fps', time: '42초' },
      { method: '(신체) 블러', fps: '18 fps', time: '50초' },
    ],
  },
];

// 도입 효과 (Figma PC 2165:7684 / Mobile 2165:7900)
const BENEFITS = [
  {
    glyph: 'glyph_speed.svg',
    title: '작업 소요 시간 단축',
    desc: '모자이크 등 기본 비식별은 실시간보다 빠르게 처리해 작업 시간을 줄입니다.',
  },
  {
    glyph: 'glyph_cycle.svg',
    title: '영상 데이터 보안 처리 및 반출 주기 단축',
    desc: '처리 시간이 줄어 영상 데이터의 보안 처리와 배포 주기가 빨라집니다.',
  },
  {
    glyph: 'glyph_bottleneck.svg',
    title: '고연산 AI 작업의 프로세스 병목 최소화',
    desc: '가상 얼굴 변환·전신 마스킹 같은 고연산 작업에서도 지연을 최소화합니다.',
  },
  {
    glyph: 'glyph_manual.svg',
    title: '담당자 수동 가공 공수 최소화',
    desc: '동일 인물을 끊김 없이 자동 추적해 프레임별 수동 보정 작업을 줄입니다.',
  },
];

export default function PubSubTechnologyProcessingEngine() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2165:7508 / Mobile 2165:7733) */}
        <HeroSection
          heroVariant="compact"
          bgPreset="technology"
          className={styles.engineHero}
          eyebrow="PROCESSING ENGINE"
          title={
            <>
              GPU 기반 처리<br className="mobileBr" /> 엔진으로<br className="pcBr" /> 대용량
              <br className="mobileBr" /> 영상도 빠르고<br className="mobileBr" /> 안정적으로
            </>
          }
          description="얼굴 모자이크 · 마스킹 · 블러는 실시간보다 빠르게 처리하고, 가상 얼굴 · 전신 처리처럼 연산량이 많은 작업도 지연을 줄여 안정적으로 처리합니다."
        />

        {/* 2. Privacy & Processing Engine */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="PRIVACY & PROCESSING ENGINE"
          title="초고속 처리와 고연산 안정성으로 높이는 가공 효율"
          description="얼굴 모자이크 · 마스킹 · 블러는 실시간보다 빠른 속도로 대용량 영상을 신속하게 비식별화합니다. 가상 얼굴 변환 및 전신 마스킹과 같은 고연산 딥러닝 작업 환경에서도 지연을 줄여 처리 성능을 안정적으로 유지합니다."
        >
          <div className={styles.engines}>
            {ENGINES.map((engine) => (
              <div key={engine.tag} className={styles.engineCard}>
                <div className={styles.engineHead}>
                  <span className={styles.engineTag}>{engine.tag}</span>
                  <h3 className={styles.engineTitle}>{engine.title}</h3>
                  <p className={styles.engineDesc}>
                    {engine.desc[0]}
                    <br className="pcBr" /> {engine.desc[1]}
                  </p>
                </div>
                <ol className={styles.flow}>
                  {engine.steps.map((step, idx) => (
                    <li key={step} className={styles.flowStep}>
                      <span className={styles.flowNum}>{String(idx + 1).padStart(2, '0')}</span>
                      <span className={styles.flowLabel}>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.engineNote}>{engine.note}</p>
              </div>
            ))}
          </div>
        </BasicSection>

        {/* 3. Detection & Tracking (Figma PC 2165:7560 / Mobile 2165:7785) */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={styles.performance}>
            {/* 원본 영상 → 처리 → 비식별 결과 */}
            <div className={styles.compare}>
              <figure className={styles.video}>
                <div className={styles.videoFrame}>
                  <img src={`${IMG}/video_raw.jpg`} alt="회의실 인물이 담긴 원본 영상 장면" />
                  <span className={styles.playButton} aria-hidden="true">
                    <img src={`${IMG}/icon_play.svg`} alt="" />
                  </span>
                </div>
                <figcaption className={styles.videoLabel}>원본 영상</figcaption>
              </figure>

              <div className={styles.callout}>
                <div className={styles.calloutText}>
                  <strong className={styles.calloutTitle}>영상 길이보다 짧은 시간에 처리</strong>
                  <span className={styles.calloutSub}>얼굴 비식별은 실시간보다 빠르게 처리</span>
                </div>
                <img src={`${IMG}/icon_arrow.svg`} alt="" className={styles.calloutArrow} aria-hidden="true" />
              </div>

              <figure className={styles.video}>
                <div className={styles.videoFrame}>
                  <img src={`${IMG}/video_deid.jpg`} alt="인물 얼굴이 모자이크 처리된 비식별 결과 장면" />
                </div>
                <figcaption className={styles.videoLabel}>비식별 처리 결과</figcaption>
              </figure>
            </div>

            <div className={styles.perfBody}>
              <div className={styles.perfIntro}>
                <span className={styles.perfEyebrow}>PERFORMANCE</span>
                <h2 className={styles.perfHeading}>
                  시간을 효과적으로 단축
                  <br />
                  배포 주기 가속화
                </h2>
                <p className={styles.perfLead}>
                  비식별화 작업에 소요되는 절대적인 시간을 혁신적으로 단축하여 영상 데이터의
                  <br className="pcBr" /> 보안 처리 및 배포 주기를 가속화하고 전반적인 프로젝트 운영 효율을 극대화합니다.
                </p>
              </div>

              <div className={styles.testEnv}>
                <h3 className={styles.testEnvTitle}>테스트 환경</h3>
                <ul className={styles.testItems}>
                  {TEST_ENV.map((item) => (
                    <li key={item.label} className={styles.testItem}>
                      <IconSurface src={`${IMG}/${item.glyph}`} size={32} className={styles.testIcon} />
                      <span className={styles.testLabel}>{item.label}</span>
                      <span className={styles.testValue}>{item.value}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.testNote}>
                  실제 처리 성능은 하드웨어 사양, 영상 해상도, 등장 인원 수에 따라 달라질 수 있습니다.
                </p>
              </div>

              <div className={styles.benchmark}>
                {/* PC: 영상 정보 열 병합 4열 */}
                <table className={`${styles.table} ${styles.tablePc}`}>
                  <thead>
                    <tr>
                      <th scope="col">영상 정보</th>
                      <th scope="col">비식별 방식</th>
                      <th scope="col">처리 속도</th>
                      <th scope="col">처리 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BENCHMARK_GROUPS.map((group, gIdx) =>
                      group.rows.map((row, idx) => (
                        <tr key={row.method}>
                          {idx === 0 && (
                            <th
                              scope="rowgroup"
                              rowSpan={group.rows.length}
                              className={`${styles.groupInfo} ${gIdx === BENCHMARK_GROUPS.length - 1 ? styles.lastGroup : ''}`.trim()}
                            >
                              {group.info[0]}
                              <br />
                              {group.info[1]}
                            </th>
                          )}
                          <td>{row.method}</td>
                          <td>{row.fps}</td>
                          <td>{row.time}</td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>

                {/* MO: 그룹 라벨 행 + 3열 */}
                <table className={`${styles.table} ${styles.tableMo}`}>
                  <thead>
                    <tr>
                      <th scope="col">비식별 방식</th>
                      <th scope="col">처리 속도</th>
                      <th scope="col">처리 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BENCHMARK_GROUPS.map((group) => (
                      <React.Fragment key={group.info[1]}>
                        <tr className={styles.groupLabel}>
                          <th scope="rowgroup" colSpan={3}>
                            {group.info[0]} · {group.info[1]}
                          </th>
                        </tr>
                        {group.rows.map((row) => (
                          <tr key={row.method}>
                            <td>{row.method}</td>
                            <td>{row.fps}</td>
                            <td>{row.time}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <p className={styles.tableNote}>※ 자사 테스트 기준. 실제 처리 성능은 환경에 따라 달라질 수 있습니다.</p>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 4. 도입 효과 */}
        <BasicSection bg="white" layout="vertical" align="left" eyebrow="BENEFITS" title="도입 효과">
          <BenefitCardGroup
            bordered
            items={BENEFITS.map((item) => ({
              glyph: `${IMG}/${item.glyph}`,
              title: item.title,
              desc: item.desc,
            }))}
          />
        </BasicSection>

        {/* 5. CTA */}
        <CtaSection
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 서비스를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
          primaryLabel="도입 문의하기"
          secondaryLabel="데모 체험하기"
          primaryHref="/pub/contact/inquiry"
          secondaryHref="/pub/demo/image"
        />
      </div>
    </FrontLayout>
  );
}
