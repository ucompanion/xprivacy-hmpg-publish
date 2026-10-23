import React from 'react';
import './Card.scss';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** 렌더링 태그 (목록 안에서는 'li') */
  as?: 'div' | 'li' | 'article';
  /** 배경: white(surface-white) · gray(surface-gray) · blue-soft(surface-blue-soft) */
  bg?: 'white' | 'gray' | 'blue-soft';
  /** border/default 1 테두리 */
  bordered?: boolean;
  children: React.ReactNode;
}

/**
 * 코어 Card: radius 12 박스(배경 · 테두리)만 책임지고, 내부 여백과 배치는 사용처(도메인)가 정합니다.
 */
export const Card: React.FC<CardProps> = ({
  as: Tag = 'div',
  bg = 'white',
  bordered = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <Tag className={`core-card bg-${bg} ${bordered ? 'is-bordered' : ''} ${className}`.replace(/\s+/g, ' ').trim()} {...props}>
      {children}
    </Tag>
  );
};
