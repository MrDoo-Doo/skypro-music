'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/store';

export default function Sidebar() {
  // JSON.parse(
  // const getDataFromLS = () => {
  // setDataFromLS(localStorage.getItem('userData'));
  // let parseDataFromLS = 'Anonim';
  // console.log(parseData);
  const userName = useAppSelector((state) => state.user.username);

  // const [parseData, setParseData] = useState<string>("");
  // // };
  //   const dataFromLS = localStorage.getItem('userData');
  //    if (dataFromLS) {
  //   const parseDataFromLS = JSON.parse(dataFromLS);
  //   setParseData(parseDataFromLS);
  // }
  useEffect(() => {
    console.log(userName);
  }, []);
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{userName}</p>
        <div className={styles.sidebar__icon}>
          <svg className={styles.sidebar__iconSvg}>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
                className={styles.sidebar__img}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
