import { RootState } from "../../store";

export const selectPostersSlice = (state: RootState) => state.posters;

export const selectPosterStatus = (state: RootState) => selectPostersSlice(state).status;

export const selectPosters = (state: RootState) => selectPostersSlice(state).entities;