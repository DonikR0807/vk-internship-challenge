import { InputAdornment, TextField, debounce } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useAppDispatch } from "../../Redux/typedApi";
import { searchMovie } from "../../Redux/Entities/SearchedMovies/thunks/searchMovie";
import { setSearchStatus } from "../../Redux/Entities/SearchedMovies/searchedMoviesSlice";
import { REQUEST_STATUSES } from "../../utils/constants/requestStatuses";

function Search() {
  const [searchValue, setSearchValue] = React.useState("");
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null)

  const debouncedSearch = React.useCallback(
    debounce((searchValue) => {
      if (searchValue) {
        dispatch(searchMovie(searchValue));
      }
    }, 1000),
    []
  );

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchValue(value);
    if (value) {
        dispatch(setSearchStatus(REQUEST_STATUSES.pending));
    } else {
        dispatch(setSearchStatus(REQUEST_STATUSES.idle));
    }
    
    debouncedSearch(value);
  }

  React.useEffect(() => {
    return () => {
        dispatch(setSearchStatus(REQUEST_STATUSES.idle));
        debouncedSearch("")
    };
  }, [debouncedSearch, dispatch])

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <TextField
      inputRef={inputRef}
      onChange={handleSearchChange}
      value={searchValue}
      fullWidth={true}
      label="Поиск..."
      placeholder="Введите название..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="filled"
      size={"small"}
    />
  );
}

export default Search;
