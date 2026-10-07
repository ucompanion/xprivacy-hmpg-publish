import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number | string;
  color?: string;
}

/**
 * SVGR로 불러온 SVG 컴포넌트를 감싸는 코어 Icon 래퍼
 * 사이즈와 컬러(기본 currentColor)를 일관되게 주입하기 위함
 */
export const Icon: React.FC<IconProps> = ({
  svg: SvgComponent,
  size = 24,
  color = 'currentColor',
  className = '',
  ...props
}) => {
  return (
    <SvgComponent
      className={`core-icon ${className}`}
      width={size}
      height={size}
      fill={color}
      {...props}
    />
  );
};
