import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { IconSurface } from '../../../../components/core/Icon/IconSurface';
import { Icon, type IconName } from '../../../../components/core/Icon/Icon';
// Sample SVG for demonstration
import ReactSvg from '../../../../assets/react.svg?react';

const ICON_NAMES: IconName[] = [
  'arrow-right',
  'chevron-left',
  'chevron-right',
  'chevron-down',
  'keyboard-arrow-left',
  'keyboard-arrow-right',
  'close',
  'check',
  'info',
  'play',
  'targets',
  'scan',
  'shield',
  'shield-check',
  'eye',
  'server',
  'layers',
];

export default function IconGuidePage() {
  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Icon</h1>
          <p className={styles.description}>
            단색 UI 아이콘을 규격화된 크기·색·선 두께로 렌더링하는 코어 컴포넌트입니다. 단색 아이콘은 SVG 스프라이트(<code>public/icons/sprite.svg</code>)에 모아
            <code>name</code>으로 부르고, 여러 색·그라데이션이 들어간 글리프·일러스트는 스프라이트에 넣지 않고 이미지(<code>img</code>)나 <code>IconSurface</code>로 사용합니다.
          </p>
        </header>

        <GuideSection title="1. Overview & Specs">
          <p className={styles.description}>
            스프라이트 아이콘은 모두 24 격자 · 선 두께 2 기준이며 색은 <code>currentColor</code>를 따릅니다. 새 단색 아이콘은 같은 규격으로 스프라이트에 <code>symbol</code>을 추가하고 <code>IconName</code> 타입에 이름을 등록합니다.
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
                  <td><code>name</code></td>
                  <td><code>IconName</code></td>
                  <td>-</td>
                  <td>스프라이트 아이콘 이름 (아래 목록)</td>
                </tr>
                <tr>
                  <td><code>svg</code></td>
                  <td><code>React.FC&lt;SVGProps&gt;</code></td>
                  <td>-</td>
                  <td><code>name</code> 대신 <code>?react</code> 접미사로 불러온 SVG 컴포넌트를 쓸 때</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>number | string</code></td>
                  <td><code>24</code></td>
                  <td>가로·세로 크기. 반응형 크기는 <code>className</code>의 width·height로 지정</td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>미지정 시 부모 글자색(또는 <code>className</code>의 <code>color</code>)을 따름. 토큰으로 지정 (예: <code>var(--color-primary)</code>)</td>
                </tr>
                <tr>
                  <td><code>strokeWidth</code></td>
                  <td><code>number</code></td>
                  <td><code>2</code></td>
                  <td>선으로 그린 스프라이트 아이콘의 두께 (24 격자 기준)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="2. Basic Usage">
          <p className={styles.description}>
            이름만 지정하면 24px · 부모 글자색으로 그려집니다. 색은 <code>color</code> 또는 부모·className의 <code>color</code>로 바꿉니다.
          </p>
          <div className={styles.preview}>
            <Icon name="chevron-right" />
            <Icon name="arrow-right" size={20} color="var(--color-text-gray-2)" />
            <Icon name="check" color="var(--color-primary)" />
          </div>
          <CodeBlock code={`<Icon name="chevron-right" />
<Icon name="arrow-right" size={20} color="var(--color-text-gray-2)" />
<Icon name="check" color="var(--color-primary)" />`} />
        </GuideSection>

        <GuideSection title="3. 스프라이트 아이콘 목록" defaultOpen={false}>
          <p className={styles.description}>
            <code>public/icons/sprite.svg</code>에 등록된 아이콘입니다.
          </p>
          <div className={styles.preview} style={{ flexWrap: 'wrap', gap: '24px', justifyContent: 'flex-start' }}>
            {ICON_NAMES.map((iconName) => (
              <span key={iconName} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '130px' }}>
                <Icon name={iconName} size={24} />
                <code style={{ fontSize: '12px', fontWeight: '400', lineHeight: '18px', whiteSpace: 'nowrap' }}>{iconName}</code>
              </span>
            ))}
          </div>
          <CodeBlock code={`<Icon name="${'{'}name${'}'}" />`} />
        </GuideSection>

        <GuideSection title="3-1. SVGR 컴포넌트" defaultOpen={false}>
          <p className={styles.description}>
            스프라이트에 없는 SVG를 컴포넌트로 쓸 때는 <code>?react</code>로 불러와 <code>svg</code>로 넘깁니다.
          </p>
          <div className={styles.preview}>
            <Icon svg={ReactSvg} />
          </div>
          <CodeBlock code={`import ReactSvg from '@/assets/react.svg?react';

<Icon svg={ReactSvg} />`} />
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
                  <td><code>32 | 40 | 44 | 48 | 52 | 64</code></td>
                  <td><code>48</code></td>
                  <td>아이콘 크기(px). 반경·두께·반사광·글리프·그림자는 48 기준값(반경 12 · 두께 3 · 글리프 24)에 비례</td>
                </tr>
                <tr>
                  <td><code>sizeMo</code></td>
                  <td><code>32 | 40 | 44 | 48 | 52 | 64</code></td>
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
          <div className={styles.preview}>
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
