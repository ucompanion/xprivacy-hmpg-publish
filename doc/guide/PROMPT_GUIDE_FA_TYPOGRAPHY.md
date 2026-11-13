# 디자인 시스템 타이포그래피 가이드 생성 프롬프트 (Typography Architecture)

> **⚠️ [필수 참조: 실제 토큰]**
> 본 가이드 문서의 데모 데이터(폰트명, 사이즈 등)는 예시일 뿐입니다. 실제 가이드 렌더링과 변수 매핑은 **반드시 `src/assets/scss/_variables.scss`(토큰)와 `_mixins.scss`(텍스트 스타일)의 실제 값**을 기준으로 작업하십시오. (`PROMPT_FOUNDATION_DATA.md`는 최초 설계 기록입니다.)

본 문서는 xPrivacy 디자인 시스템의 **서체 체계(Font Family Architecture)** 및 **타이포그래피 스케일 가이드**를 설계하고 생성할 때 준수해야 하는 **설계 관점의 핵심 아키텍처 지침**입니다.

---

## 🏛️ 1. 서체 시스템 설계 원칙 (Architectural Principles)

가이드 작성 및 실제 화면 개발 시, 특정 폰트명을 임의로 나열하거나 하드코딩하지 않고 아래의 3대 설계 원칙을 반드시 준수합니다.

### A. 역할 기반 서체 이원화 설계 (Role-based Separation)
*   **단일 메인 서체 원칙 (Primary UI)**: 
    *   다양한 웹폰트 혼용 시 발생하는 네트워크 오버헤드, 폰트 렌더링 깜빡임(FOIT/FOUT), 서체 간 베이스라인 불일치를 원천 차단하기 위해, **일반 UI 전반은 단 1개의 메인 가변(Variable) 서체로 일원화**하여 설계합니다. (한국어뿐만 아니라 영문/숫자까지 해당 서체의 내장 글꼴로 조화롭게 통합)
*   **기술 데이터 전용 등폭 서체 분리 (Monospace)**:
    *   글자 폭(Character width)이 균일해야만 가독성과 열 정렬이 유지되는 **소스코드(`<pre>`, `<code>`), 시스템 키값, 암호화 토큰 표기 영역에 한해서만 등폭 서체(Monospace)를 보조로 분리**하여 설계합니다.

### B. 디자인 토큰 추상화 설계 (Token Abstraction)
*   모든 컴포넌트와 화면 CSS/SCSS에서는 특정 폰트명(Family Name)을 직접 명시하지 않습니다.
*   반드시 시스템 전역 디자인 토큰으로 추상화된 **CSS 변수(`var(--font-family-base)`, `var(--font-family-mono)`)**를 참조하도록 설계하여, 향후 브랜드 서체 변경 시 전체 시스템이 유연하게 대응할 수 있도록 합니다.

### C. 가이드 문서 구성 (Document Structure)
현재 가이드 페이지는 3개 섹션입니다.
1.  **서체 원칙 및 토큰 (Font Family)**: 서체 패밀리의 역할 구분(Primary vs Monospace), 매핑된 CSS 변수, Fallback 스택, 적용 대상.
2.  **타이포그래피 스케일 (PC & Mobile 1:1)**: 피그마 텍스트 스타일에 대응하는 믹스인(`text-hero` · `text-section` · `text-subheading` · `text-body` · `text-eyebrow` · `text-note` 등, `_mixins.scss`)을 PC·모바일 스펙과 함께 나열합니다. 각 요소는 파편화된 CSS 변수가 아니라 **크기·굵기·줄간격이 묶인 믹스인**을 호출합니다.
3.  **중요도에 따른 적용 예시 (Usage & Composition)**: 실제 화면 조합 예시.

---

## 📝 2. 타이포그래피 가이드 작성 규칙

1.  **파일 경로**: `src/pages/guide/design-system/typography/index.tsx`
2.  **스타일**: `src/pages/guide/design-system/template.module.scss`(공통)와 `src/pages/guide/design-system/typography/typography.module.scss`(전용)의 클래스를 재사용합니다.
3.  **컴포넌트 분리**: 개별 텍스트 스타일 한 칸은 파일 상단의 내부 컴포넌트 `TypeCard`로 분리해 반복 렌더링합니다.

---

## 💻 기준 구현
코드는 이 문서에 복사해 두지 않고 실제 페이지 `src/pages/guide/design-system/typography/index.tsx`를 기준으로 합니다.
