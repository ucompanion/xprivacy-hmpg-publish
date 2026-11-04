import React from 'react';
import { Accordion } from '../../core/Accordion/Accordion';
import styles from './FaqAccordion.module.scss';

export interface FaqItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  /** 처음 열려 있을 항목 id (미지정 시 첫 항목) */
  defaultOpenIds?: string[];
  /** 여러 항목 동시 펼침 */
  allowMultiple?: boolean;
  className?: string;
}

const PREFIX = 'Q.';

/**
 * FaqAccordion - 서비스 공통 FAQ 아코디언 (Core Accordion `plain` 프리셋 · Figma 2408:1437)
 * 모든 FAQ가 한 가지 모양·동작을 씁니다: 2px 상단선 · 항목 28/24 여백 · 파란 Q. · 화살표 20 · 답변 gray-1 · 첫 항목 펼침
 */
export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  defaultOpenIds,
  allowMultiple = false,
  className = '',
}) => {
  return (
    <Accordion
      variant="plain"
      prefix={PREFIX}
      allowMultiple={allowMultiple}
      defaultOpenIds={defaultOpenIds ?? (items.length > 0 ? [items[0].id] : [])}
      items={items.map((item) => ({ id: item.id, title: item.question, content: item.answer }))}
      className={`${styles.faq} ${className}`.trim()}
    />
  );
};
