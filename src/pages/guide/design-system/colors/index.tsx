import baseStyles from '../template.module.scss';
import styles from './colors.module.scss';
import { GuideSection } from '../components/GuideSection';
import DesignSystemLayout from '../../layouts/DesignSystemLayout';

interface ColorRowProps {
  token: string;
  varName: string;
  hex: string;
  usage: string;
  sample?: string;
  textColor?: string;
  bgDark?: boolean;
}

const ColorRow = ({ token, varName, hex, usage, sample, textColor, bgDark }: ColorRowProps) => (
  <div className={`${styles.colorRow} ${bgDark ? styles.bgDark : ''}`}>
    <div 
      className={styles.swatch} 
      style={{ backgroundColor: hex, border: hex === '#FFFFFF' ? '1rem solid var(--color-border-default)' : undefined }}
    >
      {sample && <span style={{ color: textColor ?? 'inherit', fontWeight: 700, fontSize: '18rem' }}>{sample}</span>}
    </div>
    <div className={styles.info}>
      <p className={styles.tokenName}>{token}</p>
      <p className={styles.tokenSpec}>{hex} · <code>{varName}</code></p>
    </div>
    <div className={styles.usage}>
      <p className={styles.usageText}>{usage}</p>
    </div>
  </div>
);

const ColorsGuidePage = () => {
  return (
    <DesignSystemLayout>
      <div className={baseStyles.wrapper}>
        <header className={baseStyles.header}>
          <h1 className={baseStyles.title_h1}>Colors & Text Colors</h1>
          <p className={baseStyles.description}>
            실제 서비스 화면에서 사용하는 시맨틱 색상 체계입니다.
            원시 색상(primitive)은 추상화하고, UI에는 아래의 시맨틱 토큰만 연결합니다.
          </p>
        </header>

        {/* 1. 텍스트 컬러 위계 */}
        <GuideSection title="1. Text Colors (위계 3단계 & 대비 예외)">
          <p className={baseStyles.description}>
            위계 3단계(Black · Gray1 · Gray2)는 제목/본문 구분 없이 <strong>중요도</strong>에 따라 고릅니다. Inverse는 위계가 아닌 명도 대비 예외입니다.
          </p>
          <div className={styles.colorTable}>
            <ColorRow
              token="text/black"
              varName="var(--color-text-black)"
              hex="#000000"
              usage="핵심 Hero · 주요 제목 · 강조 (흰색 배경 대비 21:1 / #F1F3F4 대비 18.9:1)"
            />
            <ColorRow
              token="text/gray-1"
              varName="var(--color-text-gray-1)"
              hex="#3C4043"
              usage="보조 제목 · 중간 위계 텍스트 (흰색 배경 대비 10.5:1 / #F1F3F4 대비 9.4:1)"
            />
            <ColorRow
              token="text/gray-2"
              varName="var(--color-text-gray-2)"
              hex="#5F6368"
              usage="일반 본문 · 낮은 우선순위 제목 (흰색 배경 대비 6.05:1 / #F1F3F4 대비 5.44:1)"
            />
            <ColorRow
              token="text/inverse"
              varName="var(--color-text-inverse)"
              hex="#FFFFFF"
              usage="대비 예외 — 어두운 Hero · 사진 위 · 브랜드색 버튼 내부 전용 (위계 3단계에 포함하지 않음)"
              bgDark
            />
          </div>
        </GuideSection>

        {/* 2. Brand & Text Accent */}
        <GuideSection title="2. Brand & Text Accent">
          <div className={styles.colorTable}>
            <ColorRow
              token="brand/primary"
              varName="var(--color-brand-primary)"
              hex="#3B5BFF"
              usage="버튼 배경, 테두리, 포커스 및 선택 상태"
            />
            <ColorRow
              token="text/accent"
              varName="var(--color-text-accent)"
              hex="#3B5BFF"
              sample="Aa ✓"
              textColor="#3B5BFF"
              usage="파란 텍스트 예외: 체크 표시(✓), 단계 번호, 브랜드 강조 문구(ON)"
            />
          </div>
        </GuideSection>

        {/* 3. Surface */}
        <GuideSection title="3. Surface (배경)">
          <div className={styles.colorTable}>
            <ColorRow
              token="surface/white"
              varName="var(--color-surface-white)"
              hex="#FFFFFF"
              usage="기본 섹션 바닥, 카드 기본 배경"
            />
            <ColorRow
              token="surface/gray"
              varName="var(--color-surface-gray)"
              hex="#F1F3F4"
              usage="교차 구분 섹션 배경"
            />
            <ColorRow
              token="surface/blue-subtle"
              varName="var(--color-surface-blue-subtle)"
              hex="#EEF1FF"
              usage="강조 카드, 선택 영역 배경"
            />
          </div>
        </GuideSection>

        {/* 4. Border */}
        <GuideSection title="4. Border (외곽선)">
          <div className={styles.colorTable}>
            <ColorRow
              token="border/default"
              varName="var(--color-border-default)"
              hex="#E8EAED"
              usage="카드 · 구분선 기본 테두리"
            />
            <ColorRow
              token="border/strong"
              varName="var(--color-border-strong)"
              hex="#80868B"
              usage="Outline(Secondary) 버튼 테두리"
            />
          </div>
        </GuideSection>
      </div>
    </DesignSystemLayout>
  );
};

export default ColorsGuidePage;
