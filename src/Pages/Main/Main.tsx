import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/typedApi";
import { selectYearSlice } from "../../Redux/UI/Year/selectors";
import { loadCurrentPage } from "../../Redux/Entities/Movies/thunks/loadCurrentPage";
import {
  selectCurrentPage,
  selectMovieEntities,
  selectRequestStatus,
  selectTotalPages,
} from "../../Redux/Entities/Movies/selectors";
import MovieList from "./MovieList/MovieList";
import { pageChanged } from "../../Redux/Entities/Movies/moviesSlice";
import FiltersSection from "./FiltersSection/FiltersSection";
import PagePagination from "./PagePagination/PagePagination";
import { useNavigate } from "react-router-dom";
import { currentMovieReset } from "../../Redux/Entities/CurrentMovie/currentMovieSlice";
import { seasonsReset } from "../../Redux/Entities/Seasons/seasonsSlice";
import { postersReset } from "../../Redux/Entities/Posters/postersSlice";
import { reviewsReset } from "../../Redux/Entities/Reviews/reviewsSlice";
import { selectGenreSlice } from "../../Redux/UI/Genre/selectors";
import { selectRatingSlice } from "../../Redux/UI/Rating/selectors";

function Main() {
  const movies = useAppSelector(selectMovieEntities);
  const requestStatus = useAppSelector(selectRequestStatus);
  const yearRange = useAppSelector(selectYearSlice);
  const page = useAppSelector(selectCurrentPage);
  const pages = useAppSelector(selectTotalPages);
  const genres = useAppSelector(selectGenreSlice);
  const currentRating = useAppSelector(selectRatingSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  function handlePageChange(value: number) {
    dispatch(pageChanged(value));
  }

  function handleMovieClick(movieId: number) {
    dispatch(currentMovieReset());
    dispatch(seasonsReset());
    dispatch(postersReset());
    dispatch(reviewsReset());
    navigate("/movie/" + movieId);
  }

  React.useEffect(() => {
    const controller = new AbortController();

    dispatch(loadCurrentPage(controller.signal));

    return () => {
      controller.abort();
    };
  }, [genres, page, yearRange, dispatch, currentRating]);

  return (
    <Box
      sx={{
        marginTop: "86px",
        height: "calc(100vh - 86px)",
      }}
    >
      <Typography
        variant="h3"
        component={"h1"}
        sx={{
          fontSize: {
            xs: "2rem",
            md: "3rem",
          },
          marginBottom: "20px",
        }}
      >
        Фильмы и сериалы
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1f",
            md: "300px 1fr",
          },
          position: "relative",
        }}
      >
        {matches && (
          <Box sx={{ position: "sticky", top: "86px", alignSelf: "start" }}>
            <FiltersSection></FiltersSection>
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexGrow: 1 }}>
            <MovieList
              onMovieClick={handleMovieClick}
              requestStatus={requestStatus}
              movies={movies}
            ></MovieList>
          </Box>
          <PagePagination
            page={page}
            count={pages}
            onChange={(event, value) => handlePageChange(value)}
          ></PagePagination>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
