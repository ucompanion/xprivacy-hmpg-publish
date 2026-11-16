import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../core/Button/Button';
import styles from './Header.module.scss';
import { Icon } from '../../core/Icon/Icon';

interface NavItem {
  label: string;
  /** 이동 경로 (해시 포함 가능) */
  to: string;
}

interface NavGroup {
  label: string;
  /** 대메뉴 클릭 시 이동 경로 · 현재 페이지 판별에도 사용 */
  to: string;
  /** 현재 페이지가 이 메뉴에 속하는지 판별하는 경로 접두어 */
  base: string;
  /** 하위 메뉴 (없으면 단일 링크) */
  items?: NavItem[];
}

/**
 * GNB 메뉴 데이터 (PC 메가 메뉴 · 모바일 아코디언이 같은 데이터를 씁니다)
 * 메뉴 구조를 바꿀 때는 Footer 사이트맵 · 가이드 대시보드 · pub 라우트도 함께 맞춥니다(AGENTS.md Gate 7).
 */
const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Product',
    to: '/pub/product/intro',
    base: '/pub/product',
    items: [
      { label: '제품소개', to: '/pub/product/intro' },
      { label: '핵심가치', to: '/pub/product/core-values' },
      { label: '왜 xPrivacy인가', to: '/pub/product/why' },
      { label: '요금제', to: '/pub/product/pricing' },
      { label: '인증 및 특허', to: '/pub/product/certification' },
    ],
  },
  {
    label: 'Technology',
    to: '/pub/technology/ai-detection',
    base: '/pub/technology',
    items: [
      { label: 'AI Detection', to: '/pub/technology/ai-detection' },
      { label: 'Security', to: '/pub/technology/security' },
      { label: 'Processing Engine', to: '/pub/technology/processing-engine' },
      { label: 'Privacy Engine', to: '/pub/technology/privacy-engine' },
      { label: 'Virtual Face AI', to: '/pub/technology/virtual-face-ai' },
      { label: 'Smart Workflow', to: '/pub/technology/smart-workflow' },
    ],
  },
  {
    label: 'Features',
    to: '/pub/features/image-deid',
    base: '/pub/features',
    items: [
      { label: '이미지 비식별', to: '/pub/features/image-deid' },
      { label: '영상 비식별', to: '/pub/features/video-deid' },
      { label: '대량·병렬 처리', to: '/pub/features/batch-processing' },
      { label: 'AI 자동편집', to: '/pub/features/ai-auto-editing' },
      { label: '부가기능', to: '/pub/features/rest-api' },
    ],
  },
  {
    label: 'Solutions',
    to: '/pub/solutions',
    base: '/pub/solutions',
    items: [
      { label: '방송', to: '/pub/solutions#broadcasting' },
      { label: 'CCTV', to: '/pub/solutions#cctv' },
      { label: 'Smart City', to: '/pub/solutions#smart-city' },
      { label: '공공기관', to: '/pub/solutions#public-institutions' },
      { label: 'AI Data', to: '/pub/solutions#ai-data' },
      { label: '금융', to: '/pub/solutions#finance' },
      { label: '제조', to: '/pub/solutions#manufacturing' },
      { label: '의료', to: '/pub/solutions#medical' },
    ],
  },
  {
    label: 'Demo',
    to: '/pub/demo/demo',
    base: '/pub/demo',
    items: [
      { label: '이미지 체험', to: '/pub/demo/demo' },
      { label: '영상 체험', to: '/pub/demo/video' },
    ],
  },
  {
    label: 'Contact',
    to: '/pub/contact/brochure',
    base: '/pub/contact',
    items: [
      { label: 'Brochure', to: '/pub/contact/brochure' },
      { label: '문의', to: '/pub/contact/inquiry' },
      { label: 'FAQ', to: '/pub/contact/faq' },
      { label: 'Company', to: '/pub/contact/company' },
    ],
  },
  { label: 'Blog', to: '/pub/blog', base: '/pub/blog' },
];

/** 헤더 숨김 판단 기준: 스크롤 위치가 이 값을 넘고, 스크롤 방향이 아래일 때만 숨김 (rem 단위 1 = 1px) */
const HIDE_THRESHOLD = 72;
/** 방향 전환으로 인정하는 최소 스크롤 이동량(떨림 방지) */
const SCROLL_DELTA = 6;

