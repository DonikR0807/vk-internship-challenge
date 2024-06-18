import { Box, Grid, Typography } from "@mui/material";
import { CurrentMovie } from "../../../Redux/Entities/CurrentMovie/currentMovieSlice";
import PersonList from "../PersonList/PersonList";
import { formatDate } from "../../../utils/formateDate";

function InfoGrid({
  name,
  poster,
  description,
  premiere,
  genres,
}: CurrentMovie) {
  const date = premiere.world ? new Date(premiere.world) : null;

  return (
    <Grid container columns={4} spacing={3}>
      <Grid item xs={4} sm={3} md={2} lg={1}>
        <Box
          component={"img"}
          alt={name || "Не удалось загрузить изображение"}
          src={poster.url || ""}
          sx={{
            width: "100%",
            height: {
              xs: "400px",
              sm: "500px",
            },
            borderRadius: "10px",
          }}
        ></Box>
      </Grid>
      <Grid item xs={4} md={2}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            marginBottom: "20px",
            fontSize: {
              xs: "2rem",
              sm: "3rem",
            },
          }}
        >
          {name || "Без названия"}
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginBottom: "14px",
            fontSize: {
              xs: "1.7rem",
              sm: "2.125rem",
            },
          }}
        >
          Описание
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBottom: "20px" }}>
          {description || "Описания нет"}
        </Typography>
        {date && (
          <Typography
            variant="body1"
            sx={{ marginBottom: "12px", fontWeight: 700 }}
          >{`Дата выхода: ${formatDate(date)}`}</Typography>
        )}
        <Typography variant="body1" sx={{ fontWeight: 700 }}>{`Жанры: ${genres
          .map((genre) => genre.name)
          .join(", ")}`}</Typography>
      </Grid>
      <Grid item xs={4} md={2} lg={1}>
        <PersonList></PersonList>
      </Grid>
    </Grid>
  );
}

export default InfoGrid;
