// @ts-nocheck
import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Button } from '../../../../components/core/Button/Button';
import { CtaButton } from '../../../../components/domain/Button/CtaButton';
import { FormSubmitButton } from '../../../../components/domain/Button/FormSubmitButton';
import { LoadMoreButton } from '../../../../components/domain/Button/LoadMoreButton';
import { UtilityButton } from '../../../../components/domain/Button/UtilityButton';
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
                    <td><code>'solid' | 'outline' | 'ghost'</code></td>
                    <td><code>'solid'</code></td>
                    <td>버튼의 시각적 형태를 결정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>color</code></td>
                    <td><code>'primary' | 'secondary' | 'danger' | 'success' | 'neutral'</code></td>
                    <td><code>'primary'</code></td>
                    <td>버튼의 의미론적 색상 테마를 결정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
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
            <div className={`${styles.preview} ${styles.wrap}`}>
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

          {/* 4. Sizes (H2) */}
          <GuideSection title="4. Sizes" defaultOpen={false}>
            <p className={styles.description}>
              `size` 속성으로 버튼의 크기를 조절합니다.
            </p>
            <div className={`${styles.preview} ${styles.row}`}>
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
          {/* 1. CtaButton */}
          <GuideSection title="1. CtaButton">
            <p className={styles.description}>
              서비스의 주요 행동 유도(Call To Action)를 위해 사전에 완성된 서비스 전용 강조 버튼입니다. Primary + Solid + Large 스타일이 고정되어 있습니다.
            </p>

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
                      <td><code>label</code></td>
                      <td><code>string</code></td>
                      <td><code>'시작하기'</code></td>
                      <td>버튼 중앙에 노출될 텍스트</td>
                    </tr>
                    <tr>
                      <td><code>(고정속성)</code></td>
                      <td><code>variant="solid", color="primary", size="lg"</code></td>
                      <td>-</td>
                      <td>스타일 일관성을 위해 고정 적용</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>1.2. Usage</h3>
              <div className={styles.preview}>
                <CtaButton label="시작하기" />
              </div>
              <CodeBlock code={`<CtaButton label="시작하기" />`} />
            </div>
          </GuideSection>

          {/* 2. FormSubmitButton */}
          <GuideSection title="2. FormSubmitButton" defaultOpen={false}>
            <p className={styles.description}>
              폼 작성 완료 시 하단에 배치되는 풀사이즈 제출 버튼입니다. `type="submit"` 속성이 기본 적용됩니다.
            </p>

            <div className={styles.sub_section}>
              <h3 className={styles.title_h3}>2.1. Specs</h3>
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
                      <td><code>label</code></td>
                      <td><code>string</code></td>
                      <td><code>'저장'</code></td>
                      <td>버튼 텍스트</td>
                    </tr>
                    <tr>
                      <td><code>(고정속성)</code></td>
                      <td><code>type="submit", variant="solid", color="primary"</code></td>
                      <td>-</td>
                      <td>폼 제출용 필수 속성 기본 적용</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>2.2. Usage</h3>
              <div className={styles.preview}>
                <FormSubmitButton label="제출하기" />
              </div>
              <CodeBlock code={`<FormSubmitButton label="제출하기" disabled={false} />`} />
            </div>
          </GuideSection>

          {/* 3. LoadMoreButton */}
          <GuideSection title="3. LoadMoreButton" defaultOpen={false}>
            <p className={styles.description}>
              목록 하단에서 추가 데이터를 불러올 때 사용하는 더보기 버튼입니다.
            </p>

            <div className={styles.sub_section}>
              <h3 className={styles.title_h3}>3.1. Specs</h3>
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
                      <td><code>isLoading</code></td>
                      <td><code>boolean</code></td>
                      <td><code>false</code></td>
                      <td>로딩 중 상태 표기 및 비활성화 여부</td>
                    </tr>
                    <tr>
                      <td><code>(고정속성)</code></td>
                      <td><code>variant="outline", color="secondary"</code></td>
                      <td>-</td>
                      <td>전체 너비 아웃라인 버튼 형태 고정</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>3.2. Usage</h3>
              <div className={styles.preview}>
                <LoadMoreButton onClick={() => alert('더보기 클릭')} />
              </div>
              <CodeBlock code={`<LoadMoreButton onClick={() => handleLoadMore()} />`} />
            </div>
          </GuideSection>

          {/* 4. UtilityButton */}
          <GuideSection title="4. UtilityButton" defaultOpen={false}>
            <p className={styles.description}>
              공유하기, 인쇄 등 보조 액션을 수행하는 유틸리티 버튼입니다.
            </p>

            <div className={styles.sub_section}>
              <h3 className={styles.title_h3}>4.1. Specs</h3>
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
                      <td><code>label</code></td>
                      <td><code>string</code></td>
                      <td>(필수)</td>
                      <td>버튼 텍스트</td>
                    </tr>
                    <tr>
                      <td><code>icon</code></td>
                      <td><code>React.FC&lt;SVGProps&gt;</code></td>
                      <td>-</td>
                      <td>텍스트 좌측에 렌더링될 아이콘 컴포넌트</td>
                    </tr>
                    <tr>
                      <td><code>(고정속성)</code></td>
                      <td><code>variant="ghost", color="neutral", size="sm"</code></td>
                      <td>-</td>
                      <td>연한 고스트 스타일 고정</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>4.2. Usage</h3>
              <div className={`${styles.preview} ${styles.wrap}`}>
                <UtilityButton label="공유하기" />
                <UtilityButton label="인쇄하기" />
              </div>
              <CodeBlock code={`<UtilityButton label="공유하기" />
<UtilityButton label="인쇄하기" />`} />
            </div>
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
