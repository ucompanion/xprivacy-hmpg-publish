import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Card } from '../../../../components/core/Card/Card';
import { IconSurface } from '../../../../components/core/Icon/IconSurface';
import { BenefitCard, BenefitCardGroup } from '../../../../components/domain/Benefit/BenefitCards';

const GLYPH = '/images/technology/processing-engine';

const SAMPLE_BENEFITS = [
  {
    glyph: `${GLYPH}/glyph_speed.svg`,
    title: '작업 소요 시간 단축',
    desc: '모자이크 등 기본 비식별은 실시간보다 빠르게 처리해 작업 시간을 줄입니다.',
  },
  {
    glyph: `${GLYPH}/glyph_cycle.svg`,
    title: '영상 데이터 보안 처리 및 반출 주기 단축',
    desc: '처리 시간이 줄어 영상 데이터의 보안 처리와 배포 주기가 빨라집니다.',
  },
  {
    glyph: `${GLYPH}/glyph_bottleneck.svg`,
    title: '고연산 AI 작업의 프로세스 병목 최소화',
    desc: '가상 얼굴 변환·전신 마스킹 같은 고연산 작업에서도 지연을 최소화합니다.',
  },
  {
    glyph: `${GLYPH}/glyph_manual.svg`,
    title: '담당자 수동 가공 공수 최소화',
    desc: '동일 인물을 끊김 없이 자동 추적해 프레임별 수동 보정 작업을 줄입니다.',
  },
];

// 카드 구성 비교 샘플 (Company 사업 영역 카드와 같은 구성)
const COMPANY_GLYPH = '/images/contact/company/glyph_layers.svg';

