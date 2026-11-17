# 📚 가이드 시스템 설계 및 아키텍처 컨텍스트 (Guide System Architecture)

이 문서는 프로젝트의 가이드 영역(`/guide/design-system/*`) 및 퍼블리싱 대시보드(`/guide/dashboard`)에 대한 **구조적/시각적/라우팅 설계 기준**을 정의합니다. AI와 개발자가 가이드 화면이나 컴포넌트를 작업할 때 임의로 레이아웃과 계층을 생성하지 않도록 돕는 핵심 지침서입니다.

---

## 1. 📝 화면 생성 원칙 (MD 프롬프트 기반)
가이드 화면은 임의의 형태로 구성하지 않고, 아래 **유형별 프롬프트 문서**의 마크업·컴포넌트 구조를 따릅니다.
*   신규 UI 컴포넌트 가이드: `PROMPT_BASE_TEMPLATE.md` (마스터 표준 양식)
*   파운데이션 가이드(Colors · Typography · Elevator · Utilities): `PROMPT_GUIDE_FA_*.md`
*   시안 → 화면 퍼블리싱: `PROMPT_DESIGN_ANALYSIS_PROCESS.md`

---

## 2. 📂 가이드와 사용자(Front) 영역의 폴더/라우팅 분리
규칙 원본은 `AGENTS.md` **Gate 1**입니다. 요약만 적습니다.
*   **사용자 화면** `src/pages/`, **퍼블리싱 목업** `src/pages/pub/`(서비스와 같은 레이아웃), **가이드·대시보드** `src/pages/guide/`(`GuideLayout` · `DesignSystemLayout`)로 격리합니다.

---

## 3. 🧩 공통 내비게이션 및 진입점 설계 (GNB Navigation Architecture)
*   사용자 화면과 가이드 화면은 레이아웃을 공유하지 않고 완벽하게 분리합니다.
*   **Header UI 및 배치**: 
    - 가이드 헤더는 사이드바(Sidebar) 내부에 갇히지 않고, 화면 최상단 전체 너비(100%)를 차지하는 고정형 글로벌 네비게이션(Fixed, `height: 60px`)으로 독립됩니다.
    - 좌측에는 프로젝트 로고가 배치되며, 우측에는 **'Design System'**과 **'Dashboard'** 메뉴가 수평 배치됩니다.
*   **서비스 Header 동작 정책** (`src/components/domain/Header/Header.tsx` · PC·모바일 공통):
    - 배경 뒤에 `backdrop-filter` 블러를 적용합니다.
    - **스크롤 다운 시 숨김 · 스크롤 업 시 노출**(최상단 근처와 메뉴가 열려 있는 동안은 항상 노출).
    - 헤더 노출 상태는 `document.documentElement.dataset.headerHidden`(`'true'`/`'false'`)으로 문서에 알립니다. GNB 아래에 고정되는 화면 요소(예: `/pub/solutions` 산업군 탭 바)는 `html[data-header-hidden='true']`일 때 헤더와 같은 `transform` 전환(0.3s ease)으로 함께 올라가도록 이 값을 따릅니다(`top` 전환은 헤더와 어긋나 틈이 생기므로 쓰지 않음).
    - **GNB 메뉴가 노출되면 헤더를 불투명 처리**합니다(`--color-surface-header-opaque`).
    - 하위 메뉴: PC는 대메뉴 **호버(키보드 포커스 포함) 시 전폭 메가 메뉴**(제목 · 항목 2열 · 문의 프로모 + 헤더 아래 Dim), 모바일은 대메뉴 **클릭 시 아코디언**으로 펼칩니다. 두 화면은 같은 메뉴 데이터(`NAV_GROUPS`)를 씁니다.
*   **공식 진입점(Landing Path) 설계**:
    - GNB의 **'Design System'** 링크 클릭 시 디자인 시스템 공식 첫 페이지인 **`/guide/design-system/overview` (Introduction)**로 랜딩되도록 설계합니다.
    - 루트 가이드 주소인 `/guide/design-system`로 직접 접근하는 경우에도 `/guide/design-system/overview`로 자동 리다이렉트 처리합니다.

