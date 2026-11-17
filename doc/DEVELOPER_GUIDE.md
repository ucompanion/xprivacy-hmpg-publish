# xPrivacy 홈페이지 개발자 인수 가이드

xPrivacy 홈페이지의 퍼블리싱 산출물을 넘겨받는 개발자를 위한 문서입니다. 구조와 규칙을 먼저 이해한 뒤, 실제 서비스 경로에 로직을 붙이는 순서로 읽으면 됩니다.

---

## 1. 프로젝트 개요

- **무엇**: AI 비식별화 솔루션 xPrivacy의 소개 홈페이지(제품·기술·기능·솔루션·데모·문의·블로그)와 디자인 시스템 가이드.
- **현재 상태**: 화면(퍼블리싱)은 `src/pages/pub/` 아래에 완성되어 있고, 서버 연동은 없는 정적 화면입니다. 실제 서비스 경로(`src/pages/`)는 비어 있습니다(`src/pages/index.tsx`는 자리표시자).
- **개발자가 할 일**: `pub` 화면을 기준으로 서비스 경로를 구성하고 API 연동, 상태 관리, 예외 처리를 붙입니다(4장).

## 2. 기술 스택

| 구분 | 내용 |
|:---|:---|
| 프레임워크 | React 19, TypeScript 6 |
| 빌드 | Vite 8 (Lightning CSS) |
| 라우팅 | `react-router-dom` 7 + `vite-plugin-pages` (파일 기반 자동 라우팅) |
| 스타일 | SCSS Modules + 전역 토큰(CSS 변수) |
| 애니메이션 | AOS (스크롤 등장 효과) |
| 아이콘 | `public/icons/sprite.svg` + `<Icon name>` 컴포넌트 (`vite-plugin-svgr`도 설정됨) |
| 배포 | Vercel (`vercel.json`: 모든 경로를 `index.html`로 rewrite, SPA) |
| 별칭 | `@` = `src` |

