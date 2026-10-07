import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Section, SectionHeader } from '../../../../components/core/Section';

export default function SectionGuidePage() {
  const tabItems = [
    {
      id: 'core',
      label: 'Core',
      content: (
        <>
          {/* 1. Overview & Specs */}
          <GuideSection title="1. Overview & Specs">
            <p className={styles.description}>
              Section 컴포넌트는 모든 서브페이지에서 공통으로 반복되는 섹션 헤더(eyebrow, title, description)와 
              본문(children)의 배치 구조(상하, 좌우, 우좌) 및 정렬(좌측, 중앙)을 일관되게 제공하는 코어 레이아웃 컴포넌트입니다.
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
                    <td><code>eyebrow</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>섹션 상단 소제목/라벨 (대문자 카테고리 등)</td>
                  </tr>
                  <tr>
                    <td><code>title</code></td>
                    <td><code>ReactNode</code></td>
                    <td>(필수 권장)</td>
                    <td>섹션 메인 제목 (H2 시맨틱 마크업)</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>섹션 보조 설명문</td>
                  </tr>
                  <tr>
                    <td><code>align</code></td>
                    <td><code>'left' | 'center'</code></td>
                    <td><code>'left'</code></td>
                    <td>텍스트 및 헤더 정렬 방향</td>
                  </tr>
                  <tr>
                    <td><code>layout</code></td>
                    <td><code>'vertical' | 'horizontal' | 'horizontal-reverse'</code></td>
                    <td><code>'vertical'</code></td>
                    <td>헤더와 본문(children)의 배치 구조</td>
                  </tr>
                  <tr>
                    <td><code>theme</code></td>
                    <td><code>'light' | 'dark'</code></td>
                    <td><code>'light'</code></td>
                    <td>섹션 컬러 테마 (기본값 라이트, 어두운 배경용 다크)</td>
                  </tr>
                  <tr>
                    <td><code>headerExtra</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>헤더 영역 하단에 배치할 링크, 버튼, 뱃지 등</td>
                  </tr>
                  <tr>
                    <td><code>contained</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>최대 본문 너비(1200rem) 제한 및 가운데 정렬 여부</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>섹션 본문 컨텐츠 요소</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>

          {/* 2. Vertical Layout (상하 기본형) */}
          <GuideSection title="2. Vertical Layout (상하 기본구조)">
            <p className={styles.description}>
              헤더가 상단에 위치하고 본문이 하단에 배치되는 가장 표준적인 상하 기본 구조입니다. (`layout="vertical"`, `align="left"`)
            </p>
            <div className={styles.preview}>
              <Section
                eyebrow="PROCESS"
                title="AI가 먼저 처리하고 필요한 부분만 직접 조정합니다"
                description="경량형 멤버들을 감지하고 특정 인물을 선택하거나 과다 영역을 직접 조정하고 보호할 수 있습니다."
                align="left"
                layout="vertical"
              >
                <div style={{ padding: '24rem', background: '#f1f5f9', borderRadius: '8rem', textAlign: 'center', color: '#64748b' }}>
                  [섹션 본문 컨텐츠 영역 - 카드, 그리드, 목업 등]
                </div>
              </Section>
            </div>
            <CodeBlock code={`<Section
  eyebrow="PROCESS"
  title="AI가 먼저 처리하고 필요한 부분만 직접 조정합니다"
  description="경량형 멤버들을 감지하고 특정 인물을 선택하거나 과다 영역을 직접 조정하고 보호할 수 있습니다."
  align="left"
  layout="vertical"
>
  <div>[섹션 본문 컨텐츠 영역]</div>
</Section>`} />
          </GuideSection>

          {/* 3. Horizontal Layout (좌우 분할형) */}
          <GuideSection title="3. Horizontal Layout (헤더 좌측 / 본문 우측)">
            <p className={styles.description}>
              헤더 영역이 좌측(약 45%)에 위치하고, 본문 컨텐츠가 우측(약 55%)에 나란히 배치되는 가로 분할 구조입니다. (`layout="horizontal"`)
              모바일 뷰포트에서는 자동으로 세로로 전환됩니다.
            </p>
            <div className={styles.preview}>
              <Section
                eyebrow="PREMIUM"
                title={<>안전하게 보호하는<br />AI 비식별 통합 솔루션</>}
                description="영상 속 개인정보를 식별 가능한 부분을 자동 블러 처리해 안전한 데이터 환경을 제공합니다."
                headerExtra={<a href="#none" style={{ color: '#3b5bff', fontSize: '14rem', fontWeight: 600 }}>가이드 다운로드 →</a>}
                align="left"
                layout="horizontal"
              >
                <div style={{ height: '160rem', background: '#0f172a', borderRadius: '8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                  [우측 미디어 / 대시보드 목업 컨텐츠]
                </div>
              </Section>
            </div>
            <CodeBlock code={`<Section
  eyebrow="PREMIUM"
  title={<>안전하게 보호하는<br />AI 비식별 통합 솔루션</>}
  description="영상 속 개인정보를 식별 가능한 부분을 자동 블러 처리해 안전한 데이터 환경을 제공합니다."
  headerExtra={<a href="#none">가이드 다운로드 →</a>}
  align="left"
  layout="horizontal"
>
  <div>[우측 미디어 / 대시보드 목업 컨텐츠]</div>
</Section>`} />
          </GuideSection>

          {/* 4. Horizontal Reverse Layout (본문 좌측 / 헤더 우측) */}
          <GuideSection title="4. Horizontal Reverse Layout (본문 좌측 / 헤더 우측)">
            <p className={styles.description}>
              지그재그형 레이아웃 구성 시 본문 컨텐츠가 좌측, 헤더가 우측에 배치되는 역방향 분할 구조입니다. (`layout="horizontal-reverse"`)
            </p>
            <div className={styles.preview}>
              <Section
                eyebrow="SECURITY"
                title="완벽한 온프레미스 망분리 환경 지원"
                description="외부 인터넷 연결 없이 폐쇄망에서도 독립적으로 동작하며 보안 감사를 지원합니다."
                align="left"
                layout="horizontal-reverse"
              >
                <div style={{ height: '160rem', background: '#e2e8f0', borderRadius: '8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                  [좌측 컨텐츠 영역]
                </div>
              </Section>
            </div>
            <CodeBlock code={`<Section
  eyebrow="SECURITY"
  title="완벽한 온프레미스 망분리 환경 지원"
  description="외부 인터넷 연결 없이 폐쇄망에서도 독립적으로 동작하며 보안 감사를 지원합니다."
  align="left"
  layout="horizontal-reverse"
>
  <div>[좌측 컨텐츠 영역]</div>
</Section>`} />
          </GuideSection>

          {/* 5. Center Alignment */}
          <GuideSection title="5. Center Alignment (중앙 정렬형)">
            <p className={styles.description}>
              헤더의 라벨, 타이틀, 설명문이 모두 중앙으로 정렬되는 패턴입니다. (`align="center"`)
            </p>
            <div className={styles.preview}>
              <Section
                eyebrow="FEATURES"
                title="핵심 기능을 한눈에 살펴보세요"
                description="누구나 손쉽게 비식별화 파이프라인을 구축하고 관리할 수 있습니다."
                align="center"
                layout="vertical"
              >
                <div style={{ padding: '24rem', background: '#f8fafc', border: '1rem dashed #cbd5e1', borderRadius: '8rem', textAlign: 'center', color: '#64748b' }}>
                  [중앙 정렬된 섹션 본문 영역]
                </div>
              </Section>
            </div>
            <CodeBlock code={`<Section
  eyebrow="FEATURES"
  title="핵심 기능을 한눈에 살펴보세요"
  description="누구나 손쉽게 비식별화 파이프라인을 구축하고 관리할 수 있습니다."
  align="center"
  layout="vertical"
>
  <div>[중앙 정렬된 섹션 본문 영역]</div>
</Section>`} />
          </GuideSection>

          {/* 6. Standalone SectionHeader */}
          <GuideSection title="6. Standalone SectionHeader (독립 헤더 단독 사용)">
            <p className={styles.description}>
              별도의 래퍼 태그 없이 순수 헤더 마크업만 필요할 때 `SectionHeader` 컴포넌트를 직접 호출할 수 있습니다.
            </p>
            <div className={styles.preview}>
              <SectionHeader
                eyebrow="STANDALONE"
                title="단독 헤더 블록"
                description="컨테이너 없이 필요한 곳에 자유롭게 배치하여 사용할 수 있습니다."
                align="left"
              />
            </div>
            <CodeBlock code={`<SectionHeader
  eyebrow="STANDALONE"
  title="단독 헤더 블록"
  description="컨테이너 없이 필요한 곳에 자유롭게 배치하여 사용할 수 있습니다."
  align="left"
/>`} />
          </GuideSection>

          {/* 7. Dark Theme */}
          <GuideSection title="7. Dark Theme (다크 테마)">
            <p className={styles.description}>
              어두운 배경 화면이나 다크 모드 섹션에서 사용할 수 있는 테마 옵션입니다. (`theme="dark"`)
              타이틀은 순백색(`#ffffff`), 설명문과 라벨은 가독성 높은 밝은 톤으로 자동 전환됩니다.
            </p>
            <div className={styles.preview} style={{ background: '#0b0b0b', padding: '32rem', borderRadius: '8rem' }}>
              <Section
                eyebrow="DARK MODE"
                title="어두운 배경에서도 완벽한 가독성"
                description="다크 테마가 적용되면 텍스트와 라벨 색상이 어두운 배경에 최적화된 밝은 톤으로 자동 변경됩니다."
                theme="dark"
                align="left"
                layout="vertical"
              >
                <div style={{ padding: '24rem', background: '#1e293b', borderRadius: '8rem', textAlign: 'center', color: '#94a3b8' }}>
                  [다크 테마 본문 컨텐츠 영역]
                </div>
              </Section>
            </div>
            <CodeBlock code={`<Section
  eyebrow="DARK MODE"
  title="어두운 배경에서도 완벽한 가독성"
  description="다크 테마가 적용되면 텍스트와 라벨 색상이 어두운 배경에 최적화된 밝은 톤으로 자동 변경됩니다."
  theme="dark"
  align="left"
  layout="vertical"
>
  <div>[다크 테마 본문 컨텐츠 영역]</div>
</Section>`} />
          </GuideSection>
        </>
      ),
    },
    {
      id: 'domain',
      label: 'Domain',
      content: (
        <>
          <GuideSection title="1. Overview & Policy">
            <p className={styles.description}>
              Section 컴포넌트는 비즈니스 도메인(업무 정책, 상태 코드 등)에 종속되지 않는 <strong>순수 레이아웃 및 프레젠테이션 코어 컴포넌트</strong>입니다.
              따라서 도메인 컴포넌트를 불필요하게 신설하지 않고, 화면별로 <code>Section</code> 코어 컴포넌트를 직접 import하여 속성(<code>layout</code>, <code>align</code>, <code>eyebrow</code>, <code>title</code> 등)을 조합해 사용할 것을 강력히 권장합니다.
            </p>
          </GuideSection>
        </>
      ),
    },
  ];

  return (
    <DesignSystemLayout>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title_h1}>Section</h1>
          <p className={styles.description}>
            서브페이지 전반에서 공통으로 반복되는 H2 헤더 구조(eyebrow, title, description)와 
            상하/좌우/우좌 배치 레이아웃 패턴을 제공하는 표준 코어 컴포넌트입니다.
          </p>
        </header>

        <Tabs items={tabItems} defaultActiveId="core" />
      </div>
    </DesignSystemLayout>
  );
}
