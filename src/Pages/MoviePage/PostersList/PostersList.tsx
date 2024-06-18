import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import {
  selectPosterStatus,
  selectPosters,
} from "../../../Redux/Entities/Posters/selectors";
import {
  selectCurrentMovie,
  selectCurrentMovieStatus,
} from "../../../Redux/Entities/CurrentMovie/selectors";
import { REQUEST_STATUSES } from "../../../utils/constants/requestStatuses";
import { loadPosters } from "../../../Redux/Entities/Posters/thunks/loadPosters";
import Carousel from "../Carousel/Carousel";
import PostersListSkeleton from "./PostersListSkeleton";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";

function PostersList() {
  const postersStatus = useAppSelector(selectPosterStatus);
  const posters = useAppSelector(selectPosters);
  const currentMovieStatus = useAppSelector(selectCurrentMovieStatus);
  const currentMovie = useAppSelector(selectCurrentMovie);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const controller = new AbortController();

    if (currentMovieStatus === REQUEST_STATUSES.success && currentMovie) {
      dispatch(
        loadPosters({ signal: controller.signal, movieId: currentMovie.id })
      );
    }

    return () => controller.abort();
  }, [currentMovie, currentMovie?.id, currentMovieStatus, dispatch]);

  const renderOnIdle = null;
  const renderOnPending = <PostersListSkeleton></PostersListSkeleton>;
  const renderOnFailed = (
    <Box>
      <Typography variant="h5" component={"h3"} marginBottom={2}>
        Постеры
      </Typography>
      <Typography variant="subtitle1" component={"p"} marginBottom={2}>
        Не получилось загрузить постеры...
      </Typography>
    </Box>
  );

  const renderOnSuccess =
    posters.length === 0 ? (
      <Box>
        <Typography variant="h5" component={"h3"} marginBottom={2}>
          Постеры
        </Typography>
        <Typography variant="subtitle1" component={"p"} marginBottom={2}>
          Нет информации о постерах
        </Typography>
      </Box>
    ) : (
      <Box>
        <Typography variant="h5" component={"h3"} marginBottom={2}>
          Постеры
        </Typography>
        <Carousel
          options={{
            slidesToScroll: "auto",
          }}
          visibleSlides={2}
        >
          {posters.map(({ url }, index) => {
            return (
              <Box
                key={index}
                component={"img"}
                src={url}
                alt="Постер"
                width={"100%"}
                height={300}
                sx={{
                  borderRadius: "10px",
                  objectFit: "contain",
                }}
              ></Box>
            );
          })}
        </Carousel>
      </Box>
    );

  return (
    <ConditionalList
      renderOnFailed={renderOnFailed}
      renderOnIdle={renderOnIdle}
      renderOnSuccess={renderOnSuccess}
      renderOnPending={renderOnPending}
      statusToCheck={postersStatus}
    ></ConditionalList>
  );
}

export default PostersList;
