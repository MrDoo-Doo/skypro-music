'use client';
import { useEffect, useState } from 'react';
import styles from './search.module.css';
import { useAppDispatch } from '@/store/store';
import { searchTrack } from '@/store/features/trackSlice';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();
  const onSearchInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    dispatch(searchTrack(searchInput));
  }, [searchInput]);

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
