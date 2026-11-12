# 📚 가이드 시스템 설계 및 아키텍처 컨텍스트 (Guide System Architecture)

이 문서는 프로젝트의 가이드 영역(`/guide/design-system/*`) 및 퍼블리싱 대시보드(`/pub`)에 대한 **구조적/시각적/라우팅 설계 기준**을 정의합니다. AI와 개발자가 가이드 화면이나 컴포넌트를 작업할 때 임의로 레이아웃과 계층을 생성하지 않도록 돕는 핵심 지침서입니다.

---

## 1. 📝 화면 생성 원칙 (MD 프롬프트 기반)
가이드 및 대시보드 내의 어떠한 화면도 임의의 형태로 구성해서는 안 됩니다.
반드시 사전에 정의된 **유형별 프롬프트 가이드 문서(.md)**를 통해 마크업과 컴포넌트 구조를 생성해야 합니다.
*   대시보드 화면 생성/수정: `PROMPT_DASHBOARD.md` 참조
*   신규 UI 컴포넌트 가이드 생성: `PROMPT_BASE_TEMPLATE.md` (마스터 표준 양식) 참조
*   파운데이션 가이드 생성/수정: `PROMPT_GUIDE_FA_*.md` 참조

---

## 2. 📂 가이드와 사용자(Front) 영역의 폴더/라우팅 분리
*   **사용자 화면**: `src/pages/` 하위에 위치하며, 프로덕션 전역 레이아웃 컴포넌트를 사용합니다.
*   **가이드 및 대시보드 화면**: 모든 퍼블리싱 관련 문서는 `src/pages/pub/` 폴더 하위에 격리되어야 합니다. 또한 이들은 `GuideLayout`(`src/pages/guide/layouts/GuideLayout.tsx`)으로 감싸져 독립된 시스템으로 작동해야 합니다.

---

## 3. 🧩 공통 내비게이션 및 진입점 설계 (GNB Navigation Architecture)
*   사용자 화면과 가이드 화면은 레이아웃을 공유하지 않고 완벽하게 분리합니다.
*   **Header UI 및 배치**: 
    - 가이드 헤더는 사이드바(Sidebar) 내부에 갇히지 않고, 화면 최상단 전체 너비(100%)를 차지하는 고정형 글로벌 네비게이션(Fixed, `height: 60px`)으로 독립됩니다.
    - 좌측에는 프로젝트 로고가 배치되며, 우측에는 **'Design System'**과 **'Dashboard'** 메뉴가 수평 배치됩니다.
*   **서비스 Header 동작 정책** (`src/components/domain/Header/Header.tsx` · PC·모바일 공통):
    - 배경 뒤에 `backdrop-filter` 블러를 적용합니다.
    - **스크롤 다운 시 숨김 · 스크롤 업 시 노출**(최상단 근처와 메뉴가 열려 있는 동안은 항상 노출).
    - **GNB 메뉴가 노출되면 헤더를 불투명 처리**합니다(`--color-surface-header-opaque`).
    - 하위 메뉴: PC는 대메뉴 **호버(키보드 포커스 포함) 시 전폭 메가 메뉴**(제목 · 항목 2열 · 문의 프로모 + 헤더 아래 Dim), 모바일은 대메뉴 **클릭 시 아코디언**으로 펼칩니다. 두 화면은 같은 메뉴 데이터(`NAV_GROUPS`)를 씁니다.
*   **공식 진입점(Landing Path) 설계**:
    - GNB의 **'Design System'** 링크 클릭 시 디자인 시스템 공식 첫 페이지인 **`/guide/design-system/overview` (Introduction)**로 랜딩되도록 설계합니다.
    - 루트 가이드 주소인 `/guide/design-system`로 직접 접근하는 경우에도 `/guide/design-system/overview`로 자동 리다이렉트 처리합니다.

---

## 4. 📐 가이드 내부 레이아웃의 이원화 정책
가이드 레이아웃(`GuideLayout`)은 내부적으로 라우팅 경로(`useLocation`)를 감지하여 2가지 모드로 레이아웃을 다르게 렌더링해야 합니다. 

