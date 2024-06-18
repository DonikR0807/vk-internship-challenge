import { RootState } from "../../store";

export const selectSearchedMoviesSlice = (state: RootState) => state.searchedMovies;

export const selectSearchedMoviesEntities = (state: RootState) => selectSearchedMoviesSlice(state).entities;

export const selectSearchedMoviesStatus = (state: RootState) => selectSearchedMoviesSlice(state).status;