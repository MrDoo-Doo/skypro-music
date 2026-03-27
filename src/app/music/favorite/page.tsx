'use client';
// import './page.css';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { AxiosError } from 'axios';
// import { setNameUser } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';
import { cleanFilters, setPagePlaylist } from '@/store/features/trackSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAccessToken = useAppSelector((state) => state.user.access);
  const {
    fetchError,
    fetchIsLoading,
    favoriteTracks,
    filteredTracks,
    filters,
    search,
  } = useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  useEffect(() => {
    dispatch(cleanFilters());
    if (!isAccessToken) {
      router.push('/');
    }
  }, [isAccessToken]);

  useEffect(() => {
    const currentPlaylist =
      filters.author.length ||
      filters.genres.length ||
      search.length ||
      filters.year !== 'По умолчанию'
        ? filteredTracks
        : favoriteTracks;
    setTimeout(() => {
      setPlaylist(currentPlaylist);
      // dispatch(setPagePlaylist(favoriteTracks));
    }, 0);
  }, [favoriteTracks, filteredTracks]);

  return (
    <CenterBlock
      tracks={playlist}
      playlist={favoriteTracks}
      title={'Избранные треки'}
      errorRes={fetchError}
      isLoading={fetchIsLoading}
    />
  );
}
