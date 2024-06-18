import { MovieRating } from "../../Redux/Entities/CurrentMovie/currentMovieSlice";

export function isMovieRating(data: unknown): data is MovieRating {
  const movieRating = data as MovieRating;

  if (!movieRating) {
    return false;
  }

  const hasAwait =
    typeof movieRating.await === "number" || movieRating.await == null;

  const hasImdb =
    typeof movieRating.imdb === "number" || movieRating.imdb == null;
    
  const hasTmdb =
    typeof movieRating.tmdb === "number" || movieRating.tmdb == null;

  const hasRrussianFilmCritics =
    typeof movieRating.russianFilmCritics === "number" ||
    movieRating.russianFilmCritics == null;

  const hasfilmCritics =
    typeof movieRating.filmCritics === "number" ||
    movieRating.filmCritics == null;

  const hasKp = typeof movieRating.kp === "number" || movieRating.kp == null;

  return (
    hasAwait &&
    hasImdb &&
    hasTmdb &&
    hasRrussianFilmCritics &&
    hasfilmCritics &&
    hasKp
  );
}
