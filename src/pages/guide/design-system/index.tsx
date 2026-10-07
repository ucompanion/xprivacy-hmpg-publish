import { Navigate } from 'react-router-dom';

export default function GuideIndexRedirect() {
  return <Navigate to="/guide/design-system/overview" replace />;
}