---

## 4. 📐 가이드 내부 레이아웃의 이원화 정책
가이드 레이아웃(`GuideLayout`)은 내부적으로 라우팅 경로(`useLocation`)를 감지하여 2가지 모드로 레이아웃을 다르게 렌더링해야 합니다. 

### A. 퍼블리싱 대시보드 모드 (`/guide/dashboard`)
*   **목적**: 화면 개발 진척도, 경로, URL을 표 형태로 한눈에 밀도 있게 관리하는 화면. (`src/pages/guide/dashboard/index.tsx`가 담당)
*   **레이아웃 특징**: 대용량 데이터 테이블 수용을 위해 **좌측 사이드바 메뉴를 숨기고(Unmount)**, 본문 컨테이너가 브라우저 **전체 너비(`max-width: 100%`)**를 시원하게 차지하도록 `dashboard_inner` 클래스를 부여합니다.

### B. 컴포넌트/문서 가이드 모드 (`/guide/design-system/*`)
*   **목적**: 버튼, 컬러, 타이포그래피 등 디자인 시스템의 사용법을 열람하는 문서 화면.
*   **레이아웃 특징**: 가독성이 최우선이므로 **좌측에 사이드바(Guide Menu)를 항상 노출**하고, 우측 본문 영역은 화면을 꽉 채우지 않고 **가운데 정렬된 제한된 너비(`max-width: 1024px`)**를 가지도록 `content_inner` 클래스를 부여합니다.

---

## 5. 🗂️ 사이드바 메뉴 구조 및 컴포넌트 계층 설계 (LNB Architecture)

사이드바 메뉴(`GUIDE_MENU`)는 다음과 같은 엄격한 3단계 위계로 설계합니다:

1.  **`OVERVIEW` (시스템 개요)**: 
    *   시스템의 숲을 조망하는 최상위 카테고리입니다. 1순위 메뉴로 **`Introduction` (`/guide/design-system/overview`)**을 고정 배치합니다.
2.  **`FOUNDATION` (디자인 토큰)**: 
    *   UI의 원자적 단위인 `Colors`, `Typography`, `Elevator`, `Utilities`로 구성합니다.
3.  **`COMPONENTS` (컴포넌트 통합 카테고리)**: 
    *   Core와 Domain을 메뉴로 쪼개지 않고, 컴포넌트 단위(`Button`, `Badge`, `Modal`, `Form`, `Tabs`, `Accordion`, `Icon`, `Section` 등)로 단일 등록합니다.
    *   각 컴포넌트 상세 페이지 내부에서 **`<Tabs>`를 통해 `Core`와 `Domain`을 분리** 제공합니다.

---

## 6. 💡 Core 직접 호출 vs Domain 프리셋 생성 설계 원칙 (Component Creation Policy)

컴포넌트를 개발하거나 사용할 때는 관리 포인트 비대화를 막기 위해 아래의 실무 사용성 기준을 철저히 준수합니다:

*   **Core 컴포넌트 직접 호출 원칙 [화면 개별 / 일회성 UI]**:
    *   서비스 공통이 아닌 도메인 컴포넌트를 불필요하게 생성하지 않을 경우 코어 컴포넌트를 사용합니다.
    *   화면에서 Core 컴포넌트(`Button`, `Badge`, `Modal`, `Form` 등)를 직접 import하여 속성(`variant`, `color`, `size` 등)을 조합해 즉시 호출하여 사용합니다.
*   **Domain 컴포넌트 생성 기준 [서비스 공통 패턴]**:
    *   특정 단일 화면에 국한되지 않고, 서비스 내 여러 화면에 걸쳐 **공통 업무 정책·고유 텍스트·상태 코드**가 결합되어 반복 재사용되는 패턴에 한해서만 신설합니다.
