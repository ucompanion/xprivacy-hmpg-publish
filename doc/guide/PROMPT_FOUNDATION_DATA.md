# xPrivacy Foundation Data (Single Source of Truth)

이 문서는 xPrivacy 디자인 시스템의 **실제 Foundation 데이터(Variables, Tokens, Scales)**를 정의하는 단일 진실 공급원(Single Source of Truth)입니다.
앞으로 가이드 화면용 프롬프트(`PROMPT_GUIDE_FA_*.md`), 결과 페이지, 그리고 `_variables.scss`는 모두 이 문서에 정의된 값을 최우선 기준으로 동기화되어야 합니다.

---

## 1. Colors (색상)

### 시맨틱 컬러 스케일 (50 ~ 900)
- **Primary (Blue, 브랜드/주요 액션)**
  - 50: `#f2f5ff`, 100: `#e5ebff`, 200: `#cbd7ff`, 300: `#9baeff`, 400: `#6b85ff`
  - 500 (Main): `#3b5bff`
  - 600: `#2844d9`, 700: `#182fb3`, 800: `#0b1c8c`, 900: `#040d66`

- **Secondary (Slate, 중립/보조)**
  - 50: `#effdff`, 100: `#dffaff`, 200: `#beecff`, 300: `#93daff`, 400: `#68c9ff`
  - 500 (Main): `#3db7ff`
  - 600: `#2299d9`, 700: `#0e7cb3`, 800: `#03618c`, 900: `#004766`

- **Success (Emerald, 성공/긍정)**
  - 50: `#ecfdf5`, 100: `#d1fae5`, 200: `#a7f3d0`, 300: `#6ee7b7`, 400: `#34d399`
  - 500 (Main): `#10b981`
  - 600: `#059669`, 700: `#047857`, 800: `#065f46`, 900: `#064e3b`

- **Danger (Red, 위험/에러)**
  - 50: `#fef2f2`, 100: `#fee2e2`, 200: `#fecaca`, 300: `#fca5a5`, 400: `#f87171`
  - 500 (Main): `#ef4444`
  - 600: `#dc2626`, 700: `#b91c1c`, 800: `#991b1b`, 900: `#7f1d1d`

- **Warning (Amber, 경고/주의)**
  - 50: `#fffbeb`, 100: `#fef3c7`, 200: `#fde68a`, 300: `#fcd34d`, 400: `#fbbf24`
  - 500 (Main): `#f59e0b`
  - 600: `#d97706`, 700: `#b45309`, 800: `#92400e`, 900: `#78350f`

- **Neutral / Gray (무채색/배경/텍스트)**
  - 50: `#f8f9fa`, 100: `#f1f3f4`, 200: `#e8eaed`, 300: `#dadce0`, 400: `#bdc1c6`
  - 500 (Main): `#9ea3a8`
  - 600: `#80868b`, 700: `#5e6367`, 800: `#3c4043`, 900: `#1e2021`
  - (Black: `#000000`, White: `#ffffff`)

---

## 2. Typography (타이포그래피)

### 서체 패밀리 (Font Family)
- **Primary UI (var(--font-family-base))**: `'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`
- **Monospace (var(--font-family-mono))**: `Consolas, Monaco, 'Courier New', monospace`

### 타이포그래피 스케일 및 믹스인 (텍스트 위계)
서브화면을 기준으로 정의된 피그마 디자인 시스템을 따릅니다. 사이즈, 굵기, 줄간격은 한 번에 묶어서 SCSS Mixin(`@mixin text-[category]-[style]`)으로 사용합니다. 모든 크기 단위는 `rem` (1rem = 1px 기준)입니다. 메인 페이지에만 사용되는 예외 텍스트는 가이드에 포함하지 않고 수동 처리합니다.

- **Display**
  - Hero: `@mixin text-display-hero` (64px, 700(Bold), LH 1.2)
- **Heading**
  - Section: `@mixin text-heading-section` (50px, 700(Bold), LH 1.2)
  - Card: `@mixin text-heading-card` (28px, 700(Bold), LH 1.4)
  - Item: `@mixin text-heading-item` (20px, 700(Bold), LH 1.4)
  - Item-Small: `@mixin text-heading-item-small` (16px, 700(Bold), LH 1.4)
- **CTA**
  - Heading: `@mixin text-cta-heading` (50px, 600(SemiBold), LH 1.2)
- **Label**
  - Eyebrow: `@mixin text-label-eyebrow` (12px, 800(ExtraBold), LH 1.5)
  - Number: `@mixin text-label-number` (12px, 400(Regular), LH 1.5)
- **Body**
  - Lead: `@mixin text-body-lead` (16px, 400(Regular), LH 1.75)
  - Small: `@mixin text-body-small` (14px, 400(Regular), LH 1.75)
  - Caption: `@mixin text-body-caption` (12px, 400(Regular), LH 1.5)

---

## 3. Elevator (그림자 및 깊이)

### Shadow Scales (박스 섀도우)
- **Level 0 (None)**: `--elevator-none: none;`
- **Level 1 (Element)**: `--elevator-1: 0 1rem 2rem 0 rgba(0, 0, 0, 0.05);`
- **Level 2 (Group)**: `--elevator-2: 0 4rem 6rem -1rem rgba(0, 0, 0, 0.1), 0 2rem 4rem -1rem rgba(0, 0, 0, 0.06);`
- **Level 3 (Layer)**: `--elevator-3: 0 10rem 15rem -3rem rgba(0, 0, 0, 0.1), 0 4rem 6rem -2rem rgba(0, 0, 0, 0.05);`
- **Level 4 (Overlay)**: `--elevator-4: 0 20rem 25rem -5rem rgba(0, 0, 0, 0.1), 0 10rem 10rem -5rem rgba(0, 0, 0, 0.04);`

### Z-Index Scales (Z축 순서)
- `--zindex-element`: 1
- `--zindex-group`: 10
- `--zindex-layout`: 100
- `--zindex-layer`: 200
- `--zindex-backdrop`: 1000
- `--zindex-modal`: 1200
- `--zindex-popover`: 1300
- `--zindex-datepicker`: 1400
- `--zindex-tooltip`: 1500
- `--zindex-toast`: 9999

---

## 4. Utilities (간격 및 공통 단위)

### Spacing (여백 스케일)
- `--spacing-xs`: `4rem`
- `--spacing-sm`: `8rem`
- `--spacing-md`: `16rem`
- `--spacing-lg`: `24rem`
- `--spacing-xl`: `32rem`
- `--spacing-2xl`: `40rem`

### Border Radius (테두리 곡률)
- `--radius`: `8rem`
