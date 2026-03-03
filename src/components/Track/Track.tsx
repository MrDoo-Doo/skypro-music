'use client';
import styles from './track.module.css';
import cn from 'classnames';
import { formatTime } from '@/utils/helpers';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentTrack,
  setIsPlay,
  setUrlIcon,
} from '@/store/features/trackSlice';

type trackTypeProp = {
  track: TrackType;
};

export default function Track({ track }: trackTypeProp) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const onClickTrack = () => {
    if (track._id === currentTrack?._id && isPlay) {
      dispatch(setCurrentTrack(track));
      dispatch(setIsPlay(false));
      dispatch(setUrlIcon('/img/icon/sprite.svg#icon-play'));
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setIsPlay(true));
      dispatch(setUrlIcon('/img/icon/sprite.svg#icon-pause'));
    }
  };

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg
              className={cn(styles.track__titleSvg, {
                [styles.note__none]: currentTrack?._id === track._id,
              })}
            >
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
            <div
              className={cn(
                styles.track__pointStatus,
                {
                  [styles.active__pointStatus]: currentTrack?._id === track._id,
                },
                {
                  [styles.playing_dot]: isPlay,
                },
              )}
            >
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </div>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useAppDispatch } from '@/store/store';
// import { setCurrentTrack } from '@/store/features/trackSlice';

// const Track = () => {
//   const dispatch = useAppDispatch();
//   return (
//     <div
//       className={styles.playlist__item}
//       onClick={() => dispatch(setCurrentTrack(track))}
//     >
//       <div className={styles.playlist__track}></div>
//     </div>
//   );
// };

// export default Track;
