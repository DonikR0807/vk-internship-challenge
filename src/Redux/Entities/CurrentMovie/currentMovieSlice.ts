import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../Movies/moviesSlice";
import {
  REQUEST_STATUSES,
  RequestStatusesType,
} from "../../../utils/constants/requestStatuses";
import { loadCurrentMovie } from "./thunks/loadCurrentMovie";

interface Genre {
  name: string;
}

export interface Premiere {
  world?: string | null;
  russia?: string | null;
  usa?: string | null;
  digital?: string | null;
  bluRay?: string | null;
  dvd?: string | null;
  cinema?: string | null;
  country?: string | null;
}

export interface MovieRating {
  kp?: number | null;
  imdb?: number | null;
  tmdb?: number | null;
  filmCritics?: number | null;
  russianFilmCritics?: number | null;
  await?: number | null;
  [prop: string]: number | null | undefined;
}

export interface PersonInMovie {
  id: number;
  photo?: string | null;
  name?: string | null;
  enName?: string | null;
  description?: string | null;
  profession?: string | null;
  enProffesion?: string | null;
}

export interface LinkedMovie {
  id: number;
  name?: string | null;
  enName?: string | null;
  alternativeName?: string | null;
  type?: string | null;
  poster?: {
    url: string | null;
    previewUrl: string | null;
  } | null;
  rating?: MovieRating | null;
  year?: number | null;
}

export interface CurrentMovie extends Movie {
  premiere: Premiere
  persons: PersonInMovie[];
  genres: Genre[]
  similarMovies?: LinkedMovie[] | null;
  isSeries?: boolean | null;
}

export interface CurrentMovieState {
  entity: CurrentMovie | null;
  status: RequestStatusesType;
}

const initialState: CurrentMovieState = {
  entity: null,
  status: REQUEST_STATUSES.idle,
};

const currentMovieSlice = createSlice({
  name: "currentMovie",
  initialState,
  reducers: {
    currentMovieReset(state) {
      state.entity = null;
      state.status = REQUEST_STATUSES.idle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCurrentMovie.fulfilled, (state, action) => {
      const { payload: currentMovie } = action;

      if (currentMovie) {
        state.entity = currentMovie;
        state.status = REQUEST_STATUSES.success;
      }
    });

    builder.addCase(loadCurrentMovie.pending, (state) => {
      state.status = REQUEST_STATUSES.pending;
    });

    builder.addCase(loadCurrentMovie.rejected, (state) => {
      state.status = REQUEST_STATUSES.failed;
    });
  },
});

export const { currentMovieReset } = currentMovieSlice.actions;

export default currentMovieSlice.reducer;
