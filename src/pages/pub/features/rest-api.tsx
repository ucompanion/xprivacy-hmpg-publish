import { Fragment } from "react";
import type { ReactNode } from "react";
import FrontLayout from "../layouts/FrontLayout";
import { HeroSection, BasicSection, CtaSection } from "../../../components/domain/Section";
import { IconSurface } from "../../../components/core/Icon/IconSurface";
import styles from "./rest-api.module.scss";

const IMG = "/images/features/rest-api";
const PRICING_IMG = "/images/product/pricing";

// 히어로 2개 영역 (Figma PC 2304:4433)
const HERO_AREAS = [
  {
    title: "보안 아키텍처",
    desc: "On-Premise · 암호화 반출 · 이력 기록",
    glyph: `${IMG}/glyph_shield_check.svg`,
  },
  {
    title: "워크플로우 · 연동",
    desc: "3단계 작업 · REST API 연동",
    glyph: `${IMG}/glyph_workflow.svg`,
  },
];

// 1. 보안 아키텍처 흐름 (Figma PC 2281:4038)
const ARCHITECTURE_NODES: { id: string; title: ReactNode; desc?: string }[] = [
  { id: "user", title: <>USER / WEB<br className="pcBr" /> BROWSER</> },
  { id: "application", title: "APPLICATION", desc: "권한·소유권 검증" },
  { id: "engine", title: <>GPU PRIVACY<br className="pcBr" /> ENGINE</>, desc: "탐지 · 추적 · 렌더링" },
  { id: "storage", title: <>INTERNAL<br className="pcBr" /> STORAGE</>, desc: "기관·기업 내부 환경" },
  { id: "export", title: "SECURE EXPORT", desc: "AES-256" },
];

// 1. 보안 항목 (Figma PC 2281:4062)
const SECURITY_ITEMS = [
  {
    tag: "01 · PRIVATE ENVIRONMENT",
    title: "온프레미스·폐쇄망 운영",
    desc: "보안 요구가 높은 기관 환경에서는 내부 인프라에 직접 구축하고 데이터가 외부로 나가지 않는 구조로 운영할 수 있습니다.",
    glyph: `${PRICING_IMG}/glyph_onpremise.svg`,
  },
  {
    tag: "02 · ACCESS CONTROL",
    title: "다중 권한 검증",
    desc: "UI·미들웨어·API 단계의 권한 검증과 소유권 확인으로 접근 범위를 통제합니다.",
    glyph: `${IMG}/glyph_lock.svg`,
  },
  {
    tag: "03 · SECURE EXPORT",
    title: "AES-256 암호화 반출",
    desc: "처리된 결과물을 안전하게 반출할 수 있도록 암호화 반출을 지원합니다.",
    glyph: `${IMG}/glyph_download.svg`,
  },
  {
    tag: "04 · AUDIT TRAIL",
    title: "처리·접속 이력 기록",
    desc: "업로드·비식별·다운로드·가져오기·옵션 변경·로그인 등 주요 작업 이력을 기록해 사후 확인과 감사에 활용할 수 있습니다.",
    glyph: `${IMG}/glyph_history.svg`,
  },
];

// 2. 3단계 사용 흐름 (Figma PC 2281:4081)
const WORKFLOW_STEPS = [
  {
    title: "파일 업로드",
    desc: "이미지·영상 파일을 드래그하거나 클릭해 선택합니다.",
    glyph: `${IMG}/glyph_upload.svg`,
  },
  {
    title: "옵션 설정",
    desc: "적용 대상, 비식별 방식, 처리 강도를 선택합니다.",
    glyph: `${IMG}/glyph_sliders.svg`,
  },
  {
    title: "결과 확인 및 편집",
    desc: "비식별 처리 결과를 비교하고 필요한 부분을 편집합니다.",
    glyph: `${IMG}/glyph_edit.svg`,
  },
];

// 2. REST API 연동 흐름 (Figma PC 2281:4101) · 가운데 박스 강조
const API_FLOW = [
  {
    title: "기존 시스템",
    desc: "기관·기업 업무 시스템",
    glyph: `${PRICING_IMG}/glyph_onpremise.svg`,
  },
  {
    title: "xPrivacy REST API",
    desc: "비식별 처리 요청",
    glyph: `${PRICING_IMG}/glyph_api.svg`,
    accent: true,
  },
  {
    title: "비식별 결과",
    desc: "시스템으로 반환",
    glyph: `${IMG}/glyph_shield_check.svg`,
  },
];

