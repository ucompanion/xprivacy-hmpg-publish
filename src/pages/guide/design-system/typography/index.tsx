import baseStyles from '../template.module.scss';
import styles from './typography.module.scss';
import { GuideSection } from '../components/GuideSection';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';

// 단일 타이포그래피 스펙 렌더링을 위한 공통 컴포넌트
const TypeRow = ({ name, mixinName, size, weight, lh, sample }: { name: string; mixinName: string; size: number; weight: number; lh: string; sample: string }) => (
  <div className={styles.row}>
    <div className={styles.meta}>
      <span className={styles.name}>{name}</span>
      <span className={styles.mixin_name} style={{ display: 'block', fontSize: '12px', color: '#3b82f6', marginTop: '4px' }}>
        @include {mixinName};
      </span>
      <span className={styles.spec}>
        {size}px / W{weight} / LH {lh}
      </span>
    </div>
    <div
      className={`${styles.sample} ${styles[mixinName]}`}
    >
      {sample}
    </div>
  </div>
);

const TypographyGuidePage = () => {
  const sampleText = 'The quick brown fox jumps over the lazy dog. 프로젝트 디자인 시스템 가이드입니다.';

  return (
    <DesignSystemLayout>
      <div className={baseStyles.wrapper}>
        <header className={baseStyles.header}>
          <h1 className={baseStyles.title_h1}>Typography</h1>
          <p className={baseStyles.description}>
            xPrivacy 디자인 시스템의 서체 체계(Font Family), 토큰 변수, 그리고 용도별 4단계 텍스트 스케일을 안내합니다.
          </p>
        </header>

        {/* 1. 도입부: 서체 시스템 (Font Family Architecture) */}
        <GuideSection title="1. Font Family Architecture (서체 구성 및 토큰)">
          <p className={baseStyles.description}>
            xPrivacy는 웹 성능 최적화와 화면 일관성을 위해 <strong>단일 메인 UI 서체(Pretendard)</strong>와 <strong>코드/데이터 전용 등폭 서체(Monospace)</strong> 2가지 역할로 명확히 분리하여 운용합니다.
          </p>

          {/* 폰트 카드 쇼케이스 */}
          <div className={styles.font_grid}>
            {/* Primary UI Font */}
            <div className={`${styles.font_card} ${styles.primary}`}>
              <div className={styles.font_header}>
                <span className={styles.font_badge}>Primary UI</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>단일 메인 서체</span>
              </div>
              <h3 className={styles.font_title}>Pretendard</h3>
              
              <div className={styles.font_preview_hero}>
                <div className={styles.hero_chars} style={{ fontFamily: 'var(--font-family-base)' }}>
                  Aa Bb 123 가나다
                </div>
                <div className={styles.hero_sub} style={{ fontFamily: 'var(--font-family-base)' }}>
                  다람쥐 헌 쳇바퀴에 타고파. The quick brown fox.
                </div>
              </div>

              <div className={styles.font_meta}>
                <div className={styles.meta_item}>
                  <span>구분 / 역할</span>
                  <span className={styles.meta_val}>기본 본문 및 전체 UI 서체</span>
                </div>
                <div className={styles.meta_item}>
                  <span>CSS 변수</span>
                  <code>var(--font-family-base)</code>
                </div>
                <div className={styles.meta_item}>
                  <span>폰트 스택</span>
                  <span className={styles.meta_val} style={{ fontSize: '11px', color: '#64748b' }}>
                    Pretendard, system-ui, -apple-system, sans-serif
                  </span>
                </div>
                <div className={styles.meta_item}>
                  <span>적용 대상</span>
                  <span className={styles.meta_val}>GNB, Headline, Title, Body, Button, Form 등</span>
                </div>
              </div>
            </div>

            {/* Monospace Code Font */}
            <div className={`${styles.font_card} ${styles.mono}`}>
              <div className={styles.font_header}>
                <span className={styles.font_badge}>Monospace</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>보조 등폭 서체</span>
              </div>
              <h3 className={styles.font_title}>Consolas / Monaco</h3>

              <div className={styles.font_preview_hero}>
                <div className={styles.hero_chars} style={{ fontFamily: 'var(--font-family-mono)', fontSize: '24px' }}>
                  &#123; const id: 1024; &#125;
                </div>
                <div className={styles.hero_sub} style={{ fontFamily: 'var(--font-family-mono)' }}>
                  0123456789 ABCDEF [] &lt;&gt;
                </div>
              </div>

              <div className={styles.font_meta}>
                <div className={styles.meta_item}>
                  <span>구분 / 역할</span>
                  <span className={styles.meta_val}>소스코드 및 기술 데이터 전용</span>
                </div>
                <div className={styles.meta_item}>
                  <span>CSS 변수</span>
                  <code>var(--font-family-mono)</code>
                </div>
                <div className={styles.meta_item}>
                  <span>폰트 스택</span>
                  <span className={styles.meta_val} style={{ fontSize: '11px', color: '#64748b' }}>
                    Consolas, Monaco, 'Courier New', monospace
                  </span>
                </div>
                <div className={styles.meta_item}>
                  <span>적용 대상</span>
                  <span className={styles.meta_val}>&lt;CodeBlock&gt;, &lt;code&gt;, 토큰 키값, 암호화 문자열 등</span>
                </div>
              </div>
            </div>
          </div>

          {/* 서체 운용 가이드라인 콜아웃 */}
          <div className={styles.font_policy_box}>
            <h4>💡 서체 운용 및 토큰 사용 원칙 (Typography Policy)</h4>
            <ul>
              <li>
                <strong>단일 메인 폰트 원칙 (Single Primary Font):</strong> 여러 웹폰트를 혼용할 때 발생하는 리소스 과다 로딩(FOIT/FOUT 깜빡임)과 서체 간 베이스라인 불일치를 방지하기 위해, 일반 UI는 <strong>'Pretendard' 단 1개의 가변(Variable) 서체</strong>로 전면 일원화합니다. (영문/숫자 또한 별도 서체 없이 Pretendard에 내장된 글꼴을 사용합니다.)
              </li>
              <li>
                <strong>코드/데이터 전용 보조 서체 분리:</strong> 소스코드나 시스템 토큰값, 암호화 문자열처럼 글자 폭(Ch-width)이 정확히 일치해야 하는 영역에 한해 시스템 등폭 서체인 <strong>'Monospace'</strong>를 보조로 분리하여 적용합니다.
              </li>
              <li>
                <strong>CSS 디자인 토큰 변수 필수 참조:</strong> 퍼블리싱 및 컴포넌트 개발 시 인라인 폰트명을 하드코딩하지 않고, 반드시 전역 디자인 토큰인 <code>var(--font-family-base)</code>와 <code>var(--font-family-mono)</code>를 사용합니다.
              </li>
            </ul>
          </div>
        </GuideSection>

        {/* 2. Display 영역 */}
        <GuideSection title="2. Display">
            <TypeRow name="Hero" mixinName="text-display-hero" size={64} weight={700} lh="1.2" sample={sampleText} />
        </GuideSection>
        
        {/* 3. Heading 영역 */}
        <GuideSection title="3. Heading">
            <TypeRow name="Section" mixinName="text-heading-section" size={50} weight={700} lh="1.2" sample={sampleText} />
            <TypeRow name="Card" mixinName="text-heading-card" size={28} weight={700} lh="1.4" sample={sampleText} />
            <TypeRow name="Item" mixinName="text-heading-item" size={20} weight={700} lh="1.4" sample={sampleText} />
            <TypeRow name="Item-Small" mixinName="text-heading-item-small" size={16} weight={700} lh="1.4" sample={sampleText} />
        </GuideSection>

        {/* 4. CTA 영역 */}
        <GuideSection title="4. CTA">
            <TypeRow name="Heading" mixinName="text-cta-heading" size={50} weight={600} lh="1.2" sample={sampleText} />
        </GuideSection>

        {/* 5. Label 영역 */}
        <GuideSection title="5. Label">
            <TypeRow name="Eyebrow" mixinName="text-label-eyebrow" size={12} weight={800} lh="1.5" sample={sampleText} />
            <TypeRow name="Number" mixinName="text-label-number" size={12} weight={400} lh="1.5" sample={sampleText} />
        </GuideSection>

        {/* 6. Body 영역 */}
        <GuideSection title="6. Body">
            <TypeRow name="Lead" mixinName="text-body-lead" size={16} weight={400} lh="1.75" sample={sampleText} />
            <TypeRow name="Small" mixinName="text-body-small" size={14} weight={400} lh="1.75" sample={sampleText} />
            <TypeRow name="Caption" mixinName="text-body-caption" size={12} weight={400} lh="1.5" sample={sampleText} />
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
};

export default TypographyGuidePage;
