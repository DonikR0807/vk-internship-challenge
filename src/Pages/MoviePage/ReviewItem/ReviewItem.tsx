import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Review } from "../../../Redux/Entities/Reviews/reviewsSlice";
import { formatDate } from "../../../utils/formateDate";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function ReviewItem({ review, author, date, type, title }: Review) {
  const reviewRef = React.useRef<HTMLParagraphElement>(null);
  const [showFull, setShowFull] = React.useState(false);
  const [reviewTooBig, setReviewTooBig] = React.useState(false);

  React.useEffect(() => {
    if (reviewRef.current && reviewRef.current.clientHeight > 300) {
      setReviewTooBig(true);
    }
  }, []);

  return (
    <Card
      sx={{
        marginBottom: 2,
      }}
    >
      <CardHeader
        sx={{
          "& .MuiCardHeader-action": {
            alignSelf: "stretch",
          },
        }}
        avatar={<Avatar>{author[0].toUpperCase()}</Avatar>}
        title={author}
        subheader={formatDate(new Date(date))}
        action={
          type === "Позитивный" ? (
            <ThumbUpIcon color={"success"}></ThumbUpIcon>
          ) : type === "Негативный" ? (
            <ThumbDownIcon color={"error"}></ThumbDownIcon>
          ) : (
            ""
          )
        }
      />
      <Divider></Divider>
      <CardContent>
        <Typography variant="h6" component="h4" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ maxHeight: showFull ? "auto" : 300, overflow: "hidden" }}>
          <Typography
            component={"p"}
            ref={reviewRef}
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: review }}
          ></Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        {reviewTooBig && (
          <Button
            onClick={() => {
              setShowFull((prev) => !prev);
            }}
          >
            {showFull ? "Свернуть" : "Показать полностью"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ReviewItem;