function FlowArrow() {
  return (
    <span className={styles.apiArrow} aria-hidden="true">
      <span className={styles.apiArrowLine} />
      <img src={`${IMG}/arrow_head.svg`} alt="" />
    </span>
  );
}

export default function PubFeaturesRestApi() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2304:4399 / Mobile 2286:5114 · 가운데 정렬 + 2개 영역) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.apiHero}
          eyebrow="Features"
          title={
            <>
              안전한 처리 환경부터
              <br /> 기존 시스템 연동까지
            </>
          }
          description="On-Premise·폐쇄망 운영과 암호화 반출로 안전하게 처리하고, REST API로 기존 업무 시스템과 연결합니다."
        >
          {/* 섹션 콘텐츠 첫 요소의 margin은 0으로 고정되므로 한 겹 감싸 간격(48)을 조정 */}
          <div>
            <ul className={styles.heroAreas}>
              {HERO_AREAS.map((item) => (
                <li key={item.title} className={styles.heroArea}>
                  <IconSurface src={item.glyph} size={52} sizeMo={44} glyphFit="fill" />
                  <span className={styles.heroAreaText}>
                    <strong className={styles.heroAreaTitle}>{item.title}</strong>
                    <span className={styles.heroAreaDesc}>{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </HeroSection>

        {/* 2. 보안 아키텍처 */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="SECURITY"
          title="개인정보를 처리하는 환경까지 안전하게 설계합니다"
          description="On-Premise·폐쇄망 운영, 권한 검증, 암호화 반출, 처리 이력 기록 등 개인정보 처리 과정 전체의 안전성을 고려합니다."
        >
          <div className={styles.securityBody}>
            <ol className={styles.archFlow}>
              {ARCHITECTURE_NODES.map((node, idx) => (
                <Fragment key={node.id}>
                  {idx > 0 && (
                    <li className={styles.archArrow} aria-hidden="true" data-arrow-mo="↓">
                      →
                    </li>
                  )}
                  <li className={styles.archNode}>
                    <strong className={styles.archNodeTitle}>{node.title}</strong>
                    {node.desc && <span className={styles.archNodeDesc}>{node.desc}</span>}
                  </li>
                </Fragment>
              ))}
            </ol>

            <ul className={styles.securityItems}>
              {SECURITY_ITEMS.map((item) => (
                <li key={item.tag} className={styles.securityItem}>
                  <IconSurface src={item.glyph} size={44} sizeMo={40} glyphFit="fill" />
                  <div className={styles.securityText}>
                    <span className={styles.securityTag}>{item.tag}</span>
                    <h3 className={styles.securityTitle}>{item.title}</h3>
                    <p className={styles.securityDesc}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </BasicSection>

        {/* 3. 워크플로우·연동 */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="INTEGRATION"
          title="간단하게 사용하고 필요하면 기존 시스템과 연결합니다"
          description="기본 작업은 3단계로 진행하고, 반복적인 업무가 필요한 환경에서는 REST API를 통해 기존 시스템과 연결할 수 있습니다."
        >
          <div className={styles.integrationBody}>
            <ol className={styles.workflowSteps}>
              {WORKFLOW_STEPS.map((step) => (
                <li key={step.title} className={styles.workflowStep}>
                  <IconSurface src={step.glyph} size={44} glyphFit="fill" />
                  <div className={styles.workflowText}>
                    <h3 className={styles.workflowTitle}>{step.title}</h3>
                    <p className={styles.workflowDesc}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.apiPanel}>
              <div className={styles.apiHead}>
                <h3 className={styles.apiTitle}>REST API Integration</h3>
                <p className={styles.apiDesc}>
                  기존 업무 시스템에 xPrivacy의 비식별 기능을 연결해 반복적인 처리 흐름이나 정기적인 비식별 작업을 자동화할 수 있습니다.
                </p>
              </div>
              <div className={styles.apiFlow}>
                {API_FLOW.map((box, idx) => (
                  <Fragment key={box.title}>
                    {idx > 0 && <FlowArrow />}
                    <div className={`${styles.apiBox} ${box.accent ? styles.apiBoxAccent : ""}`}>
                      <IconSurface
                        src={box.glyph}
                        size={44}
                        tone={box.accent ? "soft" : "default"}
                        glyphFit="fill"
                      />
                      <span className={styles.apiBoxText}>
                        <strong className={styles.apiBoxTitle}>{box.title}</strong>
                        <span className={styles.apiBoxDesc}>{box.desc}</span>
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 4. CTA */}
        <CtaSection
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 서비스를
              <br />
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
