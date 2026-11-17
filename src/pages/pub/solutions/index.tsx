import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { HeroSection, BasicSection, CtaSection } from '../../../components/domain/Section';
import { Icon, type IconName } from '../../../components/core/Icon/Icon';
import styles from './index.module.scss';

const IMG = '/images/solutions/cases';

/** 탭 바가 화면 위쪽(GNB 높이 73 + 여유)에 붙었다고 보는 기준 y (px) */
const STUCK_TOP = 80;

/** 마우스 드래그를 놓은 뒤 관성 감속률 (ms당 곱함 · 터치 스크롤과 비슷한 미끄러짐) */
const INERTIA_DECAY = 0.996;

interface UseCase {
  title: string;
  /** 설명 (모바일 시안의 줄바꿈은 ≤480px 폰 폭에서만 강제) */
  description: React.ReactNode;
}

interface Industry {
  /** 푸터·헤더 메뉴 앵커 (/pub/solutions#id) 겸 이미지 파일명 */
  id: string;
  /** 탭 라벨 */
  label: string;
  icon: IconName;
  description: React.ReactNode;
  cases: UseCase[];
}

// 산업군 8종 × 활용 목적 3종 (Figma PC SL-PC_v2.4_Solutions 4365:3 / MO SL-MO_v2.4_Solutions 4391:920)
// 홀수 번째는 흰색 · 짝수 번째는 회색 섹션 배경이 교차합니다. 카드 이미지는 `cases/{id}_{1..3}.jpg`.
const INDUSTRIES: Industry[] = [
  {
    id: 'cctv',
    label: 'CCTV',
    icon: 'industry-cctv',
    description: (
      <>
        열람과 반출, 사건 대응 등 CCTV 영상 제공 과정에서
        <br className="heroMoBr" /> 제3자 정보를 보호합니다.
      </>
    ),
    cases: [
      {
        title: '영상 열람·반출',
        description: (
          <>
            요청 대상 외<br className="heroMoBr" /> 인물·차량번호 비식별
          </>
        ),
      },
      {
        title: '사고·민원 대응',
        description: (
          <>
            사건 관련 영상 공유 시<br className="heroMoBr" /> 제3자 보호
          </>
        ),
      },
      {
        title: '영상자료 제공',
        description: (
          <>
            기관·협력사에 전달하기 전<br className="heroMoBr" /> 비식별
          </>
        ),
      },
    ],
  },
  {
    id: 'public-institutions',
    label: '공공기관',
    icon: 'industry-public',
    description: '행정 업무에 필요한 영상과 이미지를 안전하게 공유하고 제공할 수 있도록 돕습니다.',
    cases: [
      {
        title: '민원·정보공개 대응',
        description: (
          <>
            공개 대상 영상의<br className="heroMoBr" /> 제3자 개인정보 보호
          </>
        ),
      },
      {
        title: '행정 자료 공유',
        description: (
          <>
            회의·행사·현장 기록의<br className="heroMoBr" /> 안전한 활용
          </>
        ),
      },
      {
        title: '공공 데이터 개방',
        description: (
          <>
            외부 제공용 이미지·영상<br className="heroMoBr" /> 데이터 비식별
          </>
        ),
      },
    ],
  },
  {
    id: 'broadcasting',
    label: '방송 / 미디어',
    icon: 'industry-broadcast',
    description: '촬영부터 재편집까지, 영상 속 개인의 신원을 보호하면서 콘텐츠를 활용합니다.',
    cases: [
      {
        title: '방송 출연자 보호',
        description: (
          <>
            뉴스·예능·다큐 속<br className="heroMoBr" /> 일반인 얼굴 비식별
          </>
        ),
      },
      {
        title: '취재 영상 활용',
        description: (
          <>
            인터뷰·현장 취재 영상의<br className="heroMoBr" /> 제3자 보호
          </>
        ),
      },
      {
        title: '콘텐츠 재활용',
        description: (
          <>
            기존 방송 영상<br className="heroMoBr" /> 재편집·배포 전 비식별
          </>
        ),
      },
    ],
  },
  {
    id: 'ai-data',
    label: 'AI Data',
    icon: 'industry-ai-data',
    description: '이미지·영상 데이터의 식별 위험을 줄이면서 학습과 연구에 필요한 정보를 활용합니다.',
    cases: [
      {
        title: 'AI 학습 데이터 구축',
        description: (
          <>
            학습용 이미지·영상<br className="heroMoBr" /> 개인정보 비식별
          </>
        ),
      },
      {
        title: '데이터셋 외부 공유',
        description: (
          <>
            연구기관·개발사 제공 전<br className="heroMoBr" /> 신원 보호
          </>
        ),
      },
      {
        title: '데이터 품질 유지',
        description: (
          <>
            행동·객체 정보는 살리고<br className="heroMoBr" /> 식별 영역 처리
          </>
        ),
      },
    ],
  },
  {
    id: 'smart-city',
    label: 'Smart City',
    icon: 'industry-smart-city',
    description: '도시 운영에 필요한 영상 데이터를 시민 개인정보 보호와 함께 활용합니다.',
    cases: [
      {
        title: '교통 흐름 분석',
        description: (
          <>
            교차로·도로 영상의<br className="heroMoBr" /> 보행자·번호판 보호
          </>
        ),
      },
      {
        title: '도시 안전 모니터링',
        description: (
          <>
            공공장소 영상 분석 시<br className="heroMoBr" /> 시민 정보 보호
          </>
        ),
      },
      {
        title: '도시 데이터 활용',
        description: (
          <>
            도시 영상 데이터<br className="heroMoBr" /> 연구·공유 전 비식별
          </>
        ),
      },
    ],
  },
  {
    id: 'finance',
    label: '금융',
    icon: 'industry-finance',
    description: '영업점과 고객 접점에서 수집된 영상을 검토·공유할 때 개인정보를 보호합니다.',
    cases: [
      {
        title: '영업점 보안 영상 관리',
        description: (
          <>
            고객 정보가 포함된<br className="heroMoBr" /> 영상 비식별
          </>
        ),
      },
      {
        title: '사고·분쟁 조사',
        description: (
          <>
            조사 자료 공유 시<br className="heroMoBr" /> 무관한 고객 보호
          </>
        ),
      },
      {
        title: '업무 영상 활용',
        description: (
          <>
            서비스 개선·직원 교육<br className="heroMoBr" /> 영상 비식별
          </>
        ),
      },
    ],
  },
  {
    id: 'manufacturing',
    label: '제조',
    icon: 'industry-manufacturing',
    description: '생산·안전 현장의 영상 데이터를 활용하면서 작업자 개인정보를 보호합니다.',
    cases: [
      {
        title: '작업 현장 영상 분석',
        description: (
          <>
            작업자 신원을 보호하며<br className="heroMoBr" /> 공정 영상 활용
          </>
        ),
      },
      {
        title: '안전사고 분석',
        description: (
          <>
            위험 행동 영상 공유 시<br className="heroMoBr" /> 직원 정보 보호
          </>
        ),
      },
      {
        title: '스마트팩토리 AI 학습',
        description: (
          <>
            생산·검사 영상 데이터셋<br className="heroMoBr" /> 작업자 비식별
          </>
        ),
      },
    ],
  },
  {
    id: 'medical',
    label: '의료',
    icon: 'industry-medical',
    description: '교육·연구·보안 목적으로 의료 영상을 사용할 때 환자와 방문객의 신원을 보호합니다.',
    cases: [
      {
        title: '의료 교육 영상 제작',
        description: (
          <>
            진료·수술 교육 영상의<br className="heroMoBr" /> 환자 신원 보호
          </>
        ),
      },
      {
        title: '의료 연구 데이터 활용',
        description: (
          <>
            연구용 영상·이미지의<br className="heroMoBr" /> 식별 정보 처리
          </>
        ),
      },
      {
        title: '병원 보안 영상 관리',
        description: (
          <>
            사고·민원 영상 공유 시<br className="heroMoBr" /> 환자·방문객 보호
          </>
        ),
      },
    ],
  },
];

