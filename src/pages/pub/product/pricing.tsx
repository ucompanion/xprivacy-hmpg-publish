import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import { IconSurface } from '../../../components/core/Icon/IconSurface';
import { Accordion } from '../../../components/core/Accordion/Accordion';
import styles from './pricing.module.scss';

const IMG = '/images/product/pricing';

// Trust / Logo Strip (Figma 2156:30142 · 제품소개 로고와 동일 에셋)
const partnerLogos = [
  { name: '강원 가명정보 활용지원센터', img: '/images/product/intro/partner_logo_01.png' },
  { name: '강원대학교', img: '/images/product/intro/partner_logo_02.png' },
  { name: '한라대학교', img: '/images/product/intro/partner_logo_03.png' },
  { name: '개인정보보호위원회', img: '/images/product/intro/partner_logo_04.png' },
  { name: '티사이언티픽', img: '/images/product/intro/partner_logo_05.png' },
  { name: '포소드', img: '/images/product/intro/partner_logo_06.png' },
  { name: '한국인터넷진흥원', img: '/images/product/intro/partner_logo_07.png' },
  { name: '영신디앤씨', img: '/images/product/intro/partner_logo_08.png' },
];

const plans = [
  {
    title: '온프레미스 구축형',
    tag: '관제센터 권장, 망분리 환경',
    glyph: 'glyph_onpremise.svg',
    features: [
      '기관 서버 직접 설치 · 완전 폐쇄망 운용',
      '영상 · 이력 전량 기관 내부 잔류',
      '외부 통신 없는 오프라인 라이선스',
      '연간 라이선스 + 유지보수 또는 영구 라이선스',
    ],
    cta: '도입 상담',
    featured: true,
  },
  {
    title: '클라우드 Enterprise',
    tag: '인터넷 환경',
    glyph: 'glyph_cloud.svg',
    features: [
      '기관 전용 공간 · 구축비 없이 개통',
      '처리량 기반 과금 · 실행 전 승인 절차',
      'Block Public Access · presigned URL(15분)',
      '월 단위 계약 · 온프레미스 전환 가능',
    ],
    cta: '도입 상담',
    featured: false,
  },
  {
    title: 'API 시스템 연동',
    tag: '기존 시스템 연동',
    glyph: 'glyph_api.svg',
    features: [
      '표준 REST API 제공',
      '기존 업무 시스템에 비식별 기능 연동',
      '정기적인 처리 작업 자동화',
      '연동 범위는 시스템 환경 확인 후 안내',
    ],
    cta: '기술 · API 문의',
    featured: false,
  },
];

const pocFeatures = [
  '기관 실제 영상으로 탐지율 · 품질 검증',
  '2~3주 · 비용 없음',
  '검증 결과 리포트 제공 (탐지율 · 처리 시간)',
  '종료 후 PoC 환경 완전 파기',
];

// 도입 절차: 막대 길이는 시안 비율(175 · 439 · 263 · 351)
const phases = [
  { num: '01', title: '상담 · 요건 정의', duration: '1주', grow: 175 },
  { num: '02', title: 'PoC 무상 검증', duration: '2~3주', grow: 439 },
  { num: '03', title: '설치 · 구성', duration: '1~2주', grow: 263 },
  { num: '04', title: '운영 · 지원', duration: '상시', grow: 351 },
];

const compareRows = [
  { label: '블러', masking: true, premium: true },
  { label: '모자이크', masking: true, premium: true },
  { label: '마스킹', masking: true, premium: true },
  { label: '가상 얼굴', masking: false, premium: true },
];

const criteria = [
  { title: '동시 처리 채널 수', desc: '1~4채널 단위 · 5채널 이상 별도 견적' },
  { title: '월 영상 처리량', desc: '처리 영상 분량(분) 기준' },
  { title: '계약 기간', desc: '영구 라이선스 또는 연간 구독 · 유지보수' },
  { title: '옵션', desc: '가상 얼굴 · 다국어' },
];

