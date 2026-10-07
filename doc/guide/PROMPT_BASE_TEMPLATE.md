# 디자인 시스템 가이드 컴포넌트 생성 마스터 프롬프트

앞으로 새로운 UI 컴포넌트(예: Button, Input, Modal 등)의 가이드 페이지를 생성할 때는, 기존 결과물들을 역으로 추적하여 정립한 아래의 **3가지 핵심 관점(포지션)**을 무조건 준수하여 React 코드를 작성해 주세요.

## 🗂️ 1. 메뉴 구성 관점 (Menu Configuration Perspective)
새로운 가이드를 시스템 전체의 숲(메뉴 구조) 안에서 어디에 위치시킬 것인가에 대한 기준입니다.

*   새로운 컴포넌트를 만들면 반드시 `src/pages/pub/layouts/GuideLayout.tsx` 파일 내 `GUIDE_MENU` 배열을 찾아, **`Components` 단일 카테고리**에 하위 메뉴로 등록합니다.
    *   **Components**: 순수 재사용 Core 컴포넌트와 이를 서비스 맥락에 맞게 확장한 Domain 컴포넌트를 **메뉴로 쪼개지 않고 한 페이지에서 통합 제공**합니다. (예: `Button` 페이지 안에 기본 `Button`과 파생 도메인 버튼들(`CtaButton`, `FormSubmitButton` 등)을 함께 정리)
        *   **Core 직접 호출 원칙**: 서비스 공통이 아닌 도메인 컴포넌트를 불필요하게 생성하지 않을 경우 코어 컴포넌트를 사용합니다. 화면에서 Core 컴포넌트를 직접 import하여 속성을 조합해 즉시 사용합니다.
        *   **Domain 컴포넌트 생성 기준**: 서비스 내 여러 화면에 걸쳐 공통 업무 정책(대표 CTA, 약관 동의, 처리 상태 등)으로 반복 재사용되는 패턴인 경우에만 Core를 감싼 Preset 형태로 Domain 컴포넌트를 정의합니다.

## 🎨 2. 가이드 템플릿 디자인 관점 (Template Design Perspective)
컴포넌트를 가이드 문서에서 시각적으로 어떻게 보여주고 렌더링할 것인가에 대한 디자인 철학입니다.

*   **스타일 재사용**: `src/pages/pub/guide/template.module.scss`에 정의된 `.wrapper`, `.header`, `.preview` 등의 공통 클래스를 반드시 가져와서 일관된 문서 레이아웃을 구성합니다.
*   **오픈형 프리뷰 렌더링 (Open-Rendering)**: 사용자 화면을 시뮬레이션하는 렌더링 영역(`.preview`)은 테두리 박스나 Card 배경 등에 억지로 가두지 않습니다. 컴포넌트가 브라우저 환경에 맞게 자연스럽게(오픈형으로) 렌더링되도록 방치하는 것이 원칙입니다. (단, Form 레이아웃 등 맥락상 구분이 필요한 경우 예외)
    > **⚠️ [절대 금지 사항]**
    > AI는 컴포넌트 프리뷰 렌더링 시, 억지로 `border`, `shadow`, `bg-white`, `Card` 컴포넌트 등을 사용하여 컴포넌트를 박스 안에 가두지 마십시오. 프리뷰 컨테이너(`.preview`) 내부에는 순수하게 해당 컴포넌트만 렌더링되어야 합니다.
*   **1:1 코드 뷰 매칭**: 모든 `.preview` 영역 바로 아래에는 커스텀 컴포넌트인 `<CodeBlock>` (`src/pages/pub/guide/components/CodeBlock.tsx`)을 사용하여, 화면에 렌더링된 요소와 정확히 1:1로 매칭되는 코드를 제공해야 합니다. (더 이상 `div.code_view`를 사용하지 않습니다.)

