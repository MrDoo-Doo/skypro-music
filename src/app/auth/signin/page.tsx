'use client';

import Image from 'next/image';
import { authUser } from '@/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { AxiosError } from 'axios';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      return setErrorMessage('Заполните все поля');
    }
    setLoading(true);

    authUser({ email, password })
      .then((res) => {
        console.log(res);
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage('Неполадки с интернет-соединением');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <Image
            className={styles.modal__logo}
            src="/img/logo_modal.png"
            alt="logo"
            width={140}
            height={21}
          />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={loading}
        onClick={onSubmit}
        className={cn(styles.modal__btnEnter, {
          [styles.notclick]: loading === true,
        })}
      >
        Войти
      </button>
      <Link
        href={'/auth/signup'}
        className={cn(styles.modal__btnSignup, {
          [styles.notclicks]: loading === true,
        })}
      >
        Зарегистрироваться
      </Link>
    </>
  );
}
