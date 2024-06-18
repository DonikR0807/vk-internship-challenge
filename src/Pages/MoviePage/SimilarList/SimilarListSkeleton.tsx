import { Box, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";

function SimilarListSkeleton() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box>
      <Typography variant="h5" component={"div"} sx={{ marginBottom: 2 }}>
        <Skeleton sx={{ transform: "none" }}></Skeleton>
      </Typography>
      <Box sx={{ display: "flex", gap: "16px", padding: 1, }}>
        {[...new Array(matches ? 3 : 1)].map((_, index) => (
          <Box sx={{ flexBasis: matches ? "calc(100% / 3)" : "100%"}} key={index}>
            <Skeleton
              height={400}
              sx={{
                transform: "none",
              }}
            ></Skeleton>
            <Box sx={{ padding: 2 }}>
              <Typography
                variant="h5"
                component={"div"}
                sx={{ marginBottom: "32px" }}
              >
                <Skeleton
                  sx={{
                    transform: "none",
                  }}
                ></Skeleton>
              </Typography>
              <Typography variant="body1">
                <Skeleton
                  sx={{
                    transform: "none",
                  }}
                ></Skeleton>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SimilarListSkeleton;
