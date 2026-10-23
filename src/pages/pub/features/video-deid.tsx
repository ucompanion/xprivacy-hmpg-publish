import type { CSSProperties, ReactNode } from "react";
import FrontLayout from "../layouts/FrontLayout";
import { HeroSection, BasicSection, CtaSection } from "../../../components/domain/Section";
import styles from "./video-deid.module.scss";

const IMG = "/images/features/video-deid";

type Rect = readonly [number, number, number, number];

// 좌표는 시안 px 그대로 두고 기준 프레임 대비 %로 변환
const placeIn =
  (frameW: number, frameH: number) =>
  ([x, y, w, h]: Rect): CSSProperties => ({
    left: `${(x / frameW) * 100}%`,
    top: `${(y / frameH) * 100}%`,
    width: `${(w / frameW) * 100}%`,
    height: `${(h / frameH) * 100}%`,
  });

// 섹션 비주얼 프레임 560×490 (MO 350×306.25 동일 비율)
const place = placeIn(560, 490);

// 히어로 사진: 원본 1152×928을 폭 1240에 맞춘 캔버스(1240×998.9) 기준, 시안 프레임(560 높이) 대비 위로 219.45 이동
const HERO_CANVAS = { w: 1240, h: 998.9, offsetY: 219.45 };
const placeHero = ([x, y, w, h]: Rect) =>
  placeIn(HERO_CANVAS.w, HERO_CANVAS.h)([x, y + HERO_CANVAS.offsetY, w, h]);

type Tone = "selected" | "detected";

/** Detection Box: 테두리 + 모서리 4 + 선택적 라벨 (selected 하늘색 · detected 흰색) */
function DetectionBox({
  rect,
  style,
  tone = "selected",
  label,
  labelAt,
}: {
  rect?: Rect;
  style?: CSSProperties;
  tone?: Tone;
  label?: string;
  /** 라벨 위치(박스 기준 px). 기본 left -1 · top -25 */
  labelAt?: readonly [number, number];
}) {
  return (
    <span
      className={`${styles.detectionBox} ${tone === "detected" ? styles.toneDetected : ""}`.trim()}
      style={style ?? (rect ? place(rect) : undefined)}
      aria-hidden="true"
    >
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
      {label && (
        <span
          className={styles.detectionLabel}
          style={
            labelAt
              ? ({
                  "--label-x": labelAt[0],
                  "--label-y": labelAt[1],
                } as CSSProperties)
              : undefined
          }
        >
          {label}
        </span>
      )}
    </span>
  );
}

interface Item {
  title: string;
  desc: string;
}

