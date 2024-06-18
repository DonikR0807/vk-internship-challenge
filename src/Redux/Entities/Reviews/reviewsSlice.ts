import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES, RequestStatusesType } from "../../../utils/constants/requestStatuses";
import { loadReviewsPage } from "./thunks/loadReviewsPage";

export interface Review {
    id: number,
    review: string,
    date: string,
    title: string,
    author: string,
    type: "Позитивный" | "Негативный" | "Нейтральный",
}

export interface ReviewsState {
    entities: Review[],
    status: RequestStatusesType,
    page: number,
    pages: number,
}

const initialState: ReviewsState = {
    entities: [],
    status: REQUEST_STATUSES.idle,
    page: 1,
    pages: 0,
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        reviewsReset(state) {
            state.entities = [];
            state.status = REQUEST_STATUSES.idle;
            state.page = 1;
            state.pages = 0;
        },
        reviewsPageChanged(state, action: PayloadAction<number>) {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadReviewsPage.fulfilled, (state, action) => {
            if (action.payload) {
                state.entities = action.payload.docs;
                state.status = REQUEST_STATUSES.success;
                state.pages = action.payload.pages;
            } else {
                state = initialState;
            }
        });

        builder.addCase(loadReviewsPage.pending, (state) => {
            state.status = REQUEST_STATUSES.pending;
        });

        builder.addCase(loadReviewsPage.rejected, (state) => {
            state.status = REQUEST_STATUSES.failed;
        });
    }
})

export const { reviewsReset, reviewsPageChanged } = reviewsSlice.actions;

export default reviewsSlice.reducer;