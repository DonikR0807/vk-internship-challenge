import {
  selectSearchedMoviesEntities,
  selectSearchedMoviesStatus,
} from "../../Redux/Entities/SearchedMovies/selectors";
import { useAppSelector } from "../../Redux/typedApi";
import { Box, Typography } from "@mui/material";
import SearchResult from "../SearchResult/SearchResult";
import { SearchedMovie } from "../../Redux/Entities/SearchedMovies/searchedMoviesSlice";
import ConditionalList from "../ConditionalList/ConditionalList";

function SearchResultList({
  onSearchResultClick,
}: {
  onSearchResultClick: (searchedMovie: SearchedMovie) => void;
}) {
  const searchedMovies = useAppSelector(selectSearchedMoviesEntities);
  const searchedMoviesStatus = useAppSelector(selectSearchedMoviesStatus);

  const renderOnSuccess = searchedMovies.length ? (
    searchedMovies.map((searchedMovie) => (
      <SearchResult
        id={searchedMovie.id}
        key={searchedMovie.id}
        name={searchedMovie.name}
        poster={searchedMovie.poster}
        onClick={() => onSearchResultClick(searchedMovie)}
      ></SearchResult>
    ))
  ) : (
    <Typography variant="subtitle1" sx={{ marginTop: 2, textAlign: "center" }}>
      Ничего не найдено....
    </Typography>
  );

  let renderOnIdle = <></>;
  const recentSearch = localStorage.getItem("recentSearch");
  if (recentSearch) {
    const recentSearchArray: SearchedMovie[] = JSON.parse(recentSearch);

    renderOnIdle = (
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ marginTop: 2, textAlign: "center", marginBottom: 2 }}
        >
          Недавние запросы:
        </Typography>
        {recentSearchArray.map((searchedMovie) => (
          <SearchResult
            onClick={() => onSearchResultClick(searchedMovie)}
            id={searchedMovie.id}
            key={searchedMovie.id}
            name={searchedMovie.name}
            poster={searchedMovie.poster}
          ></SearchResult>
        ))}
      </Box>
    );
  }

  const renderOnFailed = (
    <Typography variant="subtitle1" sx={{ marginTop: 2, textAlign: "center" }}>
      Произошла ошибка при поиске
    </Typography>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <ConditionalList
        renderOnSuccess={renderOnSuccess}
        renderOnIdle={renderOnIdle}
        renderOnFailed={renderOnFailed}
        renderOnPending={null}
        statusToCheck={searchedMoviesStatus}
      ></ConditionalList>
    </Box>
  );
}

export default SearchResultList;
