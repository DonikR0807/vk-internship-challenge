import { Box, Grid } from "@mui/material";
import MovieInfoSection from "./MovieInfoSection/MovieInfoSection";
import { useAppDispatch } from "../../Redux/typedApi";
import { useParams } from "react-router-dom";
import React from "react";
import { loadCurrentMovie } from "../../Redux/Entities/CurrentMovie/thunks/loadCurrentMovie";
import SeasonsList from "./SeasonsList/SeasonsList";
import SimilarList from "./SimilarList/SimilarList";
import PostersList from "./PostersList/PostersList";
import RatingList from "./RatingList/RatingList";
import ReviewsList from "./ReviewsList/ReviewsList";

function MoviePage() {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const controller = new AbortController();

    dispatch(
      loadCurrentMovie({ signal: controller.signal, movieId: Number(movieId) })
    );

    return () => controller.abort();
  }, [movieId, dispatch]);

  return (
    <Box
      sx={{
        marginTop: "86px",
        height: "calc(100vh - 86px)",
      }}
    >
      <MovieInfoSection></MovieInfoSection>
      <Grid container columns={{xs: 3, lg: 4}} spacing={3} sx={{ marginTop: "20px" }}>
        <Grid item xs={3} md={2}>
          <SimilarList></SimilarList>
        </Grid>
        <Grid item xs={0} lg={1}></Grid>
        <Grid item xs={3} md={3} lg={1}>
          <SeasonsList></SeasonsList>
        </Grid>
      </Grid>
      <Grid container columns={4} spacing={3} sx={{ marginTop: "20px" }}>
        <Grid item xs={4} md={3}>
          <PostersList></PostersList>
        </Grid>
      </Grid>
      <Grid container columns={4} spacing={3} sx={{ marginTop: "20px" }}>
        <Grid item xs={4} md={2}>
          <RatingList></RatingList>
        </Grid>
      </Grid>
      <Grid container columns={4} spacing={3} sx={{ marginTop: "20px" }}>
        <Grid item xs={4} md={2}>
          <ReviewsList></ReviewsList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MoviePage;