*   **Preset Wrapper 원칙**:
    *   도메인 컴포넌트는 새로운 HTML 태그를 처음부터 만들지 않고, **반드시 Core 컴포넌트를 import하여 서비스 기본값(Preset)을 부여하고 감싸는 형태**로 구현합니다.
    *   예시: `BenefitCardGroup` / `BenefitCard`(도입 효과) = Core `Card`(배경·테두리) + Core `IconSurface`(유리 아이콘)에 기술 페이지 공통 카드 간격·배치 프리셋을 부여한 래퍼. Core는 박스와 시각 효과만, 도메인은 카드 단위의 간격·배치만 책임집니다.
    *   **카드 구성 판단**: 같은 Core 부품(`Card` + `IconSurface`)을 써도 배치가 다르면(예: 아이콘 위 세로 쌓기 `BenefitCard` vs 아이콘·제목 가로 헤더인 Company 사업 영역 카드) 서로 대체하지 않습니다. 한 화면 전용 카드는 도메인 컴포넌트를 새로 만들지 않고 화면에서 Core `Card` + `IconSurface`를 직접 조합합니다. 구성 예시는 디자인 시스템 Card 가이드 Domain 탭 3번(BusinessCard)에 있습니다.
    *   **도메인 컴포넌트는 섹션을 소유하지 않습니다.** 섹션(배경·eyebrow·타이틀)은 페이지에서 `BasicSection` 등 섹션 컴포넌트로 구성하고, 도메인 컴포넌트는 그 `children`(콘텐츠)으로만 들어갑니다.

*   **공통 도메인 패턴 사례 (`DeploymentPlans`)**: 도입 방식 카드 4종(구축형·클라우드·API 연동·PoC 무상 검증)은 제품 가격 페이지와 메인 두 화면에서 같은 문구·구성으로 반복되므로 `src/components/domain/Deployment/DeploymentPlans.tsx`로 단일화했습니다. 섹션 제목·설명·정렬 같은 프레임은 각 화면(`BasicSection`)이 지정하고, 카드 내부는 섹션 정렬을 상속하지 않고 항상 왼쪽 정렬입니다.

### 6.1 📝 타이포그래피 적용 범위 및 독립 UI 격리 원칙 (Typography Scope & Isolation)
*   **섹션 중심 텍스트 관할**: 디자인 시스템의 타이포그래피 파운데이션은 웹페이지의 중심 독서 흐름을 형성하는 **섹션 단위 목차(Eyebrow) / 제목(Title) / 본문(Description) / 보조설명(Lead, Caption)** 기준으로 정의되어 통제됩니다.
*   **독립 UI 가이드 격리**: 버튼(`Button`), 뱃지(`Badge`), 탭(`Tabs`), 모달(`Modal`), 폼 컨트롤(`Form/Input`), 데이터 테이블, 소프트웨어 목업 그래픽 등의 독립적인 UI 요소들은 섹션 타이포그래피 토큰의 영향을 받지 않으며, 각 컴포넌트 고유의 컴팩트 스펙 가이드에 따라 독립적으로 정의·관리됩니다.

*   **기본 줄바꿈 (전역)**: `_reset.scss`의 `body`에 `word-break: keep-all` + `overflow-wrap: break-word`를 기본으로 둡니다. 한글은 단어(어절) 단위로만 줄이 바뀌고, 긴 영문·URL은 넘칠 때만 끊깁니다. 개별 요소에 `word-break: keep-all`을 반복 지정하지 않으며, 음절 단위 끊김이 필요한 요소만 예외로 덮어씁니다.

---

