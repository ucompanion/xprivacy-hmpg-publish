import React from 'react';
import './Form.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`core-form-control ${className}`}>
      {label && <label>{label}</label>}
      <input className="core-input" {...props} />
    </div>
  );
};
