import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

// 시안 기반 임시 인라인 로고 (Header와 동일)
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logo_svg}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#2979FF"/>
    <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5L12 12H16.5Z" fill="#111111"/>
    <circle cx="8.5" cy="12" r="5.5" fill="#00E5FF"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section: Logo & Description */}
        <div className={styles.top_section}>
          <Link to="/" className={styles.logo}>
            <LogoIcon />
            <div className={styles.logo_text}>
              <span className={styles.logo_text_bold}>OFF:ON</span>
              <span className={styles.logo_text_regular}>xPRIVACY</span>
            </div>
          </Link>
          <p className={styles.description}>
            AI 기반 정밀탐지로 개인정보 비식별화 및 관리 솔루션.<br />
            영상·이미지 속 개인정보를 탐지하고 비식별 처리부터<br />
            검수·관리까지 하나의 흐름으로 연결합니다.
          </p>
        </div>

        {/* Navigation Grid (7 Columns) */}
        <div className={styles.nav_grid}>
          <div className={styles.nav_group}>
            <h4 className={styles.nav_title}>PRODUCT</h4>
            <div className={styles.nav_list}>
              <Link to="/pub/product/intro" className={styles.nav_link}>제품소개</Link>
              <Link to="/pub/product/core-values" className={styles.nav_link}>핵심가치</Link>
              <Link to="/pub/product/why" className={styles.nav_link}>왜 xPrivacy인가</Link>
              <Link to="/pub/product/pricing" className={styles.nav_link}>요금제</Link>
              <Link to="/pub/product/certification" className={styles.nav_link}>인증 및 특허</Link>
            </div>
          </div>
          
          <div className={styles.nav_group}>
            <h4 className={styles.nav_title}>TECHNOLOGY</h4>
            <div className={styles.nav_list}>
              <Link to="/pub/technology/ai-detection" className={styles.nav_link}>AI Detection</Link>
              <Link to="/pub/technology/security" className={styles.nav_link}>Security</Link>
              <Link to="/pub/technology/processing-engine" className={styles.nav_link}>Processing Engine</Link>
              <Link to="/pub/technology/privacy-engine" className={styles.nav_link}>Privacy Engine</Link>
              <Link to="/pub/technology/virtual-face-ai" className={styles.nav_link}>Virtual Face AI</Link>
              <Link to="/pub/technology/smart-workflow" className={styles.nav_link}>Smart Workflow</Link>
            </div>
          </div>

          <div className={styles.nav_group}>
            <h4 className={styles.nav_title}>FEATURES</h4>
            <div className={styles.nav_list}>
              <Link to="/pub/features/image-deid" className={styles.nav_link}>이미지 비식별</Link>
              <Link to="/pub/features/video-deid" className={styles.nav_link}>영상 비식별</Link>
              <Link to="/pub/features/batch-processing" className={styles.nav_link}>Batch Processing</Link>
              <Link to="/pub/features/ai-auto-editing" className={styles.nav_link}>AI 자동편집</Link>
              <Link to="/pub/features/rest-api" className={styles.nav_link}>REST API</Link>
              <Link to="/pub/features/on-premise" className={styles.nav_link}>On-Premise</Link>
              <Link to="/pub/features/web-service" className={styles.nav_link}>Web Service</Link>
            </div>
          </div>

          <div className={styles.nav_group}>
            <h4 className={styles.nav_title}>SOLUTIONS</h4>
            <div className={styles.nav_list}>
              <Link to="/pub/solutions/broadcasting" className={styles.nav_link}>방송</Link>
              <Link to="/pub/solutions/cctv" className={styles.nav_link}>CCTV</Link>
              <Link to="/pub/solutions/smart-city" className={styles.nav_link}>Smart City</Link>
              <Link to="/pub/solutions/public-institutions" className={styles.nav_link}>공공기관</Link>
              <Link to="/pub/solutions/ai-data" className={styles.nav_link}>AI Data</Link>
              <Link to="/pub/solutions/finance" className={styles.nav_link}>금융</Link>
              <Link to="/pub/solutions/manufacturing" className={styles.nav_link}>제조</Link>
              <Link to="/pub/solutions/medical" className={styles.nav_link}>의료</Link>
            </div>
          </div>

          <div className={styles.nav_group}>
            <h4 className={styles.nav_title}>DEMO</h4>
            <div className={styles.nav_list}>
              <Link to="/pub/demo/demo" className={styles.nav_link}>Demo</Link>
              <Link to="/pub/demo/image" className={styles.nav_link}>이미지 체험</Link>
              <Link to="/pub/demo/video" className={styles.nav_link}>영상 체험</Link>
              <Link to="/pub/demo/tutorial" className={styles.nav_link}>튜토리얼</Link>
            </div>
          </div>

          <div className={styles.nav_group}>
            <h4 className={styles.nav_title}>CONTACT</h4>
            <div className={styles.nav_list}>
              <Link to="/pub/contact/brochure" className={styles.nav_link}>Brochure</Link>
              <Link to="/pub/contact/pseudonymization-guide" className={styles.nav_link}>Pseudonymization Guide</Link>
              <Link to="/pub/contact/inquiry" className={styles.nav_link}>문의</Link>
              <Link to="/pub/contact/faq" className={styles.nav_link}>FAQ</Link>
              <Link to="/pub/contact/company" className={styles.nav_link}>Company</Link>
            </div>
          </div>

          <div className={styles.nav_group}>
            <h4 className={styles.nav_title}>BLOG</h4>
            <div className={styles.nav_list}>
              {/* Blog empty in the design */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom_section}>
          <div className={styles.legal_links}>
            <Link to="/pub/company" className={styles.legal_link}>회사소개</Link>
            <span className={styles.separator}>|</span>
            <Link to="/pub/terms" className={styles.legal_link}>이용약관</Link>
            <span className={styles.separator}>|</span>
            <Link to="/pub/privacy" className={styles.legal_link}>개인정보보호</Link>
          </div>
          
          <hr className={styles.divider} />

          <div className={styles.company_info_wrap}>
            <div className={styles.company_details}>
              <p>(주)월드버텍</p>
              <p>TEL : 02-576-3776 FAX: 02-576-3741</p>
              <p>06748 서울시 서초구 강남대로 148, 3층 (양재동, 상록빌딩)</p>
              <p>통신판매업신고번호: 00000000000</p>
            </div>
            <div className={styles.copyright}>
              Copyrightⓒ 월드버텍(주), All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
