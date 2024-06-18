import { SearchedMovie } from "../../Redux/Entities/SearchedMovies/searchedMoviesSlice";
import { SuccessfullResponse } from "./isSuccessfulResponse";

export function isSearchedMoviesArray(
  data: SuccessfullResponse
): data is SuccessfullResponse<SearchedMovie> {
  const response = data as SuccessfullResponse<SearchedMovie>;

  if (!response) {
    return false;
  }

  return response.docs.every((searchedMovie) => {
    const hasId = typeof searchedMovie.id === "number";

    const hasName = typeof searchedMovie.name === "string" || searchedMovie.name === null;

    const hasUrl =
      searchedMovie.poster &&
      (typeof searchedMovie.poster.url === "string" ||
        searchedMovie.poster.url === null);

    return hasId && hasName && hasUrl;
  });
}
