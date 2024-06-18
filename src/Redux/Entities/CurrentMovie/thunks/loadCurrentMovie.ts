import { CanceledError } from "axios";
import { movieAxios } from "../../../../utils/axiosConfig";
import { isCurrentMovie } from "../../../../utils/typePredicates/isCurrentMovie";
import { createAppAsyncThunk } from "../../../typedApi";
import { CurrentMovie } from "../currentMovieSlice";

export const loadCurrentMovie = createAppAsyncThunk<
  CurrentMovie | undefined,
  
  {signal: AbortSignal, movieId: number,}
>("loadCurrentMovie", async ({signal, movieId}) => {
  try {
    const response = await movieAxios.get(`/v1.4/movie/${movieId}`, {
      signal
    });

    const data: unknown = response.data;

    if (isCurrentMovie(data)) {
      return data;
    } else {
      throw new Error("Вернулись неккоректные данные");
    }
  } catch (err) {
    if (err instanceof CanceledError) {
      return;
    }
    throw err;
  }
});