import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import { Box, Slider, Typography } from "@mui/material";
import { yearUpdated } from "../../../Redux/UI/Year/yearSlice";
import { selectYearSlice } from "../../../Redux/UI/Year/selectors";

const minDistance = 1;

function YearRange() {
  const [currentYear, setCurrentYear] = React.useState<[number, number]>([1990, 2024]);
  const dispatch = useAppDispatch();
  const yearRange = useAppSelector(selectYearSlice);

  React.useLayoutEffect(() => {
    setCurrentYear(yearRange);
  }, [yearRange]);

  const handleYearChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setCurrentYear([
        Math.min(newValue[0], currentYear[1] - minDistance),
        currentYear[1],
      ]);
    } else {
      setCurrentYear([
        currentYear[0],
        Math.max(newValue[1], currentYear[0] + minDistance),
      ]);
    }
  };

  function yearCommited() {
    dispatch(yearUpdated(currentYear));
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="subtitle1"
        component={"p"}
        style={{ marginBottom: "10px" }}
      >
        Годы выпуска
      </Typography>
      <Box sx={{ paddingX: "16px" }}>
        <Slider
          max={2024}
          min={1990}
          step={1}
          value={currentYear}
          onChange={handleYearChange}
          onChangeCommitted={yearCommited}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
    </Box>
  );
}

export default YearRange;
