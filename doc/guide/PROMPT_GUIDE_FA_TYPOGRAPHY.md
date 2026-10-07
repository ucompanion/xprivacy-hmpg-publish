# 디자인 시스템 타이포그래피 가이드 생성 프롬프트 (Typography Architecture)

> **⚠️ [필수 참조: Foundation Data]**
> 본 가이드 문서의 데모 데이터(폰트명, 사이즈 등)는 예시일 뿐입니다. 실제 컴포넌트, 가이드 렌더링, 변수 매핑을 진행할 때는 **반드시 `PROMPT_FOUNDATION_DATA.md` (단일 진실 공급원)의 실제 데이터를 최우선으로 참조**하여 작업하십시오.

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

### C. 가이드 문서 계층 구조 설계 (Document Structure)
*   **도입부 (1. Font Family Architecture)**: 
    *   가이드 최상단에는 서체의 구체적인 크기를 논하기 전, 시스템이 채택한 **서체 패밀리의 역할 구분(Primary vs Monospace), 매핑된 CSS 변수, Fallback 스택, 적용 대상을 카드로 조망**할 수 있는 아키텍처 섹션을 반드시 배치합니다.
*   **위계별 텍스트 스케일 (2~6번 섹션)**: 
    *   사용 목적에 따라 **Display, Heading, CTA, Label, Body**의 5단계 분류 체계로 명확히 계층화하여 제공합니다.
    *   **Mixin 사용 정책**: 각 타이포그래피 요소는 파편화된 CSS 변수 대신 **사이즈, 굵기, 줄간격이 하나로 묶인 SCSS Mixin(`@mixin text-[category]-[style]`)**을 호출하여 사용합니다. 메인 페이지에만 사용되는 예외 서체는 가이드에 포함하지 않습니다.

---

## 📝 2. 타이포그래피 가이드 작성 규칙

1.  **파일 경로**: `src/pages/pub/guide/typography/index.tsx`
2.  **스타일 모듈**: `src/pages/pub/guide/typography/typography.module.scss` 내 전용 클래스(`.font_grid`, `.font_card`, `.font_policy_box`, `.row` 등)를 재사용합니다.
3.  **컴포넌트 분리**: 개별 텍스트 스케일 행은 내부 컴포넌트(`TypeRow`)로 모듈화하여 일관된 명세(크기/두께/샘플)를 렌더링합니다.

---

## 💻 3. 타이포그래피 가이드 표준 뼈대 (Boilerplate)

