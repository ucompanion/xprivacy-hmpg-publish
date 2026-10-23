import React, { useState } from 'react';
import './Accordion.scss';

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  /** boxed: 테두리 박스형(기본) / line: 상하 구분선형 (Figma FAQ Accordion) / panel: 펼친 항목만 연회색 면 (Figma 메인 FAQ) */
  variant?: 'boxed' | 'line' | 'panel';
  /** 제목 앞 표식 (예: 'Q') */
  prefix?: React.ReactNode;
  /** 처음 열려 있을 항목 id 목록 */
  defaultOpenIds?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'boxed',
  prefix,
  defaultOpenIds = [],
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
    <div className={`core-accordion variant-${variant} ${prefix ? 'has-prefix' : ''}`.trim()}>
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
              {variant === 'line' ? (
                <svg className="chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="icon">▼</span>
              )}
            </button>
            {isOpen && (
              <div id={`accordion-panel-${item.id}`} className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