export const Header: React.FC = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  // 모바일: 전체 메뉴 오버레이 + 대메뉴 아코디언(클릭으로 하위 메뉴 노출)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);

  // PC: 대메뉴 호버(또는 키보드 포커스) 시 전폭 메가 메뉴 노출
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // 호버·포커스 중인 대메뉴 (하위 메뉴가 없는 대메뉴 포함) — 이 값이 있으면 하단 막대를 현재 페이지 대신 이 메뉴에 표시
  const [markIndex, setMarkIndex] = useState<number | null>(null);

  // 스크롤 다운 시 숨김 · 스크롤 업 시 노출
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const openGroup = openIndex !== null ? NAV_GROUPS[openIndex] : null;
  const hasMega = !!openGroup?.items;

  const closeMega = useCallback(() => {
    setOpenIndex(null);
    setMarkIndex(null);
  }, []);

  // 모바일 메뉴를 열 때 현재 페이지가 속한 대메뉴를 펼쳐 둡니다 (Figma 메뉴 열림 상태)
  const toggleMobileMenu = () => {
    const idx = NAV_GROUPS.findIndex((g) => pathname.startsWith(g.base) && g.items);
    setIsMobileMenuOpen((prev) => !prev);
    setMobileOpenIndex(isMobileMenuOpen || idx < 0 ? null : idx);
  };

  // 페이지 이동 시 열린 메뉴 닫기
  useEffect(() => {
    setOpenIndex(null);
    setMarkIndex(null);
    setIsMobileMenuOpen(false);
    setMobileOpenIndex(null);
  }, [pathname, hash]);

  // 모바일 메뉴가 열린 채 PC 폭(1025px 이상)으로 전환되면 닫기 (PC에서는 GNB가 보이므로 모바일 패널·Dim을 숨김)
  // matchMedia 변경 + resize를 함께 감지하고, CSS(.mobile_panel · .dim_mobile)도 PC 폭에서 숨겨 이중으로 보장합니다.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');
    const closeIfPc = () => {
      if (mq.matches) {
        setIsMobileMenuOpen(false);
        setMobileOpenIndex(null);
      }
    };
    mq.addEventListener('change', closeIfPc);
    window.addEventListener('resize', closeIfPc);
    return () => {
      mq.removeEventListener('change', closeIfPc);
      window.removeEventListener('resize', closeIfPc);
    };
  }, []);

  // Esc로 메가 메뉴 닫기
  useEffect(() => {
    if (!hasMega) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasMega]);

  // 스크롤 방향에 따른 헤더 숨김/노출 (상태가 같으면 React가 리렌더를 건너뛰므로 스크롤마다 바로 계산)
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastScrollY.current;
      if (y <= HIDE_THRESHOLD) {
        setHidden(false);
        lastScrollY.current = y;
      } else if (Math.abs(diff) >= SCROLL_DELTA) {
        setHidden(diff > 0);
        lastScrollY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 메뉴가 열려 있는 동안에는 숨기지 않고, GNB 메뉴 노출 시 헤더 불투명 처리
  const isOpaque = hasMega || isMobileMenuOpen;
  const isHidden = hidden && !isOpaque;

  const isActiveGroup = (g: NavGroup) => pathname.startsWith(g.base);
  const isActiveItem = (item: NavItem) => {
    const [path, itemHash] = item.to.split('#');
    return pathname === path && (itemHash ? hash === `#${itemHash}` : true);
  };

  return (
    <header
      className={`${styles.header} ${isHidden ? styles.is_hidden : ''} ${isOpaque ? styles.is_opaque : ''}`}
      onMouseLeave={closeMega}
      onBlur={(e) => {
        // 헤더 밖으로 포커스가 나가면 메가 메뉴 닫기
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMega();
      }}
    >
      <div className={styles.container}>
        {/* Logo (Figma facelogo1: 141.6rem x 30rem) */}
        <Link to="/pub/main" className={styles.logo}>
          <img src="/images/common/logo.png" alt="OFF:ON xPRIVACY" className={styles.logo_img} />
        </Link>

        {/* GNB (PC Only) */}
        <nav className={styles.nav} aria-label="주 메뉴">
          {NAV_GROUPS.map((group, index) => (
            <div
              key={group.label}
              className={styles.nav_item}
              onMouseEnter={() => {
                setOpenIndex(group.items ? index : null);
                setMarkIndex(index);
              }}
              onFocus={() => {
                setOpenIndex(group.items ? index : null);
                setMarkIndex(index);
              }}
            >
              <Link
                to={group.to}
                className={`${styles.nav_link} ${isActiveGroup(group) ? styles.is_active : ''} ${
                  (markIndex === null ? isActiveGroup(group) : markIndex === index) ? styles.is_bar : ''
                }`}
                aria-haspopup={group.items ? 'true' : undefined}
                aria-expanded={group.items ? openIndex === index : undefined}
                aria-current={isActiveGroup(group) ? 'page' : undefined}
              >
                {group.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Actions (PC Only) */}
        <div className={styles.actions}>
          <button type="button" className={styles.login_link}>로그인</button>
          <div className={styles.buttons_group}>
            <Link to="/pub/contact/inquiry" className={styles.btn_inquiry}>도입 문의</Link>
            <button type="button" className={styles.btn_trial}>체험하기</button>
          </div>
        </div>

        {/* Hamburger (Mobile Only): 열리면 닫기 아이콘으로 전환 */}
        <button
          className={styles.hamburger}
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <Icon name="close" color="var(--color-text-inverse)" />
          ) : (
            <>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </>
          )}
        </button>
      </div>

      {/* PC Mega Menu (Figma Mega Menu · Product 3971:28967) + Dim */}
      {/* Dim은 body로 포털: 헤더의 backdrop-filter 안에서는 헤더 밖 영역이 그려지지 않습니다 */}
      {(hasMega || isMobileMenuOpen) &&
        createPortal(
          <div
            className={`${styles.dim} ${isMobileMenuOpen ? styles.dim_mobile : ''}`}
            onMouseEnter={closeMega}
            onClick={() => {
              closeMega();
              setIsMobileMenuOpen(false);
              setMobileOpenIndex(null);
            }}
            aria-hidden="true"
          />,
          document.body
        )}

      {hasMega && openGroup?.items && (
        <>
          <div className={styles.mega} role="region" aria-label={`${openGroup.label} 하위 메뉴`}>
            <div className={styles.mega_container}>
              <p className={styles.mega_title}>{openGroup.label}</p>
              <ul className={styles.mega_items}>
                {openGroup.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`${styles.mega_item} ${isActiveItem(item) ? styles.is_current : ''}`}
                      aria-current={isActiveItem(item) ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                      <Icon name="arrow-right" size={16} color="var(--color-text-black)" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/pub/contact/inquiry" className={styles.promo}>
                <span className={styles.promo_art} aria-hidden="true">
                  <i className={styles.promo_glow} />
                  <i className={styles.promo_bubble_a} />
                  <i className={styles.promo_bubble_b} />
                  <i className={styles.promo_dots}>
                    <b />
                    <b />
                    <b />
                  </i>
                </span>
                <span className={styles.promo_eyebrow}>CONTACT</span>
                <span className={styles.promo_title}>
                  운영 환경에 맞는
                  <br />
                  도입 방식을 선택하세요
                </span>
                <span className={styles.promo_arrow} aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Mobile 전체 메뉴 (Figma HD-MO_v2.4 메뉴열림 3971:29035): 헤더 아래로 펼쳐지는 흰 패널
          행(대메뉴)을 눌러 하위 메뉴를 펼치고, 현재 섹션 행은 왼쪽 2px primary 막대로 표시합니다. */}
      {isMobileMenuOpen && (
        <div className={styles.mobile_panel}>
          <nav className={styles.mobile_nav} aria-label="모바일 메뉴">
            {NAV_GROUPS.map((group, index) => {
              const expanded = mobileOpenIndex === index;
              const current = isActiveGroup(group);
              if (!group.items) {
                return (
                  <div key={group.label} className={`${styles.m_group} ${current ? styles.is_current_section : ''}`}>
                    <Link to={group.to} className={styles.m_row} onClick={toggleMobileMenu}>
                      <span className={styles.m_label}>{group.label}</span>
                      <span className={styles.m_caret} aria-hidden="true">→</span>
                    </Link>
                  </div>
                );
              }
              return (
                <div key={group.label} className={`${styles.m_group} ${current ? styles.is_current_section : ''}`}>
                  <button
                    type="button"
                    className={`${styles.m_row} ${expanded ? styles.is_expanded : ''}`}
                    aria-expanded={expanded}
                    aria-controls={`mobile-sub-${index}`}
                    onClick={() => setMobileOpenIndex(expanded ? null : index)}
                  >
                    <span className={styles.m_label}>{group.label}</span>
                    <Icon name="chevron-down" size={16} className={`${styles.m_chevron} ${expanded ? styles.chevron_open : ''}`} />
                  </button>
                  {expanded && (
                    <ul id={`mobile-sub-${index}`} className={styles.m_sub}>
                      {group.items.map((item) => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            className={`${styles.m_sub_item} ${isActiveItem(item) ? styles.is_current : ''}`}
                            aria-current={isActiveItem(item) ? 'page' : undefined}
                            onClick={toggleMobileMenu}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          <div className={styles.mobile_actions}>
            <Button type="button" variant="solid" color="primary" size="xl" className={styles.m_button}>
              체험하기
            </Button>
            <Button
              type="button"
              variant="subtle"
              bordered
              size="xl"
              className={`${styles.m_button} ${styles.m_button_secondary}`}
              onClick={() => {
                toggleMobileMenu();
                void navigate('/pub/contact/inquiry');
              }}
            >
              도입 문의
            </Button>
            <button type="button" className={styles.mobile_login_link} onClick={toggleMobileMenu}>로그인</button>
          </div>
        </div>
      )}
    </header>
  );
};
