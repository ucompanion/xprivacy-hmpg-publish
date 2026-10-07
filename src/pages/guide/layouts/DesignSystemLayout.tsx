import { useLocation, Link } from 'react-router-dom';
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
      { label: 'Section', path: '/guide/design-system/section' },
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

      <main className="guide-content content_inner">
        {children}
      </main>
    </GuideLayout>
  );
}
