import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  DialogActions,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Search from "../Search/Search";
import { useAppDispatch, useAppSelector } from "../../Redux/typedApi";
import { selectSearchedMoviesStatus } from "../../Redux/Entities/SearchedMovies/selectors";
import { REQUEST_STATUSES } from "../../utils/constants/requestStatuses";
import SearchResultList from "../SearchResultList/SearchResultList";
import { SearchedMovie } from "../../Redux/Entities/SearchedMovies/searchedMoviesSlice";
import { saveRecentSearch } from "../../utils/saveRecentSearch";
import { useNavigate } from "react-router-dom";
import { currentMovieReset } from "../../Redux/Entities/CurrentMovie/currentMovieSlice";
import { seasonsReset } from "../../Redux/Entities/Seasons/seasonsSlice";
import { postersReset } from "../../Redux/Entities/Posters/postersSlice";
import { reviewsReset } from "../../Redux/Entities/Reviews/reviewsSlice";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

function SearchModal({ open, onClose }: SearchModalProps) {
  const searchedMoviesStatus = useAppSelector(selectSearchedMoviesStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  function handleSearchResultClick(searchedMovie: SearchedMovie) {
    dispatch(currentMovieReset());
    dispatch(seasonsReset());
    dispatch(postersReset());
    dispatch(reviewsReset());
    saveRecentSearch(searchedMovie);
    navigate("/movie/" + searchedMovie.id);
    onClose();
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen={!matches ? true : false}
        fullWidth={true}
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "div",
        }}
        sx={{
          "& .MuiPaper-root-MuiDialog-paper": {
            width: "500px",
          },
        }}
      >
        <LinearProgress
          sx={{
            visibility:
              searchedMoviesStatus === REQUEST_STATUSES.pending
                ? "visible"
                : "hidden",
          }}
        />

        <DialogTitle
          sx={{
            padding: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          Поиск
        </DialogTitle>
        <DialogContent
          sx={{
            padding: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <Search></Search>
          <SearchResultList
            onSearchResultClick={handleSearchResultClick}
          ></SearchResultList>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default SearchModal;
