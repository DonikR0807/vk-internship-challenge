import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: [number, number] = [0, 10];

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    ratingUpdated(_, action: PayloadAction<[number, number]>) {
      return action.payload;
    },
  },
});

export const { ratingUpdated } = ratingSlice.actions

export default ratingSlice.reducer;
