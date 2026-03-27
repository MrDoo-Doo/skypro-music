import styles from './filterItem.module.css';
// import { data } from '@/data';
import { getUniqueValuesByKey } from '@/utils/helpers';
import cn from 'classnames';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';

type Sort = {
  filter: keyof TrackType;
  display: string;
  tracks: TrackType[];
  onSelect: (value: string) => void;
};
const year: string[] = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

export default function FilterItem({
  display,
  filter,
  tracks,
  onSelect,
}: Sort) {
  const { filters } = useAppSelector((state) => state.tracks);
  return (
    <div
      className={cn(styles.filter__box, {
        [styles.active__box]: display == filter,
      })}
    >
      {filter == 'release_date' ? (
        <div className={styles.filter__list}>
          <p
            onClick={() => {
              onSelect(year[0]);
            }}
            className={cn(styles.filter__p, {
              [styles.active]: filters.year === year[0],
            })}
          >
            {year[0]}
          </p>
          <p
            onClick={() => {
              onSelect(year[1]);
            }}
            className={cn(styles.filter__p, {
              [styles.active]: filters.year === year[1],
            })}
          >
            {year[1]}
          </p>
          <p
            onClick={() => {
              onSelect(year[2]);
            }}
            className={cn(styles.filter__p, {
              [styles.active]: filters.year === year[2],
            })}
          >
            {year[2]}
          </p>
        </div>
      ) : filter == 'author' ? (
        <div className={styles.filter__list}>
          {getUniqueValuesByKey(tracks, filter).map((a, index) => (
            <p
              key={index}
              onClick={() => {
                onSelect(a);
              }}
              className={cn(styles.filter__p, {
                [styles.active]: filters.author.includes(a),
              })}
            >
              {a}
            </p>
          ))}
        </div>
      ) : (
        <div className={styles.filter__list}>
          {getUniqueValuesByKey(tracks, filter).map((g, index) => (
            <p
              key={index}
              onClick={() => {
                onSelect(g);
              }}
              className={cn(styles.filter__p, {
                [styles.active]: filters.genres.includes(g),
              })}
            >
              {g}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
