import { RootState } from "../../store";

export const selectMovieSlice = (state: RootState) => state.movies;

export const selectCurrentPage = (state: RootState) => selectMovieSlice(state).page

export const selectMovieEntities = (state: RootState) => selectMovieSlice(state).entities;

export const selectRequestStatus = (state: RootState) => selectMovieSlice(state).status;

export const selectTotalPages = (state: RootState) => selectMovieSlice(state).pages;