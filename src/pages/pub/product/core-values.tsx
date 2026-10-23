import { useEffect, useRef, useState, type CSSProperties } from 'react';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection } from '../../../components/domain/Section';
import { ProductCta } from './sections/ProductCta';
import { Badge } from '../../../components/core/Badge/Badge';
import styles from './core-values.module.scss';

const IMG = '/images/product/core-values';

// Hero 카메라 월 (PC: 대형 1 + 우측 2단 / Mobile: 가로 롤링 캐러셀)
const cameras = [
  { tag: 'CAM 01', img: `${IMG}/hero_cam_01.jpg`, alt: '도심 교차로 CCTV 화면' },
  { tag: 'CAM 02', img: `${IMG}/hero_cam_02.jpg`, alt: '횡단보도 보행자 CCTV 화면' },
  { tag: 'CAM 03', img: `${IMG}/hero_cam_03.jpg`, alt: '주차장 CCTV 화면' },
];

// Value 01 프레임 스트립: 프레임마다 화면이 조금씩 이동하므로 가림 영역도 같은 만큼(dx, dy) 이동
const frames = [
  { no: 'FRAME 0120', img: `${IMG}/frame_0120.png`, dx: '0%', dy: '0%' },
  { no: 'FRAME 0121', img: `${IMG}/frame_0121.png`, dx: '-3.08%', dy: '-2.74%' },
  { no: 'FRAME 0122', img: `${IMG}/frame_0122.png`, dx: '-6.16%', dy: '-5.48%' },
  { no: 'FRAME 0123', img: `${IMG}/frame_0123.png`, dx: '-9.76%', dy: '-8.9%', missed: true },
  { no: 'FRAME 0124', img: `${IMG}/frame_0124.png`, dx: '-12.33%', dy: '-10.96%' },
  { no: 'FRAME 0125', img: `${IMG}/frame_0125.png`, dx: '-15.41%', dy: '-13.7%' },
];

// Value 03 처리 이력 (모바일 시안은 6건만 노출)
const auditLogs = [
  { user: '관제1팀 김OO', date: '2026-09-14 09:12', target: '정문 CCTV 영상', method: 'Mosaic', mobile: true },
  { user: '관제1팀 박OO', date: '2026-09-14 11:40', target: '주차장 CCTV 영상', method: 'Blur', mobile: true },
  { user: '관제2팀 이OO', date: '2026-09-15 10:05', target: '민원 대응 영상', method: 'Mosaic', mobile: true },
  { user: '관제2팀 최OO', date: '2026-09-15 16:22', target: '수사협조 요청 영상', method: 'Mask', mobile: true },
  { user: '관제1팀 정OO', date: '2026-09-16 09:48', target: '정보공개청구 영상', method: 'Mosaic', mobile: true },
  { user: '관제3팀 한OO', date: '2026-09-16 14:31', target: '로비 CCTV 영상', method: 'Blur', mobile: false },
  { user: '관제2팀 오OO', date: '2026-09-17 08:59', target: '교차로 CCTV 영상', method: 'Mosaic', mobile: false },
  { user: '관제3팀 서OO', date: '2026-09-17 11:15', target: '지하주차장 CCTV 영상', method: 'Blur', mobile: false },
  { user: '관제1팀 윤OO', date: '2026-09-17 16:31', target: '후문 CCTV 영상', method: 'Mask', mobile: true },
];

