import React from 'react';
import styles from './Section.module.scss';

export type SectionAlign = 'left' | 'center';
export type SectionLayout = 'vertical' | 'horizontal' | 'horizontal-reverse';
export type SectionTheme = 'light' | 'dark';
export type SectionBg = 'white' | 'gray' | 'transparent';

export interface SectionHeaderProps {
  /** 상단 라벨 (선택) */
  eyebrow?: React.ReactNode;
  /** 메인 섹션 제목 (h2) */
  title: React.ReactNode;
  /** 보조 설명문 (선택) */
  description?: React.ReactNode;
  /** 정렬 옵션 (기본값: 'left') */
  align?: SectionAlign;
  /** 테마 옵션: 'light' | 'dark' (기본값: 'light') */
  theme?: SectionTheme;
  /** 추가 액션 또는 링크 (선택) */
  extra?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** 상단 라벨 (선택) */
  eyebrow?: React.ReactNode;
  /** 메인 섹션 제목 (h2) */
  title?: React.ReactNode;
  /** 보조 설명문 (선택) */
  description?: React.ReactNode;
  /** 정렬 옵션 (기본값: 'left') */
  align?: SectionAlign;
  /** 본문과의 배치 레이아웃 (기본값: 'vertical') */
  layout?: SectionLayout;
  /** 테마 옵션: 'light' | 'dark' (기본값: 'light') */
  theme?: SectionTheme;
  /** 섹션 배경색 (기본값: 'transparent'): 'white' | 'gray' | 'transparent' */
  bg?: SectionBg;
  /** 헤더 영역에 추가할 링크/버튼 등의 요소 */
  headerExtra?: React.ReactNode;
  /** 내부 컨테이너 max-width 적용 여부 (기본값: true) */
  contained?: boolean;
  /** 섹션 본문 컨텐츠 */
  children?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 본문 래퍼 추가 CSS 클래스 */
  contentClassName?: string;
}

/**
 * SectionHeader - 독립적으로도 사용할 수 있는 섹션 헤더 컴포넌트
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
  extra,
  className = '',
}) => {
  return (
    <div className={`${styles.header} ${styles[`theme_${theme}`]} ${styles[`align_${align}`]} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {extra && <div className={styles.extra}>{extra}</div>}
    </div>
  );
};

/**
 * Section - 페이지 본문 구성 시 공통으로 사용하는 표준 레이아웃 컴포넌트
 * 헤더(eyebrow, title, description)와 본문(children)의 배치 및 정렬 패턴을 제공합니다.
 */
export const Section: React.FC<SectionProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  layout = 'vertical',
  theme = 'light',
  bg = 'transparent',
  headerExtra,
  contained = true,
  children,
  className = '',
  contentClassName = '',
  ...rest
}) => {
  const hasHeader = Boolean(eyebrow || title || description || headerExtra);

  const containerClass = [
    styles.container,
    styles[`layout_${layout}`],
    styles[`align_${align}`],
    styles[`theme_${theme}`],
    contained ? styles.contained : '',
    contentClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section 
      className={`${styles.section} ${styles[`theme_${theme}`]} ${styles[`bg_${bg}`]} ${className}`} 
      {...rest}
    >
      <div className={containerClass}>
        {hasHeader && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
            theme={theme}
            extra={headerExtra}
            className={styles.sectionHeader}
          />
        )}
        {children && <div className={styles.content}>{children}</div>}
      </div>
    </section>
  );
};
