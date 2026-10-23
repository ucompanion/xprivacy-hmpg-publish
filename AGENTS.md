# 🛡️ xPrivacy 설계 & 퍼블리싱 상시 감시 에이전트 (Supervisor Agent)

본 문서는 **xPrivacy 웹 서비스**의 디자인 시스템, 퍼블리싱 가이드 및 서비스 페이지 작업 시 적용되는 **상시 감시 에이전트(Supervisor Agent)** 지침입니다.
AI 어시스턴트는 이 워크스페이스에서 수행되는 **모든 작업(신규 생성, 수정, 리팩토링, 문서화)** 시 아래의 원칙과 검증 게이트를 엄격히 준수해야 하며, 규약 위반을 능동적으로 차단하고 감시해야 합니다.

---

## 🧭 1. 감시 에이전트 핵심 감시 게이트 (8 Non-Negotiable Gates)

### Gate 1. 폴더 및 라우팅 격리 감시 (Routing & Directory Isolation)
*   **사용자 화면**: `src/pages/` 하위에 위치하며, 프로덕션 서비스 레이아웃을 사용합니다.
*   **퍼블리싱 목업 화면**: `src/pages/pub/` 하위에 위치하며, 실제 서비스와 동일한 레이아웃을 테스트합니다.
*   **가이드 및 대시보드 화면**: `src/pages/guide/` 하위에 격리되어야 하며, `GuideLayout`(`src/pages/guide/layouts/GuideLayout.tsx`)을 사용합니다. 디자인 시스템 페이지의 LNB는 `DesignSystemLayout`(`src/pages/guide/layouts/DesignSystemLayout.tsx`)에서 관리합니다.
    *   **대시보드**: `/guide/dashboard`
    *   **디자인 시스템**: `/guide/design-system/...`
*   **GNB 진입점 규약**:
    *   가이드 영역 상단 GNB(`GuideLayout`)는 `height: 60rem` 고정형입니다. (서비스 화면 Header는 별도 규격: PC `var(--header-height)` 72rem / MO `var(--header-height-mo)` 60rem)
    *   **'Design System'** 메뉴 클릭 시 공식 첫 진입점인 **`/guide/design-system/overview` (Introduction)**로 랜딩되어야 합니다.
    *   디자인 시스템 루트 경로로의 직접 접근은 `/guide/design-system/overview`로 자동 리다이렉트되어야 합니다.
*   **LNB 3단계 계층 구조**:
    1. `OVERVIEW`: `Introduction` (`/guide/design-system/overview`)
    2. `FOUNDATION`: `Colors`, `Typography`, `Elevator`, `Utilities`
    3. `COMPONENTS`: 컴포넌트별 단일 등록 (`Button`, `Badge`, `Modal`, `Form` 등)

### Gate 2. Core vs Domain 컴포넌트 생성 판별 감시 (Decision Tree)
*   **사용성 기준의 핵심 원칙**:
    > **"서비스 공통이 아닌 도메인 컴포넌트를 불필요하게 생성하지 않을 경우 코어 컴포넌트를 사용합니다."**
*   **Core 컴포넌트 직접 호출 [화면 개별 / 일회성 UI]**:
    *   서비스 전반의 공통 반복 요소가 아니거나 특정 화면에만 쓰이는 일회성 액션 및 독립 레이아웃은 **도메인 컴포넌트를 절대로 신설하지 않습니다.**
    *   화면에서 Core 컴포넌트(`Button`, `Badge`, `Modal`, `Form` 등)를 직접 import하여 속성(`variant`, `color`, `size` 등)을 조합해 즉시 호출합니다.
*   **Domain 컴포넌트 신설 기준 [서비스 공통 패턴]**:
    *   서비스 내 여러 화면에 걸쳐 **공통 업무 정책·고유 텍스트·상태 코드**가 결합되어 반복 재사용되는 패턴에 한해서만 신설합니다.
