/**
 * 스크롤 등장 효과(AOS) 공통 설정 — 효과 조정은 이 파일 한 곳에서만 합니다.
 * FrontLayout → useScrollAos 가 이 값을 읽어 모든 서비스 페이지에 동일하게 적용합니다.
 */
export const AOS_CONFIG = {
  /** 올라오는 거리 (rem = px) */
  distance: 24,
  /** 애니메이션 시간 (ms) */
  duration: 700,
  /** 가속 곡선 */
  easing: 'ease-out-cubic',
  /** 요소가 화면 하단에서 이 거리만큼 들어오면 시작 (px) */
  offset: 80,
  /** true: 한 번만 재생 / false: 스크롤할 때마다 반복 */
  once: true,
  /** 짝수 번째(2, 4…) 요소의 지연 시간 (ms). 0이면 지연 없음 */
  staggerDelay: 100,
  /** 첫 섹션(히어로) 등장 효과: 메인 히어로 슬라이더의 heroFadeUp 과 동일한 값 (스크롤 아닌 로드 시 재생) */
  hero: {
    /** 올라오는 거리 (rem = px) */
    distance: 16,
    /** 애니메이션 시간 (ms) */
    duration: 800,
    /** 두 번째 컨텐츠(버튼·본문 등)의 지연 시간 (ms) */
    staggerDelay: 150,
  },
  /** 카드 그룹(가로로 나란한 카드 2~6개) 순차 등장: 블록은 위로 올라오고, 카드는 제자리에서 차례로 나타난다 */
  cards: {
    /** 카드 사이 지연 (ms) — AOS 규칙상 50의 배수 */
    step: 100,
    /** 지연이 붙는 카드 수 상한 (이후 카드는 마지막 지연과 동일) */
    max: 3,
    /** 카드로 보는 최소 크기 (px) — 작은 칩·버튼 묶음은 제외 */
    minWidth: 160,
    minHeight: 100,
  },
  /** 효과 적용 대상: main 안의 섹션 (래퍼 div 안에 있어도 인식). 첫 섹션은 hero 효과, 나머지는 스크롤 효과 */
  sectionSelector: 'main section',
  /** 자체 모션이 있는 섹션은 <section data-aos-skip> 으로 표시해 이중 모션을 막는다 (예: 메인 히어로 슬라이더) */
  skipSelector: '[data-aos-skip]',
  /** 섹션 안에서 움직일 컨텐츠 (헤더, 본문) */
  contentSelector: ':scope > div > *',
  /** 효과를 적용하지 않는 경로 (데모 페이지) */
  excludePaths: ['/pub/demo'],
} as const;
