import React from 'react';
import { Section, type SectionProps } from '../../core/Section/Section';

export interface BasicSectionProps extends SectionProps {
  // 현재 코어 Section의 구조를 그대로 활용하는 기본 도메인 섹션입니다.
  // 추후 Basic 섹션만의 고유한 정책이나 텍스트가 필요하다면 여기에 추가됩니다.
}

export const BasicSection: React.FC<BasicSectionProps> = (props) => {
  return <Section {...props} />;
};
