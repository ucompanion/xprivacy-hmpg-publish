import React from 'react';
import { Section, type SectionProps } from '../../core/Section/Section';
import styles from './CtaSection.module.scss';

export interface CtaSectionProps extends SectionProps {
  variant?: 'main' | 'sub';
}

export const CtaSection: React.FC<CtaSectionProps> = ({ variant = 'sub', className, ...props }) => {
  return (
    <Section
      layout="vertical"
      align={variant === 'main' ? 'left' : 'center'}
      theme="dark" // CTA는 기본적으로 어두운(채워진) 테마를 띕니다.
      className={`${styles.ctaSection} ${styles[`variant_${variant}`]} ${className || ''}`}
      {...props}
    />
  );
};
