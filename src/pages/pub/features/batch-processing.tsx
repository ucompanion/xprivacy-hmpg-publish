import type { ReactNode } from "react";
import FrontLayout from "../layouts/FrontLayout";
import { HeroSection, BasicSection } from "../../../components/domain/Section";
import { IconSurface } from "../../../components/core/Icon/IconSurface";
import { ProductCta } from "../product/sections/ProductCta";
import styles from "./batch-processing.module.scss";

const IMG = "/images/features/batch-processing";

// 히어로 처리 흐름 3단계 (Figma PC 2291:4485)
const HERO_STEPS = [
  { step: "STEP 01", title: "일괄 등록", glyph: "glyph_folder_up.svg" },
  { step: "STEP 02", title: "병렬 처리", glyph: "glyph_layers.svg" },
  { step: "STEP 03", title: "검수·반출", glyph: "glyph_file_check.svg" },
];

interface Item {
  title: string;
  desc: string;
}

// 1. 대용량 파일 일괄 드래그 앤 드롭 (Figma PC 2281:2751 / Mobile 2286:4167)
const UPLOAD_ITEMS: Item[] = [
  {
    title: "여러 파일 한 번에 등록",
    desc: "여러 개의 이미지와 영상 파일을 한 번의 드래그 앤 드롭으로 함께 업로드합니다.",
  },
  {
    title: "이종 파일 포맷 동시 입력 지원",
    desc: "JPG, PNG 이미지부터 MP4, MOV 영상까지 분류 작업 없이 한 작업창에 일괄 등록할 수 있습니다.",
  },
  {
    title: "대용량 파일 전송 중단 없는 안정적 네트워크 파이프라인",
    desc: "대용량 CCTV 및 행정 아카이브 파일도 전송 오류를 줄여 안정적으로 업로드합니다.",
  },
];

// 2. 워크플로우 자동화 및 동시 병렬 처리 (Figma PC 2281:2829 / Mobile 2286:4245)
const PARALLEL_ITEMS: Item[] = [
  {
    title: "고속 처리 엔진 기반 일괄 가공",
    desc: "멀티미디어 고속 처리 엔진으로 등록된 파일을 일괄 가공하여 대량의 비식별 작업도 빠르게 처리합니다.",
  },
  {
    title: "동일한 비식별 옵션 일괄 적용",
    desc: "얼굴·신체·번호판별 비식별 옵션(모자이크, 마스킹, 블러, 가상 얼굴)을 선택해 등록된 전체 파일에 동일하게 적용합니다.",
  },
  {
    title: "담당자 부재 중에도 지속되는 스마트 작업 큐",
    desc: "웹 브라우저를 닫거나 다른 업무를 보는 동안에도 서버에서 비식별화 작업이 계속 진행됩니다.",
  },
];

// 3. 일괄 결과 검수 및 아카이브 다운로드 (Figma PC 2281:2910 / Mobile 2286:4326)
const EXPORT_ITEMS: Item[] = [
  {
    title: "처리 결과 한눈에 확인",
    desc: "파일별 처리 상태와 결과를 목록에서 한눈에 확인할 수 있습니다.",
  },
  {
    title: "일괄 검수 및 빠른 개별 수정 지원",
    desc: "일괄 처리된 결과물 중 재확인이 필요한 특정 파일만 클릭하여 즉시 타임라인 검수 및 영역 수정을 진행합니다.",
  },
  {
    title: "원클릭 압축 파일 반출",
    desc: "가공 완료된 결과물을 암호화된 압축(ZIP) 파일 형태로 한 번에 다운로드합니다.",
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

export default function PubFeaturesBatchProcessing() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2291:4476 / Mobile 2291:4516 · 가운데 정렬 + 처리 흐름 3단계) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.batchHero}
          eyebrow="Features"
          title={
            <>
              대량의 이미지·영상
              <br className="mobileBr" /> 데이터,
              <br className="pcBr" /> 한 번에
              <br className="mobileBr" /> 등록하고
              <br className="mobileBr" /> 병렬로 가공
            </>
          }
          description="반복적이고 소모적인 개별 가공 작업 없이, 다수의 이미지와 영상을 한꺼번에 등록하여 탐지부터 비식별 처리까지 한 번에 완료합니다."
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
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </HeroSection>

        {/* 2. 업로드 */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.split}>
            <Diagram
              name="diagram_upload"
              alt="여러 폴더의 이미지·영상 파일을 드래그 앤 드롭으로 작업창에 일괄 등록하는 흐름 (설명용 표현)"
            />
            <FeatureCopy
              eyebrow="UPLOAD"
              heading="대용량 파일 일괄 드래그 앤 드롭"
              lead="여러 이미지와 영상 파일을 일일이 개별 등록할 필요 없이 한 번에 등록합니다."
              items={UPLOAD_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 3. 병렬 처리 */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={`${styles.split} ${styles.reverse}`}>
            <Diagram
              name="diagram_queue"
              alt="입력 파일에 보안 정책을 일괄 적용해 AI 작업 큐 4개로 분배하고 결과를 만드는 흐름 (설명용 표현)"
            />
            <FeatureCopy
              eyebrow="PARALLEL"
              heading="워크플로우 자동화 및 동시 병렬 처리"
              lead="다량의 파일이 등록되더라도 AI가 탐지부터 비식별 처리까지 자동으로 이어서 처리해 반복 작업을 줄입니다."
              items={PARALLEL_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 4. 검수·반출 */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.split}>
            <Diagram
              name="diagram_export"
              alt="결과 목록에서 필요한 파일만 개별 검수한 뒤 암호화 ZIP으로 반출하는 흐름 (설명용 표현)"
            />
            <FeatureCopy
              eyebrow="EXPORT"
              heading="일괄 결과 검수 및 아카이브 다운로드"
              lead="파일별 가공 상태를 한눈에 확인하고, 검수 완료된 결과물 전체를 압축 파일 형태로 한 번에 반출할 수 있습니다."
              items={EXPORT_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 5. CTA */}
        <ProductCta
          eyebrow="GET STARTED"
          title={
            <>
              업무 환경에 맞는 서비스를
              <br />
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
