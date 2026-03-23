import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { applyFilters } from '@/utils/applyFilters';

export type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isSnuffle: boolean;
  currentPlaylist: TrackType[];
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  favoriteTracks: TrackType[];
  filteredTracks: TrackType[];
  filters: {
    author: string[];
    genres: string[];
    year: string;
  };
  pagePlaylist: TrackType[];
  search: string;
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
  filteredTracks: [],
  filters: {
    author: [],
    genres: [],
    year: 'По умолчанию',
  },
  pagePlaylist: [],
  search: '',
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
    searchTrack: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setPagePlaylist: (state, action) => {
      state.pagePlaylist = action.payload;
    },
    setFilterAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.author.includes(author)) {
        state.filters.author = state.filters.author.filter((el) => {
          return el !== author;
        });
      } else {
        state.filters.author = [...state.filters.author, author];
      }

      state.filteredTracks = applyFilters(state);
    },
    setFilterGenre: (state, action: PayloadAction<string>) => {
      const genres = action.payload;
      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => {
          return el !== genres;
        });
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      }

      state.filteredTracks = applyFilters(state);
    },
    cleanFilters: (state) => {
      state.filteredTracks = [];
      state.filters.author = [];
      state.filters.genres = [];
      state.filters.year = 'По умолчанию';
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
  setFilterAuthor,
  setPagePlaylist,
  setFilterGenre,
  cleanFilters,
  searchTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
