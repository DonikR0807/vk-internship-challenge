import { Box, List, Typography } from "@mui/material";
import RatingItem from "../RatingItem/RatingItem";
import { ratingMapperName } from "../../../utils/ratingNameMapper";
import { useAppSelector } from "../../../Redux/typedApi";
import {
  selectCurrentMovieStatus,
  selectRating,
} from "../../../Redux/Entities/CurrentMovie/selectors";
import RatingListSkeleton from "./RatingListSkeleton";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";

function RatingList() {
  const rating = useAppSelector(selectRating);
  const currentMoviesStatus = useAppSelector(selectCurrentMovieStatus);

  if (!rating) {
    return <></>;
  }

  const ratingNames = Object.keys(rating);
  const renderOnIdle = <RatingListSkeleton></RatingListSkeleton>;
  const renderOnPending = renderOnIdle;
  const renderOnFailed = <></>;

  const renderOnSuccess = (
    <Box>
      <Typography variant="h5" component={"h3"} marginBottom={2}>
        Рейтинги
      </Typography>
      <List disablePadding>
        {!rating || ratingNames.length === 0 ||
        Object.values(rating).every((ratingValue) => !ratingValue) ? (
          <Typography variant="subtitle1" component="p">
            Нет информации о рейтингах
          </Typography>
        ) : (
          ratingNames.map((ratingName, index) => {
            return (
              <RatingItem
                ratingName={ratingMapperName(ratingName)}
                ratingValue={rating[ratingName]}
                key={index}
              ></RatingItem>
            );
          })
        )}
      </List>
    </Box>
  );

  return (
    <ConditionalList
      statusToCheck={currentMoviesStatus}
      renderOnFailed={renderOnFailed}
      renderOnSuccess={renderOnSuccess}
      renderOnPending={renderOnPending}
      renderOnIdle={renderOnIdle}
    ></ConditionalList>
  );
}

export default RatingList;
