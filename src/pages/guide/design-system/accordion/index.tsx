import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Accordion } from '../../../../components/core/Accordion/Accordion';
import { FaqAccordion } from '../../../../components/domain/Faq';

export default function AccordionGuidePage() {
  const sampleItems = [
    { id: '1', title: '아코디언 아이템 1', content: <p>첫 번째 아코디언 내용입니다. 세부 정보를 접어둘 수 있습니다.</p> },
    { id: '2', title: '아코디언 아이템 2', content: <p>두 번째 아코디언 내용입니다. 여러 줄의 컨텐츠가 들어갈 수도 있습니다.</p> },
    { id: '3', title: '아코디언 아이템 3', content: <p>세 번째 아코디언 내용입니다. allowMultiple이 false라면 하나만 열립니다.</p> },
  ];

  const faqSample = [
    { id: 'q1', question: '외부 인터넷 사용이 제한된 환경에서도 사용할 수 있나요?', answer: '구축형으로 도입하면 내부망에서 운영할 수 있습니다.' },
    { id: 'q2', question: '어떤 파일을 처리할 수 있나요?', answer: '이미지와 영상 파일을 처리할 수 있습니다.' },
    { id: 'q3', question: '영상 처리 시간은 얼마나 걸리나요?', answer: '영상 길이와 해상도, 서버 사양에 따라 달라집니다.' },
  ];

  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              Accordion은 <code>items</code> 배열을 받아 펼침/접힘 구조를 렌더링합니다. 모양은 <code>boxed</code>(기본) 하나만 가지며,
              서비스 공통 패턴(FAQ 등)은 <code>variant=&quot;plain&quot;</code> 구조를 감싼 도메인 컴포넌트가 스타일을 정합니다.
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
                    <td>`{`id: string, title: ReactNode, content: ReactNode`}` 배열</td>
                  </tr>
                  <tr>
                    <td><code>allowMultiple</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>true일 경우 여러 패널을 동시에 열어둘 수 있습니다.</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'boxed' | 'plain'</code></td>
                    <td><code>'boxed'</code></td>
                    <td>boxed: 테두리 박스형 / plain: 모양 없이 구조만(헤더 버튼 · 표식 · 화살표 · 본문). 도메인 컴포넌트 전용</td>
                  </tr>
                  <tr>
                    <td><code>prefix</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>제목 앞 표식 (예: <code>'Q'</code>)</td>
                  </tr>
                  <tr>
                    <td><code>defaultOpenIds</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>처음 열려 있을 항목 id 목록</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>루트 추가 클래스 (도메인 컴포넌트의 스타일 연결용)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>

          <GuideSection title="2. Basic Usage">
            <p className={styles.description}>
              기본적으로 한 번에 하나의 패널만 열어둘 수 있는 단일 선택 모드입니다.
            </p>
            <div className={styles.preview_column}>
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
            <div className={styles.preview_column}>
              <Accordion items={sampleItems} allowMultiple />
            </div>
            <CodeBlock code={`<Accordion items={sampleItems} allowMultiple />`} />
          </GuideSection>
        </>
      ),
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          <GuideSection title="1. FaqAccordion">
            <p className={styles.description}>
              서비스 공통 FAQ 목록입니다. Core Accordion(<code>variant=&quot;plain&quot;</code>)을 감싸 질문 표식(Q)과 첫 항목 펼침을 기본값으로 두고,
              모든 FAQ(요금제 · 메인 · 문의)가 한 가지 모양(2px 상단선 · 항목 28/24 여백 · 파란 Q. · 화살표 20 · 답변 gray-1)과 동작(첫 질문 펼침, 한 번에 하나만 펼침)을 씁니다. 섹션(타이틀·배경)은 페이지에서 <code>BasicSection</code>으로 구성합니다.
            </p>

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '24rem 0 12rem' }}>1.1. Specs</h3>
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
                    <td><code>FaqItem[]</code></td>
                    <td>-</td>
                    <td>`{`id: string, question: ReactNode, answer: ReactNode`}` 배열. 질문에 &lsquo;Q.&rsquo;를 넣지 않습니다(표식은 컴포넌트가 붙임).</td>
                  </tr>
                  <tr>
                    <td><code>defaultOpenIds</code></td>
                    <td><code>string[]</code></td>
                    <td>첫 항목</td>
                    <td>처음 열려 있을 항목. 모두 닫으려면 <code>[]</code></td>
                  </tr>
                  <tr>
                    <td><code>allowMultiple</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>여러 질문 동시 펼침</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '32rem 0 12rem' }}>1.2. Usage</h3>
            <div className={styles.preview_column}>
              <FaqAccordion items={faqSample} />
            </div>
            <CodeBlock code={`<FaqAccordion items={faqItems} />`} />
          </GuideSection>
        </>
      ),
    },
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

        <Tabs items={tabItems} defaultActiveId="core" />
      </div>
    </DesignSystemLayout>
  );
}
