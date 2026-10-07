import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Badge } from '../../../../components/core/Badge/Badge';
import { StatusBadge } from '../../../../components/domain/Badge/StatusBadge';

export default function BadgeGuidePage() {
  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              Badge 컴포넌트는 `color` 속성을 통해 주요 상태를 직관적으로 전달합니다.
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
                    <td><code>color</code></td>
                    <td><code>'primary' | 'success' | 'warning' | 'neutral'</code></td>
                    <td><code>'neutral'</code></td>
                    <td>뱃지의 의미론적 색상 테마를 결정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>뱃지 내부 텍스트 또는 아이콘</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>

          <GuideSection title="2. Basic Usage">
            <p className={styles.description}>
              기본적으로 아무 속성도 전달하지 않으면 `color="neutral"` 상태로 렌더링됩니다.
            </p>
            <div className={styles.preview}>
              <Badge>기본 뱃지</Badge>
            </div>
            <CodeBlock code={`<Badge>기본 뱃지</Badge>`} />
          </GuideSection>

          <GuideSection title="3. Colors & States" defaultOpen={false}>
            <p className={styles.description}>
              의미에 맞는 `color`를 지정하여 문맥을 전달합니다.
            </p>
            <div className={`${styles.preview} ${styles.wrap}`}>
              <Badge color="primary">Primary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="neutral">Neutral</Badge>
            </div>
            <CodeBlock code={`<Badge color="primary">Primary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="neutral">Neutral</Badge>`} />
          </GuideSection>
        </>
      )
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          <GuideSection title="1. StatusBadge">
            <p className={styles.description}>
              실제 서비스 화면의 업무 상태값(대기, 진행, 완료, 반려)을 직관적으로 표시하기 위해 코어 뱃지를 사전 정의한 서비스 전용 컴포넌트입니다.
              도메인 상태 코드(TODO, IN_PROGRESS, DONE, REJECTED)를 받아 매핑된 라벨과 색상으로 렌더링합니다.
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
                      <td><code>status</code></td>
                      <td><code>'TODO' | 'IN_PROGRESS' | 'DONE' | 'REJECTED'</code></td>
                      <td>-</td>
                      <td>(필수) 매핑된 상태 텍스트와 색상으로 출력됩니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24px' }}>
              <h3 className={styles.title_h3}>1.2. Usage</h3>
              <div className={`${styles.preview} ${styles.wrap}`}>
                <StatusBadge status="TODO" />
                <StatusBadge status="IN_PROGRESS" />
                <StatusBadge status="DONE" />
                <StatusBadge status="REJECTED" />
              </div>
              <CodeBlock code={`<StatusBadge status="TODO" />
<StatusBadge status="IN_PROGRESS" />
<StatusBadge status="DONE" />
<StatusBadge status="REJECTED" />`} />
            </div>
          </GuideSection>
        </>
      )
    }
  ];

  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Badge</h1>
          <p className={styles.description}>
            상태, 카테고리, 알림 개수 등 추가적인 메타정보를 시각적으로 강조할 때 사용하는 작은 라벨 요소입니다.
          </p>
        </header>

        <Tabs items={tabItems} defaultActiveId="core" />
      </div>
    </DesignSystemLayout>
  );
}
