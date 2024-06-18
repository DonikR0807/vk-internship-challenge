import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Movie } from "../../../Redux/Entities/Movies/moviesSlice";

interface MovieCardsProps {
  movie: Movie;
  onClick: (movieId: number) => void;
}

function MovieCard({ movie, onClick }: MovieCardsProps) {
  const { id, name, description, poster, year, rating } = movie;

  return (
    <Card elevation={24}>
      <CardActionArea onClick={() => onClick(id)}>
        <CardMedia
          component="img"
          height="400"
          image={poster?.url || undefined}
          alt={name || "Не удалось загрузить изображение"}
        />
        <CardContent
          sx={{
            padding: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              height: "35px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name || "Без названия"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: "160px",
              overflow: "hidden",
            }}
          >
            {description ? description : ""}
          </Typography>
        </CardContent>
        <Divider></Divider>
        <CardActions
          sx={{
            padding: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <ButtonGroup variant="contained">
            {year && (
              <Button disabled component="div">
                {year}
              </Button>
            )}
            {rating && (
              <Button disabled component="div">
                {`${rating.kp}/10`}
              </Button>
            )}
          </ButtonGroup>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
