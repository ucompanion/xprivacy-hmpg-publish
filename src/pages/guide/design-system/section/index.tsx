import styles from '../template.module.scss';
import { GuideSection } from '../components/GuideSection';
import { CodeBlock } from '../components/CodeBlock';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';
import { Tabs } from '../../../../components/core/Tabs/Tabs';
import { Section, SectionHeader } from '../../../../components/core/Section';
import { HeroSection, CtaSection, BasicSection } from '../../../../components/domain/Section';
import { Button } from '../../../../components/core/Button/Button';

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
                    <td>본문 최대 너비 1240rem(var(--layout-max-width)) + 좌우 거터(var(--layout-gutter)) = 컨테이너 1280rem(var(--layout-container-max-width)) 적용, 가운데 정렬 여부</td>
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
          {/* 1. HeroSection */}
          <GuideSection title="1. HeroSection">
            <p className={styles.description}>
              페이지 상단 대표 비주얼 및 인트로 헤더를 제공하는 도메인 섹션 컴포넌트입니다.
              Figma 디자인 시스템 v2 규격의 브랜드 림 그라데이션 조명(블루→시안→민트)과 다크 딤 오버레이를 내장하며,
              메인 인트로용 <strong>Full 타입</strong>과 서브 상세용 <strong>Compact 타입</strong>을 제공합니다.
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
                    <td><code>heroVariant</code></td>
                    <td><code>'full' | 'compact'</code></td>
                    <td><code>'full'</code></td>
                    <td>히어로 섹션 레이아웃 (Full: 100svh 중앙형 / Compact: 480rem 좌측형)</td>
                  </tr>
                  <tr>
                    <td><code>keywords</code></td>
                    <td><code>string[]</code></td>
                    <td>-</td>
                    <td>Compact 전용 강조 키워드 필 칩 배열</td>
                  </tr>
                  <tr>
                    <td><code>bgPreset</code></td>
                    <td><code>'technology'</code></td>
                    <td>-</td>
                    <td>배경 프리셋. technology: 흰 바탕 + Technology 이미지(70%) + 브랜드 틴트(color 블렌드), 기술 페이지 공통</td>
                  </tr>
                  <tr>
                    <td><code>buttons</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>히어로 하단 액션 버튼 그룹 (PC 가로 배치, MO 세로 스택)</td>
                  </tr>
                  <tr>
                    <td><code>brandTint</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>브랜드 틴트 그라데이션 오버레이 (#3B5BFF→#3DB7FF→#22C3D7) 적용 여부</td>
                  </tr>
                  <tr>
                    <td><code>bgImage</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>배경 이미지 URL (다크 딤 및 틴트 자동 결합)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '32rem 0 12rem' }}>1.2. Usage - Full Type (대표 비주얼 · 중앙형)</h3>
            <div className={styles.preview}>
              <HeroSection
                heroVariant="full"
                eyebrow="PRODUCT"
                title="정밀한 탐지부터 안전한 비식별까지"
                description="영상 속 개인정보를 찾는 하나의 프로세스 파이프라인으로 구성합니다."
                buttons={
                  <>
                    <Button variant="solid" color="primary" size="xl">
                      기술 살펴보기
                    </Button>
                    <Button variant="outline" color="neutral" size="xl">
                      도입 문의
                    </Button>
                  </>
                }
              />
            </div>
            <CodeBlock code={`<HeroSection
  heroVariant="full"
  eyebrow="PRODUCT"
  title="정밀한 탐지부터 안전한 비식별까지"
  description="영상 속 개인정보를 찾는 하나의 프로세스 파이프라인으로 구성합니다."
  buttons={
    <>
      <Button variant="solid" color="primary" size="xl">기술 살펴보기</Button>
      <Button variant="outline" color="neutral" size="xl">도입 문의</Button>
    </>
  }
/>`} />

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '32rem 0 12rem' }}>1.3. Usage - Compact Type (서브 헤더 · 좌측형)</h3>
            <div className={styles.preview}>
              <HeroSection
                heroVariant="compact"
                eyebrow="DEPLOYMENT & PRICING"
                title="운영 환경에 맞는 도입 방식을 선택하세요."
                description="망분리 여부와 처리 규모에 따라 선택하며, 금액은 요건 확정 후 별도 견적서로 제공합니다."
                keywords={['망분리 온프레미스', '복원 불가 비가역 처리', '2026.03 가이드라인 대응']}
              />
            </div>
            <CodeBlock code={`<HeroSection
  heroVariant="compact"
  eyebrow="DEPLOYMENT & PRICING"
  title="운영 환경에 맞는 도입 방식을 선택하세요."
  description="망분리 여부와 처리 규모에 따라 선택하며, 금액은 요건 확정 후 별도 견적서로 제공합니다."
  keywords={['망분리 온프레미스', '복원 불가 비가역 처리', '2026.03 가이드라인 대응']}
/>`} />
          </GuideSection>

          {/* 2. CtaSection */}
          <GuideSection title="2. CtaSection">
            <p className={styles.description}>
              페이지 하단에서 사용자에게 도입 문의나 체험을 유도하는 도메인 전환(Call-To-Action) 섹션 컴포넌트입니다.
              전폭 소프트 글로우 스타일의 <strong>Main 타입</strong>과 컴팩트 카드 형태의 <strong>Sub 타입</strong>을 제공합니다.
            </p>

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '24rem 0 12rem' }}>2.1. Specs</h3>
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
                    <td><code>variant</code></td>
                    <td><code>'main' | 'sub'</code></td>
                    <td><code>'main'</code></td>
                    <td>CTA 변형 (Main: 전폭 소프트 글로우 배너 / Sub: 다크 카드 배너)</td>
                  </tr>
                  <tr>
                    <td><code>primaryLabel</code> / <code>primaryHref</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>주 버튼(Button/v2 Primary) 문구 · 이동 경로</td>
                  </tr>
                  <tr>
                    <td><code>secondaryLabel</code> / <code>secondaryHref</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>보조 버튼(Button/v2 Secondary · 흰 80%) 문구 · 이동 경로</td>
                  </tr>
                  <tr>
                    <td><code>buttons</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>버튼 그룹 직접 구성 (지정하면 primary/secondary 버튼 대신 사용)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '32rem 0 12rem' }}>2.2. Usage - Main Type (소프트 글로우 전폭 배너)</h3>
            <div className={styles.preview}>
              <CtaSection
                variant="main"
                eyebrow="GET STARTED"
                title={<>업무 환경에 맞는 서비스를<br />직접 확인해보세요</>}
                description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
                primaryLabel="도입 문의하기"
                primaryHref="/pub/contact/inquiry"
                secondaryLabel="데모 체험하기"
                secondaryHref="/pub/demo/demo"
              />
            </div>
            <CodeBlock code={`<CtaSection
  variant="main"
  eyebrow="GET STARTED"
  title={<>업무 환경에 맞는 서비스를<br />직접 확인해보세요</>}
  description="무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다."
  primaryLabel="도입 문의하기"
  primaryHref="/pub/contact/inquiry"
  secondaryLabel="데모 체험하기"
  secondaryHref="/pub/demo/demo"
/>`} />

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '32rem 0 12rem' }}>2.3. Usage - Sub Type (카드형 다크 배너)</h3>
            <div className={styles.preview}>
              <CtaSection
                variant="sub"
                eyebrow="FAST ONBOARDING"
                title="도입 전 PoC 검증을 신청하세요"
                description="실제 사내 데이터 샘플로 비식별 성능과 정확도를 직접 평가할 수 있습니다."
                buttons={
                  <Button variant="solid" color="primary" size="xl">
                    PoC 검증 신청
                  </Button>
                }
              />
            </div>
            <CodeBlock code={`<CtaSection
  variant="sub"
  eyebrow="FAST ONBOARDING"
  title="도입 전 PoC 검증을 신청하세요"
  description="실제 사내 데이터 샘플로 비식별 성능과 정확도를 직접 평가할 수 있습니다."
  buttons={
    <Button variant="solid" color="primary" size="xl">PoC 검증 신청</Button>
  }
/>`} />
          </GuideSection>

          {/* 3. BasicSection */}
          <GuideSection title="3. BasicSection">
            <p className={styles.description}>
              페이지 본문 구성 시 사용하는 서비스 공통 기본 섹션 프리셋 컴포넌트입니다.
              코어 <code>Section</code>의 모든 옵션(<code>layout</code>, <code>align</code>, <code>theme</code> 등)을 그대로 지원하며,
              <code>bg="white"</code>와 <code>bg="gray"</code>로 페이지 간 리듬감 있는 교차 배경을 손쉽게 설정할 수 있습니다.
            </p>

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '24rem 0 12rem' }}>3.1. Specs</h3>
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
                    <td><code>bg</code></td>
                    <td><code>'white' | 'gray' | 'transparent'</code></td>
                    <td><code>'white'</code></td>
                    <td>섹션 배경색 (white: 순백색 / gray: #f1f3f4 / transparent: 투명)</td>
                  </tr>
                  <tr>
                    <td><code>layout</code></td>
                    <td><code>'vertical' | 'horizontal' | 'horizontal-reverse'</code></td>
                    <td><code>'vertical'</code></td>
                    <td>헤더와 본문 간의 배치 축</td>
                  </tr>
                  <tr>
                    <td><code>align</code></td>
                    <td><code>'left' | 'center'</code></td>
                    <td><code>'left'</code></td>
                    <td>헤더 텍스트 정렬 방향</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '32rem 0 12rem' }}>3.2. Usage - Vertical Layout (표준 상하형)</h3>
            <div className={styles.preview}>
              <BasicSection
                bg="white"
                eyebrow="PROCESS"
                title="하나의 프로세스 파이프라인"
                description="Detection·Tracking·Privacy Processing·Security 기술을 통해 개인정보를 안전하게 보호합니다."
              >
                <div style={{ padding: '32rem', background: 'var(--color-surface-gray)', borderRadius: '8rem', textAlign: 'center', color: 'var(--color-text-gray-1)' }}>
                  [페이지 본문 인터랙션 컨텐츠 - 파이프라인 단계 카드 등]
                </div>
              </BasicSection>
            </div>
            <CodeBlock code={`<BasicSection
  bg="white"
  eyebrow="PROCESS"
  title="하나의 프로세스 파이프라인"
  description="Detection·Tracking·Privacy Processing·Security 기술을 통해 개인정보를 안전하게 보호합니다."
>
  <div>[페이지 본문 컨텐츠]</div>
</BasicSection>`} />

            <h3 style={{ fontSize: '18rem', fontWeight: 700, margin: '32rem 0 12rem' }}>3.3. Usage - Horizontal Layout (좌우 분할형)</h3>
            <div className={styles.preview}>
              <BasicSection
                bg="gray"
                layout="horizontal"
                eyebrow="ON-PREMISE"
                title="완벽한 폐쇄망 온프레미스 지원"
                description="외부 인터넷 연결 없이 독립 동작하여 기관 내부 보안 규정을 100% 준수합니다."
              >
                <div style={{ padding: '32rem', background: 'var(--color-surface-white)', border: '1rem solid var(--color-border-default)', borderRadius: '8rem', textAlign: 'center', color: 'var(--color-text-gray-1)' }}>
                  [우측 다이어그램 및 아키텍처 블록]
                </div>
              </BasicSection>
            </div>
            <CodeBlock code={`<BasicSection
  bg="gray"
  layout="horizontal"
  eyebrow="ON-PREMISE"
  title="완벽한 폐쇄망 온프레미스 지원"
  description="외부 인터넷 연결 없이 독립 동작하여 기관 내부 보안 규정을 100% 준수합니다."
>
  <div>[우측 다이어그램 및 아키텍처 블록]</div>
</BasicSection>`} />
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
