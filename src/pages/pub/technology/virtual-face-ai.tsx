import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { BenefitCardGroup } from '../../../components/domain/Benefit/BenefitCards';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './virtual-face-ai.module.scss';

const IMG = '/images/technology/virtual-face-ai';

// 섹션 1 포인트 (Figma PC 2165:9260 / Mobile 2165:9397)
const IDENTITY_POINTS = [
  { title: '신원 보호', desc: '원본 얼굴의 신원 보호를 목표로 하는 변환' },
  { title: '자연스러운 결과', desc: '기존 Blur·Mosaic과 다른 자연스러운 결과 표현' },
  {
    title: '데이터 재사용성',
    desc: '비식별화 처리 이후에도 데이터로 다시 활용할 수 있어 단순 가림 처리보다 높은 데이터 가치를 유지합니다.',
  },
];

// 섹션 2 포인트 (Figma PC 2165:9321 / Mobile 2165:9429)
const SYNTHESIS_POINTS = [
  { title: '장면의 자연스러운 인상 유지', desc: '얼굴만 가상의 얼굴로 치환해 장면의 자연스러운 인상을 유지' },
  { title: '자연스러운 가상 얼굴 치환', desc: '원본 신원을 보호하는 자연스러운 가상 얼굴로 치환' },
  {
    title: '한국인 특화 데이터셋 활용',
    desc: '이질감 없는 한국인 맞춤 페이스로 공공 홍보 및 공공데이터 개방 영상의 품질 극대화',
  },
];

// 자사 / 타사 비교 행
const VENDOR_ROWS = [
  { id: 'xprivacy', tab: 'xPrivacy', result: 'synth_xprivacy.jpg', arrow: 'arrow_primary' },
  { id: 'general', tab: '일반 방식', result: 'synth_general.jpg', arrow: 'arrow_gray' },
];

// 도입 효과 (Figma PC 2165:9334 / Mobile 2165:9469)
const BENEFITS = [
  {
    glyph: 'glyph_quality.svg',
    title: ['모자이크 없는 고품질', '미디어 완성'],
    desc: '답답한 모자이크 대신 가상 얼굴을 합성해 영상의 몰입감과 미관을 살립니다.',
  },
  {
    glyph: 'glyph_portrait.svg',
    title: ['초상권 노출 부담 완화'],
    desc: '실존하지 않는 가상 얼굴로 교체해 원본 신원 노출을 줄입니다.',
  },
  {
    glyph: 'glyph_value.svg',
    title: ['자연스러운 화면으로 활용', '가치 유지'],
    desc: '자연스러운 얼굴 표현을 유지해 비식별 이후에도 영상을 활용할 수 있습니다.',
  },
  {
    glyph: 'glyph_korean.svg',
    title: ['이질감 없는 한국인 가상 얼굴'],
    desc: '한국인 데이터셋 기반으로 이질감 없는 가상 얼굴을 생성합니다.',
  },
];

function PointList({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <ul className={styles.pointList}>
      {items.map((pt) => (
        <li key={pt.title} className={styles.point}>
          <h4 className={styles.pointTitle}>{pt.title}</h4>
          <p className={styles.pointDesc}>{pt.desc}</p>
        </li>
      ))}
    </ul>
  );
}

