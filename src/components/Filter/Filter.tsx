'use client';
import styles from './filter.module.css';
import cn from 'classnames';
import FilterItem from '@/components/FilterItem/FilterItem';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import {
  setFilterAuthor,
  setFilterGenre,
  setFilterYear,
} from '@/store/features/trackSlice';
// import { MouseEventHandler } from 'react';

type DataTracks = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: DataTracks) {
  const dispatch = useAppDispatch();
  const [activeFilter, setActiveFilter] = useState('');
  const handleClick = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter('');
    } else {
      setActiveFilter(filterName);
    }
  };

  const selectYear = (year: string) => {
    dispatch(setFilterYear(year));
  };
  const selectAuthor = (author: string) => {
    dispatch(setFilterAuthor(author));
  };
  const selectGenre = (genre: string) => {
    dispatch(setFilterGenre(genre));
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
          <FilterItem
            tracks={tracks}
            display={activeFilter}
            filter="author"
            onSelect={selectAuthor}
          />
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
          <FilterItem
            tracks={tracks}
            display={activeFilter}
            filter="release_date"
            onSelect={selectYear}
          />
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
          <FilterItem
            tracks={tracks}
            display={activeFilter}
            filter="genre"
            onSelect={selectGenre}
          />
        </div>
      </div>
    </div>
  );
}
