import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { SignupStepIndicator } from './components/SignupStepIndicator';
import styles from './signup-flow.module.scss';

export default function PubLoginSignup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCase = searchParams.get('case') || 'default';
  const isErrorCase = currentCase === 'error';

  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('user@xprivacy.io');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isErrorCase) {
      setName('홍길동');
      setEmail('user@xprivacy.io');
      setPassword('password123');
      setConfirmPassword('password999'); // 불일치 값
    } else {
      setName('홍길동');
      setEmail('user@xprivacy.io');
      setPassword('password123');
      setConfirmPassword('');
    }
  }, [isErrorCase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/pub/login/signup-complete');
  };

  const isButtonActive = isErrorCase || (name.trim() && email.trim() && password.trim() && confirmPassword.trim());

  return (
    <FrontLayout>
      <div className={styles.page_wrap}>
        <div className={styles.card}>
          <SignupStepIndicator currentStep={2} />

          <div className={styles.header}>
            <h1 className={styles.title}>회원가입</h1>
            <p className={styles.subtitle}>계정 정보를 입력해주세요.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* 이름 */}
            <div className={styles.form_group}>
              <label htmlFor="signup-name" className={styles.label}>이름</label>
              <input
                id="signup-name"
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름 입력"
                required
              />
            </div>

            {/* 이메일 */}
            <div className={styles.form_group}>
              <label htmlFor="signup-email" className={styles.label}>이메일</label>
              <input
                id="signup-email"
                type="email"
                className={`${styles.input} ${isErrorCase ? styles.has_error : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
              />
              {isErrorCase && (
                <p className={styles.error_text}>
                  이미 가입된 이메일입니다.{' '}
                  <Link to="/pub/login">로그인</Link>
                  하거나{' '}
                  <Link to="/pub/login/find-password">비밀번호를 찾아보세요.</Link>
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className={styles.form_group}>
              <label htmlFor="signup-password" className={styles.label}>비밀번호</label>
              <div className={styles.password_wrap}>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
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
              <p className={styles.helper_text}>8자 이상, 영문·숫자·특수문자 중 2종 이상</p>
            </div>

            {/* 비밀번호 확인 */}
            <div className={styles.form_group}>
              <label htmlFor="signup-confirm-password" className={styles.label}>비밀번호 확인</label>
              <div className={styles.password_wrap}>
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`${styles.input} ${isErrorCase ? styles.has_error : ''}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 한 번 더 입력하세요"
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
              {isErrorCase && (
                <p className={styles.error_text}>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            {/* 가입하기 버튼 */}
            <button
              type="submit"
              className={`${styles.btn_primary} ${isButtonActive ? '' : styles.disabled}`}
              disabled={!isButtonActive}
            >
              가입하기
            </button>
          </form>

          <div className={styles.footer_links}>
            <Link to="/pub/login/terms" className={styles.back_link}>
              ← 이전 단계
            </Link>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
