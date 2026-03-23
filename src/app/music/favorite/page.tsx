'use client';
// import './page.css';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
// import { useEffect, useState } from 'react';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { AxiosError } from 'axios';
// import { setNameUser } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';
import { cleanFilters } from '@/store/features/trackSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const dispatch = useAppDispatch();
  // const [tracks, setTracks] = useState<TrackType[]>([]);
  // const [error, setError] = useState('');
  const isAccessToken = useAppSelector((state) => state.user.access);
  const { fetchError, fetchIsLoading, favoriteTracks, allTracks } =
    useAppSelector((state) => state.tracks);
  useEffect(() => {
    // dispatch(cleanFilters());
    console.log(isAccessToken);
    if (!isAccessToken) {
      router.push('/');
    }
  }, [isAccessToken]);

  return (
    <CenterBlock
      tracks={favoriteTracks}
      playlist={allTracks}
      title={'Избранные треки'}
      errorRes={fetchError}
      isLoading={fetchIsLoading}
    />
  );
}
