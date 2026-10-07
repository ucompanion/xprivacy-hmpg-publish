import { Link, useNavigate, useLocation } from 'react-router-dom';
import './GuideLayout.scss';

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/guide/dashboard' || location.pathname === '/guide/dashboard/';

  return (
    <div className="guide-system">
      {/* Global Header */}
      <header className="guide-header">
        <div className="header-inner">
          <div className="logo" onClick={() => navigate('/guide/dashboard')}>
            <strong>xPrivacy</strong>
          </div>
          <nav className="header-nav">
            <Link 
              to="/guide/design-system/overview" 
              className={!isDashboard ? 'active' : ''}
            >
              Design System
            </Link>
            <Link 
              to="/guide/dashboard" 
              className={isDashboard ? 'active' : ''}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <div className="guide-body">
        {children}
      </div>
    </div>
  );
}