## 📝 3. 컴포넌트 기본 가이드 포맷 관점 (Guide Format Perspective)
실제 컴포넌트 페이지(`.tsx`) 내부의 마크업 구조와 필수 스펙을 어떻게 짜임새 있게 작성할 것인가에 대한 룰입니다.

*   **컴파일 에러 방지**: 파일의 최상단 1번째 줄에는 반드시 `// @ts-nocheck` 주석을 삽입하여 불필요한 빌드 에러를 사전에 차단합니다.
*   **접기/펼치기 구조**: 페이지 본문의 모든 H2 섹션은 반드시 `<GuideSection>` 컴포넌트로 감싸서 아코디언처럼 접고 펼칠 수 있게 만들어야 합니다.
*   **Tabs 기반 Core / Domain 분리 (넘버링 충돌 방지)**:
    *   도메인 파생 컴포넌트가 존재하는 경우, **`<Tabs>`를 사용하여 `Core` 탭과 `Domain` 탭으로 분리**합니다. (탭 라벨에 불필요한 괄호를 넣지 않고 심플하게 `Core`와 `Domain`으로 표기)
    *   이를 통해 Core 스펙이 향후 확장되어 섹션이 추가되더라도 넘버링이 꼬이지 않고, 각 탭 내에서 독립적인 넘버링(1., 2., 3...) 체계를 유지합니다.
    *   **Core 탭 기본 흐름**:
        1.  **Overview & Specs**: 컴포넌트의 목적과 핵심 속성(Props) 표기.
        2.  **Basic Usage**: 가장 기본적이고 뼈대가 되는 디폴트 렌더링.
        3.  **Variants & States**: 크기, 색상, 비활성화 등 실무에서 쓰이는 다양한 옵션 변화 나열.
    *   **Domain 탭 기본 흐름 (도메인 컴포넌트 단위 넘버링 & 하위 스펙/샘플 구조)**:
        *   대분류 섹션(`GuideSection`)은 **개별 도메인 컴포넌트 단위**(`1. [DomainComponent 1]`, `2. [DomainComponent 2]` 등)로 넘버링합니다.
        *   스펙과 샘플을 상위 섹션 번호로 분리하지 않고, 각 도메인 섹션 내부에서 반드시 **하위 섹션(`h3`)**으로 나누어 작성합니다:
            *   `x.1. Specs`: 해당 도메인 컴포넌트의 Props 명세 및 디자인/기능 정책
            *   `x.2. Usage`: 오픈형 프리뷰 및 1:1 매칭 `<CodeBlock>`
    *   (※ 단, 도메인 파생 컴포넌트가 없는 순수 코어 컴포넌트의 경우 탭 없이 Core 흐름을 단독 렌더링합니다.)

---

## 💻 [부록] 가이드 페이지 마스터 뼈대 (Boilerplate)

AI는 새로운 컴포넌트 생성 시 위 3가지 관점이 모두 완벽하게 녹아든 아래의 코드를 복사하여, 컴포넌트명과 내용만 교체하여 작성하십시오.

