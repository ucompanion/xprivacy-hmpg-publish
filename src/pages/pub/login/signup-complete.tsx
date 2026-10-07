import { Link } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { SignupStepIndicator } from './components/SignupStepIndicator';
import styles from './signup-flow.module.scss';

export default function PubLoginSignupComplete() {
  return (
    <FrontLayout>
      <div className={styles.page_wrap}>
        <div className={styles.card}>
          <SignupStepIndicator currentStep={3} />

          <div className={styles.header}>
            <h1 className={styles.title}>인증 메일을 보냈습니다</h1>
          </div>

          <p className={styles.complete_desc}>
            <strong>user@xprivacy.io</strong>로 보낸 메일의 링크를 눌러 가입을 완료하세요.
          </p>

          <div className={styles.info_callout} role="status">
            <span className={styles.info_icon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#3B82F6" />
                <path d="M10 9V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="10" cy="6" r="1.25" fill="white" />
              </svg>
            </span>
            <span className={styles.info_text}>
              메일이 오지 않으면 스팸함을 확인하거나 아래 버튼으로 다시 받으세요.
            </span>
          </div>

          <button type="button" className={styles.btn_outline}>
            인증 메일 다시 보내기
          </button>

          <div className={styles.footer_links}>
            <span>
              이메일을 잘못 입력했나요?{' '}
              <Link to="/pub/login/terms" className={styles.link}>
                다시 가입하기
              </Link>
            </span>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
