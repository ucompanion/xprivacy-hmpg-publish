import React from 'react';
import './IconSurface.scss';

export type IconSurfaceSize = 32 | 40 | 44 | 48 | 52;

export interface IconSurfaceProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 글리프 SVG 경로 */
  src: string;
  /** 아이콘 크기(px). 반경·두께·반사광·글리프는 48 기준 비례 */
  size?: IconSurfaceSize;
  /** 모바일(≤768) 크기. 지정하지 않으면 size 유지 */
  sizeMo?: IconSurfaceSize;
  /** default: 흰·회색 카드 위(ClearSurface) / soft: 블루 소프트 강조(LightBlueSurface) */
  tone?: 'default' | 'soft';
  /** fill: 글리프 SVG가 자체 여백을 포함해 아이콘 전체를 덮음(Process Icon/v2 원본 글리프, 요금제 등) */
  glyphFit?: 'center' | 'fill';
}

/**
 * 코어 IconSurface: Figma Process Icon/v2 유리 아이콘
 * 채움(그라데이션 + 비치는 그림자) → 두께 띠 → 반사광 → 림 → 글리프 순으로 겹칩니다.
 */
export const IconSurface: React.FC<IconSurfaceProps> = ({
  src,
  size = 48,
  sizeMo,
  tone = 'default',
  glyphFit = 'center',
  className = '',
  ...props
}) => {
  const classes = [
    'core-icon-surface',
    `size-${size}`,
    sizeMo ? `mo-size-${sizeMo}` : '',
    `tone-${tone}`,
    `glyph-${glyphFit}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-hidden="true" {...props}>
      <span className="surface-fill" />
      <span className="surface-band" />
      <span className="surface-specular">
        <img src="/images/common/icon_crescent.svg" alt="" />
      </span>
      <span className="surface-rim" />
      <img src={src} alt="" className="surface-glyph" />
    </span>
  );
};
