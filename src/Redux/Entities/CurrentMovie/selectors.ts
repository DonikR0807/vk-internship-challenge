import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectCurrentMovieSlice = (state: RootState) => state.currentMovie;

export const selectCurrentMovie = (state: RootState) =>
  selectCurrentMovieSlice(state).entity;

export const selectCurrentMovieStatus = (state: RootState) =>
  selectCurrentMovieSlice(state).status;

export const selectPersonsInMovie = (state: RootState) =>
  selectCurrentMovie(state)?.persons;

export const selectLinkedMovies = (state: RootState) => selectCurrentMovie(state)?.similarMovies;

export const selectActorsInMovie = createSelector(
  (state: RootState) => selectPersonsInMovie(state),
  (persons) => persons?.filter((person) => person.profession === "актеры" && (person.name || person.enName))
);

export const selectRating = (state: RootState) => selectCurrentMovie(state)?.rating;