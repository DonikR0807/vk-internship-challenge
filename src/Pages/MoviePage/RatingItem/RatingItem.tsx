import { ListItem, ListItemText, Rating } from "@mui/material";

interface RatingProps {
  ratingName: string;
  ratingValue: number | null | undefined;
}

function RatingItem({ ratingName, ratingValue }: RatingProps) {
  if (ratingValue == undefined) {
    return <></>;
  }

  return (
    <ListItem divider={true} sx={{
      flexDirection: "column",
      alignItems: "start",
      paddingLeft: 0,
    }}>
      <ListItemText>{ratingName}</ListItemText>
      <Rating
        name={ratingName}
        value={ratingValue}
        max={10}
        precision={0.1}
        readOnly
      ></Rating>
    </ListItem>
  );
}

export default RatingItem;
