import { useNavigate } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import { Button } from '../../../components/core/Button/Button';
import { AuthActions, AuthAlert, AuthBody, AuthCard, AuthLink, AuthLinks, AuthNote } from './components/Auth';

/**
 * 탈퇴 완료 (초안 · 시안 없음 → 비밀번호 재설정 완료 화면 구성을 따름)
 * 구성: 완료 안내(완료 톤) → 데이터 삭제 안내 → 홈으로 가기 · 다시 가입하기
 */
export default function PubLoginWithdrawComplete() {
  const navigate = useNavigate();

  return (
    <FrontLayout>
      <AuthCard title="탈퇴가 완료되었습니다">
        <AuthBody>
          <AuthAlert tone="success">그동안 xPrivacy를 이용해 주셔서 감사합니다.</AuthAlert>
          <AuthNote>처리 내역과 업로드한 파일은 30일 이내에 영구 삭제됩니다. 같은 이메일로 언제든 다시 가입할 수 있습니다.</AuthNote>
        </AuthBody>
        <AuthActions>
          <Button variant="solid" color="primary" size="xl" onClick={() => void navigate('/pub/main')}>
            홈으로 가기
          </Button>
          <AuthLinks lead="다시 이용하시겠어요?">
            <AuthLink to="/pub/login/terms">다시 가입하기</AuthLink>
          </AuthLinks>
        </AuthActions>
      </AuthCard>
    </FrontLayout>
  );
}
