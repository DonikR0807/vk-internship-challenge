import { Box, Skeleton, Typography } from "@mui/material";

function ReviewsListSkeleton() {
  return (
    <>
      {[...new Array(3)].map((_, index) => (
        <Box key={index} sx={{ marginBottom: "16px" }}>
          <Box sx={{ display: "flex", gap: "16px", padding: 2 }}>
            <Skeleton variant="circular" width={40} height={40}></Skeleton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                marginBottom={"5px"}
                component={"div"}
              >
                <Skeleton></Skeleton>
              </Typography>
              <Typography variant="body2" component={"div"}>
                <Skeleton></Skeleton>
              </Typography>
            </Box>
          </Box>
          <Box padding={2}>
            <Typography
              variant={"h6"}
              component={"div"}
              sx={{ marginBottom: "7px" }}
            >
              <Skeleton></Skeleton>
            </Typography>
            <Typography variant={"body2"} component={"div"}>
              <Skeleton height={300} sx={{ transform: "none" }}></Skeleton>
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default ReviewsListSkeleton;
