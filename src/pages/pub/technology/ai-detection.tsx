import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { BenefitCardGroup } from '../../../components/domain/Benefit/BenefitCards';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './ai-detection.module.scss';

const IMG = '/images/technology/ai-detection';

const effects = [
  {
    glyph: 'glyph_evidence.svg',
    title: '원본 증거 능력 보존',
    desc: '필요한 영역만 정밀하게 가려 수사 자료의 배경 정보를 그대로 보존합니다.',
  },
  {
    glyph: 'glyph_research.svg',
    title: '고품질 연구 데이터 확보',
    desc: '개인 식별 정보만 가리고 나머지 영상 정보는 유지해 연구·분석 데이터로 활용할 수 있습니다.',
  },
  {
    glyph: 'glyph_quality.svg',
    title: '고화질 미관 보존',
    desc: '비식별 영역이 배경을 침범하지 않아 고화질 콘텐츠의 미관과 몰입도를 지킵니다.',
  },
  {
    glyph: 'glyph_legal.svg',
    title: '법적 리스크 최소화',
    desc: '개인정보보호법과 관계 부처 가이드라인에 맞춰 영상 속 개인정보를 비식별 처리합니다.',
  },
];

export default function PubSubTechnologyAiDetection() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>

        {/* 1. Hero Section (Compact Light Glass) */}
        <HeroSection
          heroVariant="compact"
          className={styles.techHero}
          eyebrow="AI DETECTION"
          title={
            <>
              AI가 사소한 식별 요소까지<br />
              알아서 찾고, 정밀하게 가립니다
            </>
          }
          description="AI가 얼굴과 신체, 번호판까지 정밀하게 탐지하여 안전하게 보호합니다."
        />

        {/* 2. AI DATA (Figma PC 2165:6045 / Mobile 2165:6160) */}
        <BasicSection
          bg="white"
          layout="horizontal"
          contentClassName={styles.aiDataLayout}
          eyebrow="AI DATA"
          title="객체의 위치와 형태를 정밀하게 분석"
          description="이목구비와 신체 윤곽선을 정밀하게 분석해 대상 영역만 비식별화하고, 배경 데이터 손실을 최소화합니다."
          headerExtra={
            <div className={styles.copyBlock}>
              <ul className={styles.pointsList}>
                <li className={styles.pointItem}>
                  <h4 className={styles.pointTitle}>객체 타겟팅</h4>
                  <p className={styles.pointDesc}>
                    얼굴은 이목구비 중심의 타원형 영역으로, 신체는 실루엣을 따라가는 전신 세그멘테이션으로 최적화된 탐지 방식을 적용합니다.
                  </p>
                </li>
                <li className={styles.pointItem}>
                  <h4 className={styles.pointTitle}>배경 손실 최소화</h4>
                  <p className={styles.pointDesc}>
                    정밀한 영역 지정 기술로 비식별 영역이 배경을 침범하지 않도록 하여 영상의 본래 가치와 몰입도를 온전히 보존합니다.
                  </p>
                </li>
              </ul>

              <div className={styles.targetCards}>
                <div className={styles.targetCard}>
                  <h5 className={styles.targetTitle}>얼굴 및 이목구비 정밀 인식</h5>
                  <p className={styles.targetDesc}>딥러닝 AI가 이목구비를<br className={styles.pcBr} /> 정밀하게 탐지</p>
                </div>
                <div className={styles.targetCard}>
                  <h5 className={styles.targetTitle}>신체 윤곽 식별</h5>
                  <p className={styles.targetDesc}>전신 실루엣을 따라 신체 영역을 탐지</p>
                </div>
              </div>
            </div>
          }
        >
          <div className={styles.visual}>
            {/* 얼굴: 원본 → 자사(타원) / 타사(사각) */}
            <div className={styles.faceRow}>
              <figure className={styles.faceCard}>
                <div className={styles.facePhoto}>
                  <img src={`${IMG}/face_raw.jpg`} alt="얼굴 원본" />
                </div>
                <figcaption className={styles.cardLabel}>원본</figcaption>
              </figure>

              <img src={`${IMG}/icon_arrow.svg`} alt="" aria-hidden="true" className={styles.arrow} />

              <figure className={`${styles.faceCard} ${styles.featured}`}>
                <div className={styles.facePhoto}>
                  <img src={`${IMG}/face_xprivacy.jpg`} alt="xPrivacy 타원형 얼굴 탐지" />
                  <img src={`${IMG}/face_ellipse.svg`} alt="" aria-hidden="true" className={styles.ellipse} />
                </div>
                <figcaption className={styles.cardLabel}>xPrivacy</figcaption>
              </figure>

              <figure className={`${styles.faceCard} ${styles.general}`}>
                <div className={styles.facePhoto}>
                  <img src={`${IMG}/face_general.jpg`} alt="일반 방식 사각형 얼굴 탐지" />
                  <span className={styles.rect} aria-hidden="true" />
                </div>
                <figcaption className={styles.cardLabel}>일반 방식</figcaption>
              </figure>
            </div>

            {/* 전신: 원본 / 전신 세그멘테이션 */}
            <div className={styles.bodyRow}>
              <figure className={styles.bodyCard}>
                <div className={styles.bodyPhoto}>
                  <img src={`${IMG}/body_raw.jpg`} alt="전신 원본" />
                </div>
                <figcaption className={styles.cardLabel}>원본</figcaption>
              </figure>
              <figure className={styles.bodyCard}>
                <div className={styles.bodyPhoto}>
                  <img src={`${IMG}/body_seg.jpg`} alt="전신 세그멘테이션" />
                </div>
                <figcaption className={styles.cardLabel}>전신 세그멘테이션</figcaption>
              </figure>
            </div>
          </div>
        </BasicSection>

        {/* 3. 도입 효과 (Figma PC 2165:6096 / Mobile 2165:6209) */}
        <BasicSection bg="gray" layout="vertical" align="left" eyebrow="BENEFITS" title="도입 효과">
          <BenefitCardGroup
            bordered
            items={effects.map((item) => ({
              glyph: `${IMG}/${item.glyph}`,
              title: item.title,
              desc: item.desc,
            }))}
          />
        </BasicSection>

        {/* 4. CTA */}
        <ProductCta
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 서비스를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 제품을 먼저 확인해보거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
          solidButtonText="도입 문의하기"
          outlineButtonText="데모 체험하기"
        />

      </div>
    </FrontLayout>
  );
}
