# 디자인 시스템 컬러 가이드 생성 프롬프트

> **⚠️ [필수 참조: 실제 토큰]**
> 본 가이드 문서의 데모 데이터(컬러값 등)는 예시일 뿐입니다. 실제 가이드 렌더링과 변수 매핑은 **반드시 `src/assets/scss/_variables.scss`(토큰)와 `_mixins.scss`(텍스트 스타일)의 실제 값**을 기준으로 작업하십시오. (`PROMPT_FOUNDATION_DATA.md`는 최초 설계 기록입니다.)

- **공통 뼈대**: `PROMPT_BASE_TEMPLATE.md`의 마스터 템플릿 규칙(메뉴 분류, `<GuideSection>`, `<CodeBlock>` 등)을 최우선으로 준수합니다.
- **기준 구현**: 코드는 이 문서에 복사해 두지 않고 실제 페이지 `src/pages/guide/design-system/colors/index.tsx`를 기준으로 합니다.

## 📝 컬러 가이드 작성 규칙
1. **파일 경로**: `src/pages/guide/design-system/colors/index.tsx`
2. **스타일 재사용**: `src/pages/guide/design-system/template.module.scss`(공통)와 `src/pages/guide/design-system/colors/colors.module.scss`(컬러 행 전용)의 클래스를 재사용합니다.
3. **구성**: `_variables.scss`의 **v2 시맨틱 토큰**을 용도별 4개 섹션으로 보여 줍니다. ① Text Colors(위계 3단계 · 대비 예외) ② Brand & Text Accent ③ Surface(배경) ④ Border(외곽선). 50~900 명도 스케일 방식은 쓰지 않습니다. `--color-gray-*` 등 `_deprecated.scss` 토큰은 신규로 노출하지 않습니다.
4. **컴포넌트 분리**: 토큰 한 줄(토큰명 · 변수 · HEX · 용도 · 샘플)은 파일 상단의 내부 컴포넌트 `ColorRow`로 분리해 반복 렌더링합니다.
5. **섹션 래핑**: 섹션은 `GuideSection`으로 감싸 접고 펼칠 수 있게 합니다.
