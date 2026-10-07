import React from 'react';
import { Button, type ButtonProps } from '../../core/Button/Button';

export interface FormSubmitButtonProps extends Omit<ButtonProps, 'type' | 'variant' | 'color' | 'size' | 'children'> {
  label?: string; // '저장', '등록', '수정' 등
}

/**
 * 폼 데이터를 전송하는 Submit 전용 버튼
 * 기본적으로 type="submit" 속성이 강제 적용되며, Primary + Solid 조합
 */
export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ label = '저장', ...props }) => {
  return (
    <Button 
      type="submit" 
      variant="solid" 
      color="primary" 
      size="md" 
      {...props}
    >
      {label}
    </Button>
  );
};
