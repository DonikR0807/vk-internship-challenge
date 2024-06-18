import { createSlice } from "@reduxjs/toolkit";
import {
  REQUEST_STATUSES,
  RequestStatusesType,
} from "../../../utils/constants/requestStatuses";
import { loadPosters } from "./thunks/loadPosters";

export interface Poster {
  url: string;
}

export interface PostersState {
  entities: Poster[];
  status: RequestStatusesType;
}

const initialState: PostersState = {
  entities: [],
  status: REQUEST_STATUSES.idle,
};

const postersSlice = createSlice({
  initialState,
  name: "posters",
  reducers: {
    postersReset(state) {
        state.entities = [];
        state.status = REQUEST_STATUSES.idle;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadPosters.pending, (state) => {
      state.status = REQUEST_STATUSES.pending;
    });

    builder.addCase(loadPosters.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = REQUEST_STATUSES.success;
        state.entities = action.payload.docs;
      } else {
        state.status = REQUEST_STATUSES.idle;
        state.entities = [];
      }
    });

    builder.addCase(loadPosters.rejected, (state) => {
      state.status = REQUEST_STATUSES.failed;
    });
  },
});

export const { postersReset } = postersSlice.actions;

export default postersSlice.reducer;
