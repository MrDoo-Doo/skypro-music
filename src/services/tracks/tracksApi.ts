import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

type selectionResponse = {
  items: [];
  name: string;
};

type selectionResponseData = {
  data: selectionResponse;
};

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    // return res.data;
    return res.data.data;
  });
};

// export const getSelectionTracks = (id: string): Promise<[]> => {
//   return axios(BASE_URL + `/catalog/selection/${id}/`).then((res) => {
//     console.log(res.data.data);
//     return res.data.data.items;
//   });
// };
export const getSelectionTracks = (
  id: string,
): Promise<selectionResponseData> => {
  return axios(BASE_URL + `/catalog/selection/${id}/`).then((res) => {
    return res.data;
    // return res.data.data;
  });
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getFavoriteTracks = (access: string): Promise<[]> => {
  return axios
    .get(BASE_URL + `/catalog/track/favorite/all/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => {
      return res.data.data;
    });
};

export const addFavoriteTrack = (access: string, id: number): Promise<[]> => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

// export const addFavoriteTrack = async (access: string, id: number) => {
//   try {
//     const res = await axios.post(
//       BASE_URL + `/catalog/track/${id}/favorite/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       },
//     );
//     return res.data;
//   } catch (error) {
//     console.error('Ошибка при добавлении трека в избранное: ', error);
//     throw error;
//   }
// };

export const deleteFavoriteTrack = (
  access: string,
  id: number,
): Promise<[]> => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};
