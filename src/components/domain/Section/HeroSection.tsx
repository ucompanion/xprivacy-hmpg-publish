import React from 'react';
import { Section, type SectionProps } from '../../core/Section/Section';
import styles from './HeroSection.module.scss';

export interface HeroSectionProps extends SectionProps {
  bgImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className, bgImage, style, ...props }) => {
  const customStyle = bgImage ? { ...style, backgroundImage: `url(${bgImage})` } : style;
  return (
    <Section
      layout="vertical"
      theme="dark"
      className={`${styles.heroSection} ${className || ''}`}
      style={customStyle}
      {...props}
    />
  );
};
