import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthBody, AuthCard, AuthCheckbox, AuthLink, AuthLinks } from './components/Auth';
import styles from './login.module.scss';

const TERMS_OF_SERVICE = `제1조 (목적)
이 약관은 서비스 이용과 관련하여 필요한 사항을 규정함을 목적으로 합니다.

제2조 (이용계약의 성립)
이용자는 약관에 동의함으로써 이용계약이 성립됩니다.

제3조 (서비스의 제공 및 변경)
회사는 안정적인 서비스 제공을 위해 운영상·기술상 필요에 따라 서비스를 변경할 수 있습니다.`;

const PRIVACY_CONSENT = `1. 수집 항목
이름, 이메일, 비밀번호

2. 수집 및 이용 목적
회원 식별, 서비스 제공, 고객 문의 응대

3. 보유 및 이용 기간
회원 탈퇴 시까지 (관련 법령에 따라 보관이 필요한 경우 해당 기간)`;

interface Agreement {
  id: string;
  label: string;
  content: string;
}

const AGREEMENTS: Agreement[] = [
  { id: 'service', label: '[필수] 이용약관 동의', content: TERMS_OF_SERVICE },
  { id: 'privacy', label: '[필수] 개인정보 수집 및 이용 동의', content: PRIVACY_CONSENT },
];

/**
 * 회원가입 1단계 · 약관 동의
 * Figma PC 2966:5641 · MO 2967:3142
 */
export default function PubLoginTerms() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<string, boolean>>({ service: true, privacy: false });
  const [opened, setOpened] = useState<Record<string, boolean>>({ service: true, privacy: false });

  const checkedCount = AGREEMENTS.filter((item) => checked[item.id]).length;
  const allChecked = checkedCount === AGREEMENTS.length;

  const toggleAll = () => {
    setChecked(Object.fromEntries(AGREEMENTS.map((item) => [item.id, !allChecked])));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (allChecked) void navigate('/pub/login/signup');
  };

  return (
    <FrontLayout>
      <AuthCard step={1} title="회원가입" description="서비스 이용을 위해 약관에 동의해주세요.">
        <form className={styles.form} onSubmit={handleNext}>
          <AuthBody>
            <div className={styles.agreements}>
              <AuthCheckbox
                checked={allChecked}
                indeterminate={checkedCount > 0 && !allChecked}
                label="약관에 모두 동의합니다."
                strong
                onChange={toggleAll}
              />
              <hr className={styles.agreeDivider} />
              {AGREEMENTS.map((item) => (
                <div key={item.id} className={styles.agreeRow}>
                  <div className={styles.agreeHead}>
                    <AuthCheckbox
                      checked={Boolean(checked[item.id])}
                      label={item.label}
                      onChange={() => setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                    />
                    <button
                      type="button"
                      className={styles.agreeToggle}
                      aria-expanded={Boolean(opened[item.id])}
                      onClick={() => setOpened((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                    >
                      {opened[item.id] ? '접기' : '보기'}
                    </button>
                  </div>
                  {opened[item.id] && <div className={styles.agreeContent}>{item.content}</div>}
                </div>
              ))}
            </div>
          </AuthBody>
          <AuthActions>
            <Button type="submit" variant="solid" color="primary" size="xl" disabled={!allChecked}>
              다음
            </Button>
            <AuthLinks lead="이미 계정이 있으신가요?">
              <AuthLink to="/pub/login">로그인</AuthLink>
            </AuthLinks>
          </AuthActions>
        </form>
      </AuthCard>
    </FrontLayout>
  );
}
