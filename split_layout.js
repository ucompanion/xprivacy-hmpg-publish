const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();
const layoutsDir = path.join(baseDir, 'src/pages/guide/layouts');
const guideLayoutFile = path.join(layoutsDir, 'GuideLayout.tsx');
const dsLayoutFile = path.join(layoutsDir, 'DesignSystemLayout.tsx');
const dsDir = path.join(baseDir, 'src/pages/guide/design-system');

// 1. Rewrite GuideLayout.tsx
const guideLayoutContent = `import { Link, useNavigate, useLocation } from 'react-router-dom';
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
        <main className="guide-content dashboard_inner">
          {children}
        </main>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(guideLayoutFile, guideLayoutContent);

// 2. Create DesignSystemLayout.tsx
const dsLayoutContent = `import { useLocation, Link } from 'react-router-dom';
import GuideLayout from './GuideLayout';

export const GUIDE_MENU = [
  {
    category: 'Overview',
    items: [
      { label: 'Introduction', path: '/guide/design-system/overview' },
    ]
  },
  {
    category: 'Foundation',
    items: [
      { label: 'Colors', path: '/guide/design-system/colors' },
      { label: 'Typography', path: '/guide/design-system/typography' },
      { label: 'Elevator', path: '/guide/design-system/elevator' },
      { label: 'Utilities', path: '/guide/design-system/utilities' },
    ]
  },
  {
    category: 'Components',
    items: [
      { label: 'Accordion', path: '/guide/design-system/accordion' },
      { label: 'Badge', path: '/guide/design-system/badge' },
      { label: 'Button', path: '/guide/design-system/button' },
      { label: 'Form', path: '/guide/design-system/form' },
      { label: 'Icon', path: '/guide/design-system/icon' },
      { label: 'Modal', path: '/guide/design-system/modal' },
      { label: 'Tabs', path: '/guide/design-system/tabs' },
    ]
  }
];

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <GuideLayout>
      <aside className="guide-sidebar">
        <nav className="sidebar-menu">
          {GUIDE_MENU.map((menu) => (
            <div key={menu.category} className="menu-category">
              <h4>{menu.category}</h4>
              <ul>
                {menu.items.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="content_inner" style={{ flex: 1, padding: '40px' }}>
        {children}
      </div>
    </GuideLayout>
  );
}
`;
fs.writeFileSync(dsLayoutFile, dsLayoutContent);

// 3. Update all index.tsx in guide/design-system/**
function updateImports(dirPath) {
  const items = fs.readdirSync(dirPath);
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      updateImports(itemPath);
    } else if (itemPath.endsWith('.tsx')) {
      let content = fs.readFileSync(itemPath, 'utf8');
      content = content.replace(/import GuideLayout from '\.\.\/layouts\/GuideLayout';/g, "import DesignSystemLayout from '../../layouts/DesignSystemLayout';");
      content = content.replace(/import GuideLayout from '\.\.\/\.\.\/layouts\/GuideLayout';/g, "import DesignSystemLayout from '../../layouts/DesignSystemLayout';");
      content = content.replace(/<GuideLayout>/g, "<DesignSystemLayout>");
      content = content.replace(/<\/GuideLayout>/g, "</DesignSystemLayout>");
      fs.writeFileSync(itemPath, content);
    }
  });
}
updateImports(dsDir);
console.log('Split GuideLayout and DesignSystemLayout successfully');
