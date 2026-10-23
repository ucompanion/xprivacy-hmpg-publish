import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Card } from '../../../../components/core/Card/Card';
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

export default function CardGuidePage() {
  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              Card는 radius 12 박스의 배경과 테두리만 책임집니다. 내부 여백·간격·타이포그래피는 사용처(도메인 컴포넌트 또는 화면)가 정합니다.
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
                    <td><code>'div' | 'li' | 'article'</code></td>
                    <td><code>'div'</code></td>
                    <td>렌더링 태그. 목록 안에서는 <code>li</code>를 사용합니다.</td>
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
            <div className={`${styles.preview} ${styles.row}`}>
              <Card bordered style={{ padding: '24rem' }}>white · bordered</Card>
              <Card bg="gray" style={{ padding: '24rem' }}>gray</Card>
              <Card bg="blue-soft" bordered style={{ padding: '24rem' }}>blue-soft · bordered</Card>
            </div>
            <CodeBlock code={`<Card bordered className={styles.card}>white · bordered</Card>
<Card bg="gray" className={styles.card}>gray</Card>
<Card bg="blue-soft" bordered className={styles.card}>blue-soft · bordered</Card>`} />
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
              <div className={styles.preview}>
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