const faqItems = [
  {
    q: '요금은 어떻게 책정되나요?',
    a: '동시 처리 채널 수, 월 영상 처리량, 계약 기간, 가상 얼굴 등 옵션 사용 여부를 기준으로 산정합니다. 영구 라이선스와 연간 구독 중에서 선택할 수 있으며, 기본 비식별(모자이크·마스킹·블러) 상품과 가상 얼굴 포함 상품은 따로 산정합니다. 정확한 금액은 요건을 확인한 뒤 견적서로 안내해 드립니다.',
  },
  {
    q: '도입 전에 미리 사용해 볼 수 있나요?',
    // 2~4번 답변: 시안에 펼친 상태가 없어 기존 문구 유지
    a: '네, 가능합니다. PoC(개념 검증) 무상 지원 프로그램을 통해 실제 업무 환경에서 2~3주간 솔루션의 성능과 탐지율을 직접 검증하실 수 있습니다. 또한 웹 데모 체험을 통해 즉시 주요 비식별 기능을 테스트해보실 수 있습니다.',
  },
  {
    q: '도입 후 유지보수와 업데이트는 어떻게 지원되나요?',
    a: '온프레미스 구축형의 경우 전담 엔지니어가 배정되어 정기적인 시스템 점검 및 장애 발생 시 신속한 기술 지원을 제공합니다. 클라우드 및 최신 AI 탐지 모델 엔진 업데이트는 주기적으로 무상 제공됩니다.',
  },
  {
    q: '보안 규정상 외부 인터넷 사용이 제한되어도 도입할 수 있나요?',
    a: '네, xPrivacy 온프레미스 구축형은 완벽한 폐쇄망 및 망분리 환경에서도 외부 통신 없이 독립적으로 구동되도록 설계되었습니다. 국가정보원 및 공공기관의 엄격한 보안 컴플라이언스를 100% 충족합니다.',
  },
];

function CheckItem({ text }: { text: string }) {
  return (
    <li className={styles.checkItem}>
      <span className={styles.checkMark} aria-hidden="true">✓</span>
      <span>{text}</span>
    </li>
  );
}

