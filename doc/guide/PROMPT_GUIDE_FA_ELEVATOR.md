# 디자인 시스템 Shadow Scales 가이드 생성 프롬프트

> **⚠️ [필수 참조: 실제 토큰]**
> 본 가이드 문서의 데모 데이터(그림자 값, Z-index 등)는 예시일 뿐입니다. 실제 가이드 렌더링과 변수 매핑은 **반드시 `src/assets/scss/_variables.scss`(토큰)와 `_mixins.scss`(텍스트 스타일)의 실제 값**을 기준으로 작업하십시오. (`PROMPT_FOUNDATION_DATA.md`는 최초 설계 기록입니다.)

- **공통 뼈대**: 반드시 `PROMPT_BASE_TEMPLATE.md`에 정의된 마스터 템플릿 규칙(메뉴 분류, `// @ts-nocheck`, `<GuideSection>`, `<CodeBlock>` 등)을 최우선으로 준수합니다.
- **개별 구성**: 새로운 그림자 깊이(Elevation)와 Z-index 옵션을 추가하거나 확인하기 위한 가이드 페이지를 작성할 때는 아래의 개별 규칙과 뼈대 구조를 활용합니다.

## 📝 Shadow Scales 가이드 작성 규칙
1. **파일 경로**: `src/pages/guide/design-system/elevator/index.tsx`
2. **스타일 재사용**: `src/pages/guide/design-system/template.module.scss` 및 `elevator.module.scss`를 사용하여 고유의 엘리베이터 블록 스타일과 Z-index 테이블 스타일을 적용합니다.
3. **섹션 래핑**: `GuideSection`을 사용하여 접고 펼치기를 지원합니다.
4. **5단계 스케일 및 예시 표기**: `--elevator-none`부터 `--elevator-4`까지 깊이감을 점진적으로 시각화합니다. 
   각 단계가 주로 사용되는 단위 예시(Element, Group, Layer, Overlay 등)를 표기하여 이해를 돕습니다.
   예시 블록들은 반드시 창 크기에 맞춰 유연하게 줄어들더라도 **한 줄(1 Row)**로 렌더링되도록 `flex-wrap: nowrap`과 `flex: 1`을 적용합니다.
5. **컴포넌트 분리**: 단일 그림자 카드를 렌더링하는 요소는 파일 상단에 `ElevatorBlock`이라는 내부 컴포넌트로 분리하여 재사용합니다.
6. **Z-index 가이드**: Z-index 설계 규칙(여유 공간 확보 전략)과 각 레벨(Element, Group, Layout, Modal 등)별 변수(`--zindex-*`) 매핑 테이블을 하단 섹션으로 필수로 포함합니다.

---

## 💻 기준 구현
코드는 이 문서에 복사해 두지 않고 실제 페이지 `src/pages/guide/design-system/elevator/index.tsx`를 기준으로 합니다. (구성: Shadow Scales · Z-index Scales 2개 섹션)
