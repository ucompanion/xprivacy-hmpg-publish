import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './image-deid.module.scss';

const SECTION1_FEATURES = [
  {
    num: '01',
    title: '정밀한 객체 분석',
    desc: '필요한 대상 영역을 선별하여 차폐와 원형 보존을 병행 충족합니다.',
  },
  {
    num: '02',
    title: '운영 효율의 극대화',
    desc: '반복적인 수작업을 AI 기반 Workflow로 전환합니다.',
  },
  {
    num: '03',
    title: '비가역적 보안 변환',
    desc: '처리된 개인 정보를 원천으로 복원할 수 없는 방식으로 보호합니다.',
  },
];

const SECTION2_FEATURES = [
  {
    num: '01',
    title: '얼굴 및 이목구비 정밀 인식',
    desc: '각도, 조명, 안면 부분 가림 없이 딥러닝 AI가 안면의 이목구비를 정확히 탐지하여 식별을 차단할 수 있도록 안전하게 마스킹합니다.',
  },
  {
    num: '02',
    title: '신체 윤곽 및 독특한 식별 표식',
    desc: '얼굴 외에도 개인을 특정할 수 있는 문신, 점, 흉터 등 독특한 신체적 표식을 자동으로 감지하여 정밀 맞춤 마스킹을 제공합니다.',
  },
  {
    num: '03',
    title: '전신 윤곽 및 행동/신체 특성',
    desc: '체형, 헤어스타일, 착장 스타일 등 개인을 특정할 수 있는 전신적인 신체적 윤곽과 특성을 식별하여 세밀하게 비식별 처리합니다.',
  },
  {
    num: '04',
    title: '차량 번호판 및 브랜드 상표·로고',
    desc: '이동 대상의 번호판 숫자는 물론, 영상 이미지 속에 노출된 브랜드 상표와 상호 로고까지 자동으로 스캔하여 완벽하게 차단합니다.',
  },
];

export default function PubSubFeaturesImageDeid() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Section 1: 복원불가! 재식별 여지를 남기지 않습니다. */}
        <BasicSection
          className={styles.featureSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              복원불가! 재식별 여지를<br />
              남기지 않습니다.
            </>
          }
          description={
            <>
              역연산 등의 기계적 처리는 재식별 여지가 남습니다.<br className="mobile-only" />
              {' '}가명/익명처리 요건을 충족했다고 입증하기 어렵습니다.
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
          {/* De-Identified Result Visual Box */}
          <div className={styles.deidVisualBox}>
            <div className={styles.blurPersonLeft} />
            <div className={styles.blurPersonCenter} />
            <div className={styles.blurPlate} />
          </div>
        </BasicSection>

        {/* Section 2: 정밀 타겟팅 탐지 AI가 사소한 식별 요소까지 알아서 찾아줍니다. */}
        <BasicSection
          className={styles.featureSection}
          bg="white"
          layout="horizontal"
          align="left"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              정밀 타겟팅 탐지 AI가<br />
              사소한 식별 요소까지 알아서 찾아줍니다.
            </>
          }
          description={
            <>
              이목구비, 모자 착용 등 신체 특징 및 차량 번호판을 정밀 식별하여<br className="mobile-only" />
              {' '}원천 복원 없는 깔끔한 마스킹 제공.
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
          {/* Detection Preview Visual Box */}
          <div className={styles.detectionVisualBox}>
            {/* Person 1 Box */}
            <div className={styles.detectPersonLeft}>
              <span className={styles.boxTag}>FACE: BODY</span>
            </div>

            {/* Person 2 Box */}
            <div className={styles.detectPersonCenter}>
              <span className={styles.boxTag}>FACE: BODY</span>
            </div>

            {/* Plate Box */}
            <div className={styles.detectPlate}>
              <span className={styles.boxTag}>PLATE</span>
            </div>

            {/* Bottom Status Banner */}
            <div className={styles.bottomPreviewBanner}>
              <span className={styles.dot} />
              <span className={styles.bannerText}>DETECTION PREVIEW (자동 AI 정밀 객체 탐지 화면)</span>
            </div>
          </div>
        </BasicSection>

        {/* Section 3: Bottom CTA */}
        <ProductCta />

      </div>
    </FrontLayout>
  );
}
