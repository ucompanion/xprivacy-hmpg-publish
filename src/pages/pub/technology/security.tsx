import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import { BenefitCardGroup } from '../../../components/domain/Benefit/BenefitCards';
import styles from './security.module.scss';

const IMG = '/images/technology/security';

// Section 1: Definition Cards (Figma PC 2165:6791 / Mobile 2165:6903)
const DEFINITION_CARDS = [
  {
    num: '01',
    title: '망분리 온프레미스 (On-Premise) 구축',
    description: '원본·결과 영상이 기관 인프라 내에만 잔류하는 완전 폐쇄망 운영',
    image: `${IMG}/def_server.jpg`,
  },
  {
    num: '02',
    title: '복원 키 없는 비가역 처리',
    description: '복호화 파라미터가 없어 원본으로 되돌릴 수 없음',
    image: `${IMG}/def_face.jpg`,
  },
  {
    num: '03',
    title: (
      <>
        변조 불가 감사 증적<br />
        (Append-only 원장)
      </>
    ),
    description:
      '업로드·비식별·다운로드 등 6종 작업 이력과 처리 방법·대상·강도·객체 수를 자동 기록하고 AES-256 암호화 반출 지원',
    image: `${IMG}/def_audit.jpg`,
  },
];

// Section 3: Benefits (도입 효과 · Figma PC 2165:6834 / Mobile 2165:6944)
const BENEFIT_CARDS = [
  {
    glyph: 'glyph_compliance.svg',
    title: '규제 준수',
    description: '개인정보보호법과 관계 부처 가이드라인에 부합하도록 설계되어 규제 대응을 뒷받침합니다.',
  },
  {
    glyph: 'glyph_irreversible.svg',
    title: '비가역적 보안',
    description: '복원 키 없이 데이터 값 자체를 대체해, 처리된 결과물에서 원본을 복구할 수 없습니다.',
  },
  {
    glyph: 'glyph_network.svg',
    title: '외부 유출 차단 네트워크',
    description: '원본·결과 영상이 기관 인프라 내에만 잔류하는 완전 폐쇄망으로 운영합니다.',
  },
  {
    glyph: 'glyph_audit.svg',
    title: '변조 불가 감사 증적',
    description: '처리 이력을 수정·삭제할 수 없는 방식으로 보관해 사후 점검과 감사에 활용합니다.',
  },
];

export default function PubSubTechnologySecurity() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2165:6778 / Mobile 2165:6890) */}
        <HeroSection
          heroVariant="compact"
          bgPreset="technology"
          className={styles.securityHero}
          eyebrow="SECURITY"
          title={
            <>
              복원할 수 없는 <br className="mobileBr" />비가역적 변환과<br />
              관공서 보안 환경 <br className="mobileBr" />최적화
            </>
          }
          description={
            <>
              원본 복원이 불가능한 보안 가공 알고리즘과 외부 유출<br className="mobileBr" /> 없는 폐쇄망(On-Premise) 지원으로 법적 리스크를<br className="mobileBr" /> 줄입니다.
            </>
          }
        />

        {/* 2. TECHNOLOGICAL DEFINITION (Figma PC 2165:6785 / Mobile 2165:6897) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="TECHNOLOGICAL DEFINITION"
          title={
            <>
              가명정보 가이드라인 대응 및<br className="mobileBr" /> 복원 불가 비가역 보안
            </>
          }
          description="외부로 미디어가 유출되지 않는 망분리 온프레미스 환경을 지원하며, 변조 불가능한 Append-only 이력 기록으로 법적 책임추적성을 뒷받침합니다."
        >
          <ul className={styles.cardsGrid}>
            {DEFINITION_CARDS.map((card) => (
              <li key={card.num} className={styles.defCard}>
                <img src={card.image} alt="" className={styles.cardImage} />
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </BasicSection>

        {/* 3. 비가역 처리 (Figma PC 2165:6807 / Mobile 2165:6919 · 헤더 없음) */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={styles.irreversibleWrap}>
            {/* 원본 데이터 → TRANSFORM → 변환된 데이터 */}
            <div className={styles.visualPanel}>
              <div className={styles.visualStage}>
                <picture className={styles.connector}>
                  <source media="(max-width: 768px)" srcSet={`${IMG}/connector_mo.svg`} />
                  <img src={`${IMG}/connector.svg`} alt="" />
                </picture>
                <img src={`${IMG}/arrow_mo.svg`} alt="" className={styles.arrowMo} aria-hidden="true" />
                <img src={`${IMG}/arrow.svg`} alt="" className={`${styles.arrow} ${styles.arrowLeft}`} aria-hidden="true" />
                <img src={`${IMG}/arrow.svg`} alt="" className={`${styles.arrow} ${styles.arrowRight}`} aria-hidden="true" />

                <img src={`${IMG}/face_raw.jpg`} alt="원본 데이터" className={`${styles.photo} ${styles.photoRaw}`} />
                <img src={`${IMG}/face_deid.jpg`} alt="변환된 데이터" className={`${styles.photo} ${styles.photoDeid}`} />
                <span className={`${styles.photoLabel} ${styles.labelRaw}`}>원본 데이터</span>
                <span className={`${styles.photoLabel} ${styles.labelDeid}`}>변환된 데이터</span>

                <div className={styles.transformBox}>
                  <span className={styles.transTag}>TRANSFORM</span>
                  <span className={styles.transDesc}>
                    데이터 값<br className="mobileBr" /> 완전 대체
                  </span>
                </div>
                <span className={styles.noRestoreBadge}>복원 불가</span>
              </div>
            </div>

            {/* 설명 카피 */}
            <div className={styles.copyPanel}>
              <h3 className={styles.copyHeading}>
                금융, 공공기관 등 민감정보를 다루는 환경에서<br className="pcBr" /> 법적 리스크를 해소하고 보안 신뢰성을 확보합니다.
              </h3>

              <ul className={styles.pointsList}>
                <li className={styles.pointItem}>
                  <h4 className={styles.pointTitle}>비가역적 프로세스</h4>
                  <p className={styles.pointDesc}>
                    픽셀을 재조합하거나 단순히 덮어씌우는 방식이 아닌, 비가역적 변환을 적용하여 원본 복원이 불가능합니다.
                  </p>
                </li>
                <li className={styles.pointItem}>
                  <h4 className={styles.pointTitle}>가이드라인 부합 설계</h4>
                  <p className={styles.pointDesc}>
                    개인정보보호법 및 관계 부처의 가이드라인에 부합하도록 설계되어 유출 리스크를 줄이고 보안 무결성을 확보합니다.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </BasicSection>

        {/* 4. 도입 효과 (Figma PC 2165:6834 / Mobile 2165:6944) */}
        <BasicSection bg="white" layout="vertical" align="left" eyebrow="BENEFITS" title="도입 효과">
          <BenefitCardGroup
            bordered
            items={BENEFIT_CARDS.map((item) => ({
              glyph: `${IMG}/${item.glyph}`,
              title: item.title,
              desc: item.description,
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
