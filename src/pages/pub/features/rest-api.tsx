import React from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { BasicSection } from '../../../components/domain/Section';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './rest-api.module.scss';

// Section 1 Pipeline Steps
const ARCHITECTURE_PIPELINE = [
  { name: 'USER / WEB BROWSER', meta: 'HTTPS 443' },
  { name: 'APPLICATION', meta: 'Permission / Ownership Validation' },
  { name: 'GPU PRIVACY ENGINE', meta: 'Detection / Tracking / Rendering' },
  { name: 'INTERNAL STORAGE', meta: 'Institution / Enterprise Environment' },
  { name: 'SECURE EXPORT', meta: 'AES-256' },
];

// Section 1 Security Specs
const SECURITY_SPECS = [
  {
    tag: '01 · PRIVATE ENVIRONMENT',
    title: 'On-Premise / Closed Network',
    desc: '보안 요구가 높은 기관 환경에서는 내부 인프라에 직접 구축하고 데이터가 외부로 나가지 않는 구조로 운영할 수 있습니다.',
  },
  {
    tag: '02 · ACCESS CONTROL',
    title: '다중 권한 검증',
    desc: 'UI·Middleware·API 단계의 권한 검증과 Ownership 확인으로 접근 범위를 통제합니다.',
  },
  {
    tag: '03 · SECURE EXPORT',
    title: 'AES-256 암호화 반출',
    desc: '처리된 결과물을 안전하게 반출할 수 있도록 암호화 Export를 지원합니다.',
  },
  {
    tag: '04 · AUDIT TRAIL',
    title: '처리·접속 이력 기록',
    desc: '업로드·비식별·다운로드·옵션 변경·로그인 등 주요 작업 이력을 기록해 사후 확인과 감사에 활용할 수 있습니다.',
  },
];

// Section 2 3-Step Cards
const WORKFLOW_STEPS = [
  {
    tag: '01 · FILE UPLOAD',
    title: '파일 업로드',
    desc: '이미지·영상 파일을 드래그하거나 클릭해 선택합니다.',
  },
  {
    tag: '02 · OPTION SETTING',
    title: '옵션 설정',
    desc: '적용 대상, 비식별 방식, 처리 강도를 선택합니다.',
  },
  {
    tag: '03 · REVIEW & EDIT',
    title: '결과 확인 및 편집',
    desc: '비식별 처리 결과를 비교하고 필요한 부분을 편집합니다.',
  },
];

export default function PubSubFeaturesRestApi() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        
        {/* ===================================================================
            Hero Section: 간단하게 사용하고 필요하면 기존 시스템과 연결합니다
        =================================================================== */}
        <BasicSection
          className={styles.heroSection}
          bg="white"
          layout="vertical"
          align="center"
          eyebrow="WORKFLOW & INTEGRATION"
          title={
            <>
              간단하게 사용하고 필요하면<br />
              기존 시스템과 연결합니다
            </>
          }
          description={
            <>
              파일 업로드부터 옵션 설정, 결과 확인까지 3단계로 처리하고 REST API를 통해 기존 업무 시스템과 연동할 수 있습니다.
            </>
          }
        >
          {/* 2 Dark Cards Side-by-Side */}
          <div className={styles.heroCardsWrap}>
            {/* Card 1: 3-Step Workflow */}
            <div className={styles.darkCard}>
              <span className={styles.cardHeaderTitle}>3-STEP WORKFLOW</span>
              <div className={styles.workflowRows}>
                <div className={styles.rowItem}>01 · FILE UPLOAD</div>
                <div className={styles.rowItem}>02 · TARGET / METHOD / STRENGTH</div>
                <div className={styles.rowItem}>03 · REVIEW &amp; EDIT</div>
              </div>
            </div>

            {/* Card 2: REST API Integration */}
            <div className={styles.darkCard}>
              <span className={styles.cardHeaderTitle}>REST API INTEGRATION</span>
              <div className={styles.integrationFlow}>
                <div className={styles.flowBox}>
                  EXISTING<br />SYSTEM
                </div>
                <span className={styles.flowArrow}>→</span>
                <div className={`${styles.flowBox} ${styles.activeBox}`}>
                  xPrivacy API
                </div>
                <span className={styles.flowArrow}>→</span>
                <div className={styles.flowBox}>
                  PROTECTED<br />DATA
                </div>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 1: Secure Architecture (White Bg, 2 Columns)
        =================================================================== */}
        <BasicSection
          className={styles.secureArchitectureSection}
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="SECURE ARCHITECTURE"
          title="개인정보를 처리하는 환경까지 안전하게 설계합니다"
          description="On-Premise·폐쇄망 운영, 권한 검증, 암호화 반출, Audit Trail 등 개인정보 처리 과정 전체의 안전성을 고려합니다."
        >
          <div className={styles.architectureGrid}>
            {/* Left: Pipeline Column */}
            <div className={styles.pipelineColumn}>
              {ARCHITECTURE_PIPELINE.map((step, idx) => (
                <React.Fragment key={step.name}>
                  <div className={styles.pipelineStep}>
                    <span className={styles.stepTitle}>{step.name}</span>
                    <span className={styles.stepMeta}>{step.meta}</span>
                  </div>
                  {idx < ARCHITECTURE_PIPELINE.length - 1 && (
                    <span className={styles.arrowDown}>↓</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right: 4 Specs Column */}
            <div className={styles.specsColumn}>
              {SECURITY_SPECS.map((spec) => (
                <div key={spec.tag} className={styles.specItem}>
                  <span className={styles.eyebrowTag}>{spec.tag}</span>
                  <h3 className={styles.specTitle}>{spec.title}</h3>
                  <p className={styles.specDesc}>{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 2: Workflow & Integration (Gray Bg)
        =================================================================== */}
        <BasicSection
          className={styles.workflowIntegrationSection}
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="WORKFLOW & INTEGRATION"
          title="간단하게 사용하고 필요하면 기존 시스템과 연결합니다"
          description="기본 작업은 3단계로 진행하고, 반복적인 업무가 필요한 환경에서는 REST API를 통해 기존 시스템과 연결할 수 있습니다."
        >
          {/* Part 1: 3 Step Cards */}
          <div className={styles.stepsCardsRow}>
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.tag} className={styles.stepCard}>
                <span className={styles.stepTag}>{step.tag}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Part 2: REST API Integration Block */}
          <div className={styles.apiIntegrationBlock}>
            <div className={styles.apiBlockHeader}>
              <h3 className={styles.blockTitle}>REST API Integration</h3>
              <p className={styles.blockDesc}>
                기존 업무 시스템에 xPrivacy의 비식별 기능을 연결해 반복적인 처리 흐름이나 정기적인 비식별 작업을 자동화할 수 있습니다.
              </p>
            </div>

            <div className={styles.apiFlowRow}>
              <div className={styles.flowCard}>
                EXISTING<br />SYSTEM
              </div>
              <span className={styles.arrowRight}>→</span>
              <div className={`${styles.flowCard} ${styles.flowCardDark}`}>
                REST API<br />XPRIVACY
              </div>
              <span className={styles.arrowRight}>→</span>
              <div className={styles.flowCard}>
                PROCESSED<br />DATA
              </div>
            </div>
          </div>
        </BasicSection>

        {/* ===================================================================
            Section 3: Bottom Product CTA
        =================================================================== */}
        <ProductCta />

      </div>
    </FrontLayout>
  );
}