export default function PubSubProductCoreValues() {
  // 모바일 카메라 캐러셀: 스크롤 위치와 인디케이터 동기화 + 자동 롤링 (터치 중 일시정지)
  const camTrackRef = useRef<HTMLDivElement>(null);
  const [activeCam, setActiveCam] = useState(0);
  const [isCamPaused, setIsCamPaused] = useState(false);

  const handleCamScroll = () => {
    const track = camTrackRef.current;
    if (!track || track.clientWidth === 0) return;
    const [first, second] = Array.from(track.children) as HTMLElement[];
    const step = second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
    setActiveCam(Math.round(track.scrollLeft / step));
  };

  useEffect(() => {
    if (isCamPaused) return;
    const mq = window.matchMedia('(max-width: 768px)');
    if (!mq.matches) return;
    const timer = setInterval(() => {
      const track = camTrackRef.current;
      if (!track) return;
      const next = (activeCam + 1) % cameras.length;
      const slide = track.children[next] as HTMLElement | undefined;
      if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }, 3500);
    return () => clearInterval(timer);
  }, [activeCam, isCamPaused]);

  const valueItems = (items: { title: string; desc: string }[]) => (
    <div className={styles.valueItems}>
      {items.map((item) => (
        <div key={item.title} className={styles.valueItem}>
          <h3 className={styles.valueItemTitle}>{item.title}</h3>
          <p className={styles.valueItemDesc}>{item.desc}</p>
        </div>
      ))}
    </div>
  );

  return (
    <FrontLayout>
      <div className={styles.pageWrap}>

        {/* 1. Hero / 관제 모니터 (Figma PC 2159:13363 / Mobile 2159:13643) */}
        <HeroSection
          heroVariant="full"
          align="left"
          eyebrow="CORE VALUES"
          title={
            <>
              관제센터의 영상 반출<br />
              지금 방식으로 감당할 수 있을까요?
            </>
          }
          description="정보공개청구·수사협조·민원 대응으로 반출 수요는 늘지만, 처리 방식은 여전히 사람 손에 의존합니다."
        >
          <div className={styles.heroVisual}>
            <div
              ref={camTrackRef}
              className={styles.camWall}
              onScroll={handleCamScroll}
              onPointerDown={() => setIsCamPaused(true)}
              onPointerUp={() => setIsCamPaused(false)}
              onPointerCancel={() => setIsCamPaused(false)}
            >
              {cameras.map((cam) => (
                <div key={cam.tag} className={styles.camFeed}>
                  <img src={cam.img} alt={cam.alt} className={styles.camImg} />
                  <span className={styles.camShade} aria-hidden="true" />
                  <span className={`${styles.camChip} ${styles.camTag}`}>{cam.tag}</span>
                  <span className={`${styles.camChip} ${styles.camRec}`}>
                    <img src={`${IMG}/hero_rec_dot.svg`} alt="" className={styles.recDot} />
                    REC
                  </span>
                  <span className={`${styles.camChip} ${styles.camTime}`}>2026-09-18 14:32:07</span>
                </div>
              ))}
            </div>
            <div className={styles.camIndicator} aria-hidden="true">
              {cameras.map((cam, idx) => (
                <span key={cam.tag} className={idx === activeCam ? styles.dotActive : styles.dot} />
              ))}
            </div>
          </div>
        </HeroSection>

        {/* 2. Value 01 · 수작업 처리의 한계 (Figma PC 2159:13402 / Mobile 2159:13679) */}
        <BasicSection
          bg="white"
          layout="vertical"
          align="left"
          eyebrow="MANUAL MASKING"
          title="증가하는 데이터양, 수작업 처리의 한계점입니다."
          description="편집자가 프레임마다 직접 가림 처리하면 많은 시간이 걸리고 한 프레임만 놓쳐도 그대로 개인정보가 유출됩니다."
        >
          <div className={styles.frameStrip}>
            {frames.map((frame) => (
              <div
                key={frame.no}
                className={`${styles.frameCell} ${frame.missed ? styles.frameMissed : ''}`}
                style={{ '--dx': frame.dx, '--dy': frame.dy } as CSSProperties}
              >
                <div className={styles.frameThumb}>
                  <img src={frame.img} alt="" className={styles.frameImg} />
                  <div className={styles.frameMasks} aria-hidden="true">
                    <span className={`${styles.mask} ${styles.m1}`} />
                    <span className={`${styles.mask} ${styles.m2}`} />
                    {frame.missed
                      ? <span className={styles.missedBox} />
                      : <span className={`${styles.mask} ${styles.m3}`} />}
                    <span className={`${styles.mask} ${styles.m4}`} />
                    <span className={`${styles.mask} ${styles.m5}`} />
                    <span className={`${styles.mask} ${styles.m6}`} />
                  </div>
                </div>
                <div className={styles.frameLabel}>
                  <span className={styles.frameNo}>{frame.no}</span>
                  {frame.missed && <span className={styles.missedBadge}>MISSED</span>}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.feature3Col}>
            <div className={styles.col}>
              <h3>프레임별 반복 작업</h3>
              <p>대상을 프레임마다 확인·수정해 처리 시간이 길어집니다.</p>
            </div>
            <div className={styles.col}>
              <h3>늘어나는 반출 업무</h3>
              <p>영상 분량과 반출 요청이 늘수록 담당자의 작업 부담이 커집니다.</p>
            </div>
            <div className={styles.col}>
              <h3>누락 검수 부담</h3>
              <p>누락된 프레임을 찾기 위해 결과를 반복해서 확인해야 합니다.</p>
            </div>
          </div>
        </BasicSection>

        {/* 3. Value 02 · 복원 불가 (Figma PC 2159:13483 / Mobile 2159:13767) */}
        <BasicSection
          bg="gray"
          layout="horizontal"
          eyebrow="IRREVERSIBLE PROCESSING"
          title={
            <>
              복원 불가, 재식별 여지를<br />
              남기지 않습니다.
            </>
          }
          description={
            <>
              약한 블러·가역적 처리는 재식별 여지가 남습니다.<br />
              가명·익명처리 요건을 충족했는지 입증하기 어려울 수 있습니다.
            </>
          }
          headerExtra={valueItems([
            { title: '약한 가림의 위험', desc: '흐림 강도가 낮으면 얼굴·번호판의 식별 단서가 남을 수 있습니다.' },
            { title: '되돌릴 수 있는 처리의 한계', desc: '원본을 복원할 수 있는 방식은 재식별 우려를 남깁니다.' },
            { title: '처리 결과 점검', desc: '가림 이후에도 식별 가능한 요소가 남아 있는지 확인해야 합니다.' },
          ])}
        >
          <div className={styles.compareCards}>
            <div className={`${styles.compareCard} ${styles.weak}`}>
              <div className={styles.comparePhoto}>
                <img src={`${IMG}/value02_compare_photo.jpg`} alt="약한 블러 처리된 인물 사진" />
              </div>
              <span className={`${styles.face} ${styles.faceLeft}`} aria-hidden="true" />
              <span className={`${styles.face} ${styles.faceRight}`} aria-hidden="true" />
              <div className={styles.compareChip}>
                <span className={styles.chipIcon}>!</span>
                <span className={styles.chipLabel}>
                  <span>약한 블러</span>
                  <span className={styles.chipSep}> · </span>
                  <span>식별 단서 남음</span>
                </span>
              </div>
            </div>

            <div className={`${styles.compareCard} ${styles.solid}`}>
              <div className={styles.comparePhoto}>
                <img src={`${IMG}/value02_compare_photo.jpg`} alt="xPrivacy로 복원 불가 처리된 인물 사진" />
              </div>
              <span className={`${styles.face} ${styles.faceLeft}`} aria-hidden="true" />
              <span className={`${styles.face} ${styles.faceRight}`} aria-hidden="true" />
              <div className={styles.compareChip}>
                <span className={styles.chipIcon}>✓</span>
                <span className={styles.chipLabel}>
                  <span>xPrivacy 처리</span>
                  <span className={styles.chipSep}> · </span>
                  <span>복원 불가</span>
                </span>
              </div>
            </div>
          </div>
        </BasicSection>

        {/* 4. Value 03 · 책임 추적성 (Figma PC 2159:13518 / Mobile 2159:13800) */}
        <BasicSection
          bg="white"
          layout="horizontal"
          eyebrow="AUDIT TRAIL"
          title={
            <>
              사후 점검·감사에서 책임<br />
              추적성을 뒷받침합니다.
            </>
          }
          description={
            <>
              누가·언제·무엇을·어떤 방식으로 처리해 반출했는지 기록이 없으면,<br />
              사후 점검·감사에서 책임 추적성을 증명할 수 없습니다.
            </>
          }
          headerExtra={valueItems([
            { title: '처리자와 일시', desc: '누가 언제 영상을 처리했는지 작업 이력으로 확인합니다.' },
            { title: '처리 대상과 방식', desc: '어떤 영상에 어떤 가림 방식을 적용했는지 기록합니다.' },
            { title: '사후 점검의 근거', desc: '남겨진 이력을 바탕으로 처리 과정을 다시 확인합니다.' },
          ])}
        >
          <div className={styles.auditRecord}>
            <div className={styles.auditTitle}>처리 이력</div>
            <div className={styles.auditCard}>
              {/* PC·태블릿: 4열 테이블 */}
              <div className={styles.auditTable} role="table" aria-label="처리 이력">
                <div className={`${styles.auditRow} ${styles.auditHead}`} role="row">
                  <span role="columnheader">처리자</span>
                  <span role="columnheader">일시</span>
                  <span role="columnheader">대상</span>
                  <span role="columnheader">방식</span>
                </div>
                {auditLogs.map((log) => (
                  <div key={log.date} className={styles.auditRow} role="row">
                    <span role="cell">{log.user}</span>
                    <span role="cell">{log.date}</span>
                    <span role="cell">{log.target}</span>
                    <span role="cell"><Badge color="info" variant="subtle">{log.method}</Badge></span>
                  </div>
                ))}
              </div>

              {/* 모바일: 카드 안 타이틀 + 2줄 레코드 리스트 */}
              <div className={styles.auditCardTitle}>처리 이력</div>
              <ul className={styles.auditList}>
                {auditLogs.filter((log) => log.mobile).map((log) => (
                  <li key={log.date} className={styles.auditItem}>
                    <div className={styles.auditItemTop}>
                      <span className={styles.auditTarget}>{log.target}</span>
                      <Badge color="info" variant="subtle" className={styles.methodBadgeMo}>{log.method}</Badge>
                    </div>
                    <span className={styles.auditMeta}>{log.user} · {log.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BasicSection>

        {/* 5. Cta Section (Section - CTA · v2 - Node 2159:13639) */}
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
