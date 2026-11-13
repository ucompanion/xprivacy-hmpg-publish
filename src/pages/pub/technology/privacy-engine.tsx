import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import { BenefitCardGroup } from '../../../components/domain/Benefit/BenefitCards';
import styles from './privacy-engine.module.scss';

const IMG = '/images/technology/privacy-engine';

// 4종 비식별 옵션 (Figma PC 3869:28443 / Mobile 3869:28665 · 사진 4093:71871)
// 샘플은 비식별 처리(Masking · Mosaic · Gaussian Blur)가 포함된 통이미지로 사용합니다.

const DEID_OPTIONS: {
  id: string;
  title: string;
  desc?: [string, string];
  image: string;
}[] = [
  { id: 'original', title: '원본', image: 'sample_raw.webp' },
  {
    id: 'masking',
    title: 'Masking',
    desc: ['정황 데이터는 유지하면서', '식별 정보만 차단'],
    image: 'sample_masking.webp',
  },
  {
    id: 'mosaic',
    title: 'Mosaic',
    desc: ['규격화된 격자 블록 형태로', '직관적 가림 처리 제공'],
    image: 'sample_mosaic.webp',
  },
  {
    id: 'blur',
    title: 'Gaussian Blur',
    desc: ['경계면을 부드럽게 흐려', '시각적 몰입도와 미관 보존'],
    image: 'sample_blur.webp',
  },
  {
    id: 'virtual',
    title: 'Virtual Face',
    desc: ['원본 신원을 보호하는 자연스러운', '가상 얼굴로 치환'],
    image: 'sample_virtual.webp',
  },
];

// 도입 효과 (Figma PC 2165:8553 / Mobile 2165:8691)
const BENEFITS = [
  {
    glyph: 'glyph_workflow.svg',
    title: 'All-in-One 원스톱 비식별 워크플로우',
    desc: '서드파티 편집 프로그램이나 별도 툴 없이 하나의 솔루션에서 비식별 가공을 마칠 수 있습니다.',
  },
  {
    glyph: 'glyph_custom.svg',
    title: '객체별·목적별 맞춤 비식별 적용',
    desc: '얼굴, 신체, 번호판마다 활용 목적과 보안 수위에 맞는 방식을 선택해 적용합니다.',
  },
  {
    glyph: 'glyph_slider.svg',
    title: '슬라이더 기반의 실시간 품질 조율',
    desc: '복잡한 수치 입력 없이 슬라이더로 비식별 강도를 바로 조정합니다.',
  },
];

// 시안 통이미지 대체 텍스트: 이미지 안의 설정 UI 내용을 함께 전달
const VISION_ALT =
  '버스 정류장 도로 사진에 대상별 비식별 방식과 강도가 적용된 예시 화면. 1 얼굴 Gaussian Blur, 2 신체 Masking, 3 번호판 Gaussian Blur,4 텍스트(상호, 로고) Gaussian Blur이 선택되어 있고 모자이크 픽셀 크기와 블러 강도 슬라이더가 표시됩니다.';

