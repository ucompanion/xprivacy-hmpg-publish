
interface LayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LayoutProps) {
  return (
    <div className="layout-login-wrapper">
      {/* 
        로그인/회원가입 등 단독 레이아웃
      */}
      <main className="login-content">
        {/* 실제 폼이나 박스가 이 안에 렌더링 */}
        {children}
      </main>
    </div>
  );
}
