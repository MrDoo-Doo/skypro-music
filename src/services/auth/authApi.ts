import axios from 'axios';
import { BASE_URL } from '../constants';
import { AxiosResponse } from 'axios';

type regUserProps = {
  email: string;
  password: string;
  username: string;
};

type authUserProps = Pick<regUserProps, 'email' | 'password'>;

type userReturns = {
  email: string;
  username: string;
  _id: number;
};

export const authUser = (
  data: authUserProps,
): Promise<AxiosResponse<userReturns>> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const regUser = (data: regUserProps): Promise<userReturns> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokenType = accessTokenType & refreshTokenType;

export const getToken = (
  data: authUserProps,
): Promise<AxiosResponse<tokenType>> => {
  return axios.post(BASE_URL + '/user/token/', data).then((res) => res);
};

export const refreshToken = (refresh: string): Promise<accessTokenType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh/', {
      refresh,
    })
    .then((res) => res.data);
};
