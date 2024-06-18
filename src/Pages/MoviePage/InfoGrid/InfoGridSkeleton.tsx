import { Grid, Skeleton, Typography } from "@mui/material";
import PersonListSkeleton from "../PersonList/PersonListSkeleton";

function InfoGridSkeleton() {
  return (
    <Grid container columns={4} spacing={3}>
      <Grid item xs={4} sm={3} md={2} lg={1}>
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            height: {
              xs: 400,
              sm: 500,
            },
          }}
        />
      </Grid>
      <Grid item xs={4} md={2}>
        <Typography
          variant="h3"
          component="p"
          sx={{
            marginBottom: "20px",
          }}
        >
          <Skeleton sx={{ transform: "none" }}></Skeleton>
        </Typography>
        <Typography
          variant="h4"
          component="p"
          sx={{
            marginBottom: "14px",
          }}
        >
          <Skeleton sx={{ transform: "none" }}></Skeleton>
        </Typography>
        <Skeleton height={368} sx={{ transform: "none" }}></Skeleton>
      </Grid>
      <Grid item xs={4} md={2} lg={1}>
        <PersonListSkeleton></PersonListSkeleton>
      </Grid>
    </Grid>
  );
}

export default InfoGridSkeleton;
