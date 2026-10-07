import React from 'react';
import { Modal, type ModalProps } from '../../core/Modal/Modal';
import { Button } from '../../core/Button/Button';

export interface AlertModalProps extends Omit<ModalProps, 'title' | 'hideHeader' | 'footer' | 'children' | 'size'> {
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

/**
 * 도메인: Alert Modal
 * 헤더 없이 중앙 정렬된 메시지와 확인/취소 버튼만 제공되는 모달
 */
export const AlertModal: React.FC<AlertModalProps> = ({
  message,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  ...props
}) => {
  return (
    <Modal 
      {...props} 
      size="sm" 
      hideHeader={true}
      className="core-modal-alert"
      footer={
        <>
          {onConfirm && (
            <Button variant="ghost" onClick={props.onClose}>
              {cancelText}
            </Button>
          )}
          <Button variant="solid" color="primary" onClick={onConfirm || props.onClose}>
            {confirmText}
          </Button>
        </>
      }
    >
      {message}
    </Modal>
  );
};
