import { Poster } from "../../Redux/Entities/Posters/postersSlice";
import { SuccessfullResponse } from "./isSuccessfulResponse";

export function isPostersArray(data: unknown): data is SuccessfullResponse<Poster> {
    const postersArray = data as SuccessfullResponse<Poster>;

    if (!postersArray.docs) {
        return false;
    }

    return postersArray.docs.every((poster) => {
        return typeof poster.url === "string";
    })
}