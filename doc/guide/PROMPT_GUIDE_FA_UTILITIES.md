# 디자인 시스템 Utilities 가이드 생성 프롬프트

> **⚠️ [필수 참조: 실제 토큰]**
> 본 가이드 문서의 데모 데이터(간격, 단위 등)는 예시일 뿐입니다. 실제 가이드 렌더링과 변수 매핑은 **반드시 `src/assets/scss/_variables.scss`(토큰)와 `_mixins.scss`(텍스트 스타일)의 실제 값**을 기준으로 작업하십시오. (`PROMPT_FOUNDATION_DATA.md`는 최초 설계 기록입니다.)

- **공통 뼈대**: 반드시 `PROMPT_BASE_TEMPLATE.md`에 정의된 마스터 템플릿 규칙(메뉴 분류, `// @ts-nocheck`, `<GuideSection>`, `<CodeBlock>` 등)을 최우선으로 준수합니다.
- **개별 구성**: 새로운 공통 유틸리티 클래스(Utility Classes)를 추가하거나 가이드 페이지를 갱신할 때는 아래의 개별 규칙과 뼈대 구조를 활용합니다.

## 📝 Utilities 가이드 작성 규칙
1. **파일 경로**: `src/pages/guide/design-system/utilities/index.tsx`
2. **스타일 재사용**: `src/pages/guide/design-system/template.module.scss`에 정의된 공통 클래스들을 적극 재사용하여 통일감을 줍니다.
3. **핵심 내용 필수 포함**: 전역적으로 사용하는 레이아웃과 정렬 관련 유틸리티 클래스 위주로 설명합니다.
   - **Width**: 고정값(px)과 퍼센트(%) 단위를 구분하여 제공합니다.
     - **표기 규칙**: 고정값은 `w-{size}`, 퍼센트는 `w-{size}p`
     - **사이즈 스케일**:
       - `0~100`: 10 단위 (예: w-10, w-20 ... w-100)
       - `100~200`: 20 단위 (예: w-120, w-140 ... w-200)
       - `200~500`: 40 단위 (예: w-240, w-280 ... w-500)
       - `500~`: 필요 시 사용자 정의 커스텀 추가
   - **Grid**: `grid`, `col`, `row` (레이아웃 분할 및 배치)
   - **Text & Box Align**: `align-t`, `align-r`, `align-b`, `align-l`, `align-m` (위, 오른쪽, 아래, 왼쪽, 중앙 정렬)

---

## 💻 기준 구현
코드는 이 문서에 복사해 두지 않고 실제 페이지 `src/pages/guide/design-system/utilities/index.tsx`를 기준으로 합니다. (구성: Width · Grid Layout · Alignment 3개 섹션, 클래스 원본은 `src/assets/scss/_utilities.scss`)
