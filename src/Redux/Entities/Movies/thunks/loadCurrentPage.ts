import { selectCurrentPage } from "../selectors";
import { selectYearSlice } from "../../../UI/Year/selectors";
import {
  SuccessfullResponse,
  isSuccessfullResponse,
} from "../../../../utils/typePredicates/isSuccessfulResponse";
import { createAppAsyncThunk } from "../../../typedApi";
import { movieAxios } from "../../../../utils/axiosConfig";
import { CanceledError } from "axios";
import { isMovieArray } from "../../../../utils/typePredicates/isMovieArray";
import { Movie } from "../moviesSlice";
import { selectGenreSlice } from "../../../UI/Genre/selectors";
import { selectRatingSlice } from "../../../UI/Rating/selectors";

export const loadCurrentPage = createAppAsyncThunk<
  SuccessfullResponse<Movie> | undefined,
  AbortSignal
>("loadCurrentPage", async (signal, { getState }) => {
  try {
    const currentPage = selectCurrentPage(getState());
    const genres = selectGenreSlice(getState());
    const ratingRange = selectRatingSlice(getState());
    const yearRange = selectYearSlice(getState());

    const params = new URLSearchParams();

    const selectFields = [
      "name",
      "poster",
      "id",
      "description",
      "year",
      "genres",
      "rating",
      "premiere"
    ];
    selectFields.forEach((field) => {
      params.append("selectFields", field);
    });

    const notNullFields = [
      "name",
      "poster.url",
      "id",
      "description",
      "year",
      "genres.name",
      "rating.kp",
      "premiere.world"
    ];
    notNullFields.forEach((field) => {
      params.append("notNullFields", field);
    });

    params.append("limit", "50");
    params.append("year", `${yearRange[0]}-${yearRange[1]}`);
    params.append("ageRating", "0-18");
    params.append("page", String(currentPage));
    params.append("rating.kp", `${ratingRange[0]}-${ratingRange[1]}`);
    if (genres.length > 0) {
      genres.forEach((genre) => {
        params.append("genres.name", genre);
      });
    }

    const response = await movieAxios.get("/v1.4/movie", {
      params,
      signal,
    });

    const data: unknown = response.data;

    if (isSuccessfullResponse(data) && isMovieArray(data)) {
      return data;
    } else {
      throw new Error("Вернулись некорректные данные");
    }
  } catch (err) {
    if (err instanceof CanceledError) {
      return;
    }
    throw err;
  }
});