export default function PubSubTechnologyPrivacyEngine() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2165:8461 / Mobile 2165:8596) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          category="technology"
          className={styles.techHero}
          eyebrow="PRIVACY ENGINE"
          title={
            <>
              사용 목적과<br className="heroMoBr" /> 가이드라인에<br className="pcBr" /> 맞춘
              <br className="heroMoBr" /> 최적의 비식별<br className="heroMoBr" /> 스타일 제공
            </>
          }
          description="목적에 맞춰 단순 모자이크, 가우시안 블러, 마스킹 등 다양한 비식별화 방식을 간편하게 선택·적용할 수 있습니다."
        />

        {/* 2. 4종 비식별 옵션 (Figma PC 3869:28443 / Mobile 3869:28665) */}
        <BasicSection bg="white" layout="vertical" align="left" className={styles.optionsSection}>
          <div className={styles.intro}>
            <div className={styles.introHead}>
              <p className={styles.introEyebrow}>DE-IDENTIFICATION OPTIONS</p>
              <h2 className={styles.introTitle}>
                객체 크기에 맞춘 일관된
                <br className="heroMoBr" /> 강도, 적정성을 고려한 4종
                <br className="heroMoBr" /> 비식별 옵션
              </h2>
            </div>
            <p className={styles.introLead}>
              객체 크기에 맞춰 블러 강도를 자동으로 조절하고,
              <br className="heroMoBr" /> 4종 가공 방식 중 목적에 맞는 방식을 적용해 과도한
              <br className="heroMoBr" /> 처리를 막고 일관된 보안 수준을 유지합니다.
            </p>
          </div>

          <ul className={styles.optionList}>
            {DEID_OPTIONS.map((opt) => (
              <li key={opt.id} className={styles.option}>
                <div className={styles.sample}>
                  <img src={`${IMG}/${opt.image}`} alt={`${opt.title} 처리 예시`} />
                </div>
                <div className={styles.optionText}>
                  <h3 className={styles.optionTitle}>{opt.title}</h3>
                  {opt.desc && (
                    <p className={styles.optionDesc}>
                      {opt.desc[0]}
                      <br className={styles.fitBrOption} /> {opt.desc[1]}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </BasicSection>

        {/* 3. Our Vision (Figma PC 4036:136 / Mobile 4037:2)
            예시 화면(사진 + 대상×방식 선택값 + 강도 슬라이더 UI)은 코드로 만들지 않고 시안 통이미지로 사용합니다. */}
        <BasicSection bg="gray" layout="vertical" align="left" className={styles.visionSection}>
          <div className={styles.intro}>
            <div className={styles.introHead}>
              <p className={styles.introEyebrow}>OUR VISION</p>
              <h2 className={styles.introTitle}>
                별도 툴 없이, 하나의
                <br className="heroMoBr" /> 솔루션에서 끝내는
                <br className="heroMoBr" /> 원스톱 비식별 가공
              </h2>
            </div>
          </div>

          <div className={styles.visionDemo}>
            {/* PC: 사진 + 설정 패널 통이미지 1240×680 */}
            <img src={`${IMG}/vision_demo.jpg`} alt={VISION_ALT} className={styles.visionDemoPc} width={1240} height={680} loading="lazy" />
            {/* MO: 사진(확대 포함) / 설정 패널 2장을 세로로 */}
            <div className={styles.visionDemoMo}>
              <img src={`${IMG}/vision_demo_mo_photo.jpg`} alt={VISION_ALT} width={350} height={366} loading="lazy" />
              <img src={`${IMG}/vision_demo_mo_panel.png`} alt="" aria-hidden="true" className={styles.visionPanel} width={350} height={642} loading="lazy" />
            </div>
          </div>

          <div className={styles.visionDescs}>
            <div className={styles.visionDesc}>
              <h3 className={styles.visionDescTitle}>4가지 방식 × 대상별 조합, 총 13가지 옵션</h3>
              <p className={`${styles.visionDescText} ${styles.visionDescTight}`}>
                모자이크 · 마스킹 · 블러 · 가상 얼굴 4가지 방식을
                <br className="heroMoBr" /> 대상별로 조합해 총 13가지 옵션을 제공합니다.
                <br className={styles.fitBrDesc} /> (얼굴 4 · 신체 3 · 번호판 3 · 텍스트 3) 활용 목적과
                <br className="heroMoBr" /> 보안 수위에 따라 최적의 방식을 선택합니다.
              </p>
            </div>
            <div className={styles.visionDesc}>
              <h3 className={styles.visionDescTitle}>비식별 강도 조절</h3>
              <p className={styles.visionDescText}>
                모자이크 픽셀 크기, 블러 강도 등을 슬라이더로 즉시
                <br className="heroMoBr" /> 조정할 수 있습니다.
                <br className={styles.fitBrDesc} /> 복잡한 수치 입력 없이 원하는
                <br className="heroMoBr" /> 수준의 비식별 강도를 직관적으로 조절합니다.
              </p>
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
