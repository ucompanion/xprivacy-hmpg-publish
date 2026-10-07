import React from 'react';
import './Badge.scss';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'primary' | 'success' | 'warning' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  color = 'neutral', 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <span className={`core-badge color-${color} ${className}`} {...props}>
      {children}
    </span>
  );
};
