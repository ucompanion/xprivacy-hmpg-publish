import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, type SectionProps } from '../../core/Section/Section';
import { Button } from '../../core/Button/Button';
import styles from './CtaSection.module.scss';

export interface CtaSectionProps extends SectionProps {
  /** CTA 변형: 'main' (Figma CTA/v2 전폭 소프트 글로우 배너 2528:61316) | 'sub' (카드형 배너) */
  variant?: 'main' | 'sub';
  /** 주 버튼 문구 (Figma Button/v2 Primary) — buttons를 주지 않을 때 사용 */
  primaryLabel?: string;
  /** 주 버튼 클릭 시 이동할 경로 */
  primaryHref?: string;
  /** 보조 버튼 문구 (Figma Button/v2 Secondary) — buttons를 주지 않을 때 사용 */
  secondaryLabel?: string;
  /** 보조 버튼 클릭 시 이동할 경로 */
  secondaryHref?: string;
  /** 버튼 그룹 직접 구성 (지정하면 primary/secondary 버튼 대신 사용) */
  buttons?: React.ReactNode;
  /** 커스텀 배경 이미지 URL (미지정 시 기본 /images/common/ctaSection.jpg 적용) */
  bgImage?: string;
}

/**
 * CtaSection - 페이지 하단 CTA 배너 (서비스 공통)
 * 기본: eyebrow · title · description + 주/보조 버튼(Button/v2) 2개
 */
export const CtaSection: React.FC<CtaSectionProps> = ({
  variant = 'main',
  align,
  theme,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  buttons,
  bgImage,
  headerExtra,
  className = '',
  style,
  ...props
}) => {
  const navigate = useNavigate();
  const isMain = variant === 'main';
  const resolvedAlign = align ?? (isMain ? 'center' : 'left');
  const resolvedTheme = theme ?? (isMain ? 'light' : 'dark');

  const presetButtons = (primaryLabel ?? secondaryLabel) !== undefined && (
    <>
      {primaryLabel && (
        <Button
          variant="solid"
          color="primary"
          size="xl"
          onClick={primaryHref ? () => void navigate(primaryHref) : undefined}
        >
          {primaryLabel}
        </Button>
      )}
      {secondaryLabel && (
        <Button variant="subtle" size="xl" onClick={secondaryHref ? () => void navigate(secondaryHref) : undefined}>
          {secondaryLabel}
        </Button>
      )}
    </>
  );
  const buttonGroup = buttons ?? presetButtons;

  const combinedExtra = (
    <div className={styles.ctaExtraWrap}>
      {buttonGroup && <div className={styles.buttonsWrap}>{buttonGroup}</div>}
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
      aria-label="CTA"
      {...props}
    />
  );
};
