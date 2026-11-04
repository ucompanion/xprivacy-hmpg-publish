import React from 'react';
import { Section, type SectionProps } from '../../core/Section/Section';
import styles from './HeroSection.module.scss';

export interface HeroSectionProps extends Omit<SectionProps, 'theme'> {
  bgImage?: string;
  /** 배경 프리셋: 'technology' = 흰 바탕 + Technology 이미지(70%) + 브랜드 틴트(기술 페이지 공통) */
  bgPreset?: 'technology';
  heroVariant?: 'full' | 'compact';
  keywords?: string[];
  buttons?: React.ReactNode;
  brandTint?: boolean;
  theme?: 'light' | 'dark';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  className = '',
  bgImage,
  bgPreset,
  heroVariant = 'full',
  theme = 'light',
  align,
  keywords,
  buttons,
  brandTint = true,
  headerExtra,
  children,
  style,
  ...props
}) => {
  // Full 타입은 기본 center, Compact 타입은 기본 left 정렬
  const resolvedAlign = align ?? (heroVariant === 'full' ? 'center' : 'left');

  // 버튼 또는 키워드 칩을 헤더 하단 extra 영역으로 결합 (존재할 때만 렌더링)
  const hasExtra = [buttons, keywords?.length, headerExtra].some(Boolean);
  const combinedExtra = hasExtra ? (
    <div className={styles.heroExtraWrap}>
      {buttons && <div className={styles.buttonsWrap}>{buttons}</div>}
      {keywords && keywords.length > 0 && (
        <div className={styles.keywordsWrap}>
          {keywords.map((kw) => (
            <span key={kw} className={styles.keywordChip}>
              {kw}
            </span>
          ))}
        </div>
      )}
      {headerExtra}
    </div>
  ) : undefined;

  const customStyle: React.CSSProperties = {
    ...style,
    ...(bgImage ? { backgroundImage: `url(${bgImage})` } : {}),
  };

  return (
    <div 
      className={`${styles.heroSectionWrap} ${styles[heroVariant]} ${styles[`align_${resolvedAlign}`]} ${styles[`theme_${theme}`]} ${bgPreset ? styles[`bg_${bgPreset}`] : ''} ${className}`.replace(/\s+/g, ' ').trim()} 
      style={customStyle}
    >
      {/* 피그마 v2 라이트 시안: 소프트 스카이/시안 3D 글래스 림 글로우 오버레이 (배경 이미지 미지정 시 폴백) */}
      {brandTint && !bgImage && (
        <>
          <div className={styles.glassGlowOverlay} aria-hidden="true" />
          <div className={styles.glassCurveEffect} aria-hidden="true" />
        </>
      )}

      <Section
        layout="vertical"
        align={resolvedAlign}
        theme={theme}
        bg="transparent"
        headerExtra={combinedExtra}
        className={styles.heroInnerSection}
        contentClassName={styles.heroContentWrap}
        headerClassName={`${styles.heroHeader} ${heroVariant === 'full' ? styles.fullHeader : styles.compactHeader}`}
        titleClassName={styles.heroTitle}
        eyebrowClassName={styles.heroEyebrow}
        descriptionClassName={styles.heroDescription}
        {...props}
      >
        {children}
      </Section>
    </div>
  );
};
