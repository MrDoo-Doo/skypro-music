import './page.css';
import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navigate from '@/components/Navigate/Navigate';
import CenterBlock from '@/components/CenterBlock/CenterBlock';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigate />
          <CenterBlock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
