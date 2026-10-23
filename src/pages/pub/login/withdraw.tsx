import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { Input } from '../../../components/core/Form/Input';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthAlert, AuthBody, AuthCard, AuthCheckbox, AuthLink, AuthLinks } from './components/Auth';
import styles from './login.module.scss';

// 탈퇴 전 확인 사항 (초안 · 시안 없음 → 로그인·회원가입 UI 컨셉으로 구성)
const WITHDRAW_NOTICES = [
  '계정 정보(이름·이메일)는 탈퇴 즉시 삭제됩니다.',
  '처리 내역과 업로드한 파일은 30일 후 영구 삭제되며 복구할 수 없습니다.',
  '이용 중인 상품이나 계약이 있으면 먼저 해지해야 탈퇴할 수 있습니다.',
];

/**
 * 회원 탈퇴 (초안 · 케이스: 기본 · ?case=error 비밀번호 오류)
 * 구성: 안내(오류 톤) → 확인 사항 목록 → 비밀번호 확인 → 동의 체크 → 탈퇴하기
 */
export default function PubLoginWithdraw() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isErrorCase = searchParams.get('case') === 'error';

  const [password, setPassword] = useState(isErrorCase ? 'password12' : '');
  const [agreed, setAgreed] = useState(isErrorCase);

  // 케이스가 바뀌면 입력값 재설정 (렌더 중 이전 값 비교)
  const [prevErrorCase, setPrevErrorCase] = useState(isErrorCase);
  if (prevErrorCase !== isErrorCase) {
    setPrevErrorCase(isErrorCase);
    setPassword(isErrorCase ? 'password12' : '');
    setAgreed(isErrorCase);
  }

  const canSubmit = password.trim() !== '' && agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void navigate('/pub/login/withdraw-complete');
  };

  return (
    <FrontLayout>
      <AuthCard title="회원 탈퇴" description="탈퇴하기 전에 아래 내용을 확인해주세요.">
        <form className={styles.form} onSubmit={handleSubmit}>
          <AuthBody>
            {isErrorCase ? (
              <AuthAlert tone="error">비밀번호가 올바르지 않습니다. 다시 입력해주세요.</AuthAlert>
            ) : (
              <AuthAlert tone="error">탈퇴하면 계정과 작업 기록이 삭제되며 되돌릴 수 없습니다.</AuthAlert>
            )}

            <ul className={styles.notices}>
              {WITHDRAW_NOTICES.map((notice) => (
                <li key={notice}>{notice}</li>
              ))}
            </ul>

            <Input
              size="lg"
              label="비밀번호 확인"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              error={isErrorCase ? '비밀번호가 일치하지 않습니다.' : undefined}
              passwordToggle
            />

            <AuthCheckbox
              checked={agreed}
              label="안내 사항을 모두 확인했으며 탈퇴에 동의합니다."
              onChange={() => setAgreed((prev) => !prev)}
            />
          </AuthBody>
          <AuthActions>
            <Button type="submit" variant="solid" color="primary" size="xl" disabled={!canSubmit}>
              탈퇴하기
            </Button>
            <AuthLinks lead="탈퇴하지 않으시겠어요?">
              <AuthLink to="/pub/main">홈으로 돌아가기</AuthLink>
            </AuthLinks>
          </AuthActions>
        </form>
      </AuthCard>
    </FrontLayout>
  );
}
