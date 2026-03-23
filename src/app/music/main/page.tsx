'use client';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { cleanFilters } from '@/store/features/trackSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    fetchError,
    fetchIsLoading,
    allTracks,
    filteredTracks,
    filters,
    search,
  } = useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  useEffect(() => {
    dispatch(cleanFilters());
  }, []);

  useEffect(() => {
    const currentPlaylist =
      filters.author.length || filters.genres.length || search.length
        ? filteredTracks
        : allTracks;
    setTimeout(() => {
      setPlaylist(currentPlaylist);
    }, 0);
  }, [allTracks, filteredTracks]);

  return (
    <CenterBlock
      tracks={playlist}
      playlist={allTracks}
      title={'Треки'}
      errorRes={fetchError}
      isLoading={fetchIsLoading}
    />
  );
}
