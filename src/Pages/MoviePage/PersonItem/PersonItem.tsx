import { ListItem, ListItemText } from "@mui/material";
import { PersonInMovie } from "../../../Redux/Entities/CurrentMovie/currentMovieSlice";

function PersonItem({id, name, enName}: PersonInMovie) {
  return (
    <ListItem divider={true} key={id} sx={{ paddingLeft: 0 }}>
      <ListItemText>{name || enName}</ListItemText>
    </ListItem>
  );
}

export default PersonItem;
