import { CanceledError } from "axios";
import { SuccessfullResponse, isSuccessfullResponse } from "../../../../utils/typePredicates/isSuccessfulResponse";
import { createAppAsyncThunk } from "../../../typedApi";
import { movieAxios } from "../../../../utils/axiosConfig";
import { isPostersArray } from "../../../../utils/typePredicates/isPostersArray";
import { Poster } from "../postersSlice";

export const loadPosters = createAppAsyncThunk<
  SuccessfullResponse<Poster> | undefined,
  { signal: AbortSignal, movieId: number }>("loadPosters", async ({ signal, movieId }) => {
    try {
        const params = new URLSearchParams();
        params.append('type', 'backdrops');
        params.append('movieId', String(movieId));
        params.append('notNullFields', 'url');
        params.append('selectFields', 'url');

        const response = await movieAxios.get('/v1.4/image', {
            params,
            signal
        });

        const data: unknown = response.data;

        if (isSuccessfullResponse(data) && isPostersArray(data)) {
            return data;
        } else {
            throw new Error("Вернулись некорректные данные");
        }

    } catch (err) {
        if (err instanceof CanceledError) {
            return;
        }
        throw err;
    }
});
