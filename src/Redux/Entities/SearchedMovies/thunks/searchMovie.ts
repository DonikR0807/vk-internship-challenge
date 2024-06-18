import { movieAxios } from "../../../../utils/axiosConfig";
import { isSearchedMoviesArray } from "../../../../utils/typePredicates/isSearchedMoviesArray";
import {
  SuccessfullResponse,
  isSuccessfullResponse,
} from "../../../../utils/typePredicates/isSuccessfulResponse";
import { createAppAsyncThunk } from "../../../typedApi";
import { SearchedMovie } from "../searchedMoviesSlice";

export const searchMovie = createAppAsyncThunk<
  SuccessfullResponse<SearchedMovie>,
  string
>("searchMovie", async (searchValue) => {
  const params = new URLSearchParams();
  params.append("query", searchValue);

  const response = await movieAxios.get("/v1.4/movie/search", {
    params,
  });

  const data: unknown = response.data;

  if (isSuccessfullResponse(data) && isSearchedMoviesArray(data)) {
    return data;
  } else {
    throw new Error("Вернулись неккоректные данные");
  }
});
