import React from 'react';
import './Modal.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideHeader?: boolean;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Core Modal
 * 어떠한 비즈니스 로직이나 고정된 형태도 가지지 않는 순수 모달 뼈대
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  hideHeader = false,
  className = '',
  children,
  footer
}) => {
  if (!isOpen) return null;

  return (
    <div className="core-modal-overlay" onClick={onClose}>
      <div 
        className={`core-modal size-${size} ${className}`} 
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
