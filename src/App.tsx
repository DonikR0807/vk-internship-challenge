import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Main from "./Pages/Main/Main";
import MoviePage from "./Pages/MoviePage/MoviePage";
import PageWrapper from "./Pages/PageWrapper/PageWrapper";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageWrapper></PageWrapper>}>
      <Route path="/" element={<Main />}></Route>
      <Route path="/movie/:movieId" element={<MoviePage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Route>
  )
);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
