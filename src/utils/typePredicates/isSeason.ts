import { Season } from "../../Redux/Entities/Seasons/seasonsSlice";
import { isEpisode } from "./isEpisode";

export function isSeason(data: unknown): data is Season {
  const season = data as Season;

  if (!season) {
    return false;
  }

  const hasNumber = typeof season.number === "number";

  const hasName = typeof season.name === "string";

  const hasEpisodes =
    Array.isArray(season.episodes) &&
    (season.episodes.length === 0 || isEpisode(season.episodes[0]));

  return hasNumber && hasEpisodes && hasName;
}
