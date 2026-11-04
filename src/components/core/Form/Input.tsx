import React, { useId, useState } from 'react';
import './Form.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  /** 'lg' = Figma Text Field/v2 (라벨 16 SemiBold · 입력 높이 52 · radius 8) */
  size?: 'md' | 'lg';
  /** 입력 아래 도움말 (회색) */
  helper?: React.ReactNode;
  /** 오류 문구 · 있으면 오류 테두리와 빨간 문구로 표시 (helper보다 우선) */
  error?: React.ReactNode;
  /** 비밀번호 보기/숨기기 텍스트 버튼 (type="password"에서 사용) */
  passwordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  size = 'md',
  helper,
  error,
  passwordToggle = false,
  className = '',
  id,
  type,
  ...props
}) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const [visible, setVisible] = useState(false);
  const message = error ?? helper;
  const resolvedType = passwordToggle && visible ? 'text' : type;

  return (
    <div className={`core-form-control size-${size} ${error ? 'is-error' : ''} ${className}`}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <div className="core-input-wrap">
        <input
          id={inputId}
          type={resolvedType}
          className="core-input"
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...props}
        />
        {passwordToggle && (
          <button type="button" className="core-input-toggle" onClick={() => setVisible((prev) => !prev)}>
            {visible ? '숨기기' : '보기'}
          </button>
        )}
      </div>
      {message && (
        <p id={messageId} className={error ? 'core-input-error' : 'core-input-helper'}>
          {message}
        </p>
      )}
    </div>
  );
};
