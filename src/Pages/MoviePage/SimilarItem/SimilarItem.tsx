import React from "react";
import { LinkedMovie } from "../../../Redux/Entities/CurrentMovie/currentMovieSlice";
import { Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";

interface SimilarItemProps extends LinkedMovie {
  onClick: (movieId: number) => void;
}

function SimilarItem({
  id,
  poster,
  name,
  enName,
  year,
  type,
  onClick,
}: SimilarItemProps) {
  const subheader =
    year && type
      ? `${year} год, ${type}`
      : year
      ? `${year} год`
      : type
      ? `${type}`
      : "";
  return (
    <Card sx={{ backgroundImage: "none" }} elevation={1}>
      <CardActionArea onClick={() => onClick(id)}>
        <CardMedia
          component="img"
          height="400"
          image={poster?.url || ""}
          alt={name || enName || "Без названия"}
        />
        <CardHeader
          sx={{ alignItems: "flex-start" }}
          title={name || enName || "Без названия"}
          subheader={subheader}
          titleTypographyProps={{
            height: 64,
            overflow: "hidden",
          }}
        />
      </CardActionArea>
    </Card>
  );
}

export default SimilarItem;
