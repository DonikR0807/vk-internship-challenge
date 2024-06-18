import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectSeasonsSlice = (state: RootState) => state.seasons;

export const selectSeasons = (state: RootState) =>
  selectSeasonsSlice(state).entities.filter(({ number }) => number !== 0);

export const selectSeasonsStatus = (state: RootState) =>
  selectSeasonsSlice(state).status;

export const selectSortedSeasons = createSelector(
  (state: RootState) => selectSeasons(state),
  (seasons) =>
    [...seasons].sort((season1, season2) => {
      return season1.number - season2.number;
    })
);
