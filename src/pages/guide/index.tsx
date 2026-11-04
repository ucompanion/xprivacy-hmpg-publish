import { Navigate } from 'react-router-dom';

/**
 * /guide 진입 시 대시보드(/guide/dashboard)로 자동 리다이렉트
 */
export default function GuideIndex() {
  return <Navigate to="/guide/dashboard" replace />;
}
