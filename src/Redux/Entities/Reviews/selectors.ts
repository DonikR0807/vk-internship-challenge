import { RootState } from "../../store";

export const selectReviewsSlice = (state: RootState) => state.reviews

export const selectReviews = (state: RootState) => selectReviewsSlice(state).entities;

export const selectReviewsStatus = (state: RootState) => selectReviewsSlice(state).status;

export const selectReviewsPage = (state: RootState) => selectReviewsSlice(state).page;

export const selectReviewsPages = (state: RootState) => selectReviewsSlice(state).pages;