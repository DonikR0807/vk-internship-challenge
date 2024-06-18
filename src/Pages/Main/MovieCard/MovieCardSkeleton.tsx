import { Box, Skeleton, Typography } from "@mui/material";

function MovieCardSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rounded"
        height={400}
        width={"100%"}
        animation="wave"
      />
      <Box
        sx={{
          padding: {
            xs: 1,
            sm: 2,
          },
          bgcolor: "#121212",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={35}
            sx={{
              marginBottom: "0.35em",
            }}
            animation="wave"
          />
        </Typography>
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={160}
          animation="wave"
        ></Skeleton>
      </Box>
    </Box>
  );
}

export default MovieCardSkeleton;
