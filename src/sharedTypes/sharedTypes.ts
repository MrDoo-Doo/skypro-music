export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: Array<string>;
  duration_in_seconds: number;
  album: string;
  logo: null;
  track_file: string;
  stared_user: Array<number>;
};
