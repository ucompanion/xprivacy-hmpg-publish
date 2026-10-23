import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { IconSurface } from '../../../components/core/Icon/IconSurface';
import { BenefitCardGroup } from '../../../components/domain/Benefit/BenefitCards';
import { ProductCta } from '../product/sections/ProductCta';
import styles from './smart-workflow.module.scss';

const IMG = '/images/technology/smart-workflow';

// Workflow Steps (Figma PC 2165:10043 / Mobile 2165:10286)
const WORKFLOW_STEPS = [
  { step: 'STEP 01', title: '반입', desc: ['영상·이미지 업로드 (드래그 앤 드롭)'] },
  { step: 'STEP 02', title: 'AI 자동 탐지', desc: ['얼굴 · 번호판 · 전신 검출 후', '트랙 단위 추적'] },
  { step: 'STEP 03', title: '비식별 처리', desc: ['블러 · 모자이크 · 마스킹 ·', '가상 얼굴 (비가역)'] },
  { step: 'STEP 04', title: '검수 · 반출', desc: ['웹 편집기 보정 후', 'AES-256 암호화 반출'] },
];

// 처리 결과 예시: 사진 기준 좌표(%) — 얼굴 블러 2곳 · 번호판 마스킹 1곳
const DEMO_TARGETS = [
  { id: 'face-01', type: 'blur', left: 14.69, top: 38.64, width: 3.55, height: 6.44 },
  { id: 'face-02', type: 'blur', left: 43.09, top: 36.83, width: 2.1, height: 3.87 },
  { id: 'plate', type: 'mask', left: 67.69, top: 54.23, width: 5.97, height: 2.45 },
] as const;

// Core Technology (Figma PC 2165:10168 / Mobile 2165:10411)
const TECH_CARDS = [
  {
    glyph: 'glyph_target.svg',
    eyebrow: 'SMART TARGET',
    title: '스마트 인물 및 영역 타겟팅',
    desc: '영상 내 등장인물을 동일인별 썸네일로 그룹화하고, 선택한 인물의 개인정보를 MOT(검출-후-추적) 엔진으로 영상 전체에서 일관되게 추적·가공합니다.',
  },
  {
    glyph: 'glyph_automation.svg',
    eyebrow: 'WORKFLOW AUTOMATION',
    title: '워크플로우 자동화 및 효율화',
    desc: '프레임별 수동 수정 작업을 AI가 전담 처리하여, 특정 인물이나 영역을 선택하는 것만으로 영상 전체 타임라인에 비식별화 효과를 원스톱으로 적용합니다.',
  },
  {
    glyph: 'glyph_timeline.svg',
    eyebrow: 'TIMELINE REVIEW',
    title: '직관적 타임라인 검수 및 정밀 수정',
    desc: '비식별 적용 구간을 타임라인 마커로 한눈에 확인하고, 마우스 드래그 및 슬라이더 조작으로 마스킹 크기와 블러 강도를 실시간 조율할 수 있습니다.',
  },
  {
    glyph: 'glyph_background.svg',
    eyebrow: 'BACKGROUND PROCESSING & AUDIT',
    title: '무인 백그라운드 가공 및 규격 반출',
    desc: '대용량 파일 가공이 서버에서 계속 진행되며, 가공 완료본은 AES-256 암호화 패키징과 함께 6종의 변조 불가 감사 기록(Append-only)을 적재해 안전하게 반출됩니다.',
  },
];

