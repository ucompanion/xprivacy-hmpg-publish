import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Button } from '../../../../components/core/Button/Button';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';

export default function ButtonGuidePage() {
  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          {/* 1. 컴포넌트 스펙 및 사용법 (H2) */}
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              Button 컴포넌트는 `variant`, `color`, `size` 세 가지 주요 프로퍼티를 조합하여 사용합니다. 
              기본 HTML 버튼의 모든 속성을 상속받으므로 `onClick`, `disabled`, `type` 등을 그대로 사용할 수 있습니다.
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
                    <td><code>'solid' | 'outline' | 'ghost' | 'subtle'</code></td>
                    <td><code>'solid'</code></td>
                    <td>버튼의 시각적 형태를 결정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>bordered</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>subtle 버튼에 1px 테두리(border-button-secondary)를 더합니다. 밝은 카드 위 Secondary에 사용합니다.</td>
                  </tr>
                  <tr>
                    <td><code>color</code></td>
                    <td><code>'primary' | 'secondary' | 'danger' | 'success' | 'neutral'</code></td>
                    <td><code>'primary'</code></td>
                    <td>버튼의 의미론적 색상 테마를 결정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg' | 'xl'</code></td>
                    <td><code>'md'</code></td>
                    <td>버튼의 크기를 결정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>버튼 내부의 텍스트 또는 아이콘 요소</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>

          {/* 2. Basic Usage (H2) */}
          <GuideSection title="2. Basic Usage">
            <p className={styles.description}>
              아무 속성도 전달하지 않으면 `variant="solid"`, `color="primary"`, `size="md"` 가 기본 적용됩니다.
            </p>
            <div className={styles.preview}>
              <Button>기본 버튼</Button>
            </div>
            <CodeBlock code={`<Button>기본 버튼</Button>`} />
          </GuideSection>

          {/* 3. Variants & States (H2) */}
          <GuideSection title="3. Variants & Colors" defaultOpen={false}>
            <p className={styles.description}>
              형태(Variant)와 색상(Color)을 조합하여 다양한 의미를 전달할 수 있습니다.
            </p>
            <div className={styles.preview}>
              <Button variant="solid" color="primary">Solid Primary</Button>
              <Button variant="outline" color="secondary">Outline Secondary</Button>
              <Button variant="solid" color="danger">Solid Danger</Button>
              <Button variant="ghost" color="neutral">Ghost Neutral</Button>
            </div>
            <CodeBlock code={`<Button variant="solid" color="primary">Solid Primary</Button>
<Button variant="outline" color="secondary">Outline Secondary</Button>
<Button variant="solid" color="danger">Solid Danger</Button>
<Button variant="ghost" color="neutral">Ghost Neutral</Button>`} />
          </GuideSection>

          {/* 3-1. Button/v2 (Figma 2241:378) */}
          <GuideSection title="3-1. Button/v2 (Primary · Secondary)" defaultOpen={false}>
            <p className={styles.description}>
              Figma Button/v2 규격(높이 56, radius 6, PC 20 · MO 16 Bold)은 `size="xl"`을 사용합니다. Primary는 `variant="solid"`(그림자 포함), Secondary는 흰 80% 배경 + 남색 글자의 `variant="subtle"`이고, 밝은 카드 위에서는 `bordered`로 1px 테두리를 더합니다(요금제 도입 방식 카드 · PoC).
            </p>
            <div className={styles.preview}>
              <Button variant="solid" color="primary" size="xl">도입 상담</Button>
              <Button variant="subtle" size="xl">기술 · API 문의</Button>
              <Button variant="subtle" bordered size="xl">PoC 신청</Button>
            </div>
            <CodeBlock code={`<Button variant="solid" color="primary" size="xl">도입 상담</Button>
<Button variant="subtle" size="xl">기술 · API 문의</Button>
<Button variant="subtle" bordered size="xl">PoC 신청</Button>`} />
          </GuideSection>

          {/* 4. Sizes (H2) */}
          <GuideSection title="4. Sizes" defaultOpen={false}>
            <p className={styles.description}>
              `size` 속성으로 버튼의 크기를 조절합니다.
            </p>
            <div className={styles.preview}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <CodeBlock code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`} />
          </GuideSection>
        </>
      )
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          <GuideSection title="1. 도메인 버튼 정책">
            <p className={styles.description}>
              버튼은 도메인 컴포넌트를 두지 않고 화면에서 Core <code>Button</code>을 직접 사용합니다.
              일부 버튼만 도메인으로 감싸면 같은 화면 안에서 Core 호출과 도메인 호출이 섞여 오히려 일관성이 떨어지기 때문입니다.
              문구·이동 경로는 화면에서 지정하고, 모양 차이는 <code>variant</code>·<code>color</code>·<code>size</code>·<code>bordered</code> 옵션으로만 표현합니다.
            </p>
            <div className={styles.preview}>
              <Button variant="solid" color="primary" size="xl">도입 문의하기</Button>
              <Button variant="subtle" size="xl" bordered>데모 체험하기</Button>
            </div>
            <CodeBlock code={`<Button variant="solid" color="primary" size="xl" onClick={() => void navigate('/pub/contact/inquiry')}>
  도입 문의하기
</Button>
<Button variant="subtle" size="xl" bordered onClick={() => void navigate('/pub/demo/demo')}>
  데모 체험하기
</Button>`} />
          </GuideSection>
        </>
      )
    }
  ];

  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        {/* 1. 가이드 헤더 영역 (H1) */}
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Button</h1>
          <p className={styles.description}>
            사용자의 액션을 유도하고 폼을 제출하며 내비게이션을 수행하는 가장 기본적인 인터랙션 요소입니다.
          </p>
        </header>

        <Tabs items={tabItems} defaultActiveId="core" />
      </div>
    </DesignSystemLayout>
  );
}
