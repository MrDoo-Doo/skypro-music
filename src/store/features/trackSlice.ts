import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isSnuffle: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  favoriteTracks: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isSnuffle: false,
  currentPlaylist: [],
  shuffledPlaylist: [],
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  favoriteTracks: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
      state.shuffledPlaylist = [...state.currentPlaylist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleSuffle: (state) => {
      state.isSnuffle = !state.isSnuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isSnuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const curIndex = playlist.findIndex(
        (e) => e._id === state.currentTrack?._id,
      );
      const lenPlaylist = playlist.length;
      const nextIndex = curIndex + 1;
      if (nextIndex < lenPlaylist) {
        state.currentTrack = playlist[nextIndex];
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isSnuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const curIndex = playlist.findIndex(
        (e) => e._id === state.currentTrack?._id,
      );
      const prevIndex = curIndex - 1;
      if (prevIndex >= 0) {
        state.currentTrack = playlist[prevIndex];
      }
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setPrevTrack,
  setCurrentPlaylist,
  setNextTrack,
  toggleSuffle,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
