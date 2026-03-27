import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType) => {
  let selectPlaylist = state.pagePlaylist;
  if (state.filters.year !== 'По умолчанию') {
    const sortedPlaylist = [...selectPlaylist].sort((a, b) => {
      const start = new Date(a.release_date).getTime();
      const finish = new Date(b.release_date).getTime();
      return state.filters.year == 'Сначала новые'
        ? finish - start
        : start - finish;
    });
    selectPlaylist = sortedPlaylist;
  }
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
