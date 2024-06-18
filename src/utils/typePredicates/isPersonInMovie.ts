import { PersonInMovie } from "../../Redux/Entities/CurrentMovie/currentMovieSlice";

export function isPersonInMovie(data: unknown): data is PersonInMovie {
  const personInMovie = data as PersonInMovie;

  if (!personInMovie) {
    return false;
  }

  const hasId = typeof personInMovie.id === "number";

  const hasPhoto =
    typeof personInMovie.photo === "string" || personInMovie.photo == null;

  const hasName =
    typeof personInMovie.name === "string" || personInMovie.name == null;

  const hasEnName =
    typeof personInMovie.enName === "string" || personInMovie.enName == null;

  const hasDescription =
    typeof personInMovie.description === "string" ||
    personInMovie.description == null;

  const hasProffesion =
    typeof personInMovie.profession === "string" ||
    personInMovie.profession == null;

  const hasEnProffesion =
    typeof personInMovie.enProffesion === "string" ||
    personInMovie.enProffesion == null;

  return (
    hasId &&
    hasPhoto &&
    hasName &&
    hasEnName &&
    hasDescription &&
    hasProffesion &&
    hasEnProffesion
  );
}
