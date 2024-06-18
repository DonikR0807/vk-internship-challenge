import { configureStore } from "@reduxjs/toolkit";
import yearReducer from "./UI/Year/yearSlice";
import moviesReducer from "./Entities/Movies/moviesSlice";
import searchedMoviesReducer from "./Entities/SearchedMovies/searchedMoviesSlice";
import currentMovieReducer from "./Entities/CurrentMovie/currentMovieSlice";
import seasonsSliceReducer from "./Entities/Seasons/seasonsSlice";
import postersSliceReducer from "./Entities/Posters/postersSlice";
import reviewsSliceReducer from "./Entities/Reviews/reviewsSlice";
import genresSliceReducer from './UI/Genre/genreSlice';
import ratingSliceReducer from "./UI/Rating/ratingSlice";

export const store = configureStore({
  reducer: {
    genres: genresSliceReducer,
    year: yearReducer,
    movies: moviesReducer,
    searchedMovies: searchedMoviesReducer,
    currentMovie: currentMovieReducer,
    seasons: seasonsSliceReducer,
    posters: postersSliceReducer,
    reviews: reviewsSliceReducer,
    rating: ratingSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
