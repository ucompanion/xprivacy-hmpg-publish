import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './security.module.scss';

const SECURITY_CARDS = [
  {
    num: '01',
    title: '폐쇄적 온프레미스 (On-Premise) 구축',
    description: '내부 인프라에 직접 설치되어 외부 네트워크와 완벽 분리되어 데이터 유출 원천 차단',
  },
  {
    num: '02',
    title: '복원 키 없는 비가역 처리',
    description: '역연산이 불가능하도록 암호화 키 자체를 저장하지 않아 완전한 비가역 보안 구현',
  },
  {
    num: '03',
    title: '변조 불가 감사 증적 (Append-only 원장)',
    description: '작업자, 일시, 경로, 변환 건수, 성공 여부 등 전 과정을 감사 로그로 기록하고 AES-256 암호화 보관 지원',
  },
];

const EFFECT_ITEMS = [
  {
    num: '01',
    title: '규제 준수',
    sub: 'Legal Compliance',
  },
  {
    num: '02',
    title: '비가역적 보안',
    sub: 'Irreversible Security',
  },
  {
    num: '03',
    title: '외부 유출 차단 네트워크',
    sub: 'On-Premise Closed Network',
  },
  {
    num: '04',
    title: '변조 불가 감사 증적',
    sub: 'Audit Trails Tracking',
  },
];

export default function PubSubTechnologySecurity() {
  const complianceFeatures = (
    <div className={styles.subFeatureList}>
      <div className={styles.subFeatureItem}>
        <h5>비가역 프로세스</h5>
        <p>
          복원된 데이터를 유통하는 방식이 아닌, 비가역적 변환을 적용하여 정보 보안의 신뢰성을 높입니다.
        </p>
      </div>
      <div className={styles.subFeatureItem}>
        <h5>법적 안전성 확보</h5>
        <p>
          개인정보보호법 및 관계 부처의 가이드라인에 부합하도록 설계되어 법적 리스크를 원천 차단하고 높은 안전성을 확보합니다.
        </p>
      </div>
    </div>
  );

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* Top Hero Section */}
        <HeroSection
          className={styles.techHero}
          align="left"
          bgImage="/images/pub/technology/hero_security_clean.jpg"
          eyebrow="SECURITY"
          title={
            <>
              복원할 수 없는 비가역적 변환과<br />
              관공서 보안 환경 최적화
            </>
          }
          description={
            <>
              원천 복원이 불가능한 보안 가명 알고리즘과 외부 유출 없는 폐쇄형(On-Premise) 기반으로 법적<br className="desktop-only" />
              {' '}리스크를 원천 차단합니다.
            </>
          }
        />

        {/* Section 1: TECHNOLOGICAL DEFINITION (bg="white") */}
        <BasicSection
          className={styles.definitionSection}
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="TECHNOLOGICAL DEFINITION"
          title={
            <>
              가명정보 가이드라인 대응 및<br />
              복원 불가 비가역 보안
            </>
          }
          description={
            <>
              외부로 데이터가 유출되지 않는 폐쇄형 온프레미스 환경을 지원하며,<br className="desktop-only" />
              {' '}변조 불가능한 Append-only 이력 기록으로 법적 책임추적성을 확립합니다.
            </>
          }
        >
          <div className={styles.cardsGrid}>
            {SECURITY_CARDS.map((card) => (
              <div key={card.num} className={styles.secCard}>
                <span className={styles.num}>{card.num}</span>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </BasicSection>

        {/* Section 2: COMPLIANCE & SECURITY (bg="gray") */}
        <BasicSection
          className={styles.complianceSection}
          bg="gray"
          layout="horizontal-reverse"
          align="left"
          title={
            <>
              금융, 공공기관 등 민감정보를 다루는 환경에서<br />
              법적 리스크를 해소하고 보안 신뢰성을 확보합니다.
            </>
          }
          headerExtra={complianceFeatures}
        >
          <div className={styles.diagramCardWrapper}>
            <div className={styles.diagramCard}>
              {/* 상단 복원 불가 아치 커넥터 */}
              <div className={styles.topArchContainer}>
                <svg className={styles.archSvg} viewBox="0 0 320 40" fill="none">
                  <path
                    d="M 265 36 L 265 14 L 55 14 L 55 34"
                    stroke="#4b6bfb"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Left Arrow head pointing down */}
                  <polyline points="50,26 55,36 60,26" stroke="#4b6bfb" strokeWidth="1.5" fill="none" />
                </svg>
                <div className={styles.noRestoreBadge}>복원 불가</div>
              </div>

              {/* 중앙 비교 다이어그램 행 */}
              <div className={styles.diagramRow}>
                {/* 원본 데이터 */}
                <div className={styles.photoCol}>
                  <div className={styles.photoWrap}>
                    <img
                      src="/images/pub/technology/security_raw_face.jpg"
                      alt="원본 데이터"
                    />
                  </div>
                  <span className={styles.photoLabel}>원본 데이터</span>
                </div>

                {/* 중앙 커넥터 */}
                <div className={styles.connectorCol}>
                  <div className={styles.connectorLineLeft} />
                  <div className={styles.brandBadge}>
                    <span className={styles.brandIcon} />
                    <span className={styles.brandText}>
                      <strong>OFF:ON</strong> <span>xPrivacy</span>
                    </span>
                  </div>
                  <div className={styles.connectorLineRight} />
                </div>

                {/* 비식별화 데이터 */}
                <div className={styles.photoCol}>
                  <div className={styles.photoWrap}>
                    <img
                      src="/images/pub/technology/security_deid_face.jpg"
                      alt="비식별화 데이터"
                    />
                  </div>
                  <span className={styles.photoLabel}>비식별화 데이터</span>
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* Section 3: 도입효과 (bg="white") */}
        <BasicSection
          className={styles.effectsSection}
          bg="white"
          layout="vertical"
          align="left"
          title="도입효과"
        >
          <div className={styles.effectsGrid}>
            {EFFECT_ITEMS.map((item) => (
              <div key={item.num} className={styles.effectItem}>
                <span className={styles.num}>{item.num}</span>
                <h4>{item.title}</h4>
                <p className={styles.subText}>{item.sub}</p>
              </div>
            ))}
          </div>
        </BasicSection>

        {/* Section 4: Bottom CTA Section */}
        <ProductCta
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 xPrivacy를<br />
              직접 확인해보세요
            </>
          }
          description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
          solidButtonText="무료 체험 시작"
          outlineButtonText="도입 문의"
        />

      </div>
    </FrontLayout>
  );
}