*   **Preset Wrapper 원칙**:
    *   도메인 컴포넌트는 새로운 HTML 태그를 처음부터 만들지 않고, **반드시 Core 컴포넌트를 import하여 서비스 기본값(Preset)을 부여하고 감싸는 형태**로 구현합니다.

### Gate 3. 가이드 템플릿 렌더링 감시 (Open-Rendering & Format)
*   **오픈형 프리뷰 렌더링 (Open-Rendering) 원칙**:
    *   컴포넌트 프리뷰 컨테이너(`.preview`) 내부를 인위적인 Card, 테두리 박스(`border`), 그림자(`shadow`), 배경(`bg-white`) 등으로 감싸지 않습니다.
    *   컴포넌트는 브라우저 환경에 맞게 자연스러운 오픈형태로 렌더링되어야 합니다.
*   **1:1 `<CodeBlock>` 매칭**:
    *   모든 `.preview` 영역 바로 아래에는 커스텀 컴포넌트 `<CodeBlock>`을 사용하여 실제 화면 렌더링 코드와 1:1로 일치하는 JSX를 제공해야 합니다.
*   **깔끔한 탭 라벨 (No Parentheses)**:
    *   컴포넌트 가이드 페이지의 `<Tabs>` 라벨은 괄호 없이 깔끔하게 **`Core`**와 **`Domain`**으로만 표기합니다. (예: `Core (기본)` ❌, `Core` ⭕)
*   **Domain 탭 작성 규약**:
    *   대분류 섹션(`GuideSection`)은 **개별 도메인 컴포넌트 단위**(`1. [DomainComponent 1]`, `2. [DomainComponent 2]`)로 넘버링합니다.
    *   각 도메인 섹션 내부는 하위 `h3` 구조로 **`x.1. Specs`** 및 **`x.2. Usage`**로 분리합니다.

### Gate 4. 디자인 토큰 및 타이포그래피 감시 (Tokens & Foundations)
*   **폰트 역할 2단계 분리**:
    *   Primary UI Font: `Pretendard` (모든 일반 UI 및 본문)
    *   Monospace Font: `Consolas`, `Monaco`, `Courier New` (코드, 데이터 표기)
*   **단위(Unit) 및 토큰 추상화 준수**:
    *   임의의 font-family 문자열 직접 하드코딩 금지 → `var(--font-family-base)`, `var(--font-family-mono)` 사용.
    *   임의의 HEX 컬러 하드코딩 지양 → `src/assets/scss/_variables.scss`에 정의된 v2 시맨틱 토큰(`--color-text-*`, `--color-surface-*`, `--color-border-*`, `--color-primary`, `--color-danger` 등) 사용.
    *   `--color-gray-*` 등 `src/assets/scss/_deprecated.scss`의 토큰은 하위 호환용이므로 신규 코드에서 사용하지 않습니다. (예: `--color-gray-100` → `--color-surface-gray`)
    *   타이포그래피(font-size / line-height / font-weight) 숫자 하드코딩 금지 → 피그마 텍스트 스타일에 대응하는 믹스인(`@include text-body`, `text-subheading`, `text-section`, `text-eyebrow`, `text-note` 등, `src/assets/scss/_mixins.scss`) 또는 `var(--font-size-*)`, `var(--line-height-*)`, `var(--font-weight-*)` 사용.
    *   모든 여백, 크기 단위는 `px` 대신 **`rem` 단위를 사용**합니다 (`html { font-size: 1px }` 설정에 따라 `1rem = 1px` 매칭).
    *   뷰포트 단위가 필요할 경우 모바일 UI 대응을 위해 `vh` 대신 반드시 **`svh`**를 사용합니다.