export default function PubSubTechnologyVirtualFaceAi() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2165:9246 / Mobile 2165:9383) */}
        <HeroSection
          heroVariant="compact"
          bgPreset="technology"
          className={styles.vfaHero}
          eyebrow="VIRTUAL FACE AI"
          title={
            <>
              초상권 걱정 없이<br className="mobileBr" /> 영상의 몰입감과<br />
              미관을 살리는<br className="mobileBr" /> 생성형 AI 비식별화
            </>
          }
          description="답답한 모자이크 대신 한국인 데이터셋 기반 생성형 AI로 이질감 없는 가상 얼굴을 합성하여 홍보 및 행정 영상의 몰입도를 높입니다."
        />

        {/* 2. Original → Virtual Face (Figma PC 2165:9253 / Mobile 2165:9390) */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.splitWrap}>
            <div className={styles.copyCol}>
              <div className={styles.intro}>
                <div className={styles.headGroup}>
                  <span className={styles.eyebrow}>IDENTITY PROTECTION</span>
                  <h3 className={styles.heading}>
                    신원은 보호하고 자연스러운<br />
                    얼굴 표현은 유지합니다
                  </h3>
                </div>
                <p className={styles.lead}>
                  한국인 데이터셋 기반 생성형 AI를 활용해 원본 얼굴의 신원을 보호하면서
                  <br className="pcBr" /> 자연스러운 가상 얼굴로 변환합니다.
                </p>
              </div>
              <PointList items={IDENTITY_POINTS} />
            </div>

            <div className={styles.compare}>
              <figure className={styles.compareItem}>
                <img src={`${IMG}/compare_original.jpg`} alt="원본 얼굴" className={styles.comparePhoto} />
                <figcaption className={`${styles.compareLabel} ${styles.labelOriginal}`}>ORIGINAL FACE</figcaption>
              </figure>
              <span className={styles.compareArrow} aria-hidden="true">
                →
              </span>
              <figure className={styles.compareItem}>
                <img src={`${IMG}/compare_virtual.jpg`} alt="가상 얼굴로 변환한 결과" className={styles.comparePhoto} />
                <figcaption className={`${styles.compareLabel} ${styles.labelVirtual}`}>VIRTUAL FACE</figcaption>
              </figure>
            </div>
          </div>
        </BasicSection>

        {/* 3. 가상 인물 교체 (Figma PC 2165:9287 / Mobile 2165:9422) · PC는 비주얼 왼쪽 */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={`${styles.splitWrap} ${styles.reverse}`}>
            <div className={styles.copyCol}>
              <div className={styles.intro}>
                <div className={styles.headGroup}>
                  <span className={styles.eyebrow}>AI-SYNTHESIZED FACES</span>
                  <h3 className={styles.heading}>생성형 AI 기술로 가상 인물 교체</h3>
                </div>
                <p className={styles.lead}>
                  한국인 데이터셋 기반 생성형 AI로 이질감 없는 가상 얼굴을 합성하여 홍보 및 행정 영상의
                  몰입도를 높입니다.
                </p>
              </div>
              <PointList items={SYNTHESIS_POINTS} />
            </div>

            <div className={styles.vendorPanel}>
              {VENDOR_ROWS.map((row) => (
                <div key={row.id} className={`${styles.vendorRow} ${styles[`vendor_${row.id}`]}`}>
                  <div className={styles.vendorTab}>
                    <span>{row.tab}</span>
                  </div>
                  <div className={styles.vendorBody}>
                    <figure className={styles.vendorCard}>
                      <img src={`${IMG}/synth_raw.jpg`} alt="원본" />
                      <figcaption>원본</figcaption>
                    </figure>
                    <picture className={styles.vendorArrow}>
                      <source media="(max-width: 768px)" srcSet={`${IMG}/${row.arrow}_mo.svg`} />
                      <img src={`${IMG}/${row.arrow}.svg`} alt="" aria-hidden="true" />
                    </picture>
                    <figure className={styles.vendorCard}>
                      <img src={`${IMG}/${row.result}`} alt={`${row.tab} 비식별화 결과`} />
                      <figcaption>비식별화</figcaption>
                    </figure>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BasicSection>

        {/* 4. 도입 효과 */}
        <BasicSection bg="white" layout="vertical" align="left" eyebrow="BENEFITS" title="도입 효과">
          <BenefitCardGroup
            bordered
            items={BENEFITS.map((item) => ({
              glyph: `${IMG}/${item.glyph}`,
              title: (
                <>
                  {item.title[0]}
                  {item.title[1] && (
                    <>
                      <br className="pcBr" /> {item.title[1]}
                    </>
                  )}
                </>
              ),
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
