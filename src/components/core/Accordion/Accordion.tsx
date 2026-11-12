import React, { useState } from 'react';
import './Accordion.scss';
import { Icon } from '../Icon/Icon';

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  /** boxed: 테두리 박스형(기본) / plain: 모양 없이 구조만 (도메인 컴포넌트가 스타일 지정, 예: FaqAccordion) */
  variant?: 'boxed' | 'plain';
  /** 제목 앞 표식 (예: 'Q') */
  prefix?: React.ReactNode;
  /** 처음 열려 있을 항목 id 목록 */
  defaultOpenIds?: string[];
  /** 루트 추가 클래스 (도메인 컴포넌트의 스타일 연결용) */
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'boxed',
  prefix,
  defaultOpenIds = [],
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(defaultOpenIds));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`core-accordion variant-${variant} ${prefix ? 'has-prefix' : ''} ${className}`.replace(/\s+/g, ' ').trim()}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className="accordion-item">
            <button
              type="button"
              className={`accordion-header ${isOpen ? 'open' : ''}`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
            >
              {prefix && <span className="prefix" aria-hidden="true">{prefix}</span>}
              <span className="title">{item.title}</span>
              {variant === 'plain' ? (
                <Icon name="chevron-down" className="chevron" />
              ) : (
                <span className="icon">▼</span>
              )}
            </button>
            {/* 항상 렌더링하고 높이만 접었다 펼친다 (grid 0fr → 1fr). 닫힌 패널은 보조기술·탭 이동에서 제외 */}
            <div className={`accordion-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} inert={!isOpen}>
              <div className="accordion-panel-inner">
                <div id={`accordion-panel-${item.id}`} className="accordion-content">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
