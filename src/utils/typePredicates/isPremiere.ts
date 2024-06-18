import { Premiere } from "../../Redux/Entities/CurrentMovie/currentMovieSlice";

export function isPremiere(data: unknown): data is Premiere {
  const premiere = data as Premiere;

  if (!premiere) {
    return false;
  }

  const hasRussia =
    typeof premiere.russia === "string" || premiere.russia == undefined;
  const hasdvd = typeof premiere.dvd === "string" || premiere.dvd == undefined;
  const hasworld =
    typeof premiere.world === "string" || premiere.world == undefined;
  const hascountry =
    typeof premiere.country === "string" || premiere.country == undefined;
  const hasBluRay =
    typeof premiere.bluRay === "string" || premiere.bluRay == undefined;
  const hasDigital =
    typeof premiere.digital === "string" || premiere.digital == undefined;
  const hasCinema =
    typeof premiere.cinema === "string" || premiere.cinema == undefined;
  const hasUsa = typeof premiere.usa === "string" || premiere.usa == undefined;

  return (
    hasBluRay &&
    hasRussia &&
    hasDigital &&
    hasdvd &&
    hasCinema &&
    hasworld &&
    hascountry &&
    hasUsa
  );
}
