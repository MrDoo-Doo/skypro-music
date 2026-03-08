'use client';
import { useParams } from 'next/navigation';
import { getSelectionTracks, getTracks } from '@/services/tracks/tracksApi';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import CenterBlock from '@/components/CenterBlock/CenterBlock';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [tracksID, setTracksID] = useState<number[]>([]);
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState('');

  const getSelectionTracksFun = () => {
    getSelectionTracks(params.id)
      .then((res) => {
        setPlaylistName(res.name);
        setTracksID(res.items);
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
  };

  const getTracksFun = () => {
    getTracks()
      .then((res) => {
        const filteredTracks = res.filter((track) =>
          tracksID.includes(track._id),
        );
        setTracks(filteredTracks);
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
  };

  useEffect(() => {
    getSelectionTracksFun();
  }, []);

  useEffect(() => {
    if (tracksID.length > 0) {
      getTracksFun();
    }
  }, [tracksID]);

  return (
    <>
      <CenterBlock tracks={tracks} title={playlistName} />
      <h1>{error}</h1>
    </>
  );
}
