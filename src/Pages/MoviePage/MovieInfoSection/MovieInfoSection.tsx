import { Typography } from "@mui/material";
import {
  selectCurrentMovie,
  selectCurrentMovieStatus,
} from "../../../Redux/Entities/CurrentMovie/selectors";
import { useAppSelector } from "../../../Redux/typedApi";
import InfoGrid from "../InfoGrid/InfoGrid";
import InfoGridSkeleton from "../InfoGrid/InfoGridSkeleton";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";

function MovieInfoSection() {
  const currentMovie = useAppSelector(selectCurrentMovie);
  const currentMovieStatus = useAppSelector(selectCurrentMovieStatus);

  const renderOnIdle = <InfoGridSkeleton></InfoGridSkeleton>;
  const renderOnPending = <InfoGridSkeleton></InfoGridSkeleton>;

  const renderOnSuccess = currentMovie && (
    <InfoGrid
      {...currentMovie}
    ></InfoGrid>
  );

  const renderOnFailed = (
    <Typography
      variant="h3"
      component={"h1"}
      sx={{
        paddingTop: "40px",
        textAlign: "center",
      }}
    >
      Не удалось загрузить фильм или сериал...
    </Typography>
  );

  return (
    <ConditionalList
      statusToCheck={currentMovieStatus}
      renderOnIdle={renderOnIdle}
      renderOnPending={renderOnPending}
      renderOnSuccess={renderOnSuccess}
      renderOnFailed={renderOnFailed}
    ></ConditionalList>
  );
}

export default MovieInfoSection;
