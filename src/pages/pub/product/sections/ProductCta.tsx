import React from 'react';
import { CtaSection } from '../../../../components/domain/Section';
import { Button } from '../../../../components/core/Button/Button';
import styles from './ProductCta.module.scss';

export interface ProductCtaProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  solidButtonText?: string;
  outlineButtonText?: string;
}

export const ProductCta: React.FC<ProductCtaProps> = ({
  eyebrow = "WHY XPRIVACY",
  title = (
    <>
      업무 환경에 맞는 xPrivacy를<br />
      직접 확인해보세요
    </>
  ),
  description = "무료 체험으로 Web 버전과 On-Premise 버전 중 적합한 방식을 선택할 수 있습니다.",
  solidButtonText = "구매 지원 / 시연",
  outlineButtonText = "도입 문의",
}) => {
  const buttons = (
    <div className={styles.ctaBtnGroup}>
      <Button variant="solid" size="lg" className={styles.btnSolid}>
        {solidButtonText}
      </Button>
      <Button variant="outline" size="lg" className={styles.btnOutline}>
        {outlineButtonText}
      </Button>
    </div>
  );

  return (
    <CtaSection
      variant="sub"
      eyebrow={eyebrow}
      title={title}
      description={description}
      headerExtra={buttons}
      className={styles.productCtaWrap}
    />
  );
};
