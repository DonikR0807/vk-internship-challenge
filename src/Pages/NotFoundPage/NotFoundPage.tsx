import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function NotFoundPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SentimentVeryDissatisfiedIcon sx={{
        width: '48px',
        height: '48px',
        marginRight: '10px'
      }}></SentimentVeryDissatisfiedIcon>
      <Typography
        variant="h3"
        component={"h1"}
        sx={{
          fontSize: {
            xs: "2rem",
            md: "3rem",
          },
          textAlign: "center",
        }}
      >
        Страница не найдена...
      </Typography>
    </Box>
  );
}

export default NotFoundPage;
