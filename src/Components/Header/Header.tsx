import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SearchTrigger from "../SearchTrigger/SearchTrigger";
import { Link, useLocation } from "react-router-dom";
import s from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import FiltersSection from "../../Pages/Main/FiltersSection/FiltersSection";

function Header() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { pathname } = useLocation();

  function handleDrawerOpen() {
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  return (
    <AppBar>
      <Container
        maxWidth={"xl"}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: {
            xs: 1,
            sm: 2,
          },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocalMoviesIcon></LocalMoviesIcon>
          <Typography
            component={"div"}
            variant="h6"
            sx={{
              marginLeft: "10px",
            }}
            display={"inline-block"}
          >
            <Link className={s.mainLink} to={"/"}>
              Кинопоиск
            </Link>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <SearchTrigger></SearchTrigger>
          {!matches && !pathname.startsWith("/movie/") && (
            <IconButton sx={{ padding: 0 }} onClick={handleDrawerOpen}>
              <MenuIcon sx={{ width: "32px", height: "32px", padding: 0 }} />
            </IconButton>
          )}
        </Box>
      </Container>
      {!matches &&
        !pathname.startsWith("/movie/") && (
          <Drawer
            onClose={handleDrawerClose}
            anchor="top"
            open={drawerOpen}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <FiltersSection></FiltersSection>
          </Drawer>
        )}
    </AppBar>
  );
}

export default Header;
