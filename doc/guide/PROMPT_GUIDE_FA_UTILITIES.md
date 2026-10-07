# 디자인 시스템 Utilities 가이드 생성 프롬프트

> **⚠️ [필수 참조: Foundation Data]**
> 본 가이드 문서의 데모 데이터(간격, 단위 등)는 예시일 뿐입니다. 실제 컴포넌트, 가이드 렌더링, 변수 매핑을 진행할 때는 **반드시 `PROMPT_FOUNDATION_DATA.md` (단일 진실 공급원)의 실제 데이터를 최우선으로 참조**하여 작업하십시오.

- **공통 뼈대**: 반드시 `PROMPT_BASE_TEMPLATE.md`에 정의된 마스터 템플릿 규칙(메뉴 분류, `// @ts-nocheck`, `<GuideSection>`, `<CodeBlock>` 등)을 최우선으로 준수합니다.
- **개별 구성**: 새로운 공통 유틸리티 클래스(Utility Classes)를 추가하거나 가이드 페이지를 갱신할 때는 아래의 개별 규칙과 뼈대 구조를 활용합니다.

## 📝 Utilities 가이드 작성 규칙
1. **파일 경로**: `src/pages/pub/guide/utilities/index.tsx`
2. **스타일 재사용**: `src/pages/pub/guide/template.module.scss`에 정의된 공통 클래스들을 적극 재사용하여 통일감을 줍니다.
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

## 💻 Utilities 가이드 표준 뼈대 (React Component)

```tsx
import React from 'react';
import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import GuideLayout from '../../layouts/GuideLayout';

// 가이드 블록 렌더링용 공통 내부 컴포넌트
const UtilityBlock = ({ title, classNameText, children, description }: any) => (
  <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
    <h4 className={styles.title_h4} style={{ marginBottom: '4px' }}>
      {title} <span style={{ color: '#3b82f6', fontSize: '14px', marginLeft: '8px' }}>.{classNameText}</span>
    </h4>
    {description && <p className={styles.description} style={{ marginBottom: '16px' }}>{description}</p>}
    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px dashed #d1d5db', minHeight: '80px' }}>
      {children}
    </div>
  </div>
);

const UtilitiesGuidePage = () => {
  return (
    <GuideLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
        <h1 className={styles.title_h1}>Utilities</h1>
        <p className={styles.description}>
          프로젝트 전역에서 공통으로 사용되는 레이아웃 및 정렬 유틸리티 클래스 모음입니다.
        </p>
      </header>

      <GuideSection title="1. Width (너비)">
          {/* UtilityBlock을 활용하여 w-{size} (px) 및 w-{size}p (%) 구현 예시 배치 */}
        
        {/* Grid, Align 등 하위 섹션 추가 */}
      </GuideSection>
    </div>
    </GuideLayout>
  );
};

export default UtilitiesGuidePage;
```