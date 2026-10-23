import type { CSSProperties } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from './sections/ProductCta';
import styles from './why.module.scss';

const IMG = '/images/product/why';

// 시안 좌표(px)를 이미지 영역 대비 %로 환산한 박스 위치 [left, top, width, height]
type Box = [number, number, number, number];

const boxStyle = ([left, top, width, height]: Box): CSSProperties => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
});

// 탐지 박스: 1px 테두리 + 네 모서리 강조(시안 Detection Box · Selected=파랑 / Detected=흰색)
function DetectionBox({ box, tone = 'detect', label }: { box: Box; tone?: 'detect' | 'white'; label?: string }) {
  return (
    <span className={`${styles.detectBox} ${tone === 'white' ? styles.toneWhite : ''}`} style={boxStyle(box)}>
      {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
        <img
          key={corner}
          src={`${IMG}/corner_${tone === 'white' ? 'white' : 'detect'}_${corner}.svg`}
          alt=""
          className={`${styles.corner} ${styles[corner]}`}
        />
      ))}
      {label && <span className={styles.detectLabel}>{label}</span>}
    </span>
  );
}

// 정밀 AI 탐지 PC (Figma 2159:13899 · 760×520 기준)
const detectFacesPc: Box[] = [
  [21.18, 31.54, 4.21, 7.31],
  [32.63, 30.38, 4.21, 6.92],
  [45.66, 34.81, 4.08, 6.92],
  [58.42, 33.46, 3.03, 5.19],
  [66.05, 36.15, 2.63, 4.42],
  [73.42, 33.08, 3.68, 5.77],
];
const detectPlatePc: Box = [81.05, 55.58, 5.53, 2.88];
const detectPlateMaskPc: Box = [81.45, 56.15, 4.74, 1.73];

// 정밀 AI 탐지 Mobile (Figma 2159:14119 · 350×239 기준)
const detectPersonsMo: Box[] = [
  [27.05, 33.27, 12.21, 52.69],
  [54.63, 30.96, 11.56, 49.81],
];
const detectFacesMo: Box[] = [
  [30.47, 34.04, 5.12, 8.27],
  [58.31, 30.96, 4.33, 8.08],
];
const detectPlateMo: Box = [66.32, 55.58, 4.99, 2.51];
const detectPlateMaskMo: Box = [66.32, 55.58, 4.99, 2.31];

const privacyOptions = [
  { group: 'Face', options: ['Mosaic', 'Masking', 'Blur', 'Virtual Face'], selected: 'Mosaic' },
  { group: 'Body', options: ['Mosaic', 'Masking', 'Blur'], selected: '' },
  { group: 'Plate', options: ['Mosaic', 'Masking', 'Blur'], selected: 'Masking' },
];

// 작은·원거리 얼굴 PC (Figma 2159:13953 · 1240×560 기준)
const distantFacesPc: Box[] = [
  [39.6, 63.21, 1.37, 3.39],
  [41.94, 62.5, 1.21, 2.68],
  [43.87, 62.86, 1.37, 3.04],
  [56.37, 61.96, 1.53, 3.04],
  [58.15, 60, 1.37, 3.39],
  [61.61, 62.68, 1.21, 2.68],
  [70.24, 60.89, 1.05, 2.32],
  [90.48, 60.54, 1.94, 4.29],
];
// 확대 인셋 안 FACE 박스 (PC 480×168 / Mobile 350×123 기준)
const zoomFacesPc: Box[] = [
  [7.92, 46.43, 17.5, 45.24],
  [26.25, 20.24, 15.83, 47.62],
  [62.08, 55.95, 14.17, 40.48],
];
const zoomFacesMo: Box[] = [
  [7.71, 45.53, 17.43, 44.72],
  [26, 19.51, 15.71, 47.15],
  [62, 55.28, 14.29, 40.65],
];

const benchmarkData = [
  { method: 'Mosaic', fillWidth: '26.6%', time: '약 8초', speed: '약 120 fps' },
  { method: 'Masking', fillWidth: '26.6%', time: '약 8초', speed: '약 110 fps' },
  { method: 'Blur', fillWidth: '56.7%', time: '약 17초', speed: '약 52 fps' },
  { method: 'Virtual Face', fillWidth: '83.3%', time: '약 25초', speed: '약 36 fps' },
];

