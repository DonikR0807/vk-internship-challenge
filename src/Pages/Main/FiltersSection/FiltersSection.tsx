import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { pageChanged } from "../../../Redux/Entities/Movies/moviesSlice";
import { yearUpdated } from "../../../Redux/UI/Year/yearSlice";
import { selectCurrentPage } from "../../../Redux/Entities/Movies/selectors";
import { selectYearSlice } from "../../../Redux/UI/Year/selectors";
import GenreSelect from "../GenreSelect/GenreSelect";
import RatingRange from "../RatingRange/RatingRange";
import YearRange from "../YearRange/YearRange";
import { selectRatingSlice } from "../../../Redux/UI/Rating/selectors";
import { selectGenreSlice } from "../../../Redux/UI/Genre/selectors";
import { ratingUpdated } from "../../../Redux/UI/Rating/ratingSlice";
import { genresUpdated } from "../../../Redux/UI/Genre/genreSlice";


function FiltersSection() {
  const dispatch = useAppDispatch();
  const [queryParams, setQueryParams] = useSearchParams();
  const page = useAppSelector(selectCurrentPage);
  const yearRange = useAppSelector(selectYearSlice);
  const ratingRange = useAppSelector(selectRatingSlice);
  const genres = useAppSelector(selectGenreSlice);

  React.useEffect(() => {
    const pageParam = queryParams.get("page");
    if (pageParam) {
      dispatch(pageChanged(+pageParam));
    }

    const yearParam = queryParams.get("yearRange");
    if (yearParam) {
      dispatch(yearUpdated(yearParam.split(",").map((year) => +year) as [number, number]));
    }

    const ratingParam = queryParams.get("ratingRange");
    if (ratingParam) {
      dispatch(ratingUpdated(ratingParam.split(",").map((year) => +year) as [number, number]))
    }

    const genresParam = queryParams.get("genres");
    if (genresParam) {
      dispatch(genresUpdated(genresParam.split(",")))
    }

  }, [queryParams, dispatch]);

  React.useEffect(() => {
    queryParams.set("page", String(page));
    queryParams.set("yearRange", yearRange.join(","));
    queryParams.set("genres", genres.join(","));
    queryParams.set("ratingRange", ratingRange.join(","));
    setQueryParams(queryParams);

    return () => {
      queryParams.delete("page");
      queryParams.delete("yearRange");
      queryParams.delete("ratingRange");
      queryParams.delete("genres")
      setQueryParams(queryParams);
    };
  }, [page, queryParams, setQueryParams, yearRange, ratingRange, genres]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <GenreSelect></GenreSelect>
      <RatingRange></RatingRange>
      <YearRange></YearRange>
    </Box>
  );
}

export default FiltersSection;
