import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import {
  selectReviews,
  selectReviewsPage,
  selectReviewsPages,
  selectReviewsStatus,
} from "../../../Redux/Entities/Reviews/selectors";
import {
  selectCurrentMovie,
  selectCurrentMovieStatus,
} from "../../../Redux/Entities/CurrentMovie/selectors";
import React from "react";
import { REQUEST_STATUSES } from "../../../utils/constants/requestStatuses";
import { loadReviewsPage } from "../../../Redux/Entities/Reviews/thunks/loadReviewsPage";
import { Box, Typography } from "@mui/material";
import ReviewItem from "../ReviewItem/ReviewItem";
import PagePagination from "../../Main/PagePagination/PagePagination";
import { reviewsPageChanged } from "../../../Redux/Entities/Reviews/reviewsSlice";
import ReviewsListSkeleton from "./ReviewsListSkeleton";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";

function ReviewsList() {
  const reviews = useAppSelector(selectReviews);
  const reviewsStatus = useAppSelector(selectReviewsStatus);
  const reviewsPage = useAppSelector(selectReviewsPage);
  const reviewsPages = useAppSelector(selectReviewsPages);
  const currentMoviesStatus = useAppSelector(selectCurrentMovieStatus);
  const currentMovie = useAppSelector(selectCurrentMovie);
  const dispatch = useAppDispatch();

  function handlePageChange(page: number) {
    dispatch(reviewsPageChanged(page));
  }

  React.useEffect(() => {
    const controller = new AbortController();

    if (currentMovie && currentMoviesStatus === REQUEST_STATUSES.success) {
      dispatch(
        loadReviewsPage({ signal: controller.signal, movieId: currentMovie.id })
      );
    }

    return () => {
      controller.abort();
    };
  }, [reviewsPage, currentMovie, currentMoviesStatus, dispatch]);

  const renderOnSuccess =
    reviews.length === 0 ? (
      <Box>
        <Typography variant="h5" component={"h3"} sx={{ marginBottom: 2 }}>
          Отзывы пользователей
        </Typography>
        <Typography
          variant="subtitle1"
          component={"p"}
          sx={{ marginBottom: 2 }}
        >
          Пока нет отзывов...
        </Typography>
      </Box>
    ) : (
      <Box>
        <Typography variant="h5" component={"h3"} sx={{ marginBottom: 2 }}>
          Отзывы пользователей
        </Typography>
        {reviews.map(({ id, ...props }) => {
          return <ReviewItem id={id} key={id} {...props}></ReviewItem>;
        })}
      </Box>
    );

  const renderOnIdle = <></>;
  const renderOnPending = <ReviewsListSkeleton></ReviewsListSkeleton>;

  const renderOnFailed = (
    <Box>
      <Typography variant="h5" component={"h3"} sx={{ marginBottom: 2 }}>
        Отзывы пользователей
      </Typography>
      <Typography variant="subtitle1" component={"p"} sx={{ marginBottom: 2 }}>
        Не получилось загрузить данную страницу
      </Typography>
    </Box>
  );

  return (
    <>
      <ConditionalList
        statusToCheck={reviewsStatus}
        renderOnSuccess={renderOnSuccess}
        renderOnFailed={renderOnFailed}
        renderOnIdle={renderOnIdle}
        renderOnPending={renderOnPending}
      ></ConditionalList>
      {currentMoviesStatus === REQUEST_STATUSES.success && (
        <PagePagination
          page={reviewsPage}
          count={reviewsPages}
          onChange={(event, value) => handlePageChange(value)}
        ></PagePagination>
      )}
    </>
  );
}

export default ReviewsList;
