import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  urlIcon: string;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  urlIcon: '/img/icon/sprite.svg#icon-pause',
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setUrlIcon: (state, action: PayloadAction<string>) => {
      state.urlIcon = action.payload;
    },
  },
});

export const { setCurrentTrack, setIsPlay, setUrlIcon } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
