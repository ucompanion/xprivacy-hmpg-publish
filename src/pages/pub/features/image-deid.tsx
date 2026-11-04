import type { CSSProperties } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import styles from './image-deid.module.scss';

const IMG = '/images/features/image-deid';

// 비주얼 기준 프레임 560×490 (MO 350×306.25는 같은 비율로 축소) — 좌표는 px로 두고 %로 변환
const FRAME = { w: 560, h: 490 };
const place = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / FRAME.w) * 100}%`,
  top: `${(y / FRAME.h) * 100}%`,
  width: `${(w / FRAME.w) * 100}%`,
  height: `${(h / FRAME.h) * 100}%`,
});

// 복원불가 (Figma PC 2257:2276 / Mobile 2286:3511)
const IRREVERSIBLE_ITEMS = [
  { title: '정밀한 객체 분석', desc: '필요한 대상 영역을 정밀하게 처리해 불필요한 배경 손실을 줄입니다.' },
  { title: '운영 효율의 극대화', desc: '반복적인 수작업을 AI 기반 워크플로우로 전환합니다.' },
  { title: '비가역적 보안 변환', desc: '처리된 개인정보를 원본으로 복원할 수 없는 방식으로 보호합니다.' },
];

// 회의실 사진 얼굴 위치 (비가역 블러)
const MEETING_FACES = [
  [31, 194.5],
  [124, 176.5],
  [268.33, 178.67],
  [420.7, 174.83],
  [496.42, 207.19],
];

// 정밀 타겟팅 탐지 (Figma PC 2257:2288 / Mobile 2286:3523)
const DETECTION_ITEMS = [
  {
    title: '얼굴 및 이목구비 정밀 인식',
    desc: '이목구비 정밀 타겟팅 기술로 얼굴 영역만 정확히 비식별화하고, 배경 침범을 최소화해 이미지 본연의 가치를 보존합니다.',
  },
  {
    title: '차량 번호판 및 브랜드 상표·로고',
    desc: '이동 차량의 번호판 숫자는 물론, 영상·이미지 속에 노출된 브랜드 상표와 상호 로고까지 자동으로 스캔하여 완벽하게 차단합니다.',
  },
];

// 아파트 단지 사진 탐지 대상: 가림(blur·mask) 영역 + 탐지 박스(가림 영역보다 3px 바깥)
// 시안 좌표 [x, y, w, h] (560 프레임 기준)
type Rect = [x: number, y: number, w: number, h: number];

const DETECTION_TARGETS: { id: string; type: 'blur' | 'mask'; label: string; area: Rect; box: Rect }[] = [
  { id: 'face-woman', type: 'blur', label: 'FACE', area: [101, 240, 28, 29], box: [98, 237, 34, 35] },
  { id: 'face-man', type: 'blur', label: 'FACE', area: [172, 228, 26, 31], box: [169, 225, 32, 37] },
  { id: 'plate', type: 'mask', label: 'PLATE', area: [432, 348, 60, 16], box: [429, 345, 66, 22] },
] as const;

function NumberedList({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <ol className={styles.list}>
      {items.map((item, idx) => (
        <li key={item.title} className={styles.listItem}>
          <span className={styles.listNum}>{String(idx + 1).padStart(2, '0')}</span>
          <div className={styles.listText}>
            <h3 className={styles.listTitle}>{item.title}</h3>
            <p className={styles.listDesc}>{item.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function PubFeaturesImageDeid() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>
        {/* 1. Hero (Figma PC 2262:2976 / Mobile 2286:63931 · 가운데 정렬 Compact) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          className={styles.featureHero}
          eyebrow="Features"
          title={
            <>
              얼굴부터 번호판까지,
              <br />
              정밀한 이미지 비식별
            </>
          }
          description="얼굴·신체·차량 번호판마다 목적에 맞는 비식별 방식을 자유롭게 조합해 적용할 수 있습니다."
        />

        {/* 2. 복원불가 */}
        <BasicSection bg="white" layout="vertical" align="left">
          <div className={styles.split}>
            <div className={styles.copy}>
              <div className={styles.intro}>
                <span className={styles.eyebrow}>IRREVERSIBLE</span>
                <h2 className={styles.heading}>
                  복원불가! 재식별 여지를
                  <br />
                  남기지 않습니다.
                </h2>
                <p className={styles.lead}>
                  약한 블러·가역적 처리는 재식별 여지가 남습니다.<br className="mobileBr" /> 가명·익명처리 요건을 충족했다고
                  입증하기 어렵습니다.
                </p>
              </div>
              <NumberedList items={IRREVERSIBLE_ITEMS} />
            </div>

            <div className={styles.visual}>
              <img src={`${IMG}/meeting.jpg`} alt="회의실 인물 얼굴을 비가역 블러로 처리한 예시" className={styles.meetingImg} />
              {MEETING_FACES.map(([x, y]) => (
                <span key={`${x}-${y}`} className={styles.faceBlur} style={place(x, y, 45.923, 57.403)} aria-hidden="true" />
              ))}
            </div>
          </div>
        </BasicSection>

        {/* 3. 정밀 타겟팅 탐지 */}
        <BasicSection bg="gray" layout="vertical" align="left">
          <div className={`${styles.split} ${styles.reverse}`}>
            <div className={styles.copy}>
              <div className={styles.intro}>
                <span className={styles.eyebrow}>DETECTION</span>
                <h2 className={styles.heading}>
                  AI가 사소한 식별 요소까지
                  <br />
                  알아서 찾아줍니다.
                </h2>
                <p className={styles.lead}>
                  이목구비와 차량 번호판을 정밀 식별하여 영역 침범 없는 깔끔한 마스킹을 제공합니다.
                </p>
              </div>
              <NumberedList items={DETECTION_ITEMS} />
            </div>

            <div className={styles.visual}>
              <img src={`${IMG}/apartment.jpg`} alt="아파트 단지 사진에서 얼굴과 차량 번호판을 탐지해 가린 예시" className={styles.apartmentImg} />
              {DETECTION_TARGETS.map((target) => (
                <span key={target.id} aria-hidden="true">
                  <span
                    className={target.type === 'blur' ? styles.targetBlur : styles.targetMask}
                    style={place(...target.area)}
                  />
                  <span className={styles.detectionBox} style={place(...target.box)}>
                    <span className={styles.corner} />
                    <span className={styles.corner} />
                    <span className={styles.corner} />
                    <span className={styles.corner} />
                    <span className={`${styles.detectionLabel} ${target.type === 'blur' ? styles.labelPcOnly : ''}`.trim()}>
                      {target.label}
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </BasicSection>

        {/* 4. CTA */}
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
