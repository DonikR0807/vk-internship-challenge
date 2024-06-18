import { ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Episode } from "../../../Redux/Entities/Seasons/seasonsSlice";

function EpisodeItem({ name, airDate, enName, number }: Episode) {
  return (
    <ListItem
      divider
      sx={{ paddingLeft: 0, paddingRight: 0, alignItems: "flex-start", gap: 2 }}
    >
      <ListItemText
        sx={{ flexShrink: 0, width: "max-content" }}
        primary={number + " Эпизод"}
        secondary={
          <Typography component="span" variant="body2" color="text.secondary">
            {new Date(airDate).getFullYear()}
          </Typography>
        }
      />
      <ListItemText
        primary={name || enName}
        sx={{
          marginTop: "8px",
          "& .MuiTypography-root": {
            height: "48px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "end",
          },
        }}
      ></ListItemText>
    </ListItem>
  );
}

export default EpisodeItem;
