import baseStyles from '../template.module.scss';
import styles from './typography.module.scss';
import { GuideSection } from '../components/GuideSection';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';

interface TypeCardProps {
  name: string;
  mixinName: string;
  pcSpec: string;
  moSpec: string;
  sample: string;
  role: string;
  isNote?: boolean;
}

const TypeCard = ({ name, mixinName, pcSpec, moSpec, sample, role, isNote }: TypeCardProps) => (
  <div className={`${styles.typeCard} ${isNote ? styles.noteCard : ''}`}>
    <div className={styles.typeHeader}>
      <div>
        <span className={styles.typeName}>{name}</span>
        <code className={styles.mixinTag}>@include {mixinName};</code>
      </div>
      <span className={styles.typeRole}>{role}</span>
    </div>
    
    <div className={styles.specsRow}>
      <span className={styles.specBadge}><strong>PC:</strong> {pcSpec}</span>
      <span className={styles.specBadge}><strong>MO:</strong> {moSpec}</span>
    </div>

    <div className={`${styles.sampleBox} ${styles[mixinName]}`}>
      {sample}
    </div>
  </div>
);

const TypographyGuidePage = () => {
  return (
    <DesignSystemLayout>
      <div className={baseStyles.wrapper}>
        <header className={baseStyles.header}>
          <h1 className={baseStyles.title_h1}>Typography</h1>
          <p className={baseStyles.description}>
            Pretendard Regular(400) · Bold(700) 2종 구성. 기기별 4크기(PC 50/40/20/16 · MO 44/32/20/16)와 공통 Note 12.
            <strong> "색은 스타일에 묶지 않고 텍스트 컬러 변수로 따로 적용합니다."</strong>
          </p>
        </header>

        {/* 1. 서체 기본 원칙 */}
        <GuideSection title="1. 서체 원칙 및 토큰 (Font Family)">
          <div className={styles.policyBox}>
            <div className={styles.policyItem}>
              <strong>단일 메인 UI 서체:</strong>
              <span>Pretendard <code>var(--font-family-base)</code> — 모든 본문, 제목, 버튼 및 UI 컴포넌트 일원화</span>
            </div>
            <div className={styles.policyItem}>
              <strong>코드/데이터 등폭 서체:</strong>
              <span>Consolas, Monaco, monospace <code>var(--font-family-mono)</code> — 코드 블록, 암호화 문자열 전용</span>
            </div>
            <div className={styles.policyItem}>
              <strong>색상 분리 원칙:</strong>
              <span>타이포그래피 믹스인에는 <code>color</code>가 포함되어 있지 않습니다. <code>var(--color-text-black)</code>, <code>var(--color-text-gray-1)</code>, <code>var(--color-text-gray-2)</code>를 조합하여 사용합니다.</span>
            </div>
          </div>
        </GuideSection>

        {/* 2. 5대 핵심 타이포그래피 스케일 */}
        <GuideSection title="2. 타이포그래피 스케일 (PC & Mobile 1:1)">
          <div className={styles.typeGrid}>
            <TypeCard
              name="Hero"
              mixinName="text-hero"
              pcSpec="Bold 50px · 120% · -1.5px"
              moSpec="Bold 44px · 120% · -1px"
              sample="정밀한 탐지부터 안전한 비식별까지"
              role="핵심 Hero 헤드라인"
            />
            <TypeCard
              name="Section"
              mixinName="text-section"
              pcSpec="Bold 40px · 130% · -1px"
              moSpec="Bold 32px · 130% · -0.5px"
              sample="개인정보를 안전하게 보호하는 AI 비식별 통합 솔루션"
              role="섹션 대표 타이틀"
            />
            <TypeCard
              name="Subheading"
              mixinName="text-subheading"
              pcSpec="Bold 20px · 140% · 0px (기존 카드 28 → 20)"
              moSpec="Bold 20px · 140% · 0px"
              sample="개인정보는 OFF, 데이터 가치는 ON"
              role="소제목, 카드 타이틀, 강조 라벨"
            />
            <TypeCard
              name="Body"
              mixinName="text-body"
              pcSpec="Regular 16px · 175% · 0px"
              moSpec="Regular 16px · 160% · 0px (기존 lead 18 · 본문 14 → 16)"
              sample="이미지와 영상 속 개인정보를 AI가 자동으로 탐지하고, 목적에 맞는 방식으로 비식별화하여 안전한 데이터 활용을 지원합니다."
              role="일반 본문, 리드 문구, 설명 텍스트"
            />
            <TypeCard
              name="Eyebrow"
              mixinName="text-eyebrow"
              pcSpec="Regular 16px · 175% · 0px (Uppercase)"
              moSpec="Regular 16px · 160% · 0px (Uppercase)"
              sample="CERTIFICATION"
              role="상단 소제목, 카테고리 영문 라벨 (공통 토큰)"
            />
            <TypeCard
              name="Eyebrow-Section"
              mixinName="text-eyebrow-section"
              pcSpec="Bold 16px · 175% · 0px (입력 그대로)"
              moSpec="Bold 16px · 160% · 0px (입력 그대로)"
              sample="PRODUCT"
              role="히어로 · 베이직 · CTA 섹션 공통 Eyebrow (색: --color-text-eyebrow-section)"
            />
            <TypeCard
              name="Note (공통)"
              mixinName="text-note"
              pcSpec="Regular 12px · 175% · 0px"
              moSpec="Regular 12px · 175% · 0px"
              sample="※ 5채널 이상 및 클라우드형은 별도 견적 · 요건 확정 후 정식 견적서로 제공합니다."
              role="주석 · 출처 · 법적 고지 · 조건 각주 전용"
              isNote
            />
          </div>

          <div className={styles.noteWarningBox}>
            <strong>⚠️ 디자이너/퍼블리셔 주의사항:</strong>
            <p>
              Eyebrow, 버튼, Nav, 번호, 폼/표 라벨은 <code>Note(12px)</code>가 아닙니다!
              반드시 <code>Body(16px)</code> 또는 <code>Subheading(20px)</code>으로 정리하여 가독성을 보장해야 합니다.
            </p>
          </div>
        </GuideSection>

        {/* 3. 중요도에 따른 텍스트 컬러 적용 */}
        <GuideSection title="3. 중요도에 따른 적용 예시 (Usage & Composition)">
          <div className={styles.usageContainer}>
            {/* 같은 스타일, 3가지 색상 */}
            <div className={styles.colorCompareCol}>
              <h4 className={styles.colTitle}>동일한 Section 스타일, 색상별 적용</h4>
              
              <div className={styles.compareItem}>
                <span className={styles.colorTag}>text/black (주요 제목)</span>
                <p className={styles.sampleBlack}>견적 산정 기준</p>
              </div>
              <div className={styles.compareItem}>
                <span className={styles.colorTag}>text/gray-1 (보조 제목)</span>
                <p className={styles.sampleGray1}>견적 산정 기준</p>
              </div>
              <div className={styles.compareItem}>
                <span className={styles.colorTag}>text/gray-2 (낮은 우선순위)</span>
                <p className={styles.sampleGray2}>견적 산정 기준</p>
              </div>
            </div>

            {/* 실제 섹션 계층 조합 */}
            <div className={styles.compositionCol}>
              <h4 className={styles.colTitle}>실제 계층 조합 (Section → Subheading → Body → Note)</h4>
              
              <div className={styles.compBox}>
                <h2 className={styles.compSectionTitle}>하나의 프로세스 파이프라인</h2>
                <h3 className={styles.compSubheading}>High-resolution</h3>
                <p className={styles.compBodyLead}>고해상도 영상에서 멀리 있는 작은 얼굴까지 찾아냅니다.</p>
                <p className={styles.compBody}>
                  영상 속 개인정보를 안정적으로 찾고, 추적하고, 비식별하기 위해 Detection · Tracking · Privacy Processing · Security 기술을 하나의 프로세스 파이프라인으로 구성합니다.
                </p>
                <p className={styles.compNote}>※ On-Premise 및 망분리 환경 완벽 지원</p>
              </div>
            </div>
          </div>
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
};

export default TypographyGuidePage;
