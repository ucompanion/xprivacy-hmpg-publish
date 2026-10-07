import React from 'react';
import { Checkbox, type CheckboxProps } from '../../core/Form/Checkbox';

export type AgreeType = 'terms' | 'privacy' | 'marketing';

interface AgreeCheckboxProps extends Omit<CheckboxProps, 'label'> {
  agreeType: AgreeType;
}

const AGREE_LABELS: Record<AgreeType, string> = {
  terms: '[필수] 사이트 이용약관 동의',
  privacy: '[필수] 개인정보 수집 및 이용 동의',
  marketing: '[선택] 마케팅 정보 수신 동의',
};

export const AgreeCheckbox: React.FC<AgreeCheckboxProps> = ({ agreeType, ...props }) => {
  const label = AGREE_LABELS[agreeType];

  return (
    <Checkbox label={label} {...props} />
  );
};
