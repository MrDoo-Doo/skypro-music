'use client';
import styles from './layout.module.css';
import { ReactNode } from 'react';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navigate from '@/components/Navigate/Navigate';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import Loading from './loading';
import { Suspense } from 'react';
import { useDataUserHook } from '@/hooks/useDataUserHook';

interface MusicLayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: MusicLayoutProps) {
  useDataUserHook();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Suspense fallback={<Loading />}>
            <FetchingTracks />
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
