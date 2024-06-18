import { Season } from "../../Redux/Entities/Seasons/seasonsSlice";
import { isSeason } from "./isSeason";

export function isSeasonsArray(data: unknown): data is Season[] {
    const seasons = data as Season[];

    if (!seasons) {
        return false;
    }

    return Array.isArray(seasons) && (seasons.length === 0 || isSeason(seasons[0]))
}
