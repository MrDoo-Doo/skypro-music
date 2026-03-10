import { useAppDispatch } from '@/store/store';
import {
  setNameUser,
  setTokenAccess,
  setTokenRefresh,
} from '@/store/features/userSlice';
import { useEffect } from 'react';

export const useDataUserHook = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorage.getItem('userName') || '';
    const access = localStorage.getItem('tokenAccess') || '';
    const refresh = localStorage.getItem('tokenRefresh') || '';
    console.log(username);

    dispatch(setNameUser(username));
    dispatch(setTokenAccess(access));
    dispatch(setTokenRefresh(refresh));
  }, [dispatch]);
};
