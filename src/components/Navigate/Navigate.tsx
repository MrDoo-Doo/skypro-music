'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigate.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { clearUserData } from '@/store/features/userSlice';

export default function Navigate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAccessToken = useAppSelector((state) => state.user.access);
  const [statusMenu, setStatusMenu] = useState('close');
  const [isAuth, setIsAuth] = useState(false);

  const handleClickMenu = () => {
    if (statusMenu === 'open') {
      setStatusMenu('close');
    } else {
      setStatusMenu('open');
    }
  };

  const reloadMain = () => {
    router.push('/');
  };

  const logout = () => {
    dispatch(clearUserData());
    router.push('/auth/signin');
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isAccessToken) {
        setIsAuth(false);
        return;
      } else {
        setIsAuth(true);
      }
    }, 0);
  }, [isAccessToken]);

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo} onClick={reloadMain}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger} onClick={() => handleClickMenu()}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div
        className={cn(styles.nav__menu, {
          [styles.active_menu]: statusMenu === 'open',
        })}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href={'/music/main'} className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={isAuth ? styles.menu__item : styles.hide}>
            <Link href={'/music/favorite'} className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item}>
            <p className={styles.menu__link} onClick={logout}>
              {isAuth ? 'Выйти' : 'Войти'}
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}
