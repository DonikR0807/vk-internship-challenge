import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { genresList } from "../../../utils/constants/genresList";
import { useAppDispatch, useAppSelector } from "../../../Redux/typedApi";
import { selectGenreSlice } from "../../../Redux/UI/Genre/selectors";
import {
  genresUpdated,
} from "../../../Redux/UI/Genre/genreSlice";
import { pagesReset } from "../../../Redux/Entities/Movies/moviesSlice";

function GenreSelect() {
  const currentGenres = useAppSelector(selectGenreSlice);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      genresUpdated(typeof value === "string" ? value.split(",") : value)
    );
    dispatch(pagesReset())
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="multiple-genre-label">Жанры</InputLabel>
      <Select
        autoWidth={false}
        labelId="multiple-genre-label"
        id="multiple-genre"
        multiple={true}
        value={currentGenres}
        onChange={handleChange}
        input={<OutlinedInput label="Жанры" />}
      >
        {genresList.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default GenreSelect;
