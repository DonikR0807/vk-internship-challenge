import { Box, Button, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "../SearchModal/SearchModal";
import { useTheme } from "@mui/material/styles";

function SearchTrigger() {
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box>
      {matches ? (
        <TextField
          inputRef={inputRef}
          onFocus={() => {
            setSearchModalOpen(true);
            inputRef.current?.blur();
          }}
          sx={{
            width: {
              xs: 150,
              sm: 200,
            },
          }}
          label="Поиск"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Название..."
          variant="outlined"
          size={"small"}
        />
      ) : (
        <Button onClick={() => setSearchModalOpen(true)} variant="contained" size="small">
          <SearchIcon />
        </Button>
      )}
      <SearchModal
        open={searchModalOpen}
        onClose={() => {
          setSearchModalOpen(false);
        }}
      ></SearchModal>
    </Box>
  );
}

export default SearchTrigger;
