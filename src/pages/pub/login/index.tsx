import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import styles from './login.module.scss';

export default function PubLogin() {
  const [searchParams] = useSearchParams();
  const currentCase = searchParams.get('case') || 'default';

  // 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 케이스별 데이터 동기화
  useEffect(() => {
    if (currentCase === 'error') {
      setEmail('user@xprivacy.io');
      setPassword('password123');
    } else if (currentCase === 'locked') {
      setEmail('user@xprivacy.io');
      setPassword('password123');
    } else {
      // default
      setEmail('');
      setPassword('');
    }
  }, [currentCase]);

  // 케이스별 파생 상태
  const isErrorCase = currentCase === 'error';
  const isLockedCase = currentCase === 'locked';

  // 알럿 메시지
  const alertMessage = isLockedCase
    ? '로그인에 5회 실패하여 10분 동안 로그인이 제한됩니다. 잠시 후 다시 시도하거나 비밀번호를 재설정하세요.'
    : isErrorCase
    ? '이메일 또는 비밀번호가 올바르지 않습니다.'
    : null;

  // 버튼 활성화 여부
  const isButtonActive = isErrorCase || (currentCase === 'default' && email.trim() !== '' && password.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <FrontLayout>
      <div className={styles.login_page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>로그인</h1>
            <p className={styles.subtitle}>xPrivacy 계정으로 로그인하세요.</p>
          </div>

          {alertMessage && (
            <div className={styles.alert} role="alert">
              <span className={styles.alert_icon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#EF4444" />
                  <path d="M10 5.5V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="10" cy="14.5" r="1.25" fill="white" />
                </svg>
              </span>
              <span className={styles.alert_text}>{alertMessage}</span>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="login-email" className={styles.label}>이메일</label>
              <input
                id="login-email"
                type="email"
                className={styles.input}
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="login-password" className={styles.label}>비밀번호</label>
              <div className={styles.password_wrap}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.btn_toggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>

              {!isLockedCase && (
                <Link to="/pub/login/find-password" className={styles.forgot_password}>
                  비밀번호를 잊으셨나요?
                </Link>
              )}
            </div>

            <button
              type="submit"
              className={`${styles.btn_submit} ${isButtonActive && !isLockedCase ? styles.is_active : styles.is_disabled}`}
              disabled={!isButtonActive || isLockedCase}
            >
              로그인
            </button>
          </form>

          <div className={styles.footer_links}>
            {isLockedCase ? (
              <Link to="/pub/login/find-password" className={styles.reset_link}>
                비밀번호 재설정하기
              </Link>
            ) : (
              <span>
                계정이 없으신가요?
                <Link to="/pub/login/signup" className={styles.signup_link}>
                  회원가입
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
