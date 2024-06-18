import { CanceledError } from "axios";
import { movieAxios } from "../../../../utils/axiosConfig";
import { isReviewsArray } from "../../../../utils/typePredicates/isReviewsArray";
import {
  SuccessfullResponse,
  isSuccessfullResponse,
} from "../../../../utils/typePredicates/isSuccessfulResponse";
import { createAppAsyncThunk } from "../../../typedApi";
import { Review } from "../reviewsSlice";
import { selectReviewsPage } from "../selectors";

export const loadReviewsPage = createAppAsyncThunk<
  SuccessfullResponse<Review> | undefined,
  {
    signal: AbortSignal;
    movieId: number;
  }
>("loadReviewsPage", async ({ signal, movieId }, { getState }) => {
  try {
    const page = selectReviewsPage(getState());
    const notNullFields = ["id", "review", "date", "title", "author", "type"];

    const params = new URLSearchParams();

    notNullFields.forEach((field) => {
      params.append("notNullFields", field);
      params.append("selectFields", field);
    });

    params.append("movieId", String(movieId));
    params.append("page", String(page));
    params.append("limit", "3");

    const response = await movieAxios.get("/v1.4/review", {
      params,
      signal,
    });

    const data: unknown = response.data;

    if (isSuccessfullResponse(data) && isReviewsArray(data)) {
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
