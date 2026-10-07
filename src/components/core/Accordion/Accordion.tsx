import React, { useState } from 'react';
import './Accordion.scss';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

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
    <div className="core-accordion">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className="accordion-item">
            <button 
              className={`accordion-header ${isOpen ? 'open' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <span>{item.title}</span>
              <span className="icon">▼</span>
            </button>
            {isOpen && (
              <div className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
