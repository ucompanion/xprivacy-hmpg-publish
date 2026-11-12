import React, { useId } from 'react';
import { Modal } from '../../core/Modal/Modal';
import { Button } from '../../core/Button/Button';
import { IconSurface } from '../../core/Icon/IconSurface';
import styles from './AlertModal.module.scss';

export type AlertModalVariant = 'success' | 'warning' | 'error';

/** 의미별 기본 글리프: 성공(파랑 체크) · 경고(주황 느낌표) · 오류(빨강 X) */
const VARIANT_GLYPH: Record<AlertModalVariant, string> = {
  success: '/images/common/alert/glyph_success.svg',
  warning: '/images/common/alert/glyph_warning.svg',
  error: '/images/common/alert/glyph_error.svg',
};

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 의미: success(완료) · warning(확인 필요) · error(실패). 기본 success */
  variant?: AlertModalVariant;
  /** 글리프 SVG 경로로 기본 아이콘 교체 (예: 접수 완료의 문서 체크). 아이콘은 항상 노출 */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 확인 버튼 문구 (기본 '확인') */
  confirmText?: string;
  /** 지정하면 취소 버튼이 함께 노출됩니다 */
  cancelText?: string;
  /** 확인 버튼 동작 (미지정 시 onClose) */
  onConfirm?: () => void;
}

/**
 * 도메인: AlertModal (Figma PC 700:23470 · MO 700:23475 · 문의 / 접수 완료)
 * Core Modal 에 서비스 기본값(유리 아이콘 · 큰 제목 · 설명 · 확인 버튼)을 입힌 알림창.
 * 완료·확인 필요·실패 등 폼 검증과 제출 결과 안내에 공통으로 사용합니다.
 */
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  variant = 'success',
  icon,
  title,
  description,
  confirmText = '확인',
  cancelText,
  onConfirm,
}) => {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const glyph = icon ?? VARIANT_GLYPH[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideHeader
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className={styles.alert}
    >
      <div className={styles.body}>
        <IconSurface src={glyph} size={48} />
        <h3 id={titleId} className={styles.title}>{title}</h3>
        {description && <p id={descId} className={styles.description}>{description}</p>}
        <div className={`${styles.actions} ${description ? '' : styles.actionsLoose}`.trim()}>
          {cancelText && (
            <Button variant="subtle" bordered size="xl" className={styles.button} onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button
            variant="solid"
            color="primary"
            size="xl"
            className={styles.button}
            onClick={onConfirm ?? onClose}
            autoFocus
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
