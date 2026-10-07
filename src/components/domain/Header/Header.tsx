import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

// 시안 기반 임시 인라인 로고 (SVG 에셋 없을 때 대체용)
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logo_svg}>
    {/* 시안의 팩맨(Pac-man) 스타일 로고 형태 추정 */}
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#2979FF"/>
    <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5L12 12H16.5Z" fill="#333333"/>
    <circle cx="8.5" cy="12" r="5.5" fill="#00E5FF"/>
  </svg>
);

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <LogoIcon />
          <div className={styles.logo_text}>
            <span className={styles.logo_text_bold}>OFF:ON</span>
            <span className={styles.logo_text_regular}>xPRIVACY</span>
          </div>
        </Link>

        {/* GNB (PC Only) */}
        <nav className={styles.nav}>
          <div className={styles.nav_item}>
            <Link to="/pub/product/intro" className={styles.nav_link}>Product</Link>
            <ul className={styles.depth2}>
              <li><Link to="/pub/product/intro">제품소개</Link></li>
              <li><Link to="/pub/product/core-values">핵심가치</Link></li>
              <li><Link to="/pub/product/why">왜 xPrivacy인가</Link></li>
              <li><Link to="/pub/product/pricing">요금제</Link></li>
              <li><Link to="/pub/product/certification">인증 및 특허</Link></li>
            </ul>
          </div>
          <div className={styles.nav_item}>
            <Link to="/pub/technology/ai-detection" className={styles.nav_link}>Technology</Link>
            <ul className={styles.depth2}>
              <li><Link to="/pub/technology/ai-detection">AI Detection</Link></li>
              <li><Link to="/pub/technology/security">Security</Link></li>
              <li><Link to="/pub/technology/processing-engine">Processing Engine</Link></li>
              <li><Link to="/pub/technology/privacy-engine">Privacy Engine</Link></li>
              <li><Link to="/pub/technology/virtual-face-ai">Virtual Face AI</Link></li>
              <li><Link to="/pub/technology/smart-workflow">Smart Workflow</Link></li>
            </ul>
          </div>
          <div className={styles.nav_item}>
            <Link to="/pub/features/image-deid" className={styles.nav_link}>Features</Link>
            <ul className={styles.depth2}>
              <li><Link to="/pub/features/image-deid">이미지 비식별</Link></li>
              <li><Link to="/pub/features/video-deid">영상 비식별</Link></li>
              <li><Link to="/pub/features/batch-processing">Batch Processing</Link></li>
              <li><Link to="/pub/features/ai-auto-editing">AI 자동편집</Link></li>
              <li><Link to="/pub/features/rest-api">REST API</Link></li>
              <li><Link to="/pub/features/on-premise">On-Premise</Link></li>
              <li><Link to="/pub/features/web-service">Web Service</Link></li>
            </ul>
          </div>
          <div className={styles.nav_item}>
            <Link to="/pub/solutions/broadcasting" className={styles.nav_link}>Solutions</Link>
            <ul className={styles.depth2}>
              <li><Link to="/pub/solutions/broadcasting">방송</Link></li>
              <li><Link to="/pub/solutions/cctv">CCTV</Link></li>
              <li><Link to="/pub/solutions/smart-city">Smart City</Link></li>
              <li><Link to="/pub/solutions/public-institutions">공공기관</Link></li>
              <li><Link to="/pub/solutions/ai-data">AI Data</Link></li>
              <li><Link to="/pub/solutions/finance">금융</Link></li>
              <li><Link to="/pub/solutions/manufacturing">제조</Link></li>
              <li><Link to="/pub/solutions/medical">의료</Link></li>
            </ul>
          </div>
          <div className={styles.nav_item}>
            <Link to="/pub/demo/demo" className={styles.nav_link}>Demo</Link>
            <ul className={styles.depth2}>
              <li><Link to="/pub/demo/demo">Demo</Link></li>
              <li><Link to="/pub/demo/image">이미지 체험</Link></li>
              <li><Link to="/pub/demo/video">영상 체험</Link></li>
              <li><Link to="/pub/demo/tutorial">튜토리얼</Link></li>
            </ul>
          </div>
          <div className={styles.nav_item}>
            <Link to="/pub/contact/brochure" className={styles.nav_link}>Contact</Link>
            <ul className={styles.depth2}>
              <li><Link to="/pub/contact/brochure">Brochure</Link></li>
              <li><Link to="/pub/contact/pseudonymization-guide">Pseudonymization Guide</Link></li>
              <li><Link to="/pub/contact/inquiry">문의</Link></li>
              <li><Link to="/pub/contact/faq">FAQ</Link></li>
              <li><Link to="/pub/contact/download">Download</Link></li>
              <li><Link to="/pub/contact/company">Company</Link></li>
            </ul>
          </div>
        </nav>

        {/* Actions (PC Only) */}
        <div className={styles.actions}>
          <Link to="/pub/login" className={styles.login_link}>로그인</Link>
          <Link to="/pub/contact/inquiry" className={styles.btn_inquiry}>도입 문의</Link>
          <button className={styles.btn_trial}>체험하기</button>
        </div>

        {/* Hamburger (Mobile Only) */}
        <button 
          className={styles.hamburger} 
          aria-label="메뉴 열기"
          onClick={toggleMobileMenu}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobile_menu_overlay}>
          <div className={styles.mobile_menu_header}>
            <Link to="/" className={styles.logo} onClick={toggleMobileMenu}>
              <LogoIcon />
              <div className={styles.logo_text}>
                <span className={styles.logo_text_bold}>OFF:ON</span>
                <span className={styles.logo_text_regular}>xPRIVACY</span>
              </div>
            </Link>
            <button 
              className={styles.btn_close} 
              onClick={toggleMobileMenu}
              aria-label="메뉴 닫기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.mobile_menu_body}>
            <nav className={styles.mobile_nav}>
              <Link to="/pub/product/intro" className={styles.mobile_nav_link} onClick={toggleMobileMenu}>Product</Link>
              <Link to="/pub/technology/ai-detection" className={styles.mobile_nav_link} onClick={toggleMobileMenu}>Technology</Link>
              <Link to="/pub/features/image-deid" className={styles.mobile_nav_link} onClick={toggleMobileMenu}>Features</Link>
              <Link to="/pub/solutions/broadcasting" className={styles.mobile_nav_link} onClick={toggleMobileMenu}>Solutions</Link>
              <Link to="/pub/demo/demo" className={styles.mobile_nav_link} onClick={toggleMobileMenu}>Demo</Link>
              <Link to="/pub/contact/brochure" className={styles.mobile_nav_link} onClick={toggleMobileMenu}>Contact</Link>
            </nav>
          </div>

          <div className={styles.mobile_menu_footer}>
            <Link to="/pub/contact/inquiry" className={styles.btn_mobile_inquiry} onClick={toggleMobileMenu}>도입 문의</Link>
            <button className={styles.btn_mobile_trial}>체험하기</button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <Link to="/pub/login" className={styles.mobile_login_link} onClick={toggleMobileMenu}>로그인</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
