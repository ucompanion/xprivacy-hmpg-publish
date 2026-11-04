import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { Input } from '../../../components/core/Form/Input';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthAlert, AuthBody, AuthCard, AuthLink, AuthLinks, AuthNote } from './components/Auth';
import styles from './login.module.scss';

/**
 * 비밀번호 찾기 (케이스: 기본 입력 · ?case=sent 발송안내)
 * Figma PC 2966:2558 / 2966:2572 · MO 2967:1434 / 2967:1706
 */
export default function PubLoginFindPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isSentCase = searchParams.get('case') === 'sent';
  const [email, setEmail] = useState('user@xprivacy.io');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ case: 'sent' });
  };

  const backLink = (
    <AuthLinks>
      <AuthLink to="/pub/login">← 로그인으로 돌아가기</AuthLink>
    </AuthLinks>
  );

  return (
    <FrontLayout>
      {isSentCase ? (
        <AuthCard title="메일을 확인하세요">
          <AuthBody>
            <AuthAlert tone="success">입력한 이메일로 가입된 계정이 있으면 비밀번호 재설정 링크를 보냈습니다.</AuthAlert>
            <AuthNote>링크는 30분 동안 유효합니다. 메일이 오지 않으면 스팸함을 확인하세요.</AuthNote>
          </AuthBody>
          <AuthActions>
            {/* 재발송 대기 중 (퍼블리싱 고정 표시) */}
            <Button variant="solid" color="primary" size="xl" disabled>
              다시 보내기 (59초)
            </Button>
            {backLink}
          </AuthActions>
        </AuthCard>
      ) : (
        <AuthCard title="비밀번호 찾기" description="가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.">
          <form className={styles.form} onSubmit={handleSubmit}>
            <AuthBody>
              <Input
                size="lg"
                label="이메일"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </AuthBody>
            <AuthActions>
              <Button type="submit" variant="solid" color="primary" size="xl" disabled={!email.trim()}>
                재설정 링크 받기
              </Button>
              {backLink}
            </AuthActions>
          </form>
        </AuthCard>
      )}
    </FrontLayout>
  );
}
