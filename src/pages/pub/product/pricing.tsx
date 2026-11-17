import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { Button } from '../../../components/core/Button/Button';
import { FaqAccordion } from '../../../components/domain/Faq';
import { DeploymentPlans } from '../../../components/domain/Deployment';
import styles from './pricing.module.scss';

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
    a: '홈페이지에서 무료 체험을 시작할 수 있습니다. 기업이나 기관의 운영 환경에서 기능 검증이 필요한 경우에는 문의해 주세요.',
  },
  {
    q: '도입 후 유지보수와 업데이트는 어떻게 지원되나요?',
    a: '연간 라이선스에는 유지보수가 포함되며, 운영 중 기술 지원과 업데이트 범위는 계약 조건에 따라 안내합니다.',
  },
  {
    q: '보안 규정상 외부 인터넷 사용이 제한되어도 도입할 수 있나요?',
    a: '네. 내부망 서버에 설치해 사용하는 온프레미스 방식을 지원합니다. 구체적인 구축 방식은 조직의 네트워크와 보안 정책을 확인한 뒤 결정합니다.',
  },
];

export default function PubProductPricing() {
  const navigate = useNavigate();
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>

        {/* 1. Hero / 요금제 (Figma PC 2156:30127 / Mobile 2156:31213) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.pricingHero}
          eyebrow="DEPLOYMENT & PRICING"
          title="운영 환경에 맞는 도입 방식을 선택하세요."
          description={
            <>
              망분리 여부와 처리 규모에 따라 선택하며,<br className="heroMoBr" /> 금액은 요건 확정 후 별도 견적서로<br className="heroMoBr" /> 제공합니다.
            </>
          }
          keywords={['망분리 온프레미스', '복원 불가 비가역 처리', '2026.03 가이드라인 대응']}
        />

        {/* 2. Trust / Logo Strip (Figma PC 2156:30142 / Mobile 2156:31227 · 모바일 자동 가로 흐름) */}
        <section className={styles.logoStrip} data-aos-skip aria-label="주요 고객사 및 협력 기관">
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
          <DeploymentPlans />
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
            <FaqAccordion
              items={faqItems.map((item, idx) => ({ id: `faq-${idx}`, question: item.q, answer: item.a }))}
            />

            <div className={styles.contactBar}>
              <div className={styles.contactText}>
                <strong className={styles.contactTitle}>더 궁금한 점이 있으신가요?</strong>
                <span className={styles.contactInfo}>전화 02-576-3776 · 이메일 help@vtex.co.kr</span>
              </div>
              <Button variant="solid" color="primary" size="xl" className={styles.contactButton} onClick={() => void navigate('/pub/contact/inquiry')}>
                문의하기
              </Button>
            </div>
          </div>
        </BasicSection>
      </div>
    </FrontLayout>
  );
}
