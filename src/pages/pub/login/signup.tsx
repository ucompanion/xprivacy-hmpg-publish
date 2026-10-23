import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { Input } from '../../../components/core/Form/Input';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthBody, AuthCard, AuthLink, AuthLinks } from './components/Auth';
import styles from './login.module.scss';

const PASSWORD_HELPER = '8자 이상, 영문·숫자·특수문자 중 2종 이상';

/** 케이스별 초기 입력값 (오류 케이스: 확인 비밀번호 불일치) */
function initialValues(isErrorCase: boolean) {
  return {
    name: '홍길동',
    email: 'user@xprivacy.io',
    password: 'password12',
    confirmPassword: isErrorCase ? 'passwor9' : '',
  };
}

/**
 * 회원가입 2단계 · 정보 입력 (케이스: 기본 · ?case=error 오류)
 * Figma PC 2966:5661 / 2966:5679 · MO 2967:3447 / 2967:3752
 */
export default function PubLoginSignup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCase = searchParams.get('case') ?? 'default';
  const isErrorCase = currentCase === 'error';

  const [values, setValues] = useState(() => initialValues(isErrorCase));

  // 케이스가 바뀌면 입력값 재설정 (effect 대신 렌더 중 이전 값 비교 · React 권장 방식)
  const [prevCase, setPrevCase] = useState(currentCase);
  if (prevCase !== currentCase) {
    setPrevCase(currentCase);
    setValues(initialValues(isErrorCase));
  }

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const canSubmit = Object.values(values).every((value) => value.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void navigate('/pub/login/signup-complete');
  };

  return (
    <FrontLayout>
      <AuthCard step={2} title="회원가입" description="계정 정보를 입력해주세요.">
        <form className={styles.form} onSubmit={handleSubmit}>
          <AuthBody>
            <Input size="lg" label="이름" value={values.name} onChange={update('name')} autoComplete="name" />
            <Input
              size="lg"
              label="이메일"
              type="email"
              placeholder="name@company.com"
              value={values.email}
              onChange={update('email')}
              autoComplete="email"
              error={isErrorCase ? '이미 가입된 이메일입니다. 로그인하거나 비밀번호를 찾아보세요.' : undefined}
            />
            <Input
              size="lg"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={values.password}
              onChange={update('password')}
              autoComplete="new-password"
              helper={PASSWORD_HELPER}
              passwordToggle
            />
            <Input
              size="lg"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 한 번 더 입력하세요"
              value={values.confirmPassword}
              onChange={update('confirmPassword')}
              autoComplete="new-password"
              error={isErrorCase ? '비밀번호가 일치하지 않습니다.' : undefined}
              passwordToggle
            />
          </AuthBody>
          <AuthActions>
            <Button type="submit" variant="solid" color="primary" size="xl" disabled={!canSubmit}>
              가입하기
            </Button>
            <AuthLinks>
              <AuthLink to="/pub/login/terms">← 이전 단계</AuthLink>
            </AuthLinks>
          </AuthActions>
        </form>
      </AuthCard>
    </FrontLayout>
  );
}
