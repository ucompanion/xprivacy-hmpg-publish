import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Accordion } from '../../../../components/core/Accordion/Accordion';

export default function AccordionGuidePage() {
  const sampleItems = [
    { id: '1', title: '아코디언 아이템 1', content: <p>첫 번째 아코디언 내용입니다. 세부 정보를 접어둘 수 있습니다.</p> },
    { id: '2', title: '아코디언 아이템 2', content: <p>두 번째 아코디언 내용입니다. 여러 줄의 컨텐츠가 들어갈 수도 있습니다.</p> },
    { id: '3', title: '아코디언 아이템 3', content: <p>세 번째 아코디언 내용입니다. allowMultiple이 false라면 하나만 열립니다.</p> },
  ];

  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Accordion</h1>
          <p className={styles.description}>
            방대한 양의 콘텐츠를 섹션별로 나누어 공간을 절약하고, 사용자가 원하는 정보만 펼쳐볼 수 있게 해주는 UI 컴포넌트입니다.
          </p>
        </header>

        <GuideSection title="1. Overview & Specs">
          <p className={styles.description}>
            Accordion 컴포넌트는 `items` 배열을 받아 렌더링하며, `allowMultiple` 옵션을 통해 동시 열림 허용 여부를 제어할 수 있습니다.
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
                  <td><code>AccordionItemData[]</code></td>
                  <td>-</td>
                  <td>`{`id: string, title: string, content: ReactNode`}` 배열</td>
                </tr>
                <tr>
                  <td><code>allowMultiple</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>true일 경우 여러 패널을 동시에 열어둘 수 있습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="2. Basic Usage">
          <p className={styles.description}>
            기본적으로 한 번에 하나의 패널만 열어둘 수 있는 단일 선택 모드입니다.
          </p>
          <div className={styles.preview}>
            <Accordion items={sampleItems} />
          </div>
          <CodeBlock code={`const sampleItems = [
  { id: '1', title: '아코디언 아이템 1', content: <p>내용 1</p> },
  { id: '2', title: '아코디언 아이템 2', content: <p>내용 2</p> },
  { id: '3', title: '아코디언 아이템 3', content: <p>내용 3</p> },
];

<Accordion items={sampleItems} />`} />
        </GuideSection>

        <GuideSection title="3. Variants & States" defaultOpen={false}>
          <p className={styles.description}>
            `allowMultiple={true}` 옵션을 설정하면 여러 패널을 동시에 펼쳐볼 수 있습니다.
          </p>
          <div className={styles.preview}>
            <Accordion items={sampleItems} allowMultiple />
          </div>
          <CodeBlock code={`<Accordion items={sampleItems} allowMultiple />`} />
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
}
