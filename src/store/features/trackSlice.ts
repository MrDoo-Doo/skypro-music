import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isSnuffle: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isSnuffle: false,
  currentPlaylist: [],
  shuffledPlaylist: [],
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
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setPrevTrack,
  setCurrentPlaylist,
  setNextTrack,
  toggleSuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
