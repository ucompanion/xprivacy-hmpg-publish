import React from 'react';
import './Form.scss';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`core-form-control ${className}`} style={{ marginBottom: '8px' }}>
      <label className="core-checkbox-wrap">
        <input type="checkbox" {...props} />
        <span className="checkbox-label">{label}</span>
      </label>
    </div>
  );
};
