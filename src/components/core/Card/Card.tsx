import React from 'react';
import './Card.scss';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** 렌더링 태그 (목록 안에서는 'li', 라디오 선택 카드는 'label') */
  as?: 'div' | 'li' | 'article' | 'label';
  /** 배경: white(surface-white) · gray(surface-gray) · blue-soft(surface-blue-soft) */
  bg?: 'white' | 'gray' | 'blue-soft';
  /** border/default 1 테두리 */
  bordered?: boolean;
  /** 선택 상태: `is-selected` 클래스만 붙입니다. 선택 스타일은 사용처(도메인)가 정합니다. */
  selected?: boolean;
  children: React.ReactNode;
}

/**
 * 코어 Card: radius 12 박스(배경 · 테두리)와 선택 상태 클래스만 책임지고,
 * 내부 여백 · 배치 · 선택 스타일은 사용처(도메인)가 정합니다.
 */
export const Card: React.FC<CardProps> = ({
  as: Tag = 'div',
  bg = 'white',
  bordered = false,
  selected = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <Tag
      className={`core-card bg-${bg} ${bordered ? 'is-bordered' : ''} ${selected ? 'is-selected' : ''} ${className}`
        .replace(/\s+/g, ' ')
        .trim()}
      {...props}
    >
      {children}
    </Tag>
  );
};
