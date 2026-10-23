import type { ReactNode } from "react";
import FrontLayout from "../layouts/FrontLayout";
import { HeroSection, BasicSection, CtaSection } from "../../../components/domain/Section";
import { IconSurface } from "../../../components/core/Icon/IconSurface";
import styles from "./ai-auto-editing.module.scss";

const IMG = "/images/features/ai-auto-editing";

// 히어로 처리 흐름 3단계 (Figma PC 2304:4239)
const HERO_STEPS = [
  {
    step: "STEP 01",
    title: "대상 인식",
    desc: "얼굴·번호판 자동 탐지",
    glyph: "glyph_scan_face.svg",
  },
  {
    step: "STEP 02",
    title: "자동 추적",
    desc: "동선 연속 추적",
    glyph: "glyph_route.svg",
  },
  {
    step: "STEP 03",
    title: "효과 매핑",
    desc: "구간별 효과 자동 적용",
    glyph: "glyph_sparkles.svg",
  },
];

interface Item {
  title: string;
  desc: string;
}

// 1. 스마트 대상 인식 및 자동 추적 (Figma PC 2281:3432 / Mobile 2286:4680)
const TRACKING_ITEMS: Item[] = [
  {
    title: "복잡한 배경 속 객체를 정밀 탐지하는 AI 바운딩 박스",
    desc: "시야 가림이나 조명 변화가 심한 CCTV 영상에서도 비식별 대상의 위치와 범위를 정밀하게 추적합니다.",
  },
  {
    title: "트랙 단위 연속 동선 추적",
    desc: "대상의 움직임을 트랙 단위로 이어 추적하고 가림·자세 변화 구간을 보간하여 튀거나 엇갈림 없는 연속 비식별을 구현합니다.",
  },
  {
    title: "다중 인물·차량 복합 동선 동시 추적",
    desc: "여러 사람이 겹쳐 이동하거나 차량이 번잡하게 얽히는 환경에서도 각 개체의 독립된 이동 경로를 식별하여 안정적으로 추적합니다.",
  },
];

// 2. 비식별 효과 자동 매핑 (Figma PC 2281:3467 / Mobile 2286:4715)
const MAPPING_ITEMS: Item[] = [
  {
    title: "객체 크기에 맞춘 블러 강도 자동 조정",
    desc: "카메라와 대상 간의 거리에 따라 달라지는 객체 크기에 맞춰 AI가 블러 강도를 자동으로 조정해 일관된 처리 수준을 유지합니다.",
  },
  {
    title: "구간별 렌더링 자동 동기화",
    desc: "개인정보 식별 대상이 영상에 등장하는 구간을 트랙 단위로 인식하여 대상이 나타나는 구간에만 효과를 정확하게 적용합니다.",
  },
];

function FeatureCopy({
  eyebrow,
  heading,
  lead,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  lead: string;
  items: Item[];
}) {
  return (
    <div className={styles.copy}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.lead}>{lead}</p>
      </div>
      <ol className={styles.list}>
        {items.map((item, idx) => (
          <li key={item.title} className={styles.listItem}>
            <span className={styles.listNum}>
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className={styles.listText}>
              <h3 className={styles.listTitle}>{item.title}</h3>
              <p className={styles.listDesc}>{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * 설명용 도식 (시안 렌더링 이미지 · PC/MO 레이아웃이 달라 이미지 2종)
 * 이미지는 카드 그림자 여백을 포함하므로 음수 여백으로 카드 영역(560×490 / 350 폭)에 맞춤
 */
function Diagram({ name, alt }: { name: string; alt: string }) {
  return (
    <figure className={styles.diagram}>
      <picture>
        <source media="(max-width: 768px)" srcSet={`${IMG}/${name}_mo.png`} />
        <img src={`${IMG}/${name}.png`} alt={alt} />
      </picture>
    </figure>
  );
}

export default function PubFeaturesAiAutoEditing() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2304:4170 / Mobile 2304:4284 · 가운데 정렬 + 처리 흐름 3단계) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.editHero}
          eyebrow="Features"
          title={
            <>
              스마트한 추적과
              <br className="mobileBr" /> 구간 자동 매핑으로
              <br /> 빠르고 정확한
              <br className="mobileBr" /> 비식별 워크플로우
            </>
          }
          description="대상 인식부터 효과 적용까지 연결된 AI 편집 파이프라인으로 관공서 대용량 영상도 단 몇 번의 클릭으로 신속하게 가공합니다."
        >
          {/* 섹션 콘텐츠 첫 요소의 margin은 0으로 고정되므로 한 겹 감싸 간격(48)을 조정 */}
          <div>
            <ol className={styles.heroSteps}>
              {HERO_STEPS.map((item) => (
                <li key={item.step} className={styles.heroStep}>
                  <IconSurface
                    src={`${IMG}/${item.glyph}`}
                    size={52}
                    sizeMo={44}
                    glyphFit="fill"
                  />
                  <span className={styles.heroStepText}>
                    <span className={styles.heroStepLabel}>{item.step}</span>
                    <strong className={styles.heroStepTitle}>
                      {item.title}
                    </strong>
                    <span className={styles.heroStepDesc}>{item.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </HeroSection>

        {/* 2. 자동 추적 */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.split}>
            <Diagram
              name="diagram_tracking"
              alt="인물 2명과 차량 번호판을 트랙 단위로 인식하고 동선을 이어 추적하는 화면 (설명용 표현)"
            />
            <FeatureCopy
              eyebrow="TRACKING"
              heading={<span className={styles.headingOneLine}>스마트 대상 인식 및 자동 추적</span>}
              lead="영상에 등장하는 얼굴, 신체, 번호판 등 비식별 대상의 등장 시점부터 퇴장 시점까지 동선을 AI가 인식하여 끊김 없이 자동 추적합니다."
              items={TRACKING_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 3. 효과 매핑 */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={`${styles.split} ${styles.reverse}`}>
            <Diagram
              name="diagram_mapping"
              alt="객체별 거리에 따라 모자이크·블러 강도와 등장 구간(IN/OUT)을 자동으로 매핑한 목록 (설명용 표현)"
            />
            <FeatureCopy
              eyebrow="MAPPING"
              heading={
                <>
                  영상 구간과 객체 특성에
                  <br className="mobileBr" /> 최적화된
                  <br className="pcBr" /> 비식별 효과
                  <br className="mobileBr" /> 자동 매핑
                </>
              }
              lead="수동 타임라인 작업 없이, AI가 비식별 영역의 이동 경로나 배경 변화에 따라 모자이크, 블러, 가상 얼굴 등 지정된 보안 효과와 가공 구간을 자동으로 매칭·적용합니다."
              items={MAPPING_ITEMS}
            />
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
