import React, { useEffect, useState } from 'react';
import './Modal.scss';

/** 닫힘 애니메이션 시간(ms). Modal.scss 의 --modal-exit-duration 과 같은 값 */
const EXIT_MS = 200;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideHeader?: boolean;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** 접근성 역할 (확인이 필요한 알림은 'alertdialog') */
  role?: 'dialog' | 'alertdialog';
  /** 제목 요소 id 연결 */
  'aria-labelledby'?: string;
  /** 설명 요소 id 연결 */
  'aria-describedby'?: string;
  /** Esc 키로 닫기 (기본 true) */
  closeOnEsc?: boolean;
}

/**
 * Core Modal
 * 어떠한 비즈니스 로직이나 고정된 형태도 가지지 않는 순수 모달 뼈대
 * 열릴 때와 닫힐 때 같은 길이의 페이드로 전환됩니다. (prefers-reduced-motion 에서는 전환 없음)
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  hideHeader = false,
  className = '',
  children,
  footer,
  role = 'dialog',
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  closeOnEsc = true,
}) => {
  // 닫힘 애니메이션이 끝날 때까지 DOM 에 남겨 둔다
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen && !mounted) return null;

  return (
    <div className={`core-modal-overlay${isOpen ? '' : ' is-closing'}`} onClick={onClose}>
      <div
        className={`core-modal size-${size} ${className}`}
        role={role}
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="modal-header">
            {title ? (typeof title === 'string' ? <h3>{title}</h3> : title) : <div></div>}
            <button className="btn-close" onClick={onClose}>&times;</button>
          </div>
        )}
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
