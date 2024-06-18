import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

function SeasonsListSkeleton() {
  return (
    <Box>
      <Typography variant="h5" component={"div"} sx={{ marginBottom: 2 }}>
        <Skeleton sx={{ transform: "none" }}></Skeleton>
      </Typography>
      <Skeleton
        sx={{ transform: "none", marginBottom: 2 }}
        height={32}
      ></Skeleton>
      <Typography
        variant="subtitle1"
        component={"div"}
        sx={{ marginBottom: "14px" }}
      >
        <Skeleton sx={{ transform: "none" }}></Skeleton>
      </Typography>
      {[...new Array(5)].map((_, index) => (
        <Box sx={{ marginBottom: 2 }} key={index}>
          <Skeleton sx={{ transform: "none" }} height={60}></Skeleton>
        </Box>
      ))}
    </Box>
  );
}

export default SeasonsListSkeleton;
