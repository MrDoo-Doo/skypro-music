import styles from './filterItem.module.css';
import { data } from '@/data';
import { getUniqueValuesByKey } from '@/utils/helpers';
import cn from 'classnames';
import { TrackType } from '@/sharedTypes/sharedTypes';

type Sort = {
  filter: keyof TrackType;
  display: string;
};

export default function FilterItem({ display, filter }: Sort) {
  if (display == filter) {
    console.log(display, filter);
  }
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
      ) : (
        <div className={styles.filter__list}>
          {getUniqueValuesByKey(data, filter).map((a, index) => (
            <p key={index} className={styles.filter__p}>
              {a}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
