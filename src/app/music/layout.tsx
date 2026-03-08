import styles from './layout.module.css';
import { ReactNode } from 'react';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navigate from '@/components/Navigate/Navigate';
import Loading from './loading';
import { Suspense } from 'react';

interface MusicLayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: MusicLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Suspense fallback={<Loading />}>
            <Navigate />
            {children}
            <Sidebar />
          </Suspense>
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
