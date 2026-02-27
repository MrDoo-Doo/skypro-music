'use client';
import styles from './filter.module.css';
import cn from 'classnames';
import FilterItem from '@/components/FilterItem/FilterItem';
import { useState } from 'react';
// import { MouseEventHandler } from 'react';

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState('');
  const handleClick = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter('');
    } else {
      setActiveFilter(filterName);
    }
  };
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div
        onClick={() => handleClick('author')}
        className={cn(styles.filter__button, {
          [styles.active]: activeFilter === 'author',
        })}
      >
        исполнителю
        <div onClick={(e) => e.stopPropagation()}>
          <FilterItem display={activeFilter} filter="author" />
        </div>
      </div>
      <div
        onClick={() => handleClick('release_date')}
        className={cn(styles.filter__button, {
          [styles.active]: activeFilter === 'release_date',
        })}
      >
        году выпуска
        <div onClick={(e) => e.stopPropagation()}>
          <FilterItem display={activeFilter} filter="release_date" />
        </div>
      </div>
      <div
        onClick={() => handleClick('genre')}
        className={cn(styles.filter__button, {
          [styles.active]: activeFilter === 'genre',
        })}
      >
        жанру
        <div onClick={(e) => e.stopPropagation()}>
          <FilterItem display={activeFilter} filter="genre" />
        </div>
      </div>
    </div>
  );
}
