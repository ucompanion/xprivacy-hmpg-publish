import { useState } from 'react';
import type { CSSProperties } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { BenefitCardGroup } from '../../../components/domain/Benefit/BenefitCards';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './privacy-engine.module.scss';

const IMG = '/images/technology/privacy-engine';

// 4종 비식별 옵션 (Figma PC 2165:8468 / Mobile 2165:8603)
// 샘플 가림 효과는 원본 사진 위에 CSS로 표현 (Masking · Mosaic · Gaussian Blur)
type SampleEffect = 'none' | 'masking' | 'mosaic' | 'blur';

const DEID_OPTIONS: {
  id: string;
  title: string;
  desc?: [string, string];
  image: string;
  effect: SampleEffect;
}[] = [
  { id: 'original', title: '원본', image: 'sample_raw.jpg', effect: 'none' },
  {
    id: 'masking',
    title: 'Masking',
    desc: ['정황 데이터는 유지하면서', '식별 정보만 차단'],
    image: 'sample_raw.jpg',
    effect: 'masking',
  },
  {
    id: 'mosaic',
    title: 'Mosaic',
    desc: ['규격화된 격자 블록 형태로', '직관적 가림 처리 제공'],
    image: 'sample_raw.jpg',
    effect: 'mosaic',
  },
  {
    id: 'blur',
    title: 'Gaussian Blur',
    desc: ['경계면을 부드럽게 흐려', '시각적 몰입도와 미관 보존'],
    image: 'sample_raw.jpg',
    effect: 'blur',
  },
  {
    id: 'virtual',
    title: 'Virtual Face',
    desc: ['원본 신원을 보호하는 자연스러운', '가상 얼굴로 치환'],
    image: 'sample_virtual.jpg',
    effect: 'none',
  },
];

// 모자이크 격자: 6열 × 9행
const MOSAIC_CELLS = Array.from({ length: 54 }, (_, i) => `cell-${i}`);

const MATRIX_ROWS = [
  { category: '얼굴', chips: ['Mosaic', 'Masking', 'Gaussian Blur', 'Virtual Face'] },
  { category: '신체', chips: ['Mosaic', 'Masking', 'Gaussian Blur'] },
  { category: '번호판', chips: ['Mosaic', 'Masking', 'Gaussian Blur'] },
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

function SampleOverlay({ effect }: { effect: SampleEffect }) {
  if (effect === 'masking') return <span className={styles.maskShape} aria-hidden="true" />;
  if (effect === 'blur') return <span className={styles.blurShape} aria-hidden="true" />;
  if (effect === 'mosaic') {
    return (
      <span className={styles.mosaicGrid} aria-hidden="true">
        {MOSAIC_CELLS.map((cell) => (
          <span key={cell} />
        ))}
      </span>
    );
  }
  return null;
}

function StrengthSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className={styles.sliderField}>
      <span className={styles.sliderLabel}>{label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.rangeInput}
        style={{ '--fill': `${value}%` } as CSSProperties}
      />
    </label>
  );
}

export default function PubSubTechnologyPrivacyEngine() {
  // 시안 초기 위치: 모자이크 194/486(40%) · 블러 316/486(65%)
  const [mosaicSize, setMosaicSize] = useState(40);
  const [blurStrength, setBlurStrength] = useState(65);

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2165:8461 / Mobile 2165:8596) */}
        <HeroSection
          heroVariant="compact"
          bgPreset="technology"
          className={styles.techHero}
          eyebrow="PRIVACY ENGINE"
          title={
            <>
              사용 목적과<br className="mobileBr" /> 가이드라인에<br className="pcBr" /> 맞춘
              <br className="mobileBr" /> 최적의 비식별<br className="mobileBr" /> 스타일 제공
            </>
          }
          description="목적에 맞춰 단순 모자이크, 가우시안 블러, 마스킹 등 다양한 비식별화 방식을 간편하게 선택·적용할 수 있습니다."
        />

        {/* 2. 4종 비식별 옵션 */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="DE-IDENTIFICATION OPTIONS"
          title="객체 크기에 맞춘 일관된 강도, 적정성을 고려한 4종 비식별 옵션"
          description="객체 크기에 맞춰 블러 강도를 자동으로 조절하고, 4종 가공 방식 중 목적에 맞는 방식을 적용해 과도한 처리를 막고 일관된 보안 수준을 유지합니다."
        >
          <ul className={styles.optionList}>
            {DEID_OPTIONS.map((opt) => (
              <li key={opt.id} className={styles.option}>
                <div className={styles.sample}>
                  <img src={`${IMG}/${opt.image}`} alt={`${opt.title} 처리 예시`} />
                  <SampleOverlay effect={opt.effect} />
                </div>
                <div className={styles.optionText}>
                  <h3 className={styles.optionTitle}>{opt.title}</h3>
                  {opt.desc && (
                    <p className={styles.optionDesc}>
                      {opt.desc[0]}
                      <br className="pcBr" /> {opt.desc[1]}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </BasicSection>

        {/* 3. Our Vision (Figma PC 2165:8499 / Mobile 2165:8634) */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="OUR VISION"
          title="별도 툴 없이, 하나의 솔루션에서 끝내는 원스톱 비식별 가공"
        >
          <div className={styles.visionCards}>
            <div className={styles.visionCard}>
              <div className={styles.visionHead}>
                <h3 className={styles.visionTitle}>4가지 방식 × 대상별 조합, 총 10가지 옵션</h3>
                <p className={styles.visionDesc}>
                  모자이크 · 마스킹 · 블러 · 가상 얼굴 4가지 방식을 대상별로 조합해 총 10가지 옵션을
                  제공합니다. (얼굴 4 · 신체 3 · 번호판 3) 활용 목적과 보안 수위에 따라 최적의 방식을
                  선택합니다.
                </p>
              </div>
              <div className={styles.visionVisual}>
                {MATRIX_ROWS.map((row) => (
                  <div key={row.category} className={styles.matrixRow}>
                    <span className={styles.rowLabel}>{row.category}</span>
                    <div className={styles.chipGroup}>
                      {row.chips.map((chip) => (
                        <span key={chip} className={styles.chip}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.visionCard}>
              <div className={styles.visionHead}>
                <h3 className={styles.visionTitle}>비식별 강도 조절</h3>
                <p className={styles.visionDesc}>
                  모자이크 픽셀 크기, 블러 강도 등을 슬라이더로 즉시 조정할 수 있습니다.
                  <br className="pcBr" /> 복잡한 수치 입력 없이 원하는 수준의 비식별 강도를 직관적으로 조절합니다.
                </p>
              </div>
              <div className={styles.visionVisual}>
                <StrengthSlider label="모자이크 픽셀 크기" value={mosaicSize} onChange={setMosaicSize} />
                <StrengthSlider label="블러 강도" value={blurStrength} onChange={setBlurStrength} />
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
        <ProductCta
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 서비스를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
          solidButtonText="도입 문의하기"
          outlineButtonText="데모 체험하기"
          solidButtonHref="/pub/contact/inquiry"
          outlineButtonHref="/pub/demo/image"
        />
      </div>
    </FrontLayout>
  );
}
