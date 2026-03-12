import { refreshToken } from '@/services/auth/authApi';
import { setTokenAccess } from '@/store/features/userSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

export const withReAuth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  accessToken: string,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction(accessToken);
  } catch (error) {
    const axiosError = error as AxiosError;

    // Если ошибка 401, обновляем токен и повторяем запрос
    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshToken(refresh); // Обновляем токен
        dispatch(setTokenAccess(newAccessToken.access));
        // Повторяем исходный запрос
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        // Если обновление токена не удалось, пробрасываем ошибку
        throw refreshError;
      }
    }

    // Если ошибка не 401, пробрасываем её
    throw error;
  }
};