### A. 퍼블리싱 대시보드 모드 (`/pub` 또는 `/pub/`)
*   **목적**: 화면 개발 진척도, 경로, URL을 표 형태로 한눈에 밀도 있게 관리하는 화면. (주로 `src/pages/pub/index.tsx`가 담당)
*   **레이아웃 특징**: 대용량 데이터 테이블 수용을 위해 **좌측 사이드바 메뉴를 숨기고(Unmount)**, 본문 컨테이너가 브라우저 **전체 너비(`max-width: 100%`)**를 시원하게 차지하도록 `dashboard_inner` 클래스를 부여합니다.

### B. 컴포넌트/문서 가이드 모드 (대시보드 외 모든 `/guide/design-system/*` 경로)
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
*   **적용 지점**: `FrontLayout`이 `useScrollAos`(`src/pages/pub/layouts/useScrollAos.ts`)를 호출하여, 레이아웃을 쓰는 모든 서비스 페이지에 효과를 일괄 적용합니다. 페이지별로 AOS를 import하거나 `data-aos`를 직접 달지 않습니다.
*   **값의 단일 출처**: 거리·시간·가속·지연·반복 여부·대상 선택자·제외 경로는 `src/pages/pub/layouts/aos.config.ts` 한 곳에서만 수정합니다. 이동 거리는 `--aos-distance` CSS 변수로 주입되어 `aos.scss`가 사용합니다.
*   **대상 규칙**: 첫 섹션(히어로)은 스크롤 효과 대신 메인 히어로와 동일한 로드 시 등장 효과(`hero-fade-up`, 값은 `aos.config.ts`의 `hero`)를 적용하고, 나머지 섹션은 스크롤 시 컨텐츠(헤더·본문)만 움직이며 섹션 배경은 고정합니다. 자체 모션이 있는 섹션(메인 히어로 슬라이더)은 `<section data-aos-skip>`으로 표시해 이중 모션을 막습니다. 공통 Section 컴포넌트는 속성을 전달하지 않으므로 마운트 후 부여합니다.
*   **제외**: `/pub/demo` 하위(데모) 경로와 `DemoLayout`은 적용하지 않으며, `prefers-reduced-motion` 환경에서는 비활성화됩니다.
*   **카드 그룹 순차 등장**: 블록 안에서 가로로 나란한 카드(2~6개, 최소 160×100)를 `useScrollAos`가 자동으로 찾아, 블록이 올라오는 동안 카드가 제자리에서 차례로 나타나게 합니다(`aos.config.ts`의 `cards`). 이동은 블록 단위에서만 일어나므로 이중 모션이 생기지 않으며, 등장이 끝나면 카드의 AOS 속성을 걷어내 카드 고유의 hover 전환을 덮지 않습니다.

## 6.3 🪟 알림창(AlertModal)과 모달·아코디언 전환 원칙
*   **AlertModal (`src/components/domain/Modal/AlertModal.tsx`)**: 완료·확인 필요·실패 안내의 서비스 공통 알림창입니다(Figma 문의 / 접수 완료 PC 700:23470 · MO 700:23475). Core `Modal`에 유리 아이콘·큰 제목·설명·확인 버튼 프리셋을 입힌 Preset Wrapper입니다. `variant`(success/warning/error)로 기본 아이콘이 바뀌고, `icon`으로 글리프를 교체할 수 있고(아이콘은 항상 노출), `cancelText`를 주면 확인/취소 2버튼이 됩니다. 폼 검증(필수·형식·동의)과 제출 결과 피드백은 브라우저 `alert()` 대신 이 컴포넌트를 씁니다. 글리프는 `public/images/common/alert/`에 의미별(파랑 체크·주황 느낌표·빨강 X)로 둡니다.
*   **퍼블리싱 확인용 케이스**: 실제 동작 없이는 볼 수 없는 알림창은 `?alert=케이스` 쿼리로 바로 열 수 있게 하고, 대시보드(`src/pages/guide/dashboard/index.tsx`) 해당 행에 케이스 칩 링크로 노출합니다. (문의하기: `done | required | email | agree | error`)
*   **Core Modal 전환**: 열릴 때와 닫힐 때 같은 길이(0.2초) 페이드로 전환하고 닫힘이 끝난 뒤 DOM에서 제거합니다. 옵션으로 `role`, `aria-labelledby`, `aria-describedby`, `closeOnEsc`(기본 true)를 제공합니다. `prefers-reduced-motion`에서는 전환 없이 즉시 표시됩니다.
*   **Core Accordion 전환**: 답변 패널을 항상 렌더링하고 `grid-template-rows: 0fr → 1fr`로 높이를 전환합니다. 닫힌 패널은 `visibility: hidden` + `inert`로 보조기술과 탭 이동에서 제외합니다. 항목 사이 간격은 `gap` 대신 답변 위 여백으로 두어 접힌 상태에 간격이 남지 않게 합니다(`FaqAccordion`).

