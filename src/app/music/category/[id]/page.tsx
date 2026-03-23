// 'use client';
// import { useParams } from 'next/navigation';
// import { getSelectionTracks, getTracks } from '@/services/tracks/tracksApi';
// import { useEffect, useState } from 'react';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';
// import CenterBlock from '@/components/CenterBlock/CenterBlock';

'use client';
import { useParams } from 'next/navigation';
import { getSelectionTracks } from '@/services/tracks/tracksApi';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { cleanFilters } from '@/store/features/trackSlice';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    fetchIsLoading,
    allTracks,
    fetchError,
    filteredTracks,
    filters,
    search,
  } = useAppSelector((state) => state.tracks);
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState('');
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  const id = params.id;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      dispatch(cleanFilters());
      if (!fetchIsLoading && allTracks.length) {
        getSelectionTracks(id)
          .then((res) => {
            setPlaylistName(res.data.name);
            const tracksID: number[] = res.data.items;
            const selectedTracks = allTracks.filter((el) =>
              tracksID.includes(el._id),
            );
            setPlaylist(selectedTracks);
          })
          .catch((error) => {
            if (error instanceof AxiosError) {
              if (error.response) {
                setErrorRes(error.response.data);
              } else if (error.request) {
                setErrorRes('Неполадки с интернет-соединением');
              } else {
                setErrorRes('Неизвестная ошибка');
              }
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 0);
  }, [fetchIsLoading]);

  useEffect(() => {
    if (playlist) {
      const currentPlaylist =
        filters.author.length || filters.genres.length || search.length
          ? filteredTracks
          : playlist;
      setTimeout(() => {
        setTracks(currentPlaylist);
      });
    }
  }, [filteredTracks, playlist]);

  return (
    <>
      <CenterBlock
        tracks={tracks}
        playlist={playlist}
        title={playlistName}
        errorRes={errorRes || fetchError}
        isLoading={isLoading}
      />
    </>
  );
}
