import { Avatar, Card, CardActionArea, CardHeader } from "@mui/material";
import { SearchedMovie } from "../../Redux/Entities/SearchedMovies/searchedMoviesSlice";

interface SearchResultProps extends SearchedMovie {
  onClick?: () => void;
}

function SearchResult({ name, poster, onClick }: SearchResultProps) {
  if (!name || !poster?.url) {
    return <></>;
  }

  return (
    <Card
      sx={{
        marginBottom: "10px",
        "& .MuiCardHeader-content": {
          height: "20px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "calc(100% - 66px)",
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          padding: {
            xs: 0,
            sm: 1,
          },
        }}
      >
        <CardHeader
          sx={{
            padding: {
              xs: 0,
              sm: 1,
            },
            '& .MuiCardHeader-avatar': {
              marginRight: {
                xs: '5px',
                sm: 1
              }
            }
          }}
          avatar={
            <Avatar
              variant="square"
              sx={{
                width: "80px",
                height: "80px",
              }}
              src={poster.url}
              alt={name}
            ></Avatar>
          }
          title={name}
        ></CardHeader>
      </CardActionArea>
    </Card>
  );
}

export default SearchResult;
