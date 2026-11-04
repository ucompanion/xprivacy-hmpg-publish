import React from 'react';
import { Section, type SectionProps } from '../../core/Section/Section';

import styles from './BasicSection.module.scss';

export interface BasicSectionProps extends SectionProps {
  /** 섹션 배경색: 서비스 기본값은 'white'이며 'gray'로 섹션 간 교차 리듬을 형성합니다. */
  bg?: 'white' | 'gray' | 'transparent';
}

/**
 * BasicSection - 페이지 본문 구성 시 사용하는 서비스 공통 기본 섹션 프리셋
 * 코어 Section의 layout, align, theme, contained 등의 옵션을 그대로 계승하며
 * xPrivacy 서비스의 표준 배경색(white/gray)과 여백, 그리고 베이직섹션 전용 Eyebrow 스타일을 제공합니다.
 */
export const BasicSection: React.FC<BasicSectionProps> = ({
  bg = 'white',
  layout = 'vertical',
  align = 'left',
  theme = 'light',
  contained = true,
  className = '',
  eyebrowClassName = '',
  ...props
}) => {
  return (
    <Section
      bg={bg}
      layout={layout}
      align={align}
      theme={theme}
      contained={contained}
      className={`${styles.basicSection} ${className}`.trim()}
      eyebrowClassName={`${styles.basicEyebrow} ${eyebrowClassName}`.trim()}
      {...props}
    />
  );
};
