import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import styles from './GuideSection.module.scss';

export interface GuideSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const GuideSection: FC<GuideSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className={styles.guide_section}>
      <h2 
        className={styles.section_title}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span className={styles.toggle_btn}>
          {isOpen ? '▲ 접기' : '▼ 펼치기'}
        </span>
      </h2>
      
      {isOpen && (
        <div className={styles.section_body}>
          {children}
        </div>
      )}
    </section>
  );
};

