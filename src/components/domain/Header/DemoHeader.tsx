import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './DemoHeader.module.scss';

/**
 * 데모 전용 GNB 헤더 (DemoHeader)
 * Figma Node: 1254:22037 (Header)
 * - 심볼 없는 미니멀 텍스트 로고 'xPrivacy'
 * - 1depth 수평 네비게이션: Product, Features, Technology, Solutions, Demo, Blog
 * - 우측 유틸: 로그인 (텍스트), 도입 문의 (캡슐 아웃라인 버튼), 체험하기 (캡슐 아웃라인 버튼)
 * - 높이: 68px 고정
 */
export const DemoHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className={styles.demo_header}>
      <div className={styles.container}>
        {/* Left Group: Logo + Navigation */}
        <div className={styles.left_group}>
          <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
            xPrivacy
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/pub/product/intro"
              className={`${styles.nav_link} ${isActive('/pub/product') ? styles.active : ''}`}
            >
              Product
            </Link>
            <Link
              to="/pub/features/image-deid"
              className={`${styles.nav_link} ${isActive('/pub/features') ? styles.active : ''}`}
            >
              Features
            </Link>
            <Link
              to="/pub/technology/ai-detection"
              className={`${styles.nav_link} ${isActive('/pub/technology') ? styles.active : ''}`}
            >
              Technology
            </Link>
            <Link
              to="/pub/solutions/broadcasting"
              className={`${styles.nav_link} ${isActive('/pub/solutions') ? styles.active : ''}`}
            >
              Solutions
            </Link>
            <Link
              to="/pub/demo/demo"
              className={`${styles.nav_link} ${isActive('/pub/demo') ? styles.active : ''}`}
            >
              Demo
            </Link>
            <Link
              to="/pub/blog"
              className={`${styles.nav_link} ${isActive('/pub/blog') ? styles.active : ''}`}
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Right Group: Login + Action Buttons */}
        <div className={styles.right_group}>
          <Link to="/pub/login" className={styles.login_link}>
            로그인
          </Link>
          <Link to="/pub/contact/inquiry" className={styles.btn_capsule}>
            도입 문의
          </Link>
          <Link to="/pub/demo/demo" className={styles.btn_capsule}>
            체험하기
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={`${styles.btn_mobile_menu} ${isMobileMenuOpen ? styles.is_open : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={styles.mobile_drawer}>
          <nav className={styles.mobile_nav}>
            <Link
              to="/pub/product/intro"
              className={isActive('/pub/product') ? styles.active : ''}
              onClick={closeMobileMenu}
            >
              Product
            </Link>
            <Link
              to="/pub/features/image-deid"
              className={isActive('/pub/features') ? styles.active : ''}
              onClick={closeMobileMenu}
            >
              Features
            </Link>
            <Link
              to="/pub/technology/ai-detection"
              className={isActive('/pub/technology') ? styles.active : ''}
              onClick={closeMobileMenu}
            >
              Technology
            </Link>
            <Link
              to="/pub/solutions/broadcasting"
              className={isActive('/pub/solutions') ? styles.active : ''}
              onClick={closeMobileMenu}
            >
              Solutions
            </Link>
            <Link
              to="/pub/demo/demo"
              className={isActive('/pub/demo') ? styles.active : ''}
              onClick={closeMobileMenu}
            >
              Demo
            </Link>
            <Link
              to="/pub/blog"
              className={isActive('/pub/blog') ? styles.active : ''}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
          </nav>

          <div className={styles.mobile_utils}>
            <Link to="/pub/login" className={styles.mobile_login} onClick={closeMobileMenu}>
              로그인
            </Link>
            <div className={styles.mobile_btn_group}>
              <Link to="/pub/contact/inquiry" className={styles.btn_capsule} onClick={closeMobileMenu}>
                도입 문의
              </Link>
              <Link to="/pub/demo/demo" className={styles.btn_capsule} onClick={closeMobileMenu}>
                체험하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