export default function PubSolutions() {
  const { hash } = useLocation();
  const tabsRef = useRef<HTMLElement>(null);
  const tabListRef = useRef<HTMLUListElement>(null);
  const firstScroll = useRef(true);
  // 스크롤 위치에 해당하는 산업군 (첫 섹션 전에는 선택 없음)
  const [activeId, setActiveId] = useState<string | null>(null);
  // 탭 바가 GNB 아래에 붙어 있는 상태 (헤더가 숨겨질 때 함께 위로 올라가는 대상)
  const [isStuck, setIsStuck] = useState(false);
  // 마우스 드래그로 탭 목록 슬라이드 (터치는 기본 가로 스크롤 사용)
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startScroll: 0, moved: false });
  const inertiaRef = useRef(0);

  // 스크롤 위치 기준 현재 구역 판별: 고정 탭 바 하단을 지난 마지막 섹션
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = tabsRef.current?.getBoundingClientRect();
      const barBottom = bar?.bottom ?? 0;
      let current: string | null = null;
      // 탭 바가 GNB 아래에 고정되기 전(히어로 바로 아래 흐름 상태)에는 선택 없음
      const stuck = !!bar && bar.top <= STUCK_TOP;
      setIsStuck(stuck);
      for (const { id } of stuck ? INDUSTRIES : []) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= barBottom + 1) current = id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // 관성 스크롤 중 페이지를 벗어나면 정리
  useEffect(() => () => window.cancelAnimationFrame(inertiaRef.current), []);

  // 가로 스크롤 탭(모바일): 선택된 탭이 목록 가운데로 오도록 목록만 스크롤 (페이지 스크롤은 건드리지 않음)
  useEffect(() => {
    const list = tabListRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-current="location"]');
    // 드래그·관성 스크롤 중에는 끌어당기지 않음
    if (!list || !tab || list.scrollWidth <= list.clientWidth || dragRef.current.moved || inertiaRef.current) return;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
  }, [activeId]);

  // 마우스로도 터치처럼 탭 목록을 끌어서 슬라이드 (목록이 넘칠 때만)
  // - 5px 넘게 움직이면 드래그로 보고 링크 클릭은 막음
  // - 손을 뗀 뒤에는 터치 스크롤처럼 속도에 비례해 관성으로 미끄러지다 멈춤
  const handlePointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const list = tabListRef.current;
    if (e.pointerType !== 'mouse' || e.button !== 0 || !list || list.scrollWidth <= list.clientWidth) return;
    window.cancelAnimationFrame(inertiaRef.current);
    dragRef.current = { startX: e.clientX, startScroll: list.scrollLeft, moved: false };
    const samples: { x: number; t: number }[] = [{ x: e.clientX, t: performance.now() }];

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - dragRef.current.startX;
      if (!dragRef.current.moved && Math.abs(dx) > 5) {
        dragRef.current.moved = true;
        setIsDragging(true);
      }
      if (!dragRef.current.moved) return;
      list.scrollLeft = dragRef.current.startScroll - dx;
      samples.push({ x: ev.clientX, t: performance.now() });
      if (samples.length > 8) samples.shift();
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      setIsDragging(false);
      if (!dragRef.current.moved) return;

      // 마지막 100ms 안의 움직임으로 속도 계산 (멈춘 채 떼면 관성 없음)
      const now = performance.now();
      const recent = samples.filter((p) => now - p.t <= 100);
      let velocity = 0; // px/ms (스크롤 방향 기준)
      if (recent.length >= 2) {
        const first = recent[0];
        const last = recent[recent.length - 1];
        if (last.t - first.t > 0 && now - last.t <= 100) velocity = -(last.x - first.x) / (last.t - first.t);
      }
      if (Math.abs(velocity) < 0.05) return;

      // rAF 타임스탬프 기준으로 경과 시간을 계산하고, 소수 단위 위치를 직접 들고 있어 느려질 때도 끊기지 않게 함
      let pos = list.scrollLeft;
      const max = list.scrollWidth - list.clientWidth;
      let prev = -1;
      const step = (time: number) => {
        const dt = prev < 0 ? 16 : Math.min(Math.max(time - prev, 0), 32);
        prev = time;
        pos = Math.min(Math.max(pos + velocity * dt, 0), max);
        list.scrollLeft = pos;
        velocity *= Math.pow(INERTIA_DECAY, dt);
        // 속도가 거의 없거나 양끝에 닿으면 종료
        if (Math.abs(velocity) < 0.02 || pos <= 0 || pos >= max) {
          inertiaRef.current = 0;
          return;
        }
        inertiaRef.current = window.requestAnimationFrame(step);
      };
      inertiaRef.current = window.requestAnimationFrame(step);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  // 드래그 직후 발생하는 클릭은 탭 이동으로 처리하지 않음
  const handleClickCapture = (e: React.MouseEvent<HTMLUListElement>) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  // 해시(#id) 이동: 탭 클릭 · 헤더/푸터 메뉴 링크 모두 같은 방식으로 해당 섹션까지 스크롤 (섹션의 scroll-margin-top이 탭 바 높이를 비워 둠)
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: firstScroll.current || reduce ? 'auto' : 'smooth', block: 'start' });
    firstScroll.current = false;
  }, [hash]);

  return (
    <FrontLayout>
      <div className={styles.solutionsPage}>
        {/* 1. Hero (Figma PC 4365:4 / Mobile 4391:947) */}
        <HeroSection
          heroVariant="compact"
          align="center"
          category="solutions"
          className={styles.hero}
          eyebrow="SOLUTIONS"
          title={
            <>
              산업은 달라도,
              <br className="heroMoBr" /> 개인정보 보호는 필수입니다.
            </>
          }
          description={
            <>
              방송부터 의료까지. 이미지와 영상 속
              <br className="heroMoBr" /> 개인정보를 보호하면서 데이터를 활용할 수 있는
              <br className="heroMoBr" /> 방법을 확인해보세요.
            </>
          }
        />

        {/* 2. 산업군 탭 (Figma PC 4365:10 · 스크롤 고정 4370:59 / MO 4393:1208)
            스크롤하면 GNB 아래에 고정되고 현재 구역이 선택 표시됩니다. */}
        <div className={styles.tabsGap} aria-hidden="true" />
        <nav ref={tabsRef} className={`${styles.tabs} ${isStuck ? styles.is_stuck : ''}`} aria-label="산업군">
          <ul
            ref={tabListRef}
            className={`${styles.tabList} ${isDragging ? styles.is_dragging : ''}`}
            onPointerDown={handlePointerDown}
            onClickCapture={handleClickCapture}
            onDragStart={(e) => e.preventDefault()}
          >
            {INDUSTRIES.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id} className={styles.tabItem}>
                  <Link
                    to={{ hash: `#${item.id}` }}
                    className={`${styles.tab} ${isActive ? styles.is_active : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <Icon name={item.icon} size={24} className={styles.tabIcon} />
                    <span className={styles.tabLabel}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 3. 산업군별 활용 목적 8종 (Figma PC 4365:62 ~ 4365:258 / MO 4391:973 ~ 4391:1180) */}
        {INDUSTRIES.map((item, index) => (
          <BasicSection
            key={item.id}
            id={item.id}
            bg={index % 2 === 0 ? 'white' : 'gray'}
            layout="vertical"
            align="left"
            className={styles.industrySection}
          >
            <div className={styles.head}>
              <div className={styles.headTitle}>
                <p className={styles.eyebrow}>INDUSTRY</p>
                <h2 className={styles.name}>
                  <Icon name={item.icon} size={36} className={styles.nameIcon} />
                  {item.label}
                </h2>
              </div>
              <p className={styles.headDesc}>{item.description}</p>
            </div>

            <ul className={styles.cases}>
              {item.cases.map((useCase, caseIndex) => (
                <li key={useCase.title} className={styles.case}>
                  <img
                    className={styles.caseImage}
                    src={`${IMG}/${item.id}_${caseIndex + 1}.jpg`}
                    alt=""
                    width={400}
                    height={225}
                    loading="lazy"
                  />
                  <div className={styles.caseBody}>
                    <h3 className={styles.caseTitle}>{useCase.title}</h3>
                    <p className={styles.caseDesc}>{useCase.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </BasicSection>
        ))}

        {/* 4. CTA (Figma PC 4365:286 / Mobile 4391:1210) */}
        <CtaSection
          className={styles.cta}
          eyebrow="GET STARTED"
          title={
            <>
              우리 산업에도
              <br className="pcBr" /> xPrivacy를 적용할 수 있을까요?
            </>
          }
          description={
            <>
              업무 환경과 데이터 특성에 맞는 활용 방안을
              <br className="heroMoBr" /> 상담해보세요.
            </>
          }
          primaryLabel="도입 문의하기"
          primaryHref="/pub/contact/inquiry"
          secondaryLabel="데모 체험하기"
          secondaryHref="/pub/demo/image"
        />
      </div>
    </FrontLayout>
  );
}
