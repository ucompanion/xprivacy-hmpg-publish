import React from 'react';
import { Modal, type ModalProps } from '../../core/Modal/Modal';
import { Button } from '../../core/Button/Button';

export interface BasicModalProps extends Omit<ModalProps, 'footer'> {
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  hideFooter?: boolean;
}

/**
 * 도메인: Basic Modal
 * 표준적인 헤더(타이틀), 바디, 그리고 [취소/확인] 형태의 푸터를 갖춘 모달
 */
export const BasicModal: React.FC<BasicModalProps> = ({
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  hideFooter = false,
  ...props
}) => {
  return (
    <Modal 
      {...props} 
      footer={!hideFooter ? (
        <>
          <Button variant="outline" color="neutral" onClick={props.onClose}>
            {cancelText}
          </Button>
          <Button variant="solid" color="primary" onClick={onConfirm || props.onClose}>
            {confirmText}
          </Button>
        </>
      ) : undefined}
    >
      {props.children}
    </Modal>
  );
};
