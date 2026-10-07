import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import styles from './reset-password.module.scss';

export default function PubLoginResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCase = searchParams.get('case') || 'default';

  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isCompleteCase = currentCase === 'complete';
  const isExpiredCase = currentCase === 'expired';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ case: 'complete' });
  };

  return (
    <FrontLayout>
      <div className={styles.reset_password_page}>
        <div className={styles.card}>
          {isCompleteCase ? (
            /* Case 2: 비밀번호 변경 완료 */
            <>
              <div className={styles.header}>
                <h1 className={styles.title}>비밀번호가 변경되었습니다</h1>
              </div>

              <div className={`${styles.alert_box} ${styles.success}`} role="status">
                <span className={styles.alert_icon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#10B981" />
                    <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={styles.alert_text}>
                  새 비밀번호로 로그인하세요. 다른 기기에 로그인된 계정은 로그아웃됩니다.
                </span>
              </div>

              <Link to="/pub/login" className={styles.btn_submit}>
                로그인하기
              </Link>
            </>
          ) : isExpiredCase ? (
            /* Case 3: 링크 만료 */
            <>
              <div className={styles.header}>
                <h1 className={styles.title}>링크가 만료되었습니다</h1>
              </div>

              <div className={`${styles.alert_box} ${styles.danger}`} role="alert">
                <span className={styles.alert_icon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#EF4444" />
                    <path d="M10 5.5V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="10" cy="14.5" r="1.25" fill="white" />
                  </svg>
                </span>
                <span className={styles.alert_text}>
                  재설정 링크가 만료되었거나 이미 사용되었습니다. 링크는 발송 후 30분 동안만 유효합니다.
                </span>
              </div>

              <Link to="/pub/login/find-password" className={styles.btn_submit}>
                재설정 링크 다시 받기
              </Link>

              <div className={styles.footer_links}>
                <Link to="/pub/login" className={styles.back_link}>
                  ← 로그인으로 돌아가기
                </Link>
              </div>
            </>
          ) : (
            /* Case 1: 새 비밀번호 설정 입력 폼 */
            <>
              <div className={styles.header}>
                <h1 className={styles.title}>새 비밀번호 설정</h1>
                <p className={styles.subtitle}>새로 사용할 비밀번호를 입력하세요.</p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <label htmlFor="new-password" className={styles.label}>새 비밀번호</label>
                  <div className={styles.password_wrap}>
                    <input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      className={styles.input}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="새 비밀번호 입력"
                      required
                    />
                    <button
                      type="button"
                      className={styles.btn_toggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '숨기기' : '보기'}
                    </button>
                  </div>

                  <div className={styles.validation_list}>
                    <div className={styles.item}>
                      <span className={styles.check_icon} aria-hidden="true">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>8자 이상</span>
                    </div>
                    <div className={styles.item}>
                      <span className={styles.check_icon} aria-hidden="true">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>영문·숫자·특수문자 중 2종 이상</span>
                    </div>
                  </div>
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="confirm-password" className={styles.label}>새 비밀번호 확인</label>
                  <div className={styles.password_wrap}>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={styles.input}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="새 비밀번호 다시 입력"
                      required
                    />
                    <button
                      type="button"
                      className={styles.btn_toggle}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '숨기기' : '보기'}
                    </button>
                  </div>
                </div>

                <button type="submit" className={styles.btn_submit}>
                  비밀번호 변경
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </FrontLayout>
  );
}