export default function PubSubProductWhy() {
  return (
    <FrontLayout>
      <div className={styles.pageWrap}>

        {/* 1. Hero / 가치 3가지 (Figma PC 2159:13859 / Mobile 2159:14095) */}
        <HeroSection
          heroVariant="compact"
          eyebrow="WHY XPRIVACY"
          title={
            <>
              개인정보는 보호하고<br />
              활용할 데이터의 가치는 그대로
            </>
          }
          description={
            <>
              단순히 화면을 가리는 도구가 아니라, 보호가 필요한 대상을 정밀하게 찾고<br className={styles.pcBr} />
              업무 목적에 맞는 방식으로 비식별하여 실제 데이터 활용까지 이어지도록 설계됩니다.
            </>
          }
        >
          {/* Values / 밝은 공통 패널 (Figma 2159:13868 / 2159:14102) */}
          <div className={styles.heroValues}>
          <div className={styles.valuePanel}>
            <div className={styles.valueItem}>
              <h3 className={styles.valueTitle}>정밀한 객체 분석</h3>
              <p className={styles.valueDesc}>
                얼굴·신체·번호판 등 보호가 필요한 대상을<br />
                AI가 자동으로 탐지합니다.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueTitle}>운영 효율 극대화</h3>
              <p className={styles.valueDesc}>
                반복적인 비식별 업무를 자동화하고<br className={styles.pcBr} />{' '}
                사용자가 필요한 부분만 확인·조정하도록 지원합니다.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3 className={styles.valueTitle}>비가역적 보안 변환</h3>
              <p className={styles.valueDesc}>
                처리 결과를 원본 개인정보 영역으로<br />
                되돌릴 수 없는 방식으로 보호합니다.
              </p>
            </div>
          </div>
          </div>
        </HeroSection>

        {/* 2. 정밀 AI 탐지 · 트랙 단위 추적 (Figma PC 2159:13878 / Mobile 2159:14112) */}
        <BasicSection
          bg="white"
          layout="horizontal"
          eyebrow="DETECTION & EXTRACTION"
          title="정밀 AI 탐지 · 트랙 단위 추적"
          description={
            <>
              얼굴 임베딩 Re-ID로 동일 인물을 하나의 트랙으로 묶어 일관되게<br className={styles.pcBr} />{' '}
              비식별하고, 가림·자세 변화 시에도 순간 노출을 줄입니다.
            </>
          }
          contentClassName={styles.detectionContainer}
          headerExtra={
            <div className={styles.featureBlockList}>
              <div className={styles.fBlock}>
                <h4 className={styles.fTitle}>얼굴 탐지</h4>
                <p className={styles.fDesc}>얼굴 영역을 자동으로 탐지합니다.</p>
              </div>
              <div className={styles.fBlock}>
                <h4 className={styles.fTitle}>신체·실루엣</h4>
                <p className={styles.fDesc}>신체와 전신 실루엣 영역을 구분해 필요한 부분을 처리합니다.</p>
              </div>
              <div className={styles.fBlock}>
                <h4 className={styles.fTitle}>번호판 탐지</h4>
                <p className={styles.fDesc}>차량 번호판 영역을 탐지해 선택한 비식별 방식을 적용합니다.</p>
              </div>
            </div>
          }
        >
          {/* PC: 처리 예시 이미지 + 캡션 (Figma 2830:12488) */}
          <figure className={styles.detectVisualPc}>
            <div className={styles.detectPhoto}>
              <img src={`${IMG}/detection_scene.jpg`} alt="횡단보도 보행자 얼굴 블러와 번호판 마스킹 처리 예시" className={styles.detectImgPc} />
              {detectFacesPc.map((box) => (
                <span key={box.join()} className={styles.faceBlur} style={boxStyle(box)} />
              ))}
              <span className={styles.plateMask} style={boxStyle(detectPlateMaskPc)} />
              {detectFacesPc.map((box) => <DetectionBox key={`b${box.join()}`} box={box} />)}
              <DetectionBox box={detectPlatePc} />
            </div>
            <figcaption className={styles.detectCaption}>비식별 처리 예시 · 얼굴 블러 · 번호판 마스킹</figcaption>
          </figure>

          {/* Mobile: 탐지 결과 + Privacy Options 패널 (Figma 2159:14118) */}
          <div className={styles.detectVisualMo}>
            <div className={styles.detectPhoto}>
              <img src={`${IMG}/detection_scene.jpg`} alt="횡단보도 보행자 얼굴 모자이크와 번호판 마스킹 처리 예시" className={styles.detectImgMo} />
              {detectFacesMo.map((box) => (
                <span key={box.join()} className={styles.faceMosaic} style={boxStyle(box)} />
              ))}
              <span className={styles.plateMask} style={boxStyle(detectPlateMaskMo)} />
              {detectPersonsMo.map((box) => <DetectionBox key={box.join()} box={box} tone="white" />)}
              {detectFacesMo.map((box) => <DetectionBox key={`b${box.join()}`} box={box} />)}
              <DetectionBox box={detectPlateMo} tone="white" label="PLATE" />
            </div>
            <div className={styles.privacyPanel}>
              <p className={styles.privacyTitle}>Privacy Options</p>
              <div className={styles.privacyGroups}>
                {privacyOptions.map(({ group, options, selected }) => (
                  <div key={group} className={styles.privacyGroup}>
                    <span className={styles.privacyGroupName}>{group}</span>
                    {options.map((option) => (
                      <span
                        key={option}
                        className={`${styles.privacyOption} ${option === selected ? styles.optionSelected : ''}`}
                      >
                        <span>{option}</span>
                        <span aria-hidden="true">{option === selected ? '●' : '○'}</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 3. 작은 · 원거리 얼굴 (Figma PC 2159:13946 / Mobile 2159:14180) */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="SMALL & DISTANT FACES"
          title="작은 · 원거리 얼굴 재현율 강화"
          description={
            <>
              원본 해상도 검출과 입력 해상도 상향으로 관제 영상 특유의 소형·원거리 얼굴을 재검출합니다.<br className={styles.pcBr} />{' '}
              다운스케일 없이 원본 해상도로 렌더링하므로 반출본의 화질 저하를 최소화합니다.
            </>
          }
        >
          {/* PC: 원본 장면 위에 확대 인셋 (Figma 2159:13953) */}
          <div className={styles.distantVisualPc}>
            <img src={`${IMG}/distant_scene.jpg`} alt="번화가 원거리 보행자 얼굴 탐지 장면" className={styles.distantImg} />
            {distantFacesPc.map((box) => <DetectionBox key={box.join()} box={box} />)}
            <img src={`${IMG}/zoom_pc_l_under.svg`} alt="" className={styles.zoomLine} style={boxStyle([55.48, 34.29, 3.87, 23.93])} />
            <img src={`${IMG}/zoom_pc_l.svg`} alt="" className={styles.zoomLine} style={boxStyle([55.48, 34.29, 3.87, 23.93])} />
            <img src={`${IMG}/zoom_pc_r_under.svg`} alt="" className={styles.zoomLine} style={boxStyle([65.16, 34.29, 32.9, 23.93])} />
            <img src={`${IMG}/zoom_pc_r.svg`} alt="" className={styles.zoomLine} style={boxStyle([65.16, 34.29, 32.9, 23.93])} />
            <span className={styles.zoomArea} style={boxStyle([55.48, 58.21, 9.68, 7.5])} />
            <div className={styles.zoomInset} style={boxStyle([59.35, 4.29, 38.71, 30])}>
              <img src={`${IMG}/distant_zoom.jpg`} alt="원거리 얼굴 4배 확대 영역" className={styles.zoomImg} />
              {zoomFacesPc.map((box) => <DetectionBox key={box.join()} box={box} label="FACE" />)}
              <span className={styles.zoomLabel}>확대 영역 × 4</span>
            </div>
          </div>

          {/* Mobile: 원본 장면 + 하단 확대 인셋 (Figma 2159:14187) */}
          <div className={styles.distantVisualMo}>
            <div className={styles.distantPhotoMo}>
              <img src={`${IMG}/distant_scene_mo.jpg`} alt="번화가 원거리 보행자 장면" className={styles.distantImg} />
              <span className={styles.zoomArea} style={boxStyle([34, 58.21, 17.14, 7.5])} />
              <span className={styles.sceneChip}>원본 영상 (원거리)</span>
            </div>
            <div className={styles.zoomInsetMo}>
              <img src={`${IMG}/distant_zoom.jpg`} alt="원거리 얼굴 4배 확대 영역" className={styles.zoomImg} />
              {zoomFacesMo.map((box) => <DetectionBox key={box.join()} box={box} label="FACE" />)}
              <span className={styles.zoomLabel}>확대 영역 × 4</span>
            </div>
            <img src={`${IMG}/zoom_mo_l_under.svg`} alt="" className={styles.zoomLine} style={boxStyle([0, 44.34, 34, 26.02])} />
            <img src={`${IMG}/zoom_mo_l.svg`} alt="" className={styles.zoomLine} style={boxStyle([0, 44.34, 34, 26.02])} />
            <img src={`${IMG}/zoom_mo_r_under.svg`} alt="" className={styles.zoomLine} style={boxStyle([51.14, 44.34, 48.86, 26.02])} />
            <img src={`${IMG}/zoom_mo_r.svg`} alt="" className={styles.zoomLine} style={boxStyle([51.14, 44.34, 48.86, 26.02])} />
          </div>
        </BasicSection>

        {/* 4. 가상 얼굴 (Figma PC 2159:14029 / Mobile 2159:14256) */}
        <BasicSection
          bg="white"
          layout="horizontal"
          eyebrow="VIRTUAL FACE"
          title={
            <>
              원본 얼굴을<br />
              가상의 얼굴로 바꿉니다
            </>
          }
          description={
            <>
              영상 속 인물의 얼굴을 가상의 얼굴로 치환해 원본 신원 노출을 줄이고,<br className={styles.pcBr} />{' '}
              장면의 자연스러운 인상을 유지하도록 돕습니다.
            </>
          }
          headerExtra={
            <div className={`${styles.featureBlockList} ${styles.points}`}>
              <div className={styles.fBlock}>
                <h4 className={styles.fTitle}>가상 얼굴 치환</h4>
                <p className={styles.fDesc}>원본 얼굴 대신 가상 얼굴을 영상에 적용합니다.</p>
              </div>
              <div className={styles.fBlock}>
                <h4 className={styles.fTitle}>자연스러운 화면 유지</h4>
                <p className={styles.fDesc}>얼굴이 바뀐 뒤에도 장면의 흐름과 시각적 일관성을 고려합니다.</p>
              </div>
            </div>
          }
        >
          <div className={styles.virtualCompare}>
            <div className={styles.virtualCard}>
              <img src={`${IMG}/virtual_face_original.jpg`} alt="원본 인물 사진" className={styles.virtualImg} />
              <span className={`${styles.virtualLabel} ${styles.labelOriginal}`}>ORIGINAL</span>
            </div>
            <span className={styles.virtualArrow} aria-hidden="true">→</span>
            <div className={styles.virtualCard}>
              <img src={`${IMG}/virtual_face_replaced.jpg`} alt="가상 얼굴로 치환된 인물 사진" className={styles.virtualImg} />
              <span className={`${styles.virtualLabel} ${styles.labelVirtual}`}>VIRTUAL FACE</span>
            </div>
          </div>
        </BasicSection>

        {/* 5. 처리 속도 (Figma PC 2159:14053 / Mobile 2159:14280) */}
        <BasicSection
          bg="gray"
          layout="vertical"
          align="left"
          eyebrow="HIGH-SPEED PROCESSING"
          title="비식별 방식별 지원 대상과 처리 시간을 확인하세요."
          description={
            <>
              모자이크·마스킹·블러·가상 얼굴의 처리 시간과 속도를 비교해보세요.<br className={styles.pcBr} />{' '}
              측정 조건과 적용 환경에 따라 실제 처리 성능은 달라질 수 있습니다.
            </>
          }
        >
          <div className={styles.speedWrap}>
            <div className={styles.speedList}>
              <div className={styles.speedHeader}>
                <span>처리 방식</span>
                <span>30초 영상 처리 시간</span>
                <span className={styles.alignRight}>처리 시간</span>
                <span className={styles.alignRight}>처리 속도</span>
              </div>
              {benchmarkData.map((row) => (
                <div key={row.method} className={styles.speedRow}>
                  <strong className={styles.speedMethod}>{row.method}</strong>
                  <div className={styles.speedTrack}>
                    <span className={styles.speedFill} style={{ width: row.fillWidth }} />
                  </div>
                  <span className={styles.speedTime}>{row.time}</span>
                  <span className={styles.speedFps}>
                    <span className={styles.moOnly}>처리 속도 </span>{row.speed}
                  </span>
                  <span className={styles.speedMeta}>30초 영상 처리 시간</span>
                </div>
              ))}
            </div>
            <p className={styles.speedFootnote}>
              ※ 자사 테스트 기준: FHD, 30초, 얼굴 4인. Virtual Face는 1인 기준. 실제 처리 성능은 환경에 따라 달라질 수 있습니다.
            </p>
          </div>
        </BasicSection>

        {/* 6. CTA (Node 2159:14573) */}
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
        />
      </div>
    </FrontLayout>
  );
}
