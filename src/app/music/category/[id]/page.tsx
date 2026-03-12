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
import { useAppSelector } from '@/store/store';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const { fetchIsLoading, allTracks, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState('');
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const id = params.id;

  useEffect(() => {
    setIsLoading(true);
    if (!fetchIsLoading && allTracks.length) {
      getSelectionTracks(id)
        .then((res) => {
          setPlaylistName(res.data.name);
          const tracksID: number[] = res.data.items;
          const filteredTracks = allTracks.filter((el) =>
            tracksID.includes(el._id),
          );
          setTracks(filteredTracks);
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
  }, [fetchIsLoading]);

  // const getSelectionTracksFun = () => {
  //   setIsLoading(true);
  //   if (!fetchIsLoading && allTracks.length) {
  //     getSelectionTracks(id)
  //       .then((res) => {
  //         setPlaylistName(res.data.name);
  //         const tracksID: number[] = res.data.items;
  //         const filteredTracks = allTracks.filter((el) =>
  //           tracksID.includes(el._id),
  //         );
  //         setTracks(filteredTracks);
  //       })
  //       .catch((error) => {
  //         if (error instanceof AxiosError) {
  //           if (error.response) {
  //             setErrorRes(error.response.data);
  //           } else if (error.request) {
  //             setErrorRes('Неполадки с интернет-соединением');
  //           } else {
  //             setErrorRes('Неизвестная ошибка');
  //           }
  //         }
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }

  // useEffect(() => {
  //   getSelectionTracksFun();
  // }, []);
  // const params = useParams<{ id: string }>();
  // const [tracks, setTracks] = useState<TrackType[]>([]);
  // const [tracksID, setTracksID] = useState<number[]>([]);
  // const [playlistName, setPlaylistName] = useState('');
  // const [error, setError] = useState('');

  // const getSelectionTracksFun = () => {
  //   getSelectionTracks(params.id)
  //     .then((res) => {
  //       setPlaylistName(res.name);
  //       setTracksID(res.items);
  //     })
  //     .catch((error) => {
  //       if (error instanceof AxiosError) {
  //         if (error.response) {
  //           setError(error.response.data);
  //         } else if (error.request) {
  //           setError('Неполадки с интернет-соединением');
  //         } else {
  //           setError('Неизвестная ошибка');
  //         }
  //       }
  //     })
  //     .finally(() => {
  //       setError('');
  //     });
  // };

  // const getTracksFun = () => {
  //   getTracks()
  //     .then((res) => {
  //       const filteredTracks = res.filter((track) =>
  //         tracksID.includes(track._id),
  //       );
  //       setTracks(filteredTracks);
  //     })
  //     .catch((error) => {
  //       if (error instanceof AxiosError) {
  //         if (error.response) {
  //           setError(error.response.data);
  //         } else if (error.request) {
  //           setError('Неполадки с интернет-соединением');
  //         } else {
  //           setError('Неизвестная ошибка');
  //         }
  //       }
  //     })
  //     .finally(() => {
  //       setError('');
  //     });
  // };

  // useEffect(() => {
  //   getSelectionTracksFun();
  // }, []);

  // useEffect(() => {
  //   if (tracksID.length > 0) {
  //     getTracksFun();
  //   }
  // }, [tracksID]);

  return (
    <>
      <CenterBlock
        tracks={tracks}
        errorRes={errorRes || fetchError}
        isLoading={isLoading}
        title={playlistName}
      />
    </>
  );
}