### Gate 5. 시안 실무 분석 및 퍼블리싱 파이프라인 (Design-to-Code Pipeline)
단순하고 원론적인 "1:1 매칭" 구호 대신, 디자인 시안(이미지 또는 피그마 MCP URL)이 제공되었을 때 다음 **5단계 실무 프로세스**(`doc/guide/PROMPT_DESIGN_ANALYSIS_PROCESS.md` 참조)를 반드시 순차적으로 실행하여 누락과 왜곡을 방지해야 합니다:
1.  **Step 1. 시안 리터럴 및 메타 전수 추출 (Literal Scan)**:
    *   Eyebrow, Title, Description, 버튼/링크 라벨의 한글/영문 텍스트 및 줄바꿈(`<br/>`) 위치를 글자 하나도 임의 변경하지 않고 100% 동일하게 추출합니다. (예: 버튼 문구를 '무료 체험' 등으로 지레짐작 날조 금지)
    *   테이블 컬럼/행 명칭, 셀 데이터 값, 체크/대시 상태, 라디오 버튼 On/Off 상태를 전수 확인합니다.
2.  **Step 2. 레이아웃 축(Axis) 해체 및 섹션 배경색 판별 (Layout Axis & Background Scan)**:
    *   헤더와 컨텐츠의 배치 축이 **`Vertical` (상단 전폭/중앙 타이틀 + 하단 본문)**인지, **`Horizontal` (좌측 열 타이틀 + 우측 열 본문)**인지 명확히 판별합니다.
    *   본문 내 2열 분할([테이블 50% + 이미지 50%])이 있더라도 타이틀이 상단 중앙에 있다면 섹션 레벨은 반드시 **Vertical**로 설정합니다.
    *   **섹션 배경색(White vs Gray) 전수 판별**: 각 섹션의 바닥 배경이 **순수 흰색(`bg="white"`, `#ffffff`)**인지, **라이트 그레이(`bg="gray"`, `#f1f3f4` / `var(--color-surface-gray)`)**인지 스포이드로 전수 확인하여 `<BasicSection bg="...">`에 1급 prop으로 명시합니다. (시안의 리듬감 있는 배경 교차 누락 절대 금지)
3.  **Step 3. 기존 아키텍처 및 도메인 매커니즘 매핑 (Architecture Mapping)**:
    *   섹션은 기존 도메인 컴포넌트를 정식 prop으로 결합하며, 날코딩 래퍼를 신설하지 않습니다. (세부 규격은 `doc/guide/PROMPT_DESIGN_ANALYSIS_PROCESS.md` Step 3 및 각 컴포넌트 소스 참조)
        *   **`<HeroSection heroVariant="full" | "compact">`**: 페이지 최상단 히어로
        *   **`<BasicSection bg="white" | "gray">`**: 일반 본문 섹션. 상단 타이틀 + 2단 본문은 `children` 내부에 2열 배치
        *   **`<CtaSection variant="main" | "sub">`**: 하단 CTA 배너 (서비스 공통 단일 컴포넌트, 버튼은 `primaryLabel`/`secondaryLabel` + `*Href`)
    *   토큰·단위는 Gate 4를 따릅니다. 피그마 MCP URL 작업의 세부 절차(변수 추출·토큰 매핑·측정·보고)는 `figma-mcp-publish` 스킬을 따릅니다.
4.  **Step 4. PC vs Mobile 반응형 크로스 매핑 (Responsive Cross-Mapping)**:
    *   모바일 뷰포트에서 상하 스택(`column`)될 요소와 나란히 유지(`row`)되어야 하는 비교 UI(예: 비포/애프터 프레임, 트래킹 이미지 내 패널)를 사전에 분리하여 반응형 스타일을 작성합니다.
5.  **Step 5. 시각적 렌더링 캡처 및 Self-Diff 검증 (Visual Capture & Diff)**:
    *   작업 후 시안 프레임 너비 기준(PC 1440px, 모바일은 시안 너비 360·375·390px 등)으로 실제 브라우저 캡처를 수행하고 원본 시안과 1:1 대조 체크리스트를 통과한 후 작업을 마칩니다.

