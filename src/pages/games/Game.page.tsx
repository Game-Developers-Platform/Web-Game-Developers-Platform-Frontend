import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
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

  const isMyGame = game.developerId == user.id;

  const handleDeveloperProfileClick = () => {
    navigate(`/profile/${game.developerId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={game.image}
              alt={game.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ marginBottom: 2, color: muiTheme.palette.text.title }}
          >
            {game.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, color: muiTheme.palette.text.secondary }}
          >
            Price: {game.price}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, color: muiTheme.palette.text.secondary }}
          >
            Release Date: {game.releaseDate.toDateString()}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, color: muiTheme.palette.text.secondary }}
          >
            Views: {game.views}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, color: muiTheme.palette.text.secondary }}
          >
            Categories: {game.categories.join(", ")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, color: muiTheme.palette.text.secondary }}
          >
            Description: {game.description}
          </Typography>
          <Box sx={{ display: "flex", gap: "8px", marginBottom: 2 }}>
            {game.platformLinks.map((platform, index) => (
              <IconButton
                key={index}
                onClick={() => window.open(platform.url, "_blank")}
                aria-label={`Visit ${platform.platform}`}
                sx={{ color: muiTheme.palette.text.link }}
              >
                {platform.platform === "Steam" && <LanguageIcon />}
                {platform.platform === "Epic Games" && <LanguageIcon />}
                {platform.platform === "Origin" && <LanguageIcon />}
              </IconButton>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeveloperProfileClick}
            sx={{ color: muiTheme.palette.text.button }}
          >
            {isMyGame ? "My Profile" : `${game.developerId}'s Profile`}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GamePage;
