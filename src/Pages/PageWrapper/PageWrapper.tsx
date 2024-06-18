import { Box, Container } from "@mui/material";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";

function PageWrapper() {
  return (
    <Box sx={{ minWidth: "320px" }}>
      <Header></Header>
      <Container
        maxWidth={"xl"}
        sx={{
          padding: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Outlet></Outlet>
      </Container>
    </Box>
  );
}

export default PageWrapper;
