import { Box, Skeleton, Typography } from "@mui/material";

function PersonListSkeleton() {
  return (
    <Box>
      <Typography
        variant="h4"
        component={"p"}
        sx={{ marginTop: { lg: "76px", xs: 0 }, marginBottom: "14px" }}
      >
        <Skeleton sx={{ transform: "none" }}></Skeleton>
      </Typography>
      <Skeleton
        sx={{ transform: "none", marginBottom: "16px" }}
        height={32}
      ></Skeleton>
      {[...new Array(5)].map((_, index) => {
        return (
          <Skeleton
            key={index}
            width="100%"
            height={41}
            sx={{ transform: "none", marginBottom: "8px" }}
          ></Skeleton>
        );
      })}
    </Box>
  );
}

export default PersonListSkeleton;
