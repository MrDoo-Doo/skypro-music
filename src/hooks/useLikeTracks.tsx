import {
  addLike,
  removeLike,
  addFavoriteTrack,
  deleteFavoriteTrack,
} from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReAuth } from '@/utils/withReAuth';
import { AxiosError } from 'axios';
import { useState } from 'react';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!access) {
      return setErrorMsg('Нет авторизации');
    }

    const actionApiLike = isLike ? removeLike : addLike;
    const actionApiFavTrack = isLike ? deleteFavoriteTrack : addFavoriteTrack;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);
    if (track) {
      withReAuth(
        (newToken) => actionApiFavTrack(newToken || access, track._id),
        access,
        refresh,
        dispatch,
      )
        .then(() => {
          actionApiLike(access, track._id);
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMsg(error.response.data.message);
            } else if (error.request) {
              setErrorMsg('Произошла ошибка. Попробуйте позже');
            } else {
              setErrorMsg('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
      //   withReAuth(
      //     (newToken) => actionApiLike(newToken || access, track._id),
      //     access,
      //     refresh,
      //     dispatch,
      //   )
      //     .then()
      //     .catch((error) => {
      //       if (error instanceof AxiosError) {
      //         if (error.response) {
      //           setErrorMsg(error.response.data.message);
      //         } else if (error.request) {
      //           setErrorMsg('Произошла ошибка. Попробуйте позже');
      //         } else {
      //           setErrorMsg('Неизвестная ошибка');
      //         }
      //       }
      //     })
      //     .finally(() => {
      //       setIsLoading(false);
      //     });
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