### Gate 6. 설계 문서 동기화 감시 (Documentation Sync)
*   아키텍처, 레이아웃, 컴포넌트 사용성 기준 등이 변경될 경우, 반드시 관련된 마스터 프롬프트 문서를 함께 업데이트해야 합니다:
    *   전체 아키텍처/라우팅: `doc/guide/PROMPT_BASE_SYSTEM.md`
    *   신규 컴포넌트 가이드 템플릿: `doc/guide/PROMPT_BASE_TEMPLATE.md`
    *   파운데이션 가이드: `doc/guide/PROMPT_GUIDE_FA_*.md`
    *   시안 분석 파이프라인: `doc/guide/PROMPT_DESIGN_ANALYSIS_PROCESS.md`
*   문서 작성 시 단순 값 나열이 아닌 **'설계 및 아키텍처 관점'**으로 정리해야 합니다.

### Gate 7. 메뉴 구조 변경 동기화 감시 (Menu Structure Sync)
*   메뉴 구조(IA)가 변경되거나 신규 페이지가 추가/삭제될 경우, **반드시 다음 4가지 요소가 함께 동기화**되었는지 감시해야 합니다.
    1. **GNB (Header 컴포넌트)**: `src/components/domain/Header/Header.tsx` (PC 및 모바일 내비게이션 메뉴 반영)
    2. **Footer 사이트맵**: `src/components/domain/Footer/Footer.tsx` (하단 카테고리별 링크 목록 반영)
    3. **가이드 대시보드 (퍼블리싱 리스트)**: `src/pages/guide/dashboard/index.tsx` (작업 현황판의 메뉴 트리 및 라우팅 경로 반영)
    4. **빈 라우팅 파일(보일러플레이트)**: `src/pages/pub/` 하위에 신규 라우트에 대응하는 `.tsx` 컴포넌트 파일 생성 (404 방지)

### Gate 8. 빌드 무결성 및 미적 완성도 감시 (Build Integrity & Aesthetics)
*   작업 완료 전 반드시 `npm run audit`(내부에서 빌드와 같은 `tsc -b` 포함)를 실행하여 FAIL·컴파일 오류 0건을 확인해야 합니다.
*   시각적 완성도: 시안이 있는 화면은 시안 재현이 최우선이며 임의로 스타일을 보강하지 않습니다. 시안이 없는 화면(가이드 페이지 등)을 만들 때만 기존 토큰 체계 안에서 완성도 있는 타이포그래피·색상·반응형을 갖춥니다.

---

## 🚨 2. 작업 완료 검증 (Audit & Self-Check)

작업을 마치기 전 아래 두 가지를 모두 통과해야 합니다.

1. **자동 감사**: `npm run audit` 실행. 1개라도 FAIL이면 작업을 마무리할 수 없으며, 위반 사항을 수정한 후 다시 통과시켜야 합니다.
   ```bash
   npm run audit
   ```
2. **수동 자가 검증**: `scripts/audit-supervisor.cjs`는 구조 규칙만 검사하므로 PASS가 곧 전체 규칙 준수를 의미하지 않습니다. 아래 수동 항목 중 이번 작업에 해당하는 것을 직접 확인합니다.

| 구분 | 항목 |
|:---|:---|
| **자동 (audit)** | 라우팅 격리, GNB 랜딩 경로, LNB 3단계, 가이드 탭 라벨, `<CodeBlock>` 매칭, 오픈 렌더링, 폰트·컬러 토큰 정의 존재, 핵심 문서 존재, TypeScript 컴파일 |
| **수동 (에이전트 자가 검증)** | Core vs Domain 판단(Gate 2) · 화면 SCSS의 컬러·타이포 하드코딩, `rem`·`svh` 단위(Gate 4) · 시안 5단계 파이프라인(Gate 5) · 시안 프레임 너비 기준 화면 대조(Gate 5 Step 5) · 문서 동기화(Gate 6) · 메뉴 4곳 동기화(Gate 7) |