export default function CardGuidePage() {
  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              Card는 radius 12 박스의 배경·테두리와 선택 상태 클래스만 책임집니다. 내부 여백·간격·타이포그래피·선택 스타일은 사용처(도메인 컴포넌트 또는 화면)가 정합니다.
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
                    <td><code>as</code></td>
                    <td><code>'div' | 'li' | 'article' | 'label'</code></td>
                    <td><code>'div'</code></td>
                    <td>렌더링 태그. 목록 안에서는 <code>li</code>, 라디오 선택 카드는 <code>label</code>을 사용합니다.</td>
                  </tr>
                  <tr>
                    <td><code>bg</code></td>
                    <td><code>'white' | 'gray' | 'blue-soft'</code></td>
                    <td><code>'white'</code></td>
                    <td>surface-white · surface-gray · surface-blue-soft 배경</td>
                  </tr>
                  <tr>
                    <td><code>bordered</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>border/default 1 테두리</td>
                  </tr>
                  <tr>
                    <td><code>selected</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td><code>is-selected</code> 클래스만 붙입니다. 선택 시 모양은 사용처가 정합니다.</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>카드 내용</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>

          <GuideSection title="2. Basic Usage">
            <p className={styles.description}>
              배경과 테두리 조합만 지정하고, 여백은 className으로 부여합니다.
            </p>
            <div className={styles.preview}>
              <Card bordered style={{ padding: '24rem' }}>white · bordered</Card>
              <Card bg="gray" style={{ padding: '24rem' }}>gray</Card>
              <Card bg="blue-soft" bordered style={{ padding: '24rem' }}>blue-soft · bordered</Card>
            </div>
            <CodeBlock code={`<Card bordered className={styles.card}>white · bordered</Card>
<Card bg="gray" className={styles.card}>gray</Card>
<Card bg="blue-soft" bordered className={styles.card}>blue-soft · bordered</Card>`} />
          </GuideSection>

          <GuideSection title="3. Selected State">
            <p className={styles.description}>
              라디오 선택 카드는 <code>as=&quot;label&quot;</code> 안에 실제 <code>input type=&quot;radio&quot;</code>를 두고 <code>selected</code>를 넘깁니다.
              Core는 <code>is-selected</code> 클래스만 붙이므로, 선택 스타일은 사용처 SCSS에서 <code>.card:global(.is-selected)</code>로 지정합니다.
            </p>
            <div className={styles.preview}>
              <Card as="label" bordered selected style={{ padding: '24rem' }}>
                <input type="radio" name="guide-card" defaultChecked style={{ marginRight: '8rem' }} />
                selected
              </Card>
              <Card as="label" bordered style={{ padding: '24rem' }}>
                <input type="radio" name="guide-card" style={{ marginRight: '8rem' }} />
                default
              </Card>
            </div>
            <CodeBlock code={`<Card as="label" bordered selected={checked} className={styles.card}>
  <input type="radio" name="plan" checked={checked} onChange={...} />
  ...
</Card>

/* SCSS: 선택 스타일은 사용처가 정함 */
.card:global(.is-selected) { border-color: var(--color-primary); }`} />
          </GuideSection>
        </>
      ),
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          <GuideSection title="1. BenefitCardGroup">
            <p className={styles.description}>
              기술 소개 페이지마다 반복되는 도입 효과 카드 목록입니다. 섹션은 포함하지 않으며, 페이지의 <code>BasicSection</code>(eyebrow &lsquo;BENEFITS&rsquo; · title &lsquo;도입 효과&rsquo;)
              <code>children</code>으로 넣습니다. 카드 하나는 <code>BenefitCard</code>(Core Card white + Core IconSurface 48 · MO 44)이고,
              간격은 Figma 시안 프리셋(padding 28 28 32 · gap 8 · 아이콘 아래 Spacer 12 / MO padding 24 20 28 · gap 6 · Spacer 8)으로 고정됩니다.
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
                      <td><code>items</code></td>
                      <td><code>{'{ glyph: string; title: ReactNode; desc: ReactNode }[]'}</code></td>
                      <td>-</td>
                      <td>(필수) 카드 목록. 개수만큼 PC 열이 생기고 1024 이하 2열, 모바일 1열(gap 12)로 쌓입니다.</td>
                    </tr>
                    <tr>
                      <td><code>bordered</code></td>
                      <td><code>boolean</code></td>
                      <td><code>true</code></td>
                      <td>카드 테두리. 기술 페이지 도입 효과는 모두 테두리 있는 카드(true)로 통일</td>
                    </tr>
                    <tr>
                      <td><code>className</code></td>
                      <td><code>string</code></td>
                      <td>-</td>
                      <td>그룹 바깥 여백 등 화면별 보정</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24rem' }}>
              <h3 className={styles.title_h3}>1.2. Usage</h3>
              <div className={styles.preview_column}>
                <BenefitCardGroup items={SAMPLE_BENEFITS} />
              </div>
              <CodeBlock code={`import { BasicSection } from '@/components/domain/Section';
import { BenefitCardGroup } from '@/components/domain/Benefit/BenefitCards';

<BasicSection bg="white" layout="vertical" align="left" eyebrow="BENEFITS" title="도입 효과">
  <BenefitCardGroup
    bordered
    items={[
      { glyph: '/images/.../glyph_speed.svg', title: '작업 소요 시간 단축', desc: '모자이크 등 기본 비식별은 …' },
      // …
    ]}
  />
</BasicSection>`} />
            </div>
          </GuideSection>

          <GuideSection title="2. BenefitCard">
            <p className={styles.description}>
              도입 효과 카드 한 장입니다. 그룹 배치가 아닌 곳에서 카드만 필요할 때 목록(<code>ul</code>) 안에 직접 사용합니다.
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
                      <td><code>glyph</code></td>
                      <td><code>string</code></td>
                      <td>-</td>
                      <td>(필수) IconSurface 글리프 SVG 경로</td>
                    </tr>
                    <tr>
                      <td><code>title</code> / <code>desc</code></td>
                      <td><code>ReactNode</code></td>
                      <td>-</td>
                      <td>(필수) 제목(Subheading) · 설명(Body gray-1)</td>
                    </tr>
                    <tr>
                      <td><code>bordered</code></td>
                      <td><code>boolean</code></td>
                      <td><code>true</code></td>
                      <td>카드 테두리</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24rem' }}>
              <h3 className={styles.title_h3}>2.2. Usage</h3>
              <div className={styles.preview}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: '292rem' }}>
                  <BenefitCard {...SAMPLE_BENEFITS[0]} />
                </ul>
              </div>
              <CodeBlock code={`<ul>
  <BenefitCard glyph="/images/.../glyph_speed.svg" title="작업 소요 시간 단축" desc="모자이크 등 기본 비식별은 …" />
</ul>`} />
            </div>
          </GuideSection>

          <GuideSection title="3. BusinessCard">
            <p className={styles.description}>
              Company 사업 영역처럼 아이콘과 제목이 가로 헤더로 놓이고 그 아래 요약이 이어지는 카드입니다. 한 화면에서만 쓰므로 도메인 컴포넌트를 새로 만들지 않고,
              Core <code>Card</code>(박스) + Core <code>IconSurface</code>(아이콘)를 화면에서 직접 조합하며 안쪽 여백·배치는 화면 SCSS로 지정합니다.
              <code>BenefitCard</code>(아이콘 위 · 세로 쌓기)와 같은 부품을 쓰지만 배치가 달라 서로 대체하지 않습니다.
              여러 화면에서 같은 구성으로 반복되면 그때 Preset Wrapper 도메인 컴포넌트로 승격합니다.
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
                      <td><code>Card as</code></td>
                      <td><code>'li' | 'div'</code></td>
                      <td><code>'div'</code></td>
                      <td>목록 안에서는 <code>li</code>로 렌더링합니다.</td>
                    </tr>
                    <tr>
                      <td><code>Card bg</code> / <code>bordered</code></td>
                      <td><code>'white'</code> / <code>boolean</code></td>
                      <td>-</td>
                      <td>흰 배경 + 테두리(<code>bordered</code>). 시안 카드 높이에 테두리를 포함해야 하면 높이를 다시 확인합니다.</td>
                    </tr>
                    <tr>
                      <td><code>IconSurface size</code> / <code>sizeMo</code></td>
                      <td><code>64</code> / <code>48</code></td>
                      <td>-</td>
                      <td>PC 64 · 모바일 48. 크기는 옵션으로만 지정합니다.</td>
                    </tr>
                    <tr>
                      <td><code>IconSurface glyphFit</code></td>
                      <td><code>'fill'</code></td>
                      <td><code>'center'</code></td>
                      <td>글리프 SVG가 자체 여백을 포함할 때 <code>fill</code>을 씁니다.</td>
                    </tr>
                    <tr>
                      <td>화면 SCSS</td>
                      <td>-</td>
                      <td>-</td>
                      <td>padding 32(모바일 24) · 블록 gap 24 · 헤더 gap 16 · 라벨↔제목 gap 8. 도메인 프리셋이 아니라 화면에서 지정합니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.sub_section} style={{ marginTop: '24rem' }}>
              <h3 className={styles.title_h3}>3.2. Usage</h3>
              <div className={styles.preview}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: '400rem' }}>
                  <Card as="li" bg="white" bordered style={{ display: 'flex', flexDirection: 'column', gap: '24rem', padding: '32rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16rem' }}>
                      <IconSurface src={COMPANY_GLYPH} size={64} sizeMo={48} glyphFit="fill" />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                        <span style={{ fontSize: 'var(--font-size-body, 16rem)', lineHeight: 'var(--line-height-body, 1.75)', color: 'var(--color-text-gray-2)' }}>Education</span>
                        <strong style={{ fontSize: 'var(--font-size-subheading, 20rem)', fontWeight: 'var(--font-weight-bold)', lineHeight: 'var(--line-height-subheading, 1.4)', color: 'var(--color-text-black)' }}>교육 솔루션</strong>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-body, 16rem)', lineHeight: 'var(--line-height-body, 1.75)', color: 'var(--color-text-gray-1)' }}>LMS·LCMS·문제은행 등 교육 플랫폼을 개발하고 학습 운영을 지원합니다.</p>
                  </Card>
                </ul>
              </div>
              <CodeBlock code={`import { Card } from '@/components/core/Card/Card';
import { IconSurface } from '@/components/core/Icon/IconSurface';

<ul>
  <Card as="li" bg="white" bordered className={styles.card}>
    <div className={styles.head}>
      <IconSurface src="/images/contact/company/glyph_layers.svg" size={64} sizeMo={48} glyphFit="fill" />
      <div className={styles.copy}>
        <span className={styles.label}>Education</span>
        <strong className={styles.title}>교육 솔루션</strong>
      </div>
    </div>
    <p className={styles.summary}>LMS·LCMS·문제은행 등 교육 플랫폼을 개발하고 학습 운영을 지원합니다.</p>
  </Card>
</ul>

/* SCSS: 여백·배치는 화면에서 지정 */
.card { display: flex; flex-direction: column; gap: 24rem; padding: 32rem; }
.head { display: flex; align-items: center; gap: 16rem; }
.copy { display: flex; flex-direction: column; gap: 8rem; }
.label { @include text-body; color: var(--color-text-gray-2); }
.title { @include text-subheading; color: var(--color-text-black); }
.summary { @include text-body; margin: 0; color: var(--color-text-gray-1); }`} />
            </div>
          </GuideSection>
        </>
      ),
    },
  ];

  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Card</h1>
          <p className={styles.description}>
            배경과 테두리를 가진 radius 12 박스입니다. 화면 안의 정보 묶음을 감싸며, 서비스 공통 카드 패턴은 이 코어를 감싼 도메인 컴포넌트로 만듭니다.
          </p>
        </header>

        <Tabs items={tabItems} defaultActiveId="core" />
      </div>
    </DesignSystemLayout>
  );
}
