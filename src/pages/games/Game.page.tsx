import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import muiTheme from "../../themes/muiTheme";

export interface IGame {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  developerId: string;
  platformLinks: { platform: string; url: string }[];
  releaseDate: Date;
  views: number;
  categories: string[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  socialNetworks: { platform: string; url: string }[];
  gamesId: string[];
  birthDate: Date;
  views: number;
  refreshTokens: string[];
}

const GamePage = ({ game, user }: { game: IGame; user: IUser }) => {
  const navigate = useNavigate();

  const isMyGame = game.developerId === user.id;

  const handleProfileClick = () => {
    navigate(`/profile/${game.developerId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{
            color: muiTheme.palette.text.details,
            fontSize: "2rem",
            marginBottom: 2,
          }}
        >
          {game.name}
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
            maxWidth: { xs: 300, sm: 400, md: 500, lg: 600 },
            height: "auto",
            borderRadius: 1,
            boxShadow: 3,
            transition: "max-width 0.3s ease-in-out",
            marginBottom: 2,
          }}
          alt={game.name}
          src={game.image}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5,
            }}
          >
            Price
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.details,
              marginBottom: 1.5,
            }}
          >
            ${game.price}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5, // Reduced margin
            }}
          >
            Release Date
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.details,
              marginBottom: 1.5,
            }}
          >
            {new Date(game.releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
            width: "50%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5,
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              color: muiTheme.palette.text.details,
              textAlign: "center",
            }}
          >
            {game.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
            width: "50%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.secondary,
              marginBottom: 0.5,
            }}
          >
            Developer
          </Typography>
          <Typography
            sx={{
              color: muiTheme.palette.text.details,
              textAlign: "center",
              marginBottom: 1.5,
            }}
          >
            {user.name}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: muiTheme.palette.secondary.main,
              color: muiTheme.palette.text.secondary,
              "&:hover": {
                backgroundColor: muiTheme.palette.primary.dark,
              },
            }}
            onClick={handleProfileClick}
          >
            {isMyGame ? "My Profile" : "Developer Profile"}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default GamePage;
