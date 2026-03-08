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
