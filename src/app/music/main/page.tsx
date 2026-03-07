'use client';
// import './page.css';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getTracks } from '@/services/tracks/tracksApi';
import { useAppDispatch } from '@/store/store';
import { AxiosError } from 'axios';
import { setNameUser } from '@/store/features/userSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
        const dataFromLS = localStorage.getItem('userData');
        if (dataFromLS) {
          const parseData: string = JSON.parse(dataFromLS);
          dispatch(setNameUser(parseData));
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError('Неполадки с интернет-соединением');
          } else {
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setError('');
      });
  }, []);

  return <CenterBlock tracks={tracks} title={'Треки'} />;
}
