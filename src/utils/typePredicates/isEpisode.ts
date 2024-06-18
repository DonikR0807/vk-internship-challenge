import { Episode } from "../../Redux/Entities/Seasons/seasonsSlice";

export function isEpisode(data: unknown): data is Episode {
  const episode = data as Episode;

  if (!episode) {
    return false;
  }

  const hasName = typeof episode.name === "string";

  const hasAirDate = typeof episode.airDate === "string";

  const hasNumber = typeof episode.number === "number";

  const hasEnName = typeof episode.enName === "string";

  return hasName && hasAirDate && hasNumber && hasEnName;
}
