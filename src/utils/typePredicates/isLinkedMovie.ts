import { LinkedMovie } from "../../Redux/Entities/CurrentMovie/currentMovieSlice";
import { isMovieRating } from "./isMovieRating";

export function isLinkedMovie(data: unknown): data is LinkedMovie {
  const linkedMovie = data as LinkedMovie;

  if (!linkedMovie) {
    return false;
  }

  const hasId = typeof linkedMovie.id === "number";

  const hasName =
    typeof linkedMovie.name === "string" || linkedMovie.name == null;

  const hasEnName =
    typeof linkedMovie.enName === "string" || linkedMovie.enName == null;

  const hasAlternativeName =
    typeof linkedMovie.alternativeName === "string" ||
    linkedMovie.alternativeName == null;

  const hasType =
    typeof linkedMovie.type === "string" || linkedMovie.type == null;

  const hasYear =
    typeof linkedMovie.year === "number" || linkedMovie.year == null;

  const hasPoster =
    linkedMovie.poster == null ||
    typeof linkedMovie.poster.url === "string" ||
    linkedMovie.poster.url == null;

  const hasRating =
    linkedMovie.rating == null || isMovieRating(linkedMovie.rating);

  return (
    hasId &&
    hasName &&
    hasEnName &&
    hasAlternativeName &&
    hasType &&
    hasYear &&
    hasPoster &&
    hasRating
  );
}
