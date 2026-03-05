import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

type selectionResponse = {
  items: [];
  name: string;
};

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

// export const getSelectionTracks = (id: string): Promise<[]> => {
//   return axios(BASE_URL + `/catalog/selection/${id}/`).then((res) => {
//     console.log(res.data.data);
//     return res.data.data.items;
//   });
// };
export const getSelectionTracks = (id: string): Promise<selectionResponse> => {
  return axios(BASE_URL + `/catalog/selection/${id}/`).then((res) => {
    return res.data.data;
  });
};
