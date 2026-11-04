import React from 'react';
import './Button.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** subtle: 흰 80% 배경 + 남색 글자, 테두리 없음 (Figma Button/v2 Secondary) */
  variant?: 'solid' | 'outline' | 'ghost' | 'subtle';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** subtle 버튼 테두리 (밝은 카드 위 Secondary · Figma 3064:37404) */
  bordered?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'solid', 
  color = 'primary',
  size = 'md', 
  bordered = false,
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <button 
      className={`core-btn variant-${variant} color-${color} size-${size} ${bordered ? 'is-bordered' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
