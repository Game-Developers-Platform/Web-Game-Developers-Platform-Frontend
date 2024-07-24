import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import muiTheme from "../themes/muiTheme";
import { IUser } from "../utils/types/types";
import { serverLink } from "../utils/constants/serverLink";

const GameCard = ({
  image,
  name,
  description,
  _id,
  developerId,
}: {
  image: string;
  name: string;
  description: string;
  _id: string;
  developerId: IUser;
}) => {
  const navigate = useNavigate();

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <Card
      key={_id}
      sx={{
        maxWidth: 345,
        maxHeight: 345,
        display: "flex",
        flexDirection: "column",
        backgroundColor: muiTheme.palette.background.default,
      }}
    >
      <CardMedia
        component={"img"}
        sx={{ height: 140 }}
        image={serverLink + image}
        title={name}
      />
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: muiTheme.palette.text.title }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <Typography
          sx={{ color: muiTheme.palette.text.description }}
          variant="body2"
          color="text.secondary"
        >
          {truncateText(description, 140)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          sx={{ color: muiTheme.palette.text.button }}
          size="small"
          onClick={() => navigate(`/game/${_id}`)}
        >
          Game Page
        </Button>
        <Button
          sx={{ color: muiTheme.palette.text.button }}
          size="small"
          onClick={() => navigate(`/profile/${developerId._id}`)}
        >
          Developer Page
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameCard;
