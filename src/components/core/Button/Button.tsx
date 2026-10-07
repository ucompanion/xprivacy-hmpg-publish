import React from 'react';
import './Button.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'solid', 
  color = 'primary',
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <button 
      className={`core-btn variant-${variant} color-${color} size-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
