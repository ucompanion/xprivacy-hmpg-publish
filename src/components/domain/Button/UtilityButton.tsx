import React from 'react';
import { Button, type ButtonProps } from '../../core/Button/Button';
import { Icon } from '../../core/Icon/Icon';

export interface UtilityButtonProps extends Omit<ButtonProps, 'variant' | 'color' | 'size' | 'children'> {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>; // SVGR 컴포넌트를 받음
  label: string; // '인쇄', '공유', '다운로드' 등
}

/**
 * 인쇄, 공유, 다운로드 등 컨텐츠 부가 기능을 위한 유틸리티 버튼
 * 주로 작고, 배경색이 없거나 연한 테두리(Neutral/Ghost)를 가짐
 */
export const UtilityButton: React.FC<UtilityButtonProps> = ({ icon: SvgIcon, label, ...props }) => {
  return (
    <Button 
      variant="ghost" 
      color="neutral" 
      size="sm" 
      style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}
      {...props}
    >
      {SvgIcon && <Icon svg={SvgIcon} size={16} />}
      <span>{label}</span>
    </Button>
  );
};
