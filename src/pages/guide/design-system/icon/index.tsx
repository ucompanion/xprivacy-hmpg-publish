import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { IconSurface } from '../../../../components/core/Icon/IconSurface';
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

        <GuideSection title="4. IconSurface (유리 아이콘)" defaultOpen={false}>
          <p className={styles.description}>
            Figma `Process Icon/v2 · ClearSurface` 유리 아이콘입니다. 반투명 흰 채움 아래로 그림자색이 비쳐 연한 회청색을 띠고,
            두께 띠 · 반사광 · 림이 겹쳐 유리 질감을 만듭니다. 글리프는 `src`로 SVG 경로를 넘기며, 카드 아이콘·테스트 환경 항목 등에 공통으로 사용합니다.
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
                  <td><code>src</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>(필수) 글리프 SVG 경로</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>32 | 40 | 44 | 48 | 52</code></td>
                  <td><code>48</code></td>
                  <td>아이콘 크기(px). 반경·두께·반사광·글리프·그림자는 48 기준값(반경 12 · 두께 3 · 글리프 24)에 비례</td>
                </tr>
                <tr>
                  <td><code>sizeMo</code></td>
                  <td><code>32 | 40 | 44 | 48 | 52</code></td>
                  <td>-</td>
                  <td>모바일(≤768) 크기. 도입 효과 카드 48 → 44, 요금제 도입 방식 48 → 40</td>
                </tr>
                <tr>
                  <td><code>tone</code></td>
                  <td><code>'default' | 'soft'</code></td>
                  <td><code>'default'</code></td>
                  <td>default: ClearSurface(흰·회색 카드 위) / soft: LightBlueSurface(대각 블루 그라데이션 강조)</td>
                </tr>
                <tr>
                  <td><code>glyphFit</code></td>
                  <td><code>'center' | 'fill'</code></td>
                  <td><code>'center'</code></td>
                  <td>center: 글리프 24 비례 크기로 가운데 / fill: 자체 여백을 포함한 48 뷰박스 글리프가 아이콘 전체를 덮음(Process Icon/v2 원본 글리프 · 요금제)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`${styles.preview} ${styles.row}`}>
            <IconSurface src="/images/technology/processing-engine/glyph_speed.svg" size={32} />
            <IconSurface src="/images/technology/processing-engine/glyph_speed.svg" size={44} />
            <IconSurface src="/images/technology/processing-engine/glyph_speed.svg" size={48} />
            <IconSurface src="/images/technology/smart-workflow/glyph_target.svg" size={48} tone="soft" />
            <IconSurface src="/images/product/pricing/glyph_onpremise.svg" size={48} sizeMo={40} tone="soft" glyphFit="fill" />
          </div>
          <CodeBlock code={`<IconSurface src="/images/technology/processing-engine/glyph_speed.svg" size={32} />
<IconSurface src="/images/technology/processing-engine/glyph_speed.svg" size={44} />
<IconSurface src="/images/technology/processing-engine/glyph_speed.svg" size={48} />
<IconSurface src="/images/technology/smart-workflow/glyph_target.svg" size={48} tone="soft" />
<IconSurface src="/images/product/pricing/glyph_onpremise.svg" size={48} sizeMo={40} tone="soft" glyphFit="fill" />`} />
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
}
