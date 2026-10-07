import React from 'react';
import { Button, type ButtonProps } from '../../core/Button/Button';

export interface CtaButtonProps extends Omit<ButtonProps, 'variant' | 'color' | 'size' | 'children'> {
  label?: string; // 주로 '가입하기', '구매하기' 등
}

/**
 * 서비스의 주요 행동 유도(Call To Action) 버튼
 * 디자인 가이드상 가장 눈에 띄는 Primary + Solid + Large 조합 고정
 */
export const CtaButton: React.FC<CtaButtonProps> = ({ label = '시작하기', ...props }) => {
  return (
    <Button 
      variant="solid" 
      color="primary" 
      size="lg" 
      style={{ width: '100%', minWidth: '240px', fontSize: '18px', padding: '16px' }}
      {...props}
    >
      {label}
    </Button>
  );
};
