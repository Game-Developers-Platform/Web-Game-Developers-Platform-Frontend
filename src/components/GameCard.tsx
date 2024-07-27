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
        width: 300,
        height: 400,
        display: "flex",
        flexDirection: "column",
        backgroundColor: muiTheme.palette.background.default,
        borderRadius: "16px",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-in-out, transform 0.1s ease-in-out",
        "&:hover": {
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.03)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 180,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
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
          sx={{ color: muiTheme.palette.text.title, fontWeight: "bold" }}
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
          align="center"
        >
          {truncateText(description, 180)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          sx={{
            color: muiTheme.palette.text.button,
            textTransform: "none",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
            },
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            fontWeight: 400,
            letterSpacing: ".03rem",
          }}
          size="small"
          onClick={() => navigate(`/game/${_id}`)}
        >
          Game Page
        </Button>
        <Button
          sx={{
            color: muiTheme.palette.text.button,
            textTransform: "none",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
            },
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            fontWeight: 400,
            letterSpacing: ".03rem",
          }}
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
