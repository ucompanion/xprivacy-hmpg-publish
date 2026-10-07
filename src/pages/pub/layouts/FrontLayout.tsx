import { Header } from '../../../components/domain/Header/Header';
import { Footer } from '../../../components/domain/Footer/Footer';
import styles from './FrontLayout.module.scss';

const FrontLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default FrontLayout;