```tsx
// @ts-nocheck
import React from 'react';
import styles from './template.module.scss';
import { GuideSection } from './components/GuideSection';
import { CodeBlock } from './components/CodeBlock';
import { Tabs } from '@/components/core/Tabs/Tabs';

// TODO: 컴포넌트 import (Core 및 Domain)

const [ComponentName]GuidePage = () => {
  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          {/* 1. 컴포넌트 스펙 및 사용법 (Overview) */}
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              컴포넌트의 핵심 속성(Props)과 기본 사용법을 안내합니다.
            </p>
            <div className={styles.spec_table_wrapper}>
              <table className={styles.spec_table}>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'solid' | 'outline'</code></td>
                    <td><code>'solid'</code></td>
                    <td>속성에 대한 설명을 기재합니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.guideline}>
              <strong>Guideline:</strong> 디자인 및 레이아웃 사용 정책을 작성합니다.
            </div>
          </GuideSection>

          {/* 2. 디폴트 렌더링 (Basic Usage) */}
          <GuideSection title="2. Basic Usage">
            <p className={styles.description}>
              가장 기본이 되는 디폴트 상태의 렌더링입니다.
            </p>
            <div className={styles.preview}>
              {/* 실제 컴포넌트 렌더링 영역 */}
            </div>
            <CodeBlock code={`<[ComponentName]>Action</[ComponentName]>`} />
          </GuideSection>

          {/* 3. 옵션 및 상태 변화 (Variants & States) */}
          <GuideSection title="3. Variants & States" defaultOpen={false}>
            <p className={styles.description}>
              크기, 색상, 비활성화 등 다양한 옵션과 상태 변화를 나열합니다.
            </p>
            <div className={styles.preview}>
              {/* 변형 렌더링 영역 */}
            </div>
            <CodeBlock code={`<[ComponentName] size="sm">Small</[ComponentName]>`} />
          </GuideSection>
        </>
      )
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          {/* 도메인 컴포넌트 단위 넘버링 (1. [도메인컴포넌트명]) */}
          <GuideSection title="1. [DomainComponentName]">
            <p className={styles.description}>
              실제 서비스 화면 및 업무 정책에 맞춰 완성된 서비스 전용 컴포넌트 안내입니다.
            </p>

            {/* 하위 섹션: 1.1. Specs */}
            <div className={styles.sub_section}>
              <h3 className={styles.title_h3}>1.1. Specs</h3>
              <div className={styles.spec_table_wrapper}>
                <table className={styles.spec_table}>
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>type</code></td>
                      <td><code>string</code></td>
                      <td>-</td>
                      <td>도메인 특화 속성 설명</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 하위 섹션: 1.2. Usage */}
            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>1.2. Usage</h3>
              <div className={styles.preview}>
                {/* 도메인 컴포넌트 렌더링 영역 */}
              </div>
              <CodeBlock code={`<[DomainComponentName] />`} />
            </div>
          </GuideSection>
        </>
      )
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* 가이드 헤더 영역 (H1) */}
      <header className={styles.header}>
        <h1 className={styles.title_h1}>[Component Name]</h1>
        <p className={styles.description}>
          컴포넌트의 역할과 사용 목적을 명확하게 설명합니다.
        </p>
      </header>

      {/* Core 및 Domain 탭 분리 */}
      <Tabs items={tabItems} defaultActiveId="core" />
    </div>
  );
};

export default [ComponentName]GuidePage;
```

---

## 🎨 [부록] 가이드 공통 스타일 명세 및 환경별 적용 가이드

AI가 제로베이스에서 프로젝트를 세팅할 때, **가이드 템플릿의 디자인(여백, 폰트 크기, 레이아웃 등)은 절대 임의로 상상해서 만들지 마십시오.** 
아래 제공된 원본 SCSS 코드는 디자인 의도가 완벽하게 반영된 기준 스펙(Spec)입니다. `environment.md`에 명시된 스타일링 환경에 따라 아래와 같이 분기하여 적용하십시오.

- **SCSS 환경인 경우**: 아래 SCSS 코드를 한 글자도 빠짐없이 100% 복사하여 `src/pages/pub/guide/template.module.scss` 파일로 생성합니다.
- **Tailwind CSS 환경인 경우**: 아래 SCSS 코드를 '디자인 스펙 가이드'로 간주하고, 해당 코드에 명시된 레이아웃(flex), 간격(gap, margin, padding), 색상 등을 **Tailwind 유틸리티 클래스로 완벽하게 변환하여 React 컴포넌트에 적용**합니다. 변환 후의 시각적 결과물은 원본 SCSS가 적용된 화면과 100% 동일해야 합니다.

