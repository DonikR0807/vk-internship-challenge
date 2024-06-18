import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  REQUEST_STATUSES,
  RequestStatusesType,
} from "../../../utils/constants/requestStatuses";
import { searchMovie } from "./thunks/searchMovie";

export interface SearchedMovie {
  id: number;
  name?: string | null;
  poster?: {
    url: string | null;
  } | null;
}

interface SearchedMoviesSlice {
  status: RequestStatusesType;
  entities: SearchedMovie[];
}

const initialState: SearchedMoviesSlice = {
  status: REQUEST_STATUSES.idle,
  entities: [],
};

const searchedMoviesSlice = createSlice({
  name: "searchedMovies",
  initialState,
  reducers: {
    setSearchStatus(state, action: PayloadAction<RequestStatusesType>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.entities = action.payload.docs;
      state.status = REQUEST_STATUSES.success;
    });

    builder.addCase(searchMovie.pending, (state) => {
      state.status = REQUEST_STATUSES.pending;
    });

    builder.addCase(searchMovie.rejected, (state) => {
      state.status = REQUEST_STATUSES.failed;
    });
  },
});

export const { setSearchStatus } = searchedMoviesSlice.actions;

export default searchedMoviesSlice.reducer;
