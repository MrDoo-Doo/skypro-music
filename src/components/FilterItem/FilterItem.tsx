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

export default function FilterItem({
  display,
  filter,
  tracks,
  onSelect,
}: Sort) {
  const { fetchIsLoading, allTracks, filters } = useAppSelector(
    (state) => state.tracks,
  );
  return (
    <div
      className={cn(styles.filter__box, {
        [styles.active__box]: display == filter,
      })}
    >
      {filter == 'release_date' ? (
        <div className={styles.filter__list}>
          <p className={cn(styles.filter__p, styles.active)}>По умолчанию</p>
          <p className={styles.filter__p}>Сначала новые</p>
          <p className={styles.filter__p}>Сначала старые</p>
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
