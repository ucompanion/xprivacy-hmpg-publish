import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { Input } from '../../../components/core/Form/Input';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthAlert, AuthBody, AuthCard, AuthLink, AuthLinks } from './components/Auth';
import styles from './login.module.scss';

/**
 * 로그인 (케이스: 기본 · ?case=error 오류 · ?case=locked 일시잠금)
 * Figma PC 2966:2505 / 2966:2523 / 2966:2542 · MO 2967:585 / 2967:867 / 2967:1152
 */
export default function PubLogin() {
  const [searchParams] = useSearchParams();
  const currentCase = searchParams.get('case') ?? 'default';
  const isErrorCase = currentCase === 'error';
  const isLockedCase = currentCase === 'locked';

  // 케이스별 초기 입력값 (오류·잠금은 입력된 상태)
  const filledValue = isErrorCase || isLockedCase;
  const [email, setEmail] = useState(filledValue ? 'user@xprivacy.io' : '');
  const [password, setPassword] = useState(filledValue ? 'password12' : '');

  // 케이스가 바뀌면 입력값 재설정 (effect 대신 렌더 중 이전 값 비교 · React 권장 방식)
  const [prevCase, setPrevCase] = useState(currentCase);
  if (prevCase !== currentCase) {
    setPrevCase(currentCase);
    setEmail(filledValue ? 'user@xprivacy.io' : '');
    setPassword(filledValue ? 'password12' : '');
  }

  // 잠금 상태에서는 로그인 불가 · 그 외에는 이메일·비밀번호가 모두 있어야 활성
  const canSubmit = !isLockedCase && email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <FrontLayout>
      <AuthCard title="로그인" description="xPrivacy 계정으로 로그인하세요.">
        <form className={styles.form} onSubmit={handleSubmit}>
          <AuthBody>
            {isErrorCase && <AuthAlert tone="error">이메일 또는 비밀번호가 올바르지 않습니다.</AuthAlert>}
            {isLockedCase && (
              <AuthAlert tone="error">
                로그인에 5회 실패해 10분 동안 로그인이 제한됩니다. 잠시 후 다시 시도하거나 비밀번호를 재설정하세요.
              </AuthAlert>
            )}

            <Input
              size="lg"
              label="이메일"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              size="lg"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              passwordToggle
            />

            {!isLockedCase && (
              <Link to="/pub/login/find-password" className={styles.forgot}>
                비밀번호를 잊으셨나요?
              </Link>
            )}
          </AuthBody>

          <AuthActions>
            <Button type="submit" variant="solid" color="primary" size="xl" disabled={!canSubmit}>
              로그인
            </Button>
            {isLockedCase ? (
              <AuthLinks>
                <AuthLink to="/pub/login/reset-password">비밀번호 재설정하기</AuthLink>
              </AuthLinks>
            ) : (
              <AuthLinks lead="계정이 없으신가요?">
                <AuthLink to="/pub/login/terms">회원가입</AuthLink>
              </AuthLinks>
            )}
          </AuthActions>
        </form>
      </AuthCard>
    </FrontLayout>
  );
}
