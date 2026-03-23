import cn from 'classnames';
import styles from './centerblock.module.css';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import Track from '@/components/Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setPagePlaylist } from '@/store/features/trackSlice';
// import { data } from '@/data';

type DataTracks = {
  tracks: TrackType[];
  playlist: TrackType[];
  title: string;
  errorRes: null | string;
  isLoading: boolean;
};

export default function CenterBlock({
  tracks,
  playlist,
  title,
  errorRes,
  isLoading,
}: DataTracks) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!errorRes && !errorRes) {
      dispatch(setPagePlaylist(playlist));
    }
  }, [isLoading, errorRes]);
  // useEffect(() => {
  //   console.log(tracks);
  // }, [tracks]);
  // if (!tracks || !tracks.length) {
  //   return <div>Загрузка треков...</div>;
  // }
  // console.log(tracks);
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={playlist} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {errorRes ? (
            errorRes
          ) : isLoading ? (
            <div style={{ color: 'white', fontSize: '24px' }}>
              Загрузка треков...
            </div>
          ) : tracks.length ? (
            tracks.map((track) => (
              <Track track={track} key={track._id} playlist={tracks} />
            ))
          ) : (
            <div style={{ color: 'white', fontSize: '24px' }}>
              Не нашлось подходящих треков
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
