import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import {
  selectSeasonsStatus,
  selectSortedSeasons,
} from "../../../Redux/Entities/Seasons/selectors";
import React from "react";
import {
  selectCurrentMovie,
  selectCurrentMovieStatus,
} from "../../../Redux/Entities/CurrentMovie/selectors";
import { REQUEST_STATUSES } from "../../../utils/constants/requestStatuses";
import { loadSeasons } from "../../../Redux/Entities/Seasons/thunks/loadSeasons";
import { Box, Button, List, Pagination, Typography, useMediaQuery, useTheme } from "@mui/material";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import SeasonsListSkeleton from "./SeasonsListSkeleton";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";

function SeasonsList() {
  const sortedSeasonsList = useAppSelector(selectSortedSeasons);
  const currentMovie = useAppSelector(selectCurrentMovie);
  const currentMovieStatus = useAppSelector(selectCurrentMovieStatus);
  const seasonsStatus = useAppSelector(selectSeasonsStatus);
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(1);
  const [showAllEpisodes, setShowAllEpisodes] = React.useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  React.useEffect(() => {
    const controller = new AbortController();
    if (
      currentMovieStatus === REQUEST_STATUSES.success &&
      currentMovie?.isSeries === true
    ) {
      dispatch(
        loadSeasons({ signal: controller.signal, movieId: currentMovie.id })
      );
    }

    return () => {
      controller.abort();
    };
  }, [currentMovie?.id, currentMovie?.isSeries, currentMovieStatus, dispatch]);

  const renderOnSuccess = (
    <Box>
      <Typography variant="h5" component={"h3"} sx={{ marginBottom: 2 }}>
        Сезоны и эпизоды
      </Typography>
      <Pagination
        size={matches ? "medium" : "small"}
        page={page}
        onChange={(event, value) => setPage(value)}
        count={sortedSeasonsList.length}
        variant="outlined"
        color="primary"
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <Typography variant="subtitle1" component="p">
        {sortedSeasonsList[page - 1]?.name}
      </Typography>
      <List>
        {sortedSeasonsList[page - 1]?.episodes
          .slice(
            0,
            showAllEpisodes ? sortedSeasonsList[page - 1].episodes.length : 5
          )
          .map(({ name, enName, airDate, number }, index) => {
            return (
              <EpisodeItem
                key={index}
                number={number}
                name={name}
                enName={enName}
                airDate={airDate}
              ></EpisodeItem>
            );
          })}
      </List>
      {sortedSeasonsList[page - 1]?.episodes.length > 5 && (
        <Button onClick={() => setShowAllEpisodes(!showAllEpisodes)}>
          {showAllEpisodes ? "Свернуть" : "Показать всё"}
        </Button>
      )}
    </Box>
  );

  const renderOnIdle = <></>;
  const renderOnPending = <SeasonsListSkeleton></SeasonsListSkeleton>;

  const renderOnFailed = (
    <Box>
      <Typography variant="h5" component={"h3"} sx={{ marginBottom: 2 }}>
        Сезоны и эпизоды
      </Typography>
      <Typography variant="subtitle1" component={"p"}>
        Не удалось загрузить сезоны и эпизоды
      </Typography>
    </Box>
  );

  return (
    <ConditionalList
      statusToCheck={seasonsStatus}
      renderOnFailed={renderOnFailed}
      renderOnSuccess={renderOnSuccess}
      renderOnPending={renderOnPending}
      renderOnIdle={renderOnIdle}
    ></ConditionalList>
  );
}

export default SeasonsList;
