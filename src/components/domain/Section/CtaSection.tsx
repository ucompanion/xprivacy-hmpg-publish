import React from 'react';
import { Section, type SectionProps } from '../../core/Section/Section';
import styles from './CtaSection.module.scss';

export interface CtaSectionProps extends SectionProps {
  /** CTA 변형: 'main' (Figma v2 전폭 소프트 글로우 배너) | 'sub' (카드형 배너) */
  variant?: 'main' | 'sub';
  /** CTA 버튼 그룹 */
  buttons?: React.ReactNode;
  /** 커스텀 배경 이미지 URL (미지정 시 기본 /images/common/ctaSection.jpg 적용) */
  bgImage?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  variant = 'main',
  align,
  theme,
  buttons,
  bgImage,
  headerExtra,
  className = '',
  style,
  ...props
}) => {
  const isMain = variant === 'main';
  const resolvedAlign = align ?? (isMain ? 'center' : 'left');
  const resolvedTheme = theme ?? (isMain ? 'light' : 'dark');

  const combinedExtra = (
    <div className={styles.ctaExtraWrap}>
      {buttons && <div className={styles.buttonsWrap}>{buttons}</div>}
      {headerExtra}
    </div>
  );

  const customStyle: React.CSSProperties = {
    ...style,
    ...(bgImage ? { backgroundImage: `url(${bgImage})` } : {}),
  };

  return (
    <Section
      layout="vertical"
      align={resolvedAlign}
      theme={resolvedTheme}
      bg="transparent"
      headerExtra={combinedExtra}
      className={`${styles.ctaSection} ${styles[`variant_${variant}`]} ${className}`.trim()}
      style={customStyle}
      headerClassName={styles.ctaHeader}
      titleClassName={styles.ctaTitle}
      eyebrowClassName={styles.ctaEyebrow}
      descriptionClassName={styles.ctaDescription}
      {...props}
    />
  );
};
