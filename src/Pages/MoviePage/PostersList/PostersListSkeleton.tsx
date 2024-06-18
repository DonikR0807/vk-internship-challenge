import { Box, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

function PostersListSkeleton() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box>
      <Typography variant="h5" component={"div"} sx={{ marginBottom: 2 }}>
        <Skeleton sx={{ transform: "none" }}></Skeleton>
      </Typography>
      <Box sx={{ display: "flex", gap: "16px", padding: 1 }}>
        {[...new Array(matches ? 2 : 1)].map((_, index) => (
          <Box sx={{ flexBasis: matches ? "calc(100% / 2)" : "100%" }} key={index}>
            <Skeleton
              height={300}
              sx={{
                transform: "none",
              }}
            ></Skeleton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PostersListSkeleton;
