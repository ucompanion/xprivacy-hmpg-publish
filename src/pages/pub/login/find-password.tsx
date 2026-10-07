import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import styles from './find-password.module.scss';

export default function PubLoginFindPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCase = searchParams.get('case') || 'default';
  const isSentCase = currentCase === 'sent';

  const [email, setEmail] = useState('user@xprivacy.io');

  useEffect(() => {
    if (currentCase === 'default') {
      setEmail('user@xprivacy.io');
    }
  }, [currentCase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ case: 'sent' });
  };

  return (
    <FrontLayout>
      <div className={styles.find_password_page}>
        <div className={styles.card}>
          {isSentCase ? (
            /* Case 2: 메일 확인 화면 */
            <>
              <div className={styles.header}>
                <h1 className={styles.title}>메일을 확인하세요</h1>
              </div>

              <div className={styles.success_alert} role="status">
                <span className={styles.alert_icon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#10B981" />
                    <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={styles.alert_text}>
                  입력한 이메일로 가입된 계정이 있으면 비밀번호 재설정 링크를 보냈습니다.
                </span>
              </div>

              <p className={styles.info_text}>
                링크는 30분 동안 유효합니다. 메일이 오지 않으면 스팸함을 확인하세요.
              </p>

              <button
                type="button"
                className={`${styles.btn_submit} ${styles.is_disabled}`}
                disabled
              >
                다시 보내기 (59초)
              </button>
            </>
          ) : (
            /* Case 1: 비밀번호 찾기 이메일 입력 화면 */
            <>
              <div className={styles.header}>
                <h1 className={styles.title}>비밀번호 찾기</h1>
                <p className={styles.subtitle}>
                  가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.
                </p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <label htmlFor="reset-email" className={styles.label}>이메일</label>
                  <input
                    id="reset-email"
                    type="email"
                    className={styles.input}
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`${styles.btn_submit} ${email.trim() ? styles.is_active : styles.is_disabled}`}
                  disabled={!email.trim()}
                >
                  재설정 링크 받기
                </button>
              </form>
            </>
          )}

          <div className={styles.footer_links}>
            <Link to="/pub/login" className={styles.back_link}>
              ← 로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
