import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType) => {
  let selectPlaylist = state.pagePlaylist;
  if (state.filters.genres.length) {
    selectPlaylist = selectPlaylist.filter((track) => {
      return state.filters.genres.some((el) => track.genre.includes(el));
    });
  }
  if (state.filters.author.length) {
    selectPlaylist = selectPlaylist.filter((track) => {
      return state.filters.author.includes(track.author);
    });
  }
  if (state.search.length) {
    selectPlaylist = selectPlaylist.filter((track) => {
      return track.name.toUpperCase().includes(state.search.toUpperCase());
    });
  }
  return selectPlaylist;
};
