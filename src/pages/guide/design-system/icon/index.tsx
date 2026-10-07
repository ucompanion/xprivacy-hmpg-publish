import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Icon } from '../../../../components/core/Icon/Icon';
// Sample SVG for demonstration
import ReactSvg from '../../../../assets/react.svg?react';

export default function IconGuidePage() {
  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Icon</h1>
          <p className={styles.description}>
            SVGR 플러그인을 통해 불러온 원본 SVG 컴포넌트들을 규격화된 크기와 색상으로 렌더링해 주는 래퍼(Wrapper) 컴포넌트입니다.
          </p>
        </header>

        <GuideSection title="1. Overview & Specs">
          <p className={styles.description}>
            SVG 컴포넌트를 `svg` 프로퍼티로 주입받아 사용합니다.
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
                  <td><code>svg</code></td>
                  <td><code>React.FC&lt;SVGProps&gt;</code></td>
                  <td>(필수)</td>
                  <td>`?react` 접미사로 불러온 SVG React 컴포넌트</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>number | string</code></td>
                  <td><code>24</code></td>
                  <td>아이콘의 가로/세로 크기 (px 단위 또는 문자열)</td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td><code>string</code></td>
                  <td><code>'currentColor'</code></td>
                  <td>아이콘의 색상. 기본값은 부모의 텍스트 색상을 상속받습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="2. Basic Usage">
          <p className={styles.description}>
            기본 사이즈(24px)와 `currentColor`가 적용됩니다. SVG 파일 import 시 반드시 `?react`를 붙여주세요.
          </p>
          <div className={`${styles.preview} ${styles.icon_sample}`}>
            <Icon svg={ReactSvg} />
          </div>
          <CodeBlock code={`import ReactSvg from '@/assets/react.svg?react';

<Icon svg={ReactSvg} />`} />
        </GuideSection>

        <GuideSection title="3. Sizes & Colors" defaultOpen={false}>
          <p className={styles.description}>
            `size`와 `color` 속성으로 자유롭게 형태를 변형할 수 있습니다.
          </p>
          <div className={`${styles.preview} ${styles.row}`}>
            <Icon svg={ReactSvg} size={16} color="#64748b" />
            <Icon svg={ReactSvg} size={32} color="#db2777" />
            <Icon svg={ReactSvg} size={48} color="#10b981" />
          </div>
          <CodeBlock code={`<Icon svg={ReactSvg} size={16} color="#64748b" />
<Icon svg={ReactSvg} size={32} color="#db2777" />
<Icon svg={ReactSvg} size={48} color="#10b981" />`} />
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
}
