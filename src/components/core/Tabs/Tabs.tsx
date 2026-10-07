import React, { useState } from 'react';
import './Tabs.scss';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultActiveId, className = '' }) => {
  const [activeId, setActiveId] = useState<string>(defaultActiveId || items[0]?.id);

  return (
    <div className={`core-tabs ${className}`}>
      <div className="tabs-header">
        {items.map((item) => (
          <button
            key={item.id}
            className={`tab-btn ${activeId === item.id ? 'active' : ''}`}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {items.find((item) => item.id === activeId)?.content}
      </div>
    </div>
  );
};