## 3. 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run audit    # 구조 규칙 + TypeScript 컴파일 검사 (14개 항목)
```

주요 진입 경로
- 퍼블리싱 화면: `/pub/main` 등 `/pub/...`
- 가이드·대시보드: `/guide/dashboard`, `/guide/design-system/overview`

`/guide/dashboard`에서 모든 화면의 경로와 작업 상태를 한눈에 볼 수 있습니다. 화면 목록은 이곳이 가장 정확합니다.

## 4. 폴더 구조와 협업 방식

```text
src/
├── pages/
│   ├── index.tsx            # 서비스 메인 (현재 자리표시자)
│   ├── pub/                 # 퍼블리싱 화면 (/pub/...)  ← 완성된 UI
│   │   ├── layouts/         # FrontLayout(서비스형) · DemoLayout · AOS 설정
│   │   ├── main/            # 메인 + sections/
│   │   ├── product/ technology/ features/ solutions/
│   │   ├── demo/ contact/ blog/
│   └── guide/               # 가이드 영역 (대시보드, 디자인 시스템)
├── components/
│   ├── core/                # 범용 UI (Button, Badge, Card, Modal, Form, Tabs, Accordion, Icon, Section)
│   └── domain/              # 서비스 공통 패턴 (Header, Footer, Faq, Deployment, Partner, Benefit …)
└── assets/scss/             # _variables(토큰) · _mixins · _utilities · _reset · global
public/images/<영역>/<페이지>/   # 화면별 이미지
```

**협업 원칙** (`doc/environment.md` 참고)
1. 퍼블리셔는 `src/pages/pub/`만 수정합니다.
2. 개발자는 `pub` 화면을 기준으로 `src/pages/`에 같은 구성의 파일을 만들고 로직을 결합합니다. 같은 파일을 동시에 수정하지 않으므로 충돌이 없습니다.
3. 컴포넌트·스타일·이미지는 공유합니다. 서비스 경로에서도 같은 컴포넌트를 import해 씁니다.
4. 브랜치 정의는 `doc/branches.md`를 따릅니다(`main` / `dev` / `publish`).

## 5. 라우팅

- `src/pages` 아래 파일 경로가 곧 URL입니다. `src/pages/pub/product/pricing.tsx` → `/pub/product/pricing`
- 새 페이지는 파일만 만들면 됩니다. 라우터 설정 파일은 없습니다.
- `.ts` 같은 비화면 파일도 라우트가 되므로 데이터 파일은 `components/` 아래에 둡니다.
- 메뉴(GNB)·푸터·대시보드·`pub` 파일은 한 세트입니다. 메뉴를 바꾸면 네 곳을 같이 고칩니다.
  - `src/components/domain/Header/Header.tsx` (`NAV_GROUPS`, PC 메가메뉴와 모바일 아코디언이 공유)
  - `src/components/domain/Footer/Footer.tsx`
  - `src/pages/guide/dashboard/index.tsx`
  - `src/pages/pub/` 해당 `.tsx`

## 6. 컴포넌트 설계 규칙

- **Core**: 서비스에 무관한 범용 UI. 화면에서 직접 import해 `variant`, `color`, `size` 같은 옵션으로 조합합니다.
- **Domain**: 여러 화면에서 같은 문구·정책으로 반복되는 패턴만 만듭니다. 반드시 Core를 감싸는 Preset 형태로 구현합니다. 예: `DeploymentPlans`(도입 방식 카드 4종), `FaqAccordion`, `PartnerLogoStrip`.
- 한 화면에서만 쓰는 UI는 Domain을 만들지 않고 Core를 직접 조합합니다.
- 섹션 컴포넌트(`HeroSection`, `BasicSection`, `CtaSection`)는 구조를 바꾸지 않고 props(`bg`, `layout`, `align` 등)로 씁니다.
- 컴포넌트별 사용법과 옵션은 `/guide/design-system/components/*`의 Core·Domain 탭에서 코드와 함께 확인합니다.

## 7. 스타일 규칙

- **단위**: 모든 크기는 `rem`입니다. `html { font-size: 1px }`이라 `1rem = 1px`입니다. 뷰포트 높이는 `vh` 대신 `svh`를 씁니다.
- **색상·폰트·타이포**: 값을 직접 쓰지 않고 `_variables.scss`의 토큰(`--color-text-*`, `--color-surface-*`, `--color-primary` 등)과 `_mixins.scss`의 믹스인(`text-body`, `text-section`, `text-subheading`, `text-eyebrow` 등)을 씁니다. `_deprecated.scss`의 토큰은 신규 코드에서 쓰지 않습니다.
- **`backdrop-filter`**: 표준 속성만 씁니다. `-webkit-backdrop-filter`를 같이 쓰면 프로덕션 빌드에서 표준 속성이 지워집니다.
- **Core 덮어쓰기**: Core 스타일이 페이지 SCSS보다 늦게 로드됩니다. 덮어쓸 때는 클래스를 두 번 겹쳐 씁니다(`.btn.btn`).
- **반응형**: 기준 폭은 PC 1920 시안, 모바일 390 시안. 모바일 레이아웃 전환은 768px, 폰 폭은 480px입니다. 본문 컨테이너 1240 + 좌우 거터 20.
- **줄바꿈 유틸리티**(`_utilities.scss`): 제목 줄바꿈은 시안대로 `<br>` 클래스로 제어합니다.
  - `heroMoBr`: 480px 이하에서만 줄바꿈
  - `pcBr`: PC에서만 줄바꿈
  - `splitBr` / `splitPcBr`: 2단 구성(이미지 + 텍스트)에서 1280 미만이면 해제
- **스크롤 애니메이션**: 설정은 `src/pages/pub/layouts/aos.config.ts` 한 곳에서 조정합니다. 자체 모션이 있는 섹션은 `data-aos-skip`을 붙입니다.

## 8. 이미지

- 위치: `public/images/<영역>/<페이지>/`, 코드에서는 `/images/...` 절대 경로로 참조합니다.
- 비식별 표시(블러·박스·라벨)가 들어가는 시각물은 코드로 만들지 않고 시안 그대로 내보낸 통이미지로 씁니다.
- PC/모바일이 다른 이미지는 `<picture>`의 `(max-width: 768px)` 소스로 분기합니다.
- 장식이 아닌 이미지는 의미 있는 `alt`를 넣습니다.

## 9. 개발자가 연결해야 할 부분

현재 정적 화면이라 아래는 연동되어 있지 않습니다.

- **문의 폼** (`pub/contact/inquiry.tsx`): 필수값 검사와 안내 모달까지 구현되어 있고, 검증 통과 후 전송하는 API는 없습니다. 이 화면이 유일하게 폼이 구현된 페이지입니다.
- **빈 페이지**: `pub/contact/quote`(견적문의), `demo-request`(데모 요청), `partner`(파트너)는 "빈 페이지 영역입니다" 자리표시자입니다. 화면 설계가 확정되면 `inquiry.tsx`의 구조를 참고해 만듭니다.
- **데모 화면** (`pub/demo/*`): 이미지·영상 체험 UI는 목업입니다. 실제 비식별 처리 API 연동이 필요합니다.
- **블로그** (`pub/blog/*`): 목록·상세는 `pub/blog/components/blogPosts.ts`의 정적 데이터입니다. 콘텐츠 소스(CMS/API) 결정이 필요합니다.
- **서비스 경로**: `pub`과 같은 구성으로 `src/pages/`에 페이지를 만들고, 공통 레이아웃(`FrontLayout`)을 재사용합니다.
- **SEO·분석**: 페이지별 title/description/OG와 추적 코드는 아직 없습니다.

## 10. 품질 점검

작업을 마칠 때마다 다음을 실행합니다.

```bash
npm run audit    # 라우팅 격리, 토큰, 가이드 규칙, tsc 컴파일 등 14개 항목. FAIL 0건이어야 함
npm run build
```

`audit`은 구조 규칙만 검사합니다. 컬러·타이포 하드코딩, `rem`·`svh` 사용, 시안 대조 같은 항목은 직접 확인합니다.

## 11. 참고 문서

| 문서 | 내용 |
|:---|:---|
| `AGENTS.md` | 작업 규칙 8개 게이트(라우팅, 컴포넌트 판단, 토큰, 시안 파이프라인, 문서 동기화, 메뉴 동기화, 빌드) |
| `doc/environment.md` | 초기 환경 설정, 퍼블리싱·개발 분리 구조 |
| `doc/branches.md` | 브랜치 전략 |
| `doc/svg_icon_guide.md` | SVG 아이콘 처리 전략 비교 기획안 |
| `doc/guide/PROMPT_BASE_SYSTEM.md` | 가이드 영역 아키텍처, 컴포넌트 생성 원칙 |
| `doc/guide/PROMPT_BASE_TEMPLATE.md` | 컴포넌트 가이드 페이지 표준 양식 |
| `doc/guide/PROMPT_DESIGN_ANALYSIS_PROCESS.md` | 시안 → 화면 퍼블리싱 절차 |
| `doc/guide/PROMPT_GUIDE_FA_*.md` | Colors / Typography / Elevator / Utilities 파운데이션 규칙 |
| `.claude/skills/xprivacy-figma-publish/` | 피그마 시안 반영 규칙 |

> `doc/environment.md`와 `doc/svg_icon_guide.md`는 초기 기획 시점의 내용을 포함합니다. 현재 기준은 이 문서와 코드가 우선입니다(예: 아이콘은 스프라이트 방식으로 확정, 빌드는 Vite 8).
