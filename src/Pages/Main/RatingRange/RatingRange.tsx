import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import { Box, Slider, Typography } from "@mui/material";
import { ratingUpdated } from "../../../Redux/UI/Rating/ratingSlice";
import { selectRatingSlice } from "../../../Redux/UI/Rating/selectors";

const minDistance = 0.1;

function RatingRange() {
  const [currentRating, setCurrentRating] = React.useState<[number, number]>([
    0, 10,
  ]);
  const dispatch = useAppDispatch();
  const ratingRange = useAppSelector(selectRatingSlice);

  React.useLayoutEffect(() => {
    setCurrentRating(ratingRange)
  }, [ratingRange]);

  const handleRatingChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setCurrentRating([
        Math.min(newValue[0], currentRating[1] - minDistance),
        currentRating[1],
      ]);
    } else {
      setCurrentRating([
        currentRating[0],
        Math.max(newValue[1], currentRating[0] + minDistance),
      ]);
    }
  };

  function ratingCommited() {
    dispatch(ratingUpdated(currentRating));
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="subtitle1"
        component={"p"}
        style={{ marginBottom: "10px" }}
      >
        Рейтинг Кинопоиска
      </Typography>
      <Box sx={{ paddingX: "16px" }}>
        <Slider
          max={10}
          min={0}
          step={0.1}
          value={currentRating}
          onChange={handleRatingChange}
          onChangeCommitted={ratingCommited}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
    </Box>
  );
}

export default RatingRange;
