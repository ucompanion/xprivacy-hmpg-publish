import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { Input } from '../../../components/core/Form/Input';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthAlert, AuthBody, AuthCard, AuthLink, AuthLinks } from './components/Auth';
import styles from './login.module.scss';

const PASSWORD_RULES = ['8자 이상', '영문·숫자·특수문자 중 2종 이상'];

/**
 * 비밀번호 재설정 (케이스: 기본 입력 · ?case=complete 완료 · ?case=expired 링크만료)
 * Figma PC 2966:2586 / 2966:2602 / 2966:2613 · MO 2967:1976 / 2967:2255 / 2967:2522
 */
export default function PubLoginResetPassword() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCase = searchParams.get('case') ?? 'default';

  const [password, setPassword] = useState('password12');
  const [confirmPassword, setConfirmPassword] = useState('password12');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ case: 'complete' });
  };

  if (currentCase === 'complete') {
    return (
      <FrontLayout>
        <AuthCard title="비밀번호가 변경되었습니다">
          <AuthBody>
            <AuthAlert tone="success">새 비밀번호로 로그인하세요. 다른 기기에 로그인된 계정은 로그아웃됩니다.</AuthAlert>
          </AuthBody>
          <AuthActions>
            <Button variant="solid" color="primary" size="xl" onClick={() => void navigate('/pub/login')}>
              로그인하기
            </Button>
          </AuthActions>
        </AuthCard>
      </FrontLayout>
    );
  }

  if (currentCase === 'expired') {
    return (
      <FrontLayout>
        <AuthCard title="링크가 만료되었습니다">
          <AuthBody>
            <AuthAlert tone="error">
              재설정 링크가 만료되었거나 이미 사용되었습니다. 링크는 발송 후 30분 동안만 유효합니다.
            </AuthAlert>
          </AuthBody>
          <AuthActions>
            <Button variant="solid" color="primary" size="xl" onClick={() => void navigate('/pub/login/find-password')}>
              재설정 링크 다시 받기
            </Button>
            <AuthLinks>
              <AuthLink to="/pub/login">← 로그인으로 돌아가기</AuthLink>
            </AuthLinks>
          </AuthActions>
        </AuthCard>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout>
      <AuthCard title="새 비밀번호 설정" description="새로 사용할 비밀번호를 입력하세요.">
        <form className={styles.form} onSubmit={handleSubmit}>
          <AuthBody>
            <Input
              size="lg"
              label="새 비밀번호"
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              passwordToggle
            />
            {/* 비밀번호 조건 충족 표시 (✓ 초록) */}
            <ul className={styles.rules}>
              {PASSWORD_RULES.map((rule) => (
                <li key={rule}>✓ {rule}</li>
              ))}
            </ul>
            <Input
              size="lg"
              label="새 비밀번호 확인"
              type="password"
              placeholder="새 비밀번호를 한 번 더 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              passwordToggle
            />
          </AuthBody>
          <AuthActions>
            <Button
              type="submit"
              variant="solid"
              color="primary"
              size="xl"
              disabled={!password.trim() || !confirmPassword.trim()}
            >
              비밀번호 변경
            </Button>
          </AuthActions>
        </form>
      </AuthCard>
    </FrontLayout>
  );
}