## 6.2 ✨ 스크롤 등장 효과(AOS) 공통 적용 원칙
*   **적용 지점**: `FrontLayout`이 `useScrollAos`(`src/pages/pub/layouts/useScrollAos.ts`)를 호출해 모든 서비스 페이지에 일괄 적용합니다. 페이지에서 AOS를 import하거나 `data-aos`를 직접 달지 않습니다.
*   **값의 단일 출처**: 거리·시간·지연·반복·대상·제외 경로는 `src/pages/pub/layouts/aos.config.ts` 한 곳에서만 수정합니다. (규칙 상세는 그 파일과 `useScrollAos.ts`의 주석)
*   **제외**: `/pub/demo`와 `DemoLayout`, 자체 모션이 있는 섹션(`<section data-aos-skip>`, 예: 메인 히어로 슬라이더), `prefers-reduced-motion` 환경.
*   **위치와 효과 분리**: AOS는 `transform`·`opacity`로 효과를 처리하므로, AOS가 붙을 수 있는 요소의 **기본 위치는 `transform`(예: `translate(-50%, -50%)` 가운데 맞춤)을 쓰지 않고 좌표(`inset` · `margin: auto`)로만** 잡습니다. 같은 요소에서 `transform`이 AOS에 덮여 위치가 밀립니다.

## 6.3 🪟 알림창(AlertModal)과 모달·아코디언 원칙
*   **AlertModal (`src/components/domain/Modal/AlertModal.tsx`)**: 완료·확인 필요·실패 안내의 서비스 공통 알림창(Core `Modal` Preset Wrapper)입니다. 폼 검증과 제출 결과 피드백은 브라우저 `alert()` 대신 이 컴포넌트를 씁니다. 속성·케이스는 디자인 시스템 Modal 가이드 페이지를 따릅니다.
*   **퍼블리싱 확인용 케이스**: 실제 동작 없이는 볼 수 없는 알림창은 `?alert=케이스` 쿼리로 열 수 있게 하고, 대시보드(`src/pages/guide/dashboard/index.tsx`) 해당 행에 케이스 칩 링크로 노출합니다.
*   **Core Accordion 전환**: 답변 패널을 항상 렌더링하고 `grid-template-rows: 0fr → 1fr`로 높이를 전환하며, 닫힌 패널은 `visibility: hidden` + `inert`로 보조기술·탭 이동에서 제외합니다. 항목 사이 간격은 `gap` 대신 답변 위 여백으로 둡니다(`FaqAccordion`).

## 6.4 📐 2단 레이아웃(미디어 + 텍스트) 반응형 폭 정책
*   **원칙**: 한 열을 시안 폭으로 고정하고 다른 열만 가변으로 두면 PC 중간 폭(1025~1280)에서 가변 열만 쪼그라듭니다. 믹스인 `@include split-col($weight, $max)`(`_mixins.scss`)를 **두 열에 모두** 적용해 시안 비율로 같이 줄어들게 합니다. 1025px 이상에만 걸리고 1024px 이하(세로 전환)는 페이지 기존 규칙을 씁니다.
*   **대상**: solutions · blog 최신 글 · features 4종 · brochure · why 정밀 AI 탐지. 내부가 비율 단위(`cqw`, `%`, `aspect-ratio`)인 열만 대상이며, 고정 px 좌표 패널(security 비주얼, certification 특허증)은 제외합니다.
*   **시안 줄바꿈**: 2단 구조 제목·설명의 시안 줄바꿈은 1280 미만에서 해제합니다(`splitBr` · `splitPcBr`, 요약은 `AGENTS.md` Gate 5 Step 4). 설명은 기본값이 줄바꿈 없음이며 히어로·CTA·카드 설명은 대상이 아닙니다.
*   **Section `layout="horizontal"`**: 두 열 모두 `flex: 1`이 기본입니다. 헤더 폭을 페이지에서 고정하지 말고 같은 믹스인으로 비율을 지정합니다.

## 7. 🎨 디자인 컨셉 지향점
모든 가이드 및 사용자 화면은 화려함보다는 정보 전달력이 뛰어난 **'Professional Modern'** 스타일을 지향합니다.
*   **프리뷰 개방형(Open-Rendering) 원칙**: 프리뷰 영역(`.preview`)은 컴포넌트를 Card나 별도 테두리 박스로 감싸지 않고 순수하게 오픈형으로 렌더링합니다. (`AGENTS.md` Gate 3)
*   **여백과 단위**: 모든 여백·크기 단위는 `px`가 아니라 **`rem`**을 씁니다(`html { font-size: 1px }`이므로 `1rem = 1px`). (`AGENTS.md` Gate 4)
