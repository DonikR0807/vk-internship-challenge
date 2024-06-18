import { Box, List, Pagination, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppSelector } from "../../../Redux/typedApi";
import {
  selectActorsInMovie,
  selectCurrentMovieStatus,
} from "../../../Redux/Entities/CurrentMovie/selectors";
import React from "react";
import PersonListSkeleton from "./PersonListSkeleton";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";
import PersonItem from "../PersonItem/PersonItem";

function PersonList() {
  const [page, setPage] = React.useState(1);
  const actorsInMovie = useAppSelector(selectActorsInMovie);
  const currentMovieStatus = useAppSelector(selectCurrentMovieStatus);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const renderOnIdle = <PersonListSkeleton></PersonListSkeleton>;
  const renderOnPending = <PersonListSkeleton></PersonListSkeleton>;

  const renderOnSuccess =
    !actorsInMovie || actorsInMovie.length === 0 ? (
      <Box sx={{ marginTop: { lg: "76px", xs: 0 } }}>
        <Typography variant="h5" component={"h3"}>
          В главных ролях
        </Typography>
        <Typography variant="subtitle1" component={"p"}>
          Нет информации об актёрах
        </Typography>
      </Box>
    ) : (
      <Box sx={{ marginTop: { lg: "76px", xs: 0 } }}>
        <Typography variant="h5" component={"h3"}>
          В главных ролях
        </Typography>
        {actorsInMovie.length > 10 && <Pagination
          size={matches ? "medium" : "small"}
          page={page}
          onChange={(event, value) => setPage(value)}
          count={Math.ceil(actorsInMovie.length / 10)}
          variant="outlined"
          color="primary"
          sx={{ marginTop: 2 }}
        />}
        <List sx={{ marginTop: 1 }}>
          {actorsInMovie
            .slice((page - 1) * 10, page * 10)
            .map(({ id, name, enName }) => {
              return (
                <PersonItem
                  id={id}
                  name={name}
                  enName={enName}
                  key={id}
                ></PersonItem>
              );
            })}
        </List>
      </Box>
    );

  const renderOnFailed = null;

  return (
    <ConditionalList
      statusToCheck={currentMovieStatus}
      renderOnIdle={renderOnIdle}
      renderOnFailed={renderOnFailed}
      renderOnPending={renderOnPending}
      renderOnSuccess={renderOnSuccess}
    ></ConditionalList>
  );
}

export default PersonList;
