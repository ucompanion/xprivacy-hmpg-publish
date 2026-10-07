import React from 'react';
import { Button } from '../../core/Button/Button';
import type { ButtonProps } from '../../core/Button/Button';

export interface LoadMoreButtonProps extends Omit<ButtonProps, 'variant' | 'color' | 'size' | 'children'> {
  isLoading?: boolean;
}

/**
 * 리스트 하단에서 다음 페이지 데이터를 불러오는 '더보기' 버튼
 * 전체 너비를 차지하고 Outline + Secondary 조합
 */
export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ isLoading = false, ...props }) => {
  return (
    <Button 
      variant="outline" 
      color="secondary" 
      size="md" 
      style={{ width: '100%', marginTop: '24px' }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? '불러오는 중...' : '더보기 ▾'}
    </Button>
  );
};
