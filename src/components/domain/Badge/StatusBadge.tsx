import React from 'react';
import { Badge, type BadgeProps } from '../../core/Badge/Badge';

// 도메인 고유의 상태 코드들
export type StatusCode = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'REJECTED';

interface StatusBadgeProps extends Omit<BadgeProps, 'color' | 'children'> {
  status: StatusCode;
}

const STATUS_CONFIG: Record<StatusCode, { label: string; color: BadgeProps['color'] }> = {
  TODO: { label: '대기중', color: 'neutral' },
  IN_PROGRESS: { label: '진행중', color: 'warning' },
  DONE: { label: '완료', color: 'success' },
  REJECTED: { label: '반려', color: 'primary' }, // 기획에 따라 컬러 매핑
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, ...props }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.TODO;

  return (
    <Badge color={config.color} {...props}>
      {config.label}
    </Badge>
  );
};
