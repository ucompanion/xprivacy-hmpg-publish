import React from 'react';
import { Modal, type ModalProps } from '../../core/Modal/Modal';
import { Button } from '../../core/Button/Button';

export interface EventModalProps extends Omit<ModalProps, 'hideHeader' | 'footer' | 'size' | 'children'> {
  eventImageUrl: string;
  eventLink?: string;
  onHideToday?: () => void;
}

/**
 * 도메인: Event Modal
 * 팝업 이벤트 공지용 모달 (오늘 하루 보지 않기, 자세히 보기 등)
 */
export const EventModal: React.FC<EventModalProps> = ({
  eventImageUrl,
  eventLink,
  onHideToday,
  ...props
}) => {
  return (
    <Modal 
      {...props} 
      size="md" 
      hideHeader={true}
      className="domain-modal-event"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {onHideToday && (
            <Button variant="ghost" size="sm" onClick={() => { onHideToday(); props.onClose(); }}>
              오늘 하루 보지 않기
            </Button>
          )}
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="ghost" size="sm" onClick={props.onClose}>닫기</Button>
            {eventLink && (
              <Button variant="solid" color="primary" size="sm" onClick={() => window.open(eventLink)}>
                자세히 보기
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div style={{ margin: '-24px', cursor: eventLink ? 'pointer' : 'default' }} onClick={() => eventLink && window.open(eventLink)}>
        <img src={eventImageUrl} alt="이벤트 안내" style={{ width: '100%', display: 'block' }} />
      </div>
    </Modal>
  );
};