```scss
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.title_h1 {
  font-size: var(--font-size-h1);
  line-height: var(--font-line-height-h1);
  font-weight: 800;
  color: var(--color-gray-900);
}

.title_h2 {
  font-size: var(--font-size-h3);
  line-height: var(--font-line-height-body);
  font-weight: 700;
  color: var(--color-gray-900);
  transition: color 0.2s ease;
}

.title_h3 {
  font-size: var(--font-size-h4);
  line-height: var(--font-line-height-body);
  font-weight: 500;
  color: var(--color-gray-800);
  margin-bottom: var(--spacing-md);
}

.title_h4 {
  font-size: var(--font-size-title-md);
  line-height: var(--font-line-height-body);
  font-weight: 500;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-sm);
}

.description {
  font-size: var(--font-size-body-md);
  color: var(--color-gray-600);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid var(--color-gray-200);
  padding-bottom: var(--spacing-sm);
  user-select: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-bottom-color: var(--color-primary-300);

    .title_h2 {
      color: var(--color-primary-600);
    }

    svg {
      color: var(--color-primary-600);
    }
  }

  svg {
    color: var(--color-gray-400);
    transition: color 0.2s ease;
  }
}

@keyframes section_fade_in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section_content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  animation: section_fade_in 0.3s ease;
}

.sub_section {
  display: flex;
  flex-direction: column;
}

.detail_section {
  padding-left: var(--spacing-md);
  border-left: 4px solid var(--color-gray-200);
}

.guideline {
  padding: var(--spacing-md);
  background-color: var(--color-primary-50);
  border-radius: var(--radius);
  font-size: var(--font-size-body-sm);
  color: var(--color-gray-700);

  strong {
    color: var(--color-primary-600);
    margin-right: var(--spacing-xs);
  }
}

.content {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  background-color: var(--color-gray-50);
  border-radius: var(--radius);
  border: 1px solid var(--color-gray-200);
}

.preview {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  width: 100%;
  min-height: 120px;
  padding: var(--spacing-lg) 0;
  align-items: center;
  justify-content: center;

  > * {
    max-width: 100%;
  }

  > div, > form, > table, > ul {
    flex-shrink: 0;
  }
}

.preview_center {
  @extend .preview;
  align-items: center;
  justify-content: center;
}

.preview_column {
  @extend .preview;
  flex-direction: column;
  align-items: stretch;
}

.preview+.code_block_wrapper,
.preview_center+.code_block_wrapper,
.preview_column+.code_block_wrapper {
  margin-top: var(--spacing-md);
}

.code_block_wrapper {
  margin-top: var(--spacing-md);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius);
  overflow: hidden;
}

.code_block_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-gray-50);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-gray-100);
  }

  svg {
    color: var(--color-gray-500);
  }
}

.code_toggle_btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: none;
  border: none;
  padding: 0;
  font-size: var(--font-size-label-md);
  font-weight: 600;
  color: var(--color-gray-700);
  cursor: pointer;

  .code_toggle_icon {
    color: var(--color-primary-500);
  }
}

.code_view {
  background-color: var(--color-gray-800);
  padding: var(--spacing-md) 20px;
  overflow-x: auto;
  border-top: 1px solid var(--color-gray-200);

  pre,
  code {
    margin: 0;
    padding: 0;
    font-family: monospace;
    font-size: var(--font-size-label-lg);
    color: var(--color-gray-100);
    line-height: 1.6;
  }
}

.spec_table_wrapper {
  overflow-x: auto;
  border-radius: var(--radius);
  border: 1px solid var(--color-gray-200);
}

.spec_table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-body-sm);
  text-align: left;

  th,
  td {
    padding: var(--spacing-sm) 16px;
    border-bottom: 1px solid var(--color-gray-200);
  }

  th {
    background-color: var(--color-gray-50);
    font-weight: 600;
    color: var(--color-gray-700);
  }

  td {
    color: var(--color-gray-600);

    code {
      background-color: var(--color-gray-100);
      padding: 2px 6px;
      border-radius: calc(var(--radius) - 4px);
      font-family: monospace;
      color: var(--color-primary-600);
      font-size: var(--font-size-label-md);
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
}
```