import React from 'react';

/** 스프라이트(public/icons/sprite.svg)에 등록된 단색 아이콘 이름 */
export type IconName =
  | 'arrow-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'close'
  | 'info'
  | 'keyboard-arrow-left'
  | 'keyboard-arrow-right'
  | 'check'
  | 'play'
  | 'targets'
  | 'scan'
  | 'shield'
  | 'shield-check'
  | 'eye'
  | 'server'
  | 'layers';

const SPRITE_URL = '/icons/sprite.svg';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** 스프라이트 아이콘 이름 (단색 UI 아이콘 · 색은 currentColor) */
  name?: IconName;
  /** SVGR로 불러온 SVG 컴포넌트 (name 대신 사용) */
  svg?: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number | string;
  /** 아이콘 색 (미지정 시 부모 글자색 또는 className의 color를 따름) */
  color?: string;
  /** 선 두께 (24 격자 기준, 기본 2) — 선으로 그린 스프라이트 아이콘에만 적용 */
  strokeWidth?: number;
}

/**
 * 코어 Icon
 * - name: 스프라이트 아이콘 `<use href="/icons/sprite.svg#name">`
 * - svg: SVGR 컴포넌트 래핑
 * 사이즈와 컬러(기본 currentColor)를 일관되게 주입합니다.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  svg: SvgComponent,
  size = 24,
  color,
  strokeWidth = 2,
  className = '',
  style,
  ...props
}) => {
  if (name) {
    return (
      <svg
        className={`core-icon ${className}`.trim()}
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
        style={{ ...(color ? { color } : {}), strokeWidth, flexShrink: 0, ...style }}
        {...props}
      >
        <use href={`${SPRITE_URL}#${name}`} />
      </svg>
    );
  }

  if (!SvgComponent) return null;

  return (
    <SvgComponent
      className={`core-icon ${className}`.trim()}
      width={size}
      height={size}
      fill={color ?? 'currentColor'}
      style={style}
      {...props}
    />
  );
};