```tsx
import React from 'react';
import baseStyles from '../template.module.scss';
import styles from './typography.module.scss';
import { GuideSection } from '../components/GuideSection';
import GuideLayout from '../../layouts/GuideLayout';

// 단일 타이포그래피 스펙 렌더링을 위한 공통 행 컴포넌트
const TypeRow = ({ name, mixinName, size, weight, lh, sample }: { name: string; mixinName: string; size: number; weight: number; lh: string; sample: string }) => (
  <div className={styles.row}>
    <div className={styles.meta}>
      <span className={styles.name}>{name}</span>
      <span className={styles.mixin_name} style={{ display: 'block', fontSize: '12px', color: '#3b82f6', marginTop: '4px' }}>
        @include {mixinName};
      </span>
      <span className={styles.spec}>
        {size}px / W{weight} / LH {lh}
      </span>
    </div>
    <div
      className={styles.sample}
      style={{ fontSize: `${size}px`, fontWeight: weight, lineHeight: lh === 'Auto' ? 1.4 : lh }}
    >
      {sample}
    </div>
  </div>
);

const TypographyGuidePage = () => {
  const sampleText = 'The quick brown fox jumps over the lazy dog. 프로젝트 디자인 시스템 가이드입니다.';

  return (
    <GuideLayout>
      <div className={baseStyles.wrapper}>
        <header className={baseStyles.header}>
          <h1 className={baseStyles.title_h1}>Typography</h1>
          <p className={baseStyles.description}>
            xPrivacy 디자인 시스템의 서체 체계(Font Family), 토큰 변수, 그리고 용도별 4단계 텍스트 스케일을 안내합니다.
          </p>
        </header>

        {/* 1. 도입부: 서체 시스템 아키텍처 (Font Family Architecture) */}
        <GuideSection title="1. Font Family Architecture (서체 구성 및 토큰)">
          <p className={baseStyles.description}>
            웹 성능 최적화와 화면 일관성을 위해 <strong>단일 메인 UI 서체(Primary)</strong>와 <strong>코드/데이터 전용 등폭 서체(Monospace)</strong> 2가지 역할로 분리하여 운용합니다.
          </p>

          {/* 서체 쇼케이스 카드 그리드 */}
          <div className={styles.font_grid}>
            {/* Primary UI Font Card */}
            <div className={`${styles.font_card} ${styles.primary}`}>
              <div className={styles.font_header}>
                <span className={styles.font_badge}>Primary UI</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>단일 메인 서체</span>
              </div>
              <h3 className={styles.font_title}>Pretendard</h3>
              
              <div className={styles.font_preview_hero}>
                <div className={styles.hero_chars} style={{ fontFamily: 'var(--font-family-base)' }}>
                  Aa Bb 123 가나다
                </div>
                <div className={styles.hero_sub} style={{ fontFamily: 'var(--font-family-base)' }}>
                  다람쥐 헌 쳇바퀴에 타고파. The quick brown fox.
                </div>
              </div>

              <div className={styles.font_meta}>
                <div className={styles.meta_item}>
                  <span>구분 / 역할</span>
                  <span className={styles.meta_val}>기본 본문 및 전체 UI 서체</span>
                </div>
                <div className={styles.meta_item}>
                  <span>CSS 변수</span>
                  <code>var(--font-family-base)</code>
                </div>
                <div className={styles.meta_item}>
                  <span>적용 대상</span>
                  <span className={styles.meta_val}>GNB, Headline, Title, Body, Button, Form 등</span>
                </div>
              </div>
            </div>

            {/* Monospace Code Font Card */}
            <div className={`${styles.font_card} ${styles.mono}`}>
              <div className={styles.font_header}>
                <span className={styles.font_badge}>Monospace</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>보조 등폭 서체</span>
              </div>
              <h3 className={styles.font_title}>Consolas / Monaco</h3>

              <div className={styles.font_preview_hero}>
                <div className={styles.hero_chars} style={{ fontFamily: 'var(--font-family-mono)', fontSize: '24px' }}>
                  &#123; const id: 1024; &#125;
                </div>
                <div className={styles.hero_sub} style={{ fontFamily: 'var(--font-family-mono)' }}>
                  0123456789 ABCDEF [] &lt;&gt;
                </div>
              </div>

              <div className={styles.font_meta}>
                <div className={styles.meta_item}>
                  <span>구분 / 역할</span>
                  <span className={styles.meta_val}>소스코드 및 기술 데이터 전용</span>
                </div>
                <div className={styles.meta_item}>
                  <span>CSS 변수</span>
                  <code>var(--font-family-mono)</code>
                </div>
                <div className={styles.meta_item}>
                  <span>적용 대상</span>
                  <span className={styles.meta_val}>&lt;CodeBlock&gt;, &lt;code&gt;, 토큰 키값, 암호화 문자열 등</span>
                </div>
              </div>
            </div>
          </div>

          {/* 서체 운용 정책 콜아웃 */}
          <div className={styles.font_policy_box}>
            <h4>💡 서체 운용 및 토큰 사용 원칙 (Typography Policy)</h4>
            <ul>
              <li>
                <strong>단일 메인 폰트 원칙 (Single Primary Font):</strong> 일반 UI는 성능과 일관성을 위해 단 1개의 가변(Variable) 서체로 전면 일원화합니다.
              </li>
              <li>
                <strong>코드/데이터 전용 보조 서체 분리:</strong> 소스코드나 시스템 토큰처럼 글자 폭 일치가 필요한 영역에 한해 Monospace 서체를 보조로 분리합니다.
              </li>
              <li>
                <strong>CSS 디자인 토큰 변수 필수 참조:</strong> 폰트 패밀리는 반드시 <code>var(--font-family-base)</code>와 <code>var(--font-family-mono)</code>를 사용합니다.
              </li>
              <li>
                <strong>SCSS Mixin 정책:</strong> 폰트 굵기, 사이즈, 줄간격은 파편화된 변수 대신 <code>@include text-heading-section;</code>과 같이 사전에 정의된 Mixin 세트를 호출하여 통일성을 유지합니다.
              </li>
            </ul>
          </div>
        </GuideSection>

        {/* 2. Display 영역 */}
        <GuideSection title="2. Display">
          {/* PROMPT_FOUNDATION_DATA.md의 Display 스케일 데이터를 참조하여 TypeRow 반복 렌더링 */}
          <TypeRow name="[Name]" mixinName="[mixin-name]" size={0} weight={0} lh="[lh]" sample={sampleText} />
        </GuideSection>
        
        {/* 3. Heading 영역 */}
        <GuideSection title="3. Heading">
          {/* PROMPT_FOUNDATION_DATA.md의 Heading 스케일 데이터를 참조하여 TypeRow 반복 렌더링 */}
          <TypeRow name="[Name]" mixinName="[mixin-name]" size={0} weight={0} lh="[lh]" sample={sampleText} />
        </GuideSection>

        {/* 4. CTA 영역 */}
        <GuideSection title="4. CTA">
          {/* PROMPT_FOUNDATION_DATA.md의 CTA 스케일 데이터를 참조하여 TypeRow 반복 렌더링 */}
          <TypeRow name="[Name]" mixinName="[mixin-name]" size={0} weight={0} lh="[lh]" sample={sampleText} />
        </GuideSection>

        {/* 5. Label 영역 */}
        <GuideSection title="5. Label">
          {/* PROMPT_FOUNDATION_DATA.md의 Label 스케일 데이터를 참조하여 TypeRow 반복 렌더링 */}
          <TypeRow name="[Name]" mixinName="[mixin-name]" size={0} weight={0} lh="[lh]" sample={sampleText} />
        </GuideSection>

        {/* 6. Body 영역 */}
        <GuideSection title="6. Body">
          {/* PROMPT_FOUNDATION_DATA.md의 Body 스케일 데이터를 참조하여 TypeRow 반복 렌더링 */}
          <TypeRow name="[Name]" mixinName="[mixin-name]" size={0} weight={0} lh="[lh]" sample={sampleText} />
        </GuideSection>
      </div>
    </GuideLayout>
  );
};

export default TypographyGuidePage;
```