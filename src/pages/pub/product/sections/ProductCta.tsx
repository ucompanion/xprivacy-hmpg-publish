import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/core/Button/Button';
import styles from './ProductCta.module.scss';

export interface ProductCtaProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  solidButtonText?: string;
  outlineButtonText?: string;
  /** 주 버튼 클릭 시 이동할 경로 (없으면 이동하지 않음) */
  solidButtonHref?: string;
  /** 보조 버튼 클릭 시 이동할 경로 (없으면 이동하지 않음) */
  outlineButtonHref?: string;
  className?: string;
  bgImage?: string;
  style?: React.CSSProperties;
}

export const ProductCta: React.FC<ProductCtaProps> = ({
  eyebrow = "GET STARTED",
  title = (
    <>
      업무 환경에 맞는 xPrivacy를<br />
      직접 확인해보세요
    </>
  ),
  description = "무료 체험으로 제품을 먼저 확인하거나 기관·기업 환경에 맞는 도입 방식을 상담할 수 있습니다.",
  solidButtonText = "도입 문의하기",
  outlineButtonText = "데모 체험하기",
  solidButtonHref,
  outlineButtonHref,
  className = "",
  bgImage,
  style,
}) => {
  const navigate = useNavigate();
  const customStyle: React.CSSProperties = {
    ...style,
    ...(bgImage ? { backgroundImage: `url(${bgImage})` } : {}),
  };

  return (
    <section className={`${styles.ctaSection} ${className}`} style={customStyle} aria-label="CTA">
      <div className={styles.ctaContainer}>
        {eyebrow && <span className={styles.ctaEyebrow}>{eyebrow}</span>}
        <h2 className={styles.ctaTitle}>{title}</h2>
        {description && <p className={styles.ctaDesc}>{description}</p>}
        
        <div className={styles.ctaBtnGroup}>
          <Button
            variant="solid"
            color="primary"
            size="xl"
            className={styles.btnPrimary}
            onClick={solidButtonHref ? () => void navigate(solidButtonHref) : undefined}
          >
            {solidButtonText}
          </Button>
          <Button
            variant="outline"
            color="neutral"
            size="xl"
            className={styles.btnSecondary}
            onClick={outlineButtonHref ? () => void navigate(outlineButtonHref) : undefined}
          >
            {outlineButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
