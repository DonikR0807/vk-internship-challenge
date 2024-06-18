import { Movie } from "../../Redux/Entities/Movies/moviesSlice";
import { isMovie } from "./isMovie";
import { SuccessfullResponse } from "./isSuccessfulResponse";

export function isMovieArray(data: SuccessfullResponse): data is SuccessfullResponse<Movie> {
  const response = data as SuccessfullResponse<Movie>;

  if (!response) {
    return false;
  }

  return response.docs.every((movie) => {
    return isMovie(movie);
  });
}
