import React from 'react';
import { DemoHeader } from '../../../components/domain/Header/DemoHeader';
import styles from './DemoLayout.module.scss';

interface DemoLayoutProps {
  children: React.ReactNode;
}

/**
 * 데모 전용 레이아웃 (DemoLayout)
 * - 상단 데모 전용 GNB(DemoHeader, height: 68px, 시안 1254:22037 매핑)
 * - 하단 Footer 배제 (전체 뷰포트 기반 워크스페이스 레이아웃)
 * - 100svh 전폭 뷰포트 내 좌측 메인 작업 영역 + 우측 패널 연동 구조
 */
const DemoLayout: React.FC<DemoLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <DemoHeader />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default DemoLayout;