function FeatureCopy({
  eyebrow,
  heading,
  lead,
  items,
  note,
}: {
  eyebrow: string;
  heading: ReactNode;
  lead: string;
  items: Item[];
  note?: string;
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
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}

// 히어로 사진 얼굴: 모자이크(blur 7) 영역 + 5px 바깥 탐지 박스
const HERO_FACES: Rect[] = [
  [554.74, 239.44, 61.184, 73.421],
  [693.42, 202.73, 61.184, 73.421],
  [422.17, 247.6, 32.632, 36.711],
  [294, 236, 22, 27],
  [259, 252, 22, 26],
  [324, 239, 20, 23],
];
const grow = ([x, y, w, h]: Rect, d: number): Rect => [
  x - d,
  y - d,
  w + d * 2,
  h + d * 2,
];

// 1. 자동 추적 (Figma PC 2258:2510 / Mobile 2286:3764)
const TRACKING_ITEMS: Item[] = [
  {
    title: "실시간급 처리 속도를 구현하는 고성능 AI 엔진",
    desc: "대용량 CCTV 및 긴 분량의 영상을 초당 최대 120프레임 속도로 고속 처리하여 수동 가공 대비 작업 시간을 크게 줄입니다.",
  },
  {
    title: "연속 프레임 추적",
    desc: "보행자의 가려짐, 빠른 차량 이동, 카메라 앵글 전환 등 복잡한 영상 환경에서도 AI가 동일 객체를 놓치지 않고 안정적으로 추적합니다.",
  },
  {
    title: "프레임 누락 방지 보안 알고리즘",
    desc: "영상 전 프레임을 전수 조사하여 순간적으로 노출되는 이목구비나 번호판까지 탐지해 법적 리스크를 원천 차단합니다.",
  },
];
const TRACKING_IDS: {
  rect: Rect;
  label: string;
  labelAt?: readonly [number, number];
}[] = [
  { rect: [114, 250, 24, 28], label: "ID 01" },
  { rect: [165, 267, 24, 28], label: "ID 02" },
  { rect: [255, 203, 24, 28], label: "ID 03" },
  { rect: [310, 302, 24, 28], label: "ID 04" },
  { rect: [377, 258, 24, 28], label: "ID 05" },
  { rect: [459, 256, 24, 28], label: "ID 06" },
  { rect: [510, 338, 24, 28], label: "ID 07" },
  { rect: [231, 214, 24, 28], label: "ID 08", labelAt: [-50, -25] },
  { rect: [24, 319, 24, 28], label: "ID 09" },
  { rect: [165, 201, 18, 22], label: "ID 10", labelAt: [-50, -1] },
  { rect: [284, 201, 22, 26], label: "ID 11", labelAt: [-1, 29] },
  { rect: [344, 199, 22, 26], label: "ID 12" },
  { rect: [483, 251, 24, 28], label: "ID 13", labelAt: [25, -1] },
  { rect: [200, 172, 18, 22], label: "ID 14" },
  { rect: [327, 164, 18, 22], label: "ID 15" },
  { rect: [385, 196, 18, 22], label: "ID 16" },
];

// 2. 비가역·정밀 차단 (Figma PC 2258:2519 / Mobile 2286:3773)
const IRREVERSIBLE_ITEMS: Item[] = [
  {
    title: "원본 복원 불가능한 비가역적 가공",
    desc: "변환 시 원본 식별 정보를 완전히 파기하는 방식을 적용하여 AI 복원 기술이나 픽셀 역산으로도 원본을 되살릴 수 없습니다.",
  },
  {
    title: "얼굴, 차량 번호판, 신체의 동시 정밀 식별",
    desc: "사람의 얼굴과 신체는 물론 이동 차량의 번호판까지 개인을 특정할 수 있는 대상을 한 번에 자동으로 인식합니다.",
  },
  {
    title: "주변 배경을 해치지 않는 정밀 영역 타겟팅",
    desc: "타겟 객체의 경계 면만 정확히 비식별 처리하여 주변 행정적 정황이나 증거 능력 데이터의 훼손을 최소화합니다.",
  },
];
const BUSSTOP_FACES: { blur: Rect; box: Rect }[] = [
  { blur: [91, 230, 29, 32], box: [88, 228, 35, 36] },
  { blur: [135, 229, 24, 28], box: [133, 227, 28, 32] },
  { blur: [204, 212, 24, 28], box: [202, 210, 28, 32] },
  { blur: [285, 213, 24, 28], box: [283, 211, 28, 32] },
  { blur: [245, 247, 11, 14], box: [243, 245, 15, 18] },
];

// 3. 가상 얼굴 (Figma PC 2258:2528 / Mobile 2286:3782)
const VIRTUAL_ITEMS: Item[] = [
  {
    title: "장면의 자연스러운 인상 유지",
    desc: "영상 속 인물의 얼굴을 가상의 얼굴로 치환해 원본 신원 노출을 줄이고, 장면의 자연스러운 인상을 그대로 유지합니다.",
  },
  {
    title: "데이터 재사용성과 심미성 확보",
    desc: "모자이크·블러로 가린 화면 대신 자연스러운 얼굴로 처리해 비식별 이후에도 영상 데이터를 다시 활용할 수 있습니다.",
  },
  {
    title: "한국인 특화 데이터셋 활용",
    desc: "국내 인구통계학적 특성을 반영한 전용 데이터셋 기반으로 생성되어 이질감 없이 공공 홍보 영상의 품질과 몰입도를 극대화합니다.",
  },
];

// 4. 등장인물 분류 (Figma PC 2258:2537 / Mobile 2286:3791)
const CLASSIFICATION_ITEMS: Item[] = [
  {
    title: "인물별로 자동 분류하는 스마트 UX",
    desc: "영상에 나온 사람들의 얼굴을 AI가 동일인별로 추출 및 그룹화하여 썸네일 리스트 형태로 직관적으로 보여줍니다.",
  },
  {
    title: "선택적 비식별 및 일괄 제외",
    desc: "클릭 한 번으로 비식별 대상(예: 일반 행인)과 제외 대상(예: 민원 신청 본인)을 지정하여 전체 영상에 일괄 적용합니다.",
  },
  {
    title: "대용량 인물 데이터 관리",
    desc: "수십 명이 등장하는 공공장소 CCTV 영상에서도 인물별 등장 타임라인을 빠르게 파악하고 제어할 수 있습니다.",
  },
];
const CAFE_PEOPLE: { rect: Rect; tone: Tone; label?: string }[] = [
  { rect: [84, 222, 46, 57], tone: "detected", label: "PERSON 01" },
  { rect: [148, 140, 38, 50], tone: "detected", label: "PERSON 02" },
  { rect: [223, 189, 46, 61], tone: "selected", label: "PERSON 03" },
  { rect: [328, 203, 44, 56], tone: "detected", label: "PERSON 04" },
  { rect: [398, 126, 46, 54], tone: "detected", label: "PERSON 05" },
];
// 인물 썸네일 크롭 (원본 사진 확대 배율 · 위치 %)
const CAFE_THUMBS = [
  { size: 1037.78, left: -142.5, top: -480.56 },
  { size: 1111.11, left: -279, top: -343.92 },
  { size: 1111.11, left: -440.45, top: -461.25, active: true },
  { size: 1111.11, left: -644.44, top: -485.83 },
  { size: 1111.11, left: -788.85, top: -329.2 },
];

// 5. 검수·수정 (Figma PC 2258:2546 / Mobile 2286:3800)
const REVIEW_ITEMS: Item[] = [
  {
    title: "타임라인 기반 결과 검수",
    desc: "비식별화가 적용된 구간을 타임라인 상의 마커(Marker)로 확인하고, 원하는 시점으로 즉시 이동하여 빠르게 검수합니다.",
  },
  {
    title: "직관적 수동 수정",
    desc: "AI 탐지 영역의 크기나 위치가 어색할 경우, 마우스 드래그로 손쉽게 박스 크기를 조정하거나 위치를 바꿀 수 있습니다.",
  },
  {
    title: "구간별 수동 객체 추가 및 고정",
    desc: "특수 사물이나 가려진 영역 등 추가 가공이 필요한 경우 손쉽게 신규 마스킹 영역을 지정하고 해당 프레임에 고정할 수 있습니다.",
  },
];
const INTERVIEW_FACES: { blur: Rect; box: Rect }[] = [
  { blur: [474, 207, 19, 25], box: [472, 205, 23, 29] },
  { blur: [521, 186, 29, 32], box: [519, 184, 33, 36] },
];

export default function PubFeaturesVideoDeid() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2280:2796 / Mobile 2286:64089 · 가운데 정렬 + 처리 예시 사진) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.videoHero}
          eyebrow="Features"
          title={
            <>
              대용량 영상 비식별,
              <br className="mobileBr" /> 자동 추적부터
              <br /> 검수까지 단 몇 번의
              <br className="mobileBr" /> 클릭으로
            </>
          }
          description="고속 AI 엔진의 자동 추적과 인물별 썸네일 분류 기능으로 복잡한 영상 수동 가공 업무 공수를 획기적으로 절감해 드립니다."
        >
          {/* 섹션 콘텐츠 첫 요소의 margin은 0으로 고정되므로 한 겹 감싸 간격(48)을 조정 */}
          <div>
            <div className={styles.heroPhoto}>
              <div className={styles.heroCanvas}>
                <img
                  src={`${IMG}/hero_riverside.jpg`}
                  alt="강변 산책로 보행자 얼굴을 자동 추적해 모자이크 처리한 예시"
                />
                {HERO_FACES.map((face) => (
                  <span key={face.join("-")} aria-hidden="true">
                    <span
                      className={styles.heroMosaic}
                      style={placeHero(face)}
                    />
                    <DetectionBox style={placeHero(grow(face, 5))} />
                  </span>
                ))}
              </div>
              <span className={styles.heroChip}>
                <img src={`${IMG}/chip_dot.svg`} alt="" aria-hidden="true" />
                영상 비식별 처리 예시
              </span>
            </div>
          </div>
        </HeroSection>

        {/* 2. 자동 추적 */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.split}>
            <div className={styles.visual}>
              <img
                src={`${IMG}/tracking_hall.jpg`}
                alt="실내 통로 보행자 16명을 ID별로 자동 추적한 화면"
                className={styles.cover}
              />
              {TRACKING_IDS.map((item) => (
                <DetectionBox
                  key={item.label}
                  rect={item.rect}
                  tone="detected"
                  label={item.label}
                  labelAt={item.labelAt}
                />
              ))}
            </div>
            <FeatureCopy
              eyebrow="TRACKING"
              heading={
                <>
                  장시간 영상의 1프레임도 놓치지 않는
                  <br />
                  AI 초고속 자동 추적
                </>
              }
              lead="초당 최대 120fps 고속 엔진을 탑재하여 대용량 영상 전체 프레임 속 움직이는 대상을 실시간급 속도로 자동 추적·비식별화합니다."
              items={TRACKING_ITEMS}
              note="* 처리 속도는 모자이크 기준이며, 자사 테스트(FHD, 30초, 4인 얼굴) 결과입니다."
            />
          </div>
        </BasicSection>

        {/* 3. 비가역·정밀 차단 */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={`${styles.split} ${styles.reverse}`}>
            <div className={styles.visual}>
              <img
                src={`${IMG}/busstop.jpg`}
                alt="버스정류장 인물 얼굴과 차량 번호판을 동시에 가린 예시"
                className={styles.cover}
              />
              {BUSSTOP_FACES.map((face) => (
                <span key={face.box.join("-")} aria-hidden="true">
                  <span className={styles.faceBlur} style={place(face.blur)} />
                  <DetectionBox rect={face.box} />
                </span>
              ))}
              <span
                className={styles.plateMask}
                style={place([455, 346, 40, 12])}
                aria-hidden="true"
              />
              <DetectionBox rect={[455, 346, 40, 12]} />
            </div>
            <FeatureCopy
              eyebrow="IRREVERSIBLE"
              heading={
                <>
                  복원 불가 비가역적 변환과
                  <br />
                  다중 식별 객체 정밀 차단
                </>
              }
              lead="원본 식별 정보를 되돌릴 수 없는 방식으로 가공하고, 얼굴·차량 번호판·신체를 동시에 탐지해 정밀하게 비식별화합니다."
              items={IRREVERSIBLE_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 4. 가상 얼굴 */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.split}>
            <div className={`${styles.visual} ${styles.facePanel}`}>
              <span
                className={styles.facePhoto}
                style={place([32, 80, 232, 290])}
              >
                <img
                  src={`${IMG}/face_original.jpg`}
                  alt="원본 인물 얼굴"
                  style={{
                    left: "-3.83%",
                    top: "-5.53%",
                    width: "106.38%",
                    height: "106.38%",
                  }}
                />
              </span>
              <span
                className={styles.facePhoto}
                style={place([296, 80, 232, 290])}
              >
                <img
                  src={`${IMG}/face_virtual.jpg`}
                  alt="가상 얼굴로 치환한 인물"
                  style={{
                    left: "-4.95%",
                    top: "-0.99%",
                    width: "109.89%",
                    height: "109.89%",
                  }}
                />
              </span>
              <span
                className={styles.faceLabel}
                style={{ ...place([32, 386, 232, 21]) }}
              >
                원본
              </span>
              <span
                className={`${styles.faceLabel} ${styles.faceLabelAccent}`}
                style={{ ...place([296, 386, 232, 21]) }}
              >
                가상 얼굴
              </span>
              <span
                className={styles.faceArrow}
                style={place([264, 212, 32, 24])}
                aria-hidden="true"
              >
                →
              </span>
            </div>
            <FeatureCopy
              eyebrow="VIRTUAL FACE"
              heading="한국인 맞춤 가상 얼굴 변환"
              lead="답답한 모자이크 대신 한국인 데이터셋 기반 생성형 AI로 이질감 없는 가상 얼굴을 합성하여 홍보 및 행정 영상의 몰입도를 높입니다."
              items={VIRTUAL_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 5. 등장인물 분류 */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={`${styles.split} ${styles.reverse}`}>
            <div className={styles.visual}>
              <img
                src={`${IMG}/cafe_terrace.jpg`}
                alt="카페 테라스 등장인물 5명을 인물별로 분류한 화면"
                className={styles.cover}
              />
              {CAFE_PEOPLE.map((person) => (
                <DetectionBox
                  key={person.rect.join("-")}
                  rect={person.rect}
                  tone={person.tone}
                  label={person.label}
                />
              ))}
              <span className={styles.peopleRail} aria-hidden="true">
                {CAFE_THUMBS.map((thumb) => (
                  <span
                    key={thumb.left}
                    className={`${styles.thumb} ${thumb.active ? styles.thumbActive : ""}`.trim()}
                  >
                    <img
                      src={`${IMG}/cafe_terrace.jpg`}
                      alt=""
                      style={{
                        left: `${thumb.left}%`,
                        top: `${thumb.top}%`,
                        width: `${thumb.size}%`,
                        height: `${thumb.size}%`,
                      }}
                    />
                  </span>
                ))}
              </span>
            </div>
            <FeatureCopy
              eyebrow="CLASSIFICATION · BETA"
              heading={
                <>
                  등장인물 자동 분류를 통한
                  <br />
                  선택적 일괄 처리
                </>
              }
              lead="영상 내 등장인물의 썸네일을 인물별로 자동 분류하여 민원인 등 특정 대상만 선택해 비식별화하거나 제외하는 스마트 편집을 지원합니다."
              items={CLASSIFICATION_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 6. 검수·수정 */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.split}>
            <div className={styles.visual}>
              <img
                src={`${IMG}/street_interview.jpg`}
                alt="거리 인터뷰 영상의 비식별 구간을 타임라인으로 검수하는 화면"
                className={styles.cover}
              />
              {INTERVIEW_FACES.map((face) => (
                <span key={face.box.join("-")} aria-hidden="true">
                  <span
                    className={`${styles.faceBlur} ${styles.faceBlurSoft}`}
                    style={place(face.blur)}
                  />
                  <DetectionBox rect={face.box} />
                </span>
              ))}
              <span className={styles.timeline} aria-hidden="true">
                <span className={styles.timelineTitle}>
                  TIMELINE · 비식별 구간 2
                </span>
                <span className={styles.timelineBar}>
                  <span style={{ left: "18%", width: "22%" }} />
                  <span style={{ left: "60%", width: "28%" }} />
                  <span className={styles.playhead} />
                </span>
              </span>
            </div>
            <FeatureCopy
              eyebrow="REVIEW · BETA"
              heading={
                <>
                  직관적 검수 및
                  <br />
                  즉시 수정 인터페이스
                </>
              }
              lead="가공 결과를 타임라인 상에서 한눈에 확인하고, 자동 탐지 영역을 손쉽게 마우스 드래그로 수정하거나 추가·삭제할 수 있습니다."
              items={REVIEW_ITEMS}
            />
          </div>
        </BasicSection>

        {/* 7. CTA */}
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
