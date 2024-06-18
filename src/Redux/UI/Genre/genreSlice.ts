import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const genreSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        genreAdded(state, action: PayloadAction<string>) {
            state.push(action.payload);
        },
        genreRemoved(state, action: PayloadAction<string>) {
            return state.filter((genre) => {
                return genre !== action.payload;
            })
        },
        genresUpdated(state, action: PayloadAction<string[]>) {
            return [...action.payload]
        }
    }
})

export const { genreRemoved, genreAdded, genresUpdated } = genreSlice.actions;

export default genreSlice.reducer;