## 6.4 📐 2단 레이아웃(미디어 + 텍스트) 반응형 폭 정책
*   **문제**: 한쪽 열을 시안 폭(560·600·624 등)으로 고정하고 다른 열만 `flex: 1`로 두면, PC 중간 폭(1025~1280px)에서 가변 열만 쪼그라들어 제목·리스트가 어색하게 꺾이고 좌우 균형이 무너집니다.
*   **해결**: 믹스인 `@include split-col($weight, $max)`(`src/assets/scss/_mixins.scss`)를 두 열에 모두 적용합니다. `$weight`는 1280 기준 시안 폭(숫자만)으로, 두 열이 **시안 비율을 유지한 채 같이 줄어듭니다**. `$max`는 시안 폭 상한입니다. 규칙은 **1025px 이상에만** 적용되며, 1024px 이하(세로 전환)는 각 페이지의 기존 규칙을 그대로 씁니다(세로 배치에서 `flex-basis: 0`이 높이를 0으로 만드는 것을 방지).
*   **적용 대상**: solutions · blog 최신 글 · features 4종(image-deid, video-deid, batch-processing, ai-auto-editing) · brochure · why 정밀 AI 탐지. 내부가 비율 단위(`cqw`, `%`, `aspect-ratio`)로 구성된 열만 대상입니다.
*   **제외**: 내부가 고정 px 좌표로 구성된 패널(security 비주얼 602×380, certification 특허증 겹침 배치)은 폭을 줄이면 깨지므로 믹스인을 쓰지 않습니다. 필요하면 세로 전환 분기점 조정이나 별도 `scale` 처리를 합니다.
*   **시안 줄바꿈 정책 (2단 구조 제목·설명)**: 시안의 고정 줄바꿈은 시안 폭(PC 1280 이상)에서만 적용하고, 열이 줄어들기 시작하는 **1280 미만부터는 해제**해 `keep-all` 자연 줄바꿈에 맡깁니다(세로로 바뀌는 구간 포함). 줄바꿈은 두 유틸로 구분하며 해제 조건은 `_utilities.scss`에서 한 번에 조정합니다. `splitBr`는 1280 이상 + 폰 폭(480 이하)에서 적용되어 기존 일반 `<br />`를 대체하고, `splitPcBr`는 1280 이상에서만 적용되어 `pcBr`나 폰 폭에서 해제되던 설명 줄바꿈(`fitBr`)을 대체합니다. 설명은 기본값이 줄바꿈 없음이며, 시안이 일부러 나눈 줄바꿈만 `splitPcBr`로 남깁니다. 히어로·CTA·카드 설명은 대상이 아닙니다.
*   **Section `layout="horizontal"`**: 기본은 두 열 모두 `flex: 1`이라 가변입니다. 페이지에서 헤더 폭을 고정하는 대신 같은 믹스인으로 비율을 지정합니다.

## 7. 🎨 디자인 컨셉 지향점
모든 가이드 및 사용자 화면은 화려함보다는 정보 전달력이 뛰어난 **'Professional Modern'** 스타일을 지향합니다.
*   **프리뷰 개방형(Open-Rendering) 원칙**: 프리뷰 영역(`.preview`)은 브라우저의 자연스러운 렌더링을 위해 컴포넌트를 Card나 별도 테두리 박스로 감싸지 않고 순수하게 오픈형으로 렌더링합니다.
*   **여백과 단위**: 모든 단위는 `rem` 대신 직관적인 **`px` 단위로 통일**하여 소통 오류를 줄입니다.
*   **프롬프트 기록 자동화**: `usePromptStore`를 통해 매 작업 단계의 프롬프트와 의사결정 과정을 대시보드에서 조회할 수 있도록 설계합니다.