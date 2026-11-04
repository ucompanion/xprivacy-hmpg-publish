import React from 'react';
import './Badge.scss';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'primary' | 'success' | 'warning' | 'neutral' | 'info';
  /** subtle: 연한 배경 + 진한 글자, radius 6 · Regular (Figma 처리 방식 Badge) */
  variant?: 'solid' | 'subtle';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  color = 'neutral',
  variant = 'solid',
  className = '',
  children,
  ...props
}) => {
  return (
    <span className={`core-badge color-${color} variant-${variant} ${className}`} {...props}>
      {children}
    </span>
  );
};