// 도입 효과 (Figma PC 2165:10223 / Mobile 2165:10466)
const BENEFITS = [
  {
    glyph: 'glyph_resource.svg',
    title: '수동 작업 리소스 단축',
    desc: '프레임별 수동 수정 작업을 AI가 전담해 반복 작업에 드는 시간을 줄입니다.',
  },
  {
    glyph: 'glyph_gui.svg',
    title: '비전문가도 가능한 직관적 GUI',
    desc: '타임라인 마커와 슬라이더 조작으로 누구나 쉽게 검수하고 수정합니다.',
  },
  {
    glyph: 'glyph_pipeline.svg',
    title: '데이터 반출 및 업무 파이프라인 단축',
    desc: '반입부터 가공·반출까지 하나의 화면에서 끊김 없이 이어서 처리합니다.',
  },
  {
    glyph: 'glyph_audit.svg',
    title: '반출 이력 관리와 책임추적성 확보',
    desc: '암호화 패키징과 변조 불가 감사 기록으로 반출 이력을 안전하게 남깁니다.',
  },
];

export default function PubTechnologySmartWorkflow() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2165:10030 / Mobile 2165:10273) */}
        <HeroSection
          heroVariant="compact"
          bgPreset="technology"
          className={styles.workflowHero}
          eyebrow="SMART WORKFLOW"
          title={
            <>
              반입 한 번으로,<br className="mobileBr" /> 탐지부터 안전<br className="mobileBr" /> 반출까지
              <br className="pcBr" /> 자동화된<br className="mobileBr" /> 대용량 파이프라인
            </>
          }
          description={
            <>
              여러 이미지와 영상을 드래그 앤 드롭으로 등록하면,<br className="mobileBr" /> 고속 처리 엔진으로 빠르게
              일괄 가공합니다.
            </>
          }
        />

        {/* 2. Workflow (Figma PC 2165:10037 / Mobile 2165:10280) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="WORKFLOW"
          title="하나의 화면에서 원스톱 스마트 비식별 워크플로우"
        >
          <div className={styles.workflowBody}>
            <ol className={styles.steps}>
              {WORKFLOW_STEPS.map((item) => (
                <li key={item.step} className={styles.step}>
                  <span className={styles.stepLabel}>{item.step}</span>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDesc}>
                    {item.desc[0]}
                    {item.desc[1] && (
                      <>
                        <br className="pcBr" /> {item.desc[1]}
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>

            <figure className={styles.demo}>
              <div className={styles.demoFrame}>
                <div className={styles.demoCanvas}>
                  <img src={`${IMG}/demo_street.jpg`} alt="거리 영상에서 보행자 얼굴과 차량 번호판을 탐지해 비식별 처리한 예시" />
                  {DEMO_TARGETS.map((target) => (
                    <span
                      key={target.id}
                      className={`${styles.target} ${target.type === 'blur' ? styles.targetBlur : styles.targetMask}`}
                      style={{
                        left: `${target.left}%`,
                        top: `${target.top}%`,
                        width: `${target.width}%`,
                        height: `${target.height}%`,
                      }}
                      aria-hidden="true"
                    >
                      <span className={styles.detectionBox}>
                        <span />
                        <span />
                        <span />
                        <span />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <figcaption className={styles.demoCaption}>비식별 처리 예시 · 얼굴 블러 · 번호판 마스킹</figcaption>
            </figure>
          </div>
        </BasicSection>

        {/* 3. Core Technology */}
        <BasicSection
          className={styles.coreSection}
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="CORE TECHNOLOGY"
          title="영상 내 개인정보를 정밀 탐지·분석하여 수동 개입을 최소화하는 비식별 가공"
        >
          <ul className={styles.techGrid}>
            {TECH_CARDS.map((card) => (
              <li key={card.eyebrow} className={styles.techCard}>
                <IconSurface src={`${IMG}/${card.glyph}`} size={48} sizeMo={44} tone="soft" className={styles.techIcon} />
                <span className={styles.techEyebrow}>{card.eyebrow}</span>
                <h3 className={styles.techTitle}>{card.title}</h3>
                <p className={styles.techDesc}>{card.desc}</p>
              </li>
            ))}
          </ul>
        </BasicSection>

        {/* 4. 도입 효과 */}
        <BasicSection bg="gray" layout="vertical" align="left" eyebrow="BENEFITS" title="도입 효과">
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
