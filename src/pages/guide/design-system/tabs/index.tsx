import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';

export default function TabsGuidePage() {
  const sampleItems = [
    { id: 'tab1', label: '첫 번째 탭', content: <div className={styles.tab_content}>첫 번째 탭의 내용입니다.</div> },
    { id: 'tab2', label: '두 번째 탭', content: <div className={styles.tab_content}>두 번째 탭으로 전환되었습니다.</div> },
    { id: 'tab3', label: '세 번째 탭', content: <div className={styles.tab_content}>세 번째 탭에도 다양한 컨텐츠를 넣을 수 있습니다.</div> },
  ];

  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Tabs</h1>
          <p className={styles.description}>
            동일한 영역 내에서 관련된 여러 컨텐츠 뷰를 서로 전환하며 볼 수 있도록 묶어주는 내비게이션 컴포넌트입니다.
          </p>
        </header>

        <GuideSection title="1. Overview & Specs">
          <p className={styles.description}>
            Tabs 컴포넌트는 `items` 배열을 받아 탭 헤더와 콘텐츠를 렌더링합니다.
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
                  <td><code>items</code></td>
                  <td><code>TabItem[]</code></td>
                  <td>(필수)</td>
                  <td>`{`id: string, label: string, content: ReactNode`}` 배열</td>
                </tr>
                <tr>
                  <td><code>defaultActiveId</code></td>
                  <td><code>string</code></td>
                  <td><code>items[0].id</code></td>
                  <td>초기 렌더링 시 활성화할 탭의 id</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="2. Basic Usage">
          <p className={styles.description}>
            `items`를 전달하면 자동으로 첫 번째 탭이 활성화됩니다.
          </p>
          <div className={styles.preview}>
            <Tabs items={sampleItems} />
          </div>
          <CodeBlock code={`const sampleItems = [
  { id: 'tab1', label: '첫 번째 탭', content: <div>내용 1</div> },
  { id: 'tab2', label: '두 번째 탭', content: <div>내용 2</div> },
  { id: 'tab3', label: '세 번째 탭', content: <div>내용 3</div> },
];

<Tabs items={sampleItems} />`} />
        </GuideSection>

        <GuideSection title="3. Variants & States" defaultOpen={false}>
          <p className={styles.description}>
            `defaultActiveId`를 지정하여 특정 탭을 먼저 열어둘 수 있습니다.
          </p>
          <div className={styles.preview}>
            <Tabs items={sampleItems} defaultActiveId="tab2" />
          </div>
          <CodeBlock code={`<Tabs items={sampleItems} defaultActiveId="tab2" />`} />
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
}
