'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { getTracks, getFavoriteTracks } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
} from '@/store/features/trackSlice';
import { withReAuth } from '@/utils/withReAuth';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks, favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка! Попробуйте позже...'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, []);

  useEffect(() => {
    if (favoriteTracks.length && access) {
      dispatch(setFavoriteTracks(favoriteTracks));
    } else if (access) {
      dispatch(setFetchIsLoading(true));
      withReAuth(
        (newToken) => getFavoriteTracks(newToken || access),
        access,
        refresh,
        dispatch,
      )
        .then((res) => {
          dispatch(setFavoriteTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка! Попробуйте позже...'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, []);

  return <></>;
}
