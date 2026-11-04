import FrontLayout from '../layouts/FrontLayout';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthAlert, AuthBody, AuthCard, AuthLink, AuthLinks } from './components/Auth';
import styles from './login.module.scss';

/**
 * 회원가입 3단계 · 인증 메일 발송
 * Figma PC 2966:5697 · MO 2967:4057
 */
export default function PubLoginSignupComplete() {
  return (
    <FrontLayout>
      <AuthCard step={3} title="인증 메일을 보냈습니다">
        <AuthBody>
          <p className={styles.mailText}>user@xprivacy.io로 보낸 메일의 링크를 눌러 가입을 완료하세요.</p>
          <AuthAlert tone="info">메일이 오지 않으면 스팸함을 확인하거나 아래 버튼으로 다시 받으세요.</AuthAlert>
        </AuthBody>
        <AuthActions>
          <Button variant="subtle" size="xl">
            인증 메일 다시 보내기
          </Button>
          <AuthLinks lead="이메일을 잘못 입력했나요?">
            <AuthLink to="/pub/login/terms">다시 가입하기</AuthLink>
          </AuthLinks>
        </AuthActions>
      </AuthCard>
    </FrontLayout>
  );
}
