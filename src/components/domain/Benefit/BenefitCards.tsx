import React from 'react';
import { Card } from '../../core/Card/Card';
import { IconSurface } from '../../core/Icon/IconSurface';
import styles from './BenefitCards.module.scss';

export interface BenefitItem {
  /** IconSurface 글리프 SVG 경로 */
  glyph: string;
  title: React.ReactNode;
  desc: React.ReactNode;
}

export interface BenefitCardProps extends BenefitItem {
  /** 카드 테두리 (시안에 테두리가 없는 페이지는 false) */
  bordered?: boolean;
}

/**
 * 도입 효과 카드: Core Card(white) + Core IconSurface(48 · MO 44) + 제목(Subheading) + 설명(Body gray-1)
 * 간격 프리셋: padding 28 28 32 · gap 8 · 아이콘 아래 Spacer 12 (MO padding 24 20 28 · gap 6 · Spacer 8)
 */
export const BenefitCard: React.FC<BenefitCardProps> = ({ glyph, title, desc, bordered = true }) => (
  <Card as="li" bg="white" bordered={bordered} className={styles.card}>
    <IconSurface src={glyph} size={48} sizeMo={44} className={styles.icon} />
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.desc}>{desc}</p>
  </Card>
);

export interface BenefitCardGroupProps {
  items: BenefitItem[];
  /** 카드 테두리 */
  bordered?: boolean;
  className?: string;
}

/**
 * 도입 효과 카드 그룹: 섹션(BasicSection 등)의 children으로 넣는 카드 목록
 * 카드 수만큼 열 배치(PC) → 1024 이하 2열 → MO 1열(gap 12)
 */
export const BenefitCardGroup: React.FC<BenefitCardGroupProps> = ({ items, bordered = true, className = '' }) => (
  <ul
    className={`${styles.group} ${className}`.trim()}
    style={{ '--benefit-columns': items.length } as React.CSSProperties}
  >
    {items.map((item) => (
      <BenefitCard key={item.glyph} {...item} bordered={bordered} />
    ))}
  </ul>
);
