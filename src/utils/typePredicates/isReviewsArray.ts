import { Review } from "../../Redux/Entities/Reviews/reviewsSlice";
import { SuccessfullResponse } from "./isSuccessfulResponse";

export function isReviewsArray(
  data: unknown
): data is SuccessfullResponse<Review> {
  const response = data as SuccessfullResponse<Review>;

  if (!response.docs) {
    return false;
  }

  return response.docs.every((review) => {
    const hasId = typeof review.id === "number";
    const hasAuthor = typeof review.author === "string";
    const hasDate = typeof review.date === "string";
    const hasReview = typeof review.review === "string";
    const hasTitle = typeof review.title === "string";
    const hasType =
      review.type === "Позитивный" ||
      review.type === "Негативный" ||
      review.type === "Нейтральный";

      return hasAuthor && hasId && hasDate && hasTitle && hasReview && hasType;
  });
}
