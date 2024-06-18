import React from "react";
import { RequestStatusesType } from "../../../utils/constants/requestStatuses";
import { Movie } from "../../../Redux/Entities/Movies/moviesSlice";
import { Grid, Typography } from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import MovieCardSkeleton from "../MovieCard/MovieCardSkeleton";
import ConditionalList from "../../../Components/ConditionalList/ConditionalList";

interface MovieListProps {
  requestStatus: RequestStatusesType;
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
}

function MovieList({ requestStatus, movies, onMovieClick }: MovieListProps) {
  const renderOnIdle = (
    <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
      {[...new Array(10)].map((_, index) => (
        <Grid item xs={1} key={index}>
          <MovieCardSkeleton></MovieCardSkeleton>
        </Grid>
      ))}
    </Grid>
  );

  const renderOnPending = renderOnIdle;

  const renderOnSuccess =
    movies.length === 0 ? (
      <Typography
        variant="h5"
        component="h2"
        sx={{
          paddingTop: 5,
          textAlign: "center",
        }}
      >
        Ничего не найдено...
      </Typography>
    ) : (
      <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
        {movies.map((movie) => (
          <Grid item xs={1} key={movie.id}>
            <MovieCard movie={movie} onClick={onMovieClick}></MovieCard>
          </Grid>
        ))}
      </Grid>
    );

  const renderOnFailed = (
    <Typography
      variant="h5"
      component="h2"
      sx={{
        paddingTop: 5,
        textAlign: "center",
      }}
    >
      Не удалось загрузить страницу...
    </Typography>
  );

  return (
    <ConditionalList
      statusToCheck={requestStatus}
      renderOnSuccess={renderOnSuccess}
      renderOnIdle={renderOnIdle}
      renderOnPending={renderOnPending}
      renderOnFailed={renderOnFailed}
    ></ConditionalList>
  );
}

export default MovieList;
