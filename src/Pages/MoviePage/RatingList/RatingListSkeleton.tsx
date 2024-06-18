import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

function RatingListSkeleton() {
  return (
    <Box>
      <Typography variant="h5" component={"h3"} marginBottom={2}>
        <Skeleton sx={{ transform: "none" }}></Skeleton>
      </Typography>
      {[...new Array(6)].map((_, index) => {
        return (
          <Skeleton
            key={index}
            width="100%"
            height={57}
            sx={{ transform: "none", marginBottom: 2 }}
          ></Skeleton>
        );
      })}
    </Box>
  );
}

export default RatingListSkeleton;
