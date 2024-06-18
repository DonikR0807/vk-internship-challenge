import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: [number, number] = [1990, 2024];

const yearSlice = createSlice({
    name: 'year',
    initialState,
    reducers: {
        yearUpdated(state, action: PayloadAction<[number, number]>) {
            return action.payload;
        }
    }
})

export const { yearUpdated } = yearSlice.actions;

export default yearSlice.reducer;