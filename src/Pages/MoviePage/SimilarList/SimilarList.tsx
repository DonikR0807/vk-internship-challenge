import { useNavigate } from "react-router-dom";
import { currentMovieReset } from "../../../Redux/Entities/CurrentMovie/currentMovieSlice";
import {
  selectCurrentMovieStatus,
  selectLinkedMovies,
} from "../../../Redux/Entities/CurrentMovie/selectors";
import { seasonsReset } from "../../../Redux/Entities/Seasons/seasonsSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import Carousel from "../Carousel/Carousel";
import SimilarItem from "../SimilarItem/SimilarItem";
import { Box, Typography } from "@mui/material";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";
import SimilarListSkeleton from "./SimilarListSkeleton";
import { postersReset } from "../../../Redux/Entities/Posters/postersSlice";
import { reviewsReset } from "../../../Redux/Entities/Reviews/reviewsSlice";

function SimilarList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const similarMovies = useAppSelector(selectLinkedMovies);
  const currentMovieStatus = useAppSelector(selectCurrentMovieStatus);

  function handleSimilarMovieClick(movieId: number) {
    dispatch(currentMovieReset());
    dispatch(seasonsReset());
    dispatch(postersReset());
    dispatch(reviewsReset());
    navigate("/movie/" + movieId);
  }

  const renderOnIdle = null;
  const renderOnPending = <SimilarListSkeleton></SimilarListSkeleton>;
  const renderOnFailed = null;

  const renderOnSuccess =
    !similarMovies || similarMovies.length === 0 ? (
      <Box>
        <Typography variant="h5" component={"h3"} sx={{ marginBottom: 2 }}>
          Похожие фильмы или сериалы
        </Typography>
        <Typography variant="subtitle1" component={"p"}>
          Нет похожих фильмов или сериалов
        </Typography>
      </Box>
    ) : (
      <Box>
        <Typography variant="h5" component={"h3"} sx={{ marginBottom: 2 }}>
          Похожие фильмы или сериалы
        </Typography>
        <Carousel
          options={{
            slidesToScroll: "auto",
          }}
        >
          {similarMovies?.map(({ id, ...similarMovie }) => {
            return (
              <SimilarItem
                key={id}
                id={id}
                onClick={handleSimilarMovieClick}
                {...similarMovie}
              ></SimilarItem>
            );
          })}
        </Carousel>
      </Box>
    );

  return (
    <ConditionalList
      renderOnFailed={renderOnFailed}
      renderOnIdle={renderOnIdle}
      renderOnPending={renderOnPending}
      renderOnSuccess={renderOnSuccess}
      statusToCheck={currentMovieStatus}
    ></ConditionalList>
  );
}

export default SimilarList;
