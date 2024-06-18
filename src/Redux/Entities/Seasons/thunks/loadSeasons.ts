import { CanceledError } from "axios";
import { movieAxios } from "../../../../utils/axiosConfig";
import { isSeasonsArray } from "../../../../utils/typePredicates/isSeasonsArray";
import { isSuccessfullResponse } from "../../../../utils/typePredicates/isSuccessfulResponse";
import { createAppAsyncThunk } from "../../../typedApi";
import { Season } from "../seasonsSlice";

export const loadSeasons = createAppAsyncThunk<
  Season[] | undefined,
  { signal: AbortSignal; movieId: number }
>("loadSeasons", async ({ signal, movieId }) => {
  try {
    const params = new URLSearchParams();
    const notNullFields = [
      "name",
      "number",
      "episodes.name",
      "episodes.number",
      "episodes.airDate",
      "episodes.enName",
    ];

    notNullFields.forEach((field) => {
      params.append("notNullFields", field);
    });

    const selectFields = ["name", "number", "episodes", "episodesCount"];

    selectFields.forEach((field) => {
      params.append("selectFields", field);
    });

    params.append("movieId", String(movieId));
    const firstResponse = await movieAxios.get("/v1.4/season", {
      signal,
      params,
    });

    const firstResponseData: unknown = firstResponse.data;

    if (
      isSuccessfullResponse(firstResponseData) &&
      isSeasonsArray(firstResponseData.docs)
    ) {
      if (firstResponseData.total > firstResponseData.limit) {
        params.append("limit", String(firstResponseData.total));

        const secondResponse = await movieAxios.get("/v1.4/season", {
          signal,
          params,
        });

        if (
          isSuccessfullResponse(secondResponse.data) &&
          isSeasonsArray(secondResponse.data.docs)
        ) {
          return secondResponse.data.docs;
        } else {
          new Error("Вернулись некорректные данные");
        }
      } else {
        return firstResponseData.docs;
      }
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