export default function PubProductPricing() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>

        {/* 1. Hero / 요금제 (Figma PC 2156:30127 / Mobile 2156:31213) */}
        <HeroSection
          heroVariant="compact"
          className={styles.pricingHero}
          eyebrow="DEPLOYMENT & PRICING"
          title="운영 환경에 맞는 도입 방식을 선택하세요."
          description={
            <>
              망분리 여부와 처리 규모에 따라 선택하며,<br className="mobileBr" /> 금액은 요건 확정 후 별도 견적서로<br className="mobileBr" /> 제공합니다.
            </>
          }
          keywords={['망분리 온프레미스', '복원 불가 비가역 처리', '2026.03 가이드라인 대응']}
        />

        {/* 2. Trust / Logo Strip (Figma PC 2156:30142 / Mobile 2156:31227 · 모바일 자동 가로 흐름) */}
        <section className={styles.logoStrip} aria-label="주요 고객사 및 협력 기관">
          <div className={styles.logoTrack}>
            {/* 무한 흐름용으로 로고 묶음을 두 번 반복 (두 번째는 보조기술에서 숨김) */}
            {(['original', 'clone'] as const).flatMap((copy) =>
              partnerLogos.map((logo) => (
                <img
                  key={`${copy}-${logo.name}`}
                  src={logo.img}
                  alt={copy === 'original' ? logo.name : ''}
                  aria-hidden={copy === 'clone'}
                  className={`${styles.logoImg} ${copy === 'clone' ? styles.logoClone : ''}`}
                  loading="lazy"
                />
              )),
            )}
          </div>
        </section>

        {/* 3. 도입 방식 (Figma PC 2156:30151 / Mobile 2156:31236) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="DEPLOYMENT"
          title="관제센터 환경에 맞춘 도입 방식"
          description="보안 요건과 업무 환경에 따라 구축형, 클라우드, 시스템 연동 방식으로 도입할 수 있으며, 도입 전 실제 영상으로 무상 검증을 진행합니다."
        >
          <div className={styles.deployWrap}>
            <div className={styles.planCards}>
              {plans.map((plan) => (
                <div key={plan.title} className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}>
                  <div className={styles.planHead}>
                    <IconSurface src={`${IMG}/${plan.glyph}`} size={48} sizeMo={40} tone="soft" glyphFit="fill" />
                    <div className={styles.planTitleGroup}>
                      <h3 className={styles.planTitle}>{plan.title}</h3>
                      <span className={styles.planTag}>{plan.tag}</span>
                    </div>
                  </div>
                  <p className={styles.planPrice}>별도 견적</p>
                  <ul className={styles.checkList}>
                    {plan.features.map((feature) => <CheckItem key={feature} text={feature} />)}
                  </ul>
                  <Button
                    variant={plan.featured ? 'solid' : 'subtle'}
                    bordered={!plan.featured}
                    size="xl"
                    className={styles.fullButton}
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>

            {/* PoC · 도입 전 사전 검증 (Figma 2156:30254) */}
            <div className={styles.pocCard}>
              <div className={styles.planHead}>
                <IconSurface src={`${IMG}/glyph_poc.svg`} size={48} sizeMo={40} tone="soft" glyphFit="fill" />
                <div className={styles.planTitleGroup}>
                  <h3 className={styles.planTitle}>PoC 무상 검증</h3>
                  <span className={styles.planTag}>도입 전 사전 검증 · 무상</span>
                </div>
              </div>
              <ul className={`${styles.checkList} ${styles.pocList}`}>
                {pocFeatures.map((feature) => <CheckItem key={feature} text={feature} />)}
              </ul>
              <Button variant="subtle" bordered size="xl" className={styles.pocButton}>
                PoC 신청
              </Button>
            </div>
          </div>
        </BasicSection>

        {/* 4. 도입 절차 (Figma PC 2156:30286 / Mobile 2156:31371) */}
        <BasicSection bg="white" layout="vertical" align="left" eyebrow="PROCESS" title="도입 절차">
          <ol className={styles.timeline}>
            {phases.map((phase) => (
              <li key={phase.num} className={styles.phase} style={{ flexGrow: phase.grow }}>
                <span className={styles.phaseBar} aria-hidden="true" />
                <span className={styles.phaseNum}>{phase.num}</span>
                <strong className={styles.phaseTitle}>{phase.title}</strong>
                <span className={styles.phaseDuration}>{phase.duration}</span>
              </li>
            ))}
          </ol>
        </BasicSection>

        {/* 5. 견적 산정 기준 (Figma PC 2156:30317 / Mobile 2156:31400) */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="PRICING"
          title="견적 산정 기준"
          description="제품 구성과 동시 처리 채널 수를 기준으로 산정하며, 영구 라이선스와 연간 구독 중에서 선택할 수 있습니다."
        >
          <div className={styles.estimateWrap}>
            <div className={styles.estimateRow}>
              <div className={styles.compareTable} role="table" aria-label="제품 구성 비교">
                <div className={`${styles.compareRow} ${styles.compareHead}`} role="row">
                  <span role="columnheader" className={styles.compareLabel}>제품 구성</span>
                  <span role="columnheader" className={styles.planCol}>
                    <span className={styles.planEn}>MASKING</span>
                    <strong className={styles.planKo}>마스킹</strong>
                    <span className={styles.planSub}>기본 비식별 제품</span>
                  </span>
                  <span role="columnheader" className={styles.planCol}>
                    <span className={styles.planEn}>PREMIUM</span>
                    <strong className={styles.planKo}>프리미엄</strong>
                    <span className={styles.planSub}>가상 얼굴 포함</span>
                  </span>
                </div>
                {compareRows.map((row) => (
                  <div key={row.label} className={styles.compareRow} role="row">
                    <span role="cell" className={styles.compareLabel}>{row.label}</span>
                    {[
                      { plan: 'masking', on: row.masking },
                      { plan: 'premium', on: row.premium },
                    ].map(({ plan, on }) => (
                      <span key={plan} role="cell" className={styles.planCol}>
                        {on
                          ? <span className={styles.tableCheck} aria-label="지원">✓</span>
                          : <span className={styles.tableDash} aria-label="미지원">—</span>}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <dl className={styles.criteriaCard}>
                {criteria.map((item) => (
                  <div key={item.title} className={styles.criteriaItem}>
                    <dt>{item.title}</dt>
                    <dd>{item.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className={styles.estimateNote}>
              ※ 5채널 이상 및 클라우드형은 별도 견적 · 요건 확정 후 정식 견적서로 제공합니다.
            </p>
          </div>
        </BasicSection>

        {/* 6. 자주 묻는 질문 (Figma PC 2156:30379 / Mobile 2156:31462) */}
        <BasicSection bg="white" layout="vertical" align="left" eyebrow="FAQ" title="자주 묻는 질문">
          <div className={styles.faqWrap}>
            <Accordion
              variant="line"
              prefix="Q"
              defaultOpenIds={['faq-0']}
              items={faqItems.map((item, idx) => ({ id: `faq-${idx}`, title: item.q, content: item.a }))}
            />

            <div className={styles.contactBar}>
              <div className={styles.contactText}>
                <strong className={styles.contactTitle}>더 궁금한 점이 있으신가요?</strong>
                <span className={styles.contactInfo}>전화 02-576-3776 · 이메일 help@vtex.co.kr</span>
              </div>
              <Button variant="solid" color="primary" size="xl" className={styles.contactButton}>
                문의하기
              </Button>
            </div>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
